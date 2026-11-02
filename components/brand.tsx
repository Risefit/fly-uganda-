import { cn } from "@/lib/utils";

/**
 * FLY UGANDA brand primitives.
 *
 * THE MARK — "The Pearl". A sun-disc bisected by the equator, the upper half
 * carried forward in flight. Uganda is one of thirteen countries the equator
 * crosses, and Kajjansi sits almost exactly on it; the Pearl of Africa, seen
 * from above. The straight gap is the equator and must stay dead horizontal —
 * it is the one line in the system that never tilts.
 *
 * Deliberately NOT a crested crane: Uganda Airlines, the flag carrier, already
 * owns that device, and a second crane would read as derivative.
 *
 * Replacing the mark means editing THIS FILE plus public/brand/*.svg.
 */
export function Pearl({
  className,
  title = "Fly Uganda",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="-100 -92 200 184"
      className={cn("h-10 w-auto", className)}
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id="fuPearlLight" x1="0" y1="0" x2="0.75" y2="1">
          <stop offset="0" stopColor="#F2D484" />
          <stop offset="1" stopColor="#D2A017" />
        </linearGradient>
        <linearGradient id="fuPearlDeep" x1="0" y1="0" x2="0.75" y2="1">
          <stop offset="0" stopColor="#C79317" />
          <stop offset="1" stopColor="#8A6512" />
        </linearGradient>
        <clipPath id="fuAboveEquator">
          <rect x="-120" y="-120" width="240" height="111" />
        </clipPath>
        <clipPath id="fuBelowEquator">
          <rect x="-120" y="9" width="240" height="120" />
        </clipPath>
      </defs>
      {/* Northern half, carried forward */}
      <g clipPath="url(#fuAboveEquator)">
        <circle cx="12" cy="0" r="76" fill="url(#fuPearlLight)" />
      </g>
      {/* Southern half */}
      <g clipPath="url(#fuBelowEquator)">
        <circle cx="-12" cy="0" r="76" fill="url(#fuPearlDeep)" />
      </g>
    </svg>
  );
}

/**
 * Flat single-colour Pearl — for small sizes, bullets and icons. Inherits
 * currentColor, so it takes the colour of whatever it sits in.
 */
export function PearlMark({
  className,
  title = "Fly Uganda",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="-100 -92 200 184"
      className={cn("h-4 w-4", className)}
      role="img"
      aria-label={title}
      fill="currentColor"
    >
      <path d="M88 -9 A 76 76 0 0 0 -64 -9 Z" />
      <path d="M-88 9 A 76 76 0 0 0 64 9 Z" />
    </svg>
  );
}

/**
 * The Meridian — a single thin vertical gold line. The system's only divider.
 * The equator runs through the mark; the meridian runs through the page.
 */
export function Meridian({ className }: { className?: string }) {
  return <span className={cn("reed", className)} aria-hidden="true" />;
}

/** Ugandan flag band — black · yellow · red · black · yellow · red. */
export function FlagBand({ className }: { className?: string }) {
  return (
    <span className={cn("flag-band", className)} aria-hidden="true">
      <span style={{ background: "#1A1A1A" }} />
      <span style={{ background: "#FCDC04" }} />
      <span style={{ background: "#D90429" }} />
      <span style={{ background: "#1A1A1A" }} />
      <span style={{ background: "#FCDC04" }} />
      <span style={{ background: "#D90429" }} />
    </span>
  );
}

/** Section eyebrow — the meridian line before a small-caps gold label. */
export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <Meridian className="!h-[26px]" />
      <span className="kicker">{children}</span>
    </div>
  );
}

/** The Welcome Word — "Webale" (Luganda: thank you). Easily replaceable. */
export function Webale({ className }: { className?: string }) {
  return <span className={cn("webale text-sm", className)}>Webale</span>;
}

/** Wordmark lockup — Pearl + Fraunces name + Archivo descriptor. */
export function Wordmark({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Pearl className="h-8 w-auto" />
      <span className="leading-none">
        <span
          className={cn(
            "block font-serif text-[1.05rem] font-semibold tracking-[0.11em]",
            tone === "light" ? "text-ink" : "text-warm"
          )}
        >
          FLY UGANDA
        </span>
        <span
          className={cn(
            "mt-1 block font-sans text-[0.5rem] font-semibold uppercase tracking-[0.34em]",
            tone === "light" ? "text-gold-600" : "text-gold-300"
          )}
        >
          Safari Airline
        </span>
      </span>
    </span>
  );
}
