// The hero's one live moment: React Bits Iridescence (light) or Soft Aurora (dark). From design/starter.
// - The still frame (a CSS background chosen by the theme, see Hero.astro) shows first, so nothing flashes and nothing
//   moves under reduced motion or Save-Data, where WebGL never loads.
// - The WebGL component loads lazily once the hero is near the viewport, fades in over the still after its first
//   frame, pauses when the hero is off-screen or the tab is hidden, and renders at 1x pixel density (cap: 1.5).
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { watchTheme, type Theme } from '../../lib/theme';

const Iridescence = lazy(() => import('../bits/Iridescence'));
const SoftAurora = lazy(() => import('../bits/SoftAurora'));

function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

const BLEED = 'calc(var(--hero-bleed, 40px) * -1)';
// Fitted to the still (design/assets/backgrounds/hero-iridescence.jpg): its channels are the shader's output scaled
// by about 0.5 / 0.6 / 0.8. A module constant, because a new array each render would rebuild the WebGL context.
const IRIDESCENCE_COLOR: [number, number, number] = [0.5, 0.6, 0.8];

export default function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<Theme | null>(null);
  const [allowed, setAllowed] = useState(false);
  const [near, setNear] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const [ready, setReady] = useState<Theme | null>(null);

  useEffect(() => watchTheme(setTheme), []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
    const gl = webglAvailable();
    const update = () => setAllowed(!mq.matches && !saveData && gl);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nearIO = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '200px' });
    const screenIO = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting));
    nearIO.observe(el);
    screenIO.observe(el);
    const onVis = () => setTabVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVis);
    return () => {
      nearIO.disconnect();
      screenIO.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  const live = allowed && near && theme !== null;
  const paused = !onScreen || !tabVisible;

  return (
    <div ref={ref} aria-hidden="true" className="absolute inset-0">
      <div className="hero-still absolute" style={{ inset: BLEED }} />
      {live && (
        <Suspense fallback={null}>
          <div
            className="absolute transition-opacity duration-700 ease-out"
            style={{ inset: BLEED, opacity: ready === theme ? 1 : 0 }}
          >
            {theme === 'dark' ? (
              <SoftAurora key="dark" speed={0.4} enableMouseInteraction={false} paused={paused} onReady={() => setReady('dark')} />
            ) : (
              <Iridescence key="light" color={IRIDESCENCE_COLOR} speed={0.5} amplitude={0.1} mouseReact={false} paused={paused} onReady={() => setReady('light')} />
            )}
          </div>
        </Suspense>
      )}
      {/* The veil fades the background into the page so text and widgets stay readable. */}
      <div className="absolute inset-0" style={{ background: 'var(--veil)' }} />
    </div>
  );
}
