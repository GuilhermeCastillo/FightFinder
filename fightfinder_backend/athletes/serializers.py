from rest_framework import serializers
from athletes.models import Athlete


class AthleteSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    cpf = serializers.CharField()
    peso = serializers.FloatField()
    altura = serializers.FloatField()
    telefone = serializers.CharField()
    data_nascimento = serializers.DateField()
    nome = serializers.CharField()
    academia = serializers.CharField()

    class Meta:
        model = Athlete
        fields = '__all__'
