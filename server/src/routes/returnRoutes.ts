import express from "express";
import {
  createReturn,
  getAllReturns,
  getMyReturns,
  updateReturnStatus,
} from "../controllers/returnController";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";

const router = express.Router();

router.post("/", protect, authorize("user", "admin"), createReturn);
router.get("/", protect, authorize("admin"), getAllReturns);
router.get("/my", protect, authorize("user"), getMyReturns);
router.patch("/:id", protect, authorize("admin"), updateReturnStatus);

export default router;
