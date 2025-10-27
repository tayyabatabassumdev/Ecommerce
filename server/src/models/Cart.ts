import mongoose, { Schema } from "mongoose";
import { ICart } from "../interfaces/cart.interface";

const CartItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    variantId: { type: Schema.Types.ObjectId, required: false },
    quantity: { type: Number, required: true, min: 1 },
    priceAtAdd: { type: Number },
    attributes: { type: Map, of: String }
  },
  { _id: false }
);

const CartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", default: null },
    items: { type: [CartItemSchema], default: [] }
  },
  { timestamps: true }
);

export const Cart = mongoose.model<ICart>("Cart", CartSchema);
