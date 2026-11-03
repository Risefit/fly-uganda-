const fs = require("fs");
const WM = JSON.parse(fs.readFileSync(__dirname + "/wordmark.json", "utf8"));
const TG = JSON.parse(fs.readFileSync(__dirname + "/tagline.json", "utf8"));
const f = (n) => Number(n.toFixed(2));

const C = { growth:"#006B4F", opportunity:"#FFA400", energy:"#D71920", heritage:"#7A0019",
            aviation:"#0B1F3B", cream:"#F6E9DB", white:"#FFFFFF" };

// ---- cubic Bezier sampling -------------------------------------------------
const bez = (p0,p1,p2,p3,t) => {
  const u=1-t, a=u*u*u, b=3*u*u*t, c=3*u*t*t, d=t*t*t;
  return [a*p0[0]+b*p1[0]+c*p2[0]+d*p3[0], a*p0[1]+b*p1[1]+c*p2[1]+d*p3[1]];
};
const bezD = (p0,p1,p2,p3,t) => {
  const u=1-t, a=3*u*u, b=6*u*t, c=3*t*t;
  return [a*(p1[0]-p0[0])+b*(p2[0]-p1[0])+c*(p3[0]-p2[0]),
          a*(p1[1]-p0[1])+b*(p2[1]-p1[1])+c*(p3[1]-p2[1])];
};

/**
 * A ribbon strand: a band of varying thickness following a cubic spine,
 * offset perpendicular to the curve. Sampled densely so the silhouette is
 * smooth at any scale — no hand-traced control points.
 */
function strand({ p0,p1,p2,p3, offset, thick0, thick1, N=96, taper=2.2, tEnd=1 }) {
  const top=[], bot=[];
  for (let i=0;i<=N;i++){
    const t=(i/N)*tEnd;
    const [x,y]=bez(p0,p1,p2,p3,t);
    const [dx,dy]=bezD(p0,p1,p2,p3,t);
    const L=Math.hypot(dx,dy)||1;
    const nx=-dy/L, ny=dx/L;               // unit normal
    const th=thick0+(thick1-thick0)*Math.pow(t,taper);
    const o=offset;
    top.push([x+nx*o,          y+ny*o]);
    bot.push([x+nx*(o+th),     y+ny*(o+th)]);
  }
  const d = "M"+top.map(p=>`${f(p[0])} ${f(p[1])}`).join(" L")
          + " L"+bot.reverse().map(p=>`${f(p[0])} ${f(p[1])}`).join(" L")+" Z";
  return d;
}

// The ribbon: four strands of the identity, rising left to right and tapering
// into the flick at the tail. Spine shared, offsets stacked.
function ribbon(scale=1, order=[C.growth,C.opportunity,C.energy,C.heritage]) {
  // A flag caught in a tailwind: thick at the left, rising through a gentle S,
  // tapering to a flick. Lower strands stop a little short so the tail fans.
  const p0=[0,110], p1=[110,20], p2=[250,-4], p3=[470,-84];
  const TH=30, GAP=2.5;
  return order.map((col,i)=>{
    const d = strand({p0,p1,p2,p3, offset:i*(TH+GAP), thick0:TH, thick1:TH*0.30,
                      N:110, taper:1.8, tEnd: 1 - i*0.045});
    return `<path d="${d}" fill="${col}"/>`;
  }).join("\n    ");
}

// ---- wordmark --------------------------------------------------------------
// Glyph outlines, baseline at y=0, y-down (already flipped by the extractor).
const WM_W = WM.advance, CAP = 700;
function wordmark(targetCapHeight, x, baselineY, fill) {
  const s = targetCapHeight / CAP;
  return `<g transform="translate(${f(x)} ${f(baselineY)}) scale(${f(s)})" fill="${fill}">`
       + `<path d="${WM.d}"/></g>`;
}
const wmWidth = (capH) => WM_W * (capH / CAP);
function tagline(capH, x, baselineY, fill) {
  const s = capH / CAP;
  return `<g transform="translate(${f(x)} ${f(baselineY)}) scale(${f(s)})" fill="${fill}"><path d="${TG.d}"/></g>`;
}
const tgWidth = (capH) => TG.advance * (capH / CAP);

// ---- lockups ---------------------------------------------------------------
function primary({ wordColour, tagColour, ribbonOrder, bg }) {
  const CAPH = 112, X = 70, BASE = 292;
  const w = wmWidth(CAPH);
  const rs = 0.78;
  const tagY = BASE + 70;
  const ruleW = 46;
  const tagX = X + 4;
  const bgRect = bg ? `<rect width="1180" height="430" fill="${bg}"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1180 430" role="img" aria-label="Fly Uganda">
  <title>Fly Uganda</title>
  ${bgRect}
  <g transform="translate(${X - 6} 60) scale(${rs})">
    ${ribbon(1, ribbonOrder)}
  </g>
  ${wordmark(CAPH, X, BASE, wordColour)}
  <g>
    <rect x="${tagX}" y="${tagY - 5}" width="${ruleW}" height="3" fill="${C.opportunity}"/>
    ${tagline(21, tagX + ruleW + 18, tagY + 3, tagColour)}
  </g>
</svg>
`;
}

function mono(colour, bg) {
  const CAPH = 112, X = 70, BASE = 292;
  const order = [colour,colour,colour,colour];
  const bgRect = bg ? `<rect width="1180" height="360" rx="0" fill="${bg}"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1180 360" role="img" aria-label="Fly Uganda">
  <title>Fly Uganda</title>
  ${bgRect}
  <g transform="translate(${X - 6} 60) scale(0.78)">
    ${ribbon(1, order)}
  </g>
  ${wordmark(CAPH, X, BASE, colour)}
</svg>
`;
}

function stacked() {
  const CAPH = 84, BASE = 318;
  const w = wmWidth(CAPH);
  const X = (900 - w) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 470" role="img" aria-label="Fly Uganda">
  <title>Fly Uganda</title>
  <g transform="translate(${f(X + 10)} 112) scale(0.72)">
    ${ribbon()}
  </g>
  ${wordmark(CAPH, X, BASE, C.aviation)}
  ${tagline(19, (900 - tgWidth(19)) / 2, 392, C.opportunity)}
</svg>
`;
}

// App icon / favicon: the ribbon alone, on Aviation navy
function icon(size=256) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-label="Fly Uganda">
  <title>Fly Uganda</title>
  <rect width="256" height="256" rx="56" fill="${C.aviation}"/>
  <g transform="translate(28 176) scale(0.42)">
    ${ribbon()}
  </g>
</svg>
`;
}

const out = __dirname + "/../public/brand";
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(`${out}/fly-uganda-primary.svg`, primary({ wordColour:C.aviation, tagColour:C.opportunity }));
fs.writeFileSync(`${out}/fly-uganda-reversed.svg`, primary({ wordColour:"#FFFFFF", tagColour:C.opportunity, bg:C.aviation }));
fs.writeFileSync(`${out}/fly-uganda-stacked.svg`, stacked());
fs.writeFileSync(`${out}/fly-uganda-mono-black.svg`, mono(C.aviation));
fs.writeFileSync(`${out}/fly-uganda-mono-white.svg`, mono("#FFFFFF", C.aviation));
fs.writeFileSync(`${out}/fly-uganda-icon.svg`, icon());
fs.writeFileSync(__dirname + "/ribbon-only.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -40 560 150">${ribbon()}</svg>`);
console.log("wordmark width @cap132:", f(wmWidth(132)));
console.log("written:", fs.readdirSync(out).join("  "));

// ---- emit path data for the React brand module ----------------------------
{
  const order = ["growth","opportunity","energy","heritage"];
  const p0=[0,110], p1=[110,20], p2=[250,-4], p3=[470,-84];
  const TH=30, GAP=2.5;
  const strands = order.map((k,i)=>({
    colour: k,
    d: strand({p0,p1,p2,p3, offset:i*(TH+GAP), thick0:TH, thick1:TH*0.30, N:110, taper:1.8, tEnd:1 - i*0.045}),
  }));
  const ts = `// GENERATED by logo/build.js — do not edit by hand.
// Ribbon strands, wordmark and tagline as outlined paths. The wordmark is
// Montserrat Bold Italic and the tagline Montserrat SemiBold, both shaped with
// HarfBuzz and converted to paths, so nothing here depends on a font.

export const RIBBON: { colour: "growth" | "opportunity" | "energy" | "heritage"; d: string }[] = ${JSON.stringify(strands, null, 0)};

/** Ribbon geometry bounds, in the same units as the strand paths. */
export const RIBBON_BOX = { x: -2, y: -96, w: 476, h: 236 };

/** "Fly Uganda" — baseline at y=0, cap height 700, advance ${f(WM.advance)}. */
export const WORDMARK_D = ${JSON.stringify(WM.d)};
export const WORDMARK_ADVANCE = ${f(WM.advance)};

/** "UGANDA'S DOMESTIC AIRLINE" — baseline at y=0, cap height 700, advance ${f(TG.advance)}. */
export const TAGLINE_D = ${JSON.stringify(TG.d)};
export const TAGLINE_ADVANCE = ${f(TG.advance)};
`;
  fs.writeFileSync(__dirname + "/../components/brand-paths.ts", ts);
  console.log("brand-paths.ts:", (ts.length/1024).toFixed(1), "KB");
}
