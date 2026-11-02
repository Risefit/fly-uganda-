import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Plane } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { PearlMark } from "@/components/brand";
import { GUIDES, guideByCity } from "@/lib/content";
import { ROUTES } from "@/lib/data";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ city: g.city.toLowerCase().split(" ")[0] }));
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const g = guideByCity(params.city);
  if (!g) return { title: "Destination" };
  return { title: `${g.city} travel guide`, description: g.intro };
}

export default function DestinationPage({ params }: { params: { city: string } }) {
  const g = guideByCity(params.city);
  if (!g) notFound();

  const route = ROUTES.find((r) => r.to === g.code);

  return (
    <>
      <PageHero
        kicker={`${g.code} · ${g.region}`}
        title={g.city}
        subtitle={g.intro}
        crumbs={[{ label: "Home", href: "/" }, { label: "Destinations", href: "/destinations" }, { label: g.city.split(" ")[0] }]}
      />

      <section className="bg-paper py-16">
        <div className="container-site grid gap-10 lg:grid-cols-[1.4fr_0.9fr]">
          <div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <Image src={g.image} alt={g.city} fill sizes="(max-width: 1024px) 100vw, 720px" className="object-cover" priority />
            </div>
            <h2 className="mt-8 font-serif text-2xl font-semibold text-ink">Highlights</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {g.highlights.map((h) => (
                <li key={h} className="rounded-2xl border border-nile/10 bg-white p-5">
                  <PearlMark className="h-4 w-4 text-gold" />
                  <p className="mt-2 text-sm font-medium text-ink">{h}</p>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-nile/10 bg-white p-6">
              <div className="flex items-center gap-2 text-nile">
                <MapPin className="h-4 w-4" aria-hidden />
                <span className="text-xs font-semibold uppercase tracking-wide">Airport</span>
              </div>
              <p className="mt-2 font-serif text-lg text-ink">{g.airport}</p>
            </div>

            {route && (
              <div className="rounded-2xl bg-nile p-6 text-paper">
                <div className="flex items-center gap-2 text-gold-300">
                  <Plane className="h-4 w-4" aria-hidden />
                  <span className="text-xs font-semibold uppercase tracking-wide">From Kajjansi</span>
                </div>
                <p className="flight-code mt-2 text-lg font-semibold">{route.from} → {route.to}</p>
                <p className="mt-1 text-sm text-paper/80">{route.frequency} · {route.blockTime}</p>
                <Link href="/book" className="mt-4 inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2.5 text-sm font-semibold text-nile-900 hover:bg-gold-300">
                  Book this route <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            )}

            <Link href="/destinations" className="block text-sm font-semibold text-nile hover:underline">
              ← All destinations
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
