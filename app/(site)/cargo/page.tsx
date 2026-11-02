import type { Metadata } from "next";
import { Package, Plane, Boxes } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { OilCorridorMap } from "@/components/OilCorridorMap";
import { ContactForm } from "@/components/ContactForm";
import { Kicker } from "@/components/brand";
import { CARGO_SERVICES, CARGO_TARIFF } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cargo",
  description:
    "Fly Uganda charter and cargo — Albertine Graben energy support, lodge resupply and humanitarian charter across Uganda and the region.",
};

const ICONS = [Plane, Boxes, Package];

export default function CargoPage() {
  return (
    <>
      <PageHero
        kicker="Fly Uganda Cargo"
        title="Charter and cargo, from Kajjansi"
        subtitle="Crew rotations into the Albertine, resupply into the parks, and dedicated aircraft for relief operations and beyond."
        crumbs={[{ label: "Home", href: "/" }, { label: "Cargo" }]}
      />

      {/* Lead */}
      <section className="bg-paper py-16">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Kicker>Charter &amp; cargo</Kicker>
            <h2 className="mt-4 font-serif text-3xl font-semibold text-ink">
              The Albertine corridor, on the schedule
            </h2>
            <p className="mt-4 text-slatey">
              Kajjansi is thirty-five minutes&rsquo; flying from Hoima and about an hour from Pakwach, and the same hangar
              that flies the park schedule flies the crew rotations and the freight. One operator, one
              AOC, one invoice — whether it is a pallet into Bugungu or a fortnightly rotation.
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-nile/10 bg-white p-5">
                <dt className="text-xs uppercase tracking-wide text-slatey">Fleet</dt>
                <dd className="font-serif text-lg text-ink">Caravan · 1900D · C206/210</dd>
              </div>
              <div className="rounded-2xl border border-nile/10 bg-white p-5">
                <dt className="text-xs uppercase tracking-wide text-slatey">Clients</dt>
                <dd className="font-serif text-lg text-ink">Energy · NGO · Lodges</dd>
              </div>
            </dl>
          </div>
          <OilCorridorMap />
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-16">
        <div className="container-site">
          <Kicker>What we carry</Kicker>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-ink">What we fly</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {CARGO_SERVICES.map((s, i) => {
              const Icon = ICONS[i];
              return (
                <div key={s.title} className="rounded-2xl border border-nile/10 bg-paper p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-nile/[0.06] text-nile">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-serif text-lg text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm text-slatey">{s.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tariff */}
      <section className="bg-nile py-16 text-paper">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div>
            <div className="[&_.kicker]:text-gold-300"><Kicker>Tariff</Kicker></div>
            <h2 className="mt-4 font-serif text-3xl font-semibold">Cargo rates</h2>
            <p className="mt-3 max-w-md text-paper/80">{CARGO_TARIFF.note}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <p className="text-xs uppercase tracking-wide text-gold-300">Outbound</p>
              <p className="mt-2 font-serif text-3xl font-semibold">{CARGO_TARIFF.outbound}</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <p className="text-xs uppercase tracking-wide text-gold-300">Backhaul</p>
              <p className="mt-2 font-serif text-3xl font-semibold">{CARGO_TARIFF.backhaul}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section className="bg-paper py-16">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div>
            <Kicker>Get a quote</Kicker>
            <h2 className="mt-4 font-serif text-3xl font-semibold text-ink">Cargo enquiries</h2>
            <p className="mt-3 text-slatey">
              Tell us what you need to move and our cargo team will respond with capacity and rates.
              For urgent shipments, email{" "}
              <a href="mailto:cargo@flyuganda.com" className="font-semibold text-nile hover:underline">cargo@flyuganda.com</a>.
            </p>
          </div>
          <ContactForm
            subjectLabel="Type of shipment"
            subjects={["Oil-corridor freight", "General cargo", "Charter / project cargo", "Other"]}
          />
        </div>
      </section>
    </>
  );
}
