"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from tokens import views
from rest_framework.routers import DefaultRouter
from django.urls import path, include

router = DefaultRouter()
router.register(r'proposals', views.ProposalViewSet, basename='proposal')

urlpatterns = [
    path("admin/", admin.site.urls),
    path('get_random_wallets/', views.get_random_wallets, name='get_random_wallets'),
    path('get_role/', views.get_role, name='get_role'),
    path('update_wallet/', views.update_wallet, name="update_wallet"),
    path("get_balance/", views.get_balance, name="get_balance"),
    path("request_challenge/", views.request_challenge, name="request_challenge"),
    path("verify_challenge/", views.verify_challenge, name="verify_challenge"),
    path('', include(router.urls)),  # this includes the routes for proposals
]
