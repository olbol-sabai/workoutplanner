from rest_framework import generics, status, mixins
from rest_framework.views import APIView
from rest_framework.renderers import BrowsableAPIRenderer

from rest_framework_jwt.settings import api_settings
from rest_framework.response import Response

from django.contrib.auth import get_user_model
from django.db.models import Q

UserModel = get_user_model()

from .serializers import RegisterUserSerializer
from .utils import jwt_response_payload_handler, CustomRenderer
from .permissions import AnonPermission


jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

class LoginUserAPIView(APIView):

    ## auth classes are basically what determines how a user is determined authenticated

    ## permission classes define what permissions are allowed given certain authentication
    permission_classes = [AnonPermission]
    # renderer_classes = [CustomRenderer, BrowsableAPIRenderer]


    def post(self, request, *rgs, **kwargs):
        username = request.data.get('username', None)
        password = request.data.get('password', None)

        if password == None or (username == None and email == None):
            return Response({'error': 'All credentials must be provided'}, status=401)

        check_user_qs = UserModel.objects.filter(
            Q(username__iexact=username) |
            Q(email__iexact=username)).distinct()

        if check_user_qs.count() != 1:
            return Response({'error': 'Account not found'}, status=404)

        user = check_user_qs.first()
        self.check_object_permissions(request, request.user)

        if user.check_password(password):
            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)
            response = jwt_response_payload_handler(token=token, user=user)
            return Response(response, status=200)
        return Response({'error': 'Incorrect password'}, status=401)



class RegisterUserAPIView(generics.CreateAPIView):
    # authentication_classes = []
    permission_classes = [AnonPermission]
    serializer_class = RegisterUserSerializer
    queryset = UserModel.objects.all()
    renderer_classes = [CustomRenderer, BrowsableAPIRenderer]

    def get_serializer_context(self):
        return {'request': self.request}
    
    
    
