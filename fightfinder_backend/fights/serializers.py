from rest_framework import serializers
from fights.models import Fight, FightHistoric


class FightSerializer(serializers.ModelSerializer):

    class Meta:
        model = Fight
        fields = "__all__"

class FightHistoricSerializer(serializers.ModelSerializer):

    class Meta:
        model = FightHistoric
        fields = "__all__"
