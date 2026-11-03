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
      {/* ⚠️ PLACEHOLDER ART: /scenes/*.svg are brand-built illustrations, not
          photography. Swap for Fly Uganda / KEA imagery before launch. */}
      <Image
        src="/scenes/hero.svg"
        alt="A Grand Caravan over the Ugandan highlands at first light"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      {/* Scrim. Opacity modifiers outside Tailwind's scale compile to nothing —
          keep these in bracket notation. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-aviation-900/[0.95] via-aviation-900/[0.80] to-aviation-900/[0.45] lg:from-aviation-900/[0.90] lg:via-aviation-900/[0.55] lg:to-aviation-900/[0.20]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-aviation-900/[0.80] via-aviation-900/[0.30] to-transparent lg:block"
      />

      <div className="container-site pb-28 pt-36">
        <div className="max-w-2xl">
          <div className="mb-5 flex items-center gap-3">
            <Rule className="!h-5" />
            <Webale tone="dark" className="text-sm" />
            <span className="text-cream/50">·</span>
            <span className="font-display text-[0.72rem] font-semibold uppercase tracking-wide2 text-cream/80">
              Uganda&rsquo;s safari airline
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold leading-[1.04] text-white sm:text-5xl lg:text-[3.9rem]">
            Every park,
            <br />
            every morning
          </h1>
          <p className="mt-5 max-w-xl text-lg text-cream/90 sm:text-xl">
            Scheduled seats from Kajjansi to Bwindi, Queen Elizabeth, Murchison Falls and
            Kidepo. Twelve seats, every one a window — leaving from the Kampala side of
            Entebbe.
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
