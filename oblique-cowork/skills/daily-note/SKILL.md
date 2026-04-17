---
name: daily-note
description: >
  Generate a pre-filled daily note for Sean and save it to his Obsidian vault. Use this skill
  whenever Sean asks for his daily briefing, daily note, morning summary, or "what's on my
  plate today". Also trigger when running as a scheduled task at 8:30am. The skill pulls
  today's Google Calendar events, important unread Gmail messages, and open tasks from the
  Active Projects Board, then writes a structured Markdown note to the vault's Daily Notes
  folder. Always use this skill for any request involving a daily note, morning rundown,
  or daily schedule summary.
---

# Daily Note Skill

Generate a fully pre-filled daily note for Sean Ng and save it to his Obsidian vault.

## Who this is for

Sean is the CEO of Oblique, a branding and performance marketing agency in KL, Malaysia.
His timezone is **MYT (UTC+8)**. He works Monday–Friday. All times in the note should be in MYT.

## Steps

### 1. Get today's date
Use Bash to get today's date: `date +%Y-%m-%d` and `date +"%A, %-d %B %Y"` for the display format.

### 2. Pull today's calendar events
Use the `gcal_list_events` tool:
- timeMin: today at 00:00:00+08:00
- timeMax: today at 23:59:59+08:00
- timezone: Asia/Kuala_Lumpur
- List all calendars if needed. Filter out declined events.
- Convert all times to MYT for display.
- Note any all-day events (these often indicate team leave/absence).

### 3. Pull important unread emails
Use `gmail_search_messages` with query: `is:unread is:important` and maxResults: 8.
For each result, extract: sender name, subject, and the snippet.
Filter out obvious automated notifications (calendar invites already captured above, shipping notifications, newsletters). Focus on emails that require Sean's attention or response.

### 4. Read the Active Projects Board
Read the file at:
`/sessions/fervent-nice-gauss/mnt/Sean's Oblique Vault/10 - Oblique/Active Projects/Active Projects Board.md`

Extract:
- Tasks from "🔴 Due This Week" where Owner is Sean or is blank
- Tasks from "🔵 In Progress / No Hard Deadline" where Owner is Sean, Priority is High

Highlight any tasks due today specifically.

### 5. Write the daily note

Save to: `/sessions/fervent-nice-gauss/mnt/Sean's Oblique Vault/Daily Notes/YYYY-MM-DD.md`
(Use the actual date, e.g. `2026-03-25.md`)

If the `Daily Notes/` folder doesn't exist, create it with `mkdir -p`.

Use this exact template, populated with real data:

---

```markdown
# {{DISPLAY_DATE}}

---

## 🧠 Top of Mind

*What's the one thing that will make today count?*

>

---

## 👥 Team Today

{{TEAM_STATUS}}

---

## 🗓️ Schedule

{{CALENDAR_EVENTS}}

---

## 📬 Emails to Action

{{EMAIL_ITEMS}}

---

## ✅ Tasks

### Due Today
{{TASKS_DUE_TODAY}}

### Due This Week
{{TASKS_DUE_THIS_WEEK}}

### In Progress (High Priority)
{{TASKS_IN_PROGRESS}}

---

## 📋 Today's Focus

### Oblique
- [ ]
- [ ]
- [ ]

### BrandedbySean
- [ ]

### Personal
- [ ]

---

## 📥 Capture

*Thoughts, ideas, things you don't want to lose. Sort later.*

-

---

## 💬 Conversations & Decisions

*Important things discussed or decided today.*

-

---

## 🔄 End of Day

**What moved today?**

**What got stuck? Why?**

**One thing for tomorrow:**

---

*Links: [[🏠 Home]] | [[00 - Inbox/Inbox]] | [[10 - Oblique/Active Projects/Active Projects Board]]*
```

---

## Formatting rules for each section

**TEAM_STATUS**: List all-day events that appear to be leave/absence (e.g. "Asraf on Raya leave", "Bryan on leave"). If none, write `All hands available.`

**CALENDAR_EVENTS**: List each meeting as:
```
- **HH:MM – HH:MM** — Event name *(location or Google Meet if applicable)*
```
Sort chronologically. If no meetings, write `No meetings scheduled.`

**EMAIL_ITEMS**: List each actionable email as:
```
- **[Sender Name]** re: *Subject* — one-line summary of what needs action
```
If no actionable emails, write `Inbox clear.`

**TASKS_DUE_TODAY**: Pull tasks whose Due date matches today's date. Format as:
```
- [ ] Task name *(Category)*
```
If none, write `Nothing due today.`

**TASKS_DUE_THIS_WEEK**: All other tasks from "🔴 Due This Week" assigned to Sean. Same format. If none, write `—`

**TASKS_IN_PROGRESS**: High priority tasks from "🔵 In Progress" assigned to Sean. Same format. If none, write `—`

## Tone and style

- Keep it clean and scannable — this is a working document, not a report
- Don't add commentary, preamble, or AI filler text
- Don't use antithetical pivot sentences ("not just X — it's Y")
- Times in MYT, 12-hour format with AM/PM (e.g. 9:00 AM, 10:30 AM)

## After saving

After saving the vault note, deliver a conversational in-chat briefing. This is what Sean actually reads — make it warm, direct, and scannable. Use natural prose with context on each item, not bare bullet points.

Structure it like this:

- Open with: "Here's your day at a glance, Sean:"
- **Team heads-up** (if anyone is out): who's absent and until when. Skip if all hands available.
- **Your schedule (MYT):** Each meeting on its own line — time range, then a sentence of context. What kind of call is it? RSVP status? Any flags? Don't just list the meeting name.
- **Unread emails worth your attention:** Sender + subject, then one sentence on what needs to happen. Skip pure FYIs.
- **Tasks on your plate:** Due today first, then due this week. One line each.
- Close with a single sentence summing up the shape of the day, and an offer to help with something specific.

Tone rules:
- Write like a sharp EA giving a morning rundown — direct, warm, useful
- Add context per item: RSVP status, who sent it, what's at stake
- No antithetical pivot sentences ("not just X — it's Y")
- No filler openers
- Times in MYT, 12-hour format (9:00 AM, 10:30 PM)

## Journal question of the day

After delivering the in-chat summary, always end with today's journal question.

To pick the question:
1. Run: `python3 -c "import datetime; d=datetime.date.today(); print(d.timetuple().tm_yday % 60)"`
2. Read: `/sessions/fervent-nice-gauss/mnt/.claude/skills/journal/references/questions.md`
3. Select the question at that index (0-based, matching the numbered list 0–59)

Pose it naturally after the briefing, like:

> "One more thing — here's your question for today: [question]"

Don't explain the rotation system or mention index numbers. Just ask it. When Sean responds in the next message, save his answer to the vault at:
`/sessions/fervent-nice-gauss/mnt/Sean's Oblique Vault/Journal/YYYY-MM-DD.md`

Use this format for the journal file:

```markdown
# Journal — {{DISPLAY_DATE}}

## Question
{{QUESTION}}

## Response
{{SEAN'S RESPONSE}}

---
*Theme: {{THEME}} | Question {{INDEX}}/60*
```

Confirm with just: "Saved to your journal."
