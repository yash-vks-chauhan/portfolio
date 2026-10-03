// Honest status chips. Colour never carries the meaning alone: the label always says it.
import type { Status } from '../content/types';

const STYLE: Record<Status, { label: string; className: string }> = {
  live: { label: 'Live', className: 'bg-ok-wash text-ok' },
  'in-stores': { label: 'In stores', className: 'bg-ok-wash text-ok' },
  'demo-may-sleep': { label: 'Demo may sleep', className: 'bg-mute-wash text-mute' },
  'in-progress': { label: 'In progress', className: 'bg-warn-wash text-warn' },
  manuscript: { label: 'Manuscript', className: 'bg-cite-wash text-cite' },
  'double-blind': { label: 'Double-blind', className: 'bg-cite-wash text-cite' },
  'on-hold': { label: 'On hold', className: 'bg-mute-wash text-mute' },
};

export function StatusChip({ status }: { status: Status }) {
  const s = STYLE[status];
  return <span className={`inline-flex h-[26px] shrink-0 items-center rounded-full px-2.5 text-xs font-semibold tracking-normal ${s.className}`}>{s.label}</span>;
}
