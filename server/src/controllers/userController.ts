
import { Request, Response } from "express";
import { Types } from "mongoose";
import bcrypt from "bcryptjs";
import { asyncHandler } from "../middleware/asyncHandler";
import { User } from "../models/User";
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.max(Number(req.query.limit) || 20, 1);
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find().select("-password").skip(skip).limit(limit).sort({ createdAt: -1 }),
    User.countDocuments(),
  ]);

  res.status(200).json({
    success: true,
    data: users,
    meta: { total, page, limit },
  });
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid user id" });
  }

  const user = await User.findById(id).select("-password");
  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  res.status(200).json({ success: true, data: user });
});
export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const currentUser = (req as any).user;
  if (!currentUser || !currentUser.id) {
    return res.status(401).json({ success: false, message: "Not authenticated" });
  }

  const user = await User.findById(currentUser.id);
  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  const { name, email, password } = req.body as { name?: string; email?: string; password?: string };

  if (name) user.name = name;
  if (email) user.email = email.toLowerCase();

  if (password) {
    if (typeof password !== "string" || password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }

  await user.save();
  const userSafe = await User.findById(user._id).select("-password");
  res.status(200).json({ success: true, message: "Profile updated", data: userSafe });
});

export const updateUserRole = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body as { role?: string };

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid user id" });
  }
  if (!role || (role !== "user" && role !== "admin")) {
    return res.status(400).json({ success: false, message: "role must be 'user' or 'admin'" });
  }

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  user.role = role as "user" | "admin";
  await user.save();

  res.status(200).json({ success: true, message: "User role updated", data: { _id: user._id, role: user.role } });
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid user id" });
  }

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  await user.deleteOne();

  res.status(200).json({ success: true, message: "User deleted" });
});
