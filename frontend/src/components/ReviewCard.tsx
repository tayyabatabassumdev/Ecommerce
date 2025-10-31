// src/components/ReviewCard.tsx
import { Star } from "lucide-react";

interface ReviewCardProps {
  name: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
}

export default function ReviewCard({
  name,
  rating,
  comment,
  createdAt,
}: ReviewCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-3 text-left hover:shadow-lg transition">
      {/* User Info */}
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-lg text-gray-800">{name}</h4>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 ${
                star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>


      <p className="text-gray-600">{comment}</p>

      <p className="text-sm text-gray-400">
        {new Date(createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
