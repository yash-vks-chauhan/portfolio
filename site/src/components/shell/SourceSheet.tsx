// The source sheet: one vaul Drawer for the whole page. The Shell island opens it for any element with
// data-cite="<source id>" (number markers, widgets, citation chips) or openSource(), and loads this module on first use.
// Markers are links to the page's footnote, so without JavaScript they still lead to the source.
// vaul (Radix Dialog underneath) traps focus and closes on Esc; focus goes back to the marker.
import { Drawer } from 'vaul';
import { ArrowUpRight, CircleCheck, X } from 'lucide-react';
import { sourceById } from '../../content/sources';
import { formatChecked } from '../../lib/citations';
import type { SourceRequest } from '../../lib/events';

const isPlaceholder = (s?: string) => !s || /\[[^\]]+\]/.test(s);

export default function SourceSheet({ req, open, onOpenChange }: { req: SourceRequest | null; open: boolean; onOpenChange: (open: boolean) => void }) {
  const setOpen = onOpenChange;
  const source = req ? sourceById[req.id] : null;
  const checked = source && !isPlaceholder(source.checked) ? formatChecked(source.checked) : null;
  const label = req?.n ? `Source ${req.n}` : 'Source';

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} autoFocus>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[60] bg-black/25" />
        <Drawer.Content
          className="fixed inset-x-0 bottom-0 z-[60] mx-auto max-w-xl rounded-t-[26px] bg-card px-6 pt-2.5 pb-8 text-label outline-none elev-floating max-md:pb-[calc(32px+env(safe-area-inset-bottom))]"
          onCloseAutoFocus={(e) => {
            if (req?.trigger?.isConnected) {
              e.preventDefault();
              req.trigger.focus({ preventScroll: true });
            }
          }}
        >
          <Drawer.Handle className="mx-auto mb-4 h-[5px]! w-10! rounded-full bg-label3! opacity-40!" />
          {source && (
            <>
              <div className="flex items-center justify-between gap-3">
                {checked ? (
                  <span className="inline-flex h-[26px] items-center gap-1.5 rounded-full bg-ok-wash px-2.5 text-xs font-semibold tracking-normal text-ok">
                    <CircleCheck size={13} strokeWidth={2.2} aria-hidden="true" />
                    {label} · checked {checked}
                  </span>
                ) : (
                  <span className="inline-flex h-[26px] items-center rounded-full bg-fill2 px-2.5 text-xs font-semibold tracking-normal text-label2">
                    {label}
                  </span>
                )}
                <Drawer.Close aria-label="Close" className="flex size-8 items-center justify-center rounded-full bg-fill2 text-label2">
                  <X size={16} strokeWidth={2.4} aria-hidden="true" />
                </Drawer.Close>
              </div>
              <Drawer.Title className="mt-3.5 text-[21px] font-semibold tracking-normal">{source.title}</Drawer.Title>
              <Drawer.Description className="mt-1.5 text-[15px] leading-[1.45] tracking-[-0.012em] text-label2">{source.detail}</Drawer.Description>
              <p className="mt-2 mb-0 text-[13px] tracking-[-0.006em] text-label2">{source.where}</p>
              {!isPlaceholder(source.url) && (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="pill mt-4 inline-flex h-10 items-center gap-1.5 rounded-full bg-accent px-4 text-[15px] font-semibold tracking-[-0.012em] text-on-accent"
                >
                  {source.linkLabel ?? 'Open source'}
                  <ArrowUpRight size={15} strokeWidth={2.2} aria-hidden="true" />
                </a>
              )}
            </>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
