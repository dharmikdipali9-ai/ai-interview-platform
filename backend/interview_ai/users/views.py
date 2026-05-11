from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):

    name = request.data.get("name")
    email = request.data.get("email")
    password = request.data.get("password")
    confirm_password = request.data.get("confirm_password")

    # passwords match
    if password != confirm_password:
        return Response(
            {"error": "Passwords do not match"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # email already exists
    if User.objects.filter(email=email).exists():
        return Response(
            {"error": "Email already exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # strong password validation
    try:
        validate_password(password)
    except ValidationError as e:
        return Response(
            {"error": e.messages},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(
        username=email,
        email=email,
        first_name=name,
        password=password
    )

    return Response(
        {"message": "User registered successfully"},
        status=status.HTTP_201_CREATED
    )


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):

    email = request.data.get("email")
    password = request.data.get("password")

    try:
        user_obj = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(
            {"error": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED
        )

    from django.contrib.auth import authenticate

    user = authenticate(
        username=user_obj.username,
        password=password
    )

    if user:
        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token)
        })

    return Response(
        {"error": "Invalid credentials"},
        status=status.HTTP_401_UNAUTHORIZED
    )