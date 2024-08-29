from django.contrib import admin
from cartel.models import Cartel


@admin.register(Cartel)
class CartelAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Cartel._meta.fields]
