import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { AeroCRSFrame, LaunchingNotice } from "@/components/AeroCRSFrame";

export const metadata: Metadata = {
  title: "Manage your booking",
  description: "Retrieve and manage your Fly Uganda booking using your reference and surname.",
};

const FIELD =
  "w-full rounded-md border border-aviation/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-aviation focus:outline-none focus:ring-2 focus:ring-aviation/20";

export default function ManagePage() {
  return (
    <>
      <PageHero
        kicker="My trips"
        title="Manage your booking"
        subtitle="Retrieve your reservation to view, change or add to your trip."
        crumbs={[{ label: "Home", href: "/" }, { label: "Manage booking" }]}
      />
      <section className="bg-cream py-14">
        <div className="container-site max-w-2xl">
          <AeroCRSFrame
            heading="Booking retrieval — opens in our reservation partner"
            blurb="Enter your booking reference (PNR) and the surname on the booking. When online services are live this opens your trip in the secure booking portal."
          >
            <form action="/manage" className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-ink">Booking reference (PNR)</span>
                <input className={`${FIELD} flight-code uppercase`} placeholder="e.g. FU-XXXXX" aria-label="Booking reference" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-ink">Surname</span>
                <input className={FIELD} placeholder="Family name" aria-label="Surname" autoComplete="family-name" />
              </label>
              <div className="sm:col-span-2">
                <button type="submit" className="btn-primary w-full sm:w-auto">Retrieve booking</button>
              </div>
            </form>
            <LaunchingNotice />
          </AeroCRSFrame>
        </div>
      </section>
    </>
  );
}
