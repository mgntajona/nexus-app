"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * One shared <audio> element for the era switcher. A missing or failing
 * snippet file is a no-op — never a thrown error, never console noise the
 * artist has to chase down before real audio exists.
 */
export function useEraAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const el = new Audio();
    el.preload = "none";
    audioRef.current = el;
    return () => {
      el.pause();
      audioRef.current = null;
    };
  }, []);

  const play = useCallback((src: string | undefined) => {
    const el = audioRef.current;
    if (!el || !src) return;
    try {
      el.pause();
      el.currentTime = 0;
      el.src = src;
      // A rejected play() promise (autoplay policy, missing file, decode
      // failure) is expected until real snippets exist — swallow it.
      void el.play().catch(() => {});
    } catch {
      // Setting a bad src can throw synchronously in some browsers.
    }
  }, []);

  const stop = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    el.pause();
  }, []);

  return { play, stop };
}
