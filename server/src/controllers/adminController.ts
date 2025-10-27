import { Request, Response } from "express";
import { User } from "../models/User";
import { asyncHandler } from "../middleware/asyncHandler";

// @route   POST /api/admin/create
// @access  Private (Admin only)
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
    role: "admin" // 👈 Hardcoded for security
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
