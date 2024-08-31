from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .recommender import recommend_opponents
from athletes.models import Athlete
from athletes.serializers import AthleteSerializer

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
    lookup_field = "uuid"


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
