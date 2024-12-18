from django.contrib.auth.models import User
from django.db import models

# from cartel.models import Cartel

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

GENDER_CHOICES = [
    ('M', 'Masculino'),
    ('F', 'Feminino'),
]

class Athlete(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    cpf = models.CharField(unique=True, max_length=11)
    genero = models.CharField(
        max_length=1,
        choices=GENDER_CHOICES,
        default='M',
    )
    peso = models.FloatField()
    altura = models.FloatField()
    telefone = models.TextField(blank=True, null=True)
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
        default="INI",  # Definindo uma modalidade padrão, se necessário
    )

    imagem = models.ImageField(
        upload_to="athletes/", null=True, blank=True
    )  # Adiciona o campo de imagem

    def __str__(self):
        return self.nome
