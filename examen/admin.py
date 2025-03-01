from django.contrib import admin
from .models import localidades, boletos, eventos, productos

# Register your models here.
admin.site.register(localidades)
admin.site.register(boletos)
admin.site.register(eventos)
admin.site.register(productos)