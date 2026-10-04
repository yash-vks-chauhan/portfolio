// The case-study template (design/prototype GlassCase.html, phones GlassMobileCaseDark.html), as data.
// Text fields are rich strings: **bold**, {{cite:source-id}} for a numbered source marker. Values in [brackets]
// are placeholders to fill before launch; they render in the secondary label colour.
// Phone variants (`…Phone`) are the condensed wording drawn on the mobile artboard; without one, phones show the
// desktop text.
import type { SourceId } from '../types';
import type { ImageKey } from '../../lib/images';

export type Rich = string;
export type Tone = 'fill' | 'ok' | 'warn' | 'cite';

export interface CaseAction {
  label: string;
  /** Shorter label on phones ("Open"). */
  labelPhone?: string;
  href: string;
  kind: 'demo' | 'code' | 'video' | 'play' | 'appstore' | 'site' | 'case';
  primary?: boolean;
  /** Hidden on phones, as drawn (phones show two actions). */
  desktopOnly?: boolean;
}

export interface Stat {
  label: string;
  labelPhone?: string;
  value: string;
  note: string;
  notePhone?: string;
}

export interface Slide {
  image: ImageKey;
  alt: string;
  title: string;
  caption: string;
  captionPhone?: string;
}

export interface Constraint {
  icon: string;
  gradient: string;
  title: string;
  text: string;
}

/** A box on the architecture diagram, positioned in px on its canvas (150 × 88 unless given). */
export interface DiagramNode {
  x: number;
  y: number;
  w?: number;
  h?: number;
  icon: string;
  tone?: Tone;
  bold: string;
  text: string;
}

/** A straight connector from (x, y): its length and direction, with or without an arrowhead. */
export interface DiagramEdge {
  x: number;
  y: number;
  len: number;
  dir: 'right' | 'left' | 'down' | 'up';
  arrow?: boolean;
}

export interface DiagramLabel {
  x: number;
  y: number;
  w: number;
  text: string;
  tone?: 'ok' | 'warn' | 'label2';
  align?: 'left' | 'center';
  /** 'note' is the 15/22 px annotation; the default is the 13/16 px edge label. */
  size?: 'label' | 'note';
}

export interface Diagram {
  width: number;
  height: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  labels?: DiagramLabel[];
  /** The figure's text version (its caption), so the diagram never carries meaning alone. */
  text: string;
}

/** A row in the phone version of the diagram: a numbered (or toned) step. */
export interface Step {
  text: Rich;
  tone?: Exclude<Tone, 'fill'>;
  icon?: string;
}

export interface Decision {
  title: string;
  chose: Rich;
  over: Rich;
  because: Rich;
  cost: Rich;
  becausePhone?: Rich;
  costPhone?: Rich;
}

export interface Metric {
  label: string;
  note: string;
  value: string;
  /** The interval drawn on a bar, as fractions of the bar (0–1). */
  bar?: { from: number; to: number };
}

export interface Evaluation {
  intro: Rich;
  introPhone?: Rich;
  ring: { k: number; n: number; caption: Rich; title: string; notePhone: Rich };
  metrics: Metric[];
  /** Rows on phones: label and value (a muted note after the value). */
  phoneRows: { label: string; value: string; note?: string }[];
  caveat: Rich;
  caveatPhone?: Rich;
  reproduce?: { command: string; comment?: string; output: string };
}

export interface OpsCard {
  value: string;
  cite?: SourceId;
  text: string;
}

export interface Ops {
  cards: OpsCard[];
  chainTitle: string;
  chain: { label: string; icon?: string; tone?: 'ok' }[];
  note?: Rich;
}

/** One numbered or toned row in a plain list section (limits, findings). */
export interface ListItem {
  text: Rich;
  placeholder?: boolean;
}

export type Section =
  | { kind: 'prose'; id: string; title: string; toc?: string; paragraphs: Rich[]; paragraphsPhone?: Rich[] }
  | { kind: 'constraints'; id: string; title: string; toc?: string; items: Constraint[] }
  | { kind: 'architecture'; id: string; title: string; toc?: string; intro: Rich; diagram: Diagram; titlePhone: string; steps: Step[] }
  | { kind: 'decisions'; id: string; title: string; toc?: string; items: Decision[] }
  | { kind: 'evaluation'; id: string; title: string; toc?: string; evaluation: Evaluation }
  | { kind: 'ops'; id: string; title: string; toc?: string; ops: Ops }
  | { kind: 'list'; id: string; title: string; toc?: string; intro?: Rich; items: ListItem[]; tone?: 'warn' | 'ok' | 'cite'; numbered?: boolean }
  | { kind: 'next'; id: string; title: string; toc?: string; items: { status: string; text: Rich }[] }
  | { kind: 'ai-note'; id: string; title: string; toc?: string; text: Rich };

export interface InfoRow {
  label: string;
  value: string;
  labelPhone?: string;
  valuePhone?: string;
  href?: string;
  /** Shown on phones too (phones show five rows, as drawn). */
  phone?: boolean;
}

export interface CaseStudy {
  slug: string;
  /** <title> and meta description. */
  title: string;
  description: string;
  name: string;
  lead: string;
  /** The phone header's one-line tagline. */
  leadPhone: string;
  icon: { glyph: string; gradient: string } | { image: ImageKey };
  actions: CaseAction[];
  /** The small print under the actions (e.g. the demo's cold start). */
  note?: string;
  stats: Stat[];
  preview?: { slides: Slide[]; image?: 'landscape' | 'phone' };
  summary: { icon: string; gradient: string; text: Rich; textPhone?: Rich };
  /** In desktop order. `phone` decides where the section goes on phones: drawn inline (with an order), or behind a disclosure. */
  sections: (Section & { phone?: number | 'more' })[];
  info: InfoRow[];
  /** Every source the page cites, in citation order (the numbering). */
  sources: SourceId[];
  /** Two project slugs for "More work". */
  more: [string, string];
}

export interface ShortPage {
  slug: string;
  title: string;
  description: string;
  name: string;
  lead: string;
  leadPhone: string;
  icon: { glyph: string; gradient: string };
  actions: CaseAction[];
  note?: string;
  /** A status line under the header, e.g. what isn't built yet. */
  summary: { icon: string; gradient: string; text: Rich; textPhone?: Rich };
  sections: Section[];
  info: InfoRow[];
  sources: SourceId[];
  more: [string, string];
}
