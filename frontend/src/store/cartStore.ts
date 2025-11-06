import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast"; 
import {
  getCart,
  addToCart,
  updateCartQuantity,
  removeCartItem,
  clearCart as apiClearCart,
} from "../services/cartService";
import type { CartState } from "../types/cart";
import { redirectIfNotLoggedIn } from "../utils/redirectIfNotLoggedIn";
import { mapApiItemToStoreItem } from "../utils/mapApiItemToStoreItem";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      loading: false,

      fetchCart: async () => {
        set({ loading: true });
        try {
          redirectIfNotLoggedIn();
          const data = await getCart();
          const items = (data?.items || [])
            .filter((item) => item.product)
            .map(mapApiItemToStoreItem);
          set({ items, loading: false });
        } catch (err) {
          console.error("Fetch Cart Error:", err);
          set({ items: [], loading: false });
        }
      },

      addItem: async (productId : string, quantity = 1, price:number) => {
        set({ loading: true });
        try {
          redirectIfNotLoggedIn();
          const updatedCart = await addToCart(productId, quantity, price);
          const items = (updatedCart?.items || [])
            .filter((item) => item.product)
            .map(mapApiItemToStoreItem);
          set({ items, loading: false });

          toast.success("Item added to cart!");
        } catch (err) {
          console.error("Add Item Error:", err);
          set({ loading: false });
          toast.error("Failed to add item to cart");
        }
      },

      updateQuantity: async (productId :string, quantity:number) => {
        try {
          redirectIfNotLoggedIn();
          const updatedItem = await updateCartQuantity(productId, quantity);
          set((state) => ({
            items: state.items.map((i) =>
              i.product._id === updatedItem.product._id
                ? { ...i, quantity: updatedItem.quantity }
                : i
            ),
          }));
        } catch (err) {
          console.error("Update Quantity Error:", err);
          await get().fetchCart(); 
        }
      },

      removeItem: async (productId:string) => {
        set((state) => ({
          items: state.items.filter((i) => i.product._id !== productId),
        }));
        try {
          redirectIfNotLoggedIn();
          await removeCartItem(productId);
        } catch (err) {
          console.error("Remove Item Error:", err);
          await get().fetchCart();
        }
      },

      clearCart: async () => {
        set({ loading: true });
        try {
          redirectIfNotLoggedIn();
          await apiClearCart();
          set({ items: [], loading: false });
        } catch (err) {
          console.error("Clear Cart Error:", err);
          set({ loading: false });
        }
      },

      clearOnLogout: () => {
        localStorage.removeItem("cart-store");
        useCartStore.setState({ items: [], loading: false });
      },
    }),
    {
      name: "cart-store",
      storage: typeof window !== "undefined" ? localStorage : undefined,
      partialize: (state) => ({ items: state.items }),
    }
  )
);
