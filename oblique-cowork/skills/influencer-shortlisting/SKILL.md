---
name: influencer-shortlisting
description: >
  Research, discover, and shortlist influencers and UGC creators for client campaigns. Use this skill
  whenever Sean asks to find influencers, shortlist KOLs (Key Opinion Leaders), build an influencer list,
  find UGC creators, or says anything like "find me lifestyle mums in Malaysia", "shortlist influencers for
  [client]", "I need 100 micro-influencers in [country]", or "build me an influencer list for [niche]".
  Also trigger when Sean says "influencer research", "creator outreach list", "KOL list", or asks to find
  people on TikTok or Instagram for a campaign. This skill handles the full workflow — parsing the brief,
  running Apify scrapers on Instagram and TikTok, filtering by follower range and engagement, writing
  rationales, and delivering a ready-to-use Excel shortlist. Always use this skill for any influencer
  discovery request — never try to manually search without it.
---

# Influencer Shortlisting Skill

You are building a curated influencer shortlist for a client campaign. The goal is a clean, ready-to-use
Excel file that the Oblique team can hand to a client or use directly for outreach.

## Step 1 — Parse the Brief

Extract the following from the user's free-text request. If something is genuinely missing (e.g., no
follower range mentioned), apply these sensible defaults:

| Parameter | Default |
|---|---|
| Platform | TikTok + Instagram |
| Follower range | 5,000 – 50,000 |
| Target list size | 80–100 |
| Country | Malaysia |
| Language | Bahasa Malaysia + English |

Things to extract:
- **Niche / content category** (e.g. lifestyle, parenting, beauty, fitness, food)
- **Audience demographic** (e.g. female influencers, mums, age 25–40)
- **Country / region** (e.g. Malaysia, Kuala Lumpur, Penang)
- **Follower range** (min and max)
- **Target list size** (how many influencers to find)
- **Platform preference** (TikTok, Instagram, or both)

Briefly confirm your interpretation before starting work, e.g.:
> "Got it — I'll find female lifestyle/parenting micro-influencers in Malaysia, 5K–50K followers, on both TikTok and Instagram. Aiming for 80–100 profiles. Starting now..."

---

## Step 2 — Generate Hashtags & Search Terms

Based on the niche and country, generate **15–20 hashtags/keywords** for each platform. Think about:

- Niche-specific tags (e.g. `#lifestyleblogger`, `#momlife`, `#beautymalaysia`)
- Country/geo tags (e.g. `#malaysia`, `#kualalumpur`, `#ibumalaysia`, `#malaysiamom`)
- Bahasa Malaysia variations (e.g. `#ibubapa`, `#gayahidup`, `#iburumahtangga`)
- Community tags (e.g. `#malaysiainfluencer`, `#klinfluencer`, `#malaysiakol`)

The goal is to cast a wide net across hashtags so you can find enough profiles. You'll filter later.

**Reference file for common niches:** See `references/malaysia_niches.md` for pre-built hashtag lists
by niche (lifestyle, parenting, beauty, fitness, food, travel, fashion).

---

## Step 3 — Scrape Instagram

Use the Apify MCP tools to run the Instagram hashtag scraper.

**Actor:** `apify/instagram-hashtag-scraper`

Run with each hashtag batch (group 3–5 hashtags per run to avoid timeouts):

```
Input:
{
  "hashtags": ["#malaysialifestyle", "#lifestylemalaysia", "#ibumalaysia"],
  "resultsLimit": 50
}
```

From the output, collect **unique Instagram usernames** who authored posts. You'll end up with a raw pool
of hundreds of usernames — that's expected.

Then, for each username batch (50 at a time), fetch their profile data:

**Actor:** `igview-owner/instagram-profiles-scraper`

```
Input:
{
  "usernames": ["username1", "username2", ...]
}
```

Collect from each profile:
- `username`
- `fullName`
- `biography`
- `followersCount`
- `followingCount`
- `postsCount`
- `avgLikes` (if available) OR calculate from recent posts
- `avgComments` (if available) OR calculate from recent posts

**Engagement rate formula (Instagram):**
```
engagement_rate = ((avg_likes + avg_comments) / followers) * 100
```

**If `igview-owner/instagram-profiles-scraper` times out:**
Don't halt — the Instagram hashtag scraper already gave you the username pool. Use the post data
returned by `apify/instagram-hashtag-scraper` (likes, comments per post) to estimate engagement
directly. Mark these rows with `"Niche"` prefixed with `"[est.]"` to indicate estimated vs. live
metrics, so the team knows which profiles to manually verify if needed.

---

## Step 4 — Scrape TikTok

Use a two-stage approach: discover creators by keyword, then enrich their profiles.

**Discovery (primary) — Actor:** `igview-owner/tiktok-search-user-scraper`

This actor finds TikTok users by keyword search and has a 99.5% success rate. Run for each relevant keyword:

```
Input:
{
  "keyword": "malaysia lifestyle mom",
  "maxResults": 50
}
```

Collect: username, followers, bio.

**Discovery (fallback) — Actor:** `paxiq/tiktok-influencer-scraper`

If the primary actor fails or returns too few results, try this one with hashtag-based search:

```
Input:
{
  "hashtag": "malaysialifestyle",
  "minFollowers": 5000,
  "maxFollowers": 50000
}
```

**Enrichment — Actor:** `clockworks/tiktok-profile-scraper`

For each TikTok username found, get detailed profile stats:

```
Input:
{
  "profiles": ["@username1", "@username2", ...]
}
```

Collect: `diggCount` (likes), `commentCount`, `shareCount`, `followerCount`, `videoCount`.

**Engagement rate formula (TikTok):**
```
engagement_rate = ((avg_likes + avg_comments + avg_shares) / followers) * 100
```

---

## Step 5 — Filter & Qualify

After scraping, filter the raw pool:

1. **Follower range**: Keep only accounts within the requested min–max (default: 5K–50K)
2. **Minimum engagement**: Drop accounts with <1% engagement rate (they have dead audiences)
3. **Content relevance**: Check bio/username — does it suggest they post about the target niche?
4. **Minimum posts**: Drop accounts with <9 posts (too new or inactive)
5. **Deduplication**: Remove any handle that appears on both platforms (keep both platform entries, but don't double-count the person for list size)

You need to hit **at least 80 profiles** after filtering. If you're short, go back and run more hashtags.

---

## Step 6 — Write Rationales

For each influencer, write a **1–2 sentence rationale** that explains:
- Why they're a good fit for the campaign brief
- One specific signal from their profile (e.g. engagement rate, bio quote, content focus)

Keep rationales concise and useful — the Oblique team reads these when deciding who to contact first.

**Before moving to Step 7, do a completeness check:** scan every row and confirm no rationale cell is
blank or contains only "N/A". If any are empty, write a rationale based on the available data (handle
name, niche tags, follower count) rather than leaving it blank. A row without a rationale is not ready
for client delivery.

**Example rationale:**
> "Active parenting and lifestyle content creator based in KL with a highly engaged community (4.2% ER). Her bio specifically mentions family-focused content and she posts consistently in both English and Bahasa Malaysia."

---

## Step 7 — Build the Excel File

Use Python with `openpyxl` to generate the Excel file. Run the script at
`scripts/build_excel.py` — see that file for the full implementation.

The Excel sheet must have these columns in this order:

| Column | Notes |
|---|---|
| # | Row number |
| Handle | @username (no platform prefix needed) |
| Platform | Instagram or TikTok |
| Profile URL | Full URL to their profile |
| Followers | Integer, formatted with comma separator |
| Avg. Engagement Rate | Percentage, e.g. "3.4%" |
| Niche | 1–3 tags, e.g. "Lifestyle, Parenting" |
| Rationale | Your 1–2 sentence justification |

**Formatting rules:**
- Header row: dark background (#1A1A2E), white bold text
- Alternate row shading (very light grey every other row)
- Freeze the header row
- Auto-fit column widths
- Sort by Engagement Rate descending (highest first — best leads at the top)
- Sheet name: "Influencer Shortlist"

**File naming:** `[Client or Niche]_Influencer_Shortlist_[Month Year].xlsx`
e.g. `Lifestyle_Mums_MY_Influencer_Shortlist_March_2026.xlsx`

Save to the user's workspace folder.

---

## Step 8 — Summarise

After delivering the file, give a brief summary:
- Total influencers found: X (Y on Instagram, Z on TikTok)
- Follower range in the list: X–Y
- Average engagement rate across the list
- Top 3 standout profiles (highest engagement) with a one-liner on each

Then share the file link.

---

## Important notes

- **Apify rate limits**: If an actor run fails or times out, retry once with a smaller input batch.
- **Private accounts**: Skip any account that returns no follower data (likely private).
- **Duplicate accounts**: A person might run both an Instagram and TikTok — that's fine, include both rows but note it in the rationale.
- **Engagement rate outliers**: If someone shows >20% ER, double-check — it might be a small account with one viral post. Flag it rather than promote it.
- **Missing data**: If engagement rate can't be calculated (no post data returned), mark the cell "N/A" and still include the profile.
