import { X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchStore } from "@/store/useSearchStore";
import { useEffect } from "react";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchDrawer({ isOpen, onClose }: SearchDrawerProps) {
  const { query, results, loading, setQuery, searchProducts, clearSearch } = useSearchStore();

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim()) searchProducts(query);
    }, 400);
    return () => clearTimeout(delay);
  }, [query]);

  const handleEnter = () => {
    onClose();
    clearSearch();
    // navigate(`/shop?search=${encodeURIComponent(query)}`); // move navigation to parent if needed
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 w-full bg-white z-100 shadow-xl rounded-b-2xl"
          >
            {/* Header */}
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

            {/* Search Input */}
            <div className="p-5 border-b border-gray-100">
              <SearchInput query={query} setQuery={setQuery} onEnter={handleEnter} />
            </div>

            {/* Results */}
            <div className="max-h-[65vh] overflow-y-auto px-5 py-4">
              <SearchResults
                results={results}
                query={query}
                loading={loading}
                onClose={onClose}
                clearSearch={clearSearch}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
