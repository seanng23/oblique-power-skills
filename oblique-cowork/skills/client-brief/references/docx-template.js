// ═══════════════════════════════════════════════════════════════════════════════
// DOCX TEMPLATE — Master Client Brief
// ═══════════════════════════════════════════════════════════════════════════════
// This is a REFERENCE TEMPLATE. Do not run it as-is.
// Adapt the content sections for each client while keeping the styling,
// helper functions, colour palette, and document structure consistent.
//
// The require path for docx may vary by environment. Check availability with:
//   find /usr -path "*/docx*" -name "index.js" 2>/dev/null | head -3
//   find /sessions -path "*/node_modules/docx*" -name "index.js" 2>/dev/null | head -3
// Then use the full path in require() if the global import doesn't work.
//
// After generating the .docx, validate it:
//   python <docx-skill-path>/scripts/office/validate.py output.docx
// ═══════════════════════════════════════════════════════════════════════════════

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  HeadingLevel, BorderStyle, WidthType, ShadingType,
  PageNumber, PageBreak, TabStopType, TabStopPosition
} = require("/usr/local/lib/node_modules_global/lib/node_modules/docx");

// ── Colour palette ──
const NAVY = "1B2A4A";
const ACCENT = "2E75B6";
const LIGHT_BG = "F2F6FA";
const MID_GREY = "666666";
const BORDER_CLR = "D0D5DD";

// ── Helpers ──
const border = { style: BorderStyle.SINGLE, size: 1, color: BORDER_CLR };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

function heading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 200 },
    children: [new TextRun({ text, bold: true, size: 32, font: "Arial", color: NAVY })],
  });
}

function heading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, bold: true, size: 26, font: "Arial", color: ACCENT })],
  });
}

function body(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 160 },
    children: [new TextRun({ text, size: 22, font: "Arial", color: opts.color || "333333", bold: opts.bold || false, italics: opts.italics || false })],
  });
}

function bodyRuns(runs) {
  return new Paragraph({
    spacing: { after: 160 },
    children: runs.map(r => new TextRun({ size: 22, font: "Arial", color: r.color || "333333", bold: r.bold || false, italics: r.italics || false, text: r.text })),
  });
}

function bulletItem(text, ref = "bullets") {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 80 },
    children: [new TextRun({ text, size: 22, font: "Arial", color: "333333" })],
  });
}

function bulletItemBold(label, value) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 80 },
    children: [
      new TextRun({ text: label + ": ", size: 22, font: "Arial", color: "333333", bold: true }),
      new TextRun({ text: value, size: 22, font: "Arial", color: "333333" }),
    ],
  });
}

function divider() {
  return new Paragraph({
    spacing: { before: 200, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: ACCENT, space: 1 } },
    children: [],
  });
}

function infoRow(label, value, colWidths = [2800, 6560]) {
  return new TableRow({
    children: [
      new TableCell({
        width: { size: colWidths[0], type: WidthType.DXA },
        borders: noBorders,
        margins: cellMargins,
        shading: { fill: LIGHT_BG, type: ShadingType.CLEAR },
        children: [new Paragraph({ children: [new TextRun({ text: label, size: 22, font: "Arial", bold: true, color: NAVY })] })],
      }),
      new TableCell({
        width: { size: colWidths[1], type: WidthType.DXA },
        borders: noBorders,
        margins: cellMargins,
        children: [new Paragraph({ children: [new TextRun({ text: value, size: 22, font: "Arial", color: "333333" })] })],
      }),
    ],
  });
}

function infoTable(rows, colWidths = [2800, 6560]) {
  const totalWidth = colWidths[0] + colWidths[1];
  return new Table({
    width: { size: totalWidth, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: rows.map(([l, v]) => infoRow(l, v, colWidths)),
  });
}

// ── Competitor table ──
function competitorTable(competitors) {
  const cw = [1800, 2600, 2600, 2360];
  const hdr = (text) => new TableCell({
    width: { size: cw[0], type: WidthType.DXA },
    borders,
    margins: cellMargins,
    shading: { fill: NAVY, type: ShadingType.CLEAR },
    children: [new Paragraph({ children: [new TextRun({ text, size: 20, font: "Arial", bold: true, color: "FFFFFF" })] })],
  });
  const cell = (text, w) => new TableCell({
    width: { size: w, type: WidthType.DXA },
    borders,
    margins: cellMargins,
    children: [new Paragraph({ children: [new TextRun({ text, size: 20, font: "Arial", color: "333333" })] })],
  });

  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: cw,
    rows: [
      new TableRow({ children: [hdr("Competitor"), hdr("Positioning"), hdr("Strengths"), hdr("Gaps / Weaknesses")] }),
      ...competitors.map(c => new TableRow({
        children: [cell(c[0], cw[0]), cell(c[1], cw[1]), cell(c[2], cw[2]), cell(c[3], cw[3])],
      })),
    ],
  });
}

// ── BUILD DOCUMENT ──
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: NAVY },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: ACCENT },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
    ],
  },
  numbering: {
    config: [
      { reference: "bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbers",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ],
  },
  sections: [
    // ── COVER PAGE ──
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      children: [
        new Paragraph({ spacing: { before: 3600 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [new TextRun({ text: "OBLIQUE", size: 28, font: "Arial", bold: true, color: MID_GREY, characterSpacing: 300 })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 120 },
          children: [new TextRun({ text: "MASTER CLIENT BRIEF", size: 52, font: "Arial", bold: true, color: NAVY })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT, space: 1 } },
          children: [new TextRun({ text: "Geth\u00E1 Mattress", size: 36, font: "Arial", color: ACCENT })],
        }),
        new Paragraph({ spacing: { after: 200 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Prepared: 24 March 2026", size: 22, font: "Arial", color: MID_GREY })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Account Manager: Jun", size: 22, font: "Arial", color: MID_GREY })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Discovery Call: 1 November 2024", size: 22, font: "Arial", color: MID_GREY })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 600 },
          children: [new TextRun({ text: "CONFIDENTIAL \u2014 FOR INTERNAL OBLIQUE USE ONLY", size: 18, font: "Arial", bold: true, color: "CC0000" })],
        }),
      ],
    },

    // ── MAIN CONTENT ──
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            children: [
              new TextRun({ text: "OBLIQUE", size: 16, font: "Arial", bold: true, color: MID_GREY }),
              new TextRun({ text: "  |  Geth\u00E1 Mattress \u2014 Master Client Brief", size: 16, font: "Arial", color: MID_GREY }),
            ],
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
            border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: BORDER_CLR, space: 1 } },
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "Page ", size: 16, font: "Arial", color: MID_GREY }),
              new TextRun({ children: [PageNumber.CURRENT], size: 16, font: "Arial", color: MID_GREY }),
            ],
          })],
        }),
      },
      children: [
        // ═══════════════════════════════════════════════════════
        // 1. CLIENT SNAPSHOT
        // ═══════════════════════════════════════════════════════
        heading1("1. CLIENT SNAPSHOT"),

        infoTable([
          ["Business Name", "Geth\u00E1 Mattress (Weifong Industries Sdn Bhd)"],
          ["Industry", "Retail / E-commerce \u2014 Mattress, Bedding & Sleep Products"],
          ["Website", "https://getha.com.my"],
          ["Business Model", "E-commerce (Shopify) + Brick & Mortar retail stores"],
          ["Revenue Stage", "Established (RM 200k+/month)"],
          ["Geographic Market", "Malaysia"],
          ["Average Order Value", "RM 550"],
        ]),

        new Paragraph({ spacing: { before: 200 }, children: [] }),

        heading2("What They Sell"),
        body("Getha\u2019s core product is 100% natural Malaysian latex mattresses, underpinned by 55+ years of manufacturing heritage (founded 1969). The product range extends across mattresses, pillows, bolsters, bed sheets, baby sleep products, bed frames, sleep accessories, and recently, hand washes. Their flagship innovation is the Transforme Miracle Latex collection, launched in November 2025, featuring graphite-infused natural latex that is up to 4x more elastic than conventional materials. This launch has been a commercial game-changer for the business."),

        heading2("Business Context (From Research)"),
        body("Getha is one of Malaysia\u2019s most established and recognised sleep brands, with a 4.7-star global rating and over 1,000 verified 5-star reviews. They survived the mid-1980s natural latex industry consolidation (where 10 of 20 factories closed) and have since grown into the leading natural latex mattress manufacturer in Malaysia. The brand has earned multiple awards and was featured in Tatler Asia, The Star, NST, and Free Malaysia Today during their Transforme Miracle Latex launch. Their managing director, Vincent Tan, has spoken about the 8-year R&D cycle behind Miracle Latex, signalling a brand built on product substance rather than marketing hype. Accessories and hand washes have shown strong e-commerce performance, and the brand is increasingly leaning into frequent product launches as a growth lever."),

        divider(),

        // ═══════════════════════════════════════════════════════
        // 2. AUDIENCE PROFILE
        // ═══════════════════════════════════════════════════════
        heading1("2. AUDIENCE PROFILE"),

        heading2("Demographics"),
        bulletItemBold("Income", "High-mid to upper segment. Monthly household income RM 20k\u2013RM 50k+. Managerial level and above."),
        bulletItemBold("Ethnicity", "Majority Chinese Malaysian, partial Malay audience, partial expat community."),
        bulletItemBold("Life Stage", "Homeowners investing in their living spaces. Likely 30\u201355, dual-income households or high-earning singles."),
        bulletItemBold("Location", "Urban Malaysia \u2014 Klang Valley, Penang, Johor Bahru (inferred from retail footprint and income data)."),

        heading2("Psychographics"),
        body("These are people who believe sleep is an investment, not an expense. They don\u2019t need convincing about why natural latex is superior \u2014 they already know. They care deeply about quality, aesthetics, and how their home looks and feels. They\u2019re brand-loyal shoppers who trust established names over marketplace alternatives. They indulge in premium purchases without hesitation on price. They value substance, innovation, and craftsmanship."),

        heading2("Pain Points"),
        bulletItem("Poor sleep quality and the physical toll it takes (neck, shoulder, back pain)."),
        bulletItem("Difficulty finding a mattress brand that genuinely delivers on quality claims."),
        bulletItem("Overwhelmed by choice in a crowded market with aggressive DTC newcomers."),
        bulletItem("Concern about synthetic materials, chemicals, and sustainability of sleep products."),

        heading2("Desires"),
        bulletItem("A mattress that is a long-term investment \u2014 quality that pays for itself over time."),
        bulletItem("A home that looks and feels premium, curated with brands they trust."),
        bulletItem("Confidence they\u2019re buying the best product in the category, backed by heritage and science."),
        bulletItem("Innovation that\u2019s meaningful, not gimmicky (e.g., graphite cooling, BioCool fabric)."),

        heading2("Language They Use (From Reviews & Research)"),
        body("Customer reviews praise \u201Csturdy material,\u201D \u201Cgood stitching,\u201D \u201Cno more shoulder and neck pain.\u201D The brand\u2019s own customers speak in terms of investment, quality, and sleep health. They\u2019re not bargain-hunting \u2014 they\u2019re looking for validation that they\u2019ve chosen the best. Think: \u201CWorth every ringgit,\u201D \u201CFinally sleeping properly,\u201D \u201CYou can feel the difference.\u201D", { italics: false }),

        divider(),

        // ═══════════════════════════════════════════════════════
        // 3. BRAND POSITIONING
        // ═══════════════════════════════════════════════════════
        heading1("3. BRAND POSITIONING"),

        heading2("Current Positioning"),
        body("Getha positions itself as Malaysia\u2019s leading 100% natural latex sleep brand, built on 55+ years of manufacturing heritage. Their messaging centres on \u201Ca luxurious lifestyle brand, featuring the wonders of 100% natural latex.\u201D They lean on authenticity, quality craftsmanship, and Malaysian heritage (the name itself comes from \u201Cgetah\u201D \u2014 Malay for rubber)."),

        heading2("Brand Personality & Tone"),
        bulletItemBold("Aspirational", "Not aspirational in a flashy way \u2014 more \u201Cquietly premium.\u201D Think understated luxury."),
        bulletItemBold("Classy", "Clean, elevated, never loud. The brand wants to be in the same visual league as premium lifestyle brands."),
        bulletItemBold("Authentic", "55 years of heritage. Real Malaysian latex. Real R&D (8 years on Miracle Latex). This isn\u2019t a dropship brand."),
        bulletItemBold("Premium", "Price reflects quality. They never discount in a way that cheapens perception."),

        heading2("What They Want to Be Known For"),
        body("Quality and innovative sleep products that are absolutely worth the money."),

        heading2("Brand Do\u2019s and Don\u2019ts"),
        bodyRuns([
          { text: "DO: ", bold: true },
          { text: "Elevate the brand. Lead with quality, innovation, and heritage. Create aspirational content that makes people feel like they\u2019re investing in something meaningful." },
        ]),
        bodyRuns([
          { text: "DON\u2019T: ", bold: true },
          { text: "Cheapen the brand. Be too salesy. Make the brand look bad. Push promotion-heavy content (that\u2019s for ads, not organic)." },
        ]),

        heading2("Positioning Gaps Identified (From Research)"),
        bulletItem("Getha\u2019s Instagram has 16K followers with 2,500+ posts \u2014 the follower-to-post ratio suggests content may not be optimised for growth or virality. There\u2019s opportunity to shift the content strategy from volume to impact."),
        bulletItem("Competitors like Joey Mattress are winning attention with bold, cheeky, youth-oriented content (street-level DOOH, TikTok-native content). Getha\u2019s premium positioning is a strength, but they risk being seen as \u201Cold guard\u201D if organic content doesn\u2019t evolve."),
        bulletItem("The Transforme Miracle Latex launch earned strong PR (Tatler, The Star, NST, FMT) but sustained social storytelling around the innovation could extend the halo beyond launch week."),
        bulletItem("Getha has a strong heritage story (1969, surviving the 80s latex industry collapse, the meaning behind the name) that is underutilised in their current content mix."),

        divider(),

        // ═══════════════════════════════════════════════════════
        // 4. COMPETITIVE LANDSCAPE
        // ═══════════════════════════════════════════════════════
        heading1("4. COMPETITIVE LANDSCAPE"),

        body("The Malaysian mattress market is driven by rising consumer awareness of sleep health, growing disposable incomes, and accelerating e-commerce adoption. It\u2019s a crowded category with legacy manufacturers, international entrants, and aggressive DTC disruptors. Getha sits in the premium-heritage segment, which is defensible but requires modern marketing execution to maintain relevance."),

        new Paragraph({ spacing: { before: 200 }, children: [] }),

        competitorTable([
          ["Origin Mattress", "DTC hybrid mattress. \u201CBest for back support.\u201D Modern, clean branding.", "Strong SEO play (they write comparison blogs ranking against Getha). Hybrid foam + springs. Competitive pricing.", "No heritage. No latex purity claim. Positions against Getha actively, which signals Getha\u2019s strength."],
          ["Slumberland", "International legacy brand (est. 1919, UK). Hotel-grade quality positioning.", "Brand recognition across SEA. Multi-retailer distribution (Harvey Norman, etc.).", "Less innovation narrative. Doesn\u2019t own a single material story the way Getha owns natural latex."],
          ["Dunlopillo", "First-ever latex mattress brand globally. Medical/hypoallergenic positioning.", "Pioneer credibility. Talasilver antibacterial latex. Wide distribution.", "Heritage story is undermarketed in Malaysia. Less premium lifestyle positioning vs Getha."],
          ["Napure", "Malaysian natural latex brand. Health-focused messaging.", "Direct competitor on the \u201Cnatural latex from Malaysia\u201D angle. Organic/health messaging.", "Smaller brand presence. Less product innovation narrative. Getha\u2019s Miracle Latex creates a clear gap."],
          ["Cuckoo", "Subscription/instalment model. Mass-market wellness brand.", "Massive brand awareness (Putra Brand Awards winner). TikTok Shop integration. Aggressive omni-channel.", "Not a sleep specialist. Mattress is a line extension, not a core product. No latex heritage."],
          ["Joey Mattress", "DTC, online-only, youth-skewed. Playful, cheeky brand voice.", "Excellent social content (viral DOOH, TikTok-first). In-house creative speed. Price competitive.", "No physical retail. No heritage. No premium perception. \u201CMattress in a box\u201D ceiling."],
        ]),

        new Paragraph({ spacing: { before: 200 }, children: [] }),

        heading2("Strategic Opportunity for Getha"),
        body("No other competitor in Malaysia credibly owns the intersection of heritage + innovation + natural latex purity + premium lifestyle. Origin and Joey compete on price and content; Slumberland and Dunlopillo have heritage but lack modern marketing energy; Cuckoo has reach but no sleep authority. Getha\u2019s whitespace is to be the brand that combines \u201C55 years of trusted craftsmanship\u201D with \u201Ccutting-edge sleep science\u201D \u2014 and make that story feel relevant and exciting to a premium audience through modern content and performance marketing."),

        divider(),

        // ═══════════════════════════════════════════════════════
        // 5. GOALS & SUCCESS METRICS
        // ═══════════════════════════════════════════════════════
        heading1("5. GOALS & SUCCESS METRICS"),

        infoTable([
          ["Primary Objective", "Revenue growth via e-commerce, retail, and social growth"],
          ["Timeline", "Immediate \u2014 April launches are the next major milestone"],
          ["Target ROAS", "2.5\u20133x"],
          ["Target CPA", "RM 200"],
          ["Average Order Value", "RM 550"],
          ["Monthly Ad Budget", "RM 50,000\u2013RM 100,000"],
          ["Total Monthly Budget", "RM 30,000\u2013RM 50,000 (all services combined, excl. ad spend)"],
        ]),

        new Paragraph({ spacing: { before: 200 }, children: [] }),

        heading2("What Winning Looks Like"),
        body("Getha measures success through revenue growth and ROAS first, CPA and brand awareness second. This year\u2019s strategy is anchored in frequent product launches (building on the Transforme Miracle Latex momentum), with the April dual-mattress launch as the immediate priority. Winning means the e-commerce channel continues to scale, product launches land commercially, social community keeps growing, and the brand feels more modern and energised without losing its premium positioning."),

        divider(),

        // ═══════════════════════════════════════════════════════
        // 6. SERVICE SCOPE
        // ═══════════════════════════════════════════════════════
        heading1("6. SERVICE SCOPE"),

        // ── 6A. PERFORMANCE MARKETING ──
        heading2("6A. Performance Marketing"),

        infoTable([
          ["Platforms", "Meta (Facebook & Instagram), Google Search"],
          ["Monthly Ad Spend", "RM 50,000\u2013RM 100,000"],
          ["Target CPA", "RM 200"],
          ["AOV", "RM 550"],
          ["Target ROAS", "2.5\u20133x"],
          ["Funnel", "Google & Meta ads \u2192 Shopify e-commerce store"],
          ["Marketplace", "Shopee & Lazada exist but are NOT our responsibility"],
          ["Existing Setup", "Pixels, audiences, and data already configured"],
          ["Existing Creatives", "Yes \u2014 creative assets are available"],
        ]),

        new Paragraph({ spacing: { before: 160 }, children: [] }),

        heading2("Performance Context"),
        body("Getha\u2019s e-commerce is run on Shopify. Their ad accounts are mature with existing pixel data and audiences, which gives us a strong foundation. Accessories and hand washes have shown strong e-commerce performance, while the Transforme Miracle Latex has been a business game-changer. The focus this year is leveraging frequent product launches as commercial events."),

        heading2("Seasonal / Campaign Peaks"),
        bulletItem("April 2026: Dual Miracle Latex mattress launch \u2014 one targeting the low-mid e-commerce market, one upper-tier (RM 10k+ range). This is the immediate priority."),
        bulletItem("Mattress launches happening approximately twice a year moving forward as Getha increases R&D output."),

        heading2("Strategic Note"),
        body("The April dual launch is interesting because it represents a deliberate brand stretch \u2014 one SKU going after a more accessible price point for e-commerce, while the other cements Getha\u2019s ultra-premium position. The performance strategy needs to treat these as fundamentally different audiences and funnels. The accessible SKU can likely convert faster with DTC-style creative (product demos, comparison content), while the premium SKU will need more brand storytelling and trust-building in the funnel.", { italics: true }),

        new Paragraph({ children: [new PageBreak()] }),

        // ── 6B. SOCIAL MEDIA ──
        heading2("6B. Social Media Management"),

        infoTable([
          ["Platforms", "Instagram, TikTok, Facebook"],
          ["Posting Frequency", "2\u20133x per week"],
          ["Production", "Oblique handles all production"],
        ]),

        new Paragraph({ spacing: { before: 160 }, children: [] }),

        heading2("Content That Works"),
        bulletItem("Street interviews \u2014 high engagement, relatable, builds community feel."),
        bulletItem("EGC (Employee-Generated Content) \u2014 authentic, behind-the-scenes, humanises the brand."),
        bulletItem("Storytelling-style content \u2014 narrative-driven pieces that go deeper than product specs."),

        heading2("Content to Avoid"),
        bulletItem("Low-quality UGC that cheapens the brand."),
        bulletItem("Product and promotion-focused content \u2014 this belongs in paid ads, not organic social."),

        heading2("Content Admired"),
        bulletItemBold("International", "Purple Mattress (viral video-first content, in-house studio production) and Casper (lifestyle-led, community-building, content marketing ecosystem)."),
        bulletItemBold("Local", "Joey Mattress (cheeky ad content, bold DOOH, TikTok-native) and Moom Health (note: Moom Health is a supplements brand, not a mattress brand \u2014 client may admire their health/wellness content approach)."),

        heading2("Upcoming Campaign Dates"),
        bulletItem("April 2026: 2x new Miracle Latex launches. All organic social content should build anticipation and support this launch."),

        heading2("Strategic Note"),
        body("The social community has been growing well. The challenge is maintaining premium brand perception while leaning into formats (street interviews, TikTok) that tend to skew casual. The solution is execution quality \u2014 these formats can absolutely work for premium brands when the production value, scripting, and editing are elevated. Think: Aesop\u2019s social presence rather than a fast-fashion brand\u2019s.", { italics: true }),

        new Paragraph({ children: [new PageBreak()] }),

        // ── 6C. KOL / INFLUENCER ──
        heading2("6C. KOL / Influencer Marketing"),

        infoTable([
          ["Product to Promote", "Overall Geth\u00E1 brand (not product-specific)"],
          ["Existing KOL List", "No \u2014 starting from scratch"],
          ["Total Influencer Budget", "RM 5,000\u2013RM 10,000 / month"],
          ["Budget Per Creator", "RM 300\u2013800, preferably barter"],
          ["Creator Tiers", "Micro (10k\u2013100k), Macro (100k\u2013500k), Mega (500k+)"],
          ["Platforms", "Instagram, TikTok"],
          ["Campaign Objective", "Brand Awareness"],
          ["Payment Model", "Mix of gifting and paid"],
          ["Brand Safety", "No specific restrictions noted"],
        ]),

        new Paragraph({ spacing: { before: 160 }, children: [] }),

        heading2("Strategic Note"),
        body("The budget per creator (RM 300\u2013800, preferably barter) positions this as primarily a gifting programme with selective paid placements. At a total monthly budget of RM 5\u201310k, the focus should be on building a rolling roster of micro-creators who genuinely love the product and create content consistently, rather than one-off macro/mega posts. Mega creators at this budget are unrealistic for paid \u2014 but could be approached for gifting if the product experience is compelling enough (which, given the Miracle Latex launch, it likely is). We\u2019ll need to build the KOL list from scratch, so Month 1 should focus on research, outreach, and seeding.", { italics: true }),

        divider(),

        // ═══════════════════════════════════════════════════════
        // 7. KEY DATES & CONSTRAINTS
        // ═══════════════════════════════════════════════════════
        heading1("7. KEY DATES & CONSTRAINTS"),

        infoTable([
          ["Total Monthly Budget", "RM 30,000\u2013RM 50,000 (all services)"],
          ["Monthly Ad Spend", "RM 50,000\u2013RM 100,000"],
          ["Immediate Priority", "April 2026 \u2014 Dual Miracle Latex mattress launch"],
          ["Launch Cadence", "~2 major mattress launches per year going forward"],
          ["Existing Assets", "Logo, brand guidelines, fonts, colour palette, photography, video content"],
          ["Discovery Call", "1 November 2024"],
          ["Account Manager", "Jun"],
        ]),

        new Paragraph({ spacing: { before: 160 }, children: [] }),

        body("Note: The discovery call was conducted in November 2024, meaning there may be a significant gap between onboarding and this brief. Confirm with Jun and the client whether any context has shifted \u2014 particularly around budgets, launch timelines, and competitive dynamics.", { italics: true }),

        divider(),

        // ═══════════════════════════════════════════════════════
        // 8. FLAGS & GAPS
        // ═══════════════════════════════════════════════════════
        heading1("8. FLAGS & GAPS"),

        heading2("Missing Information \u2014 Confirm at Kickoff"),
        bulletItem("Exact April launch dates for the two new Miracle Latex mattresses. We need at least 4\u20136 weeks lead time for performance creative and KOL seeding."),
        bulletItem("Pricing and positioning details for the two new April SKUs (the \u201Clow-mid e-commerce\u201D mattress and the \u201Cupper-tier RM 10k+\u201D mattress). This fundamentally shapes the ad strategy."),
        bulletItem("Shopify store conversion rate, current traffic volume, and existing email list size. Essential for forecasting ROAS and setting realistic CPA targets."),
        bulletItem("Brand safety restrictions for KOL programme \u2014 field was left blank. Need clarity on categories to avoid (e.g., political creators, competitors, adult content)."),
        bulletItem("Current social media analytics \u2014 engagement rates, follower growth trajectory, best-performing posts. Needed to set an organic baseline."),
        bulletItem("Whether Oblique also manages Shopee/Lazada or if cross-platform cannibalisation is a concern."),
        bulletItem("Email marketing \u2014 does Getha have a Klaviyo or similar setup? Given the Shopify ecosystem, email is a major revenue lever that isn\u2019t mentioned in scope."),

        heading2("Assumptions Made"),
        bulletItem("Audience demographics (age range 30\u201355, urban centres) are inferred from income bracket and brand positioning, not explicitly confirmed by client."),
        bulletItem("The \u201CMoom Health\u201D content admiration reference is for their wellness/health content approach \u2014 Moom Health is a supplements brand, not a mattress brand. This may need clarification."),
        bulletItem("We\u2019re assuming the Shopify revamp (mentioned as an upsell opportunity) is being handled separately and not part of this brief\u2019s scope."),
        bulletItem("Budget figures may have changed since the November 2024 discovery call."),

        heading2("Risks & Concerns"),
        bulletItemBold("Delivery risk", "Account manager Jun flagged previous failures in planning ahead, reporting timeliness, and meeting monthly credit deliverables. This suggests operational rigour needs to be a priority from Day 1."),
        bulletItemBold("Brand-performance tension", "Client explicitly says \u201Cnever cheapen the brand\u201D and \u201Cnever be too salesy\u201D \u2014 but also wants aggressive revenue growth and RM 200 CPA. Managing this tension will require clear creative guidelines and regular brand-check touchpoints."),
        bulletItemBold("KOL budget realism", "RM 300\u2013800 per creator with a preference for barter may be challenging for macro/mega tiers. Recommend setting expectations clearly about what each tier costs and what\u2019s achievable at this budget."),
        bulletItemBold("Discovery call age", "This brief is based on a call from November 2024. Market conditions, competitive landscape, and client priorities may have shifted. A refresh conversation is recommended before execution begins."),

        heading2("Upsell Opportunities (Flagged by AM)"),
        bulletItem("Shopify revamp is already underway (managed by Oblique)."),
        bulletItem("SEO / GEO optimisation is the next likely upsell. Given that Origin Mattress is actively writing comparison blogs positioning against Getha, an SEO strategy is arguably urgent."),
        bulletItem("Email marketing (Klaviyo) would be a natural addition to the Shopify ecosystem and could significantly improve customer retention and LTV."),

        divider(),

        // ═══════════════════════════════════════════════════════
        // 9. RECOMMENDED FIRST 30 DAYS
        // ═══════════════════════════════════════════════════════
        heading1("9. RECOMMENDED FIRST 30 DAYS"),

        body("Based on everything in this brief, here is what the Oblique team should prioritise in the first 30 days:"),

        new Paragraph({ spacing: { before: 100 }, children: [] }),

        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "Lock down April launch details. ", size: 22, font: "Arial", bold: true, color: "333333" }),
            new TextRun({ text: "Get confirmed launch dates, pricing, product specs, and hero imagery for both new Miracle Latex SKUs. Everything else depends on this.", size: 22, font: "Arial", color: "333333" }),
          ],
        }),

        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "Audit existing ad accounts and Shopify analytics. ", size: 22, font: "Arial", bold: true, color: "333333" }),
            new TextRun({ text: "Pull historical performance data across Meta and Google. Establish baseline ROAS, CPA, CVR, and traffic benchmarks before launching any new campaigns.", size: 22, font: "Arial", color: "333333" }),
          ],
        }),

        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "Build the April launch performance plan. ", size: 22, font: "Arial", bold: true, color: "333333" }),
            new TextRun({ text: "Create two distinct campaign strategies \u2014 one for the accessible SKU (DTC-style, conversion-focused) and one for the premium SKU (storytelling, consideration, longer funnel). Brief creative accordingly.", size: 22, font: "Arial", color: "333333" }),
          ],
        }),

        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "Social content calendar for April. ", size: 22, font: "Arial", bold: true, color: "333333" }),
            new TextRun({ text: "Plan a 4-week organic content cadence that builds launch anticipation. Include street interview concepts, heritage storytelling pieces, teaser content, and launch-day content. Prioritise quality over quantity.", size: 22, font: "Arial", color: "333333" }),
          ],
        }),

        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "KOL research and outreach. ", size: 22, font: "Arial", bold: true, color: "333333" }),
            new TextRun({ text: "Build an initial shortlist of 20\u201330 micro-creators (lifestyle, home, wellness niches) on Instagram and TikTok. Begin outreach and product seeding to time with the April launch.", size: 22, font: "Arial", color: "333333" }),
          ],
        }),

        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "Set up reporting cadence and templates. ", size: 22, font: "Arial", bold: true, color: "333333" }),
            new TextRun({ text: "Given the AM\u2019s flagged concern about past reporting failures, establish a weekly internal check-in rhythm and a monthly client reporting template from Week 1. Don\u2019t let this slip.", size: 22, font: "Arial", color: "333333" }),
          ],
        }),

        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "Competitive SEO quick scan. ", size: 22, font: "Arial", bold: true, color: "333333" }),
            new TextRun({ text: "Even though SEO isn\u2019t in scope yet, run a quick audit of Origin Mattress\u2019s comparison blog strategy. Document the threat clearly and present to the client as a case for adding SEO to the engagement. This is low-hanging upsell fruit.", size: 22, font: "Arial", color: "333333" }),
          ],
        }),

        new Paragraph({ spacing: { before: 300 }, children: [] }),

        new Paragraph({
          border: { top: { style: BorderStyle.SINGLE, size: 2, color: ACCENT, space: 1 }, bottom: { style: BorderStyle.SINGLE, size: 2, color: ACCENT, space: 1 } },
          spacing: { before: 200, after: 200 },
          children: [new TextRun({ text: "End of Brief \u2014 Prepared by Oblique Strategy Team, 24 March 2026", size: 20, font: "Arial", italics: true, color: MID_GREY })],
        }),
      ],
    },
  ],
});

// ── Write file ──
Packer.toBuffer(doc).then(buffer => {
  const outPath = "/sessions/youthful-clever-hopper/mnt/[OBL] Master/Getha Mattress — Master Client Brief.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("Brief created: " + outPath);
}).catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
