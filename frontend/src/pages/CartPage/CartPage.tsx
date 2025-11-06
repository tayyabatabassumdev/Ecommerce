import { useCartStore } from "../../store/cartStore";
import { useEffect, useState } from "react";
import CartItemCard from "./CartItemCard";
import CartEmpty from "./CartEmpty";
import CartSummary from "./CartSummary";
import type { CartItem } from "../../types/cart";
const CartPage = () => {
  const { items, fetchCart, updateQuantity, removeItem, loading } = useCartStore();
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleQuantityChange = async (item:CartItem, qty:number) => {
    if (qty < 1) return;
    setIsUpdating(true);
    try {
      await updateQuantity(item.product._id, qty);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async (item:CartItem) => {
    setIsUpdating(true);
    try {
      await removeItem(item.product._id);
    } finally {
      setIsUpdating(false);
    }
  };

  const totalAmount = items.reduce((sum, item) => sum + item.priceAtAdd * item.quantity, 0);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" })
      .format(amount)
      .replace("₹", "Rs. ");

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (items.length === 0) return <CartEmpty />;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">Your Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          {items.map((item) => (
            <CartItemCard
              key={item.product._id}
              item={item}
              isUpdating={isUpdating}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
              formatCurrency={formatCurrency}
            />
          ))}
        </div>
        <CartSummary items={items} totalAmount={totalAmount} isUpdating={isUpdating} formatCurrency={formatCurrency} />
      </div>
    </div>
  );
};

export default CartPage;
