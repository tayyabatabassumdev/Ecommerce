// src/components/ReviewsModule.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "./ReviewCard";

interface Review {
  _id: string;
  user: {
    name: string;
    email?: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewsModuleProps {
  productId?: string; // ✅ make optional
}

const ReviewsModule: React.FC<ReviewsModuleProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const base = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const url = productId
          ? `${base}/reviews/${productId}`
          : `${base}/reviews`; // ✅ fetch all if no productId
        const res = await axios.get(url);
        setReviews(res.data.data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    fetchReviews();
  }, [productId, base]);

  return (
    <section className="py-20 bg-gray-50 px-6 md:px-10 text-center">
      <h3 className="text-3xl font-bold mb-10">What Our Customers Say</h3>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {reviews.map((r) => (
            <ReviewCard
              key={r._id}
              name={r.user?.name || "Anonymous"}
              rating={r.rating}
              comment={r.comment}
              createdAt={r.createdAt}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ReviewsModule;
