# Creative Analysis

Use this when Sean asks which creatives are winning, whether ads are fatigued, or when planning a creative refresh. Creative is the single biggest lever in Meta Ads — a new winning creative can cut CPA by 50% overnight.

## What to Pull

### Pull 1: Ad-level performance (last 30 days)

```
Fields: campaign, adset_name, ad_name, ad_id, effective_status,
        spend, impressions, cpm, ctr, clicks,
        actions_omni_purchase, action_values_omni_purchase,
        cost_per_action_type_omni_purchase,
        actions_add_to_cart, actions_link_click, actions_landing_page_view,
        quality_ranking, engagement_rate_ranking, conversion_rate_ranking,
        body, title, link_url, image_url

Date: last_30d
Filter: spend > 0
```

### Pull 2: Ad-level daily trend (last 30 days, top spenders only)

After Pull 1, identify the top 10 ads by spend. Then pull their daily data:

```
Fields: ad_name, ad_id, date, spend, impressions, cpm, ctr, clicks,
        actions_omni_purchase, action_values_omni_purchase

Date: last_30d
Filter: ad_id in [top 10 ad IDs]
```

### Pull 3: Ad creative start dates

```
Fields: ad_name, ad_id, ad_created_time, effective_status

Date: last_90d (to catch older creatives still running)
```

## How to Analyse

### 1. Creative Scorecard

For each ad with meaningful data (2,000+ impressions), compute:
- **CTR** — measures attention/hook strength
- **CPA** — measures conversion efficiency
- **ROAS** — measures revenue generation
- **Thumb-stop rate proxy** — CTR relative to account average (above 1.5x average = strong hook)
- **Quality signals** — quality_ranking, engagement_rate_ranking, conversion_rate_ranking

Classify each creative into:
- **Scale** — Above-average CTR AND above-average ROAS. Increase budget allocation.
- **Test more** — High CTR but below-average ROAS. The hook works but the offer/landing page isn't converting. Worth iterating on.
- **Fatigue candidate** — Was Scale-tier but CTR has declined 20%+ from its first-week average. Needs refresh.
- **Kill** — Below-average CTR AND below-average ROAS with 5+ days of data. Pause and replace.

### 2. Creative Fatigue Detection

For each of the top 10 ads by spend:
- Compare Week 1 CTR vs current-week CTR
- Compare Week 1 CPA vs current-week CPA
- If CTR has dropped 25%+ from peak AND the ad has been running 14+ days, it's fatigued
- If CPA has increased 30%+ from the first week, the creative is losing efficiency regardless of CTR

Also check: how many days has each creative been active? (`ad_created_time` to today)
- 0-14 days: still in learning/testing phase
- 14-30 days: prime performance window
- 30-60 days: fatigue risk increases
- 60+ days: almost certainly fatigued unless it's an evergreen offer

### 3. Creative Diversity Check

Per ad set:
- How many active ads? (fewer than 3 = insufficient testing)
- Are the ads visually diverse? (check if body/title are similar across ads — if so, you're not really testing different angles)
- Is one ad consuming 80%+ of the ad set's spend? If yes, Meta has "picked a winner" — but that winner might be fatiguing. Consider launching new variants.

### 4. Copy & Messaging Patterns

From the `body` and `title` fields:
- Which messaging angles appear in the top performers? (price, benefits, social proof, urgency, etc.)
- Are there patterns in headline length, CTA type, emoji usage?
- Do short-form or long-form captions perform better?

This is qualitative but valuable — it tells the creative team what angles to double down on.

### 5. Quality Ranking Diagnosis

Meta's quality rankings (ABOVE_AVERAGE_35, AVERAGE, BELOW_AVERAGE_35, BELOW_AVERAGE_10) tell you where the problem lies:
- Low **quality_ranking** → Ad content or landing page is weak. Fix the creative or LP.
- Low **engagement_rate_ranking** → People see the ad but don't engage. Hook or visual is weak.
- Low **conversion_rate_ranking** → People engage but don't convert. Offer, LP, or audience mismatch.

An ad with all three BELOW_AVERAGE should be paused immediately regardless of other metrics.

### 6. Output

Present as a table: Ad Name | Status | Spend | CTR | CPA | ROAS | Quality | Verdict

Then provide:
1. Top 3 creatives to scale (and why)
2. Creatives to pause immediately (and why — cite the data)
3. Fatigue alerts (which creatives need refreshing and by when)
4. Creative gaps — what angles/formats aren't being tested that should be
5. Recommended creative brief themes based on what's working
