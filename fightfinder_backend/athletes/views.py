from rest_framework import generics, views, response, status
from athletes.models import Athlete, Cartel
from athletes.serializers import AthleteSerializer

class AthleteCreateListView(generics.ListCreateAPIView):
    # permission_classes = (IsAuthenticated, GlobalDefaultPermission,)
    queryset = Athlete.objects.all()
    serializer_class = AthleteSerializer

class AthleteRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = (IsAuthenticated, GlobalDefaultPermission,)
    queryset = Athlete.objects.all()
    serializer_class = AthleteSerializer