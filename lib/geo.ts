/** Real coordinates for every strip on the network — [lon, lat]. */
export const AIRPORTS: Record<string, { lonlat: [number, number]; label: string }> = {
  HUKJ: { lonlat: [32.5533, 0.1958], label: "Kajjansi" },
  EBB: { lonlat: [32.4435, 0.0424], label: "Entebbe" },
  KHX: { lonlat: [29.7, -0.7194], label: "Kihihi" },
  KXO: { lonlat: [29.719, -1.285], label: "Kisoro" },
  HUMW: { lonlat: [29.89, -0.19], label: "Mweya" },
  KSE: { lonlat: [30.1, 0.183], label: "Kasese" },
  PAF: { lonlat: [31.5, 2.32], label: "Pakuba" },
  HUGG: { lonlat: [31.5708, 2.1968], label: "Bugungu" },
  HUKD: { lonlat: [33.75, 3.717], label: "Kidepo" },
};

/** "1h 30m" → 90 */
export function blockMinutes(s: string): number {
  const h = /(\d+)h/.exec(s), m = /(\d+)m/.exec(s);
  return (h ? +h[1] * 60 : 0) + (m ? +m[1] : 0);
}
