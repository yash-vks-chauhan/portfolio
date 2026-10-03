// Shared content types for the Glass portfolio (extends design/starter/content/types.ts).

export type SourceId = string;

/** Evidence behind a number or claim. Rendered as a numbered source chip, a sheet, and a footnote. */
export interface Source {
  id: SourceId;
  title: string;
  /** One or two sentences shown in the source sheet. */
  detail: string;
  /** Where the evidence lives, e.g. "Glassbox / README › Evaluation". */
  where: string;
  /** ISO date the claim was last checked, or a [placeholder] until it is. */
  checked: string;
  /** Link to the evidence, or a [placeholder] until it exists. */
  url?: string;
  /** Label for the sheet's link button ("Open README"). Defaults to "Open source". */
  linkLabel?: string;
  /** The footnote line at the bottom of a page. */
  note: string;
  /** The line in a case study's "Sources" list, when it differs. */
  noteShort?: string;
  /** The footnote line on phones, when it differs (the phone footer is terser). */
  notePhone?: string;
  /** Label on the citation chips under an Ask answer, e.g. "glassbox-eval-v4 · README". */
  chip: string;
}

export type Status = 'live' | 'in-stores' | 'demo-may-sleep' | 'in-progress' | 'manuscript' | 'double-blind' | 'on-hold';

export type Category = 'ai-systems' | 'full-stack' | 'research' | 'mobile' | 'experiments';

/** A Lucide icon name on a gradient squircle, or a real app icon image. */
export type ProjectIcon = { glyph: string; gradient: string } | { image: string };

export interface Project {
  slug: string;
  name: string;
  /** The one thing the project guarantees, in a sentence. */
  guarantee: string;
  /** The guarantee as the work index and "More work" cards show it. */
  short: string;
  /** The shortest form, for phone list rows. */
  tagline: string;
  summary: string;
  status: Status;
  categories: Category[];
  stack: string[];
  /** The work-index meta line, when it isn't "first three stack items · year". */
  meta?: string;
  year: string;
  icon: ProjectIcon;
  /** Where the project's page lives (a case study, a short page, or the research page). */
  href: string;
  links: {
    caseStudy?: string;
    demo?: string;
    code?: string;
    video?: string;
    site?: string;
    playStore?: string;
    appStore?: string;
  };
  featured?: boolean;
  sources?: SourceId[];
}

export interface ExperienceItem {
  /** Anchor and sheet key. */
  id: string;
  org: string;
  /** Shorter organisation name for phone rows ("SRM IST"). */
  orgShort?: string;
  role: string;
  /** Shorter role for phone rows. */
  roleShort?: string;
  /** "Mon YYYY" */
  start: string;
  /** "Mon YYYY", or null for current roles */
  end: string | null;
  /** The date range as the list row shows it ("2026 – now"). */
  range: string;
  /** The compact range on phones ("2026–"). */
  rangeShort: string;
  summary?: string;
  bullets?: string[];
  /** Source cited after each bullet, by bullet index. */
  bulletSources?: Record<number, SourceId>;
  stack?: string[];
  icon: { monogram: string; gradient: string } | { image: string };
  links?: { label: string; href: string; kind?: 'play' | 'appstore' | 'site' | 'case' }[];
  sources?: SourceId[];
}

export interface Certification {
  name: string;
  issuer: string;
  issued: string;
  validUntil?: string;
  url?: string;
  /** The list row's icon squircle. */
  icon: { glyph: string; gradient: string; color?: string } | { brand: string; gradient: string; color?: string };
}

/** A segment of an answer: plain text (with **bold**), or a citation of a source. */
export type AnswerPart = string | { cite: SourceId };

export interface AskEntry {
  id: string;
  question: string;
  /** Words that strongly indicate this entry. Matched with simple stemming. */
  keywords: string[];
  answer: AnswerPart[];
  /** Breaks ties between equally good matches (higher wins). Give each topic's general answer 1. */
  priority?: number;
}
