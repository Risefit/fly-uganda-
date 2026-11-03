import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SearchWidget } from "@/components/SearchWidget";
import { AeroCRSFrame, LaunchingNotice } from "@/components/AeroCRSFrame";
import { FARES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Book a flight",
  description:
    "Book scheduled seats with Fly Uganda from Kajjansi to Bwindi, Queen Elizabeth, Murchison Falls and Kidepo. Online booking launching shortly.",
};

export default function BookPage() {
  return (
    <>
      <PageHero
        kicker="Book now"
        title="Book your flight"
        subtitle="Search, choose your flights and pay securely. Our online booking is launching shortly with our reservation partner."
        crumbs={[{ label: "Home", href: "/" }, { label: "Book" }]}
      />

      <section className="bg-cream py-14">
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.9fr)]">
          <div className="min-w-0">
            <AeroCRSFrame
              heading="Reservations powered by our booking partner"
              blurb="The full search → seat selection → payment → confirmation flow runs in the secure booking widget below. Until it goes live, you can search here and reserve by phone or email."
            >
              <SearchWidget variant="page" />
              <LaunchingNotice />
            </AeroCRSFrame>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, t: "Secure payment", d: "Card payments handled in the protected booking flow." },
                { icon: Phone, t: "Call to book", d: "+256 (TBC), 7 days a week." },
                { icon: Mail, t: "Email bookings", d: "reservations@flyuganda.com" },
              ].map((c) => (
                <div key={c.t} className="rounded-2xl border border-aviation/10 bg-white p-5">
                  <c.icon className="h-5 w-5 text-aviation" aria-hidden />
                  <p className="mt-3 font-semibold text-ink">{c.t}</p>
                  <p className="mt-1 text-sm text-muted">{c.d}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="min-w-0 space-y-4">
            <div className="rounded-2xl bg-aviation p-6 text-cream">
              <h2 className="font-display text-xl font-semibold">Fares from</h2>
              <div className="mt-4 space-y-3">
                <div className="flex items-baseline justify-between border-b border-white/15 pb-3">
                  <span className="text-sm text-cream/80">Park seat, one way</span>
                  <span className="font-display text-xl font-semibold text-opportunity-300">{FARES.parkOneWay}</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-cream/80">Park seat, return</span>
                  <span className="font-display text-xl font-semibold text-opportunity-300">{FARES.parkReturn}</span>
                </div>
              </div>
              <p className="mt-4 text-xs text-cream/60">{FARES.note}</p>
            </div>

            <div className="rounded-2xl border border-aviation/10 bg-white p-6">
              <h3 className="font-semibold text-ink">Already booked?</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="/manage" className="text-aviation hover:underline">Manage your booking →</Link></li>
                <li><Link href="/check-in" className="text-aviation hover:underline">Online check-in →</Link></li>
                <li><Link href="/travel-info" className="text-aviation hover:underline">Baggage & travel info →</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
