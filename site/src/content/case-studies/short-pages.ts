// The short project pages: Autoscaler, Kalakraft and CT denoising, on the case-study template without the stat strip,
// preview or "On this page". Facts: the README's deep-dives and claims audit, and design/starter/content.
import type { ShortPage } from './types';

export const autoscaler: ShortPage = {
  slug: 'autoscaler',
  title: 'Autoscaler · Yash Chauhan',
  description:
    'Autoscaler is guarded Kubernetes self-healing: detection, root cause and reasoning behind dry-run, cooldowns, a replica cap, a circuit breaker and an approval gate. In progress: no tests yet, and the LSTM autoencoder is planned.',
  name: 'Autoscaler',
  lead: 'Guarded Kubernetes self-healing: dry-run, cooldowns, a circuit breaker and an approval gate on every action.',
  leadPhone: 'Guarded Kubernetes self-healing',
  icon: { glyph: 'gauge', gradient: 'radial-gradient(120% 120% at 20% 0%, #A8E6FF 0%, rgba(168,230,255,0) 55%), linear-gradient(150deg, #64D2FF 0%, #0A7CFF 60%, #064A99 100%)' },
  actions: [{ label: 'Code', href: 'https://github.com/yash-vks-chauhan/Autoscaler', kind: 'code', primary: true }],
  note: 'It runs on a local Kind cluster, so there’s no live demo.',
  summary: {
    icon: 'gauge',
    gradient: 'linear-gradient(145deg, #64D2FF, #0A7CFF)',
    text: 'Detect, explain and act, with safety rails around every healing action. It’s in progress: the safety rails work, but there are no tests yet, and the LSTM autoencoder is planned, not built.{{cite:autoscaler-readme}}',
    textPhone: 'Self-healing with safety rails. In progress: no tests yet, and the LSTM autoencoder is planned, not built.{{cite:autoscaler-readme}}',
  },
  sections: [
    {
      kind: 'prose',
      id: 'what',
      title: 'What it does',
      paragraphs: [
        'A payment API with 10 Prometheus metrics and 6 chaos hooks feeds a NestJS control plane backed by TimescaleDB. A FastAPI engine detects incidents with a rolling 3σ baseline and an Isolation Forest, traces the root cause through a networkx service-dependency graph, and reasons with Claude, then OpenAI, then an in-cluster Random Forest, all returning the same JSON contract.{{cite:autoscaler-architecture}}',
        'Decisions are rule-based, with an action whitelist, and a rollback needs a human’s approval. Everything runs as Kubernetes workloads with RBAC, watched from a Next.js dashboard with seven live pages.',
      ],
    },
    {
      kind: 'constraints',
      id: 'rails',
      title: 'Safety rails',
      items: [
        { icon: 'eye', gradient: 'linear-gradient(145deg, #5AC8FA, #0A7CFF)', title: 'Dry-run mode.', text: 'Healing actions can run without changing the cluster.' },
        { icon: 'refresh-cw', gradient: 'linear-gradient(145deg, #8E8BFF, #5149C9)', title: 'Cooldowns.', text: '120 seconds per service and action.' },
        { icon: 'layers', gradient: 'linear-gradient(145deg, #4CD964, #1F8F3A)', title: 'A replica cap.', text: 'Scaling stops at a maximum number of replicas.' },
        { icon: 'ban', gradient: 'linear-gradient(145deg, #FF6961, #C7000B)', title: 'A circuit breaker.', text: 'One per service.' },
        { icon: 'users', gradient: 'linear-gradient(145deg, #FFB340, #F08A00)', title: 'An approval gate.', text: 'A rollback needs a human’s approval.' },
        { icon: 'list', gradient: 'linear-gradient(145deg, #AEAEB2, #636366)', title: 'An audit.', text: 'Every action is recorded, and rollouts are awaited until they’re ready.' },
      ],
    },
    {
      kind: 'list',
      id: 'not-yet',
      title: 'What isn’t built yet',
      tone: 'warn',
      items: [
        { text: 'The LSTM autoencoder is planned behind a warm-up gate; only the gate exists.' },
        { text: 'The attribution is SHAP-style: per-feature weights set by hand, not the shap library.' },
        { text: 'The Random Forest fallback learned from synthetic scenarios, not real incident history.' },
        { text: 'There are no tests yet; the safety rails come first.' },
      ],
    },
  ],
  info: [
    { label: 'Status', value: 'In progress', phone: true },
    { label: 'Stack', value: 'NestJS · FastAPI · Kubernetes · TimescaleDB · Next.js', valuePhone: 'NestJS · FastAPI · Kubernetes', phone: true },
    { label: 'Runs on', value: 'A local Kind cluster', phone: true },
    { label: 'Docs', value: '7 ADRs', phone: true },
    { label: 'Repository', value: 'github.com/yash-vks-chauhan/Autoscaler', href: 'https://github.com/yash-vks-chauhan/Autoscaler', phone: true },
  ],
  sources: ['autoscaler-readme', 'autoscaler-architecture'],
  more: ['glassbox', 'kalakraft'],
};

export const kalakraft: ShortPage = {
  slug: 'kalakraft',
  title: 'Kalakraft · Yash Chauhan',
  description:
    'Kalakraft is a Next.js 15 art marketplace (59 API routes, 20 Prisma models). I audited its production code and fixed six critical security issues, from committed credentials to an order IDOR.',
  name: 'Kalakraft',
  lead: 'I audited my own shipped marketplace and fixed six critical security issues.',
  leadPhone: 'A security self-audit',
  icon: { glyph: 'palette', gradient: 'radial-gradient(120% 120% at 20% 0%, #FFD58F 0%, rgba(255,213,143,0) 55%), linear-gradient(150deg, #FFB340 0%, #FF5E3A 60%, #B5341C 100%)' },
  actions: [
    { label: 'Open demo', labelPhone: 'Open', href: 'https://kalakraftdev.vercel.app', kind: 'demo', primary: true },
    { label: 'Code', href: 'https://github.com/yash-vks-chauhan/Kalakraftdev', kind: 'code' },
  ],
  summary: {
    icon: 'shield-check',
    gradient: 'linear-gradient(145deg, #4CD964, #1F8F3A)',
    text: 'A Next.js 15 storefront and admin with 59 API routes and 20 Prisma models. Then I audited its production code and fixed six critical findings.{{cite:kalakraft-security}}',
    textPhone: 'I audited my own shipped marketplace and fixed six critical findings.{{cite:kalakraft-security}}',
  },
  sections: [
    {
      kind: 'list',
      id: 'findings',
      title: 'What the audit found',
      tone: 'warn',
      intro: 'A self-audit of the production code, written up in SECURITY_FINDINGS.md. Every finding was fixed.{{cite:kalakraft-security}}',
      items: [
        { text: 'Database credentials committed in vercel.json.' },
        { text: 'An order IDOR: one customer could reach another’s order.' },
        { text: 'Support-ticket and coupon endpoints with no authentication.' },
        { text: 'Personal data leaking over public real-time channels.' },
        { text: 'Unrestricted file uploads.' },
        { text: 'A raw-SQL injection risk.' },
      ],
    },
    {
      kind: 'list',
      id: 'hardening',
      title: 'What it added',
      tone: 'ok',
      items: [{ text: 'Rate limits.' }, { text: 'Hashed one-time passwords.' }, { text: 'Rotating refresh tokens.' }, { text: 'Admin roles checked against the database.' }],
    },
    {
      kind: 'prose',
      id: 'what',
      title: 'What it is',
      paragraphs: [
        'A Next.js 15 storefront and admin: about 73,000 lines of TypeScript, 59 API route handlers and 20 Prisma models.{{cite:kalakraft-codebase}}',
        'Search with Fuse.js; cart, checkout and coupons; order tracking, reviews and support tickets with attachments; admin analytics and low-stock email alerts through Brevo; real-time updates over Pusher; Firebase Auth with JWT.',
      ],
    },
    {
      kind: 'list',
      id: 'limits',
      title: 'Limits',
      tone: 'warn',
      items: [
        { text: 'There are no tests or CI yet; a Playwright smoke test is next.' },
        { text: '[Who else built it, and whether it takes real orders]', placeholder: true },
      ],
    },
  ],
  info: [
    { label: 'Status', value: 'Live', phone: true },
    { label: 'Stack', value: 'Next.js 15 · Prisma · Firebase Auth', phone: true },
    { label: 'Size', value: '~73k lines · 59 API routes · 20 Prisma models', valuePhone: '59 API routes · 20 models', phone: true },
    { label: 'Commits', value: '1,195', phone: true },
    { label: 'Demo', value: 'kalakraftdev.vercel.app', href: 'https://kalakraftdev.vercel.app', phone: true },
    { label: 'Repository', value: 'github.com/yash-vks-chauhan/Kalakraftdev', href: 'https://github.com/yash-vks-chauhan/Kalakraftdev' },
  ],
  sources: ['kalakraft-security', 'kalakraft-codebase'],
  more: ['pulse', 'ct-denoising'],
};

export const ctDenoising: ShortPage = {
  slug: 'ct-denoising',
  title: 'CT denoising U-Net · Yash Chauhan',
  description:
    'An early learning project: a TensorFlow/Keras U-Net for heavy synthetic noise on CT and X-ray images. Its metrics are withheld while a likely noisy/clean pairing bug is re-checked.',
  name: 'CT denoising U-Net',
  lead: 'An early learning project. Metrics withheld while the data pairing is re-checked.',
  leadPhone: 'An early learning project',
  icon: { glyph: 'scan-line', gradient: 'radial-gradient(120% 120% at 20% 0%, #E5E5EA 0%, rgba(229,229,234,0) 55%), linear-gradient(150deg, #AEAEB2 0%, #636366 60%, #3A3A3C 100%)' },
  actions: [{ label: 'Code', href: 'https://github.com/yash-vks-chauhan/CT-Denoising-U-Net', kind: 'code', primary: true }],
  summary: {
    icon: 'scan-line',
    gradient: 'linear-gradient(145deg, #AEAEB2, #636366)',
    text: 'A TensorFlow/Keras U-Net for heavy synthetic noise, from February 2025. The repository’s sample figure points to a noisy/clean pairing bug, so I’m not quoting its metrics until the data is re-checked and the numbers re-run.{{cite:ct-repo}}',
    textPhone: 'An early U-Net project. A likely pairing bug means no metrics until the data is re-checked.{{cite:ct-repo}}',
  },
  sections: [
    {
      kind: 'prose',
      id: 'what',
      title: 'What it is',
      paragraphs: ['A grayscale U-Net (256 × 256 input, 32 to 512 filters, skip connections, mixed precision), trained with synthetic noise injection and augmentation, with CLI inference and a Streamlit app.'],
    },
    {
      kind: 'list',
      id: 'withheld',
      title: 'Why the numbers are withheld',
      tone: 'warn',
      items: [
        { text: 'In the sample figure, the “clean” panels are unrelated edge-map images rather than the matching X-rays, which points to a pairing or indexing bug.' },
        { text: 'If inputs and targets were mismatched, the PSNR and SSIM figures can’t be trusted either.' },
        { text: 'The validation rows include augmentations of the same base images, so the split needs checking for overlap.' },
      ],
    },
    {
      kind: 'list',
      id: 'differently',
      title: 'What I’d do differently',
      tone: 'cite',
      items: [{ text: 'A realistic noise model instead of extreme synthetic noise.' }, { text: 'A held-out split by patient.' }, { text: 'Baselines such as BM3D or DnCNN to compare against.' }],
    },
  ],
  info: [
    { label: 'Status', value: 'On hold', phone: true },
    { label: 'Year', value: '2025', phone: true },
    { label: 'Stack', value: 'TensorFlow · Keras · Streamlit', phone: true },
    { label: 'Model', value: 'U-Net, 256 × 256, grayscale', phone: true },
    { label: 'Repository', value: 'github.com/yash-vks-chauhan/CT-Denoising-U-Net', href: 'https://github.com/yash-vks-chauhan/CT-Denoising-U-Net', phone: true },
  ],
  sources: ['ct-repo'],
  more: ['ems-research', 'autoscaler'],
};
