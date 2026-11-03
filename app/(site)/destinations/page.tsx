import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { GUIDES } from "@/lib/content";
import { photoFor } from "@/lib/photos";

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
        subtitle="Ten airports across Uganda — the north, West Nile, Karamoja, the Albertine, the parks and Entebbe, all served from Kajjansi."
        crumbs={[{ label: "Home", href: "/" }, { label: "Destinations" }]}
      />
      <section className="bg-cream py-16">
        <div className="container-site grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((g) => {
            const photo = photoFor(g.code, `${g.city}, ${g.region}`);
            return (
            <Link
              key={g.code}
              href={`/destinations/${g.city.toLowerCase().split(" ")[0]}`}
              className="group overflow-hidden rounded-2xl border border-aviation/10 bg-white"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-aviation-900/60 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 flight-code rounded bg-aviation/90 px-2 py-1 text-xs font-semibold text-cream">
                  {g.code}
                </span>
                {photo.aerial && (
                  <span className="absolute right-4 top-4 rounded-full bg-opportunity px-2.5 py-1 font-display text-[0.62rem] font-bold uppercase tracking-wide2 text-aviation">
                    Aerial
                  </span>
                )}
              </div>
              <div className="p-5">
                <span className="text-xs uppercase tracking-wide text-opportunity-700">{g.region}</span>
                <h2 className="mt-1 font-display text-xl text-ink">{g.city}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-muted">{g.intro}</p>
              </div>
            </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
