
from django.urls import path

from django.urls import include

from . import views 

urlpatterns = [
    
    path('home/', views.home, name='home'),
    path('health/', views.healthier, name='healthier'),
    path('goals/', views.goals, name='goals'),
    path('challenges/', views.challenges, name='challenges'),
    path('community/', views.community, name='community'),
]
