import type { Product } from "@/types/Product";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div className="p-4 flex flex-col grow">
      <h3
        className="text-base font-semibold text-gray-900 line-clamp-2 h-12 mb-1"
        title={product.name}
      >
        {product.name}
      </h3>
      {product.category && (
        <p className="text-sm text-gray-500 capitalize mb-2">{product.category}</p>
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
  );
};

export default ProductInfo;
