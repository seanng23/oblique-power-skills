---
name: research-sourcing
description: "Apply this skill whenever Claude performs web research (searches, fetches, or external lookups) as part of creating ANY output — including Word documents (.docx), PowerPoint presentations (.pptx), PDFs, Markdown reports, or in-chat responses. This is a meta skill: it does not replace other skills, it runs alongside them. Trigger whenever the task involves gathering information from the web AND producing a deliverable of any kind. Examples: building a proposal with competitor research, writing a client brief after searching the web, creating a performance report with sourced benchmarks, drafting copy backed by market data, or answering a question using web search results. Also trigger if the user says 'cite your sources', 'include references', 'add sources to the doc', or 'where did you get that from'. Always use this skill — never skip source attribution when external research is involved."
---

# Research Sourcing — Citation Rules

This skill defines how to track and present sources whenever web research informs any output. The goal is simple: Sean and the team should always be able to verify where a claim came from, without having to leave the document or ask Claude.

## Step 1 — Track Sources As You Go

As you perform research (WebSearch, WebFetch, or any external lookup), maintain a running source log internally. Don't wait until the end. For every piece of information you use or cite in the output:

- Note the **page title** (as it appears on the page or in search results)
- Note the **domain name** (e.g. Statista, Forbes, Meta Business)
- Note the **full URL**

If you searched and landed on multiple pages, log each one separately. If a source was used multiple times, log it only once in the final list. If a source was fetched but the information wasn't ultimately used, you can omit it.

## Step 2 — Format Each Citation

Use this format consistently:

```
Page Title — Source Name (https://full-url.com/path)
```

Examples:
```
Global Digital Ad Spend 2024 — Statista (https://statista.com/statistics/...)
The State of Social Media Marketing — Hootsuite (https://blog.hootsuite.com/...)
Meta Ads Manager Overview — Meta Business Help Centre (https://www.facebook.com/business/help/...)
```

Keep it clean. Don't shorten or truncate URLs — use the full link so it's clickable.

## Step 3 — Place Sources in the Right Location

The placement depends on the output type. Match the format to the document:

### Word Documents (.docx)
Add a **"References"** section as the very last section of the document, after all body content. Use a standard heading style (Heading 1 or Heading 2) so it appears in the table of contents if one exists.

```
References

1. Page Title — Source Name (https://...)
2. Page Title — Source Name (https://...)
```

### PowerPoint Presentations (.pptx)
Add a final slide titled **"Sources"**. Use the same layout as the last content slide (or a blank/minimal layout). List sources in the same numbered format, in a smaller font (10–12pt is fine). The slide does not need to be visually designed — clarity matters more than aesthetics here.

### PDFs
Add a **"References"** section at the end of the document, before any appendices. Match the document's existing heading and body styles.

### Markdown Files (.md)
Add a `## Sources` section at the very end of the file. List sources as a numbered list using standard Markdown:

```markdown
## Sources

1. Page Title — Source Name (https://...)
2. Page Title — Source Name (https://...)
```

### In-Chat Responses
End the response with a **Sources:** block, separated from the main content by a line break. Format as a simple numbered list.

---

## What Counts as a Source

Include:
- Any URL fetched with WebFetch
- Any result from WebSearch that was used to inform the output
- Any MCP-connected tool that returned data used in the output (e.g. Windsor.ai, Google Analytics) — list the tool name and report/connector if no URL is available

Do not include:
- Claude's own training knowledge (no URL to cite)
- Sources fetched but not actually used in the output
- Internal files or documents provided by the user (those are the user's own material)

---

## When There Are No External Sources

If no web research was performed and all content came from Claude's training knowledge or user-supplied files, do not add a Sources section. This skill only applies when external sources were actually consulted.

---

## Quality Check Before Finishing

Before delivering any output, quickly verify:
- Every factual claim backed by external data has a corresponding source
- The source list is at the end (or on the final slide)
- URLs are complete and not truncated
- No placeholder text like "[source]" or "[URL here]" was left behind
