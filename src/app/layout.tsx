import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/themes/ThemeProvider";
import { defaultTheme } from "@/themes/default";
import { ActiveEraProvider } from "@/themes/ActiveEra";
import { HexSwitcher } from "@/components/HexSwitcher/HexSwitcher";
import { BottomNav } from "@/components/BottomNav/BottomNav";

export const metadata: Metadata = {
  title: "jona mgnta",
  description: "jona mgnta — two worlds, one artist.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        {/* Baseline Default theme for the whole app. ActiveEraProvider is
            pure state — it renders no wrapper of its own — so HexSwitcher
            stays on these Default vars while only the home page (which
            nests its own ThemeProvider around just its content) reskins.
            BottomNav, outside the provider entirely, always stays Default
            too. */}
        <ThemeProvider theme={defaultTheme} className="app-shell">
          <ActiveEraProvider>
            <HexSwitcher />
            <div className="app-content">{children}</div>
          </ActiveEraProvider>
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
