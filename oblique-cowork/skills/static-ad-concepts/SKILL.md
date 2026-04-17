---
name: static-ad-concepts
description: "Generate 12 static ad concepts for any brand, product, or market. Each concept includes a rationale, headline, body copy, CTA, and visual guide — delivered as a PowerPoint presentation (.pptx). Use this skill whenever the user asks to create ad concepts, static ad ideas, social media ad concepts, creative concepts for a brand, campaign concepts, or advertising ideas for any product or company. Also trigger when the user mentions 'ad concepts', 'creative concepts', 'static concepts', 'campaign ideas', or wants to brainstorm advertising directions for a brand. This skill handles the full workflow: researching the brand and competitors, developing the concepts, and producing the final PowerPoint deck."
---

# Static Ad Concepts Generator

Create 12 professionally crafted static ad concepts for any brand, complete with competitive research, visual directions, headlines, Meta Ad captions, and USP substantiation — delivered as a polished PowerPoint deck (.pptx).

## When This Skill Triggers

This skill is for any request involving the creation of advertising concepts, creative directions, or campaign ideas for a brand. The user might say things like:

- "Create ad concepts for [brand]"
- "I need 12 static concepts for a campaign"
- "Come up with creative ideas for [product]"
- "Generate advertising concepts with headlines and USPs"
- "Help me brainstorm ad directions for [brand] in [market]"

## Workflow Overview

The skill follows a four-phase process: **Research → Develop → Generate Visual References → Deliver**. Each phase matters — skipping research leads to generic concepts, and skipping proper formatting makes the output hard to use in a real team setting.

### Phase 1: Research

Before writing a single concept, understand the brand and its competitive landscape. This context is what separates useful, differentiated concepts from generic filler.

1. **Brand Research**: Search the web for the brand's positioning, product range, key claims, distribution channels, target audience, and any existing marketing language. Look at their website, social media, and retail presence.

2. **Competitor Research**: Identify 6-8 direct competitors in the same product category and market. For each, note their positioning, key differentiators, distribution model, and messaging tone. Look for gaps — what are competitors NOT saying that the brand could own?

3. **Market Context**: Understand the broader market dynamics — consumer trends, cultural factors, regulatory environment, and category growth drivers. This is especially important for health, wellness, beauty, and food categories where claims need to be grounded. Pay attention to seasonal trends, cultural moments, and timely events that could be leveraged as angles — timely specificity outperforms evergreen generics.

### Phase 1.5: Scrape Competitor Ads from Meta Ad Library

After identifying competitors in Phase 1, scrape their actual running ads from Meta Ad Library using Apify. This gives you real-world reference material — what headlines competitors are using, what visual styles are working, what CTAs they're running, and which ads have been live the longest (a signal of performance).

**Use the `dz_omar/facebook-ads-scraper-pro` Apify actor** (cheapest option at ~$0.0006/ad).

**How to run the scrape:**

1. From Phase 1, collect the competitor brand/page names (e.g., "Sawda Premium", "Eskayvie", "Young Living Malaysia").
2. Also include the brand itself (e.g., "Holistq") to see their existing ad creative.
3. Run a single Apify scrape with all competitor names as `searchAdvertisers`, plus 1-2 category keywords as `searchQueries` for broader industry inspiration.

**Recommended Apify input:**

```json
{
  "searchAdvertisers": ["Competitor1", "Competitor2", "Competitor3", "BrandItself"],
  "searchQueries": ["category keyword 1", "category keyword 2"],
  "countries": "<2-letter ISO code for target market, e.g. MY>",
  "activeStatus": "ACTIVE",
  "mediaType": "IMAGE_AND_MEME",
  "sortBy": "SORT_BY_TOTAL_IMPRESSIONS",
  "maxResultsPerQuery": 15
}
```

Use `IMAGE_AND_MEME` for media type since we're creating static ad concepts (not video). Sort by impressions to surface the highest-performing ads first. 15 results per search gives a good spread without overspending.

**Cost estimate:** With ~8 advertisers + 2 keywords = 10 searches × 15 ads = ~150 ads max. At $0.0006/ad = **~$0.09 per run**.

**What to extract from the results:**

For each scraped ad, the useful fields are:
- `media.primary_thumbnail` — URL to the ad's image/thumbnail. Download these to use as visual references in the deck.
- `text` — The full ad caption copy. Analyse for hooks, benefit claims, CTA patterns, and tone.
- `title` — The ad headline. Note what phrasing patterns work in this category.
- `cta_text` — The call-to-action button text ("Shop now", "Learn more", etc.).
- `start_date` / `is_active` — Ads running for months are likely winners. Prioritise these as references.
- `page_name` — Group ads by competitor for the competitive analysis section.
- `link_url` — Landing page URL for further research if needed.

**How to use the scraped data:**

1. **For Visual References**: Download the `media.primary_thumbnail` images from the top-performing competitor ads (longest-running, image-type). Save locally and embed in the deck as "Competitor Reference" visuals alongside each concept.
2. **For Copy Inspiration**: Analyse the `text` and `title` fields across all competitors to identify common hooks, benefit claims, and CTA patterns in this market. Use these patterns to inform (but not copy) your headline and Meta caption writing.
3. **For Competitive Analysis**: Include a "Competitor Ad Insights" section in the deck summarising what the top competitors are doing in their paid social — what angles they lean on, what they're missing, and where the brand can differentiate.
4. **For Concept Grounding**: When writing rationales, reference specific competitor ad patterns you observed (e.g., "Competitors heavily lean on testimonial-style ads; this concept offers a science-forward alternative that stands out in the feed").

**If the Apify MCP tools are not available**, skip this phase entirely and rely on web research from Phase 1 for competitive context. The skill should still produce quality output without the scrape — it's an enhancement, not a requirement.

### Phase 2: Develop 12 Concepts

Each concept is a complete creative direction, not just a headline. The 12 concepts should span a range of strategic angles to give the brand options across different emotional and rational drivers.

**Aim for a balanced mix across these categories:**

- **Heritage / Trust** (2-3 concepts): Concepts that leverage the brand's history, tradition, or cultural roots
- **Science / Transparency** (2-3 concepts): Concepts that highlight product quality, ingredients, testing, or certifications
- **Lifestyle / Aspiration** (2-3 concepts): Concepts that connect the product to the consumer's identity and daily life
- **Emotional / Storytelling** (2-3 concepts): Concepts that use narrative, family, community, or personal transformation
- **Differentiation / Comparison** (1-2 concepts): Concepts that directly address why this brand is better than alternatives

**Production cost mix:** At least 2-3 of the 12 concepts should be deliberately low-production — AI-generated illustrations, simple product-on-colour with a strong headline, or cartoon/graphic styles. Low production cost does not mean low performance. Some of the best-performing static ads are incredibly simple to produce (a product cutout, a killer headline, and nothing else). These low-cost formats also let the brand iterate rapidly by swapping headlines and visuals without a full redesign cycle. Flag these concepts clearly so the team knows they can move fast on them.

**Each concept must include these 11 components:**

1. **Funnel Stage Label**: Every concept must be tagged with one of three funnel stages — **TOF (Top of Funnel)**, **MOF (Middle of Funnel)**, or **BOF (Bottom of Funnel)**. This tells the media buyer exactly where the ad belongs in a campaign structure.
   - **TOF**: Awareness-driven. The audience doesn't know the brand yet. Focus on attention-grabbing visuals, emotional hooks, broad pain points, or curiosity. Headlines should stop the scroll and create intrigue. Meta captions should introduce the brand or problem. Visual direction should lead with emotion, lifestyle, or problem-state imagery — not product close-ups.
   - **MOF**: Consideration-driven. The audience has seen the brand before. Focus on education, social proof, ingredient/feature deep-dives, or comparison angles. Headlines should build trust or credibility. Meta captions should reinforce benefits and differentiation. Visual direction should show the product in context — being used, compared, or explained.
   - **BOF**: Conversion-driven. The audience is warm and close to purchase. Focus on offers, urgency, testimonials, guarantees, or direct CTAs. Headlines should push action. Meta captions should drive clicks with clear purchase incentives. Visual direction should lead with the product, packaging, pricing, or authority badges (as-seen-in logos, star ratings, volume claims).

   Aim for a balanced spread: approximately 4-5 TOF, 4-5 MOF, and 2-3 BOF concepts across the 12. This gives the brand a complete funnel strategy, not just awareness plays. The funnel stage should change the entire creative execution — not just the headline. A TOF ad and a BOF ad for the same brand should look and feel fundamentally different.

2. **Single Message** (max ~15 words): One sentence that captures the single thing this ad communicates. Every static should have one job. If you can't summarise what the ad says in one sentence, it's trying to do too much — strip it back. Cluttered ads with 6+ competing text elements create cognitive overload and get scrolled past. Clean design builds trust; messy design destroys it.

3. **Visual Direction**: A detailed description of what the static ad would look like — composition, mood, colour palette, key visual elements, and where the product sits in the frame. Be specific enough that a designer could brief from this.

4. **Headline-Image Relationship**: Specify how the headline and image work together. This is the single biggest differentiator between statics that perform and statics that get scrolled past. Use one of three modes:
   - **"Tension"** — The headline and image create a deliberate curiosity gap. The viewer needs both to understand the ad, and the mismatch pulls them in. Example: a headline says "2-in-1 mocker & protein fix" next to a photo of a beautiful iced coffee that looks nothing like a protein shake. The viewer thinks "wait, how is that a protein shake?" and reads on.
   - **"Explanatory"** — The headline raises a question that the image immediately answers (or vice versa). Example: "This one simple switch made taking creatine 10x more enjoyable" paired with an image of someone holding gummy supplements. The image IS the answer — you get the "aha" moment instantly.
   - **"Complementary"** — The headline and image reinforce the same message from different angles. This is the most common but least engaging mode — use it primarily for BOF ads where clarity matters more than curiosity.

   The best-performing TOF statics almost always use "Tension" or "Explanatory" because they force engagement. "Complementary" is safer but less scroll-stopping — save it for BOF where the audience already knows the brand and just needs a push.

5. **Curiosity Mechanism**: What question does this ad raise in the viewer's mind, and where does the answer live? Every high-performing static creates a micro-question that the viewer feels compelled to resolve — even if it takes just half a second. The answer might live in the image (for headline-led curiosity), in the sub-copy (for image-led curiosity), or on the landing page (for ads designed to generate clicks). Spell this out so the designer and copywriter understand what tension they're building and where the payoff sits.

6. **Rationale**: Why this concept works for this specific brand, in this specific market, against these specific competitors. Connect the concept to the research findings — the strategic "why" behind the creative choice.

7. **Headline Options** (3 per concept): Three distinct headlines that could run with this concept. Vary the tone — e.g., one aspirational, one direct/benefit-led, one more emotional or provocative. Headlines should be punchy and work at a glance (these are static ads, not long-form).

   **The Competitor Swap Test:** After writing each headline, mentally check — could a direct competitor use this exact headline for their product? If yes, the headline is too generic and needs to be rewritten. The best headlines contain something ownable: a specific ingredient, a unique format, a proprietary process, or a claim only this brand can make. "Guaranteed energy in 5 minutes" fails this test because any energy supplement could say it. "Your fasting window hack — powered by exogenous ketones" passes because it's tied to a specific product mechanism.

8. **Social Proof Strategy**: Specify what type of social proof this concept uses and why it fits the funnel stage. Match social proof type to funnel position:
   - **TOF**: Authority endorsements, media logos ("As seen in..."), expert/podcast mentions — these build instant credibility with cold audiences who don't know the brand.
   - **MOF**: Specific customer results, star ratings, ingredient certifications — these build trust with audiences who are evaluating.
   - **BOF**: Volume claims ("50,000+ sold"), guarantees, review counts — these tip someone who's already considering a purchase.

   Not every concept needs heavy social proof, but when it's included, it should be the right type for where the ad sits in the funnel.

9. **USP Substantiation** (3-5 bullet points, **3-5 words max per bullet**): Short, punchy product claims that substantiate the concept. These are not full sentences — they're snappy proof points. Think label-style: "Cold-pressed, non-GMO", "5% standardised thymoquinone", "Halal-certified, zero preservatives". Each bullet must be factual and specific to the brand, not generic claims any competitor could make.

10. **Meta Ad Caption** (4-6 lines): A ready-to-use Facebook/Instagram ad caption that pairs with this concept. Structure: hook line → benefit/story → call-to-action. Should feel native to a social feed — conversational, not corporate. Include relevant emojis sparingly if appropriate for the brand's tone.

11. **Template Replicability** (Low / Medium / High): How easily can this concept be turned into a repeatable template? A "High" rating means the design team can swap out the headline, image, or angle and produce 10+ variations without redesigning from scratch. The best ad formats are ones you can replicate rapidly — swap the headline and illustration to test different problems, angles, or audiences. Flag which concepts lend themselves to this so the brand can build a creative testing pipeline, not just 12 one-off ads.

**After developing all 12 concepts, generate an AI-generated visual reference** for each one that captures the mood, composition, and aesthetic. This is NOT the final ad — it's a direction reference for the designer. Use whatever image generation tool is available (DALL-E, MCP image gen tool, etc.). Save each to `/tmp/concept_N_visual.png`. If image generation is not available, skip this — the Visual Direction text will serve as the reference instead.

**Writing guidelines:**

- All copy must be in English
- Headlines should be punchy and work at a glance
- Every headline must pass the Competitor Swap Test — if a competitor could use the same line, rewrite it
- Avoid generic language that any competitor could claim — anchor USPs in what makes THIS brand different
- Visual directions should be specific enough to art-direct from, not vague ("a person looking healthy")
- Rationales should reference competitive gaps and audience insights from the research phase
- Meta captions should feel native to social feeds — conversational, benefit-led, with a clear CTA
- Tie angles to cultural moments, seasonal trends, or timely events where possible — timely specificity outperforms evergreen generics

### Phase 3: Deliver as PowerPoint Deck

Generate the final output as a professionally designed .pptx file using PptxGenJS (the preferred method for creating PowerPoint from scratch).

**Deck structure:**

1. **Title Slide**: Brand name, product category, "12 Static Ad Concepts", date. Dark background, bold typography.
2. **Brand Overview Slide**: Key brand positioning, target audience, and market context in a clean layout.
3. **Competitive Landscape Slide**: Table or card layout showing 6-8 competitors with positioning notes. Include a "Key Opportunity" callout.
4. **Concept Slides (2 slides per concept × 12 = 24 slides)**:
   - **Slide A — Creative Brief**: Funnel stage label (TOF/MOF/BOF) displayed as a coloured badge or tag in the top-right corner, concept title, single message, headline-image relationship tag, visual direction, rationale, and 3 headline options. If a visual reference image was generated, display it prominently on this slide. Use colour-coded badges: green for TOF, amber/orange for MOF, red for BOF. Also include the Template Replicability rating (Low/Med/High) as a small tag.
   - **Slide B — Execution Details**: Curiosity mechanism, social proof strategy, USP bullets, Meta Ad caption, and visual reference notes. Funnel label repeated as a small tag for context. Clean, readable layout.
5. **Summary Slide**: Categorise the 12 concepts by strategic angle, funnel stage distribution, and template replicability. Identify which 2-3 concepts are best suited for rapid iteration (highest replicability) and suggest a testing approach — which concepts to test first, what variables to iterate on, and how to build a creative testing pipeline from the templates.

**To generate the deck**, create a JavaScript file that uses PptxGenJS. The script should:

1. Read a JSON data file (saved to `/tmp/concepts_data.json`) containing all the concept content
2. Apply a cohesive colour palette and typography that feels premium and on-brand
3. Use varied slide layouts — avoid repeating the same layout for every concept
4. Embed visual reference images if they exist at the expected paths
5. Save the final .pptx to the output path specified in the JSON

The JSON data schema:

```json
{
  "brand_name": "BrandX",
  "product_category": "Black Seed Oil",
  "date": "March 2026",
  "brand_overview": "Overview paragraph text...",
  "target_audience": "Description of target audience...",
  "competitors": [
    {"name": "Competitor A", "notes": "Positioning and notes..."}
  ],
  "key_opportunity": "The strategic gap this brand can own...",
  "concepts": [
    {
      "number": 1,
      "funnel_stage": "TOF",
      "title": "Concept Title Here",
      "single_message": "One sentence summarising the ad's single job.",
      "visual_direction": "Detailed visual direction...",
      "headline_image_relationship": "Tension",
      "curiosity_mechanism": "The viewer wonders X, and the answer is in the image/sub-copy/landing page.",
      "rationale": "Strategic rationale...",
      "headlines": ["Headline 1", "Headline 2", "Headline 3"],
      "social_proof_strategy": "Authority endorsement — podcast mentions from [X] build instant credibility with cold audiences.",
      "usps": ["Cold-pressed, non-GMO", "5% thymoquinone", "Halal-certified"],
      "meta_caption": "Hook line here.\n\nBenefit and story...\n\nShop now: link",
      "template_replicability": "High",
      "visual_ref_path": "/tmp/concept_1_visual.png"
    }
  ],
  "summary": "Closing summary and recommendation text...",
  "output_path": "/path/to/output/Brand_12_Static_Ad_Concepts.pptx"
}
```

**Design guidelines for the deck:**

- Pick a colour palette inspired by the brand's own colours (research their website/social media)
- Use a dark background for title + summary slides, light for content slides
- Header font: Georgia or Trebuchet MS for personality; body: Calibri for readability
- Concept title slides should feel like a creative agency pitch — bold, visual, confident
- Tables should use the brand's primary colour for headers
- Leave breathing room — don't cram every slide

**After generating the deck, do visual QA:**

```bash
python scripts/office/soffice.py --headless --convert-to pdf output.pptx
rm -f slide-*.jpg
pdftoppm -jpeg -r 150 output.pdf slide
ls -1 "$PWD"/slide-*.jpg
```

Then visually inspect the slide images to check for overlapping text, alignment issues, or formatting problems. Fix any issues before delivering.

## Important Notes

- Always do web research first. The quality of the concepts depends entirely on understanding the brand, its competitors, and the market.
- The 12 concepts should feel like they came from a creative agency — varied, strategic, and grounded in insight, not just 12 variations of the same idea.
- USP bullets must be factual, specific to the brand, and **3-5 words max** — they're proof-point labels, not sentences.
- Meta captions should be ready to copy-paste into Facebook/Instagram Ads Manager.
- The deck should be presentation-ready — something the user can share with a client or internal team without further formatting.
- Every headline must survive the Competitor Swap Test. If a competitor could run the same headline unchanged, it's not doing its job.
- Include at least 2-3 low-production, high-concept options. The cheapest ads to produce can be the highest performers when the strategic thinking is strong.
- The summary slide should clearly flag which concepts are most replicable so the brand can build a testing pipeline, not just run 12 one-off ads.
