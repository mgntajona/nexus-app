import { createTheme } from "./createTheme";

// SHADOWORK: dark, industrial, moody. Debut EP, anniversary Apr 25.
// Brand magenta still shows up — per CLAUDE.md it outranks the per-world
// palette when the two conflict — but here it's a glow/accent inside a
// near-black ground rather than the dominant hue.
export const shadoworkTheme = createTheme("shadowork", {
  colors: {
    bg: "#0a0a0c",
    bgAlt: "#151417",
    surface: "#19181c",
    surfaceBorder: "#2c2a30",
    ink: "#eceaee",
    inkMuted: "#8f8b93",
    accent: "#d63bc4",
    accent2: "#6d7180",
    accent3: "#e8642c",
    glow: "rgba(214, 59, 196, 0.35)",
  },
  font: {
    display:
      "'Oswald', 'Bebas Neue', 'Arial Narrow', 'Helvetica Neue', sans-serif",
    body: "'Segoe UI', -apple-system, Helvetica, Arial, sans-serif",
    letterSpacingDisplay: "0.02em",
    fontStyleDisplay: "normal",
  },
  shadow: {
    card: "0 18px 44px rgba(0, 0, 0, 0.55)",
    glow: "0 0 56px rgba(214, 59, 196, 0.30)",
  },
  motion: {
    fast: "160ms",
    base: "420ms",
    slow: "900ms",
    easing: "cubic-bezier(0.6, 0, 0.4, 1)",
  },
  particles: {
    count: 34,
    colors: ["#e8642c", "#6d7180", "#d63bc4"],
    minSize: 1,
    maxSize: 4,
    speed: 10,
    drift: 10,
    glow: 8,
    shape: "ember",
  },
  assets: {
    portrait: "/images/shadowork/portrait.webp",
    signatureAudio: "/audio/shadowork/select.mp3",
    confirmAudio: "/audio/shadowork/confirm.mp3",
  },
  copy: {
    name: "SHADOWORK",
    tagline: "The dark half is awake",
    blurb:
      "Industrial, moody, unfinished on purpose. The debut EP's world — every scene rotoscoped from real footage, nothing softened for you.",
  },
  spotify: {
    embedUris: ["https://open.spotify.com/embed/artist/3AgtIu6QdjPRCbIPuyogoV"],
  },
});
