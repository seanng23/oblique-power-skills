# CPM & Delivery Analysis

Use this when Sean asks about delivery costs, CPM spikes, or when ads feel expensive to run. CPM is the canary in the coal mine — it moves before other metrics deteriorate.

## What to Pull

### Pull 1: Daily CPM trend (last 60 days)

```
Fields: campaign, date, spend, impressions, cpm, reach, frequency

Date: last_60d
Account: specified client
```

### Pull 2: CPM by placement (last 30 days)

```
Fields: publisher_platform, platform_position, spend, impressions, cpm, ctr,
        actions_omni_purchase, action_values_omni_purchase

Date: last_30d
```

### Pull 3: CPM by audience/ad set (last 30 days)

```
Fields: campaign, adset_name, adset_id, spend, impressions, cpm, reach, frequency,
        actions_omni_purchase, action_values_omni_purchase

Date: last_30d
```

### Pull 4: CPM by device (last 30 days)

```
Fields: device_platform, impression_device, spend, impressions, cpm, ctr

Date: last_30d
```

## How to Analyse

### 1. CPM Trend

Plot (or table) daily CPM for each campaign over 60 days. Look for:
- **Sudden spikes**: A 30%+ CPM jump day-over-day usually means auction competition increased, audience exhausted, or a new campaign entered a saturated auction.
- **Gradual rise**: CPM creeping up 5-10% weekly usually means audience saturation — frequency is climbing and Meta is charging more to reach the same people again.
- **Seasonal patterns**: Check if the spike aligns with known high-competition periods (month-end, payday sales, public holidays).

### 2. CPM by Placement

Meta placements have wildly different CPMs. Typical MY market benchmarks:
- Facebook Feed: RM 15–30 CPM
- Instagram Feed: RM 20–40 CPM
- Instagram Stories: RM 10–25 CPM
- Audience Network: RM 3–10 CPM (but low quality)
- Reels: RM 8–20 CPM (high engagement, growing)

Flag any placement where CPM is 2x+ the account average. But CPM alone doesn't tell the full story — check CPA by placement too. A RM 50 CPM placement with 3x ROAS is better than a RM 10 CPM placement with 0 purchases.

### 3. CPM by Audience

The highest CPMs usually come from:
- **Retargeting audiences**: Small pool = high CPM. This is normal, but check that the ROAS justifies it.
- **Narrow interest targeting**: If an ad set targets a very specific interest with small audience size, CPM will be inflated. This is Sean's "too narrow" concern.
- **Lookalike audiences below 1%**: Ultra-tight lookalikes can get expensive in small markets like MY.

Compare CPM across ad sets. If a broad targeting ad set (age 25-55, no interests) has a lower CPM AND similar or better ROAS than a narrow one, that's strong evidence to go broader.

### 4. Frequency as a CPM Driver

The relationship: as frequency rises, CPM rises, and CTR drops. This is the saturation loop.

- Frequency 1-2: healthy
- Frequency 2-3: monitor
- Frequency 3-5: likely saturating — CPM inflation probable
- Frequency 5+: audience is exhausted — refresh creative or broaden audience

For each ad set with frequency above 3, check if CPM has risen by more than 20% vs the first week of delivery. If yes, recommend either expanding the audience or refreshing creatives.

### 5. Actionable Output

For each high-CPM issue found, recommend one of:
1. **Broaden audience**: Expand age range, remove interest restrictions, increase lookalike percentage
2. **Shift placement**: If one placement is disproportionately expensive with poor returns, consider placement exclusions or manual placement selection
3. **Refresh creative**: High frequency + rising CPM on specific ad sets = creative fatigue
4. **Reduce budget on saturated ad sets**: If an ad set is spending 80% of daily budget but CPM is 2x where it started, the marginal spend is inefficient
5. **Wait**: If CPM spike is clearly seasonal (e.g. major sale period competition), it may resolve naturally
