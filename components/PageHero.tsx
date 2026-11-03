import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Rule, Ribbon } from "@/components/brand";

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
    <section className="relative overflow-hidden bg-horizon">
      {/* Ribbon watermark cresting the horizon */}
      <div aria-hidden className="pointer-events-none absolute -right-10 top-2 opacity-[0.16] sm:right-6">
        <Ribbon className="h-40 w-auto sm:h-56" decorative />
      </div>

      <div className="container-site relative py-14 sm:py-20">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-xs text-ink/60">
            {crumbs.map((c, i) => (
              <span key={c.label} className="inline-flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3 w-3 text-ink/30" aria-hidden />}
                {c.href ? (
                  <Link href={c.href} className="hover:text-opportunity-700">{c.label}</Link>
                ) : (
                  <span className="text-ink/80">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          <Rule />
          <span className="kicker">{kicker}</span>
        </div>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.08] text-ink sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-base text-ink/70 sm:text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}
