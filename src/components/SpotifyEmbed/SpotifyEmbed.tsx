import styles from "./SpotifyEmbed.module.css";

/**
 * Thin iframe wrapper. The embed URI always comes from the active era's
 * theme config, so a world only ever plays its own music.
 */
export function SpotifyEmbed({ uri }: { uri: string }) {
  return (
    <iframe
      className={styles.frame}
      src={uri}
      width="100%"
      height="152"
      style={{ border: 0 }}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      title="spotify player"
    />
  );
}
