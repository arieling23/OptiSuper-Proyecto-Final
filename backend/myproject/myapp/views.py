from django.contrib.auth import authenticate, login, logout # type: ignore
from django.contrib.auth.forms import UserCreationForm, PasswordResetForm, SetPasswordForm # type: ignore
from django.contrib.auth.mixins import LoginRequiredMixin # type: ignore
from django.http import JsonResponse # type: ignore
from django.views import View # type: ignore
from django.views.decorators.csrf import csrf_exempt # type: ignore
from django.utils.decorators import method_decorator # type: ignore
from django.middleware.csrf import get_token # type: ignore
from django.contrib.auth.models import User # type: ignore
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode # type: ignore
from django.utils.encoding import force_bytes, force_str # type: ignore
from django.contrib.auth.tokens import default_token_generator # type: ignore
from django.core.mail import send_mail # type: ignore
from django.contrib.auth.forms import SetPasswordForm # type: ignore
from rest_framework.views import APIView # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework.permissions import IsAuthenticated # type: ignore

import json
import logging


@method_decorator(csrf_exempt, name='dispatch')
class SignUpView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'errors': 'Invalid JSON'}, status=400)

        username = data.get('username')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')
        password1 = data.get('password1')
        password2 = data.get('password2')

        if not all([username, first_name, last_name, email, password1, password2]):
            return JsonResponse({'errors': 'All fields are required.'}, status=400)

        if password1 != password2:
            return JsonResponse({'errors': 'Passwords do not match.'}, status=400)

        if User.objects.filter(email=email).exists():
            return JsonResponse({'errors': 'Email is already in use.'}, status=400)

        user = User(username=username, first_name=first_name, last_name=last_name, email=email)
        user.set_password(password1)
        user.save()

        return JsonResponse({'message': 'User registered successfully'}, status=201)

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'errors': 'Invalid JSON'}, status=400)
        
        username = data.get('username')
        password = data.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'User logged in successfully'}, status=200)
        else:
            return JsonResponse({'errors': 'Invalid username or password'}, status=400)

class ProtectedView(LoginRequiredMixin, View):
    login_url = '/myapp/login/'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return JsonResponse({'message': 'This is a protected view'}, status=200)

@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(View):
    def post(self, request):
        logout(request)
        return JsonResponse({'message': 'User logged out successfully'}, status=200)
    
    
    
@method_decorator(csrf_exempt, name='dispatch')
class UsernameRecoveryView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'errors': 'Invalid JSON'}, status=400)

        email = data.get('email')
        try:
            user = User.objects.get(email=email)
            send_mail(
                'Your Username',
                f'Your username is {user.username}',
                'arieling123@gmail.com',
                [email],
                fail_silently=False,
            )
            return JsonResponse({'message': 'Username sent to your email.'}, status=200)
        except User.DoesNotExist:
            return JsonResponse({'error': 'Email not found.'}, status=400)

# Configuración del logger
logger = logging.getLogger(__name__)

@method_decorator(csrf_exempt, name='dispatch')
class PasswordResetRequestView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            logger.error("JSON inválido recibido.")
            return JsonResponse({'errors': 'Invalid JSON'}, status=400)
        
        email = data.get('email')
        logger.info(f"Intentando enviar restablecimiento de contraseña para: {email}")
        
        try:
            user = User.objects.get(email=email)
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            reset_url = f"http://localhost:3000/reset_password_confirm/{uid}/{token}/"

            logger.info(f"Enviando correo a {email} con URL de restablecimiento: {reset_url}")

            # Enviar correo electrónico con mensaje HTML
            html_message = f"""
            <html>
            <body>
                <div style="font-family: Arial, sans-serif; text-align: center;">
                    <h2 style="color: #333;">Password Reset Request</h2>
                    <p>Hello,</p>
                    <p>We received a request to reset your password. Click the button below to reset it:</p>
                    <a href="{reset_url}" style="display: inline-block; margin: 20px auto; padding: 10px 20px; font-size: 16px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px;">Reset Password</a>
                    <p>If you didn't request this, you can safely ignore this email.</p>
                    <p>Thanks,</p>
                    <p>Your Company Team</p>
                </div>
            </body>
            </html>
            """
            send_mail(
                'Password Reset Request',
                f'Click the link to reset your password: {reset_url}',
                'arieling123@gmail.com',  # Correo desde el cual se enviará
                [email],
                fail_silently=False,
                html_message=html_message
            )
            logger.info(f"Correo de restablecimiento de contraseña enviado a: {email}")
            return JsonResponse({'message': 'Password reset email sent.'}, status=200)
        except User.DoesNotExist:
            logger.error(f"El correo electrónico {email} no se encontró.")
            return JsonResponse({'errors': 'Email not found.'}, status=400)
        except Exception as e:
            logger.error(f"Error enviando correo de restablecimiento de contraseña: {e}")
            return JsonResponse({'errors': 'Error sending password reset email.'}, status=500)

    
    
@method_decorator(csrf_exempt, name='dispatch')
class PasswordResetConfirmView(View):
    def post(self, request, uidb64, token):
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'errors': 'Invalid JSON'}, status=400)

        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            form = SetPasswordForm(user, data)
            if form.is_valid():
                form.save()
                return JsonResponse({'message': 'Password has been reset.'}, status=200)
            return JsonResponse({'errors': form.errors}, status=400)
        return JsonResponse({'errors': 'Invalid token.'}, status=400)


class VerifyTokenView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'username': user.username,
            'email': user.email
        })
        
        
def csrf_token_view(request):
    return JsonResponse({'csrfToken': get_token(request)})