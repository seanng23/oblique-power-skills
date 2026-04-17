---
name: social-content-ideation
description: >
  Generate a monthly social media content ideation deck for any client, structured around
  Oblique's 5-pillar framework (Entertaining, Educate, Community, Storytelling/Cinematic,
  Employee Generated Content). Outputs a branded .pptx with a strategy overview, idea bank,
  and individual content concept slides. Use this skill whenever Sean asks to brainstorm content,
  plan social media content, create content ideas, do a content strategy, ideate for a client's
  socials, or says things like "content ideas for [client]", "what should we post for [client]",
  "social plan for [client]", "monthly content for [client]", or "ideation for [client]".
  Also trigger when Sean mentions content pillars, content planning, or wants to fill a
  content calendar with ideas. This is the ideation phase — once ideas are approved, the
  separate scripting/storyboarding skill handles production planning.
---

# Social Content Ideation

Generate a full month of social media content ideas for any client, structured around Oblique's 5-pillar content framework. The output is a branded PowerPoint deck containing a strategy overview, an idea bank, and individual content concept slides — ready for Sean to review, refine, and approve before moving into scripting and production.

## Who this is for

Sean Ng, CEO of Oblique — a branding and performance marketing agency in KL, Malaysia. Oblique manages social media content for clients across F&B, beauty, wellness, lifestyle, and other consumer categories. This skill is the first phase of Oblique's content production pipeline: **Ideation → Scripting/Storyboarding → Production**.

## The 5-Pillar Framework

Every piece of content must sit within one of these five pillars. The pillars exist because a brand's social presence needs range — if everything is educational, the feed becomes a textbook; if everything is entertaining, there's no trust. The mix is what builds a brand that people follow, share, and buy from.

Read the full pillar definitions from `references/pillars.md` before generating ideas. The reference file contains detailed descriptions, objectives, example formats, and guidance on how to think about each pillar. Don't rely on a surface-level understanding — the nuance matters.

**Quick reference:**

| # | Pillar | Purpose | Feel |
|---|--------|---------|------|
| 1 | **Entertaining** | Stop the scroll, earn shares | Trend-driven, funny, relatable, emotional |
| 2 | **Educate** | Build trust through value | "Did you know...", tips, myth-busting, expertise |
| 3 | **Community** | Amplify voices beyond the brand | Street interviews, customer stories, UGC |
| 4 | **Storytelling / Cinematic** | Aspirational brand perception | Polished, scripted, well-shot, narrative-driven |
| 5 | **EGC (Employee Generated)** | Humanise the brand from inside | Behind-the-scenes, team culture, day-in-the-life |

### Pillar distribution

For a standard month of ~12 content pieces, aim for this spread:

- Entertaining: 2-3 pieces
- Educate: 2-3 pieces
- Community: 2-3 pieces
- Storytelling/Cinematic: 2-3 pieces
- EGC: 1-2 pieces (always flagged as "pending client approval on EGC")

The exact split depends on the client's brand maturity, audience, and what they've been posting. A brand that's never shown their team might lean heavier on Entertaining and Educate. A brand with a charismatic founder might go heavier on Storytelling and EGC. Use judgment — the numbers above are starting points, not rules.

### EGC note

Not every client is comfortable putting their employees on camera or showing behind-the-scenes operations. Always generate EGC ideas (they're often the most authentic content a brand can produce), but flag every EGC idea with a clear note: **"⚠️ EGC — confirm client is open to employee/BTS content before briefing."** This way Sean can make the call without losing the ideas.

## Workflow

### Step 1: Gather inputs

Ask Sean for three things using AskUserQuestion:

1. **Client name**
2. **Client's social media links** (Instagram, TikTok, Facebook — whichever they're active on)
3. **Client's website URL**

If Sean has already provided any of these in his message, skip the relevant question. If there's an existing client file in the Obsidian vault at `/sessions/affectionate-kind-faraday/mnt/Sean's Oblique Vault/10 - Oblique/Clients/`, check it and pull any useful context (positioning, audience, products, tone of voice).

Also ask:
4. **Any specific focus or campaign this month?** (e.g., a product launch, seasonal event, rebrand, collaboration) — this is optional but shapes the ideation significantly.

### Step 2: Research the brand (go deep — this is where generic ideas die)

Before generating a single idea, understand the brand deeply. This research phase is the entire difference between ideas that feel like "any brand in this category" and ideas that could only belong to THIS brand. If you skip depth here, every idea downstream will be shallow.

**2a. Business model deep-dive (this is the most important sub-step)**

Most generic content ideas happen because the person ideating only understood the brand at surface level — "they sell mattresses" or "they're a property agency." That's not enough. You need to understand:

- **How does this business actually work?** What's the model? Is MIP a developer, an agency, a brokerage? Does Qra deliver, or is it in-store only? Does Getha sell direct-to-consumer, through retailers, or both? The business model shapes the content.
- **What makes them different from competitors?** Not the marketing tagline — the actual operational difference. Do they source differently? Price differently? Serve a different customer? Have a unique process?
- **Who is their customer, specifically?** Not "anyone who wants X" — the actual person. Age range, lifestyle, what problem they're solving, what motivates their purchase. A premium grocer's customer is not the same as a budget grocer's customer, even though both buy food.
- **What's the customer journey?** How do people discover this brand? What's the consideration process? What objections do they have? What makes someone choose them over the alternative?
- **What are the brand's current business goals?** Are they trying to grow awareness, drive footfall, launch something new, reposition, build loyalty? Content ideas should serve business objectives, not just fill a feed.

Research their website thoroughly — read the About page, product pages, any press or blog content. Look for the story behind the brand, not just what they sell. Use web search to find articles, interviews, reviews, or mentions that reveal more about the business.

**2b. Social media audit**

- Look at their current social media content — what are they already posting? What style? What frequency?
- Note what's getting the most engagement (likes, comments, shares, saves) — this tells you what their audience responds to
- Identify what's MISSING — gaps in their content that none of their posts address. These gaps are where the best ideas live.
- Note their visual style, brand voice, and tone. Are they playful? Premium? Casual? Educational?

**2c. Competitor and category research**

- Identify 3-5 competitors or brands in the same category
- Study what content those competitors are posting — not to copy, but to find angles they're NOT covering that this client could own
- Note any competitor content that's getting strong engagement — what can we learn from the format or approach (without copying the idea)?
- Look for category-level conversations happening on social media (what are people in this space talking about, complaining about, celebrating?)

**2d. Trend research**

- Search for current trending reel formats, sounds, and content styles on Instagram/TikTok relevant to the client's industry
- Look for trending hooks, transitions, and storytelling formats that could be adapted to this brand
- Focus on trends with longevity (not ones that peaked 2 weeks ago) that feel natural for the brand — forcing a trend is worse than skipping it
- Check what content styles are performing well in the Malaysian / Southeast Asian market specifically

Use web search, Apify tools (if available), and any other research tools. Spend real time here — the quality of the ideas is directly proportional to the depth of the research. If you find yourself generating ideas that could work for any brand in the same category, your research wasn't deep enough.

### Step 3: Generate content ideas

With the research done, generate ~12 content ideas spread across the 5 pillars. Each idea must include TWO distinct parts — the strategic rationale (why) AND the execution concept (what):

**Part A: The Strategic Rationale (why this idea exists)**

1. **Pillar** — which of the 5 pillars this falls under
2. **Strategic objective** — what business or brand goal does this idea serve? (e.g., "Build trust with first-time visitors by addressing the #1 objection: price vs. regular grocers" or "Drive shareability among 25-35 KL professionals who send food reels to friends")
3. **Why this idea, for this brand** — 2-3 sentences connecting the idea to something specific you learned in research. What insight about the brand, audience, or category makes this idea right for them? This should reference a real finding — a gap in their content, a competitor angle no one's covering, a customer pain point, a brand strength that's not being showcased.
4. **Expected outcome** — what should this content achieve? (awareness/reach, engagement/saves, trust/authority, conversion/traffic, community growth). Be specific.

**Part B: The Execution Concept (what it looks like)**

5. **Content format** — Static post, Carousel, Reel/Short-form video, Long-form video, Story series, etc.
6. **Topic/Title** — a clear, descriptive title (e.g., "A Day in the Life of a Cake Before Delivery")
7. **Concept brief** — 3-5 sentences explaining: what's the hook (first 1-3 seconds), what happens in the content, and what emotion or action it's designed to trigger in the viewer
8. **Reference/Inspiration** — if based on a trend or inspired by a competitor's approach, note the reference so the production team understands the creative direction
9. **Platform** — primary platform (Instagram Reels, TikTok, Instagram Feed, etc.)

The strategic rationale is what separates agency-level ideation from a generic content plan. Sean presents these decks to clients — the "why" is how he sells the idea and how the client understands the thinking behind it.

**The brand-specificity test:** For every idea, ask: "Could I swap the brand name for a competitor and this idea still works unchanged?" If yes, the idea isn't specific enough. Go back to your research and find the angle that makes it unique to THIS brand. A good content idea for Qra Foods should not work for any other grocer. A good idea for MIP should not work for any other property agency.

**Quality over quantity.** 12 sharp, specific, strategically justified ideas are worth more than 20 vague ones. Each idea should pass two tests:
1. "Could a strategist explain why this idea serves the brand's goals?" (rationale test)
2. "Could a content creator read this brief and know exactly what to shoot?" (execution test)

If either answer is no, the idea isn't ready.

**What to avoid:**
- Generic ideas like "post about our products" or "share a customer testimonial" — these aren't ideas, they're categories
- Ideas with no strategic justification — "because it's trending" isn't a strategy. WHY does this trend work for THIS brand?
- Ideas that require huge production budgets unless specifically discussed
- Forcing every trending audio into the client's content — only use trends that genuinely fit
- Ignoring the brand's current content style entirely — evolution is good, a complete tonal shift in one month is jarring
- Vague rationales like "to increase engagement" — be specific about WHAT engagement and WHY it matters

### Step 4: Build the deck

Generate the output as a .pptx file using the pptx skill's tooling (read the pptx SKILL.md at `/sessions/affectionate-kind-faraday/mnt/.claude/skills/pptx/SKILL.md` for instructions on creating presentations).

**Deck structure:**

**Slide 1 — Title Slide**
- Client name + "Social Media Content Strategy"
- Month and year
- Oblique branding (dark background, clean typography)

**Slide 2 — Strategy Overview Table**
A table showing the 5 pillars with columns for:
- Pillar name
- Objective (what this pillar achieves for the brand)
- Content focus (what kind of content falls here, specific to this client)

This slide should be tailored to the client — the objectives and content focus should reference their specific brand, products, and audience, not just the generic pillar descriptions.

**Slide 3 — The Idea Bank**
A single slide listing all ~12 ideas grouped by pillar, with just the title and format for each. This is the overview — the "menu" that Sean can scan quickly to see the full month at a glance.

**Slide 4 — Content Calendar (actual calendar grid)**
This must be a proper monthly calendar grid — 7 columns (Sun through Sat) and 4-5 week rows, with the actual dates of the target month filled in. Place each content idea into a specific date cell as a small colour-coded card showing the idea title and format.

**The calendar must look like an actual wall calendar**, not a list or table of ideas. Think: the kind of monthly view you'd see in Google Calendar or a printed planner, with content pieces sitting inside the date boxes. Each content card should be colour-coded by pillar so you can visually scan the month and see the pillar distribution at a glance.

Layout guidance:
- Column headers: Sun | Mon | Tue | Wed | Thu | Fri | Sat (bold, in a header row)
- Each date cell is large enough to hold 1 content card (title + format label, in small text ~8-9pt)
- Colour-code the cards by pillar (e.g., Entertaining = one colour, Educate = another, etc.)
- Include a small legend/key showing which colour maps to which pillar
- At the top of the calendar, show the total content count (e.g., "4 x Statics | 8 x Videos")
- Grey out or mute dates that fall outside the target month
- Post 2-3x per week, but **randomise the posting days each week**. Do NOT place content on the same two days every week (e.g., not always Wednesday and Friday). Instead, vary it: Week 1 might be Tue + Thu, Week 2 might be Mon + Wed, Week 3 might be Wed + Sat, Week 4 might be Tue + Fri. The only rule is to keep at least one day gap between posts within the same week — no back-to-back days. This makes the feed feel organic and human, not scheduled by a robot.

The calendar should demonstrate:
- A balanced spread of pillars across the month (not all Entertaining in week 1 and all Educate in week 4)
- Varied posting days week-to-week (no repeating pattern)
- At least one day gap between posts within the same week
- Any strategic sequencing (e.g., an Educate post about ingredients before a Storytelling piece about sourcing, or a teaser before a reveal)

If a specific campaign or event date was mentioned, anchor relevant content around it.

**Slides 5+ — Individual Content Concept Slides (one per idea)**
Each content idea gets its own slide with two clear sections:

**Top section — The Strategy (why):**
- **Pillar** label (colour-coded badge)
- **Strategic objective** — what this content achieves for the brand
- **Why this idea** — the insight or research finding that led to it

**Bottom section — The Execution (what):**
- **Content Format** label (Static / Carousel / Reel / Video / Story)
- **Topic/Title** — the content title
- **Concept brief** — the 3-5 sentence execution description (hook, what happens, what it triggers)
- **Reference/Inspiration note** (if applicable)
- **Platform** target
- **Expected outcome** — the result this content should drive
- **EGC flag** (if applicable): "⚠️ Pending client approval on EGC"

Layout: clean, easy to scan. The strategy section should be visually distinct from the execution section (e.g., different background shade, a divider line, or different typography treatment). Sean presents these to clients — the "why" section is how the client understands they're getting strategic thinking, not just a content calendar.

**Text overflow prevention:** Content concept slides have a lot of text (rationale + execution). To avoid text getting cut off or overflowing the slide:
- Keep the concept brief to 3-4 sentences max, not 5. Be concise.
- Use 12-13pt for body text on concept slides (not 14-16pt)
- The "Why this idea" rationale should be 1-2 sentences, not a paragraph
- If a slide is running long, tighten the language — every word should earn its place
- Test that all text fits within the slide boundaries during QA. If text is cut off, shorten it rather than shrinking the font below 11pt.

**Do NOT include:**
- Full post captions (those come in the scripting/production phase)
- Detailed scripts or storyboards (that's the next skill in the pipeline)

### Step 5: Visual QA

After generating the deck, follow the pptx skill's QA process:
1. Convert to PDF and then to images
2. Visually inspect for overlapping text, alignment issues, or formatting problems
3. Fix any issues before delivering

### Step 6: Deliver

Save the final deck to the output directory and provide a link. Keep the delivery message short — Sean will review the deck himself. Just note:
- How many ideas were generated and across which pillars
- Any EGC ideas that need client confirmation
- Any specific trends or references that informed the ideas
- That the next step is to approve/revise ideas, then move to scripting and production planning

## Connection to the production pipeline

This skill is **Phase 1: Ideation**. Once Sean reviews and approves the content ideas (possibly with revisions), the next step is **Phase 2: Scripting & Production Planning** — a separate skill that takes approved content ideas and produces:
- Full scripts with hooks, scenes, dialogue/voiceover, and CTAs
- Storyboards or shot lists
- Production notes (locations, props, talent, equipment)
- Post captions

The handoff between skills is the approved idea deck. When Sean says "let's script these" or "move to production on [client]", that triggers the Phase 2 skill (once it's built).

## Important notes

- Always research before ideating. Skipping research produces generic ideas that could belong to any brand. The whole point of this skill is brand-specific, insight-driven content ideas.
- The 5-pillar framework is the structure, not a straitjacket. If a brilliant idea doesn't fit neatly into one pillar, include it and note which pillar it's closest to. The framework ensures variety, not rigidity.
- Think about the content mix as a whole. If you've got 4 static posts and 8 reels, ask whether the format mix makes sense for this brand and platform. A brand that's trying to grow on TikTok needs more video. A brand with beautiful product photography might lean into carousels and statics.
- Always consider the Malaysian / Southeast Asian context. Cultural moments, local trends, language nuances (Manglish, bilingual captions), and regional platform behaviour matter.
- When in doubt about an idea's quality, cut it and replace it with something sharper. Better to deliver 10 excellent ideas than 12 that include 2 fillers.
