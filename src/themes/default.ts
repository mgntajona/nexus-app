import type { Theme } from "./tokens";

// The neutral base. Every era theme is `{ ...defaultTheme, ...overrides }` —
// this is the only theme that has to define every token; the rest only
// write down what actually differs.
export const defaultTheme: Theme = {
  id: "default",
  colors: {
    bg: "#f4f3f1",
    bgAlt: "#eae8e4",
    surface: "#ffffff",
    surfaceBorder: "#dcd9d3",
    ink: "#221f1c",
    inkMuted: "#6b6660",
    accent: "#d63bc4",
    accent2: "#3b3733",
    accent3: "#8a857d",
    glow: "rgba(214, 59, 196, 0.25)",
  },
  font: {
    display: "Georgia, 'Iowan Old Style', 'Times New Roman', serif",
    body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
    letterSpacingDisplay: "normal",
    fontStyleDisplay: "normal",
  },
  radius: {
    sm: "8px",
    md: "16px",
    lg: "28px",
  },
  shadow: {
    card: "0 12px 32px rgba(34, 31, 28, 0.10)",
    glow: "0 0 40px rgba(214, 59, 196, 0.18)",
  },
  motion: {
    fast: "140ms",
    base: "320ms",
    slow: "720ms",
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
  particles: {
    count: 26,
    colors: ["#d63bc4", "#8a857d", "#ffffff"],
    minSize: 1,
    maxSize: 3,
    speed: 14,
    drift: 18,
    glow: 4,
    shape: "dust",
  },
  assets: {
    portrait: "/images/default/portrait.svg",
    signatureAudio: "/audio/default/select.mp3",
    confirmAudio: "/audio/default/confirm.mp3",
  },
  copy: {
    name: "jona",
    tagline: "between worlds",
    blurb:
      "the in-between. not shadowork, not faerie — the artist before the split, and the ground every other era stands on.",
  },
  spotify: {
    embedUris: ["https://open.spotify.com/embed/artist/3AgtIu6QdjPRCbIPuyogoV"],
  },
};
