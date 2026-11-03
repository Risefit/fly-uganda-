import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Kicker, Chip } from "@/components/brand";
import { PROMISES, FLEET } from "@/lib/data";
import { LEADERSHIP } from "@/lib/content";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Fly Uganda is Uganda's safari airline, flying scheduled seats and charter from Kajjansi Airfield under the Kampala Executive Aviation AOC.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Our story"
        title="Thirty years of Ugandan flying"
        subtitle="Uganda&rsquo;s safari airline — scheduled seats and charter from Kajjansi, flown under the Kampala Executive Aviation AOC."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Story */}
      <section className="bg-cream py-16">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Kicker>Who we are</Kicker>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink">A Kajjansi airline, end to end</h2>
            <p className="mt-4 text-muted">
              Fly Uganda grew out of the Kampala Aero Club and Flight Training Centre at Kajjansi,
              and today flies the scheduled seat network that connects Kampala to Uganda&rsquo;s national
              parks. We operate under the Kampala Executive Aviation Air Operator Certificate, with our
              own approved maintenance organisation on the same field.
            </p>
            <p className="mt-4 text-muted">
              Kajjansi matters. It sits on the Kampala side of Entebbe, which takes roughly half an hour
              off the transfer at each end of the day and keeps you out of the international terminal
              altogether. The aircraft, the engineers and the crews are all based on that one field.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Chip className="h-5 w-5 text-opportunity" />
              <span className="font-display text-lg text-aviation">Scheduled · Charter · Cargo</span>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/scenes/about.svg"
              alt="The Ugandan highlands at first light"
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission / promises */}
      <section className="bg-white py-16">
        <div className="container-site">
          <Kicker>Our promise</Kicker>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold text-ink">What you can hold us to</h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-aviation/10 sm:grid-cols-2 lg:grid-cols-4">
            {PROMISES.map((p) => (
              <div key={p.title} className="bg-white p-6">
                <h3 className="flex items-start gap-1.5 font-display text-lg text-ink">
                  <Chip className="mt-1 h-3.5 w-3.5 shrink-0 text-opportunity" />
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section className="bg-cream py-16">
        <div className="container-site">
          <Kicker>The fleet</Kicker>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink">Our aircraft</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {FLEET.map((a) => (
              <div key={a.name} className="rounded-2xl border border-aviation/10 bg-white p-6">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-opportunity-700">
                  {a.role} · {a.count}
                </span>
                <h3 className="mt-2 font-display text-xl text-ink">{a.name}</h3>
                <p className="mt-2 text-sm text-muted">{a.blurb}</p>
                <p className="mt-3 text-sm font-medium text-aviation">{a.seats}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-white py-16">
        <div className="container-site">
          <Kicker>Leadership</Kicker>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink">Our team</h2>
          <p className="mt-3 max-w-xl text-muted">
            Named post-holders are confirmed under the AOC and will be published here.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LEADERSHIP.map((l) => (
              <div key={l.role} className="rounded-2xl border border-aviation/10 bg-cream p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-aviation/[0.06]">
                  <Chip className="h-5 w-5 text-opportunity" />
                </div>
                <h3 className="mt-4 font-display text-lg text-ink">{l.role}</h3>
                <p className="mt-1 text-sm text-muted">{l.note}</p>
                <p className="mt-2 text-xs italic text-muted">{l.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-aviation py-14 text-cream">
        <div className="container-site flex flex-wrap items-center justify-between gap-6">
          <h2 className="font-display text-2xl font-semibold">Ready to fly with us?</h2>
          <div className="flex gap-3">
            <Link href="/book" className="inline-flex items-center gap-2 rounded-md bg-opportunity px-5 py-3 text-sm font-semibold text-aviation-900 hover:bg-opportunity-300">
              Book a flight <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/careers" className="inline-flex items-center gap-2 rounded-md border border-white/25 px-5 py-3 text-sm font-semibold text-cream hover:bg-white/10">
              Careers
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
