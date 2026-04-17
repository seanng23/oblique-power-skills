---
name: media-plan
description: >
  Build a structured Oblique-style media plan as a professional Excel (.xlsx) file for any performance marketing client.
  Use this skill whenever Sean asks to build a media plan, allocate budget across channels, plan ad spend, create a channel split,
  set up campaign budgets, or says things like "media plan for [client]", "budget allocation for [client]", "plan the spend for [client]",
  "how should we split the budget", "set up the campaigns", or "plan the Meta and Google spend".
  Also trigger when Sean mentions a total monthly budget alongside a client name and channels.
  This skill handles the full workflow: gathering inputs, applying Oblique's budget allocation rules intelligently,
  generating the correct campaign structure, and producing a formatted Excel file matching Oblique's media plan template.
  Always use this skill for any media planning or budget allocation request — never build a media plan from scratch without it.
---

# Oblique Media Plan Skill

Produce a structured, formatted media plan Excel file for a performance marketing client. The output closely follows Oblique's standard template (see Getha MY reference plan).

## Step 1 — Gather Inputs

Ask the user for the following. Most can be inferred from context — only ask what you genuinely don't know.

**Required:**
- **Client name** and **market** (e.g. Getha, Malaysia → "Getha MY")
- **Currency** (e.g. RM, SGD, AUD, USD)
- **Total monthly budget** (the number to allocate across channels)
- **Business type**: B2B, Ecommerce, or Lead Gen — this drives channel and campaign decisions
- **Active channels**: Google, Meta, TikTok, Shopee CPAS (usually just Google and/or Meta)
- **Products / SKUs**: Are there multiple product categories with meaningfully different AOVs? (e.g. Mattresses RM4k–10k vs Accessories RM300–800) — these get separate campaigns
- **Plan type**: Evergreen monthly plan, or does it include a specific campaign/promotion on top?
- **Start month** (e.g. April 2026) — used for campaign naming

**Optional:**
- CPA or CPL target (if provided, note it in the plan header)
- Any campaigns already live that should be carried over

## Step 2 — Apply Budget Allocation Rules

Use the following logic to determine channel splits and campaign structures. These are Oblique's standard starting points — adjust if client history or brief suggests otherwise.

### Channel Split by Business Type

| Business Type | Google | Meta | Notes |
|---|---|---|---|
| B2B / Lead Gen | 100% | 0% | All budget on Google SEM |
| Ecommerce | 50% | 50% | Equal split as starting point |
| Lead Gen (consumer) | 60% | 40% | More Google for intent capture |
| Ecommerce + TikTok | 40% | 40% | 20% TikTok, pulled equally from both |
| Ecommerce + Shopee CPAS | 40% | 40% | 20% Shopee, pulled equally |

### Google Budget Split (Ecommerce)

Within Google's total budget:
- **60% → Brand SEM / PMAX (main product)** — captures existing demand, high intent
- **40% → Non-Brand SEM / PMAX (other products)** — expands reach, prospecting

If the client has Google Maps / store visit objectives, carve 5–10% from Google for GMB PMAX campaigns.

### Google Campaign Types (Ecommerce, in priority order)

1. **Search – Brand** (always include) — bidding: TIS (Target Impression Share)
2. **PMAX – [Main Product]** — bidding: Target ROAS or Max Conv Value
3. **PMAX – [Secondary Products]** — bidding: Max Conv Value (separate campaign per major SKU group)
4. **Search – Non-Brand** (if budget allows) — bidding: Max Conversions
5. **PMAX – GMB** (for physical stores) — bidding: Max Conversions

### Google Campaign Types (B2B / Lead Gen)

1. **Search – Brand** — TIS
2. **Search – Non-Brand** — Max Conversions
3. **Search – Competitors** (if budget allows) — Max Conversions
4. **Display – Remarketing** (optional) — Max Conversions

### Meta Budget Split (Ecommerce)

Meta budget is primarily evergreen, with promotional campaigns added on top.

Within Meta's total budget:
- **70–80% → Evergreen conversion campaigns** (by product/SKU)
- **10–15% → Retargeting** (engaged + existing customers)
- **5–10% → Awareness** (if the client needs top-funnel)
- **Seasonal/promo campaigns** → additional budget, recommended on top of monthly

If multiple SKU groups with different AOVs: create a separate conversion campaign per group. Each campaign gets its own budget allocation proportional to its revenue importance (higher AOV products typically get more budget).

### Meta Campaign Types

1. **Conversion – [SKU Group]** (one per product category) — bidding: Online Purchase; audience: Broad + LAL
2. **Conversion – Retargeting – [SKU Group]** — bidding: Online Purchase; audience: Engaged + Existing customers
3. **Leads – WhatsApp** (for APAC markets when WhatsApp enquiries are a goal) — bidding: Leads - WhatsApp
4. **Awareness** (if top-funnel needed) — bidding: Engagement / ThruPlay

### Meta Budget Logic for Multiple SKU Groups

Distribute Meta conversion budget across SKU groups based on:
- Higher AOV → more budget (drives more revenue per conversion)
- Strategic priority (hero products, launches, seasonal focus)
- Don't over-fragment: consolidate small SKUs into an "Accessories" campaign rather than 5 separate tiny campaigns

### Pacing

All budgets are monthly. Daily budget = monthly ÷ 31.

Campaigns are always-on unless explicitly marked as campaign-specific (e.g. Raya, CNY). Campaign-specific spend is on top of the evergreen monthly budget.

## Step 3 — Build the Campaign List

Before generating the Excel, mentally draft (or list out in your reasoning) the full campaign structure:

For each channel, list:
- Campaign type / objective
- Campaign name (see naming convention below)
- Audience
- Bidding strategy
- Monthly budget
- Status (use "Paused" for new campaigns not yet live; "WIP OBL" for campaigns being set up)

**Campaign naming convention:**
`OBL | [Client Name] [Market] | [Campaign Type] | [Product/Detail] | [Mon YY]`

Examples:
- `OBL | Getha MY | Search - Brand | Apr 26`
- `OBL | Getha MY | Pmax | Mattress | Apr 26`
- `OBL | Getha MY | Sales | A+ | Transforme Mattress | Apr 26`
- `OBL | Getha MY | Leads | A+ | All Products | Apr 26`

For Meta campaigns, use `A+` to denote Advantage+ campaigns. Include the product focus in the name.

## Step 4 — Generate the Excel

Once the campaign structure is confirmed, produce the Excel using the bundled script.

### Write the JSON config

Build a JSON config file matching this schema:

```json
{
  "client_name": "Getha MY",
  "currency": "RM",
  "start_month": "Apr 26",
  "cpa_target": null,
  "total_monthly_budget": 65000,
  "channels": [
    {
      "name": "Google Ads SEM",
      "monthly_budget_input": 9750,
      "campaigns": [
        {
          "status": "Paused",
          "campaign_type": "Conversion - Search - Brand",
          "campaign_name": "OBL | Getha MY | Search - Brand | Apr 26",
          "audience": "Brand keywords",
          "content": "",
          "bidding": "TIS",
          "monthly_budget": 9750
        }
      ]
    },
    {
      "name": "Google Ads Pmax",
      "monthly_budget_input": 22750,
      "campaigns": [
        {
          "status": "Paused",
          "campaign_type": "Conversion - Pmax - Mattress",
          "campaign_name": "OBL | Getha MY | Pmax | Mattress | Apr 26",
          "audience": "New customers",
          "content": "",
          "bidding": "Target ROAS",
          "monthly_budget": 13650
        },
        {
          "status": "Paused",
          "campaign_type": "Conversion - Pmax - Non-Mattress",
          "campaign_name": "OBL | Getha MY | Pmax | Non-Mattress | Apr 26",
          "audience": "New customers",
          "content": "Pillows, Toppers, Accessories",
          "bidding": "Max Conv Value",
          "monthly_budget": 9100
        }
      ]
    },
    {
      "name": "Meta Ads",
      "monthly_budget_input": 32500,
      "campaigns": [
        {
          "status": "Paused",
          "campaign_type": "Conversion",
          "campaign_name": "OBL | Getha MY | Sales | A+ | Mattress | Apr 26",
          "audience": "Broad, LAL",
          "content": "",
          "bidding": "Online Purchase",
          "monthly_budget": 16250
        },
        {
          "status": "Paused",
          "campaign_type": "Conversion",
          "campaign_name": "OBL | Getha MY | Sales | A+ | Topper | Apr 26",
          "audience": "Broad, LAL",
          "content": "",
          "bidding": "Online Purchase",
          "monthly_budget": 9750
        },
        {
          "status": "Paused",
          "campaign_type": "Conversion",
          "campaign_name": "OBL | Getha MY | Sales | A+ | Accessories | Apr 26",
          "audience": "Broad, Interest",
          "content": "",
          "bidding": "Online Purchase",
          "monthly_budget": 3250
        },
        {
          "status": "Paused",
          "campaign_type": "Conversion",
          "campaign_name": "OBL | Getha MY | Sales | Retargeting | Apr 26",
          "audience": "Engaged, Existing customers",
          "content": "",
          "bidding": "Online Purchase",
          "monthly_budget": 3250
        }
      ]
    }
  ],
  "notes": [
    "**Note: Cost per results may vary depending on audience size, competition & landing page experience.",
    "**Estimations are based on past campaigns performance & rough estimations."
  ]
}
```

**Valid status values:** `Live`, `Paused`, `KIV`, `WIP OBL`

**Valid channel names:** Use exactly these names so the script groups them correctly:
- `Google Ads SEM`
- `Google Shopping`
- `Google Display`
- `Google Ads Pmax`
- `TikTok Ads`
- `Meta Ads`
- `Shopee CPAS`

### Run the script

Save the config as `/tmp/media_plan_config.json`, then run:

```bash
python /path/to/skill/scripts/generate_media_plan.py /tmp/media_plan_config.json /path/to/output/ClientName_Media_Plan_MonYY.xlsx
```

Then run the recalc script to populate formula values:
```bash
python /path/to/xlsx-skill/scripts/recalc.py /path/to/output/ClientName_Media_Plan_MonYY.xlsx
```

The xlsx skill is at: `/sessions/compassionate-confident-bardeen/mnt/.claude/skills/xlsx`

### Save the output

Save the final .xlsx to the user's vault:
`/sessions/compassionate-confident-bardeen/mnt/Sean's Oblique Vault/`

Name it: `[ClientName] x Oblique - Media Plan [MonYY].xlsx`

## Step 5 — Present to Sean

Share a link to the file and give a brief summary of:
- Total budget allocated
- Channel split (e.g. Google 50% / Meta 50%)
- Number of campaigns per channel
- Any key strategic calls made (e.g. "split Mattress and Accessories into separate PMAX campaigns given the AOV gap")

## Reference: Status Colour Guide

| Status | Meaning |
|---|---|
| Live | Campaign is currently running |
| Paused | Ready but not yet active |
| KIV | Keep In View — on hold, may activate later |
| WIP OBL | Work In Progress by Oblique — being set up |

## Reference: Bidding Strategy by Campaign Type

| Campaign | Recommended Bidding |
|---|---|
| Search – Brand | TIS (Target Impression Share) |
| Search – Non-Brand | Max Conversions or Max Conv Value |
| PMAX – main product | Target ROAS (if historical data exists) or Max Conv Value |
| PMAX – new/other products | Max Conv Value |
| Display – Remarketing | Max Conversions |
| Meta – Awareness | Engagement / ThruPlay |
| Meta – Leads (APAC) | Leads - WhatsApp |
| Meta – Conversion prospecting | Online Purchase |
| Meta – Retargeting | Online Purchase |
| TikTok – Awareness | Video Views / ThruPlay |
| TikTok – Conversion | Website Conversions |

## Important Rules

- Never recommend creative formats in the media plan — Oblique always tests multiple formats across campaigns. The Content column is for strategic notes (e.g. which products are featured), not format prescriptions.
- Campaign budgets in the plan are for planning/reference. The actual Meta campaign setup uses daily budgets in Ads Manager — daily = monthly ÷ 31.
- If the user provides a campaign that's already live, use status "Live" and pull the actual current budget.
- Campaigns with budget 0 or TBC should still appear in the plan with status "WIP OBL" or "KIV" and empty budget cells.
- For ecommerce Google, always lead with Brand SEM + PMAX as the core structure. Don't over-complicate with Display and Shopping unless there's a specific reason.
