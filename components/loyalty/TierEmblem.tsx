/**
 * Pearl Club tier emblem: a strand of one to four pearls on a tinted roundel.
 * The number of pearls is the tier, so the mark reads at a glance and scales
 * from a 16 px list bullet to a 120 px hero without a bird silhouette to get
 * wrong. Pearls are rendered with a soft radial highlight in the tier accent.
 */
export function TierEmblem({
  tier,
  accent,
  className,
}: {
  tier: 1 | 2 | 3 | 4 | number;
  accent: string;
  className?: string;
}) {
  const n = Math.min(4, Math.max(1, tier));
  // Pearl centres for 1–4 pearls, laid out as a short strand that curves up
  // to the right — the same gesture as the brand ribbon.
  const layouts: Record<number, [number, number, number][]> = {
    1: [[32, 32, 13]],
    2: [[24, 36, 11], [41, 28, 11]],
    3: [[19, 38, 9.5], [32, 31, 9.5], [45, 25, 9.5]],
    4: [[16, 40, 8.5], [27, 34, 8.5], [38, 28, 8.5], [49, 22, 8.5]],
  };
  const id = `pearl-${n}-${accent.replace("#", "")}`;
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="35%" cy="30%" r="70%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.45" stopColor="#f6e9db" />
          <stop offset="1" stopColor={accent} />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="32" fill={accent} opacity="0.1" />
      {n > 1 && (
        <path
          d={layouts[n].map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ")}
          fill="none"
          stroke={accent}
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      )}
      {layouts[n].map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y + 1.5} r={r} fill={accent} opacity="0.18" />
          <circle cx={x} cy={y} r={r} fill={`url(#${id})`} stroke={accent} strokeOpacity="0.55" strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}
