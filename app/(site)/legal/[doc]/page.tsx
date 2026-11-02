import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { LEGAL } from "@/lib/content";

export function generateStaticParams() {
  return Object.keys(LEGAL).map((doc) => ({ doc }));
}

export function generateMetadata({ params }: { params: { doc: string } }): Metadata {
  const d = LEGAL[params.doc];
  if (!d) return { title: "Legal" };
  return { title: d.title, description: `${d.title} — Fly Uganda.` };
}

const ALL = Object.values(LEGAL);

export default function LegalPage({ params }: { params: { doc: string } }) {
  const doc = LEGAL[params.doc];
  if (!doc) notFound();

  return (
    <>
      <PageHero
        kicker="Legal"
        title={doc.title}
        crumbs={[{ label: "Home", href: "/" }, { label: "Legal" }, { label: doc.title }]}
      />
      <section className="bg-paper py-16">
        <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_2fr]">
          {/* Side nav */}
          <nav aria-label="Legal documents" className="h-max rounded-2xl border border-nile/10 bg-white p-4 lg:sticky lg:top-28">
            <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-slatey">Documents</p>
            <ul className="space-y-1">
              {ALL.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/legal/${d.slug}`}
                    className={`block rounded-md px-3 py-2 text-sm ${
                      d.slug === doc.slug ? "bg-nile/[0.06] font-semibold text-nile" : "text-ink hover:bg-nile/[0.04]"
                    }`}
                  >
                    {d.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Body */}
          <article className="max-w-2xl">
            <p className="text-xs uppercase tracking-wide text-slatey">Last updated {doc.updated}</p>
            <p className="mt-4 text-slatey">{doc.intro}</p>
            <div className="mt-8 space-y-7">
              {doc.sections.map((s) => (
                <div key={s.h}>
                  <h2 className="font-serif text-xl font-semibold text-ink">{s.h}</h2>
                  <p className="mt-2 leading-relaxed text-slatey">{s.p}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 rounded-xl border border-dashed border-nile/20 bg-white px-5 py-4 text-sm text-slatey">
              This is a pre-launch placeholder document. The full, legally reviewed version will replace it
              before commercial operations begin. Questions?{" "}
              <Link href="/contact" className="font-semibold text-nile hover:underline">Contact us</Link>.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
