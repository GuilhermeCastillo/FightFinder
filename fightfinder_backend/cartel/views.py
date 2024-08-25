from rest_framework import generics, views, response, status
from cartel.models import Cartel
from cartel.serializers import CartelSerializer


class CartelCreateListView(generics.ListCreateAPIView):
    # permission_classes = (IsAuthenticated, GlobalDefaultPermission,)
    queryset = Cartel.objects.all()
    serializer_class = CartelSerializer


class CartelRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = (IsAuthenticated, GlobalDefaultPermission,)
    queryset = Cartel.objects.all()
    serializer_class = CartelSerializer
