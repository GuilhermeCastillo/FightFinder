from rest_framework import serializers
from athletes.models import Athlete


class AthleteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Athlete
        fields = "__all__"

class AthleteProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Athlete
        fields = ('cpf', 'genero', 'peso', 'altura', 'telefone', 'cidade', 'estado', 
                  'pais', 'data_nascimento', 'nome', 'academia', 'modalidade', 'imagem')

    def create(self, validated_data):
        # O usuário logado vai completar o perfil de atleta
        user = self.context['request'].user
        athlete = Athlete.objects.create(user=user, **validated_data)
        return athlete
