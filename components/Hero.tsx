import Image from "next/image";
import { SearchWidget } from "@/components/SearchWidget";
import { Meridian, Webale } from "@/components/brand";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[88vh] flex-col justify-end overflow-hidden">
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
      {/* Scrim. NOTE: opacity modifiers outside Tailwind's scale (e.g. /88)
          silently compile to nothing — use bracket values. The vertical scrim
          carries legibility on narrow screens, where the headline spans the
          full width; the horizontal one adds the cinematic falloff on desktop. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-nile-900/[0.95] via-nile-900/[0.84] to-nile-900/[0.72]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-nile-900/[0.85] via-nile-900/[0.40] to-transparent lg:block"
      />

      <div className="container-site pb-8 pt-32">
        <div className="max-w-2xl">
          <div className="mb-5 flex items-center gap-3">
            <Meridian className="!h-5 bg-gold-300" />
            <Webale className="text-gold-300 text-sm" />
            <span className="text-warm/60">·</span>
            <span className="text-[0.72rem] font-semibold uppercase tracking-wide2 text-warm/75">
              Uganda&rsquo;s safari airline
            </span>
          </div>
          <h1 className="font-serif text-4xl font-semibold leading-[1.05] text-warm sm:text-5xl lg:text-6xl">
            Every park, every morning
          </h1>
          <p className="mt-5 max-w-xl text-base text-warm/85 sm:text-lg">
            Scheduled seats from Kajjansi to Bwindi, Queen Elizabeth, Murchison Falls and
            Kidepo. Twelve seats, two pilots, and the whole of Uganda out of the window — leaving
            from the Kampala side of Entebbe.
          </p>
        </div>

        <div className="mt-8 max-w-5xl">
          <SearchWidget variant="hero" />
        </div>
      </div>
    </section>
  );
}
