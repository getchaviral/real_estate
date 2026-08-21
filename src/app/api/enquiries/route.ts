import { NextResponse } from "next/server";

const fields = ["name", "phone", "email", "interestedIn", "location", "budget", "message"] as const;

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ error: "Enquiry service is not configured." }, { status: 503 });
  }

  try {
    const body = await request.json() as Record<string, unknown>;
    const enquiry = Object.fromEntries(fields.map((field) => [field, typeof body[field] === "string" ? body[field].trim() : ""]));
    if (!enquiry.name || !enquiry.phone) {
      return NextResponse.json({ error: "Name and mobile number are required." }, { status: 400 });
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enquiry),
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`Webhook returned ${response.status}`);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to submit your enquiry. Please try again." }, { status: 502 });
  }
}