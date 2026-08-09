"use client";

import { useState, type FormEvent } from "react";
import styles from "@/styles/practical.module.css";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      inquiryType: form.get("inquiryType"),
      message: form.get("message"),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "something went wrong");
      setStatus("success");
      setMessage("sent — thanks, you'll hear back soon.");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "something went wrong");
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="name">
          name
        </label>
        <input id="name" name="name" required className={styles.input} disabled={status === "loading"} />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">
          email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={styles.input}
          disabled={status === "loading"}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="inquiryType">
          inquiry type
        </label>
        <select id="inquiryType" name="inquiryType" className={styles.select} disabled={status === "loading"}>
          <option value="press">press</option>
          <option value="booking">booking</option>
          <option value="general">general</option>
        </select>
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="message">
          message
        </label>
        <textarea id="message" name="message" required className={styles.textarea} disabled={status === "loading"} />
      </div>
      <button type="submit" className={styles.button} disabled={status === "loading"}>
        {status === "loading" ? "sending…" : "send"}
      </button>
      {status === "success" && <p className={styles.success}>{message}</p>}
      {status === "error" && <p className={styles.error}>{message}</p>}
    </form>
  );
}
