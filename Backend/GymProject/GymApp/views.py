from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'index.html')

def healthier(request):
    return render(request, 'healthier.html')

def goals(request):
    return render(request, 'goals.html')

def challenges(request):
    return render(request, 'challenges.html')

def community(request):
    return render(request, 'community.html')

