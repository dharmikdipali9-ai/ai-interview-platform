from django.db import models
from django.contrib.auth.models import User


class Interview(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=100)
    questions = models.JSONField()  # ✅ IMPORTANT
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.role


class Answer(models.Model):
    interview = models.ForeignKey(Interview, on_delete=models.CASCADE)
    question = models.TextField()
    selected = models.CharField(max_length=255)   # ✅ what user selected
    correct = models.CharField(max_length=255)    # ✅ correct answer
    is_correct = models.BooleanField()
    
    def __str__(self):
        return self.question[:30]