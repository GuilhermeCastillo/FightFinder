import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "app.settings")
django.setup()

import random
from faker import Faker
from django.contrib.auth.models import User
from athletes.models import Athlete
from fights.models import Fight, FightHistoric
from events.models import Event, Promoter
from cartel.models import Cartel

fake = Faker()

def create_user(athlete):
    username = fake.user_name()
    password = fake.password()
    email = fake.email()
    user = User.objects.create_user(username=username, email=email, password=password)
    # Aqui você pode adicionar mais associações se necessário
    # Exemplo: user.profile.athlete = athlete
    return user, username, password

def create_athlete():
    athlete = Athlete.objects.create(
        cpf=fake.unique.random_number(digits=11, fix_len=True),
        genero=random.choice(['M', 'F']),  # Adicionando gênero
        peso=round(random.uniform(50.0, 120.0), 2),
        altura=round(random.uniform(1.50, 2.10), 2),
        telefone=fake.phone_number(),
        cidade=fake.city(),
        estado=fake.state(),
        pais=fake.country(),
        latitude=fake.latitude(),
        longitude=fake.longitude(),
        data_nascimento=fake.date_of_birth(minimum_age=18, maximum_age=40),
        nome=fake.name(),
        academia=fake.company(),
        modalidade=random.choice(
            ["BJJ", "MMA", "BOX", "MT", "JUDO", "WREST", "KARATE", "TKD", "INI"]
        ),
    )
    user, username, password = create_user(athlete)
    return athlete, user, username, password

def create_cartel(athlete):
    vitorias = random.randint(0, 10)
    derrotas = random.randint(0, 10)
    empates = random.randint(0, 5)
    lutas_disputadas = vitorias + derrotas + empates
    return Cartel.objects.create(
        atleta=athlete,
        vitorias=vitorias,
        derrotas=derrotas,
        empates=empates,
        lutas_disputadas=lutas_disputadas,
        desistencia=random.randint(0, 3),
    )

def create_promoter():
    return Promoter.objects.create(
        cpf=fake.unique.random_number(digits=11, fix_len=True),
        data_nascimento=fake.date_of_birth(minimum_age=25, maximum_age=60),
        nome=fake.name(),
    )

def create_event(promoter):
    return Event.objects.create(
        promoter=promoter,
        data_evento=fake.date_between(start_date="-1y", end_date="today"),
        nome_evento=fake.catch_phrase(),
        cidade=fake.city(),
        estado=fake.state(),
        pais=fake.country(),
        latitude=fake.latitude(),
        longitude=fake.longitude(),
        modalidade=random.choice(
            ["BJJ", "MMA", "BOX", "MT", "JUDO", "WREST", "KARATE", "TKD", "INI"]
        ),
    )

def create_fight(atleta1, atleta2):
    data_luta = fake.date_between(start_date="-1y", end_date="today")
    resultado = random.choice([0, 1, 2])
    pontuacao = random.randint(0, 100)
    fight = Fight.objects.create(
        nome_luta=f"Luta entre {atleta1.nome} e {atleta2.nome}",
        data_luta=data_luta,
        resultado=resultado,
        atleta1=atleta1,
        atleta2=atleta2,
        pontuacao=pontuacao,
    )
    # Criando histórico de lutas
    FightHistoric.objects.create(atleta=atleta1, luta=fight)
    FightHistoric.objects.create(atleta=atleta2, luta=fight)
    return fight

def seed_database(num_athletes=10, num_fights=5, num_events=3):
    athletes = []
    users_data = []

    for _ in range(num_athletes):
        athlete, user, username, password = create_athlete()
        athletes.append(athlete)
        users_data.append(f"Username: {username}, Password: {password}")

    promoters = [create_promoter() for _ in range(num_events)]
    events = [create_event(promoter) for promoter in promoters]

    for athlete in athletes:
        create_cartel(athlete)

    for _ in range(num_fights):
        atleta1, atleta2 = random.sample(athletes, 2)
        create_fight(atleta1, atleta2)

    # Salvar dados dos usuários em um arquivo txt
    with open('user_credentials.txt', 'w') as f:
        for data in users_data:
            f.write(f"{data}\n")

if __name__ == "__main__":
    seed_database(num_athletes=1000, num_fights=900, num_events=100)
