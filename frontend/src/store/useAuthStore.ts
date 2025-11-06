import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { useCartStore } from "./cartStore";
import { useWishlistStore } from "./wishlistStore";
const API_BASE_URL = import.meta.env.VITE_API_URL;
axios.defaults.baseURL = API_BASE_URL;
const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  token: string;
}
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") ?? "null"),
  loading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post<{ data: User }>("/auth/login", { email, password });
      const userData = response.data.data;

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userData.token);
      setAuthToken(userData.token);

      set({ user: userData, loading: false });
      await useCartStore.getState().fetchCart();
      await useWishlistStore.getState().fetchWishlist(userData._id);

    } catch (err) {
      const errorMessage = (err as AxiosError<{ message: string }>).response?.data?.message || "Login failed";
      set({ error: errorMessage, loading: false });
    }
  },

  register: async (name: string, email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post<{ data: User }>("/auth/signup", { name, email, password });
      const userData = response.data.data;

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userData.token);
      setAuthToken(userData.token);

      set({ user: userData, loading: false });
    } catch (err) {
      const errorMessage = (err as AxiosError<{ message: string }>).response?.data?.message || "Registration failed";
      set({ error: errorMessage, loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuthToken(null);
    useCartStore.getState().clearOnLogout();
    useWishlistStore.getState().clearWishlist();

    set({ user: null });
  },

  setUser: (user) => set({ user }),
}));
