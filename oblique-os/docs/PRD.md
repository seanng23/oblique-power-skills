# Oblique OS — Product Requirements Document

**Version:** 6.0
**Date:** 09/04/2026
**Author:** Sean (with Claude)
**Status:** Locked — Single source of truth for Claude Code handoff

---

## Changelog from v5.0

| Area | Change |
|---|---|
| User Roles | Removed `Account Manager`. Added `Social & Campaigns Manager` and `Creative Strategist Lead`. Updated role enum and landing page logic. Designers/Videographers/Editors cannot create or move cards. |
| Smart Clients Home | Clients Home cards enhanced with pipeline pulse, attention signals, and urgency sorting. Replaces the scrapped `/my-clients` route. |
| Job System | Jobs auto-spawn only — never manually created. Two-Job Rule for video cards (Production → Cover Image Design). `On Hold` escape valve added. `Pending Content` removed. Cover Image job fields added. |
| Studio — Jobs Panel | JOBS section added to Studio left panel showing linked jobs and their status. |
| Ads Board | Full Studio field spec: Content Type, Campaign Name, Landing URL, CTA dropdown, Placement, Ad Objective. Field sets per format (Static, Video, Carousel). |
| Type B Boards | Full specs for Performance, SEO, Web Development, and Branding. Task Detail Panel replaces Studio. Each board has defined stages, task types with chip colours, and board-specific fields. |
| Performance Board | Added `Media Planning` as first stage. Added `Media Plan` task type with budget/flight/channel fields. |
| Web Development Board | Corrected stages — review gates removed (review is an event, not a stage). Web tasks spawn Design jobs at design-dependent stages. |
| Branding Board | Corrected stages — Strategy Workshop removed as stage (now a task type). Branding tasks spawn Design jobs at every stage. |
| Search | Command palette (Cmd+K) spec added. Searches clients, cards, jobs. |
| Archive | Boolean archive flag on cards. Bulk archive for Admins/Leads. Filter toggle. |
| Card Activity | New `CardActivity` table for tracking stage changes. Displayed in Studio. |
| Notifications | Cover Image job spawn notification added. |
| Data Model | New objects and fields: CardActivity, ads-specific CardContent fields, Job cover image fields. Updated role enum. |
| Build Plan | Updated phases for Job cascade, Smart Clients Home, Type B full spec. V1 now includes Type B boards. |
| Section Numbering | Fixed duplicate section numbers throughout. Studio sub-numbering corrected. |
| Performance Stages | Simplified to `Media Planning → Backlog → In Progress → Done`. Review stage removed — ICs move their own tasks freely. |
| SEO Stages | Simplified to `Backlog → This Month → In Progress → Done`. Review stage removed. |
| Web Stages | Review gates removed as stages. Review is an event (batch review magic link), not a stage. Stages: `Wireframe → Homepage Design → Inner Pages → Development → QA & Testing → Live`. |
| Type B Permissions | All ICs on Type B boards can move their own tasks between stages. Exception from Type A permission model. |
| Type B Deliverable Review | New client-facing review page variant for document/link-based deliverables (Branding, Web). Presentable greeting + deliverable cards with `View Deliverable →` buttons. |
| Grouped Notifications | Notifications from the same event cluster grouped into one expandable row. V1 requirement. |
| Calendar View | Extended to all board types. Type A = posting dates. Type B = delivery/due dates. Tasks auto-map to calendar via due date. |
| Job Detail — Deliver to Card | New "Deliver to Card" action in Job Detail View. Designer/Editor uploads deliverable directly to parent card's Visual Panel without navigating away. |
| Context-Aware Navigation | Studio breadcrumb adapts based on where user navigated from (dashboard vs. River View). |

---

## 1. Product Overview

### What Is Oblique OS?

Oblique OS is a purpose-built project management platform for Oblique. It replaces the current workflow of managing client work across PowerPoint decks, WhatsApp threads, and email chains with a single platform that mirrors exactly how every department operates.

The platform has one job: get a piece of work from brief to delivered, with every team member knowing what they own and every client able to review and approve with one click.

### Design Philosophy

**The reference is Craft.do — not Gmail, not Linear, not Notion.**

Oblique OS is a creative studio's tool. It should feel like it was designed by people who care about aesthetics. The visual language is warm, editorial, and generous — not corporate, not enterprise, not a SaaS dashboard.

**Core principles:**

- **Warmth over coldness.** Warm whites (`#FAFAF8` backgrounds, not `#FFFFFF`). Soft shadows instead of hard borders. Nothing feels clinical.
- **Typography does the work.** A beautiful serif for headings, clean sans for UI. Content feels like something worth reading, not a form to fill in.
- **Generous whitespace.** Every element has room to breathe. Density is controlled — information appears when it's needed, not all at once.
- **No persistent left sidebar.** Navigation lives in a slim, clean top bar only.
- **Cards feel crafted.** Soft shadow, generous padding, clear title hierarchy, a handful of visible metadata. Nothing more until you open them.
- **One signal per thing.** No dual statuses. No redundant badges. The stage a card is in tells you everything you need to know about where it stands.
- **Light mode first.** Dark mode in a future phase.

### What This Is Not

- Not a configurable workspace.
- Not a dashboard that looks like a cockpit.
- Not another tool that looks like it was built from a component library and left at defaults.

### Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript + Tailwind CSS |
| Backend / Database | Supabase (PostgreSQL, Auth, Real-time, Storage) |
| Hosting | Vercel |
| File Storage | External links (Google Drive, Dropbox, Figma, etc.) |
| Email | Resend (transactional: approvals, assignments, overdue alerts) |

---

## 2. User Roles

Oblique OS has three tiers of internal users: Admins, Department Leads, and Individual Contributors. Each tier has a different default landing experience and different levels of visibility.

### Tier 1 — Admins

| Role | Access | Description |
|---|---|---|
| Admin | Full — all clients, all departments | Sean and Jun. Master view across every client, board, job, and team member. System settings, user management. |

### Tier 2 — Department Leads

Department Leads are the traffic managers of their department. They see all work across all clients within their department and manage workload distribution.

| Role | Department Scope | Real Person(s) | Description |
|---|---|---|---|
| Design Lead | All design jobs, all clients | Luna | Assigns designers to incoming design jobs. Manages design workload, output quality, and internal review. |
| Production Lead | All production jobs, all clients | TBC | Assigns videographers and editors. Manages shoot scheduling and editing pipeline. |
| Social & Campaigns Manager | Assigned clients — social + ads boards | Ashvini | Manages social content pipeline and ad campaigns for assigned clients. Handles client comms, sends batch reviews, monitors delivery across Social and Ads boards. |
| Creative Strategist Lead | Assigned clients — all creative services | Chloe | Leads creative strategy and concept direction for assigned clients. Handles client comms, sends batch reviews, oversees creative quality from ideation through delivery. |

### Tier 3 — Individual Contributors

Individual Contributors see only work assigned to them. Their primary view is My Work.

| Role | Department | Description |
|---|---|---|
| Copywriter | Social / Ads | Writes copy in The Studio for assigned cards. |
| Graphic Designer | Design | Executes design jobs assigned by Design Lead. |
| Videographer | Production | Handles shoots assigned by Production Lead. |
| Editor | Production | Handles post-production / editing assigned by Production Lead. |
| Performance Marketer | Performance | Manages Performance board tasks. |
| Web Developer | Web | Manages Web Development board. |
| Brand Strategist | Branding | Manages Branding board. |
| SEO Specialist | SEO | Manages SEO board. |

### Client (External)

| Role | Access | Description |
|---|---|---|
| Client | Review pages only | No login. Accesses work via magic links. Reviews, approves, comments, annotates. |

### Landing Page Logic

| Role / Condition | Landing Page |
|---|---|
| Admin | `/dashboard` |
| Design Lead | `/design` |
| Production Lead | `/production` |
| Social & Campaigns Manager | Clients Home (scoped to assigned clients) |
| Creative Strategist Lead | Clients Home (scoped to assigned clients) |
| Any other lead with client assignments | Clients Home (scoped to assigned clients) |
| Contributors | `/my-work` |

### `users.role` Enum

```
'admin' | 'design_lead' | 'production_lead' | 'social_campaigns_manager' | 'creative_strategist_lead' | 'copywriter' | 'graphic_designer' | 'videographer' | 'editor' | 'performance_marketer' | 'web_developer' | 'brand_strategist' | 'seo_specialist'
```

### `users.department` Enum

```
'management' | 'design' | 'production' | 'social' | 'performance' | 'web' | 'branding' | 'seo'
```

### Permission Model

- Admins and lead-tier users (Social & Campaigns Manager, Creative Strategist Lead) can create cards and move cards between stages
- Design Lead and Production Lead assign and track jobs — they do not create cards or move cards between stages
- **Designers, Videographers, and Editors cannot create cards or move cards between stages.** They work exclusively within the Job system.
- Admins manage users, clients, system settings
- Individual Contributors can only see cards/jobs assigned to them (in My Work) plus the boards for their assigned clients
- **Type B board exception:** All team members on Performance, SEO, Web, and Branding boards can create tasks via `+ Add Task` AND move their own tasks between stages. This is an explicit exception from the Type A permission model where only admins and leads move cards.

---

## 3. Navigation Architecture

### 3.1 Top Bar (Global — always visible)

A slim, minimal top bar. Never more than one line tall.

**Default state (Clients Home / My Work):**
- Left: `Oblique OS` wordmark
- Centre: nothing
- Right: `My Work` text link | search icon | notification bell | user avatar

**Inside a client workspace:**
- Left: `← Clients` breadcrumb (muted, returns to Clients Home)
- Centre: Client name in DM Serif Display + service tabs inline (`Social · Ads · SEO` — only active services, pill or underline style)
- Right: `View Brief` button (subtle, outlined) | notification bell | user avatar

No left sidebar. No icon rail. The top bar is the only persistent chrome.

### 3.2 Clients Home (Default Landing Page)

A **card grid** — each client is a card showing:
- Client logo / initials circle (large, centred)
- Client name (prominent, serif)
- Industry tag (small caps chip)
- Active services (subtle text: `Social · Ads · SEO`)

**Smart status signals on each card:**
- Pipeline pulse: `N in progress · N in review · N overdue` — compact status row below services
- Attention signal: `Changes Requested` red text or `Awaiting Review` amber text — only shown when applicable
- Next deadline: `Next due: [date]` — muted, shows the earliest upcoming due date across all services
- `N awaiting review` in amber — only shown when a batch review is pending client response

**Sorting:** Clients with overdue items first, then clients with pending reviews, then alphabetical.

Feels like a creative agency's client roster, not a CRM.

**Scoping for leads:** When a Social & Campaigns Manager or Creative Strategist Lead views Clients Home, the grid is scoped to show only their assigned clients.

### 3.3 Client Workspace

Clicking a client opens their workspace. Top bar transforms as described above.

Below the top bar: the **River View** for the active service tab begins immediately. No separate client header zone. The top bar itself carries the client identity.

Service tabs in the top bar allow switching between the client's active services (Social, Ads, Performance, SEO, Web, Branding). Each tab loads the appropriate board type (River View for all, with Type A or Type B card behaviour depending on the service).

### 3.4 My Work

Accessible from the `My Work` link in the top bar. Full-page view of every card and task assigned to the logged-in user across all clients.

**Grouped by urgency — not by stage:**
- `OVERDUE` — red label, sorted by how overdue
- `DUE TODAY` — amber label
- `THIS WEEK` — neutral label
- `COMING UP` — muted label

Each card shows: title / client name chip / format chip / due date / status dot / `Changes Requested` chip if flagged.

### 3.5 Admin Dashboard (Admins Only)

Accessible as the Admin's landing page. URL: `/dashboard`. Shows:
- Batch reviews awaiting client response (all clients)
- Cards with `Changes Requested` flag (all clients)
- Overdue tasks (cards and jobs)
- In Production — design and production workload
- Team workload summary (all departments)
- Reports shared but not acknowledged
- Recent activity feed

Full spec in Section 12.

---

## 4. The River View

A single-column, document-style flow of content cards grouped by workflow stage. Reads top to bottom like an editorial page. Scrolling down is reading the work.

### Stage Dividers

Each stage: name in small caps + subtle horizontal rule + count. e.g. `COPY / BRIEF  ·  4`

Stages with zero cards are collapsed by default — divider still visible, click to expand.

### Content Cards (Type A — Social / Ads)

Each card:
- Soft shadow, `border-radius: 12px`, warm white background
- **Title** — prominent, DM Serif Display
- **Format chip** — colour-coded (see Section 14)
- **Due date** — subtle; urgency colouring if overdue or within 48hrs
- **Assignee avatar(s)** — small, stacked
- **Status dot** — auto-derived from stage (see Dot Logic below)
- **`Changes Requested` flag** — small red chip, only shown when flagged. Cleared when card moves forward.
- Nothing else visible. All detail lives inside the card.

### Task Cards (Type B — Performance / SEO / Web / Branding)

Each card:
- Same card styling as Type A
- **Task title** — DM Serif Display
- **Client chip** — which client this task belongs to
- **Task type chip** — colour-coded per board (see Section 11)
- **Due date** — urgency colouring
- **Assignee avatar(s)**
- **Priority indicator** — `Urgent` red chip if flagged
- **Platform chip** (Performance only) — Meta / Google / TikTok / Shopee, muted

Cards are not draggable. Stage is changed from inside the card via `Move to Stage →`.

### Status Dot Logic (auto, no manual input)

| Stage | Dot colour |
|---|---|
| Ideation / Backlog / Wireframe / Mood Board | Grey |
| Copy / Brief / This Month / In Progress (any) | Blue |
| In Design / In Production | Blue |
| Ready to Post / Done / Live | Green |
| Posted | Green |
| `Awaiting Review` indicator (batch sent, not yet responded) | Amber |
| `Changes Requested` flag active | Red |

### `+ Add Card` / `+ Add Task`

Sits inside each stage section, directly below the last card in that stage — before the next divider. Creates a card/task pre-assigned to that stage.

For Type B boards (Performance, SEO): all team members can create tasks via `+ Add Task`, not just leads.

### Filtering & Sorting

Slim filter bar below the top bar:
- Filter: Assignee / Format (or Task Type for Type B) / Due Date
- Sort: Due Date (default) / Stage / Created Date
- View toggle: River | Calendar (all boards) | Reports (Performance / SEO only)

### Send for Review Button

A prominent **`Send for Review →`** button sits in the filter bar row, right-aligned. This is a board-level action — it opens the Batch Review panel (see Section 9). It is NOT on individual cards. Present on Type A boards (Social, Ads) and on Web and Branding Type B boards (which use batch review for deliverable approval). Not present on Performance or SEO boards.

---

## 5. The Calendar View

The Calendar View is an alternative to the River View for **all boards**, toggled from the filter bar. It is a **planning tool** — the primary place where leads and team members visualise workload and deadlines across the month.

**Type A boards (Social, Ads):** Calendar maps by **posting date**. "When does this content go live?" Drag to reschedule. Unscheduled sidebar for cards without dates.

**Type B boards (Performance, SEO, Web, Branding):** Calendar maps by **due date**. "When does this need to be delivered?" Tasks auto-appear on their due date — no manual calendar placement needed. Drag to reschedule due date. In one glance, leads can see which weeks are heavy and which are light, making workload prediction immediate.

### 5.1 Layout

Two-column layout:

```
[ Monthly Calendar Grid — ~75% width ] [ Unscheduled Sidebar — ~25% width ]
```

The calendar grid shows the current month by default. `← / →` arrows navigate between months. The period label (e.g. `April 2026`) sits above the grid, centred, in DM Serif Display.

### 5.2 Calendar Grid

Standard 7-column week grid (Sun–Sat). Each day cell has:
- Day number (top left of cell, small, muted)
- Content card tiles stacked inside the cell — one tile per card scheduled on that date

**Card tile design (compact):**
- Format colour chip (the coloured left edge or a small dot — same colour system as River View chips)
- Card title — truncated to one line, `font-size: 12px`, DM Serif Display
- Nothing else — no assignee, no status dot at this scale
- Click a tile → opens The Studio for that card (same as River View)
- Tiles are draggable within the grid

**Day cells with multiple cards** stack tiles vertically. If more than 3 cards on one day, show 2 tiles + `+N more` link that expands inline.

**Today** — day cell has a subtle amber dot or underline on the date number. Not a heavy highlight, just a quiet marker.

### 5.3 Unscheduled Sidebar

Cards with no posting date appear here — they are not lost when switching to Calendar view.

The sidebar header: `UNSCHEDULED  ·  N` in small caps.

Each unscheduled card appears as a compact draggable tile:
- Format colour chip
- Card title (truncated)
- Stage label in muted text below (e.g. `Copy / Brief`)

**Drag behaviour:** Drag a card from the sidebar onto any date cell → posting date is set to that date, card moves off the sidebar. Drag a card from one date to another → posting date updates. All changes sync immediately to the card's `Posting Date` chip in The Studio.

The sidebar is scrollable if there are many unscheduled cards.

### 5.4 Setting the Posting Date — Two Ways

**From The Studio:** The `Posting Date` chip in the metadata row at the top of the left panel. Click → inline date picker appears. Set or change the date directly on the card.

**From the Calendar:** Drag the card tile to the desired date. Both methods sync to the same `posting_date` field on the card. Changing it in one place updates the other immediately.

### 5.5 Creating a Card from the Calendar

Clicking an **empty date cell** opens a quick-create panel (small overlay, not full page):
- `Title` — text input
- `Format` — format selector (same options as full card creation)
- `Posting Date` — pre-filled to the clicked date, editable
- `Assigned to` — optional
- `Create Card` button — creates the card in Ideation stage with the posting date set

The new card appears on that date in the grid immediately and in the River View under Ideation.

### 5.6 Visual Colour Logic on the Calendar

Card tiles are colour-coded by format — same system as River View chips:
- Carousel → blue left edge
- Single Image → grey left edge
- Reel → green left edge
- TikTok → rose left edge
- Podcast → purple left edge
- Street Interview → amber left edge

This lets the team scan the month and see content mix at a glance — a week of all blue tiles means all carousels, no video variety.

---

## 6. The Full-Page Card ("The Studio")

Clicking a Type A card (Social or Ads) opens a full-page experience. The river recedes. The user is inside this piece of content — focused, calm, purpose-built for the work.

**Type B cards do NOT open The Studio.** They open the Task Detail Panel instead (see Section 11.0).

### 6.1 Navigation

**Top left:** `← FlowerChimp / Social` breadcrumb — returns to river, card gently highlighted on return.
**Top right:** Prev `‹` / Next `›` arrows — moves between cards in the same stage. Keyboard navigable.

### 6.2 Layout

```
[ Left: Content Canvas 55% ] [ Right: Visual Panel 45% ]
                                    [Comments icon — expands sidebar]
```

When comments sidebar expanded: `40% / 35% / 25%`

### 6.3 Left Panel — Content Canvas

**This is a document, not a form.** Fields look like content — not labelled input boxes. Editing is inline, click to edit.

**Header (top of left panel):**

```
[Stage badge — click to change]    [Changes Requested chip — only if flagged]
[Format chip] [Pillar chip] [Language chip] [Posting Date chip]
```

**Stage badge** — single dropdown. Options:
- Social: `Ideation / Copy / Brief / In Design / In Production / Ready to Post / Posted`
- Ads: `Concept Planning / Copy / Brief / In Design / In Production / Go Live / Live`

There is no second status badge. The stage is the status.

**`Changes Requested` chip** — red, only appears when manually flagged. Click to clear it once actioned.

**Ads metadata row** — when `service_type = 'ads'`, additional chips appear:
- Content Type: `Evergreen` / `Campaign`
- Platform: Meta / Google / TikTok
- Placement: Feed / Story / Reel / Search / Display (multi-select)
- Ad Objective: Awareness / Traffic / Conversions / Retargeting

---

**JOBS Panel** (pinned above the action bar in the left panel)

A `JOBS` section displays all jobs linked to the card:

- Static format cards: one Design job row
- Video format cards: two job rows — Production job first, then Design (Cover Image) job

Each job row shows: job title, department chip, status chip, assigned avatar(s), due date.

The Cover Image design job shows `Waiting on production` (muted, italic) until the Production job is Closed. Once Production job is Closed, the Cover Image job becomes active and shows its real status.

Click a job row → navigates to the Job Detail View for that job.

---

**Content body — by format type:**

#### Format: Static — Single Image

Fields in order, all inline-editable, document style:

1. `CONCEPT` — short text area. *"Describe the visual concept in 1–3 sentences…"*
2. `HEADLINE` — single line. Main text on the visual.
3. `BODY COPY` — multi-line. Supporting copy on the visual.
4. `CAPTION` — multi-line. The social post caption.
5. `HASHTAGS` — single line. Muted colour, reads as `#tag #tag #tag`.

---

#### Format: Static — Carousel

Fields in order:

1. `CONCEPT` — short text area.

2. **Slide blocks** — each slide is a soft inset block (`background: #F4F3EF`, `border-radius: 10px`, `padding: 14px 16px`):
   - Label: `SLIDE 1`, `SLIDE 2` etc. in small caps
   - `HEADLINE` — single line
   - `BODY COPY` — multi-line
   - `×` remove button on hover only

   `+ Add Slide` below last block — dashed border, full width, muted.

3. `CAPTION` — shared post caption for the carousel.
4. `HASHTAGS` — single line, muted.

---

#### Format: Reel / TikTok / Video (Podcast, Street Interview, Other)

Fields in order:

1. `CONCEPT` — short text area. Also serves as overall direction note for production.

2. **Scene blocks** — each scene is a soft inset block (same styling as slide blocks):
   - Label: `SCENE 1`, `SCENE 2` etc. in small caps
   - `ACTION` — single line. What happens visually.
   - `SCRIPT` — multi-line. Spoken lines or on-screen text.
   - `×` remove on hover only

   `+ Add Scene` below last block — dashed, full width, muted.

3. `PRODUCTION NOTES` — text area. Notes to the editing/production team. Slightly more muted styling.

4. `CAPTION` — post caption.
5. `HASHTAGS` — single line, muted.

---

#### Ads Format: Static

When `service_type = 'ads'`, the content fields swap to:

1. `TITLE` — internal concept name. Single line. Not displayed to client.
2. `CAMPAIGN NAME` — optional text field. The campaign this ad belongs to.
3. `HEADLINE` — the main ad headline on the creative. Single line.
4. `POST CAPTION / PRIMARY TEXT` — ad copy for the feed post. Multi-line. Same styling as Social caption.
5. `LANDING URL` — full URL. Clickable with external link icon. Validates as URL.
6. `CTA` — dropdown: `Shop Now` / `Learn More` / `Sign Up` / `Get Quote` / `Download` / `Contact Us` / `Book Now` / `Subscribe` / `Watch More` / `Other`
7. `LINK TO ASSETS` — URL to the Google Drive / Figma / Dropbox assets folder. Clickable.
8. `HASHTAGS` — single line, muted. Collapsed by default — click to expand.

No `Pillar` chip on Ads cards. No `CONCEPT` field — `TITLE` serves as the internal label.

---

#### Ads Format: Video

1. `TITLE` — internal concept name.
2. **Scene blocks** — same design as Social video cards (SCENE 1, SCENE 2, etc. with ACTION + SCRIPT fields).
3. `PRODUCTION NOTES` — notes to editing/production team.
4. `POST CAPTION / PRIMARY TEXT` — ad copy for the feed post.
5. `LANDING URL` — full URL, clickable.
6. `CTA` — same dropdown as static.
7. `LINK TO ASSETS` — folder URL.

---

#### Ads Format: Carousel

1. `TITLE` — internal concept name.
2. **Slide blocks** — same as Social carousel (SLIDE 1, SLIDE 2, etc. with HEADLINE + BODY COPY per slide).
3. `POST CAPTION / PRIMARY TEXT` — shared caption for the carousel post.
4. `LANDING URL` — full URL.
5. `CTA` — dropdown.
6. `LINK TO ASSETS` — folder URL.

---

#### Ads Status Mapping (from existing PowerPoint workflow)

| Current PowerPoint State | Oblique OS Equivalent |
|---|---|
| CONTENT WIP | Card in `Concept Planning` or `Copy / Brief` stage |
| PENDING APPROVAL | Card in active Batch Review (amber `Awaiting Review` indicator) |
| ON HOLD | `Changes Requested` flag (red chip) — card needs revision |
| APPROVED | Card auto-advances after client approval in Batch Review |

No additional status system needed — the existing stage + flag system covers it exactly.

---

**Actions bar (pinned to bottom of left panel):**
- `Move to Stage →` — dropdown, all stages listed (primary action)
- `Flag: Changes Requested` — sets the red chip; only used when client feedback requires rework
- `Assign to` — avatar picker
- `Save` — subtle, auto-saves but explicit save available

Note: **`Send for Review` is NOT on individual cards.** It lives at the board level only (see Section 9).

---

### 6.4 Right Panel — Visual Panel

- Paste external link (Figma, Canva, Google Drive) → renders as embed/preview
- Or drag-and-drop image upload
- Label field below visual (e.g. `Visual Ref — First Draft`)
- Multiple visuals: filmstrip toggle at bottom. `+ Add Visual` below filmstrip.

### 6.5 Comments Sidebar

Collapsed by default. Speech bubble icon on right edge of Visual Panel expands it. Slides in smoothly (`250ms cubic-bezier(0.4, 0, 0.2, 1)`).

**Internal comments** — thread style. Avatar + name + timestamp. Blue left border accent (`#2563EB`).

**Client annotations** — from batch review responses. Client name + pinned location reference + comment text. Amber left border accent (`#D97706`). Resolved annotations tick off and collapse.

Divider between types: `INTERNAL  ·  CLIENT FEEDBACK`

**Activity Log** — collapsible section at the bottom of the comments sidebar: `ACTIVITY` in small caps. Shows stage changes: `"Jun moved to In Design · 2h ago"` entries. Powered by the `card_activity` table.

---

## 7. Board Architecture

Two board types, both using River View.

**Type A — Creative Pipeline** (Social + Ads): Full Studio, batch client review, production handoffs, Calendar View.

**Type B — Task Management** (Performance, SEO, Web Development, Branding): River View with task cards, Task Detail Panel (no Studio), report sharing (Performance + SEO), checklists.

---

## 8. Type A: Creative Pipeline

### 8.1 The Unified Card Principle

A content piece is created once, stays as one card for its entire life. Copy, visual refs, client comments, design files — all accumulated in one place. No duplication, no re-briefing.

### 8.2 Social Media — Stages

```
Ideation → Copy / Brief → In Design → In Production → Ready to Post → Posted
```

**Two Review Events** happen between stages — they are not stages themselves:

- **Ideation Review** — sent from the board when ideation cards are ready. Client approves the content plan / calendar before copywriting begins.
- **Final Review** — sent from the board when design or production is complete. Client approves the finished assets.

When a review batch is sent, cards included in that batch show an amber `Awaiting Review` indicator in the River View — not a stage change, just a visual signal. When the client responds:
- Approved cards → automatically advance to the next stage
- Cards with client change requests → receive the `Changes Requested` flag and stay in their current stage

**Stage descriptions:**

**Ideation** — Card creation. Fields: Content Format / Content Pillar / Concept Brief / Language / Target Posting Date / Assigned to.

**Copy / Brief** — Full content written in The Studio. Copywriter fills all format-specific fields (slides, scenes, caption, hashtags). Card moves here after ideation is approved — or directly if skipping ideation review.

**In Design** — Static content routed here. Design job auto-spawns. Design Lead assigns designer, sets due date, adds Figma/Canva link.

**In Production** — Video content routed here. Production job auto-spawns. Production Lead assigns Videographer + Editor, sets Shoot Date, Location, Raw Footage Link.

**Ready to Post** — Approved finished assets. Scheduled for publishing. Card cannot reach this stage until all linked jobs are Closed.

**Posted** — Published. Can be archived at month-end.

### 8.3 Ads — Stages

```
Concept Planning → Copy / Brief → In Design → In Production → Go Live → Live
```

Same two Review Events as Social (Concept Review + Final Review).

**Go Live:** Performance team marks campaign/ad set as uploaded in-platform, moves to Live.

Full Ads Studio field spec is in Section 6.3 (Ads Format sections).

---

## 9. Client Review System — Batch Reviews

### The Core Principle

A Review is a **collection of cards**, not an individual card action. The lead decides when a batch is ready and fires a single review. One magic link is generated per batch. That link is **shareable** — the client can pass it to colleagues for additional rounds of review. All feedback from all reviewers is saved, attributed by name, and visible to the Oblique team.

### 9.1 Sending a Batch Review

The `Send for Review →` button in the River View filter bar opens the **Batch Review Panel** — a centred overlay:

```
┌─────────────────────────────────────┐
│  Send for Review                    │
│                                     │
│  Review type                        │
│  ○ Ideation Review                  │
│  ○ Final Content Review             │
│                                     │
│  Period                             │
│  [April 2026 ▾]                     │
│                                     │
│  Cards to include (8 selected)      │
│  ☑ Mother's Day Carousel            │
│  ☑ Brand Story Reel                 │
│  ☑ Spring Collection Launch         │
│  ☐ Easter Promo — not ready yet     │
│     (deselect to exclude)           │
│                                     │
│  [Generate Link]                    │
└─────────────────────────────────────┘
```

- Review type determines the page layout the client sees
- Cards auto-populated from relevant stage (Ideation/Copy Brief for Ideation Review; In Design/In Production for Final Review)
- Lead can deselect cards not ready yet
- `Generate Link` creates one magic URL, copies to clipboard
- Cards in the batch get an amber `Awaiting Review` left border in the River View
- Lead can see all active batches and reviewer status in the Batch Review panel

### 9.2 Reviewer Identity — Name Prompt

The magic link is not tied to one person. When **anyone** opens the link, the first screen they see is a simple identity prompt:

```
"Who's reviewing?"

Name          [text input — e.g. "Lily Tan"]
Role / Note   [text input — optional, e.g. "Marketing Director"]

[Start Review →]
```

No login. No account. Just a name. This gives the Oblique team full attribution on every comment.

The name is stored with the session and attached to every comment and decision made in that session.

### 9.3 The Client Review Page

After the name prompt, the client enters the review page.

**Page header (no Oblique OS navigation chrome):**
- Oblique OS wordmark — small, top left, muted
- `[Client Name] — [Period] Content Review` in DM Serif Display, large, centred
- Subtext: `Review prepared by Oblique · 8 items`
- Slim progress indicator: `0 of 8 reviewed` — updates as client actions each card
- Reviewer name shown top right: `Reviewing as Lily Tan`

**Content grid:**
Cards in a 2-column grid. Each tile: format colour chip / title / format label / posting date / status pill (`Pending` → `Approved ✓` or `Changes Requested ✗`).

Click a tile → opens card detail view.

**Card detail view:**
- Left: content as written in The Studio — read-only, clean typography.
- Right: media-aware visual panel (see Section 9.4)
- Below the visual: general comment field — always visible, optional, multi-line.
- Bottom action bar (fixed): `← Back` / `Request Changes` / `Approve ✓`

**Ideation Review:** Shows concept, format, pillar, posting date. No copy fields yet.
**Final Review:** Shows full copy + media panel + annotation/timestamp comments.

**After all cards are actioned:**
Progress reads `8 of 8 reviewed`. `Submit Review` button appears — full width, dark fill. On submit: summary shown, confirm, thank-you state.

### 9.4 Media-Aware Visual Panel

**Image / Design file:** Static preview / embed. Final Review only: click anywhere on image to pin an annotation comment. Pins saved with x/y position and reviewer name.

**Video:** Clean embedded video player. Timestamp comments: client pauses, clicks `+ Comment at [0:23]`. Timestamp comments display as a list below the player. Clicking a timestamp jumps to that moment.

**Figma link:** Embedded iframe preview. General comment field only (no positional pinning).

**No media attached:** Placeholder shown. General comment field still available.

### 9.5 Multi-Reviewer & Multi-Round Support

The magic link is **permanently shareable** for the life of the batch (14 days by default). Multiple reviewers can open the same link, each identifying themselves. All submissions saved separately, attributed by name.

The lead sees in the Batch Review panel:
```
April 2026 — Final Content Review    [Active]

Reviewers:
  Lily Tan · Marketing Director    Submitted 8 Apr, 2:14pm   [8/8 reviewed]
  David Lim · CEO                  In progress               [3/8 reviewed]

[Close Review]   [Copy Link]   [View Responses]
```

`Close Review` deactivates the link. New review round: lead generates a new batch from the same button. Previous round's feedback preserved and labelled by round.

### 9.6 After Submission — Team Side

- In-app notification + email: *"Lily Tan submitted a review — 6 approved, 2 with changes"*
- Approved cards: `Awaiting Review` clears, card auto-advances one stage
- Changed cards: `Awaiting Review` clears, `Changes Requested` red chip appears. Card stays.
- All comments, pins, and timestamp annotations appear in the card's Comments Sidebar under `CLIENT FEEDBACK`, attributed by reviewer name

### 9.7 Magic Link Properties

| Property | Value |
|---|---|
| Scope | One batch (multiple cards) |
| Expiry | 14 days (configurable) |
| Reviewer identity | Name prompt on first open — no login |
| Multi-reviewer | Yes — link shareable, all submissions saved |
| Multi-round | New batch created per revision round |
| Concurrent batches | Multiple batches active simultaneously per client |
| Close | Lead manually closes batch when feedback is complete |

---

## 10. The Job System

### 10.1 What Is a Job?

A **Job** is a child record of a Card. It captures everything the execution department needs to complete the work — who's doing it, what type of output it is, when it's due, where the files are — without the card-level context needing to be duplicated.

**The relationship:**
```
Card (lives in Social/Ads board, owned by lead + strategy team)
  └── Job (lives in Design or Production department, owned by Lead + Individual Contributor)
```

The Card does not advance to the next stage until all active Jobs are marked `Closed`.

### 10.2 Who Creates Jobs

**Jobs are never manually created by anyone.** They auto-spawn from card stage transitions only. The project manager (Admin, Social & Campaigns Manager, Creative Strategist Lead) controls the card — when they move a card to In Design or In Production, the job is automatically created.

- Design Lead and Production Lead only assign and track jobs — they do not create them.
- Designers, Videographers, and Editors only execute within the Job system.

### 10.3 Design Jobs

**Triggered when:** A card enters `In Design`.

**The Design Lead receives a notification:** *"New design job — FlowerChimp · Mother's Day Carousel → In Design"*

She opens the **Design Lead Dashboard**, sees the incoming job in the queue, and assigns it:

| Field | Description |
|---|---|
| Job Title | Auto-filled from card title. Editable. Naming convention: `[CLIENT CODE]_[Date]_[Output Type]_[Description]` |
| Output Type | Dropdown — see Section 10.6 |
| Priority | `Normal` / `ASAP` |
| Assigned Designer(s) | Avatar picker — one or multiple |
| Due Date (Internal) | When the design should be ready for internal review |
| Due Date (Client) | When the client needs to receive it |
| Brief / Deck Link | URL to the brief or strategy deck |
| Asset Folder Link | URL to the assets folder |
| Remarks | Short notes to the designer |

**Design Job Status Pipeline:**
```
To Brief → In Progress → On Hold (escape) → Pending Internal Review → Pending Client Review → Closed
```

- `To Brief` — Job created, not yet picked up by designer
- `In Progress` — Designer has started
- `On Hold` — Escape valve for genuine blockers (see Section 10.8)
- `Pending Internal Review` — Designer marks complete, Design Lead reviews
- `Pending Client Review` — Internal review passed, sent to client via batch review on parent card
- `Closed` — Client approved. Parent card auto-advances.

### 10.4 Production Jobs

**Triggered when:** A card enters `In Production`.

Production job fields:

| Field | Description |
|---|---|
| Job Title | Auto-filled from card title. Editable. |
| Output Type | `Socials Video` / `Ad Video` / `Corporate Video` / `UGC` / `Podcast` / `Street Interview` / `Product Shoot` / `Event Coverage` / `Adhoc` |
| Priority | `Normal` / `ASAP` |
| Videographer(s) | Avatar picker — one or multiple |
| Editor | Avatar picker — one person |
| Shoot Date | Date picker |
| Shoot Location | Text field |
| Raw Footage Link | Google Drive / Dropbox URL — added post-shoot |
| Brief / Deck Link | URL |
| Remarks | Notes to the team |

**Production Job Status Pipeline:**
```
To Brief → Pre-Production → Shooting → Editing → On Hold (escape) → Pending Internal Review → Pending Client Review → Closed
```

- `To Brief` — Job created, team not yet briefed
- `Pre-Production` — Planning, scripting, talent booking, equipment
- `Shooting` — Shoot day(s)
- `Editing` — Post-production
- `On Hold` — Escape valve (see Section 10.8)
- `Pending Internal Review` — Editor marks complete, Production Lead reviews
- `Pending Client Review` — Sent to client via batch review on parent card
- `Closed` — Client approved. Parent card auto-advances.

### 10.5 Two-Job Rule for Video Format Cards

Video format cards (Reel, TikTok, Podcast, Street Interview, Ad Video) always spawn **two jobs in sequence**:

1. **Production job** — spawns when card enters `In Production`. Videographer + Editor assigned by Production Lead.
2. **Design job (Cover Image)** — spawns automatically only when the Production job is marked `Closed`. Design Lead assigns a designer to produce the cover image/thumbnail.

The card cannot advance to `Ready to Post` / `Go Live` until **both** jobs are Closed.

Static format cards (Single Image, Carousel, Ads Static) only ever spawn one Design job.

**Cascade logic (for backend):**

```
IF card.format IN ('reel', 'tiktok', 'podcast', 'street_interview', 'ad_video'):
    ON card.stage → 'in_production':
        CREATE job (department='production', card_id=card.id)
        NOTIFY production_lead
    ON production_job.status → 'closed':
        CREATE job (department='design', title=card.title + ' — Cover Image', card_id=card.id, is_cover_image=true, parent_job_id=production_job.id)
        NOTIFY design_lead

IF card.format IN ('static_single', 'static_carousel', 'ads_static'):
    ON card.stage → 'in_design':
        CREATE job (department='design', card_id=card.id)
        NOTIFY design_lead
```

### 10.6 Design Output Types

Drawn from Oblique's actual designer job sheet. Used to categorise and filter jobs in the Design Lead Dashboard.

| Output Type | Examples |
|---|---|
| Digital & Social Media | IG carousel, social post, cover photo, thumbnail, WhatsApp graphic |
| Marketing & Advertising | Static ads, banner ads, PMAX assets, animated ads |
| UI / UX & Web Design | Website design, landing page, Shopee/e-comm page, web banner |
| Print Design | Brochure, menu, newspaper ad, flyer |
| Branding & Identity | Logo design, brand guidelines, brand collaterals |
| Motion & Video Design | Animated ads, GIF, motion graphics, video title card |
| Corporate & Presentation | Pitch deck, training deck, corporate profile, proposal |

### 10.7 Final Delivery

There is no separate "Final Delivery" field on the Job. The designer/editor uploads or links the finished file directly to the parent card's Visual Panel (right side of Studio). The card is the single source of truth for all deliverables — the job is only an execution tracker.

### 10.8 On Hold Status

`On Hold` is available on both Design and Production job pipelines as an escape valve. It is not a sequential pipeline step — it can be entered from any active status and exited back to the previous status. Used for genuine blockers: equipment issues, client holds, external dependencies.

### 10.9 Design Lead Dashboard

The Design Lead's default landing page. URL: `/design`

**Structure — same document-flow aesthetic as Admin Dashboard:**

**Section 1 — INCOMING** (jobs awaiting assignment)
New jobs not yet assigned. Each row:
- Job title + client chip + output type chip
- `ASAP` flag if urgent (red chip)
- `← View Card` link (opens parent card in Studio)
- `Assign →` button — opens quick-assign panel

**Section 2 — IN PROGRESS**
All active jobs. Each row:
- Job title + client chip + output type chip + designer avatar
- Internal due date — urgency colouring
- Job status chip

**Section 3 — PENDING CLIENT REVIEW**
Jobs waiting on client response (linked to a batch review in progress).

**Section 4 — TEAM WORKLOAD**
Every designer, their current job count, and a workload bar:
```
[Avatar]  Luna        ██████████  10 jobs
[Avatar]  Fiona       ████████░░   8 jobs
[Avatar]  Ayyim       ██████░░░░   6 jobs
```
Click a designer name → filtered view of only their jobs.

**Section 5 — RECENT ACTIVITY**
Feed of recent job movements across the design department.

**Filter bar:** Filter by Client / Output Type / Designer / Due Date / Status

### 10.10 Production Lead Dashboard

Same structure as Design Lead Dashboard but scoped to production. URL: `/production`

**Section 1 — INCOMING** (production jobs awaiting assignment)

**Section 2 — IN PROGRESS**
All active production jobs grouped by status (Pre-Production / Shooting / Editing).

**Section 3 — PENDING CLIENT REVIEW**

**Section 4 — TEAM WORKLOAD**
Shows Videographers and Editors separately:
```
VIDEOGRAPHERS
[Avatar]  Jack      ████████░░   8 shoots
[Avatar]  Erisha    ██████░░░░   6 shoots

EDITORS
[Avatar]  Tim       ████████░░   8 edits
[Avatar]  Asyraf    ██████░░░░   6 edits
```

**Section 5 — PRODUCTION SCHEDULE (Calendar)**
Dedicated calendar view showing shoot days. Each day cell shows who is shooting, which client/job, location. Toggle between List and Calendar views.

**Section 6 — RECENT ACTIVITY**

### 10.11 Job Detail View

Clicking any job opens the **Job Detail View** — a clean full-width panel.

**Left side (main content):**
- Job title (DM Serif Display, editable)
- Status badge (single dropdown — the job's own pipeline)
- Output type chip + Priority chip
- All job fields (assignees, dates, links, remarks) — inline editable
- Dates displayed in short format: `10 Apr` (not ISO format)
- `LINKS` section between dates and remarks: Brief/Deck Link + Asset Folder Link
- `Move to Status →` action

**Deliver to Card action:**
A prominent `Deliver to Card ↗` button in the actions area. Clicking it opens a mini-upload panel: paste a link (Figma, Google Drive, etc.) or drag-and-drop a file. The deliverable is pushed directly to the parent card's Visual Panel without the designer needing to navigate away. This eliminates the friction of having to leave the Job, open the Studio, upload there, come back. After delivery, the designer can immediately move the job to `Pending Internal Review`.

**Right side (slim):**
- Link back to parent card: `← View Card` (opens The Studio for the parent)
- Internal comments thread (team only — Lead ↔ IC conversation)
- Activity log: who changed what and when. Dates in short format: `10 Apr, 2:30pm`

**Context-aware navigation:** The breadcrumb and back navigation adapt based on where the user came from. If Luna navigated from the Design Lead Dashboard, `← Back` returns to `/design`. If Fiona navigated from My Work, `← Back` returns to `/my-work`. The `← View Card` link always opens the parent card's Studio regardless of navigation context.

### 10.12 Jobs in My Work

Individual Contributors see their assigned Jobs in My Work — grouped by the same urgency tiers (Overdue / Due Today / This Week / Coming Up).

Each job row shows: job title / client chip / output type chip / job status / internal due date / `Open Job →` link.

Jobs show output type instead of content format, and navigate to the Job Detail View rather than The Studio.

---

## 11. Type B Boards

Type B boards use the River View layout but with task cards instead of content cards. There is no Studio for Type B cards — clicking a card opens a **Task Detail Panel** instead.

### 11.0 Task Detail Panel (shared across all Type B boards)

Clicking a task card opens a right-side slide-in panel (40% width, `box-shadow: 0 8px 40px rgba(0,0,0,0.12)`, animation: `250ms cubic-bezier(0.4, 0, 0.2, 1)`).

The panel overlays the River View — the river dims slightly behind it (`opacity: 0.4` overlay). Click outside or press `Esc` to close.

**Panel layout (top to bottom):**

```
[× Close]                                         [top right]

[Task Title — DM Serif Display, large, inline-editable]

[Stage badge — dropdown]   [Priority chip: Normal / Urgent]

ASSIGNED TO
[Avatar picker — single or multi-select]

DUE DATE
[Date picker — urgency colouring same as cards]

CLIENT ACCOUNT                          PLATFORM
[Text or chip]                          [Text or chip — if applicable]

─────────────────────────────
TASK TYPE
[Chip — e.g. "Campaign Launch" / "Technical Fix" / "Blog Article"]

[Board-specific additional fields here]

NOTES
[Multi-line text area, inline-editable. Generous height.]

─────────────────────────────
CHECKLIST
[Checklist items — checkbox + label + optional assignee + optional due date]
[+ Add item] — dashed, inline

─────────────────────────────
LINKS
[URL fields — label + URL, clickable with external link icon]
[+ Add link]

─────────────────────────────
COMMENTS
[Internal comment thread — same design as Studio comments]
[Text input: "Add a comment..."]
```

Bottom bar (pinned): `Move to Stage →` (dropdown) + `Save`

### 11.1 Performance Board

Service type: `performance`

**River stages:**
```
Media Planning → Backlog → In Progress → Done
```

Stage descriptions:
- `Media Planning` — Budget allocation, channel planning, campaign structure. First step before any execution.
- `Backlog` — Tasks planned but not yet scheduled
- `In Progress` — Actively being worked on
- `Done` — Completed. Can be archived at month-end.

All Performance team members can create and move their own tasks freely.

**Task types:**

| Task Type | Chip Colour (bg / text) | Examples |
|---|---|---|
| Media Plan | `#FEF3C7` / `#92400E` | Monthly media plan, budget allocation, channel strategy |
| Campaign Launch | `#E6F1FB` / `#185FA5` | New campaign setup, audience build, creative upload |
| Optimisation | `#EAF3DE` / `#3B6D11` | Bid adjustments, audience refinements, A/B tests, budget reallocation |
| Budget & Pacing | `#FAEEDA` / `#633806` | Monthly budget setup, pacing checks, spend adjustments |
| Reporting | `#EEEDFE` / `#3C3489` | Monthly report, data pull, client performance call prep |
| Creative Request | `#FBEAF0` / `#993556` | Request new ad creatives from design, creative refresh |
| General | `#F4F3EF` / `#6B6860` | Anything else — account audits, platform setup, pixel checks |

**Task Detail Panel additional fields (Performance-specific):**
- `Platform` — dropdown: Meta / Google / TikTok / Shopee / Other
- `Campaign Name` — optional text field

**Media Plan task type additional fields:**
- `Total Budget (RM)` — currency field
- `Flight Dates` — date range picker (start / end)
- `Channel Split` — text field (e.g. "Meta 60% / Google 30% / TikTok 10%")

**Reports Tab:**
Add a `Reports` tab alongside the River View. Tab sits in the filter bar: `River | Reports`

Reports view shows monthly report cards, one per month per client:
- Period label (e.g. `March 2026`) — DM Serif Display
- Client name chip
- Status pill: `Draft` (grey) / `Shared` (blue) / `Viewed` (amber) / `Acknowledged` (green)
- `Share with Client →` button (generates magic link to branded report viewer)
- Report link field (URL to the actual report file)
- Notes field (optional)

`+ Add Report` at the top.

**Report viewer page (accessed via magic link):**
Same standalone page design as client review — no internal nav chrome. Oblique OS wordmark, client name + period, embedded report (iframe or link), `Acknowledge` button, reviewer name prompt on first open.

**Filter bar:** Assignee / Task Type / Platform / Due Date / Client (for admins) | Sort: Due Date / Stage / Created Date | View: River | Calendar | Reports

### 11.2 SEO Board

Service type: `seo`

**River stages:**
```
Backlog → This Month → In Progress → Done
```

Stage descriptions:
- `Backlog` — Tasks planned but not yet scheduled
- `This Month` — Scheduled for the current month, not yet started
- `In Progress` — Actively being worked on
- `Done` — Completed. Can be archived at month-end.

All SEO team members can create and move their own tasks freely.

**Task types:**

| Task Type | Chip Colour (bg / text) | Examples |
|---|---|---|
| Blog Article | `#E6F1FB` / `#185FA5` | Write, optimise, publish a blog post |
| Backlink Building | `#EAF3DE` / `#3B6D11` | Outreach, guest posts, directory submissions |
| Technical Fix | `#FAEEDA` / `#633806` | Site speed, crawl errors, schema markup, indexing |
| On-Page Optimisation | `#EEEDFE` / `#3C3489` | Meta tags, header structure, internal linking |
| Reporting | `#FBEAF0` / `#993556` | Monthly SEO report, ranking updates, traffic analysis |
| General | `#F4F3EF` / `#6B6860` | Keyword research, competitor analysis, strategy updates |

**Task Detail Panel additional fields (SEO-specific):**
- `Target URL` — the page being optimised (URL field)
- `Target Keywords` — comma-separated keywords (text field, muted styling)

**Reports Tab:** Same mechanic as Performance.

**Monthly Execution Checklist (pre-populated when task type = Reporting):**
- ☐ Blog articles published
- ☐ Backlinks acquired
- ☐ Technical fixes completed
- ☐ On-page optimisations done
- ☐ Monthly report drafted
- ☐ Report shared with client

Editable — user can add, remove, or rename items.

**Filter bar:** Assignee / Task Type / Due Date / Client (for admins) | Sort: Due Date / Stage / Created Date | View: River | Calendar | Reports

### 11.3 Web Development Board

Service type: `web`

**River stages:**
```
Wireframe → Homepage Design → Inner Pages → Development → QA & Testing → Live
```

Stage descriptions:
- `Wireframe` — Page structure and content layout planning
- `Homepage Design` — Visual design of homepage / landing page. **Design job auto-spawns** at this stage.
- `Inner Pages` — Design of inner pages (About, Services, Contact, etc.). **Design job auto-spawns** at this stage.
- `Development` — Building the pages/site
- `QA & Testing` — Team and client testing — responsive, links, forms, speed
- `Live` — Published and complete

**Note:** Landing Page tasks skip `Inner Pages` — they go directly from `Homepage Design` to `Development`.

**Review is an event, not a stage.** Between Homepage Design → Inner Pages and between Inner Pages → Development, the lead sends a batch review to the client via the same `Send for Review →` mechanic as Social/Ads boards. Client responds via magic link. Approved → task advances. Changes requested → task stays, `Changes Requested` flag applied. No separate review stages clutter the pipeline.

**Job spawning:** Web tasks spawn Design jobs at `Homepage Design` and `Inner Pages` stages. Same mechanic as Social/Ads — job auto-spawns, Design Lead assigns, designer executes.

**Task types:**

| Task Type | Chip Colour (bg / text) |
|---|---|
| Homepage | `#E6F1FB` / `#185FA5` |
| Inner Page | `#EAF3DE` / `#3B6D11` |
| Landing Page | `#FAEEDA` / `#633806` |
| E-Commerce | `#EEEDFE` / `#3C3489` |
| Bug Fix | `#FBEAF0` / `#993556` |
| General | `#F4F3EF` / `#6B6860` |

**Task Detail Panel additional fields (Web-specific):**
- `Design File` — URL to Figma/Canva design
- `Staging URL` — URL to the staging/preview site
- `Live URL` — URL to the production page (populated after go-live)

**QA Checklist (pre-populated at QA & Testing stage):**
- ☐ Desktop responsive
- ☐ Mobile responsive
- ☐ All links working
- ☐ Forms tested
- ☐ Page speed acceptable
- ☐ SEO meta tags set
- ☐ Analytics tracking live

**Client Review for Web:** Uses the Type B Deliverable Review Page (Section 11.5). Lead sends a batch review between design stages — same `Send for Review →` button appears on Web boards.

### 11.4 Branding Board

Service type: `branding`

**River stages:**
```
Mood Board → Logo Design → Identity Design → Collaterals → Brand Guidelines & FA
```

Stage descriptions:
- `Mood Board` — Visual direction, reference collection, style exploration. **Design job auto-spawns.**
- `Logo Design` — Logo concepts, iterations, final selection. **Design job auto-spawns.**
- `Identity Design` — Colour palette, typography, visual system. **Design job auto-spawns.**
- `Collaterals` — Business cards, letterhead, social templates, signage. **Design job auto-spawns.**
- `Brand Guidelines & FA` — Full brand book + final asset delivery. **Design job auto-spawns.**

**Job spawning:** Branding tasks spawn Design jobs at **every stage**. Same mechanic as Social/Ads — job auto-spawns when task enters a stage, Design Lead assigns, designer executes. Task cannot advance until the Design job for that stage is Closed.

**Task types:**

| Task Type | Chip Colour (bg / text) |
|---|---|
| Strategy | `#E6F1FB` / `#185FA5` |
| Visual Identity | `#EAF3DE` / `#3B6D11` |
| Guidelines Doc | `#FAEEDA` / `#633806` |
| Collateral | `#EEEDFE` / `#3C3489` |
| Presentation | `#FBEAF0` / `#993556` |
| General | `#F4F3EF` / `#6B6860` |

**Task Detail Panel additional fields (Branding-specific):**
- `Workshop Date` — date picker (for strategy tasks)
- `Document Link` — URL to the deliverable (Google Drive, Figma, PDF)
- `Presentation Link` — URL to the client presentation deck

**Client Review for Branding:** Uses the same batch review mechanic — adapted for deliverable approval. Lead can send a batch review at any stage (mood board approval, logo options approval, guidelines sign-off). Uses the Type B Deliverable Review Page (see Section 11.5).

### 11.5 Type B Deliverable Review Page (Client-Facing)

When a client opens a magic link for a Type B board review (Branding, Web), they see a dedicated deliverable review experience — different from the Type A content review page.

**Page header:**
- Oblique OS wordmark — small, top left, muted
- `[Client Name] — [Deliverable Type] Review` in DM Serif Display (e.g. "Company X — Logo Design Review")
- Subtext: `Prepared by Oblique · N items for review`
- Greeting: *"Hi [Client Name], here are your deliverables for review. Click each item to view, then approve or request changes."*
- Progress indicator: `0 of N reviewed`
- Reviewer name top right (from name prompt — same as Type A)

**Deliverable grid:**
Each deliverable is a card showing:
- Deliverable title (DM Serif Display)
- Brief description (from task notes field, truncated)
- Stage label (e.g. `Logo Design`, `Homepage Design`)
- Status pill: `Pending` → `Approved ✓` or `Changes Requested ✗`

Click a card → opens deliverable detail view:

**Deliverable detail view:**
- Left panel: task notes, any written brief or context from the Task Detail Panel's Notes field. Clean typography, read-only.
- Right panel: a prominent `View Deliverable →` button that opens the linked document (Figma, Google Drive, PDF) in a new tab or iframe embed where possible. If multiple links exist (Design File, Document Link, Presentation Link), each shown as a separate button.
- Below: general comment field — always visible, optional.
- Bottom action bar: `← Back` / `Request Changes` / `Approve ✓`

Same submission flow as Type A: after all items actioned → `Submit Review` → summary → confirmation → thank-you state. Link remains active for additional reviewers.

**Client Review for Web:** Same Type B Deliverable Review Page. Lead sends batch review between design stages (after Homepage Design, after Inner Pages). Client reviews the design files via the `View Deliverable →` links.

---

## 12. Cross-Client Views

### 12.1 My Work

Every team member's personal view. Accessible from top bar `My Work` link.

All cards and tasks assigned to the logged-in user, across all clients and boards.

**Grouped by urgency:**
- `OVERDUE` — red label
- `DUE TODAY` — amber label
- `THIS WEEK` — neutral
- `COMING UP` — muted

Each card shows: title / client chip / format chip / due date / status dot / `Changes Requested` chip if flagged.

Jobs appear alongside cards, showing output type instead of content format, and navigating to Job Detail View instead of Studio.

### 12.2 Admin Dashboard (`/dashboard`)

The Admin Dashboard is the master view across every client, department, and team member. Sean and Jun's landing page.

**Section 1 — AWAITING CLIENT RESPONSE** · count badge
All active batch reviews. Each row: client name + period + review type chip + reviewer status + days since sent (amber 5+, red 10+) + `View Batch →`.

**Section 2 — CHANGES REQUESTED** · count badge (red)
All cards with `Changes Requested` flag. Each row: card title + client chip + service chip + stage + red chip + assignee + `Open Card →`.

**Section 3 — OVERDUE** · count badge (red)
Overdue cards AND jobs. Each row: title + client chip + type chip (card/job) + due date in red + assignee + `Open →`.

**Section 4 — IN PRODUCTION** · count
Two sub-sections (DESIGN / PRODUCTION) with team workload bars.

**Section 5 — TEAM WORKLOAD** · all departments
All team members across all departments with workload bars.

**Section 6 — REPORTS SHARED BUT NOT ACKNOWLEDGED**

**Section 7 — RECENT ACTIVITY**
10 items. `View all →` link.

### 12.3 Smart Clients Home

The Clients Home page (Section 3.2) serves as the cross-client overview for lead-tier users with client assignments. Rather than a separate `/my-clients` route, the existing Clients Home is enhanced with live status signals and scoped to show only assigned clients for non-admin users.

See Section 3.2 for the full Smart Clients Home spec.

---

## 13. Search

Command palette style search, triggered by clicking the search icon OR pressing `Cmd+K` / `Ctrl+K`.

- Centred overlay, 480px wide
- Text input at top: `Search clients, cards, jobs...`
- Results grouped by type:
  - **Clients** — name match, shows client card with logo + services
  - **Cards** — title match, shows card title + client chip + stage + format chip
  - **Jobs** — title match, shows job title + client chip + department + status
- Max 5 results per group
- Click result → navigates to that client/card/job
- `Esc` or click outside to close

Searches `clients.name`, `cards.title`, and `jobs.title` fields. Full-text search is a V2 enhancement.

---

## 14. Notification System

### In-App (bell icon, top bar)

**Notification panel design:** Rows have two visual states:
- **Unread:** Faint `#F4F3EF` background tint + small blue dot indicator on the left
- **Read:** Standard white background, no dot

**Grouped notifications:** Notifications from the same event cluster are grouped into a single expandable row. Examples:
- `3 new design jobs from FlowerChimp` (instead of 3 separate "New design job" notifications)
- `Lily Tan submitted a review — 6 approved, 2 with changes` (already a natural group)
- `5 tasks overdue across 3 clients` (instead of 5 separate overdue alerts)

Click a grouped notification → expands to show individual items, each clickable to navigate.

**Card notifications:**
- Card assigned to you
- Card moved to a new stage
- Batch review submitted by client (with summary: N approved, N with changes)
- `Changes Requested` flag set on your card
- Comment added to your card
- Card overdue

**Job notifications:**
- New job created and assigned to you
- New job in queue for Design Lead or Production Lead (awaiting assignment)
- Job status changed by a team member
- Job marked `Pending Internal Review` (notifies Lead)
- Job overdue
- Job closed — parent card advanced (notifies lead who owns the card)
- **Cover Image job spawned** — notifies Design Lead when a Production job closes and a Cover Image design job is auto-created

### Email (Resend)

- Card or job assigned to you
- Client submitted batch review
- Card or job overdue (24hr warning)
- Report acknowledged by client
- Job marked Pending Internal Review (email to Lead)

---

## 15. Archive

Boolean `archived` flag on cards. Not a stage — a separate state.

- Admins and leads can bulk-select cards in `Posted` or `Done` stage and click `Archive Selected`
- Archived cards don't appear in River View, Calendar, or My Work
- Archived cards are still searchable and viewable if accessed directly
- A `Show Archived` toggle in the filter bar reveals them (greyed out styling)
- No automatic archiving in V1

---

## 16. Visual Design System

### Colour Palette

| Token | Value | Usage |
|---|---|---|
| `--bg-base` | `#FAFAF8` | Page background (warm white) |
| `--bg-card` | `#FFFFFF` | Card background |
| `--bg-subtle` | `#F4F3EF` | Stage headers, slide/scene blocks, unread notifications |
| `--border` | `#E8E6E0` | Borders (warm, not cold grey) |
| `--text-primary` | `#1A1916` | Primary text (warm near-black) |
| `--text-secondary` | `#6B6860` | Secondary / metadata text |
| `--text-tertiary` | `#A8A69F` | Placeholders, labels, disabled |
| `--accent` | `#1A1916` | Primary actions |
| `--accent-amber` | `#D97706` | Awaiting review, client feedback |
| `--accent-green` | `#16A34A` | Approved, posted, live |
| `--accent-red` | `#DC2626` | Overdue, changes requested |
| `--accent-blue` | `#2563EB` | In progress, internal comments |

### Format Chip Colours (Type A — Social / Ads)

| Format | Background | Text |
|---|---|---|
| Static Carousel | `#E6F1FB` | `#185FA5` |
| Single Image | `#F4F3EF` | `#6B6860` |
| Reel | `#EAF3DE` | `#3B6D11` |
| TikTok | `#FBEAF0` | `#993556` |
| Podcast | `#EEEDFE` | `#3C3489` |
| Street Interview | `#FAEEDA` | `#633806` |
| Other | `#F4F3EF` | `#6B6860` |

### Task Type Chip Colours (Type B boards)

See individual board specs in Section 11 for per-board task type colours. All Type B boards use a consistent palette mapped to their specific task types.

### Typography

- **Display / Headings / Card titles:** `DM Serif Display` — warm, editorial
- **Body / UI:** `DM Sans` — clean, readable
- **Labels / section headers:** `DM Sans`, small caps, `letter-spacing: 0.08em`, `#A8A69F`

### Elevation

- **Cards:** `box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)`. No hard border.
- **Overlays / panels:** `box-shadow: 0 8px 40px rgba(0,0,0,0.12)`

### Radius

Cards `12px` | Slide/Scene blocks `10px` | Buttons `8px` | Chips `999px` | Inputs `8px`

### Motion

- Page transitions: `200ms ease-out`
- Card hover: `translateY(-2px)` + shadow lift, `150ms ease`
- Comments sidebar: `250ms cubic-bezier(0.4, 0, 0.2, 1)`
- Batch Review panel: slides up from bottom, `200ms ease-out`
- Task Detail Panel: slides in from right, `250ms cubic-bezier(0.4, 0, 0.2, 1)`

---

## 17. Settings Page

URL: `/settings` — accessible from avatar dropdown menu. Admin only.

### Team Members

Table layout:

| Column | Content |
|---|---|
| Avatar | User avatar or initials circle |
| Name | Full name |
| Email | Email address |
| Role | Human-readable role label |
| Department | Department label |
| Status | `Active` green dot |

`+ Invite Member` button (top right): opens inline form with Name, Email, Role (dropdown), Department (auto-filled from role), `Send Invite` button.

Each row has `···` menu on hover: `Edit Role` / `Remove Member`.

### Client Management

Below Team section. Shows all clients with: client name + logo, active services chips, created by + created date, `Archive` action (greyed out in V1 — "Coming soon" tooltip).

---

## 18. Data Model

| Object | Key Fields |
|---|---|
| **User** | name, email, role, avatar, department, tier (admin/lead/contributor) |
| **Client** | name, logo, industry, contact_name, contact_email, brief_link, created_by |
| **ClientService** | client_id, service_type, is_active, assigned_users[] |
| **Board** | client_id, service_type, board_type (creative / task) |
| **Card** | board_id, stage_id, title, format, pillar, language, posting_date, assigned_to[], changes_requested (bool), awaiting_review (bool), archived (bool), created_by |
| **CardContent** | card_id, format_type, concept, slide_blocks (JSONB), scene_blocks (JSONB), headline, body_copy, caption, hashtags, production_notes, content_type ('evergreen'/'campaign' — ads only), campaign_name, landing_url, cta_text, ad_objective, platform, placement (text[]) |
| **CardAttachment** | card_id, label, url, media_type (image/video/figma/doc), type (design/footage/doc/ref) |
| **CardComment** | card_id, user_id, text, timestamp, type (internal/client), reviewer_name, reviewer_role, round_number |
| **CardActivity** | card_id, user_id, action, from_stage, to_stage, timestamp |
| **Job** | card_id, department (design/production), title, output_type, priority (normal/asap), status, due_date_internal, due_date_client, brief_link, asset_folder_link, remarks, is_cover_image (bool), parent_job_id (nullable — references Production job that triggered Cover Image), created_by, closed_at |
| **JobAssignee** | job_id, user_id, role_on_job (designer/videographer/editor/lead) |
| **JobComment** | job_id, user_id, text, timestamp |
| **JobActivity** | job_id, user_id, action, from_status, to_status, timestamp |
| **ShootSchedule** | job_id, shoot_date, location, videographer_ids[], notes |
| **BatchReview** | client_id, board_id, type (ideation/final), period, card_ids[], magic_token, expires_at, status (active/closed), round_number |
| **ReviewSession** | batch_review_id, reviewer_name, reviewer_role, started_at, submitted_at, progress |
| **ReviewResponse** | batch_review_id, review_session_id, card_id, decision (approved/changes), general_comment, round_number |
| **ReviewAnnotation** | review_response_id, card_id, type (pin/timestamp), text, x_pos, y_pos, timestamp_seconds, reviewer_name |
| **ReportShare** | client_id, service_type, period, report_link, magic_token, status (draft/shared/viewed/acknowledged) |
| **Notification** | user_id, type, message, link, read (bool), timestamp |
| **Checklist** | card_id, items (JSONB: [{label, done, assigned_to, due_date}]) |

---

## 19. Build Plan

### V1 — Full Platform (Weeks 1–18)

| Phase | Scope | Timeline |
|---|---|---|
| 1. Foundation | Supabase setup, Next.js 14 scaffold, auth, role-based access (3 tiers), client layer, service selection, board auto-creation | Wks 1–2 |
| 2. River View Engine | River View, stage grouping, card CRUD, format chips, status dot logic, `Changes Requested` flag, filtering/sorting | Wks 3–4 |
| 3. Studio — Social | Format selection on card create, full field structs (Single Image / Carousel / Video), stage badge, comments sidebar, card activity log | Wks 5–6 |
| 4. Job System | Job auto-spawn on In Design / In Production, two-job cascade for video cards, cover image auto-spawn, Job fields (design + production), Job status pipelines (with On Hold), Design Lead Dashboard, Production Lead Dashboard, Production Schedule calendar, Job Detail View, Jobs in My Work | Wks 7–9 |
| 5. Batch Review System | Batch Review panel, magic link generation, client review page, name prompt, multi-reviewer, video player + timestamp comments, image pin annotations, auto-advance on approval | Wks 10–11 |
| 6. Notifications + Admin Dashboard + Smart Clients Home | In-app + email notifications (cards + jobs + cover image spawn), Admin Dashboard (master view), Smart Clients Home (pipeline pulse, attention signals, urgency sorting), overdue logic | Wks 12–13 |
| 7. Ads Workflow | Ads-specific field swap in Studio (Static / Video / Carousel), Content Type / Campaign Name / Landing URL / CTA / Placement / Ad Objective fields, Go Live stage | Wk 14 |
| 8. Type B Boards | Performance (with Media Planning stage + Reports tab), SEO (with Reports tab), Web Development (with design job spawning at Homepage Design + Inner Pages), Branding (with design job spawning at every stage), Task Detail Panel, Settings page | Wks 15–17 |
| 9. Search + Archive + Polish | Command palette search (Cmd+K), archive workflow, empty states, error states, loading skeletons | Wk 18 |

### V2 — Extensions

Dark mode / Mobile / Integrations (Slack, Google Calendar, Meta API) / Advanced analytics / Full-text search.

---

## 20. Open Questions

| Question | Status | Decision |
|---|---|---|
| Content card fields | Resolved | Full field spec per format in Section 6.3 |
| Single vs separate boards | Resolved | Single board, unified card |
| Client permission model | Resolved | Magic links only, no client login |
| File storage | Resolved | External links |
| App name | Resolved | Oblique OS |
| Notifications | Resolved | In-app + email — cards and jobs |
| Report sharing | Resolved | Magic link to branded viewer |
| Navigation | Resolved | No sidebar. Top bar only. |
| Board view | Resolved | River View. No Kanban. |
| Card detail | Resolved | Full-page Studio (Type A) / Task Detail Panel (Type B) |
| Design language | Resolved | Craft-inspired. Warm whites, DM Serif Display, soft shadows. |
| Stage system | Resolved | Single stage badge. `Changes Requested` is the only flag. |
| Client review — all specs | Resolved | Board-level batch, magic links, multi-reviewer, multi-round. |
| Role structure | Resolved | Three tiers. Account Manager removed. Social & Campaigns Manager + Creative Strategist Lead added. |
| Job system | Resolved | Job auto-spawns from card stage transitions only. Never manually created. |
| Two-job video rule | Resolved | Production job first, Cover Image design job auto-spawns on Production close. |
| Final delivery | Resolved | No separate field. Delivered file goes to parent card's Visual Panel. |
| Job creation ownership | Resolved | Project managers own card movement. Leads assign jobs. ICs execute. |
| Type B board spec | Resolved | Full specs in Section 11. |
| Ads field spec | Resolved | Full spec in Section 6.3. |
| Brand colours | Resolved | Warm neutral system in Section 16. |
| Client Portfolio Dashboard | Resolved | Killed. Replaced with Smart Clients Home (enhanced cards on existing Clients Home page). |
| Web/Branding job spawning | Resolved | Both spawn Design jobs at design-dependent stages, same mechanic as Social/Ads. |
| Performance Media Planning | Resolved | Media Planning added as first stage in Performance board. |
| Performance/SEO Review stage | Resolved | Removed. ICs move their own tasks. Stages simplified to 4 (Performance) and 4 (SEO). |
| Web review stages | Resolved | Removed as stages. Review is an event (batch review magic link). |
| Type B permissions | Resolved | All ICs on Type B boards can create and move their own tasks. |
| Type B deliverable review | Resolved | Dedicated review page variant with `View Deliverable →` buttons and task context. |
| Grouped notifications | Resolved | Same-event notifications grouped into expandable rows. V1. |
| Calendar for all boards | Resolved | Type A = posting dates. Type B = due dates. All boards have Calendar view. |
| Deliver to Card action | Resolved | Designers/editors can push deliverables to parent card's Visual Panel directly from Job Detail View. |
| Mobile | Pending | Desktop-first V1. Mobile in V2. |
| Domain | Pending | os.oblique.com.my? |
| Integrations | Pending | V2. |
