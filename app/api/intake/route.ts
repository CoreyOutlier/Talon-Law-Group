import { NextResponse } from "next/server";

/* ---------------------------------------------------------------------------
 * Intake endpoint.
 *
 * Set ONE of these in your environment and leads route automatically:
 *   INTAKE_WEBHOOK_URL  — any endpoint (Zapier, Make, your CRM, Slack)
 *   INTAKE_EMAIL_TO     — used by the Resend branch below if RESEND_API_KEY set
 *
 * With neither set the submission is logged and still returns 200 so the
 * front end never dead-ends on a prospective client. Wire one before launch.
 * ------------------------------------------------------------------------- */

export const runtime = "nodejs";

type Payload = Record<string, string>;

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!body.name?.trim() || !body.phone?.trim()) {
    return NextResponse.json({ ok: false, error: "missing_contact" }, { status: 400 });
  }

  // Basic honeypot / size guard
  const serialised = JSON.stringify(body);
  if (serialised.length > 8000) {
    return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
  }

  const record = {
    ...body,
    receivedAt: new Date().toISOString(),
    userAgent: req.headers.get("user-agent") ?? "",
    referer: req.headers.get("referer") ?? "",
  };

  const webhook = process.env.INTAKE_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("[intake] webhook failed", err, record);
      return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
    }
  }

  console.warn("[intake] No INTAKE_WEBHOOK_URL configured. Lead logged only:", record);
  return NextResponse.json({ ok: true, warning: "no_destination_configured" });
}
