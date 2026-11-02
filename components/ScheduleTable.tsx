"use client";

import { useState } from "react";
import { SCHEDULE } from "@/lib/content";
import { ROUTES } from "@/lib/data";
import { cn } from "@/lib/utils";

const FILTERS = [
  { key: "all", label: "All routes" },
  ...ROUTES.map((r) => ({ key: r.to, label: `Kajjansi — ${r.city}` })),
];

export function ScheduleTable() {
  const [filter, setFilter] = useState("all");

  const rows = SCHEDULE.filter(
    (f) => filter === "all" || f.to === filter || f.from === filter
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            aria-pressed={filter === f.key}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              filter === f.key
                ? "border-nile bg-nile text-paper"
                : "border-nile/20 text-nile hover:bg-nile/[0.05]"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-nile/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-nile/[0.04] text-xs uppercase tracking-wide text-slatey">
            <tr>
              <th className="px-4 py-3 font-semibold">Flight</th>
              <th className="px-4 py-3 font-semibold">From</th>
              <th className="px-4 py-3 font-semibold">To</th>
              <th className="px-4 py-3 font-semibold">Depart</th>
              <th className="px-4 py-3 font-semibold">Arrive</th>
              <th className="px-4 py-3 font-semibold">Days</th>
              <th className="hidden px-4 py-3 font-semibold sm:table-cell">Aircraft</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-nile/10">
            {rows.map((f) => (
              <tr key={f.flightNo} className="hover:bg-nile/[0.02]">
                <td className="flight-code px-4 py-3 font-semibold text-nile">{f.flightNo}</td>
                <td className="px-4 py-3">{f.from}</td>
                <td className="px-4 py-3">{f.to}</td>
                <td className="px-4 py-3">{f.dep}</td>
                <td className="px-4 py-3">{f.arr}</td>
                <td className="px-4 py-3">{f.days}</td>
                <td className="hidden px-4 py-3 text-slatey sm:table-cell">{f.aircraft}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
