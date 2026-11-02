# Pearl Club — programme design & PSS mapping

Version 1.0 · November 2026

The Pearl Club is built so the website can go live before the reservation system is
contracted, and so that configuring the PSS later is a mapping exercise rather than a
redesign. Everything illustrative is marked as such on the page itself.

---

## 1. Shape

| Element | Value |
|---|---|
| Programme name | Pearl Club |
| Award currency | Pearls |
| Status currency | Status Pearls |
| Tiers | Kingfisher · Great Blue Turaco · Shoebill · Crowned Crane |
| Qualification | Rolling membership year |
| Earning base | Scheduled sectors and charters booked in the member's name |

Charter earns on **block time** rather than seats, which is the one rule that differs
from a conventional seat-only programme. It matters commercially: the NGO and energy
buyers are the highest-value repeat flyers on the network, and a seat-only programme
would exclude them entirely.

---

## 2. Tier thresholds (illustrative)

| Tier | Qualification | Earning bonus | Headline benefit |
|---|---|---|---|
| Kingfisher | Join free | Base | Earn from the first sector |
| Great Blue Turaco | 8 sectors or 12,000 Status Pearls | +25% | Standby priority, +3 kg |
| Shoebill | 20 sectors or 30,000 Status Pearls | +50% | Priority boarding, +6 kg, free date changes |
| Crowned Crane | 40 sectors or 60,000 Status Pearls | +100% | Named contact, +10 kg, lounge, guaranteed seat |

**Baggage is the real currency here.** On a Caravan at 15 kg per person, +10 kg is a
materially better benefit than a lounge, and it costs least on the sectors that are
light anyway. Set the tier mix around baggage before you set it around Pearls.

Thresholds above are placeholders. Set them from twelve months of actual sector counts
per passenger once you have them — not from a competitor's chart.

---

## 3. PSS module mapping

The site is built against the AeroCRS / Go7 model, but the mapping holds for most PSS:

| Pearl Club concept | PSS module | Notes |
|---|---|---|
| Tiers | Levels | Four levels, ordered. Accent colours come from `lib/loyalty.ts`. |
| Earning rules | Earning rules | One rule per route band; one multiplier per level. |
| Charter earning | Earning rules (manual accrual) | Block-time accrual is usually a manual or API post, not a fare-based rule. |
| Award seats | Spending rules | Award chart in `REWARD_CHART` is illustrative. |
| Member account | Member profile API | `MemberDashboard` currently renders mock data — see §4. |
| Membership number | Loyalty ID | Site placeholder format is `PC-XXXXXX`. |

---

## 4. What is mock, and what must be wired

| Component | Status |
|---|---|
| `components/loyalty/MemberDashboard.tsx` | **Mock.** Sign-in, balance, tier progress and activity are hard-coded. Must be wired to the PSS member API before "My Account" is linked publicly. |
| `components/loyalty/TierLadder.tsx` | Renders from `lib/loyalty.ts`. Safe. |
| `app/(site)/pearl-club/join/page.tsx` | Form posts nowhere. Wire to the PSS enrolment endpoint or an interim CRM. |
| `REWARD_CHART`, `statusPearls`, `bonus` | Illustrative. Confirm before launch. |
| `legal/pearl-club-terms` | Placeholder summary. Needs the full drafted terms. |

Until the member API is live, either keep `/pearl-club/account` unlinked from primary
navigation, or leave the sign-in demo clearly labelled as a preview.
