// src/components/CartButton.tsx
import { useStore } from "@nanostores/react";
import { $totalItems, openCart } from "@/stores/cart";
import { ShoppingBag } from "lucide-react";

export default function CartButton() {
  const total = useStore($totalItems);

  return (
    <button
      onClick={openCart}
      aria-label={`Open cart, ${total} items`}
      className="flex items-center gap-2 bg-brew-espresso text-brew-bg
                 font-sans text-[13px] font-medium rounded-xl
                 px-4 py-[10px] border-0 cursor-pointer
                 transition-colors duration-150 hover:bg-brew-accent"
    >
      <ShoppingBag size={16} />
      <span className="hidden sm:inline">
        {total > 0 ? `${total} item${total > 1 ? "s" : ""}` : "Cart"}
      </span>
      {total > 0 && (
        <span
          className="bg-brew-gold text-white rounded-full
                     w-5 h-5 flex items-center justify-center
                     text-[11px] font-bold animate-pop"
        >
          {total}
        </span>
      )}
    </button>
  );
}
