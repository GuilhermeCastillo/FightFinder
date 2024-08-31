from django.contrib import admin

from fights.models import Fight, FightHistoric


@admin.register(Fight)
class FightAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Fight._meta.fields]

@admin.register(FightHistoric)
class FightHistoricAdmin(admin.ModelAdmin):
    list_display = [field.name for field in FightHistoric._meta.fields]
