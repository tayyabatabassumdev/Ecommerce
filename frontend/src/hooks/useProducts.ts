// src/hooks/useProducts.ts
import { useEffect, useState } from "react";
import type { Product } from "@/types/Product";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
const base = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${base}/products`);

        // ✅ This is critical: we must await .json() properly
        const data = await res.json();
        console.log("Fetched products raw response:", data);

        // ✅ Normalize the data shape
        const extracted =
          Array.isArray(data) ? data :
          Array.isArray(data.data) ? data.data :
          [];

        setProducts(extracted);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading };
};
