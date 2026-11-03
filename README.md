# Fly Uganda — website

Marketing site for **Fly Uganda** (flyuganda.com) — Uganda's domestic airline. Scheduled,
ticketed flights from Kajjansi Airfield to ten destinations across Uganda, with cargo
carried on the schedule.

Next.js 14 (App Router) · TypeScript · Tailwind · deployed on Vercel.

```bash
npm install
npm run dev              # http://localhost:3000
npm run build            # production build — the real compile check
npm run contrast         # WCAG AA check on the palette
npm run audit:classes    # catch Tailwind classes that compile to nothing (run after build)
```

## Read these first

| Doc | What it covers |
|---|---|
| **`PROJECT-HANDOVER.md`** | Everything: structure, rebrand knobs, **what is placeholder**, pre-launch checklist. Start here. |
| `01-brand-brief.md` | The Ribbon identity — palette, type, mark, devices, voice, and departures from the toolkit. |
| `02-loyalty-program-design.md` | Pearl Club design and PSS module mapping. |
| `DEPLOY.md` | GitHub → Vercel deployment. |

## Before this goes live

The site is complete and builds clean, but several things are **deliberately
placeholder** — fares, flight numbers, the timetable, contact details, leadership names,
legal documents, and all imagery. Every one is marked with a `⚠️` comment in the code and
listed in `PROJECT-HANDOVER.md` §9. Do not launch without working through §10.

## Where the brand lives

- `tailwind.config.ts` — the full palette. Run `npm run contrast` after changing it.
- `app/fonts/` + `app/layout.tsx` — self-hosted Montserrat (display) and Source Sans 3 (body).
- `components/brand.tsx` — the Pearl mark and brand primitives.
- `lib/data.ts`, `lib/content.ts`, `lib/loyalty.ts` — all network, page and programme content.

## One gotcha worth knowing

Tailwind opacity modifiers outside the standard scale (`bg-nile/12`, `from-nile-900/88`)
compile to **nothing**, with no error. Use bracket notation for off-scale values
(`from-nile-900/[0.88]`) and run `npm run audit:classes` after a styling pass.
