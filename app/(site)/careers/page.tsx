import type { Metadata } from "next";
import { Plane, Wrench, Headset, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Kicker, Chip } from "@/components/brand";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Fly Uganda — fly, engineer and sell Uganda's domestic airline from Kajjansi. Roles opening soon.",
};

const AREAS = [
  { icon: Plane, t: "Flight operations", d: "Pilots, dispatchers and operations control." },
  { icon: Wrench, t: "Engineering & maintenance", d: "Licensed engineers and technical staff." },
  { icon: Headset, t: "Customer & ground services", d: "Airports, contact centre and ticketing." },
  { icon: Users, t: "Corporate", d: "Commercial, finance, people and support." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        kicker="Careers"
        title="Fly for the Pearl of Africa"
        subtitle="Crew, engineers and reservations — based at Kajjansi, flying the whole of Uganda. Roles are opening soon."
        crumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
      />
      <section className="bg-cream py-16">
        <div className="container-site">
          <Kicker>Where you fit</Kicker>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink">Areas we&rsquo;re hiring across</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AREAS.map((a) => (
              <div key={a.t} className="rounded-2xl border border-aviation/10 bg-white p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-aviation/[0.06] text-aviation">
                  <a.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg text-ink">{a.t}</h3>
                <p className="mt-2 text-sm text-muted">{a.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl bg-graphite p-8 text-cream sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <Chip className="mt-1 h-6 w-6 shrink-0 text-opportunity" />
              <div>
                <h3 className="font-display text-xl font-semibold">Register your interest</h3>
                <p className="mt-1 text-sm text-cream/80">
                  Send your CV and the area you&rsquo;re interested in. We&rsquo;ll be in touch as roles open.
                </p>
              </div>
            </div>
            <a href="mailto:careers@flyuganda.com" className="shrink-0 rounded-md bg-opportunity px-5 py-3 text-sm font-semibold text-aviation-900 hover:bg-opportunity-300">
              careers@flyuganda.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
