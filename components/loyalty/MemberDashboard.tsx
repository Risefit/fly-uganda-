"use client";

import { useState } from "react";
import Link from "next/link";
import { LogIn, Plane, ArrowUpRight, ArrowDownRight, Info } from "lucide-react";
import { TIERS, PROGRAMME } from "@/lib/loyalty";
import { TierEmblem } from "@/components/loyalty/TierEmblem";

const FIELD =
  "w-full rounded-md border border-aviation/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-aviation focus:outline-none focus:ring-2 focus:ring-aviation/20";

// Illustrative member — replaced by live data from the AeroCRS API at launch.
const MEMBER = {
  name: "Sample Member",
  ffNumber: "PC-204815",
  tierKey: "shoebill" as const,
  statusPearls: 52000,
  awardPearls: 38450,
};

const ACTIVITY = [
  { date: "12 Oct 2026", desc: "Flight FU101 · Kajjansi → Kihihi", miles: 4200, type: "earn" },
  { date: "12 Oct 2026", desc: "Tier bonus (+50%)", miles: 2100, type: "earn" },
  { date: "28 Sep 2026", desc: "Award seat FU141 · Kajjansi → Pakuba", miles: -11000, type: "spend" },
  { date: "14 Sep 2026", desc: "Flight FU161 · Kajjansi → Kidepo", miles: 3600, type: "earn" },
];

export function MemberDashboard() {
  const [signedIn, setSignedIn] = useState(false);

  if (!signedIn) {
    return (
      <div className="mx-auto max-w-md">
        <div className="rounded-2xl border border-aviation/10 bg-white p-7 shadow-card">
          <div className="flex items-center gap-2 text-aviation">
            <LogIn className="h-5 w-5" aria-hidden />
            <h2 className="font-display text-xl font-semibold text-ink">Member sign in</h2>
          </div>
          <p className="mt-2 text-sm text-muted">
            Sign in with your membership number to see your tier, Pearls balance and activity.
          </p>
          <form
            className="mt-5 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              setSignedIn(true);
            }}
          >
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-ink">Membership number</span>
              <input className={`${FIELD} flight-code uppercase`} placeholder="PC-XXXXXX" aria-label="Membership number" />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-ink">Password / PIN</span>
              <input type="password" className={FIELD} placeholder="••••••" aria-label="Password" />
            </label>
            <button type="submit" className="btn-primary w-full">View my account</button>
          </form>
          <p className="mt-4 flex items-start gap-2 rounded-lg bg-aviation/[0.04] px-3 py-2 text-xs text-muted">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-aviation" aria-hidden />
            Preview mode — sign-in connects to our reservation partner at launch. Press the button to see a sample account.
          </p>
          <p className="mt-4 text-center text-sm text-muted">
            Not a member yet?{" "}
            <Link href="/pearl-club/join" className="font-semibold text-aviation hover:underline">Join free →</Link>
          </p>
        </div>
      </div>
    );
  }

  const tier = TIERS.find((t) => t.key === MEMBER.tierKey)!;
  const tierIdx = TIERS.findIndex((t) => t.key === MEMBER.tierKey);
  const nextTier = TIERS[tierIdx + 1];
  // Read from lib/loyalty.ts so the dashboard cannot drift from the published ladder.
  const nextThreshold = nextTier ? nextTier.statusThreshold : MEMBER.statusPearls;
  const pct = Math.min(100, Math.round((MEMBER.statusPearls / nextThreshold) * 100));

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
      {/* Membership card */}
      <div className="space-y-6">
        <div className="overflow-hidden rounded-2xl text-aviation-900 shadow-card" style={{ background: tier.accent }}>
          <div className="flex items-start justify-between p-6">
            <div>
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-aviation-900/70">
                {PROGRAMME.name}
              </p>
              <p className="mt-6 font-display text-2xl">{MEMBER.name}</p>
              <p className="flight-code mt-1 text-sm text-aviation-900/80">{MEMBER.ffNumber}</p>
            </div>
            <TierEmblem tier={TIERS.findIndex((x) => x.key === tier.key) + 1} accent="#001230" className="h-12 w-12" />
          </div>
          <div className="flex items-center justify-between bg-black/10 px-6 py-3">
            <span className="text-sm font-medium">{tier.name}</span>
            <span className="text-xs text-aviation-900/70">{tier.tagline}</span>
          </div>
        </div>

        {/* Balance */}
        <div className="rounded-2xl border border-aviation/10 bg-white p-6">
          <p className="text-xs uppercase tracking-wide text-muted">Award balance</p>
          <p className="mt-1 font-display text-4xl font-semibold text-aviation">
            {MEMBER.awardPearls.toLocaleString()}
          </p>
          <p className="text-sm text-muted">Pearls available to spend</p>
          <Link href="/#book" className="btn-primary mt-4 w-full">
            <Plane className="h-4 w-4" aria-hidden /> Use Pearls for a seat
          </Link>
        </div>
      </div>

      {/* Tier progress + activity */}
      <div className="space-y-6">
        <div className="rounded-2xl border border-aviation/10 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">Your tier this year</h2>
            <span className="text-sm font-semibold" style={{ color: tier.accent }}>{tier.name}</span>
          </div>
          {nextTier ? (
            <>
              <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-aviation/10">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: tier.accent }} />
              </div>
              <p className="mt-2 text-sm text-muted">
                <span className="font-semibold text-ink">{MEMBER.statusPearls.toLocaleString()}</span> /{" "}
                {nextThreshold.toLocaleString()} Status Pearls —{" "}
                <span className="font-semibold text-ink">{(nextThreshold - MEMBER.statusPearls).toLocaleString()}</span>{" "}
                more to <span className="font-semibold" style={{ color: nextTier.accent }}>{nextTier.name}</span>
              </p>
            </>
          ) : (
            <p className="mt-4 text-sm text-muted">You're at the top tier — thank you for flying with us.</p>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border border-aviation/10 bg-white">
          <div className="flex items-center justify-between border-b border-aviation/10 px-6 py-4">
            <h2 className="font-display text-lg font-semibold text-ink">Recent activity</h2>
            <span className="text-xs text-muted">Recent sectors</span>
          </div>
          <ul className="divide-y divide-aviation/10">
            {ACTIVITY.map((a, i) => (
              <li key={i} className="flex items-center justify-between gap-4 px-6 py-3.5">
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
                      a.type === "earn" ? "bg-growth/10 text-growth" : "bg-opportunity/15 text-opportunity-700"
                    }`}
                  >
                    {a.type === "earn" ? <ArrowUpRight className="h-4 w-4" aria-hidden /> : <ArrowDownRight className="h-4 w-4" aria-hidden />}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">{a.desc}</p>
                    <p className="text-xs text-muted">{a.date}</p>
                  </div>
                </div>
                <span className={`flight-code text-sm font-semibold ${a.type === "earn" ? "text-growth" : "text-opportunity-700"}`}>
                  {a.miles > 0 ? "+" : ""}{a.miles.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-aviation/[0.04] px-5 py-3 text-sm">
          <span className="text-muted">Signed in as {MEMBER.name} (preview)</span>
          <button onClick={() => setSignedIn(false)} className="font-semibold text-aviation hover:underline">Sign out</button>
        </div>
      </div>
    </div>
  );
}
