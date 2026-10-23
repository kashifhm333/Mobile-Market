# MobileMart — Deployment & Operations Guide

## 1. Local Development Setup

### Prerequisites
- Node.js >= 18.x (Tested with Node v22)
- npm >= 9.x
- MongoDB >= 6.0 (or Docker with mongo image)

### Quick Start
1. Install root, backend, and frontend dependencies:
   ```bash
   npm run install:all
   ```
2. Start MongoDB (if using Docker):
   ```bash
   docker-compose up -d mongo
   ```
3. Seed development database (optional):
   ```bash
   npm run seed --workspace=backend
   ```
4. Run both servers concurrently:
   ```bash
   npm run dev
   ```
   - Frontend runs on: `http://localhost:5173`
   - Backend API runs on: `http://localhost:5000`
   - API Docs (Swagger): `http://localhost:5000/api/docs`

---

## 2. Docker & Containerized Deployment

A `docker-compose.yml` file is provided at the repository root defining:
- `mongo`: Official MongoDB 7 container with persistent volume storage.
- `backend`: Node.js Express production container with health checks.
- `frontend`: Vite-built static files served via Nginx with reverse proxy to `/api/v1`.

Run:
```bash
docker-compose up --build
```

---

## 3. Environment Variables Reference

### Backend (`app/backend/.env`)
| Variable | Description | Example / Default |
|---|---|---|
| `PORT` | HTTP port | `5000` |
| `NODE_ENV` | Environment | `development` / `production` |
| `MONGODB_URI` | Mongo Connection string | `mongodb://127.0.0.1:27017/mobilemart` |
| `JWT_SECRET` | Secret key for signing JWTs | (High entropy string) |
| `JWT_EXPIRES_IN` | Token duration | `7d` |
| `CLIENT_URL` | Trusted CORS origin | `http://localhost:5173` |
| `UPLOAD_DIR` | Directory for uploaded media | `./uploads` |

### Frontend (`app/frontend/.env`)
| Variable | Description | Example / Default |
|---|---|---|
| `VITE_API_BASE_URL` | Base endpoint for API requests | `http://localhost:5000/api/v1` |
