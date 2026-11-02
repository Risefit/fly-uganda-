import type { TierKey } from "@/lib/loyalty";
import { cn } from "@/lib/utils";

/**
 * Minimal stylised silhouettes of the four Birds of Uganda used as Pearl Club
 * tier emblems. Filled with currentColor so each tier can tint its own accent.
 */
export function BirdMark({
  tier,
  className,
}: {
  tier: TierKey;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-8 w-8", className)}
      role="img"
      aria-hidden="true"
      fill="currentColor"
      stroke="currentColor"
    >
      {SHAPES[tier]}
    </svg>
  );
}

const SHAPES: Record<TierKey, React.ReactNode> = {
  // Kingfisher — compact body, oversized straight bill, stubby tail
  kingfisher: (
    <g>
      <ellipse cx="27" cy="36" rx="12" ry="10" strokeWidth="0" />
      <circle cx="39" cy="26" r="8" strokeWidth="0" />
      <path d="M45 23 L62 20 L45 30 Z" strokeWidth="0" />
      <path d="M16 37 L3 45 L17 45 Z" strokeWidth="0" />
      <line x1="26" y1="46" x2="26" y2="56" strokeWidth="2.6" />
      <line x1="33" y1="46" x2="33" y2="56" strokeWidth="2.6" />
    </g>
  ),
  // Great Blue Turaco — perched, crested head, long sweeping tail
  turaco: (
    <g>
      <ellipse cx="33" cy="30" rx="11" ry="13" strokeWidth="0" />
      <circle cx="40" cy="17" r="7" strokeWidth="0" />
      <path d="M46 14 L58 13 L47 20 Z" strokeWidth="0" />
      <path d="M35 11 Q38 2 46 3 Q40 6 39 12 Z" strokeWidth="0" />
      <path d="M27 40 Q20 54 11 61 Q24 56 33 43 Z" strokeWidth="0" />
      <line x1="34" y1="42" x2="34" y2="52" strokeWidth="2.4" />
    </g>
  ),
  // Shoebill — stocky body, very large hooked bill
  shoebill: (
    <g>
      <ellipse cx="26" cy="40" rx="13" ry="12" strokeWidth="0" />
      <circle cx="40" cy="26" r="9" strokeWidth="0" />
      <path d="M46 22 Q60 24 56 35 Q49 33 44 31 Z" strokeWidth="0" />
      <line x1="22" y1="51" x2="22" y2="61" strokeWidth="2.6" />
      <line x1="31" y1="51" x2="31" y2="61" strokeWidth="2.6" />
    </g>
  ),
  // Grey Crowned Crane — Uganda's national bird: long neck, radiating crest
  crane: (
    <g>
      <ellipse cx="24" cy="42" rx="12" ry="8" strokeWidth="0" />
      <path d="M27 38 C31 28 39 24 36 13 L41 13 C44 26 35 34 33 43 Z" strokeWidth="0" />
      <circle cx="39" cy="12" r="4.5" strokeWidth="0" />
      <path d="M45 11 L54 9 L45 15 Z" strokeWidth="0" />
      <line x1="36" y1="7" x2="33" y2="2" strokeWidth="1.7" />
      <line x1="39" y1="7" x2="39" y2="1" strokeWidth="1.7" />
      <line x1="42" y1="7" x2="45" y2="2" strokeWidth="1.7" />
      <line x1="20" y1="50" x2="20" y2="60" strokeWidth="2.4" />
      <line x1="28" y1="50" x2="28" y2="60" strokeWidth="2.4" />
    </g>
  ),
};
