from rest_framework import generics, views, response, status
from events.models import Promoter, Event
from events.serializers import PromoterSerializer, EventSerializer


class PromoterCreateListView(generics.ListCreateAPIView):
    # permission_classes = (IsAuthenticated, GlobalDefaultPermission,)
    queryset = Promoter.objects.all()
    serializer_class = PromoterSerializer


class PromoterRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = (IsAuthenticated, GlobalDefaultPermission,)
    queryset = Promoter.objects.all()
    serializer_class = PromoterSerializer


class EventCreateListView(generics.ListCreateAPIView):
    # permission_classes = (IsAuthenticated, GlobalDefaultPermission,)
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = (IsAuthenticated, GlobalDefaultPermission,)
    queryset = Event.objects.all()
    serializer_class = EventSerializer
