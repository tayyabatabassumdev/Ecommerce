import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import type { Product } from "@/types/Product";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const base = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${base}/products/`);
        setProducts(res.data.data);
      } catch {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [base]);

  const categories = useMemo(() => {
  const map = new Map<string, { name: string; image: string; count: number }>();

  products.forEach((p) => {
    if (!p.category) return;

    const categoryList = Array.isArray(p.category)
      ? p.category
      : p.category.split(",").map((cat) => cat.trim());

    categoryList.forEach((categoryName) => {
      if (!categoryName) return;

      const validImage =
        p.images && p.images[0] ? p.images[0] : "https://placehold.co/400x300?text=No+Image";

      if (!map.has(categoryName)) {
        map.set(categoryName, {
          name: categoryName,
          image: validImage,
          count: 1,
        });
      } else {
        const existing = map.get(categoryName)!;
        existing.count++;
        if (existing.image.includes("placehold") && validImage !== existing.image)
          existing.image = validImage;
      }
    });
  });

  return Array.from(map.values()).slice(0, 8);
}, [products]);

  return { products, loading, error, categories };
};
