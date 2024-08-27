# Generated by Django 5.1 on 2024-08-27 00:45

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('athletes', '0001_initial'),
        ('cartel', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='athlete',
            name='cartel',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='athlete', to='cartel.cartel'),
        ),
    ]
