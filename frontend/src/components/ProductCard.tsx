import type { Product } from "@/types/Product";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div
      className="
        bg-white rounded-2xl border border-gray-100 shadow-sm 
        hover:shadow-lg transition-all duration-200 
        overflow-hidden flex flex-col w-full max-w-xs
      "
    >
      {/* Product Image */}
      <Link to={`/product/${product._id}`} className="block">
        <div className="h-60 flex items-center justify-center bg-gray-50 overflow-hidden">
          <img
            src={product.images?.[0] || "/placeholder.jpg"}
            alt={product.name}
            className="object-contain w-full h-full hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 flex flex-col grow">
        {/* Title */}
        <h3
          className="text-base font-semibold text-gray-900 line-clamp-2 h-12"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Category */}
        {product.category && (
          <p className="text-sm text-gray-500 mt-1 capitalize">
            {product.category}
          </p>
        )}

        {/* Price and Button */}
        <div className="mt-auto flex justify-between items-center pt-3">
          <p className="text-lg font-bold text-yellow-600">
            ${product.basePrice.toFixed(2)}
          </p>

          <Link
            to={`/product/${product._id}`}
            className="
              bg-yellow-600 text-white text-sm px-4 py-2 rounded-lg 
              hover:bg-yellow-800 transition-colors duration-200
            "
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
