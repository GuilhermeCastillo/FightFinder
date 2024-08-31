from django.db import models
from athletes.models import Athlete


class Cartel(models.Model):
    id = models.AutoField(primary_key=True)
    vitorias = models.IntegerField()
    derrotas = models.IntegerField()
    empates = models.IntegerField()
    lutas_disputadas = models.IntegerField()
    desistencia = models.IntegerField()
    atleta = models.OneToOneField(
        Athlete, on_delete=models.PROTECT, related_name="cartel"
    )

    def __str__(self):
        return self.atleta.nome
