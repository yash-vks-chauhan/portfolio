# Turn Yash's Portfolio Into Inspectable Evidence

The 2026 best practice for an AI/ML and software-engineering new grad is a fast, plain, writing-first site where every claim can be checked. Hiring teams buried in AI-polished applications now trust **verifiable evidence of judgment** more than presentation. For Yash Chauhan, that means two layers. The first is a homepage that passes a ten-second recruiter skim: role, 2027 graduation, three proof points, resume and contacts. Under it sit three or four deep case studies (GlassBox, Pulse, Gridee and the IIT Madras research), each written like a design doc with evals, trade-offs, limitations, and a note on where he overrode AI tools.

The biggest risk is not design or stack but **overclaiming**. Several claims must be fixed before launch:

- the Autoscaler "SHAP" and LSTM;
- the bare "183-question benchmark";
- any "tamper-proof" wording for the hash chain;
- the CT denoising gain quoted without its noise condition;
- any public naming of the DELCON paper while it is under double-blind review.

His existing look (warm paper, Source Serif 4, Geist and Geist Mono, navy) is the same design language as GlassBox. It is already on-trend and credible, so he should refine it rather than replace it. The dark "mission control" style of his GitHub README can come in as one metrics module. He should avoid 3D, terminal cosplay and template clones.

Astro 7 fits a content site with a few React islands better than Next.js. But recruiters don't judge frameworks, so Next.js 16 is a defensible pick if shipping speed matters more. Either way, the infrastructure costs about as much as the domain:

- static hosting on Cloudflare;
- a .dev domain at roughly $12 a year;
- cookieless analytics;
- Person/ProfilePage structured data;
- AI crawlers explicitly allowed.

One caveat runs through all of this. No 2024–2026 study measures how recruiters actually use portfolio sites. These recommendations rest on 2026 hiring surveys, practitioner consensus and platform documentation, not controlled outcome data.

## Hiring teams in 2026 reward verifiable judgment over polish

Yash is entering a market that is narrow at the top and noisy everywhere. New grads fell to about **7% of Big Tech hires, down from roughly 15%**, and new-grad hiring at the 15 largest tech companies is down more than 50% since 2019 ([SignalFire](https://www.signalfire.com/blog/signalfire-state-of-talent-report-2025)). AI has also made applications cheaper to produce and harder to trust:

- **67% of US HR leaders say reviewing AI-generated applications has slowed hiring** ([Robert Half](https://press.roberthalf.com/2026-03-10-Robert-Half-survey-67-of-HR-leaders-report-AI-generated-applications-are-slowing-hiring)).
- Gartner predicts **one in four candidate profiles worldwide will be fake by 2028** ([Gartner](https://www.gartner.com/en/newsroom/press-releases/2025-07-31-gartner-survey-shows-just-26-percent-of-job-applicants-trust-ai-will-fairly-evaluate-them)).
- In the Pragmatic Engineer's 2026 interviews with 50+ hiring managers, AI-enhanced resumes "read as incredible" but disappoint afterwards, and **some companies have stopped reading inbound applications at all** ([Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/tech-jobs-market-in-2026-part-3-hiring)).

The same reporting has good news for Yash's target: the market for AI engineering, ML and forward-deployed engineering roles is "incredible", though mostly in the US.

What hiring teams trust instead is visible judgment. CoderPad's 2026 survey of 650+ participants found that **69% of recruiters use resume review to assess technical talent, but only 16% think it predicts performance** ([CoderPad](https://coderpad.io/survey-reports/coderpad-state-of-tech-hiring-2026/)). When candidates may use AI, hiring teams name these as the signals of real skill:

| Signal | Share of hiring teams |
|---|---|
| Catches and fixes AI mistakes | **66%** |
| Explains trade-offs and correctness | **56%** |
| Improves AI output through iteration | 28% |
| Handles edge cases | 28% |
| Considers security and privacy | 25% |

Karat surveyed 400 engineering leaders in the US, India and China in January 2026. **71% said AI makes technical skills harder to assess**, and Karat names judgment as the trait that now matters: knowing when to trust, improve or reject AI-generated code ([Karat](https://karat.com/engineering-interview-trends-2026/)). The engineers who will review Yash's work are sceptical too: **46% of Stack Overflow's 2025 respondents distrust the accuracy of AI output**, up from 31% a year earlier ([Stack Overflow](https://survey.stackoverflow.co/2025/)). Each of these signals maps to a section a case study can contain. So in 2026 a portfolio works less like a gallery and more like an evidence file.

For AI/ML roles, engineering still comes first. Chip Huyen's interviews with companies (pre-2024) found that hiring managers prefer **strong software engineers with little ML knowledge over ML experts**, because production practice is harder to teach ([Chip Huyen](https://huyenchip.com/ml-interviews-book/)). Hamel Husain advises teams to hire people who can build applications first, and to add ML specialists only once there is production data to work with ([Buteau on Husain](https://www.antoinebuteau.com/lessons-from-hamel-husain/)). On practitioner forums, papers are described as decisive for research teams and marginal for applied ones ([Taro](https://www.jointaro.com/question/YqrpDDCPbsGpg0lwrKXY/looking-to-transition-to-ml-engineer-what-do-you-want-to-know/)). Yash should position himself as an AI/ML engineer who ships inspectable systems, which is his own GitHub thesis, and present the research as proof of rigour rather than as the headline.

### The homepage must survive a ten-second skim and reward a five-minute audit

The closest available proxy for portfolio attention is Ladders' eye-tracking study. Recruiters spent **7.4 seconds** on a resume's first scan, and clear headings held attention longer. That study is from 2018 and tracked only 30 recruiters ([HR Dive](https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/)). The practical reading is a two-stage funnel: a recruiter skims in seconds, then an engineer opens one or two projects for a few minutes if Yash is shortlisted. The site has to serve both.

Above the fold, the page should contain:

- an H1 with his full name;
- a positioning line, e.g. "AI/ML and software engineer turning model demos into inspectable systems";
- "B.Tech CSE (AI/ML), [university], graduating [month] 2027";
- an availability line covering India on-site/hybrid, remote and relocation;
- three proof points: "co-founded Gridee, 8k+ Android + iOS downloads", "research intern, IIT Madras (manuscript under review)", and "GlassBox: cited-or-refused answers, 254 tests, CI/CD to AWS";
- buttons for Resume (PDF), email, GitHub, LinkedIn and Google Scholar or ORCID.

The resume should sit at a stable `/resume.pdf` URL so links in old applications keep working. It should be text-based and carry a "last updated" month. Clickable links get followed far more often than URLs a reviewer has to copy and paste ([The Muse](https://themuse.com/advice/include-links-job-application-resume-cover-letter)). Email should be a visible `mailto:` link, not only a form. A phone number belongs on the PDF, not in scrapeable HTML. A small headshot on the site is optional, but US-bound resumes should drop the photo, date of birth and similar details ([ResumeVera](https://resumevera.com/in/blogs/cv-vs-resume-us-uk-india-2026)). Nothing should be password-protected ([Blind](https://www.teamblind.com/post/is-pw-protection-driving-recruiters-away-mep7yi3h)).

The cheapest defence against the fake-candidate suspicion in Gartner's numbers is identity consistency. That means the same name string, headshot, handle and project list across the site, GitHub, LinkedIn and the resume. This is an inference, not a measured effect.

### Campus placements, Indian startups and global roles read the site differently

**On campus in India**, hiring for the 2027 batch runs mainly through online assessments and coding rounds, so the portfolio rarely moves cut-offs. It can still tip an interview panel. The PDF on the site must match the placement-cell version exactly.

**Indian startups, global capability centres (GCCs) and AI-first companies** increasingly screen on projects. LinkedIn data shows **entry-level hiring in India rose 168% between 2023 and 2025**, with AI Specialist and Generative AI Engineer among the fastest-growing fresher roles ([People Matters](https://www.peoplematters.in/news/strategic-hr/entry-level-hiring-climbs-168percent-as-ai-roles-and-internships-gain-ground-linkedin-49290)). Wellfound and Cutshort surface candidates by their GitHub and project work, so the portfolio URL belongs on both ([FACE Prep](https://faceprep.in/article/off-campus-ai-engineering-roles-for-freshers-2026-the-6-platform-map/)).

**For international roles**, Yash has no US degree or employer brand, and inbound applications are distrusted. There the site does its best work as the link inside a referral, a cold email to a hiring manager, an open-source contribution or a Hacker News "Who wants to be hired?" post. To make it readable to a global reviewer:

- spell out "B.Tech CSE (AI/ML)";
- write "IIT Madras" in full and name the lab or professor;
- state work-authorisation and relocation preferences, and time-zone overlap for remote roles.

## Lead with three inspectable systems and make every number checkable

The heuristic most hiring guides repeat is **3–5 deep projects rather than many shallow ones**. It is consensus, not measured data ([hakia](https://hakia.com/skills/building-portfolio/)). The ML practitioners whose sites hiring managers cite run writing-first pages rather than card grids. Eugene Yan routes readers through a curated "Start here" page ([Eugene Yan](https://eugeneyan.com/start-here/)), and swyx calls the ML version of a portfolio a "blogfolio" ([swyx](https://x.com/swyx/status/1523042219623477248?lang=en)).

Yan's open ML design-doc template gives a ready-made project structure ([eugeneyan/ml-design-docs](https://github.com/eugeneyan/ml-design-docs)):

- overview and motivation;
- success metrics;
- constraints;
- methodology, including how the approach is validated offline;
- implementation, including monitoring, cost and risks;
- alternatives considered.

For Yash's projects, the lineup should look like this:

| Tier | Project | Lead with the guarantee | Evidence to add |
|---|---|---|---|
| Flagship | **GlassBox** | Every answer is either cited or refused, and every decision lands in a per-tenant hash-chained log | Per-category pass rates with confidence intervals, refusal hit rate and over-refusal rate, a table of failure types with counts, a one-command reproduce, an audit-verify command, a linked passing CI run |
| Flagship | **Pulse** | Natural language compiles to a validated DSL, so the LLM never touches SQL or PII | Trust-boundary diagram, DSL schema, % of queries compiled and % rejected on adversarial prompts, a test showing a duplicate webhook produces a single receipt, the 1k-message chaos result, excerpts from AI_WORKFLOW.md |
| Flagship | **Gridee** | Real users: 8k+ Android + iOS downloads of an app he co-founded | Play Store and App Store links, date range, downloads vs active users, exactly which parts he built |
| Flagship | **Research** (IIT Madras EMS; DCI) | Rigour on real-world data | Pipeline diagram, validation design, aggregate metrics against baselines, all within the data-owner's permissions |
| More work | **Autoscaler** | Guarded self-healing: dry-run, cooldown, circuit breaker, approval gate | Tests on the safety rails, failover triggers and per-tier latency, a recorded chaos run, linked architecture decision records. Relabel the LSTM and "SHAP" first. |
| More work | **Kalakraft** | A self-run security audit that found and fixed critical issues | An audit write-up; tidy the repo before linking it |
| More work | **CT U-Net** | A learning project with honest metrics | Baselines, a noise-level curve, a before/after slider |

Each flagship page should follow one template:

- a TL;DR card with the headline result and its caveat in the same sentence;
- problem and users;
- constraints;
- one architecture diagram;
- two to four key decisions, each with the alternative he rejected;
- results with the measurement method;
- evaluation and testing;
- what broke;
- what he would do differently;
- a short note on AI-tool use.

The decisions section can quote architecture decision records (ADRs). Michael Nygard's format (status, context, decision, consequences) shows reasoning in a few lines, and Autoscaler already has ADRs to link ([ADR GitHub org](https://github.com/architecture-decision-record/architecture-decision-record)). Every flagship README should mirror its case study, so an engineer who lands on GitHub first gets the same story.

### Evals carry GlassBox's credibility, so present them the way practitioners do

Husain reports that **60–80% of development time** on his LLM projects went to error analysis and evaluation ([Hamel Husain](https://hamel.dev/blog/posts/evals/index.html)). The Husain–Shankar evals FAQ gives the conventions an informed reviewer will look for ([evals FAQ](https://hamel.dev/blog/posts/evals-faq/); [GitHub mirror](https://github.com/sratomun/agentic-ai-kb/blob/main/raw/blogs/2026-01-15-husain-evals-faq.md)):

- generate synthetic data across explicit dimensions, not with a naive "give me 50 queries" prompt;
- define failure modes specific to the application instead of using generic metrics;
- use binary pass/fail judgments rather than 1–5 scales;
- put Wilson confidence intervals on failure rates;
- treat any LLM judge as a classifier: validate it against human labels and report its true-positive and true-negative rates.

Applied to GlassBox, this changes how the numbers are written:

- **Name the benchmark accurately.** Call it "183 author-written synthetic questions", say which categories they cover, and say whether any were held out while he tuned prompts. If none were, call it a development set, not a test set.
- **Give per-category pass rates with intervals.** A 90% pass rate on all 183 questions has a 95% Wilson interval of about **84.8–93.6%**, but the same 90% on a 20-question category spans about **70–97%**. A single headline number hides that spread.
- **Report refusals as two numbers.** One is the share of should-refuse questions correctly refused; the other is the over-refusal rate on questions that should have been answered.
- **Show what failed.** A short table of failure types with counts (for example, "cited a source that doesn't support the claim: n/183") reads as more senior than any single score.
- **Break down the 254 tests.** List unit, integration and eval-regression counts and link a passing CI run; the bare count is a weak signal.

Short model and data cards will also help. The Hugging Face model-card template ([Hugging Face](https://github.com/huggingface/huggingface_hub/blob/main/src/huggingface_hub/templates/modelcard_template.md)) and Mitchell et al.'s original model-card paper ([arXiv](https://arxiv.org/pdf/1810.03993)) supply the headings:

- intended use and out-of-scope use (for the CT model, "not for clinical use");
- evaluation data;
- limitations.

There is also no external leaderboard to lean on any more: Papers with Code was shut down on **24 July 2025** ([Coursera](https://www.coursera.org/articles/papers-with-code)). His own reproducible eval reports are the credibility signal.

Pulse holds the most under-used asset in the whole portfolio: **AI_WORKFLOW.md**, his log of directing and correcting Claude Code. It speaks directly to the top CoderPad signal, catching and fixing AI mistakes (66%). Two or three concrete corrections should be lifted onto the Pulse page, for example a bug the AI introduced that he caught, or a design it proposed that he rejected and why. A short site-wide "How I work with AI tools" note should link to them. The page should also say Pulse was built for the Xeno internship assignment, so its provenance is transparent and matches what an interviewer may already know. He should check that the assignment's terms allow public posting.

### Six claims to rewrite before anyone clicks

Red-flag lists for AI case studies repeat the same failures:

- improvements with no baseline;
- unverifiable "production" claims;
- missing limitations;
- mislabelled techniques ([Learnist](https://www.learnist.org/ai-case-study-red-flags-portfolio-2026/));
- polished projects the candidate can't explain, with no testing or error handling ([Abbacus](https://www.abbacustechnologies.com/how-to-hire-an-ai-developer-in-2026-portfolio-red-flags-and-technical-must-haves/)).

A reviewer who finds one stub described as working will discount everything else. These are the ones to fix:

| Current claim | Why it fails inspection | Safer phrasing |
|---|---|---|
| Autoscaler "SHAP explanations" | SHAP means Shapley-value attributions ([Lundberg & Lee](https://arxiv.org/abs/1705.07874)); a hand-weighted helper is not SHAP | "Heuristic weighted feature attribution." Use "SHAP" only where a SHAP explainer actually runs. |
| Autoscaler "LSTM forecasting" | It is a placeholder; anyone opening the code finds the stub | "Forecasting interface defined; LSTM not yet implemented." Draw it dashed in diagrams and leave it out of tech-stack badges. |
| GlassBox "183-question benchmark" | Implies an external, independent benchmark | "183 author-written synthetic questions across [categories]; development set" |
| Any "tamper-proof audit trail" wording | A hash chain makes tampering *detectable*, not impossible, unless the chain head is anchored outside the system | "Tamper-evident, per-tenant hash-chained audit log," plus the verify command |
| CT U-Net "+12.2 dB PSNR" | The noise is extreme and synthetic (6.1 dB input), SSIM 0.29 is still far from clean, and no baseline is given | "+12.2 dB PSNR (6.1 → ~18.3 dB) on heavy synthetic noise; SSIM 0.29; learning project, not clinically validated." Add Gaussian, non-local-means or BM3D baselines. |
| "254 tests", "CI/CD to AWS", "IEEE paper" | Counts without composition; "production" without users; a submission is not a publication | Break down the test types and link a run; name exactly what is automated; write "manuscript under review" |

For the CT project, the realistic next step is low-dose noise simulation: Poisson noise in the sinogram plus electronic noise, or the Mayo/AAPM Low-Dose CT data, which the literature treats as the standard benchmark ([CT-Denoising-Review](https://github.com/SSinyu/CT-Denoising-Review/blob/master/README.md)). Autoscaler is a self-healing system with no tests, which contradicts the "inspectable systems" thesis. It should get tests on its safety rails before it is featured, or move to "more work" with an "in progress" label.

Kalakraft's repo is cluttered, and repo names, organisation and READMEs shape first impressions before anyone reads code ([SOLTECH](https://soltech.net/what-do-hiring-managers-actually-look-for-in-a-github-portfolio/)). Its strongest story is the security audit, which speaks to the 25% of hiring teams who look for security and privacy awareness. Link the audit write-up, not the raw repo, until the repo is cleaned.

### Papers under review need the most conservative wording on the site

IEEE DELCON 2026 is held 19–21 November 2026 and had a 31 July submission deadline. Its submission guidelines say:

- the review is strictly double-blind;
- manuscripts must not reveal author identity "directly or indirectly";
- papers with the same title and abstract must not be posted to public repositories or mailing lists until review is complete ([DELCON 2026](https://www.bits-pilani.ac.in/delcon2026/submission-guidelines/)).

Whether a personal website counts is not stated. Treating it as covered is an inference, but the safe one.

Until the decision, the site should list the DCI work under a separate **"Manuscripts under review"** heading. A suitable entry is "manuscript under double-blind review at an IEEE conference (2026): explainable ML for a circularity index", with no title, abstract, PDF or repo. The notification date could not be confirmed, so he should check the conference's EDAS submission system now.

- **If accepted:** switch to "Accepted, IEEE DELCON 2026 (to appear)" and post the accepted version only with IEEE's copyright notice. After publication, link the DOI ([IEEE preprint policy](https://cis.ieee.org/images/files/Publications/IEEE_Preprint_Policy.pdf)).
- **If rejected:** drop the venue name entirely.

Never list a submission under "Publications". CV norms keep "under review" in its own clearly labelled section ([Daily Nous](https://dailynous.com/2026/02/17/cv-dos-and-donts/)).

The IIT Madras EMS manuscript has two constraints on top of each other. The first is its venue's anonymity policy, which varies widely: ACL Rolling Review, for instance, allows preprints at any time ([ARR](http://aclrollingreview.org/anonymity/)). The second is the data-use agreement.

The usual NDA guidance comes from UX portfolios, not ML, so its fit here is an inference. It says the problem, role, process, decisions and anonymised outcomes are generally shareable, but exact figures and real data need written permission ([Open Doors Careers](https://blog.opendoorscareers.com/p/what-you-can-and-can-t-show-navigating-ndas-in-your-portfolio)). He should confirm with the PI whether the 3.6M-record count, the geography and the institution name can appear publicly. If not, "a multi-million-record EMS dispatch dataset under a data-use agreement" works.

A companion repo that runs the pipeline on a clearly labelled synthetic dataset with the same schema lets reviewers reproduce the method without seeing the data. Once papers are public, Google Scholar and ORCID profiles become authoritative identity links for the site.

### Demos must assume the reviewer hits a cold start

Free hosting sleeps. Free CPU Spaces on Hugging Face pause after **48 hours of inactivity** ([Hugging Face docs](https://huggingface.co/docs/huggingface_hub/en/guides/manage-spaces)), and third-party reports put their wake-up time at roughly 30–90 seconds. Render's free services spin down after **15 minutes** idle and take about 30–60 seconds to wake ([AgentDeals](https://agentdeals.dev/vendor/render)). Render gives 750 free hours a month, which covers exactly one always-on service. UptimeRobot's free plan offers 50 monitors at 5-minute intervals ([Better Stack comparison](https://betterstack.com/community/comparisons/better-stack-vs-uptimerobot/)), so one monitor can keep a demo warm and alert him if it breaks before an interview.

Every project should therefore offer its demo in layers:

1. a silent GIF or still at the top;
2. a captioned 90-second walkthrough video;
3. a "try live" link that sets expectations, e.g. "may take ~45 s to wake";
4. annotated screenshots of the key screens.

Terminal demos for READMEs can be recorded with asciinema and converted with agg ([César Soto Valero](https://www.cesarsotovalero.net/blog/enhance-your-readme-with-asciinema.html)). Per project:

- **GlassBox** needs a canned-example mode plus per-IP rate limits, so a reviewer sees cited answers and refusals without spending API tokens. Replaying cached traces in the browser is the most resilient option.
- **Autoscaler** is more convincing as a recorded chaos run (fault injected, anomaly detected, root cause analysed, remediation applied, with timestamps) plus a one-command local reproduction on kind or k3d, rather than a fragile hosted cluster.
- **The CT model** fits a Hugging Face Space, with a static before/after gallery as the fallback.

Diagrams should use Mermaid in READMEs, which renders natively on GitHub, and D2 or hand-tuned SVG on the site, where layout quality matters ([InfraSketch](https://infrasketch.net/blog/best-diagram-as-code-tools-2026)). The Pulse diagram should draw the trust boundary as a dashed line. The Autoscaler diagram should label each failover edge with its trigger.

## Keep the warm-paper editorial look; borrow restraint, not spectacle

Yash's current style already matches the 2026 pattern credible sites use:

- warm paper background;
- Source Serif 4 display headings;
- Geist and Geist Mono, with letter-spaced uppercase micro-labels;
- a deep navy accent.

Trend writing describes serif headings paired with monospace "utility" type for metadata ([FontAlternatives](https://fontalternatives.com/blog/text-serifs-comeback-2026/)), and "unbleached" warm neutrals replacing pure white ([Kontra](https://kontra.agency/top-web-design-trends-for-2026/)). These are marketing-blog sources, so treat them as directional. The most credible ML sites, Karpathy, Lilian Weng and Eugene Yan, earn their authority with plain, fast pages ([Lil'Log](https://lilianweng.github.io/posts/2025-05-01-thinking/); [karpathy.ai](https://karpathy.ai)). Because GlassBox uses the same visual system, the portfolio and his flagship product will read as one author's work. He should refine the style, not pivot away from it.

| Reference | What to borrow |
|---|---|
| Steph Ango's Flexoki | A warm paper-and-ink palette calibrated for both light and dark modes ([Flexoki](https://stephango.com/flexoki)) |
| Lilian Weng, Eugene Yan, Karpathy | Dated long-form writing, diagrams with maths, a "Start here" path, plain fast pages |
| Maggie Appleton | Editorial "garden" structure, growth-stage labels, hover previews. Built on Astro + MDX, but she asks people not to fork it ([GitHub](https://github.com/MaggieAppleton/maggieappleton.com-V3)) |
| Lee Robinson, Paco Coursey | Restraint: "Pick one or two font sizes. Use only a few grays. Add color sparingly" ([Lee Robinson](https://x.com/leerob/status/1988358640449867985)); view transitions as the only motion ([Substack](https://leerob.substack.com/p/summer-2024)) |
| Emil Kowalski, Rauno Freiberg | A single signature micro-interaction that shows craft ([Emil Kowalski](https://emilkowal.ski/ui/great-animations)) |
| **Avoid:** Brittany Chiang clones; Bruno Simon / Henry Heffernan-style 3D | Chiang's v4 has 8.3k stars and is cloned so widely it reads as a template ([GitHub](https://github.com/bchiang7/v4)). Bruno Simon's 2025 WebGPU folio documents no accessibility or non-3D fallback ([GitHub](https://github.com/brunosimon/folio-2025)). |

For a mood board, use Minimal Gallery, SiteInspire and designengineer.fyi's personal-site collections. Awwwards and Godly favour agency showpieces, so use them only to pick out single interactions. Read.cv, once the go-to "clean CV" look, has shut down; all data was gone by **16 May 2025** ([Neowin](https://www.neowin.net/news/readcv-announces-acquisition-by-perplexity-as-it-begins-winding-down-operations/)). Its style now survives mostly in templates.

On current trends:

| Trend | Verdict |
|---|---|
| Serif + mono metadata, warm neutrals | **Keep.** Add a dark theme that is designed, not just inverted. |
| Bento grid | At most one "at a glance" block |
| ⌘K command palette | Optional; never the only way to navigate |
| Terminal boot sequences, Matrix rain | **Avoid.** A common trope that delays access to content. |
| Site-wide 3D/WebGPU | **Avoid.** It excludes modest devices and hurts load speed and SEO ([Utsubo](https://www.utsubo.com/blog/webgl-three-js-site-seo-rankable-guide)). A contained demo inside a case study is fine. |
| Glassmorphism, heavy blur | Avoid |

The GitHub README's "mission control" style can carry over as **one instrument-panel module**. It would be a Geist Mono readout with tabular numerals and thin rules on the paper background, showing figures like the GlassBox pass rate with its confidence interval, the test count and Gridee's installs. That links the two identities without a dark terminal theme.

### Typography, motion and accessibility follow from that identity

The font stack needs no change. Geist and Source Serif 4 are both under the SIL Open Font License, which allows free use, embedding and modification ([Geist](https://github.com/vercel/geist-font); [Source Serif](https://en.wikipedia.org/wiki/Source_Serif)). Source Serif 4 has an **optical-size axis from 8 to 60**: use a high value for headlines and a low one for captions. Font loading should follow a few rules:

- load at most three families, as variable files subset to Latin (subsetting cut Inter from about 100 KB to about 30 KB);
- preload the hero serif, which will likely be the largest element on screen and so the page's Largest Contentful Paint (LCP) measure;
- match fallback-font metrics so the headline doesn't shift when the web font arrives ([web.dev](https://web.dev/articles/font-best-practices)).

Paying for Berkeley Mono adds nothing that Geist Mono doesn't already give.

Motion should be CSS-first:

- **Page transitions:** same-document View Transitions became Baseline on **14 October 2025** when Firefox 144 shipped them. Cross-document transitions work in Chrome 126+ and Safari 18.2+, and Firefox falls back to a normal navigation ([CSS-Tricks](https://css-tricks.com/cross-document-view-transitions-part-1/)).
- **Scroll-driven animation:** it shipped in Safari 26 but is still behind a flag in Firefox stable, so wrap it in `@supports` ([WebKit](https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/)).
- **A suggested budget** (inferred, not a published standard): no intro loaders; animate only transform and opacity; about 150–250 ms for UI feedback and 200–350 ms for page transitions.
- **Animation libraries** only on pages that need them. Motion's full component costs about 34 kB against about 4.6 kB with LazyMotion ([Motion](https://motion.dev/docs/react-reduce-bundle-size)). GSAP has been entirely free since **30 April 2025** ([CSS-Tricks](https://css-tricks.com/gsap-is-now-completely-free-even-for-commercial-use/)), but its split-text headline effects read as "agency", not "engineer".
- **Reduced motion:** under `prefers-reduced-motion`, replace movement with fades rather than removing feedback ([W3C](https://w3.org/WAI/WCAG21/Understanding/animation-from-interactions)). Any autoplaying clip needs a pause control.

WCAG 2.2 AA adds two checks that touch his style directly ([Deque](https://dequeuniversity.com/resources/wcag-2.2/)):

- small icon links and the theme toggle need **24×24 px** targets or enough spacing around them;
- a sticky header must not fully hide focused elements.

The main contrast risk is the micro-labels. At 10–12 px they count as normal text and need **4.5:1** ([WebAIM](https://webaim.org/articles/contrast/)). These figures were computed with the WCAG formula on an illustrative #FAF8F3 paper colour, since his exact tokens were not available:

| Colour | Contrast on paper | Passes for small text? |
|---|---|---|
| #6B6B6B grey | ~5.0:1 | Yes |
| #8A8A8A grey | ~3.25:1 | No |
| #1E2A4A navy | ~13.3:1 | Yes |

The dark theme needs a lighter accent, such as a pale blue, because navy on near-black fails. Body links should be underlined.

Core Web Vitals targets are LCP ≤ 2.5 s, Interaction to Next Paint (INP) ≤ 200 ms and Cumulative Layout Shift (CLS) ≤ 0.1, measured at the 75th percentile of real visits ([web.dev](https://web.dev/articles/vitals)). Test on a throttled mid-range Android phone. Google's often-cited figure that **53% of mobile visits are abandoned beyond 3 seconds** is dated (2016), describes general users rather than recruiters, and is disputed ([Marketing Dive](https://www.marketingdive.com/news/google-53-of-mobile-users-abandon-sites-that-take-over-3-seconds-to-load/426070/)).

On case-study pages:

- a serif title with a one-sentence outcome;
- a Geist Mono spec strip (ROLE · STACK · DATA · COMPUTE · YEAR);
- metric callouts that each show their baseline;
- for the CT project, a keyboard-operable before/after slider such as img-comparison-slider ([sneas](https://img-comparison-slider.sneas.io/));
- plain, captioned screenshots rather than glossy device mockups. No source compares the two; captioned figures simply read as more rigorous for ML work.

## Astro 7 fits the content; Next.js 16 fits the muscle memory

As of 3 October 2026:

- **Next.js 16.3.8** is current. The 16.x line has been stable since October 2025, and there is no version 17 ([npm](https://registry.npmjs.org/next)). Its multi-host Adapter API became stable in 16.2 in March 2026 ([Next.js](https://nextjs.org/blog/nextjs-across-platforms)).
- **Astro is at 7.3.5** after two major versions this year, 6.0 in March and 7.0 in June ([npm](https://registry.npmjs.org/astro)). Its MDX integration went through four majors in 2026 ([npm](https://registry.npmjs.org/@astrojs/mdx)).
- **Cloudflare acquired the Astro team in January 2026.** Astro stays MIT-licensed and committed to deploying on any host ([Astro](https://astro.build/blog/joining-cloudflare/)).

Every comparison finds Astro ships far less JavaScript by default. Published field pass rates for Core Web Vitals conflict, however: secondary sources give Astro 48% in one place and 66% in another. They are also skewed by which kinds of sites use each framework, so no specific figure should be trusted. Both frameworks can reach Lighthouse 95+; Astro gets there with less effort ([PkgPulse](https://www.pkgpulse.com/guides/astro-vs-nextjs-2026)).

The real differences are in content tooling.

**Astro** has typed content collections built in. But Astro 7's new Rust Markdown engine, Sätteri, **does not run remark or rehype plugins**, and the docs say there is "no direct adaptation path". A site that needs KaTeX for maths must switch back to the older remark pipeline ([Toru Iwasa](https://toruiwasa.com/blog/is-satteri-worth-adopting-astro-7s-rust-markdown-engine/)).

**Next.js**'s MDX ecosystem has fragmented:

- Contentlayer is abandoned ([Wisp](https://www.wisp.blog/blog/contentlayer-has-been-abandoned-what-are-the-alternatives));
- `next-mdx-remote` was archived on **9 April 2026** ([GitHub](https://github.com/hashicorp/next-mdx-remote));
- the maintained options, Velite and content-collections, are both pre-1.0 ([Velite](https://velite.js.org/guide/introduction));
- a fully static Next.js export loses default `next/image` optimisation ([GitHub discussion](https://github.com/vercel/next.js/discussions/60977)).

Recruiters do not judge the framework. One 2026 guide says "a static site built with Next.js, Astro, or even plain HTML/CSS is acceptable", provided it loads in under two seconds ([DEV](https://dev.to/__be2942592/how-to-build-a-developer-portfolio-that-actually-gets-you-hired-2026-6kn)). Next.js is the label recruiters recognise ([daily.dev Recruiter](https://recruiter.daily.dev/stacks/astro/)), but Yash's shipped Next.js 16 apps already carry that signal. Developers, meanwhile, rate Astro highest among meta-frameworks for satisfaction. Next.js satisfaction fell from **68% to 55%** in State of JS 2025 ([State of JS](https://2025.stateofjs.com/en-US/libraries/meta-frameworks/)).

| Factor | Astro 7.3 | Next.js 16.3 |
|---|---|---|
| JavaScript on a text-only case study | Near zero; React islands hydrate only where placed | React runtime and router on every page |
| Typed MDX frontmatter | Built in (content collections with Zod schemas) | Third-party layer (Velite or content-collections, both pre-1.0) |
| Maths with KaTeX | Must re-enable the remark pipeline under Sätteri | `rehype-katex`, with plugin names passed as strings under the Turbopack bundler |
| shadcn/ui | Static components in `.astro`; interactive ones as `client:*` islands | Native |
| Global ⌘K palette | Pulls React onto every page unless lazy-loaded | No extra cost |
| 2026 churn | Two majors plus four MDX majors; pin versions | One stable major line |
| Ramp-up for Yash | `.astro` syntax, client directives, shared state across islands | None |

**Recommendation: Astro 7, pinned to 7.3.x**, with:

- `@astrojs/react`;
- Tailwind 4;
- shadcn components only inside the few interactive islands: the CT slider, the GlassBox trace replay and any charts;
- MDX collections with the remark pipeline kept on for KaTeX and code highlighting;
- static output;
- no command palette, or one that loads on the first keypress.

A content-first site whose case-study pages ship no JavaScript fits the "inspectable" thesis. "Right tool for a content site" is also a small engineering-judgment story for the README.

**Choose Next.js 16 static-first instead** in either of two cases. One is that the site must go live within days and a weekend of Astro ramp-up isn't available during placement season. The other is that he expects server features within 6–12 months: request-time preview images, server actions, or authenticated sections.

Whichever he picks, he should not fork a heavily styled template:

- Tailwind Plus Spotlight is commercially licensed ([Tailwind Plus](https://tailwindcss.com/plus/templates/spotlight));
- Once UI's Magic Portfolio is CC BY-NC 4.0, so no commercial use ([GitHub](https://github.com/once-ui-system/magic-portfolio/blob/main/LICENSE));
- MIT-licensed AstroPaper is a fine source of content patterns ([GitHub](https://github.com/satnaing/astro-paper)).

Make the repo public only if it is clean: typed schemas, and CI running lint, type-checks, Lighthouse CI and a link checker. Then it works as one more code sample.

## Roughly $12 a year covers hosting, domain, SEO and analytics

**Hosting.** Cloudflare Workers with static assets serves static requests **free and without limit** on all plans ([Cloudflare](https://developers.cloudflare.com/workers/platform/pricing/)). Cloudflare is steering new projects there from Pages ([Bejamas](https://bejamas.com/stack/hosting/cloudflare)). The alternatives:

- **GitHub Pages** is a solid fallback: 1 GB per site, a soft 100 GB/month bandwidth limit, and throttling rather than bills if exceeded ([GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)).
- **Vercel Hobby** is contractually "non-commercial, personal use only". A portfolio is fine, but a paid rate card is a grey area ([Vercel](https://vercel.com/docs/plans/hobby)).
- **Netlify**'s free plan is now 300 credits a month at 15 credits per production deploy, so **about 20 deploys exhaust it** before any traffic ([Supadrop](https://supadrop.host/blog/netlify-pricing-free-tier-limits/)).
- **AWS Amplify**'s new credit-based free plan lasts only six months and is overkill ([AWS](https://aws.amazon.com/about-aws/whats-new/2025/07/aws-free-tier-credits-month-free-plan/)).

One Cloudflare gotcha matters for discoverability. **Since 1 July 2025, new Cloudflare domains block known AI crawlers by default** ([MIT Technology Review](https://www.technologyreview.com/2025/07/01/1119498/cloudflare-will-now-by-default-block-ai-bots-from-crawling-its-clients-websites/)). He must switch that off.

**Domain.** The main options:

| Extension | Price | Notes |
|---|---|---|
| `.dev` | $8.75 first year, $12.87 renewal at Porkbun ([Best Domain Registrars](https://www.best-domain-registrars.com/registrars/porkbun/pricing/)) | Signals "developer"; HTTPS-only by design, which is a non-issue with free certificates ([Wikipedia](https://en.wikipedia.org/wiki/.dev)) |
| `.com` | $10.44 at cost on Cloudflare | Rises after Verisign's wholesale increase on 1 Nov 2026 ($10.26 → $10.97), with three more 7% rises allowed through 2029 ([Domain Name Wire](https://domainnamewire.com/2026/04/23/breaking-verisign-raising-wholesale-com-prices/)) |
| `.in` | ₹575 plus 18% GST for the first year ([DomainIndia](https://domainindia.com/support/kb/best-domain-registration-companies-in-india-features-pricing-benefits)) | Not sold by Cloudflare Registrar ([Cloudflare Community](https://community.cloudflare.com/t/tld-support-for-in-de-eu-id-in-nl/160749)); reads as India-only |
| `.me` | Free first year via the GitHub Student Pack, then about $24 renewal at Namecheap ([Namecheap](https://www.namecheap.com/domains/registration/cctld/me/)) | Costs more than .dev from year two |
| `.io`, `.ai` | `.io` wholesale is rising to $56 ([Domain Name Wire](https://domainnamewire.com/2026/07/21/io-price-increase/)); `.ai` needs a two-year minimum at $70–200 a year ([register.domains](https://register.domains/en/blog/should-i-buy-ai-domain-guide)) | Add nothing for a personal brand |

**Pick: `yashchauhan.dev`.** Add the .com as a redirect if it's free. Availability was not checked.

Renewals need care. Indian cards have international transactions disabled by default ([RBI](https://www.rbi.org.in/commonman/english/scripts/Notification.aspx?Id=545)), and recurring card charges need extra authentication ([Zoho](https://www.zoho.com/billing/academy/payment-collection-and-compliance/faqs-RBIs-new-auto-debit-rules.html)). Auto-renewal can therefore fail silently. He should prepay several years and set a reminder.

**Search for a common name.** "Yash Chauhan" is shared by many people, so the basics matter:

- a home-page title of the form "Yash Chauhan — AI/ML & Software Engineer";
- one H1, and self-referencing canonical URLs;
- a sitemap, with its location listed in robots.txt;
- a Google Search Console domain property, Bing Webmaster Tools and IndexNow ([ClickMinded](https://www.clickminded.com/seo-checklist/); [IndexNow](https://en.wikipedia.org/wiki/IndexNow)).

Add JSON-LD structured data: a `ProfilePage` whose main entity is a `Person`, with `sameAs` links to GitHub, LinkedIn, Scholar and ORCID ([Google](https://developers.google.com/search/docs/appearance/structured-data/profile-page)). Add `rel="me"` on the profile links; GitHub adds it automatically to the website field on a profile ([IndieWeb](https://indieweb.org/rel-me)). Use the same name and the same role qualifier everywhere.

Expect LinkedIn to compete for the top result. In a small March 2026 vendor test, LinkedIn outranked 8 of 12 founders' own sites ([InstantPress](https://www.instantpress.co/blog/personal-branding-and-seo)). The realistic goal is the top results for qualified searches (name plus "developer", "AI", "GitHub"), with the site, GitHub and LinkedIn all on page one for the bare name. A Google Knowledge Panel is not a realistic goal.

**AI discoverability.** Google says AI Overviews and AI Mode need **no special optimisation**: a page only has to be indexed and eligible for a snippet ([Google](https://developers.google.com/search/docs/appearance/ai-features)). Google-Extended, Google's opt-out for Gemini training, does not affect them ([Search Engine Journal](https://www.searchenginejournal.com/what-opting-out-of-googles-ai-search-features-means-now/584321/)).

llms.txt is close to useless. John Mueller compared it to the old keywords meta tag. An Ahrefs study, reported via an aggregator, found **97% of llms.txt files got zero requests** in May 2026 ([Geojacker](https://geojacker.com/llms-txt)). Adding one is a ten-minute curiosity, not a strategy.

The real levers:

- **robots.txt:** explicitly allow OAI-SearchBot, ChatGPT-User, GPTBot, Claude-SearchBot, Claude-User, ClaudeBot and PerplexityBot ([Search Engine Journal](https://www.searchenginejournal.com/anthropics-claude-bots-make-robots-txt-decisions-more-granular/568253/)). Being in training data helps a personal brand.
- **Bing:** ChatGPT search reportedly leans on Bing's index ([Profound](https://www.tryprofound.com/blog/ai-platform-citation-patterns)), so Bing Webmaster Tools is worth more than Bing's search share suggests.
- **A plain-HTML bio paragraph** on the home page (name, role, university, focus areas, links) gives assistants something accurate to quote.

**Social previews and analytics.** Preview images should be 1200×630, with the `summary_large_image` card type, generated at build time with Satori from an Astro endpoint ([Knaap](https://knaap.dev/posts/dynamic-og-images-with-any-static-site-generator/)). LinkedIn caches previews for about seven days, so refresh them with its Post Inspector after any change ([Linkpreview](https://linkpreview.io/blog/complete-guide-to-open-graph-tags)).

For analytics:

- **Cloudflare Web Analytics** is free and cookieless, though basic ([Gautam Khorana](https://gautamkhorana.com/analytics/cloudflare-web-analytics/)).
- **Umami Cloud's free Hobby tier** allows 100K events a month and custom events, such as "resume downloaded" or "demo opened" ([canivibecodeit](https://canivibecodeit.com/umami-cloud)).
- **Avoid Google Analytics 4.** Under GDPR and ePrivacy rules it needs prior consent and a cookie banner ([Usercentrics](https://usercentrics.com/knowledge-hub/google-analytics-and-gdpr-compliance-rulings/)).

India's DPDP Rules, the regulations under the Digital Personal Data Protection Act, were notified on 14 November 2025. Their consent-notice obligations take effect in **May 2027** ([PIB](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190014&reg=3&lang=2)). A one-line privacy note ("cookieless, aggregate analytics; no personal data stored") covers both regimes.

| Layer | Pick | Cost | Gotcha |
|---|---|---|---|
| Hosting | Cloudflare Workers static assets (fallback: GitHub Pages) | $0 | Turn off the default AI-crawler block |
| Domain | `yashchauhan.dev` at Cloudflare or Porkbun (+ `.com` redirect if available) | ~$11–13/yr | Prepay; Indian card rules can break auto-renewal |
| Analytics | Cloudflare Web Analytics; Umami Hobby for custom events | $0 | No GA4, no banner |
| Demos and uptime | Hugging Face Space for CT; one always-on Render service; UptimeRobot | $0 | Pair every demo with a recorded fallback |
| Search | Search Console + Bing Webmaster Tools + IndexNow + JSON-LD | $0 | Same name and qualifier everywhere |

## Ship in three passes, starting with the claims

Timing argues for speed. Final-year campus placements for the 2027 batch run roughly from August to December 2026. Off-campus hiring peaks July–September ([FACE Prep](https://faceprep.in/article/off-campus-ai-engineering-roles-for-freshers-2026-the-6-platform-map/)). The DELCON decision is near, with the conference on 19–21 November ([DELCON 2026](https://www.bits-pilani.ac.in/delcon2026/)). A credible site in two weeks beats a perfect one in two months, so the work splits into three passes:

| Pass | Scope | Done when |
|---|---|---|
| 1 (days 1–4) | Fix the six claims in repos and READMEs; add safety-rail tests to Autoscaler or move it down a tier; resume PDF; register the domain; publish a one-page site with the hero, four flagship cards and contacts | Site is live, every link passes an automated check, and the resume matches the placement-cell version |
| 2 (week 2) | GlassBox and Pulse case studies (evals with intervals, trade-offs, AI-workflow excerpts, diagrams, 90-second videos); uptime monitors; JSON-LD, Search Console, Bing, preview images, robots.txt | Lighthouse mobile score ≥ 95 and every demo has a recorded fallback |
| 3 (weeks 3–4) | Research page after the DELCON decision and the PI's sign-off; Gridee and "more work" pages; CT slider; designed dark theme; first two or three dated notes | Contrast checked in both themes; the notes stream has started |

Good first notes would turn existing decisions into short posts:

- why GlassBox's log is tamper-evident but not tamper-proof;
- how Pulse keeps the LLM away from SQL and PII;
- what he corrected while directing Claude Code.

This follows Simon Willison's "write about things you've built" practice ([Simon Willison](https://simonwillison.net/2022/Nov/6/what-to-blog-about/)).

## Conclusion

Yash's GitHub thesis, "turning model demos into inspectable systems", is also the right specification for the portfolio itself. GlassBox's three properties carry over directly:

- **Cited answers** become claims linked to a CI run, a Play Store listing or an eval report.
- **Explicit refusals** become stated limitations and "not yet implemented" labels.
- **An audit trail** becomes dated notes and a public repo.

A reviewer who sees him apply to his own career story the discipline he built into his products gets the two signals hiring teams rank highest, catching AI mistakes and explaining trade-offs, before any interview. That coherence (one design language, one honesty standard) is worth more than any visual trend, and it costs almost nothing.

The risks are lopsided. Stack, host and styling choices are cheap to reverse and barely affect outcomes. One overclaim found by a sceptical engineer is not reversible within a hiring cycle: a stubbed LSTM, a "SHAP" that isn't, or a named double-blind submission. And since some employers now ignore inbound applications, the site's most important reader is probably an engineer opening it on a phone after a referral or cold email, not an applicant-tracking system. No 2024–2026 data shows how much a portfolio raises callback rates. Treat the site as cheap insurance that keeps options open, and use the resume-download and demo-click events to learn which projects actually get opened.
