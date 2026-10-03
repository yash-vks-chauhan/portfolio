// Every sourced claim on the site. Facts come from design/starter/content and the repo README's deep-dives and
// claims audit. [placeholders] must be filled before launch: `npm run placeholders` lists the ones still open.
// `note` is the footnote line; `noteShort` the case-study source-list line; `chip` the label under an Ask answer.
import type { Source } from './types';

export const sources: Source[] = [
  // ── Gridee ──────────────────────────────────────────────────────────────
  {
    id: 'gridee-downloads',
    title: 'Gridee downloads',
    detail: 'Combined Android and iOS downloads from Google Play Console and App Store Connect.',
    where: 'Store consoles',
    checked: '[screenshot date]',
    url: '[store-console screenshot]',
    note: 'Gridee downloads: Google Play Console and App Store Connect, combined, as of [screenshot date].',
    notePhone: 'Play Console and App Store Connect, combined, as of [screenshot date].',
    chip: 'Play Console + App Store Connect · [screenshot date]',
  },
  {
    id: 'gridee-app',
    title: 'Gridee Android app',
    detail:
      'QR and number-plate check-in and check-out (CameraX, ML Kit OCR, ZXing), operator workflows for entry, exit and occupancy, JWT-secured calls over Retrofit and OkHttp, coin-based refundable bookings, email and Google sign-in, and Razorpay payments without storing card data.',
    where: 'Gridee Android app source (private repository)',
    checked: '[date checked]',
    note: 'Gridee Android app: CameraX, ML Kit OCR and ZXing check-in; JWT, Retrofit and OkHttp; Razorpay with no stored card data. Private repository.',
    chip: 'Gridee app · source',
  },
  {
    id: 'gridee-stores',
    title: 'Gridee in the stores',
    detail: 'The live listings on Google Play and the App Store, and the product site.',
    where: 'Google Play · App Store · gridee.in',
    checked: '[date checked]',
    url: 'https://play.google.com/store/apps/details?id=com.gridee.parking',
    linkLabel: 'Open Google Play',
    note: 'Store listings: Google Play (com.gridee.parking) and the App Store (GrideeApp); product site gridee.in.',
    chip: 'Google Play · App Store',
  },

  // ── GlassBox ────────────────────────────────────────────────────────────
  {
    id: 'glassbox-eval-v4',
    title: 'glassbox-eval-v4 report',
    detail: '183 questions written alongside the engine, run on 2 Oct 2026. Wilson 95% intervals. A development set, not an independent benchmark.',
    where: 'Glassbox / README › Evaluation',
    checked: '2026-10-02',
    url: 'https://github.com/yash-vks-chauhan/Glassbox',
    linkLabel: 'Open README',
    note: 'glassbox-eval-v4 report, 2 Oct 2026: 183 questions written alongside the engine. Wilson 95% intervals. A development set, not an independent benchmark. Glassbox / README › Evaluation.',
    noteShort: 'glassbox-eval-v4 report, 2 Oct 2026. Glassbox / README › Evaluation.',
    notePhone: 'glassbox-eval-v4, 2 Oct 2026; a development set. Wilson 95% intervals.',
    chip: 'glassbox-eval-v4 · README',
  },
  {
    id: 'glassbox-architecture',
    title: 'GlassBox architecture',
    detail:
      'Answers cite approved documents only; out-of-scope questions are refused with the missing source named. Every decision is hash-chained per tenant, and the database refuses DELETE on audit tables.',
    where: 'Glassbox / docs',
    checked: '[date checked]',
    url: 'https://github.com/yash-vks-chauhan/Glassbox',
    note: 'GlassBox architecture: cite approved documents or refuse, a per-tenant hash-chained audit log, DELETE refused on audit tables. Glassbox / docs.',
    chip: 'Architecture · docs',
  },
  {
    id: 'glassbox-ci',
    title: 'GlassBox CI',
    detail:
      'GitHub Actions runs SQLite and Postgres 15 jobs and a Docker smoke test: 254 backend tests on Postgres (249 on SQLite; 5 are Postgres-only) and 11 Playwright end-to-end specs.',
    where: 'GitHub Actions',
    checked: '[date checked]',
    url: '[run link]',
    note: 'GlassBox CI on GitHub Actions: SQLite and Postgres 15 jobs and a Docker smoke test; plus 11 Playwright end-to-end specs. [run link]',
    noteShort: 'GitHub Actions CI: SQLite and Postgres 15 jobs plus a Docker smoke test. [run link]',
    notePhone: 'GitHub Actions: SQLite and Postgres 15 jobs. [run link]',
    chip: 'GitHub Actions · CI',
  },
  {
    id: 'glassbox-deploy',
    title: 'GlassBox deployment notes',
    detail:
      'One Graviton t4g.small in Mumbai (ap-south-1), about $14 a month, with Caddy TLS, SSM Parameter Store and daily EBS snapshots. Deploys run from GitHub Actions to AWS over OIDC, with no stored keys.',
    where: 'Glassbox / docs',
    checked: '[date checked]',
    note: 'Deployment notes: t4g.small (ap-south-1), Caddy TLS, SSM Parameter Store, daily EBS snapshots.',
    chip: 'Deployment notes · docs',
  },
  {
    id: 'glassbox-screenshots',
    title: 'GlassBox screenshots',
    detail: 'The ask, refusal, audit replay and audit log screens, from the repository’s docs/screenshots folder.',
    where: 'Glassbox / docs / screenshots',
    checked: '[date checked]',
    url: 'https://github.com/yash-vks-chauhan/Glassbox',
    note: 'Screenshots: Glassbox / docs / screenshots (ask, refusal, audit replay, audit log), Oct 2026.',
    chip: 'docs / screenshots',
  },
  {
    id: 'glassbox-demo',
    title: 'GlassBox live demo',
    detail: 'Advisor and compliance demo seats. The first load can take about 45 seconds.',
    where: 'Live demo',
    checked: '[date checked]',
    url: 'https://glassbox.15-252-203-137.sslip.io',
    linkLabel: 'Open demo',
    note: 'Live demo with advisor and compliance demo seats: glassbox.15-252-203-137.sslip.io',
    chip: 'Live demo',
  },

  // ── Pulse ───────────────────────────────────────────────────────────────
  {
    id: 'pulse-architecture',
    title: 'Pulse architecture',
    detail:
      'The LLM turns plain English into a Segment DSL validated with zod (whitelisted fields and operators); a compiler turns the DSL into a parameterised Prisma query. The LLM never writes SQL, touches the database or sees PII.',
    where: 'Pulse / ARCHITECTURE.md',
    checked: '[date checked]',
    url: 'https://github.com/yash-vks-chauhan/Pulse',
    note: 'Pulse architecture: plain English → a zod-validated Segment DSL → a parameterised Prisma query. The LLM never writes SQL, touches the database or sees PII. Pulse / ARCHITECTURE.md.',
    noteShort: 'Pulse / ARCHITECTURE.md: the Segment DSL, its zod schema and the compiler.',
    chip: 'Pulse · ARCHITECTURE.md',
  },
  {
    id: 'pulse-delivery',
    title: 'Pulse delivery pipeline',
    detail:
      'A monorepo of three services with shared zod contracts. BullMQ batch dispatch with retries (backoff and jitter) and a dead-letter queue; a forward-only status state machine enforced in SQL WHERE clauses; HMAC-SHA256 on both directions of CRM ⇄ simulator traffic; idempotent receipts; failover to the next channel, made idempotent by a UNIQUE parent link; 72-hour last-touch attribution; AES-256-GCM PII encryption with a blind index.',
    where: 'Pulse / repository',
    checked: '[date checked]',
    url: 'https://github.com/yash-vks-chauhan/Pulse',
    note: 'Pulse delivery pipeline: BullMQ dispatch, a forward-only state machine, HMAC-signed callbacks, idempotent failover, AES-256-GCM PII encryption. Pulse / repository.',
    chip: 'Pulse · repository',
  },
  {
    id: 'pulse-tests',
    title: 'Pulse tests',
    detail:
      'About 71 unit tests, plus a 1,000-message integration test under chaos (30% duplicates, 30% out-of-order, 15% WhatsApp failures) that asserts the system converges.',
    where: 'Pulse / tests',
    checked: '[date checked]',
    url: 'https://github.com/yash-vks-chauhan/Pulse',
    note: 'Pulse tests: about 71 unit tests and a 1,000-message integration test under chaos (30% duplicates, 30% out-of-order, 15% WhatsApp failures). Pulse / tests.',
    noteShort: 'Pulse / tests: about 71 unit tests and the 1,000-message chaos test.',
    chip: 'Pulse · tests',
  },
  {
    id: 'pulse-ai-workflow',
    title: 'Pulse AI workflow log',
    detail:
      'docs/AI_WORKFLOW.md records what was delegated to Claude Code, which decisions stayed mine, what I caught in review (a SENT-versus-delivered race and in-batch duplicate merging) and what I rejected.',
    where: 'Pulse / docs / AI_WORKFLOW.md',
    checked: '[date checked]',
    url: 'https://github.com/yash-vks-chauhan/Pulse',
    note: 'Pulse AI workflow log: what was delegated to Claude Code, what stayed my call, and what I caught in review. Pulse / docs / AI_WORKFLOW.md.',
    chip: 'AI_WORKFLOW.md',
  },
  {
    id: 'pulse-brief',
    title: 'Pulse brief',
    detail:
      'Built for the Xeno Engineering Internship assignment 2026 (SDE track), due 15 June 2026. The demo runs on seeded data: 5,000 customers and 25,000 orders.',
    where: 'Pulse / Project_README.md',
    checked: '[date checked]',
    url: 'https://github.com/yash-vks-chauhan/Pulse',
    note: 'Pulse brief: the Xeno Engineering Internship assignment 2026 (SDE track); seed data of 5,000 customers and 25,000 orders. Pulse / Project_README.md.',
    chip: 'Project_README.md',
  },
  {
    id: 'pulse-demo',
    title: 'Pulse live demo',
    detail: 'The live CRM behind a login gate; the access code is on the login screen. Values on this site (₹2,000, 60 days, 1,284 customers) come from the demo’s seeded data.',
    where: 'Live demo',
    checked: '[date checked]',
    url: 'https://pulse-ai-crm.vercel.app/',
    linkLabel: 'Open demo',
    note: 'Live demo at pulse-ai-crm.vercel.app (access code on the login screen); demo values come from its seeded data.',
    chip: 'Live demo',
  },

  // ── More work ───────────────────────────────────────────────────────────
  {
    id: 'kalakraft-security',
    title: 'Kalakraft security self-audit',
    detail:
      'Found and fixed credentials committed in vercel.json, an order IDOR, unauthenticated support-ticket and coupon endpoints, PII on public real-time channels, unrestricted uploads and a raw-SQL injection risk.',
    where: 'Kalakraftdev / SECURITY_FINDINGS.md',
    checked: '[date checked]',
    url: 'https://github.com/yash-vks-chauhan/Kalakraftdev',
    note: 'Kalakraft security self-audit: six critical findings and their fixes. Kalakraftdev / SECURITY_FINDINGS.md.',
    chip: 'SECURITY_FINDINGS.md',
  },
  {
    id: 'kalakraft-codebase',
    title: 'Kalakraft codebase',
    detail: 'A Next.js 15 storefront and admin: 59 API route handlers and 20 Prisma models, Firebase Auth with JWT, Fuse.js search, Pusher real-time updates and Brevo low-stock alerts.',
    where: 'Kalakraftdev / artcommerce',
    checked: '[date checked]',
    url: 'https://github.com/yash-vks-chauhan/Kalakraftdev',
    note: 'Kalakraft codebase: 59 API route handlers and 20 Prisma models. Kalakraftdev / artcommerce.',
    chip: 'Kalakraftdev',
  },
  {
    id: 'autoscaler-readme',
    title: 'Autoscaler safety rails',
    detail:
      'Dry-run mode, a 120-second cooldown per service and action, a max-replica cap, a per-service circuit breaker and an approval gate. The LSTM autoencoder is planned behind a warm-up gate and is not implemented yet.',
    where: 'Autoscaler / README and healing.service.ts',
    checked: '[date checked]',
    url: 'https://github.com/yash-vks-chauhan/Autoscaler',
    note: 'Autoscaler safety rails: dry-run, a 120-second cooldown, a replica cap, a circuit breaker and an approval gate; the LSTM autoencoder is planned. Autoscaler / README and healing.service.ts.',
    chip: 'Autoscaler · README',
  },
  {
    id: 'ct-repo',
    title: 'CT denoising repository',
    detail: 'A TensorFlow/Keras grayscale U-Net (256×256 input, skip connections, mixed precision) with synthetic noise injection, CLI inference and a Streamlit app. Its metrics are withheld until the noisy/clean pairing is re-checked.',
    where: 'CT-Denoising-U-Net / README',
    checked: '[date checked]',
    url: 'https://github.com/yash-vks-chauhan/CT-Denoising-U-Net',
    note: 'CT denoising U-Net: model, noise injection and app code. CT-Denoising-U-Net / README.',
    chip: 'CT-Denoising-U-Net',
  },

  // ── Research and experience ─────────────────────────────────────────────
  {
    id: 'iitm-internship',
    title: 'IIT Madras research internship',
    detail:
      'Research intern, Mar 2025 – Mar 2026, on Tamil Nadu 108 ambulance (EMS) analytics: five-plus years of dispatch and road-construction data with 100+ data-quality checks. Manuscripts are listed without titles or venues until their review decisions.',
    where: 'Internship records',
    checked: '[date checked]',
    note: 'IIT Madras research internship, Mar 2025 – Mar 2026. Manuscripts are listed without titles or venues until their review decisions.',
    notePhone: 'Mar 2025 – Mar 2026. Manuscripts unnamed until decisions.',
    chip: 'Internship records',
  },
  {
    id: 'ems-manuscript',
    title: 'EMS manuscript',
    detail:
      'An anonymised manuscript, third of three authors: five service legs, graph-neural-network stage embeddings, VAE anomaly detection, counterfactual XGBoost for anomaly magnitude and a Composite Burden Index for equity. Aggregate results only; title and venue after the review decision.',
    where: 'Manuscript under review (available after the decision)',
    checked: '[date checked]',
    note: 'EMS manuscript (third of three authors), under review: method and aggregate findings only; title and venue after the decision.',
    chip: 'EMS manuscript',
  },
  {
    id: 'hindalco-report',
    title: 'Hindalco internship report',
    detail: 'Internship report and certificate. The downtime and cost figures are team-reported outcomes.',
    where: 'On request',
    checked: '[date checked]',
    note: 'Hindalco internship report and certificate, on request. The downtime and cost figures are team-reported outcomes.',
    chip: 'Internship report',
  },
  {
    id: 'srm-record',
    title: 'SRM academic record',
    detail: 'B.Tech CSE (AI/ML), Aug 2023 – 2027 (expected), CGPA 8.5/10.',
    where: 'Résumé',
    checked: '[date checked]',
    note: 'SRM academic record: B.Tech CSE (AI/ML), Aug 2023 – 2027 (expected), CGPA 8.5/10. Résumé.',
    chip: 'Academic record',
  },
];

export const sourceById: Record<string, Source> = Object.fromEntries(sources.map((s) => [s.id, s]));
