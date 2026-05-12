// ─── Types ────────────────────────────────────────────────────────────────────

export type Category =
  | "Tea"
  | "Coffee"
  | "Milk Coffee"
  | "Signature Drinks"
  | "Recommended Drinks";

export interface Beverage {
  id: number;
  name: string;
  category: Category;
  price: number;
  rating: number;
  popularity: number;
  emoji: string;
  desc: string;
  badge: string | null;
}

export interface CartItem extends Beverage {
  qty: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const ALL_CATEGORIES = [
  "All",
  "Tea",
  "Coffee",
  "Milk Coffee",
  "Signature Drinks",
  "Recommended Drinks",
] as const;

export type FilterCategory = (typeof ALL_CATEGORIES)[number];

export const CATEGORY_ICONS: Record<FilterCategory, string> = {
  All:                "🍶",
  Tea:                "🫖",
  Coffee:             "☕",
  "Milk Coffee":      "🥛",
  "Signature Drinks": "✨",
  "Recommended Drinks": "⭐",
};

export const BADGE_STYLES: Record<
  string,
  { bg: string; text: string }
> = {
  Bestseller:   { bg: "#2E1B0E", text: "#F7F3EE" },
  New:          { bg: "#5A8A5A", text: "#fff" },
  "Chef's Pick":{ bg: "#C9963A", text: "#fff" },
  Favourite:    { bg: "#C4956A", text: "#fff" },
  Popular:      { bg: "#8B5E3C", text: "#fff" },
  Signature:    { bg: "#1C1410", text: "#C9963A" },
  "⭐ Top Pick": { bg: "#F2ECE4", text: "#8B5E3C" },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

export const BEVERAGES: Beverage[] = [
  // Tea
  { id: 1,  name: "Earl Grey Royale",     category: "Tea",               price: 4.50, rating: 4.8, popularity: 94, emoji: "🫖", desc: "Bergamot-forward with a delicate floral finish",       badge: "Bestseller" },
  { id: 2,  name: "Jasmine Pearl",        category: "Tea",               price: 5.00, rating: 4.7, popularity: 88, emoji: "🌸", desc: "Hand-rolled leaves blooming with fresh jasmine",        badge: null },
  { id: 3,  name: "Hojicha Reserve",      category: "Tea",               price: 4.75, rating: 4.9, popularity: 97, emoji: "🍵", desc: "Roasted Japanese green tea, smoky and deeply warm",      badge: "New" },
  { id: 4,  name: "Chamomile Haze",       category: "Tea",               price: 4.25, rating: 4.6, popularity: 82, emoji: "🌼", desc: "Golden chamomile with subtle wild-honey undertones",     badge: null },

  // Coffee
  { id: 5,  name: "Single Origin Pour",   category: "Coffee",            price: 5.50, rating: 4.9, popularity: 98, emoji: "☕", desc: "Ethiopian Yirgacheffe — bright, citrusy & complex",      badge: "Chef's Pick" },
  { id: 6,  name: "Cold Brew Barrel",     category: "Coffee",            price: 5.75, rating: 4.8, popularity: 93, emoji: "🧊", desc: "24-hour slow steep, silky smooth and low-acid",          badge: null },
  { id: 7,  name: "Espresso Doppio",      category: "Coffee",            price: 3.75, rating: 4.7, popularity: 89, emoji: "⚡", desc: "Double-shot intensity with rich golden crema",            badge: null },
  { id: 8,  name: "French Press Dark",    category: "Coffee",            price: 4.50, rating: 4.6, popularity: 85, emoji: "🫗", desc: "Full-bodied brew with deep chocolate and oak notes",      badge: null },

  // Milk Coffee
  { id: 9,  name: "Cortado",              category: "Milk Coffee",       price: 4.75, rating: 4.8, popularity: 91, emoji: "🥛", desc: "Equal parts espresso and warm silky milk",               badge: "Favourite" },
  { id: 10, name: "Oat Flat White",       category: "Milk Coffee",       price: 5.25, rating: 4.9, popularity: 96, emoji: "🌾", desc: "Creamy oat milk kissed with fine microfoam art",         badge: "Popular" },
  { id: 11, name: "Honey Lavender Latte", category: "Milk Coffee",       price: 5.75, rating: 4.8, popularity: 92, emoji: "💜", desc: "Floral lavender with raw honey drizzle on steamed milk",  badge: "New" },
  { id: 12, name: "Maple Misto",          category: "Milk Coffee",       price: 5.00, rating: 4.6, popularity: 84, emoji: "🍁", desc: "Half brewed coffee, half steamed milk with Vermont maple", badge: null },

  // Signature
  { id: 13, name: "Sakura Fizz",          category: "Signature Drinks",  price: 6.50, rating: 4.9, popularity: 99, emoji: "🌺", desc: "Cherry blossom syrup with effervescent yuzu soda",       badge: "Signature" },
  { id: 14, name: "Midnight Velvet",      category: "Signature Drinks",  price: 6.75, rating: 4.8, popularity: 94, emoji: "🖤", desc: "Activated charcoal latte with whipped vanilla cream",     badge: "Signature" },
  { id: 15, name: "Golden Turmeric Elixir", category: "Signature Drinks",price: 6.25, rating: 4.7, popularity: 87, emoji: "✨", desc: "Anti-inflammatory spiced blend with coconut milk",        badge: "Signature" },
  { id: 16, name: "Rose Cardamom Fog",    category: "Signature Drinks",  price: 6.50, rating: 4.9, popularity: 95, emoji: "🌹", desc: "Earl Grey base with rose water and cardamom cream foam",  badge: "Signature" },

  // Recommended
  { id: 17, name: "Coconut Cold Brew",    category: "Recommended Drinks",price: 6.00, rating: 4.9, popularity: 97, emoji: "🥥", desc: "Cold brew topped with luscious coconut sweet cream",      badge: "⭐ Top Pick" },
  { id: 18, name: "Brown Sugar Espresso", category: "Recommended Drinks",price: 5.75, rating: 4.8, popularity: 96, emoji: "🍯", desc: "Shaken espresso over ice with brown sugar syrup",         badge: "⭐ Top Pick" },
  { id: 19, name: "Matcha Sunrise",       category: "Recommended Drinks",price: 6.25, rating: 4.9, popularity: 98, emoji: "🍃", desc: "Ceremonial matcha with tropical mango cold foam",         badge: "⭐ Top Pick" },
  { id: 20, name: "Caramel Sea Salt Latte",category:"Recommended Drinks",price: 6.00, rating: 4.8, popularity: 93, emoji: "🧂", desc: "Salted caramel with espresso and steamed oat milk",       badge: "⭐ Top Pick" },
];

export const STATS = [
  { label: "Total Orders Today",   value: "1,247",        change: "+12% vs yesterday", icon: "📦" },
  { label: "Popular Right Now",    value: "Oat Flat White",change: "96% popularity",   icon: "🔥" },
  { label: "Today's Revenue",      value: "$4,820",        change: "+8.3% this week",  icon: "💰" },
  { label: "Customer Favourites",  value: "Sakura Fizz",   change: "99% loved it",     icon: "❤️" },
];
