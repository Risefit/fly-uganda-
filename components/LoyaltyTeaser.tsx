import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Kicker } from "@/components/brand";
import { TierEmblem } from "@/components/loyalty/TierEmblem";
import { TIERS } from "@/lib/loyalty";

export function LoyaltyTeaser() {
  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="club-heading">
      <div className="container-site">
        <div className="overflow-hidden rounded-3xl bg-aviation-900 text-warm">
          <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2">
            <div>
              <div className="[&_.kicker]:text-opportunity-300"><Kicker>Pearl Club</Kicker></div>
              <h2 id="club-heading" className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
                Earn Pearls on every sector.
              </h2>
              <p className="mt-4 max-w-md text-warm/80">
                Join free, earn Pearls on every Fly Uganda flight and rise through the
                Birds of Uganda, from Kingfisher to Crowned Crane, to award seats on the network.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/pearl-club/join" className="inline-flex items-center gap-2 rounded-md bg-opportunity px-5 py-3 text-sm font-semibold text-aviation-900 hover:bg-opportunity-300">
                  Join free <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link href="/pearl-club" className="inline-flex items-center gap-2 rounded-md border border-white/25 px-5 py-3 text-sm font-semibold text-cream hover:bg-white/10">
                  How it works
                </Link>
              </div>
            </div>

            {/* Tier birds */}
            <div className="grid grid-cols-4 gap-3">
              {TIERS.map((t, i) => (
                <div key={t.key} className="flex flex-col items-center gap-2 rounded-2xl bg-white/5 p-4 text-center ring-1 ring-white/10">
                  <TierEmblem tier={i + 1} accent={t.accent} className="h-12 w-12" />
                  <span className="text-xs font-medium text-warm">{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
