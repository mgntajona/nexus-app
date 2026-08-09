"use client";

import Image from "next/image";
import { useActiveEra } from "@/themes/ActiveEra";
import { ThemeProvider } from "@/themes/ThemeProvider";
import { Particles } from "@/components/Particles/Particles";
import { Reveal } from "@/components/Reveal/Reveal";
import { SpotifyEmbed } from "@/components/SpotifyEmbed/SpotifyEmbed";
import { EmailCapture } from "@/components/EmailCapture/EmailCapture";
import styles from "./page.module.css";

/**
 * The reskin lives here, not in the root layout — this page wraps only
 * its own content in the active era's ThemeProvider, so HexSwitcher
 * (rendered by the layout, a sibling of this page) and Merch/Shows/Contact
 * (which never call useActiveEra at all) stay on the Default theme
 * regardless of what's picked here.
 *
 * The browser tab title stays the static "jona mgnta" from layout.tsx's
 * metadata rather than updating per active era — a manual document.title
 * write here loses a fight with Next's own metadata-driven <title> right
 * after a fresh page load (confirmed: it never recovers), and it's not
 * worth working around for a tab-title nicety.
 */
export default function Home() {
  const { theme } = useActiveEra();

  return (
    <ThemeProvider theme={theme} className={styles.world}>
      <section className={styles.hero}>
        <Particles />
        <div className={styles.heroContent}>
          <Reveal>
            <span className={styles.portraitWrap}>
              <Image src={theme.assets.portrait} alt="" width={220} height={220} className={styles.portrait} />
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className={styles.title}>{theme.copy.name}</h1>
            <p className={styles.tagline}>{theme.copy.tagline}</p>
          </Reveal>
          <Reveal delay={160}>
            <p className={styles.blurb}>{theme.copy.blurb}</p>
          </Reveal>
        </div>
      </section>

      <section className={styles.section}>
        <Reveal>
          <h2 className={styles.sectionTitle}>music</h2>
        </Reveal>
        <Reveal delay={80}>
          <div className={styles.spotifyStack}>
            {theme.spotify.embedUris.map((uri) => (
              <SpotifyEmbed key={uri} uri={uri} />
            ))}
          </div>
        </Reveal>
      </section>

      <section className={styles.section}>
        <Reveal>
          <EmailCapture />
        </Reveal>
      </section>
    </ThemeProvider>
  );
}
