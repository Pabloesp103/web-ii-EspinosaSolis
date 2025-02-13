from django.shortcuts import render
from .models import Users, user_Adress

# Create your views here.

def usersIndex(request):
    users = Users.objects.filter(user_adress__isnull=True)
    # users = Users.objects.all()
    data = {
        "users": users,
        "nombre": "pablo"
    }


    return render(request, 'users/index.html',data)