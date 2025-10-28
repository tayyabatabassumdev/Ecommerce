import mongoose, { Schema } from "mongoose";
import { IPage } from "../interfaces/page.interface";

const PageSchema = new Schema<IPage>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, 
    content: { type: String, required: true },
  },
  { timestamps: { createdAt: false, updatedAt: "lastUpdated" } }
);

export const Page = mongoose.model<IPage>("Page", PageSchema);
