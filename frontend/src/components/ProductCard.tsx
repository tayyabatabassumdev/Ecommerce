import type { Product } from "@/types/Product";
import { Link } from "react-router-dom";
interface ProductCardProps {
  product: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const image =
    product.images?.[0] || "https://via.placeholder.com/400x400?text=No+Image";
  return (
    <Link
      to={`/product/${product._id}`}
      className="
        group bg-white rounded-2xl border border-gray-100 shadow-sm 
        hover:shadow-lg hover:-translate-y-1 transition-all duration-300 
        overflow-hidden flex flex-col w-full max-w-xs
      "
    >
      <div className="relative h-60 flex items-center justify-center bg-gray-50 overflow-hidden">
        <img
          src={image}
          alt={product.name}
          onError={(e) =>
            (e.currentTarget.src =
              "https://via.placeholder.com/400x400?text=Image+Not+Found")
          }
          className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col grow">
        <h3
          className="text-base font-semibold text-gray-900 line-clamp-2 h-12 mb-1"
          title={product.name}
        >
          {product.name}
        </h3>
        {product.category && (
          <p className="text-sm text-gray-500 capitalize mb-2">
            {product.category}
          </p>
        )}
        <div className="mt-auto flex justify-between items-center pt-2">
          <p className="text-lg font-bold text-yellow-600">
            ${product.basePrice?.toFixed(2) || "—"}
          </p>
          <span
            className="
              bg-yellow-600 text-white text-xs px-4 py-2 rounded-full 
              group-hover:bg-yellow-700 transition-colors duration-200
            "
          >
            View
          </span>
        </div>
      </div>
    </Link>
  );
};
export default ProductCard;
