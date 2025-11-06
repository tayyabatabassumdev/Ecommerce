import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

interface JwtPayload {
  id: string;
}
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not found");
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        res.status(404).json({ success: false, message: "User not found" });
        return;
      }
      (req as any).user = user;
      next();
    } catch (err) {
      res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ success: false, message: "No token provided" });
  }
};
