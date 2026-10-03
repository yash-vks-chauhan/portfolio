// iOS inset grouped list: rounded card, rows at least 64 px, separators inset to where the text starts.
import type { ReactNode } from 'react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';

export interface InsetRow {
  key: string;
  icon?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** A date, a status chip, a count. */
  trailing?: ReactNode;
  href?: string;
  external?: boolean;
  selected?: boolean;
}

export function InsetList({ header, rows }: { header?: string; rows: InsetRow[] }) {
  return (
    <div>
      {header && <h3 className="m-0 px-5 pb-2 text-[13px] font-semibold tracking-[0.02em] text-label2 uppercase">{header}</h3>}
      <ul className="m-0 list-none overflow-hidden rounded-list bg-card p-0 elev-resting">
        {rows.map((row, i) => {
          const inner = (
            <>
              {row.icon && <span className="self-center">{row.icon}</span>}
              <span className={`flex min-w-0 flex-1 items-center gap-4 py-3.5 pr-5 ${i > 0 ? 'border-t border-sep' : ''}`}>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-body font-semibold tracking-[-0.016em]">{row.title}</span>
                  {row.subtitle && <span className="text-callout text-label2">{row.subtitle}</span>}
                </span>
                {row.trailing && <span className="text-callout text-label2">{row.trailing}</span>}
                {row.href && (
                  <span className="flex text-label3">
                    {row.external ? <ArrowUpRight size={16} strokeWidth={2} aria-hidden /> : <ChevronRight size={18} strokeWidth={2} aria-hidden />}
                  </span>
                )}
              </span>
            </>
          );
          const rowClass = `flex min-h-[76px] items-stretch gap-4 pl-5 transition-colors ${row.selected ? 'bg-cite-wash' : row.href ? 'hover:bg-fill' : ''}`;
          return (
            <li key={row.key}>
              {row.href ? (
                <a
                  href={row.href}
                  target={row.external ? '_blank' : undefined}
                  rel={row.external ? 'noreferrer' : undefined}
                  aria-current={row.selected || undefined}
                  className={rowClass}
                >
                  {inner}
                </a>
              ) : (
                <div className={rowClass}>{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
