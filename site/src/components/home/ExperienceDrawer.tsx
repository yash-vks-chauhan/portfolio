// The phone sheet for an Experience row (vaul). ExperienceSection loads it on the first tap, so desktop visitors
// never download vaul. Focus moves into it (vaul's autoFocus) and stays there until it closes; it keeps showing the
// last row while it slides away, and focus goes back to the row.
import { useState, type RefObject } from 'react';
import { Drawer } from 'vaul';
import { X } from 'lucide-react';
import { Detail, type DetailItem } from './ExperienceSection';

export default function ExperienceDrawer({ item, onClose, trigger }: { item: DetailItem | null; onClose: () => void; trigger: RefObject<HTMLElement | null> }) {
  const [shown, setShown] = useState(item);
  if (item && item !== shown) setShown(item);
  return (
    <Drawer.Root open={item !== null} onOpenChange={(o) => !o && onClose()} autoFocus>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[55] bg-black/25" />
        <Drawer.Content
          aria-describedby={undefined}
          className="exp-drawer fixed inset-x-0 bottom-0 z-[55] mx-auto max-w-xl rounded-t-[26px] bg-card px-5 pt-2.5 pb-[calc(28px+env(safe-area-inset-bottom))] text-label outline-none elev-floating"
          onCloseAutoFocus={(e) => {
            if (trigger.current?.isConnected) {
              e.preventDefault();
              trigger.current.focus({ preventScroll: true });
            }
          }}
        >
          <div className="flex items-center justify-between">
            <span className="w-8" />
            <Drawer.Handle className="h-[5px]! w-10! rounded-full bg-label3! opacity-40!" />
            <Drawer.Close aria-label="Close" className="flex size-8 items-center justify-center rounded-full bg-fill2 text-label2">
              <X size={16} strokeWidth={2.4} aria-hidden="true" />
            </Drawer.Close>
          </div>
          <div className="mt-2">{shown && <Detail item={shown} Title={Drawer.Title} />}</div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
