import { mock } from "@/lib/tracking/providers/mock";
import { spidertracks, spidertracksConfigured } from "@/lib/tracking/providers/spidertracks";
import { deriveStatuses } from "@/lib/tracking/status";
import type { StatusResponse, TrackingProvider } from "@/lib/tracking/types";
import { localDay } from "@/lib/tracking/time";
import { getAssignments } from "@/lib/tracking/assignments";

/**
 * Provider selection:
 *   TRACKING_PROVIDER=spidertracks  → live AFF feed (needs credentials)
 *   TRACKING_PROVIDER=mock          → replay of the timetable
 *   unset                           → spidertracks if configured, else mock
 */
export function provider(): TrackingProvider {
  const want = process.env.TRACKING_PROVIDER;
  if (want === "mock") return mock;
  if (want === "spidertracks" || spidertracksConfigured()) return spidertracks;
  return mock;
}

export async function todaysStatus(): Promise<StatusResponse> {
  const p = provider();
  const now = new Date();
  const day = localDay(now);
  const since = new Date(`${day}T00:00:00+03:00`).toISOString();
  const regs = Array.from(new Set(Object.values(getAssignments())));
  let positions = [] as Awaited<ReturnType<TrackingProvider["positions"]>>;
  try {
    positions = await p.positions(since, regs);
  } catch (e) {
    console.error(`[tracking] ${p.name} failed:`, e);
  }
  return {
    generatedAt: now.toISOString(),
    provider: p.name,
    simulated: p.name === "mock",
    day,
    flights: deriveStatuses(positions, day, now),
  };
}
