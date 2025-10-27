import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import testRoutes from "./routes/testRoutes";
import productRoutes from "./routes/productRoutes";
import { errorHandler } from "./middleware/errorMiddleware";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import userRoutes from "./routes/userRoutes";
import cartRoutes from "./routes/cartRoutes";

// existing routes...

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// health
app.get("/", (_req, res) => res.json({ success: true, message: "API is live" }));

// routes
app.use("/api/test", testRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
// global error handler (must be after routes)
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use(errorHandler);

export default app;
