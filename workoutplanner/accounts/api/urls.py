
from django.urls import path, include
from rest_framework_jwt.views import refresh_jwt_token, obtain_jwt_token
app_name = 'auth'
from .views import RegisterUserAPIView, LoginUserAPIView


urlpatterns = [
    path('login/', LoginUserAPIView.as_view(), name='login'),
    path('register/', RegisterUserAPIView.as_view(), name='register'),
    path('refresh/', refresh_jwt_token, name='refresh'),
]