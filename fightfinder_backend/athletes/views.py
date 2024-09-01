from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .recommender import recommend_opponents, recommend_athletes
from athletes.models import Athlete
from athletes.serializers import AthleteSerializer
from django.http import JsonResponse
from django.views.decorators.cache import cache_page
from .functions import convert_to_dataframe
from datetime import date


def calcular_idade(data_nascimento):
    today = date.today()
    return (
        today.year
        - data_nascimento.year
        - ((today.month, today.day) < (data_nascimento.month, data_nascimento.day))
    )


class AthleteCreateListView(generics.ListCreateAPIView):
    # permission_classes = (IsAuthenticated, GlobalDefaultPermission,)
    queryset = Athlete.objects.all()
    serializer_class = AthleteSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        peso_min = self.request.query_params.get("peso_min")
        peso_max = self.request.query_params.get("peso_max")
        idade_min = self.request.query_params.get("idade_min")
        idade_max = self.request.query_params.get("idade_max")
        modalidade = self.request.query_params.get("modalidade")

        if modalidade:
            queryset = queryset.filter(modalidade=modalidade)

        if idade_min is not None:
            queryset = queryset.filter(
                data_nascimento__lte=date.today().replace(
                    year=date.today().year - int(idade_min)
                )
            )
        if idade_max is not None:
            queryset = queryset.filter(
                data_nascimento__gte=date.today().replace(
                    year=date.today().year - int(idade_max)
                )
            )

        if peso_min is not None:
            queryset = queryset.filter(peso__gte=peso_min)
        if peso_max is not None:
            queryset = queryset.filter(peso__lte=peso_max)

        return queryset


class AthleteRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = (IsAuthenticated, GlobalDefaultPermission,)
    queryset = Athlete.objects.all()
    serializer_class = AthleteSerializer


class AthleteRecommendationsView(APIView):
    def get(self, request, cpf, format=None):
        try:
            athlete = Athlete.objects.get(cpf=cpf)
        except Athlete.DoesNotExist:
            return Response(
                {"error": "Atleta não encontrado"}, status=status.HTTP_404_NOT_FOUND
            )

        recommendations = recommend_opponents(athlete)
        serializer = AthleteSerializer(recommendations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@cache_page(60 * 10)
def recommend_view(request, pk):
    try:
        # Obtenha o atleta pelo CPF
        athlete = Athlete.objects.get(id=pk)
        
        # Converta a base de dados para DataFrame
        df = convert_to_dataframe()
        
        # Encontre o índice do atleta no DataFrame
        atleta_idx = df.index[df['nome'] == athlete.nome].tolist()[0]
        
        # Gere as recomendações
        recommended_athlete_names = recommend_athletes(df, atleta_idx, 5)
        
        # Obtenha os detalhes dos atletas recomendados
        recommended_athletes = Athlete.objects.filter(nome__in=recommended_athlete_names)
        
        # Formate os dados dos atletas recomendados para o JSON
        recommendations = []
        for rec_athlete in recommended_athletes:
            recommendations.append({
                'nome': rec_athlete.nome,
                'cpf': rec_athlete.cpf,
                'genero': rec_athlete.genero,
                'peso': rec_athlete.peso,
                'altura': rec_athlete.altura,
                'cidade': rec_athlete.cidade,
                'estado': rec_athlete.estado,
                'pais': rec_athlete.pais,
                'modalidade': rec_athlete.modalidade,
                # Adicione outros campos que desejar
            })
        
        # Retorne as recomendações como JSON
        return JsonResponse({
            'athlete': {
                'nome': athlete.nome,
                'cpf': athlete.cpf,
                'genero': athlete.genero,
                'peso': athlete.peso,
                'altura': athlete.altura,
                'cidade': athlete.cidade,
                'estado': athlete.estado,
                'pais': athlete.pais,
                'modalidade': athlete.modalidade,
                # Adicione outros campos que desejar
            },
            'recommendations': recommendations
        })
        
    except Athlete.DoesNotExist:
        return JsonResponse({'error': 'Athlete not found'}, status=404)
