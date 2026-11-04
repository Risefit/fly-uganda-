import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * FLY UGANDA brand primitives.
 *
 * THE MARK is the artwork Phil supplied (v1.3): public/brand/logo.png — gold
 * over red over green wing, navy Montserrat-style wordmark, "UGANDA TO AFRICA
 * AND BEYOND" between gold rules. It is used as supplied, never redrawn or
 * recoloured. public/brand/ribbon.png is the wing cut out of the same file.
 * Brand colours are sampled from it: navy #001230, gold #FCBA00, red #EC0010,
 * green #005A30.
 */

const STRAND: Record<"growth" | "opportunity" | "energy" | "heritage", string> = {
  growth: "#005A30",
  opportunity: "#FCBA00",
  energy: "#EC0010",
  heritage: "#001230",
};

/**
 * The ribbon on its own — the wing from the supplied artwork, as a cut-out
 * raster (public/brand/ribbon.png). Decorative on heroes and cards.
 */
export function Ribbon({
  className,
  title = "Fly Uganda",
  decorative = false,
}: {
  className?: string;
  mono?: string;
  title?: string;
  decorative?: boolean;
}) {
  return (
    <Image
      src="/brand/ribbon.png"
      alt={decorative ? "" : title}
      width={656}
      height={177}
      aria-hidden={decorative || undefined}
      className={cn("h-10 w-auto", className)}
    />
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
 * The full lockup — the artwork exactly as supplied (public/brand/logo.png,
 * 1375×380, transparent). It carries a navy wordmark, so it belongs on light
 * grounds; `tone="dark"` places it on a cream plate rather than recolouring it.
 */
export function Logo({
  className,
  tone = "light",
  title = "Fly Uganda",
  priority = false,
}: {
  className?: string;
  tone?: "light" | "dark";
  tagline?: boolean;
  title?: string;
  priority?: boolean;
}) {
  const img = (
    <Image
      src="/brand/logo.png"
      alt={title}
      width={1375}
      height={380}
      priority={priority}
      className={cn("h-12 w-auto", className)}
    />
  );
  if (tone === "dark") {
    return <span className="inline-block rounded-xl bg-cream px-4 py-3">{img}</span>;
  }
  return img;
}

/** Exposed so layouts can reserve the right aspect ratio. */
export const LOGO_ASPECT = { logo: 1375 / 380, ribbon: 656 / 177 };

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
