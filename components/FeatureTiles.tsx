import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { photoFor } from "@/lib/photos";

/**
 * Four editorial tiles — Destinations, The Fly Uganda Experience, About us,
 * Sustainability — from the identity toolkit's website panel.
 * ⚠️ Tiles use the placeholder scene plates; swap for photography.
 */
const TILES = [
  { title: "Destinations", blurb: "Ten airports, from Kisoro to Moroto.", href: "/destinations", image: photoFor("KXO", "").src },
  { title: "The Fly Uganda experience", blurb: "What a morning on the Caravan is actually like.", href: "/travel-info", image: "/scenes/fleet.svg" },
  { title: "About us", blurb: "Thirty years at Kajjansi, one AOC.", href: "/about", image: "/scenes/about.svg" },
  { title: "Sustainability", blurb: "Lighter aircraft, shorter sectors, roads left alone.", href: "/sustainability", image: photoFor("HUKD", "").src },
];

export function FeatureTiles() {
  return (
    <section className="bg-cream pb-6 pt-16 sm:pt-20" aria-labelledby="tiles-heading">
      <div className="container-site">
        <h2 id="tiles-heading" className="sr-only">Explore Fly Uganda</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TILES.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group relative block aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-aviation/[0.06]"
            >
              <Image
                src={t.image}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-aviation-900/[0.92] via-aviation-900/[0.25] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
                <h3 className="font-display text-xl font-bold leading-tight text-white">{t.title}</h3>
                <p className="mt-1 text-sm text-cream/85">{t.blurb}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 font-display text-[0.72rem] font-semibold uppercase tracking-wide2 text-opportunity">
                  Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
