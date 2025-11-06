import { Search } from "lucide-react";

interface SearchInputProps {
  query: string;
  setQuery: (val: string) => void;
  onEnter: () => void;
}

export default function SearchInput({ query, setQuery, onEnter }: SearchInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onEnter();
  };

  return (
    <div className="flex items-center bg-gray-100 rounded-full shadow-inner px-4 py-3 focus-within:ring-2 focus-within:ring-yellow-500">
      <Search className="text-gray-500" />
      <input
        type="text"
        placeholder="Search for furniture, decor, or brands..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent border-none outline-none px-3 text-gray-800 placeholder-gray-400"
      />
    </div>
  );
}
