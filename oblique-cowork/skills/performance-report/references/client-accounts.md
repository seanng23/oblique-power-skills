# Client Account IDs — Windsor.ai

This file maps client names to their Windsor.ai connector account IDs. Update this file whenever a new client account is connected.

Last verified: March 2026

---

## Meta / Facebook Ads

**Connector ID:** `facebook`

| Client Name | Windsor Account ID | Notes |
|-------------|-------------------|-------|
| Petico MY | `1461750541546112` | OBL x Petico MY |
| Petico SG | `1537922397460320` | OBL x Petico SG |
| Getha | `1427393367337831` | GethaMY Ads (main performance account) |
| Getha (brand) | `505477800508533` | GETHA (1969) SDN. BHD. |
| Sommni | `375937234951356` | Oblique x Sommni |
| The Archive | `755865804055766` | The Archive x OBL |
| The Spec Shop | `734611724342221` | The Spec Shop Ad Acc |
| Holistq | `715875321410368` | Holistq Malaysia |
| Get it Fresh | `2654080901302875` | Get it Fresh |
| dressingpaula | `702804677199792` | dressingpaula |
| SISIP | `408097481981917` | OBL x SISIP |
| Grace AI | `3753901598217670` | Grace AI Ad Account |
| SISKL | `1214665434132622` | OBL x SISKL |

---

## Google Ads

**Connector ID:** `google_ads`

| Client Name | Windsor Account ID | Notes |
|-------------|-------------------|-------|
| Petico MY | `612-583-5176` | Petico.my ✅ |
| Petico SG | `172-233-1766` | Petico.sg ✅ |
| BrandedbySean | `698-267-2691` | BBS Nov2022 |
| Getha SG | `339-479-8556` | Getha SG |
| Holistq | `720-488-8974` | Holistq Malaysia ✅ |
| Happikiddo | `239-779-4019` | Happikiddo |
| Mulford | `247-424-2755` | Oblique - Mulford |
| Smurps | `517-108-7803` | Smurps |
| Sommni | `996-906-9037` | Sommni ✅ |
| Sunway Johor | `169-121-2886` | Sunway International School - Johor |
| Sunway KL | `306-687-1401` | Sunway International School - KL |
| Talenox MY | `984-025-4597` | Talenox MY |
| The Archive | `321-251-4899` | The Archive ✅ |
| Aspida Footwear | `491-136-5303` | Aspida Footwear |
| FlowerChimp MY | `521-856-5357` | FlowerChimp - MY |
| Getha Bedding | `385-233-5272` | Getha Bedding |

### ⚠️ Clients with Meta Ads but NO Google Ads in Windsor

The following clients have Meta Ads connected but are not in Google Ads Windsor:
- SISIP
- SISKL
- The Spec Shop
- dressingpaula
- Grace AI
- Get it Fresh

For these, either skip the Google Ads section or use Computer Use / manual input as a fallback.

---

## Shopify

**Connector ID:** `shopify`

| Client Name | Windsor Account ID | Notes |
|-------------|-------------------|-------|
| Holistq | `holistq-malaysia.myshopify.com` | ✅ Backend revenue available |
| Happikiddo | `happikiddo-com.myshopify.com` | ✅ Backend revenue available |
| Getha | `getha-online.myshopify.com` | ✅ Backend revenue available |
| Unknown | `mqqpvm-1x.myshopify.com` | ⚠️ Client identity unconfirmed — check with Sean |

### Key Shopify fields for backend revenue

When pulling Shopify data for the "Ad Platform vs Backend Actual" slide, use these fields:

```
order_count        → Total number of orders (purchases)
order_gross_sales  → Gross sales before discounts/refunds
order_net_sales    → Net sales after discounts and refunds
order_total_price  → Total order value including shipping and tax
order_subtotal_price → Revenue excluding shipping and tax
order_refunds_net  → Net refund amount
order_total_discounts → Total discounts applied
```

Use `date_filter: {"orders": "createdAt"}` and filter by `order_financial_status = "paid"` to exclude unpaid/cancelled orders.

### ⚠️ Clients WITHOUT Shopify in Windsor

The following active performance clients have no Shopify connection:
- Petico MY *(ask Sean for backend revenue or pull from Shopify admin)*
- Petico SG *(ask Sean for backend revenue or pull from Shopify admin)*
- Sommni
- The Archive
- SISIP
- SISKL

For these clients, ask Sean for the backend revenue figure, or note it as "TBC — awaiting backend data" on the P&L slide.

---

## Quick lookup: combined account pull by client

### Petico MY (full report)
```
Meta:         connector="facebook",   accounts=["1461750541546112"]
Google Ads:   connector="google_ads", accounts=["612-583-5176"]
Shopify:      NOT CONNECTED — ask Sean for backend revenue
```

### Petico SG (full report)
```
Meta:         connector="facebook",   accounts=["1537922397460320"]
Google Ads:   connector="google_ads", accounts=["172-233-1766"]
Shopify:      NOT CONNECTED — ask Sean for backend revenue
```

### Getha (full report)
```
Meta:         connector="facebook",   accounts=["1427393367337831", "505477800508533"]
Google Ads:   connector="google_ads", accounts=["385-233-5272", "339-479-8556"]
Shopify:      connector="shopify",    accounts=["getha-online.myshopify.com"]
```

### Holistq (full report)
```
Meta:         connector="facebook",   accounts=["715875321410368"]
Google Ads:   connector="google_ads", accounts=["720-488-8974"]
Shopify:      connector="shopify",    accounts=["holistq-malaysia.myshopify.com"]
```

### Sommni (full report)
```
Meta:         connector="facebook",   accounts=["375937234951356"]
Google Ads:   connector="google_ads", accounts=["996-906-9037"]
Shopify:      NOT CONNECTED — ask Sean for backend revenue
```

### The Archive (full report)
```
Meta:         connector="facebook",   accounts=["755865804055766"]
Google Ads:   connector="google_ads", accounts=["321-251-4899"]
Shopify:      NOT CONNECTED — ask Sean for backend revenue
```

### Happikiddo (full report)
```
Meta:         connector="facebook",   accounts=[""] (not in Meta — confirm with Sean)
Google Ads:   connector="google_ads", accounts=["239-779-4019"]
Shopify:      connector="shopify",    accounts=["happikiddo-com.myshopify.com"]
```

---

## Adding a new client

When a new client account is connected in Windsor:
1. Run `get_connectors` to get the updated account list
2. Add to the appropriate section above with client name and notes
3. Add a "Quick lookup" entry at the bottom
4. Note whether Shopify is connected (this determines if backend revenue is automatic)
