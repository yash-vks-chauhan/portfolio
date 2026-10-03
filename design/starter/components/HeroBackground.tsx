'use client';
// The hero's one live moment: React Bits Iridescence (light) or Soft Aurora (dark).
// - Shows the still frame first (design/assets/backgrounds), so there's no blank flash and nothing moves under reduced motion.
// - Loads the WebGL component only when the hero is near the viewport, and unmounts it when it leaves.
// - Skips WebGL entirely for reduced motion or Save-Data.
// Install the components first:
//   npx shadcn@latest add @react-bits/Iridescence-TS-TW @react-bits/SoftAurora-TS-TW
// then fix the two import paths below to wherever the CLI put them.
import { lazy, Suspense, useEffect, useRef, useState } from 'react';

const Iridescence = lazy(() => import('@/components/Iridescence/Iridescence'));
const SoftAurora = lazy(() => import('@/components/SoftAurora/SoftAurora'));

const STILLS = {
  light: '/images/hero-iridescence.jpg',
  dark: '/images/hero-aurora.jpg',
} as const;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(true); // assume reduced until we know, so nothing animates on the server
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

function useNearViewport<T extends Element>(rootMargin = '200px') {
  const ref = useRef<T | null>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return [ref, near] as const;
}

export function HeroBackground({ theme }: { theme: 'light' | 'dark' }) {
  const reduced = usePrefersReducedMotion();
  const [ref, near] = useNearViewport<HTMLDivElement>();
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    setSaveData(Boolean(connection?.saveData));
  }, []);

  const live = near && !reduced && !saveData;

  return (
    <div ref={ref} aria-hidden className="absolute -inset-10 overflow-hidden">
      <img src={STILLS[theme]} alt="" className="absolute inset-0 size-full object-cover" decoding="async" />
      {live && (
        <Suspense fallback={null}>
          <div className="absolute inset-0">
            {theme === 'dark' ? (
              <SoftAurora speed={0.4} enableMouseInteraction={false} />
            ) : (
              <Iridescence speed={0.5} amplitude={0.1} mouseReact={false} />
            )}
          </div>
        </Suspense>
      )}
      {/* The veil fades the background into the page so text and widgets stay readable. */}
      <div className="absolute inset-0" style={{ background: 'var(--veil)' }} />
    </div>
  );
}
