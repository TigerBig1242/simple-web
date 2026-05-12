// src/components/SearchBar.tsx
import { useStore } from "@nanostores/react";
import { $searchQuery } from "@/stores/ui";
import { Search } from "lucide-react";

export default function SearchBar() {
  const query = useStore($searchQuery);

  return (
    <div className="relative shrink-0">
      <Search
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-brew-muted pointer-events-none"
      />
      <input
        type="text"
        placeholder="Search drinks…"
        value={query}
        onChange={(e) => $searchQuery.set(e.target.value)}
        className="brew-search"
        aria-label="Search beverages"
      />
    </div>
  );
}
