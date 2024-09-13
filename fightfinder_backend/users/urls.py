# users/urls.py
from django.urls import path
from .views import AthleteUserCreateView

urlpatterns = [
    path('register/', AthleteUserCreateView.as_view(), name='register'),
    # outras rotas...
]
