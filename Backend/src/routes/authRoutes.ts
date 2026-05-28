import express from "express";
import {
  registerUser,
  loginUser,
  adminLogin,
  getCurrentUser,
  getUserProfile,
  getAllUsers,
} from "../controllers/authController";
import { protect, adminOnly } from "../middlewares/authMiddleware";

const router = express.Router();

// ─── Public Routes ─────────────────────────────────────────────────────────
router.post("/register", registerUser);
router.post("/login", loginUser);

// ─── Admin Auth (dedicated endpoint) ──────────────────────────────────────
router.post("/admin/login", adminLogin);

// ─── Protected Routes (any logged-in user) ────────────────────────────────
router.get("/me", protect, getCurrentUser);
router.get("/profile", protect, getUserProfile);

// ─── Admin-Only Routes ────────────────────────────────────────────────────
router.get("/admin/users", protect, adminOnly, getAllUsers);

export default router;
