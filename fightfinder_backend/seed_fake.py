import os
import django
import random
from faker import Faker

# Configurando o ambiente Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')
django.setup()

from athletes.models import Athlete
from cartel.models import Cartel
from fights.models import Fight, FightHistoric

# Inicializando Faker
fake = Faker('pt_BR')

# Lista de modalidades disponíveis
modalities = [
    "BJJ", "MMA", "BOX", "MT", "JUDO",
    "WREST", "KARATE", "TKD", "INI"
]

def create_athletes(n=10):
    athletes = []
    for _ in range(n):
        cpf = fake.cpf()
        peso = round(random.uniform(50, 120), 2)  # Peso entre 50kg e 120kg
        altura = round(random.uniform(1.5, 2.0), 2)  # Altura entre 1.5m e 2.0m
        telefone = fake.phone_number()
        cidade = fake.city()
        estado = fake.state()
        pais = fake.country()
        latitude = round(random.uniform(-90, 90), 6)
        longitude = round(random.uniform(-180, 180), 6)
        data_nascimento = fake.date_of_birth(minimum_age=18, maximum_age=40)
        nome = fake.name()
        academia = fake.company()
        modalidade = random.choice(modalities)

        # Criar e salvar o atleta
        athlete = Athlete(
            cpf=cpf,
            peso=peso,
            altura=altura,
            telefone=telefone,
            cidade=cidade,
            estado=estado,
            pais=pais,
            latitude=latitude,
            longitude=longitude,
            data_nascimento=data_nascimento,
            nome=nome,
            academia=academia,
            modalidade=modalidade
        )
        athlete.save()
        athletes.append(athlete)

    return athletes

def create_cartel(athlete):
    vitorias = random.randint(0, 10)
    derrotas = random.randint(0, 10)
    empates = random.randint(0, 5)
    lutas_disputadas = vitorias + derrotas + empates
    desistencia = random.randint(0, 2)

    # Criar e salvar o cartel
    cartel = Cartel(
        vitorias=vitorias,
        derrotas=derrotas,
        empates=empates,
        lutas_disputadas=lutas_disputadas,
        desistencia=desistencia
    )
    cartel.save()

    # Associar o Cartel ao atleta
    athlete.cartel = cartel
    athlete.save()

def create_fights(athletes):
    fights = []
    for _ in range(len(athletes) // 2):  # Criando lutas entre pares de atletas
        atleta1 = random.choice(athletes)
        atleta2 = random.choice([a for a in athletes if a != atleta1])
        nome_luta = f"Luta {atleta1.nome} vs {atleta2.nome}"
        data_luta = fake.date_this_decade()
        resultado = random.choice([1, 2, 0])  # 1 para Atleta 1, 2 para Atleta 2, 0 para empate
        pontuacao = random.randint(0, 100)

        fight = Fight(
            nome_luta=nome_luta,
            data_luta=data_luta,
            atleta1=atleta1,
            atleta2=atleta2,
            resultado=resultado,
            pontuacao=pontuacao
        )
        fight.save()
        fights.append(fight)

    return fights

def create_fight_historic(fights):
    for fight in fights:
        # Gera histórico para o atleta 1
        FightHistoric.objects.create(
            atleta=fight.atleta1,
            luta=fight,
            detalhes=generate_details(fight, fight.atleta1)
        )

        # Gera histórico para o atleta 2
        FightHistoric.objects.create(
            atleta=fight.atleta2,
            luta=fight,
            detalhes=generate_details(fight, fight.atleta2)
        )

def generate_details(fight, atleta):
    if fight.resultado == 1:
        return f"Vitória sobre {fight.atleta2.nome}" if atleta == fight.atleta1 else f"Derrota para {fight.atleta1.nome}"
    elif fight.resultado == 2:
        return f"Vitória sobre {fight.atleta1.nome}" if atleta == fight.atleta2 else f"Derrota para {fight.atleta2.nome}"
    else:
        return f"Empate com {fight.atleta2.nome}" if atleta == fight.atleta1 else f"Empate com {fight.atleta1.nome}"

def seed_database(n=10):
    athletes = create_athletes(n)
    for athlete in athletes:
        create_cartel(athlete)

    fights = create_fights(athletes)
    create_fight_historic(fights)

    print(f"Seed de {n} atletas e lutas relacionadas criado com sucesso!")

# Especifica quantos atletas você quer criar
seed_database(n=50)
