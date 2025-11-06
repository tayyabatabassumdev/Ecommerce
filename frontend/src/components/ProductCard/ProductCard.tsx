import type { Product } from "@/types/Product";
import ProductImage from "./ProductImage.tsx";
import ProductInfo from "./ProductInfo";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="
        group bg-white rounded-2xl border border-gray-100 shadow-sm 
        hover:shadow-lg hover:-translate-y-1 transition-all duration-300 
        overflow-hidden flex flex-col w-full max-w-xs
      "
    >
      <ProductImage product={product} />
      <ProductInfo product={product} />
    </Link>
  );
};

export default ProductCard;
