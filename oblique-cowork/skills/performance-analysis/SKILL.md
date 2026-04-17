---
name: performance-analysis
description: "Run a structured performance analysis for any Oblique client, producing a Word document (.docx) with a benchmarked diagnosis and strong, specific optimization recommendations. Use this skill whenever Sean asks to 'analyse performance', 'do a performance analysis', 'diagnose the account', 'find the bottleneck', 'review the numbers', 'what's holding us back', or 'what should we fix first' for any client. Also trigger when Sean asks for a deep dive, an audit, or a strategic review of Meta Ads, Google Ads, or Shopify data. This is NOT the performance report skill — it is a diagnostic tool. The output is an internal analysis document, not a client-facing deck. Always use this skill for analysis requests. Never attempt a free-form audit without it."
---

# Performance Analysis Skill

This skill runs a structured, three-layer performance diagnosis across Meta Ads, Google Ads, and Shopify data pulled from Windsor. It outputs an internal Word document with benchmarked metric ratings, a ranked bottleneck diagnosis, and prescriptive recommendations — not a neutral summary, but a strong directional view of what to fix and why.

The framework is built on three questions asked in sequence:
1. Are we using the right measurement system for this account's scale?
2. What is the primary constraint on growth right now?
3. What does the creative data tell us about concept quality and diversity?

---

## Step 0: Read supporting references

Before doing anything, read both reference files:
- `references/benchmarks.md` — RAG benchmark table for every metric across Meta, Google, and Shopify
- `references/client-accounts.md` — Windsor account IDs per client (shared with performance-report skill)

Also read the docx skill at the path shown in the system prompt, and follow its instructions for generating the Word document in Step 6.

---

## Step 1: Gather inputs

Ask Sean (via AskUserQuestion if available):

1. **Client name** — e.g. "Petico MY", "Getha", "Holistq"
2. **Analysis period** — e.g. "March 2026", "1–15 March 2026"
3. **Comparison period** — default to the prior equivalent period (e.g. February 2026)
4. **Gross margin %** — default 25% if not specified; confirm before assuming
5. **Anything specific to investigate?** — e.g. "ROAS dropped", "spend isn't scaling", "new creative isn't converting" (optional but shapes where to dig first)
6. **Revenue stage** — approximate monthly revenue (use to calibrate measurement system): <$50K MYR/mo, $50K–$200K, $200K–$500K, $500K+

Confirm: "Got it — running analysis for [client], [period] vs [comparison period]. Pulling data from Windsor now."

---

## Step 2: Pull data from Windsor

Look up account IDs in `references/client-accounts.md`. Pull current period AND comparison period for all platforms.

### 2a. Meta Ads — Conversion Campaigns

Filter by `objective = OUTCOME_SALES`. Exclude campaigns from other clients.

**Fields (verified Windsor field names):**
```
campaign_name, objective, spend, impressions, reach, frequency, clicks,
actions_omni_purchase, action_values_omni_purchase, actions_link_click
```

Compute manually:
- ROAS = `action_values_omni_purchase / spend`
- CPP = `spend / actions_omni_purchase`
- AOV = `action_values_omni_purchase / actions_omni_purchase`
- CVR = `actions_omni_purchase / actions_link_click`
- CTR = `clicks / impressions`

### 2b. Meta Ads — Ad-level creative data (current period)

Pull ad-level to enable creative analysis. Split date range into two halves if pull times out.

**Fields:**
```
ad_name, campaign_name, spend, impressions, clicks,
actions_omni_purchase, action_values_omni_purchase
```

Sort by spend descending. Take top 10–15 ads overall.

### 2c. Meta Ads — Awareness Campaigns

Filter by `objective IN (OUTCOME_LEADS, OUTCOME_ENGAGEMENT, OUTCOME_AWARENESS, OUTCOME_TRAFFIC)`.

**Fields:**
```
campaign_name, objective, spend, impressions, reach, frequency,
actions_lead, actions_post_engagement
```

### 2d. Google Ads (if connected)

Check `references/client-accounts.md`. If connected:
```
campaign_name, spend, impressions, clicks, ctr, cpc, conversions,
conversion_value, cost_per_conversion, conversion_rate, roas
```

If not connected, note it and proceed with Meta-only analysis.

### 2e. Shopify (if connected)

```
order_count, order_gross_sales, order_net_sales, order_subtotal_price,
order_total_price, order_total_discounts, order_refunds_net
```

Use `date_filter: {"orders": "createdAt"}` and filter `order_financial_status = "paid"`.

Compute:
- **MER** = Total ad spend (Meta + Google) ÷ Total Shopify revenue
- **Acquisition MER** = Ad spend ÷ new customer revenue (if new/returning split available)
- **CAC** = Ad spend ÷ `order_count`
- **Break-even ROAS** = 1 ÷ gross_margin_pct

If Shopify not connected, ask Sean once for backend revenue and new/returning split estimate.

---

## Step 3: Layer 1 — Measurement System Assessment

Determine which measurement system applies to this account based on Sean's stated revenue stage:

| Monthly Revenue (MYR) | Primary KPI | Secondary KPI | Advanced |
|---|---|---|---|
| Under $50K | 7-day click ROAS | — | — |
| $50K–$200K | 7-day click ROAS | MER | — |
| $200K–$500K | 7-day click ROAS + MER | Acquisition MER, CAC | — |
| $500K+ | MER + CAC | LTGP:CAC, incrementality | MMM consideration |

**Assessment:** Does the current reporting match the right system for this scale? Flag it if not.

A common mistake: using only platform ROAS at $200K+ monthly without cross-referencing MER. If ROAS looks healthy but MER is weak, the account is relying on returning customer revenue to inflate numbers. Surface this clearly.

Output a one-paragraph **Measurement Verdict** for the document.

---

## Step 4: Layer 2 — Bottleneck Analysis

Work through this waterfall in order. For each, compare the metric against benchmarks in `references/benchmarks.md` and give it a RAG rating. The first metric that rates RED or is trending significantly worse than comparison period is the **primary bottleneck candidate**.

**Bottleneck waterfall (check in this order):**

1. **Scale signal** — Is spend actually limited? Is campaign budget the ceiling? (Check if daily budgets are being hit, CPMs are rising sharply)
2. **Creative performance** — ROAS, CVR, CPP vs benchmark. Is creative the limiter?
   - Sub-check: Hook rate (if video), CTR, ad fatigue (frequency >3)
   - Sub-check: Concept diversity — are 80%+ of impressions/spend going to ≤2 ads?
   - Sub-check: Format diversity — are all top ads the same format?
3. **Landing page / post-click** — If CTR is healthy but CVR is weak, the problem is downstream of the ad
4. **Offer** — AOV vs CPP ratio. If CPP > 60% of AOV, the offer or price point is likely the constraint
5. **Audience saturation** — Frequency >3, CPM rising >20% MoM, reach plateauing
6. **Campaign architecture** — Spend concentrated in one campaign/ad set; lack of testing structure; campaign objectives mismatched to funnel stage
7. **Channel contribution** — Google vs Meta attribution overlap; one channel cannibalising the other

**Output:** A ranked bottleneck list:
- **Primary bottleneck:** [Name] — [Supporting metric and evidence] — Confidence: High/Medium/Low
- **Secondary bottleneck:** [Name] — [Supporting metric]
- **Tertiary bottleneck (if identifiable):** [Name]

Don't list more than three. If confidence is low, say so — it's better to be honest than to produce a false ranking.

---

## Step 5: Layer 3 — Creative & Concept Analysis

Review the ad-level data pulled in Step 2b. For each of the top ads (by spend and by purchases separately), assess:

**Spend concentration:**
- What % of total Meta spend is going to the top 3 ads?
- If >70% → concentration risk, flag it
- If the #1 ad is also staling (ROAS declining period-over-period) → urgent

**Concept diversity:**
Look at ad names and infer creative angles. Group ads by apparent concept (same angle/persona/format). Flag if:
- All top-spend ads share the same visual format (e.g. all talking-head UGC)
- All messaging targets the same persona
- No "net new" concepts introduced in the period

**Performance patterns:**
- Which creative angle is consistently outperforming? (e.g. testimonial vs product demo)
- What's the ROAS spread between top and bottom performing concepts?
- Any ads with strong CTR but poor CVR? (Good hook, bad landing page match)

**Andromeda implication:**
If multiple ads appear similar in format AND angle, flag that Meta's Andromeda system may be consolidating their audience — meaning we're not actually testing against different people, we're competing with ourselves.

---

## Step 6: Build the Word document

Read the docx skill instructions before writing any code. Use `npm install -g docx` and generate via JavaScript (docx-js). Follow all critical rules from the docx skill — especially dual table widths, no unicode bullets, and explicit page sizes.

### Document structure

**Page 1 — Cover**
- Client name (large, bold)
- "Performance Analysis" (subtitle)
- Period: [current period] vs [comparison period]
- Prepared by Oblique | [date]
- Simple, clean — no image needed

**Page 2 — Executive Snapshot**
- One-paragraph verdict: What is the primary finding? What should happen next? Written as a clear, decisive statement — not a summary of facts.
- Metrics table: 6–8 key metrics for current vs comparison period, with RAG dot (🔴🟡🟢) and delta
  - Must include: ROAS, CPP, AOV, MER (if available), CTR, Frequency, Total Spend, CAC (if available)

**Page 3 — Measurement Assessment**
- Which system applies and why
- Is current reporting aligned with that system?
- What changes to the reporting setup (if any) are recommended

**Pages 4–5 — Bottleneck Diagnosis**
- Primary, Secondary, Tertiary bottlenecks
- Each gets: a heading, the supporting data evidence (specific numbers), a confidence rating, and a 2–3 sentence explanation of why this is the constraint
- Show the full waterfall table with RAG ratings for every metric checked

**Pages 6–7 — Creative & Concept Analysis**
- Spend concentration chart (text-based: "Top 3 ads = X% of spend")
- Concept diversity assessment
- Top 5 ads table: Ad Name | Spend | Purchases | ROAS | Concept angle (inferred)
- Pattern observations: what's working and why
- Andromeda flag if applicable

**Pages 8–9 — Strategic Recommendations**
- 5–7 numbered recommendations
- Each recommendation follows this exact format:

```
[NUMBER]. [ACTION VERB] [SPECIFIC ACTION]

Evidence: [The specific metric or observation that drives this recommendation]
Expected outcome: [What should improve and by approximately how much]
Priority: High / Medium / Low
Owner: Creative / Paid Media / CRO / Strategy
```

Recommendations must be actionable. Not "improve creative diversity" — but "Build 3 net-new concept briefs targeting [persona X] using [format Y], because 82% of current spend is concentrated in talking-head UGC targeting [persona Z] and frequency has reached 3.4."

**Appendix — Raw Data**
- Full Meta campaign table (current + comparison)
- Google Ads campaign table (if available)
- Shopify summary table (if available)

### Formatting

- Font: Arial throughout
- Page size: A4 (11906 × 16838 DXA)
- Margins: 1 inch (1440 DXA) all sides
- Heading colours: Use #E51C42 (Oblique red) for H1 section headers
- RAG dots: Use the text 🔴 🟡 🟢 (or coloured cell shading: Red=#FFCCCC, Amber=#FFF2CC, Green=#CCFFCC)
- Tables: Always dual widths (DXA), ShadingType.CLEAR, cell margins top/bottom 80, left/right 120
- Page breaks between major sections

---

## Step 7: Validate and deliver

Run:
```bash
node create_doc.js
python scripts/office/validate.py performance_analysis.docx
```

If validation fails, unpack, fix XML, repack.

Save final file to Sean's vault:
```
/sessions/.../mnt/Sean's Oblique Vault/10 - Oblique/Clients/[Client Name]/Reports/
```

Create the folder if it doesn't exist. Name the file:
```
[ClientName] | Performance Analysis | [Period].docx
```

Example: `PeticoMY | Performance Analysis | March 2026.docx`

Provide a `computer://` link so Sean can open it directly.

---

## Important principles

**Be opinionated.** The purpose of this analysis is to give Sean and the team a clear view of what to do next. Neutral hedging ("this could indicate...") is less useful than a confident diagnosis with stated confidence levels ("this is the primary bottleneck — high confidence based on X, Y, Z").

**Never fabricate numbers.** If data is missing, show "—" and note why. Do not estimate or interpolate without clearly labelling it as an estimate.

**Separate signal from noise.** Small MoM swings in CPM or CTR can be noise — don't treat them as bottlenecks unless the trend is consistent or the magnitude is meaningful (>15% change).

**The bottleneck is singular.** It's tempting to list five things that could be improved. That's not analysis — that's a backlog. The skill's job is to identify the one thing that, if fixed, would have the highest leverage on growth. Secondary and tertiary bottlenecks exist, but they shouldn't dilute the primary message.

**Recommendations must have owners.** Every recommendation should clearly state who is responsible — Creative, Paid Media, CRO, Strategy, or Sean directly. Ownerless recommendations don't get actioned.
