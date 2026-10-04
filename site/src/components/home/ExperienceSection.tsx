// Experience: inset grouped lists (Work, Education) next to a detail sheet for the selected row, Gridee shown open,
// as drawn. Desktop keeps the sheet beside the lists and a row selects into it; phones open the same details in a
// vaul bottom sheet (ExperienceDrawer, loaded on the first tap). Rows are links to the About page, so without
// JavaScript they still lead to the details. Certifications are plain links out to each credential, rendered by
// Astro and passed in as `children`.
import { lazy, Suspense, useRef, useState, type ElementType, type MouseEvent, type ReactNode } from 'react';
import { ChevronRight, CircleCheck } from 'lucide-react';
import { BrandSvg } from '../ui/BrandSvg';
import type { BrandGlyph } from '../../lib/brand-icons';

const loadDrawer = () => import('./ExperienceDrawer');
const ExperienceDrawer = lazy(loadDrawer);

export interface DetailCite {
  id: string;
  n: number;
  title: string;
}

export interface DetailItem {
  id: string;
  title: string;
  titleShort?: string;
  role: string;
  roleShort?: string;
  range: string;
  rangeShort: string;
  /** "Co-Founder & Founding Engineer · Jan 2026 – now" */
  subtitle: string;
  summary?: string;
  bullets: { text: string; cite?: DetailCite }[];
  stack?: string[];
  links?: { label: string; href: string; kind?: string; icon?: BrandGlyph }[];
  icon: { src: string } | { monogram: string; gradient: string; sizes: [number, number, number] };
  href: string;
}

const PHONE = '(max-width: 47.99rem)';

export function Icon({ item, size, loading = 'lazy' }: { item: DetailItem; size: 'row' | 'detail'; loading?: 'lazy' | 'eager' }) {
  const cls = size === 'row' ? 'exp-icon' : 'exp-icon-lg';
  if ('src' in item.icon) return <img src={item.icon.src} alt="" className={cls} width={60} height={60} loading={loading} decoding="async" />;
  const [row, phone, detail] = item.icon.sizes;
  return (
    <span
      aria-hidden="true"
      className={`${cls} exp-mono`}
      style={{ background: item.icon.gradient, '--mono': `${size === 'row' ? row : detail}px`, '--mono-phone': `${size === 'row' ? phone : detail}px` } as React.CSSProperties}
    >
      {item.icon.monogram}
    </span>
  );
}

/** `Title` lets the phone sheet name its dialog with vaul's Drawer.Title; `iconLoading` is for a card on screen at load. */
export function Detail({ item, Title = 'span', iconLoading }: { item: DetailItem; Title?: ElementType; iconLoading?: 'lazy' | 'eager' }) {
  return (
    <>
      <div className="flex items-center gap-3.5">
        <Icon item={item} size="detail" loading={iconLoading} />
        <div className="flex min-w-0 flex-col">
          <Title className="text-[22px] leading-[1.2] font-semibold tracking-normal">{item.title}</Title>
          <span className="text-[15px] tracking-[-0.012em] text-label2">{item.subtitle}</span>
        </div>
      </div>
      {item.summary && <p className="exp-summary">{item.summary}</p>}
      {item.bullets.length > 0 && (
        <ul className="exp-bullets">
          {item.bullets.map((b) => (
            <li key={b.text}>
              <span className="flex pt-0.5 text-link" aria-hidden="true">
                <CircleCheck size={16} strokeWidth={2.2} />
              </span>
              <span>
                {b.text}
                {b.cite && (
                  <a href={`#fn-${b.cite.n}`} className="cite" data-cite={b.cite.id} data-n={b.cite.n} aria-label={`Source ${b.cite.n}: ${b.cite.title}`}>
                    {b.cite.n}
                  </a>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
      {item.stack && item.stack.length > 0 && (
        <ul className="exp-stack" aria-label="Stack">
          {item.stack.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>
      )}
      {item.links && item.links.length > 0 && (
        <div className="exp-links">
          {item.links.map((l, i) => {
            const external = /^https?:/.test(l.href);
            return (
              <a
                key={l.href}
                href={l.href}
                className={`pill ${i === 0 ? 'exp-link-primary' : 'exp-link-secondary'}`}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
              >
                {l.icon && <BrandSvg glyph={l.icon} size={15} />}
                {l.label}
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}

function Rows({
  items,
  selected,
  onPick,
  onPrefetch,
}: {
  items: DetailItem[];
  selected: string | null;
  onPick: (item: DetailItem, e: MouseEvent<HTMLAnchorElement>) => void;
  onPrefetch: () => void;
}) {
  return (
    <div className="exp-list">
      {items.map((item, i) => {
        const on = item.id === selected;
        return (
          <a
            key={item.id}
            href={item.href}
            className={`row exp-row ${on ? 'is-on' : ''}`}
            aria-current={on ? 'true' : undefined}
            aria-controls="exp-detail"
            onClick={(e) => onPick(item, e)}
            onPointerDown={onPrefetch}
          >
            <Icon item={item} size="row" />
            <span className={`exp-row-body ${i > 0 ? 'border-t border-sep' : ''}`}>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="exp-row-title">
                  {item.titleShort ? (
                    <>
                      <span className="max-md:hidden">{item.title}</span>
                      <span className="md:hidden">{item.titleShort}</span>
                    </>
                  ) : (
                    item.title
                  )}
                </span>
                <span className="exp-row-sub">
                  {item.roleShort ? (
                    <>
                      <span className="max-md:hidden">{item.role}</span>
                      <span className="md:hidden">{item.roleShort}</span>
                    </>
                  ) : (
                    item.role
                  )}
                </span>
              </span>
              <span className="exp-row-range">
                <span className="max-md:hidden">{item.range}</span>
                <span className="md:hidden">{item.rangeShort}</span>
              </span>
              <span className="flex text-label3" aria-hidden="true">
                <ChevronRight size={18} strokeWidth={2} className="max-md:size-4" />
              </span>
            </span>
          </a>
        );
      })}
    </div>
  );
}

export default function ExperienceSection({ work, education, children }: { work: DetailItem[]; education: DetailItem[]; children?: ReactNode }) {
  const all = [...work, ...education];
  const [selected, setSelected] = useState(all[0].id);
  const [sheet, setSheet] = useState<DetailItem | null>(null);
  const [sheetUsed, setSheetUsed] = useState(false);
  const [say, setSay] = useState('');
  const trigger = useRef<HTMLElement | null>(null);
  const current = all.find((x) => x.id === selected) ?? all[0];

  const pick = (item: DetailItem, e: MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (window.matchMedia(PHONE).matches) {
      trigger.current = e.currentTarget;
      setSheetUsed(true);
      setSheet(item);
    } else {
      setSelected(item.id);
      setSay(`Showing ${item.title}`);
    }
  };

  // Phones fetch the sheet as a finger lands on a row, so it's usually ready by the time the tap ends.
  const prefetch = () => {
    if (window.matchMedia(PHONE).matches) void loadDrawer();
  };

  return (
    <div className="exp-layout">
      <div className="exp-lists">
        <div>
          <h3 className="exp-group">Work</h3>
          <Rows items={work} selected={selected} onPick={pick} onPrefetch={prefetch} />
        </div>
        <div>
          <h3 className="exp-group">Education</h3>
          <Rows items={education} selected={selected} onPick={pick} onPrefetch={prefetch} />
        </div>
        {children}
      </div>

      <aside id="exp-detail" aria-label={`${current.title} details`} className="exp-sheet max-md:hidden">
        <div aria-hidden="true" className="exp-handle" />
        <Detail item={current} />
      </aside>
      <p className="sr-only" aria-live="polite">
        {say}
      </p>

      {sheetUsed && (
        <Suspense fallback={null}>
          <ExperienceDrawer item={sheet} onClose={() => setSheet(null)} trigger={trigger} />
        </Suspense>
      )}
    </div>
  );
}
