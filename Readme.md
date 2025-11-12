# Quick Start Guide - OSDAG Full-Stack Development

## 🚀 Getting Started (5 Minutes)

### Prerequisites
- Python 3.8+ installed
- Node.js and npm installed
- Both servers can run on localhost simultaneously

---

## **Option A: Start Frontend Only**

```bash
cd frontend
npm install          # First time only
npm run dev
```

**Result:** App opens at `http://localhost:5173`

---

## **Option B: Start Backend Only**

```bash
cd backend
pip install -r requirements.txt    # First time only
python manage.py runserver
```

**Result:** API available at `http://localhost:8000/api/`

---

## **Option C: Run Both (Full-Stack) - Recommended**

### Terminal 1 - Frontend
```bash
cd frontend
npm run dev
```

### Terminal 2 - Backend
```bash
cd osdag_backend
python manage.py runserver
```

### Terminal 3 - Optional: Test Backend
```bash
cd osdag_backend
# List locations
curl http://localhost:8000/api/locations/

# Validate geometry
curl -X POST http://localhost:8000/api/geometry/validate/ \
  -H "Content-Type: application/json" \
  -d '{"carriageway_width":7.5,"girder_spacing":2.5,"num_girders":4,"deck_overhang_width":1.0}'

# Get materials
curl http://localhost:8000/api/materials/
```

---

## 📍 URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5173 | React app (Vite dev server) |
| Backend | http://localhost:8000 | Django dev server |
| API | http://localhost:8000/api/ | DRF browsable API |
| Locations | http://localhost:8000/api/locations/ | Browse 5 cities |

---

## 🛠️ Common Commands

### Frontend
```bash
cd frontend
npm install              # Install dependencies
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
```

### Backend
```bash
cd osdag_backend
pip install -r requirements.txt              # Install dependencies
python manage.py migrate                     # Run migrations (first time)
python manage.py seed_locations              # Populate database with 5 cities
python manage.py runserver                   # Start dev server
python manage.py createsuperuser             # Create admin user
python manage.py shell                       # Interactive Python shell
```

---

## 📊 Seeded Cities

| City | State | Wind (m/s) | Seismic Zone | Temp Max | Temp Min |
|------|-------|-----------|---------|----------|----------|
| Mumbai | Maharashtra | 39 | II | 33°C | 24°C |
| New Delhi | Delhi | 47 | IV | 45°C | 5°C |
| Chennai | Tamil Nadu | 44 | II | 38°C | 25°C |
| Bangalore | Karnataka | 35 | III | 30°C | 15°C |
| Kolkata | West Bengal | 42 | III | 38°C | 10°C |

---

## 🔗 API Endpoints Quick Reference

```
GET    /api/locations/                    # List all locations
GET    /api/locations/by_state/           # Filter by state
GET    /api/locations/by_district/        # Filter by district
POST   /api/geometry/validate/            # Validate bridge geometry
GET    /api/materials/                    # Get material options
POST   /api/submit/                       # Submit design
```

---

## 📁 Project Structure

```
Osdag/
├── frontend/                    # React + Vite + Tailwind
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/          # 15 reusable components
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── styles/
│   ├── package.json
│   ├── vite.config.js
│   ├── README.md
│   └── ... (docs)
│
└── osdag_backend/               # Django + DRF
    ├── bridge/                  # Main app
    │   ├── models.py            # 3 models
    │   ├── views.py             # 4 endpoints
    │   ├── serializers.py
    │   └── urls.py
    ├── manage.py
    ├── requirements.txt
    ├── README.md
    └── db.sqlite3               # Database
```

---

## ⚙️ Configuration

### CORS Settings (Pre-configured)
✅ `http://localhost:3000`
✅ `http://localhost:5173`
✅ `http://127.0.0.1:3000`
✅ `http://127.0.0.1:5173`

### Database
- Type: SQLite
- File: `osdag_backend/db.sqlite3`
- No additional setup needed!

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Make sure you're in the right directory
cd osdag_backend

# Try resetting the database
rm db.sqlite3
python manage.py makemigrations
python manage.py migrate
python manage.py seed_locations
python manage.py runserver
```

### Frontend won't connect to backend
1. Make sure backend is running on `http://localhost:8000`
2. Check CORS settings in `osdag_backend/osdag_backend/settings.py`
3. Try: `curl http://localhost:8000/api/locations/` to test backend directly

### Package installation issues
```bash
# Frontend
cd frontend
rm -r node_modules
rm package-lock.json
npm install

# Backend
cd osdag_backend
rm -r venv
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

---

## 📚 Documentation

- **Frontend Docs**: `frontend/README.md`
- **Backend Docs**: `osdag_backend/README.md`
- **Full Summary**: `DEPLOYMENT_COMPLETE.md`

---

## 🎯 What's Included

✅ 15 React components  
✅ React Router navigation  
✅ Tailwind CSS styling  
✅ Django backend with DRF  
✅ 3 data models  
✅ 4 REST API endpoints  
✅ Real-time geometry validation  
✅ CORS pre-configured  
✅ 5 cities data seeded  
✅ SQLite database  
✅ Comprehensive docs  

**Ready to use! No additional setup needed.** 🚀

---

**Version**: 1.0.0  
**Last Updated**: November 12, 2025
