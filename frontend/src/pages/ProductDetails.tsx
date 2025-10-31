import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import ReviewsModule  from "@/components/ReviewsModule";

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  basePrice: number;
  images: string[];
  averageRating: number;
  numReviews: number;
}


const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false); // for button loading state
  const addItem = useCartStore((state) => state.addItem);
const base = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${base}/products/${id}`);
        const data = await res.json();

        if (data?.success) {
          setProduct(data.data);
        } else if (data?._id) {
          setProduct(data); // fallback if backend sends direct product object
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    setAdding(true);
    try {
      await addItem(product._id, 1, product.basePrice);
      alert("Item added to cart!");
    } catch (error) {
      console.error(error);
      alert("Failed to add item to cart");
    } finally {
      setAdding(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading product...
      </div>
    );

  if (!product)
    return (
      <div className="text-center text-gray-600 mt-20">
        Product not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row gap-10 p-6 md:p-16">
      {/* Image Section */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-4">
        <img
          src={product.images?.[0] || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-96 h-96 object-contain rounded-2xl shadow-lg bg-white p-4"
        />
        <div className="flex gap-3">
          {product.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`thumb-${index}`}
              className="w-20 h-20 object-cover rounded-xl border hover:border-black transition"
            />
          ))}
        </div>
      </div>

      {/* Details Section */}
      <div className="flex-1 flex flex-col justify-center space-y-5">
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-gray-500 uppercase tracking-wide text-sm">
          {product.category}
        </p>
        <div className="flex items-center gap-3">
          <span className="text-yellow-500 text-xl">⭐ {product.averageRating}</span>
          <span className="text-gray-500 text-sm">
            ({product.numReviews} reviews)
          </span>
        </div>
        <div className="text-4xl font-bold text-yellow-600">
          ${product.basePrice}
        </div>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className={`px-8 py-3 rounded-xl text-white transition ${
              adding ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-600 hover:bg-yellow-800"
            }`}
          >
            {adding ? "Adding..." : "Add to Cart"}
          </button>
          <button className="border border-gray-400 text-gray-800 px-8 py-3 rounded-xl hover:bg-gray-100 transition">
            Buy Now
          </button>
        </div>
        <div className="mt-16 w-full">
  <ReviewsModule productId={product._id} />
</div>
      </div>
    </div>
  );
};

export default ProductDetails;
