import Link from "next/link";
import { Luggage, ClipboardList, CheckSquare, Radar } from "lucide-react";

/**
 * The four actions a returning customer wants without reading anything — from
 * the identity toolkit's website panel. Overlaps the hero's bottom edge.
 */
const ACTIONS = [
  { label: "Baggage & travel info", sub: "What to bring, when to arrive", href: "/travel-info", Icon: Luggage },
  { label: "Manage booking", sub: "Change or review", href: "/manage", Icon: ClipboardList },
  { label: "Check in", sub: "Opens 24h before", href: "/check-in", Icon: CheckSquare },
  { label: "Flight status", sub: "Today's departures", href: "/flight-status", Icon: Radar },
];

export function QuickActions() {
  return (
    <section aria-label="Quick actions" className="relative z-10 -mt-14 sm:-mt-16">
      <div className="container-site">
        <ul className="grid overflow-hidden rounded-2xl bg-warm shadow-lift ring-1 ring-aviation/[0.08] sm:grid-cols-2 lg:grid-cols-4">
          {ACTIONS.map(({ label, sub, href, Icon }, i) => (
            <li key={href} className={i > 0 ? "border-t border-aviation/10 sm:border-t-0 sm:border-l" : ""}>
              <Link
                href={href}
                className="group flex items-center gap-4 px-6 py-5 transition-colors hover:bg-cream"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-opportunity/15 text-opportunity-700 transition-colors group-hover:bg-opportunity group-hover:text-aviation">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block font-display text-[0.95rem] font-semibold text-ink">{label}</span>
                  <span className="block text-sm text-muted">{sub}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
