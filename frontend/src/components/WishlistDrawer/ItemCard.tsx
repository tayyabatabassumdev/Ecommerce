import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useWishlistStore } from "@/store/wishlistStore";

interface Item {
  _id: string;
  name: string;
  images?: string[];
  basePrice: number;
}

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  const { removeItem } = useWishlistStore();

  return (
    <motion.div
      className="flex items-center gap-4 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
      whileHover={{ scale: 1.02 }}
    >
      <img
        src={item.images?.[0] || "https://placehold.co/80x80"}
        alt={item.name}
        className="w-20 h-20 rounded-lg object-cover border"
      />
      <div className="flex-1">
        <h3 className="text-gray-900 font-semibold text-sm line-clamp-2">{item.name}</h3>
        <p className="text-yellow-700 font-medium mt-1">Rs. {item.basePrice}</p>
      </div>
      <button
        onClick={() => removeItem(item._id)}
        className="text-red-500 hover:text-red-600 transition p-1.5"
      >
        <Trash2 size={18} />
      </button>
    </motion.div>
  );
}
