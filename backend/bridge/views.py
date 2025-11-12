"""
Django REST Framework views for OSDAG Bridge Module API endpoints.

Views:
- LocationDataViewSet: CRUD endpoints for locations
- GeometryValidationView: POST endpoint for geometry validation
- MaterialOptionsView: GET endpoint for available materials
- SubmissionView: POST endpoint for form submissions
"""

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import LocationData, GeometryData, MaterialInput
from .serializers import (
    LocationDataSerializer,
    GeometryDataSerializer,
    MaterialInputSerializer,
)


class LocationDataViewSet(viewsets.ModelViewSet):
    """
    ViewSet for LocationData model.
    
    Endpoints:
    - GET /api/locations/ - List all locations
    - GET /api/locations/<id>/ - Retrieve specific location
    - GET /api/locations/by-state/<state>/ - Get locations by state
    """
    queryset = LocationData.objects.all()
    serializer_class = LocationDataSerializer
    
    @action(detail=False, methods=['get'])
    def by_state(self, request, state=None):
        """Get all districts for a specific state."""
        state = request.query_params.get('state')
        if not state:
            return Response(
                {'error': 'state parameter is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        locations = LocationData.objects.filter(state=state)
        serializer = self.get_serializer(locations, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_district(self, request):
        """Get location data for a specific state and district."""
        state = request.query_params.get('state')
        district = request.query_params.get('district')
        
        if not state or not district:
            return Response(
                {'error': 'state and district parameters are required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        location = get_object_or_404(
            LocationData,
            state=state,
            district=district
        )
        serializer = self.get_serializer(location)
        return Response(serializer.data)


class GeometryValidationView(APIView):
    """
    Validate and compute geometry parameters.
    
    POST /api/geometry/validate/
    
    Request body:
    {
        "carriageway_width": 7.5,
        "girder_spacing": 2.5,
        "num_girders": 4,
        "deck_overhang_width": 2.5
    }
    
    Response:
    {
        "valid": true,
        "overall_width": 12.5,
        "message": "Geometry validated successfully.",
        "errors": []
    }
    """
    
    def post(self, request):
        """Validate geometry and compute derived parameters."""
        try:
            carriageway_width = float(request.data.get('carriageway_width'))
            girder_spacing = float(request.data.get('girder_spacing'))
            num_girders = int(request.data.get('num_girders'))
            deck_overhang_width = float(request.data.get('deck_overhang_width'))
        except (TypeError, ValueError):
            return Response(
                {
                    'valid': False,
                    'message': 'Invalid input parameters',
                    'errors': ['All parameters must be valid numbers']
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Compute overall width
        overall_width = carriageway_width + 5
        
        # Validate constraints
        errors = []
        
        if girder_spacing >= overall_width:
            errors.append(
                f"Girder spacing ({girder_spacing}) must be < overall width ({overall_width})"
            )
        
        if deck_overhang_width >= overall_width:
            errors.append(
                f"Deck overhang ({deck_overhang_width}) must be < overall width ({overall_width})"
            )
        
        # Validate formula: (overall_width - overhang) / spacing = num_girders
        if girder_spacing > 0:
            calculated_girders = (overall_width - deck_overhang_width) / girder_spacing
            if abs(calculated_girders - num_girders) > 0.01:
                errors.append(
                    f"Geometry mismatch: Expected {calculated_girders:.2f} girders, got {num_girders}"
                )
        
        is_valid = len(errors) == 0
        
        # Create GeometryData record
        geometry = GeometryData.objects.create(
            carriageway_width=carriageway_width,
            girder_spacing=girder_spacing,
            num_girders=num_girders,
            deck_overhang_width=deck_overhang_width,
            overall_width=overall_width,
            valid=is_valid
        )
        
        return Response({
            'valid': is_valid,
            'overall_width': overall_width,
            'geometry_id': geometry.id,
            'message': 'Geometry validated successfully.' if is_valid else 'Geometry validation failed.',
            'errors': errors
        }, status=status.HTTP_200_OK)


class MaterialOptionsView(APIView):
    """
    Get available material options.
    
    GET /api/materials/
    
    Response:
    {
        "steel_options": ["E250", "E350", "E450"],
        "concrete_options": ["M25", "M30", ..., "M60"]
    }
    """
    
    def get(self, request):
        """Return available material options."""
        return Response({
            'steel_options': ['E250', 'E350', 'E450'],
            'concrete_options': [
                'M25', 'M30', 'M35', 'M40', 'M45', 'M50', 'M55', 'M60'
            ]
        })


class SubmissionView(APIView):
    """
    Handle form submissions.
    
    POST /api/submit/
    
    Request body:
    {
        "structure_type": "Highway",
        "location_id": 1,
        "geometry_id": 5,
        "materials": {
            "girder_steel": "E250",
            "cross_bracing_steel": "E250",
            "deck_concrete": "M25"
        }
    }
    """
    
    def post(self, request):
        """Store form submission."""
        try:
            materials_data = request.data.get('materials', {})
            
            # Create MaterialInput record
            material = MaterialInput.objects.create(
                girder_steel=materials_data.get('girder_steel', 'E250'),
                cross_bracing_steel=materials_data.get('cross_bracing_steel', 'E250'),
                deck_concrete=materials_data.get('deck_concrete', 'M25')
            )
            
            serializer = MaterialInputSerializer(material)
            return Response({
                'success': True,
                'message': 'Form submitted successfully.',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({
                'success': False,
                'message': f'Error submitting form: {str(e)}'
            }, status=status.HTTP_400_BAD_REQUEST)
