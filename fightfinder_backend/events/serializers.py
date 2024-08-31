from rest_framework import serializers
from events.models import Promoter, Event


class PromoterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Promoter
        fields = "__all__"


class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = "__all__"
