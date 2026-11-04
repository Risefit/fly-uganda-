// Page-level content for internal pages (v1 hard-coded, CMS-ready later).
//
// ⚠️ Flight numbers use the placeholder "FU" prefix. Replace with the
// designator actually filed with UCAA before launch.
// Timetable v1.4 — built for the fleet Phil assigned (2 × 208EX, 1 × 1900D):
// one line of flying per aircraft per day, block times from the great-circle
// distance at 160 kt (Caravan) / 260 kt (1900D) + 16 min taxi/climb, 20-min
// turnarounds up-country, 30–40 min at Kajjansi. Rotation plan and duty-time
// caveats are in PROJECT-HANDOVER.md §9b. Not yet a published timetable.

import { ROUTES, type Route } from "@/lib/data";

/* ---------------------------------- Schedule --------------------------------- */
export type Flight = {
  flightNo: string;
  from: string;
  to: string;
  city: string;
  dep: string;
  arr: string;
  days: string;
  aircraft: string;
};

const CARAVAN = "Grand Caravan";
const B1900 = "Beechcraft 1900D";

export const SCHEDULE: Flight[] = [
  // ── Caravan 1 (5X-FUA placeholder): the west, daily; Bugungu Tue/Thu/Sat ──
  { flightNo: "FU101", from: "HUKJ", to: "HUKH", city: "Kihihi", dep: "07:00", arr: "08:25", days: "Daily", aircraft: CARAVAN },
  { flightNo: "FU102", from: "HUKH", to: "HUKJ", city: "Kihihi", dep: "08:45", arr: "10:10", days: "Daily", aircraft: CARAVAN },
  { flightNo: "FU131", from: "HUKJ", to: "HUKS", city: "Kasese", dep: "10:50", arr: "12:05", days: "Daily", aircraft: CARAVAN },
  { flightNo: "FU132", from: "HUKS", to: "HUKJ", city: "Kasese", dep: "12:25", arr: "13:40", days: "Daily", aircraft: CARAVAN },
  { flightNo: "FU151", from: "HUKJ", to: "HUGG", city: "Bugungu", dep: "14:20", arr: "15:25", days: "Tue · Thu · Sat", aircraft: CARAVAN },
  { flightNo: "FU152", from: "HUGG", to: "HUKJ", city: "Bugungu", dep: "15:45", arr: "16:50", days: "Tue · Thu · Sat", aircraft: CARAVAN },
  // ── Caravan 2 (5X-FUB placeholder): Kisoro daily; Kidepo Mon/Wed/Fri, Moroto Tue/Thu/Sat ──
  { flightNo: "FU111", from: "HUKJ", to: "HUKI", city: "Kisoro", dep: "07:15", arr: "08:45", days: "Daily", aircraft: CARAVAN },
  { flightNo: "FU112", from: "HUKI", to: "HUKJ", city: "Kisoro", dep: "09:05", arr: "10:35", days: "Daily", aircraft: CARAVAN },
  { flightNo: "FU161", from: "HUKJ", to: "HUKD", city: "Kidepo", dep: "11:15", arr: "12:55", days: "Mon · Wed · Fri", aircraft: CARAVAN },
  { flightNo: "FU162", from: "HUKD", to: "HUKJ", city: "Kidepo", dep: "13:15", arr: "14:55", days: "Mon · Wed · Fri", aircraft: CARAVAN },
  { flightNo: "FU191", from: "HUKJ", to: "HUMO", city: "Moroto", dep: "11:15", arr: "12:40", days: "Tue · Thu · Sat", aircraft: CARAVAN },
  { flightNo: "FU192", from: "HUMO", to: "HUKJ", city: "Moroto", dep: "13:00", arr: "14:25", days: "Tue · Thu · Sat", aircraft: CARAVAN },
  // ── 1900D (5X-KEH): Gulu and Arua daily; Hoima Mon/Wed/Fri ──
  { flightNo: "FU181", from: "HUKJ", to: "HUGU", city: "Gulu", dep: "07:00", arr: "07:55", days: "Daily", aircraft: B1900 },
  { flightNo: "FU182", from: "HUGU", to: "HUKJ", city: "Gulu", dep: "08:15", arr: "09:10", days: "Daily", aircraft: B1900 },
  { flightNo: "FU171", from: "HUKJ", to: "HUAR", city: "Arua", dep: "09:50", arr: "10:55", days: "Daily", aircraft: B1900 },
  { flightNo: "FU172", from: "HUAR", to: "HUKJ", city: "Arua", dep: "11:15", arr: "12:20", days: "Daily", aircraft: B1900 },
  { flightNo: "FU121", from: "HUKJ", to: "HUKF", city: "Hoima", dep: "13:10", arr: "13:55", days: "Mon · Wed · Fri", aircraft: B1900 },
  { flightNo: "FU122", from: "HUKF", to: "HUKJ", city: "Hoima", dep: "14:15", arr: "15:00", days: "Mon · Wed · Fri", aircraft: B1900 },
];

export function routeByCode(code: string): Route | undefined {
  return ROUTES.find((r) => r.to.toLowerCase() === code.toLowerCase());
}

/* ------------------------------- Destinations -------------------------------- */
export type Guide = {
  code: string;
  city: string;
  region: string;
  airport: string;
  intro: string;
  highlights: string[];
  image: string;
};

// ⚠️ IMAGERY: first-party brand illustrations in /public/scenes (no stock
// licence involved). Replace with real photography — PROJECT-HANDOVER.md §6.
export const GUIDES: Guide[] = [
  {
    code: "HUKJ",
    city: "Kajjansi",
    region: "Wakiso · our base",
    airport: "Kajjansi Airfield (HUKJ)",
    intro:
      "Our home field, on the Kampala–Entebbe road. Every scheduled departure leaves from Gate 1 — no international terminal, no queue, and roughly half an hour closer to Kampala than Entebbe.",
    highlights: ["Gate 1, Kampala–Entebbe Road", "Parking at the door", "Check-in 45 minutes before departure"],
    image: "/scenes/kajjansi.svg",
  },
  {
    code: "HUKH",
    city: "Kihihi",
    region: "Kanungu · Western Region",
    airport: "Kihihi (Savannah) Airstrip (HUKH)",
    intro:
      "The airstrip for Kanungu district — the tea estates, the district headquarters and the Ishasha border area — and the northern gateway to Bwindi Impenetrable National Park. Buhoma is a short transfer away; Ishasha and its tree-climbing lions are closer still.",
    highlights: ["Kanungu district & tea estates", "Buhoma gorilla sector", "Daily, first departure of the morning"],
    image: "/scenes/kihihi.svg",
  },
  {
    code: "HUKI",
    city: "Kisoro",
    region: "Kisoro · Western Region",
    airport: "Kisoro Airport (HUKI)",
    intro:
      "Kisoro town, set among the Virunga volcanoes in Uganda's far south-west, fifteen minutes from the Cyanika crossing into Rwanda and the Bunagana crossing into DRC. Also the southern gateway to Bwindi — the Nkuringo and Rushaga sectors — and to Mgahinga.",
    highlights: ["Rwanda & DRC border crossings", "Nkuringo & Rushaga sectors", "Virunga volcano views on finals"],
    image: "/scenes/kisoro.svg",
  },
  {
    code: "HUKS",
    city: "Kasese",
    region: "Kasese · Rwenzori",
    airport: "Kasese Airport (HUKS)",
    intro:
      "Kasese town under the Rwenzori — Ptolemy's Mountains of the Moon. The commercial centre of the west, with Kilembe, Hima and the Mpondwe border trade, and the practical entry point for the Rwenzori trailheads and the northern sector of Queen Elizabeth.",
    highlights: ["Kasese town & Kilembe", "Rwenzori trailheads", "Our shortest up-country sector"],
    image: "/scenes/kasese.svg",
  },
  {
    code: "HUGG",
    city: "Bugungu",
    region: "Buliisa · Murchison Falls NP",
    airport: "Bugungu Airstrip (HUGG)",
    intro:
      "Buliisa district on the Albertine escarpment — the strip for the Tilenga oil project area and the south bank of Murchison Falls, with the lodges above the escarpment and the top-of-the-falls walk close by.",
    highlights: ["Buliisa & the Tilenga project area", "South-bank lodges", "Top of the falls walk"],
    image: "/scenes/bugungu.svg",
  },
  {
    code: "HUKF",
    city: "Hoima",
    region: "Hoima · Bunyoro",
    airport: "Kabalega International Airport, Hoima (HUKF)",
    intro:
      "Uganda's second international airport, at Kabaale on the Albertine escarpment west of Hoima city — built for the refinery, the Kingfisher and Tilenga oil developments and the Bunyoro region behind them. Forty-five minutes from Kajjansi on the 1900D, three days a week.",
    highlights: ["Refinery & Kingfisher project area", "Hoima city, 40 minutes by road", "Lake Albert & the escarpment"],
    image: "/scenes/hukf.svg",
  },
  {
    code: "HUAR",
    city: "Arua",
    region: "Arua · West Nile",
    airport: "Arua Airport (HUAR)",
    intro:
      "The capital of West Nile and the gateway to the DRC and South Sudan borders — a trading city, an NGO hub for the refugee settlements around it, and two days by road from Kampala until you fly it in ninety minutes.",
    highlights: ["West Nile's commercial centre", "NGO & refugee-response hub", "DRC & South Sudan border crossings"],
    image: "/scenes/huar.svg",
  },
  {
    code: "HUGU",
    city: "Gulu",
    region: "Gulu · Acholi",
    airport: "Gulu Airport (HUGU)",
    intro:
      "Northern Uganda's largest city and its commercial, medical and university centre, with a paved runway and two services a day. The practical base for the whole Acholi sub-region, and the road onward to Kitgum, Pader and the South Sudan border.",
    highlights: ["Gulu city & university", "Daily on the 1900D, 55 minutes", "Onward to Kitgum & Nimule"],
    image: "/scenes/hugu.svg",
  },
  {
    code: "HUMO",
    city: "Moroto",
    region: "Moroto · Karamoja",
    airport: "Moroto Airstrip (HUMO)",
    intro:
      "Karamoja's regional capital, under the bulk of Mount Moroto on the Kenya border. The base for the district administrations, the mining companies and the aid programmes working across Karamoja — and the start of the road to Kidepo for those going on.",
    highlights: ["Karamoja's administrative centre", "Mount Moroto trailheads", "Mining & aid-programme base"],
    image: "/photos/humo.jpg",
  },
  {
    code: "HUKD",
    city: "Kidepo",
    region: "Karamoja · Kidepo Valley NP",
    airport: "Kidepo (Apoka) Airstrip (HUKD)",
    intro:
      "Uganda's most remote park, in the far north-east against the South Sudan border. An hour and forty minutes by air; two days by road. Narus and Kidepo valleys, and almost nobody else there.",
    highlights: ["Narus Valley game drives", "Karamojong cultural visits", "Three services a week"],
    image: "/scenes/kidepo.svg",
  },
];

export function guideByCity(city: string): Guide | undefined {
  return GUIDES.find(
    (g) => g.city.toLowerCase().split(" ")[0] === city.toLowerCase()
  );
}

/* ---------------------------------- Cargo ------------------------------------ */
// Cargo is belly freight on the scheduled network — no dedicated freighters.
export const CARGO_SERVICES = [
  {
    title: "Parcels on the schedule",
    body: "Documents, spares and small consignments booked at Kajjansi and collected at the airstrip the same morning. Weighed and rated per kilogram, on the next departure with space.",
  },
  {
    title: "Albertine & field consignments",
    body: "Regular freight into Bugungu and Pakuba for the operators, contractors and NGO field teams working the Albertine — spares, samples and medical supplies on the daily service.",
  },
  {
    title: "Lodge & camp resupply",
    body: "Scheduled belly capacity into the up-country strips, keeping remote lodges and camps supplied without a two-day road trip.",
  },
];


export const CARGO_TARIFF = {
  outbound: "On application",
  backhaul: "On application",
  note: "Cargo travels on scheduled flights and is rated per kilogram by sector, subject to space. Contact the cargo desk for the tariff.",
};

/* -------------------------------- Leadership --------------------------------- */
// Placeholder roles — no invented individuals. Replace with the confirmed team.
export const LEADERSHIP = [
  { role: "Accountable Manager", name: "Appointment to be confirmed", note: "Overall accountability under the AOC" },
  { role: "Head of Flight Operations", name: "Appointment to be confirmed", note: "Scheduled operations" },
  { role: "Head of Safety & Quality", name: "Appointment to be confirmed", note: "Safety management and compliance" },
  { role: "Commercial Manager", name: "Appointment to be confirmed", note: "Network, distribution, interline and cargo" },
];

/* --------------------------------- Contact ----------------------------------- */
export const OFFICES = [
  { city: "Kajjansi (Head Office)", lines: ["Gate 1, Kajjansi Airfield", "Kampala–Entebbe Road", "Wakiso, Uganda"], type: "HQ, terminal & reservations" },
  { city: "Entebbe", lines: ["Entebbe International Airport", "Entebbe, Uganda"], type: "Connections desk" },
  { city: "Kihihi", lines: ["Kihihi (Savannah) Airstrip", "Kanungu District"], type: "Station" },
  { city: "Kisoro", lines: ["Kisoro Airport", "Kisoro District"], type: "Station" },
  { city: "Pakuba", lines: ["Pakuba Airfield", "Murchison Falls National Park"], type: "Station" },
];

/* ------------------------------- Travel info --------------------------------- */
export const TRAVEL_INFO = [
  {
    id: "baggage",
    title: "Baggage on domestic flights",
    items: [
      "15 kg per person in total, checked and cabin combined, on scheduled services.",
      "Soft-sided bags only. Hard suitcases and rigid frames will not fit the Caravan's cargo pod and cannot be carried.",
      "Extra allowance can usually be arranged in advance against the day's load — ask at booking, not at the strip.",
      "Camera equipment counts towards the allowance. Tell us at booking if you are carrying long lenses.",
    ],
  },
  {
    id: "checkin",
    title: "Check-in times",
    items: [
      "Kajjansi: check-in opens 1 hour and closes 45 minutes before departure.",
      "Up-country airstrips: please be at the strip 30 minutes before the scheduled departure.",
      "Unpaved airstrips are weather- and surface-dependent. We will always call you before we move a departure.",
    ],
  },
  {
    id: "assistance",
    title: "Special assistance",
    items: [
      "Caravan boarding is via a short airstair. Tell us at booking if anyone in the party needs assistance and we will arrange it.",
      "Wheelchairs can be carried, subject to size and the day's load — please confirm dimensions in advance.",
      "Please contact care@flyuganda.com at least 48 hours before travel to arrange assistance.",
    ],
  },
  {
    id: "family",
    title: "Flying with children",
    items: [
      "Infants under 2 travel on an adult's lap; one infant per adult.",
      "Children occupying a seat pay the full seat fare — domestic flights are sold by the seat and by weight.",
      "We ask for passenger weights at booking. This is a loading requirement on light aircraft, not a formality.",
    ],
  },
];

/* ---------------------------------- Legal ------------------------------------ */
export type LegalDoc = { slug: string; title: string; updated: string; intro: string; sections: { h: string; p: string }[] };

export const LEGAL: Record<string, LegalDoc> = {
  terms: {
    slug: "terms",
    title: "Conditions of carriage",
    updated: "November 2026",
    intro:
      "These conditions govern the carriage of passengers and baggage by Fly Uganda. They are a placeholder summary for the pre-launch website and will be replaced by the full conditions of carriage before scheduled operations begin.",
    sections: [
      { h: "1. Definitions", p: "In these conditions, “we”, “our” and “us” mean Fly Uganda; “you” and “your” mean any person holding a ticket or being carried on our aircraft." },
      { h: "2. Tickets", p: "A ticket is valid only for the transportation shown on it, from the point of departure to the point of destination. Fares and charges are those in effect on the date of payment." },
      { h: "3. Check-in and boarding", p: "You must arrive by the check-in deadlines published in our Travel Information. We may release your seat if you fail to meet them." },
      { h: "4. Baggage and weights", p: "Allowances are as published in our Travel Information. We operate light aircraft and may refuse or offload baggage where the day's load requires it. Passenger weights are collected as a loading requirement." },
      { h: "5. Schedules, weather and game", p: "We will take reasonable measures to carry you and your baggage on time. Park airstrips are subject to weather, surface condition and wildlife on the runway; published schedules are not guaranteed and do not form part of your contract with us." },
      { h: "6. Liability", p: "Our liability for death, injury, delay and damage to baggage is governed by applicable Ugandan law and the international conventions that apply." },
    ],
  },
  privacy: {
    slug: "privacy",
    title: "Privacy policy",
    updated: "November 2026",
    intro:
      "This policy explains how Fly Uganda handles personal information collected through this website. It is a pre-launch placeholder and will be expanded as our services go live.",
    sections: [
      { h: "Information we collect", p: "We collect the information you provide through enquiry, booking and contact forms — including the passenger weights we are required to collect for aircraft loading — and basic, privacy-friendly analytics about how the website is used." },
      { h: "How we use it", p: "We use your information to respond to enquiries, to carry you safely and legally, and to operate and improve the website." },
      { h: "Analytics", p: "We use privacy-friendly analytics that do not use cookies to track you across websites and do not collect personally identifiable information." },
      { h: "Your rights", p: "You may request access to, correction of, or deletion of your personal information by contacting care@flyuganda.com." },
      { h: "Contact", p: "For any privacy question, please write to care@flyuganda.com." },
    ],
  },
  cookies: {
    slug: "cookies",
    title: "Cookie policy",
    updated: "November 2026",
    intro:
      "This policy describes how this website uses cookies and similar technologies. It is a pre-launch placeholder.",
    sections: [
      { h: "Essential cookies", p: "We use a small number of strictly necessary cookies required for the website to function." },
      { h: "Analytics", p: "We use privacy-friendly, cookieless analytics to understand overall website usage without tracking individuals." },
      { h: "Booking partner", p: "When online booking goes live, our reservation partner may set its own cookies within the booking flow. These will be described here at that time." },
      { h: "Managing cookies", p: "You can control cookies through your browser settings. Disabling essential cookies may affect how the website works." },
    ],
  },
  "pearl-club-terms": {
    slug: "pearl-club-terms",
    title: "Pearl Club programme terms",
    updated: "November 2026",
    intro:
      "These terms govern membership of the Pearl Club, the Fly Uganda frequent flyer programme. They are a pre-launch placeholder summary and will be replaced by the full programme terms before the programme launches.",
    sections: [
      { h: "Membership", p: "Membership of the Pearl Club is free and open to individuals. Each member is issued a unique membership number, which must appear on a booking for that flight to earn Pearls." },
      { h: "Earning Pearls", p: "Members earn Pearls on eligible Fly Uganda flights. The number earned depends on the route and fare, plus any tier bonus. Award Pearls do not expire; Status Pearls are counted per membership year to determine tier." },
      { h: "Tiers", p: "Members progress through tiers — Kingfisher, Turaco, Shoebill and Crowned Crane — based on Status Pearls earned within a membership year. Tier benefits are as published and may change. Thresholds shown on the website are illustrative until the programme launches." },
      { h: "Redeeming Pearls", p: "Award Pearls may be redeemed for award seats on the Fly Uganda network, subject to availability. The member pays applicable taxes and charges. Award pricing is set in the reservation system and may change." },
      { h: "Changes and termination", p: "Fly Uganda may amend the programme, its benefits, earning and redemption rules, or terminate the programme, with reasonable notice where required by law." },
      { h: "Contact", p: "Questions about the Pearl Club can be sent to care@flyuganda.com." },
    ],
  },
};
