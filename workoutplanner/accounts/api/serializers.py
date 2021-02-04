from rest_framework import serializers
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.conf import settings
from django.utils import timezone
from django.db.models import Q
import datetime

from rest_framework_jwt.settings import api_settings

from .utils import jwt_response_payload_handler

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

UserModel = get_user_model()
time_delta = settings.JWT_AUTH['JWT_REFRESH_EXPIRATION_DELTA']



class RegisterUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={"input-type": 'password'}, write_only=True)
    password2 = serializers.CharField(style={"input-type": 'password'}, write_only=True)
    ## read only fields
    token = serializers.SerializerMethodField(read_only=True)
    expires = serializers.SerializerMethodField(read_only=True)
    message = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = UserModel
        fields = ['email', 'username', 'password', 'password2', 'token', 'expires','message']
        extra_kwargs = {'password': {'write_only': True}}
    
    def get_expires(self, obj):
        now = timezone.now()
        return (now + time_delta - datetime.timedelta(seconds=200)).strftime("%B %d, %Y, %H:%M")
    
    def get_message(self, obj):
        return "Thanks for signing up"
    
    def validate(self, data):
        email = data.get('email', None)
        username = data.get('username', None)
        if email is None or username is None or username == '' or email == '':
            raise serializers.ValidationError('Please provide an email and username')

        qs = UserModel.objects.filter(
            Q(username__iexact=username) |
            Q(email__iexact=email)).distinct().exists()

        if qs:
            raise serializers.ValidationError("User or email address is taken")
        pw = data.get('password')
        pw2 = data.pop('password2')
        if pw != pw2:
            raise serializers.ValidationError('Passwords must match')
        return data
    
    def get_token(self, obj): ## this object is the instance of the model we are using e.g. in this case the new user
        user = obj
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        email = validated_data.get('email')
        username = validated_data.get('username')
        password = validated_data.get('password')
        user = UserModel.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

    
