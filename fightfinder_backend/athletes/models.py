from django.db import models

class Athlete(models.Model):
    id = models.AutoField(primary_key=True)
    cpf = models.CharField(max_length=11)
    peso
    altura
    telefone
    localizacao
    data_nascimento
    nome
    academia
    modalidade
    cartel
    
    