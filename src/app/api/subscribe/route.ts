import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// One shared audience across every era — never a per-world list. The
// audience ID is a real Resend audience, not per-world config, so no
// matter which era's page this form was on, everyone lands in the same
// place.
export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    return NextResponse.json(
      { error: "Email capture isn't configured yet (RESEND_API_KEY / RESEND_AUDIENCE_ID)." },
      { status: 503 },
    );
  }

  let email: unknown;
  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.contacts.create({ email, audienceId });

  if (error) {
    return NextResponse.json({ error: "Couldn't add you to the list — try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
