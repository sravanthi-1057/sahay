from django.urls import path
from .views import (
    CategoryListAPIView, ServiceListAPIView, ServiceDetailAPIView,
    DiagnosticProblemMatcherAPIView, SavedServiceToggleAPIView,
    RegisterAPIView, LoginAPIView, CurrentUserAPIView
)

urlpatterns = [
    path('categories/', CategoryListAPIView.as_view(), name='api-categories'),
    path('services/', ServiceListAPIView.as_view(), name='api-services'),
    path('services/<int:pk>/', ServiceDetailAPIView.as_view(), name='api-service-detail'),
    path('find-help/', DiagnosticProblemMatcherAPIView.as_view(), name='api-find-help'),
    path('saved-services/', SavedServiceToggleAPIView.as_view(), name='api-saved-services'),
    path('auth/register/', RegisterAPIView.as_view(), name='api-register'),
    path('auth/login/', LoginAPIView.as_view(), name='api-login'),
    path('auth/me/', CurrentUserAPIView.as_view(), name='api-me'),
]
