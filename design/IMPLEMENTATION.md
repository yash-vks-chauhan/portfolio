# Building Glass: the implementation guide

This is the plan for turning the approved design into the real site. The look is fixed: when this guide and a screenshot disagree, the screenshot (and the canvas) wins; when it comes to behaviour, [`portfolio.design.md`](portfolio.design.md) wins.

**What to keep open while you build**
- [`screenshots/`](screenshots/): every artboard as an image. [`prototype/`](prototype/): the same pages as plain HTML; open them in a browser and inspect any element for exact sizes, colours and spacing.
- [`tokens/`](tokens/): the colour, type, radius and material tokens as CSS, Tailwind v4 theme and JSON.
- [`starter/`](starter/): content files, logic and React components you can copy in (tested and type-checked).
- [`assets/`](assets/): the hero backgrounds, screenshots and icons.

---

## 1. Pick the stack

The design doesn't depend on the framework: it's React components on a mostly static site. The choice is still decision 2 in the repo README.

| | Astro 7 + React islands | Next.js 16 (App Router) |
|---|---|---|
| Fits | A content site: near-zero JS on case studies, MDX built in | Your muscle memory; server features later (Ask v2) |
| Create | `npm create astro@latest` then `npx astro add react tailwind mdx` | `npx create-next-app@latest --ts --tailwind --app --src-dir` |
| Client components | `client:visible` / `client:idle` on the interactive ones | `'use client'` (already at the top of the starter components) |

Both give you Tailwind CSS v4, which the token files target.

## 2. Set up the project (about an hour)

1. **Styles.** Copy `tokens/tokens.css`, `tokens/tailwind.css` and `starter/styles/effects.css` into `src/styles/`. Your global stylesheet becomes:
   ```css
   @import "tailwindcss";
   @import "./tokens.css";
   @import "./tailwind.css";
   @import "./effects.css";
   ```
   You now have utilities like `bg-card`, `text-label2`, `text-cite`, `bg-cite-wash`, `rounded-card`, `rounded-widget`, `text-title1`, `font-rounded`, `elev-raised`, `glass-thin`, `glass-regular`, `glass-strong` and `lift`.
2. **No-flash theme.** Inline `starter/theme/theme-init.js` in `<head>` before the stylesheet (comments in the file show how in Next.js and Astro). `<html>` then always carries `data-theme="light"` or `"dark"`.
3. **Fonts.** Nothing to load on Apple devices: the stack uses SF Pro. For Windows and Android add Inter:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..700&display=swap">
   ```
   or self-host it with `@fontsource-variable/inter`. Never ship SF Pro files.
4. **Images.** Copy `assets/backgrounds/*`, `assets/projects/*` and `assets/icons/*` into `public/images/`. Let the framework's image component make AVIF/WebP and set width and height.
5. **Starter code.** Copy `starter/content`, `starter/lib`, `starter/components` and `starter/theme` into `src/`. Fix the `@/components/...` alias in `HeroBackground.tsx` if your alias differs.
6. **Packages.**
   ```bash
   npm i motion ogl vaul sonner cmdk embla-carousel-react lucide-react simple-icons
   npm i lenis   # optional smooth scroll
   ```
7. **React Bits components** (MIT + Commons Clause: fine inside this site; keep the licence header in each file).
   ```bash
   npx shadcn@latest init    # once, creates components.json
   npx shadcn@latest add @react-bits/Iridescence-TS-TW @react-bits/SoftAurora-TS-TW \
     @react-bits/GlassSurface-TS-TW @react-bits/GradualBlur-TS-TW @react-bits/BlurText-TS-TW \
     @react-bits/Counter-TS-TW @react-bits/TiltedCard-TS-TW @react-bits/RubberSegment-TS-TW \
     @react-bits/SwipeRow-TS-TW @react-bits/Folder-TS-TW @react-bits/GlassIcons-TS-TW \
     @react-bits/Dock-TS-TW @react-bits/PromptBar-TS-TW @react-bits/CallChip-TS-TW
   ```
   If the CLI doesn't know the `@react-bits` namespace, add it to `components.json`:
   ```json
   { "registries": { "@react-bits": "https://reactbits.dev/r/{name}.json" } }
   ```
   PromptBar, SwipeRow and CallChip pull in Hugeicons. Replace their icons with `lucide-react` and uninstall `@hugeicons/*` so the site has one icon set.
8. **Check the starter.** From `design/starter`: `npm test` (Node 22.6+) runs the Ask matcher, Wilson interval and content tests.

## 3. Build order

Each milestone ends with something you can compare against a screenshot.

| # | Milestone | Build | Done when |
|---|---|---|---|
| 1 | Shell | Nav capsule (`glass-thin`; React Bits GlassSurface where supported), `ThemeSwitch`, footer with `Footnotes`, sonner `<Toaster />`, cmdk command bar, phone tab bar | Theme survives reload with no flash; nav and tab bar work at 390 px; every control shows a focus ring |
| 2 | Hero and widgets | `HeroBackground`, `LiveChip`, BlurText headline, buttons, four `glass-regular` widgets with `Cite` | Matches `preview-home-light.jpg` and `preview-home-dark.jpg`; reduced motion shows the still frame; the source sheet opens and closes by keyboard |
| 3 | Ask my portfolio | `AskPanel` from the starter; optionally PromptBar for the field and CallChip for the "searching sources" step | The four suggestions behave like the Components artboard: three cited answers and one refusal |
| 4 | Selected work | GlassBox card (TiltedCard screenshot plus the "Flagged for compliance" toast), Pulse DSL card, Gridee phone card, Research card with Folder, More-work `InsetList` with `StatusChip` | Matches the middle of `home-light.jpg` and `home-dark.jpg` |
| 5 | Experience, toolkit, contact | Inset lists plus a vaul side sheet (`direction="right"` on desktop, bottom sheet on phones), GlassIcons with a "used in" panel, the contact card and Dock | Matches the bottom of `home-light.jpg` |
| 6 | Case study template | App header, stat strip, Embla preview carousel, summary, sticky "On this page" (IntersectionObserver marks the active section), diagram, decision cards, evaluation (`wilson.ts`), CI chain, information list, more work | GlassBox matches `case-study-light.jpg`; then Pulse, Gridee and EMS reuse it |
| 7 | Work index | RubberSegment filter from `projects.ts` categories, two featured cards, the numbered list, the status legend | Matches `work-index.jpg`; the filter counts read 8 · 3 · 3 · 2 · 1 · 1 |
| 8 | Phones | 390 px layouts from the mobile artboards; tab bar; the first screen | Matches `mobile-first-screen-light.jpg`, `mobile-home.jpg` and `mobile-case-study-dark.jpg` |
| 9 | Polish and launch | Springs, reduced motion, axe, performance budget, SEO, 404, résumé link | Every box in section 7 is ticked |

## 4. Page reference

**Home** (`screenshots/home-light.jpg`, `home-dark.jpg`; prototype `GlassHome.html`)

| Section | Components | Content | Notes |
|---|---|---|---|
| Nav | NavCapsule, ThemeSwitch | `site` | 56 px capsule, 44 px targets, sticky 16 px from the top |
| Hero | HeroBackground, LiveChip, BlurText | `site.headline`, `site.lead` | Display 96 (`clamp(48px, 6.7vw, 96px)`); 184 px top padding, 300 px bottom so the widgets can overlap |
| Widgets | Counter (254 and 183 only; keep "8,000+" as text), Cite | `sources` | 4 columns ≥ 232 px, 188 px tall, radius 28, `glass-regular`, pulled up 236 px |
| Ask | AskPanel | `answers` | Panel max 880 px, radius 32, `elev-floating` |
| Selected work | TiltedCard, Folder, InsetList, StatusChip | `projects` | Cards radius 32, padding 48–56; two-up cards min 700 px tall |
| Experience | InsetList, vaul sheet | `work`, `education`, `certifications` | Rows 76 px; separators inset to the text |
| Toolkit | GlassIcons | `toolkit` | 6 columns at 112 px minimum; edit the copied component's grid classes to match |
| Contact | ContactCard, Dock | `site` | Card max 560 px |
| Footer | Footnotes | `sources` | Numbered in the order the page cites them (`numberSources`) |

**Case study** (`case-study-light.jpg`, `case-study-dark.jpg`; `GlassCase.html`): app icon 136 px (radius 31), stat strip of six cells, carousel slides 560 px wide, prose column 800 px with a 200 px sticky TOC, diagram host 780 × 456. Copy the diagram's cards and arrows from the prototype markup.

**Work index** (`work-index.jpg`; `GlassWork.html`): featured cards 420 px tall; list rows 96 px with a 64 px icon.

**Phones** (`mobile-*.jpg`; `GlassMobile*.html`): gutters 16, sections 96 apart, widgets 2 × 2 at 168 px, tab bar 64 px with a separate round Ask button.

## 5. React Bits settings that match the design

| Component | Props to start from | Watch out for |
|---|---|---|
| Iridescence | `speed={0.5} amplitude={0.1} mouseReact={false}` | Tune `color` until it matches `hero-iridescence.jpg` |
| SoftAurora | `speed={0.4} enableMouseInteraction={false}` | Default colours give the pink-to-blue band; `lightMode` exists |
| GlassSurface | `height={56} borderRadius={28} width="auto"` for the nav | Refraction only on Chromium; Safari and Firefox get the frosted fallback, so keep `glass-thin` as the base look |
| GradualBlur | `position="top" height="6rem" target="page"` | One instance, under the nav |
| BlurText | `text={site.headline} animateBy="words" delay={80}` | Render the plain `<h1>` for SEO; animate a visual copy or the same element |
| Counter | `value={254} fontSize={46}` | Digits only: no thousands separator or suffix |
| TiltedCard | `rotateAmplitude={6} scaleOnHover={1.02} showTooltip={false} showMobileWarning={false}` | Off under reduced motion |
| RubberSegment | `trackColor="var(--fill2)" thumbColor="var(--seg-on)" textColor="var(--label2)" activeTextColor="var(--label)" radius={999}` | Give it an `aria-label` |
| SwipeRow | `actions` = Code (`#636366`) and Demo (`#0071E3`); `rowColor="var(--card)" textColor="var(--label)" radius={20} height={72}` | Phones only; desktop shows plain rows |
| Folder | `color="#2F7BF5" size={1.4} items={[<Paper />, <Paper />]}` | Up to three papers; the IEEE paper shows no title |
| GlassIcons | `items={toolkit.map((t) => ({ icon, label: t.name, color: \`linear-gradient(145deg, ${t.color[0]}, ${t.color[1]})\` }))}` | `color` takes any CSS background |
| Dock | `items` = Email, GitHub, LinkedIn, Résumé; `baseItemSize={54} magnification={70} panelHeight={68}` | Touch devices: no magnification, plain row |
| PromptBar | `sources={[]} commands={[]} models={[]} onSend={submit} background="var(--fill)" color="var(--label)" sparkColor="#AF52DE" radius={20}` | `width` is a number; measure the container |
| CallChip | `icon="search" name="sources" argument="glassbox-eval-v4" status="running"` → `"done"` | Optional, Ask panel only |

## 6. Content to fill before launch

`npm test` in `design/starter` prints the placeholders still open. Today: store-console screenshot and date, the CI run link, the 90-second demo video, the availability month and the LinkedIn handle. The `todo` fields in `starter/content/projects.ts` list the facts to confirm (your role on each case study, the Gridee role split, the EMS venue, Pulse posting terms, Kalakraft ownership). Keep the README's claims audit in step with any number you add.

## 7. Launch checklist

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

## 8. Changing the design later

The canvas and the prototypes are generated from `source/templates/` by `source/build.js`. To change something: edit the template, run `npm run build:canvas` and `npm run shots` in `design/source`, then ask Claude to publish the changed `artifact/project/*.dc.html` files to the canvas. Token changes go in `source/tokens.js`, then `npm run tokens`. See [`source/README.md`](source/README.md).
