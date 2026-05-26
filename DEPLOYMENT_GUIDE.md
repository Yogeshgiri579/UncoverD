# Admin Panel Setup & Deployment Guide

## Overview
The admin panel now includes a secure admin creation flow that requires a **SETUP_TOKEN** for initial setup. This ensures only authorized users can create the first admin account when deploying to production.

---

## Deployment Steps

### 1. Backend Setup (Render or your server)

#### Set Environment Variable
Add the following environment variable to your backend service on Render:

```env
SETUP_TOKEN=your-secure-random-token-here
```

**Generate a secure token:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Example:
```
SETUP_TOKEN=a7f3e9d2c4b1f6e8a9c2d5f7b1e3a6c8d9f2b4e5a7c9d1e3f5a7b9c1d3e5f7
```

#### Make sure CORS is enabled
In your `Backend/src/app.ts`, verify CORS is configured:

```typescript
app.use(cors({ origin: true, credentials: true, allowedHeaders: ["Content-Type", "Authorization"] }));
```

This allows requests from anywhere (including Render-hosted admin panel).

---

### 2. Admin Panel Setup (Render Static Site)

#### Deployment Configuration (render.yaml)

Update `admin/render.yaml` with environment variable:

```yaml
services:
  - type: static
    name: uncover-d-admin
    env: node
    buildCommand: npm ci && npm run build
    publishDirectory: dist
    headers:
      - path: "/*"
        headers:
          - key: "Cache-Control"
            value: "public, max-age=0, must-revalidate"
    envVars:
      - key: VITE_API_BASE_URL
        value: https://your-backend-service.onrender.com/api
    routes:
      - type: rewrite
        source: "/*"
        destination: "/index.html"
```

**Replace `https://your-backend-service.onrender.com/api` with your actual backend URL**

#### Example:
```yaml
envVars:
  - key: VITE_API_BASE_URL
    value: https://uncover-d-backend.onrender.com/api
```

---

### 2B. Frontend Setup (Render Static Site)

#### Deployment Configuration (render.yaml)

Update `Frontend/render.yaml` with environment variable:

```yaml
services:
  - type: static
    name: cosmic-skins-cases
    env: node
    buildCommand: npm install && npm run build
    publishDirectory: dist
    headers:
      - path: "/*"
        headers:
          - key: "Cache-Control"
            value: "public, max-age=0, must-revalidate"
    envVars:
      - key: VITE_API_BASE_URL
        value: https://your-backend-service.onrender.com/api
    routes:
      - type: rewrite
        source: "/*"
        destination: "/index.html"
```

**Replace `https://your-backend-service.onrender.com/api` with your actual backend URL**

---

## Quick Deployment Checklist

Use this before and after deploying to identify issues:

### Backend Service (Render)
- [ ] Environment variables set:
  - [ ] `MONGO_URI` - MongoDB connection string
  - [ ] `JWT_SECRET` - Random secret key
  - [ ] `SETUP_TOKEN` - Random token for admin setup
- [ ] Service is running (not suspended)
- [ ] CORS enabled in `src/app.ts`
- [ ] MongoDB connection working (check Render logs)

### Admin Panel (Render Static Site)
- [ ] `admin/render.yaml` has `VITE_API_BASE_URL` environment variable
- [ ] `VITE_API_BASE_URL` value matches backend URL exactly
- [ ] After updating render.yaml, **redeploy** the service
- [ ] Build succeeds (check Render build logs)
- [ ] Can access admin URL in browser

### Frontend (Render Static Site)
- [ ] `Frontend/render.yaml` has `VITE_API_BASE_URL` environment variable
- [ ] `VITE_API_BASE_URL` value matches backend URL exactly
- [ ] After updating render.yaml, **redeploy** the service
- [ ] Build succeeds (check Render build logs)
- [ ] Can access frontend URL in browser
- [ ] Products load (check browser Network tab)

### Database
- [ ] MongoDB cluster accessible from Render
- [ ] Admin user exists with `role: "admin"`
- [ ] At least one product in database for testing
- [ ] Collections created: Users, Products, Orders

---

### Step-by-Step

1. **Visit Admin Panel**
   - Go to `https://your-admin-site.onrender.com`

2. **Click "Create admin account" link**
   - On the login page, click the link at the bottom: "First time setting up? Create admin account"
   - Or navigate directly to `/setup`

3. **Fill in the Setup Form**
   - **First Name:** Your first name
   - **Last Name:** Your last name
   - **Email:** Your admin email
   - **Password:** Strong password for your admin account
   - **Confirm Password:** Repeat password
   - **Setup Token:** Paste the `SETUP_TOKEN` value from your backend environment variables

4. **Click "Create Admin Account"**
   - You'll be automatically logged in and redirected to the admin dashboard
   - Your credentials are now saved

5. **Login for future sessions**
   - Use your email and password on the login page

---

## Security Features

✅ **One-time use:** Once an admin account is created, the setup endpoint is disabled (even with correct token)

✅ **Token-protected:** Only requests with the correct `SETUP_TOKEN` can create admin accounts

✅ **Cannot elevate permissions:** Regular users cannot create other admins or change roles

✅ **Secure storage:** Passwords are hashed with bcrypt before storage

---

## Troubleshooting

### **"Invalid setup token"**
- Verify the `SETUP_TOKEN` environment variable is set in your backend service
- Double-check you're copying the exact token value
- No spaces or extra characters

### **"Admin user already exists"**
- The admin account has already been created
- Use the login page with existing admin credentials
- If you forgot the password, manually update the database or create a password reset feature

### **"Cannot reach backend API" (Admin Login or Product Fetching Fails)**
**Most Common Issue:**
- ✅ Verify `VITE_API_BASE_URL` environment variable is set in **both** `admin/render.yaml` and `Frontend/render.yaml`
- ✅ Ensure it matches your actual backend URL exactly (e.g., `https://uncover-d-backend.onrender.com/api`)
- ✅ After setting environment variables in render.yaml, **redeploy** the services
- ✅ Check browser Network tab (F12 → Network) to see actual API URL being called

**Steps to Fix:**
1. Go to your Render dashboard
2. Edit the Admin Static Site service
3. In **Render API**, check the current `VITE_API_BASE_URL` value
4. Update it to match your backend URL if different
5. Trigger a rebuild/redeploy
6. Wait for deployment to complete
7. Clear browser cache and reload

### **"Products not showing on Frontend"**
1. Check if `VITE_API_BASE_URL` is set in `Frontend/render.yaml`
2. Verify `/api/products` endpoint returns data:
   - Use Postman/curl: `GET https://your-backend.onrender.com/api/products`
3. Check MongoDB has products (see Database Structure section)
4. Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)

### **"Admin panel shows blank/doesn't load"**
- Check browser console (F12 → Console) for errors
- Verify `VITE_API_BASE_URL` is built into the bundle
- Redeploy admin panel after updating render.yaml

### **Login from anywhere shows "Access denied"**
- The account you're trying to login with is not an admin
- Check the user's `role` field in MongoDB to confirm it's set to `"admin"`

### **"Network Error" or "Failed to fetch"**
1. ✅ Check backend service is running on Render
2. ✅ Verify CORS is enabled in Backend (`src/app.ts`)
3. ✅ Check firewall/VPN isn't blocking requests
4. ✅ Browser console should show the actual failed URL - verify it's correct

---

## Database Structure

### User Document (MongoDB)
```json
{
  "_id": ObjectId,
  "firstName": "John",
  "lastName": "Doe",
  "email": "admin@example.com",
  "password": "hashed_password_here",
  "role": "admin",
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

---

## Environment Variables Summary

| Service | Variable | Example Value |
|---------|----------|---------------|
| Backend | `SETUP_TOKEN` | `a7f3e9d2c4b1f6e8a9c...` |
| Backend | `JWT_SECRET` | `your-jwt-secret-key` |
| Admin Site | `VITE_API_BASE_URL` | `https://api.onrender.com/api` |

---

## Next Steps

1. Deploy backend to Render with `SETUP_TOKEN` set
2. Deploy admin app to Render static site with `VITE_API_BASE_URL` set
3. Visit admin panel and complete setup with the setup token
4. Login with your admin credentials
5. Manage products, orders, and users from the admin dashboard

---

## Support

For issues or questions:
- Check backend logs on Render
- Check browser console for frontend errors (F12)
- Verify environment variables are set correctly

---

## How to Verify Everything is Working

### Test Backend API (Without Authentication)
Open a terminal and run:
```bash
# Test if backend is accessible
curl https://your-backend-service.onrender.com/api/products

# Example response should be a JSON array of products
# If you get "Cannot GET /api/products", backend is running but endpoint may have issues
```

### Test Admin Panel
1. Visit `https://your-admin-site.onrender.com`
2. Open browser DevTools (F12)
3. Go to **Network** tab
4. Try to login
5. Look for requests to your backend API
6. Check if they're using the correct URL:
   - ✅ Correct: `https://uncover-d-backend.onrender.com/api/auth/login`
   - ❌ Wrong: `http://localhost:5000/api/auth/login`

### Test Frontend
1. Visit `https://your-frontend-site.onrender.com`
2. Open browser DevTools (F12)
3. Go to **Network** tab
4. Look for requests to `/api/products`
5. If they fail, check the exact URL in the Network tab
6. Verify it matches your backend URL

### Check Environment Variables on Render
1. Go to Render Dashboard
2. Click on "Admin Panel" or "Frontend" service
3. Click **Environment**
4. Verify `VITE_API_BASE_URL` is set correctly
5. If you see "http://localhost" or empty, it's not configured

### Test Database Connection
On your backend service in Render:
1. Check **Logs** tab
2. Look for "MongoDB connected successfully" message
3. If you see connection errors, verify `MONGO_URI` is correct
