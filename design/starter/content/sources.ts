// Every sourced claim on the site. Facts come from the repo README's deep-dives and claims audit.
// [placeholders] must be filled before launch; content.test.ts lists the ones still open.
import type { Source } from './types';

export const sources: Source[] = [
  {
    id: 'gridee-downloads',
    title: 'Gridee downloads',
    detail: 'Combined Android and iOS downloads from Google Play Console and App Store Connect.',
    where: 'Store consoles',
    checked: '[screenshot date]',
    url: '[store-console screenshot]',
  },
  {
    id: 'glassbox-eval-v4',
    title: 'glassbox-eval-v4 report',
    detail: '183 questions written alongside the engine, run on 2 Oct 2026. Wilson 95% intervals. A development set, not an independent benchmark.',
    where: 'Glassbox / README › Evaluation',
    checked: '2026-10-02',
    url: 'https://github.com/yash-vks-chauhan/Glassbox',
  },
  {
    id: 'glassbox-architecture',
    title: 'GlassBox architecture',
    detail: 'Answers cite approved documents only; out-of-scope questions are refused with the missing source named. Every decision is hash-chained per tenant, and the database refuses DELETE on audit tables.',
    where: 'Glassbox / docs',
    url: 'https://github.com/yash-vks-chauhan/Glassbox',
  },
  {
    id: 'glassbox-ci',
    title: 'GlassBox CI',
    detail: 'GitHub Actions runs SQLite and Postgres 15 jobs and a Docker smoke test: 254 backend tests on Postgres (249 on SQLite; 5 are Postgres-only) and 11 Playwright end-to-end specs.',
    where: 'GitHub Actions',
    url: '[run link]',
  },
  {
    id: 'glassbox-deploy',
    title: 'GlassBox deployment notes',
    detail: 'One Graviton t4g.small in Mumbai (ap-south-1), about $14 a month, with Caddy TLS, SSM Parameter Store and daily EBS snapshots. Deploys run from GitHub Actions to AWS over OIDC, with no stored keys.',
    where: 'Glassbox / docs',
  },
  {
    id: 'glassbox-demo',
    title: 'GlassBox live demo',
    detail: 'Advisor and compliance demo seats. The first load can take about 45 seconds.',
    where: 'Live demo',
    url: 'https://glassbox.15-252-203-137.sslip.io',
  },
  {
    id: 'pulse-architecture',
    title: 'Pulse architecture',
    detail: 'The LLM turns plain English into a Segment DSL validated with zod (whitelisted fields and operators); a compiler turns the DSL into a parameterised Prisma query. The LLM never writes SQL, touches the database or sees PII.',
    where: 'Pulse / ARCHITECTURE.md',
    url: 'https://github.com/yash-vks-chauhan/Pulse',
  },
  {
    id: 'pulse-tests',
    title: 'Pulse tests',
    detail: 'About 71 unit tests, plus a 1,000-message integration test under chaos (30% duplicates, 30% out-of-order, 15% WhatsApp failures) that asserts the system converges.',
    where: 'Pulse / tests',
    url: 'https://github.com/yash-vks-chauhan/Pulse',
  },
  {
    id: 'kalakraft-security',
    title: 'Kalakraft security self-audit',
    detail: 'Found and fixed credentials committed in vercel.json, an order IDOR, unauthenticated support-ticket and coupon endpoints, PII on public real-time channels, unrestricted uploads and a raw-SQL injection risk.',
    where: 'Kalakraftdev / SECURITY_FINDINGS.md',
    url: 'https://github.com/yash-vks-chauhan/Kalakraftdev',
  },
  {
    id: 'autoscaler-readme',
    title: 'Autoscaler safety rails',
    detail: 'Dry-run mode, a 120-second cooldown per service and action, a max-replica cap, a per-service circuit breaker and an approval gate. The LSTM autoencoder is planned behind a warm-up gate and is not implemented yet.',
    where: 'Autoscaler / README and healing.service.ts',
    url: 'https://github.com/yash-vks-chauhan/Autoscaler',
  },
  {
    id: 'iitm-internship',
    title: 'IIT Madras research internship',
    detail: 'Research intern, Mar 2025 – Mar 2026, on Tamil Nadu 108 ambulance (EMS) analytics. Manuscripts are listed without titles or venues until their review decisions.',
    where: 'Internship records',
  },
  {
    id: 'hindalco-report',
    title: 'Hindalco internship report',
    detail: 'Internship report and certificate. The downtime and cost figures are team-reported outcomes.',
    where: 'On request',
  },
  {
    id: 'srm-record',
    title: 'SRM academic record',
    detail: 'B.Tech CSE (AI/ML), Aug 2023 – 2027 (expected), CGPA 8.5/10.',
    where: 'Résumé',
  },
];

export const sourceById: Record<string, Source> = Object.fromEntries(sources.map((s) => [s.id, s]));
