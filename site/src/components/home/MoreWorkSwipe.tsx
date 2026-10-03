// Phones: the More-work rows as React Bits SwipeRows. Swipe left for Code and Demo; a tap opens the project page.
// Keyboard users get the row's link and SwipeRow's own "actions" toggle.
import { Play } from 'lucide-react';
import SwipeRow, { type SwipeAction } from '../bits/SwipeRow';
import { Brand } from '../ui/Brand';
import { glyph } from '../ui/glyphs';
import { StatusChip } from '../ui/StatusChip';
import type { Project } from '../../content/types';

type Row = Pick<Project, 'slug' | 'name' | 'tagline' | 'status' | 'href' | 'icon' | 'links'>;

export default function MoreWorkSwipe({ rows }: { rows: Row[] }) {
  return (
    <div className="more-list">
      {rows.map((p, i) => {
        const Icon = 'glyph' in p.icon ? glyph(p.icon.glyph) : null;
        const actions: SwipeAction[] = [];
        if (p.links.demo) actions.push({ id: 'demo', label: 'Demo', color: '#0071E3', icon: <Play size={18} strokeWidth={2} aria-hidden="true" /> });
        if (p.links.code) actions.push({ id: 'code', label: 'Code', color: '#636366', icon: <Brand name="SiGithub" size={18} /> });
        return (
          <SwipeRow
            key={p.slug}
            label={p.name}
            actions={actions}
            height="auto"
            radius={0}
            rowColor="var(--card)"
            textColor="var(--label)"
            drawerColor="#636366"
            actionWidth={80}
            fullSwipe={false}
            haptic={false}
            onTap={() => {
              window.location.href = p.href;
            }}
            onAction={(a) => {
              const url = a.id === 'demo' ? p.links.demo : p.links.code;
              if (url) window.open(url, '_blank', 'noopener');
            }}
            style={{ ['--sr-min' as string]: '64px', ['--sr-pl' as string]: '14px', ['--sr-pr' as string]: '0px' }}
          >
            {Icon && 'gradient' in p.icon && (
              <span className="more-icon-sm" style={{ background: p.icon.gradient }} aria-hidden="true">
                <Icon size={19} strokeWidth={2} />
              </span>
            )}
            <span className={`more-row-body ${i > 0 ? 'border-t border-sep' : ''}`}>
              <span className="flex min-w-0 flex-1 flex-col">
                <a href={p.href} className="more-title-sm" draggable={false}>
                  {p.name}
                </a>
                <span className="more-sub-sm">{p.tagline}</span>
              </span>
              <StatusChip status={p.status} size="sm" />
            </span>
          </SwipeRow>
        );
      })}
    </div>
  );
}
