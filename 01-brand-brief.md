# Brand brief — Fly Uganda

**Modern Pan-African.** Contemporary and premium, proudly African, connected and global,
ambitious and growth-focused, warm and welcoming.

Version 2.0 · November 2026 · supersedes the v1.0 "Pearl" brief. Built from the Brand
Identity Toolkit (Concept 6) with two deliberate departures, noted in §7.

---

## 1. Positioning

Fly Uganda is **Uganda's domestic airline**: scheduled, ticketed flights from Kajjansi
Airfield across the country — district towns, the Albertine, Karamoja and the national
parks — flown under the Kampala Executive Aviation Air Operator Certificate. It sells
seats, not aircraft: published fares, e-tickets, and a reservation system built for
interline and codeshare with other airlines. There is no charter product on the site.

**Tone (v1.2).** The site reads as a domestic airline for the country — people flying for
work, family, trade and projects as well as visitors. Safari language is allowed where the
place is a park (Kidepo, and the Bwindi side of Kihihi and Kisoro) and nowhere else: the hero, the network, the
fleet, cargo, about and the metadata are airline copy. Town strips (Kihihi, Kisoro, Kasese,
Bugungu) lead with the town and the district, then the park.

The commercial wedge is **Kajjansi** — the Kampala side of Entebbe, roughly thirty minutes
off the transfer at each end of the day, with no international terminal to clear. Every
piece of copy on the site can lean on that difference, and most of it does.

**Voice.** Plain, specific, and operator-confident. We quote block times, weights and
baggage limits because the people booking us care about them. The landscape does the
"breathtaking"; we do the flying.

**What we do not say.** *National airline* and *flag carrier*. Uganda Airlines is the
state-owned flag carrier; the claim is not ours to make and would read as a provocation in
a small market. The toolkit uses the phrase; the public site does not.

---

## 2. The mark — "The Ribbon"

Four strands of the identity — Growth, Opportunity, Energy, Heritage — caught in a
tailwind: thick at the left, rising through a gentle S, tapering to a flick above the
wordmark. The wordmark is **Montserrat Bold Italic**.

**How it is built.** The ribbon is generated from Bézier geometry (`logo/build.js`), not
traced. The wordmark and tagline are shaped with HarfBuzz and converted to outlines, so
**no logo file depends on a font being installed anywhere**. A logo that reflows because a
font is missing is not a logo.

**Package** (`public/brand/`):

| File | Use |
|---|---|
| `fly-uganda-primary.svg` | Horizontal lockup with tagline, on light |
| `fly-uganda-reversed.svg` | Same, on Aviation navy |
| `fly-uganda-stacked.svg` | Centred lockup for square formats |
| `fly-uganda-mono-black.svg` / `-mono-white.svg` | Single-colour, for print and embroidery |
| `fly-uganda-icon.svg` | The ribbon alone on navy — app icon, favicon, avatar |
| `png/` | Raster set for places that refuse vector: 2000px lockups, 512/192/180/32 icons |
| `../og-image.png` | 1200×630 social-share card |

In code: `Logo`, `Ribbon`, `Chip` and `RibbonBand` in `components/brand.tsx`, drawing from
the generated `components/brand-paths.ts`. **Edit the generator, never the paths.**

**Rules.** Minimum height 24 px on screen for the full lockup; below that use the icon.
Clear space one ribbon-height on all sides. Never rotate, recolour or re-order the strands.
Never set the wordmark in live text.

---

## 3. Palette

Six brand colours from the toolkit, plus the text-safe derivatives the toolkit does not
define. **Three of the six are not legible as text on cream** and exist only as fills —
the table says which. Every pair the UI uses is WCAG AA; `npm run contrast` re-checks.

| Token | Hex | Name | Use |
|---|---|---|---|
| `cream` | `#F6E9DB` | Warm Neutral | Page ground |
| `white` / `warm` | `#FFFCF5` | — | Cards and panels |
| `aviation` | `#0B1F3B` | Aviation | Nav, footer, dark panels, **body text** |
| `aviation-700` / `-500` | `#122B4E` / `#1A3862` | — | Layered dark tones |
| `aviation-100` | `#E4E8EF` | — | Light navy tint fill |
| `opportunity` | `#FFA400` | Opportunity | **Primary CTA fill**, accents on dark. *Not text on light* (1.67:1) |
| `opportunity-300` | `#FFC861` | — | Light amber on dark |
| `opportunity-700` | `#8A5600` | — | Amber **text** on light (5.16:1) — kickers, links |
| `energy` | `#D71920` | Energy | Ribbon strand, decorative fills. *Not text on light* (4.35:1) |
| `energy-700` | `#C2151C` | — | Red text on light; red block with a label |
| `energy-300` | `#FF6B70` | — | Red on dark |
| `heritage` | `#7A0019` | Heritage | Ribbon strand; safe as text (9.56:1) |
| `growth` | `#006B4F` | Growth | Ribbon strand; confirmations; safe as text (5.47:1) |
| `growth-300` | `#4FBF95` | — | Green on dark |
| `connection` | `#007CBA` | Connection | Map lines, partner marks. *Not text on light* (3.83:1) |
| `connection-700` | `#006A9F` | — | Blue text on light |
| `connection-300` | `#5FB9E8` | — | Blue on dark |
| `muted` | `#5C5244` | — | Secondary text (6.41:1 on cream) |

**The Warm Neutral hex.** The toolkit prints `#F6E90B`, which is a bright yellow. The
swatch is cream, and a yellow there would collide with Opportunity. `#F6E9DB` is used,
as agreed.

**The call to action** is always Opportunity amber with an Aviation label (8.29:1), as a
pill. One per view.

---

## 4. Typography

| Role | Face | Weights |
|---|---|---|
| Display, headings, UI labels, the wordmark | **Montserrat** (variable) | Bold for headings — set globally; SemiBold for labels |
| Body copy | **Source Sans 3** (variable) | Regular; SemiBold for emphasis |

Both are **self-hosted** from `app/fonts/*.woff2` via `next/font/local`. Headings are
Montserrat Bold by a base rule in `globals.css` so no page can drift to a lighter cut.

**Two traps, both hit during this build and now documented in the handover:**

1. Never declare `--font-display` or `--font-body` in a `:root` block. next/font sets them
   on `<html>` via a class; a `:root` fallback lands later in the cascade and silently
   overrides the real font on every page.
2. `"Source Sans 3"` must carry its own quotes inside the Tailwind config string. An
   unquoted family name ending in a digit is invalid CSS and voids the entire
   `font-family` rule.

---

## 5. Devices

| Device | What it is | Where |
|---|---|---|
| **The Ribbon Band** | The four strands as a 4px bar. Footer top. | `RibbonBand`, `.ribbon-band` |
| **The Rule** | A single thin amber line. The quiet divider. | `Rule`, `.rule` |
| **The Kicker** | Rule + Montserrat SemiBold caps in deep amber. Every section eyebrow. | `Kicker`, `.kicker` |
| **The Chip** | A three-strand mini-ribbon in currentColor. Bullets and list marks. | `Chip` |
| **Webale** | Luganda for *thank you*. The welcome word, header and footer. | `Webale` |

The toolkit's pattern and motif panel (woven stripes; Air / Connection / Culture /
Progress icons) is **not yet built**. The ribbon carries the identity on the site for now;
the pattern is the natural next asset for environmental and print work.

---

## 6. Imagery

The toolkit's image style is photographic: portraiture, misty green highlands, golden
light. The site currently runs on **brand-built SVG scene plates** in `public/scenes/` —
green ridges under a cream-to-gold sky, with Aviation navy at the top of the golden-hour
plates. They are intentionally illustrative so no one mistakes them for photography, and
they are placeholders. See the handover §6 for the swap order.

**No purple dusk.** The toolkit's dusk skyline was explicitly excluded; the golden-hour
plates use navy → amber instead.

---

## 7. Departures from the toolkit

| Toolkit | Site | Why |
|---|---|---|
| "Uganda's national airline" | "Uganda's domestic airline" | Uganda Airlines is the flag carrier — §1 |
| "safari airline", "bush flights", "charter" | "domestic airline", "domestic flights", (nothing — no charter product) | Positioning, v1.2 — §1 |
| "Uganda to Africa and Beyond" | Dropped | Contradicts a Kajjansi park network; the product did not change, only the look |
| Entebbe International on stationery | Kajjansi on everything | The base is Kajjansi |
| ATR-class livery | Grand Caravan | The fleet |
| Warm Neutral `#F6E90B` | `#F6E9DB` | Printed hex reads as yellow; swatch is cream |
| Purple dusk skyline | Navy → amber golden hour | Excluded by instruction |
