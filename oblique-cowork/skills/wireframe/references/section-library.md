# Website Section Library

A reference of common website sections with HTML patterns, copy guidelines, and usage notes.
Use this to plan section selection and order before generating a wireframe.

---

## HOW TO USE

1. Review the client brief or reference site
2. Select the sections that fit the client's business type
3. Order them using the logical flow guide below
4. Customise the copy and layout notes for this specific client

---

## LOGICAL FLOW GUIDE

The visitor arrives knowing nothing. Each section should answer a question in sequence:

| Position | Question the visitor is asking | Section type |
|----------|-------------------------------|--------------|
| 1 | Where am I? What is this? | Navigation |
| 2 | Is this for me? What's in it for me? | Hero |
| 3 | Should I trust this? | Social proof bar / logos |
| 4 | Who are these people? | Brand story / About |
| 5 | What exactly do they offer? | Services / Products |
| 6 | How does it work? | Process / Steps |
| 7 | Has it worked for others? | Results / Case studies / Testimonials |
| 8 | Why them over anyone else? | Differentiators |
| 9 | Who's behind it? | Team (if relevant) |
| 10 | What do I do next? | Final CTA |
| 11 | One last thing before I leave | Footer |

---

## SECTION PATTERNS

---

### NAV-01: Standard Navigation

**When to use:** Always. Every page.

**Layout:** Full-width bar, two rows or single row.
- Row 1 (optional): utility links — small, right-aligned (Contact, Login, Language)
- Row 2: Logo left, main nav links centre or right, CTA button rightmost

**Copy notes:**
- Nav links: short, 1–3 words, destination-first ("Services" not "What We Do")
- CTA button: action-led ("Get Started", "Apply Now", "Book a Call")

**Behaviour annotation:** Sticky on scroll. Logo links to homepage.

**HTML structure:**
```
<nav> → <div.nav-utility> + <div.nav-main> → logo + ul.nav-links + .nav-cta
```

---

### HERO-01: Full-Width Hero with Copy Left, Image Right

**When to use:** Most service businesses, education, B2B, premium consumer brands.

**Layout:** 2-column. Left: headline + subheadline + 1–2 CTAs. Right: large image placeholder (16:9 or fill height).

**Copy notes:**
- Headline: 4–10 words. Triggers emotion or imagination immediately. Zero-context test.
- Subheadline: 1–2 sentences. Explains what makes the outcome possible. Earns the product story.
- Primary CTA: specific outcome ("Explore Programmes", "See Our Work", "Book a Free Call")
- Secondary CTA: lower commitment ("Learn More", "Watch the Story")

---

### HERO-02: Full-Width Hero, Centred Text, Background Image/Video

**When to use:** Lifestyle brands, hospitality, events, bold consumer brands.

**Layout:** Full-bleed background image placeholder. Centred text overlay. Dark overlay on image for readability.

**Copy notes:** Same as HERO-01. Headline should be even shorter (4–7 words) — it competes with the visual.

---

### HERO-03: Split Hero — Dark Background Left, Image Right

**When to use:** Premium, tech, financial services, agencies.

**Layout:** 50/50 split. Dark background (#2B2B2B or brand dark) with white text left. Full-bleed image right.

---

### PROOF-01: Social Proof Bar (Logo strip)

**When to use:** After hero when the brand has recognisable client logos or press mentions.

**Layout:** Thin row. "As seen in" or "Trusted by" label + horizontal logo strip.

**Copy notes:** Label: "Trusted by Malaysia's leading brands" or "As seen in" — keep it one line, no fluff.

**HTML:** `<div.proof-bar>` → label + `<div.logo-strip>` with image placeholders labelled "[CLIENT LOGO: Getha]"

---

### ABOUT-01: Brand Story — Text Left, Image Right

**When to use:** Whenever the brand has a meaningful founding story or purpose statement.

**Layout:** 2-column. Left: headline + 2–3 paragraphs. Right: image or founder photo placeholder.

**Copy notes:**
- Headline: states the brand's core belief or position
- Body: origin story or mission, written for the customer (not a corporate bio)
- CTA: "About Us" or "Our Story" linking to full about page

---

### ABOUT-02: Full-Width Brand Statement

**When to use:** When the brand philosophy is the hero. Often used for purpose-driven or challenger brands.

**Layout:** Centred text on dark background. Large statement headline (36–48px). Short paragraph below.

---

### FEATURES-01: 3-Column Icon + Text Grid

**When to use:** Showing 3–6 key benefits, features, or reasons to believe.

**Layout:** Row of 3 (or 2 rows of 3). Each card: icon placeholder + bold heading (3–5 words) + 2–3 sentence description.

**Copy notes:**
- Column headings: benefit-led, not feature-led ("Consistent High Achievers" not "Academic Results")
- Body: 2–3 sentences max. What the customer gets, not what the product does.

---

### FEATURES-02: 2-Column Alternating (Image + Text)

**When to use:** When each feature/benefit deserves more space and a visual.

**Layout:** Alternates — image left/text right, then text left/image right. Usually 3–4 rows.

---

### SERVICES-01: Card Grid

**When to use:** 3–6 distinct services or product categories.

**Layout:** 3-column card grid. Each card: image placeholder + service name + 1–2 sentence description + CTA link.

**Copy notes:** Card headline = what the customer walks away with, not the name of the service.

---

### SERVICES-02: Tabbed or Categorised Sections

**When to use:** Many services/products that need grouping (e.g. 3 categories with multiple items each).

**Layout:** Tab navigation at top. Content area below changes based on selected tab. Annotate as interactive.

---

### PROCESS-01: Numbered Steps (Horizontal)

**When to use:** When there's a clear journey or onboarding process (3–5 steps).

**Layout:** Row of 3–5 numbered blocks. Number (large, accent colour) + heading + 2-sentence description.

---

### PROCESS-02: Vertical Timeline

**When to use:** More complex processes, project timelines, or historical milestones.

**Layout:** Centred vertical line. Alternating left/right content blocks with dot on the line.

---

### STATS-01: Numbers Bar

**When to use:** When the brand has strong quantifiable proof points (years in operation, clients served, results).

**Layout:** Full-width row, dark or accent background. 3–5 stat blocks. Large number + short label below.

**Copy notes:** Stats must be specific and real. Never use round numbers that look made up.
Example: "RM300k+ in sales in 2 months" not "300% growth"

---

### CASESTUDY-01: Featured Work Card Grid

**When to use:** Agencies, consultancies, any business with portfolio results.

**Layout:** 2–3 column grid. Each card: image placeholder + client name + 1-line result + "View Case Study" link.

---

### TESTIMONIALS-01: Quote Cards (3-column)

**When to use:** Any brand with client testimonials.

**Layout:** 3 cards side by side. Each: quote text + client name + title/company. Optional photo placeholder.

**Copy notes:** Pull the most specific, result-oriented quote available. "The food was great" is weak. "We sold out our first batch in 3 days" is strong.

---

### TEAM-01: Photo Grid

**When to use:** Service businesses where trust in the people matters.

**Layout:** Row of headshots (circular or square image placeholders) + name + title + optional LinkedIn link.

---

### NEWS-01: Article Card Grid

**When to use:** Brands with active content or news updates.

**Layout:** 3-column grid. Each card: image placeholder (16:9) + date + headline + excerpt (2 lines) + "Read More".

---

### CTA-01: Full-Width CTA Banner (Dark)

**When to use:** Always. Near the bottom of every page, before the footer.

**Layout:** Dark background. Large headline centred + 1–2 sentence subtext + primary CTA button.

**Copy notes:**
- Headline: specific action + implied outcome. "Start your application today." "Book a free brand call."
- Not "Get in Touch" — that's too vague. Name what happens next.

---

### CTA-02: Split CTA (Two Options)

**When to use:** When there are two distinct audience types with different next steps.

**Layout:** Two side-by-side panels, each with a different background colour, headline, and CTA.

---

### FOOTER-01: Standard Multi-Column Footer

**When to use:** Always. Every page.

**Layout:** Dark background. 4–5 columns: logo + tagline | site links | secondary links | contact info | social icons.
Bottom bar: copyright + legal links.

**Copy notes:** Footer tagline should be the brand's clearest positioning statement in one line.

---

## SECTION SELECTION BY BUSINESS TYPE

| Business Type | Recommended Sections |
|---------------|---------------------|
| Education / School | NAV + HERO-01 + PROOF-01 + ABOUT-01 + SERVICES-01 + PROCESS-01 + STATS-01 + NEWS-01 + CTA-01 + FOOTER-01 |
| Branding / Creative Agency | NAV + HERO-03 + ABOUT-02 + CASESTUDY-01 + SERVICES-01 + STATS-01 + TEAM-01 + CTA-01 + FOOTER-01 |
| DTC Consumer Product | NAV + HERO-02 + PROOF-01 + FEATURES-01 + FEATURES-02 + TESTIMONIALS-01 + CTA-01 + FOOTER-01 |
| B2B Service | NAV + HERO-01 + PROOF-01 + ABOUT-01 + SERVICES-01 + PROCESS-01 + CASESTUDY-01 + TESTIMONIALS-01 + CTA-01 + FOOTER-01 |
| Healthcare / Clinic | NAV + HERO-01 + ABOUT-01 + SERVICES-01 + PROCESS-01 + TEAM-01 + TESTIMONIALS-01 + CTA-01 + FOOTER-01 |
| Food & Beverage | NAV + HERO-02 + ABOUT-01 + FEATURES-01 + CASESTUDY-01 + NEWS-01 + CTA-01 + FOOTER-01 |
| Property / Real Estate | NAV + HERO-02 + STATS-01 + SERVICES-02 + PROCESS-01 + TESTIMONIALS-01 + CTA-01 + FOOTER-01 |
