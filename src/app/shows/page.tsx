import type { Metadata } from "next";
import { SHOWS } from "@/data/shows";
import styles from "@/styles/practical.module.css";

export const metadata: Metadata = { title: "Show Dates — Jona Mgnta" };

export default function ShowsPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Show Dates</h1>
      <p className={styles.intro}>Where to catch a set, in person.</p>
      {SHOWS.length === 0 ? (
        <div className={styles.empty}>No shows announced yet — check back soon.</div>
      ) : (
        <div className={styles.list}>
          {SHOWS.map((show) => (
            <div key={show.id} className={styles.listRow}>
              <div>
                <div className={styles.cardName}>
                  {show.city} — {show.venue}
                </div>
                <div className={styles.cardMeta}>{show.date}</div>
              </div>
              {show.ticketUrl && (
                <a href={show.ticketUrl} target="_blank" rel="noopener noreferrer">
                  Tickets
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
