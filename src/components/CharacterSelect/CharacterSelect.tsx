"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ERAS, type EraId } from "@/themes/registry";
import { Particles } from "@/components/Particles/Particles";
import { useEraAudio } from "./useEraAudio";
import styles from "./CharacterSelect.module.css";

const LAST_ERA_KEY = "jona-mgnta:last-era";

// Cross-tab-aware read of the last-selected era. useSyncExternalStore (not
// an effect + setState) keeps this hydration-safe: the server and the
// client's first paint both render null, and the real stored value shows
// up the instant hydration finishes.
function subscribeLastEra(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}
function getLastEraSnapshot() {
  return window.localStorage.getItem(LAST_ERA_KEY);
}
function getLastEraServerSnapshot() {
  return null;
}

export function CharacterSelect() {
  const router = useRouter();
  const audio = useEraAudio();
  const [lockedIn, setLockedIn] = useState<EraId | null>(null);
  const [shakingLocked, setShakingLocked] = useState(false);
  const lastEra = useSyncExternalStore(
    subscribeLastEra,
    getLastEraSnapshot,
    getLastEraServerSnapshot,
  ) as EraId | null;
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function select(id: EraId, confirmAudio: string | undefined) {
    if (lockedIn) return;
    setLockedIn(id);
    audio.play(confirmAudio);
    window.localStorage.setItem(LAST_ERA_KEY, id);
    window.setTimeout(() => router.push(`/world/${id}`), 650);
  }

  function touchLocked() {
    setShakingLocked(true);
    window.setTimeout(() => setShakingLocked(false), 450);
  }

  function focusIndex(index: number) {
    const total = cardRefs.current.length;
    const next = ((index % total) + total) % total;
    cardRefs.current[next]?.focus();
  }

  return (
    <section className={styles.screen}>
      <Particles />
      <div className={styles.heading}>
        <h1 className={styles.title}>Choose your world</h1>
        <p className={styles.subtitle}>Two worlds, one artist.</p>
      </div>

      <div
        className={styles.grid}
        role="listbox"
        aria-label="Character select"
        onKeyDown={(e) => {
          const currentIndex = cardRefs.current.findIndex((el) => el === document.activeElement);
          if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            focusIndex(currentIndex + 1);
          } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault();
            focusIndex(currentIndex - 1);
          }
        }}
      >
        {ERAS.map((entry, index) => {
          if (entry.locked) {
            return (
              <button
                key={entry.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                type="button"
                className={[styles.lockedCard, shakingLocked ? styles.shake : ""].join(" ")}
                onMouseEnter={touchLocked}
                onFocus={touchLocked}
                onClick={touchLocked}
                aria-label="Locked — next era, not yet revealed"
              >
                <span className={styles.teaser}>{entry.teaser}</span>
                <span className={styles.frame} aria-hidden="true" />
                <span className={styles.frameFill} aria-hidden="true" />
                <span className={styles.portraitWrap}>
                  <Image
                    src="/images/locked/portrait.svg"
                    alt=""
                    fill
                    className={[styles.portrait, styles.lockedPortrait].join(" ")}
                  />
                </span>
                <span className={styles.emblem} aria-hidden="true">
                  ?
                </span>
                <span className={styles.nameplate}>{entry.label}</span>
              </button>
            );
          }

          const { theme } = entry;
          const isLast = lastEra === entry.id;
          return (
            <button
              key={entry.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              type="button"
              className={[styles.card, lockedIn === entry.id ? styles.selected : ""].join(" ")}
              onMouseEnter={() => audio.play(theme.assets.signatureAudio)}
              onFocus={() => audio.play(theme.assets.signatureAudio)}
              onMouseLeave={() => audio.stop()}
              onBlur={() => audio.stop()}
              onClick={() => select(entry.id, theme.assets.confirmAudio)}
              aria-label={`Play as ${theme.copy.name}`}
            >
              {isLast && !lockedIn && <span className={styles.continueBadge}>Continue</span>}
              <span className={styles.frame} aria-hidden="true" />
              <span className={styles.frameFill} aria-hidden="true" />
              <span className={styles.portraitWrap}>
                <Image src={theme.assets.portrait} alt="" fill className={styles.portrait} />
              </span>
              <span className={styles.nameplate}>{theme.copy.name}</span>
            </button>
          );
        })}
      </div>

      <p className={styles.hint}>Hover to listen. Select to enter.</p>
    </section>
  );
}
