import express from "express";
import {
  createOrder,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
  getAllOrders,
} from "../controllers/orderController";
import { protect, adminOnly } from "../middlewares/authMiddleware";

const router = express.Router();

// ─── User Routes ───────────────────────────────────────────────────────────
router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);

// ─── Admin-Only Routes ────────────────────────────────────────────────────
router.get("/admin/all", protect, adminOnly, getAllOrders);

export default router;
