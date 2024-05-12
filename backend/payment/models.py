from django.db import models
from user.models import User
from courses.models import Course

class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE) 
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_intent = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user.name} - Course ID: {self.course} "
    
    # @property
    # def get_user_name(self):
    #     return self.user.name
