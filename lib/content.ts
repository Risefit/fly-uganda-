// Page-level content for internal pages (v1 hard-coded, CMS-ready later).
//
// ⚠️ Flight numbers use the placeholder "FU" prefix. Replace with the
// designator actually filed with UCAA before launch.
// ⚠️ Times below are an illustrative pattern built around the published
// morning-out / late-morning-back rhythm the parks run on. Replace with the
// live timetable before launch.

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

export const SCHEDULE: Flight[] = [
  { flightNo: "FU101", from: "HUKJ", to: "KHX", city: "Kihihi", dep: "07:30", arr: "09:00", days: "Daily", aircraft: CARAVAN },
  { flightNo: "FU102", from: "KHX", to: "HUKJ", city: "Kihihi", dep: "09:20", arr: "10:50", days: "Daily", aircraft: CARAVAN },
  { flightNo: "FU103", from: "HUKJ", to: "KHX", city: "Kihihi", dep: "13:30", arr: "15:00", days: "Daily", aircraft: CARAVAN },
  { flightNo: "FU104", from: "KHX", to: "HUKJ", city: "Kihihi", dep: "15:20", arr: "16:50", days: "Daily", aircraft: CARAVAN },
  { flightNo: "FU111", from: "HUKJ", to: "KXO", city: "Kisoro", dep: "07:30", arr: "09:10", days: "Daily", aircraft: CARAVAN },
  { flightNo: "FU112", from: "KXO", to: "HUKJ", city: "Kisoro", dep: "09:30", arr: "11:10", days: "Daily", aircraft: CARAVAN },
  { flightNo: "FU121", from: "HUKJ", to: "HUMW", city: "Mweya", dep: "08:00", arr: "09:20", days: "Daily", aircraft: CARAVAN },
  { flightNo: "FU122", from: "HUMW", to: "HUKJ", city: "Mweya", dep: "09:40", arr: "11:00", days: "Daily", aircraft: CARAVAN },
  { flightNo: "FU131", from: "HUKJ", to: "KSE", city: "Kasese", dep: "08:00", arr: "09:10", days: "Daily", aircraft: CARAVAN },
  { flightNo: "FU132", from: "KSE", to: "HUKJ", city: "Kasese", dep: "09:30", arr: "10:40", days: "Daily", aircraft: CARAVAN },
  { flightNo: "FU141", from: "HUKJ", to: "PAF", city: "Pakuba", dep: "07:45", arr: "09:05", days: "Daily", aircraft: CARAVAN },
  { flightNo: "FU142", from: "PAF", to: "HUKJ", city: "Pakuba", dep: "09:25", arr: "10:45", days: "Daily", aircraft: CARAVAN },
  { flightNo: "FU151", from: "HUKJ", to: "HUGG", city: "Bugungu", dep: "07:45", arr: "09:00", days: "Daily", aircraft: CARAVAN },
  { flightNo: "FU152", from: "HUGG", to: "HUKJ", city: "Bugungu", dep: "09:20", arr: "10:35", days: "Daily", aircraft: CARAVAN },
  { flightNo: "FU161", from: "HUKJ", to: "HUKD", city: "Kidepo", dep: "07:00", arr: "09:00", days: "Mon · Wed · Fri", aircraft: CARAVAN },
  { flightNo: "FU162", from: "HUKD", to: "HUKJ", city: "Kidepo", dep: "09:30", arr: "11:30", days: "Mon · Wed · Fri", aircraft: CARAVAN },
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
    code: "KHX",
    city: "Kihihi",
    region: "Kanungu · Western Region",
    airport: "Kihihi (Savannah) Airstrip (KHX)",
    intro:
      "The northern gateway to Bwindi Impenetrable National Park, and the strip most gorilla itineraries use. Buhoma is a short transfer away; the Ishasha sector of Queen Elizabeth, with its tree-climbing lions, is closer still.",
    highlights: ["Buhoma gorilla sector", "Ishasha tree-climbing lions", "Two services a day"],
    image: "/scenes/kihihi.svg",
  },
  {
    code: "KXO",
    city: "Kisoro",
    region: "Kisoro · Western Region",
    airport: "Kisoro Airport (KXO)",
    intro:
      "The southern gateway, set among the Virunga volcanoes. Serves the Nkuringo and Rushaga gorilla sectors of Bwindi, and Mgahinga Gorilla National Park for golden monkeys and the volcano climbs.",
    highlights: ["Nkuringo & Rushaga sectors", "Mgahinga golden monkeys", "Virunga volcano views on finals"],
    image: "/scenes/kisoro.svg",
  },
  {
    code: "HUMW",
    city: "Mweya",
    region: "Kasese · Queen Elizabeth NP",
    airport: "Mweya Airstrip (HUMW)",
    intro:
      "A strip on the peninsula inside Queen Elizabeth National Park itself, between Lake Edward and Lake George. Land after breakfast and be on a Kazinga Channel launch the same afternoon.",
    highlights: ["Inside the park boundary", "Kazinga Channel launch trips", "Crater-lake drives"],
    image: "/scenes/mweya.svg",
  },
  {
    code: "KSE",
    city: "Kasese",
    region: "Kasese · Rwenzori",
    airport: "Kasese Airport (KSE)",
    intro:
      "Under the Rwenzori — Ptolemy's Mountains of the Moon — and the practical entry point for the northern sector of Queen Elizabeth as well as the Rwenzori trekking routes.",
    highlights: ["Rwenzori trailheads", "Queen Elizabeth north", "Shortest park sector from Kampala"],
    image: "/scenes/kasese.svg",
  },
  {
    code: "PAF",
    city: "Pakuba",
    region: "Nwoya · Murchison Falls NP",
    airport: "Pakuba Airfield (PAF)",
    intro:
      "On the north bank of the Victoria Nile inside Murchison Falls National Park. The delta game drives and the launch to the base of the falls both start within the hour.",
    highlights: ["North-bank game drives", "Launch to the falls", "Nile delta birding"],
    image: "/scenes/pakuba.svg",
  },
  {
    code: "HUGG",
    city: "Bugungu",
    region: "Buliisa · Murchison Falls NP",
    airport: "Bugungu Airstrip (HUGG)",
    intro:
      "The south-bank strip for Murchison Falls, convenient for the lodges above the escarpment and for the top-of-the-falls walk.",
    highlights: ["South-bank lodges", "Top of the falls walk", "Albertine escarpment views"],
    image: "/scenes/bugungu.svg",
  },
  {
    code: "HUKD",
    city: "Kidepo",
    region: "Karamoja · Kidepo Valley NP",
    airport: "Kidepo (Apoka) Airstrip (HUKD)",
    intro:
      "Uganda's most remote park, in the far north-east against the South Sudan border. Two hours by air; two days by road. Narus and Kidepo valleys, and almost nobody else there.",
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
export const CARGO_SERVICES = [
  {
    title: "Albertine energy support",
    body: "Crew rotations and time-critical freight into the Albertine Graben — Hoima, Buliisa, Kingfisher and Pakwach — for the operators and contractors working the oil corridor.",
  },
  {
    title: "Lodge & camp resupply",
    body: "Scheduled belly capacity and dedicated runs into the park strips, keeping remote lodges and camps supplied without a two-day road trip.",
  },
  {
    title: "Humanitarian & project charter",
    body: "Dedicated aircraft for NGO, UN and relief movements across Uganda and the region, including oversized and time-critical project freight.",
  },
];

// Stylised node layout for OilCorridorMap — Albertine Graben, not a real projection.
export const OIL_CORRIDOR: {
  name: string;
  x: number;
  y: number;
  hub?: boolean;
  below?: boolean; // drop the label beneath the node to avoid a collision
}[] = [
  { name: "Kajjansi (base)", x: 360, y: 370, hub: true },
  { name: "Hoima", x: 258, y: 268 },
  { name: "Kingfisher", x: 212, y: 296, below: true },
  { name: "Buliisa / Tilenga", x: 206, y: 206, below: true },
  { name: "Bugungu", x: 238, y: 178, below: true },
  { name: "Pakwach", x: 290, y: 146 },
  { name: "Pakuba", x: 206, y: 124 },
];

export const CARGO_TARIFF = {
  outbound: "On application",
  backhaul: "On application",
  note: "Cargo and charter are quoted per movement against routing, payload and turnaround. Contact the cargo desk for a rate.",
};

/* -------------------------------- Leadership --------------------------------- */
// Placeholder roles — no invented individuals. Replace with the confirmed team.
export const LEADERSHIP = [
  { role: "Accountable Manager", name: "Appointment to be confirmed", note: "Overall accountability under the AOC" },
  { role: "Head of Flight Operations", name: "Appointment to be confirmed", note: "Scheduled and charter operations" },
  { role: "Head of Safety & Quality", name: "Appointment to be confirmed", note: "Safety management and compliance" },
  { role: "Commercial Manager", name: "Appointment to be confirmed", note: "Network, trade sales and cargo" },
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
    title: "Baggage on bush flights",
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
      "Park strips: please be at the strip 30 minutes before the scheduled departure.",
      "Bush strips are weather- and game-dependent. We will always call you before we move a departure.",
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
      "Children occupying a seat pay the full seat fare — bush flights are sold by the seat and by weight.",
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
      { h: "5. Schedules, weather and game", p: "We will take reasonable measures to carry you and your baggage on time. Bush strips are subject to weather, surface condition and wildlife on the runway; published schedules are not guaranteed and do not form part of your contract with us." },
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
