import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 3;
const bucket = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (bucket.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  arr.push(now);
  bucket.set(ip, arr);
  return arr.length > RATE_MAX;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");
  return `
  <!doctype html>
  <html><body style="font-family:Inter,system-ui,sans-serif;background:#0b1120;color:#e5e7eb;padding:24px">
    <div style="max-width:560px;margin:0 auto;background:#111827;border:1px solid #1f2937;border-radius:16px;padding:28px">
      <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:0.18em;color:#60a5fa">New inquiry</p>
      <h1 style="margin:0 0 16px;font-size:20px;color:#fff">${safeName}</h1>
      <p style="margin:0 0 24px;color:#9ca3af;font-size:14px">
        <a href="mailto:${safeEmail}" style="color:#93c5fd;text-decoration:none">${safeEmail}</a>
      </p>
      <div style="border-top:1px solid #1f2937;padding-top:20px;line-height:1.6;color:#e5e7eb;font-size:14px">
        ${safeMessage}
      </div>
    </div>
  </body></html>`;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (rateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again shortly." },
        { status: 429 },
      );
    }

    const json = (await request.json().catch(() => null)) as unknown;
    const parsed = contactSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid form data" },
        { status: 400 },
      );
    }
    const { name, email, message, honeypot } = parsed.data;

    // Silently accept honeypot submissions (looks fine to bots).
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

    if (!apiKey || !to) {
      console.error("[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL");
      return NextResponse.json(
        { ok: false, error: "Mailer is not configured" },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `New inquiry from ${name}`,
      replyTo: email,
      html: renderEmail({ name, email, message }),
    });

    if (error) {
      console.error("[contact] Resend error", error);
      return NextResponse.json(
        { ok: false, error: "Failed to send. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected error" },
      { status: 500 },
    );
  }
}
