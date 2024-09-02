from django.db import models
from athletes.models import Athlete  # Importe o modelo Athlete da sua app existente

class Connection(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('declined', 'Declined'),
    ]

    athlete_from = models.ForeignKey(Athlete, related_name='initiated_connections', on_delete=models.CASCADE)
    athlete_to = models.ForeignKey(Athlete, related_name='received_connections', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.athlete_from} -> {self.athlete_to} ({self.status})"
