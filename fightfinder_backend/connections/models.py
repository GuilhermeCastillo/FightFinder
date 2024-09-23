from django.db import models
from athletes.models import Athlete  # Importe o modelo Athlete do seu projeto

class Connection(models.Model):
    atleta_from = models.ForeignKey(Athlete, related_name='connections_from', on_delete=models.CASCADE)
    atleta_to = models.ForeignKey(Athlete, related_name='connections_to', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=(('pending', 'Pending'), ('accepted', 'Accepted')), default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('atleta_from', 'atleta_to')
