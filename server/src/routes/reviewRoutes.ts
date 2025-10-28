import express from "express";
import { addReview, getReviews, deleteReview } from "../controllers/reviewController";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";

const router = express.Router();

router.get("/:productId", getReviews);
router.post("/:productId", protect, authorize("user", "admin"), addReview);
router.delete("/:reviewId", protect, authorize("user", "admin"), deleteReview);

export default router;
