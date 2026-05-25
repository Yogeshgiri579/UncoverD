import express from "express";
import { createOrder, getOrderById, getMyOrders, updateOrderToPaid, getAllOrders } from "../controllers/orderController";
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

router.route("/").post(protect, createOrder);
router.route("/admin/all").get(protect, adminOnly, getAllOrders);
router.route("/my").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
