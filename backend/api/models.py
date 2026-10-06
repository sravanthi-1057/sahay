from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    icon = models.CharField(max_length=50, default='bi-grid')
    description = models.TextField(blank=True)
    count = models.IntegerField(default=0)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']

    def __str__(self):
        return self.name


class Service(models.Model):
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='services')
    description = models.TextField()
    keywords = models.JSONField(default=list, blank=True)
    why_it_helps = models.TextField(blank=True)
    eligibility = models.JSONField(default=list, blank=True)
    documents = models.JSONField(default=list, blank=True)
    steps = models.JSONField(default=list, blank=True)
    helpline = models.CharField(max_length=100, blank=True, default='')
    official_url = models.URLField(max_length=500, blank=True, default='')
    location = models.CharField(max_length=100, default='Pan-India')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return f"{self.name} ({self.category.name})"


class SavedService(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='saved_services')
    session_key = models.CharField(max_length=100, blank=True, default='')
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='saved_by')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Saved: {self.service.name}"


class DiagnosticQueryLog(models.Model):
    query_text = models.TextField()
    matched_services_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Query: {self.query_text[:30]}... ({self.created_at.strftime('%Y-%m-%d %H:%M')})"
