import type { Position, TrackingProvider } from "@/lib/tracking/types";
import { SCHEDULE } from "@/lib/content";
import { AIRPORTS } from "@/lib/geo";
import { getAssignments } from "@/lib/tracking/assignments";
import { interpolate } from "@/lib/tracking/geo";
import { atLocal, localDay, operatesOn } from "@/lib/tracking/time";

/**
 * Replay mock — synthesises what the Spiders would report if every flight
 * ran to the published timetable today, with a little realism: taxi out
 * 8 min before STD, airborne until STA − 6 min, taxi in, then parked.
 * Positions every 2 minutes, like a Spider on its default rate. Used
 * whenever the real provider is not configured.
 */
export const mock: TrackingProvider = {
  name: "mock",
  async positions(sinceIso, regs) {
    const since = new Date(sinceIso);
    const now = new Date();
    const day = localDay(now);
    const assign = getAssignments();
    const out: Position[] = [];
    for (const f of SCHEDULE) {
      if (!operatesOn(f.days, day)) continue;
      const reg = assign[f.flightNo];
      if (!reg || (regs?.length && !regs.includes(reg))) continue;
      const a = AIRPORTS[f.from]?.lonlat, b = AIRPORTS[f.to]?.lonlat;
      if (!a || !b) continue;
      const std = atLocal(day, f.dep), sta = atLocal(day, f.arr);
      const taxiOut = std.getTime() - 8 * 60_000;
      const airborneEnd = sta.getTime() - 6 * 60_000;
      for (let t = taxiOut; t <= Math.min(now.getTime(), sta.getTime() + 20 * 60_000); t += 120_000) {
        const at = new Date(t);
        if (at < since) continue;
        let lonlat: [number, number], gs: number, alt: number;
        if (t < std.getTime()) { lonlat = a; gs = 12; alt = 3800; }
        else if (t < airborneEnd) {
          const fr = (t - std.getTime()) / (airborneEnd - std.getTime());
          lonlat = interpolate(a, b, fr); gs = 165; alt = 8500;
        } else { lonlat = b; gs = t < sta.getTime() ? 10 : 0; alt = 3700; }
        out.push({ reg, at: at.toISOString(), lat: lonlat[1], lon: lonlat[0], gsKt: gs, altFt: alt });
      }
    }
    return out;
  },
};
