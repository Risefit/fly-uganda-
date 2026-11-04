/**
 * Which aircraft flies which flight today.
 *
 * The tracker only knows registrations; the timetable only knows flight
 * numbers. This is the join. Until the PSS supplies it, ops maintain it here
 * (or via the ASSIGNMENTS env var — same JSON shape — so it can change
 * without a deploy). Keys are flight numbers, values registrations exactly
 * as the Spiders report them.
 *
 * Registrations are the real fleet (Phil, 4 Nov 2026). They must match the
 * tracker's spelling exactly — check the first live response.
 */
export type Assignments = Record<string, string>;

const DEFAULT: Assignments = {
  // 5X-PJG Caravan — Kihihi daily; Kasese Mon–Thu; Bugungu Fri–Sun
  FU101: "5X-PJG", FU102: "5X-PJG", FU131: "5X-PJG", FU132: "5X-PJG", FU151: "5X-PJG", FU152: "5X-PJG",
  // 5X-AIG Caravan — Kisoro daily; Kidepo Mon/Wed/Fri
  FU111: "5X-AIG", FU112: "5X-AIG", FU161: "5X-AIG", FU162: "5X-AIG",
  // 5X-KAI 1900D — Gulu and Arua daily
  FU181: "5X-KAI", FU182: "5X-KAI", FU171: "5X-KAI", FU172: "5X-KAI",
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
