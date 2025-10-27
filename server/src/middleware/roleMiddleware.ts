import { Request, Response, NextFunction } from "express";

/**
 * Middleware to restrict actions based on user role
 * @param roles Array of allowed roles (e.g., ["admin"])
 */
export const authorize =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({ success: false, message: "Access denied: insufficient privileges" });
    }

    next();
  };
