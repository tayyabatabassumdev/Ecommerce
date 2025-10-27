import mongoose, { Schema, Document } from "mongoose";
import { ICart } from "../interfaces/cart.interface";

export interface ICartDocument extends ICart, Document {}

const CartItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    variantId: { type: Schema.Types.ObjectId, ref: "Product.variants", default: null },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const CartSchema = new Schema<ICartDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", default: null },
    items: [CartItemSchema],
  },
  { timestamps: true }
);

export const Cart = mongoose.model<ICartDocument>("Cart", CartSchema);
