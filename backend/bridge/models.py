"""
Django models for OSDAG Bridge Module Group Design Tool.

Models:
- LocationData: Stores environmental reference data (wind speed, seismic zone, temperature)
- GeometryData: Stores geometric parameters from ModifyGeometryModal
- MaterialInput: Stores selected material grades (steel, concrete)
"""

from django.db import models


class LocationData(models.Model):
    """
    Holds engineering reference data for bridge locations.
    
    Fields:
    - state: State name (e.g., 'Maharashtra')
    - district: District/city name (e.g., 'Mumbai')
    - basic_wind_speed: Wind speed in m/s
    - seismic_zone: Seismic zone (e.g., 'Zone II')
    - seismic_factor: Seismic acceleration factor
    - temperature_max: Maximum temperature in °C
    - temperature_min: Minimum temperature in °C
    """
    state = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    basic_wind_speed = models.FloatField()
    seismic_zone = models.CharField(max_length=50)
    seismic_factor = models.FloatField()
    temperature_max = models.FloatField()
    temperature_min = models.FloatField()
    
    class Meta:
        ordering = ['state', 'district']
        verbose_name = 'Location Data'
        verbose_name_plural = 'Location Data'
        unique_together = ('state', 'district')
    
    def __str__(self):
        return f"{self.district}, {self.state}"


class GeometryData(models.Model):
    """
    Stores geometric parameters from ModifyGeometryModal.
    
    Fields:
    - carriageway_width: Carriageway width in meters
    - girder_spacing: Spacing between girders in meters
    - num_girders: Number of girders (integer)
    - deck_overhang_width: Deck overhang width in meters
    - overall_width: Calculated as carriageway_width + 5
    - valid: Whether the geometry satisfies validation constraints
    - created_at: Timestamp when record was created
    - updated_at: Timestamp when record was last updated
    """
    carriageway_width = models.FloatField()
    girder_spacing = models.FloatField()
    num_girders = models.IntegerField()
    deck_overhang_width = models.FloatField()
    overall_width = models.FloatField()
    valid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Geometry Data'
        verbose_name_plural = 'Geometry Data'
    
    def __str__(self):
        return f"Geometry (Width: {self.carriageway_width}m, Girders: {self.num_girders})"


class MaterialInput(models.Model):
    """
    Stores selected material grades for bridge design.
    
    Fields:
    - girder_steel: Girder steel grade (E250, E350, E450)
    - cross_bracing_steel: Cross-bracing steel grade (E250, E350, E450)
    - deck_concrete: Deck concrete grade (M25-M60)
    - created_at: Timestamp when record was created
    - updated_at: Timestamp when record was last updated
    """
    STEEL_CHOICES = [
        ('E250', 'E250 (250 MPa)'),
        ('E350', 'E350 (350 MPa)'),
        ('E450', 'E450 (450 MPa)'),
    ]
    
    CONCRETE_CHOICES = [
        ('M25', 'M25 (25 MPa)'),
        ('M30', 'M30 (30 MPa)'),
        ('M35', 'M35 (35 MPa)'),
        ('M40', 'M40 (40 MPa)'),
        ('M45', 'M45 (45 MPa)'),
        ('M50', 'M50 (50 MPa)'),
        ('M55', 'M55 (55 MPa)'),
        ('M60', 'M60 (60 MPa)'),
    ]
    
    girder_steel = models.CharField(
        max_length=10,
        choices=STEEL_CHOICES,
        default='E250'
    )
    cross_bracing_steel = models.CharField(
        max_length=10,
        choices=STEEL_CHOICES,
        default='E250'
    )
    deck_concrete = models.CharField(
        max_length=10,
        choices=CONCRETE_CHOICES,
        default='M25'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Material Input'
        verbose_name_plural = 'Material Inputs'
    
    def __str__(self):
        return f"Materials (Girder: {self.girder_steel}, Concrete: {self.deck_concrete})"
