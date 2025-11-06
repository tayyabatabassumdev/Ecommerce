import { useNavigate } from "react-router-dom";
import type { Product } from "./types"; 
interface SearchResultsProps {
  results: Product[];
  query: string;
  loading: boolean;
  onClose: () => void;
  clearSearch: () => void;
}

export default function SearchResults({ results, query, loading, onClose, clearSearch }: SearchResultsProps) {
  const navigate = useNavigate();

  const handleProductClick = (id: string) => {
    onClose();
    clearSearch();
    navigate(`/product/${id}`);
  };

  if (loading) return <p className="text-center py-8 text-gray-500">Searching...</p>;

  if (results.length > 0)
    return (
      <ul className="divide-y divide-gray-100">
        {results.map((p) => (
          <li
            key={p._id}
            onClick={() => handleProductClick(p._id)}
            className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition"
          >
            <img src={p.images?.[0]} alt={p.name} className="w-16 h-16 object-cover rounded-lg" />
            <div>
              <h3 className="font-medium text-gray-800">{p.name}</h3>
              <p className="text-yellow-600 font-semibold">Rs. {p.basePrice}</p>
            </div>
          </li>
        ))}
      </ul>
    );

  if (query.trim().length > 0)
    return <p className="text-center py-8 text-gray-500">No products found.</p>;

  return <p className="text-center py-8 text-gray-400">Start typing to search products...</p>;
}
