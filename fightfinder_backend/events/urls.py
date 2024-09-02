from django.urls import path
from . import views

urlpatterns = [
    path(
        "promoters/",
        views.PromoterCreateListView.as_view(),
        name="promoters-create-list",
    ),
    path(
        "promoters/<int:pk>/",
        views.PromoterRetrieveUpdateDestroyView.as_view(),
        name="promoters-detail-view",
    ),
    path("events/", views.EventCreateListView.as_view(), name="events-create-list"),
    path(
        "events/<int:pk>/",
        views.EventRetrieveUpdateDestroyView.as_view(),
        name="events-detail-view",
    ),
]
