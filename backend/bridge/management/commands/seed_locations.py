from django.core.management.base import BaseCommand
from bridge.models import LocationData


class Command(BaseCommand):
    """
    Management command to seed initial location data for Indian cities.
    
    Usage: python manage.py seed_locations
    """
    help = 'Seed location data with 5 major Indian cities and their environmental parameters'

    def handle(self, *args, **options):
        # Define initial location data based on frontend mockApi.js
        locations_data = [
            # --- North India ---
            {
                'state': 'Delhi',
                'district': 'New Delhi',
                'basic_wind_speed': 47,
                'seismic_zone': 'IV',
                'seismic_factor': 0.24,
                'temperature_max': 45,
                'temperature_min': 5,
            },
            {
                'state': 'Uttar Pradesh',
                'district': 'Lucknow',
                'basic_wind_speed': 47,
                'seismic_zone': 'III',
                'seismic_factor': 0.16,
                'temperature_max': 43,
                'temperature_min': 7,
            },
            {
                'state': 'Punjab',
                'district': 'Amritsar',
                'basic_wind_speed': 47,
                'seismic_zone': 'IV',
                'seismic_factor': 0.24,
                'temperature_max': 44,
                'temperature_min': 2,
            },
            {
                'state': 'Haryana',
                'district': 'Gurugram',
                'basic_wind_speed': 47,
                'seismic_zone': 'IV',
                'seismic_factor': 0.24,
                'temperature_max': 44,
                'temperature_min': 5,
            },
            {
                'state': 'Himachal Pradesh',
                'district': 'Shimla',
                'basic_wind_speed': 39,
                'seismic_zone': 'IV',
                'seismic_factor': 0.24,
                'temperature_max': 28,
                'temperature_min': -2,
            },

            # --- West India ---
            {
                'state': 'Maharashtra',
                'district': 'Mumbai',
                'basic_wind_speed': 39,
                'seismic_zone': 'III',
                'seismic_factor': 0.16,
                'temperature_max': 34,
                'temperature_min': 22,
            },
            {
                'state': 'Gujarat',
                'district': 'Ahmedabad',
                'basic_wind_speed': 50,
                'seismic_zone': 'III',
                'seismic_factor': 0.16,
                'temperature_max': 43,
                'temperature_min': 10,
            },
            {
                'state': 'Rajasthan',
                'district': 'Jaipur',
                'basic_wind_speed': 47,
                'seismic_zone': 'II',
                'seismic_factor': 0.10,
                'temperature_max': 46,
                'temperature_min': 8,
            },
            {
                'state': 'Goa',
                'district': 'Panaji',
                'basic_wind_speed': 44,
                'seismic_zone': 'III',
                'seismic_factor': 0.16,
                'temperature_max': 33,
                'temperature_min': 21,
            },

            # --- South India ---
            {
                'state': 'Tamil Nadu',
                'district': 'Chennai',
                'basic_wind_speed': 50,
                'seismic_zone': 'II',
                'seismic_factor': 0.10,
                'temperature_max': 38,
                'temperature_min': 25,
            },
            {
                'state': 'Karnataka',
                'district': 'Bangalore',
                'basic_wind_speed': 39,
                'seismic_zone': 'II',
                'seismic_factor': 0.10,
                'temperature_max': 30,
                'temperature_min': 15,
            },
            {
                'state': 'Kerala',
                'district': 'Thiruvananthapuram',
                'basic_wind_speed': 44,
                'seismic_zone': 'III',
                'seismic_factor': 0.16,
                'temperature_max': 32,
                'temperature_min': 23,
            },
            {
                'state': 'Telangana',
                'district': 'Hyderabad',
                'basic_wind_speed': 39,
                'seismic_zone': 'II',
                'seismic_factor': 0.10,
                'temperature_max': 39,
                'temperature_min': 17,
            },
            {
                'state': 'Andhra Pradesh',
                'district': 'Vishakhapatnam',
                'basic_wind_speed': 50,
                'seismic_zone': 'II',
                'seismic_factor': 0.10,
                'temperature_max': 37,
                'temperature_min': 22,
            },

            # --- East India ---
            {
                'state': 'West Bengal',
                'district': 'Kolkata',
                'basic_wind_speed': 50,
                'seismic_zone': 'III',
                'seismic_factor': 0.16,
                'temperature_max': 38,
                'temperature_min': 12,
            },
            {
                'state': 'Odisha',
                'district': 'Bhubaneswar',
                'basic_wind_speed': 50,
                'seismic_zone': 'III',
                'seismic_factor': 0.16,
                'temperature_max': 40,
                'temperature_min': 14,
            },
            {
                'state': 'Bihar',
                'district': 'Patna',
                'basic_wind_speed': 47,
                'seismic_zone': 'IV',
                'seismic_factor': 0.24,
                'temperature_max': 42,
                'temperature_min': 8,
            },
            {
                'state': 'Jharkhand',
                'district': 'Ranchi',
                'basic_wind_speed': 47,
                'seismic_zone': 'III',
                'seismic_factor': 0.16,
                'temperature_max': 38,
                'temperature_min': 9,
            },
            {
                'state': 'Assam',
                'district': 'Guwahati',
                'basic_wind_speed': 50,
                'seismic_zone': 'V',
                'seismic_factor': 0.36,
                'temperature_max': 36,
                'temperature_min': 12,
            },

            # --- Central India ---
            {
                'state': 'Madhya Pradesh',
                'district': 'Bhopal',
                'basic_wind_speed': 47,
                'seismic_zone': 'III',
                'seismic_factor': 0.16,
                'temperature_max': 42,
                'temperature_min': 9,
            },
            {
                'state': 'Chhattisgarh',
                'district': 'Raipur',
                'basic_wind_speed': 44,
                'seismic_zone': 'II',
                'seismic_factor': 0.10,
                'temperature_max': 40,
                'temperature_min': 13,
            },

            # --- North-East India ---
            {
                'state': 'Meghalaya',
                'district': 'Shillong',
                'basic_wind_speed': 39,
                'seismic_zone': 'V',
                'seismic_factor': 0.36,
                'temperature_max': 28,
                'temperature_min': 8,
            },
            {
                'state': 'Tripura',
                'district': 'Agartala',
                'basic_wind_speed': 44,
                'seismic_zone': 'V',
                'seismic_factor': 0.36,
                'temperature_max': 35,
                'temperature_min': 11,
            },
            {
                'state': 'Nagaland',
                'district': 'Kohima',
                'basic_wind_speed': 39,
                'seismic_zone': 'V',
                'seismic_factor': 0.36,
                'temperature_max': 30,
                'temperature_min': 6,
            },
            {
                'state': 'Manipur',
                'district': 'Imphal',
                'basic_wind_speed': 44,
                'seismic_zone': 'V',
                'seismic_factor': 0.36,
                'temperature_max': 33,
                'temperature_min': 8,
            },
            {
                'state': 'Mizoram',
                'district': 'Aizawl',
                'basic_wind_speed': 44,
                'seismic_zone': 'V',
                'seismic_factor': 0.36,
                'temperature_max': 31,
                'temperature_min': 7,
            },
            {
                'state': 'Arunachal Pradesh',
                'district': 'Itanagar',
                'basic_wind_speed': 50,
                'seismic_zone': 'V',
                'seismic_factor': 0.36,
                'temperature_max': 34,
                'temperature_min': 10,
            },
        ]


        # Check if data already exists to avoid duplicates
        existing_count = LocationData.objects.count()
        if existing_count > 0:
            self.stdout.write(
                self.style.WARNING(
                    f'LocationData table already contains {existing_count} records. Skipping seeding.'
                )
            )
            return

        # Create LocationData objects
        try:
            created_locations = LocationData.objects.bulk_create([
                LocationData(**location_data) for location_data in locations_data
            ])
            
            self.stdout.write(
                self.style.SUCCESS(
                    f'Successfully seeded {len(created_locations)} location(s):\n'
                )
            )
            
            for location in created_locations:
                self.stdout.write(
                    f'  ✓ {location.district}, {location.state} '
                    f'(Wind: {location.basic_wind_speed} m/s, '
                    f'Seismic Zone: {location.seismic_zone})'
                )
                
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error seeding location data: {str(e)}')
            )
