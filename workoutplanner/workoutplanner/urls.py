
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

app_name = 'main'

urlpatterns = [
    path('', TemplateView.as_view(template_name='react.html')),
    path('admin/', admin.site.urls),
    path('api/workouts/', include('workouts.api.urls', namespace='api-workouts')),
    path('api/users/', include('accounts.api.api_users.urls', namespace='api-users')),
    path('api/auth/', include('accounts.api.urls', namespace='api-auth'))
]
