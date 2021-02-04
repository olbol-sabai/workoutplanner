
from django.urls import path, include
from .views import WorkoutListAPIView, WorkoutDetailAPIView

app_name = 'workouts'

urlpatterns = [
    path('', WorkoutListAPIView.as_view(), name='flat-list'),
    path('<id>/', WorkoutDetailAPIView.as_view(), name='detail'),
]