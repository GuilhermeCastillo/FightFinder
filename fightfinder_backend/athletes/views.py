from rest_framework import generics, status, serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .recommender import recommend_opponents, recommend_athletes
from connections.models import Connection
from connections.serializers import ConnectionSerializer
from athletes.models import Athlete
from athletes.serializers import AthleteSerializer, AthleteProfileSerializer
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

# class AthleteRecommendationsView(APIView):
#     def get(self, request, cpf, format=None):
#         try:
#             athlete = Athlete.objects.get(cpf=cpf)
#         except Athlete.DoesNotExist:
#             return Response(
#                 {"error": "Atleta não encontrado"}, status=status.HTTP_404_NOT_FOUND
#             )

#         recommendations = recommend_opponents(athlete)
#         serializer = AthleteSerializer(recommendations, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
    
class AthleteRecommendationsView(APIView):
    def get(self, request, cpf, format=None):
        try:
            # Verifica se o atleta com o CPF fornecido existe no banco de dados
            athlete = Athlete.objects.get(cpf=cpf)
        except Athlete.DoesNotExist:
            return Response(
                {"error": "Atleta não encontrado"}, status=status.HTTP_404_NOT_FOUND
            )

        # Função de recomendação que recebe o atleta
        recommendations = recommend_opponents(athlete)
        
        # Verifica se a função de recomendação retornou algo
        if not recommendations:
            return Response(
                {"message": "Não há recomendações suficientes no momento"}, 
                status=status.HTTP_200_OK
            )

        # Serializa as recomendações e retorna a resposta
        serializer = AthleteSerializer(recommendations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



# @cache_page(60 * 10)
# def recommend_view(request, pk):
#     try:
#         athlete = Athlete.objects.get(id=pk)
#         df = convert_to_dataframe()
#         atleta_idx = df.index[df['nome'] == athlete.nome].tolist()[0]
#         recommended_athlete_names = recommend_athletes(df, atleta_idx, 5)
#         recommended_athletes = Athlete.objects.filter(nome__in=recommended_athlete_names)
        
#         recommendations = []
#         for rec_athlete in recommended_athletes:
#             recommendations.append({
#                 'nome': rec_athlete.nome,
#                 'cpf': rec_athlete.cpf,
#                 'genero': rec_athlete.genero,
#                 'peso': rec_athlete.peso,
#                 'altura': rec_athlete.altura,
#                 'cidade': rec_athlete.cidade,
#                 'estado': rec_athlete.estado,
#                 'pais': rec_athlete.pais,
#                 'modalidade': rec_athlete.modalidade,
#             })
        
#         return JsonResponse({
#             'athlete': {
#                 'nome': athlete.nome,
#                 'cpf': athlete.cpf,
#                 'genero': athlete.genero,
#                 'peso': athlete.peso,
#                 'altura': athlete.altura,
#                 'cidade': athlete.cidade,
#                 'estado': athlete.estado,
#                 'pais': athlete.pais,
#                 'modalidade': athlete.modalidade,
#             },
#             'recommendations': recommendations
#         })
        
#     except Athlete.DoesNotExist:
#         return JsonResponse({'error': 'Athlete not found'}, status=404)

# @cache_page(60 * 10)
class RecommendForAuthenticatedUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            # Obtém o atleta associado ao usuário autenticado
            athlete = Athlete.objects.get(user=request.user)
        except Athlete.DoesNotExist:
            return Response(
                {"error": "Atleta não encontrado para este usuário"}, 
                status=status.HTTP_404_NOT_FOUND
            )

        # Converte os dados para o DataFrame usado na recomendação
        df = convert_to_dataframe()

        # Identifica o índice do atleta no DataFrame
        atleta_idx = df.index[df['nome'] == athlete.nome].tolist()[0]

        # Faz a recomendação de atletas semelhantes
        recommended_athlete_names = recommend_athletes(df, atleta_idx, 5)

        # Busca os atletas recomendados no banco de dados
        recommended_athletes = Athlete.objects.filter(nome__in=recommended_athlete_names)
        
        # Cria uma lista de dicionários com os detalhes dos atletas recomendados
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
        
        # Retorna os dados do atleta autenticado e as recomendações
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

class AthleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Athlete
        fields = ['cpf', 'genero', 'peso', 'altura', 'telefone', 'cidade', 'estado', 'pais', 'latitude', 'longitude', 'data_nascimento', 'nome', 'academia', 'modalidade', 'imagem']

class CompleteAthleteProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        
        # Verifique se o atleta já existe para o usuário autenticado
        try:
            athlete = Athlete.objects.get(user=user)
        except Athlete.DoesNotExist:
            # Se o perfil não existir, cria um novo
            athlete = Athlete(user=user)
        
        # Atualize ou crie o perfil do atleta com os dados fornecidos
        serializer = AthleteSerializer(athlete, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CheckAthleteProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            athlete = request.user.athlete  # Verifica se o usuário tem um perfil de atleta
            return Response({"athlete_profile_complete": True}, status=status.HTTP_200_OK)
        except:
            return Response({"athlete_profile_complete": False}, status=status.HTTP_200_OK)