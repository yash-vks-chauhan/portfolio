# Presenting AI/ML and LLM-System Projects Credibly on a Personal Portfolio (as of Oct 2026)

> Research-method note for the report writer: direct page fetches were blocked by the network egress proxy for most domains (hamel.dev, huggingface.co, karpathy.github.io, bits-pilani.ac.in, letsdatascience.com). Findings therefore come from (a) direct fetches of GitHub-hosted pages (Eugene Yan's ml-design-docs README, the Hugging Face model card template, a GitHub mirror of the Husain/Shankar evals FAQ) and (b) search-result summaries of the cited pages. Where a claim rests only on a search summary, or a source is a low-authority aggregator, it is flagged. Older sources are marked with their year. Project-specific advice for GlassBox, Autoscaler, Pulse, the CT U-Net, and the two papers is under **Inferences**.

## 1. What do exemplary ML/AI engineer portfolios and project pages look like, and what structural patterns recur?

### Takeaway
The most-cited practitioners (Eugene Yan, Hamel Husain, Simon Willison, Jay Alammar, Lilian Weng, Chip Huyen, Andrej Karpathy) don't run "portfolio galleries". Each runs a writing-first site where every project is a write-up following a recognisable shape: a short problem and motivation, the design and its alternatives, evaluation backed by real numbers and failure cases, then limitations. A curated "start here" page points to the best work. For a candidate, the pattern to copy is a small number of deep case studies written like design docs, not a grid of cards.

### Cited Findings
- **Eugene Yan (eugeneyan.com)** has a curated "Start Here" page that routes readers to his best writing ([Start Here](https://eugeneyan.com/start-here/); [Writing index](https://eugeneyan.com/writing/)). His design docs follow a **Why → What → How** framework ([How to Write Design Docs for ML Systems](https://eugeneyan.com/writing/ml-design-docs/)).
- Yan's open ML design-doc template (fetched directly) uses these sections: Overview (3–5 sentences: purpose, problem, solution, outcome) → Motivation → Success Metrics → Requirements & Constraints (in-scope/out-of-scope; functional vs non-functional such as performance, cost, security, privacy) → Methodology (problem statement, data, techniques, **experimentation & validation: "How will you validate your approach offline? What offline evaluation metrics will you use?"**, human-in-the-loop) → Implementation (high-level design with system-context and data-flow diagrams, infra, throughput/latency, security, data privacy, **monitoring & alarms**, **cost: "Estimated monthly costs"**, integration points, **risks & uncertainties: "known unknowns" and "unknown unknowns"**) → Appendix (**alternatives considered with pros/cons**, experiment results, performance benchmarks, milestones, glossary, references) — [eugeneyan/ml-design-docs (GitHub)](https://github.com/eugeneyan/ml-design-docs)
- **Simon Willison's** standing advice is "write about things you've learned, and write about things you've built" (2022, older). He has published short "TIL" (Today I Learned) notes since April 2020, framed as "I just figured this out: here are my notes" rather than a revelation — [What to blog about (2022)](https://simonwillison.net/2022/Nov/6/what-to-blog-about/); [Simon Willison's Weblog](https://simonwillison.net/). He describes using GitHub issues as an "external brain" across hundreds of projects — [Generationship podcast ep. 39](https://www.heavybit.com/library/podcasts/generationship/ep-39-simon-willison-i-coined-prompt-injection)
- **Jay Alammar**: visual-first explainers. "The Illustrated Transformer" is widely recommended as a starting point and referenced in university courses (search-summary claim, aggregator source) — [Jay Alammar About](https://jalammar.github.io/about/); [awesomebloggers list (aggregator)](https://www.awesomebloggers.com/articles/best-ai-llm-newsletters-blogs-2026)
- **Lilian Weng (Lil'Log)**: long survey posts that work like graduate lectures (prompt engineering, RLHF, agents). **Chip Huyen**: ML systems design covering evals, data, deployment, and "the decisions that separate working AI products from demos". Both characterisations come from an aggregator summary — [awesomebloggers list (aggregator)](https://www.awesomebloggers.com/articles/best-ai-llm-newsletters-blogs-2026). Canonical sites, not re-fetched this session: https://lilianweng.github.io, https://huyenchip.com
- **Andrej Karpathy, "A Recipe for Training Neural Networks" (2019, older but still canonical)**: process-first writing. Step 1 is to "not touch any neural net code" and inspect the data; then build the end-to-end train/eval skeleton and "get dumb baselines" — [Karpathy blog (2019)](https://karpathy.github.io/2019/04/25/recipe/); [Karpathy home](https://karpathy.ai/)
- **Hamel Husain (hamel.dev)**: practitioner essays built on concrete client case studies, e.g. "Your AI Product Needs Evals" (March 2024, older) — [hamel.dev evals post](https://hamel.dev/blog/posts/evals/index.html); [Simon Willison's link post (2024)](https://simonwillison.net/2024/Mar/31/your-ai-product-needs-evals/)
- Hiring-oriented guides agree: hiring managers prefer **three end-to-end projects over twenty notebooks**, a README that can be understood in **about 30 seconds**, and live deployment links (Streamlit/Gradio/HF Spaces). These are secondary/aggregator sources — [letsdatascience 2026 guide](https://letsdatascience.com/blog/the-ml-portfolio-that-actually-gets-you-hired-in-2026); [InterviewNode](https://www.interviewnode.com/post/how-to-build-a-strong-ml-portfolio-projects-github-kaggle-with-example-projects). One such source cites "a 2023 GitHub report" saying 45% of recruiters discard poorly documented portfolios. I could not verify that report; **do not reuse the stat**.
- For candidates without a PhD who target frontier labs, secondary sources say independent public work (technical blog posts showing original thinking, rigorous replications, open-source contributions) becomes the main evidence, and that labs screen for "research taste" and "calibrated epistemic honesty". **Low-authority sources** (interview-prep blogs and X threads; not an official lab statement) — [Sundeep Teki: Anthropic RE interview 2026](https://www.sundeepteki.org/advice/anthropic-research-engineer-interview-2026); [letsdatascience: OpenAI/Anthropic hiring](https://letsdatascience.com/blog/how-to-land-a-job-at-openai-anthropic-or-google-deepmind)

### Inferences
- **Recurring structure for a project page** (synthesised from Yan's template, Karpathy's recipe and Willison's practice): (1) a one-paragraph TL;DR with the headline result and its caveat in the same sentence; (2) problem and constraints; (3) architecture diagram; (4) key design decisions with the rejected alternatives (link ADRs); (5) evaluation: dataset provenance, baselines, metrics with uncertainty, error analysis; (6) cost and latency; (7) limitations and what's stubbed; (8) reproduce (`make eval` or a single command); (9) links (repo, demo, video, paper).
- A **"Start here" / featured-work** landing pattern like Yan's suits this candidate: lead with GlassBox and Pulse as LLM-systems case studies, Autoscaler as MLOps/SRE, then research. Five equally weighted cards would dilute the signal.
- A **"notes / TIL" stream** in Willison's style is cheap and credible. Short posts such as "why the trust classifier is scikit-learn rather than an LLM judge" or "hash-chaining an audit log: what it does and doesn't guarantee" show reasoning without needing a polished essay.
- Distill.pub-style interactive articles are a high bar. One small interactive element is achievable and differentiating, for example a slider on the CT page that changes the noise level and shows before/after/difference images.

### Gaps
- I could not fetch Vicki Boykis's or Sebastian Raschka's sites this session, so I can't cite specific structural features. Canonical URLs from background knowledge, unverified here: https://vickiboykis.com, https://magazine.sebastianraschka.com
- I found no primary source (an official lab recruiter post) that describes how frontier-lab recruiters read portfolio sites. Only interview-prep aggregators and X threads came up.
- I found no documented, verifiable cases of new-grad AI engineers hired at top labs that describe what their portfolio contained.

## 2. Best practices for showing evals honestly (benchmarks, synthetic-data caveats, baselines, ablations, error analysis, model/data cards, reproducibility)

### Takeaway
Credible eval presentation means stating where the eval data came from and how it was built, comparing against simple baselines, reporting uncertainty (CIs or error bars), validating any LLM judge as a classifier against human labels, and showing an error taxonomy with counts, not just a single score. The NeurIPS checklist and model-card templates give a ready-made vocabulary for this: limitations, error bars, compute, intended and out-of-scope use.

### Cited Findings
- Husain argues that unsuccessful LLM products almost always fail to build robust evaluation systems. On his projects, **60–80% of development time** went to error analysis and evaluation. He recommends starting with code-based assertions and error analysis: review about 100 traces, note problems, categorise, count (search-summary of the 2024 post and an interview) — [Your AI Product Needs Evals (2024)](https://hamel.dev/blog/posts/evals/index.html); [Humanloop interview](https://humanloop.com/blog/why-your-product-needs-evals)
- **Husain & Shankar evals FAQ** (first published May 2025; a mirror is dated Jan 2026, so it is a living document). Fetched via the GitHub mirror:
  - Synthetic data: ground it in real logs and generate across explicit **dimensions** (feature × scenario × persona) with injected edge cases. "Don't naively prompt 'give me 50 queries'."
  - Generic off-the-shelf metrics are "generic enough to be useless for diagnosing your application". Use application-specific failure modes instead (e.g., "Failure to Escalate to Human").
  - Review traces until **theoretical saturation**, "dozens to ~100 to start". Use **binomial/Wilson intervals** on failure rates and don't over-trust deltas from a handful of examples.
  - **Treat an LLM judge as a classifier**: human gold labels, train/dev/test split, iterate on dev, hold out test, report **TPR/TNR or precision/recall, not raw accuracy**, re-validate periodically.
  - Prefer **binary pass/fail** on single criteria over Likert scales.
  - Sources: [GitHub mirror of evals FAQ](https://github.com/sratomun/agentic-ai-kb/blob/main/raw/blogs/2026-01-15-husain-evals-faq.md); [original FAQ](https://hamel.dev/blog/posts/evals-faq/); [Binary vs Likert Q&A](https://hamel.dev/blog/posts/evals-faq/why-do-you-recommend-binary-passfail-evaluations-instead-of-1-5-ratings-likert-scales.html)
- **Eugene Yan, "Product Evals in Three Simple Steps"** (c. late 2025): (i) label a small dataset, (ii) align LLM evaluators to it, (iii) run the eval harness on every config change. He has separate posts on task-specific evals that do and don't work, and on the effectiveness of LLM-as-judge — [Product Evals](https://eugeneyan.com/writing/product-evals/); [LLM-evaluators](https://eugeneyan.com/writing/llm-evaluators/); [eval tag](https://eugeneyan.com/tag/eval/); [Yan on X](https://x.com/eugeneyan/status/1993498057800139023)
- **NeurIPS Paper Checklist** (the current checklist guidelines page):
  - A dedicated **Limitations** section is encouraged.
  - Answer "Yes" on error bars only if main claims carry error bars, CIs or significance tests, with the "factors of variability" stated and the computation method explained.
  - Report **compute type and amount** per run and in total.
  - Critics note the checklist is self-reported: it "verifies intention, not execution".
  - Sources: [NeurIPS Paper Checklist Guidelines](https://neurips.cc/public/guides/PaperChecklist); [2021 checklist (older)](https://neurips.cc/Conferences/2021/PaperInformation/PaperChecklist); [arXiv 2605.08586 critique](https://arxiv.org/pdf/2605.08586)
- **Hugging Face model card template** (fetched directly). Sections: Model Details → Uses (Direct / Downstream / **Out-of-Scope**) → **Bias, Risks, and Limitations** ("Users ... should be made aware of the risks, biases and limitations of the model") → How to Get Started → Training Details → **Evaluation (Testing Data, Factors, Metrics, Results)** → Model Examination → Environmental Impact → Technical Specs → Citation — [HF modelcard_template.md](https://github.com/huggingface/huggingface_hub/blob/main/src/huggingface_hub/templates/modelcard_template.md)
- **Mitchell et al., "Model Cards for Model Reporting"** (FAT* 2019, older) defines nine sections: model details, intended use, factors, metrics, evaluation data, training data, quantitative analyses, ethical considerations, caveats & recommendations. Datasheets for Datasets (Gebru et al.) is the data-side counterpart — [arXiv 1810.03993](https://arxiv.org/pdf/1810.03993); [ACM DL](https://dl.acm.org/doi/pdf/10.1145/3287560.3287596)
- Karpathy (2019, older): build the evaluation skeleton and **dumb baselines** before the real model — [Recipe](https://karpathy.github.io/2019/04/25/recipe/)
- **Papers with Code was sunset on 24 July 2025.** Hugging Face launched "Trending Papers" with Meta as a partial replacement, and the leaderboard data survives only as a static GitHub snapshot (last updated 8 Sept 2025). Don't plan on a PwC leaderboard entry as a credibility signal — [Coursera explainer](https://www.coursera.org/articles/papers-with-code); [Hyper.AI news](https://hyper.ai/en/news/42900)

### Inferences
- **GlassBox, 183-question synthetic benchmark.** Present it as "author-constructed synthetic benchmark (183 Qs), stratified by [category list]". State who wrote the questions and whether any were held out while iterating on prompts; otherwise say plainly that it is a development set, not a test set.
  - Report per-category pass rates with Wilson 95% CIs. Illustration (my computation): 90% on all 183 gives a CI of about **84.8–93.6%**, but 90% on a 20-question category gives about **70–97%**. This shows why per-category numbers need intervals.
  - Report refusal handling as two numbers: correct refusals (TPR on should-refuse items) and over-refusals (FPR on should-answer items). A single "refusal accuracy" figure hides the trade-off.
- **Trust classifiers.** Report precision/recall or a confusion matrix against a trivial baseline (majority class, keyword rules) and an LLM-judge baseline, with label provenance (who labeled, how many examples). If an LLM judge appears anywhere, report its TPR/TNR against human labels.
- **"254 tests"** is a weak signal on its own. Break it down instead (e.g., "N unit / N integration / N eval-regression tests; CI fails if citation-grounding rate drops below X") and link the CI run.
- **Error-analysis section.** A short table of failure categories with counts and one anonymised example each (e.g., "cited a doc that doesn't support the claim: 7/183") will read as more senior than any headline score.
- **Reproduce block.** One command (e.g., `make eval` / `python -m glassbox.eval --suite full`) plus the commit hash and model versions/dates. LLM outputs drift when providers update models, so pin and date them.
- **Model/data cards.** Add a short model card for the trust classifiers and the CT U-Net (intended use, out-of-scope use such as "not for clinical use", eval data, limitations), and a datasheet for the synthetic benchmark.

### Gaps
- I couldn't fetch the full text of Husain's 2024 post or Yan's posts to quote them directly; summaries come from search results and a GitHub mirror.
- I found no authoritative 2026 survey of hiring managers that quantifies how much eval presentation affects hiring outcomes.

## 3. How to present papers under review or under double-blind review (naming the venue, preprints, ethical "under review" listing)

### Takeaway
Policy is venue-specific, so the venue's own call for papers overrides general IEEE norms. **IEEE DELCON 2026 explicitly forbids posting a paper with the same title and abstract to arXiv or public mailing lists until review completes, and requires that manuscripts not reveal author identity "directly or indirectly".** Until a decision, a public portfolio entry naming DELCON together with the paper's title or abstract risks violating that rule. The safe pattern is a separate "Manuscripts under review" section with a generic description and no title, abstract or PDF. Once accepted, switch to the venue name, "to appear", and IEEE's accepted-version posting rules.

### Cited Findings
- **IEEE DELCON 2026** (5th IEEE Delhi Section conference, BITS Pilani, **19–21 Nov 2026**; firm submission deadline **31 July 2026**; submissions via EDAS):
  - "strictly follow a double-blind review process"
  - authors must ensure manuscripts "do not reveal their identity, either directly or indirectly"
  - non-conforming papers are "rejected without review"
  - "Papers with the same title and abstract as the submitted manuscript should not be posted on any public repository (e.g., arXiv.org) or shared through public mailing lists prior to the completion of the review process"
  - Sources (search-summary of the official page; direct fetch blocked): [DELCON 2026 Submission Guidelines](https://www.bits-pilani.ac.in/delcon2026/submission-guidelines/); [DELCON 2026 home](https://www.bits-pilani.ac.in/delcon2026/); [Important Dates](https://www.bits-pilani.ac.in/delcon2026/important-dates/)
- **General IEEE preprint policy.** IEEE doesn't treat preprints as prior publication and allows posting to arXiv or TechRxiv before submission, provided the author can still transfer copyright. Recommended arXiv licence: "arXiv.org perpetual, non-exclusive license 1.0". After acceptance, the preprint must carry an IEEE copyright notice. After publication, replace it with the full citation and DOI/Xplore link, or with the accepted (not published) version plus copyright notice and link — [IEEE Preprint Policy (CIS PDF)](https://cis.ieee.org/images/files/Publications/IEEE_Preprint_Policy.pdf); [IEEE author-posting FAQ](https://www.ieee.org/content/dam/ieee-org/ieee/web/org/pubs/author_version_faq.pdf); [IEEE conference submission policies](https://conferences.ieeeauthorcenter.ieee.org/author-ethics/guidelines-and-policies/submission-policies/). Note: one summarised IEEE text says arXiv is the "only IEEE approved third-party repository". That appears to come from an older policy version, and another summary mentions TechRxiv, so check the current text.
- **IEEE venues vary.** Double-blind review is adopted per society, journal or conference. Some (e.g., IEEE SERVICES) allow arXiv preprints if the submission is anonymised. **IEEE Communications Letters requires authors with an arXiv preprint to switch to non-blind review or face rejection.** IEEE RAS guidance tells reviewers not to search for preprints — [CASRAI summary](https://casrai.org/dictionary/term/ieee-double-blind-peer-review); [IEEE ComSoc Comm Letters policy](https://www.comsoc.org/publications/journals/ieee-comml/ieee-communications-letters-regular-double-blind-review-process); [IEEE CS 2026 publication policies](https://host.conferences.computer.org/2026/publication-policies/)
- **Contrast with ACL (NLP).** Since 15 Feb 2024, ACL/ARR has had **no anonymity period**: authors may post and discuss non-anonymous preprints at any time, though submissions must still be anonymised. A 2026 ACL Findings paper reviews the effects and finds elite institutions preprint more (52% vs 36% by 2025) — [ARR anonymity update](http://aclrollingreview.org/anonymity/); [ACL tweet (Jan 2024)](https://x.com/aclmeeting/status/1745794278025277841); [The Double Bind (ACL Findings 2026)](https://aclanthology.org/2026.findings-acl.222/)
- **CV/website norms.** Papers submitted but not accepted shouldn't appear under "Publications". Use a separate "Under Review" section and label it clearly. Weigh anonymity during double-blind review against showing the committee your pipeline — [Inside Higher Ed (2012, older)](https://www.insidehighered.com/advice/2012/12/03/essay-how-list-scholarship-hasnt-been-published-yet); [Daily Nous CV do's and don'ts (Feb 2026)](https://dailynous.com/2026/02/17/cv-dos-and-donts/); [ResearchGate thread](https://www.researchgate.net/post/Should_you_include_publications_in_review_or_under_preparation_in_a_CV)
- Double-blind submissions shouldn't link to personal websites or GitHub/GitLab profiles that identify authors. Anonymous repositories (e.g., anonymous GitHub mirrors) are the usual workaround for code — [ICPE double-blind FAQ](https://icpe2023.spec.org/double-blind); [GitHub community discussion](https://github.com/orgs/community/discussions/175306); [IEEE TCRTS double-anonymous requirements](https://cmte.ieee.org/tcrts/?p=1927)

### Inferences
- **DCI paper (DELCON 2026).** Before the decision, list it as "Manuscript under double-blind review at an IEEE conference (2026) — explainable ML for a circularity index (nested LOO-CV XGBoost + SHAP)". Leave out the exact title, abstract, PDF and repo links that match the submission.
  - The conference is 19–21 Nov 2026, so notification has probably happened or is imminent as of 3 Oct 2026. The candidate should check EDAS.
  - If accepted: "**Accepted, IEEE DELCON 2026 (to appear)**", with the title. Post the accepted version only with the IEEE copyright notice. After publication, link the Xplore DOI.
  - If rejected: drop the venue name and describe it as a working paper. Never leave a stale "under review at X".
- **EMS / GraphSAGE-VAE-XGBoost paper.** The venue is unknown to me, so look up its anonymity and preprint policy. Under strict double-blind rules, use the same generic "under review" wording.
  - If the venue is ACL-style (preprints allowed), an arXiv preprint plus a named venue is fine.
  - The data-owner question (IIT Madras) is separate; see Q7.
- **Ethical wording checklist.** Never put an under-review paper under "Publications". Never write "IEEE paper" for a submission. Give the date of submission status. Separate "accepted", "under review" and "preprint" visually. Expect a reviewer-recruiter to check the venue's accepted list.

### Gaps
- I couldn't fetch DELCON's important-dates page (egress blocked), so the **notification-of-acceptance date is unknown**. Search summaries gave only the 31 July 2026 deadline and the 19–21 Nov conference dates.
- DELCON's guideline as summarised covers posting to public repositories and mailing lists. It doesn't explicitly mention personal websites or LinkedIn. Treating those as covered is my inference, based on the "directly or indirectly" identity clause.
- The EMS paper's venue wasn't provided, so its policy couldn't be checked.

## 4. How to present LLM-application engineering (guardrails, structured outputs, failover, evals, cost/latency) as engineering signal rather than "wrapper" projects

### Takeaway
What separates a "wrapper" from an engineering project in a reviewer's eyes is evidence about failure modes: eval reports, error analysis, measured cost and latency, defined trust boundaries, and explicit trade-offs. The "AI engineer" role definition itself centres on product-specific data and evals. Lead each LLM project page with the system property it guarantees, and show the evidence that the guarantee holds.

### Cited Findings
- swyx's "The Rise of the AI Engineer" (June 2023, older) frames the role as application engineering on foundation models, emphasising product-specific data and evaluations. He later describes three types of AI engineer — [Latent Space essay (2023)](https://www.latent.space/p/ai-engineer); [RedMonk conversation with swyx (Jul 2025)](https://redmonk.com/blog/2025/07/23/shawn-swyx-wang-ai-engineer/); [AI Engineer about](https://www.ai.engineer/about)
- Secondary 2026 guides say the difference between a "GPT wrapper" and "hire this person" comes down to **eval reports and live deployment**. They say hiring managers scan for observability, error handling and real numbers, want people who reason about "constraints, trade offs, and failure modes", and rate an **evaluation harness** as one of the most underrated portfolio projects. Low-to-medium authority (portfolio-project repos and blog posts) — [landedjobs/projects-to-land-an-ai-job](https://github.com/landedjobs/projects-to-land-an-ai-job); [dev.to: 5 AI portfolio projects 2026](https://dev.to/klement_gunndu/5-ai-portfolio-projects-that-actually-get-you-hired-in-2026-5bpl); [ai-tldr: build an AI portfolio](https://ai-tldr.dev/learn/building-ai-apps/ai-career-path/build-ai-portfolio/)
- Husain & Shankar: application-specific failure modes over generic metrics; judges validated as classifiers — [evals FAQ mirror](https://github.com/sratomun/agentic-ai-kb/blob/main/raw/blogs/2026-01-15-husain-evals-faq.md)
- Yan's design-doc template puts performance (throughput/latency), security, data privacy, monitoring/alarms, **cost**, and **alternatives considered** on equal footing with methodology — [ml-design-docs](https://github.com/eugeneyan/ml-design-docs)
- **ADRs** (Michael Nygard, 2011, older): a short record per architecturally significant decision with Status, Context ("the forces at play ... probably in tension"), Decision ("We will..."), and Consequences (what gets easier, what gets harder, what you are committing not to do) — [ADR GitHub org](https://github.com/architecture-decision-record/architecture-decision-record); [Nygard template summary](https://deepwiki.com/architecture-decision-record/architecture-decision-record/3.1-michael-nygard-template)

### Inferences
- **Frame each LLM project around a guarantee, then show the evidence.**
  - **Pulse:** "The LLM never sees SQL or PII: natural language compiles to a validated DSL, executed by deterministic code." Evidence: a trust-boundary diagram, the DSL grammar or schema, a test set of NL queries with % compiled correctly, % rejected by the validator, and examples of rejected adversarial prompts (prompt injection asking for raw SQL or emails).
  - **Pulse, side-effect guarantees:** BullMQ, HMAC and idempotent receipts are classic distributed-systems signal. Show "exactly-once effect" tests (duplicate webhook → single receipt) rather than just naming the libraries.
  - **GlassBox:** "every answer is either grounded in a cited source or refused, and every decision is logged in a tamper-evident chain". Evidence: citation-support rate, refusal TPR/FPR, a sample audit-log verification command.
    - Precise wording matters. A hash chain makes tampering *detectable*; it doesn't make the log tamper-*proof* unless the chain head is anchored externally. A security-minded reviewer will notice the difference.
  - **Autoscaler, LLM RCA with Claude → OpenAI → in-cluster Random Forest:** state what triggers failover (timeout, 5xx, rate limit, schema-validation failure), the measured p50/p95 latency of each tier, and RCA quality per tier on the chaos-engine fault set. Failover without measured degradation is just a list of providers.
- **Cost and latency table** per project: tokens per request, $/1k requests, p50/p95 latency, cache hit rate if any. Few candidates include this, so it stands out.
- **Link ADRs directly** from the case study (Autoscaler already has them). Two or three ADR excerpts ("We will use Isolation Forest rather than an autoencoder because ...") show judgement quickly.

### Gaps
- I found no primary-source statement from a named AI-lab hiring manager about "wrapper" projects. Available sources are portfolio-guide aggregators.
- I found no 2026 data on how often reviewers actually open linked ADRs or eval reports.

## 5. Live demo patterns, and how to handle demos that may go down (cold start, cost)

### Takeaway
Assume reviewers will hit a cold or broken demo. Always pair a live demo with a recorded 60–120 s walkthrough and annotated screenshots, and say up front how long a cold start takes. On free Hugging Face Spaces, CPU apps sleep after 48 h of inactivity and take tens of seconds to wake. Short GIFs or terminal recordings (asciinema/agg, VHS) near the top of a README are an established pattern.

### Cited Findings
- **Hugging Face Spaces.** Free `cpu-basic` Spaces pause automatically after **48 h of inactivity**, and the sleep time can't be customised on that tier. Cold starts are reported at roughly **30–90 s** for basic CPU Spaces and can reach **2–6 min** for RAG demos that build a FAISS index and load a quantised model. ZeroGPU cold starts are reported under 5 s. These figures are partly from third-party blogs; the 48 h rule is from HF docs — [HF: Manage your Space](https://huggingface.co/docs/huggingface_hub/en/guides/manage-spaces); [example Space commit adding cold-start notice](https://huggingface.co/spaces/antoniogavrilenkov/biomistral-healthcare-chat/commit/13b2b8f5fa0b8a7bb865eaef5bfce76e3fe600a8); [toolfreebie HF Spaces free tier (third-party)](https://toolfreebie.com/hugging-face-spaces-free-gpu/)
- Some developers keep Spaces awake with scheduled GitHub Actions pings — [DEV Community](https://dev.to/0xkoji/prevent-hugging-face-spaces-from-sleeping-with-github-actions-agent-browser-2p4f). (Inference: check HF's terms before relying on this; a recorded fallback is more robust.)
- **README demo media.** Common practice is a short (about 10–20 s) animated terminal demo near the top of the README, after the intro paragraph. It can be recorded with `asciinema rec` and converted with `agg demo.cast demo.gif`, or scripted with VHS. Markdown can't render asciinema casts, so convert them to GIF/SVG, or embed the asciinema player on an HTML page — [Enhance your README with asciinema](https://www.cesarsotovalero.net/blog/enhance-your-readme-with-asciinema.html); [DEV: animated GIFs/SVGs in README](https://dev.to/brpaz/make-your-project-readme-file-stand-out-with-animated-gifs-svgs-4kpe); [GitHub issue example](https://github.com/PicadoLabs/build-with-ai/issues/67)
- Hiring guides list deployment links (Streamlit, Gradio, HF Spaces) among the things recruiters scan for (aggregator) — [letsdatascience 2026](https://letsdatascience.com/blog/the-ml-portfolio-that-actually-gets-you-hired-in-2026)

### Inferences
- **Layered demo pattern for each project card:**
  1. A hero GIF or still, autoplaying and silent, under 3 MB.
  2. "Watch 90-second walkthrough" (self-hosted MP4 or YouTube, with captions).
  3. "Try live demo" with a status badge (uptime check) and expectation text, e.g. "may take ~60 s to wake" or "demo runs on a $X/month budget; rate-limited".
  4. Annotated screenshots of the key screens: GlassBox citation panel, refusal case, audit-log verifier; Pulse NL→DSL preview; Autoscaler chaos run and RCA output.
- **GlassBox on AWS.** Show "last deployed" and "CI status" badges. If the demo uses paid LLM APIs, add per-IP rate limits and a canned-example mode so a reviewer can see grounded citations and refusals without spending tokens.
- **Autoscaler (Kubernetes).** A live cluster is costly. A recorded chaos-engine run with a time-lapse (fault injected → anomaly detected → RCA → remediation, with timestamps) plus a `kind`/`k3d` one-command local reproduction is probably more convincing than a fragile hosted cluster.
- **CT U-Net.** Fits the HF Spaces/Gradio pattern well (small model, CPU inference). Add a static before/after/difference gallery as the fallback.
- **In-page interactive demos.** Precomputed outputs (e.g., cached GlassBox Q&A traces) can be rendered client-side with no backend. That's resilient and shows the real artifacts.

### Gaps
- HF documentation on Spaces sleep timings may have changed in 2026. Cold-start numbers come from third-party blogs, not HF.
- I found no data on what fraction of reviewers click live demos versus watch videos.

## 6. Architecture diagrams: tools, conventions, readability

### Takeaway
Diagrams-as-code (Mermaid for GitHub-native rendering, D2 for cleaner complex layouts) suit versioned READMEs. Excalidraw's hand-drawn look signals "sketch". Readability comes from showing one level of abstraction per diagram, numbering the request flow, and marking trust boundaries and failure paths. These are the things LLM-system reviewers look for.

### Cited Findings
- **Mermaid** has the broadest platform integration (GitHub, GitLab, Notion, Obsidian, VS Code). Diagrams live in Markdown and render in PRs, but the layout engine "struggles with complex architectures" — [InfraSketch: diagram-as-code tools 2026](https://infrasketch.net/blog/best-diagram-as-code-tools-2026); [Taskade: history of Mermaid](https://www.taskade.com/blog/history-of-mermaid)
- **D2** (Terrastruct, 2022) is built for software-architecture diagrams, with multiple layout engines including TALA, cited as the best auto-layout for architecture diagrams. Commentators say it has the cleanest output but narrower native rendering support than Mermaid — [ArchitectureDiagram.ai on D2](https://architecturediagram.ai/blog/d2-diagram-language); [Jagat Singh: Beyond Mermaid (2026)](https://www.jagatsingh.com/blog/2026/beyond-mermaid-plantuml-d2-excalidraw/)
- **Excalidraw** has a sketchy, hand-drawn aesthetic, best for early-stage sketches "where 'this is rough' is the whole point" — [InfraSketch](https://infrasketch.net/blog/best-diagram-as-code-tools-2026); [8starlabs comparison 2026](https://www.8starlabs.com/blogs/architecture-diagramming-tools-2026)
- Yan's ML design-doc template expects **system-context and data-flow diagrams** in the high-level-design section — [ml-design-docs](https://github.com/eugeneyan/ml-design-docs)
- Jay Alammar's visual-explanation style is the go-to ML exemplar for diagram-led explanation — [jalammar.github.io/about](https://jalammar.github.io/about/)

### Inferences
- **Per project, use two diagrams at most:** (1) a system-context diagram (actors, external services, data stores) and (2) one sequence or data-flow diagram for the hardest path.
  - **GlassBox:** query → retrieval → grounded generation → trust classifier → answer/refuse → audit-log append.
  - **Pulse:** NL → LLM → DSL → validator → query planner → DB, with a dashed **trust boundary** showing PII and SQL on the deterministic side only.
  - **Autoscaler:** metrics → Isolation Forest → RCA (Claude → OpenAI → RF failover, with trigger conditions on the edges) → remediation, plus the chaos-engine loop. Grey out or dashed-outline the **LSTM forecaster** and label it "planned".
- **Conventions:** numbered arrows for request order; distinct colours or shapes for LLM calls vs deterministic code vs data stores; a legend; failure/fallback edges in a different line style. Export to SVG so diagrams stay crisp and theme correctly in light and dark mode.
- **Tooling for this repo:** Mermaid in project READMEs (renders on GitHub, stays in sync with code). For the portfolio site, render D2 or hand-tuned SVG for the two or three flagship diagrams, where layout quality matters more.

### Gaps
- I found no empirical study of which diagram styles hiring managers find most readable. The guidance above is practitioner convention.
- I couldn't verify a C4-model source this session (not searched), so C4 isn't cited.

## 7. Handling NDA or closed research data (e.g., IIT Madras ambulance/EMS data): what can be shown

### Takeaway
Show the method, the pipeline, aggregate results and your decisions; don't show records, identifiable fields or (without permission) exact proprietary figures. Get written permission from the data owner or PI for anything quantitative, including the dataset size and source. Where possible, demonstrate the pipeline on a public or synthetic analogue, and offer a password-protected or "available on request" deeper write-up.

### Cited Findings
- **Usually shareable:** the type of problem, your role, process, constraints, decision-making, learnings, anonymised outcomes. **Possibly not shareable:** organisation or product names, exact metrics, screens with real data, internal tools, customer names, and technical architecture — [Open Doors Careers: NDAs in your portfolio](https://blog.opendoorscareers.com/p/what-you-can-and-can-t-show-navigating-ndas-in-your-portfolio); [UX Playbook NDA guide 2025](https://uxplaybook.org/articles/ux-design-portfolio-nda-guide-2025)
- **Tactics:** anonymise identifying details; use abstracted visuals or recreated flows; aggregate or approximate sensitive metrics ("approximately doubled"); keep a "shadow portfolio" that is "to be verified" rather than shared; use **password-protected pages**, giving the password in the application — [Harlow: portfolio under NDA](https://meetharlow.com/blog/how-to-build-a-portfolio-when-your-best-wins-are-locked-by-ndas/); [Wonderlist: showcasing work under NDA](https://www.wonderlist.design/insights/showcasing-work-under-nda); [Freelancermap](https://www.freelancermap.com/blog/can-i-share-nda-protected-work-on-my-portfolio-tips-and-advice/)
- Read the NDA in full and **get written permission** before showcasing protected work — [Freelancermap](https://www.freelancermap.com/blog/can-i-share-nda-protected-work-on-my-portfolio-tips-and-advice/)
- Note: these sources are written for UX/design portfolios. I found no ML-specific authoritative guidance; the transfer to ML is my inference.

### Inferences
- **EMS dispatch paper (3.59M records).** Confirm with the IIT Madras PI or data agreement whether the record count, the geography and the institution name can be stated publicly. If yes, cite them with "data under data-use agreement; not redistributable". If not, write "a multi-million-record state EMS dispatch dataset (data-use agreement)".
  - Showable: the GraphSAGE-VAE-XGBoost pipeline diagram, feature *categories* (not raw fields), the validation design (temporal or spatial splits matter for dispatch data), aggregate metrics with baselines, SHAP/feature-importance plots at an aggregate level, and maps only at a coarse, non-identifying resolution if permitted.
  - Not showable: example rows, free-text call notes, exact locations or timestamps, anything re-identifiable.
- **Synthetic analogue repo.** Publish the pipeline code running on a synthetic generator that mimics the schema (clearly labelled synthetic) so reviewers can run it. This pairs with the "reproduce" pattern without exposing data.
- **Double duty.** The same paper may also be under double-blind review (Q3). The anonymity constraint and the data-use constraint stack, so the public entry should be the most conservative of the two.

### Gaps
- I found no published IIT Madras data-sharing or publicity policy for this dataset. The candidate must check their own agreement.
- I found no ML-specific (as opposed to UX) authoritative guidance on NDA portfolio content.

## 8. Avoiding overclaiming (e.g., "SHAP" for hand-weighted attributions, placeholders described as implemented, % gains on unrealistic noise) and how to phrase honestly

### Takeaway
Reviewers discount a whole portfolio after one inflated claim. The common red flags are improvements without a baseline, vague impact language, unverifiable "deployed to production" claims, missing limitations, leakage-driven metrics, and mislabelled techniques. Use the method's correct name, state the test conditions next to the number, label stubs as stubs, and put the caveat in the same sentence as the headline.

### Cited Findings
- **Red flags reviewers look for:** improvement claims without a baseline ("40% better than what?"), vague language ("significantly improved"), "deployed to production" with no proof (called "the most commonly inflated claim"), no limitations, accuracy on imbalanced data, and no reproducible code ("claims without evidence are just stories"). Medium/low authority (2026 blog) — [Learnist: 12 red flags in AI case studies (2026)](https://www.learnist.org/ai-case-study-red-flags-portfolio-2026/)
- **Data leakage** is called the most common reason ML results turn out false. A worked example drops from 99.8% to about 75% accuracy once leakage is fixed — [DEV: 5 ways your model's score is lying](https://dev.to/happyhell/5-ways-your-ml-models-score-is-lying-to-you-4mp3); [Wikipedia: Leakage (ML)](https://en.wikipedia.org/wiki/Leakage_(machine_learning))
- NeurIPS asks authors to report error bars with stated sources of variability, and a limitations section — [NeurIPS checklist](https://neurips.cc/public/guides/PaperChecklist)
- **CT denoising realism.** The standard realistic benchmark is the Mayo Clinic/AAPM Low Dose CT Grand Challenge (2016) and its later public data release. One summary gives 299 scans (99 head, 100 chest, 100 abdomen); this may conflate the 2016 challenge with the later TCIA release, so verify. Realistic simulation adds **Poisson (photon) noise in the sinogram plus electronic Gaussian noise**, and papers compare against simple Gaussian-noise generation as a weaker baseline — [SSinyu CT-Denoising-Review](https://github.com/SSinyu/CT-Denoising-Review/blob/master/README.md); [arXiv 2104.02326](https://arxiv.org/pdf/2104.02326); [arXiv 2403.03551](https://arxiv.org/pdf/2403.03551)
- **SHAP** refers specifically to Shapley-value-based attributions (Lundberg & Lee, NeurIPS 2017, older). URL from background knowledge, not fetched this session — [arXiv 1705.07874](https://arxiv.org/abs/1705.07874)
- Secondary sources say frontier labs screen for "calibrated epistemic honesty" (low-authority interview-prep blog) — [Sundeep Teki](https://www.sundeepteki.org/advice/anthropic-research-engineer-interview-2026)

### Inferences (phrasing patterns for this candidate)
- **Mislabelled attributions.** If any project computes hand-weighted or heuristic feature contributions, call them "weighted feature contributions (heuristic)" or "rule-based attribution", not SHAP. Use "SHAP" only where a SHAP explainer actually runs (e.g., TreeSHAP on the DCI XGBoost model).
  - For the DCI paper's small-n nested LOO-CV, report n and the outer-loop metric spread, and note that SHAP rankings may be unstable at small n.
- **Placeholders.** For the Autoscaler LSTM, write "Forecasting: interface defined; LSTM model *not yet implemented* (returns baseline forecast)". In diagrams, dash or grey the component. Never list "LSTM" in a tech-stack badge row. A reviewer who opens the code and finds a stub will discount everything else.
- **CT U-Net.** Say "+12 dB PSNR (SSIM 0.07 → 0.29) on *synthetic additive noise at σ = [value]*, a deliberately extreme setting. SSIM 0.29 means outputs remain far from clean; this is a learning project, not clinically validated."
  - Add baselines: noisy input, Gaussian filter, non-local means or BM3D. Add a PSNR/SSIM-vs-noise-level curve. Next step: realistic low-dose noise (Poisson-in-sinogram) or the Mayo/AAPM data.
  - Leading with "+12 dB" without the noise caveat is the exact pattern the red-flag lists warn about.
- **Synthetic benchmarks.** Say "183 author-written synthetic questions". Don't say "183-question benchmark" alone, since that implies an external benchmark.
- **"CI/CD to AWS".** Name what is automated (tests → build → deploy to [service]) and link a passing run. Don't use "production" unless real users exist.
- **"Under review".** Never "IEEE paper" or "published"; see Q3.
- **General rule.** Put the number, the condition and the caveat in one sentence. Have a "Limitations & what's next" box on every project page. A "What I'd do differently" paragraph signals the calibrated honesty labs reportedly screen for.

### Gaps
- I couldn't fetch the SHAP paper or SHAP docs this session (egress blocked). The citation is from background knowledge.
- I found no survey data quantifying how hiring managers react to overclaiming. The evidence is practitioner and blog consensus (Learnist, DEV) and should be presented as such.
- The red-flag sources are 2026 blogs of moderate or unknown authority; I found no primary statement from a named ML hiring manager.
