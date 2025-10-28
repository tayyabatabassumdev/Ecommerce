import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { ReturnRequest } from "../models/Return";
import { Product } from "../models/Product";
import { Order } from "../models/Order";
import { IProduct } from "../interfaces/product.interface";

export const createReturn = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const { orderId, productId, reason, refundAmount } = req.body;

  if (!orderId || !productId || !reason) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  if (order.user && order.user.toString() !== userId.toString()) {
    return res.status(403).json({ success: false, message: "Not authorized for this order" });
  }

  const returnRequest = await ReturnRequest.create({
    user: userId,
    order: orderId,
    product: productId,
    reason,
    refundAmount,
  });

  res.status(201).json({ success: true, message: "Return request submitted", data: returnRequest });
});

export const getAllReturns = asyncHandler(async (req: Request, res: Response) => {
  const returns = await ReturnRequest.find()
    .populate("user", "name email")
    .populate("order", "orderId totalAmount status")
    .populate("product", "name category");

  res.status(200).json({ success: true, count: returns.length, data: returns });
});
export const getMyReturns = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const returns = await ReturnRequest.find({ user: userId })
    .populate("product", "name category")
    .populate("order", "orderId totalAmount status");

  res.status(200).json({ success: true, count: returns.length, data: returns });
});

export const updateReturnStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ["pending", "approved", "rejected", "refunded"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status" });
  }

  const returnRequest = await ReturnRequest.findById(id);
  if (!returnRequest) {
    return res.status(404).json({ success: false, message: "Return request not found" });
  }

  const previousStatus = returnRequest.status;
  returnRequest.status = status;

  if (["approved", "refunded"].includes(status) && previousStatus !== status) {
    const order = await Order.findById(returnRequest.order);
    const productDoc = await Product.findById(returnRequest.product);
    const product = productDoc as unknown as IProduct;
    if (product && order) {
      const orderItem = order.items.find(
        (item: any) => item.productId.toString() === String(product._id)
      );

      if (orderItem) {
        if (orderItem.variantId) {
          const variant = product.variants.id(orderItem.variantId);
          if (variant) {
            variant.stock += orderItem.quantity;
          }
        } else if (product.variants.length > 0) {
          product.variants[0].stock += orderItem.quantity;
        }

        await (product as any).save();
      }
    }
  }

  await returnRequest.save();

  res.status(200).json({
    success: true,
    message: `Return status updated to ${status}`,
    data: returnRequest,
  });
});