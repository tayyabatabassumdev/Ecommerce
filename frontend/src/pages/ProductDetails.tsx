import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import ReviewsModule from "@/components/ReviewsModule";
import { Star, CheckCircle, XCircle, Truck, Heart } from "lucide-react";
interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  basePrice: number;
  images: string[];
  averageRating: number;
  numReviews: number;
  stock: number;
  variants?: { attributes: Record<string, string>; price: number }[];
}
const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const removeFromWishlist = useWishlistStore((state) => state.removeItem);
  const wishlist = useWishlistStore((state) => state.items);
  const base = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${base}/products/${id}`);
        const data = await res.json();
        const prod = data.success ? data.data : data;
        if (prod?._id) {
          setProduct(prod);
          setSelectedImage(prod.images?.[0]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);
  useEffect(() => {
    if (product) {
      setWishlisted(wishlist.some((item) => item._id === product._id));
    }
  }, [wishlist, product]);
  const handleAddToCart = async () => {
    if (!product) return;
    setAdding(true);
    try {
      await addItem(product._id, 1, product.basePrice);
      alert("Added to cart!");
    } finally {
      setAdding(false);
    }
  };
  const handleBuyNow = () => {
    if (!product) return;
    addItem(product._id, 1, product.basePrice);
    navigate("/checkout");
  };
  const toggleWishlist = () => {
    if (!product) return;
    if (wishlisted) removeFromWishlist(product._id);
    else addToWishlist(product);
    setWishlisted(!wishlisted);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading product...
      </div>
    );
  if (!product)
    return (
      <div className="text-center text-gray-600 mt-20">Product not found.</div>
    );
  const inStock = product.stock > 0;
  const lowStock = product.stock > 0 && product.stock <= 5;
  const description =
    showFullDescription || product.description.length < 200
      ? product.description
      : product.description.slice(0, 200) + "...";

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-16 py-12">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-center relative">
            <button
              onClick={toggleWishlist}
              className={`absolute top-4 right-4 p-2 rounded-full border transition ${
                wishlisted
                  ? "bg-red-100 border-red-300 text-red-600"
                  : "bg-white border-gray-200 text-gray-600 hover:text-red-500"
              }`}
            >
              <Heart
                className={`w-6 h-6 ${
                  wishlisted ? "fill-red-500" : "fill-none"
                }`}
              />
            </button>
            <img
              src={selectedImage || product.images?.[0]}
              alt={product.name}
              className="w-full h-[480px] object-contain rounded-xl"
            />
          </div>
          {product.images?.length > 1 && (
            <div className="grid grid-cols-5 gap-3">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setSelectedImage(img)}
                  className={`w-full h-24 object-cover rounded-lg border cursor-pointer transition-all ${
                    selectedImage === img
                      ? "border-yellow-600 scale-105"
                      : "border-gray-200"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-sm text-gray-500 uppercase tracking-wide">
              {product.category}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  fill={
                    i < Math.round(product.averageRating)
                      ? "currentColor"
                      : "none"
                  }
                  className="w-5 h-5"
                />
              ))}
            </div>
            <span className="text-gray-600 text-sm">
              ({product.numReviews} reviews)
            </span>
          </div>
          <div className="text-4xl font-semibold text-yellow-600">
            ${product.basePrice.toFixed(2)}
          </div>
          <div className="flex items-center gap-2 text-sm">
            {inStock ? (
              <>
                <CheckCircle className="text-green-600 w-5 h-5" />
                <span className="text-green-700 font-medium">
                  {lowStock
                    ? `Only ${product.stock} left in stock!`
                    : "In Stock"}
                </span>
              </>
            ) : (
              <>
                <XCircle className="text-red-500 w-5 h-5" />
                <span className="text-red-600 font-medium">Out of Stock</span>
              </>
            )}
          </div>
          {product.variants && product.variants.length > 0 && (
            <div className="mt-4">
              <p className="font-medium mb-2">Available Options:</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => {
                  const text = Object.entries(v.attributes)
                    .map(([k, val]) => `${k}: ${val}`)
                    .join(", ");
                  return (
                    <button
                      key={i}
                      className="px-3 py-1 border rounded-full text-sm bg-gray-100 hover:bg-yellow-50 border-gray-200"
                    >
                      {text}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          <div className="text-gray-700 leading-relaxed">
            {description}
            {product.description.length > 200 && (
              <button
                onClick={() => setShowFullDescription((p) => !p)}
                className="text-yellow-600 ml-2 hover:underline"
              >
                {showFullDescription ? "View Less" : "View More"}
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              disabled={adding || !inStock}
              className={`px-8 py-3 rounded-xl font-medium text-white shadow transition-all ${
                adding
                  ? "bg-gray-400 cursor-not-allowed"
                  : inStock
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {inStock
                ? adding
                  ? "Adding..."
                  : "Add to Cart"
                : "Out of Stock"}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={!inStock}
              className={`border border-yellow-600 px-8 py-3 rounded-xl font-medium transition ${
                inStock
                  ? "text-yellow-700 hover:bg-yellow-50"
                  : "text-gray-400 border-gray-300 cursor-not-allowed"
              }`}
            >
              Buy Now
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
            <Truck className="w-4 h-4" />
            <span>Free shipping on orders over $50 • 30-day return policy</span>
          </div>
        </div>
      </div>
      <div className="mt-0 max-w-5xl mx-auto">
        <ReviewsModule productId={product._id} />
      </div>
    </div>
  );
};
export default ProductDetails;
