# nexus

Jona Mgnta's artist site — a video-game character-select landing page. Pick
an era (Default / SHADOWORK / Faerie / a locked next-era slot) and the whole
site reskins to that world.

## Stack

Next.js (App Router) + TypeScript. No Tailwind, no UI kit — theming is plain
CSS custom properties driven by a token system in `src/themes/`, and effects
(particle fields, scroll-reveal) are hand-rolled rather than pulled from a
motion library.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in Resend keys — forms work without them,
                              # they just report "not configured yet"
npm run dev
```

## Architecture

- `src/themes/tokens.ts` — the `Theme` type every era implements: colors,
  fonts, radii, shadows, motion timing, a particle preset, asset paths
  (portrait, signature audio), Spotify embed URIs, and per-era copy.
- `src/themes/default.ts` — the neutral base theme. Every era theme is
  `{ ...defaultTheme, ...overrides }` via `createTheme()` — only the tokens
  that actually differ get written down.
- `src/themes/registry.ts` — `ERAS`, the character-select data source.
  **Adding a future era is one new theme file + one new registry entry** —
  everything else (character select, routing, static params) reads this
  array and picks it up automatically.
- `src/themes/ThemeProvider.tsx` — writes a resolved theme onto
  `--group-key` CSS custom properties on a wrapper `div[data-era]`.
  Components never import a theme object directly, only `var(--...)`.
- Root layout wraps the whole app in the Default theme; `/world/[era]`
  nests its own `ThemeProvider` around just its content, which overrides
  the CSS vars for that subtree only — the bottom nav, rendered by the
  root layout as a sibling, always stays on Default. That's what keeps
  Merch/Shows/Contact era-agnostic per the brief ("practical content does
  not live inside characters").

## Known placeholders

- `public/images/faerie/portrait.webp` and `public/images/shadowork/portrait.webp`
  are the real character portraits.
- `public/images/{default,locked}/portrait.svg` are still hand-drawn
  placeholder silhouettes — real art drops in the same way the Faerie/
  SHADOWORK ones did: add the file, point `theme.assets.portrait` at it
  in `src/themes/<era>.ts`.
- `public/audio/` is empty; see `public/audio/README.md` for the exact
  filenames the site looks for. A missing/failing snippet is a silent
  no-op (`src/components/CharacterSelect/useEraAudio.ts`), not an error.

## Email

`/api/subscribe` (opt-in, one shared Resend audience regardless of era) and
`/api/contact` (press/booking inquiries, sent straight to the artist) both
fail soft with a clear error when `RESEND_API_KEY` isn't set, rather than
crashing.
