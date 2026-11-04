/**
 * Which aircraft flies which flight today.
 *
 * The tracker only knows registrations; the timetable only knows flight
 * numbers. This is the join. Until the PSS supplies it, ops maintain it here
 * (or via the ASSIGNMENTS env var — same JSON shape — so it can change
 * without a deploy). Keys are flight numbers, values registrations exactly
 * as the Spiders report them.
 *
 * ⚠️ Registrations below are PLACEHOLDERS for the mock. Replace with the
 * real fleet before enabling the Spidertracks provider.
 */
export type Assignments = Record<string, string>;

const DEFAULT: Assignments = {
  // Caravan 1 — the west, plus Bugungu Tue/Thu/Sat
  FU101: "5X-FUA", FU102: "5X-FUA", FU131: "5X-FUA", FU132: "5X-FUA", FU151: "5X-FUA", FU152: "5X-FUA",
  // Caravan 2 — Kisoro daily, Kidepo Mon/Wed/Fri, Moroto Tue/Thu/Sat
  FU111: "5X-FUB", FU112: "5X-FUB", FU161: "5X-FUB", FU162: "5X-FUB", FU191: "5X-FUB", FU192: "5X-FUB",
  // 1900D — Gulu and Arua daily, Hoima Mon/Wed/Fri
  FU181: "5X-KEH", FU182: "5X-KEH", FU171: "5X-KEH", FU172: "5X-KEH", FU121: "5X-KEH", FU122: "5X-KEH",
};

export function getAssignments(): Assignments {
  const raw = process.env.ASSIGNMENTS;
  if (!raw) return DEFAULT;
  try {
    const parsed = JSON.parse(raw) as Assignments;
    return { ...DEFAULT, ...parsed };
  } catch {
    console.warn("[tracking] ASSIGNMENTS env var is not valid JSON; using defaults");
    return DEFAULT;
  }
}
