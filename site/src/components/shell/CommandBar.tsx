// The ⌘K command bar (cmdk in a Radix dialog): search projects and pages, and run actions
// (copy email, download résumé, switch theme). The Shell island opens it (⌘K / Ctrl+K, any [data-command] button,
// openCommandBar()) and loads this module on first use. Radix traps focus while it's open; Esc closes it and focus
// returns to where it was.
import { useEffect, useState, type ReactNode } from 'react';
import { Command } from 'cmdk';
import {
  ArrowUpRight,
  Copy,
  Download,
  FileText,
  House,
  LayoutGrid,
  Mail,
  Moon,
  Search,
  Sparkles,
  Sun,
  User,
} from 'lucide-react';
import { projects } from '../../content/projects';
import { site } from '../../content/site';
import { glyph } from '../ui/glyphs';
import { Brand } from '../ui/Brand';
import { requestCopy } from '../../lib/events';
import { currentTheme, setTheme } from '../../lib/theme';

interface Entry {
  id: string;
  label: string;
  hint?: string;
  keywords?: string[];
  icon: ReactNode;
  run: () => void;
}

const go = (href: string) => () => {
  window.location.href = href;
};

/** Every word typed must start a word in the item's label or keywords ("cop em" finds "Copy email"). */
export function commandFilter(value: string, search: string, keywords?: string[]): number {
  const words = `${value} ${(keywords ?? []).join(' ')}`.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').split(/[^a-z0-9.+#]+/).filter(Boolean);
  const query = search.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').split(/[^a-z0-9.+#]+/).filter(Boolean);
  if (query.length === 0) return 1;
  let score = 0;
  for (const q of query) {
    const hit = words.findIndex((w) => w.startsWith(q));
    if (hit === -1) return 0;
    score += hit === 0 ? 1 : 0.6;
  }
  return score / query.length;
}

const projectHint = (slug: string, href: string) =>
  href.startsWith('/research') ? 'Research' : ['glassbox', 'pulse', 'gridee', 'ems-research'].includes(slug) ? 'Case study' : 'Project';

export default function CommandBar({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    if (open) setThemeState(currentTheme());
  }, [open]);
  const setOpen = onOpenChange;

  const close = () => setOpen(false);
  const run = (fn: () => void) => () => {
    close();
    fn();
  };

  const projectEntries: Entry[] = projects.map((p) => {
    const Icon = 'glyph' in p.icon ? glyph(p.icon.glyph) : glyph('car');
    return {
      id: `project-${p.slug}`,
      label: p.name,
      hint: projectHint(p.slug, p.href),
      keywords: [...p.stack, p.slug, p.summary],
      icon: <Icon size={16} strokeWidth={2} aria-hidden="true" />,
      run: go(p.href),
    };
  });

  const pageEntries: Entry[] = [
    { id: 'page-home', label: 'Home', icon: <House size={16} strokeWidth={2} aria-hidden="true" />, run: go('/') },
    { id: 'page-work', label: 'All work', keywords: ['projects', 'index'], icon: <LayoutGrid size={16} strokeWidth={2} aria-hidden="true" />, run: go('/work') },
    { id: 'page-ask', label: 'Ask my portfolio', keywords: ['question', 'chat'], icon: <Sparkles size={16} strokeWidth={2} aria-hidden="true" />, run: go('/#ask') },
    { id: 'page-research', label: 'Research', keywords: ['manuscripts', 'papers'], icon: <FileText size={16} strokeWidth={2} aria-hidden="true" />, run: go('/research') },
    { id: 'page-about', label: 'About', keywords: ['experience', 'education', 'certifications'], icon: <User size={16} strokeWidth={2} aria-hidden="true" />, run: go('/about') },
  ];

  const actionEntries: Entry[] = [
    { id: 'copy-email', label: 'Copy email', keywords: ['contact', site.email], icon: <Copy size={16} strokeWidth={2} aria-hidden="true" />, run: () => requestCopy({ kind: 'email' }) },
    { id: 'resume', label: 'Download résumé', keywords: ['resume', 'cv', 'pdf'], icon: <Download size={16} strokeWidth={2} aria-hidden="true" />, run: go(site.links.resume) },
    { id: 'email', label: 'Email me', keywords: ['contact', 'mail'], icon: <Mail size={16} strokeWidth={2} aria-hidden="true" />, run: go(`mailto:${site.email}`) },
    theme === 'dark'
      ? { id: 'theme', label: 'Switch to light appearance', keywords: ['theme', 'mode'], icon: <Sun size={16} strokeWidth={2} aria-hidden="true" />, run: () => setTheme('light') }
      : { id: 'theme', label: 'Switch to dark appearance', keywords: ['theme', 'mode'], icon: <Moon size={16} strokeWidth={2} aria-hidden="true" />, run: () => setTheme('dark') },
    { id: 'github', label: 'Open GitHub', icon: <Brand name="SiGithub" size={16} />, hint: '↗', run: go(site.links.github) },
    { id: 'linkedin', label: 'Open LinkedIn', icon: <Brand name="SiLinkedin" size={15} />, hint: '↗', run: go(site.links.linkedin) },
  ];

  const group = (heading: string, entries: Entry[]) => (
    <Command.Group heading={heading}>
      {entries.map((e) => (
        <Command.Item key={e.id} value={e.label} keywords={e.keywords} onSelect={run(e.run)}>
          <span className="flex text-current">{e.icon}</span>
          <span className="min-w-0 flex-1 truncate">{e.label}</span>
          {e.hint === '↗' ? (
            <ArrowUpRight size={14} strokeWidth={2} className="cmdk-hint" aria-hidden="true" />
          ) : (
            e.hint && <span className="cmdk-hint">{e.hint}</span>
          )}
        </Command.Item>
      ))}
    </Command.Group>
  );

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Search the site"
      loop
      filter={commandFilter}
      overlayClassName="cmdk-overlay"
      contentClassName="cmdk-content"
    >
      <div className="cmdk-input-row">
        <Search size={18} strokeWidth={2} className="flex-none text-label2" aria-hidden="true" />
        <Command.Input placeholder="Search projects, actions…" aria-label="Search projects, pages and actions" />
        <button type="button" className="cmdk-esc" onClick={close} aria-label="Close search">
          esc
        </button>
      </div>
      <Command.List>
        <Command.Empty>No match. Try a project name, “résumé” or “email”.</Command.Empty>
        {group('Projects', projectEntries)}
        {group('Pages', pageEntries)}
        {group('Actions', actionEntries)}
      </Command.List>
    </Command.Dialog>
  );
}
