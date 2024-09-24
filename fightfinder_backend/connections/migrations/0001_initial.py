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
            name='Connection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('accepted', 'Accepted')], default='pending', max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('atleta_from', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='connections_from', to='athletes.athlete')),
                ('atleta_to', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='connections_to', to='athletes.athlete')),
            ],
            options={
                'unique_together': {('atleta_from', 'atleta_to')},
            },
        ),
    ]
