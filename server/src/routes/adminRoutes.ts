import express from "express";
import { createAdminUser } from "../controllers/adminController";
import { getAdminStats , getAllOrdersAdmin, deleteOrderAdmin} from "../controllers/adminController";

import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";

const router = express.Router();
router.post("/create", protect, authorize("admin"), createAdminUser);
router.get("/stats", protect, authorize("admin"), getAdminStats);
router.get("/orders", protect, authorize("admin"), getAllOrdersAdmin);
router.delete("/orders/:id", protect, authorize("admin"), deleteOrderAdmin);
export default router;
