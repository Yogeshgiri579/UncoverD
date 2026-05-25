import express from "express";
import { createShiprocketDelivery, getShiprocketStatus } from "../controllers/shippingController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/shiprocket/create/:orderId", protect, createShiprocketDelivery);
router.get("/shiprocket/status/:orderId", protect, getShiprocketStatus);

export default router;
