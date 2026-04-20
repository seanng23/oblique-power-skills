# Roadmap: Oblique OS

## Overview

Oblique OS replaces PowerPoint decks, WhatsApp threads, and email-based client review with a single purpose-built platform. The build follows a strict dependency chain: auth and schema must precede client/board creation, which must precede the River View, which must precede the Studio, which must precede jobs, which must precede batch review. Phases 1-4 close the internal production pipeline so the team can use the system for department handoffs before client-facing features (Phase 5+) go live. Phase 1 is already complete.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Supabase schema, RLS, auth middleware, client CRUD, Clients Home
- [x] **Phase 2: River View Engine** - Primary board interface: stage-grouped card list, card CRUD, filter bar (completed 2026-04-09)
- [x] **Phase 3: Studio** - Full-page Type A card editor with format-aware fields, comments, activity (completed 2026-04-10)
- [x] **Phase 4: Job System** - Auto-spawn triggers, two-job video cascade, lead dashboards, My Work (completed 2026-04-10)
- [x] **Phase 5: Batch Review** - Magic-link client review, annotations, multi-reviewer, auto-advance (completed 2026-04-11)
- [x] **Phase 6: Notifications + Dashboards** - In-app notifications, email, Admin Dashboard, Smart Clients Home (completed 2026-04-12)
- [x] **Phase 7: Ads Workflow** - Ads-specific field sets and Go Live stage in Studio (completed 2026-04-12)
- [ ] **Phase 8: Type B Boards** - Performance, SEO, Web, Branding boards with Task Detail Panel
- [x] **Phase 10: Performance + SEO Rework** - Reconceptualize Performance and SEO boards around priority-grouped tasks (not stage pipelines) with `/performance` and `/seo` lead dashboards (completed 2026-04-19)
- [ ] **Phase 9: Calendar + Search + Archive** - Calendar View, Cmd+K command palette, archive, polish

## Phase Details

### Phase 1: Foundation
**Goal**: The system infrastructure, data model, and client roster are in place so all feature work can build on a correct foundation
**Depends on**: Nothing (first phase)
**Requirements**: AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05, CLNT-01, CLNT-02, CLNT-03, CLNT-04, CLNT-05, DSGN-01, DSGN-02, DSGN-03, DSGN-04, DSGN-05, DSGN-06, DSGN-07, DSGN-08
**Success Criteria** (what must be TRUE):
  1. User can sign in with email/password and is redirected to the correct role-based landing page
  2. Unauthenticated users are redirected to login from any protected route
  3. Admin can create a client, activate services, and see the client appear in the card grid on Clients Home
  4. Boards are auto-created when a service is activated (one board per service per client)
  5. The UI matches the design system: #FAFAF8 backgrounds, #E8E6E0 borders, DM Serif Display headings, card box-shadows
**Plans**: Complete

Plans:
- [x] 01-01: Supabase schema, RLS policies, auth middleware, role-based routing
- [x] 01-02: Client CRUD, service activation, board auto-creation, Clients Home page

### Phase 2: River View Engine
**Goal**: The primary daily interface exists — any board can be opened and its cards are displayed in a stage-grouped document flow with full filtering and card creation
**Depends on**: Phase 1
**Requirements**: RIVR-01, RIVR-02, RIVR-03, RIVR-04, RIVR-05, RIVR-06, RIVR-07, RIVR-08, RIVR-09, RIVR-10, CARD-01, CARD-02, CARD-03, CARD-04, CARD-05, CARD-06, CARD-07
**Success Criteria** (what must be TRUE):
  1. Opening a client service board shows cards grouped by stage in a single-column flow with stage dividers showing card count and an Add Card button
  2. A new card can be created with title, format, pillar, language, posting date, and assignees; it appears immediately under the correct stage
  3. Stage can be changed from inside the card via a dropdown; the card moves to the new stage group without a full page reload
  4. Cards display title, format chip, due date, assignee avatars, status dot (colour auto-derived from stage), and Changes Requested flag when applicable
  5. Filter bar narrows cards by assignee, format, or due date; view toggle switches between River and Calendar
**Plans**: 3 plans

Plans:
- [x] 02-01-PLAN.md — Test infrastructure, utility functions, and card Server Actions
- [x] 02-02-PLAN.md — Board page RSC, RiverView component, CardRow, StageDivider, QuickCreate
- [x] 02-03-PLAN.md — Filter bar, stage dropdown, placeholder Studio, top nav transformation

### Phase 3: Studio
**Goal**: Clicking any Type A card opens a full-page editing surface where all content fields, comments, and activity history are accessible in a structured layout
**Depends on**: Phase 2
**Requirements**: STUD-01, STUD-02, STUD-03, STUD-04, STUD-05, STUD-06, STUD-07, STUD-08, STUD-09, STUD-10, STUD-11, STUD-13
**Success Criteria** (what must be TRUE):
  1. Clicking a Type A card navigates to a full-page Studio with 55/45 split layout, breadcrumb, and prev/next card arrows
  2. Format selection on card create determines which field set renders: Single Image fields, Carousel slide blocks (JSONB), or Video scene blocks (JSONB) with production notes
  3. The Visual Panel on the right displays card attachments with label, media type, and sort order
  4. Comments sidebar slides in when toggled (250ms transition) showing internal and client comments with reviewer name attribution
  5. Card activity log shows stage changes with user, from/to stage, and timestamp; JOBS panel layout structure is present (job rows added in Phase 4)
**Plans**: 4 plans

Plans:
- [x] 03-00-PLAN.md — Wave 0: Test stubs and test script for Nyquist compliance
- [x] 03-01-PLAN.md — Schema migration, Server Actions (including addAttachment), QuickCreateForm format selection
- [x] 03-02-PLAN.md — Studio page RSC, client shell with 55/45 layout, header row, Content Canvas with format field sets
- [x] 03-03-PLAN.md — Visual Panel, Comments Sidebar, Activity Log, card highlight on return

### Phase 4: Job System
**Goal**: Design and production handoffs are fully automated — stage transitions spawn jobs without manual action, lead dashboards show the queue, and contributors see their work in My Work
**Depends on**: Phase 3
**Requirements**: STUD-12, JOBS-01, JOBS-02, JOBS-03, JOBS-04, JOBS-05, JOBS-06, JOBS-07, JOBS-08, JOBS-09, JOBS-10, JOBS-11, JOBS-12, JOBS-13, JOBS-14, MYWK-01, MYWK-02, MYWK-03
**Success Criteria** (what must be TRUE):
  1. Moving a Social card to In Design auto-spawns a Design job; moving to In Production auto-spawns a Production job — no manual action required
  2. Closing a Production job on a video format card automatically spawns a Cover Image Design job (is_cover_image=true); card cannot advance past In Production until the Cover Image job is also Closed
  3. Design Lead Dashboard shows incoming design jobs queue with assignee workload bars and an interface to assign jobs to designers
  4. Production Lead Dashboard shows incoming production jobs, shoot schedule calendar, and team workload
  5. My Work page groups the logged-in user's cards and jobs by urgency (Overdue, Due Today, This Week, Coming Up)
  6. JOBS panel in Studio shows linked jobs and their current status (STUD-12)
**Plans**: 10 plans

Plans:
- [x] 04-01-PLAN.md — Job Server Actions: auto-spawn logic, blocking, cover image cascade, CRUD actions, type constants, utilities
- [x] 04-02-PLAN.md — Stage blocking UI (toast + lock icon) and Studio JOBS panel with real job rows
- [x] 04-03-PLAN.md — Job Detail View with status dropdown, inline-editable fields, Deliver to Card, comments
- [x] 04-04-PLAN.md — Shared components (JobRow, WorkloadBar, AssignPanel) and Design Lead Dashboard
- [x] 04-05-PLAN.md — Production Lead Dashboard with sub-grouped IN PROGRESS and Production Schedule calendar
- [x] 04-06-PLAN.md — My Work page with urgency-grouped cards and jobs
- [x] 04-07-PLAN.md — Gap closure: Supabase enum migration + TypeScript type updates for format rework
- [x] 04-08-PLAN.md — Gap closure: Studio content canvas field sets for new formats (Reel hooks, AI Video, Podcast, Street Interview, UGC)
- [x] 04-09-PLAN.md — Gap closure: Format chip/filter/quick-create UI updates + UGC job spawn logic
- [x] 04-10-PLAN.md — Gap closure: UGC Brief export system (table, server actions, public page, Studio integration)

### Phase 5: Batch Review
**Goal**: Client review of creative work is done via a public magic link — clients can approve or request changes per card with pin annotations and video timestamp comments, and decisions auto-update card status
**Depends on**: Phase 4
**Requirements**: REVW-01, REVW-02, REVW-03, REVW-04, REVW-05, REVW-06, REVW-07, REVW-08, REVW-09, REVW-10, REVW-11, REVW-12, REVW-13
**Success Criteria** (what must be TRUE):
  1. Admin or lead can open a Batch Review panel from the filter bar, select cards and review type, and generate a shareable magic link that expires after 14 days
  2. Opening the review link (no auth required) shows a name prompt on first visit, then a card grid of the selected batch
  3. Client can approve or request changes per card with a comment; image cards support pin annotations (x/y dot overlays); video cards support timestamp comments that jump the player to the marked moment
  4. Multiple people using the same link each get their own independent ReviewSession; subsequent reviews increment the round number
  5. Approved cards auto-advance to the next stage; cards with changes requested receive the Changes Requested flag on the internal board
**Plans**: 4 plans

Plans:
- [x] 05-01-PLAN.md — Anon RLS migration + batch review Server Actions + types
- [x] 05-02-PLAN.md — BatchReviewPanel overlay + FilterBar/RiverView wiring
- [x] 05-03-PLAN.md — Public review page RSC + ReviewClient (all screens) + PinAnnotationLayer
- [x] 05-04-PLAN.md — submitReview with auto-advance + multi-round + end-to-end verification

### Phase 6: Notifications + Dashboards
**Goal**: The system proactively surfaces what needs attention — users receive in-app and email alerts, admins have a master cross-client view, and Clients Home signals which clients need action
**Depends on**: Phase 5
**Requirements**: NOTF-01, NOTF-02, NOTF-03, NOTF-04, NOTF-05, NOTF-06, ADMN-01, ADMN-02, ADMN-03, ADMN-04, ADMN-05, SMRT-01, SMRT-02, SMRT-03, SMRT-04, SMRT-05
**Success Criteria** (what must be TRUE):
  1. Bell icon shows unread count badge; clicking opens a notification panel where same-event notifications are grouped into one expandable row with unread blue-dot state
  2. Email notifications arrive via Resend for job assignments, review link sharing, changes requested, and overdue items
  3. Admin Dashboard shows batch reviews awaiting client response, cards with Changes Requested, overdue tasks, and team workload summary — all in a max-width 720px centred flat layout
  4. Clients Home card grid shows pipeline pulse (N in progress, N in review, N overdue), attention signals (red Changes Requested / amber Awaiting Review), and next deadline per client
  5. Clients are sorted: overdue first, pending reviews second, then alphabetical; SCM/CSL users see only their assigned clients
**Plans**: 4 plans

Plans:
- [x] 06-01-PLAN.md — Notification panel with grouped rows, unread styling, bell badge, and mark-as-read
- [x] 06-02-PLAN.md — Resend email helper and email triggers in server actions
- [x] 06-03-PLAN.md — Admin Dashboard RSC with 5 live data sections
- [x] 06-04-PLAN.md — Smart Clients Home with pipeline pulse, attention signals, and urgency sorting

### Phase 7: Ads Workflow
**Goal**: Ads boards in the Studio display the correct ad-specific field set instead of the social content fields, and the Go Live stage is available in the stage pipeline
**Depends on**: Phase 6
**Requirements**: ADS-01, ADS-02, ADS-03
**Success Criteria** (what must be TRUE):
  1. Opening a Studio card on an Ads board shows the Ads field set: Content Type, Campaign Name, Landing URL, CTA text, Ad Objective, and Placement — not the social content fields
  2. Ads boards expose the Go Live stage in the stage dropdown; cards can be moved through Concept Planning → Copy/Brief → In Design → In Production → In Review → Go Live → Live
  3. Ads formats (Static, Video, Carousel) each render the appropriate field structure within the Ads field set
**Plans**: 2 plans

Plans:
- [x] 07-01-PLAN.md — ADS_STAGES update (add in_review), River View collapse/canAddCard for ads, stage tests
- [x] 07-02-PLAN.md — Ads field branch in StudioContentCanvas with metadata fields, platform-filtered placement, ads content tests

### Phase 8: Type B Boards
**Goal**: Performance, SEO, Web, and Branding departments have boards with their correct stage pipelines, task-specific fields, job spawn rules, and client-facing deliverable review
**Depends on**: Phase 7
**Requirements**: TYPB-01, TYPB-02, TYPB-03, TYPB-04, TYPB-05, TYPB-06, TYPB-07, TYPB-08, TYPB-09, TYPB-10, SETT-01
**Success Criteria** (what must be TRUE):
  1. Clicking a Type B card opens a Task Detail Panel (40% viewport, right-aligned overlay) without navigating away from the board
  2. Performance board operates on its four stages with platform chip and Media Plan task type fields; SEO board operates on its four stages with target URL, keywords, and monthly execution checklist for Reporting tasks
  3. Web Development board supports design job auto-spawn at Homepage Design and Inner Pages stages; batch review fires between design stages (review is an event, not a stage)
  4. Branding board auto-spawns a Design job at every stage transition; deliverables are reviewed via the Type B Deliverable Review Page (not the Studio review page)
  5. Performance and SEO boards have a Reports tab where monthly report cards can be shared with clients via a public magic link report viewer showing the Oblique OS wordmark and an Acknowledge button
  6. Settings page (Admin only) allows managing team members and the client list
**Plans**: 7 plans

Plans:
- [x] 08-01-PLAN.md — Wave 0 migrations (users.is_active, report_shares.title) + server actions (checklists, reports, users)
- [x] 08-02-PLAN.md — Task Detail Panel component, URL-driven overlay, board RSC searchParams, [cardId] redirect
- [x] 08-03-PLAN.md — Board-specific fields (Performance/SEO/Web/Branding), platform chip, SEO checklist editor
- [x] 08-04-PLAN.md — Branding job title + blocking in updateCardStage, Type B Deliverable Review variant
- [x] 08-05-PLAN.md — Reports tab UI (ReportsTab, ReportCard, NewReportModal, FilterBar toggle)
- [x] 08-06-PLAN.md — Public Report Viewer page with Acknowledge button
- [x] 08-07-PLAN.md — Settings page (Team Members, invite, deactivate), TopNav link, middleware is_active gate

### Phase 10: Performance + SEO Rework
**Goal**: Performance and SEO boards reflect how the team actually works — priority-grouped task lists with status chips (not stage pipelines). Team gets `/performance` and `/seo` lead dashboards mirroring `/design` and `/production`.
**Depends on**: Phase 8
**Requirements**: PERFSEO-01, PERFSEO-02, PERFSEO-03, PERFSEO-04, PERFSEO-05
**Success Criteria** (what must be TRUE):
  1. Performance and SEO boards group cards by priority (High / Medium / Low) instead of stage, with collapsible sections identical to the River View rhythm
  2. Each card has a status chip (Not Started / WIP / Done / On Hold) settable from both the card row and the Task Detail Panel; Done cards auto-move to bottom of priority group and auto-archive after 7 days
  3. Performance board has channel field (Meta / Search / PMAX / TikTok / Shopee / Ad Hoc) with a colored chip on the row; `total_budget / flight_start / flight_end / channel_split` fields removed from the Task Detail Panel
  4. `/performance` and `/seo` top-level routes exist (mirroring `/design` and `/production`) showing all tasks across all clients, filterable by assignee / client / status / priority / due date; accessible to any user in the respective department
  5. Any team member on a Performance or SEO board can create and assign tasks (contributor + lead both have permission); existing campaign-style cards are deleted in migration (dummy data, no preservation needed)
**Plans**: 6 plans

Plans:
- [x] 10-00-PLAN.md — Wave 0: test stubs + VALIDATION.md + REQUIREMENTS.md PERFSEO additions
- [x] 10-01-PLAN.md — Migration 00011 (priority/status/completed_at, channel, RLS, dummy-data cleanup) + types + constants + priority-grouping pure functions
- [x] 10-02-PLAN.md — Server actions: updateCardStatus, updateCardPriority, updateCardChannel, createCard extension, updateCardStage freeze guard, archiveStaleDoneCards helpers
- [x] 10-03-PLAN.md — Board UI: priority-grouped RiverView, StatusDropdown, PrioritySection/Divider, CardRow chips, QuickCreateForm priority/channel rows, board RSC lazy-archive
- [x] 10-04-PLAN.md — Task Detail Panel rework: board-fields-performance rewrite (drop 4 campaign fields), PriorityDropdown, status/priority selectors at panel top
- [x] 10-05-PLAN.md — /performance + /seo lead dashboards, DeptDashboardClient, top-nav department tabs, My Work status chip, Smart Clients Home signal update

### Phase 9: Calendar + Search + Archive
**Goal**: Users can visualise cards by date on a calendar, search across all content with the command palette, and bulk-archive completed work
**Depends on**: Phase 10
**Requirements**: CALV-01, CALV-02, CALV-03, CALV-04, CALV-05, CALV-06, SRCH-01, SRCH-02, ARCH-01, ARCH-02
**Success Criteria** (what must be TRUE):
  1. Toggling to Calendar View shows a monthly grid with card tiles colour-coded by format (left edge matching format chip colour); Type A boards map by posting date, Type B by due date
  2. Unscheduled cards appear in a sidebar and can be dragged onto a calendar date to schedule them; dragging a card between dates reschedules it
  3. Clicking an empty date cell on the calendar opens a quick-create form with that date pre-filled
  4. Pressing Cmd+K opens a command palette that searches clients, cards, and jobs with results grouped by type and navigable by keyboard
  5. Admins and leads can bulk-archive cards via a filter toggle; archived cards are hidden by default and revealed with an Archived filter toggle
**Plans**: 5 plans

Plans:
- [x] 09-00-PLAN.md — Wave 1 foundation: install cmdk, FTS migration, extract calendar-utils, server actions (searchAll, bulkArchiveCards, unarchiveCard, updateCardScheduledDate)
- [x] 09-01-PLAN.md — Calendar View: BoardCalendar, CalendarCardTile, UnscheduledSidebar, QuickCreateModal + DnD + past-date confirm
- [x] 09-02-PLAN.md — Command Palette: cmdk-backed CommandPalette mounted in (app) layout
- [x] 09-03-PLAN.md — Archive UX: BulkActionBar, card-row checkbox/archived state, RiverView selection/shift-click
- [ ] 09-04-PLAN.md — Wire-up: filter-bar view/archived toggles, board RSC branches River vs Calendar, threads userTier/showArchived

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 (complete) → 10 (Performance/SEO rework) → 9 (Calendar/Search/Archive)

Phase 10 executes before Phase 9 because Performance/SEO board re-modeling should land before polish work touches those boards.

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 2/2 | Complete | 2026-04-09 |
| 2. River View Engine | 3/3 | Complete | 2026-04-09 |
| 3. Studio | 4/4 | Complete   | 2026-04-10 |
| 4. Job System | 10/10 | Complete   | 2026-04-10 |
| 5. Batch Review | 5/5 | Complete   | 2026-04-11 |
| 6. Notifications + Dashboards | 4/4 | Complete   | 2026-04-12 |
| 7. Ads Workflow | 2/2 | Complete   | 2026-04-12 |
| 8. Type B Boards | 7/7 | Complete | 2026-04-19 |
| 10. Performance + SEO Rework | 6/6 | Complete    | 2026-04-19 |
| 9. Calendar + Search + Archive | 0/TBD | Not started | - |
