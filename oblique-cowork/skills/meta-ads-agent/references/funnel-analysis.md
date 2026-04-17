# Funnel Analysis

Use this when Sean asks about drop-offs in the purchase funnel, low conversion rates, or when traffic looks healthy but purchases aren't following. The funnel reveals where money is being lost between click and purchase.

## What to Pull

### Pull 1: Full funnel by campaign (last 30 days)

```
Fields: campaign, campaign_id, campaign_objective,
        spend, impressions, clicks,
        actions_landing_page_view, actions_view_content,
        actions_add_to_cart, actions_initiate_checkout,
        actions_omni_purchase, action_values_omni_purchase,
        action_values_add_to_cart, action_values_initiate_checkout

Date: last_30d
Filter: campaign_objective = OUTCOME_SALES
```

### Pull 2: Full funnel by ad set (last 30 days)

Same fields as above, grouped by `adset_name, adset_id`.

### Pull 3: Full funnel by device (last 30 days)

```
Fields: device_platform,
        actions_landing_page_view, actions_view_content,
        actions_add_to_cart, actions_initiate_checkout,
        actions_omni_purchase, action_values_omni_purchase,
        spend, clicks

Date: last_30d
Filter: campaign_objective = OUTCOME_SALES
```

## How to Analyse

### 1. Funnel Map

Build the funnel and compute step-by-step conversion rates:

```
Clicks → Landing Page Views → View Content → Add to Cart → Initiate Checkout → Purchase
```

For each step, compute:
- Absolute count
- Conversion rate from previous step
- Drop-off rate

### 2. Benchmark Against Typical E-commerce Rates

These are approximate benchmarks for the MY/SG e-commerce market:

| Step | Healthy Rate | Warning Threshold |
|---|---|---|
| Click → LPV | 70-90% | Below 60% = landing page issues |
| LPV → View Content | 40-60% | Below 30% = page engagement issue |
| View Content → ATC | 5-15% | Below 5% = product/price/offer issue |
| ATC → Checkout | 30-50% | Below 25% = friction in checkout flow |
| Checkout → Purchase | 40-70% | Below 35% = payment/trust/shipping issue |

### 3. Where Is the Leak?

Identify the step with the largest drop-off relative to benchmarks. This tells you where to focus:

- **Click → LPV drop-off** (high bounce): Slow page load, irrelevant landing page, popup blocking, bad mobile experience. This is a website problem, not an ad problem.
- **LPV → ATC drop-off**: People see the page but don't add to cart. Either the offer isn't compelling, the product page is confusing, or the audience is wrong (interested but not buying intent).
- **ATC → Checkout drop-off**: Cart abandonment. Could be shipping costs revealed at checkout, registration wall, payment method issues.
- **Checkout → Purchase drop-off**: Payment failure, trust issues, unexpected costs. Check if the Shopify checkout is working correctly.

### 4. Compare Across Ad Sets and Devices

- Do some ad sets have great CTR but terrible ATC rates? That means the audience is clicking but not buying — targeting issue.
- Is mobile converting worse than desktop? (Common in MY — check if the mobile site experience is good)
- Is one campaign driving ATC but not purchases? Could be a tracking issue rather than a real drop-off.

### 5. Value-Based Analysis

Beyond counts, check the value at each step:
- Average `action_values_add_to_cart` per add-to-cart event (proxy for basket size)
- Average order value = `action_values_omni_purchase / actions_omni_purchase`
- If ATC value is high but purchase value is low, people are adding premium items but buying cheaper ones

### 6. Recommendations

Each funnel leak has a different fix:
- **Top of funnel** (clicks, LPV): Fix the ad-to-landing-page match. Check page speed. Test different landing pages.
- **Middle of funnel** (ATC, view content): Improve product pages. Test offer (discount, free shipping). Check product availability.
- **Bottom of funnel** (checkout, purchase): Fix checkout UX. Add trust signals. Simplify payment. Consider retargeting cart abandoners with a specific offer.

Always pair funnel data with creative data — sometimes the "leak" is really that one ad drives unqualified traffic while another drives high-intent visitors.
