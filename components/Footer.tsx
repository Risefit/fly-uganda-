import Link from "next/link";
import { Linkedin, Instagram, Facebook, Youtube } from "lucide-react";
import { CONTACT, NAV } from "@/lib/data";
import { Logo, RibbonBand, Webale } from "@/components/brand";

const COLUMNS = [
  {
    title: "Fly",
    links: [
      { label: "Book a flight", href: "/book" },
      { label: "Routes & network", href: "/routes" },
      { label: "Schedule", href: "/schedule" },
      { label: "Pearl Club", href: "/pearl-club" },
      { label: "Manage booking", href: "/manage" },
      { label: "Check-in", href: "/check-in" },
      { label: "Flight status", href: "/flight-status" },
    ],
  },
  {
    title: "Airline",
    links: [
      { label: "About us", href: "/about" },
      { label: "Cargo", href: "/cargo" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Careers", href: "/careers" },
      { label: "Press & news", href: "/press" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Travel",
    links: [
      { label: "Destinations", href: "/destinations" },
      { label: "Travel info", href: "/travel-info" },
      { label: "Baggage", href: "/travel-info#baggage" },
      { label: "Special assistance", href: "/travel-info#assistance" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Conditions of carriage", href: "/legal/terms" },
      { label: "Privacy policy", href: "/legal/privacy" },
      { label: "Cookie policy", href: "/legal/cookies" },
    ],
  },
];

const SOCIAL = [
  { Icon: Linkedin, label: "LinkedIn", href: "#" },
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Facebook, label: "Facebook", href: "#" },
  { Icon: Youtube, label: "YouTube", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-aviation-900 text-warm">
      <RibbonBand className="!h-1.5" />

      <div className="container-site grid gap-10 py-14 lg:grid-cols-[1.3fr_2fr]">
        <div>
          <Logo tone="dark" />
          <p className="mt-5 font-display text-base font-semibold uppercase tracking-wide2 text-opportunity">Uganda&rsquo;s safari airline</p>
          <p className="mt-1 text-sm text-warm/60">
            <Webale tone="dark" /> — thank you for flying with us.
          </p>
          <address className="mt-5 not-italic text-sm leading-relaxed text-warm/70">
            {CONTACT.office}
            <br />
            <a href={`mailto:${CONTACT.care}`} className="hover:text-opportunity-300">{CONTACT.care}</a>
            <br />
            <a href="tel:+256" className="hover:text-opportunity-300">{CONTACT.phone}</a>
          </address>
          <div className="mt-6 flex gap-3">
            {SOCIAL.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-warm/80 transition-colors hover:border-opportunity hover:text-opportunity-300"
              >
                <Icon className="h-4 w-4" aria-hidden />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-[0.7rem] font-medium uppercase tracking-wide2 text-opportunity-300">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-warm/70 hover:text-warm">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-5 text-xs text-warm/55 sm:flex-row">
          <p>© 2026 Fly Uganda. Operated under the Kampala Executive Aviation AOC.</p>
          <div className="flex items-center gap-5">
            {NAV.utility.map((u) => (
              <Link key={u.href} href={u.href} className="hover:text-warm">{u.label}</Link>
            ))}
            <span className="text-warm/70">Kajjansi · HUKJ</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
