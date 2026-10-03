# Yash Chauhan — Portfolio Source of Truth

This repo holds everything collected for the personal portfolio site: the facts, the claims we can defend, the research behind the design and stack, and the decisions still open. **Development has not started.** Nothing here is published.

| Phase | Status |
|---|---|
| 1. Collect information (resume, GitHub, local projects) | **~90%.** Flagship repos read in depth (Oct 3). AgentEval and timeentropy are still only on the Mac, so they're unread. |
| 2. Deep research (best practices, design, stack, hosting, SEO) | **In progress.** The report will land in `reports/`, with notes in `research_notes/`. |
| 3. Content + design decisions | **Next.** See [Decisions needed](#decisions-needed). |
| 4. Development | Not started |

---

## Sources scanned

- **Resume:** `Yash_Chauhan_Master_Resume.pdf` (this folder, 2 pages, Aug 2026). The LaTeX source is in `pr0wl1ng/Job-Search---Yash/Resume_Source/`.
- **GitHub, read in depth (Oct 3, cloud session):** Glassbox, Pulse, Autoscaler, Kalakraftdev, CT-Denoising-U-Net, Gridee-android, the profile repo `yash-vks-chauhan`, and `pr0wl1ng/Job-Search---Yash` (DELCON paper, ESWA manuscript, resume source).
- **Local machine (earlier pass, on the Mac):** every git repo under `~` (depth 5), plus project folders on Desktop, Documents and home. Local-only paths below (`~/Desktop/...`) come from that pass.
- **Not verified:** the live demo URLs. The cloud container's network policy blocks them, so uptime was not checked in this pass.

---

## Profile

- **Name:** Yash Chauhan
- **Location:** Chennai, India
- **Email:** yash.vks.chauhan@gmail.com
- **LinkedIn:** ⚠️ two different handles are in use. The resume and this README use `linkedin.com/in/yashvschauhan`. The GitHub profile README links `linkedin.com/in/yash-vks-chauhan`. **Confirm which one is real** and use it everywhere (it matters for name SEO).
- **GitHub:** https://github.com/yash-vks-chauhan. The bio, website and location fields are empty; fill them once the site is live.
- **Phone:** on the resume. ⚠️ **It is also public in the GitHub profile HUD image** (`assets/hud-header.svg`, bottom "COMMS" row). If you don't want it public, remove it there too. Recommendation for the site: no phone; email + LinkedIn + a contact form are enough.

## Education

- **SRM Institute of Science and Technology, Kattankulathur.** B.Tech CSE, AI/ML specialization, Aug 2023 – 2027 (expected). CGPA 8.5/10.
  - II2S Hack2Skill 2024: top 35% of 300+ teams. Hack 3.0 Street participant.
  - GitHub Community SRM: Technical Associate. ISTE: Student Member.
- **Sanjay Ghodawat International School, Kolhapur.** Class XII CBSE 70% (2023). Class X CBSE 89% (2021). *Recommendation: leave school marks off the site; they add nothing for these roles.*

## Experience

### Co-Founder & Founding Engineer — Gridee (Jan 2026 – present)
Smart-parking platform: live availability, advance and instant reservations, wallet and Razorpay payments. **8,000+ combined Android + iOS downloads** (resume claim; keep a store-console screenshot as proof).
- QR and number-plate check-in/out (CameraX, ML Kit OCR, ZXing). Operator workflows for entry, exit and occupancy.
- JWT + Retrofit + OkHttp security, coin-based refundable bookings, email and Google sign-in, Razorpay without storing card data.
- **Stack:** Kotlin, CameraX, ML Kit, ZXing, Retrofit, OkHttp, JWT, Razorpay, React, TypeScript, Vite.
- **Links:** https://www.gridee.in/ · [Play Store](https://play.google.com/store/apps/details?id=com.gridee.parking) · [App Store](https://apps.apple.com/us/app/grideeapp/id6757460398)
- **What's public:** the GitHub repo **`Gridee-android` isn't the Android app.** It is the React + Vite site for `docs.gridee.in` (About, Privacy, Data Safety pages) and still has the default Vite template README. The Kotlin app is local only (`~/gridee-android`). The backend is the co-founder's repo (`itsmerajeev11/Gridee`, 321 commits). Perf artifacts are in `~/gridee-perf029-artifacts`.
- **Portfolio angle:** the only work here with real users at scale. Show store links, app screenshots (`~/Desktop/appshots.pdf`), your exact role split with the co-founder, and one hard engineering story (e.g. OCR check-in reliability or payment refunds).

### Research Intern — IIT Madras (Mar 2025 – Mar 2026)
Tamil Nadu 108 ambulance (EMS) analytics. See the EMS paper under Research.
- Ingested 5+ years of dispatch and road-construction data with 100+ quality checks. Simulated 5,000+ routes (peak-hour, monsoon, construction).
- Built a 55-column analytical matrix and a GraphSAGE-VAE-XGBoost workflow for drift and anomaly analysis.
- An autoencoder flagged 8,567 outliers, which fed a Time Drift Index. A counterfactual XGBoost model reached **8.37% WMAPE**.
- Designed a fairness-aware Quantum Stability Index (five stability bands). Ran t-tests, ANOVA, Kruskal-Wallis and SHAP. Equity analysis across metro, tribal, rural, APL, pediatric and behavioral cases.
- **Stack:** Python, Pandas, SciPy, scikit-learn, XGBoost, SHAP, GraphSAGE, VAEs, OSMnx, NetworkX, Folium, Docker.
- **Local:** `~/Desktop/ambulance`, `~/Desktop/108-ambulance.ipynb`. Private repo `Ambulance`.

### Summer Intern, Electrical & Instrumentation — Hindalco Industries, Mumbai (Jun – Jul 2025)
- Proficy Historian / OSI PI sensor streams through MES pipelines. Predictive maintenance in MTell (ARIMA plus custom anomaly detection).
- Real-time alerts in maintenance workflows. Helped deliver **20% less unscheduled downtime** and **15% lower maintenance cost** (team-level outcome; keep the "helped deliver" wording).
- **Local:** `~/Desktop/DOCS` (internship report, certificate).

---

## Positioning (proposed)

Reading the code side by side shows one thread through almost everything: **AI systems that can explain and defend what they did.**

| Work | How it shows the thread |
|---|---|
| GlassBox | Cites every claim, refuses when evidence is missing, hash-chains every decision, replays any answer |
| Pulse | The LLM only proposes a validated DSL; a human approves; the event log is the source of truth |
| Autoscaler | Detect → explain → act, with dry-run, cooldowns, circuit breaker and approval gates around every healing action |
| IIT Madras EMS | Separates real operational drift from context the district can't control, and checks equity |
| DCI paper | Nested CV with no leakage, SHAP, and an honest null result on the UPI hypothesis |

Your GitHub profile README already says this ("turning model demos into inspectable systems", "systems that explain themselves"). **Recommendation:** make it the headline. Something like *"AI/ML engineer who builds AI systems you can audit."* Then back it with the founder story (Gridee: real users) and the research (IIT Madras). It fits AI/ML engineer, AI engineer and backend/SWE roles without three separate pitches.

---

## Project deep-dives

What each repo actually contains (read Oct 3, 2026), the best angle for the site, and what to fix first. Numbers come from the code, tests or docs, not the resume.

### 1. GlassBox: auditable wealth-advisory AI (strongest flagship)

- **Repo:** [Glassbox](https://github.com/yash-vks-chauhan/Glassbox), MIT, active (last commit Oct 3, 2026). **Live:** [glassbox…sslip.io](https://glassbox.15-252-203-137.sslip.io/login), one-click demo seats (advisor / compliance).
- **What it is:** a multi-tenant web app where advisors ask about a client and every claim is cited to an approved document (the client's IPS, fund factsheets, regulation). Out-of-scope questions are refused, with the missing source named and a one-click escalation. Every decision is stored with its retrieved passages, kept and dropped claims, and trust scores, and is **hash-chained per tenant**. The database refuses `DELETE` on audit tables. A compliance seat works a review queue under a four-eyes rule.
- **Engineering depth:** FastAPI (~16.6k lines) + Next.js 16 / React 19 (~14k lines). Owner / admin / compliance / advisor RBAC, TOTP MFA, rotating refresh tokens with reuse detection, rate limits, prompt-injection containment, a STRIDE threat model mapped to code and tests, and 14 runbooks.
- **Tests and ops:** 249 backend tests passing on SQLite (+5 Postgres-only), 254 on Postgres, 11 Playwright e2e specs. CI runs on SQLite and Postgres 15 and smoke-tests the Docker stack. CD: GitHub Actions → AWS via **OIDC** (no stored keys) → ECR arm64 images → rollout over SSM → smoke test. Runs on one Graviton `t4g.small` in Mumbai (~$14/month), with Caddy TLS, SSM Parameter Store and daily EBS snapshots.
- **ML:** three small scikit-learn models (grounding scorer = logistic regression on embedding similarity + numeric match; refusal router; fallback classifier). Training sets are small: 320 / 240 / 160 rows, synthetic or bootstrapped. Reviewer labels are now exported so the models can be retrained on them.
- **Measured:** on a 183-question synthetic benchmark (`glassbox-eval-v4`, Oct 2, 2026): 100% outcome accuracy, 100% citation accuracy, 0% hallucination, determinism 1.00, faithfulness 0.98, p95 latency 1 ms. The README itself says the benchmark was written alongside the engine. **Keep that caveat on the site; it is a credibility asset.**
- **Visuals ready:** 8 screenshots in `docs/screenshots/` (landing, ask, refusal, audit log, audit replay, review, insights, admin) + `docs/social-preview.png`. Design language: warm paper background, Source Serif 4 headings, Geist + Geist Mono, navy accent.
- **Fix before featuring:**
  - The resume says "ChromaDB". The code uses a NumPy index with hash embeddings (bge-small optional). Change the resume.
  - The resume dates it Feb–May 2026; the repo has been active through Oct 2026.
  - The GitHub profile HUD shows "groundedness 88%, refusal recall 92%", which matches nothing in the repo. Use the README's numbers everywhere.
  - Get a real domain (the `sslip.io` address looks temporary) and record a 60–90 s demo video in case the server is down.

### 2. Pulse: AI-native campaign CRM

- **Repo:** [Pulse](https://github.com/yash-vks-chauhan/Pulse). **Live:** [pulse-ai-crm.vercel.app](https://pulse-ai-crm.vercel.app/) (login gate; the access code is on the login screen). **Demo video:** `~/Desktop/pulse-demo.mp4`.
- **Origin:** built for the **Xeno Engineering Internship assignment 2026 (SDE track)**, due June 15, 2026 (see `Project_README.md`). Say so on the site; a well-scoped assignment done this thoroughly is a good story. Did it lead to an offer or interview? (see questions)
- **What it is:** a marketer types who to reach in plain English. The LLM turns it into a **validated Segment DSL** (zod, whitelisted fields and operators); a dedicated compiler turns the DSL into a parameterized Prisma query. **The LLM never writes SQL, never touches the DB, never sees PII.** Messages go to a separate **Channel Simulator** (WhatsApp, SMS, email, RCS) that injects failures, latency, throttling, duplicate and out-of-order callbacks, and retries webhooks with backoff.
- **Engineering depth:** monorepo with 3 services + shared zod contracts. BullMQ batch dispatch, retries with backoff + jitter, dead-letter queue. A forward-only status state machine enforced in SQL `WHERE` clauses. HMAC-SHA256 on both directions of CRM ⇄ simulator traffic. AES-256-GCM PII encryption with a blind index. Idempotent receipts, failover to the next channel made idempotent by a `UNIQUE` parent link, 72 h last-touch attribution. Seed data: 5k customers, 25k orders.
- **Tests:** ~71 unit tests (state machine, HMAC, DSL compiler, crypto, receipts, failover, attribution, AI logic) plus a **1,000-message integration test under chaos** (30% duplicates, 30% out-of-order, 15% WhatsApp failures) that asserts convergence invariants.
- **Standout artifact:** `docs/AI_WORKFLOW.md` logs what was delegated to Claude Code, which decisions were yours, what you caught in review (a SENT-vs-delivered race; in-batch duplicate merging) and what you rejected. That is exactly the "judgment over AI tools" signal hiring managers look for in 2026. **Feature it.**
- **Fix before featuring:** the README's tech table says the AI chain is "OpenRouter → Gemini → Groq → Anthropic", but `ARCHITECTURE.md` only describes Anthropic. Make them agree. Remove `VUEBITS_README.md` / `SHADCN-GUIDE.md` from the root (template notes).

### 3. Autoscaler: AI-driven Kubernetes self-healing

- **Repo:** [Autoscaler](https://github.com/yash-vks-chauhan/Autoscaler). No live demo (runs on a local Kind cluster). Last commit Mar 27, 2026. No license file.
- **What it is:** a payment API with 10 Prometheus metrics and 6 chaos hooks, Prometheus → NestJS control plane → TimescaleDB, a FastAPI AI engine, a chaos engine, a watchdog, and a Next.js operator dashboard. All run as Kubernetes workloads with RBAC, deployed by `./scripts/deploy.sh deploy`.
- **What's real in the code:**
  - **Detection:** rolling 3σ baseline + Isolation Forest.
  - **Root cause:** a networkx service-dependency graph.
  - **Reasoning:** Claude → OpenAI → in-cluster Random Forest, all returning the same JSON contract, with 5 s timeouts and mock modes.
  - **Decisions:** rule-based with an action whitelist; rollback needs human approval.
  - **Healing service** (`healing.service.ts`, 1.2k lines): dry-run mode, a 120 s cooldown per service+action, a max-replica cap, a per-service circuit breaker, an approval gate, waits for rollout readiness, and an audit of every action.
  - **Dashboard:** 7 live Next.js pages; SLO and Settings stay hidden until validated data exists.
  - **Docs:** 7 ADRs.
- **What isn't real yet (the README says so too):**
  - The LSTM autoencoder is a placeholder file (`"Phase 4 placeholder"`). TensorFlow isn't in `requirements.txt`. ADR-007 is "Planned". Only the warm-up counter / gating exists.
  - **"SHAP" is not the `shap` library.** `shap_explainer.py` is a lightweight attribution helper with hand-set per-root-cause weights. Call it "SHAP-style feature attribution" or "per-feature attribution".
  - The Random Forest fallback is trained on synthetic bootstrap scenarios, not real incident history yet.
  - There are no tests in the repo.
  - `docs/architecture.png` is Phase 1 only and has overlapping text. Redraw it for the site.
- **Portfolio angle:** the *safety rails* (dry-run, cooldown, circuit breaker, approval gate, identical JSON contract across providers) are the senior-sounding part. Lead with those, not with "AI". A 60 s screen recording of chaos → detection → healing would be the best visual.

### 4. Kalakraft: full-stack art marketplace

- **Repo:** [Kalakraftdev](https://github.com/yash-vks-chauhan/Kalakraftdev) (app in `artcommerce/`). **Live:** [kalakraftdev.vercel.app](https://kalakraftdev.vercel.app). **1,195 commits** (local count).
- **What it is:** a Next.js 15 storefront + admin. ~73k lines of TS/TSX, **59 API route handlers**, **20 Prisma models**. Fuse.js search, cart / checkout / coupons, order tracking, reviews, support tickets with attachments, admin analytics, low-stock email alerts (Brevo). Pusher real-time updates, Cloudinary / ImageKit + Sharp media, Three.js hero, GSAP + Framer Motion.
- **Best story:** `SECURITY_FINDINGS.md` is a self-audit of production code. It found and fixed DB credentials committed in `vercel.json`, an order IDOR, unauthenticated support-ticket and coupon endpoints, PII leaking over public real-time channels, unrestricted uploads, and a raw-SQL injection risk. It added rate limits, hashed OTPs, rotating refresh tokens and DB-checked admin roles. *"I audited my own shipped app and fixed 6 critical issues"* is a stronger line than the feature list.
- **Fix before featuring:**
  - Clean the repo root: `.DS_Store`, ~30 stray working notes (`*_FIX.md`, `*_SUMMARY.md`), and junk files named `INSERT`, `VALUES`, `next`, `artcommerce@0.1.0`, `darkveil.vue/json`.
  - The README says "private and not licensed" and "by the KalaKraft team". Clarify ownership: is it a real business with real orders (the HUD says "paying customers")? Who else built it?
  - The resume says NextAuth.js, but `next-auth` isn't a dependency (auth is Firebase + JWT). Fix the resume.
  - There are no tests or CI. A small Playwright smoke test would close that gap.

### 5. CT / X-ray denoising U-Net

- **Repo:** [CT-Denoising-U-Net](https://github.com/yash-vks-chauhan/CT-Denoising-U-Net) (6★, most-starred). **Live:** [Streamlit app](https://ct-denoising-u-net-q6xbszyfajozfqpjhuqqlw.streamlit.app/).
- **What it is:** a TensorFlow/Keras grayscale U-Net (256×256, 32→512 filters, skip connections, mixed precision). Synthetic noise injection + augmentation, CLI inference, and a Streamlit app.
- **Measured (`denoising_metrics.csv`, 321 samples):** PSNR **6.13 → 18.34 dB (+12.2 dB)**, SSIM **0.074 → 0.287**, MSE **−92.6%**.
- **Be careful with the claims:**
  - The resume says "95% noise reduction". The data shows **92.6% MSE reduction**.
  - "~4× faster convergence" has no evidence in the repo.
  - The noisy inputs sit at ~6 dB PSNR, which is extremely heavy synthetic noise, and the final SSIM of 0.29 is low in absolute terms. An ML reviewer will notice. State the noise model and the absolute numbers, not just the gain.
  - The 321 "validation" rows include several augmentations of the same base image (`_aug1`, `_aug2`). Check that base images don't overlap between train and validation.
  - `train.py` hard-codes Kaggle paths.
- **Portfolio angle:** an in-page **before/after slider** on 3–4 sample scans is the ideal visual. Frame it as an early project (Feb 2025) and say what you'd do differently now (realistic noise model, a held-out split by patient, a baseline like BM3D / DnCNN).

### 6. Research: EMS operational drift (IIT Madras)

- **Manuscript:** *Performance at Scale: Detecting Operational Drift and Structural Inequity in Tamil Nadu's Emergency Medical Services* (35-page anonymized manuscript formatted for **Expert Systems with Applications**, in `Job-Search---Yash/Manuscript_ESWA.pdf`). You are third of three authors.
- **Method:** 3.6M calls (2017–2025) split into five service legs (response, on-scene, travel, hospital handover, return). Graph neural network stage embeddings → VAE anomaly detection → counterfactual XGBoost for anomaly magnitude → a Composite Burden Index for equity.
- **Findings:**
  - Neonatal/pediatric cases bear the highest burden on response and return legs.
  - Behavioral cases bear it at handover.
  - Gender parity holds on 4 of 5 legs; the exception is on-scene time for female patients.
  - Metro congestion and tribal terrain are different failure paths.
  - No evidence of systemic neglect of disadvantaged socio-economic groups.
- ⚠️ **The venue is unclear:** the old notes say *Transportation Research Part C*; the manuscript is ESWA-formatted; there are also a BMC draft and a Jul 24, 2026 revision on the Mac. **Confirm before listing.** The data is government data; check what visuals you may show (aggregate maps and charts are usually fine; raw records are not).

### 7. Research: Digital Circularity Index (the "minor project")

- **Paper:** *Digital Inclusion and Circular Economy Behavior in Indian States: A Digital Circularity Index and Explainable XGBoost Analysis.* First author. Under double-blind review at IEEE DELCON 2026 (6 pages, `Job-Search---Yash/DELCON2026_DigitalCircularityIndex.pdf`).
- **Method:** 7 official sources (TRAI, RBI, NITI Aayog, NPCI, CPCB, Census) for 16 states. Composite indices (DAS, CEBS, DCI = DAS×CEBS/100). OLS with diagnostics, Baron–Kenny + Sobel mediation, piecewise threshold regression, 7 LOO-CV models, nested LOO-CV XGBoost (inner 4-fold tuning), SHAP, K-Means.
- **Results:** OLS R² = 0.610 (p = 0.00035). Nested-CV XGBoost R² = 0.511. K-Means (k = 2): *Digital Leaders* DCI 46.7 vs *Emerging States* 18.3 = **2.5× gap**. **H2 (UPI mediates) was not supported** (Sobel z = −0.241); tele-density matters more than digital payments. Show this honestly; a reported null result reads as rigor.
- ⚠️ **Anonymity rule:** DELCON says it "strictly" runs double-blind review. Papers with the same title and abstract must not be posted publicly (e.g. arXiv) before review ends, and authors must not reveal their identity "directly or indirectly". **Until the decision, the site and LinkedIn should say only "Manuscript under double-blind review at an IEEE conference (2026)", with no title, abstract or PDF.** After acceptance: "Accepted, IEEE DELCON 2026 (to appear)". The conference runs Nov 19–21, 2026, so the decision is probably out or close; check EDAS. The resume currently names the title and venue, so it should follow the same rule.
- **Local material:** `~/Desktop/minor project` (NPCI UPI and CPCB e-waste data, diagrams, report), `~/scdi_mindmap`.

### 8. Not yet read (local only)

- **AgentEval** (`~/Desktop/Agent`): a Python package with blueprint and spec docs, Docker, tests and reports. Not on GitHub.
- **Time-Entropy dysarthric speech classification** (`~/Desktop/timeentropy`): a full Python package with tests and configs, TORGO data, and response-to-reviewers documents, so it has been through peer review. Not on GitHub.
- **Why unread:** this cloud session can't see the Mac, and computer use wasn't connected. **To unblock:** push both to private GitHub repos (fastest; I can read them right away), or connect computer use from the Claude desktop app.

### Other work found

- **AI AutoHealer Blueprint:** now in the Autoscaler repo (`AI_AutoHealer_Blueprint_Final.md`, 1.3k lines).
- **GameApp:** private repo. React Native game with a Nakama + Postgres backend (Aug 2026).
- **MINING:** private repo with a live site at https://mining-ten-drab.vercel.app (unreviewed).
- **scx-data-mysql-x:** public Java repo (Mar 2025). **Hotel-Management-System-:** public HTML repo (May 2025). Too thin to feature.
- **Mentioned only in the GitHub profile:** `fraud-detection-system` (TF DNN, 97.34% acc, SMOTE) and `appointment-ticketing-app` (React Native + Expo). Neither appears in the repo list; locate them or drop the mentions.
- **Small infra experiments:** `~/kubeflow_demo`, `~/ansible_project`, `~/t5`, `~/sample`.
- **Coursework PDFs:** CNN disease classification, music genre classification, outlier predictor.
- **Forks:** ORAssistant, OmniParser, FreeRDP, aseprite, GenAI-Showcase and others. None are confirmed as merged upstream contributions; **don't claim open-source contributions until verified.**

---

## Claims audit

Every number on the site must match a repo, a paper or a document you can show. These conflict today:

| Claim | Where | What the evidence shows | Use instead |
|---|---|---|---|
| GlassBox uses ChromaDB | Resume | NumPy index + hash embeddings (bge-small optional) | "NumPy vector index; pgvector planned" |
| GlassBox "groundedness 88%, refusal recall 92%" | GitHub HUD | Not in repo; README reports 100% / 0% on a synthetic benchmark | The README numbers + their caveat |
| Autoscaler "SHAP feature-importance" | Resume, HUD | Hand-weighted attribution helper, not the `shap` library | "SHAP-style per-feature attribution" |
| Autoscaler "LSTM-AE" | HUD | Placeholder file; only the warm-up gate exists | "LSTM autoencoder planned behind a 7-day warm-up gate" |
| CT "95% noise reduction" | Resume, HUD | 92.6% MSE reduction | "92.6% lower MSE; +12.2 dB PSNR on heavy synthetic noise" |
| CT "~4× faster convergence" | Resume | No evidence in repo | Drop it, or add the training logs |
| Kalakraft uses NextAuth.js | Resume | Not a dependency; Firebase Auth + JWT | "Firebase Auth + JWT, RBAC" |
| Kalakraft "paying customers · real ops" | GitHub HUD | Unknown | Confirm (see questions) |
| EMS paper venue | Old notes / resume | ESWA-formatted manuscript | Confirm |
| LinkedIn URL | Resume vs GitHub | Two different handles | Confirm |

---

## Proposed project tiering

1. **Featured case studies (3):** GlassBox → Pulse → Autoscaler. Each gets its own page: problem, constraints, architecture, key decisions, results with caveats, what's next.
2. **Experience with real-world proof:** Gridee (users), IIT Madras (research at scale), Hindalco (industry).
3. **Research:** EMS drift paper, DCI paper, and Time-Entropy once confirmed.
4. **More work (cards):** Kalakraft (framed as the security self-audit), CT denoising (with the slider), AgentEval once read.

---

## Certifications

- AWS Certified Cloud Practitioner (Jan 2026 – Jan 2029): [Credly](https://www.credly.com/earner/earned/badge/620cc098-c1d6-4850-bf9b-06fd39fa1c9a). Certificate PDF in `~/Desktop/DOCS`.
- AWS Certified Machine Learning – Specialty. ⚠️ The GitHub profile marks it "armed" (in progress) while the resume lists it as held. Confirm before listing.
- Oracle Database SQL Certified Specialist (May 2026): [verify](https://catalog-education.oracle.com/pls/certview/sharebadge?id=4189F0AF0C6DCE40CEEAACA4C0B1E5960B7627143EF726E135A8A0CB88DC52AE).
- Salesforce Certified Agentforce Specialist (Dec 2025, ID 7238407): [Trailblazer](https://www.salesforce.com/trailblazer/m1492qm8k7toorq2g4). PDF in `~/Desktop/resume`.
- Coursera: Deep Learning Specialization (Aug 2023) · Machine Learning Specialization (Jun 2024) · Math for ML & Data Science (Jul 2025).
- MathWorks: ML with MATLAB, MATLAB Onramp, ML Onramp, MATLAB for Data Processing & Visualization (May 2024).

## Skills (from resume)

- **Languages:** Python, C++, SQL, TypeScript, Kotlin.
- **ML / DL / CV:** TensorFlow, PyTorch, Keras, scikit-learn, XGBoost, SHAP, GraphSAGE, VAEs, anomaly detection, medical imaging, OpenCV, ML Kit OCR.
- **Data:** Pandas, NumPy, SciPy, statistical testing, power analysis, ETL, Power BI, Matplotlib, Seaborn, Folium.
- **Backend / Web / Mobile:** FastAPI, Node.js, NestJS, Express, Next.js, React, React Native, Recharts, D3.js, Tailwind, Firebase, NextAuth, Razorpay, WebSockets, RBAC.
- **DevOps:** Docker, Kubernetes/Kind, Prometheus, TimescaleDB, PostgreSQL, Prisma, Redis Pub/Sub, BullMQ, CI/CD, Jaeger.
- *Site recommendation: no skill bars or logo walls. Show skills through the projects and keep one plain list.*

## Media assets available

- **GlassBox:** 8 screenshots + social preview in the repo (`docs/screenshots/`).
- **Pulse:** `~/Desktop/pulse-demo.mp4` demo video.
- **CT denoising:** result charts in `results/` and `training_history.png`; sample lung images in `are/`.
- **Gridee:** `~/Desktop/appshots.pdf` and the iPhone 16 Pro Max simulator screenshot.
- **Autoscaler:** only the rough Phase 1 `docs/architecture.png`. Needs a fresh diagram and a screen recording.
- **GitHub profile:** "mission control" HUD SVGs (`yash-vks-chauhan/assets/*.svg`), regenerated every 6 h by a GitHub Action.
- **Other:** `~/Desktop/logo.png`, `~/Desktop/imageclock.png`, and many screenshots from 2025–2026 (not yet reviewed). `~/Desktop/DOCS/Yash.jpeg` is a possible profile photo.

---

## Research summary

*In progress. This section will summarize the report once it's written.*

---

## Decisions needed

*To be filled in after the research summary.*

## Next steps

1. Finish the research report and summarize it here.
2. Decide on positioning, stack, hosting and visual direction.
3. Write the content plan and site map, then start development.
