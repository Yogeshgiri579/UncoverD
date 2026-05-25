import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/Order";

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { items, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  if (!items || !items.length) {
    res.status(400);
    throw new Error("Order must contain at least one item");
  }

  const order = await Order.create({
    user: (req as any).user._id,
    items,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  res.status(201).json(order);
});

export const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id).populate("user", "firstName lastName email");

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.json(order);
});

export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find({ user: (req as any).user._id });
  res.json(orders);
});

export const getAllOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find().populate("user", "firstName lastName email phone").sort({ createdAt: -1 });
  res.json(orders);
});

export const updateOrderToPaid = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.isPaid = true;
  order.paidAt = new Date();
  order.paymentResult = {
    transactionId: req.body.transactionId || "",
    status: req.body.status || "Paid",
    amount: req.body.amount || order.totalPrice,
    updatedAt: new Date(),
  };

  const updatedOrder = await order.save();
  res.json(updatedOrder);
});
