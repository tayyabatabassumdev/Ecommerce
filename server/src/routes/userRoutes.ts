// src/routes/userRoutes.ts
import express from "express";
import {
  getAllUsers,
  getUserById,
  updateProfile,
  updateUserRole,
  deleteUser,
} from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";

const router = express.Router();

// Admin only endpoints
router.get("/", protect, authorize("admin"), getAllUsers);
router.get("/:id", protect, authorize("admin"), getUserById);
router.put("/:id/role", protect, authorize("admin"), updateUserRole);
router.delete("/:id", protect, authorize("admin"), deleteUser);

// Protected endpoints for current user
router.put("/profile", protect, updateProfile);

export default router;
