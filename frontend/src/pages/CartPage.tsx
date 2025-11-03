import { useCartStore } from "../store/cartStore";
import type { CartItem } from "../store/cartStore";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Trash2, Loader2, Minus, Plus, ShoppingCart } from "lucide-react";
const CartPage = () => {
  const navigate = useNavigate();
  const { items, fetchCart, updateQuantity, removeItem, loading } =
    useCartStore();
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);
  const handleQuantityChange = async (item: CartItem, qty: number) => {
    if (qty < 1) return;
    setIsUpdating(true);
    try {
      await updateQuantity(item.product._id, qty);
    } finally {
      setIsUpdating(false);
    }
  };
  const handleRemove = async (item: CartItem) => {
    setIsUpdating(true);
    try {
      await removeItem(item.product._id);
    } finally {
      setIsUpdating(false);
    }
  };
  const totalAmount = items.reduce(
    (sum, item) => sum + item.priceAtAdd * item.quantity,
    0
  );
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    })
      .format(amount)
      .replace("₹", "Rs. ");
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[300px] text-gray-600">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        <p className="text-lg">Loading your cart...</p>
      </div>
    );
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">
        Your Cart
      </h1>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 bg-white border border-gray-200 rounded-2xl shadow-md p-8 text-center">
          <ShoppingCart className="w-20 h-20 text-gray-300 mb-6" />
          <p className="text-2xl text-gray-700 mb-4 font-medium">
            Your cart is empty
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-yellow-600 text-white font-semibold py-3 px-10 rounded-full shadow-md hover:bg-yellow-700 transition duration-300"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-6">
            {items.map((item) => (
              <div
                key={item.product._id}
                className="flex flex-col sm:flex-row items-center justify-between p-5 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={
                      item.product?.images?.[0] ||
                      item.product?.image ||
                      "https://placehold.co/100x100?text=No+Image"
                    }
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src =
                        "https://placehold.co/100x100?text=No+Image")
                    }
                    alt={item.product?.name}
                    className="w-24 h-24 object-cover rounded-xl border border-gray-100"
                  />
                  <div>
                    <p className="font-bold text-lg text-gray-900 line-clamp-2">
                      {item.product?.name}
                    </p>
                    <p className="text-md font-semibold text-yellow-700 mt-1">
                      {formatCurrency(item.priceAtAdd)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4 sm:mt-0">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() =>
                        handleQuantityChange(item, item.quantity - 1)
                      }
                      disabled={isUpdating || item.quantity <= 1}
                      className="p-2 hover:bg-gray-100 text-gray-600 disabled:opacity-50"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item, Number(e.target.value))
                      }
                      disabled={isUpdating}
                      className="w-14 p-2 text-center border-x text-gray-800 font-medium focus:outline-none"
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(item, item.quantity + 1)
                      }
                      disabled={isUpdating}
                      className="p-2 hover:bg-gray-100 text-gray-600 disabled:opacity-50"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className="text-lg font-bold text-gray-900 min-w-[100px] text-right sm:text-left">
                    {formatCurrency(item.priceAtAdd * item.quantity)}
                  </p>
                  <button
                    onClick={() => handleRemove(item)}
                    disabled={isUpdating}
                    className="p-2 text-gray-400 hover:text-red-500 transition disabled:opacity-50"
                    aria-label="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:w-[380px] w-full h-fit">
            <div className="p-6 border border-gray-200 rounded-2xl bg-white shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Order Summary
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} items)</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
              </div>
              <hr className="my-6 border-gray-200" />
              <div className="flex justify-between text-xl font-extrabold text-gray-900 mb-6">
                <span>Order Total</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                disabled={isUpdating || items.length === 0}
                className="w-full bg-yellow-600 text-white font-bold py-4 rounded-xl text-lg hover:bg-yellow-700 transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isUpdating ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  "Proceed to Checkout"
                )}
              </button>
              <p className="text-sm text-gray-500 mt-4 text-center">
                Taxes and discounts calculated at checkout.
              </p>
            </div>
            <div className="mt-4 bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <p className="font-medium">Secure Checkout</p>
                  <p className="text-xs">Your information is protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
