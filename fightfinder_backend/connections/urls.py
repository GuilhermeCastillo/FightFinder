# connections/urls.py
from django.urls import path
from .views import ListConnectionsView, AcceptConnectionView, CreateConnectionView

urlpatterns = [
    path('connections/', ListConnectionsView.as_view(), name='list-connections'),
    path('connections/accept/<int:connection_id>/', AcceptConnectionView.as_view(), name='accept-connection'),
    path('connections/create/', CreateConnectionView.as_view(), name='create-connections'),
]
