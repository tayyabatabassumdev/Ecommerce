import { X, HeartOff } from "lucide-react";

interface HeaderProps {
  onClose: () => void;
}

export default function Header({ onClose }: HeaderProps) {
  return (
    <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-white/70 backdrop-blur-md">
      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <HeartOff className="text-yellow-600" size={20} />
        Your Wishlist
      </h2>
      <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
        <X className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}
