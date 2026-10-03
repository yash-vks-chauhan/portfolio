// Shared content types for the Glass portfolio.

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
  checked?: string;
  /** Link to the evidence, or a [placeholder] until it exists. */
  url?: string;
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
  summary: string;
  status: Status;
  categories: Category[];
  stack: string[];
  year: string;
  icon: ProjectIcon;
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
  /** Facts to confirm before launch. Not rendered. */
  todo?: string[];
}

export interface ExperienceItem {
  org: string;
  role: string;
  /** "Mon YYYY" */
  start: string;
  /** "Mon YYYY", or null for current roles */
  end: string | null;
  summary?: string;
  bullets?: string[];
  stack?: string[];
  icon: { monogram: string; gradient: string } | { image: string };
  links?: { label: string; href: string }[];
  sources?: SourceId[];
}

export interface Certification {
  name: string;
  issuer: string;
  issued: string;
  validUntil?: string;
  url?: string;
}

/** A segment of an answer: plain text, or a citation of a source. */
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
