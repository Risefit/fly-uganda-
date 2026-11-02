import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ScheduleTable } from "@/components/ScheduleTable";

export const metadata: Metadata = {
  title: "Schedule & timetable",
  description:
    "Fly Uganda scheduled timetable — daily departures from Kajjansi to Kihihi, Kisoro, Mweya, Kasese, Pakuba, Bugungu and Kidepo.",
};

export default function SchedulePage() {
  return (
    <>
      <PageHero
        kicker="Timetable"
        title="Flight schedule"
        subtitle="Our current Phase 1 timetable. Times are illustrative for this pre-launch website and confirmed at booking."
        crumbs={[{ label: "Home", href: "/" }, { label: "Schedule" }]}
      />
      <section className="bg-paper py-16">
        <div className="container-site">
          <ScheduleTable />
          <p className="mt-6 text-sm text-slatey">
            Looking to travel?{" "}
            <Link href="/book" className="font-semibold text-nile hover:underline">Book a flight</Link>{" "}
            or view the full{" "}
            <Link href="/routes" className="font-semibold text-nile hover:underline">route network</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
