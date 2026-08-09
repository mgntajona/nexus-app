"use client";

import { createContext, useContext, type CSSProperties, type ReactNode } from "react";
import type { Theme } from "./tokens";

const ThemeContext = createContext<Theme | null>(null);

export function useTheme(): Theme {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error("useTheme() called outside a <ThemeProvider>");
  return theme;
}

/** Flattens a theme's token groups onto `--group-key` CSS custom properties. */
function toCssVars(theme: Theme): CSSProperties {
  const vars: Record<string, string> = {};
  for (const [group, tokens] of Object.entries(theme)) {
    if (group === "id" || group === "assets" || group === "copy" || group === "spotify") continue;
    if (typeof tokens !== "object" || tokens === null) continue;
    for (const [key, value] of Object.entries(tokens)) {
      if (typeof value === "string") vars[`--${group}-${key}`] = value;
    }
  }
  return vars as CSSProperties;
}

export function ThemeProvider({
  theme,
  children,
  className,
}: {
  theme: Theme;
  children: ReactNode;
  className?: string;
}) {
  return (
    <ThemeContext.Provider value={theme}>
      <div data-era={theme.id} className={className} style={toCssVars(theme)}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
