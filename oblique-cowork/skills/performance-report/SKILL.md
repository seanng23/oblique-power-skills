---
name: performance-report
description: "Build a full Oblique-style performance marketing report as a branded .pptx file, pulling live data from Windsor.ai. Use this skill whenever Sean asks for a performance report, marketing report, ads report, bi-weekly report, monthly report, or campaign summary for any client. Also trigger when Sean says 'do a report for [client]', 'run the performance report', 'pull the data for [client]', or mentions a date range alongside a client name. This skill handles the full workflow: pulling Meta Ads + Google Ads data via Windsor, asking for any missing data (backend revenue, Google Ads if not in Windsor), generating structured slides with real metrics, creative analysis, and strategic recommendations. Always use this skill — never build a performance report from scratch without it."
---

# Performance Marketing Report Skill

This skill produces a branded Oblique performance marketing report as a `.pptx` file, following the exact structure of the agency's bi-weekly/monthly report format. It pulls live data from Windsor.ai where available, uses Computer Use for dashboards that aren't connected, and assembles everything into a polished client-ready deck.

## ⚠️ STANDING RULE: Always Separate Awareness and Conversion Campaigns

This rule applies to EVERY performance report, for every client, without exception:

1. **Never mix awareness and conversion campaigns in the same ROAS calculation.** Combining them produces a misleading blended ROAS that is always lower than the true conversion ROAS.
2. **Use Windsor's `objective` field to classify campaigns:**
   - `OUTCOME_SALES` → Conversion/Sales campaign
   - `OUTCOME_LEADS`, `OUTCOME_ENGAGEMENT`, `OUTCOME_AWARENESS`, `OUTCOME_TRAFFIC` → Awareness campaign
3. **ROAS is reported only for conversion campaigns** (Meta Sales + Google Ads paid search/shopping). Awareness campaigns report Impressions, Engagement, Leads — not ROAS.
4. **Always show two separate sections** in the Campaign Overview slide: one Awareness row and one Conversion row with their own distinct metrics.
5. **Exclude non-client campaigns from reports.** Always filter out campaigns prefixed with other clients' names (e.g. "OBL | SG |" in a MY report, or campaigns from other clients accidentally running in this account). Flag any such leakage to Sean as a billing alert.

---

## Step 0: Read supporting references

Before doing anything else, read both reference files in full — they are essential:

- `references/client-accounts.md` — Windsor account IDs per client, and which platforms are connected
- `references/report-structure.md` — Full slide-by-slide specification for the report

Also read the PPTX skill at `/sessions/determined-sweet-hawking/mnt/.claude/skills/pptx/SKILL.md` and follow its instructions for creating and QA-ing the deck.

---

## Step 1: Gather inputs

Ask the user (via AskUserQuestion if available, otherwise in chat):

1. **Client name** — e.g. "Petico MY", "Petico SG", "Getha", "The Archive"
2. **Current period** — e.g. "1–15 March 2026" or "March 2026"
3. **Comparison period** — e.g. "February 2026" or "16–28 Feb 2026" (default to the immediately prior equivalent period)
4. **Backend revenue figure** (optional) — the actual Shopify/backend revenue for the period, so we can show "Ad Platform vs Backend Actual". If not provided, note it as TBC on the slide.
5. **Gross margin %** — for P&L analysis (default: 18% if not specified — confirm with user before assuming)
6. **Any campaign notes** — e.g. new creatives launched, promotions running, budget changes

Confirm before proceeding: "Got it. Pulling data for [client], [current period] vs [comparison period]. Let me grab the numbers from Windsor now."

---

## Step 2: Pull data from Windsor

Use the Windsor MCP tool `get_data` to pull metrics. Look up the correct account IDs in `references/client-accounts.md`.

### 2a. Meta Ads — Conversion Campaigns

Pull for BOTH the current period AND the comparison period.

**Use Windsor `objective` field to filter — do NOT rely on campaign name alone:**
- Filter: `objective = OUTCOME_SALES`
- Also exclude campaigns from other clients that may appear in this account (check for wrong brand prefixes)

**Correct Windsor field names for Meta (verified):**
```
campaign_name, objective, spend, impressions, clicks, reach, frequency,
actions_omni_purchase,        ← purchase count
action_values_omni_purchase,  ← purchase revenue
actions_link_click            ← clicks to website
```

**Do NOT use:** `purchases`, `purchase_roas`, `purchase_value` — these are not valid Meta Windsor fields.

Compute ROAS manually: `action_values_omni_purchase / spend`

Group by: `campaign_name` (aggregate totals for the period)

### 2b. Meta Ads — Awareness Campaigns

Same date ranges. **Use Windsor `objective` field:**
- Filter: `objective IN (OUTCOME_LEADS, OUTCOME_ENGAGEMENT, OUTCOME_AWARENESS, OUTCOME_TRAFFIC)`

**Correct Windsor field names:**
```
campaign_name, objective, spend, impressions, reach, frequency,
actions_lead,             ← lead count
actions_post_engagement   ← engagement (likes, comments, shares)
```

**Do NOT report ROAS for awareness campaigns.** Report: Spend, Impressions, Engagement, Leads.

### 2c. Meta Ads — Top Creatives

Pull ad-level data for the current period to identify top performers.

**Fields to request:**
```
ad_name, campaign, spend, impressions, clicks, objective,
actions_omni_purchase, action_values_omni_purchase
```

**Important:** Ad-level pulls with many fields and long date ranges can timeout (60s limit). Split into smaller date windows (e.g. two halves of the month) if the pull fails.

Sort by purchases descending. Take **top 3–5 per individual campaign** (not just overall), for BOTH conversion and awareness campaigns. The report shows campaign-by-campaign creative breakdown — each campaign header followed by its top performers. Group results by campaign name.

### 2d. Google Ads

Check `references/client-accounts.md` to see if the client has a Google Ads account connected in Windsor.

**If connected:** Pull via `get_data` with connector `google_ads`:
```
campaign_name, spend, impressions, clicks, ctr, cpc, conversions,
conversion_value, cost_per_conversion, conversion_rate, roas
```

**If NOT connected in Windsor:** Use one of these fallback approaches (in order of preference):
1. Ask Sean: "Google Ads for [client] isn't connected in Windsor — can you paste the key stats, or should I screenshot from the Google Ads dashboard?"
2. If Computer Use is available and Sean wants a screenshot: use `mcp__Claude_in_Chrome__computer` to navigate to `ads.google.com`, find the relevant account, and screenshot the campaign performance table for the relevant date range.
3. If neither is feasible: note in the report as "Google Ads data not available — to be added" and proceed with Meta-only data.

### 2e. Shopify — Backend Revenue (for Ad Platform vs Backend Actual slide)

Check `references/client-accounts.md` to see if the client has a Shopify account connected in Windsor.

**If connected:** Pull via `get_data` with connector `shopify`:
```
order_count, order_gross_sales, order_net_sales, order_subtotal_price,
order_total_price, order_total_discounts, order_refunds_net
```

Use `date_filter: {"orders": "createdAt"}` and filter `order_financial_status eq "paid"` to only count completed orders.

This gives you the true backend revenue to compare against the ad platform's attributed revenue on the P&L and Ad Platform vs Backend Actual slides. The gap between the two numbers is normal and worth explaining (attribution window, view-through, etc.).

**If NOT connected:** Ask Sean once: "Shopify isn't connected for [client] in Windsor — what was the actual backend revenue for [period]?" Then proceed with that number.

### 2f. Data validation

After pulling data, do a quick sanity check:
- Do spend figures look reasonable? (not $0, not astronomically high)
- Do ROAS numbers make sense (typically 1–15 for e-commerce)?
- Are date ranges correct?

If anything looks off, flag it to Sean before building the deck.

---

## Step 3: Calculate derived metrics

From the raw Windsor data, compute:

| Metric | Formula |
|--------|---------|
| ROAS | purchase_value / spend |
| CPP (Cost Per Purchase) | spend / purchases |
| AOV (Average Order Value) | purchase_value / purchases |
| CVR (Conversion Rate) | purchases / clicks |
| CTR | clicks / impressions (Windsor may provide this directly) |
| CPL (Cost Per Lead) | spend / leads |
| Break-even ROAS | 1 / gross_margin_pct (e.g. at 18% margin → 5.56) |
| Net profit (ad-only) | purchase_value × gross_margin_pct − spend |

Compute these for both the current period and comparison period so you can show MoM delta.

---

## Step 4: Optional — gather competitor/industry insights via Apify

If Sean wants additional context (e.g. industry benchmarks, competitor activity), use the Apify RAG web browser:

```
mcp__Apify__apify-slash-rag-web-browser
query: "[industry] Meta Ads benchmarks ROAS CPP [year]"
```

Use insights sparingly — they belong in the Optimization & Next Steps slide as supporting context, not as primary data.

---

## Step 5: Build the PPTX

Follow the full slide-by-slide spec in `references/report-structure.md`.

### Design direction

Use the **Oblique brand palette** (from official brand guidelines — NOT client colours):
- Primary Red: `#E51C42` — main accent, section header bars, table headers, accent stripes, highlight elements
- Near-Black: `#221F1F` — dark neutral, body text, secondary header bars (e.g. Google Ads, P&L)
- White: `#FFFFFF` — content slide backgrounds
- Off-White: `#F7F7F7` — card backgrounds, alternating table rows
- Medium Grey: `#888888` — footer copyright text, muted labels
- Light Red Tint: `#FDE8EC` — highlight card backgrounds, campaign header bands
- Green (for positive deltas only): `#2E7D32` — metric improved vs prior period
- Red (for negative deltas): `#E51C42` — metric worsened vs prior period

**IMPORTANT:** These are Oblique's brand colours. Do NOT use client brand colours (e.g. Getha green, Petico blue) for the report chrome. Client colours only appear in their logo.

Font pairing: **Trebuchet MS** (headers, bold stats) + **Calibri** (body text, tables)

Background: Use client building/showroom photo for cover, section dividers, and closing slides with 45-50% dark overlay.
Footer: "Copyright | Oblique [year]" bottom-left, "×oblique" (in red) bottom-right, page number top-right.

### Slide structure (18 slides)

1. **Title Cover** — client photo background, logo, "Performance Report", date range, client × Oblique
2. **Executive Summary** — red header bar; left column: Key Insights (6 bullets); right column: 2×3 KPI card grid; bottom: Total Ad Spend breakdown bar
3. **Divider: Conversion Campaigns** — photo background with red accent stripe
4. **Ad Platform vs Shopify Revenue** — red header; 12-month bar+line trend chart (chart image embedded)
5. **Meta Ads vs Google Ads** — red header; 12-month grouped bar chart with ROAS line
6. **Conversion Performance | Meta Ads** — red header; 6 KPI cards (Spend, Purchases, Revenue, ROAS, CPP, AOV) + extra metrics row (Split%, CVR, CTR, Impressions, Clicks, CPC) + Meta Sales trend chart
7. **Conversion Performance | Google Ads** — near-black header; 4 KPI cards + campaign breakdown table (9 campaigns)
8. **Month-on-Month Spending Split | Meta** — red header; side-by-side tables: Sales campaigns (left) and Awareness campaigns (right) with spend and % split
9. **Creative Analysis | Sales Campaigns (Part 1)** — red header; campaign-by-campaign top 3-5 creatives with purchases, spend, ROAS
10. **Creative Analysis | Sales Campaigns (Part 2)** — red header; remaining campaigns
11. **Divider: Awareness Campaigns** — photo background with red accent stripe
12. **Awareness Performance** — red header; Meta Awareness KPIs (Spend, Impressions, Engagement, Leads) + Google Store Visits section + awareness trend chart
13. **Creative Analysis | Awareness Campaigns** — red header; campaign-by-campaign top creatives with spend, impressions, engagement level
14. **Divider: Shopify & Profitability** — photo background with red accent stripe
15. **Top 10 Shopify Products** — red header; 4 KPI cards + product table with inline revenue bars
16. **Profitability Analysis** — dark grey header; full P&L table (Gross Rev → Net Rev → Gross Profit → Ad Spend breakdown → Net Profit) with MoM change column
17. **Recommendations** — green header; 6 numbered recommendation cards with title + body
18. **Closing** — photo background, "Thank You", contact details

### Chart generation

Generate 4 trend chart PNG images using matplotlib (150 DPI, 900×400px):
- `chart_ad_vs_shopify.png` — dual-axis bar+line (ad revenue bars, Shopify line)
- `chart_meta_vs_google.png` — grouped bars (Meta + Google spend) with ROAS line
- `chart_meta_sales_trend.png` — bars (Meta Sales spend) with purchases line
- `chart_awareness_trend.png` — bars (Meta Awareness spend) with engagement line

Use Oblique brand colors: Red #E51C42 (primary bars), Near-Black #221F1F (secondary/lines), Medium Grey #888888 (axis labels). White background, no gridlines, professional sans-serif fonts.

### Colour-coding for performance

- **Green** `#2E7D32` — metric improved vs prior period (ROAS up, CPP down)
- **Red** `#E51C42` — metric worsened (uses Oblique red)
- **Grey** `#888888` — flat or neutral

Note: CPP going DOWN is good (green). ROAS going UP is good (green).

---

## Step 6: QA the deck

Follow the PPTX skill's QA section. Convert to images and inspect:
- No leftover placeholder text
- No overlapping elements
- Correct data in every table (double-check against your Windsor pull)
- Delta arrows point the right direction
- All creative names are real ad names from the data, not made-up placeholders

---

## Step 7: Deliver

Save the final deck to the user's vault folder:
```
/sessions/determined-sweet-hawking/mnt/Sean's Oblique Vault/10 - Oblique/Clients/[Client Name]/Reports/
```

If that folder doesn't exist, create it. Name the file:
```
[ClientName] x Oblique | Performance Report | [DateRange].pptx
```

Example: `PeticoMY x Oblique | Performance Report | 1-15 Mar 2026.pptx`

Then provide a `computer://` link so Sean can open it directly.

---

## Important notes

- **Never fabricate numbers.** If data is missing, show "—" or "TBC" rather than guessing.
- **Always show both periods** in comparison tables — the value of this report is the MoM delta story.
- **The insights are the product.** Raw numbers on a slide aren't valuable — every data section should have a "Key Insights" bullet explaining *what it means* and *why it happened*. Think like a strategist, not a data dumper.
- **Creative analysis is qualitative too.** For top creatives, go beyond "highest purchases" — explain the creative angle (e.g. "value-driven messaging", "social proof", "urgency") and what Oblique should learn from it.
- **Ask Sean once, then proceed.** If there's a data gap, ask once clearly, get the number, and move on. Don't ask for the same thing twice.
