# Campus Maintenance & Complaint Management System

A full‑stack **Campus Maintenance & Complaint Management System** built using **React**, **Node.js**, **Express**, **MongoDB**, and **Swagger (OpenAPI 3.0)**.  
The system enables students/staff to raise maintenance complaints, admins to assign them, and maintenance staff to resolve them with full tracking and transparency.

---

## 📌 Problem Statement

In large campuses, maintenance issues such as electrical faults, plumbing leaks, and infrastructure damage are often reported informally through calls or messages. This leads to:

- Lack of tracking  
- Delayed resolution  
- No accountability  
- Poor visibility for administrators  

This project provides a centralized platform to **raise complaints, assign work, track progress, and resolve issues efficiently**.

---

## 🏗️ System Architecture

### Architecture Style
- Microservices‑based backend  
- RESTful APIs  
- JWT‑based authentication  
- Centralized API documentation using Swagger  

### High‑Level Architecture

React Frontend
|
Auth Service (JWT) ---- Complaint Service
|
MongoDB

---

## 👥 User Roles

### Student / Staff
- Login to the system  
- Create maintenance complaints  
- View their own complaints and status  

### Admin
- View all complaints  
- Assign complaints to maintenance staff  
- Monitor complaint status  

### Maintenance Staff
- View assigned complaints  
- Update complaint status to **RESOLVED**  

---

## 🛠️ Technology Stack

### Frontend
- React (Vite)  
- Axios  
- Role‑based UI navigation  

### Backend
- Node.js  
- Express.js  
- MongoDB  
- JWT Authentication  

### Documentation
- Swagger (OpenAPI 3.0)  
- Centralized Swagger UI  

---

## 🔧 Backend Services

### Auth Service
- **Purpose:** Authenticate users and generate JWT tokens  
- **Port:** `4000`  
- **Endpoint:**  
  - `POST /auth/login`

### Complaint Service
- **Purpose:** Manage complaints and workflow  
- **Port:** `5000`  
- **Endpoints:**  
  - `POST /complaints` – Create complaint  
  - `GET /complaints` – Fetch complaints (role‑based)  
  - `PUT /complaints/{id}/assign` – Assign complaint (Admin)  
  - `PUT /complaints/{id}/status` – Update status (Maintenance)  

---

## 🔄 Complaint Lifecycle

OPEN → IN_PROGRESS → RESOLVED

- Complaints are created with status **OPEN**  
- Admin assigns complaint → status becomes **IN_PROGRESS**  
- Maintenance resolves complaint → status becomes **RESOLVED**  

---

## 🎨 Frontend Features

- Secure login page  
- Dashboard with summary counts  
- Create Complaint form  
- Assign Complaint UI (Admin)  
- Update Status UI (Maintenance)  
- Role‑based navigation bar  
- Polished and consistent UI  

---

## 📘 API Documentation (Swagger)

### Central Swagger UI

A **central Swagger UI** aggregates API documentation from all backend services.

http://localhost:3001/api-docs

### Features
- Interactive API testing  
- Request/response schemas  
- JWT authentication support  
- Single documentation page for all services  

---

## 🔐 Security

- JWT‑based authentication  
- Role‑based access control  
- Protected APIs using middleware  

---

## 📷 Screenshots (To Be Added)

- Login Page  
- Dashboard  
- Create Complaint Page  
- Assign Complaint Page  
- Update Status Page  
- Swagger UI  

---

## ✅ How to Run the Project

### Prerequisites
- Node.js (v16+)  
- MongoDB  

### Run Auth Service
```bash
cd auth-service
npm install
npm start
```

### Run Complaint Service
```bash
cd complaint-service
npm install
npm start
```

### Run Central Swagger
```bash
cd api-docs
npm install
node server.js
```

### Run Frontend
```bash
cd frontend
npm install
npm run dev
```

---

🚀 Future Enhancements
---
Email notifications
File upload for complaint images
Analytics dashboard
Docker‑based deployment


📌 Conclusion
---
The Campus Maintenance & Complaint Management System provides a scalable, user‑friendly solution for managing campus maintenance issues. The use of microservices, role‑based access, and centralized API documentation ensures maintainability and real‑world applicability.
