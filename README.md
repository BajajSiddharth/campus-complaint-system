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

