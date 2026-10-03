// The toast drawn on the Components artboard: a strong-glass pill with a check, the message and a muted detail.
import { CircleCheck, CircleAlert } from 'lucide-react';

export function GlassToast({ message, detail, tone = 'ok' }: { message: string; detail?: string; tone?: 'ok' | 'mute' }) {
  const Icon = tone === 'ok' ? CircleCheck : CircleAlert;
  return (
    <div role="status" className="glass-toast">
      <span className={`flex ${tone === 'ok' ? 'text-ok' : 'text-mute'}`}>
        <Icon size={20} strokeWidth={2.2} aria-hidden="true" />
      </span>
      <span className="whitespace-nowrap">{message}</span>
      {detail && <span className="ml-auto min-w-0 truncate pl-2 text-[13px] font-normal text-label2">{detail}</span>}
    </div>
  );
}
