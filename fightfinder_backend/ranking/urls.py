from django.urls import path
from .views import AthleteRankingView

urlpatterns = [
    path('ranking/', AthleteRankingView.as_view(), name='athlete-ranking'),
]
