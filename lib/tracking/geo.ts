import { AIRPORTS } from "@/lib/geo";

const R = 6371.0088; // km
const rad = (d: number) => (d * Math.PI) / 180;

/** Great-circle distance in km between two [lon, lat] points. */
export function distanceKm(a: [number, number], b: [number, number]): number {
  const dLat = rad(b[1] - a[1]);
  const dLon = rad(b[0] - a[0]);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(rad(a[1])) * Math.cos(rad(b[1])) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Point along the great circle from a to b at fraction f (0–1), as [lon, lat]. */
export function interpolate(a: [number, number], b: [number, number], f: number): [number, number] {
  const φ1 = rad(a[1]), λ1 = rad(a[0]), φ2 = rad(b[1]), λ2 = rad(b[0]);
  const d = distanceKm(a, b) / R;
  if (d === 0) return a;
  const A = Math.sin((1 - f) * d) / Math.sin(d);
  const B = Math.sin(f * d) / Math.sin(d);
  const x = A * Math.cos(φ1) * Math.cos(λ1) + B * Math.cos(φ2) * Math.cos(λ2);
  const y = A * Math.cos(φ1) * Math.sin(λ1) + B * Math.cos(φ2) * Math.sin(λ2);
  const z = A * Math.sin(φ1) + B * Math.sin(φ2);
  return [(Math.atan2(y, x) * 180) / Math.PI, (Math.atan2(z, Math.hypot(x, y)) * 180) / Math.PI];
}

/** Geofence radius per airport (km). Tarmac airports get a wider circle. */
export const FENCE_KM: Record<string, number> = { HUEN: 6, HUKF: 6, HUGU: 5, HUAR: 5 };
export const DEFAULT_FENCE_KM = 4;

export function insideFence(code: string, lonlat: [number, number]): boolean {
  const ap = AIRPORTS[code];
  if (!ap) return false;
  return distanceKm(ap.lonlat, lonlat) <= (FENCE_KM[code] ?? DEFAULT_FENCE_KM);
}

/** Fraction of the leg completed by a point, by projection onto the great circle (clamped). */
export function legProgress(from: string, to: string, lonlat: [number, number]): number {
  const a = AIRPORTS[from]?.lonlat, b = AIRPORTS[to]?.lonlat;
  if (!a || !b) return 0;
  const total = distanceKm(a, b);
  if (total === 0) return 1;
  const gone = distanceKm(a, lonlat);
  const left = distanceKm(lonlat, b);
  // Along-track estimate that behaves when the fix is off the direct line.
  const f = (gone + (total - left)) / (2 * total);
  return Math.min(1, Math.max(0, f));
}
