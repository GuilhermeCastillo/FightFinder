import uuid
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


class Promoter(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    cpf = models.CharField(primary_key=True, max_length=11)
    data_nascimento = models.DateField()
    nome = models.CharField(max_length=200)


class Event(models.Model):
    promoter = models.ForeignKey(
        Promoter, on_delete=models.CASCADE, related_name="eventos"
    )
    data_evento = models.DateField()
    nome_evento = models.CharField(max_length=255)
    cidade = models.CharField(max_length=100)
    estado = models.CharField(max_length=100)
    pais = models.CharField(max_length=100)
    latitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )
    longitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )
    modalidade = models.CharField(
        max_length=10,
        choices=MODALITIES_CHOICES,
        default="INI",
    )
