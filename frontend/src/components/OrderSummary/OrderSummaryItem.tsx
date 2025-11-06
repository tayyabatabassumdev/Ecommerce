import React from "react";
import type { CartItem } from "../../types/cart";
import { formatCurrency } from "../../utils/currency";

interface OrderSummaryItemProps {
  item: CartItem;
}

const OrderSummaryItem: React.FC<OrderSummaryItemProps> = ({ item }) => (
  <li className="py-3 flex justify-between items-center text-gray-700">
    <span className="truncate">{item.product.name} × {item.quantity}</span>
    <span>{formatCurrency(item.priceAtAdd * item.quantity)}</span>
  </li>
);

export default OrderSummaryItem;
