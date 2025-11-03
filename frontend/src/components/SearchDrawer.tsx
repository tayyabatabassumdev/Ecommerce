import { X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchStore } from "@/store/useSearchStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function SearchDrawer({ isOpen, onClose }: SearchDrawerProps) {
  const { query, results, loading, setQuery, searchProducts, clearSearch } =
    useSearchStore();
  const navigate = useNavigate();
  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim()) searchProducts(query);
    }, 400);
    return () => clearTimeout(delay);
  }, [query]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClose();
      navigate(`/shop?search=${encodeURIComponent(query)}`);
      clearSearch();
    }
  };
  const handleProductClick = (id: string) => {
    onClose();
    clearSearch();
    navigate(`/product/${id}`);
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 w-full bg-white z-[100] shadow-xl rounded-b-2xl"
          >
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Search className="text-yellow-600" /> Search Products
              </h2>
              <button
                onClick={() => {
                  clearSearch();
                  onClose();
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center bg-gray-100 rounded-full shadow-inner px-4 py-3 focus-within:ring-2 focus-within:ring-yellow-500">
                <Search className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search for furniture, decor, or brands..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none px-3 text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>
            <div className="max-h-[65vh] overflow-y-auto">
              {loading ? (
                <p className="text-center py-8 text-gray-500">Searching...</p>
              ) : results.length > 0 ? (
                <ul className="divide-y divide-gray-100">
                  {results.map((p) => (
                    <li
                      key={p._id}
                      onClick={() => handleProductClick(p._id)}
                      className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition"
                    >
                      <img
                        src={p.images?.[0]}
                        alt={p.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-medium text-gray-800">{p.name}</h3>
                        <p className="text-yellow-600 font-semibold">
                          Rs. {p.basePrice}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : query.trim().length > 0 ? (
                <p className="text-center py-8 text-gray-500">
                  No products found.
                </p>
              ) : (
                <p className="text-center py-8 text-gray-400">
                  Start typing to search products...
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
