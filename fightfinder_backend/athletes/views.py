from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .recommender import recommend_opponents, recommend_athletes
from connections.models import Connection
from connections.serializers import ConnectionSerializer
from athletes.models import Athlete
from athletes.serializers import AthleteSerializer
from django.http import JsonResponse
from django.views.decorators.cache import cache_page
from .functions import convert_to_dataframe, calcular_idade
from datetime import date

class AthleteCreateListView(generics.ListCreateAPIView):
    queryset = Athlete.objects.all()
    serializer_class = AthleteSerializer
    permission_classes = [IsAuthenticated]

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
    queryset = Athlete.objects.all()
    serializer_class = AthleteSerializer
    permission_classes = [IsAuthenticated]

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
        athlete = Athlete.objects.get(id=pk)
        df = convert_to_dataframe()
        atleta_idx = df.index[df['nome'] == athlete.nome].tolist()[0]
        recommended_athlete_names = recommend_athletes(df, atleta_idx, 5)
        recommended_athletes = Athlete.objects.filter(nome__in=recommended_athlete_names)
        
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
            })
        
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
            },
            'recommendations': recommendations
        })
        
    except Athlete.DoesNotExist:
        return JsonResponse({'error': 'Athlete not found'}, status=404)


class AthleteConnectionsListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user

        try:
            # Obtenha a instância de Athlete associada ao User
            athlete = Athlete.objects.get(user=user)
        except Athlete.DoesNotExist:
            return Response({"error": "Athlete not found for this user"}, status=status.HTTP_404_NOT_FOUND)

        # Filtre as conexões usando a instância de Athlete
        connections = Connection.objects.filter(athlete_from=athlete) | Connection.objects.filter(athlete_to=athlete)
        serializer = ConnectionSerializer(connections, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

