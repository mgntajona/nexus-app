"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ERAS, type EraId } from "@/themes/registry";
import { useActiveEra } from "@/themes/ActiveEra";
import { useEraAudio } from "@/lib/useEraAudio";
import styles from "./HexSwitcher.module.css";

/**
 * Persistent, always-Default-styled control pinned at the top of every
 * page. Picking an icon reskins the home page's content in place — no
 * navigation, no separate per-era route. Hexagons are clipped with a
 * negative margin overlap so they tile edge-to-edge like a honeycomb strip
 * instead of sitting as separate spaced-out icons.
 */
export function HexSwitcher() {
  const { eraId, setEraId } = useActiveEra();
  const audio = useEraAudio();
  const [shakingLocked, setShakingLocked] = useState(false);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  function touchLocked() {
    setShakingLocked(true);
    window.setTimeout(() => setShakingLocked(false), 400);
  }

  function focusIndex(index: number) {
    const total = refs.current.length;
    const next = ((index % total) + total) % total;
    refs.current[next]?.focus();
  }

  return (
    <nav
      className={styles.switcher}
      aria-label="world switcher"
      onKeyDown={(e) => {
        const current = refs.current.findIndex((el) => el === document.activeElement);
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          focusIndex(current + 1);
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          focusIndex(current - 1);
        }
      }}
    >
      {ERAS.map((entry, index) => {
        if (entry.locked) {
          return (
            <button
              key={entry.id}
              ref={(el) => {
                refs.current[index] = el;
              }}
              type="button"
              className={[styles.hex, styles.locked, shakingLocked ? styles.shake : ""].join(" ")}
              onMouseEnter={touchLocked}
              onFocus={touchLocked}
              onClick={touchLocked}
              aria-label="locked — next era, not yet revealed"
            >
              <span className={styles.teaser}>{entry.teaser}</span>
              <Image
                src="/images/locked/portrait.svg"
                alt=""
                fill
                className={[styles.hexImg, styles.lockedImg].join(" ")}
              />
              <span className={styles.emblem} aria-hidden="true">
                ?
              </span>
            </button>
          );
        }

        const { theme } = entry;
        const isActive = eraId === entry.id;
        return (
          <button
            key={entry.id}
            ref={(el) => {
              refs.current[index] = el;
            }}
            type="button"
            className={[styles.hex, isActive ? styles.active : ""].join(" ")}
            aria-pressed={isActive}
            onMouseEnter={() => audio.play(theme.assets.signatureAudio)}
            onFocus={() => audio.play(theme.assets.signatureAudio)}
            onMouseLeave={() => audio.stop()}
            onBlur={() => audio.stop()}
            onClick={() => {
              setEraId(entry.id as EraId);
              audio.play(theme.assets.confirmAudio);
            }}
            aria-label={`switch to ${theme.copy.name}`}
          >
            <Image src={theme.assets.portrait} alt="" fill className={styles.hexImg} />
          </button>
        );
      })}
    </nav>
  );
}
