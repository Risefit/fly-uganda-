import type { Metadata } from "next";
import Link from "next/link";
import { Luggage, Clock, Accessibility, Baby } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { TRAVEL_INFO } from "@/lib/content";

export const metadata: Metadata = {
  title: "Travel information",
  description:
    "Baggage allowance, check-in times, special assistance and family travel with Fly Uganda.",
};

const ICONS: Record<string, typeof Luggage> = {
  baggage: Luggage,
  checkin: Clock,
  assistance: Accessibility,
  family: Baby,
};

export default function TravelInfoPage() {
  return (
    <>
      <PageHero
        kicker="Plan your trip"
        title="Travel information"
        subtitle="Everything you need to know before you fly — baggage, check-in, assistance and family travel."
        crumbs={[{ label: "Home", href: "/" }, { label: "Travel info" }]}
      />
      <section className="bg-cream py-16">
        <div className="container-site grid gap-10 lg:grid-cols-[0.7fr_2fr]">
          {/* anchor nav */}
          <nav aria-label="On this page" className="h-max rounded-2xl border border-aviation/10 bg-white p-4 lg:sticky lg:top-28">
            <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-muted">On this page</p>
            <ul className="space-y-1">
              {TRAVEL_INFO.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="block rounded-md px-3 py-2 text-sm text-ink hover:bg-aviation/[0.04]">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-6">
            {TRAVEL_INFO.map((s) => {
              const Icon = ICONS[s.id] ?? Luggage;
              return (
                <section key={s.id} id={s.id} className="scroll-mt-28 rounded-2xl border border-aviation/10 bg-white p-7">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-aviation/[0.06] text-aviation">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h2 className="font-display text-2xl font-semibold text-ink">{s.title}</h2>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {s.items.map((it) => (
                      <li key={it} className="flex gap-3 text-muted">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-opportunity" aria-hidden />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
            <p className="text-sm text-muted">
              Questions about your trip?{" "}
              <Link href="/contact" className="font-semibold text-aviation hover:underline">Contact customer care</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
