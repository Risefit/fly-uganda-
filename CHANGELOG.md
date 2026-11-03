# Changelog

Format: `vMAJOR.MINOR.PATCH`.

## v1.2.3 — November 2026

- **Backgrounds moved to the Zulia concession-page scheme:** page ground is bone
  `#F4EFE6` (`cream` token; was `#F6E9DB`), dark bands are warm charcoal **graphite**
  `#2A2824` with the contour texture over them at 40% in kopje brown (`.band-dark`),
  header, footer, mobile menu, Pearl Club teaser and every dark panel included.
  Navy (`aviation`) stays for text, the logo wordmark, links and the map. `themeColor`
  now graphite. Contrast guard extended for graphite and sand pairs — all pass.

## v1.2.2 — November 2026

- **ICAO codes everywhere.** Every airport is now its ICAO location indicator (HUKJ, HUKH,
  HUKI, HUKS, HUKF, HUGG, HUAR, HUGU, HUMO, HUKD, HUEN); IATA codes kept in
  `Airport.iata` for the PSS feed. Route URLs change accordingly (`/routes/hukh`).
  **HUKH (Kihihi) and HUKF (Hoima) are working designators to confirm with UCAA.**
- **Pearl Club tier cards:** rows now align across the four cards (fixed-height header,
  tagline and qualification box; qualification box is two stacked cells). Bird
  silhouettes replaced by a **pearl-strand emblem** — one to four pearls per tier — used
  on the ladder, the homepage teaser and the member card.
- **Search widget:** swap button sits on the From/To divider with clear space either
  side; selects shrink properly on mobile.

## v1.2.1 — November 2026

- **Network:** Mweya and Pakuba withdrawn; **Hoima (Kabalega International, HUKF)**,
  **Arua (HUAR)**, **Gulu (HUGU)** and **Moroto (HUMO)** added — ten destinations. Arua and
  Gulu timetabled on the 1900D; map, geo, schedule, guides and copy updated.
- **Fares removed from the site.** No "from USD" anywhere; the fare tiles on /book,
  /routes, the route pages and the map panel are gone (the map and route pages show the
  aircraft type instead). `FARES` stays in `lib/data.ts`, unused, for when a published
  fare sheet is signed off.
- **/book layout:** booking widget spans the page; "Already booked?" is a single row
  beneath it.
- Placeholder plates for Hoima, Arua and Gulu (`public/scenes/{hukf,huar,hugu}.svg`);
  Moroto uses the Karamoja aerial. Real photography needed for all four — handover §6.

## v1.2.0 — November 2026

- **Positioning: Uganda's domestic airline.** Tagline regenerated; safari/bush language
  confined to the park strips' guide copy; charter removed everywhere (data, fleet card,
  promises, loyalty FAQ, cargo page, oil-corridor map); cargo repositioned as belly
  freight on scheduled flights; new "How we sell" section (direct, agents, interline &
  codeshare). Town strips now lead with the town and district.
- **Fleet:** Cessna 208EX Grand Caravan and Beechcraft 1900D only, with KEA's own
  photography from flykea.com.
- **Interactive network map** on the homepage and /routes: accurate geography
  (world-atlas + Natural Earth), Africa → Uganda zoom, routes growing at the speed they
  fly, click-through flight details and timetable beside the map, contour backdrop.
- **Hero** now the Karamoja aerial (low-res placeholder pending the original).
- Both `FARES` keys renamed (`oneWay`, `return`); `OilCorridorMap` deleted.

## v1.1.1 — November 2026

- **Destination photography.** Nine licensed Unsplash photos, one per strip, verified
  against each photo's own location metadata. Served via Unsplash's CDN through
  `next/image`; credited on each destination page. `lib/photos.ts` resolves them, and a
  file dropped into `public/photos/<code>.jpg` overrides the stock photo with no code
  change — the slot for KEA's own aerials.
- "Bush flights" → "domestic flights" throughout; "bush strips" → "park airstrips".

## v1.1.0 — November 2026

Visual refresh to the **Brand Identity Toolkit (Concept 6 — Modern Pan-African)**. The
product did not change: Kajjansi, the park network, the Caravan fleet and the Pearl Club
are as before. The look did.

### Identity
- **The Ribbon** replaces the Pearl. Four strands — Growth, Opportunity, Energy, Heritage —
  generated from Bézier geometry; wordmark in Montserrat Bold Italic and tagline outlined
  via HarfBuzz, so no logo file depends on a font. Six SVG lockups, a PNG set and a
  1200×630 social card, all from one generator (`logo/build.js`).
- Palette: Aviation navy, Opportunity amber, Energy red, Heritage maroon, Growth green,
  Connection blue, on Warm Neutral cream — with text-safe `-700` derivatives the toolkit
  did not define. Every pair AA; the three fill-only brand colours are documented as such.
- Type: Montserrat (display, headings bold by base rule) + Source Sans 3 (body),
  self-hosted. Pearl Club tier accents re-mapped to the brand colours.
- Scene plates regenerated in the new palette; golden hour is navy → amber, no purple.

### Layout
- Header is the toolkit's navy bar: logo, nav, search, Sign-in pill, amber Book pill.
- Hero: headline, body, amber CTA and ghost secondary. Flight search moved to `/book`.
- New **QuickActions** bar (Book / Manage / Check-in / Flight status) under the hero and
  **FeatureTiles** (Destinations / Experience / About / Sustainability) after it.
- New pages: **Sustainability** and **Flight status** (the latter renders the published
  timetable and says so — no live feed yet).

### Deliberately not taken from the toolkit
- "Uganda's national airline" — Uganda Airlines is the flag carrier; the site says
  "Uganda's safari airline".
- "Uganda to Africa and Beyond" — contradicts a Kajjansi park network.
- Warm Neutral `#F6E90B` read as the cream swatch, `#F6E9DB`.
- The purple dusk skyline.

### Fixed
- **Self-hosted fonts were never loading.** A `:root { --font-body … }` fallback in
  `globals.css`, inherited from the SSA fork, sat later in the cascade than next/font's
  variable and overrode it on every page. Removed; fallbacks live in `tailwind.config.ts`.
- **Body text fell back to Times New Roman** after the switch: Tailwind emits `Source Sans 3`
  unquoted, which is invalid CSS (the `3`) and voided the whole `font-family` rule. Quoted.
- A `Pearl → Ribbon` identifier rename briefly turned "Pearl Club" into "Ribbon Club" in
  copy; restored.
- Cargo tariff tiles overflowed at 390px once headings went bold; they now stack.
- `audit:classes` token list updated to the new palette (it had silently been checking the
  old names).

Verified: axe-core clean on all 21 pages, no horizontal overflow at 390/768/1024/1360,
all 38 internal links resolve, no console errors, both fonts confirmed loaded in-browser.

## v1.0.0 — November 2026

First release. Forked from the South Sudan Airlines codebase and rebranded end to end
for Fly Uganda.

### Identity
- New mark: **"The Pearl"** — a sun-disc bisected by the equator, upper half carried
  forward in flight. Replaces the Dawn Star. Deliberately not a crested crane, which
  Uganda Airlines already owns as the flag carrier's device.
- New palette: Crane Gold on Source Green over Savannah Linen. Every foreground/background
  pair verified at WCAG AA (`npm run contrast`).
- New type pairing: Fraunces (display) + Archivo (UI), both self-hosted variable fonts.
- New devices: the Meridian divider (replaces the Elder's Staff), *Webale* as the welcome
  word (replaces *Salamat*), and Uganda's six-stripe flag band.
- Full brand asset set regenerated: emblem, mono symbol, badge, two lockups, wordmark,
  favicon.

### Content & network
- Hub moved from Juba to **Kajjansi (HUKJ)**; eight scheduled strips (Kihihi, Kisoro,
  Mweya, Kasese, Pakuba, Bugungu, Kidepo, Entebbe) with real IATA/ICAO identifiers.
- Route maps rebuilt on **real Uganda geography** — airstrip positions projected from
  actual coordinates, with the national outline, Lakes Victoria, Kyoga, Albert and
  Edward, and the Nile from Jinja to the Albert Nile.
- Fleet rewritten for the KEA fleet: Grand Caravan, Beechcraft 1900D, Cessna 206/210,
  and H125/H130 with Elevate.
- Cargo repositioned from the Upper Nile oil corridor to the **Albertine Graben**.
- Loyalty: White Nile Club → **Pearl Club**; Nile Miles → Pearls; Birds of the Sudd →
  Birds of Uganda (Kingfisher, Great Blue Turaco, Shoebill, Crowned Crane).
- Travel information rewritten for domestic flying — 15 kg soft-bag limits, passenger weights,
  weather- and surface-dependent departures.
- i18n placeholder switched from Arabic (`/ar`) to French (`/fr`).

### Fixed (inherited from the fork)
- **Hero scrim never rendered.** `from-nile-900/85` used an opacity value outside
  Tailwind's scale, which compiles to no CSS at all — the white headline had been sitting
  on a pale sky. Rebuilt with bracket notation and verified by measuring rendered pixel
  contrast at mobile and desktop widths.
- **Next.js 14.2.5 → 14.2.35**, clearing a published security advisory on the same minor.
- **Build no longer requires Google Fonts.** Fonts are self-hosted via `next/font/local`,
  so the project builds offline and in CI, loses a third-party round-trip on slow
  connections, and stops sending visitor IPs to Google.
- `flag-green` success states replaced with a semantic `success` token — Uganda's flag
  has no green, and flag colours are ceremonial only.
- Search-widget swap control no longer overlaps the destination field.
- Hard-coded `USD 190` fare removed from the search widget; it now reads from `FARES`.

### Fixed after independent review
- **Mobile navigation was invisible.** The header's `backdrop-filter` made it the
  containing block for the `position: fixed` overlay, collapsing the menu to 0px while
  still locking body scroll — tapping the hamburger froze the page with no navigation.
  Escape now closes the menu too.
- **South Sudan dialling code `+211`** was still live in three places, including a
  `tel:` link on `/contact` whose visible label read `+256`.
- **Careers and cargo pages still claimed national flag-carrier status** ("build the
  national flag carrier", "the pride of a new nation", "the nation's freight") —
  contradicting the brand brief and misstating Fly Uganda's position against Uganda
  Airlines.
- `/book` overflowed horizontally by up to 314px between 768 and 1023px.
- `/routes/huen` linked to a non-existent `/destinations/entebbe` (the site's only 404),
  quoted a USD 290 park fare for a 15-minute connection, and rendered an empty timetable.
- `hreflang` advertised `/en`, which does not exist; `/fr` was missing from the sitemap.
- "Miles" still surfaced to users in the account CTA and the Pearl Club meta description.
- The member dashboard hardcoded an 80,000 tier threshold against the published 60,000;
  thresholds now derive from `lib/loyalty.ts`. Sample member identity de-branded.
- Cargo page advertised a Bell 412, which is not in `FLEET`.
- Seven WCAG AA contrast failures on rendered text, including the footer greeting at
  2.52:1 — `.webale` hardcoded a light-background gold while being used on dark.
- Desktop "Where we fly" dropdown was hover-only and unreachable by keyboard.
- Skip link targeted `#main`, which `/fr` and the 404 page did not define.
- Footer column headings were `<h3>` with no `<h2>` above them, skipping a heading level
  on four pages.
- SVG map labels rendered at ~6.6px on a 390px screen; cargo map labels collided.
- Partner markers were mis-plotted (Nairobi west of the Masai Mara) and Zanzibar was
  named in the caption but never drawn.
- Scene plates depicted a swept-wing jet while the alt text claimed a Grand Caravan;
  redrawn as a high-wing single-engine turboprop.
- Removed the unverifiable "two pilots up front" service promise, corrected the H130
  seat count, and corrected the Hoima flight time.
- Code comments still said "The Crested Crane", `WhiteNileClubPage`, and "Unsplash
  placeholders" (the plates are first-party, with no stock licence involved).

### Added
- `npm run contrast` — WCAG AA guard on the palette.
- `npm run audit:classes` — catches Tailwind utilities that silently compile to nothing.
