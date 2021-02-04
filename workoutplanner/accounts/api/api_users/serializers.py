from rest_framework import serializers
from rest_framework.reverse import reverse as api_reverse

from django.contrib.auth import get_user_model
UserModel = get_user_model()

from workouts.api.serializers import WorkoutDetailSerializer



class UserSerializer(serializers.ModelSerializer):
    user_uri = serializers.SerializerMethodField(read_only=True)
    user_type = serializers.SerializerMethodField(read_only=True)
    workoutset = serializers.HyperlinkedIdentityField(
                source='workout_set',
                many=True,
                read_only=True,
                lookup_field='id',
                view_name='api-workouts:detail',
    )
    workout_filters = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model = UserModel
        fields = ['username', 'email', 'user_uri', 'user_type', 'workoutset', 'workout_filters']
        
    def get_user_type(self, obj):
        return obj.user_types.user_type
    
    def get_user_uri(self, obj):
        request = self.context.get('request', None)
        return api_reverse('api-users:detail', kwargs={"username": obj.username}, request=request)
    
    def get_workout_filters(self, obj):
        qs = obj.workout_set.all().order_by('created')
        first_workout_obj = qs.first()
        last_workout_obj = qs.last()
        request = self.context.get("request")
        data = {
            'first_workout': WorkoutDetailSerializer(first_workout_obj, context={"request": request}).data,
            'most_recent_workout': WorkoutDetailSerializer(last_workout_obj, context={"request": request}).data,
        } 
        return data

    
        
