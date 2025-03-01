from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import boletos, eventos, localidades, productos
import json

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