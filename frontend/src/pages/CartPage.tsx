import { useEffect } from "react";
import { useCartStore } from "../store/cartStore";
import type { CartItem } from "../store/cartStore";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

export const CartPage = () => {
  const navigate = useNavigate();
  const { items, fetchCart, updateQuantity, removeItem, loading } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleQuantityChange = (item: CartItem, qty: number) => {
    if (qty < 1) return;
    updateQuantity(item.product._id, qty);
  };

  const handleRemove = (item: CartItem) => {
    removeItem(item.product._id);
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + item.priceAtAdd * item.quantity,
    0
  );

  if (loading) return <p className="text-center mt-20 text-lg">Loading cart...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          Your cart is empty
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8">
          <div className="flex flex-col gap-4">
            {items
              .filter((item): item is CartItem => 
                Boolean(item && item.product && item.product._id && item._id))
              .map((item) => (
                <div
                  key={`cart-${item._id}`}
                  className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={
                        item.product?.images?.[0] ||
                        item.product?.image ||
                        "https://placehold.co/80x80?text=No+Image"
                      }
                      alt={item.product?.name || "Product"}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">
                        {item.product?.name || "Unnamed Product"}
                      </p>
                      <p className="text-gray-500">Rs. {item.priceAtAdd}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={(e) =>
                        handleQuantityChange(item, Number(e.target.value))
                      }
                      className="w-16 p-2 border rounded text-center focus:outline-yellow-500"
                    />
                    <button
                      onClick={() => handleRemove(item)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <div className="w-full p-6 border rounded-lg shadow-sm bg-white h-fit">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Order Summary
            </h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-gray-800">
                Rs. {totalAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Delivery</span>
              <span className="font-semibold text-gray-800">Rs. 0</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between text-lg font-bold text-gray-800 mb-4">
              <span>Total</span>
              <span>Rs. {totalAmount.toFixed(2)}</span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
