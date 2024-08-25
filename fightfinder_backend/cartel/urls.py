from django.urls import path
from . import views

urlpatterns = [
    path(
        "cartel/", views.CartelCreateListView.as_view(), name="cartel-create-list"
    ),
    path(
        "cartel/<int:pk>/",
        views.CartelRetrieveUpdateDestroyView.as_view(),
        name="cartel-detail-view",
    ),
]
