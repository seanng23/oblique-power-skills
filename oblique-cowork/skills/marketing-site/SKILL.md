---
name: marketing-site
description: Build beautiful, production-grade multi-page marketing websites in Next.js 14 + Tailwind, using the Editorial Modernism aesthetic system — with SEO and GEO (Generative Engine Optimisation) baked in from the scaffold. Use whenever Sean asks to "build a website", "build a marketing site", "build a site for [client]", "design a website for [client]", or any variant. Outputs a frontend-only Next.js scaffold, one page at a time (Homepage first, then inner pages). Every site ships with canonical URLs, dynamic OG cards, JSON-LD schema (Organization, LocalBusiness, WebSite, FAQPage, Service, Person, BreadcrumbList), sitemap.xml, robots.txt, and llms.txt. Final phase optionally adds a Sanity CMS layer ("add Sanity", "add CMS").
---

# Marketing Site

Build beautiful, multi-page marketing websites for Oblique's clients (or Oblique itself) following the **Editorial Modernism** aesthetic system. This skill is opinionated, codifies what "excellent" looks like for Sean, and integrates the Impeccable quality framework.

---

## When to use

Triggered when Sean asks for any of:
- "Build a website for [client]"
- "Build me a marketing site for [client]"
- "Design a website for [brand]"
- "Make a homepage for [client]"
- "Code up a site based on this brief / wireframe / reference"

This skill is for **multi-page marketing sites** — agency, consultancy, brand, product, or service websites. NOT SaaS dashboards, NOT web apps, NOT internal tools (use Impeccable directly for those).

---

## Stack — non-negotiable

| Layer | Choice |
|---|---|
| Framework | **Next.js 14 (App Router)** + TypeScript |
| Styling | **Tailwind CSS** with custom theme tokens |
| Fonts | **Google Fonts** loaded via `next/font` (chosen per-project, see Style System) |
| Animation | **Framer Motion** for choreographed scroll reveals + a CSS-only marquee. Use sparingly per the motion contract below. |
| Images | `next/image` for all images. Provide real assets when given; otherwise use thoughtful placeholder URLs (Unsplash / Pexels via direct CDN links) — never generic icon grids. |
| State | Local React state only through Phase 6. CMS (Sanity) added in optional Phase 7. |
| Hosting target | Vercel-ready output (no exotic config) |

---

## Inputs — typical brief

When invoked, expect SOME COMBINATION of:
1. **Client brief** (Word doc, PDF, or pasted text)
2. **2–3 reference URLs** (sites Sean considers excellent for this client)
3. **Brand guidelines** (PDF, Figma link, or pasted color/font specs)
4. **Wireframe** (HTML from `/wireframe` skill, Figma link, or sketch description)

Some inputs may be missing. **Do not refuse to start** — ask for whatever's missing only if it's blocking, otherwise infer and flag what you inferred.

---

## Workflow — execute in order

### Phase 0: Intake (under 2 minutes of conversation)

Read everything provided. Then write back to Sean a concise summary that includes:
- Client name and one-line brand description
- The job-to-be-done for the site (what it must accomplish)
- Sitemap (list of pages — even if only Homepage will be built first)
- What assets/inputs are MISSING and whether they block progress
- **CMS question**: "Will the client need a CMS for ongoing content updates (blog, case studies, editable sections)? Yes / No / Decide later." Default assumption: **yes for most clients** (blog, team updates, contact info). The CMS is added in Phase 7 at the end — does not affect Phases 1–6. Sean's answer determines whether the project scope includes Phase 7.
- Confirm: "Building Homepage first. OK to proceed?" (or whatever first page)

If a brief is missing entirely, ask Sean for: client name, one-line product/service description, target audience, and 2–3 reference URLs.

### Phase 1: Reference scrape (mandatory if any reference URLs are provided)

For EVERY reference URL provided, scrape with Firecrawl using `formats: ["branding", "markdown"]`. Run them in parallel. Extract:
- Colors (primary, secondary, accent, background, text)
- Fonts (display + body — note these only as data, NOT to copy)
- Hero treatment (full-bleed image, video, split-screen, text-only, etc.)
- Section variety (count distinct section structures used)
- Button shape (square, semi-rounded, fully pill)
- Whitespace density
- Motion (marquees, parallax, fade-ups, etc.)

Synthesize into a one-paragraph "Reference DNA" summary that Sean can confirm. This is the bridge between "what they like" and "what we'll build."

### Phase 2: Style synthesis — propose project palette + type pair (CRITICAL — get sign-off)

Produce a **Project Style Card** in chat for Sean's approval. Format:

```
PROJECT: [Client Name]
STYLE: Editorial Modernism — [project-specific descriptor, e.g. "warm, agricultural, confident"]

PALETTE (2 base + 1 accent — never monochromatic)
  Surface (base 1):  #XXXXXX — [name, e.g. "warm cream"]
  Ink (base 2):      #XXXXXX — [name, e.g. "deep forest"]
  Accent (1 only):   #XXXXXX — [name, e.g. "electric chartreuse"]
  Both neutrals tinted toward [hue] for cohesion.

TYPE PAIR (chosen fresh — NOT from the reflex list)
  Display: [Font Name] — [why it fits]
  Body:    [Font Name] — [why it fits]
  Both loaded via next/font from Google Fonts.

CTA SHAPE: [square | semi-rounded 6-12px | pill 999px] — [why this fits the brand]

MOTION CONTRACT
  Hero:           subtle image parallax on scroll
  Section enter:  fade-up (8px translate, 600ms, ease-out)
  Group enter:    staggered fade-up (80ms stagger)
  Logo row:       continuous CSS marquee (consistent speed, no easing)
  Heavy reveals:  reserved for ONE moment per page (the brand statement)

Confirm or adjust before I scaffold.
```

**Do not proceed past Phase 2 until Sean confirms or amends the Style Card.**

### Phase 3: Scaffold the project

After Style Card sign-off:

1. Create directory at `~/Dev-Projects/<client-slug>/` (kebab-case slug from client name).
2. Run `npx create-next-app@latest <client-slug> --typescript --tailwind --app --src-dir --import-alias "@/*" --no-eslint --no-turbopack --use-npm` from `~/Dev-Projects/`.
3. Install: `framer-motion`, `clsx`, `lucide-react` (for any necessary UI icons — NOT for big decorative icon grids).
4. Wire up the chosen Google Fonts via `next/font/google` in `src/app/layout.tsx`.
5. Write the design tokens into `tailwind.config.ts` and `src/app/globals.css`:
   - Color tokens: `surface`, `ink`, `accent` plus 2-3 derived shades (use `oklch` color-mix for shades, never just lighten/darken).
   - Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192 px as `space-*` semantic tokens.
   - Type scale: fluid `clamp()` based — display sizes use clamp, body uses fixed rem.
   - Border radius: token derived from CTA shape decision (`--radius-cta`, `--radius-card`).
6. Build the global Nav and Footer as their own components in `src/components/`.
7. Create `src/components/motion/` with reusable `<FadeUp>`, `<StaggerGroup>`, `<Marquee>`, `<HeroParallax>` primitives. These wrap Framer Motion so individual pages stay clean.
8. **Scaffold the SEO & GEO foundation** (full spec in the "SEO & GEO Contract" section below). Specifically:
   - Fill out `src/app/layout.tsx` `metadata` export with `metadataBase`, title template, description, canonical (`alternates.canonical`), full `openGraph`, `twitter` (`summary_large_image`), and a `robots` block that is `index: true` only when `process.env.VERCEL_ENV === "production"` (staging/preview must be `noindex`).
   - Create `src/app/opengraph-image.tsx` — 1200×630 branded social card using the client's wordmark on a brand background. Renders via Next's `ImageResponse`.
   - Create `src/app/sitemap.ts` and `src/app/robots.ts` using Next's MetadataRoute conventions. Robots disallows everything outside production.
   - Create `public/llms.txt` — a short Markdown manifest of who the client is, their services, ICP, and core URLs. Emerging 2025–26 standard for LLM crawlers.
   - Create `src/components/seo/` with `JsonLd.tsx` (helper), `OrganizationJsonLd.tsx`, and `WebSiteJsonLd.tsx`. Register both in `layout.tsx` so every page inherits them.
   - Create `src/data/` as the home for content that must stay in sync between a visible component and its JSON-LD mirror (e.g. `faqs.ts`). Single source of truth prevents drift.
   - Every page added in Phase 4+ is expected to export its own `metadata` and wire any page-specific JSON-LD (`FaqJsonLd`, `BreadcrumbJsonLd`, `ServiceJsonLd`) alongside the visible section.

### Phase 4: Build the Homepage

The homepage is a **sequence of distinct sections**, each with its own structure. Never repeat the same section pattern twice. Pick from the section library below and assemble in a sequence that matches the brief's narrative arc.

Default homepage arc (adjust to brief):
1. **Hero** — display headline + supporting line + 1 primary CTA + hero visual (image/video parallax)
2. **Logo marquee** — continuous, consistent speed
3. **Brand statement / about** — editorial-style paragraph with bold display headline; can be full-bleed text or split with image
4. **Services / what we do** — varied card layout, NOT a uniform grid
5. **Featured work / proof** — case studies as large image-led panels OR a horizontal scroller
6. **Process / how we work** — numbered steps with rich visuals
7. **Testimonial(s)** — single quote or rotating, never a grid of small cards
8. **Final CTA / contact** — bold, asymmetric, large
9. **Footer** — calm, generous, well-organized

### Phase 5: Quality pass before declaring done

After the homepage is built, run these checks IN ORDER:

1. **Self-audit against the AI Slop Test** (Impeccable framework):
   - Are there ANY left-border colored stripes? Remove.
   - Any gradient text? Remove.
   - Any nested cards-in-cards? Flatten.
   - Any uniform identical card grids? Vary the layout.
   - Any pure `#FFF` or `#000`? Tint them.
   - Any reflex fonts (Inter / DM Sans / Instrument Sans / Plus Jakarta / Outfit / Fraunces / Newsreader / Crimson / Lora / Playfair / Cormorant / Syne / Space Grotesk / Space Mono / IBM Plex)? Replace.
2. Run `npm run build` to verify the project compiles cleanly.
3. **SEO & GEO acceptance check** (full checklist in the "SEO & GEO Contract" section). At minimum on every page:
   - Exactly one `<h1>` and it contains the primary keyword phrase in readable, space-separated prose (not a concatenation of animated per-word `<span>`s).
   - Meta title 50–60 chars, description 130–160 chars, canonical resolves to the correct absolute URL.
   - `curl` the page and grep the raw HTML for any `0`-valued stats or placeholder strings (e.g. `RM0M`, `Lorem`, `TODO`) — these are launch-blocking.
   - All JSON-LD blocks parse as valid JSON and reference the correct `@id`s.
   - `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/opengraph-image` all return 200 and render correctly.
4. **Invoke `polish`** (if available) for a final refinement pass on spacing, alignment, and micro-details.
5. **Invoke `critique`** (if available) for a UX-quality scoring pass.
6. Take a screenshot via the preview server and show Sean.
7. Ask Sean: "Lock the homepage and move to [next page]?" Wait for sign-off.

### Phase 6: Move to the next page

Only after Sean locks the homepage. Repeat Phases 4–5 for each subsequent page (About, Services, Contact, etc.) using the same tokens, fonts, and motion contract — do NOT re-scaffold.

When all inner pages are locked, pause and explicitly ask Sean: **"All pages locked. Add the Sanity CMS layer now (Phase 7)?"** If yes, proceed. If no, the build is complete as a static frontend — Phase 7 can be added later at any time.

Between Phase 6 and either launch or Phase 7, run the SEO & GEO Acceptance Pass (below) as a single concerted sweep. Individual pages went through basic SEO checks in Phase 5, but this pass audits the site as a whole.

### Phase 6.5: SEO & GEO Acceptance Pass — MANDATORY before launch

One sweep across the whole site. Runs after every page is locked and before production deploy. The goal is to catch gaps that only show up at the site level — e.g. an inner page forgot to export its own metadata, a new FAQ section wasn't wired to FaqJsonLd, the sitemap is stale.

#### Step 6.5.1 — Crawl the locally-built site and validate

1. Run `npm run build && npm run start` locally (or deploy to a preview URL).
2. For every route in `sitemap.xml`, run:
   - `curl -s <url>` and confirm the H1 is readable prose containing the target keyword phrase.
   - Extract JSON-LD blocks and validate each parses cleanly. Use a one-liner in Python/Node or ship the validator `src/lib/validate-seo.ts` if the project warrants one.
   - Confirm `<meta name="robots">`, canonical, `og:image`, `twitter:card` are present on every page.
3. Grep the full built HTML for placeholder strings: `RM0M`, `$0`, `0+`, `0%`, `Lorem`, `TODO`, `FIXME`, `placeholder`. Any hit blocks launch.
4. Hit `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/opengraph-image` — confirm 200 and correct content.
5. Run Lighthouse against the homepage and each primary inner page. SEO score must be ≥ 95. Flag any LCP > 2.5s or CLS > 0.1.

#### Step 6.5.2 — Schema completeness audit

For each page type, confirm the right JSON-LD is present:

| Page | Required schema |
|---|---|
| Homepage | Organization/LocalBusiness, WebSite, FAQPage (if FAQ exists) |
| Service page (`/services/[slug]`) | Service, BreadcrumbList |
| Work / case study (`/work/[slug]`) | CreativeWork or Article (depending on tone), BreadcrumbList |
| Team / founder page | Person (one per person), BreadcrumbList |
| Blog post | Article, BreadcrumbList |
| Contact | LocalBusiness (already on layout if client has an address — don't duplicate) |

Use Google's Rich Results Test (`https://search.google.com/test/rich-results`) on the preview URL as the final external check. Any ERROR is launch-blocking; WARNINGS are noted but can ship.

#### Step 6.5.3 — GEO content review

AI engines cite pages that definitively answer questions. Confirm the site has:
- A plain-language definition of the category the client operates in (e.g. "What is an integrated marketing agency?") answered somewhere on the homepage or About page.
- At least one named methodology with enough supporting prose that an AI summariser can quote it (e.g. "The Oblique Method" — 3 phases, one paragraph each).
- Entity-verification signals present: founding year, team size, location, contact email, social profiles — all in both visible HTML and `Organization` JSON-LD.
- Stats and outcomes named with sources where applicable ("$100M+ generated across client accounts since 2016") — not unsourced superlatives.
- FAQ section mirrored in `FaqJsonLd` so AI Overviews can quote the exact answer text.

#### Step 6.5.4 — Production robots + canonical sanity check

Before the deploy, confirm:
- The `robots` function returns `index: true` only when `process.env.VERCEL_ENV === "production"`. Preview deploys from Vercel branches must be `noindex`, or they'll rank and dilute the real URL.
- `alternates.canonical` in `metadata` resolves to the canonical production domain on every page, not localhost or a Vercel preview URL.
- The `metadataBase` URL in `layout.tsx` is the production hostname.

#### Step 6.5.5 — Post-launch (first 48 hours)

- Submit `https://<domain>/sitemap.xml` to Google Search Console and Bing Webmaster.
- Share the URL in Slack / WhatsApp / iMessage / LinkedIn to confirm the OG card renders the intended preview. (A preview tested locally can still break against a real scraper — always verify in the wild.)
- Add a Google Analytics / Plausible / Fathom tag if the brief specified one. If not, flag it to Sean.
- Register the site with Google's AI engines and Perplexity where applicable (via `https://www.perplexity.ai/` submission, Google AI Overview reporting, etc.).

### Phase 7: CMS Integration (Sanity) — OPTIONAL, triggered explicitly

Only triggered when Sean says "add Sanity", "add CMS", "wire up content management", or when the Phase 6 hand-off question is answered yes. Never auto-runs.

**Prerequisite**: Every page the client cares about must already be built and locked. Schemas follow structure — you cannot design them well against a moving target.

---

#### Step 7.1 — Content audit

Walk through every page and categorize every content element:

| Category | Examples | CMS treatment |
|---|---|---|
| **Structural** | Section layouts, grid systems, navigation structure, hero image composition, typography, colors, motion | Stays in code. NEVER editable. |
| **Global content** | Company address, phone, email, social links, footer copy, logo | `siteSettings` singleton in Sanity |
| **Collection content** | Blog posts, case studies, team members, industries, services, testimonials | One `document` schema per collection |
| **Page-level editable fields** | Hero headline/subhead, stats band numbers, CTA copy, about paragraph | Referenced fields on a `homepage` / `aboutPage` singleton (only if the client will realistically edit them) |

Present the audit to Sean in a clean table. Explicitly call out the borderline items ("the hero headline — probably don't make this editable unless they'll actually touch it") so the schema doesn't bloat.

**Default schema footprint for a typical client**:
- `post` (blog) + `category` + `author`
- `caseStudy` (if applicable)
- `industry` (if it's a meaningful list)
- `testimonial`
- `teamMember` (if About page exists)
- `siteSettings` singleton (contact + footer)

Do not add schemas "just in case." Each schema is future maintenance for Sean.

---

#### Step 7.2 — Ownership + project creation

Ask Sean: **"Should this Sanity project live under the CLIENT's Sanity account (recommended) or under Oblique's agency account?"**

- **Client account (default)**: Protects Oblique from Sanity fees if the client's editor team grows past the free tier's 3-user limit. Client owns their content. Sean is invited as admin.
- **Oblique account**: Use only if this is a managed service where Oblique bills the client a retainer that includes CMS.

Create the Sanity project via the CLI (`npm create sanity@latest` inside the existing Next.js repo) or through sanity.io/manage. Record the `projectId` and `dataset` (always `production`) in `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=xxx   # for ISR and preview
```

---

#### Step 7.3 — Install Sanity in the Next.js project

The studio lives at `/studio` in the SAME Next.js repo. Do not create a separate repo — one deploy, one codebase.

Install: `next-sanity`, `sanity`, `@sanity/image-url`, `@sanity/vision`.

File layout:

```
src/
  app/
    studio/
      [[...tool]]/
        page.tsx        # mounts Sanity Studio
  sanity/
    client.ts           # Sanity client + image URL builder
    queries.ts          # all GROQ queries, centralized
    schemas/
      index.ts          # exports all schemas
      post.ts
      category.ts
      author.ts
      siteSettings.ts
      [etc.]
    types.ts            # TypeScript types derived from schemas
sanity.config.ts        # studio config at project root
sanity.cli.ts           # CLI config at project root
```

---

#### Step 7.4 — Define schemas

One file per document type. Every schema must include:
- Clear `title` and `description` for each field (editors read these)
- `validation` on required fields (client shouldn't publish a post without a title)
- Thoughtful `preview` config (so the document list shows meaningful thumbnails + titles)
- `groups` or `fieldsets` if a schema has more than 6 fields (otherwise the editor sees a wall of fields)
- Portable Text (`array of block`) for any rich content

**Portable Text gotcha**: configure custom marks/blocks/styles to match what the site's typography supports. Don't let editors pick fonts or colors — only bold, italic, link, H2, H3, blockquote, and image embed (unless the brief truly needs more).

---

#### Step 7.5 — Mount the Studio

Create `src/app/studio/[[...tool]]/page.tsx` that renders `NextStudio` from `next-sanity/studio`. Configure `sanity.config.ts` with:
- Project ID + dataset
- All schemas
- Vision tool (for Sean's GROQ debugging only — can be hidden from client)
- Presentation tool (for live preview, configured in Step 7.7)

Confirm `exion-asia.vercel.app/studio` returns 200 and shows the login screen.

---

#### Step 7.6 — Query layer

Centralize GROQ queries in `src/sanity/queries.ts`. Never inline a GROQ query in a component.

Use the `defineQuery` helper so queries are type-safe when paired with `sanity-typegen` (or hand-rolled types in `types.ts`).

Default fetching pattern for marketing-site pages:
- **Static pages** (About, Services) → `generateStaticParams` + ISR with `revalidate: 60`
- **Blog index + individual posts** → ISR with `revalidate: 60`
- **Homepage** → ISR with `revalidate: 60`
- **Tag routes with many possibilities** → `dynamicParams: true` + on-demand revalidation via webhook

Revalidation via webhook is preferable to time-based for production — wire a Sanity webhook to `/api/revalidate` that hits `revalidateTag()` for the relevant tag when content changes. Editors see changes in ~5–10s, not 60s.

---

#### Step 7.7 — Replace hardcoded content, page by page

Work through each page in the order it was built:
1. Replace hardcoded data with a GROQ query result
2. Keep the exact JSX structure — only swap the data source
3. Verify the page renders identically to before the CMS swap
4. Confirm the editor can change content in Studio and the site updates

Do not refactor section components during this phase. Structural changes introduce bugs. If something needs refactoring, note it and do it AFTER the CMS pass is stable.

**Configure Sanity Presentation** at this step: the client opens Studio → Presentation → sees the live site rendered next to the editor. Click any element → jumps to the corresponding field. This is the "magic moment" that makes Sanity feel different from WordPress.

---

#### Step 7.8 — Image handling

Use `@sanity/image-url` with `next/image` for all Sanity images. Configure the image builder to emit optimized URLs with width/quality params. Respect Next.js's `remotePatterns` config for the Sanity CDN domain (`cdn.sanity.io`).

Hotspot/crop is a default Sanity image feature — enable it in schemas so the client can reposition images without re-uploading.

---

#### Step 7.9 — Deploy + handoff

1. Commit, push, deploy to Vercel (or redeploy).
2. Add the Sanity env vars to Vercel project settings.
3. Invite the client to the Sanity project (Sanity sends them a signup email).
4. Set their role to **Editor** (not Administrator — keeps them out of schema/project settings).
5. Write a short `CLIENT_GUIDE.md` in the repo with:
   - Studio URL
   - How to log in
   - How to create/edit/publish a blog post (3 steps)
   - How to edit site settings
   - Who to contact at Oblique for help
6. Ask Sean if he wants to record a 2-minute Loom walkthrough for the client (Sean does this, not the skill).

---

#### What NEVER goes into the CMS

Hard rule. Do not be talked into editability here:
- Visual layout / section order
- Typography (font choices, sizes, weights)
- Colors
- Spacing / padding
- Motion / animation
- Navigation structure (links yes, structural nav items no)
- Hero visual composition (image + overlay scrim + text positioning)

If the client insists on editability here, they don't want a CMS — they want Webflow. Redirect the conversation; do not cave.

---

#### What ALWAYS goes into the CMS

If these exist on the site, they must be editable:
- Blog posts (if the site has a blog at all)
- Case studies (if any are shown)
- Industries / services / team members (list items, not the section layout)
- Testimonials
- Site settings singleton: phone, email, address, social links, footer tagline
- Any stat numbers that could realistically change ("20,000 sqft", "40 specialists" — the client will grow)

---

## The Style System: Editorial Modernism

Three pillars, codified.

### Pillar 1 — Warm Restraint (the canvas)

- Backgrounds are **always tinted warm**. Never `#FFFFFF`. Use cream, off-white, beige, or the inverse: warm-blacks tinted toward the brand hue. Examples that work: `#FFFDFA`, `#FCFCFA`, `#F8F4EE`, `#21201E`, `#1C343D`.
- Text is **always tinted near-black** (or near-white for dark themes). Pick a hue close to the brand. Never `#000000` or `#FFFFFF`.
- Whitespace is **rhythmic**, not uniform. Vary section padding deliberately. A statement section should breathe more than a transactional one.
- Body text capped at 65–75ch.

### Pillar 2 — Bold Punch (the signature)

- **Exactly ONE accent color** per project. Period. Used for primary CTAs, key highlights, scroll markers, and a small number of editorial flourishes. Do not introduce a second "fun color" for variety.
- Accent must be confident — saturated, slightly unexpected. Examples: electric chartreuse, signal orange, soft coral, deep violet, hot pink (rarely), terracotta.
- The accent is rare BY DESIGN. If the accent shows up everywhere, it has lost its signature quality.

### Pillar 3 — Display Architecture (the structure)

- **Display headlines are oversized** — clamp from 56px on mobile up to 100–160px on desktop where appropriate. Treat as visual elements, not just type.
- **Strong scale contrast** — at minimum 1.4× ratio between display sizes. Body stays 16–18px.
- **Sections vary in structure** — never the same block layout twice in a row. The eye should be surprised on each scroll, but in a controlled, intentional way.
- **Big imagery, never stock illustration or icon grids**. If real photography isn't available, use real-quality stock from Unsplash/Pexels — but flag this to Sean and recommend replacement.
- **Pill / semi / square CTAs** chosen per brand and held consistently within the project.

### Motion Contract (defaults)

| Trigger | Animation | Spec |
|---|---|---|
| Section enters viewport | Fade-up | 8px Y, 600ms, `ease-out` |
| Grouped items enter (e.g. stat cards, service tiles) | Staggered fade-up | 80ms stagger between siblings |
| Hero image | Subtle parallax on scroll | translateY at half scroll speed |
| Logo row | Continuous horizontal marquee | CSS only, consistent linear speed, no easing, pause on hover |
| Hero headline | Optional one-time word-by-word fade-up on first load | Reserved for ONE moment per page |
| Hover states | 200ms ease-out | Color, opacity, subtle scale (1.02) only |

**Never animate**: width, height, padding, margin. Use transform + opacity only. **Never use**: bounce easing, elastic easing, infinite scaling pulses, scattered micro-interactions on every element.

### The SEO & GEO Contract

Every site produced by this skill ships with the SEO and GEO foundation described here. Not optional. A site without this is an unfinished site.

SEO makes Oblique's clients findable in Google. GEO (Generative Engine Optimisation) makes them citable in ChatGPT, Perplexity, Google AI Overviews, and Gemini. The two share the same technical foundation — they differ in what kind of content they reward.

#### The four pillars

1. **Crawlable semantic HTML** — One real `<h1>` per page containing the target keyword phrase in space-separated prose. Animated decorative headings are `aria-hidden` on a `<div>`, never a `<h1>`. Every `<img>` / `<Image>` has descriptive alt text (not "image", "photo", or filename).

2. **Per-page metadata** — Every page exports its own `metadata` (or `generateMetadata()` for dynamic pages) with page-specific title, description, canonical URL, and `openGraph`. `metadataBase` is set once in the root `layout.tsx`.

3. **Structured data (JSON-LD)** — Organization + WebSite in the root layout, so every page inherits them. Page-specific schema is added at the page level (FAQPage, Service, BreadcrumbList, CreativeWork, Person, Article). Visible content and schema share the same data source to prevent drift.

4. **Site-wide SEO conventions** — `sitemap.ts`, `robots.ts`, `llms.txt`, `opengraph-image.tsx` all present and correct. Preview/staging environments return `noindex`.

#### Critical anti-patterns to avoid

These break SEO in ways that aren't visually obvious and have bitten real Oblique work:

- **Count-up stat components initialised at 0.** The server-rendered HTML then contains `RM0M`, `0+`, `0%+` and crawlers, WhatsApp previews, and AI engines read zero. Fix: initialise the motion value at the target, reset to 0 client-side only if the element is below the fold, then animate on intersection. SSR output must show the final number as plain text.
- **Animated-word H1 where each word is its own `<span>` with margin-based spacing.** `textContent` concatenates as `YourbrandgrowsStronger.wheneverythingmovesasone.` — which indexes as a single meaningless token. Fix: add a `sr-only` (or visually-hidden) real `<h1>` containing the target phrase, demote the animated heading to a `<div aria-hidden>`.
- **Missing `og:image`.** Every WhatsApp / LinkedIn / Slack / iMessage link preview shows a blank card. Fix: `app/opengraph-image.tsx` generates a 1200×630 PNG dynamically via `ImageResponse`. No manual image asset needed.
- **`noindex` in production.** Happens when someone copies a staging `robots.ts` into prod. Fix: the single robots.ts gates on `process.env.VERCEL_ENV === "production"`, so the same file serves both environments correctly.
- **Canonical URL missing or pointing to localhost.** Fix: set `metadataBase` to the production URL and `alternates.canonical: "/"` on the root. Next auto-resolves per-page canonicals from there.
- **FAQ section visible to humans but not wrapped in FAQPage JSON-LD.** AI engines quote FAQ content directly; without schema the visible answers are invisible to the scrapers that matter. Fix: extract the FAQ array to `src/data/faqs.ts` and import it from both the visible `FAQ` component and a `FaqJsonLd` component rendered on the same page.
- **Unsourced superlatives in the hero.** "#1 Agency" without a qualifier gets ignored by AI engines as non-factual and invites legal scrutiny. Either substantiate with a source ("#1 — [award]") or reframe as a definitional claim ("The only X that does Y").

#### Default schema set per page type

| Page | Schemas |
|---|---|
| Root layout (every page inherits) | `Organization` (merged with `LocalBusiness` and industry-specific type), `WebSite` with `SearchAction` |
| Homepage | + `FAQPage` if FAQ section present |
| Service detail | + `Service`, `BreadcrumbList` |
| Case study / work detail | + `CreativeWork` or `Article`, `BreadcrumbList` |
| Team / founder page | + `Person` (one per individual), `BreadcrumbList` |
| Blog post | + `Article`, `BreadcrumbList` |
| Contact | Rely on layout's `LocalBusiness` — do not duplicate |

#### Organization schema — canonical template

Every client's `OrganizationJsonLd` follows this shape. Fill from the client brief:

```ts
{
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", /* industry subtype: MarketingAgency | Restaurant | Store | ... */],
  "@id": `${SITE_URL}/#organization`,
  name, legalName, alternateName, description,
  url: SITE_URL,
  logo: { "@type": "ImageObject", url, width, height },
  image: `${SITE_URL}/opengraph-image`,
  email, telephone,
  foundingDate,                    // ISO year "2016"
  numberOfEmployees: { "@type": "QuantitativeValue", value },
  address: { "@type": "PostalAddress", addressLocality, addressRegion, addressCountry },
  areaServed: [{ "@type": "Country", name }, ...],
  sameAs: [/* social profile URLs */],
  hasOfferCatalog: { "@type": "OfferCatalog", name, itemListElement: [/* Offer > Service per service */] },
  knowsAbout: [/* topic keywords */],
  slogan
}
```

`foundingDate`, `numberOfEmployees`, `sameAs`, and `hasOfferCatalog` are the most-skipped fields and the ones AI engines rely on heaviest for entity verification. Always fill them if the data exists.

#### Keyword strategy — not SEO's old game

Do not stuff keywords. Do not obsess over density. The single-file rule: the target phrase should appear in the page title, the H1, and at least once in body prose that reads naturally. That's it. Everything else is content quality.

For GEO, topic coverage matters more than keyword repetition. If a page claims to be about X, it should contain enough definitional, comparative, and FAQ-style prose about X that an AI engine could summarise it without needing to stitch multiple pages. "One good paragraph of definition + one table of comparisons + three specific FAQ answers" beats "keyword X mentioned twelve times."

#### Assets generated by this skill

Files the scaffold creates automatically (Phase 3, step 8):

```
src/app/
  layout.tsx                   # metadata, metadataBase, global JSON-LD imports
  opengraph-image.tsx          # dynamic 1200×630 OG card using client wordmark
  sitemap.ts                   # MetadataRoute.Sitemap
  robots.ts                    # MetadataRoute.Robots, prod-gated

src/components/seo/
  JsonLd.tsx                   # helper: <script type="application/ld+json">
  OrganizationJsonLd.tsx       # Org + LocalBusiness + industry subtype
  WebSiteJsonLd.tsx            # WebSite + SearchAction
  FaqJsonLd.tsx                # mirrors src/data/faqs.ts
  BreadcrumbJsonLd.tsx         # used on inner pages
  ServiceJsonLd.tsx            # used on /services/[slug]
  PersonJsonLd.tsx             # used on /team/[slug] or founder page

src/data/
  faqs.ts                      # shared by FAQ component and FaqJsonLd
  services.ts                  # shared by Services sections and ServiceJsonLd
  team.ts                      # shared by Team sections and PersonJsonLd

public/
  llms.txt                     # markdown manifest for AI crawlers
```

The six SEO primitives above live alongside the `motion/` primitives. One file per concern, all parameterised, all easy to copy to the next client project.

### Font Selection — DO THIS, DON'T SKIP

When picking fonts for a project:
1. Write 3 brand words from the brief (NOT "modern" or "elegant").
2. Reject every font in the **Impeccable reflex list** (see below).
3. Browse Google Fonts (or Fontshare, Pangram Pangram if Sean has time to license) for something that fits the brand as a *physical object* — a magazine column, a museum label, a workshop sign.
4. Pair: a distinctive display + a refined neutral body. NOT the same font for both.
5. Cross-check: if it lands on the reflex list, search again.

**BANNED reflex fonts** (from Impeccable, do not use): Fraunces, Newsreader, Lora, Crimson (any), Playfair Display, Cormorant (any), Syne, IBM Plex (any), Space Mono, Space Grotesk, Inter, DM Sans, DM Serif Display/Text, Outfit, Plus Jakarta Sans, Instrument Sans, Instrument Serif.

**Good starting hunting grounds on Google Fonts**: Bricolage Grotesque, Familjen Grotesk, Geist, General Sans (via Fontshare), Söhne (paid), Manrope (use carefully), PolySans, Migra (display), Editorial New (display), Tobias (display), Pangea, Climate Crisis (display, dramatic), Rasa (serif body), Author (serif body), Spectral (serif body).

---

## Anti-patterns — what this skill will NEVER produce

These are the explicit fingerprints of the bad references Sean rejected:

1. **Hero that's mostly empty space + a single tagline.** (Granopave failure mode.) Heroes must include a headline, supporting line, primary CTA, and a strong visual element.
2. **Repeating the same section block over and over.** (Velden failure mode.) Section structures must vary.
3. **Generic icon grids — 6 small icons + one-line headings + one-line body.** Never. Ever.
4. **Low-contrast type and inconsistent type scale.** (Robin Radar failure mode.) Use the codified type scale strictly.
5. **SaaS-default bright color palettes + stock illustrations.** (Second Nature failure mode.) Editorial photography only. One accent only.
6. **Cards on cards on cards.** Flatten hierarchy.
7. **Left-border colored stripes**, **gradient text**, **glassmorphism everywhere**, **rounded rectangles with generic drop shadows**. (Impeccable absolute bans.)
8. **Pure white backgrounds and pure black text.**
9. **Centered everything.** Asymmetric layouts feel more designed.
10. **Modal-everything.** Use modals only when nothing else works.

---

## Section Library (proven patterns to remix, never copy verbatim)

Pull from this menu when assembling pages. Vary the structure between adjacent sections.

**HERO**
- Full-bleed image + overlay text + CTA (image parallax on scroll)
- Split: oversized headline left, full-height image right
- Text-only with massive display + tiny eyebrow + CTA, image appears below as a "scroll into" reveal
- Video hero (autoplay, muted, looped) with text overlay

**ABOUT / BRAND STATEMENT**
- Full-width editorial paragraph with display-sized opening word
- Two-column: headline left, body right with photo offset
- Quote-style — single sentence at display size, attribution small below
- Stat band — 2–4 large numbers with descriptive captions

**SERVICES / WHAT WE DO**
- Asymmetric tile grid (mixed sizes)
- Vertical accordion list with inline imagery on hover/expand
- Horizontal scrollable cards (each card is image-led)
- Tabbed interface where each tab swaps a large visual

**WORK / CASE STUDIES**
- Large image-led panels (one per scroll moment, full-bleed)
- Horizontal scroller with pagination dots
- Editorial grid: 1 large + 2 small, alternating direction
- Filterable gallery with smooth re-layout

**PROCESS / HOW WE WORK**
- Numbered list with large number on left, content right (asymmetric)
- Horizontal step indicator with connected images
- Vertical timeline with images/details at each node

**TESTIMONIAL**
- Single full-bleed quote (display size) with photo + attribution
- Carousel of 2–3, manually advanced
- Editorial layout: quote inset within a larger story

**LOGO ROW**
- Continuous CSS marquee, single line, consistent speed
- Static grid with desaturated logos (only if marquee doesn't fit the brand's tone)

**CTA / CONTACT**
- Bold asymmetric: oversized headline + button + small supporting text
- Form-inline: contact form embedded in section, generously spaced

**FOOTER**
- Generous, multi-column, calm
- Includes: nav, contact, social, legal, optional secondary tagline

---

## Implementation rules

- **Use Server Components by default.** Mark `"use client"` only when the file needs state, effects, or Framer Motion.
- **Animation primitives live in `src/components/motion/`** so pages stay clean.
- **Tokens live in `tailwind.config.ts` and `globals.css`** — never hard-code colors or sizes in components.
- **One file per section** in `src/components/sections/`. Pages compose sections.
- **Image budget**: every page must include at least 2 large editorial images. If real assets aren't provided, use Unsplash direct CDN links and flag them for replacement.
- **Accessibility floor**: WCAG AA contrast on all text. Reduced motion query respected on all animations. Semantic HTML.
- **Build clean**: zero TypeScript errors, zero ESLint errors, zero console warnings before declaring a page done.

---

## Tools this skill leans on

- **Firecrawl** (`mcp__firecrawl__firecrawl_scrape` with `formats: ["branding"]`) — for reference URL analysis in Phase 1.
- **Bash** — for `create-next-app`, `npm install`, `npm run build`, `npm run dev`, `npx sanity` (Phase 7).
- **Read / Write / Edit** — for creating files.
- **Claude_Preview** (`mcp__Claude_Preview__preview_*`) — to launch the dev server and inspect output as it's built.
- **Vercel CLI** — `vercel deploy`, `vercel deploy --prod` for launching.
- **Sanity CLI + `next-sanity` SDK** — only invoked during Phase 7.
- **nano-banana skill** — for generating custom editorial imagery when real client photography isn't available.
- **Impeccable companion skills** (when available): `polish`, `critique`, `audit`, `typeset`, `colorize`, `layout`, `delight`. Invoke at quality-pass time.
- **Wireframe skill output** — if a wireframe HTML file is provided, read it as a structural reference but DO NOT copy its visual style. The wireframe describes structure; this skill provides the look.

---

## Done definition for any page

A page is "done" when ALL of these are true:
- ✅ Style Card respected (palette, fonts, CTA shape, motion contract)
- ✅ Sections vary in structure — no two adjacent sections share the same layout pattern
- ✅ Real or thoughtful imagery present, never icon-grid filler
- ✅ Zero AI-slop fingerprints (border-stripes, gradient text, nested cards, glassmorphism, etc.)
- ✅ Build compiles cleanly
- ✅ Reduced motion respected
- ✅ Exactly one `<h1>` containing the target keyword phrase in readable prose
- ✅ Page exports its own `metadata` with canonical, OG, Twitter
- ✅ All JSON-LD blocks present for the page type parse cleanly (see schema table above)
- ✅ No placeholder strings (`0`, `Lorem`, `TODO`) in rendered HTML
- ✅ Sean has seen a screenshot and signed off

Only after sign-off do we move to the next page.

---

## What this skill DOES NOT do

- Custom backend APIs / databases beyond Sanity (V2)
- Forms that actually submit — styled but non-functional unless explicitly wired to Resend, Formspree, or a Sanity form-submission handler (V2)
- E-commerce, auth for end users, dashboards
- Mobile-app-style layouts
- Dark mode toggle (pick light OR dark per project, don't switch)
- Multi-language / `hreflang` beyond English (V2)
- Drag-and-drop page builders where the client rearranges the visual layout. Sanity is a content editor, not a page builder — this is intentional.
