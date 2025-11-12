"""
URL configuration for the bridge app.

Endpoints:
- /api/locations/ - List all locations
- /api/locations/by_state/ - Filter by state
- /api/locations/by_district/ - Filter by state and district
- /api/geometry/validate/ - Validate geometry
- /api/materials/ - Get material options
- /api/submit/ - Submit form
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    LocationDataViewSet,
    GeometryValidationView,
    MaterialOptionsView,
    SubmissionView,
)

router = DefaultRouter()
router.register(r'locations', LocationDataViewSet, basename='location')

urlpatterns = [
    path('', include(router.urls)),
    path('geometry/validate/', GeometryValidationView.as_view(), name='geometry-validate'),
    path('materials/', MaterialOptionsView.as_view(), name='materials'),
    path('submit/', SubmissionView.as_view(), name='submit'),
]
