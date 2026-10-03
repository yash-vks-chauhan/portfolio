# Yash Chauhan — Portfolio Source of Truth

This folder holds everything collected for the personal portfolio site. **Phase 1 (information collection) is in progress.** Development has not started.

| Phase | Status |
|---|---|
| 1. Collect information (resume, GitHub, local projects) | ~70% — sources inventoried, flagship READMEs not yet read in depth |
| 2. Deep research (portfolio best practices, design, stack) | Not started |
| 3. Content + design decisions | Not started |
| 4. Development | Not started |

---

## Sources scanned

- **Resume:** `Yash_Chauhan_Master_Resume.pdf` (this folder, 2 pages, Aug 2026). All embedded hyperlinks were extracted (see below).
- **GitHub:** `github.com/yash-vks-chauhan` via the authenticated `gh` CLI. 26 public repos, plus 5 private.
- **Local machine:** every git repo under `~` (depth 5), plus project folders on Desktop, Documents and home.

---

## Profile

- **Name:** Yash Chauhan
- **Location:** Chennai, India
- **Email:** yash.vks.chauhan@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/yashvschauhan/
- **GitHub:** https://github.com/yash-vks-chauhan. The GitHub bio, website and location fields are all empty; fill them once the portfolio is live.
- **Phone:** on the resume. *Decide whether to show it on the public site (recommend: no).*

## Education

- **SRM Institute of Science and Technology, Kattankulathur.** B.Tech CSE, AI/ML specialization, Aug 2023 – 2027 (expected). CGPA 8.5/10.
  - II2S Hack2Skill 2024: top 35% of 300+ teams. Hack 3.0 Street participant.
  - GitHub Community SRM: Technical Associate. ISTE: Student Member.
- **Sanjay Ghodawat International School, Kolhapur.** Class XII CBSE 70% (2023). Class X CBSE 89% (2021).

## Experience

### Co-Founder & Founding Engineer — Gridee (Jan 2026 – present)
Smart-parking platform: live availability, advance and instant reservations, wallet and Razorpay payments. **8,000+ combined Android + iOS downloads.**
- QR and number-plate check-in/out (CameraX, ML Kit OCR, ZXing). Operator workflows for entry, exit and occupancy.
- JWT + Retrofit + OkHttp security, coin-based refundable bookings, email and Google sign-in, Razorpay without storing card data.
- **Stack:** Kotlin, CameraX, ML Kit, ZXing, Retrofit, OkHttp, JWT, Razorpay, React, TypeScript, Vite.
- **Links:** https://www.gridee.in/ · [Play Store](https://play.google.com/store/apps/details?id=com.gridee.parking) · [App Store](https://apps.apple.com/us/app/grideeapp/id6757460398)
- **Local:** `~/gridee-android` (own repo `Gridee-android`). `~/gridee-android/gridee_backend` is `itsmerajeev11/Gridee` with 321 commits (co-founder's repo). Perf artifacts are in `~/gridee-perf029-artifacts`.

### Research Intern — IIT Madras (Mar 2025 – Mar 2026)
Tamil Nadu 108 ambulance (EMS) analytics.
- Ingested 5+ years of dispatch and road-construction data with 100+ quality checks. Simulated 5,000+ routes (peak-hour, monsoon, construction).
- Built a 55-column analytical matrix and a GraphSAGE-VAE-XGBoost workflow for drift and anomaly analysis.
- An autoencoder flagged 8,567 outliers, which fed a Time Drift Index. A counterfactual XGBoost model reached **8.37% WMAPE**.
- Designed a fairness-aware Quantum Stability Index (five stability bands). Ran t-tests, ANOVA, Kruskal-Wallis and SHAP. Equity analysis across metro, tribal, rural, APL, pediatric and behavioral cases.
- **Stack:** Python, Pandas, SciPy, scikit-learn, XGBoost, SHAP, GraphSAGE, VAEs, OSMnx, NetworkX, Folium, Docker.
- **Local:** `~/Desktop/ambulance`, `~/Desktop/108-ambulance.ipynb`. Private repo `Ambulance`.

### Summer Intern, Electrical & Instrumentation — Hindalco Industries, Mumbai (Jun – Jul 2025)
- Proficy Historian / OSI PI sensor streams through MES pipelines. Predictive maintenance in MTell (ARIMA plus custom anomaly detection).
- Real-time alerts in maintenance workflows. Helped deliver **20% less unscheduled downtime** and **15% lower maintenance cost**.
- **Local:** `~/Desktop/DOCS` (internship report, certificate).

## Research & Publications

1. **Digital Inclusion and Circular Economy Behavior in Indian States: A Digital Circularity Index and Explainable XGBoost Analysis.** First author. Under double-blind review at IEEE DELCON 2026.
   - 7 government datasets across 16 states. OLS R²=0.610 (p<0.001). Nested LOO-CV XGBoost R²=0.511. SHAP and K-Means typologies show a 2.5× DCI gap.
   - Likely local material: `~/Desktop/minor project` (NPCI UPI and CPCB e-waste data, diagrams, report), `~/scdi_mindmap`, `~/Job-Search---Yash/DELCON2026_DigitalCircularityIndex.pdf`.
2. **Performance at Scale: Detecting Operational Drift and Structural Inequity in Tamil Nadu's EMS.** Third of three authors. The resume says submitted to *Transportation Research Part C*.
   - 3.59M dispatch records (2017–2025), 38 districts, 44 emergency types. GraphSAGE-VAE-XGBoost framework plus a Composite Burden Index.
   - ⚠️ The local folder also mentions ESWA (`ESWA_CITATION_PLAN.md`, `Manuscript_ESWA.pdf`), a BMC draft, and a revised manuscript dated 24 Jul 2026. **Confirm the current venue.**
3. **(Not on resume) Time-Entropy features for Dysarthric Speech Classification.** Found locally at `~/Desktop/timeentropy`: a full Python package with tests and configs, TORGO data, and response-to-reviewers documents. It has no GitHub remote. **Confirm the status and whether to feature it.**

## Projects

### Flagship (on the resume)

| Project | What | Live | Repo | Local |
|---|---|---|---|---|
| **AutoScaler** | AI-driven Kubernetes observability + self-healing. Kind cluster, Isolation Forest + SHAP, LSTM gating, Claude→OpenAI→in-cluster RF failover, chaos engine, 9 Next.js views | — | [Autoscaler](https://github.com/yash-vks-chauhan/Autoscaler) | `~/Desktop/Autoscaler` (6 commits) |
| **Pulse** | AI-native campaign platform. NL → validated Segment DSL → Prisma (LLM isolated from SQL and PII); WhatsApp, SMS, email, RCS; BullMQ, DLQs, HMAC, failover; attribution analytics | [pulse-ai-crm.vercel.app](https://pulse-ai-crm.vercel.app/) | [Pulse](https://github.com/yash-vks-chauhan/Pulse) | `~/Desktop/Pulse` (23 commits). Demo video: `~/Desktop/pulse-demo.mp4` |
| **GlassBox** | Auditable wealth-advisory AI. Cited answers, refusal handling, tamper-evident audit trail, trust dashboard, decision replay; deployed on AWS | [glassbox…sslip.io](https://glassbox.15-252-203-137.sslip.io) | [Glassbox](https://github.com/yash-vks-chauhan/Glassbox) | `~/Desktop/Glassbox` (73 commits, active today) |
| **Kalakraft** | Full-stack resin-art marketplace + admin (orders, inventory, coupons, tickets). Sharp→Cloudinary, Pusher, Sendinblue, NextAuth+Firebase | [kalakraftdev.vercel.app](https://kalakraftdev.vercel.app) | [Kalakraftdev](https://github.com/yash-vks-chauhan/Kalakraftdev) | `~/Desktop/Artcommerce` (**1,195 commits**). Art assets in `~/Desktop/art` |
| **CT/X-ray Denoising** | Mixed-precision U-Net. ~12 dB PSNR gain, 95% noise reduction, ~4× faster convergence | [Streamlit app](https://ct-denoising-u-net-q6xbszyfajozfqpjhuqqlw.streamlit.app/) | [CT-Denoising-U-Net](https://github.com/yash-vks-chauhan/CT-Denoising-U-Net) (6★, most-starred) | `~/.gemini/antigravity/scratch/CT-Denoising-U-Net` |

### Other own work found

- **AgentEval:** `~/Desktop/Agent`, a Python package with blueprint and spec docs, Docker, tests and reports. Not on GitHub. *Read it next.*
- **AI AutoHealer Blueprint:** `~/Downloads/AI_AutoHealer_Blueprint_Final.md`, the design doc behind AutoScaler.
- **GameApp:** private repo. React Native game with a Nakama + Postgres backend (Aug 2026).
- **MINING:** private repo with a live site at https://mining-ten-drab.vercel.app (unreviewed).
- **scx-data-mysql-x:** public Java repo (Mar 2025).
- **Hotel-Management-System-:** public HTML repo (May 2025).
- **Small infra experiments:** `~/kubeflow_demo`, `~/ansible_project`, `~/t5` (Dockerfile + k8s deployment), `~/sample` (Jupyter on k8s).
- **Coursework PDFs in Downloads:** CNN disease classification, music genre classification, outlier predictor (`~/Documents/outlier_predictor.pdf`).
- **Forks:** ORAssistant, OmniParser, FreeRDP, aseprite, GenAI-Showcase and others. None are confirmed as merged upstream contributions yet; **don't claim open-source contributions until verified.**

## Certifications

- AWS Certified Cloud Practitioner (Jan 2026 – Jan 2029): [Credly](https://www.credly.com/earner/earned/badge/620cc098-c1d6-4850-bf9b-06fd39fa1c9a). Certificate PDF in `~/Desktop/DOCS`.
- AWS Certified Machine Learning – Specialty.
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

## Media assets available

- `~/Desktop/pulse-demo.mp4`: Pulse demo video.
- `~/Desktop/appshots.pdf` and the iPhone 16 Pro Max simulator screenshot: likely Gridee app shots.
- `~/Desktop/logo.png`, `~/Desktop/imageclock.png`, and many screenshots from 2025–2026 (not yet reviewed).
- `~/Desktop/DOCS/Yash.jpeg`: possible profile photo.

---

## Open questions for Yash

1. **Positioning:** should the headline be AI/ML engineer, full-stack + AI, or founder-engineer? (Gridee + research + infra could support any of these.)
2. Should the phone number appear publicly?
3. What is the current venue and status of the EMS paper (TR-C vs ESWA)? Should the Time-Entropy paper be featured?
4. Should AgentEval, GameApp and MINING be shown? Should private repos be made public first?
5. Is the IIT Madras / 108 data under NDA? This affects whether we can show visuals.
6. Is there a profile photo to use? Do you have a domain (e.g. `yashchauhan.dev`)?

## Next steps

1. Read the flagship READMEs and code in depth: Autoscaler, Pulse, Glassbox, Artcommerce, AgentEval, timeentropy, minor project.
2. Deep research: 2026 portfolio best practices for AI/ML and SWE new-grad roles, recruiter expectations, design references, stack (Next.js vs Astro), hosting and SEO.
3. Write the content plan and site map, then start development.
