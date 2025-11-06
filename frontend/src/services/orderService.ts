import axios from "axios";
import type { CartItem, Address, PaymentInfo } from "../types/checkout";
const base = import.meta.env.VITE_API_URL;
export const placeOrder = async (items: CartItem[], address: Address, payment: PaymentInfo) => {
  const { data } = await axios.post(`${base}/orders`, {
    items,
    shippingInfo: address,
    paymentMethod: payment.method,
  });
  return data;
};
