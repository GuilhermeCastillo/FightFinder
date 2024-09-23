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
    # path('athletes/<int:pk>/recommendations/', views.recommend_view, name='athlete_recommendations'),
    # path('recommendations/<int:pk>/', views.recommend_view, name='recommend-view'),
    path('recommend/', views.RecommendForAuthenticatedUserView.as_view(), name='recommend_for_user'),
    path('athletes/connections/', views.AthleteConnectionsListView.as_view(), name='athlete-connections'),
    path('athlete-profile-status/', views.CheckAthleteProfileView.as_view(), name='athlete_profile_status'),
    path('complete-athlete-profile/', views.CompleteAthleteProfileView.as_view(), name='complete_athlete_profile'),
]
