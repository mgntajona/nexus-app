"use client";

import { useState, type FormEvent } from "react";
import styles from "./EmailCapture.module.css";

type Status = "idle" | "loading" | "success" | "error";

/**
 * One shared list across every era — this form always posts to the same
 * /api/subscribe route regardless of which world page it's rendered on.
 */
export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Something went wrong");
      setStatus("success");
      setMessage("You're on the list.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.label} htmlFor="email-capture">
        Stay in the loop
      </label>
      <div className={styles.row}>
        <input
          id="email-capture"
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          disabled={status === "loading"}
        />
        <button type="submit" className={styles.button} disabled={status === "loading"}>
          {status === "loading" ? "Joining…" : "Join"}
        </button>
      </div>
      {status === "success" && <p className={styles.success}>{message}</p>}
      {status === "error" && <p className={styles.error}>{message}</p>}
    </form>
  );
}
