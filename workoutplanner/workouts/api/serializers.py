from rest_framework import serializers
from rest_framework.reverse import reverse as api_reverse
from workouts.models import Workout, Exercise
from django.utils import timezone

from rest_framework_jwt.settings import api_settings



jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


class ExerciseInlineSerializer(serializers.ModelSerializer):
    id = serializers.StringRelatedField()
    class Meta:
        model = Exercise
        fields = '__all__'
        read_only_fields = ['id', 'workout']
    


class WorkoutInlineListSerializer(serializers.ModelSerializer):
    exercises = ExerciseInlineSerializer(read_only=True, many=True, source='exercise_set')
    created_by = serializers.StringRelatedField(read_only=True)
    created = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Workout
        fields = [
            'id',
            'name',
            'created_by',
            'created',
            'cycles',
            'restBetweenExercises',
            'restBetweenCycles',
            'exercises',
        ]
        read_only_fields = ['id', 'created_by', 'created']
        
    
    # def get_exercises(self, obj):
    #     print(dir(self))
    #     qs = Exercise.objects.filter(workout=obj)
    #     return ExerciseInlineSerializer(qs, many=True).data
    def get_created(self, obj):
        return obj.created.strftime("%B %d, %Y, %H:%M")

    def create(self, validated_data):
        user = self.context.get("request").user
        workout_obj = Workout(
            created_by=user,
            **validated_data, 
        )
        workout_obj.save()
        return workout_obj


    
class WorkoutDetailSerializer(serializers.ModelSerializer):
    exercises = ExerciseInlineSerializer(many=True, source="exercise_set")
    # created_by_name = serializers.StringRelatedField(read_only=True)
    created_by = serializers.HyperlinkedRelatedField(
        view_name='api-users:detail',
        read_only=True,
        lookup_field='username',
    )
    created = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Workout
        fields = [
            # 'created_by_name',
            # "trainer_uri",
            'created_by',
            'id',
            'name',
            'cycles',
            'restBetweenExercises',
            'restBetweenCycles',
            'created',
            'updated',
            'exercises',
        ]
        read_only_fields = ['created_by', 'created', 'id']
    
        
    # def get_trainer_uri(self, obj):
    #     request = self.context.get("request")
    #     return api_reverse('api-users:detail', kwargs={"username":obj.created_by.username}, request=request)

    def get_created(self, obj):
        return obj.created.strftime("%B %d, %Y, %H:%M")

    def perform_update(self, serializer):
        instance = serializer.save()
        update_obj = Workout(user=self.request.user, modified=instance)
        update_obj.save()
        return update_obj
        
    def create(self, validated_data):
        exercises = validated_data.pop('exercises')
        workout = Workout.objects.create(**validated_data)
        for exercise in exercises:
            new_ex = Exercise.objects.create(workout=workout, **exercise)
            new_ex.save()
        return workout
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.cycles = validated_data.get('cycles', instance.cycles)
        instance.restBetweenExercises = validated_data.get('restBetweenExercises', instance.restBetweenExercises)
        instance.restBetweenCycles = validated_data.get('restBetweenCycles', instance.restBetweenCycles)
        instance.save()
        print(validated_data)
        new_exercise_set = validated_data.get('exercise_set')

        old_exercise_list = instance.exercise_set.all()
        for old_ex in old_exercise_list:
            old_ex.delete()
        
        for new_ex in new_exercise_set:
            newly_created = Exercise.objects.create(workout=instance, **new_ex)
            newly_created.save()

        return instance


