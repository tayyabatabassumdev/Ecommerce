import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CartEmpty() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-96 bg-white border border-gray-200 rounded-2xl shadow-md p-8 text-center">
      <ShoppingCart className="w-20 h-20 text-gray-300 mb-6" />
      <p className="text-2xl text-gray-700 mb-4 font-medium">Your cart is empty</p>
      <button
        onClick={() => navigate("/")}
        className="bg-yellow-600 text-white font-semibold py-3 px-10 rounded-full shadow-md hover:bg-yellow-700 transition duration-300"
      >
        Start Shopping
      </button>
    </div>
  );
}
