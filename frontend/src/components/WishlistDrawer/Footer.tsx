import { ShoppingBag } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useNavigate } from "react-router-dom";

interface FooterProps {
  onClose: () => void;
}

export default function Footer({ onClose }: FooterProps) {
  const { items, clearWishlist } = useWishlistStore();
  const navigate = useNavigate();

  return (
    <div className="p-5 border-t border-gray-200 bg-white/70 backdrop-blur-md">
      <div className="flex justify-between items-center mb-4">
        <button onClick={clearWishlist} className="text-sm text-gray-500 hover:text-red-500 transition">
          Clear All
        </button>
        <span className="text-sm text-gray-600">
          {items.length} {items.length > 1 ? "items" : "item"}
        </span>
      </div>
      <button
        onClick={() => {
          onClose();
          navigate("/shop");
        }}
        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2"
      >
        <ShoppingBag size={18} />
        Continue Shopping
      </button>
    </div>
  );
}
