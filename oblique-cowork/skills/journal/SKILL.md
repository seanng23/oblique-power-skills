---
name: journal
description: >
  Ask Sean his daily journal question and save his response to a dated file in his vault's
  Journal folder. Use this skill whenever Sean says "journal", "question of the day",
  "daily reflection", "reflect", or "ask me a question". Also trigger at the end of the
  daily-note flow when prompting the journal question. After Sean responds, save his answer
  to Journal/YYYY-MM-DD.md in his Obsidian vault.
---

# Journal Skill

Ask Sean his rotating question of the day and save his response to his Obsidian vault.

## Who this is for

Sean Ng — CEO of Oblique, KL Malaysia. ENTJ. Deeply values self-reflection, growth, and
authenticity. His responses may be short or long — both are fine. Don't over-prompt.

## Vault path

Journal files live at:
`/sessions/fervent-nice-gauss/mnt/Sean's Oblique Vault/Journal/YYYY-MM-DD.md`

Create the folder if needed: `mkdir -p "/sessions/fervent-nice-gauss/mnt/Sean's Oblique Vault/Journal"`

## Steps

### 1. Get today's date and pick the question

Run:
```bash
python3 -c "
import datetime
d = datetime.date.today()
idx = d.timetuple().tm_yday % 60
print(d.strftime('%Y-%m-%d'))
print(d.strftime('%A, %-d %B %Y'))
print(idx)
"
```

Then read the question bank:
`/sessions/fervent-nice-gauss/mnt/.claude/skills/journal/references/questions.md`

Pick the question at the index returned (0-based, matching the numbered list).

### 2. Check if today's journal already has a response

Check if `/sessions/fervent-nice-gauss/mnt/Sean's Oblique Vault/Journal/YYYY-MM-DD.md` exists
and already contains a response (look for content under `## Response`).

If it does, tell Sean his reflection for today is already saved and offer to show it.
If it doesn't, proceed to ask the question.

### 3. Ask the question

Pose it naturally — don't announce it like a form field. Just ask it conversationally.
Something like:

> "Here's your question for today: [question]"

Keep it simple. Don't add preamble or explain why you're asking it.

### 4. After Sean responds — save to vault

Create or update the journal file:

```markdown
# Journal — {{DISPLAY_DATE}}

## Question
{{QUESTION}}

## Response
{{SEAN'S_RESPONSE}}

---
*Theme: {{THEME}} | Question {{INDEX}}/60*
```

Use `mkdir -p` to create the Journal folder if needed, then write the file using Bash.

Confirm with a single line: "Saved to your journal." Nothing more.

## Tone

- Warm but not gushing
- Don't editorialize on Sean's response — just save it
- If his response is short, that's fine — don't prompt for more unless he seems to want to continue
- If he wants to keep going, let him — just append to the Response section
