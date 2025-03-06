from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import boletos, eventos, localidades, productos
import json
import datetime as dt

# Create your views here.
def mainindex(request):

    Eventos = eventos.objects.all()[0:3]
    data = {
        "Eventos": Eventos
    }

    return render(request, 'mainindex.html', data)


def Evento(request):
    
    Eventos = eventos.objects.all()
    data = {
        "Eventos": Eventos
    }

    return render(request, 'examen/eventos.html', data)


def Boleto(request):
    
    Boletos = boletos.objects.all()
    data = {
        "Boleto": Boletos
    }

    return render(request, 'examen/boletos.html', data)


def Producto(request):
    
    Productos = productos.objects.all()
    data = {
        "Producto": Productos
    }

    return render(request, 'examen/productos.html', data)









def crear_evento(request):
    Localidades = localidades.objects.all()
    eventos_recientes = eventos.objects.order_by('-id')[0:5]

    data = {
        "Localidades": Localidades,
        "Eventos": eventos_recientes
    }

    return render(request, 'eventos_create.html', data)


def crear_producto(request):
    Today = dt.date.today()
    
    Localidades = localidades.objects.all()
    productos_recientes = productos.objects.filter(created_at__gt=Today).order_by('-created_at').all()

    data = {
        "Localidades": Localidades,
        "Productos": productos_recientes
    }

    return render(request, 'productos_create.html', data)