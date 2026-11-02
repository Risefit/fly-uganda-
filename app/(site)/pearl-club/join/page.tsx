import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { AeroCRSFrame } from "@/components/AeroCRSFrame";
import { PearlMark } from "@/components/brand";

export const metadata: Metadata = {
  title: "Join the Pearl Club",
  description:
    "Join the Pearl Club free and start earning Pearls on Fly Uganda flights.",
};

const FIELD =
  "w-full rounded-md border border-nile/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-slatey/60 focus:border-nile focus:outline-none focus:ring-2 focus:ring-nile/20";

const PERKS = [
  "Earn Pearls from your first flight",
  "Members-only fares and offers",
  "Rise through the Birds of Uganda",
  "Redeem for award flights — pay only taxes",
];

export default function JoinPage() {
  return (
    <>
      <PageHero
        kicker="Pearl Club"
        title="Join free in minutes"
        subtitle="Become a member and start earning Pearls on every Fly Uganda flight."
        crumbs={[{ label: "Home", href: "/" }, { label: "Pearl Club", href: "/pearl-club" }, { label: "Join" }]}
      />

      <section className="bg-paper py-14">
        <div className="container-site grid gap-10 lg:grid-cols-[1.4fr_0.9fr]">
          <AeroCRSFrame
            heading="Membership enrolment — powered by our reservation partner"
            blurb="Complete the form to receive your membership number. When enrolment goes live this form is handled securely by our reservation partner; until then it's a preview."
          >
            <form action="/pearl-club/account" className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-ink">First name</span>
                <input className={FIELD} autoComplete="given-name" placeholder="First name" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-ink">Last name</span>
                <input className={FIELD} autoComplete="family-name" placeholder="Last name" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-ink">Email</span>
                <input type="email" className={FIELD} autoComplete="email" placeholder="you@example.com" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-ink">Phone</span>
                <input type="tel" className={FIELD} autoComplete="tel" placeholder="+211 …" />
              </label>
              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="text-xs font-semibold text-ink">Home country</span>
                <input className={FIELD} placeholder="Country" autoComplete="country-name" />
              </label>
              <label className="flex items-start gap-2 text-xs text-slatey sm:col-span-2">
                <input type="checkbox" className="mt-0.5" />
                <span>
                  I agree to the{" "}
                  <Link href="/legal/pearl-club-terms" className="font-semibold text-nile hover:underline">programme terms</Link>{" "}
                  and the{" "}
                  <Link href="/legal/privacy" className="font-semibold text-nile hover:underline">privacy policy</Link>.
                </span>
              </label>
              <div className="sm:col-span-2">
                <button type="submit" className="btn-primary w-full sm:w-auto">Create my membership</button>
              </div>
            </form>
          </AeroCRSFrame>

          <aside className="space-y-4">
            <div className="rounded-2xl bg-nile p-6 text-paper">
              <div className="flex items-center gap-2">
                <PearlMark className="h-5 w-5 text-gold" />
                <h2 className="font-serif text-lg font-semibold">Why join</h2>
              </div>
              <ul className="mt-4 space-y-2.5">
                {PERKS.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-paper/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-nile/10 bg-white p-6 text-sm text-slatey">
              Already a member?{" "}
              <Link href="/pearl-club/account" className="font-semibold text-nile hover:underline">Sign in to My Account →</Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
