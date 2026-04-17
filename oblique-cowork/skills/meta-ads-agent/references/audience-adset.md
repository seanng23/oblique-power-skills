# Audience & Ad Set Analysis

Use this when Sean asks about ad set structure, audience targeting, whether audiences are too narrow, which audiences are winning, or when he suspects targeting is off. This is one of the most important analyses for Oblique because the team tends to over-narrow — and Meta's algorithm actually performs best with broader audiences in most cases.

## What to Pull

### Pull 1: Ad set performance (last 30 days)

```
Fields: campaign, campaign_objective, adset_name, adset_id, adset_effective_status,
        adset_daily_budget, adset_lifetime_budget, adsset_optimization_goal,
        spend, impressions, reach, frequency, cpm, ctr, clicks,
        actions_omni_purchase, action_values_omni_purchase,
        cost_per_action_type_omni_purchase,
        actions_lead, cost_per_action_type_lead

Date: last_30d
```

### Pull 2: Ad set performance by age & gender (last 30 days)

```
Fields: adset_name, adset_id, age, gender,
        spend, impressions, cpm, ctr, clicks,
        actions_omni_purchase, action_values_omni_purchase

Date: last_30d
Filter: Only conversion campaigns (campaign_objective = OUTCOME_SALES)
```

### Pull 3: Ad set weekly trend (last 8 weeks)

```
Fields: adset_name, adset_id, date, spend, impressions, reach, frequency, cpm,
        actions_omni_purchase, action_values_omni_purchase

Date: last_60d
```

Group by week in analysis.

### Pull 4: Placement breakdown per ad set (last 30 days)

```
Fields: adset_name, publisher_platform, platform_position,
        spend, impressions, cpm, ctr,
        actions_omni_purchase, action_values_omni_purchase

Date: last_30d
```

## How to Analyse

### 1. Ad Set Performance Ranking

Rank all active ad sets by efficiency:
- For OUTCOME_SALES: rank by ROAS, then by CPA
- For OUTCOME_LEADS: rank by CPL

For each ad set, compute:
- ROAS (or CPL for lead gen)
- CPA
- CPM
- CTR
- Frequency (7-day)
- Spend as % of total account spend

**Winners**: Top 25% by ROAS with 1,000+ impressions
**Middle**: 25th-75th percentile
**Losers**: Bottom 25% by ROAS with meaningful spend (>10% of average ad set spend)

### 2. The "Too Narrow" Diagnosis

This is the core concern. Check each ad set for narrowness signals:

**Signal 1: High frequency**
- Frequency above 3x in last 7 days = audience is small relative to budget
- Frequency above 5x = audience is definitely too narrow

**Signal 2: Rising CPM trend**
- Pull the weekly CPM for each ad set. If CPM has risen 20%+ over 4 weeks while spend stayed constant, the audience is saturating.

**Signal 3: Reach ceiling**
- Compare reach to impressions. If reach has plateaued but impressions keep climbing (i.e. frequency is doing all the work), the audience pool is exhausted.

**Signal 4: Declining marginal returns**
- If an ad set's ROAS was 5x in week 1 but is now 2x in week 4 with the same budget, each additional impression is worth less — classic saturation.

For any ad set flagged on 2+ signals, recommend broadening. Be specific:
- "Expand age range from 25-34 to 25-45"
- "Remove interest targeting and let Advantage+ find the audience"
- "Increase lookalike from 1% to 3-5%"

### 3. Demographic Performance

From the age × gender breakdown:
- Which age-gender segment has the best ROAS?
- Which segment is getting the most spend?
- Is there a mismatch? (e.g. 25-34 males get 40% of spend but 35-44 females have 3x higher ROAS)

If there's a mismatch, recommend either:
- Adjusting targeting to weight toward high-performing demographics
- Creating a separate ad set for the underserved high-performing segment

### 4. Overlap Assessment

Windsor doesn't give us audience overlap directly, but we can infer it:
- If two ad sets have similar CPMs, similar reach/frequency patterns, and the same demographic breakdowns, they're likely competing for the same people.
- If pausing one ad set causes the other's CPM to drop, they were overlapping.

Flag suspected overlaps and recommend either consolidating or differentiating the audiences.

### 5. Budget Allocation

Current state:
- How much budget goes to each ad set?
- Is the best-performing ad set also the highest-funded? If not, there's an efficiency gap.

Recommendation framework:
- **Scale winners**: If an ad set has ROAS above target AND frequency below 3, it can absorb more budget.
- **Reduce losers**: If an ad set has ROAS below 1x for 7+ days, reduce budget or pause.
- **Maintain middle**: Ad sets near target ROAS with healthy frequency should hold steady.

### 6. Structural Recommendations

After analysing everything:
- Are there too many ad sets? (More than 5-6 per campaign often causes budget fragmentation and prevents any single ad set from exiting learning phase)
- Are there too few? (Only 1 ad set = no audience testing, all eggs in one basket)
- Is the campaign using CBO (Campaign Budget Optimization) or ABO (Ad Set Budget)? CBO is usually better for letting Meta allocate, but ABO gives more control when you have a clear winner to scale.
- Is Advantage+ Audience being used? In the MY/SG market, Advantage+ Shopping campaigns often outperform manual targeting for e-commerce.
