from django.db import models

# Create your models here.

class localidades(models.Model):
  name = models.CharField(max_length=200)
  estatus = models.BooleanField(default=True)


class productos(models.Model) :
  name = models.CharField(max_length=200)
  precio = models.DecimalField(max_digits=10, decimal_places=2)
  localidades_id = models.ForeignKey(localidades, on_delete=models.CASCADE)


class eventos(models.Model):
  name = models.CharField(max_length=200)
  fecha_inicio = models.DateTimeField(auto_now_add=True, blank=True)
  fecha_fin = models.DateTimeField(auto_now_add=False, blank=True)
  localidades_id = models.ForeignKey(localidades, on_delete=models.CASCADE)


class boletos(models.Model):
  precio = models.DecimalField(max_digits=10, decimal_places=2)
  tipo_boleto_id = models.IntegerField(default=1)
  evento_id = models.ForeignKey(eventos, on_delete=models.CASCADE)
  fecha = models.DateTimeField(auto_now_add=True, blank=True)
