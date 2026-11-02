// Single source of truth for hard-coded v1 content (CMS-ready later).
//
// AIRPORT CODE CONVENTION: `code` is the IATA code where one has been
// allocated (EBB, KHX, KXO, KSE, PAF) and the ICAO code where it has not
// (HUKJ, HUMW, HUGG, HUKD). Ugandan bush strips are inconsistently coded and
// this mix is what operators and ground handlers actually quote. Airstrips
// with neither (Chobe, Semliki, Lake Mburo) are listed by name only, under
// CHARTER_DESTINATIONS. `code` is also the /routes/[code] URL slug.
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
  park: string;
  frequency: string;
  blockTime: string;
  type: "Scheduled" | "Connection";
  status: RouteStatus;
};

// Scheduled seat network — all ex-Kajjansi (HUKJ).
export const ROUTES: Route[] = [
  { from: "HUKJ", to: "KHX", city: "Kihihi", park: "Bwindi Impenetrable (north) & Ishasha", frequency: "2× daily", blockTime: "1h 30m", type: "Scheduled", status: "live" },
  { from: "HUKJ", to: "KXO", city: "Kisoro", park: "Bwindi (south) & Mgahinga Gorilla", frequency: "1× daily", blockTime: "1h 40m", type: "Scheduled", status: "live" },
  { from: "HUKJ", to: "HUMW", city: "Mweya", park: "Queen Elizabeth", frequency: "1× daily", blockTime: "1h 20m", type: "Scheduled", status: "live" },
  { from: "HUKJ", to: "KSE", city: "Kasese", park: "Rwenzori Mountains & Queen Elizabeth (north)", frequency: "1× daily", blockTime: "1h 10m", type: "Scheduled", status: "live" },
  { from: "HUKJ", to: "PAF", city: "Pakuba", park: "Murchison Falls (north bank)", frequency: "1× daily", blockTime: "1h 20m", type: "Scheduled", status: "live" },
  { from: "HUKJ", to: "HUGG", city: "Bugungu", park: "Murchison Falls (south bank)", frequency: "1× daily", blockTime: "1h 15m", type: "Scheduled", status: "live" },
  { from: "HUKJ", to: "HUKD", city: "Kidepo", park: "Kidepo Valley", frequency: "3× weekly", blockTime: "2h 00m", type: "Scheduled", status: "live" },
  { from: "HUKJ", to: "EBB", city: "Entebbe", park: "International connections", frequency: "On demand", blockTime: "0h 15m", type: "Connection", status: "live" },
];

// Served on charter and on request — no allocated airport code.
export const CHARTER_DESTINATIONS = [
  "Chobe",
  "Semliki",
  "Lake Mburo",
  "Jinja",
  "Arua",
  "Gulu",
  "Moroto",
  "Pakwach",
];

// Regional links flown with partner carriers, or under development.
export const PLANNED_CITIES = [
  "Serengeti",
  "Masai Mara",
  "Kigali",
  "Nairobi Wilson",
  "Zanzibar",
];

// ⚠️ INDICATIVE retail seat fares — placeholders for the brochure build.
// Replace with the signed published fare sheet before launch. Never put net,
// rack or contracted rates in this file: it ships to the browser.
export const FARES = {
  parkOneWay: "from USD 290",
  parkReturn: "from USD 540",
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
    title: "Built for the bush",
    body: "Grand Caravans sized for short murram strips, big windows and two pilots up front. The flight is part of the safari, not a transfer between them.",
  },
  {
    title: "Scheduled and charter, one operator",
    body: "Take a seat on the daily service or charter the whole aircraft. Same crews, same hangar, one point of contact for the whole itinerary.",
  },
];

export type Aircraft = {
  name: string;
  role: string;
  seats: string;
  range: string;
  count: string;
  blurb: string;
};

export const FLEET: Aircraft[] = [
  {
    name: "Cessna 208EX Grand Caravan",
    role: "Scheduled safari service",
    seats: "12 seats · every seat a window",
    range: "Short unpaved strips",
    count: "The scheduled workhorse",
    blurb:
      "The aircraft behind every scheduled departure. High wing, big windows and the short-field performance to use the murram strips inside the parks themselves.",
  },
  {
    name: "Beechcraft 1900D",
    role: "Group & corporate charter",
    seats: "19 seats · stand-up cabin",
    range: "Pressurised twin turboprop",
    count: "For larger parties",
    blurb:
      "For tour groups, conference movements and NGO rotations — a pressurised 19-seat cabin that turns a full-day road transfer into an hour in the air.",
  },
  {
    name: "Cessna 206 & 210",
    role: "Light charter",
    seats: "5 seats",
    range: "Single-engine, strip-capable",
    count: "Point to point",
    blurb:
      "The flexible option for small parties, lodge transfers and the strips the bigger aircraft cannot reach.",
  },
  {
    name: "Airbus H125 & H130",
    role: "Helicopter safari",
    seats: "Up to 6 seats",
    range: "Operated with Elevate",
    count: "Scenic & access",
    blurb:
      "Helicopter scenics and remote access across the Rift Valley, operated from Kajjansi with our sister operation Elevate.",
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
// ⚠️ IMAGERY: these are Unsplash placeholders so the homepage runs today.
// Replace every one with Fly Uganda / KEA photography before launch — see §6
// of PROJECT-HANDOVER.md.
export const DESTINATION_TILES: Destination[] = [
  {
    code: "KHX",
    city: "Kihihi",
    tag: "Bwindi · gorillas",
    blurb: "Ninety minutes to the edge of the Impenetrable Forest.",
    image: "/scenes/kihihi.svg",
  },
  {
    code: "HUMW",
    city: "Mweya",
    tag: "Queen Elizabeth",
    blurb: "Land on the peninsula, be on the Kazinga Channel by lunch.",
    image: "/scenes/mweya.svg",
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
