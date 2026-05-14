// src/components/CartPanel.tsx
import { useState } from "react";
import { useStore } from "@nanostores/react";
import { X, Minus, Plus, Trash2, ShoppingBag, CheckCircle } from "lucide-react";
import { BEVERAGES, type Beverage } from "@/data/beverages";

import {
  $cartItems,
  $cartOpen,
  $totalItems,
  $totalPrice,
  removeFromCart,
  updateQty,
  clearCart,
  closeCart,
} from "@/stores/cart";
import type { CartItem } from "@/data/beverages";

interface Props {
  bev: Beverage;
}

// ─── Drink image map ──────────────────────────────────────────────────────────
// Maps beverage id → Unsplash image URL (consistent via ?w=120&q=80 crop)
// Falls back to a warm gradient placeholder if the id is not listed.

// ─── Sub-components ───────────────────────────────────────────────────────────

const SuccessState = () => (
  <div className="flex flex-col items-center justify-center h-full gap-5 text-center py-16">
    <CheckCircle size={56} className="text-brew-success" />
    <h3 className="font-serif text-[26px] text-brew-espresso">Order Placed!</h3>
    <p className="font-sans text-sm text-brew-muted leading-relaxed">
      We&apos;re crafting your drinks with care.
      <br />
      Ready in about 8–12 minutes ☕
    </p>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
    <ShoppingBag size={48} className="text-brew-muted-lt" />
    <h3 className="font-serif text-[22px] text-brew-espresso">Your cart is empty</h3>
    <p className="font-sans text-sm text-brew-muted">Add something delightful to begin</p>
  </div>
);

// ─── Drink thumbnail ──────────────────────────────────────────────────────────
// Fixed 64×64 square, rounded-xl, object-cover with a warm fallback background.
// Shows the emoji as overlay text if the image fails to load (onerror).

function DrinkThumbnail({ bev }: { bev: Beverage }) {
  const src = BEVERAGES[bev.id];
  const [errored, setErrored] = useState(false);

  return (
    <div
      className="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-brew-border"
      aria-hidden="true"
    >
      {/* Warm gradient fallback always sits underneath */}
      <div className="absolute inset-0 bg-brew-cream-light flex items-center justify-center text-[26px] select-none">
        {bev.emoji}
      </div>

      {/* Real image on top; hides itself on error, revealing the emoji fallback */}
      {src && !errored && (
        <img
          src={`${import.meta.env.BASE_URL}${bev.image}`}
          alt={bev.name}
          width={64}
          height={64}
          loading="lazy"
          decoding="async"
          onError={() => setErrored(true)}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
        />
      )}
    </div>
  );
}

// ─── Cart item row ────────────────────────────────────────────────────────────

function CartItemRow({ bev }: { bev: CartItem }) {
  return (
    <li
      className="flex items-center gap-3 bg-brew-bg border border-brew-border
                 rounded-xl p-3 animate-fade-in"
    >
      {/* Drink image thumbnail */}
      <DrinkThumbnail bev={bev} />

      {/* Name + price */}
      <div className="flex-1 min-w-0">
        <p className="font-serif text-[14px] font-semibold text-brew-espresso truncate leading-tight">
          {bev.name}
        </p>
        <p className="font-sans text-[11px] text-brew-muted mt-[2px]">
          {bev.price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })} bath
        </p>

        {/* Qty controls — placed below name for compact vertical rhythm */}
        <div className="flex items-center gap-[6px] mt-2">
          <button
            className="qty-btn !w-6 !h-6"
            onClick={() => updateQty(bev.id, -1)}
            aria-label={`Decrease quantity of ${bev.name}`}
          >
            <Minus size={10} />
          </button>
          <span className="font-sans text-[13px] font-medium w-4 text-center select-none">
            {bev.qty}
          </span>
          <button
            className="qty-btn !w-6 !h-6"
            onClick={() => updateQty(bev.id, 1)}
            aria-label={`Increase quantity of ${bev.name}`}
          >
            <Plus size={10} />
          </button>
        </div>
      </div>

      {/* Line total + remove — stacked right column */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        <span className="font-sans text-[13px] font-semibold text-brew-espresso">
          {(bev.price * bev.qty).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        <button
          onClick={() => removeFromCart(bev.id)}
          aria-label={`Remove ${bev.name}`}
          className="text-brew-muted-lt hover:text-red-400 transition-colors duration-150 cursor-pointer"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </li>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CartPanel() {
  const isOpen     = useStore($cartOpen);
  const items      = useStore($cartItems);
  const totalItems = useStore($totalItems);
  const totalPrice = useStore($totalPrice);
  const [ordered, setOrdered] = useState(false);

  const itemLabel = totalItems === 1 ? "item" : "items";

  function handleOrder() {
    setOrdered(true);
    clearCart();
    setTimeout(() => {
      setOrdered(false);
      closeCart();
    }, 3200);
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brew-dark/50 z-[200] transition-opacity duration-300"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Panel */}
      <dialog
        open
        className="fixed top-0 right-0 h-full w-[580px] max-w-[100vw]
                   bg-brew-card flex flex-col z-[201] shadow-panel
                   animate-slide-in m-0 p-0 border-0"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* ── Header ── */}
        <div className="sticky top-0 flex items-center justify-between px-6 py-5 border-b border-brew-border bg-brew-card">
          <div>
            <h2 className="font-serif text-2xl font-bold text-brew-espresso leading-tight">
              Your Order
            </h2>
            <p className="font-sans text-[13px] text-brew-muted">
              {totalItems} {itemLabel}
            </p>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="w-9 h-9 rounded-[10px] bg-brew-cream-light border border-brew-border
                       flex items-center justify-center cursor-pointer
                       hover:bg-brew-cream transition-colors duration-150"
          >
            <X size={16} className="text-brew-muted" />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {ordered ? (
            <SuccessState />
          ) : items.length === 0 ? (
            <EmptyState />
          ) : (
            <ul className="flex flex-col gap-3" role="list">
              {items.map((bev) => (
                <CartItemRow key={bev.id} bev={bev} />
              ))}
            </ul>
          )}
        </div>

        {/* ── Footer — order summary ── */}
        {items.length > 0 && !ordered && (
          <div className="border-t border-brew-border px-6 py-5 bg-brew-card shrink-0">
            {/* Summary box */}
            <div className="bg-brew-cream-light border border-brew-border rounded-2xl p-4 mb-4">
              <p className="font-sans text-[11px] text-brew-muted uppercase tracking-[0.08em] mb-3">
                Order Summary
              </p>
              <div className="flex justify-between mb-2">
                <span className="font-sans text-sm text-brew-muted">ราคารวม</span>
                <span className="font-sans text-sm">{totalPrice.toLocaleString(undefined, 
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })} bath</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="font-sans text-sm text-brew-muted">Service charge</span>
                <span className="font-sans text-sm text-brew-success">Free</span>
              </div>
              <div className="h-px bg-brew-border mb-3" />
              <div className="flex justify-between items-baseline">
                <span className="font-serif text-[18px] font-bold text-brew-espresso">Total</span>
                <span className="font-serif text-[22px] font-bold text-brew-espresso">
                  {totalPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })} bath
                </span>
              </div>
            </div>

            {/* Place order */}
            <button
              onClick={handleOrder}
              className="w-full bg-brew-espresso text-brew-bg font-sans text-[15px]
                         font-medium rounded-xl py-4 border-0 cursor-pointer
                         hover:bg-brew-accent transition-colors duration-150"
            >
              Place Order · {totalPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} bath
            </button>
            <p className="font-sans text-center text-[12px] text-brew-muted mt-3">
              Estimated ready in 8–12 minutes ☕
            </p>
          </div>
        )}
      </dialog>
    </>
  );
}
