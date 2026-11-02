import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { AeroCRSFrame, LaunchingNotice } from "@/components/AeroCRSFrame";

export const metadata: Metadata = {
  title: "Online check-in",
  description: "Check in online for your Fly Uganda flight using your booking reference and surname.",
};

const FIELD =
  "w-full rounded-md border border-nile/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-slatey/60 focus:border-nile focus:outline-none focus:ring-2 focus:ring-nile/20";

export default function CheckInPage() {
  return (
    <>
      <PageHero
        kicker="Check-in"
        title="Online check-in"
        subtitle="Check in from 24 hours and up to 90 minutes before departure."
        crumbs={[{ label: "Home", href: "/" }, { label: "Check-in" }]}
      />
      <section className="bg-paper py-14">
        <div className="container-site max-w-2xl">
          <AeroCRSFrame
            heading="Online check-in — opens in our reservation partner"
            blurb="Enter your booking reference and surname to check in and download your boarding pass. This opens in the secure check-in portal when live."
          >
            <form action="/check-in" className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-ink">Booking reference (PNR)</span>
                <input className={`${FIELD} flight-code uppercase`} placeholder="e.g. FU-XXXXX" aria-label="Booking reference" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-ink">Surname</span>
                <input className={FIELD} placeholder="Family name" aria-label="Surname" autoComplete="family-name" />
              </label>
              <div className="sm:col-span-2">
                <button type="submit" className="btn-primary w-full sm:w-auto">Check in</button>
              </div>
            </form>
            <LaunchingNotice />
          </AeroCRSFrame>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-nile/10 bg-white p-5 text-sm text-slatey">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-nile" aria-hidden />
            <p>
              Airport check-in deadlines and boarding times are listed in our{" "}
              <Link href="/travel-info#checkin" className="font-semibold text-nile hover:underline">travel information</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
