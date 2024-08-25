from django.urls import path
from . import views

urlpatterns = [
    path(
        "fights/", views.FightCreateListView.as_view(), name="fight-create-list"
    ),
    path(
        "fights/<int:pk>/",
        views.FightRetrieveUpdateDestroyView.as_view(),
        name="fight-detail-view",
    ),
    path(
        "historic/", views.FightHistoricCreateListView.as_view(), name="historic-create-list"
    ),
    path(
        "historic/<int:pk>/",
        views.FightHistoricRetrieveUpdateDestroyView.as_view(),
        name="historic-detail-view",
    ),
]
