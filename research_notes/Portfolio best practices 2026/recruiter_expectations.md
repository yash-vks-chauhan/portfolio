# Recruiter and Hiring-Manager Expectations for New-Grad AI/ML and SWE Portfolios (as of October 2026)

> **Method note for the report writer.** Every finding below comes from web-search result summaries. Direct page fetches (WebFetch) were blocked by the network egress proxy for nearly every primary source tried (coderpad.io, hackerrank.com, press.roberthalf.com, newsletter.pragmaticengineer.com, signalfire.com, huyenchip.com, hn.algolia.com). So statistics are quoted as the search engine summarised them, not checked against the original PDFs. **Evidence grades used below:**
> - **[DATA]** = named survey or dataset with a stated sample size or method.
> - **[VENDOR-DATA]** = a survey from a resume, HR or recruiting vendor, with the sample size or method not seen.
> - **[OPINION]** = a practitioner's view or an anecdote.
> - **[UNVERIFIED]** = a stat found only on SEO or aggregator blogs with no traceable primary source.
>
> Claims older than 2024 are marked **(pre-2024)**.
>
> **Candidate profile these notes target:** Indian B.Tech CSE (AI/ML) student, graduating 2027, with:
> - internships at IIT Madras (research) and Hindalco;
> - a startup app he co-founded, with 8k+ downloads;
> - 2 papers under review;
> - several deployed full-stack and AI projects.
>
> He targets AI/ML engineer and SWE roles in India and globally.

## Q1. How long do recruiters and hiring managers spend on a portfolio, and in what order (resume, GitHub, portfolio, LinkedIn)?

### Takeaway
No credible 2024–2026 study measures time spent on *portfolio websites*. The only rigorous eye-tracking data covers resumes: Ladders, 2018, n=30 recruiters, about 7.4 seconds on the first scan. The evidence points to a two-stage funnel:
- A recruiter or ATS screens the resume in seconds.
- An engineer or hiring manager clicks through to the work only for shortlisted candidates.

So the portfolio has to pass a recruiter "skim" in under 10 seconds *and* give an engineer deep material for 2–5 minutes.

### Cited Findings
- **[DATA] (pre-2024, 2018).** Ladders' eye-tracking study found recruiters spend an average of **7.4 seconds** on the first screen of a resume, up from 6 seconds in the 2012 version. 30 professional recruiters were tracked over 10 weeks. Simple layouts with clear sections and headings held attention longer, and gaze went first to job titles and subheadings. — [HR Dive](https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/); [Ladders PDF](https://www.theladders.com/static/images/basicSite/pdfs/TheLadders-EyeTracking-StudyC2.pdf); [Ladders article](https://www.theladders.com/career-advice/you-only-get-6-seconds-of-fame-make-it-count)
- **Limitation of the Ladders study.** It has been criticised for its small sample (30 recruiters) and for not saying how recruiters were selected. — [resumeheatmap.com summary](https://resumeheatmap.com/eye-tracking-study); [Spectacle Talent Partners, "Is the 6-second resume scan a myth?"](https://spectacletalentpartners.com/is-the-6-second-resume-scan-a-myth/)
- **[DATA] CoderPad State of Tech Hiring 2026** (9th annual edition, 650+ global participants, published around February 2026):
  - **69% of recruiters use the resume review to assess technical talent, but only 16% think it predicts performance.**
  - Live technical discussions and live coding were rated as best reflecting real skill.
  - — [CoderPad 2026 report page](https://coderpad.io/survey-reports/coderpad-state-of-tech-hiring-2026/); [CoderPad 2026 PDF](https://coderpad.io/wp-content/uploads/2026/02/coderpad-state-of-tech-hiring-2026.pdf)
- **[UNVERIFIED]** "Recruiters spend an average of 90 seconds scanning your GitHub." No methodology is given. — [hakia.com Developer Portfolio Guide 2026](https://hakia.com/skills/building-portfolio/)
- **[UNVERIFIED]** Widely repeated figures say "71–72% of hiring managers consider GitHub activity" and "87% of tech recruiters review GitHub profiles". Some are attributed to "a 2022 Stack Overflow survey". This looks like misattribution: Stack Overflow's survey polls developers, not hiring managers. Another SEO page says "60–80% glance at GitHub for mid-to-senior roles, deeper dives in 40–50%", also with no primary source. **Do not use these numbers as fact.** — [fonzi.ai](https://fonzi.ai/blog/do-recruiters-check-github); [resumly.ai](https://www.resumly.ai/blog/how-to-turn-your-github-into-a-professional-portfolio); [SOLTECH](https://soltech.net/what-do-hiring-managers-actually-look-for-in-a-github-portfolio/)
- **[OPINION] (pre-2024, 2020–2022). Gergely Orosz, *The Tech Resume Inside Out*:**
  - Recruiters scan for technologies, years of experience and anything that stands out. For new grads that means school, companies, or external projects such as a technical blog.
  - Side projects are "a great way" for new grads to show they have done something.
  - Listing a GitHub profile with no explanation is weak. Describe projects by results, impact and contribution.
  - — [Sandor Dargo book review](https://www.sandordargo.com/blog/2022/05/21/the-tech-resume-by-gergely-orosz); [Tech Lead Journal #15](https://techleadjournal.dev/episodes/15/)
- **[OPINION]** A hyperlink on the resume raises the chance that a recruiter actually clicks through to a personal site. Without one, a reviewer going through about 200 applications has to copy and paste the URL. — [The Muse, "include links"](https://themuse.com/advice/include-links-job-application-resume-cover-letter)
- **[DATA] Pragmatic Engineer, "Tech jobs market in 2026, part 3"** (interviews with 50+ hiring managers, engineers and leaders):
  - AI-enhanced resumes "read as incredible", but hiring managers are often disappointed afterwards.
  - As a result, **some places no longer bother reading inbound applications.**
  - — [Pragmatic Engineer, 2026 part 3](https://newsletter.pragmaticengineer.com/p/tech-jobs-market-in-2026-part-3-hiring)

### Inferences
- **Likely real-world order:**
  1. ATS or recruiter reads the resume (seconds).
  2. If shortlisted, the hiring manager or engineer clicks the GitHub, portfolio or demo links in the resume. LinkedIn is used mostly by recruiters for sourcing and identity checks.
  3. Before or after the interview, an engineer looks deeper at 1–2 projects.

  This order is inferred from the CoderPad resume-reliance stat, the Ladders data and Orosz's description. No 2024–2026 dataset measures it directly.
- **Design the site for two reading speeds:**
  - **A 5–10 second "recruiter layer" above the fold.** It should hold:
    - name;
    - target role, e.g. "AI/ML Engineer · SWE";
    - graduation date (2027);
    - 3 proof points: 8k+ download startup, IIT Madras research, 2 papers under review;
    - resume PDF;
    - email, GitHub and LinkedIn.
  - **A 2–5 minute "engineer layer".** One deep case study per flagship project, with code, architecture and trade-offs.
- Because "some places don't read inbound", the portfolio's main use may be **after a referral or cold DM**, as the link the candidate sends. It should work as a self-contained pitch.

### Gaps
- No 2024–2026 eye-tracking or click-through data on portfolio sites or GitHub was found. Nothing measured how often recruiters open portfolio links, or the dwell time of recruiters versus engineers.
- No data was found from Hired (shut down as a standalone marketplace), the LinkedIn Talent Blog or HackerRank on the order in which candidate artifacts are reviewed.

---

## Q2. In the 2025–2026 AI-flooded market, which signals do hiring managers now trust?

### Takeaway
Trust has moved from claims to verifiable evidence and visible judgment. The 2026 surveys agree that resumes are less trusted, and that interviewers now look for:
- catching and fixing AI mistakes;
- explaining trade-offs;
- handling edge cases;
- security and privacy awareness.

The portfolio equivalents are:
- live demos and real users that can be checked independently;
- honest write-ups of decisions and limitations;
- measured results with a stated method;
- evidence of tests and evals.

### Cited Findings
- **[DATA] CoderPad 2026** (650+ participants). When AI is allowed in assessments, hiring teams name these as the signals that prove real skill:

  | Signal | Share of hiring teams |
  |---|---|
  | Catches & fixes AI mistakes | **66%** |
  | Explains trade-offs and correctness | **56%** |
  | Improves AI output via iteration | 28% |
  | Handles edge cases & failures | 28% |
  | Considers security/privacy | 25% |

  Other findings from the same survey:
  - "AI proficiency is now a core hiring signal."
  - Writing new code matters less, while system design, debugging, fine-tuning and collaboration matter more.
  - 82% of developers find GenAI useful, up from 76% in 2025.

  — [CoderPad 2026](https://coderpad.io/survey-reports/coderpad-state-of-tech-hiring-2026/); [CoderPad blog summary](https://coderpad.io/blog/hiring-developers/new-research-the-2026-state-of-tech-hiring-what-ai-means-for-developers-and-hiring-teams/)
- **[DATA] Karat engineering-leader survey** (400 leaders in the US, **India** and China, January 2026):
  - **71% say AI makes technical skills harder to assess**, not less important.
  - 62% still formally ban AI in interviews, yet estimate that over half of candidates use it anyway.
  - AI lifts productivity by about 34% on average, but unevenly: it amplifies top performers most.
  - Karat frames the key new trait as **judgment**: knowing when to trust AI-generated code, when to improve it, how to weigh trade-offs, and how to explain decisions to future maintainers.
  - — [Karat, Engineering Interviews in 2026](https://karat.com/engineering-interview-trends-2026/); [Karat 2026 AI Workforce Transformation Report](https://karat.com/resource/ai-workforce-transformation-report/); [IEEE-USA InSight](https://insight.ieeeusa.org/articles/three-ways-ai-is-reshaping-traditional-technical-interviews-in-2026/)
- **[DATA/OPINION] Karat** lists AI-native abilities to assess:
  - familiarity with agentic AI;
  - using AI for coding;
  - integrating third-party AI APIs;
  - prompt engineering;
  - evaluating and mitigating AI risks.

  — [Karat NextGen launch](https://karat.com/karat-launches-nextgen-interviews-the-first-human-led-ai-enabled-talent-evaluation-solution/); [GeekWire](https://www.geekwire.com/2025/engineering-leader-survey-ai-isnt-leading-to-massive-job-cuts-but-its-siphoning-off-weak-performers/)
- **[VENDOR-DATA] Robert Half** (press release, 10 March 2026; sample size not seen because the fetch was blocked):
  - **67% of US HR leaders say reviewing AI-generated applications has slowed hiring.**
  - 20% report delays of more than 2 weeks.
  - 84% report heavier workloads.
  - — [Robert Half press release](https://press.roberthalf.com/2026-03-10-Robert-Half-survey-67-of-HR-leaders-report-AI-generated-applications-are-slowing-hiring)
- **[DATA] Gartner:**
  - In a Q4 2024 survey of **3,290 candidates**, 39% used AI during the application.
  - In a Q2 2025 survey of **3,000 candidates**, **6% admitted interview fraud** (impersonation).
  - Gartner predicts that **by 2028, 1 in 4 candidate profiles worldwide will be fake.**
  - Only 26% of candidates trust AI to evaluate them fairly (press release, 31 July 2025).
  - — [Gartner press release](https://www.gartner.com/en/newsroom/press-releases/2025-07-31-gartner-survey-shows-just-26-percent-of-job-applicants-trust-ai-will-fairly-evaluate-them); [Mokka analysis of the 1-in-4 prediction](https://www.gomokka.com/resources/1-in-4-candidates-fake-by-2028-what-gartners-number-actually-means.html)
- **[VENDOR-DATA] Resume Now:** 62% of employers are more likely to reject AI-generated resumes that lack personalisation, and 78% say personalised details signal genuine interest and fit. — [Resume Now AI applicant report](https://www.resume-now.com/job-resources/careers/ai-applicant-report)
- **[UNVERIFIED / aggregator]** Several further figures appear only in secondary summaries:
  - about 78% of applications contain AI-generated content;
  - LinkedIn application volume is up 45% year over year through October 2025, at about 9,500 applications per minute;
  - 91% of US hiring managers have caught or suspected AI-driven misrepresentation;
  - 65% say verifying skills has become harder.

  — [imast.ai](https://imast.ai/blog/ai-resume-flood-recruiter-fix); [Interview Guys](https://blog.theinterviewguys.com/the-average-job-opening-now-gets-242-applications/); [US Chamber of Commerce](https://www.uschamber.com/co/run/human-resources/hiring-ai-job-applications)
- **[DATA] Stack Overflow Developer Survey 2025** (49,000+ responses from 177 countries):
  - 84% use or plan to use AI tools.
  - **46% distrust the accuracy of AI output**, up from 31% the year before.
  - Only about 3% "highly trust" it.

  Engineers who review a portfolio are therefore sceptical of uncritical AI output. — [SO 2025 press release](https://stackoverflow.co/company/press/archive/stack-overflow-2025-developer-survey/); [SO 2025 survey](https://survey.stackoverflow.co/2025/)
- **[OPINION] Recruiting-agency guidance** (KORE1, 2026; attributed from a search summary):
  - For junior hires, check whether the candidate can *explain* the AI-generated code they used.
  - Grade take-homes on how well trade-offs are articulated, not only on correctness.
  - — [KORE1, hiring engineers who use AI](https://www.kore1.com/hire-engineers-who-use-ai/)
- **[DATA] Market context, the reason for the extra scrutiny:**
  - **SignalFire 2025:** new grads are about **7% of Big Tech hires**, down from about 15%. New-grad hiring by the 15 largest tech companies is down more than 50% since 2019, and fell about 25% from 2023 to 2024. — [SignalFire State of Talent 2025](https://www.signalfire.com/blog/signalfire-state-of-talent-report-2025); [TechCrunch](https://techcrunch.com/2025/05/27/ai-may-already-be-shrinking-entry-level-jobs-in-tech-new-research-suggests)
  - **HackerRank 2025** (13,372 developers, 102 countries): 74% of developers struggle to land jobs, and early-career developers are hit hardest. — [HackerRank 2025 report](https://www.hackerrank.com/reports/developer-skills-report-2025); [PDF](https://pages.hackerrank.com/hubfs/PDFs/HackerRank%202025%20Developer%20Skills%20Report.pdf)
  - **Stanford study** (via the Pragmatic Engineer summary): early-career workers aged 22–25 in the most AI-exposed occupations saw a **16% relative decline in employment**. — [Pragmatic Engineer, 2026 job market](https://newsletter.pragmaticengineer.com/p/state-of-the-job-market-2026)

### Inferences
- **Verifiability is the main credibility currency in 2026.** For this candidate that means:
  - **Startup app:** link to the public Play Store or App Store listing, where the download badge or count is independently visible. Add a screenshot of analytics with the date, and state what "8k+ downloads" means (installs, not MAU) and over what period.
  - **Deployed projects:** live URLs that work, with a fallback (Loom or video demo, or "demo may cold-start" notes) for free-tier hosts that sleep.
  - **Papers:** an arXiv or preprint link if one exists; otherwise title, venue *submitted to*, and an "under review" label. Never "accepted".
  - **IIT Madras internship:** name the lab or professor and give a concrete deliverable (what you built or measured).
- **Put the "judgment" signal on the page.** Each flagship case study should have a short "Decisions & trade-offs" section, e.g. "chose X over Y because…, cost: …". It should also have a short "Where AI helped / where I overrode it" note, such as a bug the AI introduced that you caught, or a design it suggested that you rejected. This maps directly onto CoderPad's top two signals (66% and 56%) and Karat's "judgment" framing.
- **Honest limitations and "what I'd do differently" sections** now count for more, because AI-polished claims have lowered baseline trust (Pragmatic Engineer 2026, part 3).
- **Identity consistency** (same name, photo or handle, and project list across site, GitHub, LinkedIn and resume) reduces "is this a real person?" doubt, given Gartner's fake-candidate data. This is an inference, not a measured effect.

### Gaps
- Robert Half's sample size and method were not seen.
- No survey quantified how much a *portfolio site specifically* raises callback rates in 2025–2026.
- No hard data was found on whether tests/CI badges, ADRs or design docs in student repos are noticed by reviewers. Only opinion was found.

---

## Q3. What do AI/ML hiring managers look for from new grads, compared with generalist SWE roles? How much do papers, evals, MLOps, deployment and LLM app engineering matter?

### Takeaway
For applied MLE and AI-engineer roles, engineering ability and production evidence come first:
- deployment;
- serving real users;
- evals and measurement.

Papers matter mainly for research-engineer or research-scientist roles. The "AI Engineer" market is much stronger than generalist SWE in 2026, and LLM-app skills (RAG, evals, agents, API integration) are what postings ask for.

### Cited Findings
- **[OPINION] (pre-2024, 2019–2021). Chip Huyen**, from interviews with companies for her ML Interviews Book:
  - Hiring managers tend to prefer **strong software engineers without much ML knowledge over ML experts**, because real-world engineering practice is harder to pick up than ML concepts.
  - Previous employers matter a lot.
  - Candidates find ML system design questions the hardest.
  - — [ML Interviews Book](https://huyenchip.com/ml-interviews-book/); [Chip Huyen thread, 2019](https://x.com/chipro/status/1152077188985835521); [2025 blog summary of her talk](https://cinnak.github.io/cinnakblog/blog/2025/04/01/lessons-from-chip-huyen_mastering-ml-interviews-and-career-strategies/)
- **[OPINION] Chip Huyen** (as summarised in a 2025 secondary post): a great portfolio often speaks louder than a resume. Make work public through in-depth technical blog posts or papers, open-source contributions and hackathons. — [Cinnak's blog, 2025](https://cinnak.github.io/cinnakblog/blog/2025/04/01/lessons-from-chip-huyen_mastering-ml-interviews-and-career-strategies/)
- **[OPINION] Hamel Husain** (independent AI consultant, formerly at GitHub and Airbnb):
  - Teams should first hire people who **can build applications**, then add data and platform capability, then specialised ML expertise once meaningful production data exists.
  - The ideal evals hire blends data-analysis skill with practical engineering.
  - — [Antoine Buteau, "Lessons from Hamel Husain"](https://www.antoinebuteau.com/lessons-from-hamel-husain/); [hamel.dev](https://hamel.dev/); [Humanloop, "Why your AI product needs evals"](https://humanloop.com/blog/why-your-product-needs-evals)
- **[OPINION] Eugene Yan** (Anthropic; formerly Amazon):
  - He practises "evaluation-driven development".
  - His site gives runnable prototypes (AlignEval, Obsidian Copilot and others) equal prominence with 200+ essays.
  - Writing about applied AI "carries more weight when the reader can run the thing".
  - — [eugeneyan.com](https://eugeneyan.com/); [AI Engineer speaker bio](https://ai.engineer/speakers/eugene-yan); [jobroadmaps on Eugene Yan's portfolio](https://jobroadmaps.com/portfolios/eugene-yan)
- **[OPINION] (pre-2024, 2022). swyx:** the backend, data or ML equivalent of a portfolio is a **"blogfolio"**, a running log of research, interests and projects. He cites Eugene Yan's as ideal: "at one glance I can tell what he's about and the work he's done to back it up." — [swyx on X](https://x.com/swyx/status/1523042219623477248?lang=en)
- **[DATA] Pragmatic Engineer 2026, part 3** (50+ interviews): for AI Engineering, ML and FDE (forward-deployed engineer) roles the market is "incredible"; for everyone else it is "much less great". AI Engineering offers are not seeing the compensation squeeze. The best market is mostly in the US. — [Pragmatic Engineer, 2026 part 3](https://newsletter.pragmaticengineer.com/p/tech-jobs-market-in-2026-part-3-hiring)
- **[UNVERIFIED / aggregator]** Job-posting analyses claim:
  - **evals are an explicit requirement in 39.6% of AI-engineer postings**, up from near zero two years earlier;
  - **RAG is a hard requirement in 35.9%**;
  - "prompt engineering" appears in about 8.9%;
  - "AI Engineer" has about 1,550 new US postings a week at a median of about $176k.

  Methods were not seen. — [SuperCareer, RAG skills](https://www.supercareer.co/blog/rag-skills-vector-database-ai-career); [ilinmaks, AI job market 2026](https://www.ilinmaks.com/blog/en/ai-jobs-market-2026)
- **[UNVERIFIED]** "62% of hiring managers prioritise candidates with internship/co-op in ML teams (2024)" and "57.7% of ML listings prefer domain specialists". — [research.com](https://research.com/degrees/entry-level-hiring-trends-for-machine-learning-graduates-where-new-grads-have-the-best-odds); [Medium, AI Engineering Hiring Trends 2026](https://medium.com/@thedataexec/ai-engineering-hiring-trends-2026-1c1d894492aa)
- **[OPINION / anecdote] Practitioner forums** (Blind, Taro):
  - Publications matter for **research teams** (who also value academic connections); for **applied teams** "it doesn't really matter".
  - Top-tier papers take 12–18 months, so the ROI is low for applied roles.
  - "90% of MLE projects are… take some public dataset like MNIST, throw some models, write an article", which is not impressive.
  - Research-scientist roles typically expect a PhD or a strong publication record.
  - — [Taro, "transition to ML engineer"](https://www.jointaro.com/question/YqrpDDCPbsGpg0lwrKXY/looking-to-transition-to-ml-engineer-what-do-you-want-to-know/); [Blind, should I maintain academic output](https://www.teamblind.com/post/should-i-maintain-academic-output-17fjahgf); [Recruiting from Scratch, hiring ML research engineers 2026](https://www.recruitingfromscratch.com/blog/how-to-hire-an-ml-research-engineer-or-research-scientist-2026)
- **[DATA] LinkedIn (India):** AI Specialist and Generative AI Engineer are among the fastest-growing roles for fresh graduates in India. — [People Matters on LinkedIn data](https://www.peoplematters.in/news/strategic-hr/entry-level-hiring-climbs-168percent-as-ai-roles-and-internships-gain-ground-linkedin-49290)

### Inferences
- **Position as "ML/AI engineer who ships", not "ML researcher".** Lead with the deployed app, its users, latency and cost, and the evals. Put the papers and IIT Madras research in a dedicated "Research" section as evidence of rigour. They are a differentiator for research-engineer roles, but secondary for applied MLE and SWE.
- **For each AI/LLM project, show:**
  - **Eval methodology:** dataset or test set, metrics, baseline versus improved, and failure-case analysis.
  - **System design:** a retrieval/agent architecture diagram, model choice with its cost and latency rationale, and guardrails.
  - **Deployment:** where it runs, how it is served, and monitoring or logging if any.

  This lines up with Karat's AI-native ability list, Hamel's and Eugene's eval emphasis, and the posting analyses (with the caveat that those numbers are unverified).
- **Avoid "Kaggle/MNIST + notebook" style ML projects** as headliners. If ML-modelling work is shown, frame it as an end-to-end pipeline: data, then training, then eval, then serving.
- **Tailor per audience.** For SWE roles, foreground full-stack architecture, tests and CI, and the production app. For AI/ML roles, foreground evals, the research, and LLM system design. A role toggle or two "start here" paths on the homepage is one way to do this; that is an inference, not a sourced practice.
- **A "writing" or "notes" section** (2–4 technical posts, e.g. an eval post-mortem or a paper explainer) gives the "blogfolio" signal that swyx and Eugene Yan describe. It also shows writing quality, which survives AI-scepticism better than code alone.

### Gaps
- No 2024–2026 survey of AI/ML hiring managers was found with quantified weights for papers versus projects versus internships for new grads.
- The posting-analysis percentages (evals 39.6%, RAG 35.9%) could not be traced to a primary dataset.
- Nothing was found specifically on how much MLOps (CI/CD for models, monitoring) is expected of *new grads* as opposed to mid-level engineers.

---

## Q4. How many projects should be featured? Depth versus breadth, and how should a case study be structured?

### Takeaway
The consensus, which is opinion rather than hard data, is **3–5 polished, deep projects** rather than many shallow ones. Each should follow a results-oriented case-study structure:
- problem;
- constraints;
- approach;
- key decisions and trade-offs;
- measured results;
- limitations and what you'd do differently;
- your specific role.

### Cited Findings
- **[UNVERIFIED / opinion]** "Quality beats quantity: 3–5 polished projects outperform 10+ basic ones according to hiring manager surveys." The surveys are not named. A related claim: "84% of employers want to see working applications, not just code repositories". — [hakia.com, Developer Portfolio Guide 2026](https://hakia.com/skills/building-portfolio/)
- **[OPINION] (India-focused):** "Someone who can show two working projects on GitHub often gets shortlisted faster than someone with five certificates and no live work." — [ucanly.io, GitHub portfolio for freshers in India 2026](https://ucanly.io/blog/github-portfolio-gets-freshers-hired-india-2026); [thehirehub.ai](https://www.thehirehub.ai/blog/it-fresher-hiring-india-2026)
- **[OPINION] (pre-2024). Gergely Orosz:** describe side projects using results, impact and contribution, not a bare GitHub link. For new grads, focus on "impactful" side projects; a contribution to a major OSS project beats "Hello World". — [Sandor Dargo review](https://www.sandordargo.com/blog/2022/05/21/the-tech-resume-by-gergely-orosz)
- **[OPINION]** Repository names, pinned projects, organisation and READMEs shape first impressions before anyone reads code. — [SOLTECH](https://soltech.net/what-do-hiring-managers-actually-look-for-in-a-github-portfolio/); [hakia.com](https://hakia.com/skills/building-portfolio/)
- **[OPINION] Hacker News "Who wants to be hired?" (2025):** candidates highlight projects that are "dockerized… spin up frontend, backend, and a PostgreSQL database seeded with test data with a single command". Employers ask for "a good GitHub profile, blog, papers, or other portfolio". — [HN Who wants to be hired, Dec 2025](https://news.ycombinator.com/item?id=46108940); [HN Who is hiring, Mar 2025](https://news.ycombinator.com/item?id=43243024)
- **[DATA]** CoderPad 2026's top signals (catching AI mistakes 66%, explaining trade-offs 56%, edge cases 28%, security/privacy 25%) map directly onto case-study sections. — [CoderPad 2026](https://coderpad.io/survey-reports/coderpad-state-of-tech-hiring-2026/)
- **[DATA] (pre-2024, 2018).** Simple layouts with clear section headings get longer recruiter attention. — [HR Dive on Ladders](https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/)

### Inferences
- **Recommended structure for this candidate:**
  - **3–4 flagship case studies:**
    1. the co-founded app (real users);
    2. the strongest LLM/AI system (with evals);
    3. the IIT Madras research work, or a paper-linked project;
    4. optionally, one full-stack system showing SWE depth.
  - A compact **"More projects" grid or list** with one line each plus links, for breadth.
- **Case-study template.** Headings are scannable, and each section is 2–5 sentences or bullets:
  1. **TL;DR card:** one-line problem, your role, stack, one headline metric, and live / code / paper links.
  2. **Problem & users:** who it was for and why it mattered.
  3. **Constraints:** time, budget (free tier), data, team size, latency or cost targets.
  4. **Architecture:** one diagram.
  5. **Key decisions & trade-offs:** 2–4 decisions, each with the rejected alternative and why.
  6. **Results:** numbers *with the measurement method*, e.g. "p95 latency 420 ms measured with k6 on 100 concurrent users", "8.2k Play Store installs, Jan–Sep 2025, ~X MAU".
  7. **Evaluation & testing:** for AI, the eval set and metrics; for SWE, tests, CI and monitoring.
  8. **What broke / limitations.**
  9. **What I'd do differently.**
  10. **AI-tool usage note:** where it helped, and where you corrected it.
- **The team-project attribution line is critical** for a co-founded startup. Say exactly what *you* built ("I owned backend + ML pipeline; co-founder owned design/marketing"). Inflated ownership is easy to probe in interviews.
- Every flagship should have a **README** that mirrors the case study, so an engineer who lands on GitHub first gets the same story.

### Gaps
- No controlled data was found on the best number of projects. "3–5" is a widely repeated heuristic, not a measured finding.
- No data was found on whether reviewers read long-form case studies or only TL;DR cards.

---

## Q5. Common portfolio red flags and anti-patterns in 2026

### Takeaway
The red flags that recur across hiring-side sources are:
- tutorial clones and generic "GPT chatbot" projects;
- broken or localhost links, or screenshots with no live demo;
- vague descriptions with no specifics;
- polished claims the candidate can't explain;
- over-engineered toy apps.

Slow, animation-heavy sites work against a recruiter who allows seconds, not minutes.

### Cited Findings
- **[OPINION] Hiring teams see the same projects over and over:** weather apps, e-commerce demos, task managers and streaming-platform clones. These "do not always demonstrate independent thinking." — [hakia.com](https://hakia.com/skills/building-portfolio/); [SOLTECH](https://soltech.net/what-do-hiring-managers-actually-look-for-in-a-github-portfolio/)
- **[OPINION] Vendor and agency hiring guides on red flags:**
  - copy-pasted code with poor naming;
  - **broken links or localhost URLs, non-working demos**;
  - **tutorial-only projects** with no unique features;
  - **screenshots without live links** ("make it difficult to verify if the work is functional or even their own");
  - **over-engineered todo or notes apps** stuffed with trendy technologies;
  - **vague descriptions in generalities**;
  - for AI work, projects that look polished but where the candidate "can't explain why a particular approach was chosen", with no mention of testing, error handling or edge cases;
  - portfolios with only basic "AI chatbot for customer support" or "GPT-powered assistant" projects, which "require minimal engineering depth".

  — [Contra, portfolio red flags](https://contra.com/p/kXU7WbZb-hire-web-developers-portfolio-red-flags-you-cant-ignore); [Abbacus, hiring AI developers 2026](https://www.abbacustechnologies.com/how-to-hire-an-ai-developer-in-2026-portfolio-red-flags-and-technical-must-haves/); [Interexy](https://interexy.com/how-to-hire-ai-developers); [Medium, "I analyzed 100 tech lead portfolios"](https://medium.com/@sohail_saifi/i-analyzed-100-tech-lead-portfolios-these-5-projects-are-red-flags-to-recruiters-04d03303d445)
- **[DATA] Inflated or AI-polished claims backfire.** Hiring managers report that AI-enhanced resumes "read as incredible" but are followed by disappointment, which led some to stop reading inbound applications. — [Pragmatic Engineer, 2026 part 3](https://newsletter.pragmaticengineer.com/p/tech-jobs-market-in-2026-part-3-hiring)
- **[VENDOR-DATA]** 62% of employers say generic AI-generated resumes without personalisation are more likely to be rejected. — [Resume Now](https://www.resume-now.com/job-resources/careers/ai-applicant-report)
- **[OPINION]** A GitHub contribution graph that has been dark for 6 months "raises questions". — [hakia.com](https://hakia.com/skills/building-portfolio/)
- **[OPINION] (pre-2024).** A bare GitHub link with no explanation of the projects is weak. — [Sandor Dargo on Orosz](https://www.sandordargo.com/blog/2022/05/21/the-tech-resume-by-gergely-orosz)
- **[DATA] (pre-2024, 2016–2017). Google's "Need for Mobile Speed" research:**
  - **53% of mobile visits are abandoned if load time exceeds 3 seconds.**
  - Bounce probability rises **32% as load time goes from 1 s to 3 s**, and **90% from 1 s to 5 s**.
  - — [Marketing Dive](https://www.marketingdive.com/news/google-53-of-mobile-users-abandon-sites-that-take-over-3-seconds-to-load/426070/); [Search Engine Journal](https://www.searchenginejournal.com/google-new-industry-benchmarks-mobile-page-speed/187777/)
  - **Caveat:** these are general web-user figures, not recruiters, and are disputed by some. — [Convertri, "The myth of 3 seconds"](https://www.convertri.com/the-myth-of-3-seconds)
- **[OPINION] Corporate email systems may flag resumes with links** (a Blind thread about Riot Games). This anecdote suggests keeping links plain and well known: own domain, GitHub, LinkedIn. — [Blind](https://www.teamblind.com/post/does-riot-games-company-email-system-auto-flag-resume-with-clickable-link-6mna80me)
- **[OPINION] Password-protected portfolios may drive recruiters away** (Blind thread). — [Blind](https://www.teamblind.com/post/is-pw-protection-driving-recruiters-away-mep7yi3h)

### Inferences
**Concrete anti-pattern checklist for this site:**
- **Broken or sleeping demos.** Run an automated link-check, e.g. lychee in CI, and add a "demo may take ~30 s to wake (free tier)" note or a video fallback.
- **Private repos** with no explanation. Add an "NDA / private, happy to walk through" note, plus a public architecture write-up.
- **Template look-alike sites**, such as default Next.js or "developer folio" templates with stock hero text and typewriter effects. This is an inference from the "independent thinking" critique. No source measured template penalties.
- **Heavy animation, WebGL or 3D heroes and large JS bundles** that slow first paint on mobile. Many Indian recruiters browse on phones; that is an inference, not data.
- **Buzzword salads** ("Leveraged cutting-edge GenAI agentic RAG synergies") with no numbers.
- **Unqualified metrics.** "99% accuracy" with no dataset or baseline, or "8k users" when the real figure is downloads.
- **Mismatched dates or titles** across resume, LinkedIn and site. These raise authenticity doubt in a fake-candidate era (inference from Gartner's data).
- **"Accepted" or "published" wording for papers that are under review.** This is easy to verify and serious if wrong.
- **Missing resume link or contact information.**
- **Skill bars** ("Python 90%") and long logo walls of technologies. These are common opinion-based anti-patterns. No hard source was found, so treat as inference.

### Gaps
- No rigorous 2024–2026 study was found of *recruiter* reactions to portfolio load time, animation or templates. The performance data is old and general-population.
- Red-flag lists come mostly from vendor or agency blogs, not systematic hiring-manager surveys.

---

## Q6. India-specific context, and whether a portfolio matters for international remote roles

### Takeaway
- **In India, mass campus hiring** (IT services, many large product companies) runs mainly through online assessments, coding tests and interviews, so the portfolio is secondary.
- **Startups, GCCs, AI-first companies and off-campus channels** (Wellfound, Cutshort, LinkedIn, referrals) increasingly screen on projects and GitHub. There, the portfolio is a real differentiator.
- **For international or remote roles**, where the candidate lacks a brand-name employer or school signal and inbound applications are distrusted, a verifiable portfolio plus a referral or direct outreach is one of the few ways to stand out. This is mostly inference: no hard data was found.

### Cited Findings
- **[DATA] LinkedIn India** (via People Matters):
  - Entry-level hiring in India **rose 168% between 2023 and 2025**.
  - Hiring of bachelor's-degree holders into firms with 1–10 employees rose 64%.
  - AI Specialist and Generative AI Engineer are among the fastest-growing fresher roles.
  - — [People Matters](https://www.peoplematters.in/news/strategic-hr/entry-level-hiring-climbs-168percent-as-ai-roles-and-internships-gain-ground-linkedin-49290); [CNBC, Aug 2026, LinkedIn study on young workers and AI jobs](https://www.cnbc.com/2026/08/18/millennials-and-gen-z-are-landing-fast-growing-high-paying-ai-jobs-linkedin-study.html)
- **[DATA, secondary]** Naukri JobSpeak (February 2026): fresher hiring grew 8% in January 2026. TeamLease EdTech: about 73% of employers planned to hire freshers in H1 2026. Both are reported via an aggregator. — [thehirehub.ai, IT fresher hiring India 2026](https://www.thehirehub.ai/blog/it-fresher-hiring-india-2026); [Naukri campus guidance](https://www.naukri.com/campus/career-guidance/sectors-hiring-freshers-in-india)
- **[OPINION / aggregator]**
  - Indian companies are moving to skills-based screening: practical coding tests, **portfolio evaluation (GitHub, Kaggle, personal projects)**, and aptitude plus technical depth.
  - "64% of HR leaders define top talent by capabilities… rather than degree". The source is unclear.
  - — [thehirehub.ai](https://www.thehirehub.ai/blog/it-fresher-hiring-india-2026)
- **[OPINION / aggregator] Off-campus channels in India:**
  - Wellfound, LinkedIn, Cutshort, Naukri.
  - On Wellfound, a complete profile with a GitHub link, project descriptions and internship work is what surfaces candidates in recruiter searches.
  - Cutshort matches on skills and project work "rather than college name".
  - Off-campus hiring grew 18–22% in 2025, led by IT, startups and GCCs. The peak off-campus season is July–September.
  - — [FACE Prep, off-campus AI engineering roles 2026](https://faceprep.in/article/off-campus-ai-engineering-roles-for-freshers-2026-the-6-platform-map/); [Cutshort startup jobs](https://cutshort.io/jobs/startup-jobs)
- **[DATA, secondary]** A referred candidate is about **4x more likely to be interviewed** than a cold applicant. This cites LinkedIn Talent Trends 2024 via an aggregator. — [FACE Prep](https://faceprep.in/article/off-campus-ai-engineering-roles-for-freshers-2026-the-6-platform-map/)
- **[DATA] Karat's January 2026 survey included India** among its 400 engineering leaders. 71% globally say AI makes skills harder to assess, which suggests Indian employers share the verification problem. — [Karat](https://karat.com/engineering-interview-trends-2026/)
- **[DATA] Pragmatic Engineer 2026, part 3:**
  - The "best market ever" is mostly a US phenomenon.
  - AI Engineering, ML and FDE roles are hot.
  - Some employers have stopped reading inbound applications, so cold applications from abroad face a steep filter.
  - — [Pragmatic Engineer, 2026 part 3](https://newsletter.pragmaticengineer.com/p/tech-jobs-market-in-2026-part-3-hiring)
- **[DATA] Big Tech new-grad share** is about 7%, more than 50% below 2019 (SignalFire 2025). — [SignalFire](https://www.signalfire.com/blog/signalfire-state-of-talent-report-2025)
- **[OPINION] (pre-2024).** Previous employers matter a lot in ML hiring (Chip Huyen). — [Chip Huyen thread](https://x.com/chipro/status/1152077188985835521)

### Inferences
- **India, on-campus (2027 batch, final-year placements roughly Aug–Dec 2026).** The portfolio rarely changes OA cut-offs. It can tip interview panels and PPO conversations, and it serves as the link on the placement-cell resume. Make sure the resume PDF on the site matches the placement-cell version.
- **India, startups, GCCs and AI-first companies.** The portfolio plus GitHub *is* the screen. Put the portfolio URL on Wellfound, Cutshort and Instahyre profiles. Lead with the 8k-download app: founder experience is highly valued at startups (inference).
- **International / remote (US/EU).** With no US degree or US employer brand, verifiable proof (live product with users, public evals, papers or preprints, clear writing) has to stand in for brand signals. Inbound distrust means the portfolio works best as the link inside **referrals, cold emails to hiring managers, OSS contributions and HN "Who wants to be hired?" posts**, not as an ATS attachment.

  Make the site globally legible:
  - explain "B.Tech CSE (AI/ML)" and give the graduation month;
  - name institutions in full ("IIT Madras" rather than "IITM");
  - state work-authorisation or relocation preferences, and time-zone overlap for remote roles;
  - avoid India-specific resume conventions (see Q7).
- **The IIT Madras brand** is a recognisable signal in India and to many global ML teams. Name it prominently, along with the lab or professor.

### Gaps
- No primary Naukri, Instahyre, Cutshort or LinkedIn India report was found that quantifies how often Indian recruiters open portfolio links. India claims mostly come via aggregators.
- No data was found on whether US/EU remote employers hiring *non-US new grads* weigh portfolios differently. This rests on inference from general trust and market data.
- Visa and work-authorisation dynamics for 2027 international hiring were not researched; they are out of scope.

---

## Q7. Should the site show a resume PDF, phone number or photo? Contact best practices

### Takeaway
- **Always provide a one-click, current resume PDF and a direct email.**
- **For US/EU-facing materials, omit photo, date of birth and similar personal details from the resume.** A headshot on a personal *website* is common and lower-risk, but optional.
- **Keep a phone number off the public site** to limit scraping. It can stay on the resume PDF.

These are mostly norms and opinion, not data.

### Cited Findings
- **[OPINION / resume-industry guidance]** US resumes should not include photos, date of birth, marital status or nationality. Larger US companies' lawyers advise against reviewing resumes with photos because of discrimination-claim risk, and some HR software rejects resumes with embedded images. Several resume-builder sites attribute an anti-photo stance to the EEOC; that attribution is not verified against EEOC guidance. — [roastmyresume.io](https://www.roastmyresume.io/blog/should-you-put-photo-on-resume); [resumevera.com, US resume photo](https://resumevera.com/blogs/resume-photo-united-states); [cvcompose.com](https://cvcompose.com/us/blog/personal-information-resume-2026)
- **[OPINION] India norms:** resume photos are increasingly optional. IT-services firms (Infosys, TCS, Wipro) often still expect one; product-tech firms and foreign-headquartered companies in India typically don't. When converting an Indian CV to a US resume, remove photo, DOB, gender, marital status, religion and full address. — [thetailorcv.com](https://thetailorcv.com/blog/photo-on-resume); [resumevera.com, CV vs resume (US, UK, India)](https://resumevera.com/in/blogs/cv-vs-resume-us-uk-india-2026)
- **[OPINION]** Hyperlinked contact and project links make click-through more likely. Tech candidates should make it easy to move between resume, portfolio and projects. — [The Muse](https://themuse.com/advice/include-links-job-application-resume-cover-letter)
- **[OPINION]** Password-protecting a portfolio may turn reviewers away. — [Blind](https://www.teamblind.com/post/is-pw-protection-driving-recruiters-away-mep7yi3h)
- **[DATA]** Gartner's fake-candidate prediction (1 in 4 profiles fake by 2028) and its Q2 2025 interview-fraud data (6% of 3,000 candidates) form the backdrop for identity verification. — [Gartner](https://www.gartner.com/en/newsroom/press-releases/2025-07-31-gartner-survey-shows-just-26-percent-of-job-applicants-trust-ai-will-fairly-evaluate-them)

### Inferences
- **Resume PDF:**
  - Put a prominent "Resume (PDF)" button in the header and hero.
  - Use a stable URL such as `/resume.pdf`, so links in old applications keep working.
  - Make it text-based and ATS-parseable, and show "last updated" plus the month.
  - Consider two variants: an India/campus version and a US/EU version (no photo or DOB). Alternatively, keep one global version with no personal details, which works for Indian product companies too.
- **Phone number:** keep it off the public HTML to avoid scraping and spam. Put it on the resume PDF only. Optionally, use a public-facing resume without a phone number, and send the full one on request.
- **Email:** use a professional address on your own domain, or Gmail. Make it a visible `mailto:` link, not only a contact form; forms can fail silently. Light obfuscation is optional.
- **Photo on the site:** optional. A small, professional headshot in an About section can help humanise the page and connect it to LinkedIn and GitHub (an inference tied to fake-candidate concerns). Never put it on US-bound resumes.
- **Contact block:**
  - email, LinkedIn, GitHub, Google Scholar or ORCID (for the papers), and the resume PDF;
  - optionally a scheduling link such as Cal.com, which helps with international time zones;
  - location plus "open to: India (on-site/hybrid), remote, relocation";
  - graduation month and year, i.e. availability date.
- **Availability line in the hero,** e.g. "Graduating May/June 2027 · seeking full-time AI/ML & SWE roles · open to internships Jan–Jun 2027 if applicable". Recruiters filter by start date first; this is an inference from Orosz's note that recruiters scan for experience level and school for new grads.

### Gaps
- No survey data was found on how recruiters react to photos, phone numbers or contact forms on personal portfolio *websites*, as opposed to resumes.
- The EEOC attribution on resume-builder sites could not be verified against primary EEOC guidance.
