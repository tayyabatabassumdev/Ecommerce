import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces/product.interface";

const VariantSchema = new Schema(
  {
    attributes: { type: Map, of: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, min: 0 },
  },
  { _id: true }
);

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    category: { type: String },
    basePrice: { type: Number, required: true },
    images: { type: [String], default: [] },
    variants: { type: [VariantSchema], default: [] },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
