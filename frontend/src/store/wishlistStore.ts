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
}
export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const alreadyInWishlist = state.items.some((i) => i._id === item._id);
          if (alreadyInWishlist) return state;
          return { items: [...state.items, item] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i._id !== id),
        })),
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "wishlist-storage",
    }
  )
);
