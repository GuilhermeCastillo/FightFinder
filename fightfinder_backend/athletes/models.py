from django.db import models

class Athlete(models.Model):
    id = models.AutoField(primary_key=True)
    cpf = models.CharField(max_length=11)
    peso = models.FloatField()
    altura = models.FloatField()
    telefone = models.CharField(max_length=15, blank=True, null=True)
    # localizacao = models.ForeignKey()
    data_nascimento = models.DateField()
    nome = models.CharField(max_length=200)
    academia = models.CharField(max_length=200)
    # modalidade = models.ForeignKey()
    # cartel = models.ForeignKey()
    
class Cartel(models.Model):
    id = models.AutoField(primary_key=True)
    data_luta = models.DateField()
    vitorias = models.IntegerField()
    derrotas = models.IntegerField()
    empates = models.IntegerField()
    lutas_disputadas = models.IntegerField()
    desistencia = models.IntegerField()
    atleta = models.ForeignKey(Athlete,
        on_delete=models.PROTECT,
        related_name='athletes')