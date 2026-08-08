import { createTheme } from "./createTheme";

// Faerie: bright, ethereal, whimsical, garden. Mixtape + "Invisible",
// dropping Aug 7 2026. Palette lifted from the established dashboard
// reference in CLAUDE.md — cream/blush/lilac ground, brand magenta,
// plum ink — so the site and the internal dashboard read as one brand.
export const faerieTheme = createTheme("faerie", {
  colors: {
    bg: "#fff6ee",
    bgAlt: "#ffe8f4",
    surface: "#ffffff",
    surfaceBorder: "#f3e0f0",
    ink: "#3b1140",
    inkMuted: "#93157e",
    accent: "#d63bc4",
    accent2: "#7c5cff",
    accent3: "#e8c34a",
    glow: "rgba(214, 59, 196, 0.22)",
  },
  font: {
    display: "Georgia, 'Iowan Old Style', 'Times New Roman', serif",
    body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
    letterSpacingDisplay: "0.01em",
    fontStyleDisplay: "italic",
  },
  shadow: {
    card: "0 16px 40px rgba(147, 21, 126, 0.14)",
    glow: "0 0 48px rgba(214, 59, 196, 0.28)",
  },
  motion: {
    fast: "140ms",
    base: "300ms",
    slow: "640ms",
    easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  particles: {
    count: 40,
    colors: ["#d63bc4", "#7c5cff", "#e8c34a", "#ffffff"],
    minSize: 2,
    maxSize: 5,
    speed: 16,
    drift: 26,
    glow: 6,
    shape: "petal",
  },
  assets: {
    portrait: "/images/faerie/portrait.webp",
    signatureAudio: "/audio/faerie/select.mp3",
    confirmAudio: "/audio/faerie/confirm.mp3",
  },
  copy: {
    name: "Faerie",
    tagline: "You've been here before",
    blurb:
      "Bright, ethereal, garden-grown. The mixtape's world — 'Invisible,' 'Love Spell,' 'Green Lady' — dropping Aug 7, 2026.",
  },
  spotify: {
    embedUris: ["https://open.spotify.com/embed/artist/3AgtIu6QdjPRCbIPuyogoV"],
  },
});
