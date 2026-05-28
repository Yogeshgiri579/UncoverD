import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Order from "../models/Order";

// ─── Helpers ───────────────────────────────────────────────────────────────

const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined in environment");
  return jwt.sign({ id }, secret, { expiresIn: "30d" });
};

const getAdminEnvCredentials = () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const firstName = process.env.ADMIN_FIRST_NAME || "Admin";
  const lastName = process.env.ADMIN_LAST_NAME || "User";
  if (!email || !password) return null;
  return { email, password, firstName, lastName };
};

// ─── Public: Register a new user ──────────────────────────────────────────

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, phone } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please provide firstName, lastName, email, and password");
  }

  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) {
    res.status(400);
    throw new Error("An account with this email already exists");
  }

  const user = await User.create({ firstName, lastName, email, password, phone });

  res.status(201).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    token: generateToken(user._id.toString()),
  });
});

// ─── Public: Login (regular users only) ───────────────────────────────────

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user || !(await user.comparePassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    token: generateToken(user._id.toString()),
  });
});

// ─── Admin: Dedicated Admin Login ─────────────────────────────────────────
// This endpoint handles TWO scenarios:
//   1. Env-credential admin (ADMIN_EMAIL / ADMIN_PASSWORD in .env) — plain text check
//   2. DB admin user — bcrypt check via comparePassword
// It always rejects non-admin roles even if password is correct.

export const adminLogin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  // ── Scenario 1: Env-configured super-admin credentials ──
  const adminCreds = getAdminEnvCredentials();

  if (adminCreds && email === adminCreds.email && password === adminCreds.password) {
    // Find or create the admin user record in DB
    let adminUser = await User.findOne({ email: email.toLowerCase() });

    if (!adminUser) {
      // First-time: create admin in DB (password will be hashed by pre-save hook)
      adminUser = await User.create({
        firstName: adminCreds.firstName,
        lastName: adminCreds.lastName,
        email: adminCreds.email,
        password: adminCreds.password,
        role: "admin",
      });
    } else if (adminUser.role !== "admin") {
      // Upgrade existing user to admin if env credentials match
      adminUser.role = "admin";
      await adminUser.save();
    }

    res.json({
      _id: adminUser._id,
      firstName: adminUser.firstName,
      lastName: adminUser.lastName,
      email: adminUser.email,
      role: adminUser.role,
      token: generateToken(adminUser._id.toString()),
    });
    return;
  }

  // ── Scenario 2: DB admin user with hashed password ──
  const dbUser = await User.findOne({ email: email.toLowerCase() });

  if (!dbUser) {
    res.status(401);
    throw new Error("Invalid admin credentials");
  }

  if (dbUser.role !== "admin") {
    res.status(403);
    throw new Error("Access denied – this account does not have admin privileges");
  }

  const isMatch = await dbUser.comparePassword(password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid admin credentials");
  }

  res.json({
    _id: dbUser._id,
    firstName: dbUser.firstName,
    lastName: dbUser.lastName,
    email: dbUser.email,
    role: dbUser.role,
    token: generateToken(dbUser._id.toString()),
  });
});

// ─── Protected: Get current logged-in user ────────────────────────────────

export const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;

  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    role: user.role,
  });
});

// ─── Protected: Get user profile + order history ──────────────────────────

export const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;

  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const orders = await Order.find({ user: user._id }).sort({ createdAt: -1 });

  res.json({
    user: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
    orders,
  });
});

// ─── Admin: Get all users ─────────────────────────────────────────────────

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
});
