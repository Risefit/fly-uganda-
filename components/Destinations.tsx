import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DESTINATION_TILES } from "@/lib/data";
import { photoFor } from "@/lib/photos";
import { Kicker } from "@/components/brand";

export function Destinations() {
  return (
    <section className="bg-cream pb-20 sm:pb-28" aria-labelledby="dest-heading">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <Kicker>Where we fly</Kicker>
            <h2 id="dest-heading" className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
              Every park, on the daily schedule
            </h2>
          </div>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide2 text-opportunity-700 hover:text-opportunity"
          >
            All destinations
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DESTINATION_TILES.map((d) => (
            <Link
              key={d.code}
              href={`/destinations/${d.city.toLowerCase()}`}
              className="group relative block aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <Image
                src={photoFor(d.code, `${d.city} — ${d.tag}`).src}
                alt={photoFor(d.code, `${d.city} — ${d.tag}`).alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-aviation-900/85 via-aviation-900/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
                <span className="flight-code text-xs font-semibold text-opportunity-300">{d.code}</span>
                <h3 className="mt-1 font-display text-xl font-semibold">{d.city}</h3>
                <p className="mt-1 max-h-0 overflow-hidden text-sm text-cream/85 opacity-0 transition-all duration-300 group-hover:max-h-20 group-hover:opacity-100">
                  {d.blurb}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
