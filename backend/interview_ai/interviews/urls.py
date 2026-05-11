from django.urls import path
from .views import generate_questions, submit_quiz

urlpatterns = [
    path('generate/', generate_questions),
    path('submit/', submit_quiz),
]