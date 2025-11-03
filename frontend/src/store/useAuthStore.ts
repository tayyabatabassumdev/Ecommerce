import axios from "axios";
import { create } from "zustand";
const base = import.meta.env.VITE_API_URL;
interface User {
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
axios.defaults.baseURL = base;
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  loading: false,
  error: null,
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post(`/auth/login`, { email, password });
      const userData = data.data;
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userData.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
      set({ user: userData, loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Login failed",
        loading: false,
      });
    }
  },
  register: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post(`/auth/signup`, {
        name,
        email,
        password,
      });
      const userData = data.data;
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userData.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
      set({ user: userData, loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Registration failed",
        loading: false,
      });
    }
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    set({ user: null });
  },
  setUser: (user) => set({ user }),
}));
