import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";

export const testConnection = asyncHandler(async (_req: Request, res: Response) => {
  
  res.json({ success: true, message: "Test route OK" });
});
