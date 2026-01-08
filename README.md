# 📦 GlobalGrid | Professional Shipment Dashboard

A high-performance logistics tracking system built with a **NestJS** backend and a **Vanilla JavaScript** frontend. This project demonstrates end-to-end fullstack development, featuring strict data validation, server-side pagination, and a responsive UI.



## 🚀 Features

- **Automated Seeding:** Populates the database with realistic logistics data using Faker.js.
- **Strict Validation:** Uses **Zod** to ensure type safety and data integrity from request to database.
- **Dynamic Dashboard:** - Real-time search with **Debounce** logic (400ms delay).
  - Multi-status filtering.
  - Interactive **Logistics Route** visualizer (Origin → Destination).
- **Optimized Pagination:** Server-side handling of offsets to support large datasets.

## 🛠️ Tech Stack

### Backend (NestJS)
- **Framework:** NestJS + TypeScript
- **ORM:** TypeORM with PostgreSQL/MySQL support
- **Validation:** Zod (via custom pipes)
- **Mocking:** Faker.js for database seeding

### Frontend (Vanilla)
- **Styling:** Tailwind CSS (CDN)
- **Icons:** Lucide-JS
- **State:** Plain JS Object State Management

## ⚙️ Setup Instructions

### 1. Backend
```bash
cd backend
npm install
# Configure your .env (DB_HOST, DB_USER, etc.)
npm run start:dev
# In a new terminal, seed the database
npm run seed
```

### 2. Frontend
Simply open `index.html` using a Live Server or by dragging it into your browser. 
> **Note:** Ensure your NestJS backend has CORS enabled in `main.ts`: `app.enableCors();`

## 📡 API Reference

| Method | Endpoint | Query Params |
| :--- | :--- | :--- |
| `GET` | `/shipments` | `page`, `limit`, `status`, `trackingNumber` |
| `GET` | `/shipments/:id` | Validates UUID via `ParseUUIDPipe` |



## 🛡️ Architecture
The project follows a decoupled architecture where the **Controller** acts as a gatekeeper (using Zod Pipes), the **Service** handles business logic, and the **Frontend** maintains a reactive state to update the DOM without page refreshes.