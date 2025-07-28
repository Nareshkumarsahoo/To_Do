from django.urls import path,include
 

from . import views

urlpatterns=[
    path('addTask/', views.addTask,name='addTask')
]