import type { Product } from "@/types/Product";
import { Link } from "react-router-dom";
interface ProductCardProps {
  product: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
      <Link to={`/product/${product}`} className="block">
        <div className="h-64 flex items-center justify-center bg-gray-50 overflow-hidden">
          <img
            src={
              product.images?.[0] ||
              "https://placehold.co/400x400?text=No+Image"
            }
            alt={product.name}
            className="object-contain w-full h-full transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-5 flex flex-col space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          {product.category && (
            <p className="text-sm text-gray-500 capitalize">
              {product.category}
            </p>
          )}
          <div className="flex justify-between items-center pt-2">
            <p className="text-xl font-bold text-yellow-600">
              ${product.basePrice.toFixed(2)}
            </p>
            <Link
              to={`/product/${product._id}`}
              className="text-sm bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition"
            >
              View Details
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default ProductCard;
