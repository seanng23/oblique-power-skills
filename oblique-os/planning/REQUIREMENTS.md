# Requirements: Oblique OS

**Defined:** 2026-04-09
**Core Value:** Every piece of client work flows through the system from brief to delivery without anyone needing to create a deck, send a WhatsApp message, or ask "where is this at?"

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation & Auth

- [x] **AUTH-01**: User can sign in with email and password via Supabase Auth
- [x] **AUTH-02**: User session persists across browser refresh and page navigation
- [x] **AUTH-03**: Unauthenticated users are redirected to login page
- [x] **AUTH-04**: User is redirected to role-appropriate landing page after login (Admin → /dashboard, Design Lead → /design, Production Lead → /production, SCM/CSL → /clients, IC → /my-work)
- [x] **AUTH-05**: Admin can create and manage user accounts with role, department, and tier

### Client Management

- [x] **CLNT-01**: Admin can create a client with name, logo, industry, contact details, and brief link
- [x] **CLNT-02**: Admin can activate services for a client (social, ads, performance, seo, web, branding)
- [x] **CLNT-03**: Board is auto-created when a service is activated (creative type for social/ads, task type for others)
- [x] **CLNT-04**: Admin can assign users to client services
- [x] **CLNT-05**: Clients Home displays a card grid of all clients with logo, name, industry, and active services

### River View

- [x] **RIVR-01**: River View displays cards grouped by stage in a single-column document flow
- [x] **RIVR-02**: Stage dividers show stage name in small caps, card count, and `+ Add Card` button
- [x] **RIVR-03**: Empty stages are collapsed by default with divider still visible
- [x] **RIVR-04**: Cards display title (DM Serif Display), format chip, due date, assignee avatars, and status dot
- [x] **RIVR-05**: Status dot colour is auto-derived from card stage (grey/blue/green/amber/red)
- [x] **RIVR-06**: Changes Requested flag displays as a red chip on flagged cards
- [x] **RIVR-07**: Filter bar supports filtering by assignee, format/task type, and due date
- [x] **RIVR-08**: Sort options include due date (default), stage, and created date
- [x] **RIVR-09**: View toggle switches between River and Calendar (and Reports for Performance/SEO)
- [x] **RIVR-10**: `+ Add Card` creates a card pre-assigned to that stage

### Card System

- [x] **CARD-01**: Admins and lead-tier users can create cards with title, format, pillar, language, posting date, and assignees
- [x] **CARD-02**: Cards store stage as text validated per board service type
- [x] **CARD-03**: Stage is changed from inside the card via a dropdown (not drag-and-drop)
- [x] **CARD-04**: Designers, videographers, and editors cannot create cards or move cards between stages (Type A)
- [x] **CARD-05**: All ICs on Type B boards can create tasks and move their own tasks between stages
- [x] **CARD-06**: Card has an awaiting_review boolean that shows amber indicator when batch review is sent
- [x] **CARD-07**: Changes Requested flag is cleared when card moves forward to a new stage

### Studio (Type A)

- [x] **STUD-01**: Clicking a Type A card opens a full-page Studio with 55/45 split layout
- [x] **STUD-02**: Studio displays breadcrumb navigation (← Client / Service) with prev/next arrows
- [x] **STUD-03**: Studio shows stage badge (clickable dropdown with all stages)
- [x] **STUD-04**: Format selection on card create determines field structure in Studio
- [x] **STUD-05**: Single Image format shows: concept, headline, body copy, caption, hashtags
- [x] **STUD-06**: Carousel format shows: concept, slide blocks (JSONB — add/remove/reorder slides), caption, hashtags
- [x] **STUD-07**: Video format (Reel/TikTok/Podcast/Street Interview) shows: concept, scene blocks (JSONB), caption, hashtags, production notes
- [x] **STUD-08**: Visual Panel (right side) displays card attachments with label, media type, and sort order
- [x] **STUD-09**: Comments sidebar slides in from right when toggled (250ms cubic-bezier transition)
- [x] **STUD-10**: Comments support internal and client types with reviewer name attribution
- [x] **STUD-11**: Card activity log shows stage changes with user, from/to stage, and timestamp
- [x] **STUD-12**: JOBS panel in Studio shows linked jobs and their current status
- [x] **STUD-13**: Breadcrumb adapts based on navigation source (dashboard vs River View)

### Job System

- [x] **JOBS-01**: Design job auto-spawns when a card enters In Design stage (via Supabase trigger or server action)
- [x] **JOBS-02**: Production job auto-spawns when a card enters In Production stage
- [x] **JOBS-03**: Video format cards spawn two sequential jobs: Production first, then Cover Image Design when Production closes
- [x] **JOBS-04**: Cover Image design job has is_cover_image=true and parent_job_id referencing the Production job
- [x] **JOBS-05**: Card cannot advance past In Design/In Production until all active jobs are Closed
- [x] **JOBS-06**: Design job status pipeline: To Brief → In Progress → On Hold → Pending Internal Review → Pending Client Review → Closed
- [x] **JOBS-07**: Production job status pipeline: To Brief → Pre-Production → Shooting → Editing → On Hold → Pending Internal Review → Pending Client Review → Closed
- [x] **JOBS-08**: Design Lead Dashboard shows incoming design jobs queue, workload bars per designer, and assignment interface
- [x] **JOBS-09**: Production Lead Dashboard shows incoming production jobs, shoot schedule, and team workload
- [x] **JOBS-10**: Job Detail View displays all job fields, assignees, comments, activity log, and Deliver to Card action
- [x] **JOBS-11**: Deliver to Card action pushes a deliverable (URL/attachment) to parent card's Visual Panel without navigating away
- [x] **JOBS-12**: Jobs appear in My Work for assigned contributors
- [x] **JOBS-13**: Web Development tasks spawn Design jobs at homepage_design and inner_pages stages
- [x] **JOBS-14**: Branding tasks spawn Design jobs at every stage transition

### Batch Review

- [x] **REVW-01**: Send for Review button in filter bar opens Batch Review panel (board-level action, not card-level)
- [x] **REVW-02**: Batch Review panel allows selecting review type (ideation/final), period, and cards to include
- [x] **REVW-03**: Generate Link creates a magic token (128-bit, expires after 14 days) stored in batch_reviews table
- [x] **REVW-04**: Client review page (public, no auth) validates token server-side and shows card grid
- [x] **REVW-05**: Name prompt on first open captures reviewer name and optional role
- [x] **REVW-06**: Client can approve or request changes per card with general comment
- [x] **REVW-07**: Image pin annotations store x/y position and text, displayed as overlay dots
- [x] **REVW-08**: Video timestamp comments store timestamp_seconds, player syncs to annotation on click
- [x] **REVW-09**: Multiple reviewers can use the same link independently (separate ReviewSession per reviewer)
- [x] **REVW-10**: Multi-round support — subsequent reviews increment round_number
- [x] **REVW-11**: Approved cards auto-advance to next stage; cards with changes get Changes Requested flag
- [x] **REVW-12**: Send for Review present on Social, Ads, Web, and Branding boards (not Performance/SEO)
- [x] **REVW-13**: Type B Deliverable Review Page variant for Web and Branding (View Deliverable links)

### Notifications

- [x] **NOTF-01**: In-app notification panel slides down from bell icon with grouped notification rows
- [x] **NOTF-02**: Unread notifications have blue dot and subtle background; read notifications are plain
- [x] **NOTF-03**: Same-event notifications group into one expandable row
- [x] **NOTF-04**: Notification bell shows unread count badge
- [x] **NOTF-05**: Email notifications sent via Resend for: job assignments, review submissions, changes requested, overdue items
- [x] **NOTF-06**: Cover Image design job spawning triggers notification to Design Lead

### Admin Dashboard

- [x] **ADMN-01**: Admin Dashboard shows batch reviews awaiting client response across all clients
- [x] **ADMN-02**: Dashboard shows cards with Changes Requested flag across all clients
- [x] **ADMN-03**: Dashboard shows overdue tasks (cards and jobs) with urgency sorting
- [x] **ADMN-04**: Dashboard shows team workload summary across all departments
- [x] **ADMN-05**: Dashboard content is max-width 720px centred with flat row layout separated by warm borders

### Smart Clients Home

- [x] **SMRT-01**: Each client card shows pipeline pulse: N in progress, N in review, N overdue
- [x] **SMRT-02**: Attention signals: Changes Requested (red) or Awaiting Review (amber) displayed when applicable
- [x] **SMRT-03**: Next deadline shown per client (earliest upcoming due date)
- [x] **SMRT-04**: Clients sorted by: overdue first, pending reviews second, then alphabetical
- [x] **SMRT-05**: SCM and CSL see only their assigned clients

### My Work

- [x] **MYWK-01**: My Work page shows all cards and tasks assigned to the logged-in user across all clients
- [x] **MYWK-02**: Grouped by urgency: Overdue (red), Due Today (amber), This Week (neutral), Coming Up (muted)
- [x] **MYWK-03**: Each card shows title, client chip, format chip, due date, status dot, and Changes Requested flag

### Ads Workflow

- [x] **ADS-01**: Ads boards use stages: Concept Planning → Copy/Brief → In Design → In Production → In Review → Go Live → Live
- [x] **ADS-02**: Studio field sets swap for Ads: Content Type (evergreen/campaign), Campaign Name, Landing URL, CTA text, Ad Objective, Placement
- [x] **ADS-03**: Ads formats: Static, Video, Carousel — each with appropriate field structure

### Type B Boards

- [ ] **TYPB-01**: Task Detail Panel (40% viewport, right-aligned overlay) opens when clicking a Type B card
- [ ] **TYPB-02**: Performance board stages: Media Planning → Backlog → In Progress → Done
- [ ] **TYPB-03**: Performance board has platform chip (Meta/Google/TikTok/Shopee), Media Plan task type with budget/flight/channel fields
- [ ] **TYPB-04**: SEO board stages: Backlog → This Month → In Progress → Done
- [x] **TYPB-05**: SEO board has target URL and target keywords fields, monthly execution checklist for Reporting tasks
- [ ] **TYPB-06**: Web Development board stages: Wireframe → Homepage Design → Inner Pages → Development → QA & Testing → Live
- [ ] **TYPB-07**: Web board review is an event (not a stage) — batch review fired between design stages
- [ ] **TYPB-08**: Branding board stages: Mood Board → Logo Design → Identity Design → Collaterals → Brand Guidelines & FA
- [x] **TYPB-09**: Reports tab on Performance and SEO boards showing monthly report cards with Share with Client action
- [x] **TYPB-10**: Report viewer page (public, magic link) with Oblique OS wordmark, embedded report, and Acknowledge button

### Performance + SEO Rework

- [x] **PERFSEO-01**: Performance and SEO boards group cards by priority (High / Medium / Low) with collapsible sections matching River View rhythm; within each group cards sort by `completed_at DESC NULLS FIRST, due_date ASC NULLS LAST, created_at DESC`
- [x] **PERFSEO-02**: Each card has a status chip (Not Started / WIP / Done / On Hold) in both card row and Task Detail Panel; flipping to Done sets `completed_at = now()`, flipping away clears it; Done cards linger 7 days then auto-archive lazily on board load
- [x] **PERFSEO-03**: Performance board has a channel field (Meta / Search / PMAX / TikTok / Shopee / Ad Hoc) with colored chip on card row and in Task Detail Panel; campaign fields (total_budget / flight_start / flight_end / channel_split) removed from Performance Task Detail Panel
- [x] **PERFSEO-04**: `/performance` and `/seo` top-level lead dashboards exist mirroring `/design` and `/production`; show all tasks across all clients grouped by status (WIP → On Hold → Not Started → Done); filterable by assignee / client / priority / status / due date; row click opens `?panel={cardId}`; accessible to users in the respective department or tier=admin
- [x] **PERFSEO-05**: Contributor-tier users in the `performance` or `seo` department can create and assign tasks on Performance/SEO boards (RLS INSERT policy added for task boards); existing Performance seed cards deleted in migration; SEO cards backfilled with `priority='medium', status='not_started'`; D-05 NOT NULL priority for perf/seo cards enforced via CHECK constraint

### Settings

- [x] **SETT-01**: Settings page (Admin only) for managing team members and client list

### Calendar View

- [x] **CALV-01**: Calendar View available on all boards, toggled from filter bar
- [x] **CALV-02**: Type A boards map by posting date; Type B boards map by due date
- [x] **CALV-03**: Monthly grid with card tiles colour-coded by format (left edge colour matching format chip)
- [x] **CALV-04**: Unscheduled sidebar shows cards without dates, draggable onto calendar
- [x] **CALV-05**: Drag card between dates to reschedule
- [x] **CALV-06**: Click empty date cell to quick-create a card with that date pre-filled

### Search & Archive

- [x] **SRCH-01**: Command palette (Cmd+K) searches across clients, cards, and jobs
- [x] **SRCH-02**: Results grouped by type with keyboard navigation
- [x] **ARCH-01**: Cards have boolean archived flag; archived cards hidden by default with filter toggle to show
- [x] **ARCH-02**: Bulk archive action available to Admins and Leads

### Design System Compliance

- [x] **DSGN-01**: Page backgrounds use #FAFAF8 (warm white), card surfaces use #FFFFFF
- [x] **DSGN-02**: All borders use #E8E6E0 (warm grey), never Tailwind default grey
- [x] **DSGN-03**: DM Serif Display for all headings/titles, DM Sans for all body/UI/buttons
- [x] **DSGN-04**: Cards use box-shadow (not borders) with 12px border-radius
- [x] **DSGN-05**: Chips use 999px border-radius (fully rounded)
- [x] **DSGN-06**: All dates in UI use short format (10 Apr or 10 Apr, 2:30pm), never ISO
- [x] **DSGN-07**: No left sidebar — top bar navigation only
- [x] **DSGN-08**: Top bar: 56px height, white background, warm border bottom, wordmark left, utilities right

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Mobile & Dark Mode

- **MOBL-01**: Responsive mobile layouts for all pages
- **DARK-01**: Dark mode theme toggle

### Integrations

- **INTG-01**: Slack integration for notifications
- **INTG-02**: Google Calendar sync for posting dates and shoot schedules
- **INTG-03**: Meta API integration for ad publishing
- **INTG-04**: Full-text search across card content (JSONB fields)

### Advanced Features

- **ADVN-01**: OAuth login (Google, Microsoft)
- **ADVN-02**: Advanced analytics and reporting dashboard
- **ADVN-03**: Client portal with persistent login

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Kanban board | Wrong mental model for creative content — River View is the chosen paradigm |
| Left sidebar navigation | Design decision — top bar only, matches editorial aesthetic |
| Manual job creation | Workflow enforcement — jobs auto-spawn from stage transitions only |
| Client login / accounts | Magic links replace client auth — no friction, no support burden |
| File uploads (general) | External links only — agencies already have Google Drive/Figma/Dropbox |
| Configurable workspaces | This is Oblique's tool, not a SaaS product |
| Drag-and-drop stage changes | Stage changes are deliberate — dropdown inside card only |
| Time tracking / billable hours | Different PM paradigm — not part of Oblique's workflow |
| Gantt charts | Calendar View + My Work urgency grouping covers deadline visibility |
| CRM features | Clients Home is an internal roster, not a CRM |
| Auto-archive | Archive is manual bulk action only — no surprising silent cleanup |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-01 to AUTH-05 | Phase 1 | Complete |
| CLNT-01 to CLNT-05 | Phase 1 | Complete |
| DSGN-01 to DSGN-08 | Phase 1 (established) + All Phases | Phase 1: Complete |
| RIVR-01 to RIVR-10 | Phase 2 | Pending |
| CARD-01 to CARD-07 | Phase 2 | Pending |
| STUD-01 to STUD-11, STUD-13 | Phase 3 | Pending |
| STUD-12 | Phase 4 | Complete |
| JOBS-01 to JOBS-14 | Phase 4 | Pending |
| MYWK-01 to MYWK-03 | Phase 4 | Pending |
| REVW-01 to REVW-13 | Phase 5 | Pending |
| NOTF-01 to NOTF-06 | Phase 6 | Pending |
| ADMN-01 to ADMN-05 | Phase 6 | Pending |
| SMRT-01 to SMRT-05 | Phase 6 | Pending |
| ADS-01 to ADS-03 | Phase 7 | Pending |
| TYPB-01 to TYPB-10 | Phase 8 | Pending |
| SETT-01 | Phase 8 | Complete |
| CALV-01 to CALV-06 | Phase 9 | Complete |
| SRCH-01 to SRCH-02 | Phase 9 | Pending |
| ARCH-01 to ARCH-02 | Phase 9 | Pending |
| PERFSEO-01 to PERFSEO-05 | Phase 10 | Pending |

**Coverage:**
- v1 requirements: 102 total
- Mapped to phases: 102
- Unmapped: 0
- Phase 1 complete: 18 requirements (AUTH-01 to AUTH-05, CLNT-01 to CLNT-05, DSGN-01 to DSGN-08)

---
*Requirements defined: 2026-04-09*
*Last updated: 2026-04-19 — PERFSEO-01 to PERFSEO-05 added for Phase 10*
