// src/api/order.ts
import axios from "axios";
import type { CartItem } from "../types/checkout";
import type { Address, PaymentInfo } from "../types/checkout";
export interface OrderData {
  items: CartItem[];
  shippingInfo: Address;
  paymentMethod: PaymentInfo["method"];
}

export const placeOrder = async (orderData: OrderData) => {
  const { data } = await axios.post("/api/orders", orderData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // if using cookies for auth
  });
  return data;
};

export const getCartItems = async () => {
  const { data } = await axios.get("/api/cart");
  return data.items;
};
