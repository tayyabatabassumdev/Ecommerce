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
}

export interface CartState {
  items: CartItem[];
  loading: boolean;
  fetchCart: () => Promise<void>;
  addItem: (productId: string, quantity?: number, price?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  clearOnLogout: () => void;
}
