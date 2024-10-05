import requests
from faker import Faker
import json
import unidecode  # Biblioteca para remover acentuação
import re

# Crie uma instância do Faker para dados brasileiros
fake = Faker("pt_BR")  # Definindo localidade como Brasil

# URLs das rotas
register_url = (
    "http://localhost:8000/api/v1/register/"  # Altere para o endpoint correto
)
login_url = (
    "http://localhost:8000/api/v1/authentication/token/"  # URL para gerar o token (JWT)
)
profile_url = "http://localhost:8000/api/v1/complete-athlete-profile/"  # URL para completar o cadastro do atleta


# Função para salvar os dados do usuário em um arquivo txt
def save_user_to_file(username, email, password):
    with open("fake_users.txt", "a") as file:  # Abre o arquivo em modo append
        file.write(f"Username: {username}, Email: {email}, Password: {password}\n")


def get_user_token(username, password):
    login_data = {
        "username": username,
        "password": password
    }
    
    # Enviar requisição para obter o token
    response = requests.post(login_url, json=login_data)
        
    if response.status_code == 200:
        try:
            return response.json().get("access")
        except requests.exceptions.JSONDecodeError:
            print("Falha ao decodificar a resposta JSON.")
            return None
    else:
        print(f"Falha ao gerar token para {username}. Status: {response.status_code}")
        return None

def complete_user_profile(token):
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    # Gerar CPF sem caracteres especiais (somente números)
    cpf = fake.cpf().replace(".", "").replace("-", "")

    # Selecionar gênero aleatoriamente entre 'M' ou 'F'
    genero = fake.random_element(elements=("M", "F"))

    # Gerar telefone sem acentuação e com no máximo 15 caracteres
    telefone = re.sub(r'\D', '', fake.phone_number())[:15] 
    print(telefone)

    # Dados fictícios do perfil do atleta
    athlete_data = {
        "cpf": cpf,  # CPF sem caracteres especiais
        "genero": genero,
        "peso": 80,
        "altura": 1.75,
        "telefone": telefone,
        "cidade": unidecode.unidecode("São Paulo"),  # Remover acentuação da cidade
        "estado": "SP",
        "pais": "Brasil",
        "data_nascimento": "1990-05-15",
        "nome": unidecode.unidecode(fake.name()),  # Remover acentuação do nome
        "academia": "Academia de Lutas São Paulo",
        "modalidade": "BJJ",
    }

    # Enviar requisição para completar o cadastro do atleta
    response = requests.post(profile_url, headers=headers, json=athlete_data)

    # Verificar o status da resposta e exibir o conteúdo
    print(f"Status Code: {response.status_code}")
    print(f"Response Text: {response.text}")

    if response.status_code in [200, 201]:
        print(f"Perfil de atleta criado com sucesso!")
    else:
        print(f"Falha ao completar perfil. Status: {response.status_code}")
        print(f"Erro: {response}")  # Mostrar erro detalhado da resposta JSON (se houver)


# Função para gerar um usuário, obter o token e completar o perfil
def create_fake_user():
    username = fake.user_name()
    password = fake.password(length=10)
    email = fake.email()

    # Dados para a requisição de registro
    user_data = {
        "username": username,
        "password": password,
        "password2": password,  # Confirmação da senha
        "email": email,
    }

    # Enviar a requisição POST para registrar o usuário
    response = requests.post(register_url, json=user_data)

    if response.status_code == 201:
        print(f"Usuário {username} criado com sucesso!")
        save_user_to_file(username, email, password)

        # Gerar token JWT para o usuário
        token = get_user_token(username, password)
        if token:
            # Completar o cadastro do atleta com o token
            complete_user_profile(token)
    else:
        print(f"Falha ao criar usuário {username}. Status: {response.status_code}")


# Criar múltiplos usuários e completar o perfil de cada um
def seed_users(n):
    for _ in range(n):
        create_fake_user()


# Executar para criar 10 usuários e completar o perfil de cada um
seed_users(10)
