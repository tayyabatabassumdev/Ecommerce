import mongoose, { Schema } from "mongoose";
import { ITerm } from "../interfaces/terms.interface";

const TermSchema = new Schema<ITerm>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    type: {
      type: String,
      enum: ["terms", "privacy", "refund"],
      default: "terms",
    },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Term = mongoose.model<ITerm>("Term", TermSchema);
