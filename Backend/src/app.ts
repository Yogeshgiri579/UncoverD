import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import orderRoutes from "./routes/orderRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import shippingRoutes from "./routes/shippingRoutes";
import productRoutes from "./routes/productRoutes";
import { errorHandler, notFound } from "./middlewares/errorHandler";

const app = express();

// ─── CORS ─────────────────────────────────────────────────────────────────
// If ALLOWED_ORIGINS is set (comma-separated list), restrict to those origins.
// Otherwise allow all origins — required when ALLOWED_ORIGINS is not yet
// configured in the hosting environment (e.g. Render dashboard).
const rawOrigins = process.env.ALLOWED_ORIGINS;

const corsOptions: cors.CorsOptions = rawOrigins
  ? {
      origin: (origin, callback) => {
        // Allow requests with no origin (Postman, mobile, server-to-server)
        if (!origin) return callback(null, true);
        const allowed = rawOrigins.split(",").map((o) => o.trim());
        if (allowed.includes(origin)) return callback(null, true);
        return callback(new Error(`CORS: origin "${origin}" not allowed`));
      },
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    }
  : {
      // No restrictions — allow every origin (safe fallback for initial deploy)
      origin: true,
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    };

app.use(cors(corsOptions));

// ─── Body Parsers ─────────────────────────────────────────────────────────
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// ─── Health Check ─────────────────────────────────────────────────────────
app.get("/", (_req, res) => {
  res.json({ message: "Uncover-D backend is running", status: "ok" });
});

// ─── API Routes ───────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/shipping", shippingRoutes);
app.use("/api/products", productRoutes);

// ─── Error Handling ───────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

export default app;
