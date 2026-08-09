import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import styles from "@/styles/practical.module.css";

export const metadata: Metadata = { title: "contact & booking — jona mgnta" };

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>contact & booking</h1>
      <p className={styles.intro}>press inquiries, gig bookings, or anything else — this goes straight to jona.</p>
      <ContactForm />
    </div>
  );
}
