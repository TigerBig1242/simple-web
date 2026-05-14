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
  image: string;
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
  All: "🍶",
  Tea: "🫖",
  Coffee: "☕",
  "Milk Coffee": "🥛",
  "Signature Drinks": "✨",
  "Recommended Drinks": "⭐",
};

export const BADGE_STYLES: Record<string, { bg: string; text: string }> = {
  Bestseller: { bg: "#2E1B0E", text: "#F7F3EE" },
  New: { bg: "#5A8A5A", text: "#fff" },
  "Chef's Pick": { bg: "#C9963A", text: "#fff" },
  Favourite: { bg: "#C4956A", text: "#fff" },
  Popular: { bg: "#8B5E3C", text: "#fff" },
  Signature: { bg: "#1C1410", text: "#C9963A" },
  "⭐ Top Pick": { bg: "#F2ECE4", text: "#8B5E3C" },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

export const BEVERAGES: Beverage[] = [
  // Tea
  {
    id: 1,
    name: "Grey Royale",
    category: "Tea",
    price: 4.5,
    rating: 4.8,
    popularity: 94,
    emoji: "🫖",
    desc: "Bergamot-forward with a delicate floral finish",
    badge: "Bestseller",
    image: "images/grey-royale.jpg",
  },
  {
    id: 2,
    name: "Jasmine Pearl",
    category: "Tea",
    price: 5.0,
    rating: 4.7,
    popularity: 88,
    emoji: "🌸",
    desc: "Hand-rolled leaves blooming with fresh jasmine",
    badge: null,
    image: "images/jasmine-pearl.jpg",
  },
  {
    id: 3,
    name: "Matcha Coconut",
    category: "Tea",
    price: 4.75,
    rating: 4.9,
    popularity: 97,
    emoji: "🍵",
    desc: "Roasted Japanese green tea, smoky and deeply warm",
    badge: "New",
    image: "images/matcha-coconut.webp",
  },
  {
    id: 4,
    name: "Milk Matcha",
    category: "Tea",
    price: 4.25,
    rating: 4.6,
    popularity: 82,
    emoji: "🌼",
    desc: "Golden chamomile with subtle wild-honey undertones",
    badge: null,
    image: "images/milk-matcha.jpg",
  },

  // Coffee
  {
    id: 5,
    name: "Ice Americano",
    category: "Coffee",
    price: 5.5,
    rating: 4.9,
    popularity: 98,
    emoji: "☕",
    desc: "Ethiopian Yirgacheffe — bright, citrusy & complex",
    badge: "Chef's Pick",
    image: "images/ice-americano.webp",
  },
  {
    id: 6,
    name: "Americano Honey",
    category: "Coffee",
    price: 5.75,
    rating: 4.8,
    popularity: 93,
    emoji: "🧊",
    desc: "24-hour slow steep, silky smooth and low-acid",
    badge: null,
    image: "images/honey-americano.webp",
  },
  {
    id: 7,
    name: "Americano Honey Lime",
    category: "Coffee",
    price: 3.75,
    rating: 4.7,
    popularity: 89,
    emoji: "⚡",
    desc: "Double-shot intensity with rich golden crema",
    badge: null,
    image: "images/honey-lime-americano.webp",
  },
  {
    id: 8,
    name: "Orange Americano",
    category: "Coffee",
    price: 4.5,
    rating: 4.6,
    popularity: 85,
    emoji: "🫗",
    desc: "Full-bodied brew with deep chocolate and oak notes",
    badge: null,
    image: "images/orange-americano.webp",
  },

  // Milk Coffee
  {
    id: 9,
    name: "Latte",
    category: "Milk Coffee",
    price: 4.75,
    rating: 4.8,
    popularity: 91,
    emoji: "🥛",
    desc: "Equal parts espresso and warm silky milk",
    badge: "Favourite",
    image: "images/latte.webp",
  },
  {
    id: 10,
    name: "Cappuccino",
    category: "Milk Coffee",
    price: 5.25,
    rating: 4.9,
    popularity: 96,
    emoji: "🌾",
    desc: "Creamy oat milk kissed with fine microfoam art",
    badge: "Popular",
    image: "images/cappuccino.webp  ",
  },
  {
    id: 11,
    name: "Macchiato",
    category: "Milk Coffee",
    price: 5.75,
    rating: 4.8,
    popularity: 92,
    emoji: "💜",
    desc: "Floral lavender with raw honey drizzle on steamed milk",
    badge: "New",
    image: "images/macchiato.webp",
  },
  {
    id: 12,
    name: "Cold Brew Oat Milk",
    category: "Milk Coffee",
    price: 4.75,
    rating: 4.8,
    popularity: 91,
    emoji: "🥛",
    desc: "Equal parts espresso and warm silky milk",
    badge: "Favourite",
    image: "images/cold-brew-oat-milk.webp",
  },

  // Signature
  {
    id: 13,
    name: "Orange Cold Brew",
    category: "Signature Drinks",
    price: 6.5,
    rating: 4.9,
    popularity: 99,
    emoji: "🌺",
    desc: "Cherry blossom syrup with effervescent yuzu soda",
    badge: "Signature",
    image: "images/cold-brew-orange.webp",
  },
  {
    id: 14,
    name: "Americano Coconut",
    category: "Signature Drinks",
    price: 6.75,
    rating: 4.8,
    popularity: 94,
    emoji: "🖤",
    desc: "Activated charcoal latte with whipped vanilla cream",
    badge: "Signature",
    image: "images/americano-coconut.webp",
  },
  {
    id: 15,
    name: "Refreshing Cold Brew",
    category: "Signature Drinks",
    price: 6.25,
    rating: 4.7,
    popularity: 87,
    emoji: "✨",
    desc: "Anti-inflammatory spiced blend with coconut milk",
    badge: "Signature",
    image: "images/refreshing-cold-brew.webp",
  },
  {
    id: 16,
    name: "Sparkling Cold Brew",
    category: "Signature Drinks",
    price: 6.5,
    rating: 4.9,
    popularity: 95,
    emoji: "🌹",
    desc: "Earl Grey base with rose water and cardamom cream foam",
    badge: "Signature",
    image: "images/sparkling-cold-brew.png",
  },

  // Recommended
  {
    id: 17,
    name: "Cloud Puccino",
    category: "Recommended Drinks",
    price: 6.0,
    rating: 4.9,
    popularity: 97,
    emoji: "🥥",
    desc: "Cold brew topped with luscious coconut sweet cream",
    badge: "⭐ Top Pick",
    image: "images/cloud-puccino.png",
  },
  {
    id: 18,
    name: "Crunchy Dirty",
    category: "Recommended Drinks",
    price: 5.75,
    rating: 4.8,
    popularity: 96,
    emoji: "🍯",
    desc: "Shaken espresso over ice with brown sugar syrup",
    badge: "⭐ Top Pick",
    image: "images/crunchy-dirty.png",
  },
  {
    id: 19,
    name: "Dark Bliss Bomb",
    category: "Recommended Drinks",
    price: 6.25,
    rating: 4.9,
    popularity: 98,
    emoji: "🍃",
    desc: "Ceremonial matcha with tropical mango cold foam",
    badge: "⭐ Top Pick",
    image: "images/dark-bliss-bomb.png",
  },
  {
    id: 20,
    name: "Nutelle Ferrero Latte",
    category: "Recommended Drinks",
    price: 6.0,
    rating: 4.8,
    popularity: 93,
    emoji: "🧂",
    desc: "Salted caramel with espresso and steamed oat milk",
    badge: "⭐ Top Pick",
    image: "images/nutellaferrero-latte.png",
  },
];

export const STATS = [
  {
    label: "Total Orders Today",
    value: "1,247",
    change: "+12% vs yesterday",
    icon: "📦",
  },
  {
    label: "Popular Right Now",
    value: "Oat Flat White",
    change: "96% popularity",
    icon: "🔥",
  },
  {
    label: "Today's Revenue",
    value: "4,820 bath",
    change: "+8.3% this week",
    icon: "💰",
  },
  {
    label: "Customer Favourites",
    value: "Sparkling Clod Brew",
    change: "99% loved it",
    icon: "❤️",
  },
];
