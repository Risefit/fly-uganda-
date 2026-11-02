# Changelog

Format: `vMAJOR.MINOR.PATCH`.

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
- Travel information rewritten for bush flying — 15 kg soft-bag limits, passenger weights,
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

### Added
- `npm run contrast` — WCAG AA guard on the palette.
- `npm run audit:classes` — catches Tailwind utilities that silently compile to nothing.
