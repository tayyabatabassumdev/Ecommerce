import { create } from "zustand";
import axios from "axios";
const base = import.meta.env.VITE_API_URL;
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
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
  user: JSON.parse(localStorage.getItem("user") || "null"),
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      console.debug("Attempting login with", { email });
      const { data } = await axios.post(`${base}/auth/login`, { email, password });

      const userData = data.data;
      console.debug("Login success response:", userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userData.token); 

      set({ user: userData, loading: false });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Login failed - axios error", {
          status: err.response?.status,
          body: err.response?.data,
          message: err.message,
        });
        set({ error: err.response?.data?.message || "Login failed", loading: false });
      } else {
        console.error("Login failed - non-axios error", err);
        set({ error: "Login failed", loading: false });
      }
    }
  },

  register: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post(`${base}/auth/signup`, { name, email, password });

      const userData = data.data;
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userData.token); 

      set({ user: userData, loading: false });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        set({ error: err.response?.data?.message || "Registration failed", loading: false });
      }
    }
  },

  logout: () => {
    set({ user: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token"); 
  },

  setUser: (user) => set({ user }),
}));
