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
- [ ] **3. Ask my portfolio:** `AskPanel` (v1, no server); optional CallChip "searching sources" step. *Done when:* the four suggestions behave like the Components artboard: three cited answers and one refusal
- [ ] **4. Selected work:** GlassBox card (TiltedCard screenshot plus the "Flagged for compliance" toast), Pulse DSL card, Gridee phone card, Research card with Folder, More-work `InsetList` with `StatusChip`. *Done when:* matches the middle of `home-light.jpg` and `home-dark.jpg`
- [ ] **5. Experience, toolkit, contact:** inset lists plus a vaul side sheet (bottom sheet on phones), GlassIcons with a "used in" panel, the contact card and Dock. *Done when:* matches the bottom of `home-light.jpg`
- [ ] **6. Case study template:** app header, stat strip, Embla preview carousel, summary, sticky "On this page" (IntersectionObserver), diagram, decision cards, evaluation (`wilson.ts`), CI chain, information list, more work. *Done when:* GlassBox matches `case-study-light.jpg` and `case-study-dark.jpg`; Pulse, Gridee and EMS reuse it; short pages for Autoscaler, Kalakraft and CT denoising
- [ ] **7. Work index:** RubberSegment filter from `projects.ts` categories, two featured cards, the numbered list, the status legend. *Done when:* matches `work-index.jpg`; the filter counts read 8 · 3 · 3 · 2 · 1 · 1
- [ ] **8. Phones:** 390 px layouts from the mobile artboards; tab bar; the first screen. *Done when:* matches `mobile-first-screen-light.jpg`, `mobile-first-screen-dark.jpg`, `mobile-home.jpg` and `mobile-case-study-dark.jpg`
- [ ] **9. Polish and launch:** springs, reduced motion, axe, performance budget, SEO, research, about and 404 pages, résumé link. *Done when:* every box below is ticked or listed under "Blocked on Yash"

## Pages (light and dark, 1440 and 390 px)

- [ ] Home (`/`)
- [ ] Work index (`/work`)
- [ ] Case studies: GlassBox, Pulse, Gridee, EMS research (`/work/<slug>`)
- [ ] Short pages: Autoscaler, Kalakraft, CT denoising (`/work/<slug>`)
- [ ] Research (`/research`), About (`/about`), 404

## Features

- [ ] Theme switch (no flash, remembered, follows the OS until chosen)
- [ ] Source sheets (vaul) and footnotes, numbered per page; build fails on an unknown source
- [ ] Ask my portfolio v1 (cited answers or a refusal)
- [ ] ⌘K search (cmdk): projects, pages and actions
- [ ] Work filter (RubberSegment)
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
- **Line breaks with Inter:** "Co-founder" may break at its hyphen, as the prototype does when rendered with Inter; with SF Pro the lead wraps exactly as drawn.
- `Yash_Chauhan_Master_Resume.pdf` is never copied into `site/`. The site links `/resume.pdf`; that file is Yash's to add (a test fails if the master résumé ever lands in `public/`).

## Blocked on Yash

Filled in as the build goes; the final list is at the end of the build.
