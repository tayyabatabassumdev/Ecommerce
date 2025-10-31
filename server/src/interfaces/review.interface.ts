// types/review.ts
import { Document, Types } from "mongoose";

export interface IReview extends Document {
  user: Types.ObjectId;
  product: Types.ObjectId;
  rating: number;
  comment?: string;
  images?: string[];
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}
