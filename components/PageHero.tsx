import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Meridian, Pearl } from "@/components/brand";

type Crumb = { label: string; href?: string };

export function PageHero({
  kicker,
  title,
  subtitle,
  crumbs,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="relative overflow-hidden bg-pearl-sky">
      {/* Pearl watermark cresting the horizon */}
      <div aria-hidden className="pointer-events-none absolute -right-6 -top-10 opacity-[0.12]">
        <Pearl className="h-56 w-auto" />
      </div>

      <div className="container-site relative py-14 sm:py-20">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-xs text-ink/60">
            {crumbs.map((c, i) => (
              <span key={c.label} className="inline-flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3 w-3 text-ink/30" aria-hidden />}
                {c.href ? (
                  <Link href={c.href} className="hover:text-gold-600">{c.label}</Link>
                ) : (
                  <span className="text-ink/80">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          <Meridian />
          <span className="kicker">{kicker}</span>
        </div>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.08] tracking-wide text-ink sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-base text-ink/70 sm:text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}
