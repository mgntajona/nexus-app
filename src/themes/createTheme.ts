import { defaultTheme } from "./default";
import type { Theme } from "./tokens";

type ThemeOverrides = {
  [K in keyof Theme]?: Theme[K] extends object ? Partial<Theme[K]> : Theme[K];
};

/**
 * Builds an era theme from the default base plus only what differs.
 * Each top-level token group (colors, font, particles, ...) merges
 * shallowly against the base group — an override only has to name the
 * fields it changes, not restate the whole group.
 */
export function createTheme(id: string, overrides: ThemeOverrides): Theme {
  const theme = { id } as Theme;
  for (const key of Object.keys(defaultTheme) as (keyof Theme)[]) {
    const base = defaultTheme[key];
    const override = overrides[key];
    if (base && typeof base === "object" && !Array.isArray(base)) {
      (theme as Record<string, unknown>)[key] = { ...base, ...(override as object | undefined) };
    } else {
      (theme as Record<string, unknown>)[key] = override ?? base;
    }
  }
  theme.id = id;
  return theme;
}
