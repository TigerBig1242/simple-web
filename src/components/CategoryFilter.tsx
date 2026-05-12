// src/components/CategoryFilter.tsx
import { useStore } from "@nanostores/react";
import { $activeCategory } from "@/stores/ui";
import { ALL_CATEGORIES, CATEGORY_ICONS, type FilterCategory } from "@/data/beverages";

export default function CategoryFilter() {
  const active = useStore($activeCategory);

  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 scroll-smooth"
      role="tablist"
      aria-label="Beverage categories"
    >
      {ALL_CATEGORIES.map((cat) => (
        <button
          key={cat}
          role="tab"
          aria-selected={active === cat}
          onClick={() => $activeCategory.set(cat as FilterCategory)}
          className={`cat-pill ${active === cat ? "active" : ""}`}
        >
          <span aria-hidden="true">{CATEGORY_ICONS[cat]}</span>{" "}
          {cat}
        </button>
      ))}
    </div>
  );
}
