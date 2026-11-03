import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Leaf, Plane, MapPinned, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Kicker, Chip } from "@/components/brand";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "How Fly Uganda keeps safari flying light — small aircraft, short sectors, park fees that fund conservation, and flying that replaces long road transfers.",
};

// ⚠️ Figures below are illustrative framing, not audited data. Replace the
// numbers with measured values before publishing them as claims.
const PILLARS = [
  {
    Icon: Plane,
    title: "The right-sized aircraft",
    body: "A twelve-seat Caravan burns a fraction of what a regional jet does and lands on murram strips inside the parks, so there is no second transfer to add.",
  },
  {
    Icon: MapPinned,
    title: "Short sectors, by design",
    body: "Kajjansi to Kihihi is ninety minutes in the air. The alternative is a full day on the road, with the fuel and the fatigue that come with it.",
  },
  {
    Icon: Leaf,
    title: "Parks that pay for themselves",
    body: "Every seat we sell puts a visitor through a Uganda Wildlife Authority gate. Park fees fund rangers, anti-poaching work and the communities on the boundary.",
  },
  {
    Icon: Users,
    title: "Crew and engineering at home",
    body: "Pilots, engineers and station staff are based at Kajjansi and in the park communities we fly to. The value stays in Uganda.",
  },
];

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        kicker="Sustainability"
        title="Flying light, on purpose"
        subtitle="Small aircraft into the parks, instead of big aircraft to a city and a long road after it. The case for safari by air is also the environmental one."
        crumbs={[{ label: "Home", href: "/" }, { label: "Sustainability" }]}
      />

      <section className="bg-cream py-16">
        <div className="container-site">
          <Kicker>What we do differently</Kicker>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold text-ink">Four things that are true today</h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-aviation/10 sm:grid-cols-2">
            {PILLARS.map((p) => (
              <div key={p.title} className="bg-warm p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-growth/10 text-growth">
                  <p.Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-5 flex items-start gap-1.5 font-display text-lg font-bold text-ink">
                  <Chip className="mt-1.5 h-3.5 w-3.5 shrink-0 text-opportunity" />
                  {p.title}
                </h3>
                <p className="mt-2 text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-aviation py-16 text-cream">
        <div className="container-site grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="[&_.kicker]:text-opportunity"><Kicker>What we are not claiming</Kicker></div>
            <h2 className="mt-4 font-display text-3xl font-bold text-white">We fly aeroplanes. We are not carbon neutral.</h2>
            <p className="mt-4 max-w-xl text-cream/85">
              We would rather tell you what is measurable than what sounds good. We publish fuel
              burn per seat once we have a full year of it, we do not sell offsets we cannot
              verify, and we will say so plainly when a charter would be better done by road.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-aviation-700 p-7">
            <p className="font-display text-xs font-semibold uppercase tracking-wide2 text-opportunity">Ask us</p>
            <p className="mt-3 text-cream/85">
              Operators and lodges asking for emissions data for their own reporting can have the
              per-sector figures as we measure them.
            </p>
            <Link href="/contact" className="btn-primary mt-6">
              Contact us <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
