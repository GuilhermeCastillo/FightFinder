from django.db import models

class Connection(models.Model):
    requester = models.ForeignKey('athletes.Athlete', on_delete=models.CASCADE, related_name='sent_requests')
    requested = models.ForeignKey('athletes.Athlete', on_delete=models.CASCADE, related_name='received_requests')
    status = models.CharField(
        max_length=20,
        choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('rejected', 'Rejected')],
        default='pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('requester', 'requested')

    @staticmethod
    def are_connected(athlete_a, athlete_b):
        return Connection.objects.filter(
            (models.Q(requester=athlete_a, requested=athlete_b) | 
             models.Q(requester=athlete_b, requested=athlete_a)) & 
            models.Q(status='accepted')
        ).exists()

