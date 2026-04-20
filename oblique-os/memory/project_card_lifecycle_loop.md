---
name: Card lifecycle loops back to originating team for posting
description: Ready to Post cards must surface in the originating team's work queue (Social or Performance) — they have both a creation and posting role in the pipeline
type: project
---

Cards flow back to the originating team at "Ready to Post" for actual posting.

- Social cards at Ready to Post → appear in Social team's My Work / to-do list
- Ads cards at Ready to Post → appear in Performance Marketing team's My Work / to-do list
- The Social and Performance teams have TWO roles: creating cards (Ideation/Brief) AND posting them (Ready to Post → Posted)
- This applies to My Work views, team dashboards, and notification routing

**Why:** The originating team handles the final publishing step — they know the posting schedule, platform specifics, and client expectations. Design and Production teams hand off; they don't post.

**How to apply:** When building My Work (Phase 4) and team dashboards (Phase 4/6), query must include "Ready to Post" cards where the board's service_type maps to the user's department. Notification should fire when a card enters Ready to Post to alert the originating team.
