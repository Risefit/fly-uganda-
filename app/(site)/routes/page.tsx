import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { RouteMapFull } from "@/components/RouteMapFull";
import { Kicker } from "@/components/brand";
import { ROUTES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Routes & network",
  description:
    "Fly Uganda's scheduled network from Kajjansi — daily seats to Bwindi, Queen Elizabeth, Murchison Falls, the Rwenzori and Kidepo.",
};

export default function RoutesPage() {
  return (
    <>
      <PageHero
        kicker="Where we fly"
        title="Nine destinations, one morning departure bank"
        subtitle="The west, the Albertine, West Nile, the north and Karamoja — served from Kajjansi, most of them before mid-morning."
        crumbs={[{ label: "Home", href: "/" }, { label: "Routes & network" }]}
      />

      <section className="bg-cream py-16">
        <div className="container-site">
          <RouteMapFull />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-site">
          <Kicker>Route detail</Kicker>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink">The scheduled network</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {ROUTES.map((r) => (
              <Link
                key={r.to}
                href={`/routes/${r.to.toLowerCase()}`}
                className="group flex items-center justify-between rounded-2xl border border-aviation/10 bg-cream p-6 transition-colors hover:border-aviation/30"
              >
                <div>
                  <span className="flight-code text-sm font-semibold text-aviation">{r.from} → {r.to}</span>
                  <h3 className="mt-1 font-display text-xl text-ink">Kajjansi — {r.city}</h3>
                  <p className="mt-0.5 text-xs text-opportunity-700">{r.park}</p>
                  <p className="mt-1 text-sm text-muted">
                    {r.frequency} · {r.blockTime} · {r.type}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-aviation transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-6 rounded-2xl bg-graphite p-7 text-cream">
            <div>
              <p className="text-xs uppercase tracking-wide text-opportunity-300">Published fares</p>
              <p className="font-display text-2xl font-semibold">Shown at booking</p>
              <p className="text-xs text-cream/60">per person, per sector, including taxes</p>
            </div>
            <div className="ml-auto flex items-center">
              <Link href="/book" className="inline-flex items-center gap-2 rounded-md bg-opportunity px-5 py-3 text-sm font-semibold text-aviation-900 hover:bg-opportunity-300">
                Book a flight <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
