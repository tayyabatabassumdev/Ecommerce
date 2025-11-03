import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getCart,
  addToCart,
  updateCartQuantity,
  removeCartItem,
  clearCart,
  syncCart,
} from "../services/cartService";
import type {
  CartItem as ServiceCartItem,
  Cart as ServiceCart,
} from "../services/cartService";
export interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    basePrice: number;
    images?: string[];
    image?: string;
  };
  quantity: number;
  priceAtAdd: number;
  variantId?: string;
}
interface CartState {
  items: CartItem[];
  loading: boolean;
  fetchCart: () => Promise<void>;
  addItem: (productId: string, quantity?: number, price?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  syncCart: (items: ServiceCartItem[]) => Promise<void>;
}
const mapApiItemToStoreItem = (item: ServiceCartItem): CartItem => {
  if (!item.product || typeof item.product !== "object") {
    console.error("Invalid cart item structure:", item);
    throw new Error("Invalid cart item data");
  }
  return {
    _id: item._id,
    product: {
      _id: item.product._id,
      name: item.product.name,
      basePrice: item.product.basePrice || 0,
      images: item.product.images || [],
      image: item.product.image,
    },
    quantity: item.quantity,
    priceAtAdd: item.priceAtAdd || item.product.basePrice,
    variantId: item.variantId,
  };
};
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      loading: false,
      fetchCart: async () => {
        set({ loading: true });
        try {
          const user = JSON.parse(localStorage.getItem("user") || "null");
          if (!user) {
            const guest = JSON.parse(localStorage.getItem("guest_cart") || "null");
            if (guest && Array.isArray(guest.items)) {
              const items = guest.items.map((it: ServiceCartItem) =>
                mapApiItemToStoreItem(it)
              );
              set({ items, loading: false });
              return;
            }
            set({ items: [], loading: false });
            return;
          }
          const data: ServiceCart = await getCart();
          if (!data || !data.items) {
            set({ items: [], loading: false });
            return;
          }
          const items = data.items
            .map((item) => (item.product ? mapApiItemToStoreItem(item) : null))
            .filter(Boolean) as CartItem[];

          set({ items, loading: false });
        } catch (err) {
          console.error("Fetch Cart Error:", err);
          set({ items: [], loading: false });
        }
      },
      addItem: async (productId, quantity = 1, price = 0) => {
        set({ loading: true });
        try {
          const user = JSON.parse(localStorage.getItem("user") || "null");
          if (!user) {
            const newItem: CartItem = {
              _id: `${productId}-${Date.now()}`,
              product: {
                _id: productId,
                name: "Unknown Product",
                basePrice: price || 0,
                images: [],
              },
              quantity,
              priceAtAdd: price || 0,
            };
            set((state) => {
              const exists = state.items.find(
                (i) => i.product._id === productId
              );
              const updatedItems = exists
                ? state.items.map((i) =>
                    i.product._id === productId
                      ? { ...i, quantity: i.quantity + quantity }
                      : i
                  )
                : [...state.items, newItem];
              localStorage.setItem(
                "guest_cart",
                JSON.stringify({ items: updatedItems })
              );
              return { items: updatedItems, loading: false };
            });
            return;
          }
          const updatedCart = await addToCart(productId, quantity, price);
          if (!updatedCart?.items) {
            set({ loading: false });
            return;
          }
          const items = updatedCart.items
            .map((item) => (item.product ? mapApiItemToStoreItem(item) : null))
            .filter(Boolean) as CartItem[];

          set({ items, loading: false });
        } catch (err) {
          console.error("Add Item Error:", err);
          set({ loading: false });
        }
      },
      updateQuantity: async (productId, quantity) => {
  set((state) => ({
    items: state.items.map((i) =>
      i.product._id === productId ? { ...i, quantity } : i
    ),
  }));
  try {
    const item = await updateCartQuantity(productId, quantity);
    set((state) => ({
      items: state.items.map((i) =>
        i.product._id === item.product._id
          ? { ...i, quantity: item.quantity }
          : i
      ),
    }));
  } catch (err) {
    console.error("Update Quantity Error:", err);
    await get().fetchCart();
  }
},
      removeItem: async (productId) => {
  set((state) => ({
    items: state.items.filter((i) => i.product._id !== productId),
  }));

  try {
    await removeCartItem(productId);
  } catch (err) {
    console.error("Remove Item Error:", err);
    await get().fetchCart(); 
  }
},
      clearCart: async () => {
        set({ loading: true });
        try {
          await clearCart();
          set({ items: [], loading: false });
          localStorage.removeItem("guest_cart");
        } catch (err) {
          console.error("Clear Cart Error:", err);
          set({ loading: false });
        }
      },
      syncCart: async (items: ServiceCartItem[]) => {
        set({ loading: true });
        try {
          const data = await syncCart(items);
          const mappedItems = data.items.map(mapApiItemToStoreItem);
          set({ items: mappedItems, loading: false });
        } catch (err) {
          console.error("Sync Cart Error:", err);
          set({ loading: false });
        }
      },
    }),
    {
      name: "cart-store", 
      getStorage: () => localStorage,
      partialize: (state) => ({ items: state.items }), 
    }
  )
);
