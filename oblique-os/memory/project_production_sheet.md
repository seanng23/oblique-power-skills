---
name: Print-friendly Production Sheet for shoots
description: Production teams need a portable offline-capable shoot reference — public HTML page with magic link, printable/saveable as PDF, replacing current slide decks
type: project
---

Production teams need a clean, portable reference for shoot days that works without logging in.

- Decided on Option A: print-friendly HTML page via public magic-link route (same pattern as client review)
- Shows all production card data: scenes, script, shot notes, visual references, shoot schedule
- CSS `@media print` for clean formatting; browser "Save as PDF" for offline
- No auth required — stateless token URL, bookmarkable/shareable
- Replaces the current workflow of PowerPoint slides that get printed or shown on-set

**Why:** Slides were used because they're offline, printable, and easy to hand around on-set. The dashboard requires login and internet. This bridges the gap.

**How to apply:** Build during Phase 4 (Job System) when production fields and shoot schedules exist. User may provide a reference mock or sample slide for layout — check before designing. Route pattern: `/print/[token]` or similar public route.
