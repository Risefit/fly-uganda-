/** Real coordinates for every strip on the network — [lon, lat]. */
export const AIRPORTS: Record<string, { lonlat: [number, number]; label: string }> = {
  HUKJ: { lonlat: [32.5533, 0.1958], label: "Kajjansi" },
  HUEN: { lonlat: [32.4435, 0.0424], label: "Entebbe" },
  HUKH: { lonlat: [29.7, -0.7194], label: "Kihihi" },
  HUKI: { lonlat: [29.719, -1.285], label: "Kisoro" },
  HUKS: { lonlat: [30.1, 0.183], label: "Kasese" },
  HUKF: { lonlat: [31.0778, 1.4275], label: "Hoima" },
  HUAR: { lonlat: [30.917, 3.05], label: "Arua" },
  HUGU: { lonlat: [32.2718, 2.8056], label: "Gulu" },
  HUMO: { lonlat: [34.5833, 2.4833], label: "Moroto" },
  HUGG: { lonlat: [31.5708, 2.1968], label: "Bugungu" },
  HUKD: { lonlat: [33.75, 3.717], label: "Kidepo" },
};

/** "1h 30m" → 90 */
export function blockMinutes(s: string): number {
  const h = /(\d+)h/.exec(s), m = /(\d+)m/.exec(s);
  return (h ? +h[1] * 60 : 0) + (m ? +m[1] : 0);
}
