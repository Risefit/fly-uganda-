/**
 * Live flight tracking — shared types.
 *
 * Positions come from a TrackingProvider (Spidertracks AFF, or the replay
 * mock); statuses are derived from positions + the published timetable +
 * the day's tail assignments. Nothing here touches the browser directly —
 * the API route in app/api/flight-status serialises FlightStatus[] for it.
 */

export type Position = {
  /** Aircraft registration as the tracker reports it, e.g. "5X-KAI". */
  reg: string;
  /** ISO-8601 UTC timestamp of the fix. */
  at: string;
  lat: number;
  lon: number;
  /** Altitude in feet AMSL, if reported. */
  altFt?: number;
  /** Groundspeed in knots, if reported. */
  gsKt?: number;
  /** Course over ground in degrees, if reported. */
  cog?: number;
};

export interface TrackingProvider {
  readonly name: string;
  /** All fixes since `sinceIso` for the registrations given (or all enabled aircraft). */
  positions(sinceIso: string, regs?: string[]): Promise<Position[]>;
}

export type FlightState =
  | "scheduled" // nothing seen yet, before departure window
  | "boarding" // aircraft on the ground at the departure airstrip, inside 40 min of STD
  | "departed" // first fix outside the departure geofence
  | "arrived" // on the ground inside the destination geofence
  | "delayed" // past STD + threshold with no departure seen
  | "unknown"; // aircraft assigned but no fixes today

export type FlightStatus = {
  flightNo: string;
  from: string;
  to: string;
  std: string; // scheduled dep "HH:MM" local
  sta: string; // scheduled arr "HH:MM" local
  reg: string | null; // assigned tail, if any
  state: FlightState;
  /** 0–1 along the great-circle leg; 1 once arrived. */
  progress: number;
  atd: string | null; // actual off-blocks, "HH:MM" local
  ata: string | null; // actual on-blocks, "HH:MM" local
  lastFix: { at: string; lat: number; lon: number; gsKt?: number } | null;
  /** Human line for the row, e.g. "Over Hoima · 112 kt". */
  note: string | null;
};

export type StatusResponse = {
  generatedAt: string;
  provider: string;
  /** True when positions come from the replay mock, not an aircraft. */
  simulated: boolean;
  /** Local calendar day the statuses describe (Africa/Kampala). */
  day: string;
  flights: FlightStatus[];
};
