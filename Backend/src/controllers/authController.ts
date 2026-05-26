import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Order from "../models/Order";

const generateToken = (id: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign({ id }, secret, { expiresIn: "30d" });
};

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, phone } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please provide all required registration fields");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists with this email");
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

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email });
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

export const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;

  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const orders = await Order.find({ user: user._id });

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

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
});

// Safe admin creation for initial setup (requires SETUP_TOKEN)
export const createAdminUser = asyncHandler(async (req: Request, res: Response) => {
  const setupToken = req.headers.authorization?.replace("Bearer ", "");
  const expectedToken = process.env.SETUP_TOKEN;

  if (!expectedToken) {
    res.status(500);
    throw new Error("SETUP_TOKEN is not configured");
  }

  if (setupToken !== expectedToken) {
    res.status(401);
    throw new Error("Invalid setup token");
  }

  // Check if admin already exists
  const adminExists = await User.findOne({ role: "admin" });
  if (adminExists) {
    res.status(403);
    throw new Error("Admin user already exists. This endpoint is no longer available.");
  }

  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please provide firstName, lastName, email, and password");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists with this email");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role: "admin",
  });

  res.status(201).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    token: generateToken(user._id.toString()),
    message: "Admin user created successfully",
  });
});
