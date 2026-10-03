// "Ask my portfolio" v1: hand-written answers, each citing its sources.
// lib/ask.ts matches a visitor's question to one entry, or refuses when nothing matches well enough.
// Keep every answer inside what the sources say. Add entries; never let an answer guess.
// Answer text may use **bold** (drawn on the home page: "made **zero** unsupported claims").
import type { AskEntry } from './types';

// The wording drawn on the home page and the Components artboard.
export const refusal = 'Nothing I’ve published here answers that, so I won’t guess. Ask me in person.';

export const suggestions = [
  'How do you know GlassBox doesn’t hallucinate?',
  'What did you build at Gridee?',
  'How does Pulse keep the LLM away from SQL?',
  'What’s your favourite film?',
];

export const answers: AskEntry[] = [
  {
    id: 'glassbox-hallucination',
    question: 'How do you know GlassBox doesn’t hallucinate?',
    keywords: ['glassbox', 'hallucinate', 'hallucination', 'eval', 'evaluation', 'benchmark', 'accuracy', 'accurate', 'unsupported'],
    answer: [
      'On 183 questions I wrote alongside the engine, it made **zero** unsupported claims: a 95% interval of 0–2.1%.',
      { cite: 'glassbox-eval-v4' },
      ' That’s a development set, so read it as “no failures found yet”. Every answer must cite an approved document or be refused.',
      { cite: 'glassbox-architecture' },
    ],
  },
  {
    id: 'glassbox-what',
    question: 'What is GlassBox?',
    priority: 1,
    keywords: ['glassbox', 'wealth', 'advisory', 'advisor', 'compliance', 'audit', 'auditable', 'refuse', 'refusal', 'cite', 'citation'],
    answer: [
      'GlassBox is an auditable wealth-advisory AI. An advisor asks about a client; every claim in the answer cites an approved document, and anything out of scope is refused with the missing source named. Every decision is hash-chained per tenant, and compliance reviews flagged answers.',
      { cite: 'glassbox-architecture' },
    ],
  },
  {
    id: 'glassbox-tests',
    question: 'How is GlassBox tested?',
    keywords: ['glassbox', 'test', 'tests', 'testing', 'ci', 'playwright', 'quality'],
    answer: [
      '254 backend tests pass on Postgres 15 (249 on SQLite; 5 are Postgres-only), and 11 Playwright specs cover the app end to end. CI runs both databases and smoke-tests the Docker stack on every push.',
      { cite: 'glassbox-ci' },
    ],
  },
  {
    id: 'glassbox-deploy',
    question: 'Where does GlassBox run, and what does it cost?',
    keywords: ['glassbox', 'deploy', 'deployment', 'hosting', 'host', 'aws', 'cost', 'oidc', 'infrastructure', 'server'],
    answer: [
      'On one Graviton t4g.small in Mumbai for about $14 a month. Deploys go from GitHub Actions to AWS over OIDC, so there are no stored keys.',
      { cite: 'glassbox-deploy' },
    ],
  },
  {
    id: 'gridee',
    question: 'What did you build at Gridee?',
    keywords: ['gridee', 'parking', 'build', 'built', 'ship', 'shipped', 'android', 'ios', 'app', 'founder', 'cofounder', 'downloads', 'startup'],
    answer: [
      'As co-founder and founding engineer, I shipped Gridee on Android and iOS: live availability, reservations, wallet and Razorpay payments, and QR or number-plate check-in with CameraX and ML Kit OCR. It has 8,000+ combined downloads.',
      { cite: 'gridee-downloads' },
    ],
  },
  {
    id: 'pulse-sql',
    question: 'How does Pulse keep the LLM away from SQL?',
    keywords: ['pulse', 'llm', 'sql', 'dsl', 'pii', 'prisma', 'segment', 'database', 'crm', 'campaign'],
    answer: [
      'The LLM only turns plain English into a Segment DSL. A zod schema whitelists the fields and operators, and a compiler turns the DSL into a parameterised Prisma query. The model never writes SQL, never touches the database and never sees PII.',
      { cite: 'pulse-architecture' },
    ],
  },
  {
    id: 'pulse-reliability',
    question: 'How do you know Pulse is reliable?',
    keywords: ['pulse', 'reliable', 'reliability', 'chaos', 'failover', 'retry', 'retries', 'duplicates', 'test', 'tests'],
    answer: [
      'Besides about 71 unit tests, a 1,000-message integration test runs under chaos (30% duplicates, 30% out-of-order, 15% WhatsApp failures) and asserts that delivery state still converges.',
      { cite: 'pulse-tests' },
    ],
  },
  {
    id: 'research',
    question: 'What research did you do at IIT Madras?',
    keywords: ['research', 'iit', 'madras', 'ems', 'ambulance', 'drift', 'equity', 'paper', 'manuscript', 'graphsage', 'vae'],
    answer: [
      'At IIT Madras I worked on emergency medical services analytics for Tamil Nadu’s 108 ambulance service: graph embeddings, a VAE and counterfactual XGBoost to separate real operational drift from context a district can’t control, then an equity analysis. There’s also a first-author manuscript under double-blind review at an IEEE conference, so I can’t share more about it yet.',
      { cite: 'iitm-internship' },
    ],
  },
  {
    id: 'kalakraft',
    question: 'What happened with Kalakraft?',
    keywords: ['kalakraft', 'marketplace', 'security', 'audit', 'vulnerability', 'idor', 'injection'],
    answer: [
      'I audited my own shipped marketplace and fixed six critical issues, including credentials committed in vercel.json, an order IDOR, unauthenticated endpoints and a raw-SQL injection risk.',
      { cite: 'kalakraft-security' },
    ],
  },
  {
    id: 'autoscaler',
    question: 'Is the Autoscaler finished?',
    keywords: ['autoscaler', 'kubernetes', 'healing', 'self-healing', 'lstm', 'finished', 'done', 'cooldown', 'circuit'],
    answer: [
      'Not yet. The safety rails work: dry-run, a cooldown per service and action, a replica cap, a circuit breaker and an approval gate. The LSTM forecaster is planned but not built, so it’s labelled “In progress”.',
      { cite: 'autoscaler-readme' },
    ],
  },
  {
    id: 'education',
    question: 'Where do you study?',
    keywords: ['study', 'studying', 'college', 'university', 'degree', 'srm', 'cgpa', 'gpa', 'graduate', 'graduating', 'education'],
    answer: [
      'I’m in the final year of a B.Tech in CSE (AI/ML) at SRM Institute of Science and Technology, graduating in 2027, with a CGPA of 8.5.',
      { cite: 'srm-record' },
    ],
  },
  {
    id: 'availability',
    question: 'Are you open to roles?',
    keywords: ['open', 'available', 'availability', 'hire', 'hiring', 'job', 'jobs', 'role', 'roles', 'internship', 'contact', 'email', 'reach'],
    answer: ['Yes: full-time AI/ML and software roles from [month] 2027. Email me at yash.vks.chauhan@gmail.com.'],
  },
];
