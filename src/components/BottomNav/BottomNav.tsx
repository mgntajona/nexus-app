import Link from "next/link";
import styles from "./BottomNav.module.css";

const LINKS = [
  { href: "/merch", label: "Merch", short: "Merch" },
  { href: "/shows", label: "Show Dates", short: "Shows" },
  { href: "/contact", label: "Contact & Booking", short: "Contact" },
];

/**
 * Practical, non-era navigation. Always rendered by the root layout at
 * Default theme, regardless of which era's ThemeProvider wraps the page
 * content above it — these pages live outside the character worlds.
 *
 * Below the .short breakpoint (BottomNav.module.css), each link shows its
 * abbreviated label instead of the full one — a real word swap, not a
 * font-size hack, since "Contact & Booking" has no readable one-line
 * shrink on a 375px screen. Both spans stay in the DOM; only one is
 * display:none at a time, so the accessible name always matches what's
 * visibly rendered.
 */
export function BottomNav() {
  return (
    <nav className={styles.nav} aria-label="Site">
      <Link href="/" className={styles.home}>
        Jona Mgnta
      </Link>
      <span className={styles.divider} aria-hidden="true" />
      {LINKS.map((link) => (
        <Link key={link.href} href={link.href} className={styles.link}>
          <span className={styles.full}>{link.label}</span>
          <span className={styles.short}>{link.short}</span>
        </Link>
      ))}
    </nav>
  );
}
