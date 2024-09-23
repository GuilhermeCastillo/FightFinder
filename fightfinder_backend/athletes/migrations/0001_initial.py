# Generated by Django 5.1 on 2024-09-23 17:58

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Athlete',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('cpf', models.CharField(max_length=11, unique=True)),
                ('genero', models.CharField(choices=[('M', 'Masculino'), ('F', 'Feminino')], default='M', max_length=1)),
                ('peso', models.FloatField()),
                ('altura', models.FloatField()),
                ('telefone', models.CharField(blank=True, max_length=15, null=True)),
                ('cidade', models.CharField(max_length=100)),
                ('estado', models.CharField(max_length=100)),
                ('pais', models.CharField(max_length=100)),
                ('latitude', models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True)),
                ('longitude', models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True)),
                ('data_nascimento', models.DateField()),
                ('nome', models.CharField(max_length=200)),
                ('academia', models.CharField(blank=True, max_length=200, null=True)),
                ('modalidade', models.CharField(choices=[('BJJ', 'Brazilian Jiu-Jitsu'), ('MMA', 'Mixed Martial Arts'), ('BOX', 'Boxing'), ('MT', 'Muay Thai'), ('JUDO', 'Judo'), ('WREST', 'Wrestling'), ('KARATE', 'Karate'), ('TKD', 'Taekwondo'), ('INI', 'Iniciante')], default='INI', max_length=10)),
                ('imagem', models.ImageField(blank=True, null=True, upload_to='athletes/')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
