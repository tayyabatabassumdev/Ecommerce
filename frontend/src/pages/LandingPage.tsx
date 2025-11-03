import { useState, useEffect, useMemo } from "react";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import heroo from "@/assets/heroo.jpg";
import type { Product } from "@/types/Product";
import axios from "axios";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
export default function FurnitureLandingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const base = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
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
    const map = new Map<
      string,
      { name: string; image: string; count: number }
    >();
    products.forEach((p) => {
      if (!p.category) return;
      p.category
        .split(",")
        .map((cat) => cat.trim())
        .forEach((categoryName) => {
          if (!map.has(categoryName)) {
            map.set(categoryName, {
              name: categoryName,
              image:
                p.images && p.images.length > 0
                  ? p.images[0]
                  : "https://placehold.co/400x300?text=No+Image",
              count: 1,
            });
          } else {
            const existing = map.get(categoryName)!;
            existing.count += 1;

            if (
              existing.image.includes("placehold") &&
              p.images &&
              p.images.length > 0
            ) {
              existing.image = p.images[0];
            }
          }
        });
    });
    return Array.from(map.values()).slice(0, 8);
  }, [products]);

  return (
    <div className="min-h-screen w-full font-sans text-gray-800">
      <Header />
      <section className="flex flex-col md:flex-row justify-between items-center px-6 md:px-10 py-16 bg-[#f9f7f3] text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl space-y-6"
        >
          <p className="text-gray-500 uppercase tracking-wide">New Arrival</p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Discover Our New Collection
          </h2>
          <p className="text-gray-600">
            Shop the latest furniture styles and transform your home with modern
            elegance and comfort.
          </p>
          <Button
            onClick={() => navigate("/shop")}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-full"
          >
            Shop Now
          </Button>
        </motion.div>
        <img
          src={heroo}
          alt="Hero"
          className="w-full md:w-[400px] rounded-lg shadow-lg mt-10 md:mt-0"
        />
      </section>
      <section className="text-center py-16 px-6 md:px-10 bg-white">
        <h3 className="text-3xl font-bold mb-10">Browse The Range</h3>
        {categories.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {categories.map((category) => (
                <motion.div
                  key={category.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    navigate(
                      `/shop?category=${encodeURIComponent(category.name)}`
                    )
                  }
                  className="overflow-hidden rounded-2xl shadow-md group cursor-pointer bg-white"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      onError={(e) =>
                        (e.currentTarget.src =
                          "https://placehold.co/400x300?text=No+Image")
                      }
                      className="relative z-10 w-full h-[250px] object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 z-0" />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-1">
                      {category.name}
                    </h4>
                    <p className="text-gray-500 text-xs">
                      {category.count}{" "}
                      {category.count === 1 ? "product" : "products"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button
                onClick={() => navigate("/shop")}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-full"
              >
                Explore More Categories →
              </Button>
            </div>
          </>
        ) : (
          <p className="text-gray-500">No categories available</p>
        )}
      </section>
      <section className="py-20 bg-gray-50 px-6 md:px-10">
        <h3 className="text-3xl font-bold text-center mb-10">Our Products</h3>
        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
        <div className="text-center mt-10">
          <Button
            onClick={() => navigate("/shop")}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-full"
          >
            Show More
          </Button>
        </div>
      </section>
      <section className="py-20 text-center px-6 md:px-10">
        <h3 className="text-3xl font-bold mb-4">
          50+ Beautiful Rooms Inspiration
        </h3>
        <p className="text-gray-500 mb-8">
          Our designer ideas will inspire your next home makeover.
        </p>
        <Button
          onClick={() => navigate("/shop")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-full"
        >
          Explore More
        </Button>
        <div className="flex flex-wrap justify-center gap-6 mt-10">
          {[1, 2, 3].map((num) => (
            <img
              key={num}
              src={heroo}
              alt="inspiration"
              className="w-[300px] rounded-xl shadow-lg hover:scale-105 duration-500"
            />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
