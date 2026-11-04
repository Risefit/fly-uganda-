import type { Position, TrackingProvider } from "@/lib/tracking/types";

/**
 * Spidertracks (Fleet Manager) — Automated Flight Following (AFF) API.
 *
 * Endpoint: POST https://apigw.spidertracks.io/go/aff/feed
 * Auth:     the consumer account's username/password (HTTP Basic), issued once
 *           the "API Consumer Application" is approved and each aircraft is
 *           ticked under Aircraft → AFF/API in the organisation.
 * Body:     AFF 1.1 "dataRequest" JSON — see the Spidertracks AFF integration
 *           guide and the AFF JSON specification it references. Only data
 *           created after the feed was enabled is returned.
 *
 * Env:  SPIDERTRACKS_USER, SPIDERTRACKS_PASSWORD, optional SPIDERTRACKS_URL.
 *
 * ⚠️ UNVERIFIED against a live account: field names in parse() follow the AFF
 * JSON spec (acftLocation / acftIdent / posTime …) — adjust once the first
 * real response is in hand. Nothing else in the site needs to change.
 */
const DEFAULT_URL = "https://apigw.spidertracks.io/go/aff/feed";

export function spidertracksConfigured(): boolean {
  return Boolean(process.env.SPIDERTRACKS_USER && process.env.SPIDERTRACKS_PASSWORD);
}

export const spidertracks: TrackingProvider = {
  name: "spidertracks",
  async positions(sinceIso, regs) {
    const user = process.env.SPIDERTRACKS_USER ?? "";
    const pass = process.env.SPIDERTRACKS_PASSWORD ?? "";
    const url = process.env.SPIDERTRACKS_URL ?? DEFAULT_URL;
    const body = {
      type: "dataRequest",
      dataInfo: [
        {
          affVer: "1.1",
          provider: "spidertracks",
          rptTime: new Date().toISOString(),
          sysId: "flyuganda-web",
          dataReq: { reqType: "posAfter", posAfter: sinceIso },
        },
      ],
    };
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(`${user}:${pass}`).toString("base64"),
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Spidertracks AFF ${res.status}: ${await res.text()}`);
    const all = parse(await res.json());
    return regs?.length ? all.filter((p) => regs.includes(p.reg)) : all;
  },
};

/** Walk the AFF response defensively — the exact nesting varies by provider. */
function parse(json: unknown): Position[] {
  const out: Position[] = [];
  const visit = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) return node.forEach(visit);
    const o = node as Record<string, unknown>;
    const loc = (o.acftLocation ?? o.position ?? o) as Record<string, unknown>;
    const lat = num(loc.lat ?? loc.latitude);
    const lon = num(loc.long ?? loc.lon ?? loc.longitude);
    const reg = str(o.acftIdent ?? o.registration ?? o.tail ?? o.esn);
    const at = str(loc.posTime ?? o.posTime ?? o.timestamp ?? o.time);
    if (lat !== null && lon !== null && reg && at) {
      out.push({
        reg: reg.toUpperCase(),
        at: new Date(at).toISOString(),
        lat,
        lon,
        altFt: num(loc.alt ?? o.alt) ?? undefined,
        gsKt: num(loc.speed ?? o.speed ?? o.gs) ?? undefined,
        cog: num(loc.cog ?? o.cog ?? o.heading) ?? undefined,
      });
      return;
    }
    Object.values(o).forEach(visit);
  };
  visit(json);
  return out;
}
const num = (v: unknown): number | null =>
  typeof v === "number" && Number.isFinite(v) ? v : typeof v === "string" && v.trim() !== "" && Number.isFinite(Number(v)) ? Number(v) : null;
const str = (v: unknown): string | null => (typeof v === "string" && v ? v : typeof v === "number" ? String(v) : null);
