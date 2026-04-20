# Oblique OS

## What This Is

A purpose-built project management platform for Oblique, a full-stack branding and performance marketing agency in KL. It replaces the current workflow of managing client work across PowerPoint decks, WhatsApp threads, and email chains with a single system that mirrors how every department actually operates — from social content ideation through design, production, and client delivery.

## Core Value

Every piece of client work flows through the system from brief to delivery without anyone needing to create a deck, send a WhatsApp message, or ask "where is this at?" — the system shows you.

## Requirements

### Validated

- ✓ Next.js 14 App Router scaffold with TypeScript + Tailwind CSS — Phase 1
- ✓ Supabase schema (22 tables, all enums, triggers) matching PRD v6 Section 18 — Phase 1
- ✓ RLS policies for admin/lead/contributor visibility tiers — Phase 1
- ✓ Supabase Auth with role-based redirect middleware — Phase 1
- ✓ All route stubs matching CLAUDE.md route structure — Phase 1
- ✓ Top navigation bar matching design system (wordmark, My Work, search, bell, avatar) — Phase 1
- ✓ Login page with email/password auth — Phase 1
- ✓ River View — single-column document flow grouped by stage — Phase 2
- ✓ Card CRUD — create, edit, move between stages — Phase 2
- ✓ Format chips, status dot logic, Changes Requested flag — Phase 2
- ✓ The Studio — full-page card detail for Type A (Social/Ads), all three Social format field sets, comments sidebar, activity log, visual panel, JOBS panel placeholder — Phase 3
- ✓ Job system — auto-spawn triggers, stage blocking, cover image cascade, pipeline enforcement, 7 server actions — Phase 4
- ✓ Job Detail View — inline-editable fields, status pipeline, Deliver to Card, comments, activity log — Phase 4
- ✓ Design Lead Dashboard — INCOMING/IN PROGRESS/PENDING REVIEW/WORKLOAD/ACTIVITY sections — Phase 4
- ✓ Production Lead Dashboard — 6 sections with Production Schedule calendar grid — Phase 4
- ✓ My Work page — unified card+job view with urgency-tier grouping — Phase 4
- ✓ Format rework — 8-format enum (Reel, Carousel, Static, AI Video, Podcast, Street Interview, UGC, Other), Studio canvas rewrite, UGC pipeline — Phase 4 gap closure
- ✓ UGC Brief export — magic-link public page for external UGC creators — Phase 4 gap closure
- ✓ Batch Review system — magic links, multi-reviewer, video timestamps, image pin annotations — Phase 5
- ✓ In-app notification panel — grouped notifications, unread badge, mark-all-read — Phase 6
- ✓ Transactional email via Resend — 6 triggers: assigned, review submitted, changes requested, report acknowledged, pending internal review, cover image spawn — Phase 6
- ✓ Admin Dashboard — 5-section RSC (awaiting review, changes requested, overdue, in production, team workload) — Phase 6
- ✓ Smart Clients Home — pipeline pulse, attention signal chips, urgency sort (overdue → review → alpha) — Phase 6
- ✓ Performance + SEO board rework — priority-grouped RiverView, Status pipeline (To Do → In Progress → Pending Review → Done), Channel + Notes (Performance), 7-day lazy auto-archive, dedicated /performance + /seo lead dashboards — Phase 10

### Active

- [ ] Client CRUD — create client, add services, auto-create boards
- [ ] Clients Home page — card grid with client roster
- [ ] Ads workflow — ads-specific field sets in Studio
- [ ] Type B boards — Performance, SEO, Web, Branding with Task Detail Panel
- [ ] Calendar View — posting dates (Type A), due dates (Type B)
- [ ] Ads workflow — ads-specific field sets in Studio
- [ ] Type B boards — Performance, SEO, Web, Branding with Task Detail Panel
- [ ] Calendar View — posting dates (Type A), due dates (Type B)
- [ ] Command palette search (Cmd+K)
- [ ] Archive workflow — manual bulk archive

### Out of Scope

- Dark mode — V2, light mode only for V1
- Mobile layouts — desktop-first V1, mobile in V2
- Integrations (Slack, Google Calendar, Meta API) — V2
- File uploads to app — external links only (Google Drive, Figma, Dropbox)
- Configurable workspaces — this is Oblique's tool, not a SaaS product
- Left sidebar navigation — top bar only, by design
- Kanban view — River View is the chosen paradigm

## Context

- Oblique is a ~15 person agency with departments: Social, Design, Production, Performance, SEO, Web, Branding
- Current workflow relies on PowerPoint decks per client per month, WhatsApp for handoffs, email for client reviews
- Decks are non-searchable, non-trackable throwaway artifacts — no historical visibility
- The biggest pain is broken handoffs between departments (social → design → production) and zero visibility without asking
- Client review currently works but looks unprofessional — magic links will be a client-facing upgrade
- Rollout plan: social content pipeline first, then department by department
- Success metric: faster turnaround — work moves through the pipeline measurably faster
- No hard deadline — quality over speed
- A Lovable prototype exists as visual reference only — do not use its source code
- Full PRD (v6) and design system reference are in `docs/`

## Constraints

- **Tech stack**: Next.js 14 (App Router), Supabase, Tailwind, Vercel — locked per PRD
- **Design**: Approved visual design from Lovable prototype — match exactly via design-system.md tokens
- **Fonts**: DM Serif Display (headings) + DM Sans (body) from Google Fonts — non-negotiable
- **Background**: #FAFAF8 warm white for pages, #FFFFFF for card surfaces only
- **Auth**: Supabase Auth with three tiers (admin/lead/contributor), magic links for client review (no client login)
- **File storage**: External links only, exception for card Visual Panel images → Supabase Storage

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| River View over Kanban | Matches editorial/creative workflow — reads like a document, not a task board | — Pending |
| No left sidebar | Clean, minimal chrome — top bar only, matches Craft.do inspiration | — Pending |
| Jobs auto-spawn only | Prevents manual job creation chaos — system enforces workflow | — Pending |
| Two-job cascade for video | Production job closes → cover image design job auto-spawns — mirrors real workflow | — Pending |
| Magic links for client review | No client accounts needed — one link, shareable, multi-reviewer | — Pending |
| Social pipeline first for rollout | Highest volume department, most handoffs, biggest pain point | — Pending |
| Stage change via dropdown or drag-and-drop | Cards can be dragged between stages in River View, or changed via dropdown in Studio | Implemented Phase 3 |
| Ready to Post loops back to originating team | Social cards → Social team's My Work; Ads cards → Performance team's My Work. Teams create AND post. | Affects Phase 4/6 |
| Print-friendly Production Sheet (HTML) | Production teams need portable, printable shoot references without login — replaces current slide decks. Public magic-link route with @media print CSS, saveable as PDF. | Phase 4 |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-13 after Phase 7 (ads workflow — ads stage pipeline with In Review, ads field sets in Studio) completion*
