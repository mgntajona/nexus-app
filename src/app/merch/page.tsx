import type { Metadata } from "next";
import { MERCH } from "@/data/merch";
import styles from "@/styles/practical.module.css";

export const metadata: Metadata = { title: "Merch — Jona Mgnta" };

const WORLD_LABEL: Record<string, string> = {
  shadowork: "SHADOWORK",
  faerie: "Faerie",
  both: "Both worlds",
};

export default function MerchPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Merch</h1>
      <p className={styles.intro}>
        Placeholder catalogue — real product links and checkout land here once the storefront is wired up.
      </p>
      <div className={styles.grid}>
        {MERCH.map((item) => (
          <div key={item.id} className={styles.card}>
            <span className={styles.cardName}>{item.name}</span>
            <span className={styles.cardMeta}>
              {item.price} · {WORLD_LABEL[item.world]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
