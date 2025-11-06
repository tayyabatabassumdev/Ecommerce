import { HeartOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EmptyStateProps {
  onClose: () => void;
}

export default function EmptyState({ onClose }: EmptyStateProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
      <HeartOff size={50} className="mb-3 text-gray-300" />
      <p className="text-lg font-medium">Your wishlist is empty</p>
      <button
        onClick={() => {
          onClose();
          navigate("/shop");
        }}
        className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm"
      >
        Continue Shopping
      </button>
    </div>
  );
}
