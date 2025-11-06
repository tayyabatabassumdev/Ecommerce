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
router.post("/", protect, addToCart);
router.delete("/", protect, clearCart);
router.delete("/:productId", protect, removeItem);
router.get("/", protect, getCart);
router.put("/", protect, updateQuantity);
router.post("/sync", protect, syncCart);
export default router;
