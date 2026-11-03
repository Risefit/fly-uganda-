// Single source of truth for hard-coded v1 content (CMS-ready later).
//
// AIRPORT CODE CONVENTION: `code` is the IATA code where one has been
// allocated (EBB, KHX, KXO, KSE, PAF) and the ICAO code where it has not
// (HUKJ, HUMW, HUGG, HUKD). Ugandan park airstrips are inconsistently coded and
// this mix is what operators and ground handlers actually quote. `code` is
// also the /routes/[code] URL slug.
//
// POSITIONING: Fly Uganda is a scheduled, ticketed domestic airline. Copy in
// this file describes places by what they are to the people who live and work
// there as well as to visitors — the parks are destinations, not the premise.
//
// ⚠️ COMMERCIAL: nothing in this file may carry net, rack or contracted
// rates. FARES below are INDICATIVE PUBLISHED retail seat fares only, and are
// placeholders pending sign-off — see §9 of PROJECT-HANDOVER.md.

export type Airport = {
  code: string;
  city: string;
  country: string;
};

export const HUB: Airport = {
  code: "HUKJ",
  city: "Kajjansi",
  country: "Uganda",
};

export const DESTINATIONS: Airport[] = [
  { code: "KHX", city: "Kihihi", country: "Uganda" },
  { code: "KXO", city: "Kisoro", country: "Uganda" },
  { code: "HUMW", city: "Mweya", country: "Uganda" },
  { code: "KSE", city: "Kasese", country: "Uganda" },
  { code: "PAF", city: "Pakuba", country: "Uganda" },
  { code: "HUGG", city: "Bugungu", country: "Uganda" },
  { code: "HUKD", city: "Kidepo", country: "Uganda" },
  { code: "EBB", city: "Entebbe", country: "Uganda" },
];

export type RouteStatus = "live" | "planned";

export type Route = {
  from: string;
  to: string;
  city: string;
  park: string; // what the airstrip serves — district, town, park, project
  frequency: string;
  blockTime: string;
  type: "Scheduled" | "Connection";
  status: RouteStatus;
};

// Scheduled seat network — all ex-Kajjansi (HUKJ).
export const ROUTES: Route[] = [
  { from: "HUKJ", to: "KHX", city: "Kihihi", park: "Kanungu · Bwindi (north) & Ishasha", frequency: "2× daily", blockTime: "1h 30m", type: "Scheduled", status: "live" },
  { from: "HUKJ", to: "KXO", city: "Kisoro", park: "Kisoro town · Bwindi (south), Mgahinga & the Rwanda border", frequency: "1× daily", blockTime: "1h 40m", type: "Scheduled", status: "live" },
  { from: "HUKJ", to: "HUMW", city: "Mweya", park: "Queen Elizabeth", frequency: "1× daily", blockTime: "1h 20m", type: "Scheduled", status: "live" },
  { from: "HUKJ", to: "KSE", city: "Kasese", park: "Kasese town · Rwenzori & Queen Elizabeth (north)", frequency: "1× daily", blockTime: "1h 10m", type: "Scheduled", status: "live" },
  { from: "HUKJ", to: "PAF", city: "Pakuba", park: "Murchison Falls (north bank)", frequency: "1× daily", blockTime: "1h 20m", type: "Scheduled", status: "live" },
  { from: "HUKJ", to: "HUGG", city: "Bugungu", park: "Buliisa · Murchison Falls (south bank) & the Albertine oil area", frequency: "1× daily", blockTime: "1h 15m", type: "Scheduled", status: "live" },
  { from: "HUKJ", to: "HUKD", city: "Kidepo", park: "Karamoja · Kidepo Valley", frequency: "3× weekly", blockTime: "2h 00m", type: "Scheduled", status: "live" },
  { from: "HUKJ", to: "EBB", city: "Entebbe", park: "International connections", frequency: "On demand", blockTime: "0h 15m", type: "Connection", status: "live" },
];

// Regional links to be offered through interline and codeshare partners, or
// under development.
// Every entry here must also have a node in RouteMapFull → PLANNED_NODES,
// or it is named in the caption but never drawn on the map.
export const PLANNED_CITIES = [
  "Serengeti",
  "Masai Mara",
  "Kigali",
  "Nairobi Wilson",
];

// ⚠️ INDICATIVE retail seat fares — placeholders for the brochure build.
// Replace with the signed published fare sheet before launch. Never put net,
// rack or contracted rates in this file: it ships to the browser.
export const FARES = {
  oneWay: "from USD 290",
  return: "from USD 540",
  note: "Indicative per-seat fares, one way per person, including taxes. Confirmed at booking.",
};

// The four brand promises
export const PROMISES = [
  {
    title: "Closer to Kampala",
    body: "We fly from Kajjansi, on the Kampala side of Entebbe. That is around 30 minutes off your transfer at both ends of the day — and no international terminal to clear.",
  },
  {
    title: "Operated to AOC standard",
    body: "Flown under Kampala Executive Aviation's Uganda CAA Air Operator Certificate, with the maintenance organisation and crew standards that come with it.",
  },
  {
    title: "Built for Uganda's airstrips",
    body: "Grand Caravans and 1900Ds sized for short murram strips, so we land where you are going — the district town, the oil area or the park — not at the nearest tarmac two hours away.",
  },
  {
    title: "A ticket like any airline",
    body: "Published fares, e-tickets and a reservation system built for interline and codeshare, so a Fly Uganda sector can sit on the same ticket as your international flight.",
  },
];

export type Aircraft = {
  name: string;
  role: string;
  seats: string;
  range: string;
  count: string;
  blurb: string;
  image: string; // own photography from flykea.com (KEA) — see §6 of PROJECT-HANDOVER.md
  cabin: string;
  alt: string;
};

// Two types, both flown on the schedule. No other aircraft are marketed here.
export const FLEET: Aircraft[] = [
  {
    name: "Cessna 208EX Grand Caravan",
    role: "Scheduled services",
    seats: "12 seats · every seat a window",
    range: "Short unpaved strips",
    count: "The daily workhorse",
    blurb:
      "The aircraft behind most scheduled departures. High wing, big windows and the short-field performance to use the murram strips at Kihihi, Pakuba and Kidepo as easily as the tarmac at Kasese or Entebbe.",
    image: "/photos/fleet/c208ex.jpg",
    cabin: "/photos/fleet/c208ex-cabin.jpg",
    alt: "Two Cessna 208EX Grand Caravans on the apron at Kajjansi",
  },
  {
    name: "Beechcraft 1900D",
    role: "Scheduled services",
    seats: "19 seats · stand-up cabin",
    range: "Pressurised twin turboprop",
    count: "The busier sectors",
    blurb:
      "A pressurised 19-seat airliner for the higher-demand sectors and the longer legs — the same airstair, the same crews, and the same ticket as the Caravan.",
    image: "/photos/fleet/b1900.jpg",
    cabin: "/photos/fleet/b1900-cabin.jpg",
    alt: "Beechcraft 1900D 5X-KEH with its airstair down at Kajjansi",
  },
];

export type Destination = {
  code: string;
  city: string;
  tag: string;
  blurb: string;
  image: string;
};

// Editorial destination tiles on the homepage.
// ⚠️ IMAGERY: /scenes/*.svg are FIRST-PARTY brand illustrations built for this
// project (no third-party stock, no licence to clear). They are placeholders
// for real photography — see §6 of PROJECT-HANDOVER.md.
export const DESTINATION_TILES: Destination[] = [
  {
    code: "KHX",
    city: "Kihihi",
    tag: "Kanungu · Bwindi",
    blurb: "Ninety minutes to Kanungu district and the edge of the Impenetrable Forest.",
    image: "/scenes/kihihi.svg",
  },
  {
    code: "KSE",
    city: "Kasese",
    tag: "Rwenzori · western Uganda",
    blurb: "Seventy minutes to Kasese town, Kilembe and the Rwenzori trailheads.",
    image: "/scenes/kasese.svg",
  },
  {
    code: "PAF",
    city: "Pakuba",
    tag: "Murchison Falls",
    blurb: "The Nile squeezed through seven metres of rock, from the air.",
    image: "/scenes/pakuba.svg",
  },
  {
    code: "HUKD",
    city: "Kidepo",
    tag: "The far north",
    blurb: "Two hours to the valley most visitors never reach.",
    image: "/scenes/kidepo.svg",
  },
];

export const CONTACT = {
  office: "Gate 1, Kajjansi Airfield, Kampala–Entebbe Road, Uganda",
  care: "care@flyuganda.com",
  bookings: "reservations@flyuganda.com",
  cargo: "cargo@flyuganda.com",
  careers: "careers@flyuganda.com",
  phone: "+256 (TBC)",
};

export const NAV = {
  primary: [
    {
      label: "Where we fly",
      href: "/routes",
      children: [
        { label: "Routes & network", href: "/routes" },
        { label: "Schedule", href: "/schedule" },
        { label: "Destinations", href: "/destinations" },
      ],
    },
    { label: "Cargo", href: "/cargo" },
    { label: "Pearl Club", href: "/pearl-club" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  utility: [
    { label: "Sign in", href: "/pearl-club/account" },
    { label: "Manage booking", href: "/manage" },
    { label: "Check-in", href: "/check-in" },
  ],
};
