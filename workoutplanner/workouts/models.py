from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator
from django.db.models import Q


from django.contrib.auth import get_user_model

User = get_user_model()

class WorkoutQueryset(models.QuerySet):

  def single_cycle(self):
    return self.filter(cycles=1)

  def search_workout_and_exercise(self, letter):
    qs = self.filter(
        Q(exercise__name__icontains=letter) |
        Q(name__icontains=letter)).distinct()
    return qs

class WorkoutManager(models.Manager):
  # def get_queryset(self):
  #   return super().get_queryset() this is the function used if we are not defining a custom queryset. 

  def get_queryset(self):
    return WorkoutQueryset(self.model, using=self._db) 

  def single_cycle(self):
    return self.get_queryset().single_cycle()

  def search_workout_and_exercise(self, letter, user):
    return self.get_queryset().search_workout_and_exercise(letter, user)

class Workout(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(null=False, blank=False, max_length=100)
    cycles = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1)])
    restBetweenExercises = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1)])
    restBetweenCycles = models.PositiveIntegerField(default=1,validators=[MinValueValidator(1)])
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    objects = WorkoutManager()
    
    def save(self, *args, **kwargs):
        if not self.id:
            self.created = timezone.now()
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Exercise(models.Model):
    name = models.CharField(null=False, blank=False, max_length=100)
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE)
    noOfSets = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1)])
    noOfReps = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1)])
    lengthOfRep = models.PositiveIntegerField(default=30, validators=[MinValueValidator(1)])
    restBetweenReps = models.PositiveIntegerField(default=30, validators=[MinValueValidator(1)])
    restBetweenSets = models.PositiveIntegerField(default=30, validators=[MinValueValidator(1)])
    
    def __str__(self):
        return f'{self.name} - {self.workout.name}'