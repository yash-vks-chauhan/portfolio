# Hosting, Domains, SEO, AI Discoverability, Social Previews & Analytics for a Developer Portfolio (Oct 2026)

*Research context: for Yash Chauhan, CS student in Chennai, India. Research date 2026-10-03. Method caveat: the research environment blocked direct page fetches of official pricing/docs pages (vercel.com, netlify.com, developers.cloudflare.com, docs.github.com, domain news sites), so most figures below come from search-result extracts of official pages and of 2026-dated third-party pricing write-ups. Where only a third-party aggregator supports a number, it is labelled; treat all prices as "verify at checkout". All prices USD unless marked ₹.*

## 1. Hosting: Vercel Hobby vs Netlify Free vs Cloudflare (Workers static assets / Pages) vs GitHub Pages vs AWS Amplify

### Takeaway
For a static or mostly-static portfolio, Cloudflare Workers static assets (static requests free and unlimited) and GitHub Pages (soft 100 GB/mo) are the most generous and carry no meaningful commercial-use ambiguity for a personal portfolio; Vercel Hobby is excellent for Next.js but is contractually non-commercial and pauses (not bills) at limits; Netlify's 2025 move to a 300-credit free plan makes it the weakest free choice for a frequently redeployed site; AWS Amplify is now tied to a 6-month/credit-based free plan and is overkill.

### Cited Findings
**Vercel Hobby (free)**
- Hobby is free; Pro is $20 per user/month (as of March 2026) — [SchematicHQ / search summary](https://schematichq.com/blog/vercel-pricing); [Costbench](https://costbench.com/software/developer-tools/vercel/)
- Hobby includes 100 GB Fast Data Transfer, 1M function invocations, 1M edge requests, 4 hours active CPU per month, unlimited deployments; 10 GB Fast Origin Transfer, 45-minute build cap, 100 deployments/day, 1 concurrent build, 200 projects — [Supadrop (2026)](https://supadrop.host/blog/vercel-pricing-free-tier-limits/); [Promptstoproduct](https://www.promptstoproduct.com/vercel-free-tier-limits); [Fencode](https://www.fencode.dev/en/blog/vercel-free-vs-pro-2026-official-limits-pricing) (third-party summaries of vercel.com/pricing)
- When a Hobby limit is hit, the project is paused rather than billed; no overage on the free tier — [Deploywise](https://deploywise.dev/blog/vercel-pricing-explained); [Temps.sh](https://temps.sh/blog/vercel-pricing-complete-guide-2026)
- Image Optimization on Hobby: 5,000 image transformations/month (raised from 3K), 300K image cache reads and 100K cache writes; on exceeding, you typically wait until the 30-day window resets — [Vercel changelog: Increased Hobby usage limits for Image Optimization](https://vercel.com/changelog/increased-hobby-usage-limits-for-image-optimization); [Vercel docs: Image Optimization limits & pricing](https://vercel.com/docs/image-optimization/limits-and-pricing)
- Commercial clause: Hobby is restricted to "non-commercial, personal use only"; commercial usage is "any Deployment that is used for the purpose of financial gain of anyone involved in any part of the production of the project, including a paid employee or consultant writing the code." Listed commercial examples: requesting/processing payment, advertising sale of a product/service, being paid to create/host the site, affiliate linking as primary purpose, ads such as AdSense; asking for donations is not commercial — [Vercel docs: Hobby plan](https://vercel.com/docs/plans/hobby); [Vercel community thread](https://community.vercel.com/t/question-about-commercial-usage/23321.md)
- Third-party interpretation: a personal portfolio with no ads and no rate card is fine on Hobby; a portfolio with a "hire me, $50/hr" rate card is a grey area leaning to Pro — [Toolvori](https://www.toolvori.com/en/articles/vercel-hobby-limits-when-upgrade) / [justinmckelvey.com](https://justinmckelvey.com/blog/is-vercel-free) (opinion, not Vercel's ruling)
- Vercel Web Analytics on Hobby: 50,000 events/month shared across all projects; after exceeding, a 3-day grace period then collection pauses; Hobby cannot buy more — [Vercel docs: Web Analytics limits & pricing](https://vercel.com/docs/analytics/limits-and-pricing)

**Netlify Free**
- Free plan = 300 credits/month, with automated deploys, functions, branch previews — [Netlify pricing via Flexprice](https://flexprice.io/blog/complete-guide-to-netlify-pricing-and-plans); [Netli.fyi](https://netli.fyi/blog/netlify-pricing-and-limits)
- Credit meters: bandwidth 20 credits/GB (so ~15 GB max if spent only on bandwidth), production deploys 15 credits each, web requests 2 credits per 10,000, compute 10 credits per GB-hour — [Supadrop](https://supadrop.host/blog/netlify-pricing-free-tier-limits/); [Temps.sh vs Netlify](https://temps.sh/compare/vs-netlify)
- Free plan is a hard cap: at 300 credits sites pause until next month; paid plans can auto-recharge (off by default) — [Supadrop](https://supadrop.host/blog/netlify-pricing-free-tier-limits/)
- Paid tiers quoted variously as "Free–$19/mo" ([Costbench](https://costbench.com/software/cloud-infrastructure/netlify/)) and "Pro $20" ([Toolchase](https://toolchase.com/blog/netlify-pricing-guide/)) — sources differ on plan names/prices.

**Cloudflare (Workers static assets / Pages)**
- Static asset requests on Workers are free and unlimited on all plans and do not count toward request quotas; only dynamic Worker invocations count — [Cloudflare Workers pricing docs (search extract)](https://developers.cloudflare.com/workers/platform/pricing/); [Temps.sh](https://temps.sh/blog/cloudflare-pages-free-tier-limits-2026)
- Workers free tier: ~100K requests/day (~3M/month) with up to 10 ms CPU per request; 3,000 build minutes/month cited for builds — [Eastondev](https://eastondev.com/blog/en/posts/dev/20251201-cloudflare-pricing-compare/); [Temps.sh](https://temps.sh/blog/cloudflare-pages-free-tier-limits-2026)
- Direction of travel: Cloudflare pushes new projects to Workers with static assets; Pages remains supported for existing projects — [Bejamas: "Cloudflare Pages in 2026: Why We Deploy to Workers"](https://bejamas.com/stack/hosting/cloudflare)
- IMPORTANT for discoverability: since July 1, 2025, new Cloudflare domains block known AI crawlers by default (applies to new zones and free accounts that haven't changed the setting) — [MIT Technology Review](https://www.technologyreview.com/2025/07/01/1119498/cloudflare-will-now-by-default-block-ai-bots-from-crawling-its-clients-websites/); [Crawlora](https://crawlora.net/blog/cloudflare-ai-crawler-block-2026)

**GitHub Pages**
- Published site ≤1 GB; soft bandwidth limit 100 GB/month; soft limit 10 builds/hour (does not apply when building/publishing with a custom GitHub Actions workflow); deployments time out after 10 minutes — [GitHub Docs: Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits); [Supadrop](https://supadrop.host/blog/github-pages-limits/)
- Not allowed as free hosting for an online business, e-commerce site, or site primarily directed at commercial transactions/commercial SaaS — [GitHub Docs (via search)](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits); [VPSRanking](https://vpsranking.com/serverless/github-pages/)
- Exceeding soft limits leads to throttling/contact rather than a bill — [Supadrop](https://supadrop.host/blog/github-pages-limits/)

**AWS Amplify / S3 + CloudFront**
- From July 15, 2025, new AWS customers get up to $200 Free Tier credits ($100 at sign-up + up to $100 earned), a free plan lasting 6 months, credits usable within 12 months; choose free vs paid plan at sign-up — [AWS What's New (July 2025)](https://aws.amazon.com/about-aws/whats-new/2025/07/aws-free-tier-credits-month-free-plan/)
- Amplify Hosting cited as 5 GB storage + 15 GB data transfer/month free, then $0.023/GB-month storage and $0.15/GB served — [Pricingnow (third party)](https://pricingnow.com/question/amplify-pricing/) (unclear whether this allowance still applies to accounts on the new credit-based plan)

### Inferences
- Netlify's per-deploy charge (15 credits) means ~20 production deploys/month alone exhaust the 300-credit free plan before any traffic — poor fit for a student who pushes often.
- Best fit by stack: Next.js with SSR/ISR/`next/og` → Vercel Hobby (keep it non-commercial: no ads, no paid rate card); Astro/static export → Cloudflare Workers static assets or GitHub Pages. GitHub Pages pairs naturally with a `username.github.io` repo that already sits on the GitHub profile Yash will link everywhere.
- If hosting or proxying DNS through Cloudflare, explicitly turn OFF "Block AI bots"/AI Crawl Control defaults and review the managed robots.txt, otherwise the portfolio may be invisible to ChatGPT/Claude/Perplexity crawlers (see Section 4).
- Preview deploys: Vercel, Netlify (branch previews), and Cloudflare all offer per-branch/PR previews on free plans per the cited summaries; GitHub Pages does not natively (one live site per repo) — a minor dev-experience gap rather than a visitor-facing one.

### Gaps
- Could not directly fetch vercel.com/pricing, netlify.com/pricing, developers.cloudflare.com, or docs.github.com (egress-blocked). Exact Cloudflare Pages free-plan specifics (e.g., builds/month, files per site, max file size, custom domains per project) were not confirmed this session.
- Whether Netlify accounts created before its 2025 credit switch still keep the legacy free plan (100 GB bandwidth/300 build minutes) was not verified.
- AWS India (billing entity, INR invoicing, GST) specifics not verified.

## 2. Domains: price/renewal of .dev, .com, .in, .me, .io, .ai; registrars; Student Pack offers; .dev HSTS; which TLD reads best

### Takeaway
A `.dev` (≈$11–13/yr at Porkbun/Cloudflare, HTTPS-only by design) or `.com` (≈$10.4–11.2/yr at cost, rising Nov 1, 2026) is the best engineer-facing choice; `.in` is cheapest in rupees (≈₹500–900/yr + 18% GST) but is not sold by Cloudflare Registrar; `.me` is free for year one via the GitHub Student Pack but renews at ~$17–24; `.io` and `.ai` are expensive and rising and add nothing for a personal brand.

### Cited Findings
**.com**
- Cloudflare Registrar (at-cost, no markup, same renewal price) lists .com at $10.44/yr; free WHOIS privacy and DNSSEC — [tld-list Cloudflare page / search extract (Oct 2026)](https://tld-list.com/registrars/cloudflare); [Startupowl](https://startupowl.com/reviews/cloudflare-registrar)
- VeriSign is raising .com wholesale 7% from $10.26 to $10.97, effective Nov 1, 2026, with three further 7% increases allowed in 2027–2029 — [Domain Name Wire (Apr 23, 2026)](https://domainnamewire.com/2026/04/23/breaking-verisign-raising-wholesale-com-prices/); [webhosting.today](https://webhosting.today/2026/05/21/verisign-starts-a-four-year-com-price-cycle-the-first-7-hits-in-november/)
- Registrar cost including ICANN fee goes to $11.17 per [Domain Name Wire summary](https://domainnamewire.com/2026/04/23/breaking-verisign-raising-wholesale-com-prices/) / [tldes.com](https://tldes.com/pages/com-price-increase-2026); another source says Cloudflare's at-cost total becomes $11.15 — [search extract on Cloudflare pricing](https://tld-list.com/registrars/cloudflare) (minor conflict, likely ICANN-fee rounding)
- Porkbun .com $11.08 first year and $11.08 renewal — [Best-domain-registrars Porkbun pricing](https://www.best-domain-registrars.com/registrars/porkbun/pricing/); another tracker shows $9.73 — [Stackscored](https://www.stackscored.com/pricing/domain-registrars/porkbun/) (conflict; check live)
- Squarespace Domains (Google Domains successor): .com $12 first year, $20 renewal (another source says $20 flat) — [Stackscored](https://www.stackscored.com/pricing/domain-registrars/squarespace-domains/); [whatsquare.space](https://whatsquare.space/blog/squarespace-domain-renewal-cost); Google Domains used to charge ~$12 for .com — [TechRepublic](https://www.techrepublic.com/article/google-domains-squarespace-acquisition/)

**.dev**
- Porkbun .dev: $8.75 first year, $12.87 renewal (promo seen at $7.75 in Aug 2026) — [Best-domain-registrars](https://www.best-domain-registrars.com/registrars/porkbun/pricing/); [Domainoffer](https://domainoffer.net/tld/dev/porkbun)
- Cloudflare .dev ≈ $12.20/yr (secondary sources, not confirmed on Cloudflare's own page) — [search extract](https://tldspy.com/registrar/cloudflare); Cloudflare added Google TLDs incl. .dev/.app — [Cloudflare Community](https://community.cloudflare.com/t/top-level-domain-support-tlds-expanded-to-include-google-tlds-dev-app-and-more/540450)
- Squarespace .dev $20 flat — [Stackscored](https://www.stackscored.com/pricing/domain-registrars/squarespace-domains/)
- .dev (like .app, .page) is on the browser HSTS preload list at the TLD level, so browsers only load .dev sites over HTTPS; without a valid TLS certificate the site won't load ("HTTP is disabled for this domain") — [Wikipedia: .dev](https://en.wikipedia.org/wiki/.dev); [Porkbun KB: HSTS Preload and Google Registry](https://kb.porkbun.com/article/96-hsts-preload-and-google-registry); [Google Registry .dev](https://www.registry.google/domains/dev/)

**.in (India ccTLD)**
- DomainIndia: ₹575 first year, ₹625/yr renewal, excluding 18% GST (as of Sep 19, 2026); Hostinger ₹1 first year then ₹899/yr; GoDaddy renewal ₹800; Hiox from ₹399 then ₹849; ChennaiHost ₹899 — [DomainIndia](https://domainindia.com/support/kb/best-domain-registration-companies-in-india-features-pricing-benefits); [Hostinger IN](https://www.hostinger.com/in/tld/in-domain); [ChennaiHost](https://www.chennaihost.com/domains-price-list.html); [Hiox](https://www.hioxindia.com/in-domain-registration.php)
- Cloudflare Registrar does not support .in (ccTLD support stalled) — [Cloudflare Community feature request](https://community.cloudflare.com/t/tld-support-for-in-de-eu-id-in-nl/160749)

**.me**
- Porkbun .me $17.27 first year and renewal — [Best-domain-registrars](https://www.best-domain-registrars.com/registrars/porkbun/pricing/)
- Namecheap .me promo $10.98, renewal $23.98 — [Namecheap .me page (search extract)](https://www.namecheap.com/domains/registration/cctld/me/)
- Cloudflare supports .me — [Cloudflare Community](https://community.cloudflare.com/t/cloudflare-registrar-me-domain-support/253779)

**.io**
- Cloudflare .io listed at $36.30/yr — [search extract of Cloudflare price list](https://tld-list.com/registrars/cloudflare)
- Wholesale .io price rising to $56 (announced July 2026) — [Domain Name Wire (Jul 21, 2026)](https://domainnamewire.com/2026/07/21/io-price-increase/); [NamePros](https://www.namepros.com/articles/wholesale-io-registration-cost-increasing-to-56.1393369/). The search extract gave the effective date as January 2027 and also referenced an earlier wholesale increase in January 2026 — dates and the $36.30 vs ~$50+ wholesale figures are inconsistent; could not fetch the article to reconcile.

**.ai**
- .ai registrations/renewals require a minimum 2-year term; typical $70–$200+ per year (e.g., Spaceship $79.98/yr → ~$160 upfront) — [register.domains](https://register.domains/en/blog/should-i-buy-ai-domain-guide); [Spaceship](https://www.spaceship.com/domains/cctld/ai/)
- .ai prices going up $20 (Feb 2026 report) — [Domain Name Wire (Feb 2, 2026)](https://domainnamewire.com/2026/02/02/ai-domain-name-prices-going-up-20/); Cloudflare .ai cited at $73.50/yr — [search extract](https://tld-list.com/registrars/cloudflare)

**GitHub Student Developer Pack domain offers (2026)**
- Namecheap: free .me domain + 1 SSL cert for 1 year via nc.me — [Namecheap for GitHub Students](https://nc.me/landing/github)
- .TECH (get.tech): free .tech domain for 1 year; Name.com: a free domain from a list of eligible extensions + a year of Domain Safe — [Being Beginner Student Pack guide 2026](https://beingbeginner.com/github-student-developer-pack-guide-2026/); [Domainoffer student domains](https://domainoffer.net/blog/student-free-domains)
- All Pack domains are free for year one only, then renew at the registrar's standard rate — [aistudentdiscount.com](https://aistudentdiscount.com/blog/free-domain-names-for-students/)

**India-specific payment**
- Indian-issued cards have international/online transactions disabled by default under RBI guidelines and must be enabled via the bank — [RBI notification](https://www.rbi.org.in/commonman/english/scripts/Notification.aspx?Id=545); [Wise India](https://wise.com/in/blog/how-to-make-international-payments)
- RBI recurring-payment (e-mandate) rules require Additional Factor Authentication for card auto-debits, including international recurring payments — [Zoho FAQ on RBI auto-debit rules](https://www.zoho.com/billing/academy/payment-collection-and-compliance/faqs-RBIs-new-auto-debit-rules.html); [Razorpay](https://razorpay.com/blog/international-subscriptions-india/)

### Inferences
- Recommended: `yashchauhan.dev` (or a handle-based variant if taken) at Cloudflare Registrar or Porkbun ≈ $11–13/yr (≈₹1,000–1,150 at an assumed ~₹88/USD — exchange rate not verified). `.dev` instantly signals "developer", and HSTS preload is a non-issue because every host above issues free TLS automatically. `.com` is the safest universal choice if the exact name is available; budget ~$11.2/yr after Nov 1, 2026 and ~7%/yr increases thereafter.
- `.in` is attractive in ₹ and signals India-based, but it narrows perceived audience for international roles and can't be managed at Cloudflare Registrar; consider buying it only as a defensive redirect.
- The Student Pack `.me`/`.tech` is good for experimenting, but renewal (~$17–24 for .me) costs more than a .dev; avoid putting a long-lived personal brand on a domain that becomes pricier in year two. Don't build the brand on .io (price rising, geopolitical uncertainty) or .ai (2-year minimum, $140+ upfront).
- Because RBI rules can cause auto-renew card charges to fail without AFA, set a calendar reminder and/or prepay multiple years; a lapsed personal domain is a real SEO and identity risk.

### Gaps
- Domain availability of yashchauhan.{com,dev,in,me} was not checked.
- Cloudflare .dev/.me exact at-cost prices not confirmed from Cloudflare's own page.
- .io effective date and amount of the 2026–2027 wholesale changes are inconsistent across extracts.
- Whether Porkbun/Cloudflare accept UPI or RuPay was not verified (likely not; Indian registrars do accept UPI — unverified).

## 3. Personal-name SEO: technical checklist and winning a common-name query ("Yash Chauhan")

### Takeaway
Do the technical basics (self-canonical, sitemap, robots.txt, GSC + Bing Webmaster + IndexNow, Person/ProfilePage JSON-LD with `sameAs`), then win the common-name query through entity consistency: identical name + a disambiguating qualifier ("Yash Chauhan — software engineer, Chennai") + the same handle across GitHub, LinkedIn, Scholar/ORCID, all linking back to the site. Expect LinkedIn to compete for the top spot; a Knowledge Panel is unlikely for a student and shouldn't be the goal.

### Cited Findings
- Google's ProfilePage structured data is for pages primarily about a person/organization (e.g., "About Me" page on a blog); `mainEntity` (a Person or Organization) is required; recommended properties include `sameAs` (links to the person's other profiles), description, image, dates and interaction statistics — [Google Search Central: Profile page (ProfilePage) structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
- `sameAs` connects the Person entity to external profiles Google uses for Knowledge Graph resolution; people with common names benefit from Person schema with `sameAs` to LinkedIn, ORCID, Wikidata (if exists), X — [Organikpi](https://organikpi.com/blog/technical-seo/schema-sameas-entity-disambiguation-ai-citations/); [Murat Ulusoy](https://www.muratulusoy.de/en/blog/knowledge-panel-how-to.html)
- Checklist items: verify a Domain property in Google Search Console and check indexing/exclusions; submit a clean XML sitemap in both GSC and Bing Webmaster Tools; add `Sitemap: https://domain/sitemap.xml` to robots.txt; don't block CSS/JS/images; self-referencing canonical on every indexable page; sitemaps are capped at 50,000 URLs / 50 MB — [ClickMinded 2026 SEO checklist](https://www.clickminded.com/seo-checklist/); [Nightwatch sitemap guide](https://nightwatch.io/blog/sitemap-best-practices/)
- IndexNow is push-based; a ping to one participating engine is shared with the others (Bing, Yandex, etc.) — [Wikipedia: IndexNow](https://en.wikipedia.org/wiki/IndexNow); [DEV: where to submit your sitemap in 2026](https://dev.to/jacob_c_01a07c7144072eae7/where-to-submit-your-sitemap-in-2026-every-search-engine-indexnow-2cce)
- In a March 2026 test of 12 founders, 8 had LinkedIn outranking their own website for their name — [InstantPress](https://www.instantpress.co/blog/personal-branding-and-seo) (small, vendor-run sample)
- For common names, consistent use of a professional designation or geography (e.g., "Name, role, City") across LinkedIn, bios and Wikidata gives Google the disambiguation needed to consolidate signals — [InstantPress](https://www.instantpress.co/blog/personal-branding-and-seo)
- Knowledge Panels are triggered by Google recognising an entity across trusted sources; inconsistent names/titles across profiles prevent triggering — [InstantPress Knowledge Panel guide](https://www.instantpress.co/blog/google-knowledge-panel-complete-guide); [Semrush](https://www.semrush.com/blog/google-knowledge-panel/)
- Wikidata entries raise the chance of a panel; useful identifier properties include LinkedIn (P6634), Google Scholar (P1960), ORCID (P496) — [podrez.pl Wikidata guide](https://podrez.pl/en/wikidata/) (SEO-practitioner source)
- `rel="me"` signals that the linked page represents the same person; GitHub and Twitter automatically add `rel=me` to website links on user profiles — [IndieWeb rel-me](https://indieweb.org/rel-me); [microformats wiki](https://microformats.org/wiki/rel-me); [GitLab MR](https://gitlab.com/gitlab-org/gitlab-foss/-/merge_requests/24089)

### Inferences
- Concrete checklist for the portfolio:
  1. `<title>Yash Chauhan — Software Engineer (Chennai)</title>` on the home page; unique titles/meta descriptions per page; one H1 containing the full name.
  2. Self-canonical URLs, one preferred host (apex or www) with 301 from the other; `sitemap.xml` + `robots.txt` with Sitemap line.
  3. JSON-LD on the home/about page: `ProfilePage` → `mainEntity: Person` with `name`, `alternateName` (handle), `jobTitle`, `alumniOf` (university), `address`/`homeLocation` (Chennai), `image`, `url`, `sameAs` [GitHub, LinkedIn, Google Scholar, ORCID, X, dev.to/Medium, LeetCode/Kaggle if relevant]. Use `Article`/`BlogPosting` with `author` → the same Person `@id` on blog/case-study pages (author pages + internal linking).
  4. Add `rel="me"` on outbound profile links; put the site URL in the GitHub profile "Website" field (GitHub adds rel=me), LinkedIn "Contact info"/featured, ORCID "websites", Google Scholar homepage field, and in every repo's "About" website field and README for flagship projects.
  5. Verify in GSC (Domain property via DNS TXT) and Bing Webmaster Tools (can import from GSC); enable IndexNow (Cloudflare and many frameworks have one-click/plugin support).
  6. Use exactly the same name string and a consistent qualifier everywhere; pick one handle and use it on every platform.
- A Wikidata item for a student without independent published coverage risks deletion under Wikidata's notability policy (background knowledge, not verified this session); an ORCID iD + Google Scholar profile (if he has papers) is a lower-risk way to create authoritative, structured identity nodes.
- Realistic goal: own positions 1–3 for "Yash Chauhan" + qualifier queries ("Yash Chauhan developer", "Yash Chauhan Chennai", "Yash Chauhan GitHub") and have the site + GitHub + LinkedIn all on page one for the bare name; the bare name alone may stay contested by other Yash Chauhans with more press.

### Gaps
- No quantitative data on how many other "Yash Chauhan" entities compete in Google India/US SERPs (not measured).
- Couldn't fetch Google's ProfilePage doc directly to quote the exact required/recommended property list beyond `mainEntity`/`sameAs`.
- No primary Google statement found on knowledge-panel eligibility criteria for individuals (only third-party SEO guides).

## 4. AI search / Generative Engine Optimization (GEO): llms.txt, how AI engines pick sources, crawler directives

### Takeaway
There is no special "AI SEO" requirement from Google: AI Overviews/AI Mode draw from the normal Search index (indexed + snippet-eligible), and Google-Extended does not affect them. llms.txt is cheap to add but evidence shows almost no AI crawler reads it. The practical levers are: be indexed in Google AND Bing, explicitly allow the search/retrieval bots (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot), and — for a portfolio whose goal is to be known — allow the training bots too (GPTBot, ClaudeBot, Google-Extended). If on Cloudflare, disable its default AI-bot block.

### Cited Findings
**Google**
- Google: "no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations"; no need for new machine-readable files, AI text files, markup or special schema; to be a supporting link a page must be indexed and eligible to show with a snippet — [Google Search Central: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features); [Google's AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide); [Search Engine Journal](https://www.searchenginejournal.com/google-says-you-dont-need-aeo-or-geo-to-rank-in-ai-overviews/551939/)
- Google-Extended controls use of content for Gemini apps / Vertex AI training and grounding; it does not opt a site out of AI Overviews/AI Mode, which are governed by Googlebot plus snippet controls (nosnippet, data-nosnippet, max-snippet, noindex) — [Search Engine Journal](https://www.searchenginejournal.com/what-opting-out-of-googles-ai-search-features-means-now/584321/); [PPC Land](https://ppc.land/google-extended/)

**llms.txt**
- Google Search does not use llms.txt; John Mueller compared it to the keywords meta tag — [Passionfruit](https://www.getpassionfruit.com/blog/should-i-create-an-llms.txt-file-google-s-2026-guidance-explained); [Geoly](https://www.geoly.ai/blog/does-llms-txt-work)
- Ahrefs (137,210 domains): ~28% had a valid llms.txt; 97% of those files received zero requests in May 2026; a separate analysis of 515M LLM-bot events found 408 requests to /llms.txt — [Geojacker summary of Ahrefs/Limy data](https://geojacker.com/llms-txt); [Wikibusines](https://www.wikibusines.net/blog/llms-txt-ai-crawler-guide)
- SE Ranking (300,000 domains): 10.13% adoption; of the 50 most AI-cited domains only one had the file; no major AI provider has confirmed using it as of Q1 2026 — [Digital Strategy Force](https://digitalstrategyforce.com/journal/does-your-site-need-llms-txt-to-get-cited-by-ai-search-in-2026/); [Geoly](https://www.geoly.ai/blog/does-llms-txt-work)
- (Note conflict: the ~28% Ahrefs vs ~10% SE Ranking adoption figures use different samples.)

**OpenAI**
- GPTBot = training; OAI-SearchBot = indexes pages for ChatGPT search citations; ChatGPT-User = user-triggered fetches, for which OpenAI says robots.txt may not apply. You can allow OAI-SearchBot while disallowing GPTBot — [Aparok](https://aparok.com/blog/openai-crawlers-oai-searchbot-gptbot-robots-txt); [Lenvanderhof](https://lenvanderhof.com/en/blog/gptbot-vs-oai-searchbot/); [Fennec SEO](https://fennecseo.app/blog/openai-crawlers-robots-txt-guide/) (summaries of OpenAI's bots page)

**Anthropic**
- Three bots with separate robots.txt tokens: ClaudeBot (training), Claude-SearchBot (indexing for search quality), Claude-User (fetches when a user asks); all three honor robots.txt, including Claude-User — [Search Engine Journal](https://www.searchenginejournal.com/anthropics-claude-bots-make-robots-txt-decisions-more-granular/568253/); [Anthropic support article](https://support.anthropic.com/de/articles/8896518-durchsucht-anthropic-daten-aus-dem-internet-und-wie-konnen-website-betreiber-den-crawler-blockieren)

**Perplexity**
- Declared bots: PerplexityBot and Perplexity-User; Perplexity says Perplexity-User is an agent and not required to honor robots.txt — [Menra Perplexity crawler guide](https://www.menra.ai/guides/perplexity-crawler-guide)
- Aug 2025: Cloudflare documented Perplexity using undeclared/stealth user agents when blocked, delisted it as a verified bot and began blocking it; Perplexity disputed — [Search Engine Journal](https://www.searchenginejournal.com/cloudflare-delists-and-blocks-perplexity-from-crawling-websites/552899/); [PPC Land](https://ppc.land/perplexity-denies-training-ai-models-as-cloudflare-documents-stealth-crawlers/)

**Cloudflare defaults**
- Since July 1, 2025, Cloudflare blocks known AI crawlers by default for new domains; its managed robots.txt adds a `Content-Signal` line such as `search=yes, ai-train=no` — [MIT Technology Review](https://www.technologyreview.com/2025/07/01/1119498/cloudflare-will-now-by-default-block-ai-bots-from-crawling-its-clients-websites/); [Crawlora](https://crawlora.net/blog/cloudflare-ai-crawler-block-2026)

**How AI engines pick sources (third-party studies)**
- ChatGPT search is reported to rely primarily on Bing's index; pages in Google's organic top 10 are reportedly more likely to be cited in AI Overviews — [search summary of Profound / Discovered Labs analyses](https://www.tryprofound.com/blog/ai-platform-citation-patterns); [Discovered Labs](https://discoveredlabs.com/blog/ai-citation-patterns-how-chatgpt-claude-and-perplexity-choose-sources) (not officially confirmed by OpenAI in sources found)
- Wikipedia is ChatGPT's most-cited source (7.8% of citations); Reddit leads for Google AI Overviews (2.2%) and Perplexity (6.6%) — [Profound](https://www.tryprofound.com/blog/ai-platform-citation-patterns)
- Academic measurement work on GEO citation selection exists (e.g., arXiv 2604.25707) — [arXiv](https://arxiv.org/pdf/2604.25707)

### Inferences
- Recommended robots.txt for the portfolio: `User-agent: *` Allow `/`, plus explicit Allow groups for OAI-SearchBot, ChatGPT-User, GPTBot, Claude-SearchBot, Claude-User, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, Bingbot; and the Sitemap line. For a personal brand, being in training data is upside (future models "know" Yash Chauhan as a developer), so allowing training bots is reasonable.
- Bing Webmaster Tools matters more than its search share suggests, because ChatGPT search reportedly leans on Bing's index.
- Assistants answer "who is Yash Chauhan" from entity-rich, consistent, crawlable text. Put a plain-HTML (server-rendered, not JS-only) bio paragraph on the home page containing name, role, location, university, focus areas, and links; this is the "answer capsule" AI systems quote.
- Adding `/llms.txt` costs ~10 minutes and has negligible downside; do it as a curiosity, not a strategy. Don't create separate "AI-only" content (Google says it's unnecessary).
- On a Cloudflare-proxied zone: Security → Bots / AI Crawl Control → allow, and either disable the managed robots.txt or edit its Content-Signal to `ai-train=yes` if you want training inclusion.

### Gaps
- Could not fetch OpenAI's, Perplexity's or Anthropic's official bot docs directly; bot behaviors are from reputable secondary summaries (SEJ) plus Anthropic's support page title.
- No rigorous public evidence on how assistants resolve ambiguous personal names (e.g., multiple "Yash Chauhan" entities).

## 5. Social previews: Open Graph/Twitter cards, dynamic OG images, LinkedIn caching

### Takeaway
Ship one 1200×630 (1.91:1) OG image per page with `og:title/description/image/url/type` and `twitter:card=summary_large_image`; generate them at build time with Satori (`next/og` `ImageResponse` in Next.js, or Satori+resvg / astro-og-canvas in Astro); after changes, refresh LinkedIn via Post Inspector since it caches for ~7 days.

### Cited Findings
- 1200×630 px at 1.91:1 is the universal safe default for Facebook, LinkedIn, Slack, Discord, iMessage, with acceptable fallback on X — [env.dev OG sizes 2026](https://env.dev/guides/opengraph-image-sizes); [imagedimensions.com](https://imagedimensions.com/guides/open-graph-image-size)
- `summary_large_image` shows a full-width image above title/description; 1200×630 recommended — [Linkpreview.io guide (2026)](https://linkpreview.io/blog/complete-guide-to-open-graph-tags)
- LinkedIn caches previews aggressively (~7 days); LinkedIn Post Inspector (linkedin.com/post-inspector) refreshes the cache; Facebook Sharing Debugger "Scrape Again"; X caches ~7 days; Slack can be busted with a dummy query parameter — [Linkpreview.io](https://linkpreview.io/blog/complete-guide-to-open-graph-tags); [OpenGraph Check](https://opengraph-check.com/en/blog/open-graph-image-size)
- Satori converts JSX/CSS to SVG; `@vercel/og` / `next/og` `ImageResponse` renders to PNG (Satori + Resvg); in the App Router, placing `opengraph-image` in a route segment auto-generates og:image tags and `generateStaticParams` makes them static at build time — [DEV: next/og ImageResponse](https://dev.to/devfixelsoftware/dynamic-open-graph-images-in-nextjs-with-imageresponse-nextog-1bif); [Matthew Wong](https://www.matthewswong.com/en/blog/nextjs-dynamic-og-image-generation/)
- Limitation reported: with `output: 'export'` (fully static), dynamic OG generation at build time has constraints — [Marcos Bérgamo](https://www.thedon.com.br/blog/create-next-og-image-at-build-time)
- Astro: an endpoint like `/blog/[slug].png.ts` with `getStaticPaths` pre-renders images via Satori → resvg at build time with zero runtime cost — [Knaap.dev](https://knaap.dev/posts/dynamic-og-images-with-any-static-site-generator/); [cc.bruniaux.com](https://cc.bruniaux.com/guide/workflows/og-image-generation/)

### Inferences
- Build-time generation is preferable for a portfolio on any host: no function invocations, works on GitHub Pages/Cloudflare static, and avoids Vercel Hobby CPU/invocation consumption.
- Use absolute HTTPS URLs for `og:image`, include `og:image:width/height/alt`, keep text large (readable at thumbnail size), and include name + role on the default card so a shared home-page link reinforces the personal brand.

### Gaps
- `astro-og-canvas` specifics (CanvasKit-based package) were not covered by fetched sources; recommendation relies on its existence as a known Astro community package, unverified this session.
- Could not confirm whether LinkedIn's cache window changed in 2026 (sources say "up to 7 days").

## 6. Analytics: privacy, cost, cookie-banner implications (India DPDP, GDPR)

### Takeaway
Use a cookieless tool: Cloudflare Web Analytics (free, unlimited, basic), Vercel Web Analytics (free 50K events on Hobby), or Umami Cloud Hobby (free, 100K events, 3 sites); Plausible is excellent but paid ($9+/mo) unless self-hosted. Avoid GA4 on a personal portfolio: under GDPR/ePrivacy it requires prior consent and a banner. India's DPDP Rules (notified Nov 14, 2025) phase in core consent obligations only by May 2027.

### Cited Findings
- Cloudflare Web Analytics is free on all Cloudflare plans; stores no state, so no funnels/user journeys — [Gautam Khorana review](https://gautamkhorana.com/analytics/cloudflare-web-analytics/); [Nuxt Scripts comparison](https://scripts.nuxt.com/learn/privacy-first-analytics-compared)
- Vercel Web Analytics Hobby: 50,000 events/month, shared across projects; 3-day grace then pause — [Vercel docs](https://vercel.com/docs/analytics/limits-and-pricing)
- Umami Cloud Hobby: free forever, 100,000 events/month, 3 websites, 6-month retention; Pro $20/mo for 1M events/20 sites; self-host free (MIT) — [canivibecodeit](https://canivibecodeit.com/umami-cloud); [freetier.co](https://freetier.co/directory/products/umami). Conflict: one comparison claims Umami Cloud's free tier is 1M events/month — [OpenPanel/PkgPulse summaries](https://www.pkgpulse.com/guides/vercel-analytics-vs-plausible-vs-umami-privacy-first-2026); majority of sources say 100K.
- Plausible: cloud from $9/month for 10K pageviews; self-host free under AGPL-3.0; cookieless, positioned as GDPR/CCPA/PECR compliant — [OpenPanel comparison](https://openpanel.dev/articles/self-hosted-web-analytics); [Humblytics](https://humblytics.com/blog/website-analytics-without-cookies-complete-guide-for-2025)
- PostHog Cloud free: 1M analytics events/month, 5,000 session recordings, 1M feature-flag requests, no card required — [Rybbit](https://rybbit.com/blog/posthog-pricing); [Userorbit](https://userorbit.com/blog/posthog-pricing-guide)
- GA4: Consent Mode only adjusts tag behavior after a consent choice; a valid consent mechanism is still required under ePrivacy Art. 5(3) and GDPR Art. 7; using GA4 in the EU requires prior consent for analytics cookies — [Termsbox](https://termsbox.com/blog/ga4-consent-mode); [Usercentrics](https://usercentrics.com/knowledge-hub/google-analytics-and-gdpr-compliance-rulings/)
- India DPDP Rules 2025 notified Nov 14, 2025 with an 18-month phased rollout: Phase 1 (Nov 2025) Rules 1, 2, 17–21 (Data Protection Board); Phase 2 (Nov 2026) Rule 4 (Consent Managers); Phase 3 (May 2027) Rules 3, 5–16, 22–23 — consent notices, security safeguards, breach reporting, retention/erasure — [PIB press release](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190014&reg=3&lang=2); [PIB DPDP Rules PDF](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf); [Sansa Legal timeline](https://www.sansalegal.com/post/dpdp-act-2023-and-rules-2025-phased-implementation-timeline-and-business-compliance-deadlines)

### Inferences
- Pick by host: on Vercel → Vercel Web Analytics (zero setup; 50K events is ample for a student portfolio); on Cloudflare/GitHub Pages → Cloudflare Web Analytics (free, unlimited) or Umami Cloud Hobby if you want custom events (e.g., "Resume downloaded", "Demo clicked"). PostHog is overkill unless a live demo app needs product analytics/session replay.
- With cookieless analytics and no contact-form data retention, a banner is generally unnecessary for EU visitors; a short privacy note ("cookieless, aggregate analytics via X; no personal data stored") is good practice and pre-empts DPDP obligations arriving May 2027.
- If a contact form collects names/emails, that's personal data under both GDPR and DPDP; state the purpose and retention in the privacy note.

### Gaps
- Did not verify whether DPDP Act's exemption for processing by an individual for personal/domestic purposes covers a personal portfolio's analytics/contact form (legal interpretation needed).
- Plausible's current 2026 cloud price tiers not confirmed from plausible.io; Cloudflare Web Analytics site/data-retention limits not confirmed.

## 7. Performance / Core Web Vitals targets and ranking impact (2026)

### Takeaway
Target LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 at the 75th percentile of real users; Google says good CWV don't guarantee top rankings and Mueller calls them "not giant factors" — they're a tie-breaker, but a fast static portfolio passes them easily and it matters for recruiter impressions on mobile.

### Cited Findings
- Thresholds: LCP good ≤ 2.5 s (poor > 4.0 s); INP good ≤ 200 ms (poor > 500 ms); CLS good ≤ 0.1 (poor > 0.25); assessed at 75% of real-user visits — [DEV CWV 2026](https://dev.to/nayankyada/why-core-web-vitals-matter-and-how-i-improve-them-pj3); [Roastweb](https://roastweb.com/blog/core-web-vitals-explained-2026); [Google page experience doc](https://developers.google.com/search/docs/appearance/page-experience)
- Google: good Core Web Vitals results don't guarantee pages rank at the top; Mueller: "Core Web Vitals are not giant factors in ranking"; Splitt: Google shows the most relevant content even if page experience is not best — [Google Search Central: page experience](https://developers.google.com/search/docs/appearance/page-experience); [Search Engine Journal](https://www.searchenginejournal.com/google-good-core-web-vitals-scores-wont-improve-indexing/438290/); [Search Engine Land](https://searchengineland.com/google-updates-its-page-experience-docs-to-clarify-ranking-signals-438346)
- Claim (unverified, single blog): after the March 2026 core update, sites with poor LCP/INP lost 0.8–4 positions on competitive queries; only 47–53% of sites pass all three CWV — [DEV post](https://dev.to/nayankyada/why-core-web-vitals-matter-and-how-i-improve-them-pj3) (treat as anecdotal)

### Inferences
- For a portfolio: static HTML, self-hosted/subset fonts with `font-display: swap`, explicit width/height on images (CLS), AVIF/WebP hero images with `fetchpriority="high"` on the LCP image, minimal client JS (INP). Check in PageSpeed Insights and GSC's CWV report once CrUX data exists (low-traffic sites may never get field data, in which case lab scores are the proxy).
- Since recruiters in India often open links on mid-range Android phones over mobile networks, test with mobile throttling; this has more practical impact than the ranking signal.

### Gaps
- No primary Google data quantifying CWV ranking weight in 2026; the "March 2026 core update" impact claim is unverified.

## 8. Uptime for live demos and cold-start handling

### Takeaway
Monitor each live demo with UptimeRobot free (50 monitors, 5-minute checks) or Better Stack free (10 monitors, 3-minute checks, 1 status page). Free backends like Render spin down after 15 minutes idle with 30–60 s cold starts; either keep one service warm with a pinger (fits within 750 free hours), front demos with a static fallback (video/GIF + "waking up…" state), or host demo backends on platforms without sleep.

### Cited Findings
- UptimeRobot free: 50 monitors at 5-minute intervals — [Better Stack vs UptimeRobot](https://betterstack.com/community/comparisons/better-stack-vs-uptimerobot/); [Visual Sentinel](https://visualsentinel.com/blog/uptimerobot-free-plan-features-limits-hidden-costs)
- Better Stack free: 10 monitors with 3-minute checks and 1 status page — [Better Stack comparison](https://betterstack.com/community/comparisons/better-stack-vs-uptimerobot/); [Domain Monitor](https://domain-monitor.io/blog/uptimerobot-vs-better-stack/)
- Render free web services (512 MB RAM, 0.1 CPU) spin down after 15 minutes without traffic (previously 30); 750 free instance hours per workspace/month; first request after idle takes ~30–60 s — [agentdeals Render](https://agentdeals.dev/vendor/render); [livemy.app](https://livemy.app/blog/render-pricing); [justinmckelvey.com](https://justinmckelvey.com/blog/is-render-free)
- Pinging every <15 minutes keeps a Render free service awake but consumes the 750 free hours — [Odown](https://odown.com/blog/how-to-keep-a-render-free-service-from-sleeping/); [livemy.app](https://livemy.app/blog/free-hosting-that-doesnt-sleep)

### Inferences
- 750 hours ≥ 744 hours in a 31-day month, so exactly one always-on Render free service is feasible; two or more will exhaust the pool.
- A UptimeRobot 5-minute monitor doubles as the keep-alive pinger and as the alert when a demo breaks before an interview.
- UX pattern for cold-start demos: link the demo from a static project page that shows a screenshot/video and a note ("API on free tier — first load may take ~45 s"), and fire a background warm-up `fetch()` to the API when the project page loads.
- Prefer static/edge deployments for demos where possible (Cloudflare Workers, Vercel functions) — they have no multi-second cold start like sleeping containers.

### Gaps
- Could not verify whether UptimeRobot changed its free plan to non-commercial-only or altered limits in 2025–2026, or whether Render's ToS discourages keep-alive pinging.
- Hugging Face Spaces / Fly.io / Railway free-tier sleep behavior in 2026 not researched (search returned nothing specific).
