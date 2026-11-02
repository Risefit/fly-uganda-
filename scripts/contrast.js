/**
 * WCAG contrast check for the Fly Uganda palette.
 * Run after ANY change to theme.extend.colors in tailwind.config.ts:
 *   node scripts/contrast.js
 * Keep the palette in sync with tailwind.config.ts by hand — this file is the
 * guard, not the source of truth.
 */
const L = (h) => {
  const c = [1, 3, 5]
    .map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const R = (a, b) => {
  const x = L(a), y = L(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

const P = {
  paper: "#F4F1E6", warm: "#FFFEFA",
  gold: "#D2A017", gold300: "#F0CF72", gold600: "#7A590F", gold900: "#5E4309",
  amber: "#B54A24", amber300: "#E08A5F",
  nile: "#07251F", nile700: "#0D3A31", nile500: "#175145", nile100: "#EDE7D2",
  ink: "#0F1D19", slatey: "#6B6453",
};

// [foreground, background, where it is used, minimum required ratio]
const pairs = [
  ["ink", "paper", "body text", 4.5],
  ["ink", "warm", "body text on cards", 4.5],
  ["slatey", "paper", "muted/secondary text", 4.5],
  ["slatey", "warm", "muted text on cards", 4.5],
  ["gold600", "paper", "kicker / eyebrow / links", 4.5],
  ["gold600", "warm", "links on cards", 4.5],
  ["gold600", "nile100", "text on warm light fill", 4.5],
  ["gold900", "paper", "deep gold text", 4.5],
  ["amber", "paper", "clay accent text", 4.5],
  ["amber", "warm", "clay accent on cards", 4.5],
  ["gold300", "nile", "gold text on dark", 4.5],
  ["gold", "nile", "solid gold on dark", 4.5],
  ["paper", "nile", "footer / dark-panel body", 4.5],
  ["paper", "nile700", "text on nile-700", 4.5],
  ["paper", "nile500", "text on nile-500", 4.5],
  ["nile", "gold", "CTA label on gold fill", 4.5],
  ["nile", "gold300", "CTA label on light gold", 4.5],
  ["amber300", "nile", "clay accent on dark (large only)", 3],
];

let fail = 0;
for (const [a, b, label, min] of pairs) {
  const r = R(P[a], P[b]);
  const ok = r >= min;
  if (!ok) fail++;
  const tag = ok ? (min === 3 ? "AA-lg" : "AA   ") : "FAIL ";
  console.log(`${tag} ${r.toFixed(2).padStart(5)}:1 (min ${min})  ${a} on ${b} — ${label}`);
}
console.log(`\n${fail} pair(s) failing.`);
process.exit(fail ? 1 : 0);
