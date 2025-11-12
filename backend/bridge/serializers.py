"""
Django REST Framework serializers for OSDAG Bridge Module models.

Serializers:
- LocationDataSerializer: Serializes LocationData model
- GeometryDataSerializer: Serializes GeometryData model
- MaterialInputSerializer: Serializes MaterialInput model
"""

from rest_framework import serializers
from .models import LocationData, GeometryData, MaterialInput


class LocationDataSerializer(serializers.ModelSerializer):
    """Serializer for LocationData model."""
    
    class Meta:
        model = LocationData
        fields = [
            'id',
            'state',
            'district',
            'basic_wind_speed',
            'seismic_zone',
            'seismic_factor',
            'temperature_max',
            'temperature_min',
        ]
        read_only_fields = ['id']


class GeometryDataSerializer(serializers.ModelSerializer):
    """Serializer for GeometryData model."""
    
    class Meta:
        model = GeometryData
        fields = [
            'id',
            'carriageway_width',
            'girder_spacing',
            'num_girders',
            'deck_overhang_width',
            'overall_width',
            'valid',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'overall_width', 'valid', 'created_at', 'updated_at']


class MaterialInputSerializer(serializers.ModelSerializer):
    """Serializer for MaterialInput model."""
    
    STEEL_OPTIONS = [
        {'value': 'E250', 'label': 'E250 (250 MPa)'},
        {'value': 'E350', 'label': 'E350 (350 MPa)'},
        {'value': 'E450', 'label': 'E450 (450 MPa)'},
    ]
    
    CONCRETE_OPTIONS = [
        {'value': 'M25', 'label': 'M25 (25 MPa)'},
        {'value': 'M30', 'label': 'M30 (30 MPa)'},
        {'value': 'M35', 'label': 'M35 (35 MPa)'},
        {'value': 'M40', 'label': 'M40 (40 MPa)'},
        {'value': 'M45', 'label': 'M45 (45 MPa)'},
        {'value': 'M50', 'label': 'M50 (50 MPa)'},
        {'value': 'M55', 'label': 'M55 (55 MPa)'},
        {'value': 'M60', 'label': 'M60 (60 MPa)'},
    ]
    
    class Meta:
        model = MaterialInput
        fields = [
            'id',
            'girder_steel',
            'cross_bracing_steel',
            'deck_concrete',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def to_representation(self, instance):
        """Add options to serialized data."""
        ret = super().to_representation(instance)
        ret['steel_options'] = self.STEEL_OPTIONS
        ret['concrete_options'] = self.CONCRETE_OPTIONS
        return ret
