// sonner's toaster, bottom centre (above the tab bar on phones). Toasts are GlassToast pills (lib/copy.ts).
import { Toaster as Sonner } from 'sonner';

export default function Toaster() {
  return <Sonner position="bottom-center" offset={20} mobileOffset={{ bottom: 104 }} toastOptions={{ unstyled: true }} />;
}
