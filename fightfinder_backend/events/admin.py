from django.contrib import admin
from events.models import Promoter, Event

@admin.register(Promoter)
class PromoterAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Promoter._meta.fields]

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Event._meta.fields]
