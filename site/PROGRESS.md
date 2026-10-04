# Site build progress

Resume from the first unchecked box. Every milestone ends the same way: `npm run check`, `npm test` and `npm run build` pass; `npm run shots` captures the pages at 1440 and 390 px in light and dark; `npm run compare` puts them next to `design/screenshots/`; differences get fixed; the box gets ticked and the work is committed. Nothing is pushed, merged or deployed without asking Yash first.

- **Stack:** Astro 7.3.5 (pinned) with React 19 islands and Tailwind CSS 4.3, in `site/`. Every dependency is pinned to an exact version in `package.json`.
- **Branch:** built on `feat/glass-site` (made from `design/glass`), fast-forwarded into `design/glass`, then into `main` on 4 Oct 2026. The built site lives on `gh-pages`, which GitHub Pages serves.
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
- [x] **8. Phones:** 390 px layouts from the mobile artboards; tab bar; the first screen. *Done when:* matches `mobile-first-screen-light.jpg`, `mobile-first-screen-dark.jpg`, `mobile-home.jpg` and `mobile-case-study-dark.jpg`
- [x] **9. Polish and launch:** springs, reduced motion, axe, performance budget, SEO, research, about and 404 pages, résumé link. *Done when:* every box below is ticked or listed under "Blocked on Yash"

## Pages (light and dark, 1440 and 390 px)

- [x] Home (`/`)
- [x] Work index (`/work`)
- [x] Case studies: GlassBox, Pulse, Gridee, EMS research (`/work/<slug>`)
- [x] Short pages: Autoscaler, Kalakraft, CT denoising (`/work/<slug>`)
- [x] Research (`/research`), About (`/about`), 404

## Features

- [x] Theme switch (no flash, remembered, follows the OS until chosen)
- [x] Source sheets (vaul) and footnotes, numbered per page; build fails on an unknown source
- [x] Ask my portfolio v1 (cited answers or a refusal)
- [x] ⌘K search (cmdk): projects, pages and actions
- [x] Work filter (RubberSegment)
- [x] React Bits backgrounds and components, each with a reduced-motion fallback

## Launch checklist (IMPLEMENTATION.md §7)

**Accessibility**
- [x] axe passes on Home and one case study, in both themes (every page type, both themes, 1440 and 390 px: `tests/e2e/a11y.spec.ts`)
- [x] Every control is a real `<button>` or `<a>`; icon-only ones have `aria-label` (`tests/e2e/launch.spec.ts`, every page)
- [x] Focus ring visible everywhere; sheets and the command bar trap focus and close on Esc (`shell.spec.ts`, `launch.spec.ts`)
- [x] Text contrast as in the spec (section 3.1), including on glass (axe on solid surfaces; `npm run contrast` measures the 118 text runs on glass)
- [x] Reduced motion: still hero, no counters rolling, no tilt; Save-Data skips WebGL (`hero.spec.ts`, `work.spec.ts`, `about.spec.ts`)

**Performance** (throttled mid-range Android)
- [ ] LCP ≤ 2.0 s, CLS ≤ 0.05, INP ≤ 150 ms, Lighthouse mobile ≥ 95 (here: Lighthouse 96–100, CLS ≤ 0.008, TBT 0 ms on every page; LCP 1.5–2.6 s in simulation, so a real-device check is under "Blocked on Yash")
- [x] Home JS ≤ 160 KB gzipped including the background; WebGL paused off-screen, DPR capped at 1.5 (140 KB: `npm run budget`; `hero.spec.ts`)
- [x] Images AVIF/WebP with explicit sizes; below-the-fold images lazy (`launch.spec.ts`, every page)

**Content and SEO**
- [ ] No `[placeholder]` left; every number has a source with a checked date (`npm run placeholders` lists what's open: under "Blocked on Yash")
- [ ] `/resume.pdf` returns 200 (the file is Yash's to add; `launch.spec.ts` checks it once it exists)
- [x] JSON-LD `ProfilePage` + `Person` with `sameAs`; per-page titles and descriptions; Open Graph images (`launch.spec.ts`; images from `npm run og`)
- [ ] robots.txt allows search and AI crawlers (turn off Cloudflare's default AI-crawler block) (robots.txt is done and tested; the Cloudflare switch comes with the deployment)
- [ ] Search Console and Bing Webmaster Tools; Cloudflare Web Analytics or Umami (no cookies) (needs the domain)
- [x] A 404 page and a working ⌘K search

## Decisions made while building

- **Facts:** only from `design/starter/content` and the README's deep-dives and claims audit. New sources for the Pulse, Gridee and EMS case studies are in `src/content/sources.ts`; every source carries a `checked` date or a `[date checked]` placeholder.
- **Footnote wording:** the design words the same footnote three ways (home footer, phone footer, case-study source list), so each source has `note`, `notePhone` and `noteShort`.
- **Refusal text:** the screenshots say "Ask me in person."; the starter said "Ask me directly." The site follows the screenshots.
- **Theme switch on phones:** the phone chrome has no theme switch or search, so the phone footer carries both (a small addition to the drawn footer).
- **Command bar:** cmdk with a word-prefix filter (cmdk's fuzzy default matched almost anything across long keywords).
- **Nav glass:** the CSS `glass-thin` frost is the look everywhere; on Chromium, React Bits GlassSurface's refraction filter is added on top (`bits/NavGlass.tsx`).
- **Hero background:** the still frame is a CSS background picked by the theme (the OS theme's AVIF is preloaded from `<head>`; a theme chosen against the OS loads its own); WebGL loads lazily, fades in after its first frame and pauses off-screen. Iridescence's `color` is `[0.5, 0.6, 0.8]`, fitted to `hero-iridescence.jpg` (the still's channels are the shader output scaled by about those factors).
- **Headline and numbers:** the headline's blur-in is React Bits BlurText's effect redone in CSS (same keyframes and 80 ms stagger), so the first screen needs no script; the words are inline blocks in ordinary text flow, so lines wrap and centre like plain text. Reduced motion shows the words at once. Widget numbers roll (Counter) only when `<html class="motion-ok">` (no reduced motion, no Save-Data); the island hydrates at idle, and CSS shows the plain number after 3 s if the script never comes.
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
- **Phone pass:** against the artboards rendered here with Inter, the phone first screen scores 0.52 (light) and 0.65 (dark) mean difference, the phone home 0.78 and the phone GlassBox page matches through Decisions; what's left is the extra footnotes, the phone footer row and the "More on …" disclosures. Full-page screenshots place the tab bar at the end of the page, as the artboards do. Preview images keep their source ratio (resized copies rounded 187.5 px to 188).
- **Research, About and 404:** no artboards exist for them, so they use the system's parts: the work-index page header, solid cards, inset lists, the home page's Research folder and Experience details. Research never shows the double-blind paper's title, topic or venue name; About carries the plain bio that search engines and assistants can quote, and the ProfilePage JSON-LD (Home has it too). The 404 page is `noindex` and offers Home, the work and search.
- **JavaScript budget (Home 209 → 140 KB gzipped):** one small `Shell` island owns the page's global controls (⌘K, source markers, copy and share) and loads the command bar, source sheet and toaster on first use; the phone-only Experience sheet loads on the first tap; brand icons reach islands as data instead of the whole icon set; Motion's slim `m` component with only the DOM renderer (`LazyMotion` + `domMin`) replaces the full one.
- **First paint:** the stylesheet is inlined in every page (one round trip fewer); the hero's still frame is preloaded from `<head>`; the nav's theme switch, the live chip and the rolling numbers hydrate at idle, after the first paint; only the first preview slide loads eagerly.
- **WebGL needs a GPU:** where WebGL would be software-rendered (SwiftShader, llvmpipe; headless Chrome, which is what Lighthouse and PageSpeed Insights use), the hero keeps its still frame. The canvas renders at the screen's pixel density up to 1.5. Tests and scripts stand in for a GPU (`scripts/gpu.mjs`).
- **Fonts:** Inter loads with `font-display: optional`, so the page never re-flows when the font arrives: a cold first visit on a slow connection keeps the stand-in for that page, and the next page uses the cached Inter. The stand-in is Arial (Liberation Sans on Linux) resized and re-spaced to Inter's metrics (measured in Chromium on the site's own text), so it wraps close to Inter. Screenshots and preview images are captured with Inter (`scripts/fonts.mjs`).
- **Contrast on glass:** axe can't judge text over blurred glass, so `npm run contrast` measures it against the pixels behind each text run. Three drawn tones fell short there and moved the smallest step that passes: the nav links in light (#6E6E73 → #5A5A5F), the widgets' source numbers (→ #65656A), and the active tab label (#005CB8 light, #94CCFF dark).
- **Sheets take focus:** vaul doesn't move focus into a sheet by default; the source sheet and the Experience sheet now do, so Tab stays inside until Esc, and focus returns to the control that opened them.
- **Springs:** the Dock uses the design's spring (stiffness 300, damping 30). RubberSegment and SwipeRow keep React Bits' tuned springs: their 0.3 s critically damped UI spring looks the same as 300/30, and their momentum and rubber-band springs depend on it.
- **Lighthouse (mobile, simulated mid-range Android, this container):** performance 96–100, accessibility, best practices and SEO 100 on all eleven pages; CLS ≤ 0.008; total blocking time 0 ms. LCP 1.5–2.6 s, varying by about ±0.5 s from run to run (Home and `/work` sometimes above 2.0 s); INP needs real visitors.
- **Temporary deployment (GitHub Pages):** until the domain exists, the site is live at `https://yash-vks-chauhan.github.io/portfolio/` (first published 4 Oct 2026), and `npm run deploy:pages` republishes it. It builds with `BASE_PATH=/portfolio` (every internal link goes through `withBase()`, so the site also works under a sub-path), `SITE_URL` and `NOINDEX=1` (a `noindex` tag on every page, so the temporary address and its placeholders stay out of search results), then commits the build to the `gh-pages` branch and pushes it. A normal `npm run build` is unchanged: the root of the domain, indexable.
- **Hosting headers:** `public/_headers` gives Cloudflare a year's caching for hashed build files (so the cached Inter is reused) and a few security headers.
- `Yash_Chauhan_Master_Resume.pdf` is never copied into `site/`. The site links `/resume.pdf`; that file is Yash's to add (a test fails if the master résumé ever lands in `public/`).

## Blocked on Yash

The final list, as of milestone 9 (all milestones done). Everything below needs Yash: a fact, a file, an account or a decision.

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

Before launch (IMPLEMENTATION.md §7):
- `/resume.pdf`: add `public/resume.pdf`, a version without your phone number and without the double-blind paper's title (the master résumé shows both, so it stays out of the site).
- Placeholders: `npm run placeholders` lists them: 21 on the pages (59 in all) and 25 source fields, mostly the `[date checked]` of each source. Besides the case-study ones above: your LinkedIn handle (`[handle]` in `src/content/site.ts`), the Gridee downloads screenshot and its date, and the GlassBox CI run link.
- Domain: `SITE_URL` defaults to `https://yashchauhan.dev`, which isn't registered (availability not checked). Canonical links, the sitemap, robots.txt and Open Graph URLs come from it; set `SITE_URL` when building for the real domain.
- For now the site is live on GitHub Pages at https://yash-vks-chauhan.github.io/portfolio/ (published from the `gh-pages` branch; `npm run deploy:pages` republishes). Its pages carry `noindex` until the real domain, so search engines leave the temporary address alone.
- Cloudflare deployment for the real domain (`site/wrangler.jsonc` is ready for Workers static assets: build with `SITE_URL`, then `npx wrangler deploy` from `site/`): turn off the default AI-crawler block, so robots.txt's welcome to GPTBot, ClaudeBot and the rest applies; switch on Web Analytics (cookieless); after the domain is live, add it to Google Search Console and Bing Webmaster Tools (and IndexNow).
- Performance on a real phone: once deployed, run PageSpeed Insights on Home and `/work` (the LCP target is 2.0 s; here it measures 1.5–2.6 s in simulation), and watch field data for LCP and INP.

Promises the site makes that need setting up:
- The work index's status legend says "Live" means "Running now, with an uptime monitor": add monitors for the GlassBox, Pulse and Kalakraft demos (and the Gridee site).

Toolkit usages to confirm (from `src/content/toolkit.ts`, `verify`):
- Python in the IEEE manuscript (the README names XGBoost and SHAP but not the language).
- TypeScript: add GlassBox if its Next.js front end is TypeScript.
- PostgreSQL: the Autoscaler uses TimescaleDB (a Postgres extension); add Pulse if its Prisma database is Postgres.
- scikit-learn: add the Autoscaler if its Isolation Forest and Random Forest use scikit-learn.
