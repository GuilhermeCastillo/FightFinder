atletas = [
    {"nome": "João", "peso": 70, "categoria": "Boxe", "cidade": "São Paulo"},
    {"nome": "Maria", "peso": 65, "categoria": "Jiu-Jitsu", "cidade": "Rio de Janeiro"},
    {"nome": "Pedro", "peso": 70, "categoria": "Boxe", "cidade": "São Paulo"},
    {"nome": "Maria", "peso": 70, "categoria": "Boxe", "cidade": "São Paulo"},
    {"nome": "Joana", "peso": 70, "categoria": "Boxe", "cidade": "São Paulo"},
    # Adicione mais atletas aqui
]


def conectar_atletas(atletas):
    conexoes = []
    for i in range(len(atletas)):
        for j in range(i + 1, len(atletas)):
            if atletas[i]["categoria"] == atletas[j]["categoria"]:
                conexoes.append((atletas[i]["nome"], atletas[j]["nome"]))
    return conexoes


# Exemplo de uso:
conexoes = conectar_atletas(atletas)
print(conexoes)