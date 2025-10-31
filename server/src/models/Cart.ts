// models/Cart.ts
import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  variantId: { type: mongoose.Schema.Types.ObjectId, ref: "Variant" },
  quantity: { type: Number, default: 1 },
  priceAtAdd: { type: Number }
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [cartItemSchema]
});

export const Cart = mongoose.model("Cart", cartSchema);
