from rest_framework import generics, views, response, status
from rest_framework.permissions import IsAuthenticated
from fights.models import Fight, FightHistoric
from fights.serializers import FightSerializer, FightHistoricSerializer

class FightCreateListView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Fight.objects.all()
    serializer_class = FightSerializer

class FightRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Fight.objects.all()
    serializer_class = FightSerializer
    
class FightHistoricCreateListView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = FightHistoric.objects.all()
    serializer_class = FightHistoricSerializer

class FightHistoricRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = FightHistoric.objects.all()
    serializer_class = FightHistoricSerializer