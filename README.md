# Oblique Power Skills

The team-wide AI toolkit for Oblique — skills plugin + the full Oblique OS project handoff package.

## What's in this repo

| Folder | What it is |
|---|---|
| `oblique-cowork/` | The Cowork skills plugin (26 skills) — install once, use in every session |
| `oblique-os/` | The Oblique OS build context — CLAUDE.md, PRD, design system, screenshots, planning docs, and session memory |

---

# Oblique Cowork Plugin v0.4.0

The full suite of Oblique's Cowork skills, packaged for team-wide installation.

## Skills included (28)

### Ads & Performance
- **meta-ads-agent** — Analyse and optimise Meta (Facebook/Instagram) Ads using live Windsor.ai data; creative fatigue, audience analysis, CPM/CTR diagnosis
- **google-ads-agent** — Analyse and optimise Google Ads accounts using live API data; audits, anomaly checks, negative keyword reviews, budget allocation
- **performance-report** — Build a full Oblique-style performance marketing report as a branded PPTX, pulling live data from Windsor.ai
- **performance-analysis** — Diagnose account performance and bottlenecks as a structured Word doc (internal use, not client-facing)
- **competitor-ad-intelligence** — Scrape the Meta Ad Library for competitor brands and build a competitive ad intelligence PPTX deck

### Strategy & Creative
- **creative-strategy-research** — Full creative strategy document: audience avatars (DAVIP profiles), messaging angles, competitive landscape, funnel architecture
- **static-ad-concepts** — 12 static ad concepts as a branded PPTX (rationale, headline, copy, CTA, visual guide)
- **social-content-ideation** — Monthly content ideation deck built on Oblique's 5-pillar framework
- **content-scripting** — Turn approved content ideas into production-ready scripts and storyboards
- **copywriting** — Write Oblique-standard copy for any format: landing pages, ads, product descriptions, social posts
- **influencer-shortlisting** — Research and shortlist influencers and UGC creators via Apify scraping; outputs a formatted Excel shortlist

### Client & Business
- **proposal** — Generate a full Oblique branding proposal from discovery call notes; outputs branded PPTX
- **client-brief** — Turn onboarding form data into a polished, research-backed Master Client Brief (Word doc)
- **media-plan** — Build a structured Excel media plan with Oblique's budget allocation rules and campaign structure
- **wireframe** — Generate a detailed full-page HTML wireframe for any client site

### Websites
- **marketing-site** — Build production-grade multi-page marketing websites in Next.js 14 + Tailwind, using Oblique's Editorial Modernism aesthetic — with SEO and GEO (Generative Engine Optimisation) baked into the scaffold (canonical URLs, dynamic OG cards, JSON-LD, sitemap, robots, llms.txt). Optional Sanity CMS layer.

### Thinking & Systems
- **decision-council** — Convene a 5-persona expert council to deliberate on any strategic decision; outputs an interactive HTML report
- **framework-builder** — Reverse-engineer and build structured frameworks from any domain or experience; outputs polished static HTML
- **prompt-engineering** — Craft precision-engineered prompts for Claude; system prompts, instruction sets, automation workflows

### Operations
- **daily-note** — Generate and save the morning daily note; pulls from Google Calendar, Gmail, and the Active Projects Board
- **journal** — Ask and save the daily journal question
- **schedule** — Create scheduled tasks that run on demand or on a set interval
- **research-sourcing** — Meta-skill; ensures all web research sources are cited correctly in any output

### Document Creation
- **docx** — Create, edit, or manipulate Word documents
- **pptx** — Create, edit, or manipulate PowerPoint presentations
- **xlsx** — Create, edit, or manipulate Excel spreadsheets
- **pdf** — Create, read, extract, merge, or manipulate PDFs
- **skill-creator** — Create new skills, modify existing ones, run evals, and benchmark performance

### Image Generation
- **nano-banana** — Generate 2K images from text prompts using Kie.ai's Nano Banana 2 model (Google Gemini 3 Flash Image); supports custom aspect ratios, batch generation, and auto-save. Requires `KIE_API_KEY` in your environment.

## Installation

### Option 1 — Claude Code (recommended for the team)

Install directly from this GitHub repo:

```
/plugin marketplace add seanng23/oblique-power-skills
/plugin install oblique-cowork@oblique-skills
```

Skills become available in all new sessions immediately.

### Option 2 — Claude desktop app (Cowork mode)

1. Download `oblique-cowork.plugin` (the packaged zip) from Releases
2. Open Claude desktop → **Settings → Plugins**
3. Click **Install Plugin** and select the `.plugin` file

## Updating

Plugins do **not** auto-update. Whenever Sean posts a new version in Slack, run both commands:

```
/plugin marketplace update oblique-skills
/plugin update oblique-cowork
```

Then restart Claude Code. New skills (and updates to existing ones) will appear in `/` autocomplete after restart.

**Why both commands?** The first re-fetches the marketplace manifest (so Claude knows a new version exists). The second pulls the actual plugin contents. Skipping the first means `update` thinks you're already on the latest.

**To check what version you have installed:**

```bash
cat ~/.claude/plugins/cache/*/oblique-cowork/.claude-plugin/plugin.json | grep version
```

## Vault required

This plugin works alongside the Oblique Obsidian vault. Several skills reference vault files for Oblique-specific context (client accounts, brand standards, copywriting rules, report structure). Make sure you have access to the vault before using the plugin.

See `Oblique Cowork — Team Handoff Guide.md` in the vault root for full onboarding instructions.

## Connectors required

Some skills connect to external services. Set these up in Cowork before use:

- **Google Calendar** — used by `daily-note`
- **Gmail** — used by `daily-note`
- **Windsor.ai** — used by `performance-report` and `meta-ads-agent`
- **Apify** — used by `competitor-ad-intelligence` and `influencer-shortlisting`

---

# Oblique OS — Build Context

The `oblique-os/` folder contains everything needed to understand and continue building Oblique OS with Claude Code — including the product spec, design system, 30 UI screenshots, phase roadmap, and session memory.

See [`oblique-os/README.md`](oblique-os/README.md) for the full onboarding guide.
