# myapp/urls.py

from django.urls import path # type: ignore
from .views import SignUpView, LoginView, LogoutView, PasswordResetRequestView, PasswordResetConfirmView, csrf_token_view, VerifyTokenView,predict_price,PrediccionVentas
from rest_framework_simplejwt.views import  TokenObtainPairView,TokenRefreshView # type: ignore


urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('csrf-token/', csrf_token_view, name='csrf_token'),
    path('reset_password/', PasswordResetRequestView.as_view(), name='password_reset'),
    path('reset_password_confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('verify-token/', VerifyTokenView.as_view(), name='verify_token'),
    path('predict-price/', predict_price, name='predict_price'),
    path('predict-sales/', PrediccionVentas.as_view(), name='predict_sales'),
]