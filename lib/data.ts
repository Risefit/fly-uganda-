// Single source of truth for hard-coded v1 content (CMS-ready later).
//
// AIRPORT CODE CONVENTION: `code` is the ICAO location indicator for every
// airport, so the whole site reads the same way (HUKJ, HUKH, HUKI, HUKS, HUKF,
// HUGG, HUAR, HUGU, HUMO, HUKD). IATA codes, where they exist, are in
// `iata` for the PSS / GDS feed and the timetable footnote. Two to confirm
// with UCAA before launch: HUKH for Kihihi (Savannah) — no ICAO indicator is
// published for it, HUKH is the working designator — and HUKF for Kabalega
// International, Hoima (AC-U-KWIK; also lists IATA KBG). `code` is also the
// /routes/[code] URL slug.
//
// POSITIONING: Fly Uganda is a scheduled, ticketed domestic airline. Copy in
// this file describes places by what they are to the people who live and work
// there as well as to visitors — the parks are destinations, not the premise.
//
// ⚠️ COMMERCIAL: nothing in this file may carry net, rack or contracted
// rates. FARES below are INDICATIVE PUBLISHED retail seat fares only, and are
// placeholders pending sign-off — see §9 of PROJECT-HANDOVER.md.

export type Airport = {
  code: string; // ICAO
  iata?: string;
  city: string;
  country: string;
};

export const HUB: Airport = {
  code: "HUKJ",
  city: "Kajjansi",
  country: "Uganda",
};

export const DESTINATIONS: Airport[] = [
  { code: "HUKH", iata: "KHX", city: "Kihihi", country: "Uganda" },
  { code: "HUKI", iata: "KXO", city: "Kisoro", country: "Uganda" },
  { code: "HUKS", iata: "KSE", city: "Kasese", country: "Uganda" },
  { code: "HUKF", city: "Hoima", country: "Uganda" },
  { code: "HUGG", city: "Bugungu", country: "Uganda" },
  { code: "HUAR", iata: "RUA", city: "Arua", country: "Uganda" },
  { code: "HUGU", iata: "ULU", city: "Gulu", country: "Uganda" },
  { code: "HUMO", city: "Moroto", country: "Uganda" },
  { code: "HUKD", city: "Kidepo", country: "Uganda" },
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
  { from: "HUKJ", to: "HUKH", city: "Kihihi", park: "Kanungu · Bwindi (north) & Ishasha", frequency: "1× daily", blockTime: "1h 25m", type: "Scheduled", status: "live" },
  { from: "HUKJ", to: "HUKI", city: "Kisoro", park: "Kisoro town · Bwindi (south), Mgahinga & the Rwanda border", frequency: "1× daily", blockTime: "1h 30m", type: "Scheduled", status: "live" },
  { from: "HUKJ", to: "HUKS", city: "Kasese", park: "Kasese town · Rwenzori & Queen Elizabeth (north)", frequency: "1× daily", blockTime: "1h 15m", type: "Scheduled", status: "live" },
  { from: "HUKJ", to: "HUKF", city: "Hoima", park: "Bunyoro · Kabalega International, the refinery & Kingfisher", frequency: "3× weekly", blockTime: "0h 45m", type: "Scheduled", status: "live" },
  { from: "HUKJ", to: "HUGG", city: "Bugungu", park: "Buliisa · Murchison Falls & the Tilenga oil area", frequency: "3× weekly", blockTime: "1h 05m", type: "Scheduled", status: "live" },
  { from: "HUKJ", to: "HUAR", city: "Arua", park: "West Nile · Arua city & the DRC and South Sudan border trade", frequency: "1× daily", blockTime: "1h 05m", type: "Scheduled", status: "live" },
  { from: "HUKJ", to: "HUGU", city: "Gulu", park: "Acholi · Gulu city, the hub of the north", frequency: "1× daily", blockTime: "0h 55m", type: "Scheduled", status: "live" },
  { from: "HUKJ", to: "HUMO", city: "Moroto", park: "Karamoja · Moroto town & Mount Moroto", frequency: "3× weekly", blockTime: "1h 25m", type: "Scheduled", status: "live" },
  { from: "HUKJ", to: "HUKD", city: "Kidepo", park: "Karamoja · Kidepo Valley", frequency: "3× weekly", blockTime: "1h 40m", type: "Scheduled", status: "live" },
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
    code: "HUKH",
    city: "Kihihi",
    tag: "Kanungu · Bwindi",
    blurb: "Eighty-five minutes to Kanungu district and the edge of the Impenetrable Forest.",
    image: "/scenes/kihihi.svg",
  },
  {
    code: "HUKS",
    city: "Kasese",
    tag: "Rwenzori · western Uganda",
    blurb: "Seventy-five minutes to Kasese town, Kilembe and the Rwenzori trailheads.",
    image: "/scenes/kasese.svg",
  },
  {
    code: "HUGU",
    city: "Gulu",
    tag: "Acholi · the north",
    blurb: "Fifty-five minutes on the 1900D to the commercial capital of northern Uganda.",
    image: "/scenes/hugu.svg",
  },
  {
    code: "HUKD",
    city: "Kidepo",
    tag: "The far north",
    blurb: "An hour and forty minutes to the valley most visitors never reach.",
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
