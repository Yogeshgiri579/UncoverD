import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductStats,
} from "../controllers/productController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

// Admin only middleware
const adminOnly = (req: any, res: any, next: any) => {
  if (req.user.role !== "admin") {
    res.status(403);
    throw new Error("Not authorized as admin");
  }
  next();
};

// Public routes
router.get("/", getAllProducts);
router.get("/stats", getProductStats);
router.get("/:id", getProductById);

// Admin routes
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
