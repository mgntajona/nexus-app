import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INQUIRY_TYPES = new Set(["press", "booking", "general"]);

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  inquiryType?: unknown;
  message?: unknown;
};

// A press/booking inquiry — sent straight to the artist's inbox, not added
// to the audience list (that's the separate opt-in EmailCapture flow).
export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Contact form isn't configured yet (RESEND_API_KEY)." },
      { status: 503 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, inquiryType, message } = payload;

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }
  const type = typeof inquiryType === "string" && INQUIRY_TYPES.has(inquiryType) ? inquiryType : "general";

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_TO_EMAIL || "mgntajona@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL || "Jona Mgnta Site <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `[${type}] New inquiry from ${name}`,
    text: `From: ${name} <${email}>\nType: ${type}\n\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: "Couldn't send — try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
