import type { CartItem as ServiceCartItem } from "../services/cartService";
import type { CartItem } from "../types/cart";

export const mapApiItemToStoreItem = (item: ServiceCartItem): CartItem => {
  if (!item.product || typeof item.product !== "object") {
    console.error("Invalid cart item structure:", item);
    throw new Error("Invalid cart item data");
  }
  return {
    _id: item._id,
    product: {
      _id: item.product._id,
      name: item.product.name,
      basePrice: item.product.basePrice || 0,
      images: item.product.images || [],
      image: item.product.image,
    },
    quantity: item.quantity,
    priceAtAdd: item.priceAtAdd || item.product.basePrice,
    variantId: item.variantId,
  };
};
