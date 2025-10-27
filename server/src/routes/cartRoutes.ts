import express from "express";
import {
  addToCart,
  getCart,
  updateQuantity,
  removeItem,
  clearCart,
  syncCart,
} from "../controllers/cartController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// Public routes
router.post("/", addToCart);
router.delete("/", clearCart);
router.delete("/:productId", removeItem);

// Authenticated routes
router.get("/", protect, getCart);
router.put("/", protect, updateQuantity);
router.post("/sync", protect, syncCart);

export default router;
