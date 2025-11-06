import type{ CartItem } from "../../types/cart";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CartSummaryProps {
  items: CartItem[];
  totalAmount: number;
  isUpdating: boolean;
  formatCurrency: (amount: number) => string;
}

export default function CartSummary({ items, totalAmount, isUpdating, formatCurrency }: CartSummaryProps) {
  const navigate = useNavigate();

  return (
    <div className="lg:w-[380px] w-full h-fit">
      <div className="p-6 border border-gray-200 rounded-2xl bg-white shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Order Summary</h2>
        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal ({items.length} items)</span>
            <span className="font-semibold text-gray-900">{formatCurrency(totalAmount)}</span>
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
          {isUpdating ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : "Proceed to Checkout"}
        </button>
        <p className="text-sm text-gray-500 mt-4 text-center">Taxes and discounts calculated at checkout.</p>
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
  );
}
