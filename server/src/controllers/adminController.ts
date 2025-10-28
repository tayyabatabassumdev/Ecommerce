import { Request, Response } from "express";
import { User } from "../models/User";
import { asyncHandler } from "../middleware/asyncHandler";
import { Order } from "../models/Order";
export const createAdminUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ success: false, message: "Please fill all fields" });
    return;
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ success: false, message: "Email already exists" });
    return;
  }

  const newAdmin = await User.create({
    name,
    email,
    password,
    role: "admin" 
  });

  res.status(201).json({
    success: true,
    message: "Admin account created successfully",
    data: {
      _id: newAdmin._id,
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
    },
  });
});
export const getAdminStats = asyncHandler(async (req: Request, res: Response) => {
  const totalUsers = await User.countDocuments();
  const totalOrders = await Order.countDocuments();
  const totalRevenue = await Order.aggregate([
    { $match: { paymentStatus: "Paid" } },
    { $group: { _id: null, total: { $sum: "$totalAmount" } } },
  ]);

  const pendingOrders = await Order.countDocuments({ status: "pending" });

  res.status(200).json({
    success: true,
    data: {
      totalUsers,
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      pendingOrders,
    },
  });
});
export const getAllOrdersAdmin = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.status(200).json({ success: true, data: orders });
});
export const deleteOrderAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await Order.findByIdAndDelete(id);

  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  res.status(200).json({ success: true, message: "Order deleted successfully" });
});