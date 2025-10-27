import { Document, Types } from "mongoose";

export interface IOrderItem {
  productId: Types.ObjectId;
  variantId?: Types.ObjectId | null;
  quantity: number;
  unitPrice: number;
  attributes?: Record<string, string>;
}

export interface IOrder extends Document {
  orderId: string; // readable unique ID e.g. ORD-20251027-AB12
  userId?: Types.ObjectId | null;
  email?: string; // for guest checkout
  items: IOrderItem[];
  total: number;
  status: "placed" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
  shippedAt?: Date;
}
