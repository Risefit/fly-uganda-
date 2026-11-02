# Deploy — Fly Uganda

The canonical copy of this project lives on your Mac. Push to GitHub once, connect
Vercel, and after that every `git push` auto-deploys.

---

## 1. Push to GitHub

Create an empty repo (e.g. `Risefit/Fly-Uganda`), then from the project folder on your
Mac — in a normal Terminal, **not** a Codespace:

```bash
cd ~/path/to/"Fly Uganda Website"

git init
git add -A
git commit -m "Initial commit: Fly Uganda website v1.0.0"
git branch -M main
git remote add origin https://github.com/Risefit/Fly-Uganda.git
git push -u origin main
```

When prompted to log in, use a **Personal Access Token** as the password.

## 2. Connect Vercel

1. vercel.com → **Add New… → Project** → import the repo.
2. Framework preset: **Next.js** (auto-detected). No environment variables are needed —
   there is no database and no API key in this build.
3. Deploy. You get a `*.vercel.app` URL immediately.

## 3. Add the domain

Vercel → Project → **Settings → Domains** → add `flyuganda.com` and `www.flyuganda.com`,
then point the DNS records Vercel shows you at the registrar.

**Before you switch the DNS:** the current flyuganda.com is a live site with indexed
pages. Decide which of its URLs are worth keeping and add redirects in `next.config.js`
(`async redirects()`), or you will drop that search equity on cutover.

The domain is also hard-coded in three places — update them if it changes:

- `app/layout.tsx` → `SITE_URL`
- `app/sitemap.ts` → `BASE`
- `app/robots.ts` → `sitemap` and `host`

## 4. Everyday workflow

```bash
# edit on the Mac, then:
npm run build            # catch type and compile errors before pushing
npm run audit:classes    # catch Tailwind classes that silently produce no CSS
git add -A && git commit -m "…" && git push
```

Vercel builds `main` and promotes it to production automatically. Pull requests get
their own preview URL.

## 5. Rules of the road

- **The Mac is the single source of truth.** Do not push from a stale Codespace — on the
  previous project that overwrote `main` with an empty repo.
- `--force` should never be needed in normal use.
- `npm run build` locally is the real compile check; Vercel will fail on the same errors,
  just more slowly.
