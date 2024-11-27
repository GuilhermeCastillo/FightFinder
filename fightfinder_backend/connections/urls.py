from django.urls import path
from .views import CreateConnectionView, UpdateConnectionView, ListConnectionsView

urlpatterns = [
    path("create/", CreateConnectionView.as_view(), name="create_connection"),
    path('connections/', ListConnectionsView.as_view(), name='list-connections'),
    path('connections/update/', UpdateConnectionView.as_view(), name='update-connection'),
]
