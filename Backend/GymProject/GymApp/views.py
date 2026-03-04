from django.shortcuts import redirect, render
import django.contrib.auth
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User

from django.contrib.auth.decorators import login_required




# Create your views here.

@login_required(login_url='login')
def home(request):
    return render(request, 'index.html')

@login_required(login_url='login')
def healthier(request):
    return render(request, 'healthier.html')

@login_required(login_url='login')
def goals(request):
    return render(request, 'goals.html')

@login_required(login_url='login')
def challenges(request):
    return render(request, 'challenges.html')

@login_required(login_url='login')
def community(request):
    return render(request, 'community.html')


def login_page(request):
    return render(request, 'login.html')

def loginCheck(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user= authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            return render(request, 'login.html', {'error': 'Invalid username or password'})

    
    
def registerCheck(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        if User.objects.filter(username=username).exists():
            return render(request, 'register.html', {'error': 'Username already exists'})

        user = User.objects.create_user(username=username, password=password)
        user.save()
        return redirect('login')   

def register(request):
    return render(request, 'register.html')


def add_goal(request):
    if request.method == 'POST':
        # Získání dat z formuláře
        name = request.POST.get('name')
        type_id = request.POST.get('type')
        duration_id = request.POST.get('duration')

        # Vytvoření nové instance Goal
        goal = Goal(
            name=name,
            type_id=type_id,
            duration_id=duration_id,
            user=request.user
        )
        goal.save()

        return redirect('goals')
    
def add_flame(request):
    if request.method == 'POST':
        # Získání dat z formuláře
        count = request.POST.get('count')

        # Vytvoření nové instance Flame
        flame, created = Flame.objects.get_or_create(user=request.user)
        flame.count = count
        flame.save()

        return redirect('home')