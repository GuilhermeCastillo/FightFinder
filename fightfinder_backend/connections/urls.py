from django.urls import path
from .views import ConnectionCreateView, ConnectionListView

urlpatterns = [
    path('connectionscreate/', ConnectionCreateView.as_view(), name='connection-create'),
    path('connectionslist/', ConnectionListView.as_view(), name='connection-list'),
]
