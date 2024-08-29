from django.contrib import admin
from athletes.models import Athlete


@admin.register(Athlete)
class AthleteAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Athlete._meta.fields]
