from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .recommender import recommend_opponents
from athletes.models import Athlete
from athletes.serializers import AthleteSerializer


class AthleteCreateListView(generics.ListCreateAPIView):
    # permission_classes = (IsAuthenticated, GlobalDefaultPermission,)
    queryset = Athlete.objects.all()
    serializer_class = AthleteSerializer


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
