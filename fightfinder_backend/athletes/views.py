from rest_framework import generics
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
