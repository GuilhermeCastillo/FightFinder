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

    def save(self, *args, **kwargs):
        if not self.detalhes:
            if self.luta.resultado == 1 and self.atleta == self.luta.atleta1:
                self.detalhes = f"Vitória sobre {self.luta.atleta2.nome}"
            elif self.luta.resultado == 2 and self.atleta == self.luta.atleta2:
                self.detalhes = f"Vitória sobre {self.luta.atleta1.nome}"
            elif self.luta.resultado == 1 and self.atleta == self.luta.atleta2:
                self.detalhes = f"Derrota para {self.luta.atleta1.nome}"
            elif self.luta.resultado == 2 and self.atleta == self.luta.atleta1:
                self.detalhes = f"Derrota para {self.luta.atleta2.nome}"
            else:
                self.detalhes = f"Empate com {self.luta.atleta2.nome if self.atleta == self.luta.atleta1 else self.luta.atleta1.nome}"
        super().save(*args, **kwargs)
