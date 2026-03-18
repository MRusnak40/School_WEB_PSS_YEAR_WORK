from django.shortcuts import redirect, render
import django.contrib.auth
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User 

from django.contrib.auth.decorators import login_required
from .models import Goal , Type , Duration
import json

from django.http import HttpResponse, HttpResponseNotAllowed
from django.urls import path

from .models import Flame
from . import views

import json
from django.http import JsonResponse

from django.core.validators import validate_email
from django.core.exceptions import ValidationError

# Create your views here.

@login_required(login_url='login')
def home(request):
    return render(request, 'index.html',{'count':Flame.objects.get(user=request.user).count})

@login_required(login_url='login')
def healthier(request):
    return render(request, 'healthier.html',{'count':Flame.objects.get(user=request.user).count})

@login_required(login_url='login')
def goals(request):
    print(Flame.objects.get(user=request.user).count)
    goals = list(Goal.objects.filter(user=request.user).values())
    return render(request, 'goals.html',{'count':Flame.objects.get(user=request.user).count,'goals':json.dumps(goals)})


@login_required(login_url='login')
def challenges(request):
    return render(request, 'challenges.html',{'count':Flame.objects.get(user=request.user).count})

@login_required(login_url='login')
def community(request):
    return render(request, 'community.html',{'count':Flame.objects.get(user=request.user).count})


def login_page(request):
    return render(request, 'login.html')

def loginCheck(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        if not username or not password:
            return render(request, 'register.html', {'error': 'Everything must be filled'})
        
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


    if not username or not password:
            return render(request, 'register.html', {'error': 'Everything must be filled'})

    try:
        if User.objects.filter(username=username).exists():
            return render(request, 'register.html', {'error': 'Username already exists'})

        validate_email(username)



        user = User.objects.create_user(username=username, password=password)
        Flame.objects.create(user=user, count=0)
        user.save()
        return redirect('login')   

    except ValidationError:
        return render(request, 'register.html', {'error': 'Give valid emali address.'})
        
    
    
    
    
def register(request):
    return render(request, 'register.html')



def add_goal(request):
    if request.method != 'POST':
        return HttpResponse(status=405)

    try:
        data = json.loads(request.body)
        print(data)
        name = data.get("name")
        type = Type.objects.get(id=data["type_id"])
        duration = Duration.objects.get(id=data["duration_id"])
        completed = data.get("completed")


        print("name:", name)
        print("type_id:", type)
        print("duration_id:", duration)
        print("completed:", completed)

        goal = Goal.objects.create(
            name=name,
            type=type,
            duration=duration,
            is_finished=completed,
            user=request.user
        )

        goal.save()

        return HttpResponse(status=204)
    
    except (Type.DoesNotExist, Duration.DoesNotExist):
        return JsonResponse({'error': 'That type not exists'}, status=404)
    
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
  




def add_flame(request):
    if request.method != 'POST':
        return HttpResponse(status=405)
    
    try:
      
        count=int(json.loads(request.body).get('count',0))

        # Vytvoření nové instance Flame
        flame, created = Flame.objects.get_or_create(user=request.user)
        flame.count += count
        flame.save()

        return HttpResponse(status=204)
    except Flame.DoesNotExist:
        return JsonResponse({'error': 'Goal not found'}, status=404)
    
    except Exception as e:
      
        return JsonResponse({'error': str(e)}, status=500)
        




def remove_goal(request):
    if request.method != 'POST':
        return HttpResponse(status=405)
    
    
    
    try:
        data=json.loads(request.body)
        goal_id=data.get('id')

        goal = Goal.objects.get(id=goal_id)
        goal.delete()
        
        
        return HttpResponse(status=204)
    except Goal.DoesNotExist:
        return JsonResponse({'error': 'Goal not found'}, status=404)
    
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    

   




def update_goal_status(request):
    if request.method == "POST":
        data = json.loads(request.body)
        goal_id = data.get('id')
        is_finished = data.get('is_finished')
        
        try:
            goal = Goal.objects.get(id=goal_id)
            goal.is_finished = is_finished
            goal.save()
            return JsonResponse({"status": "ok"})
        except Goal.DoesNotExist:
            return JsonResponse({"status": "error", "message": "Goal not found"}, status=404)