import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export interface CartProduct {
  _id: string;
  name: string;
  basePrice: number;
  images?: string[];
  image?: string;
}
export interface CartItem {
  _id: string;
  product: CartProduct;
  quantity: number;
  priceAtAdd: number;
  variantId?: string;
}
export interface Cart {
  _id?: string;
  user?: string;
  items: CartItem[];
}
const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};
};

export const getCart = async (): Promise<Cart> => {
  try {
    const res = await axios.get(`${API_URL}/cart`, authHeaders());
    if (res.data?.success) {
      return res.data.data;
    }
    console.warn("Unexpected cart response:", res.data);
    return { items: [] };
  } catch (err: any) {
    console.error("Get Cart Error:", err.response?.data || err.message);
    throw err;
  }
};

export const addToCart = async (
  productId: string,
  quantity = 1,
  price?: number
): Promise<Cart> => {
  try {
    const payload = { productId, quantity, price };
    const res = await axios.post(`${API_URL}/cart`, payload, authHeaders());
    if (res.data?.success) {
      return res.data.data;
    }
    console.warn("Unexpected addToCart response:", res.data);
    return { items: [] };
  } catch (err: any) {
    console.error("Add to Cart Error:", err.response?.data || err.message);
    throw err;
  }
};
export const updateCartQuantity = async (
  productId: string,
  quantity: number
): Promise<CartItem> => {
  try {
    const payload = { productId, quantity };
    const res = await axios.put(`${API_URL}/cart`, payload, authHeaders());
    if (res.data?.success) {
      const updatedCart = res.data.data as Cart;
      const updatedItem = updatedCart.items.find(
        (i) => i.product._id === productId
      );
      if (!updatedItem) throw new Error("Updated item not found");
      return updatedItem;
    }
    throw new Error(res.data?.message || "Failed to update quantity");
  } catch (err: any) {
    console.error("Update Quantity Error:", err.response?.data || err.message);
    throw err;
  }
};
export const removeCartItem = async (productId: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/cart/${productId}`, authHeaders());
  } catch (err: any) {
    console.error("Remove Item Error:", err.response?.data || err.message);
    throw err;
  }
};
export const clearCart = async (): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/cart`, authHeaders());
  } catch (err: any) {
    console.error("Clear Cart Error:", err.response?.data || err.message);
    throw err;
  }
};
export const syncCart = async (
  guestCartItems: CartItem[]
): Promise<Cart> => {
  try {
    const payload = { guestCart: guestCartItems };
    const res = await axios.post(`${API_URL}/cart/sync`, payload, authHeaders());
    if (res.data?.success) {
      return res.data.data;
    }
    console.warn("Unexpected syncCart response:", res.data);
    return { items: [] };
  } catch (err: any) {
    console.error("Sync Cart Error:", err.response?.data || err.message);
    throw err;
  }
};
