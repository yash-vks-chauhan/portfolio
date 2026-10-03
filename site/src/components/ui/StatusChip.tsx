// Honest status chips. Colour never carries the meaning alone: the label always says it. From design/starter.
import type { Status } from '../../content/types';

const STYLE: Record<Status, { label: string; className: string }> = {
  live: { label: 'Live', className: 'bg-ok-wash text-ok' },
  'in-stores': { label: 'In stores', className: 'bg-ok-wash text-ok' },
  'demo-may-sleep': { label: 'Demo may sleep', className: 'bg-mute-wash text-mute' },
  'in-progress': { label: 'In progress', className: 'bg-warn-wash text-warn' },
  manuscript: { label: 'Manuscript', className: 'bg-cite-wash text-cite' },
  'double-blind': { label: 'Double-blind', className: 'bg-cite-wash text-cite' },
  'on-hold': { label: 'On hold', className: 'bg-mute-wash text-mute' },
};

export const statusLabel = (status: Status) => STYLE[status].label;

export function StatusChip({ status, size = 'md', className = '' }: { status: Status; size?: 'sm' | 'md'; className?: string }) {
  const s = STYLE[status];
  const dims = size === 'sm' ? 'h-6 px-[9px] text-[11px]' : 'h-[26px] px-2.5 text-xs';
  return <span className={`inline-flex shrink-0 items-center rounded-full font-semibold tracking-normal ${dims} ${s.className} ${className}`}>{s.label}</span>;
}
