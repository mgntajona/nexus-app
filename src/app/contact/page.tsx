import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import styles from "@/styles/practical.module.css";

export const metadata: Metadata = { title: "Contact & Booking — Jona Mgnta" };

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Contact & Booking</h1>
      <p className={styles.intro}>Press inquiries, gig bookings, or anything else — this goes straight to Jona.</p>
      <ContactForm />
    </div>
  );
}
