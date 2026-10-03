/*
 * ResearchFolder: React Bits Folder (https://reactbits.dev · github.com/DavidHDev/react-bits @ ca44b3f, TS + Tailwind
 * variant), reshaped for the home page's Research card. Copyright (c) 2026 David Haz. MIT + Commons Clause: used inside
 * this site only; the component itself is not sold or redistributed. Full licence: ./LICENSE-react-bits.md.
 *
 * Site changes: the folder keeps React Bits' behaviour (a real toggle; papers lift on hover and fan out when open,
 * following the pointer a little; the front flap tilts open) but takes the drawn geometry instead of scale(): a 320 × 268
 * folder whose papers carry the two manuscripts' labels, from design/prototype GlassHome.html (closed) and
 * GlassComponents-open.html (open). The IEEE paper shows no title, only "IEEE conference" (double-blind review).
 */
import { useState, type CSSProperties, type MouseEvent } from 'react';

interface Paper {
  kicker: string;
  title: string;
  note?: string;
}

const PAPERS: Paper[] = [
  { kicker: 'Manuscript', title: 'EMS drift & equity', note: 'Third of three authors' },
  { kicker: 'Double-blind', title: 'IEEE conference' },
];

// Closed and open poses per paper (rotation in degrees, offset in px), from the two artboards.
const CLOSED = [
  { x: 0, y: 0, r: -8 },
  { x: 0, y: 0, r: 7 },
];
const OPEN = [
  { x: -26, y: -46, r: -12 },
  { x: 30, y: -40, r: 11 },
];

export default function ResearchFolder({ caption = '2 manuscripts · IIT Madras, IEEE' }: { caption?: string }) {
  const [open, setOpen] = useState(false);
  const [offsets, setOffsets] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  const follow = (e: MouseEvent<HTMLSpanElement>, i: number) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.15;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.15;
    setOffsets((prev) => prev.map((o, j) => (j === i ? { x: dx, y: dy } : o)));
  };
  const reset = (i: number) => setOffsets((prev) => prev.map((o, j) => (j === i ? { x: 0, y: 0 } : o)));

  const toggle = () => {
    setOpen((v) => !v);
    setOffsets([
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ]);
  };

  const paperStyle = (i: number): CSSProperties => {
    const pose = open ? OPEN[i] : CLOSED[i];
    const o = offsets[i];
    return { transform: `translate(${pose.x + o.x}px, ${pose.y + o.y}px) rotate(${pose.r}deg)` };
  };

  return (
    <button
      type="button"
      className={`research-folder group ${open ? 'is-open' : ''}`}
      aria-expanded={open}
      aria-label={open ? 'Close the research folder' : 'Open the research folder: two manuscripts'}
      onClick={toggle}
    >
      <span className="rf-tab" aria-hidden="true" />
      <span className="rf-back" aria-hidden="true" />
      {PAPERS.map((p, i) => (
        <span
          key={p.title}
          aria-hidden="true"
          className={`rf-paper rf-paper-${i + 1}`}
          style={paperStyle(i)}
          onMouseMove={(e) => follow(e, i)}
          onMouseLeave={() => reset(i)}
        >
          <span className="rf-kicker">{p.kicker}</span>
          <span className="rf-title">{p.title}</span>
          {p.note && <span className="rf-note">{p.note}</span>}
          <span className="rf-line" />
          {i === 0 && <span className="rf-line rf-line-short" />}
        </span>
      ))}
      <span className="rf-front" aria-hidden="true">
        <span className="rf-front-title">Research</span>
        <span className="rf-front-caption">{caption}</span>
      </span>
    </button>
  );
}
