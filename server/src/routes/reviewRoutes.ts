import express from "express";

import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";
import {
  addReview,
  getReviews,
  deleteReview,
  getAllReviews
  // approveReview, // will be used later
} from "../controllers/reviewController";


const router = express.Router();
router.get("/", getAllReviews);
router.get("/:productId", getReviews);
router.post("/:productId", protect, authorize("user", "admin"), addReview);
router.delete("/:reviewId", protect, authorize("user", "admin"), deleteReview);

// router.put("/:reviewId/approve", protect, authorize("admin"), approveReview);
export default router;
