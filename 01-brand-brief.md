# Brand brief — Fly Uganda

**"The Pearl, from above."**

Version 1.0 · November 2026 · supersedes the South Sudan Airlines "Dawn Star" brief.

---

## 1. Positioning

Fly Uganda is **Uganda's safari airline**: scheduled per-seat flights from Kajjansi
Airfield to the national parks, plus charter and cargo on the same fleet, flown under
the Kampala Executive Aviation Air Operator Certificate.

The commercial wedge is **Kajjansi**. It sits on the Kampala side of Entebbe, which is
roughly thirty minutes off the transfer at each end of the day, with no international
terminal to clear. Aerolink, the main scheduled competitor, flies from Entebbe. Every
piece of copy on the site can lean on that difference, and most of it does.

**Audience, in order of commercial weight**

1. Inbound tour operators and DMCs booking seats on behalf of clients.
2. Direct leisure travellers planning a fly-in safari.
3. Corporate, NGO and energy charter buyers (Albertine Graben, UN/NGO rotations).

**Voice.** Plain, specific, and operator-confident. We quote block times, weights and
baggage limits because the people booking us care about them. We do not write "unforgettable",
"breathtaking" or "gateway to adventure". The landscape does that work; we do the flying.

---

## 2. The mark — "The Pearl"

A sun-disc bisected by the equator, the upper half carried forward in flight.

- Uganda is one of thirteen countries the equator crosses, and Kajjansi sits almost
  exactly on it. The Pearl of Africa, seen from above.
- The straight gap **is** the equator. It is the one line in the system that never tilts.
  Do not rotate the mark, and do not let the gap close.
- The offset between the halves is motion. It is deliberate, not a registration error —
  do not "correct" it.

**Deliberately not a crested crane.** Uganda Airlines, the national flag carrier, already
owns the crane as its device. A second crane would read as derivative of the flag carrier
and would weaken the trade's ability to tell the two apart. The crane survives in the
brand only as the top Pearl Club tier.

**Where it lives:** `components/brand.tsx` (`Pearl`, `PearlMark`) and `public/brand/*.svg`.
Changing the mark means editing both.

**Clear space:** one half-disc height on all sides. **Minimum size:** 20 px tall on screen
for the gradient emblem; below that use `PearlMark`, the flat single-colour version.

---

## 3. Palette

Every pair below is WCAG AA at body size. `npm run contrast` re-checks it — run it after
any change to `theme.extend.colors`.

| Token | Hex | Name | Use |
|---|---|---|---|
| `paper` / `ivory` | `#F4F1E6` | Savannah Linen | Page background |
| `white` / `warm` | `#FFFEFA` | Papyrus White | Cards and surfaces |
| `gold` | `#D2A017` | Crane Gold | Primary accent, CTAs, the mark |
| `gold-300` | `#F0CF72` | Crest Light | Gold on dark backgrounds |
| `gold-600` | `#7A590F` | Deep Gold | Gold **text** on light (5.69:1 on paper) |
| `gold-900` | `#5E4309` | — | Deepest gold text |
| `amber` | `#B54A24` | Equator Clay | Sparing warm accent (4.68:1 on paper) |
| `amber-300` | `#E08A5F` | — | Clay on dark, large text only |
| `nile` / `nile-900` | `#07251F` | Source Green | Dark sections, footer, booking panel |
| `nile-700` | `#0D3A31` | — | Second dark tone |
| `nile-500` | `#175145` | — | Third dark tone |
| `nile-100` | `#EDE7D2` | — | Warm light fill (pair with `gold-600`) |
| `ink` | `#0F1D19` | Forest Ink | Body text |
| `slatey` | `#6B6453` | — | Secondary text |
| `success` | `#1A6B43` | — | Confirmations and credits |
| `flag` | `#1A1A1A` `#FCDC04` `#D90429` | — | **Ceremonial only** — the FlagBand, nowhere else |

`nile` is Source Green rather than a blue: the Victoria Nile rises in Uganda, which is why
the token name survived the rebrand unchanged.

**The flag rule.** Uganda's black-yellow-red is powerful and easy to cheapen. It appears
only as the six-stripe `FlagBand` at the top of the footer. It is never a background, a
button, or a text colour. Success states use `success`, not the flag's green — Uganda's
flag has no green.

---

## 4. Typography

| Role | Face | Notes |
|---|---|---|
| Display | **Fraunces** (variable, 100–900) | Headings, wordmark. Warm, high-contrast, real bold. |
| UI / body | **Archivo** (variable, 100–900) | Strong tabular figures for timetables and fare tables. |

Both are **self-hosted** from `app/fonts/*.woff2`, loaded via `next/font/local` — not
`next/font/google`. This removes a third-party round-trip on slow East African connections,
keeps the build working offline and in CI, and avoids sending visitor IPs to Google.
To change a face, drop in a new `.woff2` and keep the CSS variable name.

Fraunces has real weights, so the single-weight `.font-serif { font-weight: 400 }` guard
from the Dawn Star system has been **removed**. `font-bold` on a heading now does what
you expect.

Use `.tnum` on any column of figures that updates in place.

---

## 5. Devices

| Device | What it is | Where |
|---|---|---|
| **The Meridian** | A single thin vertical gold line. The system's only divider. | `Meridian`, `.reed` |
| **The Kicker** | Meridian + small-caps deep-gold label. Every section eyebrow. | `Kicker`, `.kicker` |
| **The Flag Band** | Six Ugandan stripes, 4 px. Footer only. | `FlagBand`, `.flag-band` |
| **Webale** | Luganda for *thank you*. The welcome word, in the header utility bar and the footer. | `Webale`, `.webale` |

The equator runs through the mark; the meridian runs through the page. That is the whole
geometric idea, and it is enough.

---

## 6. Pearl Club

The frequent flyer programme. Currency: **Pearls**. Tiers are **Birds of Uganda**:

Kingfisher → Great Blue Turaco → Shoebill → Crowned Crane

Programme data lives in `lib/loyalty.ts`; tier emblems in `components/loyalty/BirdMark.tsx`.
All thresholds and award values are illustrative until the PSS earning and spending rules
are configured — see `02-loyalty-program-design.md`.
