// Site-wide copy. Values in [brackets] are placeholders to fill before launch.
import { withBase } from '../lib/url';

export const site = {
  name: 'Yash Chauhan',
  initials: 'YC',
  role: 'AI/ML Engineer',
  location: 'Chennai, India',
  city: 'Chennai',
  timeZone: 'Asia/Kolkata',
  headline: 'I build AI systems you can audit.',
  /** Where the headline breaks on wide screens, as drawn. */
  headlineLines: ['I build AI systems', 'you can audit.'],
  lead: 'Final-year B.Tech CSE (AI/ML) at SRM, graduating 2027. Co-founder of Gridee. Previously a research intern at IIT Madras.',
  liveChip: 'Open to 2027 roles',
  availability: 'Open to full-time AI/ML and software roles from [month] 2027.',
  email: 'yash.vks.chauhan@gmail.com',
  links: {
    github: 'https://github.com/yash-vks-chauhan',
    linkedin: 'https://www.linkedin.com/in/[handle]',
    resume: withBase('/resume.pdf'),
  },
  /** How the contact card prints the profile links. */
  display: {
    github: 'github.com/yash-vks-chauhan',
    linkedin: 'linkedin.com/in/[handle]',
  },
  footer: 'Every number on this site is sourced.',
  footerPage: 'Every number on this page is sourced.',
  copyright: 'Copyright © 2026 Yash Chauhan.',
  /** A plain bio that search engines and assistants can quote (About page, JSON-LD). */
  bio: 'Yash Chauhan is an AI/ML engineer in Chennai, India, in the final year of a B.Tech in Computer Science and Engineering (AI/ML) at SRM Institute of Science and Technology, graduating in 2027. He co-founded Gridee, a smart-parking app on Android and iOS, and was a research intern at IIT Madras working on emergency medical services analytics. He builds AI systems that cite their sources, refuse when evidence is missing and log every decision.',
} as const;

/** True for a [placeholder] value that hasn't been filled in yet. */
export const isPlaceholder = (value?: string | null): boolean => !value || /\[[^\]]+\]/.test(value);
