import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SearchWidget } from "@/components/SearchWidget";
import { AeroCRSFrame, LaunchingNotice } from "@/components/AeroCRSFrame";

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
        <div className="container-site">
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

            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-2xl border border-aviation/10 bg-white px-6 py-5">
              <h3 className="font-semibold text-ink">Already booked?</h3>
              <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
                <li><Link href="/manage" className="text-aviation hover:underline">Manage your booking →</Link></li>
                <li><Link href="/check-in" className="text-aviation hover:underline">Online check-in →</Link></li>
                <li><Link href="/travel-info" className="text-aviation hover:underline">Baggage & travel info →</Link></li>
              </ul>
            </div>
        </div>
      </section>
    </>
  );
}
