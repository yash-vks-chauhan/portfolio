# Design References and UI/Visual Design Trends for Developer and AI/ML Engineer Portfolios (2026)

Research date: 2026-10-03. Context: the candidate already uses a warm off-white "paper" background, Source Serif 4 display headings, Geist + Geist Mono with letter-spaced uppercase micro-labels, a deep navy accent, and a separate HUD-style "mission control" GitHub profile README. The goal is a look that is distinctive but credible.

**How the sites were checked (applies to every section):** In this research environment the network egress proxy blocked direct fetches (WebFetch/curl) of almost every personal domain (brittanychiang.com, rauno.me, paco.me, emilkowal.ski, leerob.com, joshwcomeau.com, karpathy.ai, stephango.com, and the gallery sites). Only github.com could be fetched directly. "Live" status below therefore comes from **search-engine evidence gathered in Oct 2026**: the homepage or a dated subpage came back as a current result, or a 2025–2026 dated page or award was found. Treat "live" as *likely live, not loaded in a browser*. Visual details (exact fonts and hex values) come from third-party write-ups and are flagged as such.

---

## 1. Which developer portfolios are widely cited as best-in-class in 2025–2026, and what does each do well?

### Takeaway
The most cited engineer portfolios fall into five types. (1) Quiet "design-engineer" minimalism: Paco Coursey, Lee Robinson, Emil Kowalski, Brittany Chiang. (2) Craft and interaction showcases: Rauno Freiberg, Josh Comeau, Cassie Evans, Jhey Tompkins. (3) Writing-first "gardens": Maggie Appleton, Steph Ango, Linus Lee. (4) AI/ML researcher sites that put substance first: Karpathy, Lilian Weng, Eugene Yan, Chip Huyen, plus explorable-explanation writers Ciechanowski and Sam Rose. (5) Spatial/3D showpieces: Bruno Simon's 2025 WebGPU folio, and Henry Heffernan's viral new-grad 3D site. For an AI/ML engineer whose credibility rests on rigour, the best fit combines types 1, 3 and 4. Types 2 and 5 are better used as small, contained moments of delight.

### Cited Findings

**A. Design-engineer minimalists (closest to a credible engineer look)**

1. **Brittany Chiang — https://brittanychiang.com** (likely live: homepage is a current search result). Described as looking "simplistic at first glance with no imagery and lots of empty space". Its details include a glow that follows the cursor, nav items that highlight as their section scrolls into view, and a "Doctor Who-style time-travel tardis" in the corner that switches to older versions of the site — [WeAreDevelopers, Mar 2025 (via search summary)](https://www.wearedevelopers.com/magazine/561-web-developer-portfolio-inspiration-and-examples-march-2025-561). The older v4 (Gatsby + Styled Components, hosted on Netlify) is MIT-licensed with **8.3k stars**. She asks forks to credit her with a link back and says "plagiarism is bad" — [GitHub bchiang7/v4](https://github.com/bchiang7/v4). Many repos are explicitly clones "based on Brittany Chiang's design" — [GitHub topic search](https://github.com/topics/brittanychiang); [example clone](https://github.com/mws96/mws96.github.io). No public "v5" announcement was found.
2. **Lee Robinson — https://leerob.com** (live: a Dec 2025 essay is at [leerob.com/agents](https://leerob.com/agents)). He moved from leerob.io to leerob.com and refreshed the site in summer 2024, "removing cruft" in favour of simple design and clean typography. He used the **View Transitions API with the Next.js App Router** for page animations — [Lee Robinson, "Summer 2024" (Substack)](https://leerob.substack.com/p/summer-2024). His stated design rule: "constrain yourself. Pick one or two font sizes. Use only a few grays. Add color sparingly" — [Lee Robinson on X](https://x.com/leerob/status/1988358640449867985). His old repo is now a public template, "next-mdx-blog" (Next.js, Tailwind, Vercel; 7.6k stars) — [GitHub leerob/site](https://github.com/leerob/site). He now works at Cursor — [X](https://x.com/leerob/status/1993443958652014888).
3. **Paco Coursey — https://paco.me** (likely live: current search result). A third-party analysis says the site is "strictly monochrome with #3A3A3A text on #FFFFFF", entirely flat with no heavy shadows, and has no main navigation menu. Built with Next.js and CSS Modules — [OpenDesign "Design DNA" (via search summary)](https://opendesign.cc/en/sites/paco); source code at [GitHub pacocoursey/paco](https://github.com/pacocoursey/paco). He is a design engineer at Linear and previously built Vercel's design system, website and dashboard — [designengineer.fyi](https://designengineer.fyi/paco-coursey); [Raycast community story](https://www.raycast.com/community-stories/paco-coursey). He wrote **cmdk** in 2019. Rauno Freiberg adapted it for Vercel's command menu around 2020, and it was rewritten in 2022 with contributions from Shu Ding (MIT, ~13k stars) — [GitHub pacocoursey/cmdk](https://github.com/pacocoursey/cmdk).
4. **Emil Kowalski — https://emilkowal.ski** (live: articles such as [/ui/great-animations](https://emilkowal.ski/ui/great-animations) are indexed). Design engineer on Linear's web team, previously at Vercel. He is known for Sonner (toasts, ~13k stars) and Vaul (drawer, ~8.6k stars) — [search summary of emilkowal.ski / GitHub](https://github.com/emilkowalski). His course platform uses **Inter** for sans and **Commit Mono** for mono — [Emil Kowalski, "How I built my course platform"](https://emilkowal.ski/ui/how-i-built-my-course-platform). His course [animations.dev](https://animations.dev/) has 4 modules and 50+ interactive exercises covering easing, springs, CSS animation, Motion for React and accessible motion. In 2026 he turned his articles into a "design engineering skill" for coding agents — [Emil on X](https://x.com/emilkowalski/status/2033543717890465985).

**B. Craft, interaction and "whimsy" showcases (borrow single techniques, not the whole look)**

5. **Rauno Freiberg — https://rauno.me** (likely live; older version kept at [2022.rauno.me](https://2022.rauno.me/)). The site is built as a desktop operating system: dark UI, a dock, interface sounds, and horizontally scrolling galleries of projects, experiments and photography. Built with Next.js/React — [search summary incl. ui.land / Raycast story](https://ui.land/interviews/rauno-freiberg); [rauno.me/craft](https://rauno.me/craft). He is a Staff Design Engineer at Vercel and wrote the essay "Invisible Details of Interaction Design". He also made *Devouring Details*, an interaction-design manual with 23 chapters and 23 downloadable React components — [LinkedIn](https://www.linkedin.com/posts/rauno_invisible-details-of-interaction-design-activity-7084247753773432832-M6Dh); [yespress](https://yespress.io/rauno-freiberg). One search summary credits a "Portfolio 2025" Awwwards Honorable Mention (1 Sep 2025) to him, but the Awwwards page title is generic, so the attribution is **unconfirmed** — [Awwwards](https://www.awwwards.com/sites/portfolio-2025).
6. **Josh W. Comeau — https://www.joshwcomeau.com** (live). His first blog (2018) used an "explorable explanation" style. He rebuilt it in 2020 in a more traditional blog format — [How I Built My Blog v2](https://www.joshwcomeau.com/blog/how-i-built-my-blog-v2/). A third-party analysis calls the site "dark-mode-first" and "balanc[ing] technical authority with playful personality". In one micro-interaction, icons track the cursor (hearts tilt toward it, eyes slide as if curious) — [Fudge design analysis (via search summary)](https://design.withfudge.com/share/joshwcomeau.com-design); [A Million Little Secrets](https://www.joshwcomeau.com/blog/whimsical-animations/). He sells a course, *Whimsical Animations* — [whimsy.joshwcomeau.com](https://whimsy.joshwcomeau.com/).
7. **Cassie Evans — https://www.cassie.codes** (live: speaking subpages indexed). Built with 11ty and "a ton of SVG". Described as "a treasure trove of delightful little animations". She worked at GreenSock (GSAP) — [CodePen Radio #336](https://blog.codepen.io/2021/10/06/336-cassie-evans/); [cassie.codes/speaking](https://www.cassie.codes/speaking/interactive-web-animation-with-svg/); [The Animated Web](https://theanimatedweb.com/inspiration/cassie-evanss-blog/).
8. **Jhey Tompkins — https://www.jhey.dev** (live: a 2025-dated demo is at [/demos/2025/the-one-who-builds/](https://www.jhey.dev/demos/2025/the-one-who-builds/index.html)). Design engineer at Shopify's Brand Design Studio. He was previously on Google's Chrome CSS/UI DevRel team and a design engineer at Vercel. His site is a home for CSS/UI demos and experiments — [search summary / LinkedIn](https://www.linkedin.com/in/jheytompkins/); [CSS-Tricks author page](https://css-tricks.com/author/jheytompkins/).
9. **Sam Selikoff — https://samselikoff.com** (live: [/projects](https://samselikoff.com/projects) and [/work-journal](https://samselikoff.com/work-journal) are indexed). He runs a public "work journal" alongside his projects. He co-founded Build UI (Oct 2022) with courses on Framer Motion recipes and Radix + Tailwind + Motion — [buildui.com](https://buildui.com/).

**C. Writing-first, editorial, "garden" sites (closest to the candidate's warm-paper editorial look)**

10. **Steph Ango (CEO of Obsidian) — https://stephango.com** (live). He writes in Obsidian; the files are compiled with Jekyll and hosted on Netlify ("File over app"). He created **Flexoki** for this site: an "inky color scheme for prose and code" inspired by "analog inks and warm shades of paper", calibrated for legibility in both light and dark modes. It is MIT-licensed with ports for VS Code, Neovim, Emacs and iTerm2 — [stephango.com/flexoki](https://stephango.com/flexoki); [stephango.com/vault](https://stephango.com/vault).
11. **Maggie Appleton — https://maggieappleton.com** (live; [/garden](https://maggieappleton.com/garden) indexed). A digital garden of visual essays, notes and patterns that shows each idea's growth stage, links densely, and explains with sketches and diagrams — [self.md profile](https://self.md/people/maggie-appleton-digital-garden/). The V3 repo uses Astro + MDX with backlinks, hover-preview tooltips (Tippy.js), CSS masonry grids, webmentions, and videos on Cloudflare R2 (216 stars). She asks people **not to fork it wholesale** — [GitHub maggieappleton.com-V3](https://github.com/MaggieAppleton/maggieappleton.com-V3).
12. **Linus Lee — https://thesephist.com** (likely live: current search result). Writes about languages, interfaces and tools for thought. His project list includes Oak (a language), Torus (a UI framework) and Monocle (a personal search engine) — [GitHub thesephist](https://github.com/thesephist). Search turned up no design-specific analysis.
13. **Rasmus Andersson — https://rsms.me** (live; hosts [rsms.me/inter](https://rsms.me/inter/)). Designer of **Inter** and founder of Playbit; previously at Figma and Spotify. Inter v4.0 added six "Display" designs and is available as a variable font — [Wikipedia: Inter](https://en.wikipedia.org/wiki/Inter_(typeface)); [rsms on X](https://x.com/rsms/status/1726394791427223564).
14. **Anthony Fu — https://antfu.me** (live). Built with Vite, Vue and UnoCSS. Code is MIT; words and images are CC BY-NC-SA 4.0 (1.1k stars) — [GitHub antfu/antfu.me](https://github.com/antfu/antfu.me). His generative-art experiments live at 100.antfu.me. The minimal style has been turned into community themes such as Astro "AntfuStyle" and a Valaxy theme — [search summary](https://antfu.me/); [Astro AntfuStyle demo](https://astro-antfustyle-theme.vercel.app/).
15. **Delba de Oliveira — https://delba.dev** (live). Built with Next.js, React, TypeScript and Tailwind; the repo is 44% TypeScript and 43.3% MDX. She built the Next.js Learn platform and "builds the thing she teaches" — [GitHub delbaoliveira/website](https://github.com/delbaoliveira/website); [yespress](https://yespress.io/delba-de-oliveira).

**D. AI/ML engineers and researchers (most relevant to the candidate's field)**

16. **Andrej Karpathy — https://karpathy.ai** (live; [/blog](https://karpathy.ai/blog/) indexed). One search summary says the site is hand-written HTML/CSS with no framework, analytics or RSS, and that he is "allergic to 500-pound websites". **The exact source of that quote is uncertain**: it may come from [zeke.sikelianos.com/karpathy](https://zeke.sikelianos.com/karpathy/) or a Karpathy bearblog rather than karpathy.ai itself. It is still a widely recognised example of a credibility-through-plainness ML site.
17. **Lilian Weng (Lil'Log) — https://lilianweng.github.io** (live: 2025 post ["Why We Think"](https://lilianweng.github.io/posts/2025-05-01-thinking/)). Long-form surveys that present maths and intuition together with diagrams. Her "LLM Powered Autonomous Agents" post is the canonical survey of agent architectures. She co-founded Thinking Machines Lab — [aiwiki](https://aiwiki.ai/wiki/lilian_weng); [daily.dev source](https://daily.dev/sources/lilianweng).
18. **Eugene Yan — https://eugeneyan.com** (live; [/speaking](https://eugeneyan.com/speaking/) indexed). Over 200 technical essays, working prototypes and open-source resources. The homepage opens with a **first-person bullet list** of what he does (writing on AI products and recsys, prototypes such as AI Reading Club and Obsidian Copilot, teaching) and shows a newsletter count of 11,800+ — [jobroadmaps (via search summary)](https://jobroadmaps.com/portfolios/eugene-yan).
19. **Chip Huyen — https://huyenchip.com**. Listed among the best ML engineer portfolios (MLOps and system design) — [jobroadmaps ML engineer list (via search summary)](https://jobroadmaps.com/portfolios/ml-engineer). No design details were captured.
20. **Bartosz Ciechanowski — https://ciechanow.ski**. Interactive explanations of physical and technical topics (engines, gears, watches, orbital mechanics) using real-time **WebGL animations and simulations** — [Planet Devs](https://www.planetdevs.net/blogs/ciechanowski); [awesome-explanations](https://github.com/BHSPitMonkey/awesome-explanations).
21. **Sam Rose — https://samwho.dev**. Visual, interactive computer-science essays, including an interactive explanation of **LLM quantization** — [Simon Willison, explorables tag](https://simonwillison.net/tags/explorables/); [Overcommitted podcast](https://overcommitted.dev/interactive-computer-science-education-sam-rose-on-visual-learning-developer-teaching/).

**E. Spatial/3D and viral portfolios**

22. **Bruno Simon — https://bruno-simon.com** (live; 2025 rebuild). You drive a physics-based car around a procedurally generated world, discovering content and unlocking achievements. It uses Three.js **TSL**, so the same code renders on **WebGPU with a WebGL fallback**, plus Rapier physics. It supports keyboard, mouse, touch and gamepad, and has commissioned music and sound design. Open-sourced under MIT — [deepwiki folio-2025](https://deepwiki.com/brunosimon/folio-2025); [GitHub brunosimon/folio-2025](https://github.com/brunosimon/folio-2025) (1.9k stars, 930 commits; ETC1S-compressed GLB textures and WebP UI assets; **no accessibility or non-3D fallback is documented**). It reportedly won Awwwards Portfolio Honors (Dec 2025) and Site of the Month (Jan 2026) — [hontran.dev (via search summary)](https://www.hontran.dev/blog/best-award-winning-websites-2026). It had a Hacker News thread in Dec 2025 — [HN 46206531](https://news.ycombinator.com/item?id=46206531).
23. **Henry Heffernan — https://henryheffernan.com**. A **new-grad viral portfolio**: a 3D late-90s computer (Three.js + React) built over about 3 months for his post-graduation job search. You can play DOOM inside it — [Show HN](https://news.ycombinator.com/item?id=31313187); [X announcement](https://x.com/henryheffernan/status/1523634736157315073). It has been widely adapted by others ([three.js forum](https://discourse.threejs.org/t/3d-portfolio-inspired-by-henry-heffernans-portfolio/84457); [example fork](https://github.com/mohammadali-2000/portfolio-website)). He is now reportedly a Senior Design Engineer at Vercel (search summary; unverified).
24. **Andrew McCarthy** (URL not captured). Cited as an original developer portfolio: "project videos over a dark field of tiny symbols that shift in color and shape as you move" — [Colorlib 2026 list (via search summary)](https://colorlib.com/wp/developer-portfolios/).

**F. Template reference (what the median now looks like)**

25. **dillionverma/portfolio (Magic UI)**. Next.js 14, shadcn/ui, Tailwind, Framer Motion and Magic UI. All content lives in one config file (`src/data/resume.tsx`). MIT, ~1.5k stars — [GitHub](https://github.com/dillionverma/portfolio). The Astro theme "Starfolio" (Astro v6) is explicitly inspired by it — [astro.build/themes/starfolio](https://astro.build/themes/details/starfolio/).

### Inferences
- **Shortlist ranked by fit with the candidate's aesthetic and field** (inferred from the findings above):

  | Fit | Site | Steal this |
  |---|---|---|
  | ★★★ | Steph Ango / Flexoki | Warm paper + ink palette built for prose *and* code; one palette for light and dark mode |
  | ★★★ | Lilian Weng, Eugene Yan, Karpathy | Substance-first ML credibility: dated long-form writing, diagrams with maths, a plain fast page |
  | ★★★ | Maggie Appleton | Editorial "garden" structure, visual essays, hover previews, growth-stage labels |
  | ★★★ | Paco Coursey, Lee Robinson | Restraint: one or two type sizes, few grays, no clutter; view transitions as the only motion |
  | ★★☆ | Emil Kowalski, Rauno Freiberg | One or two polished micro-interactions that *show* craft (e.g., an interactive project card) |
  | ★★☆ | Sam Rose, Ciechanowski, Josh Comeau | Interactive explainer embedded in a case study (e.g., a denoising slider or a model-internals diagram) |
  | ★☆☆ | Brittany Chiang | Scrollspy nav and two-column clarity, but the look is so widely cloned it reads as a template |
  | ★☆☆ | Bruno Simon, Henry Heffernan | Shows what memorable looks like, but too costly and off-message for an ML engineer's main site |
- The **Brittany Chiang look is now a recognisable template**: thousands of clones exist and she asks for attribution. Copying its structure closely risks reading as "used a template", the opposite of distinctive.
- The candidate's current style (serif display + Geist + Geist Mono micro-labels on warm paper) already matches the editorial-plus-monospace-metadata pattern that 2026 trend writing describes (see §3). It sits between Steph Ango (warm paper), Maggie Appleton (editorial) and Emil/Paco (restrained craft). That is a strong, credible position; refining it is a better use of effort than pivoting.
- The HUD "mission control" README could carry into the site as one **instrument-panel module**: Geist Mono readouts for metrics such as PSNR/SSIM, latency or GPU hours, with thin rules and tabular numerals, placed on the paper background. This links the two identities without adopting a full terminal or dark-HUD theme.

### Gaps
- No site could be loaded directly (egress proxy). Liveness rests on search indexing and dated subpages, not on HTTP 200 responses or screenshots. Before citing any site in a final report, open it in a browser.
- Exact current fonts and colours for Brittany Chiang, Rauno, Lee Robinson, Josh Comeau and Karpathy could not be confirmed. Third-party "design DNA" pages (OpenDesign, Fudge) were blocked, so only their search snippets were used.
- No public "v5" of brittanychiang.com was found. Whether the current site has replaced v4 entirely could not be confirmed.
- The Awwwards "Portfolio 2025" honorable mention attributed to Rauno is unconfirmed.
- Andrew McCarthy's URL, and details of Chip Huyen's and Linus Lee's site designs, were not captured.
- No reliable 2025–2026 "viral new-grad portfolio" beyond Henry Heffernan (2022, still widely cited) was found. HN "share your personal site" threads exist (e.g., [Jan 2026](https://news.ycombinator.com/item?id=46618714)) but could not be read.

---

## 2. Where can curated references be found (galleries, lists, templates), and how useful is each for an engineer?

### Takeaway
For an engineer whose readability and credibility matter most, the best galleries are the restrained, hand-curated ones (Minimal Gallery, SiteInspire) and the design-engineer directories (designengineer.fyi, ui.land). Awwwards and Godly lean toward heavy-animation agency work, and Bestfolios toward UI/UX designers. Read.cv/Posts.cv no longer exist. GitHub lists show the median portfolio, not the best.

### Cited Findings
- **Awwwards portfolio category.** Pages: https://www.awwwards.com/websites/portfolio/, the winners category https://www.awwwards.com/websites/winner_category_portfolio/, and [Sites of the Year](https://www.awwwards.com/websites/sites_of_the_year/). 2025 Sites of the Year with Developer Awards included agency builds ("Lando Norris" by OFF+BRAND; "Messenger" by abeto) — [search summary of Awwwards / hontran.dev](https://www.hontran.dev/blog/best-award-winning-websites-2026).
- **Godly (godly.website).** Curates "the most visually impressive websites… exceptional animation, creative scroll effects"; adds about 3–5 sites per week; over 1,000 sites including portfolios — [Colorlib / downgraf via search summary](https://www.downgraf.com/inspiration/godly-website-design-inspiration/).
- **Minimal Gallery (minimal.gallery).** Curated by Piet Terheyden since 2013 and updated daily. Focus: "visual hierarchy, whitespace, and content-first layouts" — [minimal.gallery](https://minimal.gallery/); [search summary](https://colorlib.com/wp/showcase-inspiration-sites-web-design/).
- **SiteInspire (siteinspire.com).** Curating since 2010, with 8,000+ sites filterable by Style, Type, Subject and Platform — [search summary](https://colorlib.com/wp/showcase-inspiration-sites-web-design/).
- **Land-book.** Has a portfolio category and search — [land-book.com/?search=portfolio](https://land-book.com/?search=portfolio).
- **Bestfolios.** "Largest curation of best UI/UX designer portfolios, resumes, case studies", in categories UX, graphic, motion, industrial design and UX research. **Designer-oriented** — [w.bestfolios.com](https://w.bestfolios.com/); [Hongkiat](https://www.hongkiat.com/blog/bestfolios-inspiration/).
- **designengineer.fyi.** A directory for design engineers, with "Personal Sites", "Killer Portfolio" and "Pafolios" collections and individual design-engineer profiles (e.g., Paco Coursey, Maxime Heckel) — [designengineer.fyi](https://designengineer.fyi/). **ui.land** publishes interviews with Rauno, Paco and Sam Selikoff — [ui.land/interviews/rauno-freiberg](https://ui.land/interviews/rauno-freiberg). Also: [killerportfolio.com](https://www.killerportfolio.com/by/rauno-freiberg), [landing.love](https://www.landing.love/sites/henryheffernan/), [perfolios](https://perfolios.shwn.design/).
- **emmabostian/developer-portfolios (GitHub).** 2,005 portfolios listed alphabetically, 6,828 commits, unvetted (PR-based). Recent entries often call themselves "AI Engineer" — [GitHub](https://github.com/emmabostian/developer-portfolios). A similar "awesome developer portfolio" page exists — [balavenkatesh3322.github.io](https://balavenkatesh3322.github.io/awesome-developer-porfolio/).
- **Explorable explanations list.** [BHSPitMonkey/awesome-explanations](https://github.com/BHSPitMonkey/awesome-explanations); [Simon Willison's "explorables" tag](https://simonwillison.net/tags/explorables/).
- **Read.cv / Posts.cv: shut down.** Perplexity acquired them. Wind-down began 17 Jan 2025, they went read-only, and all data was gone by **16 May 2025**. Custom domains moved to hello.cv — [Neowin](https://www.neowin.net/news/readcv-announces-acquisition-by-perplexity-as-it-begins-winding-down-operations/); [Read.cv "A new chapter"](https://read.cv/a-new-chapter); [HN](https://news.ycombinator.com/item?id=42742241).
- **Vercel templates.** Portfolio category at [vercel.com/templates/portfolio](https://vercel.com/templates/portfolio), e.g., the "AstroZen" portfolio — [Vercel](https://vercel.com/templates/astro/astrozen).
- **Astro themes.** Starfolio (Astro v6, all content from one typed data file), Astrofolio (MDX + Vercel Analytics), AstroZen, Dante (blog + portfolio collection with **view transitions**). AstroWind is reportedly the most-starred Astro template (5,400+) — [astro.build/themes/starfolio](https://astro.build/themes/details/starfolio/); [astro.build/themes/astrofolio](https://astro.build/themes/details/astrofolio/); [AdminLTE roundup](https://adminlte.io/blog/free-astro-templates/). The same roundup claims "Astro templates have become the dominant choice for static portfolio sites" (secondary-source opinion).

### Inferences
- Use **Minimal Gallery + SiteInspire (filter: personal / portfolio / typographic)** together with designengineer.fyi's "Personal Sites" as the main mood board. Use Awwwards and Godly only to pick out single interaction ideas. Their winners are agency showpieces tuned for jurors, not for hiring managers reading about ML work.
- "Read.cv style" (tidy single-column CV, small sans type, generous whitespace) now survives only as an aesthetic, via templates like dillionverma/portfolio and Starfolio. Because it is so templated, it no longer reads as distinctive.
- Astro (static, content collections, built-in view transitions) suits a writing- and case-study-heavy ML portfolio. This fits with Maggie Appleton's move to Astro.

### Gaps
- None of the gallery sites could be fetched directly. Counts (Godly 1,000+, SiteInspire 8,000+) come from secondary roundups.
- Could not confirm a current URL or status for Tailwind Plus "Spotlight" or a dedicated Godly portfolio filter.
- No reliable source was found for "Posts.cv-style" successors (e.g., whether hello.cv offers profiles).

---

## 3. Which 2026 design trends are relevant, and which help or hurt credibility and performance?

### Takeaway
The trends that help an engineer portfolio are: the editorial serif revival paired with a monospace for metadata, warm "paper" neutrals (with a warm dark mode), and progressively enhanced CSS motion (view transitions, scroll-driven animation). Bento grids and command palettes are fine in small doses. Terminal cosplay, heavy 3D/WebGPU and glassmorphism are overused, costly, or hurt credibility when they become the main way content is presented.

### Cited Findings
- **Serif revival.** 2026 type-trend roundups report serifs "making a strong comeback" with "sharper details, higher contrast, and bolder forms". The common pattern is an expressive serif heading over a neutral sans body. "Premium web experiences" pair "neo-serif headings with data-driven monospace utility fonts for metadata, dates, and buttons". Retina rendering is credited with removing the old readability penalty for serifs — [Envato font trends](https://elements.envato.com/learn/font-trends); [FontAlternatives: comeback of text serifs](https://fontalternatives.com/blog/text-serifs-comeback-2026/); [MadeGoodDesigns](https://madegooddesigns.com/web-typography-trends-2026/) (all secondary/marketing blogs).
- **Warm neutrals.** "Soft, 'unbleached' neutrals are replacing pure white backgrounds" (paper, limestone, sand, warm gray) to reduce eye strain on content-heavy sites. "Warm dark" (near-black with a hint of warmth) is replacing pure #000 — [Kontra agency trends](https://kontra.agency/top-web-design-trends-for-2026/); [Kitbase "warm dark mode"](https://thekitbase.app/blog/warm-dark-mode-saas-design-2026). One source claims a "300% spike" in searches for "website background"; this is **unverified and likely marketing**.
- **Dark mode** is described as a "baseline expectation", maturing into automatic light/dark theming — [Digital Silk](https://www.digitalsilk.com/web-design/web-trends/dark-mode-design-guide/); [Neel Networks](https://www.neelnetworks.com/blog/dark-mode-website-design-guide-2026/).
- **Flexoki** shows a principled warm palette: "inspired by analog inks and warm shades of paper", "calibrated for legibility and perceptual balance across devices and when switching between light and dark modes" — [stephango.com/flexoki](https://stephango.com/flexoki).
- **Bento grids** are described as "the breakout design trend of 2026" and the successor to "empty" minimalism. An "Active Grid" variant has tiles that expand or play video on hover. They are noted to be "quietly winning B2B SaaS homepages" — [Medium (aksamark)](https://medium.com/@aksamark/web-design-trends-2026-why-minimalism-is-evolving-into-bento-grids-16839fd31fb7); [SaaSFrame guide](https://www.saasframe.io/blog/designing-bento-grids-that-actually-work-a-2026-practical-guide); [Pravin Kumar](https://www.pravinkumar.co/blog/bento-grids-b2b-saas-homepage-design-trend-2026) (low-authority sources).
- **Terminal/monospace and cmd+K.** GitHub has many terminal-themed portfolios with boot sequences, "Matrix-rain" backdrops, green-on-black text, typeable shells and ⌘K palettes — [apurvamukherjee/Portfolio](https://github.com/apurvamukherjee/Portfolio); [impreetentious/personal-portfolio](https://github.com/impreetentious/personal-portfolio); [rajrathod-1/portfolio](https://github.com/rajrathod-1/portfolio). There are also ready-made "Terminal-Style Developer Portfolio" templates on Lovable — [Lovable](https://lovable.dev/templates/websites/portfolio/terminal-developer-portfolio-website-template). The well-made command-menu primitive is cmdk — [GitHub pacocoursey/cmdk](https://github.com/pacocoursey/cmdk).
- **View Transitions.** Same-document transitions became **Baseline Newly Available on 14 Oct 2025** when Firefox 144 shipped them (Chrome 111, Safari 18). Cross-document `@view-transition` works in Chrome/Edge 126+ and Safari 18.2+. **Firefox stable does not support cross-document transitions yet**; it falls back to a normal navigation — [CSS-Tricks](https://css-tricks.com/cross-document-view-transitions-part-1/); [brainstormsandraves](https://brainstormsandraves.com/css/view-transitions-2026/); [testmuai](https://www.testmuai.com/learning-hub/cross-document-view-transitions-browser-support/). View transitions are an **Interop 2026** focus area (same-document improvements plus cross-document) — [web.dev Interop 2026](https://web.dev/blog/interop-2026); [WebKit](https://webkit.org/blog/17818/announcing-interop-2026/).
- **Scroll-driven animations** (`animation-timeline`, `scroll()`/`view()`). Chrome/Edge 115+ (Jul 2023) and **Safari 26.0 (Sep 2025)**; threaded in Safari 26.4. In **Firefox 152 (June 2026)** they are still behind a flag in stable. They are an Interop 2026 priority. Global support is about 82.6% (caniuse figure quoted in a 2026 article). Recommended: wrap in `@supports (animation-timeline: scroll())` with a visible fallback — [WebKit guide](https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/); [buildmvpfast 2026](https://www.buildmvpfast.com/blog/css-scroll-driven-animations-replace-js-2026); [Interop 2026 (Igalia)](https://www.igalia.com/news/interop-2026.html).
- **3D/WebGPU.** Three.js's TSL lets one codebase render with WebGPU and fall back to WebGL — [deepwiki folio-2025](https://deepwiki.com/brunosimon/folio-2025). Costs: heavy 3D "can exclude people with a modest device or slow connection" and hurt load speed and SEO. Mobile GPUs compile shaders slowly. Recommended fallbacks: lightweight mobile, reduced motion, no WebGL, with critical content available without the enhancement — [utsubo WebGL SEO guide](https://www.utsubo.com/blog/webgl-three-js-site-seo-rankable-guide); [Elite Web Technologies](https://www.elitewebtechnologies.com/visual-storytelling-integrating-interactive-3d-elements-without-sacrificing-performance/). An (older, game-art) Polycount discussion says HR passes over portfolios that take more than 5 seconds to load and shortlists from still images — [Polycount](https://polycount.com/discussion/121375/webgl-and-the-future-of-portfolios) (dated; different industry).
- **Engineer-specific advice** from a 2026 roundup: show "three to six real projects with working GitHub and live links, state your stack clearly — and go live fast" — [Sitesplaced (via search summary)](https://sitesplaced.com/best-portfolio-website-for-software-engineers).

### Inferences
- **Verdict table** (inference, based on the findings above):

  | Trend | Credibility | Performance | Recommendation for this candidate |
  |---|---|---|---|
  | Editorial serif + sans + mono metadata | ↑ (reads as considered, literate) | Neutral if subset/variable | **Keep**; it is the core of the current identity |
  | Warm paper neutrals + warm dark mode | ↑ | Neutral | **Keep**; add a warm-dark theme that is designed, not just inverted |
  | Bento grid | Neutral (risks SaaS-template look) | Neutral | One bento "at a glance" block at most (e.g., stack / metrics / now) |
  | Monospace micro-labels, HUD readouts | ↑ if restrained | Neutral | **Keep**; turn the README's mission-control idea into one data module |
  | Full terminal / boot sequence / Matrix rain | ↓ (common trope, gimmicky, slows access) | ↓ | **Avoid** |
  | ⌘K command palette | Neutral to ↑ for engineers | Small JS cost | Optional extra; never the only way to navigate |
  | View transitions (same-document; cross-document in Chrome/Safari) | ↑ (polish) | Cheap, native | **Use** as progressive enhancement |
  | CSS scroll-driven animation | Neutral | Cheap (off main thread) | Small reveals or progress indicators only, behind `@supports` and reduced-motion |
  | Full-page 3D / WebGPU | ↓ for ML hiring unless 3D *is* the work | ↓↓ (LCP, INP, mobile GPU) | **Avoid** site-wide; a contained demo inside a case study is fine |
  | Glassmorphism / heavy blur | ↓ (dated, contrast risk) | ↓ (blur cost) | Avoid |
- For an AI/ML engineer, the clearest signal of competence is **legible evidence**: metrics, diagrams, papers, code and demos. Showmanship that delays it works against the candidate. The Karpathy, Weng and Yan examples show that top ML credibility comes from plain pages.

### Gaps
- No primary trend reports were captured from Figma, Webflow or Smashing Magazine (the search returned mainly marketing blogs). Treat trend claims as directional.
- No hard data was found on recruiter dwell time or on how 3D portfolios affect hiring outcomes in software/ML. The Polycount evidence is old and from game art.
- Could not confirm whether cmd+K palettes measurably help portfolio visitors.

---

## 4. Which typography pairings are popular in 2026, and what are the licensing terms for free use?

### Takeaway
The candidate's stack (Source Serif 4 + Geist + Geist Mono) is entirely OFL-licensed, modern and on-trend, so there is no licensing reason to change it. Free alternatives in the same spirit: Newsreader, Fraunces or Instrument Serif for display; Inter for sans; JetBrains Mono, IBM Plex Mono or Commit Mono for mono. Berkeley Mono and Söhne are paid; Söhne has no free tier, and Inter or Geist are the usual free substitutes.

### Cited Findings
- **Geist** (Vercel): SIL OFL 1.1. Three families: **Geist Sans**, **Geist Mono**, and **Geist Pixel** (five stylistic variants). Variable fonts are available — [GitHub vercel/geist-font](https://github.com/vercel/geist-font).
- **Source Serif 4** (Frank Grießhammer, Adobe): SIL OFL. Variable font with an **optical-size axis (8–60)** and **weight (200–900)**. Version 4.004 added optical sizes (12 → 60 styles) — [Wikipedia: Source Serif](https://en.wikipedia.org/wiki/Source_Serif); [csstypestudio specimen](https://www.csstypestudio.com/library/font/source-serif-4); [GitHub release 4.004](https://github.com/adobe-fonts/source-serif/releases/tag/4.004R).
- **Instrument Serif** (Rodrigo Fuenzalida, 2022): an editorial *display* serif under SIL OFL 1.1, on Google Fonts — [GitHub Instrument/instrument-serif](https://github.com/Instrument/instrument-serif); [google/fonts issue](https://github.com/google/fonts/issues/5915).
- **Newsreader** (Production Type; 14 styles; aimed at "long-form publishing, digital magazines") and **Fraunces** (Undercase Type; 18 styles) are both on Google Fonts — [Jukebox Google Fonts roundup](https://www.jukeboxprint.com/blog/google-fonts). The OFL lets fonts be used, modified, bundled and embedded freely, as long as the fonts are not sold on their own — [Wikipedia (OFL description, via search)](https://en.wikipedia.org/wiki/Open_Sans).
- **Inter** (Rasmus Andersson): free and open-source, 140+ languages, variable. v4.0 added Display designs — [Wikipedia: Inter](https://en.wikipedia.org/wiki/Inter_(typeface)).
- **JetBrains Mono**: SIL OFL 1.1, free for commercial use — [jetbrains.com/lp/mono](https://www.jetbrains.com/lp/mono/). **IBM Plex** (incl. Plex Mono): SIL OFL — [Font Squirrel license](https://www.fontsquirrel.com/license/ibm-plex); [Wikipedia](https://en.wikipedia.org/wiki/IBM_Plex).
- **Commit Mono** is Emil Kowalski's mono choice (with Inter) — [emilkowal.ski](https://emilkowal.ski/ui/how-i-built-my-course-platform).
- **Berkeley Mono** (U.S. Graphics Company): commercial. Developer license **$75** one-time (no app embedding or redistribution); web-font add-on **$45** at that tier; Indie **$225**; Standard Business **$845** — [usgraphics FX-102](https://usgraphics.com/catalog/FX-102); [FX-202](https://usgraphics.com/catalog/FX-202); [FX-600](https://usgraphics.com/catalog/FX-600) (prices from search summary; confirm at purchase).
- **Söhne** (Klim): not on Google Fonts, Adobe Fonts or any CDN, with no free tier. Licences are sold separately for desktop, web and app. The usual free alternatives are Inter ("closest overall match"), Geist ("developer-native pick") and Hanken Grotesk — [FontAlternatives: Söhne](https://fontalternatives.com/alternatives/sohne/).
- **Font performance.** `font-display: optional` avoids swap-related layout shift; `swap` helps LCP but can cause CLS unless fallback metrics are matched with `size-adjust` / `ascent-override`. A Latin-only subset of Inter drops from ~100 KB to ~30 KB. One variable file covering weights 100–900 is ~330 KB WOFF2, versus 700–900 KB for nine static weights — [OpenReplay](https://blog.openreplay.com/modern-font-loading-strategies/); [Industrial Empathy](https://www.industrialempathy.com/posts/high-performance-web-font-loading/); [web.dev font best practices](https://web.dev/articles/font-best-practices).

### Inferences
- **Three pairing options for a distinctive but credible look** (all free, all OFL):
  1. *Refine the current stack:* Source Serif 4 display (use the `opsz` axis: high optical size for headlines, low for captions) + Geist body + Geist Mono micro-labels with tabular numerals. Lowest risk; already matches the "serif + mono metadata" pattern in the trend pieces.
  2. *More editorial:* Newsreader (headings and long-form body) + Inter (UI) + JetBrains Mono (labels and code). Reads like a technical magazine, a good fit for Lilian-Weng-style deep dives.
  3. *More expressive display:* Instrument Serif for the hero and section titles only (it is a display face) + Geist + Geist Mono. Gives a sharper 2026 look but needs a second serif or a sans for body text.
- Avoid paying for Berkeley Mono just for its look. Geist Mono, JetBrains Mono and Commit Mono cover the same terminal/HUD feel for free. If the HUD README already uses a particular mono, using the same face on the site ties the two identities together.
- Load at most about three families. Prefer variable files, subset to Latin, preload the one or two faces needed above the fold, and match fallback metrics so the serif hero headline does not shift layout (CLS).

### Gaps
- Inter's exact licence (OFL 1.1) and Commit Mono's licence were not confirmed from a primary source in this session.
- Geist Pixel's release date and the current Geist version were not captured.
- No reliable usage statistics were found (e.g., Google Fonts analytics for Instrument Serif or Newsreader in 2026). "Popular in 2026" rests on trend articles and the exemplar sites.

---

## 5. What motion and micro-interaction guidance applies (reduced motion, budgets, Motion, GSAP, scroll-driven CSS, View Transitions)?

### Takeaway
Use CSS first: native View Transitions for page changes, scroll-driven CSS for small reveals behind `@supports`, and Motion or GSAP only where you need physics or orchestration. Both libraries are now free. Every motion should have a reduced-motion alternative (fade or colour instead of movement), and none should block reading or interaction.

### Cited Findings
- **GSAP is fully free.** Webflow acquired GSAP in Oct 2024. On **30 Apr 2025** GSAP became 100% free including commercial use and all former Club plugins (SplitText, MorphSVG, etc.), now in the main npm package (v3.13) — [CSS-Tricks](https://css-tricks.com/gsap-is-now-completely-free-even-for-commercial-use/); [GSAP 3.13 release](https://gsap.com/blog/3-13/); [Webflow forum](https://discourse.webflow.com/t/webflow-makes-gsap-100-free/319967).
- **Motion (formerly Framer Motion)** is independent and renamed. Package `motion`, React import `motion/react`, with new vanilla JS APIs beyond React. It had ~4.5M weekly npm downloads at announcement — [motion.dev announcement](https://motion.dev/magazine/framer-motion-is-now-independent-introducing-motion).
- **View Transitions** support is described in §3 (same-document Baseline Oct 2025; cross-document in Chrome 126+/Safari 18.2+, not Firefox stable). Lee Robinson's site uses view transitions as its main motion — [Lee Robinson](https://leerob.substack.com/p/summer-2024). The Astro theme "Dante" ships view transitions — [AdminLTE](https://adminlte.io/blog/free-astro-templates/).
- **Scroll-driven CSS** support is described in §3 (Chrome 115+, Safari 26+, Firefox flagged). Use `@supports` with a fallback — [buildmvpfast](https://www.buildmvpfast.com/blog/css-scroll-driven-animations-replace-js-2026).
- **Reduced motion.** WCAG 2.3.3 *Animation from Interactions* (AAA) requires that motion triggered by interaction can be disabled unless it is essential. `@media (prefers-reduced-motion: reduce)` honours the OS setting. Best practice is to **replace** motion with opacity or colour changes rather than remove feedback, to keep essential indicators (spinners, progress), and to make JS libraries (GSAP, Motion, Lottie) check the preference too. Autoplaying video, looping GIFs and continuous motion still need pause/stop controls under **2.2.2** — [W3C Understanding 2.3.3](https://w3.org/WAI/WCAG21/Understanding/animation-from-interactions); [OpenReplay](https://blog.openreplay.com/prefers-reduced-motion-accessible-animation/); [Silktide](https://silktide.com/accessibility-guide/the-wcag-standard/2-3/seizures-and-physical-reactions/2-3-3-animation-from-interactions/).
- **Craft references.** Emil Kowalski's course covers "easing, timing, and spring principles" and "designing accessible motion" — [animations.dev](https://animations.dev/); [Great animations](https://emilkowal.ski/ui/great-animations). Rauno's "Invisible Details of Interaction Design" — [LinkedIn](https://www.linkedin.com/posts/rauno_invisible-details-of-interaction-design-activity-7084247753773432832-M6Dh). Josh Comeau's cursor-aware icons — [joshwcomeau.com](https://www.joshwcomeau.com/blog/whimsical-animations/).

### Inferences
- **Suggested motion budget** for this candidate (inference, not a published standard):
  - Zero motion before the hero text renders (no intro or loader animations; these delay LCP and annoy repeat visitors).
  - Animate only `transform` and `opacity`. Keep UI feedback around 150–250 ms and page transitions around 200–350 ms. Use one easing family site-wide.
  - Ship no JS animation library on pages that do not need one. Load Motion or GSAP only on a case-study page with an interactive demo (dynamic import).
  - One "signature" micro-interaction is enough, in the spirit of Emil/Rauno: for example, the HUD-style metric counter, or a sliding before/after comparison.
- `prefers-reduced-motion` should switch view transitions to cross-fades and disable scroll-linked transforms. Any autoplay demo video needs visible pause controls (2.2.2).
- GSAP being free mainly matters for SVG morphing and text splitting. For a serif-led editorial site, SplitText-style headline animations are the most likely to look "agency" rather than "engineer", so use them sparingly if at all.

### Gaps
- No published, authoritative "motion performance budget" (e.g., a ms or KB cap for portfolios) was found; the budget above is inferred.
- Could not confirm Motion's current (2026) download numbers or bundle size.

---

## 6. What accessibility baseline (WCAG 2.2 AA) and Core Web Vitals implications follow from these design choices?

### Takeaway
WCAG 2.2 AA adds checks the candidate's style touches directly: 24×24 px minimum targets for small text links and icon buttons, and focus that sticky headers do not hide. Muted gray micro-labels on warm paper are the main contrast risk. Core Web Vitals thresholds are LCP ≤ 2.5 s, INP ≤ 200 ms and CLS ≤ 0.1 at the 75th percentile. The usual design-driven failures are web-font swaps (CLS), hero images or 3D (LCP), and heavy JS animation (INP).

### Cited Findings
- **WCAG 2.2 new AA criteria.** **2.4.11 Focus Not Obscured (Minimum):** a focused component must not be entirely hidden by author content such as sticky headers, cookie banners or chat widgets; partial overlap passes at AA. **2.5.8 Target Size (Minimum):** pointer targets at least **24×24 CSS px**, with exceptions for spacing (24 px offset), an equivalent control, inline links within text, and user-agent controls — [Deque](https://dequeuniversity.com/resources/wcag-2.2/); [Vispero](https://vispero.com/resources/new-success-criteria-in-wcag22/); [wcagpatterns](https://wcagpatterns.com/guides/wcag-2-2).
- **Contrast.** **1.4.3** text at least **4.5:1**, or 3:1 for large text (≥24 px, or ≥18.66 px bold). **1.4.11** UI components and graphics (icons, chart marks, input borders, focus indicators) at least **3:1** against adjacent colours. Focus indicators fall under 1.4.11 and **2.4.7** — [WebAIM](https://webaim.org/articles/contrast/); [makethingsaccessible](https://www.makethingsaccessible.com/guides/contrast-requirements-for-wcag-2-2-level-aa/); [TabNav](https://tabnav.com/academy/wcag/success-criterion-1.4.11).
- **Motion criteria** (2.3.3 AAA, 2.2.2 A) are covered in §5.
- **Core Web Vitals.** LCP good ≤ 2.5 s (poor > 4 s); INP good ≤ 200 ms (poor > 500 ms); CLS good ≤ 0.1 (poor > 0.25). Assessed at the **75th percentile** of real-user data — [corewebvitals.io](https://www.corewebvitals.io/core-web-vitals); [web.dev vitals](https://web.dev/articles/vitals).
- **Fonts and CWV.** Hero text can be the LCP element. Fallback-to-webfont swaps cause CLS unless metrics are matched (`size-adjust`, `ascent-override`) or `font-display: optional` is used — [OpenReplay](https://blog.openreplay.com/modern-font-loading-strategies/); [web.dev](https://web.dev/articles/font-best-practices).
- **3D and CWV.** Heavy WebGL hurts loading speed and SEO and excludes low-end devices; mobile shader compilation adds delay before the page feels usable — [utsubo](https://www.utsubo.com/blog/webgl-three-js-site-seo-rankable-guide).
- **Contrast checks on example colours** (computed locally with the WCAG 2.x relative-luminance formula; the colours are *examples*, not the candidate's actual tokens):

  | Foreground | on #FAF8F3 (paper) | on #FFFCF0 (light cream) | on #F5F1E8 (cream) |
  |---|---|---|---|
  | Navy #1E2A4A | 13.32:1 ✅ | 13.76:1 ✅ | 12.54:1 ✅ |
  | Navy #23395B | 10.94:1 ✅ | 11.30:1 ✅ | 10.31:1 ✅ |
  | Ink #1C1B1A | 16.20:1 ✅ | 16.73:1 ✅ | 15.26:1 ✅ |
  | Gray #6B6B6B | 5.02:1 ✅ | 5.19:1 ✅ | 4.73:1 ✅ (barely) |
  | Warm gray #6F6A60 | 5.06:1 ✅ | 5.23:1 ✅ | 4.77:1 ✅ (barely) |
  | Gray #8A8A8A | 3.25:1 ❌ text / ✅ non-text | 3.36:1 ❌ / ✅ | 3.06:1 ❌ / ✅ |
  | Warm gray #9A968E | 2.78:1 ❌ | 2.87:1 ❌ | 2.61:1 ❌ |

  (Calculation performed in this session; formula per WCAG 1.4.3 as described by [WebAIM](https://webaim.org/articles/contrast/).)

### Inferences
- **Micro-labels are the main a11y risk in the current style.** Small uppercase letter-spaced Geist Mono labels are usually set at 10–12 px in a light gray. At that size they count as normal text and need **≥ 4.5:1**, so nothing lighter than roughly #6F6A60 on a warm paper background. Decorative hairlines and dividers only need 3:1 when they convey meaning.
- The deep navy accent has plenty of contrast for text and links on paper. Links in body text should still be underlined (or otherwise not identified by colour alone), and the focus ring should be a 2 px navy outline with offset, which gives ≥ 3:1 against paper.
- Small mono nav links and icon buttons (GitHub, LinkedIn, theme toggle, ⌘K trigger) must meet **24×24 px** or have enough spacing. A sticky top bar needs `scroll-padding-top` so focused anchors are not hidden (2.4.11).
- The CWV plan follows from the style: a static or SSG page (Astro or Next static), a text hero (the serif headline is the LCP element, so preload that one font file), matched fallback metrics (CLS), no JS on the home page beyond the theme toggle (INP), and lazy-loaded case-study media.
- **Dark mode must be checked separately.** Warm-dark backgrounds with a navy accent will likely *fail*, because navy on near-black has low contrast. The dark theme needs a lighter accent (e.g., a pale blue) rather than the same navy.

### Gaps
- The candidate's actual hex tokens were not available, so the contrast table uses illustrative values.
- No field (CrUX) data was gathered for any exemplar site (direct access blocked), so there are no measured CWV comparisons between minimal and 3D portfolios.

---

## 7. How should projects be presented visually (case studies, interactive diagrams, before/after sliders, demo videos, device frames, metric callouts)?

### Takeaway
The strongest engineer and ML references present projects as **evidence**: a short case study with the problem, approach and diagram, measured results as metric callouts, and an interactive or visual proof. For image denoising, an accessible before/after slider fits naturally. Explorable-explanation writers (Ciechanowski, Sam Rose, Josh Comeau) and ML writers (Lilian Weng) show how deep this can go. Keep 3–6 projects, each with live and GitHub links.

### Cited Findings
- **Project count and links.** "The best portfolio website for a software engineer shows three to six real projects with working GitHub and live links, states your stack clearly" — [Sitesplaced (via search summary)](https://sitesplaced.com/best-portfolio-website-for-software-engineers).
- **Before/after sliders.** `img-comparison-slider` is a framework-agnostic web component (React, Vue and Angular wrappers) with arrow-key and Home/End keyboard support, touch-friendly — [img-comparison-slider.sneas.io](https://img-comparison-slider.sneas.io/); [CSSScript](https://www.cssscript.com/before-after-image-comparison-slider-component/). CodyHouse's "Accessible Image Comparison Slider" lets keyboard users resize the modified image with arrow keys once the handle has focus — [CodyHouse](https://codyhouse.co/ds/components/info/accessible-img-compare-slider). Sliders built on a native `<input type="range">` get arrow, Home and End keys for free — [jsdev.space React guide](https://jsdev.space/react-before-after-slider/); [react-comparison-slider](https://github.com/mattrothenberg/react-comparison-slider).
- **Interactive diagrams and explorables.** Ciechanowski embeds real-time WebGL simulations in articles — [Planet Devs](https://www.planetdevs.net/blogs/ciechanowski). Sam Rose made an interactive LLM-quantization essay — [Simon Willison](https://simonwillison.net/tags/explorables/). Josh Comeau's blog began as "explorable explanations" — [joshwcomeau.com](https://www.joshwcomeau.com/blog/how-i-built-my-blog-v2/). There is a curated list of explorables — [awesome-explanations](https://github.com/BHSPitMonkey/awesome-explanations).
- **ML-specific presentation.** Lilian Weng presents "the mathematics and intuition together with diagrams", with references to papers — [aiwiki](https://aiwiki.ai/wiki/lilian_weng). Eugene Yan's homepage leads with first-person bullets naming prototypes, writing and teaching — [jobroadmaps](https://jobroadmaps.com/portfolios/eugene-yan).
- **Visual essays and hover previews.** Maggie Appleton uses sketches and diagrams, tooltip previews (Tippy.js) and masonry grids, with videos on Cloudflare R2 — [GitHub V3](https://github.com/MaggieAppleton/maggieappleton.com-V3).
- **Demo videos.** Andrew McCarthy's portfolio shows "project videos over a dark field of tiny symbols" — [Colorlib (via search summary)](https://colorlib.com/wp/developer-portfolios/). Autoplaying or looping video needs pause controls (WCAG 2.2.2) — [OpenReplay](https://blog.openreplay.com/prefers-reduced-motion-accessible-animation/).
- **Metric and social-proof callouts.** Design-engineer sites present open-source projects by name and impact (e.g., Sonner ~13k stars, Vaul ~8.6k stars, as summarised for Emil Kowalski's site) — [emilkowal.ski](https://emilkowal.ski/). Bento grids are recommended for case-study pages that "need flexible containers for different media types" — [SaaSFrame](https://www.saasframe.io/blog/designing-bento-grids-that-actually-work-a-2026-practical-guide).
- **Public work logs.** Sam Selikoff keeps a public "work journal" — [samselikoff.com/work-journal](https://samselikoff.com/work-journal). Maggie Appleton labels the maturity of her notes — [self.md](https://self.md/people/maggie-appleton-digital-garden/).

### Inferences
- **Recommended case-study template** for an ML/image-denoising engineer (inference):
  1. A title and one-sentence outcome in the serif.
  2. A Geist Mono "spec strip" of uppercase micro-labels: ROLE · STACK · DATA · COMPUTE · YEAR.
  3. A **metric callout row** showing tabular figures such as PSNR/SSIM gain, latency, parameter count and dataset size, each with its baseline. This is the natural home for the HUD aesthetic.
  4. An **accessible before/after slider** on real noisy and denoised crops, with a zoom inset, alt text describing what changed, and a native-range or keyboard-operable handle.
  5. An architecture diagram as inline SVG with figure captions in the editorial style (Lilian Weng / Distill tradition).
  6. A short "what didn't work" section to show judgement.
  7. Links to code, paper or write-up, and the live demo.
- Show screenshots plainly with a thin border and caption rather than in glossy device mockups. Device frames suit product designers; for ML work, captioned figures read as more rigorous. (Inference; no source was found either way.)
- For demo videos, use muted, short (under 20 s) clips with `preload="none"`, a poster image, visible controls, and no autoplay when reduced motion is set.
- A "garden"/notes section with dated entries (Appleton, Selikoff, Yan) is a cheap, credible way to show ongoing work between major projects.

### Gaps
- No authoritative source was found comparing device frames with plain screenshots for engineer portfolios.
- No first-hand screenshots of the case-study pages on Emil, Rauno or Paco's sites were possible, so their exact project-page layouts are not described.
- No data was found on recruiter preferences for case-study length or format specific to ML engineers.
