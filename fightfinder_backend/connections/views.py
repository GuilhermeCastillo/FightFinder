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
        requested_cpf = request.data.get('requested_cpf')

        try:
            # Obter o atleta associado ao usuário logado
            requester = Athlete.objects.get(user=request.user)

            # Validar que o usuário não está tentando se conectar consigo mesmo
            if requester.cpf == requested_cpf:
                return Response({'message': 'You cannot connect with yourself'}, status=status.HTTP_400_BAD_REQUEST)

            # Obter o atleta solicitado
            requested = Athlete.objects.get(cpf=requested_cpf)

            # Verificar se já existe uma conexão entre os dois atletas (em qualquer direção)
            if Connection.objects.filter(
                models.Q(requester=requester, requested=requested) |
                models.Q(requester=requested, requested=requester)
            ).exists():
                return Response({'message': 'Connection already exists'}, status=status.HTTP_200_OK)

            # Criar uma nova solicitação de conexão
            Connection.objects.create(requester=requester, requested=requested)
            return Response({'message': 'Connection request sent'}, status=status.HTTP_201_CREATED)

        except Athlete.DoesNotExist:
            return Response({'message': 'Athlete not found'}, status=status.HTTP_404_NOT_FOUND)


class UpdateConnectionView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        requested_cpf = request.data.get('requested_cpf')
        action = request.data.get('action', 'accept')  # 'accept' ou 'reject'

        try:
            # Obter o atleta associado ao usuário logado
            requested = Athlete.objects.get(user=request.user)

            # Buscar a conexão relevante (em que o atleta logado foi solicitado)
            connection = Connection.objects.get(
                requester__cpf=requested_cpf,
                requested=requested,
                status='pending'
            )

            # Atualizar o status da conexão com base na ação
            if action == 'accept':
                connection.status = 'accepted'
                message = 'Connection accepted'
            elif action == 'reject':
                connection.status = 'rejected'
                message = 'Connection rejected'
            else:
                return Response({'message': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)

            connection.save()
            return Response({'message': message}, status=status.HTTP_200_OK)

        except Athlete.DoesNotExist:
            return Response({'message': 'Athlete profile not found'}, status=status.HTTP_404_NOT_FOUND)
        except Connection.DoesNotExist:
            return Response({'message': 'Connection not found or already responded'}, status=status.HTTP_404_NOT_FOUND)


class ListConnectionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            # Obter o atleta relacionado ao usuário logado
            athlete = Athlete.objects.get(user=request.user)

            # Buscar conexões relacionadas ao atleta
            connections = Connection.objects.filter(
                models.Q(requester=athlete) | models.Q(requested=athlete),
                status="accepted",
            )

            # Construir a resposta
            response = [
                {
                    "id": connection.id,
                    "status": connection.status,
                    "connected_with": (
                        connection.requested.nome
                        if connection.requester == athlete
                        else connection.requester.nome
                    ),
                    "connected_with_cpf": (
                        connection.requested.cpf
                        if connection.requester == athlete
                        else connection.requester.cpf
                    ),
                }
                for connection in connections
            ]

            return Response(response, status=status.HTTP_200_OK)
        except Athlete.DoesNotExist:
            return Response(
                {"message": "Athlete profile not found for the logged-in user"},
                status=status.HTTP_404_NOT_FOUND,
            )
