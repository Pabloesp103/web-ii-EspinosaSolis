from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import boletos, eventos, localidades, productos
from django.utils.timezone import make_aware
import datetime as dt
from datetime import datetime
from django.forms.models import model_to_dict
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



def crear_evento(request):
    Localidades = localidades.objects.all()
    eventos_recientes = eventos.objects.order_by('-id')[0:5]

    data = {
        "Localidades": Localidades,
        "Eventos": eventos_recientes
    }

    return render(request, 'examen/eventos_create.html', data)


def crear_producto(request):
    Today = dt.date.today()
    
    Localidades = localidades.objects.all()
    productos_recientes = productos.objects.order_by('-id')[0:5]

    data = {
        "Localidades": Localidades,
        "Productos": productos_recientes
    }

    return render(request, 'examen/productos_create.html', data)


def crear_evento_fetch(request):
    if request.method != 'POST':
        return JsonResponse({"error": "Invalid request method. Use FETCH."}, status=400)
    
    try:
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        name = body.get("name")
        fecha_inicio = body.get("fecha_inicio")
        fecha_fin = body.get("fecha_fin")
        localidad_id = body.get("localidades_id")
        print(name, fecha_fin, fecha_inicio, localidad_id)

        if not all([name, fecha_inicio, fecha_fin, localidad_id]):
            return JsonResponse({"error": "Todos los campos deben de ser llenados."}, status=400)
        
        if fecha_fin < fecha_inicio:
            return JsonResponse({"error": "La fecha fin tiene que ser mayor a la fecha inicio."}, status=400)
        
        current_date_time = datetime.now()
        formatted_date_time = current_date_time.strftime('%Y-%m-%d')

        if fecha_inicio < formatted_date_time:
            return JsonResponse({"error": "La fecha inicio tiene que ser despues del dia actual."}, status=400)
        

        Localidad = get_object_or_404(localidades, id=localidad_id)
        ultimo_evento = eventos.objects.order_by('-id').first()

        try:
            if ultimo_evento.localidades_id == Localidad:
                return JsonResponse({"error": "No es posible crear dos eventos consecutivos con la misma localidad."}, status=400)
        except:
            pass
        
        Evento = eventos(
            name=name,
            fecha_inicio=fecha_inicio,
            fecha_fin=fecha_fin,
            localidades_id=Localidad
        )
        Evento.save()

        data = model_to_dict(Evento)
        data["fecha_inicio"] = Evento.fecha_inicio
        data["localidad_name"] = Localidad.name

        return JsonResponse({"success": "Evento creado con exito", "data": data}, status=201)

    except Exception as e:
        return JsonResponse({"error": f"Error con el servidor: {str(e)}"}, status=500)



def crear_producto_fetch(request):
    if request.method != 'POST':
        return JsonResponse({"error": "Invalid request method. Use FETCH."}, status=400)
    
    try:
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        name = body.get("name")
        precio = body.get("precio")
        localidad_id = body.get("localidades_id")

        print("name:",name,"precio:",precio,"localidad_id:",localidad_id)

        if not all([name, precio, localidad_id]):
            return JsonResponse({"error": "Todos los campos deben de ser llenados."}, status=400)

        if int(precio) <= 0:
            return JsonResponse({"error": "El precio debe ser mayor a cero."}, status=400)
        
        today = dt.date.today()
        recent_productos = productos.objects.filter(created_at__gt=today).count()

        if recent_productos >= 10:
            return JsonResponse({"error": "Solo se pueden crear maximo 10 productos al dia."}, status=400)

        Localidad =  get_object_or_404(localidades, id=localidad_id)

        if not Localidad:
            return JsonResponse({"error": "Tiene que asignarse una localidad existente."}, status=400)


        Producto = productos(
            name=name,
            precio=precio,
            localidades_id=Localidad
        )
        Producto.save()

        data = model_to_dict(Producto)
        data["localidad_name"] = Localidad.name

        return JsonResponse({"success": "Producto creado con exito", "data": data}, status=201)

    except Exception as e:
        return JsonResponse({"error": f"Error con el servidor: {str(e)}"}, status=500)
    



def eliminar_evento_fetch(request):
    if request.method != 'POST':
        return JsonResponse({"error": "Invalid request method. Use FETCH."}, status=400)

    try:
        body_unicode = request.body.decode('utf-8');
        body = json.loads(body_unicode);

        id = body.get("evento_id");
        
        Evento = eventos.objects.filter(id=id).first()
        if not Evento:
            return JsonResponse({"error": "El registro no existe."})
        
        Evento.delete()

        return JsonResponse({"success": "Evento borrado con exito"}, status=200)
    except Exception as e:
        return JsonResponse({"error": f"Error con el servidor: {str(e)}"}, status=500)
    


def eliminar_producto_fetch(request):
    if request.method != 'POST':
        return JsonResponse({"error": "Invalid request method. Use FETCH."}, status=400)

    try:
        body_unicode = request.body.decode('utf-8');
        body = json.loads(body_unicode);

        id = body.get("producto_id");
        
        Producto = productos.objects.filter(id=id).first()
        if not Producto:
            return JsonResponse({"error": "El registro no existe."})
        
        Producto.delete()

        return JsonResponse({"success": "Producto borrado con exito"}, status=200)
    except Exception as e:
        return JsonResponse({"error": f"Error con el servidor: {str(e)}"}, status=500)