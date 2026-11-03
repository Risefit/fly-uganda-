import { Check } from "lucide-react";
import { TIERS } from "@/lib/loyalty";
import { TierEmblem } from "@/components/loyalty/TierEmblem";

/**
 * Four tier cards whose rows line up across the grid: emblem + name (fixed
 * height), tagline (fixed height), qualification box (two stacked cells),
 * then benefits. Fixed row heights are what keep the grey boxes level when one
 * name wraps ("Great Blue Turaco") and another does not.
 */
export function TierLadder() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {TIERS.map((t, i) => (
        <div
          key={t.key}
          className="relative grid grid-rows-[auto_auto_auto_1fr] overflow-hidden rounded-2xl border border-aviation/10 bg-white shadow-card"
        >
          <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.accent }} />

          <div className="flex min-h-[6.25rem] items-center gap-4 px-6 pt-7">
            <TierEmblem tier={i + 1} accent={t.accent} className="h-14 w-14 shrink-0" />
            <div className="min-w-0">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-muted">Tier {i + 1}</p>
              <h3 className="font-display text-xl font-semibold leading-tight text-ink">{t.name}</h3>
            </div>
          </div>

          <p className="flex min-h-[2.75rem] items-center px-6 text-sm italic text-muted">{t.tagline}</p>

          <dl className="mx-6 grid min-h-[4.5rem] grid-cols-[1.4fr_1fr] gap-3 rounded-lg bg-aviation/[0.04] px-3 py-2.5 text-xs">
            <div>
              <dt className="text-[0.62rem] uppercase tracking-wide text-muted">Qualify</dt>
              <dd className="mt-0.5 font-semibold leading-snug text-aviation">{t.statusPearls}</dd>
            </div>
            <div className="border-l border-aviation/10 pl-3">
              <dt className="text-[0.62rem] uppercase tracking-wide text-muted">Earning</dt>
              <dd className="mt-0.5 font-semibold leading-snug text-ink">{t.bonus}</dd>
            </div>
          </dl>

          <ul className="flex flex-col gap-2 p-6 pt-5">
            {t.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-ink">
                <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: t.accent }} aria-hidden />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
