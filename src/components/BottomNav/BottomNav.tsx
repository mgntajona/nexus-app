import Link from "next/link";
import styles from "./BottomNav.module.css";

const LINKS = [
  { href: "/merch", label: "Merch" },
  { href: "/shows", label: "Show Dates" },
  { href: "/contact", label: "Contact & Booking" },
];

/**
 * Practical, non-era navigation. Always rendered by the root layout at
 * Default theme, regardless of which era's ThemeProvider wraps the page
 * content above it — these pages live outside the character worlds.
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
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
