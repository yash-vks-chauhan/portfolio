# Portfolio Design Spec: "Glass"

**Status:** **Final, approved Oct 4, 2026**, as drawn: Blue accent, Iridescence behind the light hero and Soft Aurora behind the dark one. Replaces the v1 "Proof" spec, which was turned down on Oct 3 (not impressive enough; the Ranade/Tabular type didn't look good). Proof stays on the canvas under *(previous)* pages for reference.
**Everything for the build is in this folder:** see [`README.md`](README.md) for the map and [`IMPLEMENTATION.md`](IMPLEMENTATION.md) for the build plan.
**Brief (Oct 3):** clean, iOS-inspired, professional and impressive, with better spacing; built in React; use Vue Bits / React Bits components (including the animated backgrounds) and other open-source components; light and dark mode.
**Research behind it:** [`ui_direction_research.md`](../research_notes/Portfolio%20UI%20direction%202026/ui_direction_research.md) (sources, type tests, contrast) and the [best-practices report](../reports/Portfolio%20best%20practices%202026.md) (what recruiters look for).
**Design canvas:** "Yash Chauhan — Portfolio UI" (private Claude Design artifact: https://claude.ai/artifact/U371MceJ9TvQNAXSAMqjaT). It opens on *Glass — Pages*; tokens and the interactive component sheet are on *Glass — System*. Section 9 lists every artboard. A copy of every canvas file is in [`artifact/`](artifact/), and browser-viewable versions are in [`prototype/`](prototype/).

---

## 1. Concept

> **Glass: a portfolio built like an iOS app, where every number can be checked.**

Recruiters spend about ten seconds on a first pass, and many of them on a phone. The fastest way to look professional is to use a visual language they already trust and know how to operate: Apple's. The site borrows iOS patterns (widgets, inset grouped lists, sheets, segmented controls, an App Store product page, a floating tab bar) and iOS materials, then fills them with checkable evidence.

The name ties the look to the thesis. GlassBox is the flagship, a "glass box" is the opposite of a black box, and iOS glass is what floats over the content. The proof layer from v1 survives in an Apple-native form:

| GlassBox guarantee | On the portfolio |
|---|---|
| Every claim is cited | Every number carries a small source number. Tap it and a **source sheet** slides up; the same sources are listed as **footnotes** at the bottom of the page, the way Apple's product pages do it. |
| Unsupported → refused | **Ask my portfolio** answers from the site's own content with citations, or says "No source · refused". Unfinished work carries honest status chips. |
| Every decision is logged | Case studies show decisions (chose / over / because / cost) and the evaluation with intervals and its caveat. |

### Design principles

1. **Content on solid, controls on glass.** Text you read sits on solid cards. Only floating controls use translucent material: the nav capsule, the widgets over the hero, sheets, the dock and the tab bar.
2. **Familiar before clever.** Use patterns people already know from their phone. The novelty is in the content (cited answers, sourced numbers), not in making visitors learn a new UI.
3. **One live moment per screen.** The hero's animated background is the only always-moving thing. Everything else moves only in response to the visitor.
4. **Generous, consistent space.** A 4-pt scale, 160 px between desktop sections, 48–56 px inside cards, 20 px between cards.
5. **Proof on the surface.** Every metric has a source; every result keeps its caveat in the same sentence.
6. **Accessible by default.** Contrast measured on the actual surfaces (including glass), 44 px targets, real buttons and labels, a still image instead of WebGL under reduced motion.

### Why this isn't 2021-style glassmorphism

The earlier research said to avoid glassmorphism, and that still holds for what it meant: frosted cards everywhere, text on busy blurred backgrounds, low contrast. Glass here follows Apple's own rule: material is for things that float above content, and readable text sits on surfaces that are at least 72% opaque (widgets) or solid. Contrast for every text colour is measured against those surfaces (section 3.1).

---

## 2. Voice and content rules

- First person, plain and specific. Short sentences. Every number is paired with its method or condition.
- **Never:** "passionate", "cutting-edge", "leveraged", "tamper-proof", "IEEE paper" (for a submission), "SHAP" (for heuristic attribution), "production" (without users).
- Results and caveats share a sentence: *"183/183 on questions I wrote alongside the engine (95% CI 97.9–100%). That's a development set, not an independent benchmark."*
- Manuscripts never appear under "Publications" until accepted. The DELCON paper stays anonymous: *"a first-author manuscript under double-blind review at an IEEE conference (2026)"*, with no title or topic.
- Every claim on the site appears in the README's claims audit, and every number in the UI has a footnote.
- Missing facts are `[placeholders]` in the mocks and must be filled before launch.

---

## 3. Tokens

All tokens become CSS custom properties: `:root` holds light, `[data-theme="dark"]` holds dark, and the site follows `prefers-color-scheme` until the visitor picks a theme. Names follow iOS semantics (label, secondary label, fill, separator) so they map cleanly to the mental model.

### 3.1 Colour

| Token | Light | Dark | Use and contrast |
|---|---|---|---|
| `--bg` | `#F5F5F7` | `#000000` | Page background |
| `--card` | `#FFFFFF` | `#1C1C1E` | Solid surfaces: cards, lists, the Ask panel |
| `--fill` | `#F5F5F7` | `#2C2C2E` | Inset areas inside cards (chips, answer bubbles) |
| `--fill2` | `rgba(120,120,128,.12)` | `rgba(118,118,128,.24)` | Segmented-control track, tinted buttons |
| `--label` | `#1D1D1F` | `#F5F5F7` | Primary text: 15.5:1 / 19.3:1 |
| `--label2` | `#6E6E73` | `#A1A1A6` | Secondary text: 4.7:1 / 8.2:1 |
| `--label3` | `#86868B` | `#8E8E93` | Chevrons, icons, large text only (3.3:1 in light) |
| `--ink2` | `#424245` | `#D1D1D6` | Lead paragraphs: 9.2:1 / 13.8:1 |
| `--sep` | `rgba(60,60,67,.14)` | `rgba(84,84,88,.6)` | Hairlines and inset separators |
| `--blue` (accent fill) | `#0071E3` | `#0071E3` | Primary buttons; white text 4.7:1. Not `#0A84FF` in dark: white on it is 3.7:1 |
| `--link` | `#0066CC` | `#2997FF` | Text links and eyebrows: 5.1:1 / 7.0:1 |
| `--cite` on `--blue-wash` | `#0058B0` on 12% | `#7CC0FF` on 18% | Source numbers and project chips: 5.4:1 / 5.6:1 |
| `--ok` · `--warn` · `--mute` | `#1E7B34` · `#A04A00` · `#636366` | `#30D158` · `#FFB340` · `#A1A1A6` | Status chip text, each on its own 12–16% wash (all ≥ 4.5:1) |

**Accent tweak.** Each page artboard has an *Accent* tweak: **Blue** (default, iOS system blue), **Indigo** or **Graphite**. Graphite in dark mode flips the button text to near-black.

**Project colours** come from iOS system colours and are decorative only (icons and card backgrounds): GlassBox navy (`#0A1633 → #132E6B` with a `#3B6CF6` glow), Pulse lilac (`#F3F0FF → #E3F0FF`; dark `#1B1838 → #101B30`), Gridee graphite with a green glow (`rgba(52,199,89,.32)`).

### 3.2 Typography

**Stack:** `-apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", "Segoe UI", system-ui, sans-serif`.
- On Apple devices this renders **SF Pro**, with Display and Text optical sizes picked automatically. That is the iOS font, and it is why the mocks read as iOS.
- SF Pro can't be self-hosted on the web (Apple's licence covers Apple platforms only), so Windows and Android visitors get **Inter** (OFL, Google Fonts, `opsz` axis), the closest open match.
- Widget numbers use `ui-rounded` (SF Pro Rounded in Safari), falling back to the same stack. Code uses `ui-monospace, "SF Mono", Menlo`.

| Style | Size / line height | Weight | Tracking | Where |
|---|---|---|---|---|
| Display | 96 / 1.04 (`clamp(48px, 6.7vw, 96px)`) | 600 | −0.02em | Home hero |
| Title 1 | 56 / 1.07 (`clamp(36px, 4.4vw, 56px)`) | 600 | −0.012em | Section titles |
| Title 2 | 44 / 1.05 | 600 | −0.01em | Project cards, case-study title |
| Title 3 | 32 / 1.15 | 600 | 0 | Case-study sections |
| Lead | 21 / 1.42 | 400 | 0 | Section intros, hero sub-line |
| Body | 17 / 1.47 | 400 | −0.022em | Paragraphs, list titles |
| Callout | 15 / 1.4 | 400 | −0.012em | List subtitles, captions under cards |
| Footnote | 13 / 1.38 | 400–600 | −0.006em | Widget captions, eyebrow labels (uppercase +0.02em) |
| Caption | 12 / 1.33 | 400 | −0.004em | Footnotes, legal |
| Number | 46 / 1 (34 on phones) | 600 | −0.01em | Widgets, stat strips (rounded) |

Phone scale: Display 44, Title 1 34, Title 2 34 (cards), Lead and Body 17.

### 3.3 Materials

| Material | Light | Dark | Used for |
|---|---|---|---|
| Thin | white 60% · blur 24 · saturate 180% · 1 px white 80% border + inset top highlight | `#1C1C1E` 55% · blur 24 · 1 px white 12% border | Nav capsule, dock |
| Regular | white 72% · blur 30 · saturate 190% | `#1C1C1E` 60% · blur 30 | Widgets over the hero |
| Strong | white 80% · blur 30 | `#2C2C2E` 72% · blur 30 | Sheets, the tab bar, the command bar, toasts |

In the React build, **React Bits `GlassSurface`** can replace the CSS blur on the nav capsule and the tab bar. It adds SVG-displacement refraction (the iOS 26 "liquid" edge) where the browser supports it and falls back to frosted blur elsewhere.

### 3.4 Shape, space and layout

- **Radii:** pills 999 · feature cards 32 (28 on phones) · widgets 28 (24) · lists 24 (22) · prompt field 20 · app icons 22.5% (squircle) · phone frame 48.
- **Space:** 4-pt scale: 4, 8, 12, 16, 20, 24, 32, 48, 56, 64, 96, 120, 160.
- **Layout:** container 1120 px with 24 px gutters (16 on phones). Sections 160 px apart on desktop, 96 on phones. Card padding 48–56 (24 on phones). Grid gap 20 (12–14 on phones).
- **Lists** are iOS inset grouped lists: rows at least 64–76 px, separators inset to the text start, a chevron for navigation, an ↗ for external links, uppercase 13 px group headers.

### 3.5 Elevation

Resting `0 1px 2px rgba(0,0,0,.04)` (lists, cards) · Raised `0 18px 40px rgba(17,24,39,.08)` (widgets, nav) · Floating `0 30px 60px rgba(17,24,39,.10)` (sheets, Ask panel). In dark mode shadows deepen to black at 50–60%, and solid cards get a hairline instead.

### 3.6 Motion

- **Springs** (Motion: stiffness 300, damping 30) for sheets, segmented controls, the dock and the tab bar.
- **Lift** on cards: 4 px over 500 ms, `cubic-bezier(.2,.8,.2,1)`.
- **Hero:** the background animates; the headline enters once with React Bits `BlurText` (by words, ~80 ms stagger). Widget numbers roll once with `Counter` when first in view.
- **Ask:** the answer streams in word by word; source chips fade in after it.
- **Reduced motion:** a still frame replaces the WebGL background, numbers show their final value, no tilt, no parallax, sheets appear without sliding.

### 3.7 Icons and imagery

- **Interface icons:** Lucide (ISC), stroke 2 at 16–24 px, `currentColor`. Some React Bits micro components import Hugeicons; swap those for Lucide so there's one icon set.
- **Project icons:** squircles with a light-to-dark diagonal gradient, a 1 px top highlight and one white Lucide glyph (GlassBox `box`, Pulse `activity`, Autoscaler `gauge`, Kalakraft `palette`, CT `scan-line`). Gridee uses its real app icon. Organisations (IIT Madras, Hindalco, SRM) get neutral monogram squircles, never their logos.
- **Tool icons:** Simple Icons glyphs (CC0) inside React Bits `GlassIcons`. Trademarks belong to their owners; they only show which tools were used, and each links to the projects that used it.
- **Screenshots:** real ones only. GlassBox and Pulse screenshots sit tilted in their cards with a soft shadow. Gridee sits in a plain phone frame with no notch or status bar of my own, showing only the part of the screen above the test ad.
- **No Apple marks.** No Apple logo, no App Store or Google Play badges (text buttons with the store glyph instead), and no "Dynamic Island" or other Apple feature names.

---

## 4. Information architecture

```
/                 Home (the ten-second skim plus proof)
/work             Work index (all eight projects, filterable)
/work/glassbox    Case study (App Store-style template)  · /work/pulse · /work/gridee · /work/ems-research
/work/autoscaler  Shorter template  · /work/kalakraft · /work/ct-denoising
/research         Manuscripts (Publications only after acceptance)
/about            Experience, education, certifications
/resume.pdf       Stable URL
/404              "Nothing here has a source for that page."
```

A ⌘K command bar (cmdk) on every page searches projects and runs actions (copy email, download résumé, switch theme).

---

## 5. Page templates

### 5.1 Home

1. **Nav capsule** (floating, sticky, thin glass): YC squircle + name · Home / Work / Ask / About · a sun/moon segmented control · blue **Résumé** button. Every target 44 px.
2. **Hero** (~960 px on desktop) over the animated background (Iridescence in light, Soft Aurora in dark), with a veil that fades into the page:
   - live chip: **Open to 2027 roles · Chennai 9:04 PM** (pulsing green dot; local time)
   - name line: *Yash Chauhan · AI/ML Engineer*
   - display: **I build AI systems you can audit.**
   - lead: *Final-year B.Tech CSE (AI/ML) at SRM, graduating 2027. Co-founder of Gridee. Previously a research intern at IIT Madras.*
   - actions: **Download résumé** (primary) · *See the work ›* (link)
3. **Four widgets** overlapping the hero's bottom edge (regular glass), each with a source number: Gridee **8,000+** downloads¹ · GlassBox eval **183/183**, 95% CI 97.9–100%² · GlassBox tests **254**³ · Research **IIT Madras**, 2025–26⁴.
4. **Ask my portfolio** (signature): a solid panel with a rainbow-ring prompt field, suggestion chips, one cited answer and one refusal ("What's your favourite film?" → *No source · refused*). See section 6.1.
5. **Selected work:**
   - **GlassBox**: full-width navy card, tilted screenshot, and a floating "Flagged for compliance · 4 sources cited · logged #77191542" toast taken from the real screenshot.
   - **Pulse and Gridee** side by side. Pulse shows plain English → the validated DSL → "1,284 customers match" with a *No SQL · no PII to the model* chip. Gridee is a dark card with the phone and two store buttons.
   - **Research**: a card with a React Bits `Folder` holding two manuscripts (EMS drift & equity; IEEE conference, double-blind).
   - **More work**: an inset list of Autoscaler (*In progress*), Kalakraft (*Live*) and CT denoising (*On hold*).
6. **Experience:** inset grouped lists (Work, Education, Certifications) next to a detail **sheet** for the selected row (Gridee shown open).
7. **Toolkit:** 12 `GlassIcons`; tapping one shows where it was used (Python → GlassBox, Autoscaler, IIT Madras EMS, IEEE manuscript, CT denoising).
8. **Contact:** an iOS Contacts-style card (avatar, Email me, Résumé, copyable rows) and a magnifying **Dock** (Email, GitHub, LinkedIn, Résumé).
9. **Footer:** numbered footnotes for every sourced number, then copyright and links.

### 5.2 Case study (App Store product-page anatomy; shown with GlassBox)

1. Back link *‹ Work*.
2. **App header:** a 136 px squircle icon, title, one-line guarantee, then **Open demo ↗** · **Code** · **Watch 90 s** · Share, with the note "the first load can take about 45 seconds".
3. **Stat strip** (App Store info bar): Eval 183/183 · Hallucinations 0/183 · Tests 254 · p95 1 ms · Hosting ~$14 a month · Licence MIT.
4. **Preview:** a scroll-snap carousel of real screenshots with captions (Ask, Refuse, Replay, Audit log). Built with Embla.
5. **In short:** the result and its caveat in one sentence, cited.
6. Body with a sticky **"On this page"** list on the left (the active section gets a longer blue tick) and an 800 px column: Problem → Constraints (inset list) → Architecture (diagram of separate cards and arrows, plus a text version) → Decisions (Chose / Over / Because / Cost cards) → Evaluation (ring, metric rows with interval bars on a stated scale, caveat callout, reproduce block) → Tests & ops (three number cards and the CI/CD chain) → What broke → Next → How I used AI tools → Sources.
7. **Information** (App Store style): role, timeline, stack, infrastructure, size, access model, licence, repository.
8. **More work:** compact cards for Pulse and Gridee.

### 5.3 Work index

Title "Everything I've built." A segmented filter (All 8 · AI systems 3 · Full-stack 3 · Research 2 · Mobile 1 · Experiments 1). Two featured cards (GlassBox, Pulse), then a numbered two-column list in App Store "charts" style: rank, icon, name, guarantee, stack · year, status chip. A legend explains each status.

### 5.4 Mobile (390 px)

- A floating glass header (YC + name + Résumé) and an iOS 26-style **floating tab bar** (Home, Work, About, Contact) with a separate round **Ask** button.
- **First screen:** chip, name, headline, lead, a full-width résumé button, then the widgets as a 2×2 grid. That is the screen a recruiter sees after tapping your link in LinkedIn.
- Sections stack at 96 px apart. Project cards keep their art: GlassBox screenshot, Pulse DSL, Gridee phone.
- Case study on mobile: a 104 px icon header, a stat strip that scrolls sideways, a carousel, "How an answer is made" as a numbered list instead of the diagram, the evaluation, one decision with "2 more decisions ›", and Information.

### 5.5 Research

Two cards: "EMS drift & equity" (third of three authors, method chips, a data-use note: aggregate results only) and the anonymous IEEE manuscript (details after the decision). Publications appear only after acceptance, with a DOI.

---

## 6. Components and the open-source parts behind them

| UI piece | Build with | Notes |
|---|---|---|
| Hero background, light | React Bits **Iridescence** (OGL) | `speed` ≈ 0.4–0.6, `amplitude` 0.1, `mouseReact={false}`; tune `color` to the mock |
| Hero background, dark | React Bits **SoftAurora** (OGL) | `speed` ≈ 0.4, `enableMouseInteraction={false}`; defaults give the pink-to-blue band |
| Alternatives | **Grainient** (OGL), **Silk** (three.js + R3F, heavy) | Switch on the canvas with the *Background* tweak; avoid Silk unless the JS budget allows |
| Nav capsule, tab bar | React Bits **GlassSurface** | CSS frosted fallback (section 3.3) |
| Fade under the nav | React Bits **GradualBlur** | top, ~6 rem |
| Hero headline | React Bits **BlurText** | words, once |
| Widget numbers | React Bits **Counter** | rolls once in view; final value in `aria-label` |
| Live chip | Custom (`starter/components/LiveChip.tsx`) | ticks on the minute in Chennai time |
| Ask: "searching sources" step | React Bits **CallChip** | optional: show the lookup (e.g. `sources · glassbox-eval-v4`, running → done) before the answer streams in |
| Ask my portfolio | React Bits **PromptBar** + streamed answer | section 6.1 |
| Source sheet, Experience detail | **vaul** Drawer | bottom sheet on phones, side sheet on desktop |
| Filter, theme switch | React Bits **RubberSegment** | |
| Project screenshots | React Bits **TiltedCard** | max ~6° tilt, off under reduced motion |
| Feature cards | React Bits **SpotlightCard** (optional) | subtle hover sheen |
| More-work rows on phones | React Bits **SwipeRow** | swipe for Code / Demo |
| Research | React Bits **Folder** | opens to show the two manuscripts |
| Toolkit | React Bits **GlassIcons** | each icon opens "used in" |
| Contact | React Bits **Dock** | magnifies on hover; plain row on touch |
| Toasts ("Email copied") | **sonner** | |
| ⌘K command bar | **cmdk** | |
| Carousel | **Embla** | scroll-snap, arrow buttons |
| Smooth scroll | **Lenis** (optional) | off under reduced motion |
| Animation | **Motion** (`motion/react`) | most React Bits components already use it |
| Icons | **lucide-react**, **Simple Icons** | |
| Primitives (focus traps, popovers) | **shadcn/ui** (Radix) where needed | |

### 6.1 Ask my portfolio (how to build it honestly)

- **v1, no server:** a hand-written answer set where every answer carries source IDs (12 to start, in `starter/content/answers.ts`). A small keyword matcher (`starter/lib/ask.ts`, no dependencies, tested) picks the closest entry; below the threshold the panel refuses: *"Nothing I've published here answers that, so I won't guess. Ask me directly."* It costs nothing, it can't hallucinate, and it demonstrates the GlassBox behaviour.
- **v2, optional:** retrieval over the site's MDX plus an LLM. Answers must cite chunk IDs; any claim without a matching chunk is dropped or the answer is refused. Rate-limit it, cache it, and log questions with no PII.
- The UI never claims more than the engine does: the refusal state is a feature, shown on the home page.

### 6.2 Sources

`content/sources.ts` holds every source (`id`, `title`, `where`, `checked`, `url`). A `<Cite id="glassbox-eval-v4" />` renders the number marker, opens the vaul sheet, and registers the source for the page's footnote list. A build-time check fails if a number marker has no source, or a source has no `checked` date.

---

## 7. Accessibility (WCAG 2.2 AA)

- Text contrast meets section 3.1 on the actual surface, including glass (text on glass only at ≥ 72% white, or on the dark materials).
- Focus: a 3 px blue ring at 50% opacity, offset 3 px, on every interactive element; `scroll-padding-top` clears the floating nav.
- Targets ≥ 44 px for primary controls (2.5.8 asks for 24).
- Real elements: `<button>`, `<a href>`, `<input>` with a `<label>` (visually hidden where the design has none). Icon-only buttons get `aria-label`. Segmented controls use `role="tablist"` / `aria-selected` or `aria-pressed`.
- Sheets and the command bar trap focus, close on Esc, and return focus to their trigger (vaul and cmdk do this).
- Colour never carries meaning alone: status chips always have text, refusals have an icon and a label.
- `prefers-reduced-motion` and `Save-Data` swap WebGL for the still image and stop counters, tilt and parallax.

---

## 8. Performance

- **WebGL budget:** the hero background loads with `React.lazy` after first paint, shows the still frame (AVIF, ~30 KB) until it's ready, pauses when off-screen (IntersectionObserver) or when the tab is hidden, and caps device pixel ratio at 1.5. Iridescence, Soft Aurora and Grainient use OGL, a small WebGL library (check the added size in the bundle report). Silk pulls in three.js and React Three Fiber, so it's not recommended.
- **JS:** home ≤ 160 KB gzipped including the background; case studies ≤ 120 KB. Motion via `LazyMotion` + `domAnimation`.
- **Fonts:** none to download on Apple devices; Inter (variable, latin subset) only where SF Pro isn't available, with `font-display: swap`.
- **Images:** AVIF/WebP with width and height set, lazy below the fold.
- **Targets:** LCP ≤ 2.0 s on a throttled mid-range Android, CLS ≤ 0.05, INP ≤ 150 ms, Lighthouse mobile ≥ 95.

---

## 9. The canvas

Page **Glass — Pages** (opens first):

| Artboard | Size | Tweaks |
|---|---|---|
| Home — light (Iridescence) | 1440 × 7160, fills the window | Accent · Background |
| Home — dark (Soft Aurora) | 1440 × 7160 | Accent · Background |
| Case study — GlassBox, light / dark | 1440 × 7540 | Accent |
| Work index | 1440 × 1930 | Accent |
| Mobile — first screen, light / dark | 390 × 844 | Accent · Background |
| Mobile — home, full scroll | 390 × 5420 | Accent · Background |
| Mobile — case study, dark | 390 × 3040 | Accent |

Page **Glass — System:** *Tokens* (colour with contrast, type scale, materials over the real backgrounds, shape, space, elevation, motion, icons, the four backgrounds) and *Components*. *Components* is interactive: press Play to try the Ask panel (four questions, including a refusal), the source sheet, the filter, the toast, the ⌘K bar, the folder, the dock and the GlassIcons.

The *Background* tweak switches the hero between Iridescence, Soft Aurora, Silk, Grainient and None, using captured stills of the real React Bits components.

---

## 10. Content inventory used in the mocks

All facts come from the README's deep-dives and claims audit.
- **Widgets:** 8,000+ downloads (Gridee; store consoles `[date]`); 183/183 (`glassbox-eval-v4`, 2 Oct 2026; Wilson 95% CI 97.9–100%); 254 backend tests on Postgres 15 (249 on SQLite, 5 Postgres-only; plus 11 Playwright specs); IIT Madras research intern, Mar 2025 – Mar 2026.
- **GlassBox:** FastAPI (~16.6k lines) + Next.js 16 (~14k lines); 0/183 hallucinations (CI 0–2.1%); determinism 1.00; faithfulness 0.98; p95 1 ms; one t4g.small in Mumbai at ~$14 a month; OIDC deploys; scorer training sets 320 / 240 / 160 rows; screenshot status line "Flagged · 4 sources · #77191542".
- **Pulse:** plain English → validated Segment DSL → parameterised Prisma query; the LLM never writes SQL, touches the database or sees PII; demo values from the screenshot (₹2,000, 60 days, 1,284 customers).
- **Gridee:** co-founder and founding engineer, Jan 2026 – present; CameraX + ML Kit OCR check-in; Razorpay; JWT; refundable coin bookings. The phone shows the real home screen, cropped above a test ad.
- **Experience:** IIT Madras (Mar 2025 – Mar 2026), Hindalco (Jun – Jul 2025), SRM B.Tech CSE (AI/ML) 2023 – 27, CGPA 8.5.
- **Certifications:** AWS Certified Cloud Practitioner (Jan 2026, valid to Jan 2029), Oracle Database SQL Certified Specialist (May 2026), Salesforce Certified Agentforce Specialist (Dec 2025). The AWS ML Specialty stays off until confirmed.
- **Placeholders:** `[month]` 2027 availability, LinkedIn `[handle]`, store-console `[date]`, CI `[run link]`, role on each case study, the "Over" alternative in each decision, a real bug in "What broke", the AI-tool note.

---

## 11. Decisions and open items

**Decided (Oct 4, 2026):**
1. Direction: **Glass**, final, as drawn on the canvas.
2. Accent: **Blue** (`#0071E3`). Indigo and Graphite stay available through `data-accent`.
3. Hero backgrounds: **Iridescence** (light) and **Soft Aurora** (dark).

**Still open (they don't block the build):**
4. Ask my portfolio: start with the no-server v1 (recommended; it's in `starter/`) or go straight to retrieval + LLM?
5. Profile photo: the mocks use a "YC" avatar; a real photo could go in the contact card.
6. The facts in the README's "Facts only you can confirm" list, especially the LinkedIn handle, the Gridee role split and the EMS paper's status. `starter/content/*` marks each one with a `todo` or a `[placeholder]`.

---

## 12. Licences and attribution

| Source | Licence | What it means here |
|---|---|---|
| React Bits / Vue Bits | MIT + Commons Clause | Free to use inside this site, including commercially. Don't sell or redistribute the components themselves. Keep the licence notice in each copied file. |
| vaul, sonner, cmdk, Motion, Embla, Lenis | MIT | Keep the notices (npm installs do this) |
| shadcn/ui | MIT | Copied components keep the notice |
| Lucide | ISC | |
| Simple Icons | CC0 (icons); marks are their owners' trademarks | Used only to show which tools were used |
| Inter | SIL Open Font License | Load from Google Fonts or self-host |
| SF Pro | Apple licence (Apple platforms only) | Used only through the system font stack, never self-hosted |
| RareUI | MIT + Commons Clause + visible attribution | Not used in Glass. If any RareUI code is copied later, add the required link to rareui.com |

---

## 13. React implementation notes

The step-by-step plan, install commands, React Bits props and a launch checklist are in [`IMPLEMENTATION.md`](IMPLEMENTATION.md). Ready-made pieces are in [`starter/`](starter/) and the generated token files in [`tokens/`](tokens/).

- **Packages:** `motion`, `ogl`, `vaul`, `sonner`, `cmdk`, `embla-carousel-react`, `lucide-react`, `simple-icons`; optionally `lenis` and shadcn/ui primitives. React Bits components install with the shadcn CLI (`npx shadcn@latest add @react-bits/<Name>-TS-TW`).
- **Tokens:** copy `tokens/tokens.css` and `tokens/tailwind.css`; both are generated from `source/tokens.js`, the same values the canvas uses. No component hard-codes a hex value except project colours.
- **Structure:**
  ```
  src/
    components/
      bits/        Iridescence  SoftAurora  GlassSurface  GradualBlur  BlurText  Counter
                   TiltedCard  RubberSegment  SwipeRow  Folder  GlassIcons  Dock  PromptBar  CallChip
      shell/       NavCapsule  TabBar  CommandBar  ThemeSwitch  Footer  Footnotes
      home/        Hero  HeroBackground  LiveChip  Widgets  AskPanel  WorkCards  ExperienceLists  Toolkit  ContactCard
      case/        AppHeader  StatStrip  Preview  Summary  OnThisPage  Diagram  DecisionCard  EvalPanel  InfoList
      ui/          Cite  StatusChip  InsetList  AppIcon  Button
    content/       projects.ts  sources.ts  answers.ts  experience.ts  toolkit.ts  site.ts  (case studies as MDX)
    lib/           ask.ts  wilson.ts  time.ts
  ```
- **Hero background:** `starter/components/HeroBackground.tsx` shows the still frame first, loads the WebGL component only near the viewport, and skips it for reduced motion or Save-Data.
- **Theme:** `starter/theme/theme-init.js` runs inline in `<head>` and sets `data-theme` from `localStorage` or `prefers-color-scheme` before paint (no flash). `ThemeSwitch.tsx` writes the choice and cross-fades with the View Transitions API where supported.
- **Islands** (if Astro): the nav, hero background, live chip, widgets, Ask panel and sheets are islands (`client:visible` or `client:idle`); everything else ships as static HTML.
- **Testing:** a Playwright smoke test (theme switch, the Ask refusal path, the source sheet by keyboard, the résumé link returns 200), axe checks on Home and one case study, and a link checker (lychee) in CI.
