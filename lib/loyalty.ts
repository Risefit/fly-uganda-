// The Pearl Club — frequent flyer programme data (v1 hard-coded, PSS-ready).
// Currency: Pearls. Tiers: Birds of Uganda.
// Figures marked illustrative are set once the PSS earning/spending rules are
// configured — see 02-loyalty-program-design.md for the module mapping.

export type TierKey = "kingfisher" | "turaco" | "shoebill" | "crane";

export type Tier = {
  key: TierKey;
  name: string;
  tagline: string;
  accent: string; // hex for the emblem + card trim
  statusPearls: string; // illustrative annual Status Pearls to reach (display)
  statusThreshold: number; // the same figure as a number — keep the two in step
  bonus: string; // earning bonus vs base
  benefits: string[];
};

export const PROGRAMME = {
  name: "Pearl Club",
  currency: "Pearls",
  tagline: "The more you see, the further you go.",
  intro:
    "Earn Pearls every time you fly Fly Uganda, rise through the Birds of Uganda, and redeem them for award seats anywhere on the network.",
};

export const TIERS: Tier[] = [
  {
    key: "kingfisher",
    name: "Kingfisher",
    tagline: "Quick off the mark",
    accent: "#007CBA",
    statusPearls: "Join free",
    statusThreshold: 0,
    bonus: "Base earning",
    benefits: [
      "Earn Pearls on every flight",
      "Members-only fares and seat releases",
      "Online member account",
    ],
  },
  {
    key: "turaco",
    name: "Great Blue Turaco",
    tagline: "The colour of Bwindi",
    accent: "#006B4F",
    statusPearls: "8 sectors or 12,000 Status Pearls",
    statusThreshold: 12000,
    bonus: "+25% bonus Pearls",
    benefits: [
      "Everything in Kingfisher",
      "+25% bonus Pearls",
      "Priority on the standby list",
      "+3 kg baggage allowance",
    ],
  },
  {
    key: "shoebill",
    name: "Shoebill",
    tagline: "Rare, and worth the wait",
    accent: "#FFA400",
    statusPearls: "20 sectors or 30,000 Status Pearls",
    statusThreshold: 30000,
    bonus: "+50% bonus Pearls",
    benefits: [
      "Everything in Great Blue Turaco",
      "+50% bonus Pearls",
      "Priority boarding at Kajjansi",
      "+6 kg baggage allowance",
      "Free date changes on flexible fares",
    ],
  },
  {
    key: "crane",
    name: "Crowned Crane",
    tagline: "The national bird flies first",
    accent: "#7A0019",
    statusPearls: "40 sectors or 60,000 Status Pearls",
    statusThreshold: 60000,
    bonus: "+100% bonus Pearls",
    benefits: [
      "Everything in Shoebill",
      "+100% bonus Pearls",
      "Named reservations contact",
      "+10 kg baggage allowance",
      "Kajjansi lounge access",
      "Guaranteed seat on full scheduled services¹",
    ],
  },
];

export const EARN_STEPS = [
  {
    title: "Join free",
    body: "Sign up for the Pearl Club in minutes and get your membership number.",
  },
  {
    title: "Fly & earn",
    body: "Add your number to every booking and earn Pearls on each Fly Uganda sector — more as you rise through the tiers.",
  },
  {
    title: "Redeem",
    body: "Spend your Pearls on award seats anywhere on the network. You pay only the taxes and charges.",
  },
];

// Illustrative award chart — real values come from the PSS spending rules.
export const REWARD_CHART = [
  { route: "Kajjansi–Kasese / Bugungu", pearls: "from ~9,000" },
  { route: "Kajjansi–Kihihi / Mweya / Pakuba", pearls: "from ~11,000" },
  { route: "Kajjansi–Kisoro", pearls: "from ~12,000" },
  { route: "Kajjansi–Kidepo", pearls: "from ~16,000" },
];

export const FAQ = [
  {
    q: "How do I earn Pearls?",
    a: "You earn Pearls on every Fly Uganda flight when your membership number is on the booking. The number depends on the route and fare, plus a bonus based on your tier.",
  },
  {
    q: "What's the difference between Pearls and Status Pearls?",
    a: "Award Pearls are what you spend on award seats — they don't expire. Status Pearls count towards your tier each year and decide whether you rise from Kingfisher up to Crowned Crane.",
  },
  {
    q: "Can I earn on flights sold by a partner airline?",
    a: "Yes, when the sector is operated by Fly Uganda. A Fly Uganda flight ticketed by an interline or codeshare partner earns Pearls on the same basis as one bought from us — quote your membership number when you book.",
  },
  {
    q: "How do I use my Pearls?",
    a: "When you book, add your membership number and choose the award-seat option. Your Pearls cover the fare and you pay only taxes and charges.",
  },
  {
    q: "When do Pearls appear in my account?",
    a: "Pearls are credited a short period after you've flown. You'll always see your latest balance and activity in My Account.",
  },
  {
    q: "Do my Pearls expire?",
    a: "Award Pearls don't expire. Status Pearls are counted per membership year to set your tier. Promotional bonus Pearls may have their own validity.",
  },
];

export const CLUB_NAV = { label: "Pearl Club", href: "/pearl-club" };
