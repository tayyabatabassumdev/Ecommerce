import React, { useMemo } from "react";
import { useCartStore } from "../../store/cartStore";
import OrderSummaryItem from "./OrderSummaryItem";
import OrderSummaryTotals from "./OrderSummaryTotals";

const OrderSummary: React.FC = () => {
  const { items } = useCartStore();

  const { subtotal, shipping, tax, total } = useMemo(() => {
    const subtotal = items.reduce((sum, i) => sum + i.priceAtAdd * i.quantity, 0);
    const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 300;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    return { subtotal, shipping, tax, total };
  }, [items]);

  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <OrderSummaryItem key={item.product._id} item={item} />
        ))}
      </ul>

      <OrderSummaryTotals
        subtotal={subtotal}
        shipping={shipping}
        tax={tax}
        total={total}
      />
    </div>
  );
};

export default OrderSummary;
