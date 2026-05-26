import express from "express";
import { registerUser, loginUser, getCurrentUser, getUserProfile, getAllUsers, createAdminUser } from "../controllers/authController";
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

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin/create", createAdminUser); // Safe admin creation with SETUP_TOKEN
router.get("/me", protect, getCurrentUser);
router.get("/profile", protect, getUserProfile);
router.get("/admin/all-users", protect, adminOnly, getAllUsers);

export default router;
