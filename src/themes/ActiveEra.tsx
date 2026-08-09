"use client";

import { createContext, useCallback, useContext, useSyncExternalStore, type ReactNode } from "react";
import { getTheme, type EraId } from "./registry";
import { defaultTheme } from "./default";
import type { Theme } from "./tokens";

const STORAGE_KEY = "jona-mgnta:active-era";

// Same-tab-reactive store: the native `storage` event only fires in OTHER
// tabs, and clicking a hex icon needs this tab's own UI to update
// immediately. A tiny manual listener list gets that; the native event is
// still wired up too, so a choice made in one tab shows up in another.
let listeners: Array<() => void> = [];
function notify() {
  for (const l of listeners) l();
}
function subscribe(callback: () => void) {
  listeners.push(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
    window.removeEventListener("storage", callback);
  };
}
function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) || "default";
}
function getServerSnapshot() {
  return "default";
}

type EraContextValue = {
  eraId: string;
  theme: Theme;
  setEraId: (id: EraId) => void;
};

const EraContext = createContext<EraContextValue | null>(null);

export function useActiveEra(): EraContextValue {
  const ctx = useContext(EraContext);
  if (!ctx) throw new Error("useActiveEra() called outside an <ActiveEraProvider>");
  return ctx;
}

/**
 * Pure state/context — deliberately renders no visual wrapper of its own.
 * The reskin itself lives in the home page, which reads `theme` from here
 * and wraps only its own content in a ThemeProvider. That's what keeps
 * Merch/Shows/Contact (and this provider's own children like HexSwitcher)
 * off the active era's palette while still sharing the same picked-era
 * state everywhere.
 */
export function ActiveEraProvider({ children }: { children: ReactNode }) {
  const eraId = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setEraId = useCallback((id: EraId) => {
    window.localStorage.setItem(STORAGE_KEY, id);
    notify();
  }, []);
  const theme = getTheme(eraId) ?? defaultTheme;

  return <EraContext.Provider value={{ eraId, theme, setEraId }}>{children}</EraContext.Provider>;
}
