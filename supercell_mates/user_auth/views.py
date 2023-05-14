from django.shortcuts import render, redirect, reverse
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, JsonResponse
from json import loads
from .models import UserAuth

# Create your views here.

def home(request):
    if not request.user.is_authenticated:
        response = redirect(reverse("user_auth:login"))
        print(request.environ.get("HTTP_ORIGIN"))
        response.headers["Access-Control-Allow-Origin"] = request.environ.get("HTTP_ORIGIN")
        return response
    else:
        return render(request, "user_auth/home.html")


def home_async(request):
    if not request.user.is_authenticated:
        return JsonResponse({"message": "not logged in"})
    else:
        return JsonResponse({"message": "logged in"})


def login_async(request):
    if request.method == "POST":
        data = loads(request.body.decode('utf-8'))
        username = data["username"]
        password = data["password"]
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({"message": "logged in"})
        else:
            return JsonResponse({"message": "wrong username or password"})


def login_user(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect(reverse("user_auth:home"))
        else:
            return render(request, 'user_auth/login.html', {
                "error_message": "Wrong username or password"
            })
    
    return render(request, "user_auth/login.html")


def register_async(request):
    if request.method == "POST":
        data = loads(request.body.decode('utf-8'))
        username = data["username"]
        password = data["password"]
        if username == '' or password == '': # this only serve as a backup, checking empty fields should be done in front end
            return JsonResponse({"message": "username or password is empty"})

        try:
            user = UserAuth.objects.create_user(username=username, password=password)
            login(request, user)
        except IntegrityError:
            return JsonResponse({"message": "username already taken"})
        
        return JsonResponse({"message": "account created"})


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        if username == '' or password == '':
            return render(request, "user_auth/register.html", {
                "error_message": "username or password is empty"
            })

        try:
            user = UserAuth.objects.create_user(username=username, password=password)
            login(request, user)
        except IntegrityError:
            return render(request, "user_auth/register.html", {
                "error_message": "username already taken"
            })
        
        return redirect(reverse("user_auth:home"))

    return render(request, "user_auth/register.html")


def logout_user(request):
    logout(request)
    return redirect(reverse("user_auth:home"))


def logout_async(request):
    logout(request)
    return JsonResponse({"message": "logged out"})