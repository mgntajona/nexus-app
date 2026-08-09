import { defaultTheme } from "./default";
import { shadoworkTheme } from "./shadowork";
import { faerieTheme } from "./faerie";
import type { Theme } from "./tokens";

export type EraId = "default" | "shadowork" | "faerie";

export type CharacterEntry =
  | { id: EraId; locked: false; theme: Theme }
  | { id: "locked"; locked: true; teaser: string };

/**
 * The hex switcher's data source. One entry per playable era, in display
 * order, plus a trailing locked slot for the next unreleased era.
 *
 * To add a new era once it's real: write a new theme file (copy
 * `faerie.ts`'s shape), then replace the locked entry below with a real
 * one and append a fresh locked slot after it if there's another tease
 * coming. Nothing else needs to change — the switcher and `getTheme()`
 * both just read this array.
 */
export const ERAS: CharacterEntry[] = [
  { id: "default", locked: false, theme: defaultTheme },
  { id: "shadowork", locked: false, theme: shadoworkTheme },
  { id: "faerie", locked: false, theme: faerieTheme },
  {
    id: "locked",
    locked: true,
    teaser: "something's coming. i'd tell you what, but honestly — you're not ready.",
  },
];

export const PLAYABLE_ERAS = ERAS.filter(
  (e): e is Extract<CharacterEntry, { locked: false }> => !e.locked,
);

export function getTheme(id: string): Theme | undefined {
  return PLAYABLE_ERAS.find((e) => e.id === id)?.theme;
}
