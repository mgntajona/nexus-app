export type MerchItem = {
  id: string;
  name: string;
  price: string;
  world: "shadowork" | "faerie" | "both";
  href?: string;
};

// Placeholder catalogue — swap in real products/links when the storefront
// is ready. Shape is deliberately simple (no cart/checkout) since no
// e-commerce backend was specified for pass one.
export const MERCH: MerchItem[] = [
  { id: "shadowork-tee", name: "SHADOWORK Tee", price: "$32", world: "shadowork" },
  { id: "faerie-tee", name: "Faerie Garden Tee", price: "$32", world: "faerie" },
  { id: "faerie-vinyl", name: "Faerie — Mixtape Vinyl", price: "$28", world: "faerie" },
  { id: "shadowork-ep-cd", name: "SHADOWORK — Debut EP CD", price: "$14", world: "shadowork" },
  { id: "logo-pin", name: "Magenta Logo Pin", price: "$10", world: "both" },
];
