// The token contract every era theme implements. Components read these as
// CSS custom properties (`var(--token-name)`) — never import a Theme object
// directly — so the same component tree can be reskinned by swapping which
// theme ThemeProvider resolves, with no per-component branching.

export type ParticleShape = "spark" | "petal" | "ember" | "dust";

export type ParticlePreset = {
  count: number;
  colors: string[];
  minSize: number;
  maxSize: number;
  speed: number; // px/sec, roughly
  drift: number; // horizontal sway amplitude in px
  glow: number; // shadow blur in px, 0 disables glow
  shape: ParticleShape;
};

export type EraAssets = {
  /** Portrait shown on the hex switcher icon and the home page hero. */
  portrait: string;
  /** Short (~2-4s) signature snippet played on hover/select. Optional — a
   * missing/silent file is a no-op, never a thrown error. */
  signatureAudio?: string;
  /** Slightly longer confirm sting played once a character locks in. */
  confirmAudio?: string;
};

export type EraCopy = {
  name: string;
  tagline: string;
  blurb: string;
};

export type Theme = {
  id: string;
  colors: {
    bg: string;
    bgAlt: string;
    surface: string;
    surfaceBorder: string;
    ink: string;
    inkMuted: string;
    accent: string;
    accent2: string;
    accent3: string;
    glow: string;
  };
  font: {
    display: string;
    body: string;
    letterSpacingDisplay: string;
    fontStyleDisplay: "normal" | "italic";
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
  };
  shadow: {
    card: string;
    glow: string;
  };
  motion: {
    fast: string;
    base: string;
    slow: string;
    easing: string;
  };
  particles: ParticlePreset;
  assets: EraAssets;
  copy: EraCopy;
  spotify: {
    /** open.spotify.com/embed/... URIs, era-scoped — a world only ever
     * shows its own music. */
    embedUris: string[];
  };
};
