from django.contrib import admin

from fights.models import Fight


@admin.register(Fight)
class FightAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Fight._meta.fields]
