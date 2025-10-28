import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { Order } from "../models/Order";
import { Product } from "../models/Product";
import { Cart } from "../models/Cart";
import { sendEmail } from "../utils/sendEmail";

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?._id || null;
  const { items, shippingInfo, paymentMethod } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: "No items in order" });
  }

  if (!shippingInfo) {
    return res.status(400).json({ success: false, message: "Shipping information required" });
  }

  const totalAmount = items.reduce(
    (sum: number, item: any) => sum + item.priceAtPurchase * item.quantity,
    0
  );

  const order = new Order({
    user: userId,
    items,
    shippingInfo,
    totalAmount,
    paymentMethod: paymentMethod || "COD",
  });

  await order.save();

  if (userId) {
    await Cart.findOneAndUpdate({ user: userId }, { items: [] });
  }
if (order.shippingInfo.email) {
  const subject = order.user
    ? "Your Order Has Been Placed!"
    : "Guest Order Confirmation";

  const html = `
    <h2>Thank you for your order!</h2>
    <p>Dear ${order.shippingInfo.name},</p>
    <p>Your order <strong>${order.orderId}</strong> has been placed successfully.</p>
    <p>Total: <strong>Rs. ${order.totalAmount}</strong></p>
    <p>Status: <strong>${order.status}</strong></p>
    <br/>
    <p>We’ll notify you when it’s shipped.</p>
    <p>Thank you for shopping with us!</p>
  `;

  await sendEmail(order.shippingInfo.email, subject, html);
}
  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    data: order,
  });
});

export const getOrders = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;

  let query: any = {};
  if (user?.role !== "admin") {
    query.user = user._id;
  }

  const orders = await Order.find(query)
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.status(200).json({ success: true, count: orders.length, data: orders });
});

export const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as any).user?._id || null;
  let order = await Order.findOne({ orderId: id }).populate("user", "name email");
  if (!order) {
 
    order = await Order.findById(id).populate("user", "name email");
  }

  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }
  if (userId && order.user && order.user.toString() !== userId.toString()) {
    return res.status(403).json({ success: false, message: "Not authorized to view this order" });
  }

  res.status(200).json({ success: true, data: order });
});
export const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await Order.findById(id);
  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }
  if (order.status === status) {
    return res.status(400).json({ success: false, message: "Order already in this status" });
  }
  if (status === "shipped") {
    for (const item of order.items) {
      const product = await Product.findById(item.productId);
      if (!product) continue;

      if (item.variantId) {
        const variant = product.variants.id(item.variantId);
        if (variant) {
          if (variant.stock < item.quantity) {
            return res.status(400).json({
              success: false,
              message: `Insufficient stock for variant of ${product.name}`,
            });
          }
          variant.stock -= item.quantity;
        }
      } else {
        const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
        if (totalStock < item.quantity) {
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for ${product.name}`,
          });
        }
      }

      await product.save();
    }
  }

  order.status = status;
  await order.save();

  res.status(200).json({
    success: true,
    message: `Order status updated to ${status}`,
    data: order,
  });
});
export const cancelOrder = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;

  const order = await Order.findById(id);
  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  if (user.role !== "admin" && order.user?.toString() !== user._id.toString()) {
    return res.status(403).json({ success: false, message: "Not authorized to cancel this order" });
  }

  if (order.status === "shipped" || order.status === "delivered") {
    return res.status(400).json({
      success: false,
      message: "Cannot cancel an order that has been shipped or delivered",
    });
  }

  order.status = "cancelled";
  await order.save();

  res.status(200).json({ success: true, message: "Order cancelled successfully", data: order });
});
