import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { LiveTimetable } from "@/components/LiveTimetable";
import { todaysStatus } from "@/lib/tracking";
import { CONTACT } from "@/lib/data";

export const metadata: Metadata = {
  title: "Flight status",
  description: "Today's Fly Uganda departures from Kajjansi and the up-country airstrips, and how to reach operations for a live update.",
};

/**
 * Live flight status. Server-renders today's statuses (so the page is useful
 * without JS and indexable), then LiveTimetable polls /api/flight-status
 * every minute. Positions come from lib/tracking — Spidertracks AFF once
 * credentials are set, the timetable replay mock until then. The page says
 * which, in the badge above the tables.
 */
export const dynamic = "force-dynamic";

export default async function FlightStatusPage() {
  const initial = await todaysStatus();
  return (
    <>
      <PageHero
        kicker="Flight status"
        title="Today's departures"
        subtitle="Live progress for every scheduled flight. Unpaved airstrips are weather- and surface-dependent — if a departure moves, we call every passenger first."
        crumbs={[{ label: "Home", href: "/" }, { label: "Flight status" }]}
      />

      <section className="bg-cream py-14">
        <div className="container-site">
          <LiveTimetable initial={initial} />
        </div>

        <div className="container-site mt-10">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-graphite p-7 text-cream">
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-wide2 text-opportunity">On the day</p>
              <p className="mt-2 max-w-xl">
                Delays on unpaved airstrips are usually weather or surface. We call every passenger
                before we move a departure — but if you want to check, operations are on the phone
                from 06:00.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="tel:+256" className="btn-primary">
                <Phone className="h-4 w-4" aria-hidden /> {CONTACT.phone}
              </a>
              <Link href="/contact" className="btn-ghost-dark">
                <MessageCircle className="h-4 w-4" aria-hidden /> Message us
              </Link>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted">
            Positions are reported by the aircraft&rsquo;s satellite tracker roughly every two minutes; times
            shown as actual are off-blocks and on-blocks as detected at the airstrip. Confirm with operations if it matters.
          </p>
        </div>
      </section>
    </>
  );
}
