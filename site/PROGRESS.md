# Site build progress

Resume from the first unchecked box. Every milestone ends the same way: `npm run check`, `npm test` and `npm run build` pass; `npm run shots` captures the pages at 1440 and 390 px in light and dark; `npm run compare` puts them next to `design/screenshots/`; differences get fixed; the box gets ticked and the work is committed. Nothing is pushed, merged or deployed without asking Yash first.

- **Stack:** Astro 7.3.5 (pinned) with React 19 islands and Tailwind CSS 4.3, in `site/`. Every dependency is pinned to an exact version in `package.json`.
- **Branch:** `feat/glass-site`, made from `design/glass` (`main` doesn't have the design yet).
- **Fonts in screenshots:** the design screenshots were rendered on a Mac with SF Pro and SF Pro Rounded (the rounded "+" in "8,000+" gives it away). This container has no SF Pro, so it renders the intended fallback, Inter. Text runs come out about 3% wider at large sizes; layout, spacing and colour are compared as drawn. For pixel diffs, `npm run compare` also renders the prototypes here with Inter.

## Setup

- [x] Read `design/README.md`, `design/IMPLEMENTATION.md`, `design/portfolio.design.md` and the repo `README.md`
- [x] Scaffold `site/`: Astro, React, Tailwind v4, tokens, starter content and logic, self-hosted Inter
- [x] Copy the React Bits components (licence header kept, Hugeicons swapped for Lucide), assets, and the starter content and logic
- [x] Unit tests (starter tests plus the site's own), Playwright, the screenshot and compare scripts

## Milestones (IMPLEMENTATION.md §3)

- [x] **1. Shell:** nav capsule (`glass-thin`; GlassSurface where supported), `ThemeSwitch`, footer with `Footnotes`, sonner `<Toaster />`, cmdk command bar, phone tab bar. *Done when:* theme survives reload with no flash; nav and tab bar work at 390 px; every control shows a focus ring
- [x] **2. Hero and widgets:** `HeroBackground`, `LiveChip`, BlurText headline, buttons, four `glass-regular` widgets with `Cite`. *Done when:* matches `preview-home-light.jpg` and `preview-home-dark.jpg`; reduced motion shows the still frame; the source sheet opens and closes by keyboard
- [x] **3. Ask my portfolio:** `AskPanel` (v1, no server); optional CallChip "searching sources" step. *Done when:* the four suggestions behave like the Components artboard: three cited answers and one refusal
- [x] **4. Selected work:** GlassBox card (TiltedCard screenshot plus the "Flagged for compliance" toast), Pulse DSL card, Gridee phone card, Research card with Folder, More-work `InsetList` with `StatusChip`. *Done when:* matches the middle of `home-light.jpg` and `home-dark.jpg`
- [x] **5. Experience, toolkit, contact:** inset lists plus a vaul side sheet (bottom sheet on phones), GlassIcons with a "used in" panel, the contact card and Dock. *Done when:* matches the bottom of `home-light.jpg`
- [x] **6. Case study template:** app header, stat strip, Embla preview carousel, summary, sticky "On this page" (IntersectionObserver), diagram, decision cards, evaluation (`wilson.ts`), CI chain, information list, more work. *Done when:* GlassBox matches `case-study-light.jpg` and `case-study-dark.jpg`; Pulse, Gridee and EMS reuse it; short pages for Autoscaler, Kalakraft and CT denoising
- [x] **7. Work index:** RubberSegment filter from `projects.ts` categories, two featured cards, the numbered list, the status legend. *Done when:* matches `work-index.jpg`; the filter counts read 8 · 3 · 3 · 2 · 1 · 1
- [ ] **8. Phones:** 390 px layouts from the mobile artboards; tab bar; the first screen. *Done when:* matches `mobile-first-screen-light.jpg`, `mobile-first-screen-dark.jpg`, `mobile-home.jpg` and `mobile-case-study-dark.jpg`
- [ ] **9. Polish and launch:** springs, reduced motion, axe, performance budget, SEO, research, about and 404 pages, résumé link. *Done when:* every box below is ticked or listed under "Blocked on Yash"

## Pages (light and dark, 1440 and 390 px)

- [x] Home (`/`)
- [x] Work index (`/work`)
- [x] Case studies: GlassBox, Pulse, Gridee, EMS research (`/work/<slug>`)
- [x] Short pages: Autoscaler, Kalakraft, CT denoising (`/work/<slug>`)
- [ ] Research (`/research`), About (`/about`), 404

## Features

- [x] Theme switch (no flash, remembered, follows the OS until chosen)
- [x] Source sheets (vaul) and footnotes, numbered per page; build fails on an unknown source
- [x] Ask my portfolio v1 (cited answers or a refusal)
- [x] ⌘K search (cmdk): projects, pages and actions
- [x] Work filter (RubberSegment)
- [ ] React Bits backgrounds and components, each with a reduced-motion fallback

## Launch checklist (IMPLEMENTATION.md §7)

**Accessibility**
- [ ] axe passes on Home and one case study, in both themes
- [ ] Every control is a real `<button>` or `<a>`; icon-only ones have `aria-label`
- [ ] Focus ring visible everywhere; sheets and the command bar trap focus and close on Esc
- [ ] Text contrast as in the spec (section 3.1), including on glass
- [ ] Reduced motion: still hero, no counters rolling, no tilt; Save-Data skips WebGL

**Performance** (throttled mid-range Android)
- [ ] LCP ≤ 2.0 s, CLS ≤ 0.05, INP ≤ 150 ms, Lighthouse mobile ≥ 95
- [ ] Home JS ≤ 160 KB gzipped including the background; WebGL paused off-screen, DPR capped at 1.5
- [ ] Images AVIF/WebP with explicit sizes; below-the-fold images lazy

**Content and SEO**
- [ ] No `[placeholder]` left; every number has a source with a checked date
- [ ] `/resume.pdf` returns 200
- [ ] JSON-LD `ProfilePage` + `Person` with `sameAs`; per-page titles and descriptions; Open Graph images
- [ ] robots.txt allows search and AI crawlers (turn off Cloudflare's default AI-crawler block)
- [ ] Search Console and Bing Webmaster Tools; Cloudflare Web Analytics or Umami (no cookies)
- [ ] A 404 page and a working ⌘K search

## Decisions made while building

- **Facts:** only from `design/starter/content` and the README's deep-dives and claims audit. New sources for the Pulse, Gridee and EMS case studies are in `src/content/sources.ts`; every source carries a `checked` date or a `[date checked]` placeholder.
- **Footnote wording:** the design words the same footnote three ways (home footer, phone footer, case-study source list), so each source has `note`, `notePhone` and `noteShort`.
- **Refusal text:** the screenshots say "Ask me in person."; the starter said "Ask me directly." The site follows the screenshots.
- **Theme switch on phones:** the phone chrome has no theme switch or search, so the phone footer carries both (a small addition to the drawn footer).
- **Command bar:** cmdk with a word-prefix filter (cmdk's fuzzy default matched almost anything across long keywords).
- **Nav glass:** the CSS `glass-thin` frost is the look everywhere; on Chromium, React Bits GlassSurface's refraction filter is added on top (`bits/NavGlass.tsx`).
- **Hero background:** the still frame is a CSS background picked by the theme (only the active theme's AVIF loads); WebGL loads lazily, fades in after its first frame and pauses off-screen. Iridescence's `color` is `[0.5, 0.6, 0.8]`, fitted to `hero-iridescence.jpg` (the still's channels are the shader output scaled by about those factors).
- **Headline and numbers:** BlurText animates the real `<h1>`; CSS shows the words at once under reduced motion, without JavaScript, or after 2.5 s if the script is slow. Widget numbers roll (Counter) only when `<html class="motion-ok">` (no reduced motion, no Save-Data).
- **Ask panel:** opens with the drawn thread (the GlassBox answer and the film refusal); the chips are the other three suggestions; the last two turns stay on screen. A React Bits CallChip shows the lookup (`sources · glassbox-eval-v4`) before an answer streams in; screen readers hear the finished answer once. Phones show one turn and no chips, with the shorter GlassBox answer, as drawn.
- **Line breaks with Inter:** "Co-founder" may break at its hyphen, as the prototype does when rendered with Inter; with SF Pro the lead wraps exactly as drawn.
- **Selected work:** the GlassBox screenshot tilts (TiltedCard) only with a fine pointer and without reduced motion; on phones each card is one link, and the More-work rows are React Bits SwipeRows (swipe or the row's "actions" toggle for Code and Demo; a tap opens the project). The home rows use the drawn, shorter wording for Autoscaler and CT denoising. The Research folder (React Bits Folder) is a real toggle with the drawn closed and open poses.
- **Box sizing:** the prototypes have no global `border-box`, so their chat bubbles' percentage `max-width` excludes padding; the site sets `content-box` on those bubbles to wrap exactly as drawn.
- **Private notes stay out of the bundle:** the starter's per-project `todo` notes (one named the double-blind venue) were reaching the command bar's JavaScript. They now live under "Blocked on Yash" below, and a unit test fails if the venue's name appears anywhere in `src/`, `public/` or the build.
- **Experience:** the detail sheet stays docked beside the lists on desktop, as drawn (Gridee open), and a row selects into it; phones open the same details in a vaul bottom sheet (the spec's "side sheet on desktop" is drawn docked, so the drawing wins). Rows link to `/about#<id>` without JavaScript. Certifications link out to each credential, as drawn. The home footer lists six notes, not the drawn four: the Hindalco and SRM details cite two more sources, and every number needs its note.
- **Toolkit:** React Bits GlassIcons reshaped to the drawn tiles (72 px, 6 columns; 60 px, 4 columns and eight tools on phones); each tile is a toggle and the "used in" panel is a live region. Only public fields reach the page: `toolkit.ts`'s `verify` notes stay out (a unit test checks the build).
- **Contact and Dock:** the Dock items are real links; the panel keeps its height and a magnified icon rises out of it. It rests at 54 px (the home artboard draws the pointer over GitHub; the Components artboard draws it at rest). No magnification without a fine pointer or under reduced motion. "Copy" copies the address with the "Email copied" toast.
- **Case studies:** data files in `src/content/case-studies/` (one per page) rendered by one template (`src/components/case/`). GlassBox is the drawn page; Pulse, Gridee and EMS reuse its parts with the sections their facts support (no evaluation ring without an evaluation, no preview for EMS's government data). Intervals come from `lib/wilson.ts`; reading time is counted from the text (the drawing's "12 min" was illustrative).
- **Which facts:** the README's deep-dives and claims audit, plus `design/starter/content`. The README's Experience section repeats résumé claims, so its extra details stay off the case studies and are listed under "Blocked on Yash" to confirm.
- **Phones:** case studies show the drawn sections in the drawn order (problem, the flow as steps, evaluation, one decision plus "N more"), and keep every other section reachable behind "More on …" disclosures (the mobile artboard leaves them out). The phone footer and the full source list follow.
- **Stat strip:** cells use the drawing's content-box sizing, so at 1440 px the strip overflows by about 32 px and scrolls, as drawn.
- **Placeholder links** (the 90-second video) render as disabled buttons until the link exists. Share uses the system share sheet where there is one, otherwise copies the link with a toast.
- **Work index:** the RubberSegment filter sets `data-filter` and CSS hides what doesn't match (featured cards included), so the page is whole without JavaScript; the choice is kept in the URL (`/work?filter=mobile`) and announced. Two fixes to the copied component: segments inherit only the font family (Tailwind v4 let `font: inherit` reset their 14 px size), and the thumb's shadow sits on a wrapper (the thumb is a clip-path). On phones the filter strip scrolls sideways.
- `Yash_Chauhan_Master_Resume.pdf` is never copied into `site/`. The site links `/resume.pdf`; that file is Yash's to add (a test fails if the master résumé ever lands in `public/`).

## Blocked on Yash

Filled in as the build goes; the final list is at the end of the build.

Notes from the starter's project files (moved here so they never ship in the site's JavaScript):
- GlassBox: your role on the case study (solo build?); a real domain for the demo instead of sslip.io; the "Over" alternative in each decision.
- Pulse: confirm the Xeno assignment terms allow public posting; make the README and ARCHITECTURE.md agree on the LLM provider chain.
- Gridee: your role split with your co-founder; whether 8,000+ counts downloads or active users.
- EMS research: confirm the venue and review status; ask the PI what you may show (aggregate results only; government data).
- IEEE manuscript: no title, topic or PDF until the decision; after acceptance, change the line to the accepted wording in `design/starter/content/projects.ts`.
- Autoscaler: add tests on the safety rails; say "SHAP-style attribution", not SHAP; the LSTM is planned, not built.
- Kalakraft: clarify ownership and whether it has real orders.
- CT denoising: fix the noisy/clean pairing and re-run the metrics before quoting any number.

Case-study placeholders (they show on the pages in grey until filled):
- GlassBox: the 90-second demo video link; the real `make eval` command; the "Over" alternative in each decision; a real bug you hit; the AI-tool note; your role.
- Pulse: your role; the "Over" and "Cost" of the state-machine and failover decisions; your next step; a real bug; the Origin row names Xeno, so confirm the assignment terms allow it (or drop the row).
- Gridee: your role split with your co-founder; one hard engineering story; the AI-tool note.
- EMS: the record count (once the PI agrees); what you'd do differently; and confirm with the PI that the five aggregate findings can be shown.
- Kalakraft: who else built it, and whether it takes real orders.

Résumé claims from the README's Experience section, left off until you confirm them:
- EMS: 8,567 autoencoder outliers, 8.37% WMAPE, 5,000+ simulated routes, a 55-column matrix, the statistical tests.
- Gridee: ZXing, Retrofit and OkHttp, email and Google sign-in, operator workflows for entry, exit and occupancy.

Promises the site makes that need setting up:
- The work index's status legend says "Live" means "Running now, with an uptime monitor": add monitors for the GlassBox, Pulse and Kalakraft demos (and the Gridee site).

Toolkit usages to confirm (from `src/content/toolkit.ts`, `verify`):
- Python in the IEEE manuscript (the README names XGBoost and SHAP but not the language).
- TypeScript: add GlassBox if its Next.js front end is TypeScript.
- PostgreSQL: the Autoscaler uses TimescaleDB (a Postgres extension); add Pulse if its Prisma database is Postgres.
- scikit-learn: add the Autoscaler if its Isolation Forest and Random Forest use scikit-learn.
