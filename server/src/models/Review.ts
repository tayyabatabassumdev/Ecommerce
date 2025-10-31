import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  images: string[];
  approved: boolean;
  createdAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    images: [{ type: String }],
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Review = mongoose.model<IReview>("Review", reviewSchema);
