import { NextResponse } from "next/server";
import { todaysStatus } from "@/lib/tracking";

/**
 * GET /api/flight-status → StatusResponse
 * Cached for 60 s at the edge so a page full of visitors costs one upstream
 * call a minute — which is also the rate the AFF feed is comfortable with.
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const data = await todaysStatus();
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" },
  });
}
