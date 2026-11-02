import { OIL_CORRIDOR } from "@/lib/content";

// Static SVG of the Albertine Graben cargo network, ex-Kajjansi.
export function OilCorridorMap() {
  const hub = OIL_CORRIDOR.find((p) => p.hub)!;
  return (
    <div className="overflow-hidden rounded-2xl bg-nile p-3 ring-1 ring-nile/15">
      <svg viewBox="0 0 520 440" className="h-auto w-full" role="img" aria-label="Albertine Graben cargo network from Kajjansi">
        <defs>
          <linearGradient id="cargoArc" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#F0CF72" />
            <stop offset="100%" stopColor="#D2A017" />
          </linearGradient>
        </defs>

        {/* Region + Nile flow-line */}
        {/* Lake Albert and the Albertine escarpment — the corridor's spine */}
        <path
          d="M150 330 Q186 250 206 196 Q226 146 250 112 Q284 120 268 176 Q246 242 212 310 Q186 352 150 330 Z"
          fill="rgba(140,200,220,0.12)"
          stroke="rgba(140,200,220,0.2)"
          strokeWidth="1"
        />
        <path d="M360 370 Q320 320 286 270 Q252 210 236 150" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" strokeDasharray="2 5" />

        {/* Corridor arcs */}
        {OIL_CORRIDOR.filter((p) => !p.hub).map((p) => {
          const mx = (hub.x + p.x) / 2;
          const my = (hub.y + p.y) / 2 - 40;
          return (
            <path
              key={p.name}
              d={`M ${hub.x} ${hub.y} Q ${mx} ${my} ${p.x} ${p.y}`}
              fill="none"
              stroke="url(#cargoArc)"
              strokeWidth="1.75"
              strokeLinecap="round"
              opacity="0.85"
            />
          );
        })}

        {/* Nodes */}
        {OIL_CORRIDOR.map((p) => (
          <g key={p.name}>
            <circle cx={p.x} cy={p.y} r={p.hub ? 7 : 5} fill={p.hub ? "#D2A017" : "#F4F1E6"} />
            {p.hub && <circle cx={p.x} cy={p.y} r="12" fill="none" stroke="#D2A017" strokeWidth="1" opacity="0.5" />}
            <text
              x={p.x}
              y={p.y - 12}
              textAnchor="middle"
              fontSize="12"
              fontWeight={p.hub ? 700 : 500}
              fill="rgba(244,241,230,0.9)"
            >
              {p.name}
            </text>
          </g>
        ))}
      </svg>
      <p className="px-3 pb-2 pt-1 text-right text-[0.65rem] uppercase tracking-widest text-paper/40">
        Charter &amp; cargo network · Albertine Graben
      </p>
    </div>
  );
}
