from django.conf import settings
from django.utils import timezone
import datetime



time_delta = settings.JWT_AUTH['JWT_REFRESH_EXPIRATION_DELTA']
now = timezone.now()

def jwt_response_payload_handler(token, user=None):
    username = 'undefined'
    email = 'undefined'
    if user is not None:
        username = user.username
        email = user.email
    return {
        'token': token,
        'user': username,
        'email': email,
        'expires': (now + time_delta - datetime.timedelta(seconds=200)).strftime("%B %d, %Y, %H:%M")
    }

from rest_framework import renderers
from rest_framework.utils import json
import json
from rest_framework.renderers import JSONRenderer

class CustomRenderer(JSONRenderer):
    charset = 'utf-8'

    def render(self, data, accepted_media_type=None, renderer_context=None):
        print(dir(self))
        if 'ErrorDetail' in str(data):
            response = json.dumps({
                'errors': data
            })
        else:
            response = json.dumps({
                'data': data
            })

        return super().render(response, accepted_media_type, renderer_context)

