import { X, ShoppingBag, Trash2, HeartOff } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function WishlistDrawer({
  isOpen,
  onClose,
}: WishlistDrawerProps) {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const navigate = useNavigate();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 w-full sm:w-[420px] h-full bg-gradient-to-b from-white to-gray-50 shadow-2xl z-[100] flex flex-col"
          >
            <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-white/70 backdrop-blur-md">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <HeartOff className="text-yellow-600" size={20} />
                Your Wishlist
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300">
              {items.length === 0 ? (
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
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item._id}
                    className="flex items-center gap-4 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={item.images?.[0] || "https://placehold.co/80x80"}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover border"
                    />
                    <div className="flex-1">
                      <h3 className="text-gray-900 font-semibold text-sm line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-yellow-700 font-medium mt-1">
                        Rs. {item.basePrice}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-red-500 hover:text-red-600 transition p-1.5"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>
            {items.length > 0 && (
              <div className="p-5 border-t border-gray-200 bg-white/70 backdrop-blur-md">
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={clearWishlist}
                    className="text-sm text-gray-500 hover:text-red-500 transition"
                  >
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
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
