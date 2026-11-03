/**
 * Builds the geodata the network map draws from. Run once; outputs are
 * committed. Sources:
 *   - world-atlas (npm)            countries, Natural Earth 10m/50m, TopoJSON
 *   - Natural Earth 10m lakes      scripts/ne_lakes.geojson  (public domain)
 *   - Natural Earth 10m rivers     scripts/ne_rivers.geojson (public domain)
 *
 *   node scripts/build-geo.mjs
 */
import fs from "node:fs";
import * as topojson from "topojson-client";

const out = (name, obj) => {
  fs.writeFileSync(`public/geo/${name}.json`, JSON.stringify(obj));
  console.log(`  ${name}.json`.padEnd(22), (fs.statSync(`public/geo/${name}.json`).size / 1024).toFixed(0), "KB");
};
const round = (f, p = 3) => JSON.parse(JSON.stringify(f, (k, v) => (typeof v === "number" ? Number(v.toFixed(p)) : v)));

// ---- Africa at 50m (the zoomed-out stage; detail is wasted there) ----------
const w50 = JSON.parse(fs.readFileSync("node_modules/world-atlas/countries-50m.json", "utf8"));
const fc50 = topojson.feature(w50, w50.objects.countries);
const notAfrica = new Set(["Spain","Portugal","Italy","France","Greece","Malta","Cyprus","Turkey","Israel","Lebanon","Syria","Jordan","Saudi Arabia","Yemen","Iraq","Iran","Kuwait","Oman","United Arab Emirates","Qatar","Bahrain","Palestine","Gibraltar","Armenia","Azerbaijan","Georgia","Albania","Montenegro","Bosnia and Herz.","Croatia","Slovenia","North Macedonia","Bulgaria","Kosovo","Serbia","Romania","Vatican","San Marino","Monaco","Andorra","Iceland","Faeroe Is.","Jersey","Guernsey","Fiji","N. Cyprus"]);
const centroid = (f) => { let xs = 0, ys = 0, n = 0; const walk = (c) => { if (typeof c[0] === "number") { xs += c[0]; ys += c[1]; n++; } else c.forEach(walk); }; walk(f.geometry.coordinates); return [xs / n, ys / n]; };
const africa = fc50.features.filter((f) => { const [x, y] = centroid(f); return x > -26 && x < 64 && y > -40 && y < 38 && !notAfrica.has(f.properties.name); });
out("africa", round({ type: "FeatureCollection", features: africa.map((f) => ({ type: "Feature", properties: { name: f.properties.name }, geometry: f.geometry })) }, 2));

// ---- Uganda + neighbours at 10m (the zoomed-in stage) ----------------------
const w10 = JSON.parse(fs.readFileSync("node_modules/world-atlas/countries-10m.json", "utf8"));
const fc10 = topojson.feature(w10, w10.objects.countries);
const pick = (n) => fc10.features.find((f) => f.properties.name === n);
const uganda = pick("Uganda");
out("uganda", round({ type: "Feature", properties: { name: "Uganda" }, geometry: uganda.geometry }));
const nbNames = ["Kenya", "S. Sudan", "Dem. Rep. Congo", "Rwanda", "Tanzania", "Burundi"];
out("neighbours", round({ type: "FeatureCollection", features: nbNames.map(pick).map((f) => ({ type: "Feature", properties: { name: f.properties.name }, geometry: f.geometry })) }));

// ---- Lakes: everything that touches the Uganda framing ----------------------
const lakes = JSON.parse(fs.readFileSync("scripts/ne_lakes.geojson", "utf8"));
const inBox = (f, [x0, y0, x1, y1]) => { let hit = false; const walk = (c) => { if (hit) return; if (typeof c[0] === "number") { if (c[0] > x0 && c[0] < x1 && c[1] > y0 && c[1] < y1) hit = true; } else c.forEach(walk); }; walk(f.geometry.coordinates); return hit; };
const BOX = [28.5, -3.0, 36.0, 5.0];
const ugLakes = lakes.features.filter((f) => inBox(f, BOX));
console.log("  lakes:", ugLakes.map((f) => f.properties.name).join(", "));
out("lakes", round({ type: "FeatureCollection", features: ugLakes.map((f) => ({ type: "Feature", properties: { name: f.properties.name }, geometry: f.geometry })) }));

// ---- The Nile and its lake centrelines through Uganda -----------------------
const rivers = JSON.parse(fs.readFileSync("scripts/ne_rivers.geojson", "utf8"));
const nile = rivers.features.filter((f) => /nile/i.test(f.properties.name || "") && inBox(f, BOX));
console.log("  rivers:", [...new Set(nile.map((f) => f.properties.name))].join(", "));
out("rivers", round({ type: "FeatureCollection", features: nile.map((f) => ({ type: "Feature", properties: { name: f.properties.name }, geometry: f.geometry })) }));
