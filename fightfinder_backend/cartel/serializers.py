from rest_framework import serializers
from cartel.models import Cartel


class CartelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cartel
        fields = "__all__"
