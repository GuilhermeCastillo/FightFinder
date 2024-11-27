from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from athletes.models import Athlete
from athletes.serializers import AthleteSerializer
from uuid import uuid4
from django.test import TestCase
from connections.models import Connection

class RecommendationTestCase(TestCase):
    def setUp(self):
        # Crie atletas fictícios
        self.atleta1 = Athlete.objects.create(
            cpf="11111111111", nome="Atleta 1", genero="Masculino", modalidade="Boxe",
            peso=75, altura=175, latitude=-23.55052, longitude=-46.633308
        )
        self.atleta2 = Athlete.objects.create(
            cpf="22222222222", nome="Atleta 2", genero="Masculino", modalidade="Boxe",
            peso=78, altura=180, latitude=-23.55052, longitude=-46.633308
        )
        self.atleta3 = Athlete.objects.create(
            cpf="33333333333", nome="Atleta 3", genero="Masculino", modalidade="Boxe",
            peso=72, altura=170, latitude=-23.55052, longitude=-46.633308
        )

        # Crie conexões
        Connection.objects.create(requester=self.atleta1, requested=self.atleta2, status="accepted")

    def test_recommendations_exclude_connected(self):
        # Teste a lógica de recomendações
        recommendations = recommend_opponents(self.atleta1, num_recommendations=2)

        # Verifique se o atleta conectado não aparece
        recommendation_cpfs = [rec.cpf for rec in recommendations]
        self.assertNotIn("22222222222", recommendation_cpfs)

        # Verifique se os outros atletas aparecem
        self.assertIn("33333333333", recommendation_cpfs)



# class AthleteTests(APITestCase):

#     def setUp(self):
#         # Cria um atleta para ser usado nos testes
#         self.athlete = Athlete.objects.create(
#             uuid=uuid4(),
#             cpf="49551307801",
#             peso=70.5,
#             altura=1.75,
#             cidade="São Paulo",
#             estado="SP",
#             pais="Brasil",
#             nome="João Silva",
#             data_nascimento="1990-01-01",
#             modalidade="MMA",
#         )
#         self.url_list = reverse(
#             "athlete-create-list"
#         )  # URL para listar e criar atletas
#         self.url_detail = reverse(
#             "athlete-detail-view", kwargs={"uuid": self.athlete.uuid}
#         )  # URL para detalhes, atualizar e deletar atleta

#     def test_create_athlete(self):
#         # Testa a criação de um novo atleta
#         data = {
#             "cpf": "12345678901",
#             "peso": 80.0,
#             "altura": 1.80,
#             "cidade": "Rio de Janeiro",
#             "estado": "RJ",
#             "pais": "Brasil",
#             "nome": "Carlos Pereira",
#             "data_nascimento": "1985-05-05",
#             "modalidade": "BOX",
#         }
#         response = self.client.post(self.url_list, data, format="json")
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(response.data["nome"], data["nome"])

#     def test_get_athlete_list(self):
#         # Testa a listagem de atletas com filtros
#         response = self.client.get(
#             self.url_list,
#             {
#                 "peso_min": 60,
#                 "peso_max": 90,
#                 "idade_min": 30,
#                 "idade_max": 40,
#                 "modalidade": "MMA",
#             },
#         )
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertGreater(len(response.data), 0)  # Assegura que a lista não está vazia

#     def test_get_athlete_detail(self):
#         # Testa a obtenção dos detalhes de um atleta específico
#         response = self.client.get(self.url_detail)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(response.data["nome"], self.athlete.nome)

#     def test_update_athlete(self):
#         data = {
#             "peso": 85.0,
#             "altura": 1.85,
#             "cidade": "Curitiba",
#             "estado": "PR"
#         }
#         response = self.client.patch(self.url_detail, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.athlete.refresh_from_db()  # Atualiza o objeto do banco de dados
#         self.assertEqual(self.athlete.peso, data['peso'])
#         self.assertEqual(self.athlete.cidade, data['cidade'])


#     def test_delete_athlete(self):
#         # Testa a exclusão de um atleta
#         response = self.client.delete(self.url_detail)
#         self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
#         # Verifica se o atleta foi realmente excluído
#         response = self.client.get(self.url_detail)
#         self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # def test_get_recommendations(self):
    #     # Testa a obtenção de recomendações para um atleta específico
    #     url_recommendations = reverse(
    #         "athlete_recommendations", kwargs={"cpf": self.athlete.cpf}
    #     )
    #     response = self.client.get(url_recommendations)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     # Verifica se a resposta contém as recomendações esperadas
    #     self.assertIn(
    #         "recommendations", response.data
    #     )  # Ajuste conforme a estrutura da resposta
