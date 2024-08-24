from django.db import models
from athletes.models import Athlete


class Fight(models.Model):
    id = models.AutoField(primary_key=True)
    resultado = models.CharField(max_length=100)
    atleta1 = models.ForeignKey(
        Athlete, on_delete=models.PROTECT, related_name="lutas_atleta1"
    )
    atleta2 = models.ForeignKey(Athlete, on_delete=models.PROTECT, related_name="lutas_atleta2")
    # TODO evento = models.ForeignKey() 
    pontuacao = models.IntegerField()

class FightHistoric(models.Model):
    id = models.AutoField(primary_key=True)
    atleta = models.ForeignKey(Athlete, on_delete=models.PROTECT, related_name="historico_lutas")
    luta = models.ForeignKey(Fight, on_delete=models.PROTECT)
    detalhes = models.TextField()