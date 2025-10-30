import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { motion } from "framer-motion";
import heroo from "@/assets/heroo.jpg";
import type { Product } from "@/types/Product";
import axios from "axios";

// ✅ Reusable Components
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FurnitureLandingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const base = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${base}/products`);
        setProducts(res.data.data);
      } catch {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
          <Button className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-full">
            Shop Now
          </Button>
        </motion.div>

        <img
          src={heroo}
          alt="Chair"
          className="w-full md:w-[400px] rounded-lg shadow-lg mt-10 md:mt-0"
        />
      </section>

      {/* Category Section */}
      <section className="text-center py-16 px-6 md:px-10">
        <h3 className="text-3xl font-bold mb-10">Browse The Range</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {["Living", "Dining", "Bedroom"].map((category) => (
            <div
              key={category}
              className="overflow-hidden rounded-2xl shadow-md group cursor-pointer"
            >
              <img
                src={heroo}
                alt={category}
                className="group-hover:scale-105 duration-500 w-full h-[250px] object-cover"
              />
              <h4 className="py-4 text-xl font-semibold">{category}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-50 px-6 md:px-10">
        <h3 className="text-3xl font-bold text-center mb-10">Our Products</h3>

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <Card
                key={product._id}
                className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl duration-300 bg-white flex flex-col"
              >
                <div className="relative">
                  <img
                    src={product.images?.[0] || "/images/placeholder.jpg"}
                    alt={product.name}
                    className="h-64 w-full object-cover"
                  />
                  {product.category && (
                    <span className="absolute top-4 left-4 bg-yellow-600 text-white text-sm px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                  )}
                </div>
                <CardContent className="p-4 flex-1 flex flex-col justify-between text-center">
                  <h4 className="font-semibold text-lg line-clamp-2">
                    {product.name}
                  </h4>
                  <p className="text-yellow-600 font-bold text-lg mt-2">
                    ${product.basePrice}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Button className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-full">
            Show More
          </Button>
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="py-20 text-center px-6 md:px-10">
        <h3 className="text-3xl font-bold mb-4">
          50+ Beautiful Rooms Inspiration
        </h3>
        <p className="text-gray-500 mb-8">
          Our designer ideas will inspire your next home makeover.
        </p>
        <Button className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-full">
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

      {/* Instagram Section */}
      <section className="bg-gray-50 py-20 text-center px-6 md:px-10">
        <h3 className="text-3xl font-bold mb-10">#FurnitoFurniture</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <img
              key={i}
              src={heroo}
              alt="insta"
              className="rounded-xl object-cover h-[200px] w-full hover:scale-105 duration-500"
            />
          ))}
        </div>
      </section>

      {/* ✅ Reusable Footer */}
      <Footer />
    </div>
  );
}
