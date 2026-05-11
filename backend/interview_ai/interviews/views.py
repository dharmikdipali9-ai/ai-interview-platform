from groq import Groq
import os
import json

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User

from .models import Interview, Answer


client = Groq(api_key=os.getenv("GROQ_API_KEY"))


# 🔹 1. Generate MCQ Questions
@api_view(['POST'])
def generate_questions(request):
    role = request.data.get("role")

    prompt = f"""
    Generate 10 multiple choice questions for {role}.

    Return ONLY JSON:
    [
      {{
        "question": "string",
        "options": ["A", "B", "C", "D"],
        "answer": "correct option"
      }}
    ]
    """

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}]
    )

    import re, json
    content = response.choices[0].message.content

    json_text = re.search(r'\[.*\]', content, re.DOTALL).group()
    questions = json.loads(json_text)

    interview = Interview.objects.create(
        user=User.objects.first(),
        role=role,
        questions=questions
    )

    return Response({
        "questions": questions,
        "interview_id": interview.id
    })


# 🔹 2. Submit Quiz Answers (Single API)
@api_view(['POST'])
def submit_quiz(request):

    interview_id = request.data.get("interview_id")
    responses = request.data.get("responses", [])

    try:
        interview = Interview.objects.get(id=interview_id)
    except Interview.DoesNotExist:
        return Response({"error": "Interview not found"}, status=404)

    score = 0
    total = len(interview.questions)

    for i, q in enumerate(interview.questions):

        # Skip unanswered questions safely
        if i >= len(responses) or responses[i] is None:
            continue

        selected = responses[i].get("selected")

        # Correct answer from AI
        correct_answer = q.get("answer", "").strip()

        # Convert A/B/C/D answer into actual option
        if correct_answer.startswith("A"):
            correct = q["options"][0]
        elif correct_answer.startswith("B"):
            correct = q["options"][1]
        elif correct_answer.startswith("C"):
            correct = q["options"][2]
        elif correct_answer.startswith("D"):
            correct = q["options"][3]
        else:
            # If AI directly returns answer text
            correct = correct_answer

        is_correct = selected == correct

        if is_correct:
            score += 1

        Answer.objects.create(
            interview=interview,
            question=q["question"],
            selected=selected,
            is_correct=is_correct
        )

    return Response({
        "score": score,
        "total": total
    })