# users/views.py
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import AthleteSerializer

class AthleteUserCreateView(generics.CreateAPIView):
    serializer_class = AthleteSerializer
    permission_classes = [AllowAny]
