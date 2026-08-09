import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/themes/ThemeProvider";
import { defaultTheme } from "@/themes/default";
import { BottomNav } from "@/components/BottomNav/BottomNav";

export const metadata: Metadata = {
  title: "jona mgnta",
  description: "jona mgnta — two worlds, one artist.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        {/* Baseline Default theme for the whole app. A world page nests its
            own ThemeProvider around just its content, which overrides these
            CSS vars for that subtree only — BottomNav, rendered here as a
            sibling, always stays on Default. */}
        <ThemeProvider theme={defaultTheme} className="app-shell">
          <div className="app-content">{children}</div>
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
