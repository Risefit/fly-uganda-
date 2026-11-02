"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Plane } from "lucide-react";
import { ROUTES, PLANNED_CITIES } from "@/lib/data";
import { Kicker } from "@/components/brand";
import { cn } from "@/lib/utils";

const NODES: Record<string, { x: number; y: number; label: string; below?: boolean }> = {
  HUKJ: { x: 320.8, y: 312.3, label: "Kajjansi" },
  EBB: { x: 313.2, y: 322.8, label: "Entebbe", below: true },
  KSE: { x: 152.8, y: 313.2, label: "Kasese" },
  HUMW: { x: 138.4, y: 338.7, label: "Mweya" },
  KHX: { x: 125.4, y: 375, label: "Kihihi" },
  KXO: { x: 126.7, y: 413.7, label: "Kisoro", below: true },
  PAF: { x: 248.6, y: 166.9, label: "Pakuba" },
  HUGG: { x: 253.5, y: 175.3, label: "Bugungu", below: true },
  HUKD: { x: 402.7, y: 71.2, label: "Kidepo" },
};

function arcPath(from: string, to: string) {
  const a = NODES[from];
  const b = NODES[to];
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  const off = Math.min(60, len * 0.28);
  const cx = mx - (dy / len) * off;
  const cy = my - (dx / len) * off * -1;
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
}

export function RouteMapPreview() {
  const [active, setActive] = useState<number | null>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const [plane, setPlane] = useState<{ x: number; y: number; a: number } | null>(null);
  const raf = useRef<number | null>(null);

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const animatePlane = useCallback(
    (i: number) => {
      const path = pathRefs.current[i];
      if (!path) return;
      const total = path.getTotalLength();
      if (reduce) {
        const p = path.getPointAtLength(total);
        setPlane({ x: p.x, y: p.y, a: 0 });
        return;
      }
      const start = performance.now();
      const dur = 900;
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        const p = path.getPointAtLength(total * t);
        const p2 = path.getPointAtLength(Math.min(total, total * t + 1));
        const a = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI;
        setPlane({ x: p.x, y: p.y, a });
        if (t < 1) raf.current = requestAnimationFrame(step);
      };
      raf.current = requestAnimationFrame(step);
    },
    [reduce]
  );

  const activate = useCallback(
    (i: number | null) => {
      if (raf.current) cancelAnimationFrame(raf.current);
      setActive(i);
      if (i === null) setPlane(null);
      else animatePlane(i);
    },
    [animatePlane]
  );

  useEffect(() => () => {
    if (raf.current) cancelAnimationFrame(raf.current);
  }, []);

  return (
    <section className="bg-paper py-20 sm:py-28" aria-labelledby="map-heading">
      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-2xl bg-warm p-2 ring-1 ring-gold/20">
              <svg viewBox="0 0 600 480" className="h-auto w-full" role="img" aria-label="Fly Uganda scheduled network from Kajjansi">
                <defs>
                  <linearGradient id="arc" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F0CF72" />
                    <stop offset="100%" stopColor="#D2A017" />
                  </linearGradient>
                </defs>

                <path
                  d="M200.7 55.3 L282.9 72.4 L351.4 66.9 L419.8 72.4 L486.9 73.8 L474.6 161.4 L433.5 243.6 L426.7 284.6 L413 318.9 L416.4 394.2 L351.4 394.2 L269.2 395.6 L200.7 394.2 L142.5 416.8 L118.6 418.2 L126.8 387.3 L122 325.7 L130.9 277.8 L159.6 243.6 L176.8 209.3 L200.7 168.2 L214.4 127.2 L204.1 86.1 Z"
                  fill="rgba(210,160,23,0.05)"
                  stroke="rgba(210,160,23,0.3)"
                  strokeWidth="1"
                />
                <g fill="rgba(23,81,69,0.08)" stroke="rgba(23,81,69,0.16)" strokeWidth="0.75">
                  <path d="M265.8 394.2 L416.4 394.2 L413 318.9 L378.7 297 L330.8 305.2 L282.9 332.6 L262.3 363.4 Z" />
                  <path d="M303.4 221.6 L344.5 209.3 L382.2 216.2 L371.9 238.1 L334.2 240.1 L310.3 235.3 Z" />
                  <path d="M176.8 250.4 L214.4 209.3 L241.8 169.6 L229.5 161.4 L193.9 199.1 L163.1 242.2 Z" />
                  <path d="M104.9 368.2 L139.1 354.5 L142.5 329.1 L119.9 331.2 L103.5 351.7 Z" />
                </g>
                <path
                  d="M365 297 L354.8 253.8 L344.5 223 L300 171.7 L261 169.6 L241.8 169.6 L228.1 134 L252.1 86.1"
                  fill="none"
                  stroke="rgba(23,81,69,0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="2 5"
                />

                {ROUTES.map((r, i) => (
                  <path
                    key={r.to}
                    ref={(el) => {
                      pathRefs.current[i] = el;
                    }}
                    d={arcPath(r.from, r.to)}
                    fill="none"
                    stroke={active === i ? "url(#arc)" : "rgba(15,29,25,0.2)"}
                    strokeWidth={active === i ? 2.5 : 1.5}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                ))}

                {Object.entries(NODES).map(([code, n]) => {
                  const isHub = code === "HUKJ";
                  const idx = ROUTES.findIndex((r) => r.to === code);
                  const isActive = idx === active;
                  return (
                    <g key={code} className="transition-transform duration-300">
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={isHub ? 6 : isActive ? 6 : 4}
                        fill={isHub || isActive ? "#D2A017" : "#0F1D19"}
                      />
                      {isHub && <circle cx={n.x} cy={n.y} r="11" fill="none" stroke="#D2A017" strokeWidth="1" opacity="0.5" />}
                      <text
                        x={n.x}
                        y={n.below ? n.y + 18 : n.y - (isActive ? 16 : 12)}
                        textAnchor="middle"
                        className="transition-all duration-300"
                        fontSize="12"
                        fontWeight={isHub || isActive ? 700 : 500}
                        fill={isActive ? "#7A590F" : "rgba(15,29,25,0.75)"}
                      >
                        {n.label}
                      </text>
                    </g>
                  );
                })}

                {plane && (
                  <g transform={`translate(${plane.x} ${plane.y}) rotate(${plane.a})`}>
                    <circle r="9" fill="#0F1D19" stroke="#D2A017" strokeWidth="1.5" />
                    <g transform="rotate(45) translate(-5 -5) scale(0.42)">
                      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="#FFFEFA" />
                    </g>
                  </g>
                )}
              </svg>

              <span className="absolute bottom-3 right-4 text-[0.65rem] uppercase tracking-widest text-ink/40">
                Scheduled network · ex-Kajjansi
              </span>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Kicker>The network</Kicker>
            <h2 id="map-heading" className="mt-4 font-serif text-3xl leading-tight tracking-wide text-ink sm:text-4xl">
              Eight strips, one morning departure bank
            </h2>
            <p className="mt-3 max-w-md text-slatey">
              Hover a route to trace the flight. Everything leaves Kajjansi in the morning and is
              back before lunch, so a park transfer costs you half a day instead of two.
            </p>

            <ul className="mt-7 divide-y divide-gold/15 border-y border-gold/15">
              {ROUTES.map((r, i) => (
                <li key={r.to}>
                  <button
                    type="button"
                    onMouseEnter={() => activate(i)}
                    onMouseLeave={() => activate(null)}
                    onFocus={() => activate(i)}
                    onBlur={() => activate(null)}
                    className={cn(
                      "flex w-full items-center justify-between gap-4 py-3.5 text-left transition-colors",
                      active === i ? "text-gold-600" : "text-ink hover:text-gold-600"
                    )}
                  >
                    <span className="flight-code text-sm font-semibold">
                      {r.from} <ArrowRight className="inline h-3.5 w-3.5" aria-hidden /> {r.to}
                    </span>
                    <span className="flex items-center gap-4 text-xs text-slatey">
                      <span className="hidden sm:inline">{r.frequency}</span>
                      <span>{r.blockTime}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-xs text-slatey">
              <Plane className="mb-0.5 mr-1 inline h-3.5 w-3.5" aria-hidden />
              With partners: {PLANNED_CITIES.slice(0, 4).join(" · ")} and more.
            </p>

            <Link href="/routes" className="btn-primary mt-6">
              Explore the network
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
