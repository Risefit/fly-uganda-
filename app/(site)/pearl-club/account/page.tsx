import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { MemberDashboard } from "@/components/loyalty/MemberDashboard";

export const metadata: Metadata = {
  title: "My Account — Pearl Club",
  description: "Sign in to your Pearl Club account to view your tier, Pearls balance and activity.",
};

export default function AccountPage() {
  return (
    <>
      <PageHero
        kicker="Pearl Club"
        title="My Account"
        subtitle="Your tier, your Pearls, your recent flights — all in one place."
        crumbs={[{ label: "Home", href: "/" }, { label: "Pearl Club", href: "/pearl-club" }, { label: "My Account" }]}
      />
      <section className="bg-cream py-14">
        <div className="container-site">
          <MemberDashboard />
        </div>
      </section>
    </>
  );
}
