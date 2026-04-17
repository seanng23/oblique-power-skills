---
name: proposal
description: >
  Generate a full Oblique branding proposal as a branded PowerPoint (.pptx) file.
  Use this skill whenever Sean asks to create a proposal, pitch deck, or branding proposal
  for a client. Handles the full workflow: parses discovery call transcript, researches
  competitors online, builds all slide content, asks Sean for investment figures and case
  study selection, then outputs a polished PPTX in Oblique brand colours. Trigger on:
  "create a proposal", "write a proposal", "build a proposal", "proposal for [client]",
  "pitch deck for [client]", or any request to produce a client proposal document.
---

# Proposal Skill

Generate a complete, branded Oblique branding proposal as a PowerPoint file.

## Reference files — read these before starting

- Brand guidelines: `/sessions/fervent-nice-gauss/mnt/.claude/skills/proposal/references/brand-guidelines.md`
- Case study library: `/sessions/fervent-nice-gauss/mnt/.claude/skills/proposal/references/case-studies.md`
- PPTX creation guide: `/sessions/fervent-nice-gauss/mnt/.claude/skills/pptx/pptxgenjs.md`

Read all three before writing any code.

## Output path

Save the final file to:
`/sessions/fervent-nice-gauss/mnt/Sean's Oblique Vault/10 - Oblique/Proposals & Pitches/[ClientName] Branding Proposal.pptx`

## Workflow

---

### Step 1: Parse the discovery call transcript

Sean will paste a transcript or upload a file. Extract:

- **Client name** and business overview
- **Their core problem / business challenge**
- **Their goals** (what they want to achieve)
- **Their target audience** (demographics, behaviours)
- **Their existing brand state** (logo, colours, website, if any)
- **Scope signals** — what deliverables are they expecting? (identity, packaging, strategy, etc.)
- **Budget signals** — any numbers mentioned?
- **Timeline** — any deadlines or launch milestones?
- **Industry / category** — what market are they in?

If the transcript is missing key information, note the gaps. Don't invent facts.

---

### Step 2: Gather inputs from Sean

Ask the following using AskUserQuestion:

1. **Competitors** — "Who are the top 2–4 competitors I should research? (Or leave blank and I'll identify them.)"
2. **Case studies** — Show the case study library list and ask: "Which 3–5 case studies are most relevant for this client?"
3. **Investment** — Ask for each module fee:
   - Research & Analysis: RM ___
   - Brand Development & Strategy: RM ___
   - Brand Identity Design: Included / RM ___
   - Packaging Design System (if applicable): RM ___
   - Any additional modules?
   - Payment terms: use standard (50/25/25) or custom?

---

### Step 3: Research competitors

For each competitor (identified by Sean or inferred from transcript + industry):

Use WebSearch to find:
- Their positioning and tagline
- Key product categories
- Visual identity / brand feel (infer from website/social descriptions)
- Strengths (what they're known for)
- Perceived weaknesses (reviews, audience sentiment)
- Price range (if consumer brand)
- Target audience

Build a competitive picture for:
- Competitive matrix (where the client sits vs. competitors on two axes)
- Competitive research table (one row per brand)
- 2–3 competitor deep-dive slides (most relevant ones)
- Opportunities slide for each deep-dive

---

### Step 4: Build all slide content

Generate the full content for every slide before writing any PPTX code.
Organise it clearly in your working notes so the PPTX generation step is clean.

**Slide structure (follow this order):**

1. **Cover** — Client name, proposal title "Comprehensive Branding Proposal for [Client]", tagline from transcript, "Copyright | Oblique Branding [YEAR]"
2. **Executive Summary** — Key objective (2–3 sentences), 3 strategic goals
3. **Strategic Objectives** — 4 objectives in a 2×2 grid (Brand Positioning, Brand Enhancement, Consumer Attraction, Storytelling & Communication) — write content specific to this client
4. **Brand Competitive Matrix** — Positioning map on two axes (e.g. Premium/Budget × Modern/Traditional). Place client and all competitors on the map. Identify target positioning and direct/aspirational competitors.
5. **Competitive Research Table** — One row per brand: Name | Positioning | Key Categories | Strengths | Price Range | Target Audience
6–onwards. **Competitive Deep-Dives** — For each of the 2–3 key competitors: one slide with overview (What We Like + Audience Perception + Why They Still Win), one slide with Opportunities for [Client] vs. [Competitor]
Next. **Client Background** — Understanding [Client]: Business Overview, Key Brand Components, Strategic Advantages, Brand Vision & USP
Next. **Key Learnings** — 5–6 insight bullets drawn from the transcript and research
Next. **Target Audience Profiling** — 1–2 audience segments with Age, Race/Demo, Income, Lifestyle, Need, Geographic, Behaviour
Next. **Proposed Plan Overview** — Three phases: Research, Brand Dev & Strategy, Brand Design Execution — with timelines
Next. **Phase Detail Tables** (2–3 slides) — For each phase: table of Scope & Category | Project Deliverable | KPI Objective
Next. **Outcomes Summary** — "By the end of this project your business will be:" — 4 numbered outcome statements
Next. **Business Milestone Timeline** — Client's business milestones mapped to Oblique's deliverable schedule
Next. **About Oblique** — Standard: started 2016, results-first, no outsource, hands-on management
Next. **Our Team** — Standard team slide (Sean Ng CEO, Jun Yew COO, Jenny Chai Business Director, Luna Chan Head of Creative, team members)
Next. **Case Studies** (3–5 slides, one per selected case study) — Follow format in case-studies.md
Next. **Why Oblique** — Client logo wall slide
Next. **Timeline & Investment Overview** — Single visual overview slide
Next. **Investment Detail** (1–2 slides) — Module-by-module breakdown with fees, subtotal, SST (8%), total
Next. **Timeline + Payment Terms** — Gantt overview + 50/25/25 payment milestones (or custom)
Next. **How We Work** — Standard: Kickoff, Structured Review Cycles, Research Approach, Milestone Approvals, Print Handoff, Post-Delivery Support
Next. **Future Phases** — Optional add-ons table (website, brand video, social content, etc.) — customise to client
Next. **Close** — "What's Next?" / "Thank You" — with "What kind of success do you want to bring to your brand?"

---

### Step 5: Generate the PPTX

Read the pptxgenjs guide first. Then write a Node.js script using pptxgenjs.

**Critical design rules (from brand-guidelines.md):**
- Colours: #E51C42 (red), #221F1F (near-black), #FFFFFF (white), #F7F7F7 (off-white)
- Top-left label: Section name in red + "PROPOSAL TWENTY[YY]" in near-black — on every content slide
- Footer: "Copyright | Oblique Branding [YEAR]" — on every slide
- No em dashes anywhere in text (use periods or colons)
- Year stamp format: "TWENTY26" not "2026"
- Dark slides for Cover, section transitions, Investment, Close
- White/off-white for all content slides

**Slide-specific design notes:**
- Competitive matrix: draw as a scatter/quadrant diagram using pptxgenjs shapes
- Tables: red header row (#E51C42 background, white text), alternating row shading (#F7F7F7)
- Phase detail tables: same table styling
- Investment table: same table styling, bold the TOTAL row
- Team slide: headshot placeholders in circles if images unavailable
- Case study slides: two-column layout (overview left, results right)
- Outcome summary: numbered list with large numbers in red

Run the script, convert to images for visual QA, fix issues, re-run until clean.

---

### Step 6: QA

Convert to images and inspect every slide. Check for:
- Text overflow or cutoff
- Placeholder text left in (XXX, TBD, [INSERT])
- Em dashes in any text
- Missing footer or label on any slide
- Colour inconsistencies
- Alignment issues

Fix all issues before delivering.

---

### Step 7: Deliver

Tell Sean: "[Client Name] proposal is ready." Provide the file link.
Add one sentence on anything that needs his review before sending to the client (unverified claims, placeholder sections, pricing to double-check).

## Style rules for all copy in the proposal

Follow the Oblique Copywriting Framework:
- No antithetical pivot sentences ("not just X — it's Y")
- No filler openers
- No em dashes
- Specific over vague — use numbers and outcomes
- Direct and confident — no hedging

The proposal represents Oblique. Every sentence should read like Oblique wrote it.
