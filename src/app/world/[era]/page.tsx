import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getTheme, PLAYABLE_ERAS } from "@/themes/registry";
import { ThemeProvider } from "@/themes/ThemeProvider";
import { Particles } from "@/components/Particles/Particles";
import { Reveal } from "@/components/Reveal/Reveal";
import { SpotifyEmbed } from "@/components/SpotifyEmbed/SpotifyEmbed";
import { EmailCapture } from "@/components/EmailCapture/EmailCapture";
import styles from "./page.module.css";

export function generateStaticParams() {
  return PLAYABLE_ERAS.map((era) => ({ era: era.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ era: string }>;
}): Promise<Metadata> {
  const { era } = await params;
  const theme = getTheme(era);
  if (!theme) return {};
  return {
    title: `${theme.copy.name} — Jona Mgnta`,
    description: theme.copy.blurb,
  };
}

export default async function WorldPage({
  params,
}: {
  params: Promise<{ era: string }>;
}) {
  const { era } = await params;
  const theme = getTheme(era);
  if (!theme) notFound();

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
          <Reveal delay={220}>
            <Link href="/" className={styles.backLink}>
              ← choose a different world
            </Link>
          </Reveal>
        </div>
      </section>

      <section className={styles.section}>
        <Reveal>
          <h2 className={styles.sectionTitle}>Music</h2>
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
