import { useEffect, useState } from "react";
import type { Product } from "../../types/Product";
import { getAllProducts } from "../../services/productService";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ProductSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getAllProducts();
        setProducts(result);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-10">Loading products...</div>;

  // ✅ Move slice BELOW loading check, but ABOVE return
  const previewProducts = products.slice(0, 8);

  return (
    <section className="px-8 py-12">
      <h2 className="text-3xl font-semibold mb-8">Our Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {previewProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <p className="font-bold text-xl">${product.basePrice}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Add “Show More” button */}
      <div className="flex justify-center mt-10">
        <Button
          onClick={() => navigate("/shop")}
          className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
        >
          Show More
        </Button>
      </div>
    </section>
  );
};

export default ProductSection;
