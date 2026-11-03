import type { Metadata } from "next";
import Image from "next/image";
import { Package, Plane, Boxes } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Kicker } from "@/components/brand";
import { CARGO_SERVICES, CARGO_TARIFF } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cargo",
  description:
    "Fly Uganda cargo — parcels and freight on the scheduled domestic network, from Kajjansi to Kihihi, Kisoro, Kasese, Pakuba, Bugungu and Kidepo, rated per kilogram.",
};

const ICONS = [Package, Plane, Boxes];

export default function CargoPage() {
  return (
    <>
      <PageHero
        kicker="Fly Uganda Cargo"
        title="Freight on the morning flight"
        subtitle="Parcels, spares and consignments carried in the hold of the scheduled service — booked at Kajjansi, collected at the airstrip the same morning."
        crumbs={[{ label: "Home", href: "/" }, { label: "Cargo" }]}
      />

      {/* Lead */}
      <section className="bg-cream py-16">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Kicker>Cargo on the schedule</Kicker>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink">
              Every departure has a hold
            </h2>
            <p className="mt-4 text-muted">
              Kajjansi is seventy minutes&rsquo; flying from Kasese and about an hour and a quarter from
              Bugungu, and the aircraft that carries the passengers carries the freight. Weighed and
              rated per kilogram by sector, on the next departure with space — one booking, one waybill,
              one airline.
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-aviation/10 bg-white p-5">
                <dt className="text-xs uppercase tracking-wide text-muted">Carried on</dt>
                <dd className="font-display text-lg text-ink">Caravan · 1900D</dd>
              </div>
              <div className="rounded-2xl border border-aviation/10 bg-white p-5">
                <dt className="text-xs uppercase tracking-wide text-muted">Who ships</dt>
                <dd className="font-display text-lg text-ink">Business · NGO · Lodges</dd>
              </div>
            </dl>
          </div>
          <figure className="relative aspect-[16/10] overflow-hidden rounded-2xl">
            <Image
              src="/photos/fleet/c208ex-landing.jpg"
              alt="A Fly Uganda Grand Caravan on short finals over sugar cane"
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
          </figure>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-16">
        <div className="container-site">
          <Kicker>What we carry</Kicker>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink">What goes in the hold</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {CARGO_SERVICES.map((s, i) => {
              const Icon = ICONS[i];
              return (
                <div key={s.title} className="rounded-2xl border border-aviation/10 bg-cream p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-aviation/[0.06] text-aviation">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-lg text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted">{s.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tariff */}
      <section className="band-dark py-16 text-cream">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div>
            <div className="[&_.kicker]:text-opportunity-300"><Kicker>Tariff</Kicker></div>
            <h2 className="mt-4 font-display text-3xl font-semibold">Cargo rates</h2>
            <p className="mt-3 max-w-md text-cream/80">{CARGO_TARIFF.note}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <p className="text-xs uppercase tracking-wide text-opportunity-300">Outbound, per kg</p>
              <p className="mt-2 break-words font-display text-2xl font-semibold sm:text-3xl">{CARGO_TARIFF.outbound}</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <p className="text-xs uppercase tracking-wide text-opportunity-300">Backhaul, per kg</p>
              <p className="mt-2 break-words font-display text-2xl font-semibold sm:text-3xl">{CARGO_TARIFF.backhaul}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section className="bg-cream py-16">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div>
            <Kicker>Get a quote</Kicker>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink">Cargo enquiries</h2>
            <p className="mt-3 text-muted">
              Tell us what you need to move, where to, and when it needs to be there. For urgent
              shipments, email{" "}
              <a href="mailto:cargo@flyuganda.com" className="font-semibold text-aviation hover:underline">cargo@flyuganda.com</a>.
            </p>
          </div>
          <ContactForm
            subjectLabel="Type of shipment"
            subjects={["Parcel / documents", "Albertine or field consignment", "Lodge resupply", "Other"]}
          />
        </div>
      </section>
    </>
  );
}
