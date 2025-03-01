from django.urls import path

from . import views

urlpatterns = [
    path('', views.mainindex, name="mainindex"),
    path('eventos', views.Evento, name="eventos"),
    path('boletos', views.Boleto, name="boletos"),
    path('productos', views.Producto, name="productos"),
]