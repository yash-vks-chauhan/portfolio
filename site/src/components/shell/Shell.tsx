// The page's global controls in one small island: it listens for ⌘K / Ctrl+K and [data-command] (the command bar),
// [data-cite] and openSource() (the source sheet), and [data-copy-email] / [data-copy-text] / [data-share] and
// requestCopy() (copy or share, then a toast). Each of those modules (cmdk, vaul, sonner) loads on first use, so
// they stay out of the first page load.
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { COMMAND_EVENT, COPY_EVENT, SOURCE_EVENT, type CopyRequest, type SourceRequest } from '../../lib/events';
import type { ToastAction } from './Toasts';

const CommandBar = lazy(() => import('./CommandBar'));
const SourceSheet = lazy(() => import('./SourceSheet'));
const Toasts = lazy(() => import('./Toasts'));

export default function Shell() {
  const [commandUsed, setCommandUsed] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [source, setSource] = useState<{ req: SourceRequest | null; open: boolean }>({ req: null, open: false });
  const [actions, setActions] = useState<ToastAction[]>([]);
  const [toastsUsed, setToastsUsed] = useState(false);
  const nextId = useRef(1);
  const commandOpenRef = useRef(false);
  commandOpenRef.current = commandOpen;

  const queue = useCallback((req: CopyRequest) => {
    setToastsUsed(true);
    setActions((all) => [...all, { ...req, id: nextId.current++ }]);
  }, []);
  const done = useCallback((id: number) => setActions((all) => all.filter((a) => a.id !== id)), []);

  useEffect(() => {
    const showCommand = () => {
      setCommandUsed(true);
      setToastsUsed(true); // its "Copy email" action ends in a toast
      setCommandOpen(true);
    };
    const showSource = (req: SourceRequest) => setSource({ req: { ...req, trigger: req.trigger ?? (document.activeElement as HTMLElement | null) }, open: true });

    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (commandOpenRef.current) setCommandOpen(false);
        else showCommand();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      const el = (e.target as Element | null)?.closest<HTMLElement>('[data-cite], [data-command], [data-copy-email], [data-copy-text], [data-share]');
      // A modified click on a link (a source marker's #fn-N, say) keeps the browser's meaning: a new tab or window.
      if (!el || (el instanceof HTMLAnchorElement && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey))) return;
      e.preventDefault();
      if (el.dataset.cite !== undefined) showSource({ id: el.dataset.cite, n: el.dataset.n ? Number(el.dataset.n) : undefined, trigger: el });
      else if (el.hasAttribute('data-command')) showCommand();
      else if (el.hasAttribute('data-copy-email')) queue({ kind: 'email' });
      else if (el.dataset.copyText) queue({ kind: 'text', text: el.dataset.copyText, message: el.dataset.copyMessage ?? 'Copied' });
      else queue({ kind: 'share' });
    };
    const onSource = (e: Event) => showSource((e as CustomEvent<SourceRequest>).detail);
    const onCommand = () => showCommand();
    const onCopy = (e: Event) => queue((e as CustomEvent<CopyRequest>).detail);

    window.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    window.addEventListener(SOURCE_EVENT, onSource);
    window.addEventListener(COMMAND_EVENT, onCommand);
    window.addEventListener(COPY_EVENT, onCopy);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
      window.removeEventListener(SOURCE_EVENT, onSource);
      window.removeEventListener(COMMAND_EVENT, onCommand);
      window.removeEventListener(COPY_EVENT, onCopy);
    };
  }, [queue]);

  return (
    <Suspense fallback={null}>
      {commandUsed && <CommandBar open={commandOpen} onOpenChange={setCommandOpen} />}
      {source.req && <SourceSheet req={source.req} open={source.open} onOpenChange={(open) => setSource((s) => ({ ...s, open }))} />}
      {toastsUsed && <Toasts actions={actions} onDone={done} />}
    </Suspense>
  );
}
