import express from "express";
import { getPageBySlug, upsertPage } from "../controllers/pageController";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";

const router = express.Router();
router.get("/:slug", getPageBySlug);
router.post("/", protect, authorize("admin"), upsertPage);

export default router;
