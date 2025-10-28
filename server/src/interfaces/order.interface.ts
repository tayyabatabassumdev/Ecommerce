import { Document, Types } from "mongoose";

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";
export type PaymentStatus = "Pending" | "Paid" | "Failed";
export type PaymentMethod = "COD" | "Card" | "BankTransfer";
export interface IOrderItem {
  productId: Types.ObjectId;
  variantId?: Types.ObjectId | null; 
  name: string;
  quantity: number;
  priceAtPurchase: number;
  attributes?: Record<string, string>;
}

export interface IShippingInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface IOrder extends Document {
  user?: Types.ObjectId | null;
  orderId: string;
  transactionId:String ;
  items: IOrderItem[];
  shippingInfo: IShippingInfo;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}
