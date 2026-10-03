// The contact Dock (desktop): Email, GitHub, LinkedIn, Résumé, as drawn under the contact card.
import { FileText, Mail } from 'lucide-react';
import Dock from '../bits/Dock';
import { Brand } from '../ui/Brand';

export default function ContactDock({ email, github, linkedin, resume, className }: { email: string; github: string; linkedin: string; resume: string; className?: string }) {
  return (
    <Dock
      className={className}
      baseItemSize={54}
      magnification={70}
      items={[
        { label: 'Email', href: `mailto:${email}`, background: 'linear-gradient(160deg, #5AC8FA, #0A7CFF)', icon: <Mail size={26} strokeWidth={2} /> },
        { label: 'GitHub', href: github, external: true, background: 'linear-gradient(160deg, #48484A, #1C1C1E)', icon: <Brand name="SiGithub" size={32} /> },
        { label: 'LinkedIn', href: linkedin, external: true, background: 'linear-gradient(160deg, #3D9BE9, #0A66C2)', icon: <Brand name="SiLinkedin" size={24} /> },
        { label: 'Résumé PDF', href: resume, background: 'linear-gradient(160deg, #FF8A80, #E5372B)', icon: <FileText size={26} strokeWidth={2} /> },
      ]}
    />
  );
}
