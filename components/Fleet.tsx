import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FLEET } from "@/lib/data";
import { Kicker } from "@/components/brand";

// Two types, both on the schedule. Photography is KEA's own (flykea.com) —
// no stock licence involved. Swap the files in /public/photos/fleet to update.
export function Fleet() {
  return (
    <section className="bg-cream py-20 sm:py-28" aria-labelledby="fleet-heading">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Kicker>The fleet</Kicker>
            <h2 id="fleet-heading" className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Two aircraft, one ticket
            </h2>
            <p className="mt-3 text-muted">
              The Caravan for the short strips, the 1900D for the busier sectors. Which one flies your
              sector depends on the day&rsquo;s loads — the fare, the crews and the service are the same.
            </p>
          </div>
          <Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-aviation hover:text-opportunity-700">
            About the operation
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {FLEET.map((a, i) => (
            <article key={a.name} className="group overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-aviation/[0.06]">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={a.image}
                  alt={a.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 620px"
                  priority={i === 0}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col gap-3 p-7">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-opportunity-700">
                  {a.role} · {a.count}
                </span>
                <h3 className="font-display text-2xl font-semibold text-ink">{a.name}</h3>
                <p className="max-w-lg text-sm leading-relaxed text-muted">{a.blurb}</p>
                <dl className="mt-2 flex flex-wrap gap-x-10 gap-y-2 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted">Cabin</dt>
                    <dd className="font-semibold text-ink">{a.seats}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted">Built for</dt>
                    <dd className="font-semibold text-ink">{a.range}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
