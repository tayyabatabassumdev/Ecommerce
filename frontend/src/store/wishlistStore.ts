import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistItem {
  _id: string;
  name: string;
  basePrice: number;
  images: string[];
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
  fetchWishlist: (userId: string) => Promise<void>; 
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const user = localStorage.getItem("token");
        if (!user) {
          window.location.href = "/login";
          return;
        }

        const alreadyInWishlist = get().items.some((i) => i._id === item._id);
        if (alreadyInWishlist) return;
        set({ items: [...get().items, item] });
      },

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i._id !== id),
        })),

      clearWishlist: () => set({ items: [] }),
      fetchWishlist: async (userId: string) => {
        try {
          const res = await fetch(`/api/wishlist/${userId}`);
          const data = await res.json();
          set({ items: data });
        } catch (err) {
          console.error("❌ Fetch wishlist error:", err);
        }
      },
    }),
    {
      name: "wishlist-storage",
    }
  )
);
