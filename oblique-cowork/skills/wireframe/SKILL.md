---
name: wireframe
description: >
  Generate a detailed website wireframe as a single HTML file. Use this skill whenever
  Sean asks to create a wireframe, website layout, page structure, or site mockup for
  any client. Takes a client brief or reference website as input. Produces a long-scroll
  HTML wireframe with colour blocking, labelled image placeholders, real Oblique-standard
  copy, and clear section structure. Always starts with the homepage. Can handle additional
  pages if requested. Trigger on: "wireframe for", "website wireframe", "create a wireframe",
  "layout for", "mock up a website", or any request to plan or visualise a website structure.
---

# Wireframe Skill

Generate a detailed, high-fidelity website wireframe as a single HTML file for Oblique clients.

## Reference files — read before starting

- Section library: `/sessions/fervent-nice-gauss/mnt/.claude/skills/wireframe/references/section-library.md`
- Copywriting Framework: `/sessions/fervent-nice-gauss/mnt/Sean's Oblique Vault/10 - Oblique/Frameworks/Copywriting Framework.md`

Read both before writing any code or copy.

## Output path

Save to:
`/sessions/fervent-nice-gauss/mnt/Sean's Oblique Vault/10 - Oblique/Clients/Wireframes/[ClientName] Homepage Wireframe.html`

Create the Wireframes folder if it doesn't exist.

## Input types

The skill accepts two types of input:

**A. Client brief** — a text description of the client's business, goals, audience, and brand direction. Extract: business overview, target audience, key services/products, tone, any brand colours mentioned.

**B. Reference website(s)** — a URL or description of a website the client wants to mimic or improve on. Use WebFetch to read the site structure, noting: section order, navigation patterns, copy approach, visual hierarchy.

Sean may provide one or both. If a reference URL is provided, always fetch and analyse it first.

---

## Workflow

### Step 1: Gather inputs

Ask Sean two things using AskUserQuestion:

1. **Input type** — Client brief (paste/describe) / Reference website URL / Both
2. **Pages needed** — Homepage only / Homepage + [specific pages] / Full site map

If a reference website URL is given, fetch it and analyse the page structure before proceeding.

### Step 2: Research the client (if brief provided)

If a client brief is provided:
- Use WebSearch to research the client's industry, competitors, and audience
- Identify 2–3 websites in the same space to understand category conventions
- Note what sections are standard for this type of business
- Note what visual patterns the target audience expects

### Step 3: Plan the page structure

Before writing a single line of HTML, plan the full section sequence for the homepage.

Use the section library to select the right sections and order. Think about:
- What does the visitor need to believe/feel after the hero?
- What's the logical flow from awareness to action?
- What proof points belong where?
- Where should the primary CTA appear (always at least twice: hero and near footer)?

Write out the section plan as a simple ordered list and confirm it makes sense before coding.

Standard homepage structure (adapt as needed):

1. Navigation
2. Hero (full-width, primary headline + CTA)
3. Social proof bar or brand intro (optional, short)
4. About / Brand story
5. Services / Products / Programmes
6. How it works / Process (if relevant)
7. Proof section (stats, results, client logos)
8. Case studies or featured work (if relevant)
9. Testimonials (if available)
10. Team (if relevant to the brand)
11. News / Blog (if relevant)
12. Final CTA banner
13. Footer

### Step 4: Write all copy

Read the Copywriting Framework fully before writing a single word.

Write real copy for every section — not placeholder text. Every headline, subheadline, body paragraph, button label, and nav item should be written to Oblique standard.

Apply the framework rules without exception:
- Hero headline: triggers emotion and imagination immediately, understood in zero context
- Customer is the hero: the visitor sees themselves in the outcome before the brand tells its story
- No em dashes anywhere
- No antithetical pivot sentences
- No filler openers
- Specific over vague: numbers, outcomes, names
- Format rule: landing page = hero triggers imagination, subheadline earns the product story

Label each section's copy clearly before coding (e.g. "HERO COPY:", "ABOUT COPY:") so it's easy to review before the HTML is generated.

### Step 5: Generate the HTML wireframe

Generate a single, self-contained HTML file. All CSS is embedded in a `<style>` tag. No external dependencies.

**Wireframe design rules:**

Visual language:
- Background: #F5F5F5 (light grey canvas)
- Section backgrounds alternate between #FFFFFF and #F0F0F0
- Dark sections (hero, CTA banner, footer): #2B2B2B
- Accent colour: use client's brand colour if known, otherwise #E51C42 (Oblique red) as default
- All image placeholders: #D0D0D0 grey box with a label in the centre
- Typography: system fonts (font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif)
- Body text: #333333
- Muted text: #777777

Image placeholders:
- Render as a styled div with background #D0D0D0, border: 2px dashed #AAAAAA
- Centred label in ALL CAPS describing the image: "HERO IMAGE: Student in lecture hall"
- Include aspect ratio guidance: "16:9 — full width hero" or "1:1 — team headshot"
- Font: 12px, #888888, monospace

Section labels:
- Each section gets a small label in the top-left corner (position: relative, badge style)
- Label format: "SECTION: HERO" — 10px, monospace, #FFFFFF on #E51C42 background, padding 2px 6px
- This makes it easy for clients and developers to identify each section

Buttons and CTAs:
- Primary CTA: solid fill, accent colour background, white text, border-radius 4px
- Secondary CTA: outlined, accent colour border and text
- Clearly show the button label copy (not "Button" or "CTA")

Navigation:
- Show full nav with real link labels
- Differentiate primary nav from secondary/utility nav
- Show active states and CTA button in nav

Spacing and layout:
- Max content width: 1200px, centred
- Section padding: 80px top/bottom
- Use CSS Grid or Flexbox for all multi-column layouts
- Mobile-first is not required for wireframes, but the layout should look sensible at 1440px

Annotations:
- For any section where behaviour matters (e.g. "carousel", "sticky nav", "video background"), add a small annotation box below the section: light yellow background (#FFFDE7), 12px italic text, explaining the intended behaviour
- Format: "⚙ BEHAVIOUR NOTE: This section auto-scrolls every 4 seconds on desktop"

### Step 6: QA before saving

Read back through the generated HTML and check:
- Every section from the plan is present
- No placeholder copy ("Lorem ipsum", "Heading here", "Description text")
- No em dashes in any copy
- Every image area has a labelled placeholder box
- All CTAs have real button copy
- Section labels are on every section
- The page flows logically from top to bottom

Fix any issues before saving.

### Step 7: Save and deliver

Save the HTML file to the output path. Provide Sean with:
- The file link
- A brief list of the sections included (2–3 lines)
- Any copy decisions he should review before sharing with the client

---

## Multi-page wireframes

If Sean requests additional pages beyond the homepage, generate each as a separate HTML file in the same folder:
- `[ClientName] About Page Wireframe.html`
- `[ClientName] Services Page Wireframe.html`
- etc.

Each page follows the same design rules. Navigation should be consistent across all pages.

---

## Copy quality standard

The wireframe is often the first thing a client sees. The copy in it is not a draft — it represents Oblique's standard. Write it as if it's going live. The client should be able to read the wireframe and understand the full brand story, not just the structure.
