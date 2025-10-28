import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { Order } from "../models/Order";
import crypto from "crypto";
export const processPayment = asyncHandler(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { paymentMethod, paymentStatus } = req.body;

  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }
  if (paymentMethod === "COD") {
    order.paymentStatus = "Pending";
    order.status = "processing";
  } else {
    order.paymentStatus = paymentStatus || "Paid";
    order.status = "processing";
  }

  await order.save();

  res.status(200).json({
    success: true,
    message: "Payment processed successfully",
    data: order,
  });
});
export const initiatePayment = asyncHandler(async (req: Request, res: Response) => {
  const { orderId, paymentMethod } = req.body;

  const order = await Order.findOne({ orderId });
  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  if (order.paymentStatus === "Paid") {
    return res.status(400).json({ success: false, message: "Order already paid" });
  }


  const transactionId = crypto.randomBytes(8).toString("hex");

  const paymentSuccess = Math.random() > 0.2; 

  if (paymentSuccess) {
    order.paymentStatus = "Paid";
    order.status = "processing";
    order.transactionId = transactionId;
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Payment successful",
      data: { transactionId, order },
    });
  } else {
    order.paymentStatus = "Failed";
    order.status = "pending";
    await order.save();

    return res.status(400).json({
      success: false,
      message: "Payment failed. Please try again.",
      data: { transactionId, order },
    });
  }
});
export const verifyPayment = asyncHandler(async (req: Request, res: Response) => {
  const { orderId, transactionId } = req.body;

  const order = await Order.findOne({ orderId, transactionId });
  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found or transaction invalid" });
  }

  if (order.paymentStatus === "Paid") {
    return res.status(200).json({ success: true, message: "Payment already verified", data: order });
  }

  const verified = Math.random() > 0.1; 

  if (verified) {
    order.paymentStatus = "Paid";
    order.status = "processing";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      data: order,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Payment verification failed",
    });
  }
});