import express from "express";
import { protect } from "../middleware/authMiddleware";
import { processPayment ,initiatePayment, verifyPayment} from "../controllers/paymentController";

const router = express.Router();
router.post("/:orderId", protect, processPayment);
router.post("/initiate", initiatePayment);
router.post("/verify", verifyPayment);
export default router;
