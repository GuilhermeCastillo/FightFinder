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
