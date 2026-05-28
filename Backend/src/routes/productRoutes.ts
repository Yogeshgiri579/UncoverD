import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductStats,
} from "../controllers/productController";
import { protect, adminOnly } from "../middlewares/authMiddleware";

const router = express.Router();

// ─── Public Routes ─────────────────────────────────────────────────────────
router.get("/", getAllProducts);
router.get("/stats", getProductStats);
router.get("/:id", getProductById);

// ─── Admin-Only Routes ────────────────────────────────────────────────────
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
