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

#### Environment Variable
Add this environment variable to your admin static site on Render:

```env
VITE_API_BASE_URL=https://your-backend-service.onrender.com/api
```

Example:
```
VITE_API_BASE_URL=https://uncover-d-backend.onrender.com/api
```

#### Deployment Configuration (render.yaml)

Create or update `admin/render.yaml`:

```yaml
services:
  - type: static
    name: uncover-d-admin
    env: node
    buildCommand: npm ci && npm run build
    publishDirectory: dist
    envVars:
      - key: VITE_API_BASE_URL
        value: https://your-backend-service.onrender.com/api
```

---

## Initial Admin Account Creation

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

### "Invalid setup token"
- Verify the `SETUP_TOKEN` environment variable is set in your backend service
- Double-check you're copying the exact token value
- No spaces or extra characters

### "Admin user already exists"
- The admin account has already been created
- Use the login page with existing admin credentials
- If you forgot the password, manually update the database or create a password reset feature

### "Cannot reach backend API"
- Verify `VITE_API_BASE_URL` matches your backend URL
- Check backend CORS is enabled for your admin panel domain
- Confirm backend service is running on Render

### Login from anywhere shows "Access denied"
- The account you're trying to login with is not an admin
- Check the user's `role` field in MongoDB to confirm it's set to `"admin"`

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
