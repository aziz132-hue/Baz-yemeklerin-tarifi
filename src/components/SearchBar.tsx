import { Search, Loader2 } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto -mt-8 px-4 z-10">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Yemek veya malzeme ara..."
          className="w-full h-16 pl-14 pr-4 bg-white border-2 border-natural-border rounded-full shadow-xl focus:outline-none focus:border-natural-accent transition-colors text-lg"
        />
        <Search className="absolute left-5 text-natural-muted w-6 h-6" />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-3 h-11 px-8 bg-natural-accent hover:bg-[#A04A2D] disabled:bg-gray-300 text-white font-semibold rounded-full transition-all flex items-center gap-2 shadow-lg shadow-natural-accent/20"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Keşfet"}
        </button>
      </div>
    </form>
  );
}
