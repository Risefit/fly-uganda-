/**
 * WCAG contrast guard for the Fly Uganda palette.
 * Run after ANY change to theme.extend.colors in tailwind.config.ts:
 *   npm run contrast
 * Keep the P map below in step with tailwind.config.ts by hand — this file is
 * the guard, not the source of truth.
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
  cream: "#F6E9DB", warm: "#FFFCF5",
  aviation: "#0B1F3B", aviation700: "#122B4E", aviation500: "#1A3862", aviation100: "#E4E8EF",
  opportunity: "#FFA400", opportunity300: "#FFC861", opportunity700: "#8A5600", opportunity900: "#7A4D00",
  energy: "#D71920", energy300: "#FF6B70", energy700: "#C2151C",
  heritage: "#7A0019",
  growth: "#006B4F", growth300: "#4FBF95",
  connection: "#007CBA", connection300: "#5FB9E8", connection700: "#006A9F",
  ink: "#0B1F3B", muted: "#5C5244",
};

// [foreground, background, where it is used, minimum ratio]
const pairs = [
  ["ink", "cream", "body text", 4.5],
  ["ink", "warm", "body text on cards", 4.5],
  ["muted", "cream", "secondary text", 4.5],
  ["muted", "warm", "secondary text on cards", 4.5],
  ["opportunity700", "cream", "kicker / links on cream", 4.5],
  ["opportunity700", "warm", "links on cards", 4.5],
  ["opportunity700", "aviation100", "text on navy tint fill", 4.5],
  ["energy700", "cream", "red text on cream", 4.5],
  ["energy700", "warm", "red text on cards", 4.5],
  ["heritage", "cream", "heritage text", 4.5],
  ["growth", "cream", "growth / confirmation text", 4.5],
  ["connection700", "cream", "partner links", 4.5],
  // on dark
  ["cream", "aviation", "body on navy", 4.5],
  ["cream", "aviation700", "body on navy-700", 4.5],
  ["cream", "aviation500", "body on navy-500", 4.5],
  ["opportunity", "aviation", "amber on navy", 4.5],
  ["opportunity300", "aviation", "light amber on navy", 4.5],
  ["growth300", "aviation", "green on navy", 4.5],
  ["connection300", "aviation", "blue on navy", 4.5],
  ["energy300", "aviation", "red on navy", 4.5],
  // the call to action
  ["aviation", "opportunity", "CTA label on amber fill", 4.5],
  ["aviation", "opportunity300", "CTA label on light amber", 4.5],
  ["cream", "energy700", "label on red fill (use energy-700, not energy)", 4.5],
  ["cream", "heritage", "label on heritage fill", 4.5],
  ["cream", "growth", "label on green fill", 4.5],
];

let fail = 0;
for (const [a, b, label, min] of pairs) {
  const r = R(P[a], P[b]);
  const ok = r >= min;
  if (!ok) fail++;
  console.log(`${ok ? "AA   " : "FAIL "} ${r.toFixed(2).padStart(5)}:1 (min ${min})  ${a} on ${b} — ${label}`);
}

// Brand colours that must never be used as body text on light
console.log("\nFill-only brand colours (documented, not failures):");
for (const [n, h] of [["opportunity", P.opportunity], ["energy", P.energy], ["connection", P.connection]])
  console.log(`  ${n.padEnd(12)} ${R(h, P.cream).toFixed(2)}:1 on cream — decorative fills only (pattern strands, rules, bars).\n               For a filled block carrying a label, use ${n}-700.`);

console.log(`\n${fail} pair(s) failing.`);
process.exit(fail ? 1 : 0);
