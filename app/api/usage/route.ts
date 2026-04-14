import { NextResponse } from "next/server";

// Usage tracking requires user accounts. With auth removed this endpoint
// is a no-op placeholder kept so any existing callers don't 404.
export async function GET() {
  return NextResponse.json({ used: 0, limit: null, plan: "FREE" });
}
