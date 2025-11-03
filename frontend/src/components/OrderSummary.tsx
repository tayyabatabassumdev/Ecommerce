import React, { useMemo } from "react";
import { useCartStore } from "../store/cartStore";
const OrderSummary: React.FC = () => {
  const { items } = useCartStore();
  const { subtotal, shipping, tax, total } = useMemo(() => {
    const subtotal = items.reduce((sum, i) => sum + i.priceAtAdd * i.quantity, 0);
    const shipping = subtotal > 5000 ? 0 : 300;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    return { subtotal, shipping, tax, total };
  }, [items]);
  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item._id} className="py-3 flex justify-between items-center text-gray-700">
            <span className="truncate">{item.product.name} × {item.quantity}</span>
            <span>Rs. {(item.priceAtAdd * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 space-y-2 text-gray-700">
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

      <div className="mt-4 border-t pt-4 flex justify-between font-bold text-lg text-gray-900">
        <span>Total</span>
        <span>Rs. {total.toFixed(2)}</span>
      </div>
    </div>
  );
};
export default OrderSummary;
