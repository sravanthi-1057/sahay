from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.db.models import Q
import re

from .models import Category, Service, SavedService, DiagnosticQueryLog
from .serializers import (
    CategorySerializer, ServiceSerializer, SavedServiceSerializer,
    UserSerializer, RegisterSerializer, LoginSerializer
)

class CategoryListAPIView(APIView):
    """List all available service categories with counts."""
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        categories = Category.objects.all().order_by('name')
        # Dynamic update count per category
        for cat in categories:
            cat.count = cat.services.count()
            cat.save(update_fields=['count'])
            
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ServiceListAPIView(APIView):
    """List services with optional category filter and keyword search."""
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        queryset = Service.objects.all().select_related('category')
        
        category_name = request.query_params.get('category', None)
        search_query = request.query_params.get('search', None)
        location = request.query_params.get('location', None)

        if category_name and category_name != 'All Categories':
            queryset = queryset.filter(category__name__iexact=category_name)

        if search_query:
            query = search_query.strip()
            queryset = queryset.filter(
                Q(name__icontains=query) |
                Q(description__icontains=query) |
                Q(category__name__icontains=query) |
                Q(why_it_helps__icontains=query) |
                Q(keywords__icontains=query)
            ).distinct()

        if location:
            queryset = queryset.filter(Q(location__icontains=location) | Q(location__iexact='Pan-India'))

        serializer = ServiceSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ServiceDetailAPIView(APIView):
    """Retrieve detailed information for a single service by ID."""
    permission_classes = [permissions.AllowAny]

    def get(self, request, pk):
        try:
            service = Service.objects.select_related('category').get(pk=pk)
            serializer = ServiceSerializer(service)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Service.DoesNotExist:
            return Response({'error': 'Service not found.'}, status=status.HTTP_404_NOT_FOUND)


class DiagnosticProblemMatcherAPIView(APIView):
    """
    SAHAY Core Diagnostic Problem Solver.
    Analyzes natural language text problem descriptions (e.g., 'I cannot afford my college fee')
    and matches relevant public services.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        query_text = request.data.get('query', '').strip()
        if not query_text:
            return Response({'error': 'Please provide a description of your problem or situation.'}, status=status.HTTP_400_BAD_REQUEST)

        # Normalize words in query
        tokens = [word.lower() for word in re.findall(r'\w+', query_text) if len(word) > 2]
        
        services = Service.objects.all().select_related('category')
        scored_services = []

        for service in services:
            score = 0
            text_pool = f"{service.name} {service.description} {service.why_it_helps} {service.category.name}".lower()
            keywords_pool = [k.lower() for k in (service.keywords or [])]

            for token in tokens:
                if token in keywords_pool:
                    score += 5
                elif token in text_pool:
                    score += 2

            if score > 0:
                scored_services.append((score, service))

        # Sort by match score descending
        scored_services.sort(key=lambda x: x[0], reverse=True)
        matched_services = [item[1] for item in scored_services[:6]] # top 6

        # Fallback if no exact keywords matched: return all featured services
        if not matched_services:
            matched_services = list(services[:6])

        # Log query
        DiagnosticQueryLog.objects.create(
            query_text=query_text,
            matched_services_count=len(matched_services)
        )

        serializer = ServiceSerializer(matched_services, many=True)
        return Response({
            'query': query_text,
            'match_count': len(matched_services),
            'results': serializer.data
        }, status=status.HTTP_200_OK)


class SavedServiceToggleAPIView(APIView):
    """Toggle save/bookmark for a service (supports guest session or auth user)."""
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        if request.user.is_authenticated:
            saved = SavedService.objects.filter(user=request.user)
        else:
            session_key = request.session.session_key or 'guest_default'
            saved = SavedService.objects.filter(session_key=session_key)

        serializer = SavedServiceSerializer(saved, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        service_id = request.data.get('service_id')
        if not service_id:
            return Response({'error': 'service_id is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            service = Service.objects.get(pk=service_id)
        except Service.DoesNotExist:
            return Response({'error': 'Service not found.'}, status=status.HTTP_404_NOT_FOUND)

        if request.user.is_authenticated:
            saved_item, created = SavedService.objects.get_or_create(user=request.user, service=service)
        else:
            if not request.session.session_key:
                request.session.save()
            session_key = request.session.session_key or 'guest_default'
            saved_item, created = SavedService.objects.get_or_create(session_key=session_key, service=service)

        if not created:
            saved_item.delete()
            return Response({'status': 'removed', 'is_saved': False, 'message': 'Service removed from saved items.'})

        return Response({'status': 'saved', 'is_saved': True, 'message': 'Service saved successfully.'})


class RegisterAPIView(APIView):
    """User account registration endpoint."""
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            login(request, user)
            user_data = UserSerializer(user).data
            return Response({
                'message': 'Registration successful.',
                'user': user_data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    """User authentication login endpoint."""
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                user_data = UserSerializer(user).data
                return Response({
                    'message': 'Login successful.',
                    'user': user_data
                }, status=status.HTTP_200_OK)
            return Response({'error': 'Invalid username or password.'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CurrentUserAPIView(APIView):
    """Get current authenticated user info or logout."""
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        if request.user.is_authenticated:
            return Response({'authenticated': True, 'user': UserSerializer(request.user).data})
        return Response({'authenticated': False, 'user': None})

    def post(self, request):
        logout(request)
        return Response({'message': 'Logged out successfully.'}, status=status.HTTP_200_OK)
