// src/components/OrderSummary.tsx
import React from "react";
import type { CartItem } from "../types/checkout";

interface Props {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const OrderSummary: React.FC<Props> = ({ items, subtotal, shipping, tax, total }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
      <ul className="divide-y">
        {items.map(item => (
          <li key={item.id} className="py-2 flex justify-between items-center">
            <span>{item.name} x {item.quantity}</span>
            <span>Rs. {(item.priceAtPurchase * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>Rs. {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Rs. {shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>Rs. {tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 border-t pt-4 flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>Rs. {total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
