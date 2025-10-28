import mongoose, { Schema } from "mongoose";
import { IOrder } from "../interfaces/order.interface";

const OrderItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  priceAtPurchase: { type: Number, required: true },
  attributes: { type: Map, of: String },
});

const ShippingSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  country: String,
  postalCode: String,
});

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", default: null },
    orderId: { type: String, required: true, unique: true },
    transactionId: { type: String },
    items: [OrderItemSchema],
    shippingInfo: ShippingSchema,
    totalAmount: { type: Number, required: true },
       paymentMethod: {
      type: String,
      enum: ["COD", "Card", "BankTransfer"],
      default: "COD",
    },
    paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
