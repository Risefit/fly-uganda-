import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Rule, Webale } from "@/components/brand";

/**
 * Headline, one line of proof, and the amber call to action — the hero from
 * the identity toolkit's website panel. The quick-action bar that follows it
 * carries Book / Manage / Check-in / Flight status; the flight search itself
 * lives on /book.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[86vh] flex-col justify-center overflow-hidden">
      {/* Fly Uganda's own aerial — Karamoja ridges and a murram road. The
          placeholder illustrations are gone from the hero. NOTE: the supplied
          file is 996×711; it will soften on large screens. Replace with the
          full-resolution original at the same path when available. */}
      <Image
        src="/photos/hero.jpg"
        alt="Granite ridges and a red murram road winding through green valleys, from the air"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      {/* Scrim. Opacity modifiers outside Tailwind's scale compile to nothing —
          keep these in bracket notation. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-aviation-900/[0.88] via-aviation-900/[0.55] to-aviation-900/[0.15] lg:from-aviation-900/[0.80] lg:via-aviation-900/[0.35] lg:to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-aviation-900/[0.78] via-aviation-900/[0.28] to-transparent lg:block"
      />

      <div className="container-site pb-28 pt-36">
        <div className="max-w-2xl">
          <div className="mb-5 flex items-center gap-3">
            <Rule className="!h-5" />
            <Webale tone="dark" className="text-sm" />
            <span className="text-cream/50">·</span>
            <span className="font-display text-[0.72rem] font-semibold uppercase tracking-wide2 text-cream/80">
              Uganda&rsquo;s domestic airline
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold leading-[1.04] text-white sm:text-5xl lg:text-[3.9rem]">
            Fly across Uganda,
            <br />
            every day
          </h1>
          <p className="mt-5 max-w-xl text-lg text-cream/90 sm:text-xl">
            Scheduled flights from Kajjansi, Kampala to Kihihi, Kisoro, Kasese, Hoima, Bugungu,
            Arua, Gulu, Moroto, Kidepo and Entebbe. For work, for home and for the parks — ticketed like
            any airline, leaving from the Kampala side of Entebbe.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/book" className="btn-primary !px-7 !py-3.5">
              Book a flight <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/schedule" className="btn-ghost-dark">
              See the schedule
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
