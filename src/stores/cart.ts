import { atom, computed } from "nanostores";
import type { CartItem, Beverage } from "@/data/beverages";

// ─── State ────────────────────────────────────────────────────────────────────

export const $cartItems = atom<CartItem[]>([]);
export const $cartOpen  = atom<boolean>(false);

// ─── Derived ──────────────────────────────────────────────────────────────────

export const $totalItems = computed($cartItems, (items) =>
  items.reduce((sum, i) => sum + i.qty, 0)
);

export const $totalPrice = computed($cartItems, (items) =>
  items.reduce((sum, i) => sum + i.price * i.qty, 0)
);

// ─── Actions ─────────────────────────────────────────────────────────────────

export function addToCart(bev: Beverage): void {
  const current = $cartItems.get();
  const existing = current.find((i) => i.id === bev.id);

  if (existing) {
    $cartItems.set(
      current.map((i) => (i.id === bev.id ? { ...i, qty: i.qty + 1 } : i))
    );
  } else {
    $cartItems.set([...current, { ...bev, qty: 1 }]);
  }
}

export function removeFromCart(id: number): void {
  $cartItems.set($cartItems.get().filter((i) => i.id !== id));
}

export function updateQty(id: number, delta: number): void {
  const updated = $cartItems
    .get()
    .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
    .filter((i) => i.qty > 0);
  $cartItems.set(updated);
}

export function clearCart(): void {
  $cartItems.set([]);
}

export function openCart(): void  { $cartOpen.set(true);  }
export function closeCart(): void { $cartOpen.set(false); }
export function toggleCart(): void { $cartOpen.set(!$cartOpen.get()); }
