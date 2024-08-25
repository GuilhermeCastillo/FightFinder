from django.db import models

MODALITIES_CHOICES = [
    ("BJJ", "Brazilian Jiu-Jitsu"),
    ("MMA", "Mixed Martial Arts"),
    ("BOX", "Boxing"),
    ("MT", "Muay Thai"),
    ("JUDO", "Judo"),
    ("WREST", "Wrestling"),
    ("KARATE", "Karate"),
    ("TKD", "Taekwondo"),
    ("INI", "Iniciante"),
]


class Athlete(models.Model):
    id = models.AutoField(primary_key=True)
    cpf = models.CharField(max_length=11)
    peso = models.FloatField()
    altura = models.FloatField()
    telefone = models.CharField(max_length=15, blank=True, null=True)
    cidade = models.CharField(max_length=100)
    estado = models.CharField(max_length=100)
    pais = models.CharField(max_length=100)
    latitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )
    longitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )
    data_nascimento = models.DateField()
    nome = models.CharField(max_length=200)
    academia = models.CharField(max_length=200, null=True, blank=True)
    modalidade = models.CharField(
        max_length=10,
        choices=MODALITIES_CHOICES,
        default='INI',  # Definindo uma modalidade padrão, se necessário
    )

    # cartel = models.ForeignKey()
