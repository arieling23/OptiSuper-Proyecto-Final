# myapp/admin.py

from django.contrib import admin # type: ignore
from django.contrib.auth.admin import UserAdmin # type: ignore
from .models import CustomUser

admin.site.register(CustomUser, UserAdmin)
