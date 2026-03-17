
from django.urls import path

from django.urls import include

from . import views 

urlpatterns = [
    
    path('', views.login_page, name='login'),
    path('loginCheck/', views.loginCheck, name='loginCheck'),
    path('register/', views.register, name='register'),
    path('registerCheck/', views.registerCheck, name='registerCheck'),
    path("home/", views.home, name="home"),
    path('health/', views.healthier, name='healthier'),
    path('goals/', views.goals, name='goals'),
    path('challenges/', views.challenges, name='challenges'),
    path('community/', views.community, name='community'),
    path('add_flame/', views.add_flame, name='add_flame'),
    path('add_goal/', views.add_goal, name='add_goal'),
    path('remove_goal/',views.remove_goal,name='remove_goal'),
]
