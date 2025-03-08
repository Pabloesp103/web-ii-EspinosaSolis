from django.urls import path

from . import views

urlpatterns = [
    path('', views.mainindex, name="mainindex"),
    path('eventos', views.Evento, name="eventos"),
    path('boletos', views.Boleto, name="boletos"),
    path('productos', views.Producto, name="productos"),
    path('examen/eventos_create', views.crear_evento, name="eventos_create"),
    path('examen/productos_create', views.crear_producto, name="productos_create"),
    path('eventos_create_fetch', views.crear_evento_fetch, name="eventoCreateByFetch"),
    path('productos_create_fetch', views.crear_producto_fetch, name="productoCreateByFetch"),
    path('eventos_delete_fetch', views.eliminar_evento_fetch, name="eventoDeleteByFetch"),
    path('productos_delete_fetch', views.eliminar_producto_fetch, name="productoDeleteByFetch"),
]