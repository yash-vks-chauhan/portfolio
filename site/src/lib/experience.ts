// Experience data shaped for display: the home Experience sheet and the About page both render these.
import { getImage } from 'astro:assets';
import { images } from './images';
import { citeNumber, getSource, type Numbering } from './citations';
import { certifications, education, work } from '../content/experience';
import type { ExperienceItem } from '../content/types';
import type { DetailItem } from '../components/home/ExperienceSection';
import { brandGlyph } from '../components/ui/Brand';

const linkIcons: Record<string, string> = { play: 'SiGoogleplay', appstore: 'SiAppstore' };

// Monogram sizes, as drawn: [desktop row, phone row, detail sheet].
const monoSizes: Record<string, [number, number, number]> = { IIT: [13, 11, 18], H: [16, 15, 22], SRM: [12, 11, 16] };

/** "Jan 2026 – now", "Jun – Jul 2025", "Aug 2023 – 2027" */
export function span(start: string, end: string | null) {
  if (!end) return `${start} – now`;
  const [sm, sy] = start.split(' ');
  const [em, ey] = end.split(' ');
  return ey && sy === ey ? `${sm} – ${em} ${ey}` : `${start} – ${end}`;
}

export async function experienceDetails(n: Numbering, where: string): Promise<{ work: DetailItem[]; education: DetailItem[] }> {
  const grideeIcon = await getImage({ src: images['gridee-icon'], width: 120, height: 120, format: 'webp' });
  const detail = (x: ExperienceItem): DetailItem => ({
    id: x.id,
    title: x.org,
    titleShort: x.orgShort,
    role: x.role,
    roleShort: x.roleShort,
    range: x.range,
    rangeShort: x.rangeShort,
    subtitle: `${x.role} · ${span(x.start, x.end)}`,
    summary: x.summary,
    bullets: (x.bullets ?? []).map((text, i) => {
      const id = x.bulletSources?.[i];
      return id ? { text, cite: { id, n: citeNumber(n, id, where), title: getSource(id).title } } : { text };
    }),
    stack: x.stack,
    links: x.links?.map((l) => (l.kind && linkIcons[l.kind] ? { ...l, icon: brandGlyph(linkIcons[l.kind]) } : l)),
    icon: 'image' in x.icon ? { src: grideeIcon.src } : { monogram: x.icon.monogram, gradient: x.icon.gradient, sizes: monoSizes[x.icon.monogram] ?? [13, 11, 18] },
    href: `/about#${x.id}`,
  });
  return { work: work.map(detail), education: education.map(detail) };
}

/** Certification rows: the year issued, and "Valid to …" or the issuer underneath. */
export const certRows = certifications.map((c) => ({ ...c, year: c.issued.split(' ').pop(), sub: c.validUntil ? `Valid to ${c.validUntil}` : c.issuer }));
