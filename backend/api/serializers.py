from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Service, SavedService, DiagnosticQueryLog

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'icon', 'description', 'count']


class ServiceSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name', read_only=True)
    category_id = serializers.IntegerField(source='category.id', read_only=True)
    whyItHelps = serializers.CharField(source='why_it_helps', read_only=True)
    officialUrl = serializers.CharField(source='official_url', read_only=True)

    class Meta:
        model = Service
        fields = [
            'id', 'name', 'category', 'category_id', 'description',
            'keywords', 'whyItHelps', 'eligibility', 'documents',
            'steps', 'helpline', 'officialUrl', 'location', 'created_at'
        ]


class SavedServiceSerializer(serializers.ModelSerializer):
    service = ServiceSerializer(read_only=True)

    class Meta:
        model = SavedService
        fields = ['id', 'service', 'created_at']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    full_name = serializers.CharField(required=False, allow_blank=True)

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username is already taken.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("An account with this email already exists.")
        return value

    def create(self, validated_data):
        full_name = validated_data.get('full_name', '')
        first_name = full_name.split()[0] if full_name else ''
        last_name = ' '.join(full_name.split()[1:]) if full_name and len(full_name.split()) > 1 else ''

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=first_name,
            last_name=last_name
        )
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)
