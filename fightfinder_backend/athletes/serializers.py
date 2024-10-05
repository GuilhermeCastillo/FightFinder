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

    def validate_cpf(self, value):
        if not value.isdigit() or len(value) != 11:
            raise serializers.ValidationError("CPF deve conter apenas números e ter 11 dígitos.")
        return value

    def validate_peso(self, value):
        if value < 0 or value > 200:
            raise serializers.ValidationError("O peso deve ser um valor entre 0 e 200 kg.")
        return value

    def validate_altura(self, value):
        if value < 0 or value > 2.8:
            raise serializers.ValidationError("A altura deve ser um valor entre 0 e 2.8 metros.")
        return value

    def validate_telefone(self, value):
        if len(str(value)) > 15 or not str(value).isdigit():
            raise serializers.ValidationError("O telefone deve conter apenas números e ter no máximo 15 dígitos.")
        return value

    def create(self, validated_data):
        # O usuário logado vai completar o perfil de atleta
        user = self.context['request'].user
        athlete = Athlete.objects.create(user=user, **validated_data)
        return athlete
