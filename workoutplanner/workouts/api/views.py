from rest_framework.views import APIView
from rest_framework import generics, mixins, permissions, pagination

from workouts.models import Workout
from .serializers import WorkoutInlineListSerializer, WorkoutDetailSerializer
from .permissions import IsOwnerOrReadOnly


class ThreePagePagination(pagination.PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 10
    page_query_param = 'page_no'
    last_page_strings = ('final_page',)
    ### this last two work in conjunction together. page_query_param will take either digits or to get to the final page of results "page_no=final_page"

class WorkoutListAPIView(mixins.CreateModelMixin, generics.ListAPIView):
    pagination_class = ThreePagePagination
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WorkoutInlineListSerializer

    def get_queryset(self):
        queryset = Workout.objects.all().order_by('-created')
        name_contains = self.request.query_params.get('search_name', None)
        if name_contains is not None:
            ##custom model manager searches
            queryset = queryset.search_workout_and_exercise(name_contains)
        queryset = queryset.filter(created_by=self.request.user)
        single_cycle = self.request.query_params.get('single_cycle', None)
        if single_cycle is not None:
            ##custom model manager search
            queryset = queryset.single_cycle()
        return queryset

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def get_serializer_context(self):
        return {"request": self.request}



class WorkoutDetailAPIView(
    generics.RetrieveAPIView, 
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin):

    permission_classes = [IsOwnerOrReadOnly, permissions.IsAuthenticatedOrReadOnly]
    serializer_class = WorkoutDetailSerializer
    lookup_field = 'id'
    queryset = Workout.objects.all()
    
    def get_serializer_context(self):
        return {
            "request": self.request,
            "switch_params": self.request.query_params.get("switch", None)
        }

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    


