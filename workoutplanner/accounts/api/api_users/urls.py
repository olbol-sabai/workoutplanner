
from django.urls import path, include
from .views import UserDetailAPIView, UserListAPIView

app_name = 'users'

urlpatterns = [
    path('', UserListAPIView.as_view(), name='list'),
    path('<username>/', UserDetailAPIView.as_view(), name='detail'),
]