from math import sqrt, radians, cos, sin, asin
from athletes.models import Athlete
from fights.models import Fight, FightHistoric
from django.db.models import Q
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.neighbors import NearestNeighbors
from sklearn.exceptions import NotFittedError
import pandas as pd


# # Função para recomendar atletas semelhantes
# def recommend_athletes(df, atleta_idx, n_recommendations=5):
#     # Convertendo os estilos de luta (coluna categórica) e gênero em variáveis binárias (One-Hot Encoding)
#     encoder = OneHotEncoder()
#     encoded_features = encoder.fit_transform(df[['modalidade', 'genero']]).toarray()
#     encoded_df = pd.DataFrame(encoded_features, columns=encoder.get_feature_names_out(['modalidade', 'genero']))

#     # Concatenando os dados codificados com o DataFrame original (exceto as colunas 'modalidade' e 'genero' originais)
#     df_encoded = pd.concat([df.drop(columns=['modalidade', 'genero', 'cpf', 'telefone', 'cidade', 'estado', 'pais', 'latitude', 'longitude', 'data_nascimento', 'academia']), encoded_df], axis=1)

#     # Normalizando os dados numéricos
#     scaler = StandardScaler()
#     df_scaled = pd.DataFrame(scaler.fit_transform(df_encoded.drop(columns=['nome'])), columns=df_encoded.columns[1:])

#     # Incluindo a coluna 'nome' para referência
#     df_scaled['nome'] = df_encoded['nome']

#     # Inicializando o modelo KNN
#     knn = NearestNeighbors(n_neighbors=5, algorithm='auto')

#     # Treinando o modelo com os dados escalados
#     knn.fit(df_scaled.drop(columns=['nome']))    
        
    
    
#     # Pegando o gênero e modalidade do atleta para filtragem
#     atleta_gender = df.iloc[atleta_idx]['genero']
#     atleta_modalidade = df.iloc[atleta_idx]['modalidade']
    
#     # Filtrando o DataFrame para incluir apenas atletas do mesmo gênero e modalidade
#     gender_filtered_df = df_scaled[
#         (df_encoded['genero_' + atleta_gender] == 1) &
#         (df_encoded['modalidade_' + atleta_modalidade] == 1)
#     ]
    
#     # Pegando as características do atleta
#     atleta_data = df_scaled.drop(columns=['nome']).iloc[atleta_idx].values.reshape(1, -1)
    
#     # Encontrando os n atletas mais próximos
#     distances, indices = knn.kneighbors(atleta_data, n_neighbors=n_recommendations+1)
    
#     # Filtrando as recomendações pelo gênero e modalidade
#     recommendations = [
#         df_scaled['nome'].iloc[i] 
#         for i in indices.flatten() 
#         if i != atleta_idx and
#            df_encoded.iloc[i]['genero_' + atleta_gender] == 1 and
#            df_encoded.iloc[i]['modalidade_' + atleta_modalidade] == 1
#     ]
    
#     return recommendations[:n_recommendations]

# Função para recomendar atletas semelhantes
def recommend_athletes(df, atleta_idx, n_recommendations=10):
    # Convertendo os estilos de luta (coluna categórica) e gênero em variáveis binárias (One-Hot Encoding)
    encoder = OneHotEncoder()
    encoded_features = encoder.fit_transform(df[['modalidade', 'genero']]).toarray()
    encoded_df = pd.DataFrame(encoded_features, columns=encoder.get_feature_names_out(['modalidade', 'genero']))

    # Concatenando os dados codificados com o DataFrame original (exceto as colunas 'modalidade' e 'genero' originais)
    df_encoded = pd.concat([df.drop(columns=['modalidade', 'genero', 'cpf', 'telefone', 'cidade', 'estado', 'pais', 'latitude', 'longitude', 'data_nascimento', 'academia']), encoded_df], axis=1)

    # Normalizando os dados numéricos
    scaler = StandardScaler()
    df_scaled = pd.DataFrame(scaler.fit_transform(df_encoded.drop(columns=['nome'])), columns=df_encoded.columns[1:])

    # Incluindo a coluna 'nome' para referência
    df_scaled['nome'] = df_encoded['nome']

    # Verificar o número de atletas disponíveis
    n_athletes = df_scaled.shape[0]

    # Se não houver atletas suficientes para recomendação, retorne uma mensagem ou lista vazia
    if n_athletes <= 1:
        return []  # Ou return {"message": "Não há atletas suficientes para recomendação"}

    # Ajustar o número de vizinhos para ser o mínimo entre o solicitado e o número de atletas disponíveis
    n_neighbors = min(n_recommendations + 1, n_athletes)

    # Inicializando o modelo KNN com o número ajustado de vizinhos
    knn = NearestNeighbors(n_neighbors=n_neighbors, algorithm='auto')

    try:
        # Treinando o modelo com os dados escalados
        knn.fit(df_scaled.drop(columns=['nome']))
    except NotFittedError:
        return []

    # Pegando o gênero e modalidade do atleta para filtragem
    atleta_gender = df.iloc[atleta_idx]['genero']
    atleta_modalidade = df.iloc[atleta_idx]['modalidade']

    # Filtrando o DataFrame para incluir apenas atletas do mesmo gênero e modalidade
    gender_filtered_df = df_scaled[
        (df_encoded['genero_' + atleta_gender] == 1) &
        (df_encoded['modalidade_' + atleta_modalidade] == 1)
    ]

    # Pegando as características do atleta
    atleta_data = df_scaled.drop(columns=['nome']).iloc[atleta_idx].values.reshape(1, -1)

    # Encontrando os n atletas mais próximos
    distances, indices = knn.kneighbors(atleta_data, n_neighbors=n_neighbors)

    # Filtrando as recomendações pelo gênero e modalidade
    recommendations = [
        df_scaled['nome'].iloc[i] 
        for i in indices.flatten() 
        if i != atleta_idx and
           df_encoded.iloc[i]['genero_' + atleta_gender] == 1 and
           df_encoded.iloc[i]['modalidade_' + atleta_modalidade] == 1
    ]

    print(recommendations)
    return recommendations[:n_recommendations]



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

