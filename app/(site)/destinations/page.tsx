import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { GUIDES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Where Fly Uganda flies — Bwindi, Queen Elizabeth, Murchison Falls, the Rwenzori and Kidepo, from Kajjansi.",
};

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        kicker="Where we fly"
        title="Destinations"
        subtitle="Seven park strips, six national parks, and the Pearl of Africa in between."
        crumbs={[{ label: "Home", href: "/" }, { label: "Destinations" }]}
      />
      <section className="bg-paper py-16">
        <div className="container-site grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((g) => (
            <Link
              key={g.code}
              href={`/destinations/${g.city.toLowerCase().split(" ")[0]}`}
              className="group overflow-hidden rounded-2xl border border-nile/10 bg-white"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={g.image}
                  alt={`${g.city}, ${g.region}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 flight-code rounded bg-nile/90 px-2 py-1 text-xs font-semibold text-paper">
                  {g.code}
                </span>
              </div>
              <div className="p-5">
                <span className="text-xs uppercase tracking-wide text-gold-600">{g.region}</span>
                <h2 className="mt-1 font-serif text-xl text-ink">{g.city}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-slatey">{g.intro}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
