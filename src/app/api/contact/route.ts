// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const endpoint = process.env.CONTACT_ENDPOINT;
    if (!endpoint) {
      return NextResponse.json(
        { success: false, error: "Server misconfiguration." },
        { status: 500 }
      );
    }

    // ── Step 1: POST to Apps Script, capture redirect manually ──
    const res = await fetch(endpoint, {
      method:   "POST",
      headers:  { "Content-Type": "text/plain;charset=utf-8" },
      body:     JSON.stringify({ name, email, subject, message }),
      redirect: "manual",
    });

    // ── Step 2: Follow redirect via GET (CDN serves the response) ──
    let responseText: string;

    if (res.status === 301 || res.status === 302) {
      const location = res.headers.get("location");
      if (!location) throw new Error("Redirect with no Location header.");

      const followed = await fetch(location); // GET — no body
      responseText = await followed.text();
    } else {
      responseText = await res.text();
    }

    // ── Step 3: Parse Apps Script JSON ──────────────────────────
    try {
      const json = JSON.parse(responseText);
      if (json.success === false) {
        return NextResponse.json(
          { success: false, error: json.error ?? "Apps Script error." },
          { status: 400 }
        );
      }
    } catch {
      // Non-JSON = likely an Apps Script deploy/permission error
      console.error("[contact route] Non-JSON response:", responseText.slice(0, 300));
      throw new Error("Invalid response from Apps Script. Check deploy settings.");
    }

    return NextResponse.json({ success: true });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[contact route]", msg);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}