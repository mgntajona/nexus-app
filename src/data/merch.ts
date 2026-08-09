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
  { id: "shadowork-tee", name: "shadowork tee", price: "$32", world: "shadowork" },
  { id: "faerie-tee", name: "faerie garden tee", price: "$32", world: "faerie" },
  { id: "faerie-vinyl", name: "faerie — mixtape vinyl", price: "$28", world: "faerie" },
  { id: "shadowork-ep-cd", name: "shadowork — debut ep cd", price: "$14", world: "shadowork" },
  { id: "logo-pin", name: "magenta logo pin", price: "$10", world: "both" },
];
