from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
import json

from .models import Users

def usersIndex(request):
    # Obtener todos los usuarios sin direcciones
    users = Users.objects.all().values('id', 'name', 'email', 'photo', 'age')

    return render(request, 'users/index.html', {'users': users})

def createUserView(request):
    return render(request, "users/create.html")

def createUserByFetch(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    return JsonResponse({
        "NOMBRE_RECIBIDO": body.get("name")
    })

def createUser(request):
    data={}
    try:
        if request.method == "POST":
            name = request.POST.get("name")
            email = request.POST.get("email")
            age = request.POST.get("age")
            rfc = request.POST.get("rfc")
            photo = request.POST.get("photo")

            user = Users(name = name, email = email, age = age, rfc = rfc, photo = photo)
            user.save()
            data["user"] = user
            data["message"] = "User created"
            data["status"] = "success"
    except Exception as e:
        data["message"] = str(e)
        data["status"] = "error"

    return render(request, "users/create.html", data)

def userDetail(request, id):
    try:
        user_Adress = user_Adress.object.filter(user_id=id)
    except:
        user_Adress = None
    user = Users.objects.get(id=id)
    data = {
        "user":user,
        "user_Adress":user_Adress
    }

    return render(request, "users/detail.html", data)

def updateUserByFetch(request, id):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    user = Users.objects.get(id=id)
    user.name = body.get("name")
    user.email = body.get("email")
    user.age = body.get("age")
    user.rfc = body.get("rfc")
    user.photo = body.get("photo")
    user.save()
    return JsonResponse({
        "message": "Usuario actualizado",
            "updated_user": {
                "name": user.name,
                "email": user.email,
                "age": user.age,
                "rfc": user.rfc
            }
    })