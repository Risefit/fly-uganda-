import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Kicker } from "@/components/brand";
import { SCHEDULE } from "@/lib/content";
import { CONTACT } from "@/lib/data";

export const metadata: Metadata = {
  title: "Flight status",
  description: "Today's Fly Uganda departures from Kajjansi and the up-country airstrips, and how to reach operations for a live update.",
};

/**
 * ⚠️ PLACEHOLDER. There is no live feed behind this page: it renders the
 * published timetable. Wire to the PSS/ops system for real status, or keep
 * the page honest about that — it currently is.
 */
export default function FlightStatusPage() {
  const out = SCHEDULE.filter((f) => f.from === "HUKJ");
  const back = SCHEDULE.filter((f) => f.to === "HUKJ");
  return (
    <>
      <PageHero
        kicker="Flight status"
        title="Today's departures"
        subtitle="Scheduled times from the published timetable. Unpaved airstrips are weather- and surface-dependent — for a live update on the day, call operations."
        crumbs={[{ label: "Home", href: "/" }, { label: "Flight status" }]}
      />

      <section className="bg-cream py-14">
        <div className="container-site grid gap-8 lg:grid-cols-[1fr_1fr]">
          {[["Out of Kajjansi", out], ["Back to Kajjansi", back]].map(([title, rows]) => (
            <div key={title as string}>
              <Kicker>{title as string}</Kicker>
              <div className="mt-4 overflow-x-auto rounded-2xl border border-aviation/10 bg-warm">
                <table className="w-full text-left text-sm tnum">
                  <thead className="bg-aviation/[0.04] font-display text-xs uppercase text-muted">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Flight</th>
                      <th className="px-4 py-3 font-semibold">To / from</th>
                      <th className="px-4 py-3 font-semibold">Dep</th>
                      <th className="px-4 py-3 font-semibold">Arr</th>
                      <th className="px-4 py-3 font-semibold">Days</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-aviation/10">
                    {(rows as typeof SCHEDULE).map((f) => (
                      <tr key={f.flightNo}>
                        <td className="flight-code px-4 py-3 font-semibold text-aviation">{f.flightNo}</td>
                        <td className="px-4 py-3">{f.city}</td>
                        <td className="px-4 py-3">{f.dep}</td>
                        <td className="px-4 py-3">{f.arr}</td>
                        <td className="px-4 py-3 text-muted">{f.days}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <div className="container-site mt-10">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-aviation p-7 text-cream">
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
            Times shown are the published timetable, not live tracking. Confirm on the day.
          </p>
        </div>
      </section>
    </>
  );
}
