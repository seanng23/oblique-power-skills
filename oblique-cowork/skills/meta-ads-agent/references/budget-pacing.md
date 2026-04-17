# Budget Pacing Analysis

Use this when Sean asks about budget pacing, underspend, overspend, or wants to know if campaigns are spending efficiently relative to their budgets.

## What to Pull

### Pull 1: Campaign-level daily spend (last 14 days)

```
Fields: campaign, campaign_id, campaign_effective_status,
        date, spend, impressions, actions_omni_purchase, action_values_omni_purchase

Date: last_14d
```

### Pull 2: Ad set-level budget vs actual (last 14 days)

```
Fields: campaign, adset_name, adset_id, adset_effective_status,
        adset_daily_budget, adset_lifetime_budget, adset_budget_remaining,
        date, spend, impressions

Date: last_14d
```

## How to Analyse

### 1. Campaign Spend Pacing

For each active campaign:
- Average daily spend over last 7 days
- Variance in daily spend (high variance = unstable delivery)
- Total spend vs expected spend (daily budget × days)
- % of budget utilised

Flag:
- **Underspend** (below 80% of budget): Usually means targeting is too narrow, bids are too low, or creative fatigue has caused Meta to reduce delivery. This is the most common problem.
- **Overspend** (above 110% of budget): Meta sometimes overspends by up to 25% on high-performing days to compensate for slower days. Only flag if it's consistently 20%+ over.

### 2. Ad Set Budget Efficiency

For each ad set:
- Daily budget vs actual daily spend
- If `adset_daily_budget` is set, compare to average spend. Is Meta delivering the full budget?
- If `adset_budget_remaining` is low relative to the campaign timeline, the ad set may exhaust early.

Common patterns:
- **One ad set eating all the budget** (CBO campaigns): Meta's CBO concentrates spend on the "best" ad set. Check if that ad set is actually the best by ROAS, not just by CTR.
- **Learning limited**: If an ad set is spending less than 50% of its budget, it may be stuck in "learning limited" — not getting enough conversions to exit the learning phase. Meta needs ~50 conversions per week per ad set for stable delivery.

### 3. Spend-to-ROAS Efficiency Curve

For each campaign, check whether more spend = proportionally more revenue:
- Week 1 ROAS vs Week 2 ROAS at the same budget level
- If ROAS is declining while spend is constant, marginal returns are dropping

If ROAS holds steady as spend increases, there's room to scale. If ROAS drops, you've hit the efficiency ceiling for that audience/creative combo.

### 4. Recommendations

For underspending campaigns:
1. Check audience size — broaden if too narrow
2. Check bid strategy — if using cost cap, it may be too restrictive
3. Check creative health — fatigued creatives get lower delivery priority
4. Check account-level spend limit

For overspending:
1. Usually fine if ROAS is healthy
2. If ROAS is poor, reduce daily budget rather than letting Meta overspend on poor performers

For CBO imbalance:
1. Consider switching to ABO if one ad set is consuming 80%+ of spend and isn't the best performer
2. Or set minimum spend limits on underserved ad sets in CBO
