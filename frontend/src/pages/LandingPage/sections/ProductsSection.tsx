import Button from "@/components/ui/Button";
import ProductCard from "@/components/ProductCard/ProductCard";
import type { Product } from "@/types/Product";
import { useNavigate } from "react-router-dom";

interface Props {
  products: Product[];
  loading: boolean;
  error: string;
}

export default function ProductsSection({ products, loading, error }: Props) {
  const navigate = useNavigate();

  return (
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
  );
}
