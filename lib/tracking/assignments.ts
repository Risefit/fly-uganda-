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
  // Caravan rotations — one tail per out-and-back pair
  FU101: "5X-FUA", FU102: "5X-FUA", FU103: "5X-FUA", FU104: "5X-FUA",
  FU111: "5X-FUB", FU112: "5X-FUB",
  FU131: "5X-FUC", FU132: "5X-FUC",
  FU121: "5X-FUD", FU122: "5X-FUD",
  FU151: "5X-FUE", FU152: "5X-FUE",
  FU161: "5X-FUF", FU162: "5X-FUF",
  FU191: "5X-FUG", FU192: "5X-FUG",
  // 1900D rotations
  FU171: "5X-KEH", FU172: "5X-KEH",
  FU181: "5X-FUH", FU182: "5X-FUH", FU183: "5X-FUH", FU184: "5X-FUH",
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
