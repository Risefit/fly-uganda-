from playwright.sync_api import sync_playwright
import pathlib
B = pathlib.Path("" + str(pathlib.Path(__file__).resolve().parent.parent / "public/brand") + "")
OUT = B / "png"
jobs = [  # (svg, out name, width px, bg)
  ("fly-uganda-primary.svg",   "fly-uganda-primary-2000.png",  2000, "transparent"),
  ("fly-uganda-primary.svg",   "fly-uganda-primary-800.png",    800, "transparent"),
  ("fly-uganda-reversed.svg",  "fly-uganda-reversed-2000.png", 2000, "transparent"),
  ("fly-uganda-stacked.svg",   "fly-uganda-stacked-1200.png",  1200, "transparent"),
  ("fly-uganda-mono-black.svg","fly-uganda-mono-black-1600.png",1600,"transparent"),
  ("fly-uganda-mono-white.svg","fly-uganda-mono-white-1600.png",1600,"transparent"),
  ("fly-uganda-icon.svg",      "icon-512.png", 512, "transparent"),
  ("fly-uganda-icon.svg",      "icon-192.png", 192, "transparent"),
  ("fly-uganda-icon.svg",      "apple-touch-icon-180.png", 180, "transparent"),
  ("fly-uganda-icon.svg",      "favicon-32.png", 32, "transparent"),
]
with sync_playwright() as p:
    b = p.chromium.launch()
    for svg, name, w, bg in jobs:
        s = (B / svg).read_text()
        # read the viewBox to get the aspect ratio
        vb = s.split('viewBox="')[1].split('"')[0].split()
        vw, vh = float(vb[2]), float(vb[3])
        h = round(w * vh / vw)
        pg = b.new_page(viewport={"width": w, "height": h}, device_scale_factor=1)
        sized = s.replace("<svg", f'<svg width="{w}" height="{h}"', 1)
        pg.set_content(f'<html><body style="margin:0;background:{bg}">{sized}</body></html>')
        pg.wait_for_timeout(150)
        pg.screenshot(path=str(OUT / name), omit_background=True)
        pg.close()
        print(f"  {name:36s} {w}×{h}")
    # Open Graph / social share card — 1200×630 on Aviation navy
    rev = (B / "fly-uganda-reversed.svg").read_text()
    inner = rev.split(">", 1)[1].rsplit("</svg>", 1)[0]
    inner = inner.replace('<rect width="1180" height="430" fill="#0B1F3B"/>', "")
    og = f'''<html><body style="margin:0;background:#0B1F3B;width:1200px;height:630px;position:relative;overflow:hidden">
      <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
        <rect width="1200" height="630" fill="#0B1F3B"/>
        <g transform="translate(60 100) scale(0.9)">{inner}</g>
        <rect x="0" y="618" width="1200" height="12" fill="#006B4F"/>
        <rect x="300" y="618" width="300" height="12" fill="#FFA400"/>
        <rect x="600" y="618" width="300" height="12" fill="#D71920"/>
        <rect x="900" y="618" width="300" height="12" fill="#7A0019"/>
      </svg></body></html>'''
    pg = b.new_page(viewport={"width": 1200, "height": 630})
    pg.set_content(og); pg.wait_for_timeout(150)
    pg.screenshot(path=str(pathlib.Path(__file__).resolve().parent.parent / "public/og-image.png"))
    print("  og-image.png                         1200×630")
    b.close()
