import express from "express";
import { createAdminUser } from "../controllers/adminController";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";

const router = express.Router();

// ✅ Only admins can access this route
router.post("/create", protect, authorize("admin"), createAdminUser);

export default router;
