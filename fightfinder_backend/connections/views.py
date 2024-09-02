from rest_framework import generics
from .models import Connection
from .serializers import ConnectionSerializer

class ConnectionCreateView(generics.CreateAPIView):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer

class ConnectionListView(generics.ListAPIView):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer
