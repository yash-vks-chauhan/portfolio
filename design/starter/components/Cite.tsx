'use client';
// Source numbers, the source sheet and the footnote list: the "every number is sourced" pattern.
//   const n = numberSources(['gridee-downloads', 'glassbox-eval-v4']);   // page order → 1, 2
//   <Cite id="glassbox-eval-v4" n={n} />                                    // inline marker, opens the sheet
//   <Footnotes ids={Object.keys(n)} />                                      // the list at the bottom of the page
// The sheet is vaul's Drawer (npm i vaul): a bottom sheet with focus trap, Esc to close and drag to dismiss.
import { Drawer } from 'vaul';
import { ArrowUpRight, CircleCheck, X } from 'lucide-react';
import { sourceById } from '../content/sources';

const isPlaceholder = (s?: string) => !s || /^\[.*\]$/.test(s);

function formatChecked(iso: string) {
  const d = new Date(iso + 'T00:00:00Z');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

/** Numbers sources in the order a page first cites them. */
export function numberSources(ids: string[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const id of ids) if (!(id in out)) out[id] = Object.keys(out).length + 1;
  return out;
}

export function Cite({ id, n }: { id: string; n: Record<string, number> }) {
  const source = sourceById[id];
  const number = n[id];
  if (!source || !number) throw new Error(`Cite: unknown or unnumbered source "${id}"`);
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button
          type="button"
          aria-label={`Source ${number}: ${source.title}`}
          className="mx-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-cite-wash px-1.5 align-[2px] text-xs leading-none font-semibold tracking-normal text-cite"
        >
          {number}
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/25" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-xl rounded-t-[26px] bg-card px-6 pt-2.5 pb-8 text-label outline-none elev-floating">
          <Drawer.Handle className="mx-auto mb-4 h-[5px] w-10 rounded-full bg-label3/40" />
          <div className="flex items-center justify-between gap-3">
            {source.checked && !isPlaceholder(source.checked) ? (
              <span className="inline-flex h-[26px] items-center gap-1.5 rounded-full bg-ok-wash px-2.5 text-xs font-semibold text-ok">
                <CircleCheck size={13} strokeWidth={2.2} aria-hidden />
                Source {number} · checked {formatChecked(source.checked)}
              </span>
            ) : (
              <span className="inline-flex h-[26px] items-center rounded-full bg-fill2 px-2.5 text-xs font-semibold text-label2">Source {number}</span>
            )}
            <Drawer.Close aria-label="Close" className="flex size-8 items-center justify-center rounded-full bg-fill2 text-label2">
              <X size={16} strokeWidth={2.4} aria-hidden />
            </Drawer.Close>
          </div>
          <Drawer.Title className="mt-3.5 text-[21px] font-semibold tracking-normal">{source.title}</Drawer.Title>
          <Drawer.Description className="mt-1.5 text-callout text-label2">{source.detail}</Drawer.Description>
          <p className="mt-2 text-footnote text-label2">{source.where}</p>
          {!isPlaceholder(source.url) && (
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex h-10 items-center gap-1.5 rounded-full bg-accent px-4 text-[15px] font-semibold text-on-accent"
            >
              Open source
              <ArrowUpRight size={15} strokeWidth={2.2} aria-hidden />
            </a>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

/** Apple-style footnotes at the bottom of a page. */
export function Footnotes({ ids }: { ids: string[] }) {
  return (
    <ol className="m-0 flex list-none flex-col gap-2.5 border-t border-sep p-0 pt-6 text-caption text-label2">
      {ids.map((id, i) => {
        const s = sourceById[id];
        if (!s) return null;
        return (
          <li key={id} id={`fn-${i + 1}`} className="flex gap-2">
            <span className="min-w-3.5 font-semibold">{i + 1}.</span>
            <span>
              {s.title}: {s.detail} {s.where}.
            </span>
          </li>
        );
      })}
    </ol>
  );
}
