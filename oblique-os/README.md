# Oblique OS — Team Handoff Package

Everything your team needs to understand, continue, or onboard onto the Oblique OS build using Claude Code.

---

## What's in this folder

| Path | What it is |
|---|---|
| `CLAUDE.md` | The master project instruction file — Claude reads this automatically at session start. Contains tech stack, design constraints, architecture principles, build order, and behavioural rules. |
| `docs/PRD.md` | Full product spec. Every feature, flow, permission, stage, field, and data model. Single source of truth for what to build. |
| `docs/design-system.md` | Visual token reference. Every colour, font, shadow, radius, and motion value. |
| `docs/screenshots/` | 30 annotated screenshots from the Lovable prototype. Shows exactly what each screen should look like. |
| `planning/ROADMAP.md` | 10-phase build roadmap with completion status, success criteria, and plan breakdowns. |
| `planning/REQUIREMENTS.md` | Full requirements list (AUTH, CLNT, RIVR, CARD, STUD, JOB, NOTIF, etc.) with acceptance criteria. |
| `planning/PROJECT.md` | Project decisions log — key architectural choices, what was considered and why. |
| `planning/STATE.md` | Current build state — which phase is active, what's done, what's next. |
| `memory/` | Session context captured across the build — key decisions and non-obvious constraints. |

---

## Current build status

As of 20 Apr 2026:

- **Phase 1–8 complete** — Foundation, River View, Studio, Job System, Batch Review, Notifications/Dashboards, Ads Workflow, Type B Boards
- **Phase 9 in progress** — Calendar View (done), Archive (done), Command Palette (next), Polish
- **Phase 10 complete** — Performance + SEO board rework

See `planning/STATE.md` and `planning/ROADMAP.md` for the full picture.

---

## How to use this with Claude Code

### 1. Get the codebase

The Oblique OS source code lives in a separate repo. Ask Sean for access to `seanng23/solid-foundation-build`.

### 2. Set up Claude Code

Install Claude Code if you haven't: [claude.ai/code](https://claude.ai/code)

### 3. Install the Oblique Cowork plugin

The skills plugin is in this same repo. Install it:

```
/plugin marketplace add seanng23/oblique-power-skills
/plugin install oblique-cowork@oblique-skills
```

### 4. Add CLAUDE.md to your project root

Copy `CLAUDE.md` from this folder into the root of the Oblique OS codebase. Claude Code reads it automatically every session.

### 5. Start working

Claude will have full context on what Oblique OS is, how it's built, and what the design system looks like. You can then run GSD commands to pick up where the build left off:

```
/gsd:progress     — see where things are at
/gsd:next         — see what's next to build
/gsd:execute-phase — start executing a phase
```

---

## Key constraints (don't break these)

- **No left sidebar** — top bar navigation only
- **No Kanban** — River View only (single-column, stage-grouped)
- **Page background is `#FAFAF8`** — never `#FFFFFF`
- **Borders use `#E8E6E0`** — never Tailwind grey
- **Fonts: DM Serif Display** (headings) + **DM Sans** (body)
- **Cards use box-shadow, not borders**
- **All dates: short format** (`10 Apr` or `10 Apr, 2:30pm`) — never ISO

Full constraints in `CLAUDE.md` and `docs/design-system.md`.

---

## Memory files explained

The `memory/` folder contains context captured across the build that's not obvious from the code:

- **project_card_lifecycle_loop.md** — Cards loop back to the originating team (Social/Performance) at "Ready to Post". Both teams have a creation role AND a posting role.
- **project_production_sheet.md** — Production teams need a print-friendly shoot reference page. It's a public HTML page via magic link (`/print/[token]`), same pattern as client review. Builds during Phase 4.

---

## Screenshots reference

All 30 screenshots in `docs/screenshots/` are numbered and named by feature:

| # | Screen |
|---|---|
| 01–02 | Clients Home + Notifications |
| 03–06 | River View (Social pipeline, review panel, changes flag, calendar) |
| 07–11 | Type B boards (task detail panels — web + branding) |
| 12–15 | Admin + Design Lead dashboards |
| 16–17 | Job Detail View, My Work |
| 18–20 | Production Lead dashboard variants |
| 21–22 | Report viewer |
| 23–27 | Client review flow (name prompt → overview → card detail → confirm → done) |
| 28 | Settings (team + clients) |
| 29–30 | Search, Notifications panel |

---

## Questions?

Reach Sean at sean.prawn69@gmail.com or on WhatsApp.
