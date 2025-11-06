import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const ensureLoggedIn = (): string => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
    throw new Error("User not logged in");
  }
  return token;
};
const authHeaders = () => {
  const token = ensureLoggedIn();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
const handleError = (err: unknown, context: string): never => {
  if (axios.isAxiosError(err)) {
    console.error(`${context} Error:`, err.response?.data || err.message);
  } else {
    console.error(`${context} Error:`, err);
  }
  throw err;
};

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


export const getCart = async (): Promise<Cart> => {
  try {
    const res = await axios.get<{ success: boolean; data: Cart }>(
      `${API_URL}/cart`,
      authHeaders()
    );
    return res.data.success ? res.data.data : { items: [] };
  } catch (err) {
    handleError(err, "Get Cart");
  }
  throw new Error("Unreachable");
};

export const addToCart = async (
  productId: string,
  quantity = 1,
  price?: number
): Promise<Cart> => {
  try {
    const res = await axios.post<{ success: boolean; data: Cart }>(
      `${API_URL}/cart`,
      { productId, quantity, price },
      authHeaders()
    );
    return res.data.success ? res.data.data : { items: [] };
  } catch (err) {
    handleError(err, "Add to Cart");
  }
  throw new Error("Unreachable");
};

export const updateCartQuantity = async (
  productId: string,
  quantity: number
): Promise<CartItem> => {
  try {
    const res = await axios.put<{ success: boolean; data: Cart }>(
      `${API_URL}/cart`,
      { productId, quantity },
      authHeaders()
    );

    if (!res.data.success) throw new Error("Failed to update quantity");

    const updatedItem = res.data.data.items.find(
      (i) => i.product._id === productId
    );
    if (!updatedItem) throw new Error("Updated item not found");

    return updatedItem;
  } catch (err) {
    handleError(err, "Update Cart Quantity");
  }
  throw new Error("Unreachable");
};

export const removeCartItem = async (productId: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/cart/${productId}`, authHeaders());
  } catch (err) {
    handleError(err, "Remove Cart Item");
  }
  throw new Error("Unreachable");
};

export const clearCart = async (): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/cart`, authHeaders());
  } catch (err) {
    handleError(err, "Clear Cart");
  }
  throw new Error("Unreachable");
};
