# Fly Uganda — Project Handover

**Marketing website for Fly Uganda (flyuganda.com)** — forked from the South Sudan
Airlines codebase and rebranded end to end.

Version 1.0.0 · November 2026

This document is the single source of truth for this codebase: what it is, where the
brand lives, what is real and what is placeholder, and what has to happen before it
goes live. Sections 9 and 10 are the ones to read first.

---

## 1. What this is

A production-ready marketing site for a scheduled safari airline, built so the brand
(colours, type, logo, copy, network, loyalty) is centralised and swappable. It is *not*
a booking engine — booking is scaffolded to host a PSS embed (AeroCRS / Go7) that drops
in later.

- **20 page modules** (plus a branded 404) rendering **37 URLs**, responsive, SEO-ready.
  Palette contrast is verified by `npm run contrast`; rendered-text contrast was checked
  with axe-core across every page.
- Identity: **"The Pearl"** — gold-on-Source-Green. See `01-brand-brief.md`.
- Positioning: scheduled per-seat flights from **Kajjansi**, the Kampala-side alternative
  to Entebbe, to Uganda's national parks. Charter and cargo on the same fleet.

## 2. Tech stack

| Layer | Choice |
|---|---|
| Framework | **Next.js 14.2.35** (App Router) + **TypeScript** |
| Styling | **Tailwind CSS** (design tokens in `tailwind.config.ts`) |
| Animation | **Framer Motion** (search-widget swap, route-map arc trace) |
| Fonts | **Self-hosted** Fraunces + Archivo via `next/font/local` |
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
  fonts/                ★ Self-hosted variable woff2 (Fraunces, Archivo)
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
  brand.tsx             ★ Pearl, PearlMark, Meridian, FlagBand, Kicker, Webale, Wordmark
  Header.tsx  Footer.tsx  Hero.tsx  PageHero.tsx
  SearchWidget.tsx      ★ Booking search (PSS-ready) — the Source Green panel
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
  brand/                Logo SVGs (pearl, symbol, badge, lockups, wordmark)
  scenes/               ⚠️ PLACEHOLDER brand illustrations — see §6
  pearl.svg             Favicon
scripts/contrast.js     WCAG guard for the palette
tailwind.config.ts      ★ COLOUR PALETTE + fonts + shadows + gradients
Docs:                   01-brand-brief.md, 02-loyalty-program-design.md, this file,
                        README.md, DEPLOY.md, CHANGELOG.md, VERSION
```
★ = the files you touch most.

## 5. The design system — where the brand lives

Three files control ~90% of the look:

1. **`tailwind.config.ts` → `theme.extend.colors`** — the entire palette. Token names
   are semantic, so changing hex values recolours the whole site. Full table in
   `01-brand-brief.md` §3. **Run `npm run contrast` after any change** — it exits
   non-zero if a pair drops below WCAG AA.
2. **`app/fonts/` + `app/layout.tsx`** — swap the `.woff2` files and keep the CSS
   variable names.
3. **`app/globals.css`** — component classes built on the tokens: `.btn-primary`,
   `.kicker`, `.reed`, `.webale`, `.flag-band`, focus ring, selection colour, `.tnum`.

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

**There is no photography in this build.** The SSA fork shipped photographs of South
Sudan Airlines aircraft, which obviously could not carry over, and shipping unverified
stock would have been worse.

`public/scenes/*.svg` are **brand-built illustrations** — layered equatorial ridges with
the Pearl as the sun, generated in the brand palette. They are intentionally illustrative
rather than photo-realistic so nobody mistakes them for the real thing. They look
finished, and the site is presentable today, but they are placeholders.

**To replace:** drop real images into `public/scenes/` under the same filenames (or
change the paths in `lib/data.ts`, `lib/content.ts`, `components/Hero.tsx` and
`components/Fleet.tsx`) and update the `alt` text. Priority order:

1. `hero.svg` — the homepage hero. Highest impact by far.
2. `fleet.svg` — a Caravan on a bush strip.
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

- **brand.tsx** — `Pearl` (gradient emblem), `PearlMark` (flat mono, for bullets and
  small sizes), `Meridian` (the divider), `FlagBand`, `Kicker`, `Webale`, `Wordmark`.
  Rebrand starts here.
- **Header / Footer** — global nav from `lib/data.ts → NAV`, utility bar, footer columns
  + flag band + greeting.
- **Hero** — full-bleed scene + headline + search widget.
- **PageHero** — reusable internal-page banner with the Pearl as a watermark.
- **SearchWidget** — flight search; styled placeholder for the PSS embed.
- **RouteMapFull / RouteMapPreview** — self-contained SVG maps. Node positions are
  **projected from real airstrip coordinates** (equirectangular, `scripts/` in the build
  history), with a simplified national outline, Lakes Victoria, Kyoga, Albert and Edward,
  and the Nile from Jinja to the Albert Nile. Labels carry an optional `below` flag to
  avoid collisions — check it if you add a node.
- **OilCorridorMap** — Albertine Graben cargo network.
- **loyalty/** — `TierLadder`, `MemberDashboard` (**mock data**), `BirdMark`.

## 8. Pages / routes (20 modules → 37 URLs)

Home · Routes (+ per-route `[code]`, 8) · Schedule · Book · Manage · Check-in · Cargo ·
About · Contact · Careers · Press · Travel info · Destinations (+ `[city]`, 8) ·
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
| **Airport codes** | `lib/data.ts` | IATA where allocated (EBB, KHX, KXO, KSE, PAF), ICAO where not (HUMW, HUGG, HUKD). **Exception:** Kajjansi has an allocated IATA code (**KJJ**) but ships as `HUKJ`, because HUKJ is what handlers and crews actually quote. Confirm which you want public. |
| **Forms do nothing** | `ContactForm.tsx`, `pearl-club/join`, `manage`, `check-in`, `SearchWidget` | All five submit nowhere. The contact and join forms flip local state and show a success message; `/manage` and `/check-in` post back to themselves; the search widget has no `name` attributes, so `action="/book"` carries no parameters. Wire to a backend, or label them as previews. |
| **Newsroom** | `components/Press.tsx`, `app/(site)/press/page.tsx` | `const NEWS = []` — hardcoded empty, renders a "coming soon" state. |
| **Member dashboard sample data** | `components/loyalty/MemberDashboard.tsx` | Mock member, balance, tier and activity. The sample name is a placeholder, not a real member. |
| **Company history** | `app/(site)/about/page.tsx` | "Thirty years of Ugandan flying" and the Kampala Aero Club lineage are checkable claims about your own business — confirm the dates before publishing. |
| **French placeholder** | `app/fr/page.tsx` | Static "coming soon" page. In the sitemap and `hreflang`, but there is no translated content behind it. |
| **Fleet size** | `lib/data.ts → FLEET` | No aircraft counts are published. Note that the illustrative timetable implies **seven Caravans airborne simultaneously** in the morning bank — see §9a. |

**On fares specifically:** the published seat fare is a commercial decision against
Aerolink's Entebbe pricing, and the placeholder is a market-rate guess, not a
recommendation. Nothing on the site should go live on it.

### 9a. The timetable implies a fleet you may not have

`lib/content.ts → SCHEDULE` currently departs Kajjansi at 07:00, 07:30 ×2, 07:45 ×2 and
08:00 ×2 — **seven simultaneous departures**, all typed Grand Caravan, none of which can
be flown by a returning aircraft because the first inbound does not land until 09:00.
`/routes` headlines this as "one morning departure bank".

That is a plausible shape for a mature network and an implausible one for a small fleet.
Before this goes in front of the trade, either thin the bank to what the fleet can
actually fly, or stagger the departures across the morning. It is the kind of detail a
DMC planning connections will notice immediately.

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

## 14. What changed from the South Sudan Airlines fork

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
