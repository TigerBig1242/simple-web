// src/components/CartPanel.tsx
import { useState } from "react";
import { useStore } from "@nanostores/react";
import { X, Minus, Plus, Trash2, ShoppingBag, CheckCircle } from "lucide-react";

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

  const SuccessState = () => (
  <div className="flex flex-col items-center justify-center h-full gap-5 text-center py-16">
    <CheckCircle size={56} className="text-brew-success" />

    <h3 className="font-serif text-[26px] text-brew-espresso">
      Order Placed!
    </h3>

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

    <h3 className="font-serif text-[22px] text-brew-espresso">
      Your cart is empty
    </h3>

    <p className="font-sans text-sm text-brew-muted">
      Add something delightful to begin
    </p>
  </div>
);

const ItemsList = () => (
  <ul className="flex flex-col gap-4">
    {items.map((item) => (
      <li
        key={item.id}
        className="flex items-center gap-3 bg-brew-bg
                   border border-brew-border rounded-xl p-3"
      >
        {/* content */}
      </li>
    ))}
  </ul>
);

let content;

  if (ordered) {
    content = (
      <SuccessState />
    );
  } else if (items.length === 0) {
    content = (
      <EmptyState />
    );
  } else {
    content = (
        <ItemsList />
    );
  }
  
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
        className="fixed top-0 right-0 h-full w-[380px] max-w-[100vw]
                   bg-brew-card flex flex-col z-[201] shadow-panel
                   animate-slide-in"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div
          className="sticky top-0 flex items-center justify-between
                     px-6 py-5 border-b border-brew-border bg-brew-card"
        >
          <div>
            <h2 className="font-serif text-2xl font-bold text-brew-espresso leading-tight">
              Your Order
            </h2>
            <p className="font-sans text-[13px] text-brew-muted">
              {totalItems} {itemLabel}
              {/* {totalItems} item{totalItems !== 1 ? "s" : ""} */}
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
 
        {/* Body
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {content}
        </div> */}

        {/* ============================================================= */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
          {ordered ? (
            /* Success state */
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center py-16">
              <CheckCircle size={56} className="text-brew-success" />
              <h3 className="font-serif text-[26px] text-brew-espresso">Order Placed!</h3>
              <p className="font-sans text-sm text-brew-muted leading-relaxed">
                We're crafting your drinks with care.<br />Ready in about 8–12 minutes ☕
              </p>
            </div>
          ) : items.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <ShoppingBag size={48} className="text-brew-muted-lt" />
              <h3 className="font-serif text-[22px] text-brew-espresso">Your cart is empty</h3>
              <p className="font-sans text-sm text-brew-muted">
                Add something delightful to begin
              </p>
            </div>
          ) : (
            /* Items list */
            <ul className="flex flex-col gap-4" role="list">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 bg-brew-bg
                             border border-brew-border rounded-xl p-3
                             animate-fade-in"
                >
                  {/* Emoji */}
                  <span className="text-[28px] shrink-0" aria-hidden="true">
                    {item.emoji}
                  </span>
 
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-[15px] font-semibold text-brew-espresso truncate">
                      {item.name}
                    </p>
                    <p className="font-sans text-[12px] text-brew-muted">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
 
                  {/* Qty controls */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, -1)}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      <Minus size={12} />
                    </button>
                    <span className="font-sans text-[15px] font-medium w-5 text-center">
                      {item.qty}
                    </span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, 1)}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
 
                  {/* Line total */}
                  <span className="font-sans text-[13px] font-medium w-12 text-right shrink-0">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
 
                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="text-brew-muted-lt hover:text-red-400 transition-colors
                               duration-150 cursor-pointer shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* ================================================================ */}
 
        {/* Footer — order summary */}
        {items.length > 0 && !ordered && (
          <div className="border-t border-brew-border px-6 py-5 bg-brew-card shrink-0">
            {/* Summary box */}
            <div className="bg-brew-cream-light border border-brew-border rounded-2xl p-4 mb-4">
              <p className="font-sans text-[11px] text-brew-muted uppercase tracking-[0.08em] mb-3">
                Order Summary
              </p>
              <div className="flex justify-between mb-2">
                <span className="font-sans text-sm text-brew-muted">Subtotal</span>
                <span className="font-sans text-sm">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="font-sans text-sm text-brew-muted">Service charge</span>
                <span className="font-sans text-sm text-brew-success">Free</span>
              </div>
              <div className="h-px bg-brew-border mb-3" />
              <div className="flex justify-between items-baseline">
                <span className="font-serif text-[18px] font-bold text-brew-espresso">
                  Total
                </span>
                <span className="font-serif text-[22px] font-bold text-brew-espresso">
                  ${totalPrice.toFixed(2)}
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
              Place Order · ${totalPrice.toFixed(2)}
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
