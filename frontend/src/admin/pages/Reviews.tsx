import { Star } from "lucide-react";
interface ReviewCardProps {
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}
export default function ReviewCard({
  name,
  rating,
  comment,
  createdAt,
}: ReviewCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-lg text-gray-800">{name}</h4>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">{comment}</p>
      <p className="text-xs text-gray-400 mt-2">
        {new Date(createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
