import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/orderController";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";

const router = express.Router();

router.post("/", createOrder); 
router.get("/:id", getOrderById); 

router.use(protect); 

router.get("/", getOrders); 
router.delete("/:id", cancelOrder); 
router.patch("/:id/status", authorize("admin"), updateOrderStatus);

export default router;
