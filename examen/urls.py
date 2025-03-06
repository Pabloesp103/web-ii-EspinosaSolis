from django.urls import path

from . import views

urlpatterns = [
    path('', views.mainindex, name="mainindex"),
    path('eventos', views.Evento, name="eventos"),
    path('boletos', views.Boleto, name="boletos"),
    path('productos', views.Producto, name="productos"),
    path('examen/eventos_create', views.crear_evento, name="eventos_create"),
    path('examen/productos_create', views.crear_producto, name="productos_create"),
]