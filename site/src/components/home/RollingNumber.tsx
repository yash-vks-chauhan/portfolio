// A widget number that rolls once (React Bits Counter) when it first comes into view.
// The server renders the final number. When motion is allowed, the head script marks <html class="motion-ok"> and CSS
// hides that static number until this island swaps in the Counter, which rolls up from zero. Under reduced motion,
// Save-Data or without JavaScript, the static final number is all there is.
import { useEffect, useRef, useState } from 'react';
import Counter from '../bits/Counter';

export default function RollingNumber({ value, fontSize = 46, phoneFontSize = 34 }: { value: number; fontSize?: number; phoneFontSize?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [mode, setMode] = useState<'static' | 'counter'>('static');
  const [shown, setShown] = useState(0);
  const [size, setSize] = useState(fontSize);

  useEffect(() => {
    if (!document.documentElement.classList.contains('motion-ok')) return;
    const mq = window.matchMedia('(max-width: 47.99rem)');
    setSize(mq.matches ? phoneFontSize : fontSize);
    setMode('counter');
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(value);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, fontSize, phoneFontSize]);

  return (
    <span ref={ref} className="inline-flex">
      {mode === 'static' ? (
        <span className="roll-static">{value}</span>
      ) : (
        <Counter
          value={shown}
          places={[...String(value)].map((_, i, a) => 10 ** (a.length - i - 1))}
          fontSize={size}
          padding={0}
          gap={0}
          horizontalPadding={0}
          borderRadius={0}
          gradientHeight={0}
          gradientFrom="transparent"
          gradientTo="transparent"
          textColor="inherit"
          fontWeight="inherit"
          counterStyle={{ fontFamily: 'inherit', letterSpacing: 'inherit' }}
          spring={{ stiffness: 300, damping: 30 }}
        />
      )}
    </span>
  );
}
