# CLAUDE.md — Oblique OS

This file is read automatically by Claude Code at the start of every session. Follow all instructions here exactly.

---

## What You're Building

**Oblique OS** is a purpose-built project management platform for Oblique, a full-stack branding and performance marketing agency based in Kuala Lumpur, Malaysia.

It replaces the agency's current workflow of managing client work across PowerPoint decks, WhatsApp threads, and email chains with a single platform that mirrors exactly how every department operates.

This is a **greenfield build**. You are building from scratch with clean architecture. There is a Lovable prototype that exists as a visual reference only — do not use its source code. Match its design language precisely from the Design Reference Package.

---

## Source of Truth Documents

Before writing any code, read these files:

| File | Purpose |
|---|---|
| `docs/PRD.md` | Complete product spec — every feature, flow, permission, stage, field, and data model. This is the single source of truth for what to build. |
| `docs/design-system.md` | Visual token reference — every colour, font, shadow, radius, and motion value. Match the Lovable prototype screenshots using this file. |
| `docs/screenshots/` | Annotated screenshots from the Lovable prototype. These show exactly what the UI should look like. |

**If there is any conflict between these files, PRD.md takes precedence for behaviour. design-system.md takes precedence for visuals.**

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript + Tailwind CSS | App Router only. No Pages Router. |
| Database | Supabase (PostgreSQL) | Use the data model in PRD.md Section 18 exactly. |
| Auth | Supabase Auth | Role-based. Three tiers: admin / lead / contributor. |
| Real-time | Supabase Realtime | For notifications, live job status updates. |
| Hosting | Vercel | |
| Email | Resend | Transactional only — assignments, approvals, overdue alerts. |
| File storage | External links only | No file uploads to the app. All media is linked (Google Drive, Figma, Dropbox). Exception: drag-and-drop image to card's Visual Panel goes to Supabase Storage. |

---

## Design Constraints — Non-Negotiable

The visual design is approved. Do not deviate from it. Claude Code's job is to build the correct architecture and functionality while matching the approved design exactly.

1. **Fonts:** `DM Serif Display` for all headings, card titles, and display text. `DM Sans` for all body, UI, labels, and buttons. Import from Google Fonts.

2. **Background:** `#FAFAF8` (warm white) for page backgrounds. Never `#FFFFFF` for backgrounds. `#FFFFFF` is for card surfaces only.

3. **No left sidebar.** Navigation lives in the top bar only. No icon rail. No side nav.

4. **No Kanban.** The main view is the River View — a single-column document flow grouped by stage. No drag-and-drop between stages. Stage is changed from inside the card via a dropdown.

5. **Cards use box-shadow, not borders.** `box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)`. `border-radius: 12px`.

6. **Chips are fully rounded.** `border-radius: 999px` on all chips and pills.

7. **Warm borders.** Use `#E8E6E0` for all dividers and borders — never `#E5E7EB` (Tailwind cool grey) or similar.

8. **All dates in the UI** use short format: `10 Apr` or `10 Apr, 2:30pm`. Never ISO format (2026-04-10).

9. **Match the design-system.md exactly** for all chip colours, shadow values, typography sizes, and spacing.

---

## Architecture Principles

1. **App Router only.** Use Next.js 14 App Router with React Server Components where appropriate. Client components only when interactivity requires it.

2. **Route structure matches the spec.** Key routes:
   - `/` → redirect to appropriate landing page based on role
   - `/dashboard` → Admin Dashboard
   - `/design` → Design Lead Dashboard
   - `/production` → Production Lead Dashboard
   - `/clients` → Clients Home (with Smart signals for leads)
   - `/clients/[clientId]` → Client Workspace
   - `/clients/[clientId]/[serviceType]` → Service board (River View)
   - `/clients/[clientId]/[serviceType]/[cardId]` → Studio (Type A) or stays as panel (Type B)
   - `/my-work` → My Work
   - `/jobs/[jobId]` → Job Detail View
   - `/review/[token]` → Client Review Page (public, no auth)
   - `/report/[token]` → Report Viewer (public, no auth)
   - `/settings` → Settings (Admin only)

3. **Supabase Row Level Security (RLS).** Every table must have RLS policies. Contributors only see their assigned work. Leads see their department. Admins see everything.

4. **Real-time subscriptions** for notifications and job status changes. Use Supabase Realtime channels.

5. **Magic links** for client review and report sharing are stateless tokens stored in the `batch_reviews` and `report_shares` tables. The review pages are fully public (no auth required). Token validation happens server-side.

6. **Job auto-spawn triggers** should be implemented as Supabase database functions (PostgreSQL functions/triggers), not application logic. When a card's stage changes to `in_design` or `in_production`, the trigger fires and creates the job record. This is more reliable than handling it in the Next.js API layer.

---

## Data Model

Implement the data model from **PRD.md Section 18** exactly. Key tables:

- `users` — role, department, tier enums as specified
- `clients` — client records
- `client_services` — which services each client has active
- `boards` — one per service per client, auto-created when service is activated
- `cards` — the core content/task unit
- `card_content` — format-specific content (JSONB for slide/scene blocks)
- `card_attachments` — visual panel attachments
- `card_comments` — internal and client feedback
- `card_activity` — stage change log
- `jobs` — design and production jobs (child of cards)
- `job_assignees` — who is on each job
- `job_comments` — internal job thread
- `job_activity` — job status change log
- `shoot_schedules` — shoot days for production jobs
- `batch_reviews` — client review batches with magic tokens
- `review_sessions` — per-reviewer session tracking
- `review_responses` — per-card approval/changes decisions
- `review_annotations` — pin and timestamp comments from clients
- `report_shares` — report magic links
- `notifications` — in-app notification records
- `checklists` — task checklist items (Type B boards)

---

## Build Order

Follow this sequence. Complete each phase before starting the next.

**Phase 1 — Foundation**
Supabase setup (schema, RLS, auth), Next.js 14 scaffold, role-based middleware, client layer (create client, add services, board auto-creation), Clients Home page.

**Phase 2 — River View Engine**
River View component, stage grouping, card CRUD, format chips, status dot logic, `Changes Requested` flag, filter bar, `+ Add Card`.

**Phase 3 — Studio**
Full-page Studio for Type A cards. Format selection on card create. Field structs for all three Social formats (Single Image, Carousel, Video). Stage badge, comments sidebar, card activity log, JOBS panel (placeholder initially).

**Phase 4 — Job System**
Job auto-spawn triggers (Supabase functions). Two-job cascade for video cards. Cover Image design job auto-spawn. Job fields (design + production types). Job status pipelines with On Hold escape. Design Lead Dashboard. Production Lead Dashboard. Production Schedule calendar. Job Detail View with Deliver to Card action. Context-aware navigation. Jobs in My Work.

**Phase 5 — Batch Review System**
Batch Review panel, magic link generation, client review page (Type A), name prompt, multi-reviewer support, video player + timestamp comments, image pin annotations, auto-advance on approval.

**Phase 6 — Notifications + Admin Dashboard + Smart Clients Home**
In-app notification panel (grouped notifications, unread state). Email via Resend. Admin Dashboard. Smart Clients Home (pipeline pulse, attention signals, urgency sorting). Overdue detection logic.

**Phase 7 — Ads Workflow**
Ads-specific field swap in Studio (Static / Video / Carousel field sets). Content Type, Campaign Name, Landing URL, CTA dropdown, Placement, Ad Objective. Go Live stage.

**Phase 8 — Type B Boards**
Task Detail Panel component. Performance board (Media Planning stage, Media Plan task type, Reports tab). SEO board (Reports tab, Reporting checklist). Web Development board (design job spawning at Homepage Design + Inner Pages). Branding board (design job spawning at every stage, batch review for deliverables). Type B Deliverable Review Page (client-facing). Settings page.

**Phase 9 — Calendar + Search + Archive + Polish**
Calendar View for all boards (Type A = posting dates, Type B = due dates). Command palette search (Cmd+K). Archive workflow. Empty states. Error states. Loading skeletons.

---

## Key Behavioural Rules

These are easy to miss. Read carefully.

**Jobs:**
- Jobs are NEVER manually created. Only auto-spawn from card stage transitions.
- Video format cards (Reel, TikTok, Podcast, Street Interview, Ad Video) spawn a Production job first, then a Cover Image Design job auto-spawns only when the Production job closes. Two sequential jobs.
- Static format cards only ever spawn one Design job.
- A card cannot advance past In Production / In Design until all active Jobs are Closed.
- Web Development tasks spawn Design jobs at `homepage_design` and `inner_pages` stages.
- Branding tasks spawn Design jobs at EVERY stage transition.

**Permissions:**
- Designers, Videographers, and Editors cannot create cards or move cards between stages (Type A restriction).
- Type B exception: all team members on Performance, SEO, Web, and Branding boards can create and move their own tasks.
- Design Lead and Production Lead assign jobs — they do not create cards.

**Reviews:**
- `Send for Review →` is a board-level action, not a card-level action.
- Web and Branding boards have `Send for Review →` in their filter bar. Performance and SEO boards do not.
- Client review for Branding and Web uses the Type B Deliverable Review Page variant (not the Studio content review page).
- Review is an event, not a stage, on Web boards. Homepage Design and Inner Pages stages have no review stage — review is fired between transitions.

**Notifications:**
- Same-event notifications group into a single expandable row in the notification panel.
- Cover Image design job spawning triggers a notification to the Design Lead.

**Dates:**
- All UI dates: short format only. `10 Apr` or `10 Apr, 2:30pm`. No ISO.

---

## What NOT to Do

- Do not reference the Lovable prototype source code. It has broken routing and is not a reliable reference.
- Do not add a left sidebar. The top bar is the only navigation chrome.
- Do not build a Kanban board. River View only.
- Do not add a `/my-clients` route. This was scrapped — the Smart Clients Home (enhanced `/clients`) replaces it.
- Do not use `#FFFFFF` as the page background. Use `#FAFAF8`.
- Do not use Tailwind's default grey scale for borders (`gray-200`, `gray-300`, etc.). Use the warm border token `#E8E6E0`.
- Do not auto-archive cards. Archive is a manual bulk action only.
- Do not add dark mode. Light mode only in V1.
- Do not build mobile layouts. Desktop-first in V1.

---

## Environment Variables Required

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
NEXT_PUBLIC_APP_URL=
```

<!-- GSD:project-start source:PROJECT.md -->
## Project

**Oblique OS**

A purpose-built project management platform for Oblique, a full-stack branding and performance marketing agency in KL. It replaces the current workflow of managing client work across PowerPoint decks, WhatsApp threads, and email chains with a single system that mirrors how every department actually operates — from social content ideation through design, production, and client delivery.

**Core Value:** Every piece of client work flows through the system from brief to delivery without anyone needing to create a deck, send a WhatsApp message, or ask "where is this at?" — the system shows you.

### Constraints

- **Tech stack**: Next.js 14 (App Router), Supabase, Tailwind, Vercel — locked per PRD
- **Design**: Approved visual design from Lovable prototype — match exactly via design-system.md tokens
- **Fonts**: DM Serif Display (headings) + DM Sans (body) from Google Fonts — non-negotiable
- **Background**: #FAFAF8 warm white for pages, #FFFFFF for card surfaces only
- **Auth**: Supabase Auth with three tiers (admin/lead/contributor), magic links for client review (no client login)
- **File storage**: External links only, exception for card Visual Panel images → Supabase Storage
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- TypeScript 5 - All source code. Strict mode enabled.
- SQL (PostgreSQL) - Supabase database schema, migrations, triggers, RLS policies in `supabase/migrations/`
## Runtime
- Node.js (version constraint not pinned, uses system Node)
- npm (with `package-lock.json` committed)
- Lockfile: Present at `/Users/seanng/Dev-Projects/Oblique-OS/package-lock.json`
## Frameworks
- Next.js 14.2.35 - App Router only (no Pages Router). Used for server and client components, file-based routing, metadata.
- React 18 - UI component framework via Next.js.
- Tailwind CSS 3.4.1 - Utility-first CSS with custom theme configuration at `tailwind.config.ts`
- Lucide React 1.8.0 - Icon library for UI components
- Not yet integrated (no Jest, Vitest, or test dependencies)
- PostCSS 8 - CSS processing (Tailwind integration at `postcss.config.mjs`)
- ESLint 8 - Code linting via Next.js config at `.eslintrc.json` (extends `next/core-web-vitals`, `next/typescript`)
## Key Dependencies
- `@supabase/ssr` v0.10.2 - Server-side session management and cookie handling for Supabase auth
- `@supabase/supabase-js` v2.103.0 - JavaScript client for Supabase database, auth, and realtime
- `lucide-react` v1.8.0 - Icon library
- `react-dom` v18 - React DOM adapter for Next.js
- `@types/node` v20 - TypeScript Node.js types
- `@types/react` v18 - TypeScript React types
- `@types/react-dom` v18 - TypeScript React DOM types
- `eslint-config-next` v14.2.35 - ESLint configuration for Next.js projects
## Configuration
- Variables stored in `.env.local` (Git-ignored):
- `next.config.mjs` - Empty Next.js configuration (using defaults)
- `tsconfig.json` - Path aliases: `@/*` maps to `./src/*`
- `.eslintrc.json` - Extends Next.js core web vitals and TypeScript rules
- `postcss.config.mjs` - Tailwind CSS plugin integration
## Platform Requirements
- Node.js (version unspecified, assumes LTS or compatible)
- npm (included with Node.js)
- Vercel (specified in CLAUDE.md for hosting)
- PostgreSQL 15+ (via Supabase)
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- Page/route files: `page.tsx` (lowercase, Next.js App Router convention)
- Component files: `kebab-case.tsx` (e.g., `top-nav.tsx`)
- Type/utility files: `camelCase.ts` or `snake_case.ts` depending on export purpose
- Config files: `config.ts`, `middleware.ts`, `server.ts`, `client.ts`
- Exported React components: `PascalCase` (e.g., `TopNav`, `LoginPage`, `DashboardPage`)
- Helper/utility functions: `camelCase` (e.g., `getSupabase()`, `createClient()`, `updateSession()`)
- Event handlers in components: `handleActionName` (e.g., `handleLogin()`)
- Functions returning values: descriptive `camelCase` (e.g., `getLandingPage()`, `getStagesForService()`)
- Component state hooks: `camelCase` (e.g., `email`, `password`, `loading`, `error`)
- Object/record names: `camelCase` (e.g., `supabaseResponse`, `cookieStore`)
- Constants: `UPPER_SNAKE_CASE` for module-level const arrays (e.g., `SOCIAL_STAGES`, `ADS_STAGES`, `STAGE_LABELS`)
- Type aliases: `PascalCase` (e.g., `UserRole`, `ServiceType`, `CardFormat`, `DesignJobStatus`)
- Union/discriminated types: `PascalCase` for the type name, `snake_case` for values (e.g., `type UserDepartment = "management" | "design" | "production"`)
- Record/mapping objects: `UPPER_SNAKE_CASE` (e.g., `STAGE_LABELS: Record<string, string>`)
- Route groups: `(parentheses)` for logical grouping (e.g., `(app)/`, `(auth)/`, `(public)/`)
- Service/utility directories: `kebab-case` (e.g., `supabase/`, `lib/`)
- Feature directories: `snake_case` (e.g., `src/components/`, `src/lib/`)
## Code Style
- ESLint config: `next/core-web-vitals` and `next/typescript` (strictly enforced)
- Prettier formatting implied but not explicitly configured in `.eslintrc.json`
- Line length: no explicit limit enforced, but code follows readable patterns (~80-100 char soft limit observed)
- ESLint ruleset: Next.js + TypeScript strict rules
- TypeScript `strict: true` enabled in `tsconfig.json` — requires explicit types, no `any`
- All components use explicit `React.ReactNode` or specific type definitions for props
- TypeScript strict mode is mandatory — all inferred types must be valid
- Component props destructuring includes explicit type annotations
- Function parameters must have explicit types (no implicit `any`)
- Server/Client components must be marked with `"use client"` directive
## Import Organization
- `@/*` resolves to `./src/*` (configured in `tsconfig.json`)
- Always use `@/` for imports within the project — never use relative `../` paths
- Examples: `@/components/top-nav`, `@/lib/supabase/server`, `@/lib/types`
## Error Handling
- **Validation errors**: Check for `undefined` or null values before use. Example in `src/lib/supabase/client.ts`:
- **Async errors**: Destructure `error` field from Supabase responses and check truthiness. Example in `src/app/(auth)/login/page.tsx`:
- **Silent failures**: Some error scenarios are caught but logged minimally (e.g., `setAll` in `src/lib/supabase/server.ts` with `catch {}` for Server Component contexts)
- **User-facing errors**: Display error messages via state (e.g., `error` state in login form)
## Logging
- Comments for context rather than console logs in production code
- Examples: `// The \`setAll\` method was called from a Server Component. This can be ignored if you have middleware refreshing sessions.`
- No debug or info level logging observed yet — project is in scaffolding phase
## Comments
- Comments explain *why*, not *what* — the code should be readable enough that what it does is obvious
- Comments used to explain non-obvious Next.js patterns (Server Components, middleware context)
- Example: `// Root page — middleware handles role-based redirect. This fallback redirects to /login if middleware doesn't catch it.`
- Not currently used in the codebase
- Should be used for exported functions and type definitions once feature code begins
- Recommended pattern: TSDoc comments for public APIs (handlers, exported functions)
## Function Design
- Functions kept small and focused (most are 5-20 lines)
- Route handlers typically under 30 lines (including boilerplate)
- Larger functions broken into smaller helpers
- Prefer object destructuring for props (especially in React components)
- Keep parameter lists short; use object for config/options
- Example from `src/app/(app)/layout.tsx`:
- Explicit return types on all functions (TypeScript strict mode)
- Components return `JSX.Element` or void for layout components
- Utility functions return specific types (e.g., `string`, `Record<string, string>`)
- Example from `src/lib/types.ts`:
## Module Design
- Named exports for functions and types: `export function createClient() { ... }`
- Default exports for page components: `export default function DashboardPage() { ... }`
- Type exports for external use: `export type UserRole = ...`
- Not currently used in the codebase
- Future pattern: may consolidate exports from `src/lib/` into an index file
## React & Component Patterns
- Server Components (default in App Router) for layout and page wrappers
- Client Components (`"use client"`) only when interactivity needed (forms, state, event handlers)
- Example server: `src/app/(app)/layout.tsx`, `src/app/(app)/clients/page.tsx`
- Example client: `src/app/(auth)/login/page.tsx`, `src/components/top-nav.tsx`
- `useState` for local component state (e.g., form inputs, loading/error states)
- No global state manager installed — keep state as local as possible
- When state needs to be shared, lift it up or pass via props
- `useRouter` and `usePathname` from `next/navigation` for routing
- `useCallback` for memoizing event handlers (e.g., `handleLogin` in login page)
- Standard React hooks only — no custom hooks yet
## Tailwind CSS Conventions
- Colors: Use theme tokens `bg-bg-base`, `bg-bg-card`, `text-text-primary`, `border-border`, etc.
- Never use Tailwind's default colors for borders — always use `border-border` (`#E8E6E0`)
- Typography: Use preset sizes like `text-page-heading`, `text-card-title`, `text-section-heading`
- Shadows: Use preset shadows `shadow-card`, `shadow-card-hover`, `shadow-overlay`, `shadow-dropdown`
- Border radius: Use token names `rounded-card` (12px), `rounded-btn` (8px), `rounded-chip` (999px)
- Spacing: Use token names `px-lg`, `py-md`, `gap-md`, `mb-xs`, etc.
- `font-serif` for headings and display text (DM Serif Display)
- `font-sans` for body, UI, and labels (DM Sans) — default, no need to specify
- Font sizes: Use Tailwind presets or `text-[NPpx]` for non-standard sizes
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- Three-tier role-based access control (admin, lead, contributor)
- Route groups organize authenticated `/app`, authentication `/auth`, and public `/public` flows separately
- Supabase middleware handles session management and role-based redirects at request time
- Type safety via TypeScript enums for all role, stage, and status variants
- Tailwind CSS with custom design tokens matching approved Lovable prototype
- Magic token system for stateless client review and report sharing
## Layers
- Purpose: Organize routes by authentication and feature boundary
- Location: `src/app/`
- Structure:
- Purpose: Session refresh, auth validation, role-based redirect
- Location: `src/middleware.ts` (delegates to `src/lib/supabase/middleware.ts`)
- Responsibilities:
- Triggers before route rendering
- Purpose: Database access with auth-aware connection pooling
- Locations:
- Pattern: Three separate client variants for different execution contexts
- Session management: Cookie-based refresh handled by Supabase SSR library
- Purpose: Reusable React components with Tailwind styling
- Location: `src/components/`
- Current: `top-nav.tsx` (site header with My Work link, search, notifications, user avatar)
- Pattern: Client components ("use client") for interactive elements, RSC (React Server Component) for layout wrapper
- Styling: Tailwind CSS with custom Oblique OS design tokens (colors, spacing, shadows, typography)
- Purpose: Single source of truth for domain types
- Location: `src/lib/types.ts`
- Contains:
## Data Flow
- URL state: Route params and query strings for navigation
- Session state: Supabase Auth session (JWT in cookies, refresh token stored)
- Real-time state: Supabase Realtime subscriptions (future phases: job status, notifications)
- Component state: React hooks (useState for forms, modals, local filters)
- No external state management (Redux, Zustand); Supabase is the single source of truth
## Key Abstractions
- Purpose: Encapsulate connection setup for different contexts (browser, server, middleware)
- Examples:
- Pattern: Factory functions return pre-configured client instances; no singleton needed (Supabase handles pooling)
- Purpose: Enforce permission rules at database level
- Implementation: Supabase RLS policies with helper functions
- Functions in RLS: `is_admin()`, `is_lead_or_admin()`, `get_user_role()`, `get_user_tier()`, `get_user_department()`
- Example RLS policy: cards table allows SELECT if user is admin OR user is assigned to card OR user's department is card's board's service_type's assigned department
- Purpose: Eliminate manual board creation when service is activated
- Location: supabase/migrations/00001_initial_schema.sql, function `auto_create_board()`
- Trigger: AFTER INSERT on client_services
- Behavior: Inserts board record with board_type = 'creative' for social/ads, 'task' for others
- Idempotent: Uses ON CONFLICT DO NOTHING to prevent duplicates
- Purpose: Share stage, role, format names between frontend and TypeScript type system
- Examples:
- Usage: Type validation + display labels without string duplication
## Entry Points
- Location: `src/app/layout.tsx`
- Triggers: Every page request
- Responsibilities:
- Location: `src/middleware.ts`
- Triggers: All non-static requests (configured matcher excludes _next, images, static assets)
- Responsibilities:
- Location: `src/app/(app)/layout.tsx`
- Triggers: All authenticated pages
- Responsibilities:
- Location: `src/app/(auth)/login/page.tsx`
- Triggers: Users without auth, or explicit /login navigation
- Responsibilities:
- Admin: `/dashboard` → `src/app/(app)/dashboard/page.tsx`
- Design Lead: `/design` → `src/app/(app)/design/page.tsx`
- Production Lead: `/production` → `src/app/(app)/production/page.tsx`
- Managers/Strategists: `/clients` → `src/app/(app)/clients/page.tsx`
- Contributors: `/my-work` → `src/app/(app)/my-work/page.tsx`
- Current state: All are stubs with "coming in Phase X" placeholders
- Triggers: Navigation to /clients/[clientId]
- Responsibilities: Show client workspace (coming Phase 2)
- Triggers: Navigation to /clients/[clientId]/[serviceType]
- Responsibilities: Render River View component grouped by stage (coming Phase 2)
- Triggers: Click on Type A card in River View
- Responsibilities: Full-page Studio editor with format fields, comments, jobs panel (coming Phase 3)
- Triggers: Navigation from job in My Work or dashboard
- Responsibilities: Job status, assignees, comments, production schedule (coming Phase 4)
- Triggers: Client clicks magic link in email
- Auth: None required; token validates access
- Responsibilities: Client review interface for batch (coming Phase 5)
- Triggers: Client clicks report magic link
- Auth: None required; token validates access
- Responsibilities: Performance/analytics report viewer (coming Phase 6)
## Error Handling
- **Middleware errors:** Caught in updateSession(); if session refresh fails, user is treated as unauthenticated and redirected to /login
- **Auth errors:** Login page catches `signInWithPassword()` errors, displays error message to user
- **Supabase RLS violations:** Returned as empty result set (SELECT returns []), app treats as "no data" rather than error
- **Type mismatches:** Caught at compile time via TypeScript strict mode; if schema changes, types must be updated in src/lib/types.ts
- **Magic link validation:** Server-side, returns 404 or error message if token invalid or expired
## Cross-Cutting Concerns
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
