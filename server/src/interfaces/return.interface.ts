import { Document, Types } from "mongoose";

export interface IReturn extends Document {
  user: Types.ObjectId;
  order: Types.ObjectId;
  product: Types.ObjectId;
  reason: string;
  status: "pending" | "approved" | "rejected" | "refunded";
  refundAmount?: number;
  createdAt: Date;
  updatedAt: Date;
}
