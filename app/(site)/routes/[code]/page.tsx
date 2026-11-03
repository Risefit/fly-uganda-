import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, CalendarDays, Plane, Globe2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ROUTES, FARES } from "@/lib/data";
import { SCHEDULE, GUIDES, routeByCode } from "@/lib/content";

export function generateStaticParams() {
  return ROUTES.map((r) => ({ code: r.to.toLowerCase() }));
}

export function generateMetadata({ params }: { params: { code: string } }): Metadata {
  const r = routeByCode(params.code);
  if (!r) return { title: "Route" };
  return {
    title: `Kajjansi to ${r.city} (${r.from}–${r.to})`,
    description: `Scheduled flights from Kajjansi to ${r.city} for ${r.park} — ${r.frequency}, ${r.blockTime} block time, operated by Fly Uganda.`,
  };
}

export default function RouteDetailPage({ params }: { params: { code: string } }) {
  const r = routeByCode(params.code);
  if (!r) notFound();

  const flights = SCHEDULE.filter(
    (f) => (f.from === r.from && f.to === r.to) || (f.from === r.to && f.to === r.from)
  );
  const hasGuide = GUIDES.some((g) => g.code === r.to);
  // Entebbe is an interline connection, not a park seat — no park fare applies.
  const isConnection = r.type === "Connection";
  const fare = FARES.parkOneWay;

  const facts = [
    { icon: Clock, label: "Block time", value: r.blockTime },
    { icon: CalendarDays, label: "Frequency", value: r.frequency },
    { icon: Plane, label: "Aircraft", value: "Grand Caravan" },
    { icon: Globe2, label: "Serving", value: r.park },
  ];

  return (
    <>
      <PageHero
        kicker={`${r.from} → ${r.to}`}
        title={`Kajjansi to ${r.city}`}
        subtitle={
          isConnection
            ? `${r.park} · ${r.frequency} · ${r.blockTime}.`
            : `${r.park} · ${r.frequency} · ${r.blockTime} · ${fare} per person, one way.`
        }
        crumbs={[{ label: "Home", href: "/" }, { label: "Routes", href: "/routes" }, { label: r.city }]}
      />

      <section className="bg-cream py-14">
        <div className="container-site">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="rounded-2xl border border-aviation/10 bg-white p-5">
                <f.icon className="h-5 w-5 text-aviation" aria-hidden />
                <p className="mt-3 text-xs uppercase tracking-wide text-muted">{f.label}</p>
                <p className="font-display text-lg text-ink">{f.value}</p>
              </div>
            ))}
          </div>

          {/* Illustrative timetable */}
          <h2 className="mt-12 font-display text-2xl font-semibold text-ink">Flights on this route</h2>
          {flights.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-aviation/20 bg-white px-6 py-10 text-center">
              <p className="text-ink">This sector runs on demand rather than to a published timetable.</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                Tell us your connecting flight and we will position around it.
              </p>
            </div>
          ) : (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-aviation/10 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-aviation/[0.04] text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Flight</th>
                  <th className="px-4 py-3 font-semibold">Route</th>
                  <th className="px-4 py-3 font-semibold">Depart</th>
                  <th className="px-4 py-3 font-semibold">Arrive</th>
                  <th className="px-4 py-3 font-semibold">Days</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-aviation/10">
                {flights.map((f) => (
                  <tr key={f.flightNo}>
                    <td className="flight-code px-4 py-3 font-semibold text-aviation">{f.flightNo}</td>
                    <td className="flight-code px-4 py-3">{f.from} → {f.to}</td>
                    <td className="px-4 py-3">{f.dep}</td>
                    <td className="px-4 py-3">{f.arr}</td>
                    <td className="px-4 py-3">{f.days}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
          <p className="mt-3 text-xs text-muted">
            Times are illustrative for this pre-launch website. Park airstrips are weather- and surface-dependent; confirm at booking.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/book" className="btn-primary">
              Book {r.from}–{r.to} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            {hasGuide && (
              <Link href={`/destinations/${r.city.toLowerCase().split(" ")[0]}`} className="btn-ghost">
                About {r.city.split(" ")[0]}
              </Link>
            )}
            <Link href="/routes" className="btn-ghost">All routes</Link>
          </div>
        </div>
      </section>
    </>
  );
}
