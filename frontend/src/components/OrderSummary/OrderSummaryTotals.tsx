import React from "react";
import { formatCurrency } from "../../utils/currency";

interface OrderSummaryTotalsProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const OrderSummaryTotals: React.FC<OrderSummaryTotalsProps> = ({
  subtotal,
  shipping,
  tax,
  total,
}) => (
  <>
    <div className="mt-5 space-y-2 text-gray-700">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      <div className="flex justify-between">
        <span>Shipping</span>
        <span>{formatCurrency(shipping)}</span>
      </div>
      <div className="flex justify-between">
        <span>Tax</span>
        <span>{formatCurrency(tax)}</span>
      </div>
    </div>

    <div className="mt-4 border-t pt-4 flex justify-between font-bold text-lg text-gray-900">
      <span>Total</span>
      <span>{formatCurrency(total)}</span>
    </div>
  </>
);

export default OrderSummaryTotals;
