---
name: competitor-ad-intelligence
description: >
  Scrape the Meta Ad Library for competitor brands and build a branded competitive ad intelligence
  PowerPoint deck with screenshots of active ads. Use whenever Sean asks to analyse competitor ads,
  check what competitors are running on Facebook or Instagram, do a competitor ad audit, pull competitor
  creatives, or says things like "what ads is [brand] running?", "check the Facebook Ad Library for
  [competitor]", "competitor ad research for [client]", "what's [brand] spending on?", or "build me a
  competitor ad deck". Also trigger when Sean wants to feed competitive creative intelligence into a
  strategy or know what's performing based on longevity. Handles the full workflow: scraping Meta Ad
  Library via Apify, sorting ads by run duration (best proxy for performance), downloading creative
  images, and producing a polished Oblique-branded PPTX with each ad shown alongside its metadata,
  followed by patterns and recommendations. Always use this skill — never manually browse the Ad
  Library or build this deck without it.
---

# Competitor Ad Intelligence Skill

You are building a competitive ad intelligence deck for an Oblique client. The output is a branded
PowerPoint that surfaces what each competitor is actively running on Meta — with real ad screenshots,
copy, and key metadata — so the team can feed these insights directly into creative strategy.

**Why longevity = performance:** The Meta Ad Library doesn't expose CTR, ROAS, or spend for competitor
ads. But the best proxy is how long an ad has been running: advertisers don't keep budget behind
creatives that aren't working. The oldest active ads are the ones that have survived the algorithm and
keep converting. Always sort by `ad_delivery_start_time` ascending (oldest first) to surface the
battle-tested winners.

---

## Step 1 — Parse the Brief

Extract from the user's request:

| Parameter | Default |
|---|---|
| Client name | Required — who this deck is for |
| Competitors | Required — 1–4 brand names or Facebook page URLs |
| Country | ALL (global) |
| Ads per competitor | **15** |
| Industry/category | Optional — for context in insights |
| Ad type | All (image + video + carousel) |

If `competitors` is missing, ask. Everything else has sensible defaults.

Confirm interpretation briefly before starting:
> "Got it — I'll scrape the Meta Ad Library for Nike, Adidas, and Puma (active ads only, all countries),
> pull the 15 longest-running ads per brand, and build a competitive intelligence deck for your client
> Lululemon. Starting now..."

---

## Step 2 — Scrape the Meta Ad Library

Use the Apify MCP tool to run `apify/facebook-ads-scraper` for each competitor. Pull **50 results per
competitor** (more than the final 15 so we have enough to sort and filter).

**For each competitor, call the actor with:**

```json
{
  "startUrls": [
    { "url": "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=ALL&q=COMPETITOR_NAME&search_type=page" }
  ],
  "resultsLimit": 50,
  "activeStatus": "active"
}
```

Replace `COMPETITOR_NAME` with the URL-encoded brand name (e.g. `Nike`, `Adidas`).

If the user provides a Facebook page URL directly (e.g. `https://www.facebook.com/nike`), use that
instead of the Ad Library search URL — it's more reliable.

**Run competitors sequentially** (not in parallel) to stay within Apify rate limits.

After each run, use `mcp__Apify__get-actor-output` with the returned `datasetId` to retrieve results.
Save the raw JSON for each competitor separately.

**If the actor returns 0 results:** Try replacing `search_type=page` with `search_type=keyword_unordered`
in the URL. If still 0, note it in the deck and move to the next competitor.

---

## Step 3 — Process the Data

For each competitor, run the processing script to sort ads and download images:

```bash
python3 /path/to/skill/scripts/process_ads.py \
  --input /tmp/raw_ads_COMPETITOR.json \
  --output /tmp/processed_ads_COMPETITOR.json \
  --images-dir /tmp/ad_images/COMPETITOR \
  --limit 15
```

The script will:
- Parse `ad_delivery_start_time` from each ad (handles multiple field name formats)
- Sort by start date ascending (longest-running first)
- Take the top 15
- Download creative images to the images directory
- Output a clean `processed_ads.json` with all fields needed for the deck

---

## Step 4 — Build the PowerPoint

Run the deck builder:

```bash
node /path/to/skill/scripts/build_deck.js \
  --data /tmp/all_competitors.json \
  --output "/path/to/workspace/[Client]_Competitor_Ad_Intelligence_[MonthYear].pptx"
```

Where `all_competitors.json` is an array of competitor objects:
```json
[
  {
    "name": "Nike",
    "ads": [ ...processed ads from process_ads.py... ]
  },
  ...
]
```

The deck structure is:
1. **Cover slide** — dark background, "COMPETITOR AD INTELLIGENCE", client name, date
2. **Overview slide** — table of competitors analysed, total ads pulled, date range
3. **Per competitor section** (repeat for each brand):
   - Section header slide (red background, competitor name, key stats)
   - 15 ad slides (image left, metadata right)
4. **Creative patterns slide** — themes and formats emerging across competitors
5. **Implications slide** — what this means for the client's creative strategy

---

## Step 5 — Synthesise Insights

After building the deck, review the processed ad data and write:

**Creative patterns** (for slide N-1): Look across all competitors and identify:
- Most common formats (image vs. video vs. carousel)
- Dominant hooks/angles (discount-led, social proof, lifestyle, problem-solution)
- Common CTAs ("Shop Now", "Learn More", "Get Offer")
- Visual style themes (UGC-style, polished studio, founder-led)
- Whether competitors are running evergreen vs. seasonal creative

**Implications** (for final slide): 3–4 specific recommendations for the client based on the gaps and
opportunities you've spotted. E.g.: "Competitors are heavy on discount hooks — there's white space for
a brand-authority angle" or "No one is using UGC-style creative — strong opportunity to test it."

Write these insights based on the actual ad data, not generic advice.

---

## Step 6 — Deliver

Save the PPTX to the user's workspace folder and provide a link. Then give a 3–4 sentence summary:
- How many ads were found per competitor
- Which competitor has the longest-running active ad (and how long it's been running)
- One headline insight from the competitive landscape

---

## Design System (Oblique Brand)

Reference: `/sessions/wizardly-eager-brahmagupta/mnt/.claude/skills/proposal/references/brand-guidelines.md`

Key values:
- Primary Red: `#E51C42`
- Near-Black: `#221F1F`
- White: `#FFFFFF`
- Off-White: `#F7F7F7`
- Font: Mont (fallback: Arial / Arial Black)
- Slide dimensions: **13.33" × 7.5"** (pptxgenjs default)
- Year stamp convention: 2026 → "TWENTY26"

---

## Ad Count Guidance

| Scenario | Ads per competitor |
|---|---|
| 1 competitor (deep dive) | 20 |
| 2–3 competitors (standard) | 15 |
| 4+ competitors | 10 |

The default is **15**. Adjust based on how many competitors are requested. Tell the user if you're
adjusting the default and why.

---

## Important Notes

- **Apify rate limits:** If a run fails, retry once with `resultsLimit: 30` instead of 50.
- **Image download failures:** Some Meta CDN URLs expire quickly. If `download_image` fails, the script
  uses a styled placeholder rectangle with the ad copy prominently displayed — the deck stays usable.
- **Video ads:** The actor returns a video thumbnail image. Use that as the visual. Note in the metadata
  that it's a video ad (so the team knows to go check the actual creative).
- **Carousel ads:** Show the first card image. Note the total number of cards in the metadata.
- **No start date:** If an ad has no `ad_delivery_start_time`, put it at the end of the list rather than
  discarding it. Mark it as "Start date unknown" in the slide.
- **Duplicate ads:** The same creative may appear with slight variations. Keep them — variants often
  indicate A/B testing, which is itself a signal.
