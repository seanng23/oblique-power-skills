#!/usr/bin/env node
/**
 * build_deck.js — Competitor Ad Intelligence
 * Builds an Oblique-branded PowerPoint from processed ad data.
 *
 * Usage:
 *   node build_deck.js \
 *     --data /tmp/all_competitors.json \
 *     --output "/path/to/output.pptx" \
 *     [--client "Lululemon"] \
 *     [--insights "Insight text here"] \
 *     [--implications "Implications text here"]
 *
 * all_competitors.json format:
 * [
 *   { "name": "Nike", "ads": [ ...processed ad objects... ] },
 *   { "name": "Adidas", "ads": [ ... ] }
 * ]
 */

const fs = require("fs");
const path = require("path");

// Install pptxgenjs if needed
let pptxgen;
try {
  pptxgen = require("pptxgenjs");
} catch (e) {
  const { execSync } = require("child_process");
  console.log("Installing pptxgenjs...");
  execSync("npm install pptxgenjs --prefix /tmp/pptx_deps", { stdio: "inherit" });
  pptxgen = require("/tmp/pptx_deps/node_modules/pptxgenjs");
}

// ─── Brand Design System ─────────────────────────────────────────────────────
const C = {
  red: "E51C42",
  dark: "221F1F",
  white: "FFFFFF",
  offWhite: "F7F7F7",
  midGrey: "888888",
  lightGrey: "E8E8E8",
  platformFB: "1877F2",
  platformIG: "C13584",
  platformMeta: "0866FF",
};

const SLIDE_W = 13.33;
const SLIDE_H = 7.5;

const FONT_HEAD = "Arial Black";
const FONT_BODY = "Arial";

// Year stamp helper
function yearStamp() {
  const y = new Date().getFullYear();
  const map = { 2025: "TWENTY25", 2026: "TWENTY26", 2027: "TWENTY27", 2028: "TWENTY28" };
  return map[y] || `TWENTY${String(y).slice(2)}`;
}

function monthYear() {
  const d = new Date();
  return d.toLocaleString("en-US", { month: "long", year: "numeric" });
}

function truncate(text, maxLen) {
  if (!text) return "";
  text = String(text).replace(/\n+/g, " ").trim();
  return text.length > maxLen ? text.slice(0, maxLen - 3) + "..." : text;
}

function truncateUrl(url, maxLen = 45) {
  if (!url) return "";
  try {
    const u = new URL(url);
    const short = u.hostname + u.pathname;
    return short.length > maxLen ? short.slice(0, maxLen - 3) + "..." : short;
  } catch {
    return url.length > maxLen ? url.slice(0, maxLen - 3) + "..." : url;
  }
}

// ─── Recurring Slide Elements ─────────────────────────────────────────────────

/** Top-left label block (section name + year stamp) */
function addLabel(slide, sectionName) {
  slide.addText(
    [
      { text: sectionName, options: { color: C.red, bold: true, breakLine: true } },
      { text: `AD INTELLIGENCE ${yearStamp()}`, options: { color: C.dark, bold: true } },
    ],
    { x: 0.4, y: 0.18, w: 5, h: 0.5, fontSize: 8, fontFace: FONT_BODY, margin: 0 }
  );
}

/** Footer copyright */
function addFooter(slide) {
  slide.addText(`Copyright | Oblique Branding ${new Date().getFullYear()}`, {
    x: 0, y: 7.15, w: SLIDE_W, h: 0.25,
    fontSize: 7, fontFace: FONT_BODY, color: C.midGrey,
    align: "right", margin: [0, 0.3, 0, 0],
  });
}

/** Thin red top accent bar */
function addTopBar(slide) {
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: SLIDE_W, h: 0.07,
    fill: { color: C.red }, line: { color: C.red },
  });
}

// ─── Slide Builders ───────────────────────────────────────────────────────────

/** SLIDE: Cover */
function addCoverSlide(pres, clientName, competitorNames) {
  const slide = pres.addSlide();
  // Dark background
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: SLIDE_W, h: SLIDE_H,
    fill: { color: C.dark }, line: { color: C.dark },
  });
  // Red accent stripe
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: SLIDE_H - 0.12, w: SLIDE_W, h: 0.12,
    fill: { color: C.red }, line: { color: C.red },
  });
  // Left red vertical bar
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: 0.12, h: SLIDE_H,
    fill: { color: C.red }, line: { color: C.red },
  });

  // Main title
  slide.addText("COMPETITOR\nAD INTELLIGENCE", {
    x: 0.6, y: 1.5, w: 8, h: 2.5,
    fontSize: 52, fontFace: FONT_HEAD, bold: true,
    color: C.white, valign: "middle",
  });

  // Competitor names
  const compLabel = competitorNames.join("  ·  ").toUpperCase();
  slide.addText(compLabel, {
    x: 0.6, y: 4.1, w: 10, h: 0.5,
    fontSize: 11, fontFace: FONT_BODY, color: C.red, bold: true,
    charSpacing: 2,
  });

  // Client + date
  slide.addText(`Prepared for ${clientName}  |  ${monthYear()}`, {
    x: 0.6, y: 4.7, w: 10, h: 0.4,
    fontSize: 12, fontFace: FONT_BODY, color: "AAAAAA",
  });

  // Oblique wordmark (bottom right)
  slide.addText("OBLIQUE", {
    x: SLIDE_W - 2.4, y: SLIDE_H - 0.55, w: 2.2, h: 0.35,
    fontSize: 14, fontFace: FONT_HEAD, bold: true, color: C.white,
    align: "right",
  });
}

/** SLIDE: Overview / methodology table */
function addOverviewSlide(pres, competitors, clientName) {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addTopBar(slide);
  addLabel(slide, "OVERVIEW");
  addFooter(slide);

  slide.addText("What We Analysed", {
    x: 0.4, y: 0.55, w: 10, h: 0.7,
    fontSize: 28, fontFace: FONT_HEAD, bold: true, color: C.dark,
  });

  // Table
  const tableData = [
    [
      { text: "COMPETITOR", options: { bold: true, color: C.white } },
      { text: "ADS ANALYSED", options: { bold: true, color: C.white } },
      { text: "LONGEST-RUNNING AD", options: { bold: true, color: C.white } },
      { text: "FORMATS FOUND", options: { bold: true, color: C.white } },
    ],
  ];

  competitors.forEach((comp) => {
    const ads = comp.ads || [];
    const oldest = ads.find((a) => a.start_date);
    const formats = [...new Set(ads.map((a) => a.format.split(" ")[0]))].join(", ");
    tableData.push([
      { text: comp.name },
      { text: String(ads.length) },
      { text: oldest ? `${oldest.duration} (since ${oldest.start_date})` : "Unknown" },
      { text: formats || "Mixed" },
    ]);
  });

  slide.addTable(tableData, {
    x: 0.4, y: 1.4, w: 12.5,
    rowH: 0.55,
    fill: { color: C.white },
    border: { pt: 0.5, color: C.lightGrey },
    fontFace: FONT_BODY,
    fontSize: 11,
    color: C.dark,
    valign: "middle",
    align: "left",
    colW: [3.5, 2.0, 4.5, 2.5],
  });

  // Header row styling
  const headerFill = { color: C.red };
  // pptxgenjs doesn't support per-row fill directly in addTable — we style via the data options above

  // Methodology note
  slide.addText(
    "Methodology: Active ads only. Sorted by delivery start date ascending — longest-running ads are surfaced first as the best proxy for performance.",
    {
      x: 0.4, y: 6.2, w: 12.5, h: 0.8,
      fontSize: 10, fontFace: FONT_BODY, color: C.midGrey, italic: true,
    }
  );
}

/** SLIDE: Competitor section header */
function addCompetitorHeaderSlide(pres, competitorName, adCount, oldestAd) {
  const slide = pres.addSlide();
  // Red background
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: SLIDE_W, h: SLIDE_H,
    fill: { color: C.red }, line: { color: C.red },
  });
  // Dark stripe at bottom
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: SLIDE_H - 1.2, w: SLIDE_W, h: 1.2,
    fill: { color: C.dark }, line: { color: C.dark },
  });

  // Section label
  slide.addText("COMPETITOR ANALYSIS", {
    x: 0.5, y: 0.4, w: 8, h: 0.4,
    fontSize: 10, fontFace: FONT_BODY, color: C.white, bold: true, charSpacing: 3,
  });

  // Competitor name
  slide.addText(competitorName.toUpperCase(), {
    x: 0.5, y: 1.0, w: 12, h: 2.5,
    fontSize: 64, fontFace: FONT_HEAD, bold: true, color: C.white,
  });

  // Stats row in dark stripe
  const statsItems = [`${adCount} ads analysed`];
  if (oldestAd && oldestAd.duration) {
    statsItems.push(`Longest-running: ${oldestAd.duration}`);
  }
  if (oldestAd && oldestAd.start_date) {
    statsItems.push(`Running since: ${oldestAd.start_date}`);
  }

  slide.addText(statsItems.join("   ·   "), {
    x: 0.5, y: SLIDE_H - 1.0, w: 12, h: 0.6,
    fontSize: 12, fontFace: FONT_BODY, color: C.white,
  });

  addFooter(slide);
}

/** SLIDE: Individual ad */
function addAdSlide(pres, ad, competitorName, adIndex, totalAds) {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addTopBar(slide);
  addLabel(slide, competitorName.toUpperCase());
  addFooter(slide);

  // Ad number (top right)
  slide.addText(`Ad ${adIndex} of ${totalAds}`, {
    x: SLIDE_W - 2.5, y: 0.18, w: 2.3, h: 0.45,
    fontSize: 8, fontFace: FONT_BODY, color: C.midGrey,
    align: "right", margin: 0,
  });

  // ─── Left: Ad Image ────────────────────────────────────────────────────────
  const IMG_X = 0.35;
  const IMG_Y = 0.8;
  const IMG_W = 7.1;
  const IMG_H = 5.9;

  if (ad.local_image && fs.existsSync(ad.local_image)) {
    try {
      slide.addImage({
        path: ad.local_image,
        x: IMG_X, y: IMG_Y, w: IMG_W, h: IMG_H,
        sizing: { type: "contain", w: IMG_W, h: IMG_H },
      });
    } catch (imgErr) {
      addImagePlaceholder(slide, IMG_X, IMG_Y, IMG_W, IMG_H, "Image unavailable");
    }
  } else {
    addImagePlaceholder(slide, IMG_X, IMG_Y, IMG_W, IMG_H, ad.image_url ? "Image could not be loaded" : "No image found");
  }

  // ─── Right: Metadata Panel ─────────────────────────────────────────────────
  const RX = 7.9;
  const RW = SLIDE_W - RX - 0.25;
  let ry = IMG_Y;

  // Duration badge (most prominent)
  slide.addShape(pres.ShapeType.rect, {
    x: RX, y: ry, w: RW, h: 0.65,
    fill: { color: C.red }, line: { color: C.red }, rounding: false,
  });
  slide.addText(
    [
      { text: "RUNNING FOR  ", options: { color: "FFAAAA", bold: false } },
      { text: ad.duration || "Unknown", options: { color: C.white, bold: true } },
    ],
    {
      x: RX, y: ry, w: RW, h: 0.65,
      fontSize: 11, fontFace: FONT_BODY, valign: "middle", align: "center", margin: 0,
    }
  );
  ry += 0.75;

  // Start date
  if (ad.start_date) {
    slide.addText(`Since ${ad.start_date}`, {
      x: RX, y: ry, w: RW, h: 0.3,
      fontSize: 9, fontFace: FONT_BODY, color: C.midGrey, align: "center",
    });
    ry += 0.38;
  }

  // Platform + format tags
  const tags = [];
  (ad.platforms || []).forEach((p) => tags.push(p));
  if (ad.format) tags.push(ad.format);
  if (tags.length > 0) {
    slide.addText(tags.join("  ·  "), {
      x: RX, y: ry, w: RW, h: 0.32,
      fontSize: 9, fontFace: FONT_BODY, color: C.red, bold: true,
      align: "center", charSpacing: 1,
    });
    ry += 0.42;
  }

  // Divider
  slide.addShape(pres.ShapeType.line, {
    x: RX, y: ry, w: RW, h: 0,
    line: { color: C.lightGrey, width: 0.75 },
  });
  ry += 0.15;

  // Headline
  if (ad.headline) {
    slide.addText(truncate(ad.headline, 80), {
      x: RX, y: ry, w: RW, h: 0.7,
      fontSize: 13, fontFace: FONT_HEAD, bold: true, color: C.dark,
      wrap: true,
    });
    ry += 0.8;
  }

  // Body copy
  const bodyAvailableH = 6.65 - ry;
  const bodyMaxH = Math.min(bodyAvailableH - 1.0, 2.2);
  if (ad.body && bodyMaxH > 0.4) {
    slide.addText(truncate(ad.body, 280), {
      x: RX, y: ry, w: RW, h: bodyMaxH,
      fontSize: 10, fontFace: FONT_BODY, color: C.dark,
      wrap: true, valign: "top",
    });
    ry += bodyMaxH + 0.1;
  }

  // CTA button
  if (ad.cta) {
    slide.addShape(pres.ShapeType.rect, {
      x: RX, y: ry, w: RW, h: 0.42,
      fill: { color: C.dark }, line: { color: C.dark },
    });
    slide.addText(ad.cta.toUpperCase(), {
      x: RX, y: ry, w: RW, h: 0.42,
      fontSize: 9, fontFace: FONT_BODY, bold: true, color: C.white,
      align: "center", valign: "middle", charSpacing: 1, margin: 0,
    });
    ry += 0.52;
  }

  // Link
  if (ad.link) {
    slide.addText(truncateUrl(ad.link), {
      x: RX, y: ry, w: RW, h: 0.3,
      fontSize: 8, fontFace: FONT_BODY, color: C.midGrey,
      align: "center", wrap: false,
    });
    ry += 0.35;
  }

  // Impressions (if available)
  const imps = ad.impressions || {};
  if (imps.lower || imps.upper) {
    const impsText = `Est. reach: ${imps.lower || "?"} – ${imps.upper || "?"} impressions`;
    slide.addText(impsText, {
      x: RX, y: Math.max(ry, 6.9), w: RW, h: 0.28,
      fontSize: 7.5, fontFace: FONT_BODY, color: C.midGrey,
      align: "center", italic: true,
    });
  }
}

/** Placeholder for when an image can't be loaded */
function addImagePlaceholder(slide, x, y, w, h, message) {
  slide.addShape(pres.ShapeType.rect, {
    x, y, w, h,
    fill: { color: C.offWhite },
    line: { color: C.lightGrey, width: 1 },
  });
  slide.addText([
    { text: "🖼", options: { fontSize: 36, breakLine: true } },
    { text: message || "Image not available", options: { fontSize: 11, color: C.midGrey } },
  ], {
    x, y: y + h / 2 - 0.5, w, h: 1.0,
    align: "center", valign: "middle", fontFace: FONT_BODY,
  });
}

/** SLIDE: Creative Patterns */
function addPatternsSlide(pres, insights) {
  const slide = pres.addSlide();
  slide.background = { color: C.offWhite };
  addTopBar(slide);
  addLabel(slide, "CREATIVE PATTERNS");
  addFooter(slide);

  slide.addText("What's Working Across Competitors", {
    x: 0.4, y: 0.55, w: 12, h: 0.7,
    fontSize: 28, fontFace: FONT_HEAD, bold: true, color: C.dark,
  });

  // Red accent line under title
  slide.addShape(pres.ShapeType.rect, {
    x: 0.4, y: 1.35, w: 3.0, h: 0.06,
    fill: { color: C.red }, line: { color: C.red },
  });

  // Insights text or bullet points
  const insightsText = insights || "Analysis of creative patterns across all competitors.";
  const bulletLines = insightsText.split(/\n+/).filter((l) => l.trim());

  if (bulletLines.length > 1) {
    const bulletItems = bulletLines.map((line, i) => ({
      text: line.trim().replace(/^[-•·]\s*/, ""),
      options: { bullet: i < bulletLines.length - 1 ? { color: C.red } : { color: C.red }, breakLine: true, fontSize: 13, color: C.dark },
    }));
    slide.addText(bulletItems, {
      x: 0.5, y: 1.55, w: 12.3, h: 5.5,
      fontFace: FONT_BODY, fontSize: 13, color: C.dark,
      valign: "top", wrap: true,
    });
  } else {
    slide.addText(insightsText, {
      x: 0.5, y: 1.55, w: 12.3, h: 5.5,
      fontFace: FONT_BODY, fontSize: 13, color: C.dark,
      valign: "top", wrap: true,
    });
  }
}

/** SLIDE: Implications / Recommendations */
function addImplicationsSlide(pres, clientName, implications) {
  const slide = pres.addSlide();
  // Dark background
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: SLIDE_W, h: SLIDE_H,
    fill: { color: C.dark }, line: { color: C.dark },
  });
  addTopBar(slide);

  slide.addText(`WHAT THIS MEANS\nFOR ${(clientName || "YOUR BRAND").toUpperCase()}`, {
    x: 0.5, y: 0.55, w: 12, h: 1.6,
    fontSize: 32, fontFace: FONT_HEAD, bold: true, color: C.white,
  });

  // Red divider
  slide.addShape(pres.ShapeType.rect, {
    x: 0.5, y: 2.25, w: 3.5, h: 0.06,
    fill: { color: C.red }, line: { color: C.red },
  });

  const implText = implications || "Strategic recommendations based on the competitive ad landscape.";
  const lines = implText.split(/\n+/).filter((l) => l.trim());

  if (lines.length > 1) {
    const items = lines.map((line, i) => ({
      text: line.trim().replace(/^[-•·\d.]\s*/, ""),
      options: {
        bullet: { color: C.red, indent: 15 },
        breakLine: i < lines.length - 1,
        fontSize: 13,
        color: C.white,
        paraSpaceAfter: 8,
      },
    }));
    slide.addText(items, {
      x: 0.5, y: 2.4, w: 12.3, h: 4.5,
      fontFace: FONT_BODY, fontSize: 13, color: C.white,
      valign: "top", wrap: true,
    });
  } else {
    slide.addText(implText, {
      x: 0.5, y: 2.4, w: 12.3, h: 4.5,
      fontFace: FONT_BODY, fontSize: 13, color: C.white,
      valign: "top", wrap: true,
    });
  }

  // Oblique wordmark
  slide.addText("OBLIQUE", {
    x: SLIDE_W - 2.4, y: SLIDE_H - 0.55, w: 2.2, h: 0.35,
    fontSize: 14, fontFace: FONT_HEAD, bold: true, color: C.red,
    align: "right",
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

// Parse CLI args
const args = {};
process.argv.slice(2).forEach((arg, i, arr) => {
  if (arg.startsWith("--")) {
    const key = arg.slice(2);
    args[key] = arr[i + 1] && !arr[i + 1].startsWith("--") ? arr[i + 1] : true;
  }
});

if (!args.data || !args.output) {
  console.error("Usage: node build_deck.js --data <all_competitors.json> --output <output.pptx>");
  process.exit(1);
}

const rawData = JSON.parse(fs.readFileSync(args.data, "utf8"));
const competitors = Array.isArray(rawData) ? rawData : [rawData];
const clientName = args.client || "Client";
const insights = args.insights || null;
const implications = args.implications || null;

// Build deck
pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33" × 7.5"

// 1. Cover
addCoverSlide(pres, clientName, competitors.map((c) => c.name));

// 2. Overview
addOverviewSlide(pres, competitors, clientName);

// 3. Per-competitor slides
competitors.forEach((comp) => {
  const ads = comp.ads || [];
  const oldestAd = ads.find((a) => a.start_date) || null;

  // Section header
  addCompetitorHeaderSlide(pres, comp.name, ads.length, oldestAd);

  // Ad slides
  ads.forEach((ad, i) => {
    addAdSlide(pres, ad, comp.name, i + 1, ads.length);
  });
});

// 4. Creative patterns
addPatternsSlide(pres, insights);

// 5. Implications
addImplicationsSlide(pres, clientName, implications);

// Write file
pres
  .writeFile({ fileName: args.output })
  .then(() => {
    console.log(`✓ Deck saved to: ${args.output}`);
    console.log(`  Slides: ${2 + competitors.reduce((s, c) => s + 1 + (c.ads || []).length, 0) + 2}`);
  })
  .catch((err) => {
    console.error("Error writing PPTX:", err.message);
    process.exit(1);
  });
