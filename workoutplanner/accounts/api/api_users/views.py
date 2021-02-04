from rest_framework import generics
from .serializers import UserSerializer

from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
UserModel = get_user_model()


class UserDetailAPIView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    lookup_field = 'username'

    def get_queryset(self):
        username = self.kwargs.get('username', None)
        if username == None:
            return UserModel.objects.none()
        return UserModel.objects.filter(username=username)


class UserListAPIView(generics.ListAPIView):
    serializer_class = UserSerializer
    lookup_field = 'id'
    queryset = UserModel.objects.all()

    def get_serializer_context(self):
        return {"request": self.request}
        