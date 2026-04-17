---
name: framework-builder
description: >
  Reverse-engineer, extract, and build structured frameworks from any domain, topic, raw material, or lived experience — then deliver them as polished, visual static HTML files. Use this skill whenever Sean asks to "build a framework", "create a framework", "reverse-engineer a framework", "document my process", "turn this into a framework", "structure this methodology", "extract the framework from this", or any variation of wanting to formalise how something works into a teachable, repeatable structure. Also trigger when Sean mentions "intellectual property", "signature process", "methodology", or wants to turn experience, case studies, transcripts, SOPs, or notes into a structured system that others can follow. This is the go-to skill for any framework creation or extraction task.
---

# Framework Builder

You are building a structured, teachable framework from either a topic/domain or raw source material. The output is a single static HTML file — visually rich, well-designed, and immediately useful as a reference or teaching tool.

This skill is built on Daniel Priestley's framework creation methodology, adapted for practical use.

---

## Step 1: Assess What You Have

Before doing anything, figure out what Sean has given you:

**Scenario A — Raw material provided** (transcript, notes, SOP, case studies, article, video content):
- Skip the interview. You already have the substance.
- Move straight to Step 3 (Extract the Framework).

**Scenario B — Topic or domain only** (e.g. "build me a framework for client onboarding"):
- You need to pull the knowledge out of Sean's head.
- Run the structured interview in Step 2.

**Scenario C — Partial material** (some notes + a vague brief):
- Read what's there, identify the gaps, then ask only the questions needed to fill them.

The goal is efficiency. Don't ask questions Sean has already answered through the material he's provided.

---

## Step 2: The Extraction Interview (Scenario B only)

This is adapted from Priestley's core question: *"When did I do something special that got a measurable outcome, I can explain it step by step, and it would benefit a certain type of person?"*

Ask Sean these questions (adapt the language to the domain, don't read them robotically):

### 2a. Ground the domain
- "What's the specific area or process you want to build this framework around?"
- "Who is this for — your team internally, clients, students, or yourself?"

### 2b. Extract case studies (the Priestley timeline)
- "Give me 2-3 examples where you or your team did this really well. What was the situation, what did you do, and what was the measurable result?"
- Push for specifics: names, numbers, timelines, outcomes. Vague answers make weak frameworks.

### 2c. Identify the repeating pattern
- "Across those examples, what did you do every time? What were the non-negotiable steps?"
- "Was there a specific order those steps happened in?"
- "What's the thing most people skip or get wrong?"

### 2d. Define the boundaries
- "What does this framework NOT cover? Where does it stop?"
- "Are there any common misconceptions about this process that the framework should address?"

Once you have enough material, move to Step 3. You don't need to ask every question — use judgment. If Sean gives you a rich, detailed answer early on, you might have everything you need in 2-3 exchanges.

---

## Step 3: Extract the Framework

Now take everything you have (raw material, interview answers, or both) and extract the underlying structure. Work through these layers:

### 3a. Identify the core insight
Every strong framework has one central insight — the "so what" that makes it worth formalising. Priestley's examples: Covey noticed some people had habits that made them effective. Sinek noticed businesses with clear purpose outperformed those without.

Ask yourself: what is the one insight that ties all of this together?

### 3b. Extract the steps, principles, or components
Pull out the structural elements. These typically take one of three forms (from Priestley):

1. **A sequence of steps** — things done in order (3, 5, 7, or 9 steps work best for memorability)
2. **A set of principles** — things that must all be true simultaneously (no required order)
3. **A system of components** — parts that interact with each other

Identify which type fits the material best. Don't force steps onto something that's actually a set of principles.

### 3c. Choose a visual structure
The framework needs a visual form. Pick the one that best represents the relationships between elements:

| Visual Form | Best For | Example |
|---|---|---|
| **Numbered steps / process flow** | Sequential processes, methodologies | "The 5-Step Client Onboarding Process" |
| **Concentric circles** | Layers of depth, core-to-surface | Sinek's Golden Circle (Why → How → What) |
| **Quadrant / 2x2 matrix** | Classification by two dimensions | Cashflow Quadrant, Eisenhower Matrix |
| **Venn diagram** | Overlapping domains, intersection = insight | Ikigai diagram |
| **Pyramid / hierarchy** | Priority or dependency layers | Maslow's Hierarchy |
| **Cycle / loop** | Repeating processes, feedback loops | PDCA cycle, OODA loop |
| **Spectrum / scale** | Progression, maturity levels | Capability maturity models |

If the content naturally suggests multiple visual forms, use the primary one as the hero and include secondary diagrams where they add clarity.

### 3d. Make it memorable (Priestley's memorability layer)
Apply one or more of these:

- **Alliteration** — steps or principles that start with the same letter (e.g. "Capture, Clarify, Convert, Close")
- **Acronym** — letters spell a relevant word (e.g. SCORE, SCALE, RAPID)
- **Numbered list with a hook** — "The 7 ___ of ___" format
- **A signature name** — give the framework a name that's ownable and specific, not generic

Don't force memorability devices if they make the framework less clear. Clarity always wins.

### 3e. Add the "why it matters" layer
For each element of the framework, capture:
- What it is (definition)
- Why it matters (the consequence of getting it wrong)
- How to apply it (practical action or example)
- Common mistakes (what people typically get wrong at this step)

---

## Step 4: Validate With Sean

Before building the HTML, present the framework structure in chat:

1. **Framework name**
2. **Core insight** (1-2 sentences)
3. **The elements** (steps, principles, or components — listed with brief descriptions)
4. **Visual structure** you plan to use
5. **Who it's for** and when to use it

Ask: "Does this capture it? Anything missing or out of order?"

Only proceed to building the HTML after Sean confirms.

---

## Step 5: Build the Static HTML File

Generate a single, self-contained HTML file. No external dependencies. All CSS and JS inline.

### Design principles:
- **Clean, modern, professional.** Think premium reference document, not a basic webpage.
- **Dark/light mode toggle** — default to light.
- **Responsive** — should look good on both desktop and mobile.
- **Oblique-adjacent styling** — use a refined, professional colour palette. Not necessarily Oblique brand colours (these are Sean's personal/general frameworks), but the same standard of design quality.

### Required sections in the HTML:

1. **Hero section** — Framework name, one-line description, who it's for
2. **Core insight** — The central idea in a visually prominent callout
3. **Visual diagram** — The framework's visual representation (SVG or CSS-based, not an image). This is the centrepiece. Make it polished.
4. **Detailed breakdown** — Each element of the framework expanded with:
   - What it is
   - Why it matters
   - How to apply it
   - Common mistakes
5. **Quick reference / cheat sheet** — A condensed, printable-friendly summary at the bottom
6. **Source attribution** — Where the framework was derived from (if from external material)

### Technical requirements:
- Single `.html` file, fully self-contained
- All styles in `<style>` tags, all scripts in `<script>` tags
- SVG diagrams built inline (not external files)
- Smooth scroll navigation
- Print-friendly styles (`@media print`)
- No localStorage or sessionStorage
- Use CSS variables for theming

### Visual diagram guidelines:
- Use SVG for the framework diagram — it scales cleanly and looks professional
- Colour-code the elements with a consistent palette
- Add subtle hover states or click-to-expand if the framework has enough depth
- The diagram should be understandable at a glance without reading the detailed breakdown

---

## Step 6: Save and Deliver

Save the HTML file to: `10 - Oblique/Frameworks/[Framework Name].html`

Use a clean, descriptive filename. Examples:
- `Client Onboarding Framework.html`
- `The SCALE Method — Pricing Strategy.html`
- `Content Repurposing System.html`

Also save a companion `.md` file to the same folder with just the framework's text content (name, insight, elements, descriptions) so it's searchable and linkable within Obsidian. Same filename, `.md` extension.

---

## Quality Checklist

Before delivering, verify:

- [ ] Framework has a clear, ownable name
- [ ] Core insight is stated in 1-2 sentences
- [ ] Every element has: definition, why it matters, how to apply, common mistakes
- [ ] Visual diagram is SVG-based and looks polished
- [ ] HTML renders cleanly at desktop and mobile widths
- [ ] Dark/light mode toggle works
- [ ] Print styles are clean
- [ ] Companion .md file is saved alongside
- [ ] File is saved to `10 - Oblique/Frameworks/`

---

## What This Skill Does NOT Do

- It does not create slide decks. If Sean wants a framework as a PPTX, use the `pptx` skill separately after building the framework here.
- It does not replace deep strategic research. If the framework requires market research, competitor analysis, or data pulling, do that research first (using other skills or web search), then feed the findings into this skill.
- It does not build frameworks from nothing. There must be either source material or Sean's direct input. A framework without substance behind it is just a diagram.
