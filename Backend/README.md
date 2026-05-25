# Uncover-D Backend

A Node.js + Express + MongoDB backend scaffold for auth, checkout, PayU payment, and Shiprocket delivery.

## Setup

1. Copy `.env.example` to `.env`
2. Fill in `MONGO_URI`, `JWT_SECRET`, PayU and Shiprocket credentials
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run in development:
   ```bash
   npm run dev
   ```

## Folder structure

- `src/config` - database and configuration
- `src/controllers` - business logic by feature
- `src/routes` - feature routes
- `src/models` - MongoDB schemas
- `src/middlewares` - auth and error handlers
- `src/services` - PayU and Shiprocket integration helpers

## API overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/orders`
- `GET /api/orders/my`
- `GET /api/orders/:id`
- `PUT /api/orders/:id/pay`
- `POST /api/payments/payu/initiate`
- `POST /api/payments/payu/verify`
- `POST /api/shipping/shiprocket/create/:orderId`
- `GET /api/shipping/shiprocket/status/:orderId`
