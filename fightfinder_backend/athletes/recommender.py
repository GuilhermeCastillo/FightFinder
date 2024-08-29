from math import sqrt, radians, cos, sin, asin


from athletes.models import Athlete
from fights.models import Fight, FightHistoric
from django.db.models import Q


# Função para coletar dados de um atleta específico
def get_athlete_data(athlete):
    return {
        "cpf": athlete.cpf,
        "peso": athlete.peso,
        "altura": athlete.altura,
        "modalidade": athlete.modalidade,
        "historico": list(FightHistoric.objects.filter(atleta=athlete).values()),
        "localizacao": (athlete.latitude, athlete.longitude),
    }


# Similaridade Euclidiana
def euclidean_distance(athlete1, athlete2):
    return sqrt(
        (athlete1["peso"] - athlete2["peso"]) ** 2
        + (athlete1["altura"] - athlete2["altura"]) ** 2
    )


# Similaridade Geográfica (Haversine)
def haversine(lon1, lat1, lon2, lat2):
    # converter de graus para radianos
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    # Haversine formula
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * asin(sqrt(a))
    r = 6371  # Raio da terra em km
    return c * r


def recommend_opponents(athlete, num_recommendations=5):
    athlete_data = get_athlete_data(athlete)
    all_athletes = Athlete.objects.exclude(cpf=athlete.cpf)
    recommendations = []

    for opponent in all_athletes:
        opponent_data = get_athlete_data(opponent)
        similarity_score = {
            "physical": euclidean_distance(athlete_data, opponent_data),
            "geographical": haversine(
                athlete_data["localizacao"][1],
                athlete_data["localizacao"][0],
                opponent_data["localizacao"][1],
                opponent_data["localizacao"][0],
            ),
            "modalidade": athlete_data["modalidade"] == opponent_data["modalidade"],
        }

        # Aqui, você pode ponderar diferentes aspectos de similaridade para gerar uma pontuação final.
        overall_similarity = (
            similarity_score["physical"] * 0.4
            + similarity_score["geographical"] * 0.3
            + similarity_score["modalidade"] * 0.3
        )

        recommendations.append((opponent, overall_similarity))

    # Ordenar as recomendações pela pontuação de similaridade (menor valor significa mais similar)
    recommendations.sort(key=lambda x: x[1])

    # Retornar as top N recomendações
    return [rec[0] for rec in recommendations[:num_recommendations]]


# Exemplo de uso

if __name__ == "__main__":
    recomendacoes = recommend_opponents(Athlete.objects.get(cpf=81907348694))
    for recomendacao in recomendacoes:
        print(recomendacao.nome)
