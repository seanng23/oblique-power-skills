# Oblique OS — Design System Reference

**Purpose:** Visual token reference for Claude Code. Every colour, font, shadow, radius, and motion value needed to build the UI. Match the Lovable prototype screenshots exactly — this file defines the system behind them.

**Design philosophy:** Craft.do, not Gmail. Warm, editorial, generous whitespace. A creative studio's tool that feels designed, not assembled from defaults.

---

## Colour Palette

### Core Tokens

| Token | Hex | Usage |
|---|---|---|
| `--bg-base` | `#FAFAF8` | Page background — warm white, never pure white |
| `--bg-card` | `#FFFFFF` | Card surfaces, panels, overlays |
| `--bg-subtle` | `#F4F3EF` | Stage divider backgrounds, slide/scene inset blocks, unread notification rows, hover states |
| `--border` | `#E8E6E0` | All borders — warm grey, never cold |
| `--text-primary` | `#1A1916` | Primary text, headings — warm near-black |
| `--text-secondary` | `#6B6860` | Metadata, timestamps, secondary labels |
| `--text-tertiary` | `#A8A69F` | Placeholders, disabled text, section labels in small caps |

### Accent Colours

| Token | Hex | Usage |
|---|---|---|
| `--accent` | `#1A1916` | Primary buttons, active states |
| `--accent-amber` | `#D97706` | Awaiting review indicator, client feedback border, calendar today marker |
| `--accent-green` | `#16A34A` | Approved, posted, live, positive empty states |
| `--accent-red` | `#DC2626` | Overdue, changes requested flag, urgent priority chip |
| `--accent-blue` | `#2563EB` | In progress states, internal comment border |

### Status Dot Colours

| State | Colour |
|---|---|
| Ideation / Backlog / Wireframe / Mood Board | `#A8A69F` (grey) |
| In progress (any active stage) | `#2563EB` (blue) |
| Ready to Post / Done / Live / Posted | `#16A34A` (green) |
| Awaiting Review | `#D97706` (amber) |
| Changes Requested | `#DC2626` (red) |

---

## Typography

### Font Stack

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / Headings / Card titles | `DM Serif Display` | 400 (regular) | Warm, editorial serif. Used for all prominent text. Google Fonts. |
| Body / UI / Buttons | `DM Sans` | 400, 500, 700 | Clean sans-serif. Google Fonts. |
| Labels / Section headers | `DM Sans` | 500 | Small caps, `letter-spacing: 0.08em`, colour `#A8A69F` |
| Monospace (if needed) | `JetBrains Mono` | 400 | Code blocks, technical fields only |

### Type Scale

| Element | Font | Size | Weight | Colour |
|---|---|---|---|---|
| Page heading (dashboard greeting) | DM Serif Display | 32px | 400 | `#1A1916` |
| Section heading | DM Sans | 12px small caps | 500 | `#A8A69F` with `letter-spacing: 0.08em` |
| Card title (River View) | DM Serif Display | 18px | 400 | `#1A1916` |
| Card title (Studio) | DM Serif Display | 24px | 400 | `#1A1916` |
| Card title (Calendar tile) | DM Serif Display | 12px | 400 | `#1A1916` |
| Body text | DM Sans | 14px | 400 | `#1A1916` |
| Metadata / chips | DM Sans | 12px | 500 | Varies by chip type |
| Timestamp / "time ago" | DM Sans | 12px | 400 | `#A8A69F` |
| Button text | DM Sans | 14px | 500 | Varies |
| Stage count (divider) | DM Sans | 12px | 400 | `#6B6860` |

---

## Elevation (Shadows)

| Element | Shadow | Notes |
|---|---|---|
| Cards (resting) | `0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)` | No hard border. Shadow only. |
| Cards (hover) | `0 2px 6px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)` | Paired with `translateY(-2px)` |
| Overlays / Side panels | `0 8px 40px rgba(0,0,0,0.12)` | Batch Review panel, Task Detail Panel, Comments sidebar |
| Dropdowns / Popovers | `0 4px 16px rgba(0,0,0,0.10)` | Stage dropdown, filter dropdowns |

---

## Border Radius

| Element | Radius |
|---|---|
| Cards | `12px` |
| Slide / Scene inset blocks | `10px` |
| Buttons | `8px` |
| Chips / Pills | `999px` (full round) |
| Input fields | `8px` |
| Avatar circles | `50%` (full circle) |
| Calendar day cells | `8px` |

---

## Spacing System

Base unit: `4px`. Use multiples.

| Token | Value | Usage |
|---|---|---|
| `--space-xs` | `4px` | Tight gaps (between chip and chip) |
| `--space-sm` | `8px` | Inside chips, between small elements |
| `--space-md` | `16px` | Standard padding, gap between cards |
| `--space-lg` | `24px` | Section spacing, card internal padding |
| `--space-xl` | `32px` | Between dashboard sections |
| `--space-2xl` | `48px` | Page top/bottom padding |

### Card Padding

- River View cards: `20px 24px`
- Studio left panel: `32px`
- Task Detail Panel: `24px`
- Dashboard sections: `0` (content flows in document style, dividers separate)

### Max Widths

- Dashboard content: `~720px` centred
- River View: `~760px` centred
- Studio: full width (55/45 split)
- Task Detail Panel: `40%` of viewport width, right-aligned

---

## Motion / Animation

| Element | Transition | Notes |
|---|---|---|
| Page transitions | `200ms ease-out` | Between routes |
| Card hover | `150ms ease` | `translateY(-2px)` + shadow lift |
| Comments sidebar | `250ms cubic-bezier(0.4, 0, 0.2, 1)` | Slides in from right |
| Task Detail Panel | `250ms cubic-bezier(0.4, 0, 0.2, 1)` | Slides in from right |
| Batch Review panel | `200ms ease-out` | Slides up from bottom, centred overlay |
| Dropdown open | `150ms ease-out` | Scale from 95% + opacity |
| Notification panel | `200ms ease-out` | Slides down from bell icon |

---

## Chip System

### Format Chips (Type A — Social / Ads)

| Format | Background | Text | Calendar Left Edge |
|---|---|---|---|
| Static Carousel | `#E6F1FB` | `#185FA5` | Blue |
| Single Image | `#F4F3EF` | `#6B6860` | Grey |
| Reel | `#EAF3DE` | `#3B6D11` | Green |
| TikTok | `#FBEAF0` | `#993556` | Rose |
| Podcast | `#EEEDFE` | `#3C3489` | Purple |
| Street Interview | `#FAEEDA` | `#633806` | Amber |
| Other | `#F4F3EF` | `#6B6860` | Grey |

### Task Type Chips — Performance Board

| Task Type | Background | Text |
|---|---|---|
| Media Plan | `#FEF3C7` | `#92400E` |
| Campaign Launch | `#E6F1FB` | `#185FA5` |
| Optimisation | `#EAF3DE` | `#3B6D11` |
| Budget & Pacing | `#FAEEDA` | `#633806` |
| Reporting | `#EEEDFE` | `#3C3489` |
| Creative Request | `#FBEAF0` | `#993556` |
| General | `#F4F3EF` | `#6B6860` |

### Task Type Chips — SEO Board

| Task Type | Background | Text |
|---|---|---|
| Blog Article | `#E6F1FB` | `#185FA5` |
| Backlink Building | `#EAF3DE` | `#3B6D11` |
| Technical Fix | `#FAEEDA` | `#633806` |
| On-Page Optimisation | `#EEEDFE` | `#3C3489` |
| Reporting | `#FBEAF0` | `#993556` |
| General | `#F4F3EF` | `#6B6860` |

### Task Type Chips — Web Development Board

| Task Type | Background | Text |
|---|---|---|
| Homepage | `#E6F1FB` | `#185FA5` |
| Inner Page | `#EAF3DE` | `#3B6D11` |
| Landing Page | `#FAEEDA` | `#633806` |
| E-Commerce | `#EEEDFE` | `#3C3489` |
| Bug Fix | `#FBEAF0` | `#993556` |
| General | `#F4F3EF` | `#6B6860` |

### Task Type Chips — Branding Board

| Task Type | Background | Text |
|---|---|---|
| Strategy | `#E6F1FB` | `#185FA5` |
| Visual Identity | `#EAF3DE` | `#3B6D11` |
| Guidelines Doc | `#FAEEDA` | `#633806` |
| Collateral | `#EEEDFE` | `#3C3489` |
| Presentation | `#FBEAF0` | `#993556` |
| General | `#F4F3EF` | `#6B6860` |

### Status Chips

| Status | Background | Text |
|---|---|---|
| Changes Requested | `#FEE2E2` | `#DC2626` |
| Awaiting Review | `#FEF3C7` | `#D97706` |
| Urgent (priority) | `#FEE2E2` | `#DC2626` |
| ASAP (job priority) | `#FEE2E2` | `#DC2626` |

### Service Chips (on client cards)

Muted text style — not coloured chips. `DM Sans`, 12px, `#6B6860`. Services separated by ` · ` (middle dot with spaces).

### Stage Badge

- Background: `#F4F3EF`
- Text: `#6B6860`
- Font: DM Sans, 12px, 500
- Radius: `999px`
- Padding: `4px 12px`
- Clickable → opens dropdown with all stages

---

## Component Patterns

### Cards (River View)

```
┌─────────────────────────────────────────┐
│  [Title — DM Serif Display, 18px]       │
│                                         │
│  [Format chip]  [Due date]  [Avatars]   │
│  [Changes Requested chip — if flagged]  │
└─────────────────────────────────────────┘
```

- Background: `#FFFFFF`
- Shadow: card resting shadow
- Radius: `12px`
- Padding: `20px 24px`
- Hover: lift + shadow increase
- No border

### Stage Dividers (River View)

```
COPY / BRIEF  ·  4                    [+ Add Card]
─────────────────────────────────────────────────
```

- Label: DM Sans, 12px, small caps, `letter-spacing: 0.08em`, `#A8A69F`
- Count: DM Sans, 12px, `#6B6860`
- Divider line: `1px solid #E8E6E0`
- Collapsed state for empty stages: divider visible, click to expand

### Notification Rows

**Unread:**
- Background: `#F4F3EF`
- Blue dot: `8px` circle, `#2563EB`, left of avatar
- Text: `#1A1916`

**Read:**
- Background: `#FFFFFF`
- No dot
- Text: `#6B6860`

### Workload Bars (Dashboards)

- Track: `#F4F3EF`, height `8px`, radius `4px`
- Fill: `#1A1916`, same height and radius
- Label: avatar + name (DM Sans, 14px) + bar + count (DM Sans, 12px, `#6B6860`)

### Empty States

- Text: DM Sans, 14px, `#A8A69F`, italic
- Positive empties (nothing overdue, no changes requested): subtle green tint background
- Neutral empties: no background change

---

## Layout Patterns

### Top Bar

- Height: `56px`
- Background: `#FFFFFF`
- Bottom border: `1px solid #E8E6E0`
- Wordmark: DM Serif Display, 18px, `#1A1916`
- Nav links: DM Sans, 14px, 500, `#6B6860` (inactive), `#1A1916` (active with underline)
- Icons (search, bell, avatar): `20px`, `#6B6860`

### Studio Layout

```
┌──────────────────────────────────────────────────┐
│ ← FlowerChimp / Social          ‹ Prev  Next ›  │ ← breadcrumb bar
├────────────────────────┬─────────────────────────┤
│                        │                         │
│   Content Canvas       │     Visual Panel        │
│   55% width            │     45% width           │
│                        │                         │
│   [Stage badge]        │   [Image/embed]         │
│   [Metadata chips]     │   [Label]               │
│   [Content fields]     │   [Filmstrip]           │
│   [JOBS panel]         │   [💬 Comments icon]    │
│   [Actions bar]        │                         │
│                        │                         │
├────────────────────────┴─────────────────────────┤
```

With comments sidebar open: `40% / 35% / 25%`

### Task Detail Panel

- Width: `40%` of viewport
- Position: right-aligned, overlays River View
- River View dims behind: semi-transparent overlay `rgba(0,0,0,0.4)` (not the River itself — just a dim overlay)
- Close: `×` button top right, or click outside, or `Esc`
- Shadow: overlay shadow `0 8px 40px rgba(0,0,0,0.12)`

### Dashboard Sections

- Max width: `~720px` centred
- Each section: label in small caps + count badge + content rows
- Count badges: inline, DM Sans, 11px, `#FFFFFF` text on `#DC2626` background (red for attention items) or `#6B6860` background (neutral)
- Section spacing: `32px` between sections
- No cards — rows are flat, separated by subtle `1px solid #E8E6E0` borders

---

## Date Formatting

| Context | Format | Example |
|---|---|---|
| Card due dates | Short month | `10 Apr` |
| Job dates (all) | Short month | `10 Apr` |
| Activity log timestamps | Short month + time | `10 Apr, 2:30pm` |
| Calendar headers | Full month + year | `April 2026` |
| Calendar day cells | Day number only | `10` |
| Dashboard "days since" | Relative | `2h ago`, `Yesterday`, `5 days ago` |
| Batch review dates | Short month + time | `8 Apr, 2:14pm` |

Never use ISO format (2026-04-10) in the UI.

---

## Iconography

Minimal icon usage. Prefer text labels over icons. Where icons are used:

| Icon | Usage | Style |
|---|---|---|
| Search (magnifying glass) | Top bar | 20px, stroke, `#6B6860` |
| Bell | Notifications | 20px, stroke, `#6B6860`. Filled dot overlay when unread count > 0 |
| Speech bubble | Comments sidebar toggle | 20px, stroke, `#6B6860` |
| External link | URL fields | 14px, inline after URL text, `#A8A69F` |
| `×` close | Panels, slide/scene block remove | 16px, `#A8A69F`, visible on hover only |
| `←` back arrow | Breadcrumbs | Inline text, not a separate icon |
| `‹` `›` prev/next | Studio card navigation | Text arrows, DM Sans |

No icon library required. Use simple SVG or text characters. If an icon library is needed, use Lucide (lightweight, clean strokes).
