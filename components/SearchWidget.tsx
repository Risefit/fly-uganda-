"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeftRight, Search, Users } from "lucide-react";
import { HUB, DESTINATIONS } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * AeroCRS / Go7-ready search widget — the brand's signature midnight booking
 * panel (dark contrast on light pages). Swapped for the Go7 embed at launch.
 */
const ALL_AIRPORTS = [HUB, ...DESTINATIONS];

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [focused, setFocused] = useState(false);
  const reduce = useReducedMotion();
  return (
    <label
      className={cn("group relative flex min-w-0 flex-1 flex-col gap-1 px-4 py-3 text-left", className)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <span className="text-[0.62rem] font-medium uppercase tracking-wide2 text-warm/55">{label}</span>
      {children}
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-3 bottom-0 h-[2px] origin-left bg-opportunity transition-transform duration-200 ease-out",
          focused && !reduce ? "scale-x-100" : "scale-x-0"
        )}
      />
    </label>
  );
}

export function SearchWidget({ variant = "hero" }: { variant?: "hero" | "page" }) {
  const reduce = useReducedMotion();
  const [tripType, setTripType] = useState<"round" | "oneway">("round");
  const [origin, setOrigin] = useState("HUKJ");
  const [destination, setDestination] = useState("HUKH");

  const swap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  return (
    <form
      action="/book"
      style={{ colorScheme: "dark" }}
      className="w-full overflow-hidden rounded-2xl bg-aviation-900 text-warm shadow-widget ring-1 ring-opportunity/25"
      aria-label="Search flights"
    >
      <div className="flex items-center gap-1 border-b border-white/10 px-4 pt-3">
        {(["round", "oneway"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTripType(t)}
            aria-pressed={tripType === t}
            className={cn(
              "rounded-t-md px-3 py-2 text-xs font-medium uppercase tracking-wide2 transition-colors",
              tripType === t ? "text-opportunity-300" : "text-warm/60 hover:text-warm"
            )}
          >
            {t === "round" ? "Return" : "One way"}
            {tripType === t && <span className="mx-auto mt-1.5 block h-[2px] w-full bg-opportunity" />}
          </button>
        ))}
      </div>

      <div className="flex flex-col divide-y divide-white/10 lg:flex-row lg:divide-x lg:divide-y-0">
        <div className="relative flex min-w-0 flex-[2] items-stretch">
          <Field label="From" className="!pr-6">
            <select
              aria-label="Origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full min-w-0 appearance-none truncate bg-transparent text-base font-medium text-warm focus:outline-none"
            >
              {ALL_AIRPORTS.map((a) => (
                <option key={a.code} value={a.code}>{a.city} ({a.code})</option>
              ))}
            </select>
          </Field>

          <div className="relative flex w-0 shrink-0 items-center">
            <motion.button
              type="button"
              onClick={swap}
              whileTap={reduce ? undefined : { scale: 0.9 }}
              animate={reduce ? undefined : { rotate: origin === "HUKJ" ? 0 : 180 }}
              transition={{ type: "spring", stiffness: 380, damping: 18 }}
              aria-label="Swap origin and destination"
              className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-opportunity/40 bg-aviation-700 p-1.5 text-opportunity-300 hover:bg-aviation-500"
            >
              <ArrowLeftRight className="h-3.5 w-3.5" aria-hidden />
            </motion.button>
          </div>

          <Field label="To" className="!pl-11 border-l border-white/10">
            <select
              aria-label="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full min-w-0 appearance-none truncate bg-transparent text-base font-medium text-warm focus:outline-none"
            >
              {ALL_AIRPORTS.map((a) => (
                <option key={a.code} value={a.code}>{a.city} ({a.code})</option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Depart">
          <input type="date" aria-label="Departure date" className="bg-transparent text-base font-medium text-warm focus:outline-none" />
        </Field>

        {tripType === "round" && (
          <Field label="Return">
            <input type="date" aria-label="Return date" className="bg-transparent text-base font-medium text-warm focus:outline-none" />
          </Field>
        )}

        <Field label="Passengers">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-warm/50" aria-hidden />
            <select aria-label="Number of passengers" className="w-full min-w-0 appearance-none truncate bg-transparent text-base font-medium text-warm focus:outline-none" defaultValue="1">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? "adult" : "adults"}</option>
              ))}
            </select>
          </div>
        </Field>

        <div className="flex items-stretch p-2">
          <button type="submit" className="btn-primary w-full md:w-auto">
            <Search className="h-4 w-4" aria-hidden />
            <span>Search</span>
          </button>
        </div>
      </div>

      {variant === "page" && (
        <div className="flex flex-col gap-1.5 border-t border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:gap-3">
          <label className="text-[0.62rem] font-medium uppercase tracking-wide2 text-warm/55" htmlFor="ff-number">
            Pearl Club number <span className="normal-case text-warm/70">(optional — earn Pearls)</span>
          </label>
          <input
            id="ff-number"
            placeholder="PC-XXXXXX"
            className="flight-code w-full max-w-[180px] rounded-md border border-opportunity/25 bg-aviation-700 px-3 py-1.5 text-sm uppercase text-warm placeholder:text-warm/60 focus:border-opportunity focus:outline-none"
          />
        </div>
      )}

      <p className="px-4 pb-3 pt-2 text-[0.7rem] text-warm/55">
        Online booking is launching shortly with our reservation partner. Fares are shown per person,
        per sector, including taxes.
      </p>
    </form>
  );
}
