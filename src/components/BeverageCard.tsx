// src/components/BeverageCard.tsx
import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { addToCart } from "@/stores/cart";
import { BADGE_STYLES, type Beverage } from "@/data/beverages";
import { useStore } from "@nanostores/react";
import { $cartItems } from "@/stores/cart";

interface Props {
  bev: Beverage;
}

function StarRating({ rating }: { rating: number }) {
  const full  = Math.floor(rating);
  const empty = 5 - full;
  return (
    <span className="text-brew-gold text-[13px]" aria-label={`${rating} stars`}>
      {"★".repeat(full)}
      {"☆".repeat(empty)}
    </span>
  );
}

export default function BeverageCard({ bev }: Props) {
  const cartItems = useStore($cartItems);
  const cartEntry  = cartItems.find((i) => i.id === bev.id);
  const [flash, setFlash] = useState(false);

  function handleAdd() {
    addToCart(bev);
    setFlash(true);
    setTimeout(() => setFlash(false), 650);
  }

  const badgeStyle = bev.badge ? BADGE_STYLES[bev.badge] : null;

  return (
    <article className="brew-card group animate-fade-in" aria-label={bev.name}>
      {/* Emoji visual */}
      <div
        className="bg-brew-cream-light text-center text-[52px] leading-none
                   py-6 px-5 select-none transition-transform duration-300
                   group-hover:scale-105"
        aria-hidden="true"
      >
        {bev.emoji}
      </div>

      {/* Content */}
      <div className="p-[18px]">
        {/* Name + Badge row */}
        <div className="flex items-start justify-between gap-2 mb-[6px]">
          <h3 className="font-serif text-[18px] font-semibold text-brew-espresso leading-tight">
            {bev.name}
          </h3>
          {bev.badge && badgeStyle && (
            <span
              className="brew-badge"
              style={{ background: badgeStyle.bg, color: badgeStyle.text }}
            >
              {bev.badge}
            </span>
          )}
        </div>

        {/* Category pill */}
        <p className="text-[11px] font-sans text-brew-muted uppercase tracking-[0.08em] mb-[6px]">
          {bev.category}
        </p>

        {/* Description */}
        <p className="font-sans text-[12px] text-brew-muted font-light leading-relaxed mb-3">
          {bev.desc}
        </p>

        {/* Rating row */}
        <div className="flex items-center gap-[6px] mb-4 flex-wrap">
          <StarRating rating={bev.rating} />
          <span className="font-sans text-[12px] text-brew-muted">{bev.rating}</span>
          <span className="w-[3px] h-[3px] rounded-full bg-brew-muted-lt inline-block" />
          <span className="font-sans text-[12px] text-brew-muted">
            {bev.popularity}% loved it
          </span>
        </div>

        {/* Price + Add row */}
        <div className="flex items-center justify-between">
          <span className="font-serif text-[22px] font-bold text-brew-espresso">
            ${bev.price.toFixed(2)}
          </span>
          <button
            onClick={handleAdd}
            aria-label={`Add ${bev.name} to cart`}
            className={`
              flex items-center gap-[6px]
              font-sans text-[13px] font-medium rounded-[10px]
              px-[16px] py-[8px] border-0 cursor-pointer
              transition-all duration-150 tracking-wide
              ${flash
                ? "bg-brew-success text-white scale-[1.03]"
                : "bg-brew-espresso text-brew-bg hover:bg-brew-accent hover:scale-[1.03]"
              }
            `}
          >
            {flash
              ? <><Check size={13} /> Added</>
              : <><Plus size={13} /> {cartEntry ? `Add (${cartEntry.qty})` : "Add"}</>
            }
          </button>
        </div>
      </div>
    </article>
  );
}
