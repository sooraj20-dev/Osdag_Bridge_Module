# OSDAG Bridge Module - Django REST API Backend

A Django REST Framework backend for the OSDAG Bridge Group Design Module, providing RESTful API endpoints for bridge configuration, material selection, and geometric validation.

## 📋 Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)

## ✨ Features

- **Location Management**: Browse and filter location data by state/district with environmental parameters (wind speed, seismic zones, temperature)
- **Geometry Validation**: Real-time validation of bridge geometry with formula-based constraint checking
- **Material Selection**: Predefined options for girder steel grades and concrete types
- **Data Persistence**: SQLite database with migrations for scalable deployment
- **CORS Support**: Pre-configured for development with localhost and 127.0.0.1 on ports 3000 and 5173
- **API Documentation**: DRF browsable API interface with interactive endpoints

## 📦 Requirements

- Python 3.8+
- Django 4.2.0
- Django REST Framework 3.14.0
- django-cors-headers 4.2.0
- python-decouple 3.8

## 🚀 Installation

### 1. Navigate to Backend Directory
```bash
cd osdag_backend
```

### 2. Create Virtual Environment (Optional but Recommended)
```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

## ⚙️ Configuration

The backend is pre-configured in `osdag_backend/settings.py` with:

- **INSTALLED_APPS**: `rest_framework`, `corsheaders`, `bridge` (bridge module)
- **CORS Settings**: Allows requests from:
  - `http://localhost:3000`
  - `http://localhost:5173`
  - `http://127.0.0.1:3000`
  - `http://127.0.0.1:5173`
- **REST Framework**: Pagination enabled (page size: 10)
- **Database**: SQLite (`db.sqlite3`)

### Environment Variables (Optional)
Create a `.env` file in the project root:
```
DEBUG=True
SECRET_KEY=your-secret-key-here
```

## 🗄️ Database Setup

### Run Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### Seed Initial Location Data
Populate the database with 5 major Indian cities:
```bash
python manage.py seed_locations
```

**Seeded Locations:**
- Mumbai, Maharashtra (Wind: 39 m/s, Seismic Zone II)
- New Delhi, Delhi (Wind: 47 m/s, Seismic Zone IV)
- Chennai, Tamil Nadu (Wind: 44 m/s, Seismic Zone II)
- Bangalore, Karnataka (Wind: 35 m/s, Seismic Zone III)
- Kolkata, West Bengal (Wind: 42 m/s, Seismic Zone III)

## ▶️ Running the Server

Start the development server:
```bash
python manage.py runserver
```

The API will be available at: `http://localhost:8000/api/`

Access the browsable API: `http://localhost:8000/api/`

## 📡 API Endpoints

### Locations

#### List All Locations
```http
GET /api/locations/
```

**Response:**
```json
{
  "count": 5,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "state": "Maharashtra",
      "district": "Mumbai",
      "basic_wind_speed": 39,
      "seismic_zone": "II",
      "seismic_factor": 0.1,
      "temperature_max": 33,
      "temperature_min": 24
    }
  ]
}
```

#### Filter by State
```http
GET /api/locations/by_state/?state=Delhi
```

#### Filter by District
```http
GET /api/locations/by_district/?district=Mumbai
```

### Geometry Validation

#### Validate Bridge Geometry
```http
POST /api/geometry/validate/
Content-Type: application/json

{
  "carriageway_width": 7.5,
  "girder_spacing": 2.5,
  "num_girders": 4,
  "deck_overhang_width": 1.0
}
```

**Response (Valid):**
```json
{
  "valid": true,
  "overall_width": 12.5,
  "geometry_id": 1,
  "message": "Geometry is valid",
  "errors": []
}
```

**Validation Formula:**
- `overall_width = carriageway_width + 5` (includes overhang allowance)
- `(overall_width - deck_overhang_width) / girder_spacing ≈ num_girders` (±0.01 tolerance)
- `girder_spacing < overall_width`
- `deck_overhang_width < overall_width`

### Material Options

#### Get Available Materials
```http
GET /api/materials/
```

**Response:**
```json
{
  "steel_options": [
    {"value": "E250", "label": "E250 (250 MPa)"},
    {"value": "E350", "label": "E350 (350 MPa)"},
    {"value": "E450", "label": "E450 (450 MPa)"}
  ],
  "concrete_options": [
    {"value": "M25", "label": "M25 (25 MPa)"},
    {"value": "M30", "label": "M30 (30 MPa)"},
    {"value": "M35", "label": "M35 (35 MPa)"},
    {"value": "M40", "label": "M40 (40 MPa)"},
    {"value": "M45", "label": "M45 (45 MPa)"},
    {"value": "M50", "label": "M50 (50 MPa)"},
    {"value": "M60", "label": "M60 (60 MPa)"}
  ]
}
```

### Submission

#### Submit Bridge Design
```http
POST /api/submit/
Content-Type: application/json

{
  "girder_steel": "E350",
  "cross_bracing_steel": "E350",
  "deck_concrete": "M35"
}
```

**Response:**
```json
{
  "success": true,
  "id": 1,
  "message": "Material inputs saved successfully",
  "girder_steel": "E350",
  "cross_bracing_steel": "E350",
  "deck_concrete": "M35"
}
```

## 🧪 Testing

### Test Location API
```bash
curl http://localhost:8000/api/locations/
```

### Test Geometry Validation
```bash
curl -X POST http://localhost:8000/api/geometry/validate/ \
  -H "Content-Type: application/json" \
  -d '{
    "carriageway_width": 7.5,
    "girder_spacing": 2.5,
    "num_girders": 4,
    "deck_overhang_width": 1.0
  }'
```

### Interactive Testing
Visit the browsable API in your browser: `http://localhost:8000/api/`

All endpoints are accessible through the DRF interactive interface with request/response formatting.

## 📁 Project Structure

```
osdag_backend/
├── manage.py                           # Django management script
├── db.sqlite3                          # SQLite database
├── requirements.txt                    # Python dependencies
├── osdag_backend/                      # Project configuration
│   ├── settings.py                     # Django settings (INSTALLED_APPS, CORS, etc.)
│   ├── urls.py                         # Root URL routing
│   ├── wsgi.py                         # WSGI application
│   └── asgi.py                         # ASGI application
└── bridge/                             # Bridge module app
    ├── models.py                       # LocationData, GeometryData, MaterialInput
    ├── serializers.py                  # DRF serializers for all models
    ├── views.py                        # API views and viewsets
    ├── urls.py                         # Bridge app URL routing
    ├── admin.py                        # Django admin configuration
    ├── apps.py                         # App configuration
    ├── tests.py                        # Test suite
    └── management/
        └── commands/
            └── seed_locations.py       # Management command for seeding data
```

## 🔗 Integration with Frontend

The backend is designed to work seamlessly with the React frontend. Frontend API calls should use:

```javascript
const API_BASE_URL = 'http://localhost:8000/api';

// Example: Fetch locations
fetch(`${API_BASE_URL}/locations/`)
  .then(response => response.json())
  .then(data => console.log(data));
```

CORS is pre-configured to allow requests from the React development servers on ports 3000 and 5173.

## 📝 License

This project is part of OSDAG (Open Source Detailing of Steel And Composite Members Across Grid). See the main project LICENSE for details.

## 🤝 Contributing

For contributions, please follow the existing code structure and include appropriate docstrings for all models, views, and serializers.

---

**Created**: 2024  
**Last Updated**: 2024  
**Backend Version**: 1.0.0
