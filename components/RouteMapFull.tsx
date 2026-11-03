"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ROUTES, PLANNED_CITIES } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Self-contained interactive SVG route map (no external map dependency / token).
 * Upgrade path: swap for react-simple-maps or a Mapbox GL layer when a base map
 * and tokens are provisioned — the route data in lib/data.ts stays the source.
 */
const NODES: Record<string, { x: number; y: number; label: string; below?: boolean }> = {
  HUKJ: { x: 343.2, y: 354, label: "Kajjansi" },
  EBB: { x: 334.8, y: 365.7, label: "Entebbe", below: true },
  KSE: { x: 155.4, y: 355, label: "Kasese" },
  HUMW: { x: 139.3, y: 383.5, label: "Mweya" },
  KHX: { x: 124.7, y: 424.1, label: "Kihihi" },
  KXO: { x: 126.2, y: 467.4, label: "Kisoro", below: true },
  PAF: { x: 262.6, y: 191.3, label: "Pakuba" },
  HUGG: { x: 268, y: 200.7, label: "Bugungu", below: true },
  HUKD: { x: 434.9, y: 84.3, label: "Kidepo" },
};

// Regional links flown with partners — placed at the edge to show direction.
// Edge markers for partner links, placed to preserve real compass order:
// Nairobi is east of the Mara, which is east of and north of the Serengeti.
const PLANNED_NODES: Record<
  string,
  { x: number; y: number; anchor?: "start" | "middle" | "end" }
> = {
  Kigali: { x: 155, y: 512 },
  Serengeti: { x: 500, y: 516 },
  "Masai Mara": { x: 548, y: 482 },
  // Right up against the frame, so the label is right-aligned to avoid clipping.
  "Nairobi Wilson": { x: 614, y: 452, anchor: "end" },
};

function arcPath(ax: number, ay: number, bx: number, by: number) {
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  const off = Math.min(70, len * 0.26);
  const cx = mx - (dy / len) * off;
  const cy = my + (dx / len) * off;
  return `M ${ax} ${ay} Q ${cx} ${cy} ${bx} ${by}`;
}

export function RouteMapFull() {
  const [active, setActive] = useState<number | null>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const [plane, setPlane] = useState<{ x: number; y: number; a: number } | null>(null);
  const raf = useRef<number | null>(null);

  const animate = useCallback((i: number | null) => {
    if (raf.current) cancelAnimationFrame(raf.current);
    setActive(i);
    if (i === null) {
      setPlane(null);
      return;
    }
    const path = pathRefs.current[i];
    if (!path) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const total = path.getTotalLength();
    if (reduce) {
      const p = path.getPointAtLength(total);
      setPlane({ x: p.x, y: p.y, a: 0 });
      return;
    }
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / 950);
      const p = path.getPointAtLength(total * t);
      const p2 = path.getPointAtLength(Math.min(total, total * t + 1));
      const a = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI;
      setPlane({ x: p.x, y: p.y, a });
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => () => {
    if (raf.current) cancelAnimationFrame(raf.current);
  }, []);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="relative overflow-hidden rounded-2xl bg-aviation p-3 ring-1 ring-aviation/15">
        <svg viewBox="0 0 640 540" className="h-auto w-full" role="img" aria-label="Fly Uganda route map">
          <defs>
            <linearGradient id="arcFull" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFC861" />
              <stop offset="100%" stopColor="#FFA400" />
            </linearGradient>
          </defs>

          {/* Uganda — simplified national outline, projected from real coordinates */}
          <path
            d="M209 66.5 L300.9 85.6 L377.4 79.5 L454 85.6 L529.1 87.2 L515.3 185.2 L469.3 277.1 L461.7 323 L446.4 361.3 L450.2 445.5 L377.4 445.5 L285.5 447.1 L209 445.5 L143.9 470.8 L117.1 472.3 L126.3 437.9 L120.9 369 L130.9 315.4 L163 277.1 L182.2 238.8 L209 192.8 L224.3 146.9 L212.8 100.9 Z"
            fill="rgba(255,255,255,0.05)"
            stroke="rgba(255,164,0,0.28)"
            strokeWidth="1"
          />
          {/* The great lakes — Victoria, Kyoga, Albert, Edward */}
          <g fill="rgba(0,124,186,0.14)" stroke="rgba(0,124,186,0.22)" strokeWidth="0.75">
            <path d="M281.7 445.5 L450.2 445.5 L446.4 361.3 L408.1 336.8 L354.5 346 L300.9 376.6 L277.9 411.1 Z" />
            <path d="M323.8 252.6 L369.8 238.8 L411.9 246.4 L400.4 270.9 L358.3 273.2 L331.5 267.9 Z" />
            <path d="M182.2 284.7 L224.3 238.8 L254.9 194.4 L241.1 185.2 L201.3 227.3 L166.8 275.5 Z" />
            <path d="M101.8 416.4 L140 401.1 L143.9 372.8 L118.6 375.1 L100.2 398.1 Z" />
          </g>
          {/* The Nile — Jinja to Lake Albert and north */}
          <path
            d="M392.7 336.8 L381.3 288.6 L369.8 254.1 L320 196.7 L276.4 194.4 L254.9 194.4 L239.6 154.5 L266.4 100.9"
            fill="none"
            stroke="rgba(0,124,186,0.3)"
            strokeWidth="1.5"
            strokeDasharray="2 5"
          />

          {/* Planned (ghost) arcs */}
          {Object.values(PLANNED_NODES).map((n, i) => (
            <path
              key={`p${i}`}
              d={arcPath(NODES.HUKJ.x, NODES.HUKJ.y, n.x, n.y)}
              fill="none"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
          ))}

          {/* Live arcs */}
          {ROUTES.map((r, i) => (
            <path
              key={r.to}
              ref={(el) => {
                pathRefs.current[i] = el;
              }}
              d={arcPath(NODES[r.from].x, NODES[r.from].y, NODES[r.to].x, NODES[r.to].y)}
              fill="none"
              stroke={active === i ? "url(#arcFull)" : "rgba(255,255,255,0.3)"}
              strokeWidth={active === i ? 2.75 : 1.75}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          ))}

          {/* Planned nodes */}
          {Object.entries(PLANNED_NODES).map(([name, n]) => (
            <g key={name}>
              <circle cx={n.x} cy={n.y} r="3" fill="rgba(246,233,219,0.5)" />
              <text x={n.x} y={n.y - 8} textAnchor={n.anchor ?? "middle"} className="text-[17px] sm:text-[13px] lg:text-[10px]" fill="rgba(246,233,219,0.6)">
                {name}
              </text>
            </g>
          ))}

          {/* Live nodes */}
          {Object.entries(NODES).map(([code, n]) => {
            const isHub = code === "HUKJ";
            const idx = ROUTES.findIndex((r) => r.to === code);
            const isActive = idx === active;
            return (
              <g key={code}>
                <circle cx={n.x} cy={n.y} r={isHub ? 6.5 : isActive ? 6 : 4.5} fill={isHub || isActive ? "#FFA400" : "#F6E9DB"} />
                {isHub && <circle cx={n.x} cy={n.y} r="12" fill="none" stroke="#FFA400" strokeWidth="1" opacity="0.5" />}
                <text
                  x={n.x}
                  y={n.below ? n.y + 19 : n.y - (isHub || isActive ? 16 : 13)}
                  textAnchor="middle"
                  /* SVG user units: scale labels up on narrow screens, where the
                     map renders at roughly half size. */
                  className="text-[21px] sm:text-[16px] lg:text-[13px]"
                  fontWeight={isHub || isActive ? 700 : 500}
                  fill={isActive ? "#E6CB8A" : "rgba(246,233,219,0.9)"}
                >
                  {n.label}
                </text>
              </g>
            );
          })}

          {plane && (
            <g transform={`translate(${plane.x} ${plane.y}) rotate(${plane.a})`}>
              <circle r="9" fill="#0B1F3B" stroke="#FFA400" strokeWidth="1.5" />
              <g transform="rotate(45) translate(-5 -5) scale(0.42)">
                <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="#F6E9DB" />
              </g>
            </g>
          )}
        </svg>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-3 pb-2 pt-3 text-xs text-cream/80">
          <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-opportunity" /> Kajjansi hub</span>
          <span className="inline-flex items-center gap-2"><span className="h-0.5 w-5 bg-cream/60" /> Scheduled</span>
          <span className="inline-flex items-center gap-2"><span className="h-0.5 w-5 border-t border-dashed border-cream/50" /> Planned</span>
        </div>
      </div>

      {/* Route list */}
      <div>
        <ul className="divide-y divide-aviation/10 overflow-hidden rounded-2xl border border-aviation/10 bg-white">
          {ROUTES.map((r, i) => (
            <li key={r.to}>
              <button
                type="button"
                onMouseEnter={() => animate(i)}
                onMouseLeave={() => animate(null)}
                onFocus={() => animate(i)}
                onBlur={() => animate(null)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors",
                  active === i ? "bg-aviation/[0.05]" : "hover:bg-aviation/[0.03]"
                )}
              >
                <span>
                  <span className="flight-code block text-sm font-semibold text-aviation">
                    {r.from} → {r.to}
                  </span>
                  <span className="text-xs text-muted">{r.city}</span>
                </span>
                <span className="text-right text-xs text-muted">
                  <span className="block font-medium text-ink">{r.frequency}</span>
                  <span>{r.blockTime}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted">
          <span className="font-semibold text-aviation">Planned network:</span>{" "}
          {PLANNED_CITIES.join(", ")}. Flown with partner carriers or under development — no dates committed.
        </p>
      </div>
    </div>
  );
}
