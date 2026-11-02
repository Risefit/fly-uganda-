import { Check } from "lucide-react";
import { TIERS } from "@/lib/loyalty";
import { BirdMark } from "@/components/loyalty/BirdMark";

export function TierLadder() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {TIERS.map((t, i) => (
        <div
          key={t.key}
          className="relative flex flex-col overflow-hidden rounded-2xl border border-nile/10 bg-white shadow-card"
        >
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-1"
            style={{ background: t.accent }}
          />
          <div className="flex items-center gap-3 p-6 pb-3">
            <span
              className="inline-flex h-14 w-14 items-center justify-center rounded-full"
              style={{ background: `${t.accent}14`, color: t.accent }}
            >
              <BirdMark tier={t.key} className="h-9 w-9" />
            </span>
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slatey">
                Tier {i + 1}
              </p>
              <h3 className="font-serif text-xl font-semibold text-ink">{t.name}</h3>
            </div>
          </div>

          <p className="px-6 text-sm italic text-slatey">{t.tagline}</p>

          <div className="mx-6 mt-4 flex items-center justify-between rounded-lg bg-nile/[0.04] px-3 py-2 text-xs">
            <span className="font-semibold text-nile">{t.statusPearls}</span>
            <span className="text-slatey">{t.bonus}</span>
          </div>

          <ul className="flex flex-1 flex-col gap-2 p-6 pt-4">
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
