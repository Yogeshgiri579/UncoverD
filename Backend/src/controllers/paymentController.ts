import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { generatePayUPaymentData, verifyPayUHash } from "../services/payuService";
import Order from "../models/Order";

export const initiatePayU = asyncHandler(async (req: Request, res: Response) => {
  const { orderId, firstname, email, phone } = req.body;
  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  const paymentData = generatePayUPaymentData({
    orderId: order._id.toString(),
    amount: order.totalPrice,
    firstname,
    email,
    phone,
  });

  res.json(paymentData);
});

export const verifyPayU = asyncHandler(async (req: Request, res: Response) => {
  const result = req.body;
  const isValid = verifyPayUHash(result);

  if (!isValid) {
    res.status(400);
    throw new Error("Invalid PayU response signature");
  }

  if (result.status === "success") {
    const order = await Order.findById(result.udf1);
    if (order) {
      order.isPaid = true;
      order.paidAt = new Date();
      order.paymentResult = {
        transactionId: result.payuMoneyId || result.txnid,
        status: result.status,
        amount: Number(result.amount || order.totalPrice),
        updatedAt: new Date(),
      };
      await order.save();
    }
  }

  res.json({ success: true, payload: result });
});
