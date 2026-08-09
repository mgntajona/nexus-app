import type { Metadata } from "next";
import { MERCH } from "@/data/merch";
import styles from "@/styles/practical.module.css";

export const metadata: Metadata = { title: "merch — jona mgnta" };

const WORLD_LABEL: Record<string, string> = {
  shadowork: "shadowork",
  faerie: "faerie",
  both: "both worlds",
};

export default function MerchPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>merch</h1>
      <p className={styles.intro}>
        placeholder catalogue — real product links and checkout land here once the storefront is wired up.
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
