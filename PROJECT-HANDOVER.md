# Fly Uganda — Project Handover

**Marketing website for Fly Uganda (flyuganda.com)** — forked from the South Sudan
Airlines codebase and rebranded end to end.

Version 1.4.2 · November 2026

This document is the single source of truth for this codebase: what it is, where the
brand lives, what is real and what is placeholder, and what has to happen before it
goes live. Sections 9 and 10 are the ones to read first.

---

## 1. What this is

A production-ready marketing site for a scheduled domestic airline, built so the brand
(colours, type, logo, copy, network, loyalty) is centralised and swappable. It is *not*
a booking engine — booking is scaffolded to host a PSS embed (AeroCRS / Go7) that drops
in later.

- **20 page modules** (plus a branded 404) rendering **37 URLs**, responsive, SEO-ready.
  Palette contrast is verified by `npm run contrast`; rendered-text contrast was checked
  with axe-core across every page.
- Identity: **"The Ribbon"** — Modern Pan-African, from the Brand Identity Toolkit.
  See `01-brand-brief.md`.
- Positioning (v1.2): **Uganda's domestic airline** — scheduled, ticketed flights from
  **Kajjansi**, the Kampala-side alternative to Entebbe, to nine destinations across the
  country. Sold like an airline (e-tickets, interline/codeshare-ready
  distribution). **No charter product** anywhere on the site; cargo is belly freight on
  the schedule. Fleet shown: Cessna 208EX Grand Caravan and Beechcraft 1900D only.

## 2. Tech stack

| Layer | Choice |
|---|---|
| Framework | **Next.js 14.2.35** (App Router) + **TypeScript** |
| Styling | **Tailwind CSS** (design tokens in `tailwind.config.ts`) |
| Animation | **Framer Motion** (search-widget swap, route-map arc trace) |
| Fonts | **Self-hosted** Montserrat + Source Sans 3 via `next/font/local` |
| Icons | **lucide-react** |
| Hosting | **Vercel** (auto-deploy from GitHub `main`) |
| Booking (planned) | AeroCRS / **Go7** PSS embed |

No database. All content is hard-coded in `lib/` and is CMS-ready later.

**Two changes from the SSA stack, both deliberate:**

1. **Next.js pinned to 14.2.35.** The forked 14.2.5 carries a published security
   advisory. 14.2.35 is the patched release on the same minor, so no App Router
   breaking changes.
2. **Fonts are self-hosted, not `next/font/google`.** The SSA build could not compile
   where Google Fonts was unreachable. Self-hosting removes a third-party round-trip on
   slow East African connections, keeps the build working offline and in CI, and avoids
   sending visitor IPs to Google. Font files live in `app/fonts/`.

## 3. Run & deploy

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build — also the real compile check
npm run contrast   # re-check the palette against WCAG AA
```

Deploy workflow is in `DEPLOY.md`. Mac is the source of truth; `git push` to `main`
auto-deploys via Vercel.

## 4. Folder structure

```
app/
  layout.tsx            Self-hosted fonts, metadata, Airline JSON-LD, favicon, theme-color
  globals.css           Base styles + component classes (.btn-primary, .kicker, .reed, .flag-band …)
  page.tsx              Homepage composition
  fonts/                ★ Self-hosted variable woff2 (Montserrat ×2, Source Sans 3)
  sitemap.ts, robots.ts SEO
  not-found.tsx         Branded 404
  fr/page.tsx           French placeholder — i18n scaffold
  (site)/               Route group: shared Header+Footer shell
    layout.tsx
    routes/ , routes/[code]/
    schedule/ , book/ , manage/ , check-in/
    cargo/ , about/ , contact/ , careers/ , press/ , travel-info/
    destinations/ , destinations/[city]/
    legal/[doc]/
    pearl-club/ , pearl-club/join/ , pearl-club/account/
components/
  brand.tsx             ★ Logo, Ribbon, Chip, RibbonBand, Rule, Kicker, Webale
  brand-paths.ts        GENERATED logo geometry — edit logo/build.js, not this
  Header.tsx  Footer.tsx  Hero.tsx  PageHero.tsx
  SearchWidget.tsx      ★ Booking search (PSS-ready) — the Aviation panel, on /book
  QuickActions.tsx      Book / Manage / Check-in / Flight status bar under the hero
  FeatureTiles.tsx      Destinations / Experience / About / Sustainability tiles
  WhyFlyUs.tsx  RouteMapPreview.tsx  Fleet.tsx  Destinations.tsx  LoyaltyTeaser.tsx  Press.tsx
  RouteMapFull.tsx      Interactive network map — real Uganda geography
  OilCorridorMap.tsx    Albertine Graben cargo map
  ScheduleTable.tsx  ContactForm.tsx  AeroCRSFrame.tsx
  loyalty/ BirdMark.tsx  TierLadder.tsx  MemberDashboard.tsx
lib/
  data.ts               ★ Hub, network, fleet, fares, nav, contact, brand promises
  content.ts            ★ Schedule, destination guides, cargo, offices, travel info, legal
  loyalty.ts            ★ Pearl Club (tiers, earn/redeem, FAQ)
  utils.ts              cn() class helper
public/
  brand/                Logo package: 6 SVG lockups + png/ raster set
  og-image.png          1200×630 social-share card
  scenes/               ⚠️ PLACEHOLDER brand illustrations — see §6
  favicon.svg           The ribbon icon
scripts/contrast.js     WCAG guard for the palette
tailwind.config.ts      ★ COLOUR PALETTE + fonts + shadows + gradients
Docs:                   01-brand-brief.md, 02-loyalty-program-design.md, this file,
                        README.md, DEPLOY.md, CHANGELOG.md, VERSION
```
★ = the files you touch most.

## 5. The design system — where the brand lives

Three files control ~90% of the look:

1. **`tailwind.config.ts` → `theme.extend.colors`** — the palette. Token names are
   semantic, so changing hex values recolours the whole site. Full table with the
   text-safety rules in `01-brand-brief.md` §3. **Run `npm run contrast` after any
   change** — it exits non-zero if a pair drops below WCAG AA.
2. **`app/fonts/` + `app/layout.tsx`** — swap the `.woff2` files and keep the CSS
   variable names. See the two font traps below before touching this.
3. **`app/globals.css`** — component classes on the tokens: `.btn-primary` (the amber
   pill), `.btn-ghost`, `.btn-ghost-dark`, `.kicker`, `.rule`, `.ribbon-band`, `.webale`,
   plus a base rule making every heading Montserrat Bold.

**The logo** is a fourth place, and the one not to edit by hand. `logo/build.js`
generates the ribbon from Bézier geometry and composes it with outlined glyphs from
`logo/outline.py` (HarfBuzz-shaped, so kerning is exact). It writes `public/brand/*.svg`
and `components/brand-paths.ts`. To change the mark: edit the generator, re-run it, then
`python3 -I logo/export.py` for the PNG set and OG card.

### ⚠️ Two font traps — both hit during this build

**1. Never declare `--font-display` or `--font-body` in `:root`.** next/font sets them on
`<html>` through a generated class. A `:root` fallback has equal specificity and lands
later in the cascade, so it silently wins — every page renders the fallback and the
self-hosted font is never requested. The v1.0 build carried exactly this from the SSA
fork. The fallback chain belongs in `tailwind.config.ts → fontFamily` only.

**2. A font name ending in a digit must be quoted inside the config string:**
`'"Source Sans 3"'`, not `"Source Sans 3"`. Tailwind emits family names unquoted, and
`Source Sans 3` is not a valid unquoted identifier (the `3`). That voids the **entire**
`font-family` declaration on `<body>` and the browser falls back to Times New Roman —
with no error anywhere.

### ⚠️ Tailwind opacity gotcha — read this before editing any colour class

Opacity modifiers outside Tailwind's scale **compile to nothing, silently**. There is no
build error and no console warning; the class simply does not exist and the element
renders with no background.

`bg-nile/12` and `from-nile-900/88` are invalid. `bg-nile/10` and
`from-nile-900/[0.88]` are valid. **If a value is not on the standard scale, use bracket
notation.** This bug was inherited from the fork — the SSA hero scrim never rendered,
which is why its white headline sat on a pale sky.

There is a guard for this. After any styling pass:

```bash
npm run build
npm run audit:classes
```

It lists every colour utility used in `app/` and `components/` that is missing from the
compiled CSS, with file and line, and exits non-zero. Run it before you push.

## 6. ⚠️ Imagery — the single biggest pre-launch item

**Update, v1.1.1:** the nine destinations now carry real, licensed photographs — one per
strip, resolved by `lib/photos.ts`. Each was verified against the photo's own description
and location field on Unsplash to be the place it claims; all are under the Unsplash
License (commercial use, no attribution required) and none are Unsplash+ paid images.
Credited on each destination page regardless. Only two are genuine aerials (Kisoro's
Lake Bunyonyi and the Bugungu escarpment); the rest are the real places from the ground,
and Bwindi is a gorilla because no landscape of it exists on Unsplash.

**Your own aerials override them with no code change:** drop `public/photos/<code>.jpg`
and rebuild — see `public/photos/README.md`.

**Update, v1.2.0:** the hero is now the Karamoja aerial at `public/photos/hero.jpg`
(**996×711 — too small for a 1440-wide hero; replace with the full-resolution original**),
and the fleet carries KEA's own photography copied from flykea.com into
`public/photos/fleet/` (`c208ex.jpg`, `c208ex-landing.jpg`, `c208ex-cabin.jpg`,
`b1900.jpg`, `b1900-sky.jpg`, `b1900-cabin.jpg`) — first-party, no licence to clear.
The about plate and the four homepage destination tiles are still SVG illustrations.

**There is no photography in this build.** The SSA fork shipped photographs of South
Sudan Airlines aircraft, which obviously could not carry over, and shipping unverified
stock would have been worse.

`public/scenes/*.svg` are **brand-built illustrations** — layered green ridges under a
cream-to-gold sky, with Aviation navy at the top of the golden-hour plates. No purple. They are intentionally illustrative
rather than photo-realistic so nobody mistakes them for the real thing. They look
finished, and the site is presentable today, but they are placeholders.

**To replace:** drop real images into `public/scenes/` under the same filenames (or
change the paths in `lib/data.ts`, `lib/content.ts`, `components/Hero.tsx` and
`components/Fleet.tsx`) and update the `alt` text. Priority order:

1. `hero.svg` — the homepage hero. Highest impact by far.
2. `fleet.svg` — a Caravan on a park airstrip.
3. The eight destination plates (`kihihi`, `kisoro`, `mweya`, `kasese`, `pakuba`,
   `bugungu`, `kidepo`, `kajjansi`).
4. `about.svg`.

When real photography goes in, **dial the hero scrim back**. It is currently heavy
(`from-nile-900/[0.95] … to-nile-900/[0.72]` in `components/Hero.tsx`) because the
illustration is pale at the top and the headline must stay legible on mobile. A darker
photograph will carry the text with much less scrim.

`next.config.js` sets `dangerouslyAllowSVG` purely to serve these plates through
`next/image`. Once they are gone, **delete that block** — it is not needed for raster
images and should not outlive the placeholders.

## 7. Components

- **brand.tsx** — `Logo` (full lockup, `tone` light/dark, optional tagline), `Ribbon`
  (the mark alone), `Chip` (bullet mark), `RibbonBand`, `Rule`, `Kicker`, `Webale`.
  Draws from the generated `brand-paths.ts`.
- **Header** — Aviation navy bar, always: logo, primary nav, search, Sign-in pill, amber
  Book pill. Mobile overlay with Escape to close. **Footer** — ribbon band, reversed logo,
  four link columns.
- **Hero** — full-bleed scene, headline, amber CTA + ghost secondary. The flight search
  moved to `/book`; **QuickActions** (Book / Manage / Check-in / Flight status) sits under
  the hero and **FeatureTiles** follows it — the structure from the toolkit's website panel.
- **PageHero** — reusable internal-page banner with the ribbon as a watermark.
- **SearchWidget** — flight search; styled placeholder for the PSS embed.
- **RouteMapFull / RouteMapPreview** — self-contained SVG maps. Node positions are
  **projected from real airstrip coordinates** (equirectangular, `scripts/` in the build
  history), with a simplified national outline, Lakes Victoria, Kyoga, Albert and Edward,
  and the Nile from Jinja to the Albert Nile. Labels carry an optional `below` flag to
  avoid collisions — check it if you add a node.
- **OilCorridorMap** — Albertine Graben cargo network.
- **loyalty/** — `TierLadder`, `MemberDashboard` (**mock data**), `BirdMark`.

## 8. Pages / routes (22 modules → 39 URLs)

Home · Routes (+ per-route `[code]`, 8) · Schedule · Book · Manage · Check-in · Cargo ·
About · Contact · Careers · Press · Travel info · **Sustainability** · **Flight status** ·
Destinations (+ `[city]`, 8) ·
Legal (`[doc]`: terms / privacy / cookies / pearl-club-terms) · Pearl Club (+ /join,
/account) · `/fr` placeholder · 404.

All internal pages share `app/(site)/layout.tsx`. Adding a page = a new folder with
`page.tsx` under `(site)` — and add it to `app/sitemap.ts`.

## 9. ⚠️ What is placeholder — confirm before launch

Everything below is marked in the code with `⚠️` comments.

| Item | Where | What is needed |
|---|---|---|
| **Fares** | `lib/data.ts → FARES` | `from USD 290` one way / `USD 540` return are **indicative placeholders**. Replace with the signed published fare sheet. |
| **Net / rack rates** | — | **None are in this codebase, and none may ever be.** `lib/data.ts` ships to the browser. Published retail fares only. |
| **Flight numbers** | `lib/content.ts → SCHEDULE` | `FU###` is a placeholder prefix. Use the designator filed with UCAA. |
| **Timetable** | `lib/content.ts → SCHEDULE` | Illustrative pattern built around the morning-out / late-morning-back rhythm. Replace with the live timetable. |
| **Phone number** | `lib/data.ts → CONTACT` | `+256 (TBC)`. |
| **Email addresses** | `lib/data.ts → CONTACT` | `care@` / `reservations@` / `cargo@` / `careers@flyuganda.com` — confirm these exist and route. |
| **Leadership** | `lib/content.ts → LEADERSHIP` | Placeholder roles, no invented names. Replace with confirmed AOC post-holders. |
| **Loyalty thresholds** | `lib/loyalty.ts` | Illustrative. See `02-loyalty-program-design.md`. |
| **Member account** | `components/loyalty/MemberDashboard.tsx` | **Mock sign-in and balances.** Do not link publicly until wired to the PSS. |
| **Legal documents** | `lib/content.ts → LEGAL` | Placeholder summaries. Need drafted conditions of carriage, privacy, cookies, programme terms. |
| **Social links** | `components/Footer.tsx → SOCIAL` | All `href="#"`. |
| **Imagery** | `public/scenes/` | See §6. |
| **Airport codes** | `lib/data.ts` | IATA where allocated (HUEN, HUKH, HUKI, HUKS, PAF), ICAO where not (HUMW, HUGG, HUKD). **Exception:** Kajjansi has an allocated IATA code (**KJJ**) but ships as `HUKJ`, because HUKJ is what handlers and crews actually quote. Confirm which you want public. |
| **Forms do nothing** | `ContactForm.tsx`, `pearl-club/join`, `manage`, `check-in`, `SearchWidget` | All five submit nowhere. The contact and join forms flip local state and show a success message; `/manage` and `/check-in` post back to themselves; the search widget has no `name` attributes, so `action="/book"` carries no parameters. Wire to a backend, or label them as previews. |
| **Newsroom** | `components/Press.tsx`, `app/(site)/press/page.tsx` | `const NEWS = []` — hardcoded empty, renders a "coming soon" state. |
| **Member dashboard sample data** | `components/loyalty/MemberDashboard.tsx` | Mock member, balance, tier and activity. The sample name is a placeholder, not a real member. |
| **Company history** | `app/(site)/about/page.tsx` | "Thirty years of Ugandan flying" and the Kampala Aero Club lineage are checkable claims about your own business — confirm the dates before publishing. |
| **French placeholder** | `app/fr/page.tsx` | Static "coming soon" page. In the sitemap and `hreflang`, but there is no translated content behind it. |
| **Flight status** | `app/(site)/flight-status/page.tsx` | Live engine built (§14); runs on the replay mock until Spidertracks credentials are set. The page says so. |
| **Sustainability figures** | `app/(site)/sustainability/page.tsx` | Framing only, no audited numbers — and the page is careful not to claim any. Add measured fuel-burn per seat when you have a year of it. |
| **Fleet size** | `lib/data.ts → FLEET` | No aircraft counts are published. The timetable is sized to 2 × 208EX + 1 × 1900D — see §9a. |

**On fares specifically:** the published seat fare is a commercial decision against
Aerolink's Entebbe pricing, and the placeholder is a market-rate guess, not a
recommendation. Nothing on the site should go live on it.

### 9a. Fleet and timetable (v1.4.2) — 5X-PJG, 5X-AIG (208EX), 5X-KAI (1900D)

Phil's assignment, 4 Nov 2026. Hoima and Moroto are **"coming soon"** (`status: "planned"`
in `ROUTES`: dashed on the map, badged on /routes and /destinations, not in the booking
widget, no timetable rows). `lib/content.ts → SCHEDULE` is one line of flying per aircraft:

| Aircraft | Every day | Mon–Thu | Fri · Sat · Sun | Mon · Wed · Fri |
|---|---|---|---|---|
| 5X-PJG Caravan | Kihihi 07:00 → back 10:10 | Kasese 10:50 → back 13:40 | Bugungu 10:50 → back 13:20 | — |
| 5X-AIG Caravan | Kisoro 07:15 → back 10:35 | — | — | Kidepo 11:15 → back 14:55 |
| 5X-KAI 1900D | Gulu 07:00 → back 09:10 · Arua 09:50 → back 12:20 | — | — | — |

Bugungu on Friday, Saturday and Sunday is the long-weekend pattern: in on Friday or
Saturday, out on Sunday (or a Fri–Sat one-nighter). A Monday return is not offered —
adding one means Kasese drops to Tue–Thu or PJG flies two midday rotations on Mondays.

Block times: great-circle from Kajjansi at 160 kt (Caravan) or 260 kt (1900D) plus
16 min taxi/climb, rounded up to 5 min — Kihihi 1:25, Kisoro 1:30, Kasese 1:15,
Bugungu 1:05, Kidepo 1:40; Gulu 0:55, Arua 1:05. (Hoima 0:45 on the 1900D and Moroto
1:25 are held in `ROUTES` for when they start.) No wind, no Entebbe-zone routing
allowance; expect +5–10 min on the western legs.

**Monthly utilisation** (30.4 days; 4×-weekly = 17.3, 3×-weekly = 13 rotations a month;
air = still-air time, block = air + 16 min per sector):

| Aircraft | Air h/month | Block h/month | Sectors/month | Longest day (block) |
|---|---|---|---|---|
| 5X-PJG | 122 | 154 | 121 | 5:10 (two rotations, every day) |
| 5X-AIG | 109 | 132 | 87 | 6:20 (Mon/Wed/Fri) |
| 5X-KAI | 83 | 116 | 122 | 4:10 |

No aircraft exceeds two rotations a day; longest duty is PJG at about 06:00–14:00.
KAI is light at 83 air hours — an afternoon Gulu or the Hoima start are the obvious
fillers inside its day. Sunday: PJG flies Kihihi + Bugungu, AIG Kisoro only, KAI as usual.

Flight numbers kept from v1.2 (FU1x1 out / FU1x2 back); FU103/104, FU183/184 retired;
FU121/122 (Hoima) and FU191/192 (Moroto) reserved for the start.

## 10. Before you ship — checklist

1. `npm install && npm run build` — confirm it compiles on your Mac.
2. `npm run contrast` — confirm the palette still passes.
3. Work through §9 and replace every placeholder, or consciously accept it.
4. Replace the hero image (§6) and dial back the scrim.
5. Confirm `flyuganda.com` is the final domain. It is defined once in `lib/site.ts`
   and read by `app/layout.tsx`, `app/sitemap.ts` and `app/robots.ts`; override with
   `NEXT_PUBLIC_SITE_URL` rather than editing three files.
6. Decide what happens to the **existing flyuganda.com** — the live site still shows 2020
   route information. This build replaces it wholesale; plan the redirects for any
   indexed URLs worth keeping.
7. Point the PSS embed at the real widget: `components/AeroCRSFrame.tsx` (the embed host)
   and `components/SearchWidget.tsx` (the search action).
8. Add analytics (Plausible or similar — the cookie policy already describes
   privacy-friendly, cookieless analytics, so keep it that way).
9. New GitHub repo → import to Vercel → add the domain. See `DEPLOY.md`.
10. **Switch indexing on.** Every deployment is `noindex` by default — see §10a.
    Set `SITE_INDEXABLE=true` in the Vercel **production** environment only, and
    redeploy, once flyuganda.com is serving this build.

### 10a. Indexing is off by default, deliberately

`app/robots.ts` emits `Disallow: /` and `next.config.js` sends
`X-Robots-Tag: noindex, nofollow` unless `SITE_INDEXABLE=true` is set.

Without that, the `*.vercel.app` deployment is publicly crawlable, and Google can
index the pre-launch site — placeholder fares, placeholder timetable,
"appointment to be confirmed" leadership and all — under the Fly Uganda name,
competing with the real domain in results. A tour operator who finds the staging
URL in search could quote a fare you never agreed to.

Two switches, both lifted by the same variable:

| Switch | File | Default |
|---|---|---|
| `robots.txt` | `app/robots.ts` | `Disallow: /` |
| `X-Robots-Tag` header | `next.config.js → headers()` | `noindex, nofollow` |

Set it on the production environment only. Preview deployments should stay
`noindex` permanently.

The canonical URL now lives in one place, `lib/site.ts`, and is read by
`app/layout.tsx`, `app/sitemap.ts` and `app/robots.ts`. Override it with
`NEXT_PUBLIC_SITE_URL` if the domain changes.

## 11. Booking integration (AeroCRS / Go7)

Booking is scaffolding, not an engine. `SearchWidget` + `/book` + `/manage` + `/check-in`
host placeholders ready for the embed, with a "launching shortly" state. The Pearl Club
"My Account" reads from the PSS member API at launch. If a different PSS is selected, the
same pattern applies — swap the embed target in `AeroCRSFrame.tsx` and the search action
in `SearchWidget.tsx`. See `02-loyalty-program-design.md` for the module mapping.

## 12. SEO & i18n

- `app/sitemap.ts` + `app/robots.ts` + per-page `metadata` + Airline JSON-LD in
  `layout.tsx` (which names Kampala Executive Aviation as parent organisation —
  confirm that is how you want the relationship stated publicly).
- Page language is `en-GB`: the copy is British English and the audience is Ugandan,
  UK and EU trade.
- i18n is scaffolded with a **French** placeholder at `/fr` (replacing SSA's Arabic one)
  — the francophone trade is the realistic second market. Full multi-language via
  next-intl is a later step; the layout uses logical properties, so adding locales is
  structural rather than a rebuild.

## 13. Known constraints & gotchas

- **Tailwind opacity modifiers outside the standard scale silently compile to nothing.**
  See §5. This is the one that will bite you.
- Maps are hand-built SVG with no API key. Node coordinates are real; the outline is
  simplified. Swap to react-simple-maps or Mapbox if you need a true base map.
- `MemberDashboard` is mock data (§9).
- `dangerouslyAllowSVG` is on in `next.config.js` solely for the placeholder scene plates
  (§6). Remove it with them.
- Fraunces has real weights, so the single-weight `.font-serif { font-weight: 400 }`
  guard from the Dawn Star system is gone. `font-bold` works on headings now.
- Do not push from a stale Codespace — treat the Mac as the single source of truth.

## 14. Live flight status (v1.3.1) — how to switch it on

Everything is built and running against a replay of the timetable. The page says
"Simulated feed" until the real provider is configured.

**Code map** — `lib/tracking/`
- `types.ts` — `Position`, `TrackingProvider`, `FlightStatus`, `StatusResponse`.
- `providers/spidertracks.ts` — POSTs an AFF 1.1 `dataRequest` to
  `https://apigw.spidertracks.io/go/aff/feed` with HTTP Basic auth. **The response
  parser is written to the AFF JSON spec but has not seen a live reply** — expect to
  adjust field names in `parse()` once; nothing else depends on them.
- `providers/mock.ts` — synthesises fixes along each scheduled leg (taxi 8 min, cruise
  165 kt, 2-minute reports). Selected automatically when no credentials are set.
- `status.ts` — pure function: positions + timetable + assignments → statuses. Geofences
  are 4 km around strips, 5–6 km around Entebbe/Hoima/Gulu/Arua (`geo.ts: FENCE_KM`);
  "on the ground" is < 30 kt; "delayed" after 20 min past STD with no departure;
  "boarding" when the aircraft is at the strip inside 40 min of STD.
- `assignments.ts` — flight number → registration for the day. Placeholder tails
  `5X-FUA…` for the mock. Override without a deploy with the `ASSIGNMENTS` env var
  (JSON). Replace with the PSS feed when Go7 is live.
- `app/api/flight-status/route.ts` — JSON for the client, `s-maxage=60` so the upstream
  feed is hit at most once a minute regardless of traffic.
- `components/LiveTimetable.tsx` — the rows and progress lines; polls every 60 s.

**Switch-on checklist**
1. Spidertracks org admin: submit the *API Consumer Application* (Help Centre →
   "How To Request A New Real Time API Integration"), choose *Private AFF consumer*.
2. In Spidertracks: Aircraft → AFF/API → tick every Fly Uganda aircraft for the new
   consumer. Only data from that moment on is served.
3. Vercel → Project → Settings → Environment Variables (Production):
   `SPIDERTRACKS_USER`, `SPIDERTRACKS_PASSWORD`, `TRACKING_PROVIDER=spidertracks`.
   Redeploy.
4. Open `/api/flight-status` — `"provider":"spidertracks"`, `"simulated":false`. If
   `flights[].state` is all `unknown`, the parser needs the real field names: log one raw
   response and align `parse()`.
5. Put the real registrations in `assignments.ts` (or `ASSIGNMENTS`) and check the
   registrations match the tracker's spelling exactly (`5X-KEH`, not `5XKEH`).
6. Tune `FENCE_KM` if a strip's fence is too tight (Kajjansi's circuit overlaps Entebbe's
   control zone but the fences do not touch at 4/6 km).

**Why not Flightradar24:** ground-receiver ADS-B coverage is unreliable at Kidepo,
Moroto and the Albertine, and their data API is a paid redistribution licence. The
provider interface would take an FR24 implementation if ever wanted.

## 15. What changed in v1.3.0 — the supplied logo, its colours

- **Masters:** `public/brand/logo.png` and `public/brand/ribbon.png` are the artwork Phil
  supplied, cropped from the clean lower copy of his file, nothing redrawn or recoloured.
  Icons in `public/brand/png/`, `public/favicon.png`, `public/og-image.png` derive from
  them. **If a vector master is ever produced, drop it in as `logo.svg` and point
  `components/brand.tsx` at it** — the component is a thin `next/image` wrapper.
- `Logo tone="dark"` puts the PNG on a cream plate (footer). Do not invert it.
- Tokens now match the logo (see CHANGELOG). `heritage` `#7A0019` is no longer in the
  mark; it stays as a token for the Crowned Crane tier trim only if wanted (currently the
  tier uses red).
- The logo tagline reads "UGANDA TO AFRICA AND BEYOND" because that is the artwork; the
  site's own slogan line (hero kicker, footer, metadata) stays "Uganda's domestic
  airline". Decide which one the brand carries before launch.

## 16. What changed in v1.2.3 — graphite + contour backgrounds

- Tokens: `cream`/`paper` = `#F4EFE6` (bone), `sand` = `#E9E1D2`, `graphite` =
  `#2A2824` / 700 `#35332E` / 500 `#4A4740`, `kopje` = `#8A6A4B`. Navy `aviation` is
  unchanged and still the text/ink colour.
- `.band-dark` (globals.css) = graphite ground + `::before` contour texture from
  `public/contours.svg` (40%, kopje, fading downward via mask). Use it on any
  full-width dark section or large dark panel; children are lifted with
  `position: relative`. `.contours` is the raw overlay if you need a different tint.
- Small dark CTA cards use plain `bg-graphite`. Header, mobile menu and footer are
  graphite. Hero scrims still use `aviation-900` (over the photo, reads as shadow).
- Brand brief §4 palette table should be updated to match when next revised.

## 17. What changed in v1.2.2 — ICAO codes, tier cards, widget

- **Codes:** `Airport.code` is ICAO for every airport and is the `/routes/[code]` slug,
  the `data-code` on the map, the key in `lib/photos.ts`, the `public/photos/<code>.jpg`
  slot and the CSS highlight rules in `globals.css`. `Airport.iata` carries KHX, KXO,
  KSE, RUA, ULU, EBB for the PSS. **Confirm with UCAA:** HUKH (Kihihi/Savannah has no
  published indicator) and HUKF (Kabalega International).
- **Tier emblem** is `components/loyalty/TierEmblem.tsx` (pearl strand, 1–4 pearls, tier
  accent). `BirdMark.tsx` is deleted. If the toolkit's four motif icons are ever drawn
  properly, they go here.
- **TierLadder** uses fixed row heights (`min-h-[6.25rem]` header, `min-h-[2.75rem]`
  tagline, `min-h-[4.5rem]` qualification box) so the four cards align whatever wraps.

## 18. What changed in v1.2.1 — network, fares, /book

- **Network is now ten destinations:** Kihihi, Kisoro, Kasese, Hoima, Bugungu, Arua,
  Gulu, Moroto, Kidepo, Entebbe. Mweya and Pakuba are withdrawn (their scene plates and
  Unsplash entries deleted). Codes: Hoima = **HUKF** (Kabalega International; AC-U-KWIK
  also lists IATA KBG — confirm with UCAA), Arua = HUAR, Gulu = HUGU, Moroto = **HUMO**
  (no IATA). Coordinates in `lib/geo.ts`; Hoima's are from the Wikipedia entry for the
  new airport (1.4275 N, 31.0778 E) — verify against the AIP once it is published.
- **Block times for the four new sectors are illustrative** (Hoima 0h55, Gulu 1h15,
  Moroto 1h25, Arua 1h30) and Arua/Gulu are timetabled on the 1900D. Replace from the
  real timetable.
- **No fares on the site.** Phil's call: nothing "from USD" anywhere until a fare sheet
  is signed off. The map panel and route pages show aircraft type in the fare's place.
  `FARES` remains in `lib/data.ts` for later; nothing reads it.
- **Imagery:** Hoima, Arua and Gulu have first-party SVG plates
  (`public/scenes/{hukf,huar,hugu}.svg`, generated — brand-safe, no licence); Moroto uses
  the Karamoja aerial (`public/photos/humo.jpg`). Unsplash has no verifiable photo of any
  of the four. Drop KEA's own photos into `public/photos/{hukf,huar,hugu,humo}.jpg`.

## 19. What changed in v1.2.0 — domestic-airline positioning, real map, hero

- **Positioning.** "Uganda's safari airline" → **"Uganda's domestic airline"** in the
  logo tagline (regenerated through `logo/`), metadata, hero, footer and about. Charter is
  gone: `CHARTER_DESTINATIONS`, the charter fleet card, the charter promise, the charter
  loyalty FAQ and the Oil-corridor charter map (`OilCorridorMap.tsx`, deleted). Cargo is
  now belly freight on scheduled flights, rated per kg. New about-page section "How we
  sell" states the distribution model (direct, agents, interline & codeshare). Safari tone
  is kept only on the park strips' own guide copy.
- **Fleet.** `FLEET` is two types — 208EX and 1900D — with `image`, `cabin` and `alt`
  fields pointing at KEA's photography. Do not add types here without Phil's say-so.
- **`FARES` keys renamed** `parkOneWay`/`parkReturn` → `oneWay`/`return`.
- **Network map** (`components/NetworkMap.tsx`) replaces both route maps. Real geography
  from world-atlas (50 m Africa, 10 m Uganda + neighbours) and Natural Earth 10 m lakes and
  rivers, built by `node scripts/build-geo.mjs` into `public/geo/*.json` (committed; the
  script documents the source URLs). d3-geo Mercator; Africa → Uganda zoom; routes grow
  out of Kajjansi at **17.5 ms per block-minute** (`MS_PER_MIN`) so Kidepo takes longer
  than Kasese; click or tap a destination (or the list beside the map) for block time,
  frequency, fare and the timetable rows from `SCHEDULE`. Contour backdrop is
  `public/contours.svg` (from the Zulia site). Reduced-motion users get the finished map.
  SVG nodes are decorative (`aria-hidden`); the list is the accessible control.
- **`lib/geo.ts`** holds the airstrip coordinates. Check them against the AIP before
  launch — they were placed from published coordinates, not surveyed.
- **Hero** is `public/photos/hero.jpg` (needs the full-res original — §6).

## 20. What changed in v1.1.0 — the Brand Identity Toolkit

Visual refresh only; the product (Kajjansi, park strips, Caravans, Pearl Club) did not change.

- **Identity:** The Pearl → **The Ribbon**. Palette Heritage / Energy / Opportunity /
  Growth / Connection / Aviation on cream; Montserrat + Source Sans 3; outlined logo
  package with PNG set and OG card. Flag band → ribbon band.
- **Layout:** navy header with Sign-in and Book pills; hero with amber CTA; quick-action
  bar; four feature tiles. Two new pages: Sustainability, Flight status.
- **Deliberate departures from the toolkit** — `01-brand-brief.md` §7: no flag-carrier
  claim, no "Uganda to Africa and Beyond", Warm Neutral read as `#F6E9DB`, no purple dusk.
- **Fixed on the way:** the `:root` font-variable override that had been silently
  suppressing the self-hosted fonts since the fork, and the unquoted "Source Sans 3" that
  voided body `font-family` — both now in §5.

## 21. What changed from the South Sudan Airlines fork (v1.0.0)

For anyone comparing the two codebases:

- **Identity:** Dawn Star → The Pearl. New palette (gold on Source Green), new type
  pairing (Fraunces + Archivo, self-hosted), new mark and asset set, new devices
  (Meridian replaces the Elder's Staff; Webale replaces Salamat; the flag band is now
  Uganda's six stripes).
- **Network:** Juba hub and four routes → Kajjansi hub and eight scheduled strips, with
  maps rebuilt on real Uganda geography.
- **Loyalty:** White Nile Club / Nile Miles / Birds of the Sudd → Pearl Club / Pearls /
  Birds of Uganda. Route moved to `/pearl-club`.
- **Cargo:** Upper Nile oil corridor → Albertine Graben, with per-kg tariffs replaced by
  "on application".
- **i18n:** `/ar` (Arabic, RTL) → `/fr` (French).
- **Fixed from the fork:** the hero scrim (never rendered), Next.js security advisory,
  a build that could not run without Google Fonts, and `flag-green` success states
  replaced with a semantic `success` token.
