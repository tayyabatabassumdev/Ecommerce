import mongoose, { Schema } from "mongoose";
import { IReturn } from "../interfaces/return.interface";

const ReturnSchema = new Schema<IReturn>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    reason: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "refunded"],
      default: "pending",
    },
    refundAmount: { type: Number },
  },
  { timestamps: true }
);

export const ReturnRequest = mongoose.model<IReturn>("ReturnRequest", ReturnSchema);
