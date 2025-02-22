from django.urls import path

from . import views

urlpatterns = [
    path("", views.usersIndex, name="usersIndex"),
    path("create", views.createUserView, name="createUserView"),
    path("createUser", views.createUser, name="createUser"),
    path("detail/<int:id>", views.userDetail, name="userDetail"),
    path("createUser-by-fetch",views.createUserByFetch, name="createUser-by-fetch"),
    path("updateUserByFetch/<int:id>", views.updateUserByFetch, name="updateUserByFetch")
]