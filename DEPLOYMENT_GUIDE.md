# Uncover-D — Render Deployment Guide

## Services Overview

| Service | Type | Root Dir | Build Command | Start / Publish |
|---------|------|----------|---------------|-----------------|
| Backend | Web Service | `Backend/` | `npm install && npm run build` | `npm run start` |
| Frontend | Static Site | `Frontend/` | `npm install && npm run build` | `dist/` |
| Admin | Static Site | `admin/` | `npm install && npm run build` | `dist/` |

---

## Step 1 — Backend Web Service Settings (Render Dashboard)

### Build & Deploy
- **Root Directory:** `Backend`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run start`
- **Health Check Path:** `/`

### Environment Variables (set in Render → Environment tab)

| Key | Value | Required |
|-----|-------|----------|
| `MONGO_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/` | ✅ Yes |
| `JWT_SECRET` | Any long random string (min 32 chars) | ✅ Yes |
| `PORT` | `5000` | ✅ Yes |
| `NODE_ENV` | `production` | ✅ Yes |
| `ADMIN_EMAIL` | Your admin email | ✅ Yes |
| `ADMIN_PASSWORD` | Your admin password | ✅ Yes |
| `ADMIN_FIRST_NAME` | Admin | Optional |
| `ADMIN_LAST_NAME` | User | Optional |
| `ALLOWED_ORIGINS` | `https://your-frontend.onrender.com,https://your-admin.onrender.com` | Optional (allow-all if not set) |
| `PAYU_KEY` | PayU merchant key | Optional |
| `PAYU_SALT` | PayU salt | Optional |
| `SHIPROCKET_EMAIL` | Shiprocket email | Optional |
| `SHIPROCKET_PASSWORD` | Shiprocket password | Optional |

---

## Step 2 — Frontend Static Site Settings

### Build & Deploy
- **Root Directory:** `Frontend`
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`

### Rewrite Rule (must be set — otherwise page refresh gives 404)
- **Source:** `/*`
- **Destination:** `/index.html`
- **Type:** Rewrite

### Environment Variables
| Key | Value |
|-----|-------|
| `VITE_API_BASE_URL` | `https://uncover-d-backend.onrender.com/api` |

---

## Step 3 — Admin Static Site Settings

### Build & Deploy
- **Root Directory:** `admin`
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`

### Rewrite Rule (required for SPA routing)
- **Source:** `/*`
- **Destination:** `/index.html`
- **Type:** Rewrite

### Environment Variables
| Key | Value |
|-----|-------|
| `VITE_API_BASE_URL` | `https://uncover-d-backend.onrender.com/api` |

---

## Step 4 — Auto Deploy from GitHub

Render triggers a new deploy automatically when you push to GitHub if:
1. The service has "Auto-Deploy" enabled (default: yes)
2. The correct branch is configured (usually `main`)

**No render.yaml needed** — Render uses the settings configured in the dashboard.

---

## Admin Login After Deploy

Use `POST https://uncover-d-backend.onrender.com/api/auth/admin/login` with:
```json
{ "email": "your ADMIN_EMAIL value", "password": "your ADMIN_PASSWORD value" }
```

Or log in at your admin URL → it automatically hits this endpoint.

---

## Troubleshooting

### "Products not loading" on Frontend
→ Check that `VITE_API_BASE_URL` is set correctly in the Frontend service env vars.
→ Check that the backend service is running (visit the health check URL).

### "Access denied" on Admin
→ Make sure `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set in the backend env vars.

### CORS errors in browser console
→ Set `ALLOWED_ORIGINS` in backend env to include both frontend and admin URLs.

### 404 on page refresh
→ Make sure the `/* → /index.html` rewrite rule is set on both Frontend and Admin static sites.
