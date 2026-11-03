# Logo generator

The Fly Uganda mark is generated, not drawn. Edit here, never in `public/brand/*.svg`.

```bash
# 1. Outline the wordmark and tagline (only if the text or font changes)
python3 -I logo/outline.py app/fonts/montserrat-var-italic.woff2 "Fly Uganda" 700      > logo/wordmark.json
python3 -I logo/outline.py app/fonts/montserrat-var.woff2 "UGANDA'S SAFARI AIRLINE" 600 160 > logo/tagline.json

# 2. Compose the lockups → public/brand/*.svg and components/brand-paths.ts
node logo/build.js

# 3. Raster set + social card → public/brand/png/, public/og-image.png
python3 -I logo/export.py
```

`outline.py` needs `fonttools`, `brotli` and `uharfbuzz` (`pip install`). `export.py` needs
Playwright with Chromium.

The ribbon geometry lives in `ribbon()` inside `build.js`: a cubic spine, four strands
offset along its normal, thickness tapering with `t`, lower strands ending a little short
so the tail fans. Change the control points there.
