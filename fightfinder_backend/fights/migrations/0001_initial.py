# Generated by Django 5.1 on 2024-09-23 17:58

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('athletes', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Fight',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nome_luta', models.CharField(max_length=100)),
                ('data_luta', models.DateField()),
                ('resultado', models.IntegerField(choices=[(1, 'Atleta 1'), (2, 'Atleta 2'), (0, 'Empate')])),
                ('pontuacao', models.IntegerField()),
                ('atleta1', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='lutas_atleta1', to='athletes.athlete')),
                ('atleta2', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='lutas_atleta2', to='athletes.athlete')),
            ],
        ),
        migrations.CreateModel(
            name='FightHistoric',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('detalhes', models.TextField()),
                ('atleta', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='historico_lutas', to='athletes.athlete')),
                ('luta', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='fights.fight')),
            ],
        ),
    ]
