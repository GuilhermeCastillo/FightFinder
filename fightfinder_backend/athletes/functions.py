import pandas as pd
from datetime import date
from .models import Athlete

def calcular_idade(data_nascimento):
    today = date.today()
    return (
        today.year
        - data_nascimento.year
        - ((today.month, today.day) < (data_nascimento.month, data_nascimento.day))
    )

def convert_to_dataframe():
    athletes = Athlete.objects.all()
    athlete_data = []
    for athlete in athletes:
        athlete_data.append({
            'cpf': athlete.cpf,
            'genero': athlete.genero,
            'peso': athlete.peso,
            'altura': athlete.altura,
            'telefone': athlete.telefone,
            'cidade': athlete.cidade,
            'estado': athlete.estado,
            'pais': athlete.pais,
            'latitude': athlete.latitude,
            'longitude': athlete.longitude,
            'data_nascimento': athlete.data_nascimento,
            'nome': athlete.nome,
            'academia': athlete.academia,
            'modalidade': athlete.modalidade,
            'vitorias': athlete.cartel.vitorias if hasattr(athlete, 'cartel') else 0,
            'derrotas': athlete.cartel.derrotas if hasattr(athlete, 'cartel') else 0,
            'empates': athlete.cartel.empates if hasattr(athlete, 'cartel') else 0,
            'lutas_disputadas': athlete.cartel.lutas_disputadas if hasattr(athlete, 'cartel') else 0,
            'desistencia': athlete.cartel.desistencia if hasattr(athlete, 'cartel') else 0,
        })

    return pd.DataFrame(athlete_data)