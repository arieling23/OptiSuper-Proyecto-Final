from django.contrib.auth import authenticate, login, logout  # type: ignore /Utilizado en la vista LoginView  
from django.contrib.auth.mixins import LoginRequiredMixin # type: ignore
from django.views import View # type: ignore
from django.views.decorators.csrf import csrf_exempt # type: ignore
from django.utils.decorators import method_decorator # type: ignore
from django.middleware.csrf import get_token # type: ignore
from django.contrib.auth.models import User # type: ignore
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode # type: ignore
from django.utils.encoding import force_bytes      # type: ignore
from django.contrib.auth.tokens import default_token_generator # type: ignore
from django.core.mail import send_mail # type: ignore
from django.contrib.auth.forms import SetPasswordForm # type: ignore
from rest_framework.views import APIView # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework.permissions import IsAuthenticated # type: ignore
from rest_framework.decorators import api_view # type: ignore
from django.http import JsonResponse # type: ignore
import pandas as pd #    type: ignore
import openai # type: ignore
import json
import logging
from openai import OpenAI  # type: ignore
from rest_framework.parsers import MultiPartParser # type: ignore


# Vista para el registro de usuario
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

# Vista para el login de usuario
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

# Vista protegida que requiere autenticación para ser accedida
class ProtectedView(LoginRequiredMixin, View):
    login_url = '/myapp/login/'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return JsonResponse({'message': 'This is a protected view'}, status=200)

# Vista para el logout de usuario
@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(View):
    def post(self, request):
        logout(request)
        return JsonResponse({'message': 'User logged out successfully'}, status=200)
    

# Configuración del logger
logger = logging.getLogger(__name__)

# Vista para solicitar el restablecimiento de contraseña
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

    
# Vista para confirmar el restablecimiento de contraseña    
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


# Vista para verificar el token JWT
class VerifyTokenView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'username': user.username,
            'email': user.email
        })
        
 
# Vista para obtener el token CSRF       
def csrf_token_view(request):
    return JsonResponse({'csrfToken': get_token(request)})


# Inicialización del cliente OpenAI con la clave API
client = OpenAI(api_key='Tu-Api-Key')


# Vista para predecir el precio de un producto
@api_view(['POST'])
def predict_price(request):
    try:
        caracteristicas = request.data
        messages = [
            {"role": "system", "content": "Eres un asistente útil."},
            {"role": "user", "content": f"""
            Estimación de Precio para la Laptop HP con Características Específicas:
            **Marca:** {caracteristicas['marca']}
            **Procesador:** {caracteristicas['procesador']}
            **Memoria RAM:** {caracteristicas['memoria_ram']} GB
            **Almacenamiento:** {caracteristicas['almacenamiento']} GB SSD
            **Tamaño de Pantalla:** {caracteristicas['tamano_pantalla']} pulgadas
            **Gráfica:** {caracteristicas['grafica']}
            **Sistema Operativo:** {caracteristicas['sistema_operativo']}
            **Condición:** {caracteristicas['condicion']}
            
            **Precio Optimo:** Proporcione un precio estimado para esta laptop.
            
            **Explicación del Precio:** Explique brevemente el porqué de ese precio.
            
            **Productos Similares a Considerar:** Sugiera productos similares que el usuario podría considerar.
            """}
        ]
        
        response = client.chat.completions.create(
            model="gpt-4-turbo",
            messages=messages,
            max_tokens=500,
            temperature=0.7
        )
        predicted_price = response.choices[0].message.content.strip()
        
         # Post-procesamiento para ajustar el formato de la respuesta
        formatted_price = predicted_price.replace('##', '').replace('**', '').replace('####', '\n')
        return JsonResponse({'predicted_price':  formatted_price})
    except Exception as e:
        logging.error(f"Error processing request: {e}")
        return JsonResponse({'error': 'An error occurred while processing your request.'}, status=500)
    
    

# Vista para predecir ventas
class PrediccionVentas(APIView):
    parser_classes = (MultiPartParser,)
    def post(self, request):
        archivo_excel = request.FILES.get('archivo')
        periodo_prediccion = int(request.POST.get('periodo_prediccion', 30))
        if not archivo_excel:
            return Response({'error': 'No se proporcionó archivo Excel'}, status=400)
        try:
            # Leer el archivo Excel
            df = pd.read_excel(archivo_excel)
            # Verificar que las columnas necesarias estén presentes
            columnas_requeridas = ['fecha', 'ventas']
            if not all(col in df.columns for col in columnas_requeridas):
                return Response({'error': 'El archivo Excel debe contener las columnas "fecha" y "ventas"'}, status=400)
           
            # Procesar datos y realizar predicción usando ChatGPT
            client = OpenAI(api_key='Tu-Api-Key')
            respuesta = client.chat.completions.create(
                model="gpt-4-turbo-preview",
                messages=[
                    {"role": "system", "content": "Eres un analista de ventas experto en predicción y análisis de series temporales. Tu tarea es proporcionar un análisis detallado y una predicción precisa basada en los datos históricos de ventas."},
                    {"role": "user", "content": f"""
                    Analiza los siguientes datos de ventas y proporciona una predicción detallada para los próximos {periodo_prediccion} días:

                    {df.to_string()}

                    Por favor, incluye en tu análisis:
                    1. Un resumen de las tendencias observadas en los datos históricos.
                    2. Una predicción día a día para los próximos {periodo_prediccion} días, considerando patrones estacionales si son evidentes.
                    3. Factores que podrían influir en las ventas futuras (por ejemplo, tendencias del mercado, eventos especiales, etc.).
                    4. Recomendaciones para mejorar las ventas basadas en el análisis.
                    5. Posibles escenarios (optimista, pesimista y más probable) para las ventas futuras.
                    6. Limitaciones de la predicción y sugerencias para mejorar la precisión en el futuro.

                    Presenta tu análisis de manera estructurada y fácil de entender.
                    """}
                ]
            )
            interpretacion = respuesta.choices[0].message.content
            return Response({'interpretacion': interpretacion})
        except Exception as e:
            logging.error(f"Error en la predicción de ventas: {str(e)}")
            return Response({'error': f'Error en la predicción: {str(e)}'}, status=500)
