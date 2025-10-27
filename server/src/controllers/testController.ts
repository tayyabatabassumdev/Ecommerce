import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";

export const testConnection = asyncHandler(async (_req: Request, res: Response) => {
  // simple health-check response — DB connectivity verified in connectDB
  res.json({ success: true, message: "Test route OK" });
});
