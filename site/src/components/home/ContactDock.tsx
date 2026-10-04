// The contact Dock (desktop): Email, GitHub, LinkedIn, Résumé, as drawn under the contact card.
import { FileText, Mail } from 'lucide-react';
import Dock from '../bits/Dock';
import { BrandSvg } from '../ui/BrandSvg';
import type { BrandGlyph } from '../../lib/brand-icons';

export default function ContactDock({
  email,
  github,
  linkedin,
  resume,
  icons,
  className,
}: {
  email: string;
  github: string;
  linkedin: string;
  resume: string;
  icons: { github: BrandGlyph; linkedin: BrandGlyph };
  className?: string;
}) {
  return (
    <Dock
      className={className}
      baseItemSize={54}
      magnification={70}
      items={[
        { label: 'Email', href: `mailto:${email}`, background: 'linear-gradient(160deg, #5AC8FA, #0A7CFF)', icon: <Mail size={26} strokeWidth={2} /> },
        { label: 'GitHub', href: github, external: true, background: 'linear-gradient(160deg, #48484A, #1C1C1E)', icon: <BrandSvg glyph={icons.github} size={32} /> },
        { label: 'LinkedIn', href: linkedin, external: true, background: 'linear-gradient(160deg, #3D9BE9, #0A66C2)', icon: <BrandSvg glyph={icons.linkedin} size={24} /> },
        { label: 'Résumé PDF', href: resume, background: 'linear-gradient(160deg, #FF8A80, #E5372B)', icon: <FileText size={26} strokeWidth={2} /> },
      ]}
    />
  );
}
