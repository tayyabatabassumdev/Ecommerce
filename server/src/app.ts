import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import testRoutes from "./routes/testRoutes";
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import userRoutes from "./routes/userRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import returnRoutes from "./routes/returnRoutes";
import pageRoutes from "./routes/pageRoutes";
import termRoutes from "./routes/termRoutes";
import { errorHandler } from "./middleware/errorMiddleware";

const app = express();
app.use(cors({origin: "http://localhost:5173", // frontend URL
    credentials: true, // allow cookies / credential
    // 
    }));
app.use(express.json());
dotenv.config();
app.get("/", (_req, res) => res.json({ success: true, message: "API is live" }));
app.use("/api/test", testRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/returns", returnRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/terms", termRoutes);
app.use(errorHandler);

export default app;
