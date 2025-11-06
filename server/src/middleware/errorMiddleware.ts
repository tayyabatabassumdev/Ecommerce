import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/apiResponse";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(" Error:", err);
  const statusCode = err.statusCode || 500;
  const message =
    err.message || "Internal Server Error — Something went wrong.";
  const response: ApiResponse = {
    success: false,
    message,
    error:
      process.env.NODE_ENV === "development"
        ? err.stack
        : undefined,
  };
  res.status(statusCode).json(response);
};
