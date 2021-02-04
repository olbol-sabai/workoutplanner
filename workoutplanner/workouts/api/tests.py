from django.contrib.auth import get_user_model
from workouts.models import Workout, Exercise

from rest_framework.test import APITestCase
from rest_framework import status
import pprint




class WorkoutModelTests(APITestCase):

    def setUp(self):
        testuser = get_user_model().objects.create(username='testuser', email='testuser')
        testuser.set_password('test_password')
        testuser.save()

        superuser = get_user_model().objects.create(username='superuser', email='superuser')
        superuser.set_password('superuser_password')
        superuser.save()

        self.client.force_authenticate(user=superuser)
        ###superuser created workout
        CREATE_WORKOUT_ENDPOINT = 'http://127.0.0.1:8000/api/workouts/'
        data = {
            "name": 'test workout',
            "cycles": 2,
            "restBetweenExercises": 30,
            "restBetweenCycles": 30,
        }
        response = self.client.post(CREATE_WORKOUT_ENDPOINT, data=data, format='json')



    # def test_adding_workouts_and_exercises(self):
    #     testuser = get_user_model().objects.get(username='superuser')
    #     self.client.force_authenticate(user=testuser)
        
    #     workout_obj_id = Workout.objects.first().id
    #     WORKOUT_DETAIL_ENDPOINT = f'http://127.0.0.1:8000/api/workouts/{workout_obj_id}/'
    #     data = {
    #         "name": 'OG test workout',
    #         "cycles": 1,
    #         "restBetweenExercises": 30,
    #         "restBetweenCycles": 30,
    #         "exercise_set": [
    #         {
    #             "name": "OG Warmup",
    #             "noOfSets": 2,
    #             "noOfReps": 4,
    #             "lengthOfRep": 78,
    #             "restBetweenReps": 30,
    #             "restBetweenSets": 30
    #         },
    #         {
    #             "name": "OG Max Hang",
    #             "noOfSets": 8,
    #             "noOfReps": 5,
    #             "lengthOfRep": 2,
    #             "restBetweenReps": 5,
    #             "restBetweenSets": 160
    #         }
    #     ]
    #     }
    #     response = self.client.put(WORKOUT_DETAIL_ENDPOINT, data=data, format='json')
    #     # pprint.pprint(response.data)

    #     data_with_exercises = {
    #         "name": 'patched test workout',
    #         "cycles": 8798,
    #         "restBetweenExercises": 7687,
    #         "restBetweenCycles": 68798,
    #         "exercise_set": [
    #         {
    #             "name": "patched Max Hang",
    #             "noOfSets": 8,
    #             "noOfReps": 5,
    #             "lengthOfRep": 2,
    #             "restBetweenReps": 5,
    #             "restBetweenSets": 160
    #         },
    #         {
    #             "name": "patched Warmup",
    #             "noOfSets": 2,
    #             "noOfReps": 4,
    #             "lengthOfRep": 78,
    #             "restBetweenReps": 30,
    #             "restBetweenSets": 30
    #         },
    #     ]
    #     }
    #     response = self.client.put(WORKOUT_DETAIL_ENDPOINT, data=data_with_exercises, format='json')
        # print(response.status_code)

    def test_single_cycle_query_params(self):
        LIST_ENDPOINT = 'http://127.0.0.1:8000/api/workouts/?single_cycle'
        data_list = self.client.get(LIST_ENDPOINT).data
        self.assertTrue(len(data_list) < Workout.objects.count())


    # def test_patch_on_other_users(self):
    #     workout_obj_id = Workout.objects.first().id
    #     self.client.force_authenticate(user=testuser)
    #     patch_url = f'http://127.0.0.1:8000/api/workouts/{workout_obj_id}/'
    #     data = {
    #         "cycles": 20,
    #         "name": "patched name"
    #     }
    #     patch_response = self.client.patch(patch_url, data=data, format='json')
    #     print(patch_response.data)
    #     self.assertEqual(Workout.objects.count(), 1) 
    #     self.assertEqual(patch_response.status_code, status.HTTP_403_FORBIDDEN) 


    # def test_delete_others_workout(self):
    #     workout_obj_id = Workout.objects.first().id
    #     testuser = get_user_model().objects.get(username='testuser')

    #     self.client.force_authenticate(user=testuser)
    #     patch_url = f'http://127.0.0.1:8000/api/workouts/{workout_obj_id}/'

    #     patch_response = self.client.delete(patch_url)
    #     self.assertEqual(Workout.objects.count(), 1) 
    #     self.assertEqual(patch_response.status_code, status.HTTP_403_FORBIDDEN) 

    # def get_auth_token(self):
    #     LOGIN_URL = 'http://127.0.0.1:8000/api/auth/login/'
    #     post_data = {
    #         'username': 'superuser',
    #         'password': 'superuser_password',
    #     }
    #     login_response = self.client.post(LOGIN_URL, data=post_data)
    #     token = login_response.data['token']
    #     self.client.credentials(HTTP_AUTHORIZATION='JWT ' + token)


    # def create_workout(self):
    #     LOGIN_URL = 'http://127.0.0.1:8000/api/auth/login/'
    #     post_data = {
    #         'username': 'testuser',
    #         'password': 'test_password',
    #     }
    #     login_response = self.client.post(LOGIN_URL, data=post_data)
    #     token = login_response.data['token']
    #     self.client.credentials(HTTP_AUTHORIZATION='JWT ' + token)
    #     self.get_auth_token()
    #     CREATE_WORKOUT_ENDPOINT = 'http://127.0.0.1:8000/api/workouts/'
    #     data = {
    #         "name": 'test workout',
    #         "cycles": 1,
    #         "restBetweenExercises": 30,
    #         "restBetweenCycles": 30,
    #     }
    #     response = self.client.post(CREATE_WORKOUT_ENDPOINT, data=data, format='json')
    #     return response


    
