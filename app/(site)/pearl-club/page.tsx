import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Plane, TrendingUp, Gift } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Kicker, Chip } from "@/components/brand";
import { TierLadder } from "@/components/loyalty/TierLadder";
import { PROGRAMME, EARN_STEPS, REWARD_CHART, FAQ } from "@/lib/loyalty";

export const metadata: Metadata = {
  title: "Pearl Club — frequent flyer programme",
  description:
    "Join the Pearl Club and earn Pearls on every Fly Uganda flight. Rise through the Birds of Uganda and redeem Pearls for award seats.",
};

const STEP_ICONS = [Plane, TrendingUp, Gift];

export default function PearlClubPage() {
  return (
    <>
      <PageHero
        kicker="Pearl Club"
        title="The more you see, the further you go"
        subtitle={PROGRAMME.intro}
        crumbs={[{ label: "Home", href: "/" }, { label: "Pearl Club" }]}
      />

      {/* Join band */}
      <section className="border-b border-aviation/10 bg-white">
        <div className="container-site flex flex-wrap items-center justify-between gap-4 py-5">
          <p className="flex items-center gap-2 text-sm text-muted">
            <Chip className="h-4 w-4 text-opportunity" />
            Free to join · earn Pearls from your very first flight
          </p>
          <div className="flex gap-3">
            <Link href="/pearl-club/join" className="btn-primary">
              Join free <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/pearl-club/account" className="btn-ghost">Sign in</Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-site">
          <Kicker>How it works</Kicker>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink">Three steps to award seats</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {EARN_STEPS.map((s, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <div key={s.title} className="rounded-2xl border border-aviation/10 bg-white p-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-aviation/[0.06] text-aviation">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="flight-code text-sm font-semibold text-opportunity-700">0{i + 1}</span>
                  </div>
                  <h3 className="mt-4 font-display text-lg text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted">{s.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-site">
          <Kicker>The tiers · Birds of Uganda</Kicker>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold text-ink">
            Rise from Kingfisher to Crowned Crane
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Your tier is set by the Status Pearls you earn each year. The higher you fly, the more
            Pearls you earn and the more you enjoy on board and on the ground.
          </p>
          <div className="mt-10">
            <TierLadder />
          </div>
          <p className="mt-4 text-xs text-muted">
            ¹ Guaranteed seat subject to fare, load and operational rules. Status Pearl thresholds and
            bonuses shown are illustrative and confirmed at programme launch.
          </p>
        </div>
      </section>

      {/* Rewards */}
      <section className="band-dark py-16 text-cream sm:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div>
            <div className="[&_.kicker]:text-opportunity-300"><Kicker>Spend your Pearls</Kicker></div>
            <h2 className="mt-4 font-display text-3xl font-semibold">Award seats across the network</h2>
            <p className="mt-3 max-w-md text-cream/80">
              Redeem Pearls for award seats anywhere Fly Uganda flies. Your Pearls cover
              the fare — you pay only taxes and charges.
            </p>
            <Link
              href="/pearl-club/join"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-opportunity px-5 py-3 text-sm font-semibold text-aviation-900 hover:bg-opportunity-300"
            >
              Start earning <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-xs uppercase tracking-wide text-opportunity-300">
                <tr>
                  <th className="px-5 py-3 font-semibold">Award flight</th>
                  <th className="px-5 py-3 text-right font-semibold">Pearls (one way)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {REWARD_CHART.map((r) => (
                  <tr key={r.route}>
                    <td className="px-5 py-3 text-cream/90">{r.route}</td>
                    <td className="flight-code px-5 py-3 text-right font-semibold text-opportunity-300">{r.pearls}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="px-5 py-3 text-xs text-cream/70">Illustrative — set at programme launch.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-site max-w-3xl">
          <Kicker>Good to know</Kicker>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink">Frequently asked</h2>
          <div className="mt-8 divide-y divide-aviation/10 overflow-hidden rounded-2xl border border-aviation/10 bg-white">
            {FAQ.map((f) => (
              <details key={f.q} className="group px-6 py-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium text-ink">
                  {f.q}
                  <span className="text-opportunity transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-graphite p-7 text-cream">
            <div className="flex items-center gap-3">
              <Chip className="h-6 w-6 text-opportunity" />
              <p className="font-display text-xl">Ready to start earning?</p>
            </div>
            <Link href="/pearl-club/join" className="rounded-md bg-opportunity px-5 py-3 text-sm font-semibold text-aviation-900 hover:bg-opportunity-300">
              Join the Pearl Club
            </Link>
          </div>
          <p className="mt-4 text-center text-xs text-muted">
            See the full <Link href="/legal/pearl-club-terms" className="font-semibold text-aviation hover:underline">programme terms</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
