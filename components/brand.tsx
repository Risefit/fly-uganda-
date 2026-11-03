import { cn } from "@/lib/utils";
import {
  RIBBON,
  RIBBON_BOX,
  WORDMARK_D,
  WORDMARK_ADVANCE,
  TAGLINE_D,
  TAGLINE_ADVANCE,
} from "@/components/brand-paths";

/**
 * FLY UGANDA brand primitives — Modern Pan-African system.
 *
 * THE MARK — "The Ribbon". Four strands of the identity (Growth, Opportunity,
 * Energy, Heritage) caught in a tailwind: thick at the left, rising through a
 * gentle S, tapering to a flick above the wordmark. The wordmark is Montserrat
 * Bold Italic, outlined to paths; nothing here depends on a font at render time.
 *
 * Geometry is GENERATED — see logo/build.js. Edit the generator, not the paths.
 */

const STRAND: Record<(typeof RIBBON)[number]["colour"], string> = {
  growth: "#006B4F",
  opportunity: "#FFA400",
  energy: "#D71920",
  heritage: "#7A0019",
};

/** The ribbon on its own — decorative, for heroes, cards and the app icon. */
export function Ribbon({
  className,
  mono,
  title = "Fly Uganda",
  decorative = false,
}: {
  className?: string;
  /** Single colour (e.g. "currentColor") for monochrome contexts. */
  mono?: string;
  title?: string;
  decorative?: boolean;
}) {
  const { x, y, w, h } = RIBBON_BOX;
  return (
    <svg
      viewBox={`${x} ${y} ${w} ${h}`}
      className={cn("h-10 w-auto", className)}
      {...(decorative
        ? { "aria-hidden": true as const, focusable: false }
        : { role: "img", "aria-label": title })}
    >
      {RIBBON.map((s) => (
        <path key={s.colour} d={s.d} fill={mono ?? STRAND[s.colour]} />
      ))}
    </svg>
  );
}

/** A small three-strand chip — bullets, list marks, tier accents. currentColor. */
export function Chip({
  className,
  title = "Fly Uganda",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-4 w-4", className)}
      role="img"
      aria-label={title}
      fill="currentColor"
    >
      <path d="M2 18 C 7 11, 13 7, 22 4 L 22 7 C 14 9.5, 8.5 13, 4 20 Z" />
      <path d="M2 23 C 7 16, 13 12, 22 9 L 22 12 C 14 14.5, 8.5 18, 4 24.5 Z" opacity=".55" />
    </svg>
  );
}

/**
 * The full lockup — ribbon over the wordmark, optional tagline.
 * `tone="dark"` sets a cream wordmark for navy backgrounds.
 */
export function Logo({
  className,
  tone = "light",
  tagline = false,
  title = "Fly Uganda",
}: {
  className?: string;
  tone?: "light" | "dark";
  tagline?: boolean;
  title?: string;
}) {
  const word = tone === "light" ? "#0B1F3B" : "#FFFCF5";
  // Same proportions as public/brand/fly-uganda-primary.svg
  const CAP = 112, X = 70, BASE = 292;
  const s = CAP / 700;
  const H = tagline ? 400 : 330;
  return (
    <svg viewBox={`0 0 1180 ${H}`} className={cn("h-12 w-auto", className)} role="img" aria-label={title}>
      <g transform={`translate(${X - 6} 60) scale(0.78)`}>
        {RIBBON.map((r) => (
          <path key={r.colour} d={r.d} fill={STRAND[r.colour]} />
        ))}
      </g>
      <g transform={`translate(${X} ${BASE}) scale(${s})`} fill={word}>
        <path d={WORDMARK_D} />
      </g>
      {tagline && (
        <g>
          <rect x={X + 4} y={BASE + 65} width="46" height="3" fill="#FFA400" />
          <g transform={`translate(${X + 4 + 46 + 18} ${BASE + 73}) scale(${21 / 700})`} fill="#FFA400">
            <path d={TAGLINE_D} />
          </g>
        </g>
      )}
    </svg>
  );
}

/** Exposed so layouts can reserve the right aspect ratio. */
export const LOGO_ASPECT = { wordmark: WORDMARK_ADVANCE, tagline: TAGLINE_ADVANCE };

/** The Rule — a single thin amber line. The system's quiet divider. */
export function Rule({ className }: { className?: string }) {
  return <span className={cn("rule", className)} aria-hidden="true" />;
}

/** The Ribbon Band — the four strands as a 4px bar. Footer top, card edges. */
export function RibbonBand({ className }: { className?: string }) {
  return (
    <span className={cn("ribbon-band", className)} aria-hidden="true">
      <span style={{ background: STRAND.growth }} />
      <span style={{ background: STRAND.opportunity }} />
      <span style={{ background: STRAND.energy }} />
      <span style={{ background: STRAND.heritage }} />
    </span>
  );
}

/** Section eyebrow — the rule before a small-caps amber label. */
export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <Rule className="!h-[22px]" />
      <span className="kicker">{children}</span>
    </div>
  );
}

/**
 * The Welcome Word — "Webale" (Luganda: thank you).
 * `tone` picks a colour that clears WCAG AA on that background.
 */
export function Webale({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "webale text-sm",
        tone === "light" ? "text-opportunity-700" : "text-opportunity",
        className
      )}
    >
      Webale
    </span>
  );
}
