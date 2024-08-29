from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include("athletes.urls")),
    path("api/v1/", include("fights.urls")),
    path("api/v1/", include("cartel.urls")),
    path("api/v1/", include("events.urls")),
]
