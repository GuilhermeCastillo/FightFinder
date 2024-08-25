from django.db import models
from athletes.models import Athlete


RESULTADO_CHOICES = [(1, "Atleta 1"), (2, "Atleta 2"), (0, "Empate")]


class Fight(models.Model):
    id = models.AutoField(primary_key=True)
    nome_luta = models.CharField(max_length=100)
    data_luta = models.DateField()
    resultado = models.IntegerField(
        choices=[(1, "Atleta 1"), (2, "Atleta 2"), (0, "Empate")]
    )
    atleta1 = models.ForeignKey(
        Athlete, on_delete=models.PROTECT, related_name="lutas_atleta1"
    )
    atleta2 = models.ForeignKey(
        Athlete, on_delete=models.PROTECT, related_name="lutas_atleta2"
    )
    # TODO evento = models.ForeignKey()
    pontuacao = models.IntegerField()


class FightHistoric(models.Model):
    id = models.AutoField(primary_key=True)
    atleta = models.ForeignKey(
        Athlete, on_delete=models.PROTECT, related_name="historico_lutas"
    )
    luta = models.ForeignKey(Fight, on_delete=models.PROTECT)
    detalhes = models.TextField()
