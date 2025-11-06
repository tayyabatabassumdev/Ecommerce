import { create } from "zustand";
interface Product {
  _id: string;
  name: string;
  basePrice: number;
  images: string[];
}
interface SearchState {
  query: string;
  results: Product[];
  loading: boolean;
  setQuery: (query: string) => void;
  searchProducts: (query: string) => Promise<void>;
  clearSearch: () => void;
}
export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  results: [],
  loading: false,
  setQuery: (query) => set({ query }),
  searchProducts: async (query) => {
    if (!query.trim()) return set({ results: [] });
    set({ loading: true });
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/products/search?name=${encodeURIComponent(query)}`
      );

      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      set({ results: data.data || [], loading: false });
    } catch (err) {
      console.error("Search error:", err);
      set({ loading: false, results: [] });
    }
  },

  clearSearch: () => set({ query: "", results: [] }),
}));
