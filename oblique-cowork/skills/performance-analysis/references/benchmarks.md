# Performance Benchmarks Reference

These benchmarks are used by the performance-analysis skill to RAG-rate every metric in the bottleneck waterfall. They are calibrated for Oblique's typical client base: eCommerce and DTC brands in the $50K–$500K MYR/month revenue range, operating primarily in Malaysia and Southeast Asia.

**How to use:**
- Compare each client metric against the ranges below
- Apply the RAG rating: 🟢 Green (on track), 🟡 Amber (watch closely), 🔴 Red (likely bottleneck)
- Always interpret metrics in context — a single amber metric is not automatically a bottleneck; look for clusters

---

## Meta Ads Benchmarks

### ROAS (7-day click, conversion campaigns only)

The most meaningful ROAS benchmark is relative to the break-even ROAS (BE ROAS = 1 ÷ gross_margin). For example, at 25% gross margin, BE ROAS = 4.0.

| ROAS vs BE ROAS | Rating | Interpretation |
|---|---|---|
| > 1.5× BE ROAS | 🟢 Green | Healthy — profitable and scaling room exists |
| 1.0–1.5× BE ROAS | 🟡 Amber | Marginally profitable — watch closely, don't scale |
| 0.75–1.0× BE ROAS | 🔴 Red | Below break-even — immediate action required |
| < 0.75× BE ROAS | 🔴 Red (Critical) | Burning cash — pause or urgently restructure |

**Typical absolute ranges for SEA eCommerce (25% margin, MYR):**
- ROAS < 2.0 → 🔴 Red
- ROAS 2.0–3.5 → 🟡 Amber
- ROAS > 3.5 → 🟢 Green

Always use relative-to-BE-ROAS as the primary rating. Use absolute ranges as a secondary cross-check.

---

### CPP (Cost Per Purchase)

CPP should always be interpreted relative to AOV. A high CPP is fine if AOV is high; the same CPP on a low AOV product is catastrophic.

| CPP as % of AOV | Rating | Interpretation |
|---|---|---|
| < 30% of AOV | 🟢 Green | Strong unit economics |
| 30–50% of AOV | 🟡 Amber | Acceptable but margin is thin |
| 50–70% of AOV | 🔴 Red | Barely profitable — check LTV justification |
| > 70% of AOV | 🔴 Red (Critical) | Not viable without strong LTV/repeat purchase |

---

### CTR (Click-Through Rate — link clicks ÷ impressions)

| CTR | Rating | Notes |
|---|---|---|
| > 1.5% | 🟢 Green | Strong creative hook pulling clicks |
| 1.0–1.5% | 🟡 Amber | Acceptable; room to improve hook |
| 0.6–1.0% | 🔴 Red | Weak creative or poor audience-message match |
| < 0.6% | 🔴 Red (Critical) | Creative is not resonating at all |

Note: CTR varies by placement. Feed placements typically see lower CTR than Stories/Reels. If possible, benchmark feed vs non-feed separately.

---

### CVR (Conversion Rate — purchases ÷ link clicks)

| CVR | Rating | Interpretation |
|---|---|---|
| > 3.0% | 🟢 Green | Strong landing page and offer alignment |
| 1.5–3.0% | 🟡 Amber | Decent; test offer or page improvements |
| 0.8–1.5% | 🔴 Red | Landing page or offer is likely the bottleneck |
| < 0.8% | 🔴 Red (Critical) | Significant post-click problem — CRO urgently needed |

If CTR is healthy (Green) but CVR is Red, the problem is post-click (landing page, offer, price, checkout friction) — NOT the creative.

---

### Frequency

Frequency = average number of times a unique user has seen the ad. High frequency = audience fatigue risk.

| Frequency | Rating | Action |
|---|---|---|
| < 2.0 | 🟢 Green | Healthy — ads still reaching fresh eyes |
| 2.0–3.0 | 🟡 Amber | Monitor — introduce new creative |
| 3.0–4.5 | 🔴 Red | Ad fatigue likely — refresh creative immediately |
| > 4.5 | 🔴 Red (Critical) | Saturated audience — expand targeting or pause |

Context: Frequency must be read alongside CPM. If frequency is rising AND CPM is rising, the algorithm is struggling to find new people at a reasonable cost.

---

### CPM (Cost Per 1,000 Impressions)

CPM is market-driven and varies by season, vertical, and competition. The most useful benchmark is MoM trend rather than absolute value.

**Absolute ranges for Malaysia/SEA eCommerce:**
| CPM (MYR) | Rating |
|---|---|
| < RM 15 | 🟢 Green |
| RM 15–30 | 🟡 Amber |
| > RM 30 | 🔴 Red |

**MoM trend:**
| CPM change | Rating |
|---|---|
| Flat or declining | 🟢 Green |
| +10–20% MoM | 🟡 Amber |
| > +20% MoM | 🔴 Red — audience saturation or competitive pressure |

---

### Spend Concentration (Creative Risk)

| % of total spend in top 3 ads | Rating | Interpretation |
|---|---|---|
| < 50% | 🟢 Green | Healthy distribution — multiple concepts working |
| 50–70% | 🟡 Amber | Moderate concentration — introduce new concepts |
| > 70% | 🔴 Red | High dependency on 1–2 ads — single point of failure |

If top 3 ads are also the oldest ads in the account (90+ days), concentration risk is compounded by fatigue risk.

---

### Concept Diversity

This is qualitative, but look for these signals:

| Signal | Rating |
|---|---|
| 3+ distinct concept angles (different persona, angle, or offer) actively spending | 🟢 Green |
| 2 distinct concept angles | 🟡 Amber |
| Only 1 concept angle across all active ads | 🔴 Red |
| All top ads same format AND same angle (Andromeda risk) | 🔴 Red (Critical) |

---

## Google Ads Benchmarks

### Search Campaign CTR

| CTR | Rating |
|---|---|
| > 6% | 🟢 Green |
| 3–6% | 🟡 Amber |
| < 3% | 🔴 Red |

### Google ROAS

Use the same relative-to-BE-ROAS framework as Meta.

### Google CPC (MYR, SEA eCommerce)

| CPC | Rating |
|---|---|
| < RM 1.50 | 🟢 Green |
| RM 1.50–3.00 | 🟡 Amber |
| > RM 3.00 | 🔴 Red |

Brand keywords typically have much lower CPC (< RM 0.50) — if blending brand and non-brand, segment them before benchmarking.

---

## Shopify / Backend Benchmarks

### MER (Marketing Efficiency Ratio = Total Ad Spend ÷ Total Revenue)

MER is the most reliable cross-channel efficiency metric because it can't be gamed by attribution windows.

| MER vs Gross Margin | Rating |
|---|---|
| MER > 2.0× gross_margin | 🟢 Green — well above break-even |
| MER = 1.5–2.0× gross_margin | 🟡 Amber — profitable but thin |
| MER = 1.0–1.5× gross_margin | 🔴 Red — barely breaking even on marketing |
| MER < 1.0× gross_margin | 🔴 Red (Critical) — marketing is destroying margin |

Example at 25% margin: BE MER = 4.0. Green = MER > 8.0. Amber = MER 6.0–8.0. Red = MER < 6.0.

### ROAS vs MER Gap

If platform ROAS is significantly higher than MER (e.g. Meta says ROAS = 6.0 but MER = 3.0), this gap is explained by:
- Returning customer revenue inflating ROAS (most common)
- Attribution overlap between Meta and Google
- Organic revenue being driven but attributed to paid

| ROAS ÷ MER ratio | Interpretation |
|---|---|
| 0.8–1.2× | Broadly consistent — attribution is relatively clean |
| 1.2–2.0× | Moderate inflation — likely some returning customer effect |
| > 2.0× | Significant inflation — MER is the more trustworthy number |

### Shopify CVR (Sessions to Orders)

| Shopify CVR | Rating |
|---|---|
| > 3% | 🟢 Green |
| 1.5–3% | 🟡 Amber |
| < 1.5% | 🔴 Red |

### New vs Returning Customer Split

| New customer % of orders | Interpretation |
|---|---|
| > 60% new | 🟢 Growth-oriented — acquisition is working |
| 40–60% new | 🟡 Balanced — healthy in steady-state |
| < 40% new | 🔴 Retention-heavy — paid channels may be reaching diminishing returns on new customers |

---

## Metric Relationships to Watch

These combinations are particularly diagnostic:

| Pattern | Most Likely Explanation |
|---|---|
| CTR Green + CVR Red | Landing page or offer problem, not creative |
| ROAS Red + Frequency Red | Audience fatigue — creative refresh needed before anything else |
| CPM up >20% + ROAS down | Targeting exhaustion — expand audience or introduce new creative |
| MER << Platform ROAS | Returning customers inflating attribution — check new vs returning split |
| Spend concentration > 70% + Top ad 90+ days old | Imminent fatigue cliff — high urgency to launch new concepts |
| CPP > 50% AOV + Low CVR | Offer or price point is the constraint — test bundles, urgency, or price anchoring |

---

## Notes on Vertical Adjustments

These benchmarks are calibrated for general SEA eCommerce. Adjust as follows:

- **Fashion/apparel:** AOV typically lower ($80–$200 MYR), so CPP benchmarks scale accordingly. CVR tends to be higher (2–5%) due to strong visual intent.
- **Health/wellness/supplements:** Higher AOV ($150–$400 MYR), longer consideration cycle, lower CVR (0.8–2%). Frequency tolerance slightly higher.
- **Home/bedding (e.g. Getha):** Very high AOV ($500–$5000 MYR), very long purchase cycle, CVR often < 0.5% is acceptable. ROAS calculation needs LTV context.
- **Pet (e.g. Petico):** Repeat-purchase category — LTV is high. Lower initial ROAS (2–3×) may still be viable if repeat purchase rate is strong.
- **Eyewear (e.g. The Spec Shop):** Moderate AOV, prescription complexity reduces CVR. Offline conversion attribution gap is common.

When a client's vertical suggests a meaningful benchmark adjustment, note it explicitly in the analysis document.
