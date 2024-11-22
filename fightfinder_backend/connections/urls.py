from django.urls import path
from .views import CreateConnectionView, UpdateConnectionView, ListConnectionsView

urlpatterns = [
    path("create/", CreateConnectionView.as_view(), name="create_connection"),
    path(
        "<int:connection_id>/update/",
        UpdateConnectionView.as_view(),
        name="update_connection",
    ),
    path('<str:cpf>/list/', ListConnectionsView.as_view(), name='list_connections')
]
