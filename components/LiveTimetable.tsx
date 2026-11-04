"use client";

import { useEffect, useState } from "react";
import { Plane, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { AIRPORTS } from "@/lib/geo";
import type { FlightStatus, StatusResponse } from "@/lib/tracking/types";

const POLL_MS = 60_000;

const LABEL: Record<FlightStatus["state"], string> = {
  scheduled: "Scheduled",
  boarding: "Boarding",
  departed: "In the air",
  arrived: "Landed",
  delayed: "Delayed",
  unknown: "Awaiting report",
};

/**
 * Today's flights with a progress line under each row that fills as the
 * aircraft flies the leg and turns green on landing. Polls /api/flight-status
 * once a minute; the route is edge-cached for the same interval, so the
 * upstream feed sees one call a minute however many people are watching.
 */
export function LiveTimetable({ initial }: { initial: StatusResponse }) {
  const [data, setData] = useState(initial);
  const [tick, setTick] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const r = await fetch("/api/flight-status", { cache: "no-store" });
        if (!r.ok) throw new Error(String(r.status));
        const j = (await r.json()) as StatusResponse;
        if (alive) { setData(j); setError(false); }
      } catch {
        if (alive) setError(true);
      }
    };
    const id = setInterval(() => { load(); setTick((t) => t + 1); }, POLL_MS);
    return () => { alive = false; clearInterval(id); };
  }, []);

  const out = data.flights.filter((f) => f.from === "HUKJ");
  const back = data.flights.filter((f) => f.to === "HUKJ");
  const updated = new Date(data.generatedAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Kampala" });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
        <p className="flex items-center gap-2">
          <RefreshCw className={cn("h-3.5 w-3.5", tick % 2 ? "rotate-180" : "", "transition-transform duration-700")} aria-hidden />
          Updated {updated} · refreshes every minute
          {error && <span className="text-energy-700"> · last refresh failed, showing previous data</span>}
        </p>
        {data.simulated && (
          <p className="rounded-full border border-opportunity-700/30 bg-opportunity/10 px-3 py-1 font-semibold text-opportunity-700">
            Simulated feed — replaying the timetable until live tracking is connected
          </p>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {[["Out of Kajjansi", out], ["Back to Kajjansi", back]].map(([title, rows]) => (
          <section key={title as string} aria-label={title as string}>
            <h2 className="kicker">{title as string}</h2>
            <ol className="mt-4 divide-y divide-aviation/10 overflow-hidden rounded-2xl border border-aviation/10 bg-warm">
              {(rows as FlightStatus[]).map((f) => <Row key={f.flightNo} f={f} />)}
              {(rows as FlightStatus[]).length === 0 && (
                <li className="px-5 py-6 text-sm text-muted">No scheduled flights today.</li>
              )}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}

function Row({ f }: { f: FlightStatus }) {
  const city = AIRPORTS[f.from === "HUKJ" ? f.to : f.from]?.label ?? (f.from === "HUKJ" ? f.to : f.from);
  const done = f.state === "arrived";
  const live = f.state === "departed";
  const bar =
    done ? "bg-growth" : live ? "bg-opportunity" : f.state === "delayed" ? "bg-energy" : "bg-aviation/[0.12]";
  const pct = Math.round((done ? 1 : live ? f.progress : 0) * 100);
  return (
    <li className="relative px-5 pb-4 pt-3.5 tnum" data-state={f.state}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <span className="flight-code w-14 shrink-0 text-sm font-semibold text-aviation">{f.flightNo}</span>
          <span className="min-w-0">
            <span className="block text-sm font-medium text-ink">{city}</span>
            <span className="block truncate text-xs text-muted">{f.note ?? LABEL[f.state]}{f.reg ? ` · ${f.reg}` : ""}</span>
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-5 text-sm">
          <Time label="Dep" sched={f.std} actual={f.atd} />
          <Time label="Arr" sched={f.sta} actual={f.ata} />
          <span
            className={cn(
              "hidden rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide sm:inline-block",
              done && "bg-growth/10 text-growth",
              live && "bg-opportunity/15 text-opportunity-700",
              f.state === "delayed" && "bg-energy/10 text-energy-700",
              f.state === "boarding" && "bg-aviation/[0.06] text-aviation",
              (f.state === "scheduled" || f.state === "unknown") && "bg-aviation/[0.04] text-muted"
            )}
          >
            {LABEL[f.state]}
          </span>
        </div>
      </div>
      {/* Progress line */}
      <div className="relative mt-3 h-1 overflow-visible rounded-full bg-aviation/[0.08]" aria-hidden>
        <div className={cn("h-full rounded-full transition-[width] duration-1000 ease-out", bar)} style={{ width: `${pct}%` }} />
        {live && (
          <Plane
            className="absolute -top-[7px] h-[15px] w-[15px] -translate-x-1/2 text-opportunity-700 transition-[left] duration-1000 ease-out"
            style={{ left: `${pct}%` }}
          />
        )}
      </div>
      <span className="sr-only">{LABEL[f.state]}{live ? `, ${pct}% of the way` : ""}</span>
    </li>
  );
}

function Time({ label, sched, actual }: { label: string; sched: string; actual: string | null }) {
  return (
    <span className="text-right">
      <span className="block text-[0.62rem] uppercase tracking-wide text-muted">{label}</span>
      {actual ? (
        <span className="block">
          <span className="font-semibold text-ink">{actual}</span>
          {actual !== sched && <span className="ml-1 text-xs text-muted line-through">{sched}</span>}
        </span>
      ) : (
        <span className="block font-semibold text-ink">{sched}</span>
      )}
    </span>
  );
}
