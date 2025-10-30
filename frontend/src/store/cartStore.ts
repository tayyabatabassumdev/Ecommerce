import { create } from "zustand";
import {
  getCart,
  addToCart,
  updateCartQuantity,
  removeCartItem,
  clearCart,
  syncCart
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
  if (!item.product || typeof item.product !== 'object') {
    console.error('Invalid cart item structure:', item);
    throw new Error('Invalid cart item data');
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

export const useCartStore = create<CartState>((set) => ({
  items: [],
  loading: false,

  fetchCart: async () => {
  set({ loading: true });
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      const guest = JSON.parse(localStorage.getItem("guest_cart") || "null");
      if (guest && Array.isArray(guest.items)) {
        const items = guest.items.map((it: ServiceCartItem) => mapApiItemToStoreItem(it));
        set({ items, loading: false });
        return;
      }
      set({ items: [], loading: false });
      return;
    }

    const data: ServiceCart = await getCart();
    console.log("Cart Data:", data); 

    if (!data || !data.items) {
      console.log("No cart data or items");
      set({ items: [], loading: false });
      return;
    }

    data.items.forEach((item, index) => {
      console.log(`Item ${index}:`, item);
    });

    const items = data.items.map((item) => {
  
      if (!item.product || typeof item.product !== 'object') {
        console.log("Invalid item:", item);
        return null;
      }
      return mapApiItemToStoreItem(item);
    }).filter(Boolean) as CartItem[];

    console.log("Mapped items:", items);
    set({ items, loading: false });
  } catch (err) {
    console.error("Fetch Cart Error:", err);
    set({ items: [], loading: false });
  }
},

addItem: async (productId, quantity = 1, price = 0) => {
  set({ loading: true });
  try {
    console.log("Adding item:", { productId, quantity, price }); 
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      console.log("No authenticated user - using guest cart");
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
        const exists = state.items.find((i) => i.product._id === productId);
        let updatedItems: CartItem[];
        if (exists) {
          updatedItems = state.items.map((i) =>
            i.product._id === productId ? { ...i, quantity: i.quantity + quantity } : i
          );
        } else {
          updatedItems = [...state.items, newItem];
        }
        try {
          const persist = { items: updatedItems.map((it) => ({
            _id: it._id,
            product: {
              _id: it.product._id,
              name: it.product.name,
              basePrice: it.product.basePrice,
              images: it.product.images,
            },
            quantity: it.quantity,
            priceAtAdd: it.priceAtAdd,
            variantId: it.variantId,
          })) };
          localStorage.setItem("guest_cart", JSON.stringify(persist));
        } catch (e) {
          console.warn("Failed to persist guest cart", e);
        }

        return { items: updatedItems, loading: false };
      });
      return;
    }
    const updatedCart = await addToCart(productId, quantity, price);
    console.log("Updated cart response:", updatedCart); 

    if (!updatedCart || !updatedCart.items) {
      console.error("Invalid cart response");
      set({ loading: false });
      return;
    }

    const items = updatedCart.items
      .map(item => {
        if (!item.product || typeof item.product !== 'object') {
          console.log("Invalid item in response:", item);
          return null;
        }
        return mapApiItemToStoreItem(item);
      })
      .filter(Boolean) as CartItem[];

    console.log("Mapped items after add:", items); 
    set({ items, loading: false });
  } catch (err) {
    console.error("Add Item Error:", err);
    set({ loading: false });
  }
},
  updateQuantity: async (productId, quantity) => {
    set({ loading: true });
    try {
      const item = await updateCartQuantity(productId, quantity);
      set((state) => ({
        items: state.items.map((i) =>
          i._id === item.product._id ? { ...i, quantity: item.quantity } : i
        ),
        loading: false,
      }));
    } catch (err) {
      console.error("Update Quantity Error:", err);
      set({ loading: false });
    }
  },

  removeItem: async (productId) => {
    set({ loading: true });
    try {
      await removeCartItem(productId);
      set((state) => ({
        items: state.items.filter((i) => i._id !== productId),
        loading: false,
      }));
    } catch (err) {
      console.error("Remove Item Error:", err);
      set({ loading: false });
    }
  },

  clearCart: async () => {
    set({ loading: true });
    try {
      await clearCart();
      set({ items: [], loading: false });
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
}));