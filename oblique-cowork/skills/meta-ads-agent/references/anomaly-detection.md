# Anomaly Detection

Use this when Sean says "something's off", "what changed", "why did CPM spike", "ROAS dropped", or when there's a sudden unexplained change in account performance. The goal is to find the root cause fast.

## What to Pull

### Pull 1: Daily account-level metrics (last 30 days)

```
Fields: date, spend, impressions, reach, cpm, ctr, clicks,
        actions_omni_purchase, action_values_omni_purchase,
        actions_add_to_cart, actions_landing_page_view

Date: last_30d
```

### Pull 2: Daily campaign-level breakdown (last 30 days)

```
Fields: campaign, campaign_id, campaign_effective_status, date,
        spend, impressions, cpm, ctr, clicks,
        actions_omni_purchase, action_values_omni_purchase

Date: last_30d
```

### Pull 3: Daily ad set-level breakdown (last 14 days)

```
Fields: campaign, adset_name, adset_id, adset_effective_status, date,
        spend, impressions, cpm, frequency, ctr,
        actions_omni_purchase, action_values_omni_purchase

Date: last_14d
```

### Pull 4: Ad-level changes (last 14 days)

```
Fields: campaign, adset_name, ad_name, ad_id, effective_status,
        date, spend, impressions, cpm, ctr,
        actions_omni_purchase, action_values_omni_purchase

Date: last_14d
```

## How to Analyse

### 1. Identify the Anomaly Window

Compare the last 7 days to the 7 days before that across all key metrics:
- Spend, CPM, CTR, CPA, ROAS, Purchases, Revenue

Flag any metric that moved more than 20% in either direction. This gives you the "when" and the "what".

### 2. Isolate to Campaign Level

Which campaigns moved? If only one campaign changed significantly, the anomaly is likely within that campaign. If all campaigns moved similarly, it's an account-level or market-level issue.

### 3. Isolate to Ad Set Level

Within the affected campaign(s), which ad sets changed? Common patterns:

- **One ad set's CPM spiked while others stayed flat**: Audience saturation or auction competition for that specific audience.
- **All ad sets' CPMs rose together**: External factor — more advertisers in the auction (common during sale periods), algorithm update, or account penalty.
- **One ad set stopped spending entirely**: Could be stuck in learning, budget exhaustion, or automatic rule triggered.

### 4. Check for Status Changes

Look for campaigns, ad sets, or ads that changed status (ACTIVE → PAUSED, new ads launched, old ads paused). Often the "anomaly" is simply that someone on the team made a change in Ads Manager.

Signs of recent structural changes:
- A new ad set appeared in the last 7 days (launched recently)
- A previously high-spend ad set now shows zero spend (paused)
- Spend shifted dramatically between ad sets (CBO reallocation after a change)

### 5. Check for Creative Fatigue

If the anomaly is declining CTR + rising CPA with stable CPM, it's almost always creative fatigue rather than an audience or platform issue.

### 6. External Factors Checklist

If the anomaly affects the whole account:
- **Seasonal competition**: Is there a public holiday, sale event, or competitor promotion?
- **Meta platform issue**: Check Meta Business Suite for any alerts or policy notifications
- **Website/tracking issue**: Did purchases drop but clicks stayed the same? Could be a pixel or checkout issue, not an ads issue
- **Budget change**: Did someone reduce or increase budgets recently?

### 7. Root Cause Summary

Present findings as:
1. **What changed**: The specific metric(s) that moved
2. **When it changed**: Exact date range of the shift
3. **Where it changed**: Which campaign/ad set/ad is responsible
4. **Why it changed**: Most likely root cause (with evidence)
5. **What to do**: Specific fix, or "monitor for 48 hours" if the cause is unclear
