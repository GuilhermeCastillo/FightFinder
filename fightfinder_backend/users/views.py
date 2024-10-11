from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # Recebe os dados do request para criar o usuário
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        # Valida se os campos obrigatórios foram fornecidos
        if not username or not password or not email:
            return Response({"error": "Todos os campos são obrigatórios."}, status=status.HTTP_400_BAD_REQUEST)

        # Cria o usuário
        try:
            user = User.objects.create(
                username=username,
                email=email,
                password=make_password(password)  # Garante que a senha seja criptografada
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # Gera o token JWT
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        # Retorna o token JWT na resposta
        return Response({
            'refresh': str(refresh),         # Token de refresh
            'access': access_token,          # Token de acesso
            'username': user.username
        }, status=status.HTTP_201_CREATED)
