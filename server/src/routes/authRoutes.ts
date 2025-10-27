import express from "express";
import { registerUser, loginUser,getMe, logout } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";
const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/me",protect,getMe)
router.post("/logout",protect,logout)
export default router;
