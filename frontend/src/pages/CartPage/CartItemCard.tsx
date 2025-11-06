import type{ CartItem } from "../../types/cart";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemCardProps {
  item: CartItem;
  isUpdating: boolean;
  onQuantityChange: (item: CartItem, qty: number) => void;
  onRemove: (item: CartItem) => void;
  formatCurrency: (amount: number) => string;
}

export default function CartItemCard({
  item,
  isUpdating,
  onQuantityChange,
  onRemove,
  formatCurrency,
}: CartItemCardProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-5 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img
          src={item.product?.images?.[0] || item.product?.image || "https://placehold.co/100x100?text=No+Image"}
          onError={(e) => ((e.target as HTMLImageElement).src = "https://placehold.co/100x100?text=No+Image")}
          alt={item.product?.name}
          className="w-24 h-24 object-cover rounded-xl border border-gray-100"
        />
        <div>
          <p className="font-bold text-lg text-gray-900 line-clamp-2">{item.product?.name}</p>
          <p className="text-md font-semibold text-yellow-700 mt-1">
            {formatCurrency(item.priceAtAdd)}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4 sm:mt-0">
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={() => onQuantityChange(item, item.quantity - 1)}
            disabled={isUpdating || item.quantity <= 1}
            className="p-2 hover:bg-gray-100 text-gray-600 disabled:opacity-50"
          >
            <Minus size={16} />
          </button>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => onQuantityChange(item, Number(e.target.value))}
            disabled={isUpdating}
            className="w-14 p-2 text-center border-x text-gray-800 font-medium focus:outline-none"
          />
          <button
            onClick={() => onQuantityChange(item, item.quantity + 1)}
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
          onClick={() => onRemove(item)}
          disabled={isUpdating}
          className="p-2 text-gray-400 hover:text-red-500 transition disabled:opacity-50"
          aria-label="Remove item"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
