// src/components/BeverageGrid.tsx
import { useMemo } from "react";
import { useStore } from "@nanostores/react";
import { $activeCategory } from "@/stores/ui";
import { $searchQuery } from "@/stores/ui";
import { BEVERAGES, CATEGORY_ICONS, type Category } from "@/data/beverages";
import BeverageCard from "./BeverageCard";

export default function BeverageGrid() {
  const activeCategory = useStore($activeCategory);
  const searchQuery    = useStore($searchQuery);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return BEVERAGES.filter((b) => {
      const matchCat =
        activeCategory === "All" || b.category === activeCategory;
      const matchSearch =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.desc.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const grouped = useMemo(() => {
    if (activeCategory !== "All") {
      return { [activeCategory]: filtered } as Record<string, typeof filtered>;
    }
    return filtered.reduce<Record<string, typeof filtered>>((acc, b) => {
      if (!acc[b.category]) acc[b.category] = [];
      acc[b.category].push(b);
      return acc;
    }, {});
  }, [filtered, activeCategory]);

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <span className="text-5xl" aria-hidden="true">🔍</span>
        <h3 className="font-serif text-2xl text-brew-espresso">No drinks found</h3>
        <p className="font-sans text-sm text-brew-muted">
          Try a different search term or category
        </p>
      </div>
    );
  }

  return (
    <div>
      {Object.entries(grouped).map(([cat, drinks]) => (
        <section key={cat} aria-labelledby={`cat-${cat.replace(/\s+/g, "-")}`}>
          {/* Section header */}
          <div className="section-divider">
            <h2
              id={`cat-${cat.replace(/\s+/g, "-")}`}
              className="font-serif text-[26px] font-semibold text-brew-espresso whitespace-nowrap"
            >
              <span aria-hidden="true">
                {CATEGORY_ICONS[cat as keyof typeof CATEGORY_ICONS] ?? "🍶"}
              </span>{" "}
              {cat}
            </h2>
          </div>

          {/* Grid */}
          <div
            className="grid gap-5 mb-2"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
            }}
          >
            {drinks.map((bev) => (
              <BeverageCard key={bev.id} bev={bev} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
