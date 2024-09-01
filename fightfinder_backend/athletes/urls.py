from django.urls import path
from . import views

urlpatterns = [
    path(
        "athletes/", views.AthleteCreateListView.as_view(), name="athlete-create-list"
    ),
    path(
        "athletes/<int:pk>/",
        views.AthleteRetrieveUpdateDestroyView.as_view(),
        name="athlete-detail-view",
    ),
    # path('athletes/<str:cpf>/recommendations/', views.AthleteRecommendationsView.as_view(), name='athlete_recommendations'),
    path('athletes/<int:pk>/recommendations/', views.recommend_view, name='athlete_recommendations'),
]
