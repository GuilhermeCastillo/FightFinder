from rest_framework import serializers
from athletes.models import Athlete


class AthleteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Athlete
        fields = "__all__"
