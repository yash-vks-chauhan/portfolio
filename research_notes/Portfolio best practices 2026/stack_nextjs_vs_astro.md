# Stack choice for a content-heavy personal portfolio (Oct 2026): Next.js vs Astro (plus SvelteKit, Nuxt, Hugo, Eleventy)

Research date: 2026-10-03. Methodology note for the report writer: in this session WebFetch was blocked by the egress proxy for nextjs.org, astro.build, vercel.com, infoq.com, thenewstack.io, businesswire.com, alexbobes.com, developersdigest.tech and the HTTP Archive API. Findings therefore come from (a) **npm registry metadata pulled directly** (primary, authoritative for versions, dates and dependencies) and (b) **web-search result snippets** (secondary; treat them as summaries of the linked pages, not verified full reads). Wherever a claim rests only on a search snippet from an aggregator or vendor blog, that is flagged.

## 1. Current state as of October 2026: versions, features, ownership

### Takeaway
As of 2026-10-03 the stable versions are **Next.js 16.3.8** (16.x line since Oct 2025, no v17 yet) and **Astro 7.3.5** (Astro has shipped **two majors in 2026**: 6.0 in March and 7.0 in June). Cloudflare acquired the company behind Astro in January 2026; Astro stays MIT-licensed and deploy-anywhere. Next.js made its multi-host Adapter API stable in 16.2 (March 2026). Astro 7's new Rust Markdown pipeline is the biggest change for an MDX- and KaTeX-heavy site, because it does not run remark/rehype plugins.

### Cited Findings

**Next.js versions and dates (npm registry, retrieved 2026-10-03)**
- `next` latest = **16.3.8** (published 2026-09-30); `canary` = 16.4.0-canary.58; `backport` = 15.5.27. Minor release dates: 16.0.0 on 2025-10-22, 16.1.0 on 2025-12-18, 16.2.0 on 2026-03-18, 16.3.0 on 2026-08-03. There is **no Next.js 17** on npm. — [npm registry: next](https://registry.npmjs.org/next)
- `next@16.3.8` requires Node `>=20.9.0` and has a peer dependency on React `^18.2.0 || ^19.0.0` (also lists `babel-plugin-react-compiler` as an optional peer). — [npm registry: next@16.3.8](https://registry.npmjs.org/next/16.3.8)
- `@next/mdx` latest = 16.3.8 (2026-09-30), versioned in lockstep with Next. — [npm registry: @next/mdx](https://registry.npmjs.org/@next/mdx)
- React latest = **19.3.0** (2026-09-09); 19.2.0 shipped 2025-10-01. — [npm registry: react](https://registry.npmjs.org/react)

**Next.js 16.x features relevant to a content site**
- Next.js 16 (Oct 2025) shipped with Turbopack as the default bundler, a new caching model, React 19.2 and DevTools upgrades. — [AlternativeTo news, Oct 2025](https://alternativeto.net/news/2025/10/next-js-16-launches-with-turbopack-new-caching-model-react-19-2-and-devtools-upgrades)
- Cache Components in Next.js 16 is described as "Partial Prerendering (PPR) made stable, plus a new `use cache` directive that replaces the old `unstable_cache`". It lets one route mix static HTML, cached data and per-request dynamic content. — [DEV Community, Next.js 16 Cache Components](https://dev.to/thekitbase/nextjs-16-cache-components-use-cache-ppr-and-when-to-reach-for-each-503e) (secondary)
- Turbopack is the default bundler for both dev and production builds. The claim is "2 to 5 times faster production builds". Custom MDX loaders had to be rewritten for Turbopack's native MDX handling. — [Nandann, Next.js 16.2 guide](https://www.nandann.com/blog/nextjs-16-2-complete-guide) (secondary agency blog; this snippet appears to mix up 16.0 and 16.2 changes)
- 16.2 Turbopack additions: Server Fast Refresh, Web Worker Origin (for WASM in workers), Subresource Integrity for JS, and tree-shaking of dynamic imports. — [Nandann, Next.js 16.2 guide](https://www.nandann.com/blog/nextjs-16-2-complete-guide) (secondary)
- **Next.js 16.2 introduced a stable Adapter API**, built with Netlify, Cloudflare, OpenNext, AWS and Google Cloud. — [Next.js on X](https://x.com/nextjs/status/2037186404116291603); [Cloudflare Developers on X](https://x.com/CloudflareDev/status/2037203807227052435); related post: [Next.js Across Platforms: Adapters, OpenNext, and Our Commitments](https://nextjs.org/blog/nextjs-across-platforms)
- Next.js 16.3 went stable on **2026-08-03** with "Instant Navigations" (SPA-like responsiveness tools), up to 90% less dev-server RAM in long sessions, build artifact caching for repeat builds, optional TypeScript 7 type-checking in `next build`, a Navigation Inspector devtool, and experimental options including a Rust-based React Compiler and `import.meta.glob` support in Turbopack. — [Next.js 16.3 blog (via search snippet)](https://nextjs.org/blog/next-16-3); [Turbopack: What's New in Next.js 16.3](https://nextjs.org/blog/next-16-3-turbopack); [Roboto Studio explainer](https://robotostudio.com/blog/nextjs-16-3-for-dummies)

**Astro versions and dates (npm registry, retrieved 2026-10-03)**
- `astro` latest = **7.3.5** (2026-09-24); `beta` = 7.4.0-beta.1; `legacy` = 4.16.19. Major and minor dates: 5.0.0 on 2024-12-03 … 5.18.0 on 2026-02-25; **6.0.0 on 2026-03-10**, 6.1 on 2026-03-26, 6.2 on 2026-04-30, 6.3 on 2026-05-07, 6.4 on 2026-05-28; **7.0.0 on 2026-06-22**, 7.1 on 2026-07-16, 7.2 on 2026-08-06, 7.3 on 2026-09-03. — [npm registry: astro](https://registry.npmjs.org/astro)
- `astro@7.3.5` requires Node `>=22.12.0`. Its dependencies include `vite ^8.0.13`, `shiki ^4.0.2`, `@astrojs/compiler-rs ^0.5.0` (the Rust compiler) and `@astrojs/markdown-satteri 0.4.2`, with `@astrojs/markdown-remark ^7.3.0` as a peer (the opt-in unified/remark pipeline). — [npm registry: astro@7.3.5](https://registry.npmjs.org/astro/7.3.5)
- `@astrojs/mdx` latest = 8.0.2 (2026-09-22). It went through **four majors in 2026**: 5.0 (2026-03-10), 6.0 (2026-05-28), 7.0 (2026-06-22), 8.0 (2026-08-31). It depends on `@astrojs/markdown-satteri` and lists `@astrojs/markdown-remark` as a peer. — [npm registry: @astrojs/mdx](https://registry.npmjs.org/@astrojs/mdx)
- `@astrojs/react` latest = 7.0.0 (2026-09-22). Majors in 2026: 5.0 (Mar 10), 6.0 (Jun 22), 7.0 (Sep 22). Its peer dependency is React `^17 || ^18 || ^19`, and it uses `@vitejs/plugin-react ^6.1.1` with `oxc-transform-react`. — [npm registry: @astrojs/react](https://registry.npmjs.org/@astrojs/react)

**Astro 6 (released 2026-03-10)**
- Astro 6 added a built-in **Fonts API**, a **Content Security Policy API** and **Live Content Collections** (fetched at request time through the unified content layer). A new `astro dev` built on Vite's Environment API runs the production runtime (for example, workerd for Cloudflare) in development. It requires **Node 22** (drops Node 18 and 20). — [AlternativeTo, Mar 2026](https://alternativeto.net/news/2026/3/astro-6-0-brings-new-astro-dev-built-in-fonts-api-live-content-collections-and-csp-api/); [Astro 6.0 blog (via snippet)](https://astro.build/blog/astro-6/); [InfoQ on the Astro v6 beta and Cloudflare](https://www.infoq.com/news/2026/02/astro-v6-beta-cloudflare)

**Astro 7 (released 2026-06-22)**
- Astro 7 rewrote the `.astro` compiler in Rust and moved Markdown/MDX onto a Rust pipeline. With **Vite 8 + Rolldown**, builds were "15–61% faster" in Astro's benchmarks. It adds **Advanced Routing** (a `src/fetch.ts` entrypoint that controls the request pipeline), makes **route caching stable** with experimental CDN cache providers for Netlify, Vercel and Cloudflare, and adds coding-agent detection with structured JSON logs. — [AlternativeTo, Jun 2026](https://alternativeto.net/news/2026/6/astro-7-0-brings-vite-8-performance-boost-advanced-routing-route-caching-and-ai-features/); [InfoQ, Aug 2026](https://www.infoq.com/news/2026/08/astro-7-release-speed/); [Astro 7.0 blog (via snippet)](https://astro.build/blog/astro-7/)
- The new Markdown engine is **Sätteri**, built by core team member Erika on pulldown-cmark (CommonMark) and Oxc (MDX expressions). **"Sätteri does not run remark or rehype plugins."** The docs say: "Existing remark/rehype plugins won't run unmodified… No direct adaptation path exists." The unified pipeline is **still available via `@astrojs/markdown-remark`**. — [Toru Iwasa, "Is Sätteri worth adopting?"](https://toruiwasa.com/blog/is-satteri-worth-adopting-astro-7s-rust-markdown-engine/); [byteiota, "What actually breaks"](https://byteiota.com/astro-7-rust-compiler-vite-8/)
- A community project ports remark/rehype plugins to Sätteri, including KaTeX math. — [GitHub: satteri-plugins](https://github.com/Ashish-CodeJourney/satteri-plugins)
- A real-world 6→7 migration of a 1,558-post blog kept remark/rehype and hit a middleware gotcha. — [lilting.ch](https://lilting.ch/en/articles/astro-6-to-7-upgrade)

**Ownership and funding**
- **Cloudflare acquired the Astro Technology Company team, announced 2026-01-16.** Astro stays open source (MIT) with open governance and a public roadmap, and stays platform-agnostic across many deployment targets. The team joined Cloudflare as employees. — [Astro blog: "The Astro Technology Company joins Cloudflare"](https://astro.build/blog/joining-cloudflare/); [Business Wire press release, 2026-01-16](https://secure.businesswire.com/news/home/20260116386991/en/Cloudflare-Acquires-Astro-to-Accelerate-the-Future-of-High-Performance-Web-Development); [The New Stack](https://thenewstack.io/cloudflare-acquires-team-behind-open-source-framework-astro/); [HN discussion](https://news.ycombinator.com/item?id=46646645)
- Astro users cited in coverage include IKEA, Unilever, Visa and OpenAI. Rationale: Cloudflare gains a content-focused framework, and Astro gains stable funding and can drop its monetization experiments. — [search summary of the above sources](https://thenewstack.io/cloudflare-acquires-team-behind-open-source-framework-astro/)

**Vercel's direction**
- Vercel publishes its own "Next.js vs. Astro in 2026" comparison page. It could not be fetched; read it as a vendor document. — [Vercel](https://vercel.com/i/astro-vs-next-js)
- Vercel and the Next.js team have publicly committed to running Next.js well on other hosts through the stable Adapter API and the OpenNext working group (see section 5). — [Next.js Across Platforms](https://nextjs.org/blog/nextjs-across-platforms); [OpenNext: 3 years](https://opennext.js.org/news/2026-03-25-3-years-of-opennext)

**Alternatives (brief)**
- **SvelteKit 3.0.0** was released **2026-10-01**, two days before this research. Config moves into `vite.config.ts`, `$lib` becomes `#lib` (Node subpath imports), Svelte 5 is required, and `sv migrate` handles migration. — [npm registry: @sveltejs/kit](https://registry.npmjs.org/@sveltejs/kit); [Svelte blog: SvelteKit 3 is here](https://svelte.dev/blog/sveltekit-3-is-here); [byteiota](https://byteiota.com/sveltekit-3-0-ships-breaking-changes-and-how-to-fix/)
- **Nuxt** latest = 4.5.2 (2026-08-05); 4.0.0 shipped 2025-07-15. — [npm registry: nuxt](https://registry.npmjs.org/nuxt)
- **Eleventy** latest = 3.1.6 (2026-06-02); 3.0.0 shipped 2024-10-01. — [npm registry: @11ty/eleventy](https://registry.npmjs.org/@11ty/eleventy)
- **Hugo**: one aggregator reports Hugo sites at a 66.0% desktop CWV pass rate (methodology unclear; see section 2). — [search summary citing pagespeedmatters](https://www.pagespeedmatters.com/resources/data-studies/static-site-generators-core-web-vitals)

### Inferences
- For this developer, Next.js 16.x is a **stable target** (one major line for 11+ months, minor releases roughly every 2–5 months). Astro is moving faster: two framework majors and four `@astrojs/mdx` majors in about 7 months of 2026. A portfolio on Astro will need more upgrade work if kept on latest, though pinning to a version is easy for a static site.
- The Cloudflare acquisition is net-positive for Astro's survival (it removed funding risk). The thing to watch is whether non-Cloudflare adapters stay first-class. So far the stated commitments and Astro 7's Netlify/Vercel CDN cache providers suggest they will.
- SvelteKit and Nuxt would mean learning a new component model and giving up shadcn/ui (React), with no signaling gain for a React developer. Hugo and Eleventy are excellent for pure content but awkward for React islands such as the slider, the diagram, charts and a command palette. None of the four beats Next.js or Astro for this candidate.

### Gaps
- I could not read the official Next.js 16.1/16.2/16.3 or Astro 6/7 release posts in full (domains blocked), so feature lists come from search snippets and secondary write-ups. Exact details (for example, whether Next.js 16.3 "Instant Navigations" affect static export) were not verified.
- Hugo's current version was not retrieved (it is not on npm).
- No primary source found on Vercel's corporate strategy beyond the adapter commitments.

## 2. Performance: shipped JS, Core Web Vitals, Lighthouse, build times

### Takeaway
Every source agrees that Astro ships far less JavaScript by default and has higher field Core Web Vitals pass rates than Next.js. But the specific CWV percentages in circulation **conflict and mostly come from secondary aggregators with unclear methodology**, and framework-level field data reflects which kinds of sites use each framework more than the framework itself. For a small portfolio, both can reach Lighthouse 95+. Next.js just takes more deliberate effort.

### Cited Findings
- A "2026 study of production sites" reports Astro sites passing combined CWV on mobile **48.0%** of the time vs **31.1%** for Next.js App Router sites. — [search summary of tech-insider.org / alexbobes.com comparisons](https://tech-insider.org/astro-vs-nextjs-vs-nuxt-2026/) (secondary; the underlying study is not named)
- Another source says Astro passes CWV at "roughly **66%** in HTTP Archive production data, among the highest aggregate rates of any framework." — [search summary, alexbobes.com](https://alexbobes.com/programming/astro-vs-nextjs/) (secondary; **conflicts** with the 48% figure above)
- Figures attributed to May 2026 CrUX/HTTP Archive data: mobile CWV pass rates of Gatsby 40.7%, **Next.js 29.3%**, Nuxt 24.9%; desktop pass rates of Hugo 66.0%, Gatsby 58.5%, **Next.js 52.4%**; Astro at "48% mobile good LCP". The same summary says **55.9% of all tracked origins** pass all three CWV (48% mobile, 56% desktop). — [Digital Applied, CWV Benchmarks 2026](https://www.digitalapplied.com/blog/core-web-vitals-benchmarks-2026-pass-rate-reference); [pagespeedmatters SSG study](https://www.pagespeedmatters.com/resources/data-studies/static-site-generators-core-web-vitals) (secondary; one snippet also gives a contradictory "Next.js 58% vs Gatsby 47% on mobile")
- The primary source to check by hand is the HTTP Archive Tech Report comparing Astro, WordPress, Gatsby, Next.js and Nuxt.js. — [HTTP Archive Tech Report](https://httparchive.org/reports/techreport/tech?client=mobile&tech=Astro%2CWordPress%2CGatsby%2CNext.js%2CNuxt.js&geo=ALL&rank=ALL&page=1) (API blocked in this session)
- **Dated (2021) baseline:** Next.js had 28.6% of origins passing CWV on desktop and 15.8% on mobile, vs Gatsby at 37.4% and 21.6%. — [Web Almanac 2021, Jamstack chapter](https://almanac.httparchive.org/en/2021/jamstack) (2021 data, shown for trend only)
- Reported typical ranges: Astro LCP 0.7–1.2s vs Next.js 1.5–2.8s, CLS 0.001–0.02 vs 0.03–0.08, INP <50ms vs 50–200ms, Lighthouse 95–100 vs 80–90. — [search summary of verlua.com / pkgpulse comparisons](https://www.verlua.com/blog/nextjs-vs-astro) (secondary, vendor/agency blogs; not lab-controlled)
- Shipped JS headline: "Astro vs Next.js vs Nuxt: **187KB vs 12KB** JS gap [2026]". — [tech-insider.org](https://tech-insider.org/astro-vs-nextjs-vs-nuxt-2026/) (headline only; methodology not read)
- Build speed: Astro 7 reports **15–61% faster builds** (Rust compiler, Sätteri, Vite 8/Rolldown). — [AlternativeTo](https://alternativeto.net/news/2026/6/astro-7-0-brings-vite-8-performance-boost-advanced-routing-route-caching-and-ai-features/). Next.js reports Turbopack production builds "2 to 5 times faster", and 16.3 adds a persistent build cache for repeat builds. — [Nandann](https://www.nandann.com/blog/nextjs-16-2-complete-guide); [Next.js 16.3](https://nextjs.org/blog/next-16-3)
- Summary view across sources: "Astro's zero-JS-by-default architecture wins on out-of-the-box performance almost every time it's measured, while Next.js and Nuxt require more deliberate optimization work." — [search synthesis of the comparison articles above](https://www.pkgpulse.com/guides/astro-vs-nextjs-2026)

### Inferences
- Framework-level CrUX pass rates are confounded by site type: Next.js powers many heavy, app-like and e-commerce sites, while Astro mostly powers content sites. They should not be read as "your portfolio will score X". For a portfolio of about 15 pages with a few islands, the real difference is the baseline React runtime and router JS that Next.js ships on every page (including pure-text case studies), against Astro's near-zero JS on non-interactive pages.
- In Astro, the interactive pieces (slider, diagram, charts) hydrate only where placed and can be deferred with `client:visible`. In Next.js they are client components inside an app that already hydrates. Either can score 90+ on Lighthouse; Astro gets there with less discipline.
- Build time is irrelevant at portfolio scale (tens of pages) for both frameworks.

### Gaps
- I could not pull HTTP Archive Tech Report numbers directly (API and site blocked). The report writer should treat all CWV percentages above as **unverified secondary figures** and either omit exact numbers or present them as a range with caveats.
- No controlled 2025–2026 benchmark of an identical MDX portfolio built in both frameworks was found from a neutral source.

## 3. DX for MDX case studies: typed frontmatter, Shiki/Expressive Code, KaTeX, React-in-MDX, images

### Takeaway
**Astro has the more integrated content story**: Content Layer/collections with Zod schemas, MDX, Shiki built in, and Expressive Code. But **Astro 7's default Sätteri pipeline does not run remark/rehype plugins**, so a KaTeX + rehype-based setup has to opt back into `@astrojs/markdown-remark` (or use community ports). **Next.js's MDX ecosystem has fragmented**: Contentlayer is dead, `next-mdx-remote` was archived in April 2026, and the maintained choices are `@next/mdx` (Turbopack needs string plugin names), **Velite**, or **content-collections**.

### Cited Findings

**Next.js side**
- `@next/mdx` with Turbopack requires remark/rehype plugins to be **specified as strings**, for example `remarkPlugins: ['remark-gfm']` and `rehypePlugins: ['rehype-slug', ['rehype-katex', { strict: true, throwOnError: true }]]`. — [Next.js MDX guide (via snippet)](https://nextjs.org/docs/pages/guides/mdx)
- Shiki-based highlighting in Next.js is usually done with `rehype-pretty-code` (Shiki-powered). There are write-ups on Shiki code blocks under Turbopack. — [Rehype Pretty Code](https://rehype-pretty-example-next.pages.dev/); [sather.ws: Shiki code blocks with Turbopack](https://www.sather.ws/writing/shiki-code-blocks-turbopack); [Chris.lu static-first MDX starter kit](https://chris.lu/web_development/tutorials/next-js-static-first-mdx-starterkit/code-highlighting-plugin)
- **Contentlayer** "is no longer maintained… effectively abandoned," with stalled development and compatibility issues with Next.js 14+. — [Wisp CMS](https://www.wisp.blog/blog/contentlayer-has-been-abandoned-what-are-the-alternatives). The community fork `contentlayer2` last published 0.5.8 on **2025-05-03** (about 17 months without a release). — [npm registry: contentlayer2](https://registry.npmjs.org/contentlayer2)
- **`hashicorp/next-mdx-remote` was archived on 2026-04-09.** Listed alternatives are `next-mdx-remote-client`, `remote-mdx` and `mdx-bundler`. — [GitHub: next-mdx-remote](https://github.com/hashicorp/next-mdx-remote); [Discussion #438: alternatives](https://github.com/hashicorp/next-mdx-remote/discussions/438)
- **Velite** turns Markdown/MDX/YAML/JSON into a type-safe data layer with Zod schemas and works with App Router and RSC. Latest is 0.4.0 (2026-06-17). — [Velite docs](https://velite.js.org/guide/introduction); [npm registry: velite](https://registry.npmjs.org/velite)
- **content-collections** latest is 0.15.3 (2026-09-21), with minor releases roughly every 1–2 months through 2025–2026, so it is actively maintained. — [npm registry: @content-collections/core](https://registry.npmjs.org/@content-collections/core)
- 2026 guidance: "Velite or content-collections should be used for filesystem MDX with typed frontmatter." — [PkgPulse guide, 2026](https://www.pkgpulse.com/guides/contentlayer-vs-velite-vs-next-mdx-remote-mdx-content-2026) (secondary)

**Astro side**
- Astro 5 (Dec 2024) introduced the Content Layer (experimental flags appear in npm dist-tags: `experimental--content-layer`, `experimental--server-islands`). Astro 6 added Live Content Collections. — [npm registry: astro](https://registry.npmjs.org/astro); [AlternativeTo, Astro 6](https://alternativeto.net/news/2026/3/astro-6-0-brings-new-astro-dev-built-in-fonts-api-live-content-collections-and-csp-api/)
- Astro 7 bundles **Shiki 4** as a direct dependency. — [npm registry: astro@7.3.5](https://registry.npmjs.org/astro/7.3.5)
- Sätteri does not run remark/rehype plugins, so the fallback is `@astrojs/markdown-remark`. A KaTeX port to Sätteri exists in a community repo. — [Toru Iwasa](https://toruiwasa.com/blog/is-satteri-worth-adopting-astro-7s-rust-markdown-engine/); [satteri-plugins](https://github.com/Ashish-CodeJourney/satteri-plugins)
- **Expressive Code** (`astro-expressive-code`) is actively released: 0.44.2 latest, 0.42 → 0.44 between May and June 2026. — [npm registry: astro-expressive-code](https://registry.npmjs.org/astro-expressive-code)
- Starlight (Astro docs framework) latest is 0.42.5 (2026-10-01), still pre-1.0. — [npm registry: @astrojs/starlight](https://registry.npmjs.org/@astrojs/starlight)
- AstroPaper advertises "type-safe markdown", MDX support, dynamic OG image generation for posts, Pagefind static search and a TOC. — [GitHub: satnaing/astro-paper](https://github.com/satnaing/astro-paper)

### Inferences
- **For ML case studies with math**, both stacks rely on the same `remark-math` + `rehype-katex` plugins. In Next.js they go into `@next/mdx` or Velite or content-collections config (as strings for Turbopack). In Astro 7 you must keep or opt into the remark pipeline, or adopt a Sätteri port. This is the main concrete DX trap in Astro 7 for this candidate. Whether `astro-expressive-code` runs on Sätteri was not verified. Historically it was a rehype-based integration, so assume it needs the remark pipeline until confirmed.
- Embedding React components in MDX works in both. In Next.js they are plain React components (RSC by default, `'use client'` for interactive ones). In Astro, components imported into MDX render static unless given a `client:*` directive, which is exactly the islands model the candidate wants.
- Type-safe frontmatter is built into Astro (Zod schemas in `content.config.ts`). In Next.js it requires picking a third-party layer (Velite or content-collections), which adds a dependency with a single-maintainer risk profile (inference from the pre-1.0 version numbers).
- Image handling: Astro's `<Image>`/`astro:assets` optimizes at build time for static output. Next.js `next/image` needs a server or a custom loader under `output: 'export'` (see section 5).

### Gaps
- Could not confirm whether Expressive Code and `rehype-pretty-code` run under Astro 7's Sätteri pipeline, or whether Astro 7's MDX integration falls back automatically when remark plugins are configured.
- Could not read the official Astro content-collections or Next.js MDX docs in full; the configuration details come from snippets.

## 4. Signaling value to recruiters, and whether to publish the repo

### Takeaway
The available evidence says recruiters judge the portfolio's **content, clarity, speed and project quality**, not its framework. Next.js is the more recognizable label ("React + Next.js" is the default combination recruiters look for), but this candidate already proves Next.js 16 depth through shipped apps, so the portfolio's framework adds little signal either way. A fast, polished, well-written site and a clean public repo matter more.

### Cited Findings
- "A static site built with Next.js, Astro, or even plain HTML/CSS is acceptable for your portfolio website." What matters: load in under 2 seconds ("If a hiring manager has to wait for your site to load, they'll just move on"), and aim for Lighthouse 90+. — [DEV Community: How to Build a Developer Portfolio That Actually Gets You Hired (2026)](https://dev.to/__be2942592/how-to-build-a-developer-portfolio-that-actually-gets-you-hired-2026-6kn)
- "Standing out often comes down to clarity, communication, and relevance" because candidates share similar technical foundations, and hiring teams "regularly see identical weather apps, ecommerce demos, task managers…" — [SOLTECH: What Do Hiring Managers Actually Look For in a GitHub Portfolio?](https://soltech.net/what-do-hiring-managers-actually-look-for-in-a-github-portfolio/)
- "Next.js is the box most hiring managers recognize at a glance… recruiters increasingly treat 'React + Next.js' as the default combo", while "companies rarely hire for 'Astro developer' as a primary title." — [daily.dev Recruiter: Hiring Astro Developers](https://recruiter.daily.dev/stacks/astro/); [Nucamp: Top 10 Full Stack Frameworks 2026](https://www.nucamp.co/blog/top-10-full-stack-frameworks-in-2026-next.js-remix-nuxt-sveltekit-and-more) (secondary snippets)
- Developer write-ups choosing Astro for portfolios cite performance and simplicity. — [Bryan Jacinto: Why I built my portfolio with Astro](https://writer.bryanjacinto.com/blogs/why-i-built-my-portfolio-with-astro); [DEV: Insights from building my portfolio with Astro](https://dev.to/moerayo/insights-from-building-my-portfolio-with-astro-39f9)
- State of JS 2025: Astro has the **top meta-framework satisfaction**. Next.js still leads usage (about 60–70%), but its satisfaction fell from **68% to 55%**, leaving a **39-point gap** behind Astro. — [State of JS 2025: Meta-Frameworks](https://2025.stateofjs.com/en-US/libraries/meta-frameworks/); [InfoQ summary, Mar 2026](https://www.infoq.com/news/2026/03/state-of-js-survey-2025/); [Strapi takeaways](https://strapi.io/blog/state-of-javascript-2025-key-takeaways) (numbers from search snippets of these summaries)

### Inferences
- For this candidate the framework choice is a **weak signal**. Their Next.js 16 / NestJS / FastAPI apps already carry the "can ship production React" signal. Choosing Astro can be framed as engineering judgment ("right tool for a content site; zero-JS pages, React islands where needed"), which is a mild positive in a case study or README. Choosing Next.js is neutral to slightly positive for recruiter keyword-matching.
- A public repo is worth it only if it is clean: typed content schemas, a component structure, CI (lint, typecheck, Lighthouse CI), and a README with architecture and performance numbers. It then works as one more code sample. A messy portfolio repo is a net negative. (Inference; no hard data found.)

### Gaps
- No survey data or recruiter studies (2025–2026) found that directly measure whether portfolio framework or public portfolio repos affect callbacks. The evidence is opinion and blog-level.

## 5. Hosting compatibility: static export vs adapters

### Takeaway
Both frameworks can produce a **fully static site that runs on any host** (GitHub Pages, Cloudflare Pages, Netlify, S3). Astro does this by default. Next.js does it via `output: 'export'`, losing server-only features (default `next/image` optimization, anything needing request-time rendering). For SSR or hybrid features, Next.js now has a **stable Adapter API (16.2, March 2026)**, but official Cloudflare/AWS/Netlify adapters on it were still "expected by end of 2026". Astro has long-standing first-party adapters and, after the acquisition, especially deep Cloudflare integration.

### Cited Findings
- Under `output: 'export'` there is no Node server, so "the default on-demand image optimizer cannot function." Workarounds include custom loaders or `next-image-export-optimizer` (which often needs image URLs defined in advance). — [next-image-export-optimizer (npm)](https://www.npmjs.com/package/next-image-export-optimizer); [vercel/next.js Discussion #60977](https://github.com/vercel/next.js/discussions/60977)
- A 2026 engineering post documents broken static exports and 404s in Next.js 16. — [Axiorema: Uncurious case of broken static export and 404s in Next.js 16](https://blog.axiorema.com/engineering/uncurious-case-broken-static-exports-404s-nextjs-16/) (title/snippet only; specifics not read)
- `next/og` and file-convention OG images are documented for App Router. Compatibility with static export depends on build configuration. — [Next.js docs: Metadata and OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- **Adapter API**: alpha in Next.js 16 (Oct 2025), **stable in 16.2 (March 2026)**. On build, Next.js emits a typed, versioned description of routes, prerenders, assets, runtimes and caching rules that an adapter maps onto a provider. Verified adapters at that time: Vercel (open source) and Bun (reference). AWS and Cloudflare adapters were being built in a shared monorepo and Netlify's was in development, "all three expected… by the end of 2026". — [Next.js Across Platforms](https://nextjs.org/blog/nextjs-across-platforms); [ReactSquad: Next.js 16.2 stable Adapter API](https://www.reactsquad.io/blog/nextjs-16-2-adapter-api); [OpenNext](https://opennext.js.org/)
- Astro 7 includes experimental CDN cache providers for Netlify, Vercel and Cloudflare. Astro 6's dev server can run the production runtime, such as the Cloudflare Workers runtime, locally. — [AlternativeTo, Astro 7](https://alternativeto.net/news/2026/6/astro-7-0-brings-vite-8-performance-boost-advanced-routing-route-caching-and-ai-features/); [InfoQ, Astro v6 beta and Cloudflare](https://www.infoq.com/news/2026/02/astro-v6-beta-cloudflare)
- Post-acquisition commitment: Astro "remains platform-agnostic and will keep supporting many deployment targets." — [Astro blog: joining Cloudflare](https://astro.build/blog/joining-cloudflare/)

### Inferences
- For a portfolio that is about 95% static, **hosting is not a differentiator** if Next.js is used in `output: 'export'` mode or deployed to Vercel. The friction shows up when you want Next.js server features (dynamic `next/og`, server actions for a contact form, ISR) **off Vercel**. That should be smooth via adapters by late 2026, but it was still maturing as of the latest sources.
- Astro static output plus a host's form or function service (or a call to the candidate's own FastAPI/NestJS backend from an island) covers a contact form without SSR.

### Gaps
- Could not confirm whether the official Cloudflare/Netlify/AWS Next.js adapters on the stable API shipped between March and October 2026.

## 6. Templates and starters worth considering (and their licensing)

### Takeaway
On the Astro side, **AstroPaper (MIT)** is the most established, actively maintained blog-first theme, and there are MIT-style Astro + Tailwind + shadcn starters. On the Next.js side, **Tailwind Plus "Spotlight"** is high quality but **commercially licensed** (paid Tailwind Plus), and **Once UI's Magic Portfolio is CC BY-NC 4.0** (attribution required, non-commercial). Check licenses before forking. This candidate can also easily scaffold from shadcn directly.

### Cited Findings
- **AstroPaper**: "minimal, responsive, accessible and SEO-friendly Astro blog theme". **MIT License (© 2026)**. Features: type-safe markdown, Pagefind static search, drafts and pagination, sitemap/RSS, MDX, collapsible TOC, dynamic OG images, i18n-ready, light/dark mode. Reported at about 5,000 GitHub stars and last updated August 2026. — [GitHub: satnaing/astro-paper](https://github.com/satnaing/astro-paper); [Astro themes: AstroPaper](https://astro.build/themes/details/astropaper/); [astrothemes.dev](https://www.astrothemes.dev/theme/satnaing-astro-paper/)
- **Astro + TailwindCSS + shadcn/ui Template** is listed in the official Astro themes directory. — [Astro themes](https://astro.build/themes/details/astro-tailwindcss-shadcnui-template/)
- Curated 2026 lists of Astro portfolio themes. — [Themefisher: 10 Best Astro Portfolio Templates 2026](https://themefisher.com/best-astro-portfolio-templates); [getastrothemes: 357+ free Astro themes](https://getastrothemes.com/free-astro-themes-templates/)
- **Spotlight (Tailwind Plus)**: a personal-website template under the **Tailwind Plus license** (commercial). A purchase grants all templates and component packages, including future ones. Per the license you can build unlimited sites without re-buying. — [Tailwind Plus: Spotlight](https://tailwindcss.com/plus/templates/spotlight)
- **Magic Portfolio (Once UI)**: Next.js-based, distributed under **CC BY-NC 4.0** (attribution, no commercial use). It can be extended to a "Dopler CC" license via Once UI Pro. — [GitHub: once-ui-system/magic-portfolio](https://github.com/once-ui-system/magic-portfolio); [LICENSE](https://github.com/once-ui-system/magic-portfolio/blob/main/LICENSE); [Once UI license agreement](https://once-ui.com/license-agreement)
- Once UI also has a Vercel-listed Next.js design starter. — [Vercel templates: Once UI Design for Next.js](https://vercel.com/templates/next.js/once-ui-design-for-nextjs)
- Other open repos: `RyanFitzgerald/devportfolio` (license file in repo) and community Spotlight-style clones. — [devportfolio LICENSE](https://github.com/RyanFitzgerald/devportfolio/blob/master/LICENSE.md); [mblancodev/spotlight-portfolio](https://github.com/mblancodev/spotlight-portfolio)

### Inferences
- Because this developer already has a shadcn/ui + Tailwind design language, the best "template" is likely their own shadcn setup plus a content layer. In Astro: `shadcn init -t astro` or the Astro + shadcn theme, borrowing AstroPaper's content patterns. In Next.js: an App Router + Velite/content-collections skeleton. Forking a heavily styled template (Magic Portfolio, Spotlight) produces a recognizable look that experienced reviewers may spot.
- CC BY-NC on Magic Portfolio is a real constraint if the site ever promotes paid consulting or freelance work. Spotlight requires a paid license, and the license generally restricts redistributing template source, so publishing the repo publicly needs a check against Tailwind Plus terms.

### Gaps
- The Tailwind Plus price and the exact clause on public repositories of derived sites were not retrieved.
- No current info on Astro Nano / Astro Sphere / Sanity-based Astro starters' maintenance status.
- Vercel's official portfolio templates list could not be fetched.

## 7. Tailwind CSS v4, shadcn/ui and Motion compatibility in both frameworks

### Takeaway
Tailwind v4 is mature (4.3.3), shadcn's CLI (4.21.x) supports both Next.js and Astro, and Motion (now v14, `motion/react`) works in Astro React islands. The Astro caveat is that interactive shadcn components must sit inside a hydrated React island. Motion's full bundle is heavy unless you use `LazyMotion`/`m`.

### Cited Findings
- `tailwindcss` latest = **4.3.3** (2026-07-16). Release dates: 4.0.0 on 2025-01-21, 4.1.0 on 2025-04-01, 4.2.0 on 2026-02-18, 4.3.0 on 2026-05-08. A `v3-lts` tag (3.4.19) still exists. — [npm registry: tailwindcss](https://registry.npmjs.org/tailwindcss)
- `shadcn` CLI latest = **4.21.1** (2026-10-01). The old `shadcn-ui` package name is deprecated. — [npm registry: shadcn](https://registry.npmjs.org/shadcn); [search summary](https://www.shadcn.io/ui/installation/astro)
- shadcn/ui in Astro: add the React and Tailwind integrations, run `shadcn init`, then add components. A scaffold is available via `pnpm dlx shadcn@latest init -t astro`. "Static components like Button and Card work directly in .astro files, while interactive ones such as a Dialog must be wrapped in one React .tsx file and imported with a client:* directive." — [shadcn.io: Astro installation](https://www.shadcn.io/ui/installation/astro) (**note:** shadcn.io is a third-party site, not the official ui.shadcn.com); [astrocraftthemes: Astro shadcn setup](https://astrocraftthemes.com/blog/astro-shadcn-ui/)
- `motion` latest = **14.0.0** (2026-10-02). Majors: 12.0.0 on 2025-01-20, 13.0.0 on 2026-08-05, 14.0.0 on 2026-10-02. — [npm registry: motion](https://registry.npmjs.org/motion)
- Motion (formerly Framer Motion) is imported from `motion/react`. In Astro it needs a `client:*` hydration directive. The full `motion` component adds about **34 kB** (min+gz). Using `m` + `LazyMotion` cuts the initial render cost to about **4.6 kB**, with feature packs `domAnimation` (+15 kB) and `domMax` (+25 kB). — [Motion docs: reduce bundle size](https://motion.dev/docs/react-reduce-bundle-size); [Motion docs: LazyMotion](https://motion.dev/docs/react-lazy-motion); [Flavio Copes: Framer Motion in Astro](https://flaviocopes.com/adding-react-framer-motion-animations-to-an-astro-site/)

### Inferences
- A **command palette** (cmdk / shadcn `Command`) is the awkward piece in Astro. It is global UI, needs a keyboard listener on every page, and must be a hydrated island in the layout (for example `client:idle`), which brings the React runtime onto every page. That erodes Astro's zero-JS advantage unless it is kept tiny or lazy-loaded on first keypress. In Next.js it costs nothing extra because React is already loaded.
- Prior knowledge (not re-verified this session): separate Astro islands are independent React roots and do not share React context. Shared state, such as a theme toggle plus a palette, typically uses nanostores. This is a small learning cost for a React developer.
- Motion v13 and v14 both shipped in Aug–Oct 2026. Pin versions in either framework.

### Gaps
- What changed in Motion 13 and 14 (breaking changes) was not researched.
- No official shadcn (ui.shadcn.com) Astro page was fetched to confirm the `-t astro` template flag; it comes from a third-party mirror.

## 8. Recommendation framework: when Next.js wins and when Astro wins for this candidate

### Takeaway
For a **content-first portfolio with a handful of islands**, Astro is the better technical fit: zero-JS case-study pages, built-in typed content, top developer satisfaction, and React/shadcn reused inside islands. **Next.js is the better choice if** the developer values zero ramp-up and one stack, wants app-like features (server actions, dynamic OG, live demos wired to their NestJS/FastAPI backends, a global command palette, auth), or wants to avoid Astro's 2026 major-version churn and the Sätteri/remark caveat. Both are defensible. The deciding factors are maintenance appetite and how app-like the site will become, not recruiter signaling.

### Cited Findings
- Astro's zero-JS-by-default model wins out-of-the-box performance. Next.js needs deliberate optimization. — [comparison synthesis: pkgpulse](https://www.pkgpulse.com/guides/astro-vs-nextjs-2026); [verlua](https://www.verlua.com/blog/nextjs-vs-astro)
- Astro has top satisfaction in State of JS 2025, and Next.js satisfaction fell from 68% to 55%. — [State of JS 2025](https://2025.stateofjs.com/en-US/libraries/meta-frameworks/)
- Astro release cadence in 2026: 6.0 (Mar 10) and 7.0 (Jun 22); `@astrojs/mdx` 5.0 → 8.0 and `@astrojs/react` 5.0 → 7.0 within the year. Next.js stayed on 16.x from Oct 2025 through Oct 2026. — [npm registry: astro](https://registry.npmjs.org/astro); [npm: @astrojs/mdx](https://registry.npmjs.org/@astrojs/mdx); [npm: @astrojs/react](https://registry.npmjs.org/@astrojs/react); [npm: next](https://registry.npmjs.org/next)
- Next.js MDX tooling churn: Contentlayer abandoned and next-mdx-remote archived in Apr 2026. — [Wisp](https://www.wisp.blog/blog/contentlayer-has-been-abandoned-what-are-the-alternatives); [GitHub: next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
- Astro 7 Sätteri does not run remark/rehype plugins, so a fallback is needed for KaTeX-style plugins. — [Toru Iwasa](https://toruiwasa.com/blog/is-satteri-worth-adopting-astro-7s-rust-markdown-engine/)
- Recruiters do not care about portfolio framework. Speed and content matter. — [DEV 2026 portfolio guide](https://dev.to/__be2942592/how-to-build-a-developer-portfolio-that-actually-gets-you-hired-2026-6kn); [daily.dev Recruiter](https://recruiter.daily.dev/stacks/astro/)

### Inferences

**Astro (7.x) wins when:**
- Most pages are reading content (case studies, notes, resume) and interactivity is limited to a few widgets: the before/after slider (`client:visible`), the architecture diagram (could even be static SVG + CSS hover with no JS), and small charts (`client:visible`).
- The candidate wants built-in, schema-validated content without choosing among third-party content layers.
- Static hosting anywhere (Cloudflare Pages, Netlify, GitHub Pages) is preferred, with near-perfect Lighthouse scores and little tuning.
- They are fine pinning to Astro 7.x and accepting a learning curve: `.astro` syntax, `client:*` directives, nanostores for cross-island state, and the Sätteri vs remark pipeline choice for KaTeX and code blocks.
- Narrative benefit: "chose the right tool for a content site" is a credible engineering-judgment story in the README.

**Next.js (16.x) wins when:**
- The goal is the fastest path to a polished site using the exact patterns, shadcn components, lint/CI configuration and deployment workflow they already use daily (zero ramp-up, one mental model).
- The site will grow app-like features: a global command palette, server actions (contact form, guestbook), dynamic `next/og` images per case study, live demos calling their FastAPI/NestJS services, or authenticated/private sections. Cache Components/PPR handles static plus dynamic mixing in one route.
- They are deploying to Vercel, or are fine with Vercel-first server features (the Adapter API should reduce lock-in by late 2026).
- They want a stable major line (16.x since Oct 2025) and accept choosing a content layer: Velite or content-collections plus `@next/mdx` with string-named plugins under Turbopack.

**Practical recommendation sketch for this candidate (inference):**
- Default: **Astro 7 + `@astrojs/react` + Tailwind 4 + shadcn (islands only) + MDX content collections, with the remark pipeline kept on** for `remark-math`/`rehype-katex` and Expressive Code or Shiki. Static deploy. Lazy-load the command palette on first keypress.
- Choose **Next.js 16 static-first** (RSC pages, `generateStaticParams`, Velite/content-collections, `rehype-pretty-code` + `rehype-katex`, `next/og`) if they expect to add server-side features within 6–12 months, or if speed of delivery matters more than shipped-JS minimalism.
- Either way, budget for Lighthouse 95+ (performance is the one portfolio quality reviewers notice), keep the repo clean and public, and pin dependency versions.
- SvelteKit 3, Nuxt 4, Hugo and Eleventy are not recommended for this candidate. They mean a new component model or no React islands, give up shadcn reuse, and add no signal. SvelteKit 3 is also only two days old.

### Gaps
- No neutral, side-by-side benchmark of an identical MDX + islands portfolio built in Astro 7 and Next.js 16.3 was found.
- Did not verify how much JS a minimal Next.js 16.3 static page ships (React 19.3 + router) vs Astro 7 with one React island. The report writer should avoid exact KB claims or cite them as third-party estimates (for example the "187KB vs 12KB" headline from tech-insider.org).
