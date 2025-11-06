import type { Product } from "@/types/Product";

interface ProductImageProps {
  product: Product;
}

const ProductImage: React.FC<ProductImageProps> = ({ product }) => {
  const image = product.images?.[0] || "https://via.placeholder.com/400x400?text=No+Image";

  return (
    <div className="relative h-60 flex items-center justify-center bg-gray-50 overflow-hidden">
      <img
        src={image}
        alt={product.name}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            "https://via.placeholder.com/400x400?text=Image+Not+Found";
        }}
        className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
};

export default ProductImage;
