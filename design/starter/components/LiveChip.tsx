'use client';
// "● Open to 2027 roles · Chennai 9:04 PM": the hero's live chip, ticking on the minute in Chennai time.
import { useEffect, useState } from 'react';
import { formatLocalTime, msToNextMinute } from '../lib/time';
import { site } from '../content/site';

export function LiveChip({ href = '#contact' }: { href?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    let timer: number;
    const tick = () => {
      setTime(formatLocalTime(new Date(), site.timeZone));
      timer = window.setTimeout(tick, msToNextMinute());
    };
    tick();
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <a
      href={href}
      className="inline-flex h-9 items-center gap-2.5 rounded-full bg-[#0B0B0C] pr-4 pl-3 text-[13px] font-semibold tracking-[-0.006em] text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] dark:bg-white/15 dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)] dark:backdrop-blur-xl"
    >
      <span className="live-dot size-2 rounded-full bg-[#34C759]" />
      {site.liveChip}
      {/* Rendered after mount so the server and client never disagree about the time. */}
      {time && <span className="font-medium text-white/65">· {site.city} {time}</span>}
    </a>
  );
}
