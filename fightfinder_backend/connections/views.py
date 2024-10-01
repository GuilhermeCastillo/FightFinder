# connections/views.py
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Connection
from .serializers import ConnectionSerializer
from athletes.models import Athlete


# View para listar as conexões do atleta
class ListConnectionsView(APIView):
    def get(self, request):
        user = request.user
        athlete = user.athlete
        connections = Connection.objects.filter(
            atleta_from=athlete
        ) | Connection.objects.filter(atleta_to=athlete)
        serializer = ConnectionSerializer(connections, many=True)
        return Response(serializer.data)


# View para aceitar uma conexão
class AcceptConnectionView(APIView):
    def post(self, request, connection_id):
        connection = Connection.objects.get(id=connection_id)

        # Verifica se o atleta logado é o destinatário da conexão
        if connection.atleta_to == request.user.athlete:
            connection.status = "accepted"
            connection.save()
            return Response(
                {"message": "Conexão aceita com sucesso!"}, status=status.HTTP_200_OK
            )

        return Response(
            {"error": "Você não tem permissão para aceitar esta conexão."},
            status=status.HTTP_403_FORBIDDEN,
        )


# View para criar conexões entre atletas recomendados
class CreateConnectionView(APIView):
    def post(self, request):
        user = request.user
        recommended_athletes = request.data.get("recommended_athletes", [])

        for recommended_name in recommended_athletes:
            try:
                recommended_athlete = Athlete.objects.get(nome=recommended_name)
                Connection.objects.create(
                    atleta_from=user.athlete,
                    atleta_to=recommended_athlete,
                    status="pending",
                )
            except Athlete.DoesNotExist:
                return Response(
                    {"error": f"Athlete {recommended_name} not found."},
                    status=status.HTTP_404_NOT_FOUND,
                )

        return Response(
            {"message": "Conexões criadas com sucesso!"}, status=status.HTTP_201_CREATED
        )
