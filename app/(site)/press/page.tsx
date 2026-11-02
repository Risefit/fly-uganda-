import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Press & news",
  description: "Newsroom and media enquiries for Fly Uganda.",
};

export default function PressPage() {
  return (
    <>
      <PageHero
        kicker="Newsroom"
        title="Press & news"
        subtitle="Announcements, route launches and press releases will appear here as we approach first flight."
        crumbs={[{ label: "Home", href: "/" }, { label: "Press" }]}
      />
      <section className="bg-paper py-16">
        <div className="container-site">
          <div className="rounded-2xl border border-dashed border-nile/20 bg-white px-6 py-16 text-center">
            <p className="font-serif text-2xl text-ink">News is coming soon</p>
            <p className="mx-auto mt-3 max-w-md text-slatey">
              Our newsroom will launch with the airline. For media enquiries and interview requests,
              please contact our press office.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-primary">Contact press office</Link>
              <a href="mailto:care@flyuganda.com" className="btn-ghost">care@flyuganda.com</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
