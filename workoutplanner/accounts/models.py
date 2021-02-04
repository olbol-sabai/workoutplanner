from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth import get_user_model

User = get_user_model()

class UserType(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_types') 
    user_type = models.CharField(max_length=30, default='trainer', choices=[
            ('trainee','trainee'),
            ('trainer','trainer'),
        ], 
    )
    def __str__(self):
        return f'{self.user.email} - {self.user_type}'
    
    
def post_save_user_reciever(sender, instance, created, *args, **kwargs):
    if created:
        UserType.objects.create(user=instance)
    

post_save.connect(post_save_user_reciever, sender=User)

    

