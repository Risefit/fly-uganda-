/** Africa/Kampala (UTC+3, no DST) helpers. The timetable is written in local time. */
export const TZ = "Africa/Kampala";
const OFFSET_MIN = 180;

/** "YYYY-MM-DD" for the local calendar day of a Date. */
export function localDay(d = new Date()): string {
  return new Date(d.getTime() + OFFSET_MIN * 60_000).toISOString().slice(0, 10);
}

/** Local "HH:MM" of a Date. */
export function localHHMM(d: Date): string {
  return new Date(d.getTime() + OFFSET_MIN * 60_000).toISOString().slice(11, 16);
}

/** A Date for local "HH:MM" on the given local day. */
export function atLocal(day: string, hhmm: string): Date {
  return new Date(`${day}T${hhmm}:00+03:00`);
}

/** Minutes between two Dates (b - a). */
export const minutesBetween = (a: Date, b: Date) => (b.getTime() - a.getTime()) / 60_000;

/** Does a timetable `days` string include this local date? */
export function operatesOn(days: string, day: string): boolean {
  if (/daily/i.test(days)) return true;
  const dow = new Date(`${day}T12:00:00+03:00`).getUTCDay(); // 0 Sun … 6 Sat
  const names = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return days.toLowerCase().includes(names[dow]);
}
