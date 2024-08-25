from rest_framework import serializers
from fights.models import Fight, FightHistoric


class FightSerializer(serializers.ModelSerializer):
    vencedor = serializers.SerializerMethodField()

    class Meta:
        model = Fight
        fields = "__all__"
        
    def get_vencedor(self, obj):
        if obj.resultado == 1:
            return f"Vitória do {obj.atleta1.nome}"
        elif obj.resultado == 2:
            return f"Vitória do {obj.atleta2.nome}"
        else:
            return "Empate"        

class FightHistoricSerializer(serializers.ModelSerializer):

    class Meta:
        model = FightHistoric
        fields = "__all__"
