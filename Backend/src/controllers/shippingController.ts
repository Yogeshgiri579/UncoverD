import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/Order";
import { createShiprocketOrder, getShiprocketOrderStatus } from "../services/shiprocketService";

export const createShiprocketDelivery = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.orderId);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (order.shiprocketOrderId) {
    res.status(200).json({ message: "Shiprocket order already created", order });
    return;
  }

  const shiprocketResponse = await createShiprocketOrder(order);
  order.shiprocketOrderId = shiprocketResponse.order_id || shiprocketResponse.order_id?.toString();
  await order.save();

  res.json({ order, shiprocketResponse });
});

export const getShiprocketStatus = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.orderId);
  if (!order || !order.shiprocketOrderId) {
    res.status(404);
    throw new Error("Shiprocket delivery record not found for this order");
  }

  const status = await getShiprocketOrderStatus(order.shiprocketOrderId);
  res.json({ orderId: order._id, shiprocketOrderId: order.shiprocketOrderId, status });
});
