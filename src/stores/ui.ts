// src/stores/ui.ts
import { atom } from "nanostores";
import type { FilterCategory } from "@/data/beverages";

export const $searchQuery     = atom<string>("");
export const $activeCategory  = atom<FilterCategory>("All");
