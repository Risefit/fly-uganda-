/**
 * Catches Tailwind utilities that silently compile to nothing.
 *
 * Opacity modifiers outside Tailwind's standard scale (e.g. `bg-nile/12`,
 * `from-nile-900/88`) produce NO CSS and NO build error — the element just
 * renders with no background. So do colour utilities naming a token that was
 * renamed or removed in tailwind.config.ts.
 *
 * Run AFTER `npm run build`:  npm run audit:classes
 * Exits non-zero if anything used in app/ or components/ is missing from the
 * compiled stylesheet.
 */
const fs = require("fs");
const path = require("path");

const cssDir = path.join(".next", "static", "css");
if (!fs.existsSync(cssDir)) {
  console.error("No compiled CSS found. Run `npm run build` first.");
  process.exit(2);
}
const css = fs
  .readdirSync(cssDir)
  .filter((f) => f.endsWith(".css"))
  .map((f) => fs.readFileSync(path.join(cssDir, f), "utf8"))
  .join("\n");

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (p.endsWith(".tsx") || p.endsWith(".ts")) out.push(p);
  }
  return out;
}

const files = [...walk("app"), ...walk("components")];
const sources = new Map(files.map((f) => [f, fs.readFileSync(f, "utf8")]));
const all = [...sources.values()].join("\n");

const PREFIX = "(?:from|via|to|bg|text|border|ring|divide|fill|stroke|shadow|outline|accent|caret)";
// 1. opacity modifiers: bg-gold/15, from-nile-900/88 …
const withAlpha = new Set(all.match(new RegExp(`\\b${PREFIX}-[a-z0-9-]+/\\d{1,3}\\b`, "g")) || []);
// 2. plain colour utilities naming a project token
const TOKENS = "(?:cream|paper|warm|aviation|opportunity|energy|heritage|growth|connection|ink|muted|slatey|flag-[a-z]+)";
const plain = new Set(all.match(new RegExp(`\\b${PREFIX}-${TOKENS}(?:-\\d{2,3})?\\b`, "g")) || []);

const missing = [];
for (const cls of [...withAlpha, ...plain]) {
  // escaped form as Tailwind emits it; substring match also covers hover:/lg: variants
  if (!css.includes(cls.replace(/\//g, "\\/"))) missing.push(cls);
}

if (!missing.length) {
  console.log(`✓ ${withAlpha.size + plain.size} colour utilities checked — all present in the compiled CSS.`);
  process.exit(0);
}

console.error(`✗ ${missing.length} utility class(es) used in source but ABSENT from the compiled CSS:\n`);
for (const cls of missing.sort()) {
  const where = [...sources.entries()]
    .filter(([, t]) => t.includes(cls))
    .map(([f, t]) => `${f}:${t.split("\n").findIndex((l) => l.includes(cls)) + 1}`);
  console.error(`  ${cls.padEnd(24)} ${where.join(", ")}`);
}
console.error(
  "\nUsually an opacity value outside Tailwind's scale (use bracket notation,\n" +
    "e.g. from-nile-900/[0.88]) or a colour token that no longer exists."
);
process.exit(1);
