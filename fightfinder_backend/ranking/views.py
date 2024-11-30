from django.db.models import Count, Q
from rest_framework.views import APIView
from rest_framework.response import Response
from athletes.models import Athlete
from rest_framework.permissions import IsAuthenticated

class AthleteRankingView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # Contar conexões aceitas para cada atleta
        ranking = Athlete.objects.annotate(
            total_connections=Count(
                'sent_requests', filter=Q(sent_requests__status='accepted')
            ) + Count(
                'received_requests', filter=Q(received_requests__status='accepted')
            )
        ).order_by('-total_connections')[:10]  # Top 10 atletas com mais conexões

        # Serializar os dados
        data = [
            {
                "athlete": athlete.nome,
                "peso": athlete.peso,
                "modalidade": athlete.modalidade,
                "altura": athlete.altura,
                
                "total_connections": athlete.total_connections
            } for athlete in ranking
        ]

        return Response(data)
