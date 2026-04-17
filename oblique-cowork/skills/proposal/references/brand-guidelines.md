# Oblique Brand Guidelines — Proposal Design System

## Colours

| Role | Hex | Usage |
|------|-----|-------|
| Primary Red | #E51C42 | Section headers, accent elements, CTA buttons, highlight bars |
| Near-Black | #221F1F | Body text, dark backgrounds, footer |
| White | #FFFFFF | Primary background, text on dark slides |
| Off-White | #F7F7F7 | Secondary background, card backgrounds |

## Typography (pptxgenjs)

**Primary font: Mont** — Oblique's brand typeface. Use Mont for all headings, labels, and display text.
For body text and tables where Mont may not render in pptxgenjs, fall back to Arial.

To use Mont in pptxgenjs: specify `fontFace: "Mont"` in text options. If the font isn't available in the
rendering environment, fall back to `"Arial"` for body and `"Arial Black"` for headlines.

| Element | Font | Size | Weight | Colour |
|---------|------|------|--------|--------|
| Slide section label (top-left tag) | Mont / Arial | 9pt | Bold | #E51C42 |
| Year stamp (e.g. "PROPOSAL TWENTY26") | Mont / Arial | 9pt | Bold | #221F1F |
| Slide headline | Mont Heavy / Arial Black | 28–36pt | Bold | #221F1F or #FFFFFF |
| Subheadline | Mont SemiBold / Arial | 16–18pt | SemiBold | #221F1F |
| Body text | Mont / Arial | 11–13pt | Normal | #221F1F |
| Table header | Mont / Arial | 10pt | Bold | #FFFFFF (on #E51C42 bg) |
| Table body | Mont / Arial | 10pt | Normal | #221F1F |
| Footer copyright | Mont / Arial | 8pt | Normal | #888888 |

## Slide Dimensions
Standard widescreen: 13.33" × 7.5" (pptxgenjs default)

## Recurring Elements on Every Slide

### Top-left label block
Two lines, top-left corner (x: 0.4, y: 0.2):
- Line 1: Section name (e.g. "INTRODUCTION") — 9pt, bold, #E51C42
- Line 2: "PROPOSAL TWENTY[YY]" — 9pt, bold, #221F1F
Skip on the cover slide and full-bleed visual slides.

### Footer copyright
Bottom of every slide (y: 7.1):
- "Copyright | Oblique Branding [YEAR]" — 8pt, #888888, right-aligned

### Red accent bar
A thin horizontal red bar (#E51C42) used as a visual divider on section transition slides.
Width: full width. Height: 0.05".

## Slide Background Patterns

| Slide type | Background |
|------------|------------|
| Cover | Dark (#221F1F) with red accent graphic |
| Section divider / transition | #E51C42 red or #221F1F dark |
| Content slides | #FFFFFF white |
| About / team / case study slides | #F7F7F7 off-white |
| Investment / close | #221F1F dark |

## Logo Usage
"Oblique" or "Oblique Branding" wordmark. Place on cover and close slides.
On white slides, use dark version. On dark slides, use white version.

## Year Stamp Convention
Write the year as "TWENTY" + last two digits: 2026 → "TWENTY26", 2027 → "TWENTY27"
