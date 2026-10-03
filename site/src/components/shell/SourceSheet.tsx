// The source sheet: one vaul Drawer for the whole page. Any element with data-cite="<source id>" opens it
// (number markers, widgets, citation chips), and so does openSource() from inside other islands.
// Markers are links to the page's footnote, so without JavaScript they still lead to the source.
// vaul (Radix Dialog underneath) traps focus and closes on Esc; focus goes back to the marker.
import { useCallback, useEffect, useRef, useState } from 'react';
import { Drawer } from 'vaul';
import { ArrowUpRight, CircleCheck, X } from 'lucide-react';
import { sourceById } from '../../content/sources';
import { formatChecked } from '../../lib/citations';
import { SOURCE_EVENT, type SourceRequest } from '../../lib/events';

const isPlaceholder = (s?: string) => !s || /\[[^\]]+\]/.test(s);

export default function SourceSheet() {
  const [open, setOpen] = useState(false);
  const [req, setReq] = useState<SourceRequest | null>(null);
  const trigger = useRef<HTMLElement | null>(null);

  const show = useCallback((r: SourceRequest) => {
    if (!sourceById[r.id]) return;
    trigger.current = r.trigger ?? (document.activeElement as HTMLElement | null);
    setReq(r);
    setOpen(true);
  }, []);

  useEffect(() => {
    const onEvent = (e: Event) => show((e as CustomEvent<SourceRequest>).detail);
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const el = (e.target as Element | null)?.closest<HTMLElement>('[data-cite]');
      if (!el) return;
      const id = el.dataset.cite;
      if (!id || !sourceById[id]) return;
      e.preventDefault();
      show({ id, n: el.dataset.n ? Number(el.dataset.n) : undefined, trigger: el });
    };
    window.addEventListener(SOURCE_EVENT, onEvent);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener(SOURCE_EVENT, onEvent);
      document.removeEventListener('click', onClick);
    };
  }, [show]);

  const source = req ? sourceById[req.id] : null;
  const checked = source && !isPlaceholder(source.checked) ? formatChecked(source.checked) : null;
  const label = req?.n ? `Source ${req.n}` : 'Source';

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[60] bg-black/25" />
        <Drawer.Content
          className="fixed inset-x-0 bottom-0 z-[60] mx-auto max-w-xl rounded-t-[26px] bg-card px-6 pt-2.5 pb-8 text-label outline-none elev-floating max-md:pb-[calc(32px+env(safe-area-inset-bottom))]"
          onCloseAutoFocus={(e) => {
            if (trigger.current?.isConnected) {
              e.preventDefault();
              trigger.current.focus({ preventScroll: true });
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
