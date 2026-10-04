// EMS operational drift (IIT Madras), on the GlassBox template. Facts: the README's EMS research deep-dive and
// design/starter/content. The manuscript isn't published (its venue and review status are still to confirm), so no
// title or venue, and only aggregate findings; the
// record count stays a [placeholder] until the PI agrees it can be shown.
import type { CaseStudy } from './types';

export const ems: CaseStudy = {
  slug: 'ems-research',
  title: 'EMS operational drift · Yash Chauhan',
  description:
    'IIT Madras research on Tamil Nadu’s 108 ambulance service: graph embeddings, a VAE and counterfactual XGBoost separate real operational drift from context a district can’t control, then an equity check on who bears the burden.',
  name: 'EMS operational drift',
  lead: 'IIT Madras research: real operational drift, separated from context a district can’t control.',
  leadPhone: 'IIT Madras research',
  icon: { glyph: 'ambulance', gradient: 'radial-gradient(120% 120% at 20% 0%, #FFA3A3 0%, rgba(255,163,163,0) 55%), linear-gradient(150deg, #FF6B6B 0%, #D7263D 60%, #8A1023 100%)' },
  actions: [{ label: 'All research', href: '/research', kind: 'case' }],
  note: 'A manuscript, not yet published: no title or venue for now, and aggregate results only.',
  stats: [
    { label: 'Service legs', labelPhone: 'Legs', value: '5', note: 'response to return' },
    { label: 'Data', value: '5+ years', note: 'dispatch and road works', notePhone: 'dispatch data' },
    { label: 'Quality checks', labelPhone: 'Checks', value: '100+', note: 'on the raw data', notePhone: 'data quality' },
    { label: 'Model stages', labelPhone: 'Stages', value: '3', note: 'GNN, VAE, XGBoost' },
    { label: 'Equity', value: 'CBI', note: 'Composite Burden Index', notePhone: 'burden index' },
    { label: 'Authorship', labelPhone: 'Author', value: '3rd of 3', note: 'manuscript', notePhone: 'manuscript' },
  ],
  summary: {
    icon: 'ambulance',
    gradient: 'linear-gradient(145deg, #FF6B6B, #D7263D)',
    text: 'At IIT Madras I worked on Tamil Nadu’s 108 ambulance service: a pipeline that separates real operational drift from context a district can’t control, then checks who bears the burden.{{cite:iitm-internship}}',
    textPhone: 'Ambulance analytics for Tamil Nadu: real drift, separated from context a district can’t control, then an equity check.{{cite:iitm-internship}}',
  },
  sections: [
    {
      kind: 'prose',
      id: 'problem',
      title: 'Problem',
      phone: 1,
      paragraphs: [
        'An ambulance service’s times drift for many reasons. Some are operational and fixable. Others, like metro congestion or tribal terrain, are context a district can’t control, and they fail in different ways.{{cite:ems-manuscript}}',
        'Treat them the same and you can’t tell what to fix. This work separates the two, then measures who bears the burden.',
      ],
      paragraphsPhone: [
        'Ambulance times drift for many reasons: some operational and fixable, some (metro congestion, tribal terrain) context a district can’t control. This work separates the two, then checks who bears the burden.{{cite:ems-manuscript}}',
      ],
    },
    {
      kind: 'constraints',
      id: 'data',
      title: 'Data',
      phone: 'more',
      items: [
        { icon: 'database', gradient: 'linear-gradient(145deg, #5AC8FA, #0A7CFF)', title: 'Five-plus years.', text: 'Dispatch and road-construction data, with 100+ data-quality checks.' },
        { icon: 'layers', gradient: 'linear-gradient(145deg, #8E8BFF, #5149C9)', title: 'Five service legs.', text: 'Response, on-scene, travel, hospital handover and return, analysed separately.' },
        { icon: 'lock', gradient: 'linear-gradient(145deg, #FFB340, #F08A00)', title: 'Government data.', text: 'Only aggregate results are shown here.' },
      ],
    },
    {
      kind: 'architecture',
      id: 'method',
      title: 'Method',
      titlePhone: 'How the analysis runs',
      phone: 2,
      intro: 'Each stage answers one question: is this leg unusual, by how much, and who carries it.',
      diagram: {
        width: 780,
        height: 296,
        nodes: [
          { x: 8, y: 24, icon: 'ambulance', bold: 'Calls,', text: 'split into five legs' },
          { x: 206, y: 24, icon: 'git-branch', bold: 'Stage embeddings', text: 'from a graph network' },
          { x: 404, y: 24, icon: 'gauge', bold: 'VAE', text: 'flags anomalies' },
          { x: 602, y: 24, icon: 'activity', bold: 'Counterfactual XGBoost', text: 'sizes each one' },
          { x: 602, y: 184, icon: 'users', tone: 'cite', bold: 'Burden index:', text: 'who carries the delay' },
        ],
        edges: [
          { x: 158, y: 64, len: 46, dir: 'right', arrow: true },
          { x: 356, y: 64, len: 46, dir: 'right', arrow: true },
          { x: 554, y: 64, len: 46, dir: 'right', arrow: true },
          { x: 673, y: 112, len: 70, dir: 'down', arrow: true },
        ],
        labels: [
          {
            x: 8,
            y: 184,
            w: 520,
            size: 'note',
            text: 'The embeddings come from GraphSAGE; SHAP explains what drives the models. The equity check runs across metro, tribal and rural districts.',
          },
        ],
        text: 'Text version: each call is split into five service legs. A graph neural network (GraphSAGE) embeds each stage; a variational autoencoder flags anomalies; a counterfactual XGBoost model estimates how large each anomaly is; and a Composite Burden Index compares who bears the delays.',
      },
      steps: [
        { text: '**Split** each call into five service legs' },
        { text: '**Embed** each stage with a graph neural network' },
        { text: '**Flag** anomalies with a VAE' },
        { text: '**Size** each anomaly with counterfactual XGBoost' },
        { text: '**Compare** who bears the burden, with a Composite Burden Index', tone: 'cite', icon: 'users' },
      ],
    },
    {
      kind: 'list',
      id: 'findings',
      title: 'Findings',
      phone: 3,
      numbered: true,
      intro: 'Aggregate findings from the manuscript, which isn’t published yet.{{cite:ems-manuscript}}',
      items: [
        { text: 'Neonatal and paediatric cases bear the highest burden on the response and return legs.' },
        { text: 'Behavioural cases bear it at hospital handover.' },
        { text: 'Gender parity holds on four of five legs; the exception is on-scene time for female patients.' },
        { text: 'Metro congestion and tribal terrain are different failure paths.' },
        { text: 'No evidence of systemic neglect of disadvantaged socio-economic groups.' },
      ],
    },
    {
      kind: 'prose',
      id: 'role',
      title: 'My part',
      phone: 4,
      paragraphs: [
        'Third of three authors. I ingested five-plus years of dispatch and road-construction data with 100+ data-quality checks, built the GraphSAGE → VAE → XGBoost workflow for drift and anomaly analysis, and ran the equity analysis across metro, tribal and rural districts.{{cite:iitm-internship}}',
      ],
    },
    {
      kind: 'list',
      id: 'limits',
      title: 'Limits',
      phone: 'more',
      tone: 'warn',
      items: [
        { text: 'Government data: only aggregate results are shown, and only what the PI agrees to.' },
        { text: 'The manuscript isn’t published yet; its title and venue come later.' },
        { text: '[What you’d do differently]', placeholder: true },
      ],
    },
    {
      kind: 'next',
      id: 'next',
      title: 'What I’d do next',
      toc: 'Next',
      phone: 'more',
      items: [
        { status: 'Planned', text: 'Add aggregate charts and district maps once the PI confirms what can be shown.' },
        { status: 'Planned', text: 'Name the venue and link the paper once it’s published.' },
      ],
    },
  ],
  info: [
    { label: 'Role', value: 'Research intern · third of three authors', valuePhone: 'Intern · 3rd of 3 authors', phone: true },
    { label: 'Where', value: 'IIT Madras', phone: true },
    { label: 'Timeline', value: 'Mar 2025 – Mar 2026', phone: true },
    { label: 'Status', value: 'Manuscript, not yet published', valuePhone: 'Manuscript', phone: true },
    { label: 'Stack', value: 'Python · GraphSAGE · VAE · XGBoost · SHAP', valuePhone: 'Python · GraphSAGE · XGBoost' },
    { label: 'Data', value: 'Tamil Nadu 108 ambulance service' },
    { label: 'Records', value: '[Record count, once the PI agrees it can be shown]' },
  ],
  sources: ['iitm-internship', 'ems-manuscript'],
  more: ['glassbox', 'pulse'],
};
