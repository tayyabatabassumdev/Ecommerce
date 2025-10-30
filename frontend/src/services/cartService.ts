import axios from "axios";

const base = import.meta.env.VITE_API_URL;

// -------------------- Types --------------------
export interface Product {
  _id: string;
  name: string;
  basePrice: number;
  images?: string[];
  image?: string;
}

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  priceAtAdd: number;
  variantId?: string;
  attributes?: Record<string, string>;
}

export interface Cart {
  user: string | null;
  items: CartItem[];
  createdAt?: string;
  updatedAt?: string;
}

// -------------------- Auth Config --------------------
const getAuthConfig = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = user?.token;
  console.log("User token:", token);

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true, // only if backend uses cookies
    
  };
};

// -------------------- Cart Services --------------------

// Get cart
// ✅ Fix: unwrap `data.data`
export const getCart = async (): Promise<Cart> => {
  const config = getAuthConfig();
  const { data } = await axios.get<{ data: Cart }>(`${base}/cart`, config);
  return data.data; // returns the actual cart
};

// ✅ Fix: backend returns full cart, so return latest cart data
export const addToCart = async (
  productId: string,
  quantity: number,
  price: number,
  variantId?: string,
  attributes?: Record<string, string>
): Promise<Cart> => {
  const config = getAuthConfig();
  const { data } = await axios.post<{ data: Cart }>(
    `${base}/cart`,
    { productId, quantity, price, variantId, attributes },
    config
  );
  return data.data; // returns full updated cart
};

// Update quantity
export const updateCartQuantity = async (
  productId: string,
  quantity: number,
  variantId?: string
): Promise<CartItem> => {
  const config = getAuthConfig();
  const { data } = await axios.put<{ data: CartItem }>(
    `${base}/cart`,
    { productId, quantity, variantId },
    config
  );
  return data.data;
};

// Remove item
export const removeCartItem = async (
  productId: string,
  variantId?: string
): Promise<CartItem> => {
  const config = getAuthConfig();
  const url = variantId ? `${`${base}/cart`}/${productId}?variantId=${variantId}` : `${`${base}/cart`}/${productId}`;
  const { data } = await axios.delete<{ data: CartItem }>(url, config);
  return data.data;
};

// Clear cart
export const clearCart = async (): Promise<Cart> => {
  const config = getAuthConfig();
  const { data } = await axios.delete<{ data: Cart }>(`${base}/cart`, config);
  return data.data;
};

// Sync cart (e.g., guest cart to user cart after login)
export const syncCart = async (items: CartItem[]): Promise<Cart> => {
  const config = getAuthConfig();
  const { data } = await axios.post<{ data: Cart }>(`${`${base}/cart`}/sync`, { items }, config);
  return data.data;
};
