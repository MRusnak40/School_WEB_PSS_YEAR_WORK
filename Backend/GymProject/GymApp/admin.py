from django.contrib import admin
from .models import Flame, Goal, Type, Duration
# Register your models here.
admin.site.register(Flame)
admin.site.register(Goal)
admin.site.register(Type)
admin.site.register(Duration)