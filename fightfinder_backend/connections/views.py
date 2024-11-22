from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from athletes.models import Athlete
from connections.models import Connection
from django.db import models
from rest_framework.permissions import IsAuthenticated

class CreateConnectionView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        requester_cpf = request.data.get('requester_cpf')
        requested_cpf = request.data.get('requested_cpf')

        try:
            requester = Athlete.objects.get(cpf=requester_cpf)
            requested = Athlete.objects.get(cpf=requested_cpf)

            # Verificar se a conexão já existe
            if Connection.objects.filter(requester=requester, requested=requested).exists():
                return Response({'message': 'Connection already exists'}, status=status.HTTP_400_BAD_REQUEST)

            # Criar uma nova solicitação de conexão
            Connection.objects.create(requester=requester, requested=requested)
            return Response({'message': 'Connection request sent'}, status=status.HTTP_201_CREATED)

        except Athlete.DoesNotExist:
            return Response({'message': 'Athlete not found'}, status=status.HTTP_404_NOT_FOUND)

# class UpdateConnectionView(APIView):
#     permission_classes = [IsAuthenticated]
#     def patch(self, request, connection_id):
#         status_update = request.data.get('status')  # 'accepted' ou 'rejected'

#         try:
#             connection = Connection.objects.get(id=connection_id)

#             if connection.status != 'pending':
#                 return Response({'message': 'Connection already responded'}, status=status.HTTP_400_BAD_REQUEST)

#             connection.status = status_update
#             connection.save()

#             return Response({'message': f'Connection {status_update}'}, status=status.HTTP_200_OK)

#         except Connection.DoesNotExist:
#             return Response({'message': 'Connection not found'}, status=status.HTTP_404_NOT_FOUND)

class UpdateConnectionView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        requester_cpf = request.data.get('requester_cpf')
        requested_cpf = request.data.get('requested_cpf')
        status_update = request.data.get('status')  # 'accepted' ou 'rejected'

        # Validação básica
        if not requester_cpf or not requested_cpf or not status_update:
            return Response({'message': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Buscar a conexão correspondente
            connection = Connection.objects.get(
                requester__cpf=requester_cpf,
                requested__cpf=requested_cpf,
                status='pending'  # Apenas conexões pendentes podem ser atualizadas
            )

            # Atualizar o status da conexão
            connection.status = status_update
            connection.save()

            return Response({'message': f'Connection {status_update}'}, status=status.HTTP_200_OK)

        except Connection.DoesNotExist:
            return Response({'message': 'Connection not found or already responded'}, status=status.HTTP_404_NOT_FOUND)

class ListConnectionsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, cpf):
        athlete = Athlete.objects.get(cpf=cpf)
        connections = Connection.objects.filter(
            models.Q(requester=athlete) | models.Q(requested=athlete),
            status='accepted'
        )
        response = [
            {
                'id': connection.id,
                'status': connection.status,
                'connected_with': connection.requested.nome if connection.requester == athlete else connection.requester.nome,
            }
            for connection in connections
        ]
        return Response(response, status=status.HTTP_200_OK)

