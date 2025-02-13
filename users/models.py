from django.db import models

# Create your models here.

class Users(models.Model):
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    age = models.IntegerField(default=18)
    rfc = models.CharField(max_length=200)
    photo = models.CharField(max_length=200)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now_add=True)


class user_Adress(models.Model):
    name = models.ForeignKey(Users, on_delete=models.CASCADE)
    street = models.CharField(max_length=200)
    zip_code = models.IntegerField(null=True, default=None)
    city = models.CharField(max_length=200)
    country = models.CharField(max_length=200)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now_add=True)
