import type { CartItem } from "../types/checkout";

export const calculateCartTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.priceAtPurchase * item.quantity, 0);
  const shipping = items.length > 0 ? 200 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;
  return { subtotal, shipping, tax, total };
};
