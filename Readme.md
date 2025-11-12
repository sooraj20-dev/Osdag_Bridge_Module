# 🧱 **OSDAG Bridge Module – Web Application**

> 🧩 *A web-based UI developed for the OSDAG Bridge Group Design Module Screening Task (Web Version)*  
> Built using **React + Django REST Framework** for bridge geometry input, validation, and visualization.

---

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%20%7C%20Vite-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Backend-Django%20%7C%20DRF-green?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/UI-TailwindCSS-38B2AC?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Database-SQLite-lightgrey?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Language-JavaScript%20%7C%20Python-yellow?style=for-the-badge"/>
</p>

---

## 🎥 **Demo Preview**

> 🎬 Add your demo video or GIF below  
> *(Replace `demo.gif` after recording your screen)*

<p align="center">
  <img src="demo.gif" alt="OSDAG Bridge Module Demo" width="850px"/>
</p>

---

## 🚀 **Quick Start Guide (5-Minute Setup)**

### 🧩 **Prerequisites**
- 🐍 Python **3.8+**
- 🟢 Node.js **v16+**
- Both frontend & backend can run simultaneously

---

### ⚙️ **Option A: Run Frontend Only**
```bash
cd frontend
npm install
npm run dev

### ⚙️ **Option B: Run Backend Only**
```bash
cd backend
pip install -r requirements.txt
python manage.py runserver


📊 Seeded City Dataset
City	State	Wind (m/s)	Seismic Zone	Zone Factor	Temp Max	Temp Min
New Delhi	Delhi	47	IV	0.24	45°C	5°C
Lucknow	Uttar Pradesh	47	III	0.16	43°C	7°C
Amritsar	Punjab	47	IV	0.24	44°C	2°C
Gurugram	Haryana	47	IV	0.24	44°C	5°C
Shimla	Himachal Pradesh	39	IV	0.24	28°C	-2°C
Mumbai	Maharashtra	39	III	0.16	34°C	22°C
Ahmedabad	Gujarat	50	III	0.16	43°C	10°C
Jaipur	Rajasthan	47	II	0.10	46°C	8°C
Panaji	Goa	44	III	0.16	33°C	21°C
Chennai	Tamil Nadu	50	II	0.10	38°C	25°C
Bangalore	Karnataka	39	II	0.10	30°C	15°C
Thiruvananthapuram	Kerala	44	III	0.16	32°C	23°C
Hyderabad	Telangana	39	II	0.10	39°C	17°C
Visakhapatnam	Andhra Pradesh	50	II	0.10	37°C	22°C
Kolkata	West Bengal	50	III	0.16	38°C	12°C
Bhubaneswar	Odisha	50	III	0.16	40°C	14°C
Patna	Bihar	47	IV	0.24	42°C	8°C
Ranchi	Jharkhand	47	III	0.16	38°C	9°C
Guwahati	Assam	50	V	0.36	36°C	12°C
Bhopal	Madhya Pradesh	47	III	0.16	42°C	9°C
Raipur	Chhattisgarh	44	II	0.10	40°C	13°C
Shillong	Meghalaya	39	V	0.36	28°C	8°C
Agartala	Tripura	44	V	0.36	35°C	11°C
Kohima	Nagaland	39	V	0.36	30°C	6°C
Imphal	Manipur	44	V	0.36	33°C	8°C
Aizawl	Mizoram	44	V	0.36	31°C	7°C
Itanagar	Arunachal Pradesh	50	V	0.36	34°C	10°C



🔗 API Endpoints Overview
GET    /api/locations/                  → List all locations
GET    /api/locations/by_state/         → Filter by state
GET    /api/locations/by_district/      → Filter by district
POST   /api/geometry/validate/          → Validate bridge geometry
GET    /api/materials/                  → Get available materials
POST   /api/submit/                     → Submit design details

🧩 Features

✅ 15+ React Components
✅ Tailwind CSS Design
✅ React Router Navigation
✅ Django REST API Backend
✅ 3 Database Models
✅ 4 REST Endpoints
✅ Geometry Validation Logic
✅ Pre-Seeded SQLite Database
✅ Full CORS Configuration
✅ Comprehensive Documentation

💡 Developer Info

👨‍💻 Developed by: Sooraj
📅 Last Updated: November 12, 2025
📦 Version: 1.0.0
