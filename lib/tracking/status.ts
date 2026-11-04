import type { FlightStatus, Position } from "@/lib/tracking/types";
import { SCHEDULE } from "@/lib/content";
import { AIRPORTS } from "@/lib/geo";
import { getAssignments } from "@/lib/tracking/assignments";
import { insideFence, legProgress, distanceKm } from "@/lib/tracking/geo";
import { atLocal, localHHMM, minutesBetween, operatesOn } from "@/lib/tracking/time";

const GROUND_KT = 30; // below this the aircraft is "on the ground" for our purposes
const BOARDING_MIN = 40; // minutes before STD the row goes "boarding" if the aircraft is at the strip
const DELAY_MIN = 20; // minutes past STD with no departure seen → "delayed"
const STALE_MIN = 30; // fixes older than this don't count as "now"

/**
 * Derive a status for every flight scheduled today from the day's fixes.
 * Pure: give it positions and a clock, get statuses back — easy to test.
 */
export function deriveStatuses(positions: Position[], day: string, now = new Date()): FlightStatus[] {
  const assign = getAssignments();
  const byReg = new Map<string, Position[]>();
  for (const p of positions) {
    const k = p.reg.toUpperCase();
    if (!byReg.has(k)) byReg.set(k, []);
    byReg.get(k)!.push(p);
  }
  for (const arr of byReg.values()) arr.sort((x, y) => x.at.localeCompare(y.at));

  return SCHEDULE.filter((f) => operatesOn(f.days, day)).map((f) => {
    const reg = assign[f.flightNo] ?? null;
    const std = atLocal(day, f.dep), sta = atLocal(day, f.arr);
    const base: FlightStatus = {
      flightNo: f.flightNo, from: f.from, to: f.to, std: f.dep, sta: f.arr, reg,
      state: "scheduled", progress: 0, atd: null, ata: null, lastFix: null, note: null,
    };
    if (!reg) return base;
    const fixes = (byReg.get(reg.toUpperCase()) ?? []).filter((p) => {
      const t = new Date(p.at);
      // Only fixes plausibly belonging to this leg: from 60 min before STD to 90 min after STA.
      return minutesBetween(std, t) >= -60 && minutesBetween(sta, t) <= 90;
    });
    if (!fixes.length) {
      if (minutesBetween(std, now) > DELAY_MIN) return { ...base, state: "delayed", note: "No movement reported yet" };
      return { ...base, state: minutesBetween(now, std) <= BOARDING_MIN ? "unknown" : "scheduled" };
    }

    // Walk the fixes: find first departure (leaving the origin fence) and arrival (settled in destination fence).
    let atd: Date | null = null, ata: Date | null = null, seenAtOrigin = false;
    for (const p of fixes) {
      const ll: [number, number] = [p.lon, p.lat];
      const t = new Date(p.at);
      const onGround = (p.gsKt ?? 0) < GROUND_KT;
      if (!atd) {
        if (insideFence(f.from, ll)) seenAtOrigin = true;
        // Departure = first fix outside the origin fence after the aircraft was
        // seen there. If the tracker joined late and we never saw it at the
        // origin, accept a fix after STD that is airborne and clearly along the
        // leg — but never an inbound aircraft still arriving on the previous leg.
        else if (seenAtOrigin || (t >= std && !onGround && legProgress(f.from, f.to, ll) > 0.08)) atd = t;
      } else if (!ata && insideFence(f.to, ll) && onGround) {
        ata = t;
      }
    }
    const last = fixes[fixes.length - 1];
    const lastLL: [number, number] = [last.lon, last.lat];
    const lastAt = new Date(last.at);
    const stale = minutesBetween(lastAt, now) > STALE_MIN;
    const lastFix = { at: last.at, lat: last.lat, lon: last.lon, gsKt: last.gsKt };

    if (ata) return { ...base, state: "arrived", progress: 1, atd: atd && localHHMM(atd), ata: localHHMM(ata), lastFix, note: `Landed ${AIRPORTS[f.to]?.label ?? f.to}` };
    if (atd) {
      const progress = legProgress(f.from, f.to, lastLL);
      const near = nearest(lastLL);
      const note = stale ? `Last report ${localHHMM(lastAt)}` : `${near ? `Near ${near}` : "En route"}${last.gsKt ? ` · ${Math.round(last.gsKt)} kt` : ""}`;
      return { ...base, state: "departed", progress, atd: localHHMM(atd), lastFix, note };
    }
    // Not departed. On the ground at origin?
    if (insideFence(f.from, lastLL)) {
      if (minutesBetween(std, now) > DELAY_MIN) return { ...base, state: "delayed", lastFix, note: `Still at ${AIRPORTS[f.from]?.label ?? f.from}` };
      if (minutesBetween(now, std) <= BOARDING_MIN) return { ...base, state: "boarding", lastFix, note: `At ${AIRPORTS[f.from]?.label ?? f.from}` };
    }
    return { ...base, state: "scheduled", lastFix };
  });
}

function nearest(ll: [number, number]): string | null {
  let best: { name: string; d: number } | null = null;
  for (const [code, ap] of Object.entries(AIRPORTS)) {
    const d = distanceKm(ap.lonlat, ll);
    if (!best || d < best.d) best = { name: ap.label, d };
  }
  return best && best.d < 60 ? best.name : null;
}
