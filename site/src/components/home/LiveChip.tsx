// "● Open to 2027 roles · Chennai 9:04 PM": the hero's live chip, ticking on the minute in Chennai time.
// From design/starter. The time renders after mount so the server and the browser never disagree; phones show the
// city only, as drawn.
import { useEffect, useState } from 'react';
import { formatLocalTime, msToNextMinute } from '../../lib/time';
import { site } from '../../content/site';

export default function LiveChip({ href = '#contact' }: { href?: string }) {
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
    <a href={href} className="live-chip">
      <span className="live-dot" />
      {site.liveChip}
      <span className="font-medium text-white/64">
        · {site.city}
        {time && <span className="max-md:hidden"> {time}</span>}
      </span>
    </a>
  );
}
