# Full Account Audit

A comprehensive health check of the entire Meta account. This is the default analysis when Sean asks how a Meta account is doing, or when there's no specific diagnosis in mind.

## What to Pull

### Pull 1: Campaign-level summary (last 30 days)

```
Fields: campaign, campaign_id, campaign_objective, campaign_effective_status,
        spend, impressions, reach, frequency, clicks, cpm, ctr,
        actions_omni_purchase, action_values_omni_purchase,
        cost_per_action_type_omni_purchase,
        actions_lead, cost_per_action_type_lead,
        actions_add_to_cart, actions_initiate_checkout, actions_landing_page_view

Date: last_30d
Filter: campaign_effective_status = ACTIVE (or omit to see paused campaigns too)
```

### Pull 2: Ad set-level breakdown (last 30 days, active campaigns only)

```
Fields: campaign, adset_name, adset_id, adset_effective_status,
        adset_daily_budget, adsset_optimization_goal,
        spend, impressions, reach, frequency, cpm, ctr, clicks,
        actions_omni_purchase, action_values_omni_purchase,
        cost_per_action_type_omni_purchase

Date: last_30d
Filter: campaign_effective_status = ACTIVE
```

### Pull 3: Weekly trend (last 8 weeks)

```
Fields: date, spend, impressions, cpm, clicks, ctr,
        actions_omni_purchase, action_values_omni_purchase

Date: last_60d (to get 8+ weeks)
```

Group by week in your analysis code.

### Pull 4: Ad-level creative performance (last 30 days)

```
Fields: campaign, adset_name, ad_name, ad_id, effective_status,
        spend, impressions, cpm, ctr, clicks,
        actions_omni_purchase, action_values_omni_purchase,
        quality_ranking, engagement_rate_ranking, conversion_rate_ranking,
        body, title, link_url

Date: last_30d
Filter: effective_status = ACTIVE, spend > 0
```

## How to Analyse

Work through each section in order. The goal is to give Sean a clear picture of account health and a prioritised list of what to fix.

### 1. Account Overview

Compute for conversion campaigns only:
- Total spend, total purchases, total revenue, ROAS
- CPA (cost per purchase)
- Average CPM, average CTR
- Compare to previous 30 days if data available — flag any metric that moved more than 15%

For awareness campaigns separately:
- Total spend, impressions, reach, frequency
- CPM trend

### 2. Campaign Performance Table

One row per active campaign. Columns:
- Campaign name, Objective, Spend, Impressions, CPM
- For OUTCOME_SALES: Purchases, Revenue, ROAS, CPA
- For OUTCOME_LEADS: Leads, CPL
- For others: Reach, Frequency, Engagement

Flag any campaign where:
- ROAS is below 2x (for conversion campaigns)
- CPM is more than 30% above account average
- Frequency is above 4 (audience saturation)
- Spend is above budget but purchases are zero

### 3. Ad Set Winners & Losers

Rank ad sets by efficiency (ROAS for conversion, CPL for leads). For each:
- **Winners** (top 3 by ROAS): What's working? Audience type, budget, optimisation goal.
- **Losers** (bottom 3 by ROAS with meaningful spend): What's wrong? High CPM? Low CTR? Good traffic but no conversions?
- **Budget allocation check**: Are the winning ad sets getting enough budget? Is spend being wasted on losers that should be paused?

### 4. Audience Assessment

Check for the "too narrow" problem Sean worries about:
- What's the frequency per ad set? Anything above 3x/week is a warning sign.
- Are CPMs rising for any ad set week-over-week? That's saturation.
- Is there significant overlap between ad sets? (Can infer from similar CPMs + frequencies on campaigns targeting similar demographics)
- Recommendation: broaden, narrow, or hold.

### 5. Creative Health

For the top 10 ads by spend:
- CTR, CPA, ROAS
- Quality/engagement/conversion rankings (ABOVE_AVERAGE_35, AVERAGE, BELOW_AVERAGE_35, etc.)
- Any creative running for 30+ days with declining CTR? That's fatigue.
- Are there enough active creatives? (fewer than 3 per ad set = creative diversity risk)

### 6. Funnel Check

Compute the funnel ratios:
- Landing page views → Add to cart → Initiate checkout → Purchase
- Flag any step where conversion rate drops below benchmark:
  - LPV → ATC: below 5% is weak
  - ATC → IC: below 30% is weak
  - IC → Purchase: below 40% is weak

### 7. Prioritised Recommendations

Rank by impact. Each recommendation must include:
- What to change (specific campaign/ad set/ad name)
- Why (the data that supports it)
- Expected impact (e.g. "Pausing this ad set saves RM X/month with zero purchase loss")
- Urgency (do now / this week / next review)
