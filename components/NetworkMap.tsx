"use client";
/**
 * The network map. Africa → zoom to Uganda → routes grow out of Kajjansi,
 * each taking as long to draw as the sector takes to fly (block time × a
 * constant), and land on their strip. Click a strip or a route for its
 * details and schedule. Real geography throughout: Natural Earth countries,
 * lakes and the Nile, projected with d3-geo and re-drawn each frame while the
 * camera moves.
 *
 * The side panel is a plain list of routes as well as the detail view, so the
 * whole thing is keyboard- and screen-reader-usable without touching the SVG.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { geoMercator, geoPath, type GeoProjection } from "d3-geo";
import { interpolateNumber } from "d3-interpolate";
import { easeCubicInOut, easeCubicOut } from "d3-ease";
import { ArrowRight, Clock, CalendarDays, Plane } from "lucide-react";
import type { FeatureCollection, Feature } from "geojson";
import { ROUTES, type Route } from "@/lib/data";
import { SCHEDULE } from "@/lib/content";
import { AIRPORTS, blockMinutes } from "@/lib/geo";
import { cn } from "@/lib/utils";

type Geo = { africa: FeatureCollection; uganda: Feature; neighbours: FeatureCollection; lakes: FeatureCollection; rivers: FeatureCollection };
type Framing = { scale: number; centre: [number, number] };

const W = 1000, H = 1000;
const HUB = "HUKJ";
/** ms of animation per minute of block time: Hoima 45m → 0.8s, Kidepo 1h40 → 1.75s. */
const MS_PER_MIN = 17.5;
const STAGGER = 140;

function fit(f: Feature | FeatureCollection, pad: number): Framing {
  const p = geoMercator().fitExtent([[pad, pad], [W - pad, H - pad]], f as never);
  const c = p.invert!([W / 2, H / 2]) as [number, number];
  return { scale: p.scale(), centre: c };
}

/** Screen-space arc from a to b, bowed to one side in proportion to its length. */
function arc(a: [number, number], b: [number, number]) {
  const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const off = Math.min(60, len * 0.22);
  return `M ${a[0]} ${a[1]} Q ${mx - (dy / len) * off} ${my + (dx / len) * off} ${b[0]} ${b[1]}`;
}

export function NetworkMap({
  intro = true,
  className,
  heading,
}: {
  /** Play the Africa → Uganda zoom first. Off for the routes page, which lands on Uganda. */
  intro?: boolean;
  className?: string;
  heading?: React.ReactNode;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [landed, setLanded] = useState<Set<string>>(new Set());
  const [phase, setPhase] = useState<"idle" | "zoom" | "routes" | "done">("idle");

  useEffect(() => {
    let live = true;
    Promise.all(["africa", "uganda", "neighbours", "lakes", "rivers"].map((n) => fetch(`/geo/${n}.json`).then((r) => r.json())))
      .then(([africa, uganda, neighbours, lakes, rivers]) => live && setGeo({ africa, uganda, neighbours, lakes, rivers }));
    return () => { live = false; };
  }, []);

  const routes = useMemo(() => ROUTES.filter((r) => r.from === HUB), []);

  // ---- draw --------------------------------------------------------------
  useEffect(() => {
    if (!geo || !svgRef.current) return;
    const svg = svgRef.current;
    const proj = geoMercator();
    const path = geoPath(proj);
    const q = <T extends Element>(s: string) => svg.querySelector<T>(s)!;
    const gLand = q<SVGGElement>("#land"), gNb = q<SVGGElement>("#neighbours"), pUg = q<SVGPathElement>("#uganda"),
      gLakes = q<SVGGElement>("#lakes"), gRivers = q<SVGGElement>("#rivers"), gRoutes = q<SVGGElement>("#routes"),
      gNodes = q<SVGGElement>("#nodes"), gHub = q<SVGGElement>("#hub"), gLabels = q<SVGGElement>("#labels"), gCountries = q<SVGGElement>("#country-labels");

    const mk = <T extends SVGElement = SVGElement>(parent: Element, tag: string, attrs: Record<string, string> = {}): T => {
      const el = document.createElementNS("http://www.w3.org/2000/svg", tag) as T;
      for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
      parent.appendChild(el);
      return el;
    };
    for (const g of [gLand, gNb, gLakes, gRivers, gRoutes, gNodes, gLabels, gCountries]) g.innerHTML = "";

    const landEls = geo.africa.features.map((f) => ({ el: mk(gLand, "path"), f }));
    const nbEls = geo.neighbours.features.map((f) => ({ el: mk(gNb, "path"), f }));
    const lakeEls = geo.lakes.features.map((f) => ({ el: mk(gLakes, "path"), f }));
    const riverEls = geo.rivers.features.map((f) => ({ el: mk(gRivers, "path"), f }));

    const routeEls = routes.map((r) => {
      const g = mk(gRoutes, "g", { "data-code": r.to, class: r.status === "planned" ? "route route--planned" : "route" });
      const shadow = mk<SVGPathElement>(g, "path", { class: "route-shadow", fill: "none" });
      const line = mk<SVGPathElement>(g, "path", { class: "route-line", fill: "none" });
      const plane = mk<SVGCircleElement>(g, "circle", { class: "route-plane", r: "4.5" });
      return { r, g, shadow, line, plane };
    });
    const nodeEls = routes.map((r) => {
      const g = mk(gNodes, "g", { "data-code": r.to, class: r.status === "planned" ? "node node--planned" : "node", "aria-hidden": "true" });
      mk(g, "circle", { class: "node-ring", r: "11", fill: "none" });
      mk(g, "circle", { class: "node-dot", r: "5" });
      const t = mk(gLabels, "text", { class: "map-label", "data-code": r.to, "text-anchor": "middle" });
      t.textContent = AIRPORTS[r.to].label;
      return { r, g, label: t };
    });
    const countryLabels = [
      ["KENYA", [36.0, 1.3]], ["SOUTH SUDAN", [31.2, 4.65]], ["TANZANIA", [32.6, -2.35]], ["DR CONGO", [28.55, 1.6]], ["RWANDA", [29.85, -1.95]],
    ].map(([n, ll]) => { const t = mk(gCountries, "text", { class: "map-country", "text-anchor": "middle" }); t.textContent = n as string; return { t, ll: ll as [number, number] }; });

    const fA = fit(geo.africa, 70);
    const fU = fit(geo.uganda, 130);

    // Label placement: below the node for the strips that collide otherwise.
    const BELOW = new Set(["HUGG", "HUKI"]);

    function render(x: number) {
      const k = Math.max(0, Math.min(1, x));
      const s = Math.exp(interpolateNumber(Math.log(fA.scale), Math.log(fU.scale))(k));
      const lon = interpolateNumber(fA.centre[0], fU.centre[0])(k), lat = interpolateNumber(fA.centre[1], fU.centre[1])(k);
      proj.scale(s).center([lon, lat]).translate([W / 2, H / 2]);
      const zoom = s / fA.scale;

      for (const { el, f } of landEls) el.setAttribute("d", path(f as never) ?? "");
      for (const { el, f } of nbEls) el.setAttribute("d", path(f as never) ?? "");
      pUg.setAttribute("d", path(geo!.uganda as never) ?? "");
      for (const { el, f } of lakeEls) el.setAttribute("d", path(f as never) ?? "");
      for (const { el, f } of riverEls) el.setAttribute("d", path(f as never) ?? "");

      gLand.style.strokeWidth = `${Math.max(0.3, 1.1 / Math.sqrt(zoom))}`;
      gLand.style.opacity = `${1 - k * 0.55}`;
      gNb.style.opacity = `${k < 0.55 ? 0 : (k - 0.55) / 0.45}`;
      pUg.style.opacity = `${k < 0.35 ? 0 : Math.min(1, (k - 0.35) / 0.4)}`;
      pUg.style.strokeWidth = `${Math.max(0.8, 2.4 / Math.sqrt(zoom))}`;
      const detail = k < 0.75 ? 0 : (k - 0.75) / 0.25;
      gLakes.style.opacity = `${detail}`;
      gRivers.style.opacity = `${detail * 0.8}`;
      gCountries.style.opacity = `${k < 0.9 ? 0 : (k - 0.9) / 0.1}`;

      const hub = proj(AIRPORTS[HUB].lonlat)!;
      gHub.setAttribute("transform", `translate(${hub[0]},${hub[1]})`);
      gHub.style.opacity = `${k < 0.5 ? 0 : Math.min(1, (k - 0.5) / 0.3)}`;

      for (const { r, shadow, line } of routeEls) {
        const d = arc(hub as [number, number], proj(AIRPORTS[r.to].lonlat) as [number, number]);
        shadow.setAttribute("d", d); line.setAttribute("d", d);
      }
      for (const { r, g, label } of nodeEls) {
        const p = proj(AIRPORTS[r.to].lonlat)!;
        g.setAttribute("transform", `translate(${p[0]},${p[1]})`);
        label.setAttribute("x", `${p[0]}`);
        label.setAttribute("y", `${BELOW.has(r.to) ? p[1] + 26 : p[1] - 16}`);
      }
      for (const { t, ll } of countryLabels) { const p = proj(ll)!; t.setAttribute("x", `${p[0]}`); t.setAttribute("y", `${p[1]}`); }
    }

    // ---- route growth ------------------------------------------------------
    let rafs: number[] = [];
    function growRoutes(onDone: () => void) {
      const order = [...routeEls].sort((a, b) => blockMinutes(a.r.blockTime) - blockMinutes(b.r.blockTime));
      let finished = 0;
      order.forEach(({ r, line, shadow, plane }, i) => {
        const L = line.getTotalLength();
        for (const el of [line, shadow]) { el.style.strokeDasharray = `${L}`; el.style.strokeDashoffset = `${L}`; }
        line.parentElement!.classList.add("is-growing");
        const dur = blockMinutes(r.blockTime) * MS_PER_MIN;
        const t0 = performance.now() + i * STAGGER;
        const step = (now: number) => {
          const k = Math.min(1, Math.max(0, (now - t0) / dur));
          const e = easeCubicOut(k);
          for (const el of [line, shadow]) el.style.strokeDashoffset = `${L * (1 - e)}`;
          const p = line.getPointAtLength(L * e);
          plane.setAttribute("cx", `${p.x}`); plane.setAttribute("cy", `${p.y}`);
          plane.style.opacity = k > 0 && k < 1 ? "1" : "0";
          if (k < 1) rafs.push(requestAnimationFrame(step));
          else {
            line.parentElement!.classList.remove("is-growing");
            line.parentElement!.classList.add("is-landed");
            const n = nodeEls.find((n) => n.r.to === r.to);
            if (n) { n.g.style.opacity = "1"; n.label.style.opacity = "1"; }
            setLanded((prev) => new Set(prev).add(r.to));
            if (++finished === order.length) onDone();
          }
        };
        rafs.push(requestAnimationFrame(step));
      });
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const landAll = () => {
      for (const { line, shadow } of routeEls) { line.style.strokeDasharray = ""; line.style.strokeDashoffset = ""; shadow.style.strokeDasharray = ""; shadow.style.strokeDashoffset = ""; line.parentElement!.classList.add("is-landed"); }
      for (const n of nodeEls) { n.g.style.opacity = "1"; n.label.style.opacity = "1"; }
      setLanded(new Set(routes.map((r) => r.to)));
      setPhase("done");
    };

    if (reduced) { render(1); landAll(); return; }

    let io: IntersectionObserver | null = null;
    const play = () => {
      const segs = intro
        ? [{ from: 0, to: 0, dur: 900 }, { from: 0, to: 1, dur: 2400 }, { from: 1, to: 1, dur: 350 }]
        : [{ from: 0.86, to: 1, dur: 1100 }, { from: 1, to: 1, dur: 250 }];
      let seg = 0, start = performance.now();
      setPhase("zoom");
      const tick = (now: number) => {
        const s = segs[seg];
        const k = Math.min(1, (now - start) / s.dur);
        render(s.from + (s.to - s.from) * easeCubicInOut(k));
        if (k >= 1) {
          seg++; start = now;
          if (seg >= segs.length) { setPhase("routes"); growRoutes(() => setPhase("done")); return; }
        }
        rafs.push(requestAnimationFrame(tick));
      };
      rafs.push(requestAnimationFrame(tick));
    };

    render(intro ? 0 : 0.86);
    io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io?.disconnect(); play(); } }, { threshold: 0.4 });
    io.observe(svg);

    return () => { rafs.forEach(cancelAnimationFrame); io?.disconnect(); };
  }, [geo, routes, intro]);

  // ---- interaction (delegated, so re-renders never rebuild listeners) -------
  const onSvgClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const el = (e.target as Element).closest<SVGGElement>("[data-code]");
    if (el) setSelected((s) => (s === el.dataset.code ? null : el.dataset.code!));
  }, []);
  const onSvgMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const el = (e.target as Element).closest<SVGGElement>("[data-code]");
    setHover(el?.dataset.code ?? null);
  }, []);

  const active = selected ?? hover;
  const sel = routes.find((r) => r.to === selected) ?? null;
  const flights = sel ? SCHEDULE.filter((f) => (f.from === sel.from && f.to === sel.to) || (f.from === sel.to && f.to === sel.from)) : [];

  return (
    <div className={className}>
      {heading}
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
      {/* Map */}
      <div
        className="network-map relative overflow-hidden rounded-3xl bg-aviation text-cream ring-1 ring-white/10"
        data-active={active ?? ""}
        data-phase={phase}
      >
        {/* The contour backdrop */}
        <div aria-hidden className="pointer-events-none absolute inset-0 text-cream opacity-[0.07]">
          <object data="/contours.svg" type="image/svg+xml" className="h-full w-full" aria-hidden tabIndex={-1} />
        </div>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="relative h-auto w-full cursor-default"
          role="img"
          aria-label="Animated map: Africa, then Uganda, then Fly Uganda's scheduled routes growing out of Kajjansi to each destination"
          onClick={onSvgClick}
          onMouseMove={onSvgMove}
          onMouseLeave={() => setHover(null)}
        >
          <g id="land" fill="rgba(246,233,219,0.06)" stroke="rgba(246,233,219,0.5)" strokeLinejoin="round" />
          <g id="neighbours" fill="rgba(246,233,219,0.05)" stroke="rgba(246,233,219,0.35)" strokeWidth="0.8" strokeLinejoin="round" style={{ opacity: 0 }} />
          <path id="uganda" fill="rgba(0,90,48,0.22)" stroke="#FCBA00" strokeLinejoin="round" style={{ opacity: 0 }} />
          <g id="lakes" fill="rgba(0,124,186,0.42)" stroke="rgba(95,185,232,0.55)" strokeWidth="0.7" style={{ opacity: 0 }} />
          <g id="rivers" fill="none" stroke="rgba(95,185,232,0.7)" strokeWidth="1.3" strokeLinecap="round" style={{ opacity: 0 }} />
          <g id="country-labels" style={{ opacity: 0 }} />
          <g id="routes" />
          <g id="hub" style={{ opacity: 0 }}>
            <circle r="18" fill="none" stroke="#FCBA00" strokeOpacity="0.45" />
            <circle r="7" fill="#FCBA00" />
            <text x="0" y="-26" textAnchor="middle" className="map-label map-label-hub">Kajjansi</text>
          </g>
          <g id="nodes" />
          <g id="labels" />
        </svg>
        <span className="absolute bottom-3 right-4 font-display text-[0.62rem] font-semibold uppercase tracking-wide2 text-cream/50">
          {phase === "done" ? "Scheduled network · select a destination" : "Scheduled network · ex-Kajjansi"}
        </span>
      </div>

      {/* Panel: route list and detail — pinned to the map's height on desktop */}
      <div className="relative min-w-0 lg:min-h-0">
        <div className="flex flex-col lg:absolute lg:inset-0">
        {sel ? (
          <div className="flex-1 overflow-y-auto rounded-2xl border border-aviation/10 bg-warm p-6 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="flight-code text-xs font-semibold text-opportunity-700">{sel.from} → {sel.to}</span>
                <h3 className="mt-1 font-display text-2xl font-bold text-ink">Kajjansi — {sel.city}</h3>
                <p className="mt-0.5 text-sm text-muted">{sel.park}</p>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="rounded-full border border-aviation/15 px-3 py-1 text-xs text-muted hover:text-ink" aria-label="Back to all routes">
                All routes
              </button>
            </div>
            <dl className="mt-5 grid grid-cols-3 gap-3 text-sm">
              {[[Clock, "Block time", sel.blockTime], [CalendarDays, sel.status === "planned" ? "Status" : "Frequency", sel.frequency], [Plane, "Aircraft", Array.from(new Set(SCHEDULE.filter((f) => f.to === sel.to).map((f) => f.aircraft))).join(" / ") || (sel.to === "HUKF" ? "1900D (planned)" : "Caravan (planned)")]].map(([I, k, v]) => {
                const Icon = I as typeof Clock;
                return (
                  <div key={k as string} className="rounded-xl bg-cream p-3">
                    <Icon className="h-4 w-4 text-opportunity-700" aria-hidden />
                    <dt className="mt-1.5 text-[0.65rem] uppercase tracking-wide text-muted">{k as string}</dt>
                    <dd className="font-display text-sm font-semibold text-ink">{v as string}</dd>
                  </div>
                );
              })}
            </dl>
            <h4 className="mt-6 font-display text-xs font-semibold uppercase tracking-wide2 text-opportunity-700">Schedule</h4>
            {flights.length ? (
              <table className="tnum mt-2 w-full text-left text-sm">
                <tbody className="divide-y divide-aviation/10">
                  {flights.map((f) => (
                    <tr key={f.flightNo}>
                      <td className="flight-code py-2 pr-3 font-semibold text-aviation">{f.flightNo}</td>
                      <td className="py-2 pr-3 text-muted">{f.from} → {f.to}</td>
                      <td className="py-2 pr-3">{f.dep}–{f.arr}</td>
                      <td className="py-2 text-right text-muted">{f.days}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="mt-2 text-sm text-muted">Coming soon — not yet on the timetable. Start date will be announced here first.</p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              {sel.status === "live" && <Link href="/book" className="btn-primary">Book {sel.to} <ArrowRight className="h-4 w-4" aria-hidden /></Link>}
              <Link href={`/routes/${sel.to.toLowerCase()}`} className="btn-ghost">Route details</Link>
            </div>
          </div>
        ) : (
          <ul className="flex flex-1 flex-col divide-y divide-aviation/10 overflow-hidden rounded-2xl border border-aviation/10 bg-warm" aria-label="Scheduled routes">
            {routes.map((r) => (
              <li key={r.to} className="flex flex-1">
                <button
                  type="button"
                  onClick={() => setSelected(r.to)}
                  onMouseEnter={() => setHover(r.to)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(r.to)}
                  onBlur={() => setHover(null)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors",
                    hover === r.to ? "bg-cream" : "hover:bg-cream/60"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className={cn(
                        "h-2 w-2 shrink-0 rounded-full transition-colors",
                        landed.has(r.to) || phase === "done" ? "bg-opportunity" : "bg-aviation/[0.2]"
                      )}
                    />
                    <span>
                    <span className="flight-code block text-sm font-semibold text-aviation">{r.from} → {r.to}</span>
                    <span className="text-xs text-muted">{r.city} · {r.park}</span>
                    </span>
                  </span>
                  <span className="text-right text-xs text-muted">
                    <span className={cn("block font-semibold", r.status === "planned" ? "text-opportunity-700" : "text-ink")}>{r.frequency}</span>
                    <span>{r.blockTime}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
        </div>
      </div>
      </div>
    </div>
  );
}
