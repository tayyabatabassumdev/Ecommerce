import express from "express";
import {
  getAllTerms,
  getTermByType,
  createTerm,
  updateTerm,
  deleteTerm,
} from "../controllers/termController";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";

const router = express.Router();

// Public
router.get("/", getAllTerms);
router.get("/:type", getTermByType);

// Admin only
router.post("/", protect, authorize("admin"), createTerm);
router.put("/:id", protect, authorize("admin"), updateTerm);
router.delete("/:id", protect, authorize("admin"), deleteTerm);

export default router;
