# UI Direction Research: Minimal, New, Premium, Light + Dark (Oct 3, 2026)

Research for the visual and interaction direction of the portfolio site. The brief: **clean, neat, minimal and simple, but new and innovative; it must not feel cheap; light and dark mode; built in React later.** The inspiration sources were given: [RareUI](https://www.rareui.com/components), [landing.love](https://www.landing.love/), [Fontshare](https://fontshare.com/), [Originkit](https://www.originkit.dev/category/interactive-elements) and Vue Bits (see [`VUEBITS_README.md`](../../VUEBITS_README.md)).

The output of this research is the design spec, [`design/portfolio.design.md`](../../design/portfolio.design.md), and the Design canvas built from it.

---

## 1. Research plan

| | |
|---|---|
| **Objective** | Pick one visual + interaction direction that reads minimal and premium, feels new in 2026, works in both themes, and serves the two readers established in [`recruiter_expectations.md`](../Portfolio%20best%20practices%202026/recruiter_expectations.md). |
| **Questions** | (1) What do the given references do that reads "premium", and what reads "cheap"? (2) Which 2026 patterns are fresh, and which are already clichés? (3) Which components are worth porting to React, and under what licence? (4) Which type and colour system fits "minimal but new"? (5) How do we keep the innovation on-message ("AI systems you can audit") instead of decorative? |
| **Methods** | Inspiration audit of the 5 given sources; component teardown (21 RareUI demo videos, 12 React Bits previews, 10 Originkit detail pages); full-page recordings of 9 award-listed portfolios from landing.love; type testing (12 pairings × 2 themes, rendered with real copy); WCAG contrast computation for the palette; synthesis with the recruiter research already in this repo. |
| **Participants** | **None yet.** No recruiter or engineer interviews were run. Section 9 is a ready-to-run validation plan for the prototype. Everything below is an expert audit plus secondary research, and is labelled as such. |
| **Tools** | Headless Chromium (Playwright) for screenshots and computed styles; the Fontshare public API for the full font catalogue; GitHub source for RareUI; ffmpeg contact sheets from demo videos. |

### Access notes (what could and couldn't be seen)

- **RareUI's live site is behind a Vercel Security Checkpoint** that blocked every automated browser (headless and headed). Claude in Chrome wasn't connected. I did not try to get around the checkpoint. RareUI is open source, so I studied its [GitHub source](https://github.com/swamimalode07/rare-ui) (styles, fonts, motion values) and the 21 demo videos shipped in the repo. Running the site locally was not permitted in this session.
- **Originkit**: many components are Pro-locked, and several free ones failed to load an external Framer/CDN dependency during testing. Category grids and the free pages were reviewed.
- Everything else (landing.love, Fontshare, React Bits, Vue Bits) loaded normally.

Images referenced below are in [`img/`](img/) (compressed, for internal reference only).

---

## 2. Who the site is for (from the existing research)

Two readers, two speeds (detail: [`recruiter_expectations.md`](../Portfolio%20best%20practices%202026/recruiter_expectations.md)).

| Reader | Job to be done | Time | What fails them |
|---|---|---|---|
| **Recruiter** | "When I open a candidate's link, I want to know in seconds what they do, that they're real, and where the resume is, so I can pass them on." | ~10 s | Intro animations, slow loads, hidden resume, vague role |
| **Engineer / hiring manager** | "When I'm deciding whether to interview, I want to check one or two projects deeply, so I can trust the claims and judge their trade-offs." | 2–5 min | Unverifiable numbers, mislabelled techniques, dead demos, no limitations |

**Journey** (inferred, not measured): link from resume, LinkedIn or a referral, often on a phone → 0–10 s hero skim → 10–60 s scan of the work list → 1–5 min in one case study (evals, decisions, what broke) → action (resume, email, GitHub).

**Implication for the visual design:** the look has to get out of the way in the first 10 seconds and reward inspection after that. "Innovative" therefore belongs in the *inspection layer*, not in a loading sequence.

---

## 3. Source audits

### 3.1 RareUI: rare, restrained micro-interactions

[Repo](https://github.com/swamimalode07/rare-ui) (1,631★, pushed Sep 30, 2026). A shadcn registry: Next.js 16, React 19, Tailwind 4, Motion 12. 22 components.

**What reads premium**
- **Monochrome plus one accent.** Near-black / white surfaces with a single orange (#FC4C01) used for the active state only. Text selection is tinted with the accent at 10%.
- **Instrument-like details.** The Animated Counter rolls each digit like an odometer above a tick-mark ruler with a red needle. The GitHub Activity card turns a contribution heatmap into an expandable "top contributions" list ([img](img/rareui-counter-github.jpg)).
- **Navigation as craft.** Hook Sidebar draws a dotted bracket to the active table-of-contents item. Bounce Sidebar moves an orange dot between items. Proximity Sidebar is a column of hairlines that expand into labels as the cursor approaches. The Scroll Progress pill floats at the bottom with a progress ring and opens into a section menu ([img](img/rareui-toc-hook-bounce.jpg), [img](img/rareui-gooeynav-proximity.jpg), [img](img/rareui-scrollprogress-stepplayer.jpg)).
- **AI-flavoured states without gimmicks.** Matrix Orb is a halftone dot field with Idle / Listening / Thinking states. Grid Reveal resolves an image tile by tile ("Creating image… Adding detail") ([img](img/rareui-matrixorb-fluidorb.jpg)).
- **Craft details in the code:** squircle corners (`figma-squircle`), an `border-apple` inset-highlight utility for dark surfaces, a hero that rises 18 px and un-blurs 4 px on a spring (stiffness 300, damping 22, 90 ms stagger), and `useReducedMotion` everywhere.
- **Type:** Inter for UI, Geist Mono for data, Cal Sans and Open Runde (a rounded face) for headlines.

**What to avoid:** the playful pieces (Gravity Letters, Emoji Reaction, Notification Bell) don't fit an engineering portfolio.

**Licence:** MIT + Commons Clause + **Attribution**. Any shipped part must credit Rare UI with a **visible link to rareui.com** (footer or credits), and components can't be resold. Plan a colophon line if we port anything.

### 3.2 landing.love: what award-listed portfolios do in 2026

2,163 recorded sites. Category counts show where taste is: **Minimal 1,383**, 3D 570, Portfolio 564, Typography 77, AI 55. Each entry has a full-page video; I made contact sheets of nine portfolios.

| Site | What it does | Lesson |
|---|---|---|
| **Gabriel Beaugonin** (UX designer, Paris) ([img](img/ll-gabriel-beaugonin.jpg)) | Light grey ground; name and role set small, top-left; projects as large rounded cards with real screenshots, stacked in a 3D cover-flow; a clay globe you click to "travel" | The most premium-feeling site of the set uses the *least* decoration. Small type plus large, real imagery. |
| **Simon Holm** (brand designer) ([img](img/ll-simon-holm.jpg)) | Swiss grid; a tiny top meta bar (`Featured (05)`, `Index (05)`, email, local time `16:47 (CET)`); huge grotesk titles; a giant email as the contact section | Meta bars with counters and local time read as "instrument" and "studio". Cheap to build. |
| **Huy Phan** ([img](img/ll-huy-phan.jpg)) | Vertical logo, tiny nav, oversized numerals ("19 96", "83"), a dense award list | Numbers as typography. |
| **Artemii Lebedev** | Dense Swiss editorial; a white header box; mono uppercase micro text; "Press ESC for effects" | Gives control to the visitor; effects are opt-in. |
| **Hon Tran** (creative developer) ([img](img/ll-hon-tran.jpg)) | Dark; LED / halftone dot-matrix portrait; condensed uppercase type; yellow accent; a blog that explains the code | The dot-matrix texture is the 2026 "computational" look. |
| **Ricardo Chance** | Purple particles morph from a star into an "R"; italic serif headline; curved 3D project carousel | Memorable, but the purple-particle look is everywhere. |
| **Jesper Landberg** | Dark curved WebGL carousel; white modal case studies; client list as centred text | Showpiece motion; heavy. |
| **Léo Parpeix** | 3D clay rooms, huge grotesk CTAs, a playful bee | Whimsy works for art directors, less for engineers. |
| **Felix Rieseberg** (works on Claude at Anthropic) ([img](img/ll-felix-rieseberg.jpg)) | A photoreal desk: projects are VHS tapes and a CRT plays them; work history on a legal pad | **A diegetic metaphor tied to the content** is what makes a site unforgettable. The 3D is the expensive part; the metaphor is the clever part. |

**Takeaways:** premium comes from restraint, real imagery, small precise type and one idea carried through. The memorable sites have *one* metaphor. The cheap-feeling patterns, by contrast, are generic gradients, glow and template components.

### 3.3 Fontshare: type, and a lesson in Swiss UI

By the **Indian Type Foundry** (Ahmedabad). 100 families: ITF's own under the ITF Free Font License, plus OFL families.

- **The site itself is a design reference** ([img](img/fontshare-light-dark.jpg)). A full-width hairline grid, tiny counters (`100` fonts, `59` pairs), a black block for the active tab, a cream (#FFFFE3) theme and a true dark theme. Its UI font is ITF's Passenger Sans with a 10 px base. Specimen rows are huge type with tiny metadata. This is exactly the "minimal but not plain" register.
- **Popularity is a warning label.** The most-viewed families: Satoshi 108,818 · Clash Display 69,460 · General Sans 59,299 · Cabinet Grotesk 47,907 · Ranade 41,494 · Chillax 37,835 · Clash Grotesk 30,859 · Switzer 30,217. Satoshi, Clash, General Sans and Cabinet are now the default "designer portfolio" fonts. Using them reads as "picked from the top of the list".
- **Faces with a story for this portfolio:**
  - **Erode** (serif, Nikhil Ranganathan) is *named after a city in Tamil Nadu*. Yash studies in Chennai, and the IIT Madras research uses Tamil Nadu EMS data.
  - **Ranade** (neo-grotesk, Easha Ranade / ITF) has a "little kick": high-contrast diagonals in an otherwise calm grotesk.
  - **Tabular** is a monospace sans (5 weights + italics), built for numbers, code and labels.
  - **Supreme** is a constructed sans in the style "favoured by engineers for over a century".
- **Licence (ITF FFL):** free for personal and commercial use; web use via self-hosted files or the Fontshare CSS API; no attribution required; **no redistribution and no modification** ([Fontshare](https://www.indiantypefoundry.com/news/introducing-fontshare), [summary](https://madegooddesigns.com/fontshare/)). In practice: don't commit the font files to a public repo. Load them from Fontshare's CSS API, or keep the fonts out of the public tree.

### 3.4 Originkit: interactive showpieces

Free React/Framer components with an MCP connector. Categories: Background 190, Interactive Elements 80, Text 73, Image Gallery 43, Animations 43, Image 43, Cursor 22, Button 21, Loader 20, Games 7, Border 4. Dark UI (#0F0F10), Inter + Roboto Mono, motion token **220 ms `cubic-bezier(0.16, 1, 0.3, 1)`** ([img](img/originkit-interactive.jpg)).

- **Interactive Elements are mostly WebGL scenes:** Particle Drift (an amber node network), Globe Study, Connectivity Graph, Constellation Shell, Black Hole (22k views), Tornado (16.5k), Cosmic Orb (12k).
- **The useful subset is small and typographic:** Weight Hover and Dynamic Weight (variable-font weight follows the cursor), Focus Reveal, Scroll Text Highlight, Pixel LED Display, Mechanical Flip, Label Slide Button, Keycap Button, Link Preview, Axis Cursor.
- **Cautions:** many items are Pro-only, and some depend on Framer modules or external CDNs that failed to load in testing. Treat Originkit as an idea source and rebuild the few chosen ideas natively.
- **On-message idea:** Particle Drift / Connectivity Graph look like a graph neural network. Yash's research uses GraphSAGE. A *contained*, data-meaningful node graph could be a case-study figure. It shouldn't be a site background.

### 3.5 Vue Bits / React Bits

[`VUEBITS_README.md`](../../VUEBITS_README.md) catalogues Vue Bits as of Jun 13, 2026: 24 text animations, 29 animations, 34 components, 40 backgrounds. Since the site will be React, the equivalent is **React Bits** (same author). Pulse already ports a few of these (aurora, grainient, split-text, blur-text, count-up, number-ticker, reveal).

- **Scale = ubiquity.** React Bits has **48,453★** (Vue Bits 4,554★). Its signature effects (Aurora, Silk, Galaxy, Hyperspeed, Shiny/Gradient/Split Text, ColorBends) are on thousands of 2025–26 sites. Used verbatim, they make a portfolio look like a template, just as Brittany Chiang clones did ([existing finding](../../reports/Portfolio%20best%20practices%202026.md)).
- **The home pages themselves** use the trend look: near-black (#120F17), a purple or mint ColorBends gradient with grain, Geist + Geist Mono. This is the "AI startup" look to steer away from.
- **The parts worth keeping are quiet ones** ([img](img/reactbits-components.jpg)): Variable Proximity and Text Pressure (variable-font response), Gradual Blur (progressive edge blur), Dot Grid (dots react to the cursor), Decrypted Text, Pixel Transition, Magnet Lines, Counter (rolling digits), True Focus (moving focus brackets), Glass Surface, Dither and Noise.
- **Licence:** MIT + Commons Clause. Commercial use as part of a site is fine; the components themselves can't be sold or redistributed. Keep the licence header in any copied file.

---

## 4. Affinity map → seven themes

Observations from all sources, grouped:

1. **Restraint is the luxury.** The sites that feel expensive (Gabriel, Fontshare, Simon Holm, RareUI) use one accent, two greys, lots of space and small precise type. The ones that feel cheap rely on gradient washes, glows, glass, emoji, heavy shadows and recognisable library effects.
2. **Instrument details signal craft.** Mono micro labels, counters (`(05)`), local time, index numbers, hairline grids, tick-mark rulers and status dots appear across Fontshare, Simon Holm, Artemii Lebedev, RareUI and Huy Phan. They're cheap to build, read as precision, and suit an engineer.
3. **Motion as feedback, not decoration.** Springs, digit rolls, blur-rise reveals and cursor proximity. One signature motion per view. Fast UI timing (≈220 ms expo-out). Reduced-motion paths built in from the start (RareUI does this throughout).
4. **One metaphor, carried through, is what people remember.** Felix's tapes, Gabriel's globe and RareUI's folder with papers are all memorable *because* the object is the content. For this site the natural metaphor is already in the work: **the audit log**. Claims are cited, history is append-only and hash-chained, and stubs are labelled. That is GlassBox's model, applied to the portfolio itself.
5. **Dot matrix / halftone is the 2026 "computational" texture.** It appears in Hon Tran's portrait, RareUI's Matrix Orb, React Bits Dither, Vue Bits' pixel headline and Originkit's LED display. It's powerful, and close to becoming the next cliché. **Use it as data (a status glyph, a heatmap), never as wallpaper.**
6. **Component libraries cut both ways.** They are great for ideas and dangerous verbatim, because of ubiquity and licence terms (RareUI requires attribution; Commons Clause forbids resale). Port the *idea*, restyle it to the system, and keep the licence notices.
7. **Type defaults have moved.** Fontshare's top four are the new Inter. A distinctive but calm face (Ranade, Erode, Zodiak, Sentient) plus a true monospace (Tabular) gives "new" without "loud".

---

## 5. Type tests

Twelve pairings were rendered with the real hero copy, metric row and button, in both themes ([light 1](img/typetest-light-a.jpg), [light 2](img/typetest-light-b.jpg), [light 3](img/typetest-light-c.jpg), [dark](img/typetest-dark-a.jpg)).

| Pairing (display / text / mono) | Verdict |
|---|---|
| **Ranade / Ranade / Tabular** | **Best overall.** Calm grotesk with a distinctive edge (the sharp `a`, the contrasted diagonals of `y` and `v`), a good true italic, excellent in dark mode, one family to load. Indian foundry, Indian designer. |
| Switzer / Switzer / Tabular | Beautifully drawn but reads close to Inter / Helvetica Now; "premium generic". |
| **Erode / Switzer / Tabular** | **Best serif option**, with an authentic story (named after a Tamil Nadu city). Editorial and warm; risks the cream + serif "habit" look. |
| Supreme / Switzer / Tabular | Clean, engineered; less distinctive at display size than hoped. |
| Sentient / Author / RX100 | Robust and readable; RX100 (condensed mono) is characterful but has only one weight. |
| Satoshi / Satoshi / Tabular | Looks good, which is why it's everywhere. Rejected for ubiquity. |
| Zodiak / General Sans / Tabular | Strong, elegant serif; General Sans is ubiquitous. |
| Gambetta / Plein / Tabular | Refined bookish serif; quiet. |
| Boska / Switzer / Tabular | Didone, fashion-luxury; wrong register. |
| Bespoke Serif / Ranade / Tabular | Friendly wedge serif; heavier. |
| Source Serif 4 / Geist / Geist Mono (GlassBox's current set) | Solid and credible; the "expected" engineer-editorial look. |
| General Sans / General Sans / Tabular | Modern but generic. |

**Decision for the recommended direction: Ranade (display + text) + Tabular (data, labels, code).** Erode stays as the alternative for a typographic, editorial direction (Direction B).

---

## 6. Colour and contrast tests

Computed with the WCAG 2.x relative-luminance formula against the proposed tokens.

| Token | Light (on #F4F4F1) | Dark (on #0E0E0D) |
|---|---|---|
| Ink | #121211 · **17.0:1** | #EEEDE8 · **16.5:1** |
| Ink 2 (secondary text) | #46453F · **8.7:1** | #C2C0B9 · **10.6:1** |
| Muted (micro labels) | #6A6862 · **5.1:1** ✓ small text | #8E8B83 · **5.7:1** ✓ |
| Accent (marks, focus, dots) | #F24B00 · **3.3:1** ✓ graphics | #FF6A2B · **6.8:1** |
| Accent ink (accent-coloured text) | #C23A00 · **4.9:1** ✓ | #FF8C59 · **8.4:1** |
| Text on accent fills | ink #121211 · **5.2:1** (white fails at 3.6:1) | #0E0E0D · **6.8:1** |

Findings:
- Pure International Orange #FF4F00 reaches only **2.99:1** on the light ground, just under the 3:1 needed for focus rings and status marks. Darkened to #F24B00 it passes (3.3:1) and still reads as International Orange.
- **Text on orange fills must be dark, in both themes.** White on orange fails.
- Both neutrals sit at OKLCH chroma ≈ 0.002–0.004 (hue ≈ 107): toned, but not cream.

---

## 7. Insights → design principles

1. **Quiet surfaces, evidence on demand.** The first screen is calm and fast; depth (sources, methods, intervals) appears when someone asks for it.
2. **The site behaves like the systems Yash builds.** Every number is cited; stubs are labelled; history is an append-only, hash-chained ledger. The innovation *is* the message.
3. **One accent, one metaphor, one signature motion per view.**
4. **Instrument-grade details over decoration:** mono readouts, counters, hairlines, local time, status dots.
5. **Both themes designed, not inverted.** Each has its own accent value and surface steps.
6. **Port ideas, not effects.** Library components get restyled into the system, with licence notices kept.
7. **Motion respects attention:** no loaders, ≤ 250 ms UI feedback, reduced-motion paths for everything.

---

## 8. Component shortlist (impact × effort)

| Component | Source of the idea | Impact | Effort | Licence note |
|---|---|---|---|---|
| **Citation markers + source cards + Inspect mode** | GlassBox's own citations; the audit-log metaphor | ★★★ (signature, on-message) | M | Original |
| **Ledger timeline with real hash chain** | GlassBox hash chain; Simon Holm's meta bars | ★★★ | S | Original |
| **Rolling readouts (odometer digits)** | RareUI Animated Counter, React Bits Counter | ★★★ | S | Rebuild natively |
| **Status bar (local time, availability, section index)** | Simon Holm, Artemii Lebedev, Fontshare | ★★☆ | S | Original |
| **Proximity TOC (desktop) + progress pill (mobile)** | RareUI Proximity Sidebar + Scroll Progress | ★★★ | M | Attribution if ported |
| **Work index rows with cursor-following preview** | Fontshare specimen rows; landing.love lists | ★★★ | M | Original |
| **Eval panel with Wilson intervals** | Husain/Shankar eval conventions (existing research) | ★★★ (credibility) | M | Original |
| **Variable-weight name on hover** | React Bits Variable Proximity; Originkit Weight Hover | ★★☆ | S | Rebuild natively |
| **Dot-matrix monogram / status glyph** | RareUI Matrix Orb; 2026 dot-matrix trend | ★★☆ | S | Original |
| **Before/after slider** | Existing research (img-comparison-slider) | ★★☆ | S | MIT library or native `<input type=range>` |
| **GitHub activity heatmap** | RareUI GitHub Activity | ★☆☆ | M | Attribution if ported |
| **Command bar (⌘K)** | cmdk pattern | ★☆☆ | M | MIT (cmdk) |
| WebGL particle graph (case-study figure only) | Originkit Particle Drift / Connectivity Graph | ★☆☆ | L | Rebuild; never site-wide |
| Aurora / Silk / Galaxy / Shiny Text backgrounds | React Bits | ✗ | – | Avoid: ubiquitous |

### What makes a portfolio feel cheap (checklist)

Gradient washes and glow blobs · glassmorphism stacks · emoji as UI · a coloured left-border on cards · stock library effects used verbatim (ColorBends, Aurora, Shiny Text) · typewriter heroes · skill bars and logo walls · more than one accent · mixed corner radii · centred everything · tiny low-contrast grey text · intro loaders · fake terminal boot screens · default Satoshi / Clash / Inter with no other decisions.

---

## 9. Validation plan (to run on the prototype)

Following the user-research method: **usability test, 5–8 participants, ~1 week.**

- **Participants:** 3 engineers who interview new grads (ideally one ML engineer), 2 recruiters or HR (one campus, one startup), 1–2 peers as a pilot.
- **5-second test (each participant):** show the home hero for 5 s, hide it, ask: *What does this person do? What would you click first? One word for the feel?* **Success:** ≥ 4 of 5 name "AI/ML engineer" and at least one proof point; nobody says "template".
- **Tasks (think-aloud, desktop and phone):**
  1. Find and download the resume. *Target: < 5 s.*
  2. Find how GlassBox's accuracy number was measured. *Target: < 60 s, without help.*
  3. Find one thing that isn't finished or didn't work. *Tests whether honesty is visible.*
  4. Switch to dark mode and read a case study for one minute. *Observe comfort and contrast complaints.*
  5. Contact Yash.
- **Interview guide** (5-part structure):
  - Warm-up (5 min): your role and how often you review portfolios.
  - Context (10 min): walk me through how you screened the last three candidates.
  - Deep dive (20 min): the tasks above.
  - Reaction (10 min): premium versus cheap, which details you noticed, and what you'd remove.
  - Wrap-up (5 min): anything we missed.
- **Measures:** task success and time; SEQ (1–7) per task; mentions of "trust" / "verify"; whether participants found and used the citation layer.
- **Synthesis:** affinity-map notes into themes; impact/effort matrix for fixes.

---

## 10. Highlight reel

- "Simple layouts with clear sections and headings held attention longer" (Ladders eye-tracking, via the existing research). The minimal brief is backed by evidence, not just taste.
- 66% of hiring teams name "catches and fixes AI mistakes" as the top signal (CoderPad 2026). The citation and Inspect layer puts *verification* on screen.
- React Bits at 48k★ means its look is the new default. Fontshare's top four fonts are the new Inter.
- The most memorable portfolio in the sample (Felix Rieseberg's desk) is memorable for its *metaphor*, not its 3D. The audit-log metaphor gives the same memorability at a fraction of the weight.

---

## 11. Gaps and issues found along the way

- **No primary user research yet.** Run Section 9 before locking the design.
- **RareUI's live site couldn't be viewed** (bot checkpoint); I used its source and demo videos instead. If you want me to browse it directly, connect the Claude in Chrome extension.
- **⚠️ CT denoising project: the repo's sample figure looks broken.** In `are/lung_images.png` the "Clean (Ground Truth)" panels are unrelated edge-map images, not the matching chest X-rays, and the "Denoised" outputs are dark lung silhouettes ([img](img/ct-sample-figure-mismatch.jpg)). That suggests a noisy/clean pairing or visualisation-indexing bug, which would also put the reported PSNR/SSIM in doubt. **Don't build the before/after slider on these images, and don't quote the metrics, until the pairing is checked.** The design uses a clearly labelled placeholder.
- Fontshare's licence summary comes from secondary sources plus ITF's announcement; read the licence file in the font download before shipping.
- Originkit Pro items and some free items couldn't be evaluated live.

---

## 12. Addendum (Oct 4): research for the iOS-inspired redesign ("Glass")

**Why there's an addendum.** You looked at the "Proof" direction and said it wasn't impressive, the font didn't look good, and it needed better spacing and a more professional, iOS-like finish. You also asked for Vue Bits / React Bits components, including the animated backgrounds, and other open-source components. This section records what was checked for the new direction. The spec is in [`design/portfolio.design.md`](../../design/portfolio.design.md).

### 12.1 React Bits backgrounds (captured live, then checked in the source)

Six backgrounds were captured from reactbits.dev with the demo overlay turned off ([img](img/reactbits-backgrounds.jpg)): Iridescence, Grainient, Gradient Waves, Soft Aurora, Prism and Silk. Their imports were then read from the repo (`DavidHDev/react-bits`, `src/content/Backgrounds/`):

| Background | Renders with | Fit |
|---|---|---|
| **Iridescence** | OGL | **Light hero.** Reads like an iOS wallpaper; calm at speed ≈ 0.4–0.6 with `mouseReact` off |
| **Soft Aurora** | OGL | **Dark hero.** A Siri-like glowing band on near-black; white text stays legible above and below it |
| Grainient | OGL | Light alternative; the default pink–violet is loud, so tune it before use |
| Silk | three.js + React Three Fiber | Dark alternative, but much heavier JS |
| Gradient Waves, Prism | — | Rejected: too dark and moody (waves) or too "sci-fi" (prism) for a recruiter-facing hero |

All the home artboards have a *Background* tweak that swaps between the captured stills, so you can compare them in place.

### 12.2 React Bits components the design maps to

Confirmed in the repo: Components `GlassSurface`, `Counter`, `TiltedCard`, `Dock`, `GlassIcons`, `Folder`, `SpotlightCard`; Animations `GradualBlur`; Text `BlurText`; and the newer **Micro** set: `PromptBar`, `RubberSegment`, `SwipeRow`, `CallChip`, `SwipeToast`, `GlideSelect`.
- Most animated ones import `motion/react`; `GlassIcons` and `Folder` are CSS only.
- Several Micro components import **Hugeicons** (`@hugeicons/react`). The spec swaps those icons for Lucide so the site uses one icon set.
- **Licence** (read from `LICENSE.md`): MIT + Commons Clause. Use is allowed "as part of an application, website, or product", including commercially. Selling or redistributing the components themselves is not. Keep the notice in copied files.

### 12.3 Why iOS patterns work for this audience

- Many first visits will likely come from a link tapped on a phone, in LinkedIn or an email (an assumption, not a measured figure). iOS patterns need no learning: widgets read as "key numbers", inset lists as "details", sheets as "more about this", the App Store page as "a product someone shipped".
- It answers the "cheap" worry with restraint rather than effects: system type, one accent, generous space, real screenshots.
- The earlier "avoid glassmorphism" finding still holds for frosted cards under body text. Glass follows Apple's own usage instead: translucent material only for controls that float above content.

### 12.4 Type

SF Pro is the iOS font and renders on Apple devices through `-apple-system`. Headless Chromium on this Mac confirmed the stack resolves to SF Pro. It can't be self-hosted for the web (Apple's licence limits it to Apple platforms), so Windows and Android get **Inter** from Google Fonts, the closest open match, with an optical-size axis. Tracking follows Apple's web values in spirit: tight at display sizes (−0.02em at 96 px) and −0.022em for 17 px body text.

### 12.5 Contrast for the iOS palette (computed)

| Pair | Ratio | Decision |
|---|---|---|
| `#6E6E73` on `#F5F5F7` (secondary text) | 4.66 | OK for body sizes |
| `#86868B` on `#FFFFFF` (tertiary) | 3.62 | Large text and icons only |
| White on `#0071E3` (button) | 4.70 | Primary button in both themes |
| White on `#0A84FF` (iOS dark blue) | 3.65 | Not used for buttons with white text |
| `#0066CC` on `#F5F5F7` / `#2997FF` on `#000` (links) | 5.11 / 6.96 | Links and eyebrows |
| `#0058B0` on a 12% blue wash; `#7CC0FF` on an 18% wash over `#2C2C2E` | 5.44 / 5.58 | Source numbers and project chips |
| `#248A3D` on a 14% green wash | 3.92 | Failed → chip text darkened to `#1E7B34` (4.76) |
| `#6E6E73` on a 12% grey wash | 4.41 | Failed → `#636366` (5.21) |
| `#A1A1A6` on `#000` / on `#1C1C1E` | 8.16 / 6.61 | Dark secondary text |

### 12.6 Assets found or corrected

- **Real Gridee screenshots** are in `~/gridee-android/Gridee_Android/android-app/output/`, and the real icon is next to the project. Both screenshots show AdMob **test ads** lower down, so the mocks crop above them.
- **Correction:** `~/Desktop/appshots.pdf` and the iPhone simulator screenshot listed in the README as Gridee are a different app, "Schedulio" (salon booking and movie tickets). The README is fixed.

### 12.7 Result

[img](img/glass-home-light-dark.jpg): the home page, light and dark, from the local prototype that the canvas artboards are generated from. [img](img/glass-mobile-first-screen.jpg): the mobile first screen with the floating tab bar.
