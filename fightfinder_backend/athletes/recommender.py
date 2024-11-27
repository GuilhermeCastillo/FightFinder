from math import sqrt, radians, cos, sin, asin
from athletes.models import Athlete
from fights.models import Fight, FightHistoric
from django.db.models import Q
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.neighbors import NearestNeighbors
from sklearn.exceptions import NotFittedError
from connections.models import Connection
import pandas as pd

# Função para recomendar atletas semelhantes
# def recommend_athletes(df, atleta_idx, n_recommendations=10):
#     # Convertendo os estilos de luta (coluna categórica) e gênero em variáveis binárias (One-Hot Encoding)
#     encoder = OneHotEncoder()
#     encoded_features = encoder.fit_transform(df[["modalidade", "genero"]]).toarray()
#     encoded_df = pd.DataFrame(
#         encoded_features,
#         columns=encoder.get_feature_names_out(["modalidade", "genero"]),
#     )

#     # Concatenando os dados codificados com o DataFrame original (exceto as colunas 'modalidade' e 'genero' originais)
#     df_encoded = pd.concat(
#         [
#             df.drop(
#                 columns=[
#                     "modalidade",
#                     "genero",
#                     "cpf",
#                     "telefone",
#                     "cidade",
#                     "estado",
#                     "pais",
#                     "latitude",
#                     "longitude",
#                     "data_nascimento",
#                     "academia",
#                 ]
#             ),
#             encoded_df,
#         ],
#         axis=1,
#     )

#     # Normalizando os dados numéricos
#     scaler = StandardScaler()
#     df_scaled = pd.DataFrame(
#         scaler.fit_transform(df_encoded.drop(columns=["nome"])),
#         columns=df_encoded.columns[1:],
#     )

#     # Incluindo a coluna 'nome' para referência
#     df_scaled["nome"] = df_encoded["nome"]

#     # Verificar o número de atletas disponíveis
#     n_athletes = df_scaled.shape[0]

#     # Se não houver atletas suficientes para recomendação, retorne uma mensagem ou lista vazia
#     if n_athletes <= 1:
#         return (
#             []
#         )  # Ou return {"message": "Não há atletas suficientes para recomendação"}

#     # Ajustar o número de vizinhos para ser o mínimo entre o solicitado e o número de atletas disponíveis
#     n_neighbors = min(n_recommendations + 1, n_athletes)

#     # Inicializando o modelo KNN com o número ajustado de vizinhos
#     knn = NearestNeighbors(n_neighbors=n_neighbors, algorithm="auto")

#     try:
#         # Treinando o modelo com os dados escalados
#         knn.fit(df_scaled.drop(columns=["nome"]))
#     except NotFittedError:
#         return []

#     # Pegando o gênero e modalidade do atleta para filtragem
#     atleta_gender = df.iloc[atleta_idx]["genero"]
#     atleta_modalidade = df.iloc[atleta_idx]["modalidade"]

#     # Filtrando o DataFrame para incluir apenas atletas do mesmo gênero e modalidade
#     gender_filtered_df = df_scaled[
#         (df_encoded["genero_" + atleta_gender] == 1)
#         & (df_encoded["modalidade_" + atleta_modalidade] == 1)
#     ]

#     # Pegando as características do atleta
#     atleta_data = (
#         df_scaled.drop(columns=["nome"]).iloc[atleta_idx].values.reshape(1, -1)
#     )

#     # Encontrando os n atletas mais próximos
#     distances, indices = knn.kneighbors(atleta_data, n_neighbors=n_neighbors)

#     # Filtrando as recomendações pelo gênero e modalidade
#     recommendations = [
#         df_scaled["nome"].iloc[i]
#         for i in indices.flatten()
#         if i != atleta_idx  # Garantir que o próprio atleta não seja recomendado
#         and df_encoded.iloc[i]["genero_" + atleta_gender] == 1
#         and df_encoded.iloc[i]["modalidade_" + atleta_modalidade] == 1
#     ]

#     # Aqui vamos excluir atletas que já estão conectados com o atleta autenticado
#     athlete_cpf = df.iloc[atleta_idx]["cpf"]
#     connected_athletes = Connection.objects.filter(
#         Q(requester__cpf=athlete_cpf, status="accepted") |
#         Q(requested__cpf=athlete_cpf, status="accepted")
#     ).values_list('requester__cpf', 'requested__cpf')

#     # Converter a lista de conexões para uma lista de CPFs conectados
#     connected_cpfs = [
#         cpf for connection in connected_athletes for cpf in connection if cpf != athlete_cpf
#     ]

#     # Excluir atletas conectados
#     recommendations = [
#         athlete_name for athlete_name in recommendations
#         if df[df["nome"] == athlete_name]["cpf"].iloc[0] not in connected_cpfs
#     ]

#     print(recommendations)
#     return recommendations[:n_recommendations]

def recommend_athletes(df, atleta_idx, n_recommendations=10):
    # Convertendo os estilos de luta (coluna categórica) e gênero em variáveis binárias (One-Hot Encoding)
    encoder = OneHotEncoder()
    encoded_features = encoder.fit_transform(df[["modalidade", "genero"]]).toarray()
    encoded_df = pd.DataFrame(
        encoded_features,
        columns=encoder.get_feature_names_out(["modalidade", "genero"]),
    )

    # Concatenando os dados codificados com o DataFrame original (exceto as colunas 'modalidade' e 'genero' originais)
    df_encoded = pd.concat(
        [
            df.drop(
                columns=[
                    "modalidade",
                    "genero",
                    "cpf",
                    "telefone",
                    "cidade",
                    "estado",
                    "pais",
                    "latitude",
                    "longitude",
                    "data_nascimento",
                    "academia",
                ]
            ),
            encoded_df,
        ],
        axis=1,
    )

    # Normalizando os dados numéricos
    scaler = StandardScaler()
    df_scaled = pd.DataFrame(
        scaler.fit_transform(df_encoded.drop(columns=["nome"])),
        columns=df_encoded.columns[1:],
    )

    # Incluindo a coluna 'nome' para referência
    df_scaled["nome"] = df_encoded["nome"]

    # Verificar o número de atletas disponíveis
    n_athletes = df_scaled.shape[0]

    # Se não houver atletas suficientes para recomendação, retorne uma mensagem ou lista vazia
    if n_athletes <= 1:
        return (
            []
        )  # Ou return {"message": "Não há atletas suficientes para recomendação"}

    # Ajustar o número de vizinhos para ser o mínimo entre o solicitado e o número de atletas disponíveis
    n_neighbors = min(n_recommendations + 1, n_athletes)

    # Inicializando o modelo KNN com o número ajustado de vizinhos
    knn = NearestNeighbors(n_neighbors=n_neighbors, algorithm="auto")

    try:
        # Treinando o modelo com os dados escalados
        knn.fit(df_scaled.drop(columns=["nome"]))
    except NotFittedError:
        return []

    # Pegando o gênero e modalidade do atleta para filtragem
    atleta_gender = df.iloc[atleta_idx]["genero"]
    atleta_modalidade = df.iloc[atleta_idx]["modalidade"]

    # Filtrando o DataFrame para incluir apenas atletas do mesmo gênero e modalidade
    gender_filtered_df = df_scaled[
        (df_encoded["genero_" + atleta_gender] == 1)
        & (df_encoded["modalidade_" + atleta_modalidade] == 1)
    ]

    # Pegando as características do atleta
    atleta_data = (
        df_scaled.drop(columns=["nome"]).iloc[atleta_idx].values.reshape(1, -1)
    )

    # Encontrando os n atletas mais próximos
    distances, indices = knn.kneighbors(atleta_data, n_neighbors=n_neighbors)

    # Filtrando as recomendações pelo gênero e modalidade
    recommendations = [
        df_scaled["nome"].iloc[i]
        for i in indices.flatten()
        if i != atleta_idx  # Garantir que o próprio atleta não seja recomendado
        and df_encoded.iloc[i]["genero_" + atleta_gender] == 1
        and df_encoded.iloc[i]["modalidade_" + atleta_modalidade] == 1
    ]

    # Aqui vamos excluir atletas que já estão conectados com o atleta autenticado
    athlete_cpf = df.iloc[atleta_idx]["cpf"]
    connected_athletes = Connection.objects.filter(
        Q(requester__cpf=athlete_cpf, status="accepted") |
        Q(requested__cpf=athlete_cpf, status="accepted")
    ).values_list('requester__cpf', 'requested__cpf')

    # Converter a lista de conexões para uma lista de CPFs conectados
    connected_cpfs = [
        cpf for connection in connected_athletes for cpf in connection if cpf != athlete_cpf
    ]

    # Excluir atletas conectados
    recommendations = [
        athlete_name for athlete_name in recommendations
        if df[df["nome"] == athlete_name]["cpf"].iloc[0] not in connected_cpfs
    ]

    # Garantir que o atleta X que enviou solicitação de conexão para o atleta Y seja incluído
    requested_athletes = Connection.objects.filter(
        requester__cpf=df.iloc[atleta_idx]["cpf"], status="pending"
    )

    # Incluir todos os atletas que o atleta X (atleta_idx) enviou solicitação de conexão
    for athlete in requested_athletes:
        requested_athlete_name = athlete.requested.nome
        if requested_athlete_name not in recommendations:
            recommendations.insert(0, requested_athlete_name)  # Adiciona no topo da lista

    print(recommendations)
    return recommendations[:n_recommendations]
