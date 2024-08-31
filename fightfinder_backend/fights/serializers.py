import re
from rest_framework import serializers
from fights.models import Fight, FightHistoric


class FightSerializer(serializers.ModelSerializer):
    vencedor = serializers.SerializerMethodField()

    class Meta:
        model = Fight
        fields = "__all__"
        
    def get_vencedor(self, obj):
        if obj.resultado == 1:
            return f"Vitória para: {obj.atleta1.nome}"
        elif obj.resultado == 2:
            return f"Vitória para: {obj.atleta2.nome}"
        else:
            return "Empate"        

    def validate_cpf(self, value):
        clean_cpf = re.sub(r'\D', '', value)
        if len(clean_cpf) != 11:
            raise serializers.ValidationError("O CPF deve ter exatamente 11 dígitos numéricos.")
        return clean_cpf

class FightHistoricSerializer(serializers.ModelSerializer):

    class Meta:
        model = FightHistoric
        fields = "__all__"
