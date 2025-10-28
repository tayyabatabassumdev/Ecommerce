import { Document, Types } from "mongoose";

export interface IVariant{
  _id?: Types.ObjectId;
  attributes: Record<string, string>; // e.g. { color: "red", size: "L" }
  price: number;
  stock: number;
}

export interface IProduct extends Document {
  name: string;
  description?: string;
  category?: string;
  basePrice: number;
  images: string[];
  variants: Types.DocumentArray<IVariant & Document>;
  averageRating?: number;
  numReviews?: number;
  createdAt: Date;
  updatedAt: Date;
}

