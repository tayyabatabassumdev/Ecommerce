import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useWishlistStore } from "@/store/wishlistStore";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import Overlay from "../WishlistDrawer/Overlay";
import Header from "../WishlistDrawer/Header";
import ItemCard from "../WishlistDrawer/ItemCard";
import EmptyState from "../WishlistDrawer/EmptyState";
import Footer from "../WishlistDrawer/Footer";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistDrawer({ isOpen, onClose }: WishlistDrawerProps) {
  const { items } = useWishlistStore();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [isOpen]);

  // Redirect if not logged in
  useEffect(() => {
    if (isOpen && !isAuthenticated) {
      toast.error("Please log in to view your wishlist");
      onClose();
      navigate("/login");
    }
  }, [isOpen, isAuthenticated, navigate, onClose]);

  if (!isAuthenticated) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Overlay onClose={onClose} />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 w-full sm:w-[420px] h-full bg-linear-to-b from-white to-gray-50 shadow-2xl z-100 flex flex-col"
          >
            <Header onClose={onClose} />
            {items.length === 0 ? (
              <EmptyState onClose={onClose} />
            ) : (
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300">
                {items.map((item) => (
                  <ItemCard key={item._id} item={item} />
                ))}
              </div>
            )}
            {items.length > 0 && <Footer onClose={onClose} />}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
