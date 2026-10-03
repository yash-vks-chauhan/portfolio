/*
 * BlurText, from React Bits (https://reactbits.dev · github.com/DavidHDev/react-bits @ ca44b3f, TS + Tailwind variant).
 * Copyright (c) 2026 David Haz. MIT + Commons Clause: used inside this site only; the component itself is not
 * sold or redistributed. Full licence: ./LICENSE-react-bits.md. Site changes, if any, are noted below.
 *
 * Site changes: renders as any heading (`as`), so the hero's <h1> is the animated element itself, with the full
 * sentence as its accessible name; `breakAfter` adds line breaks on wide screens (`breakClassName` decides where);
 * the wrapper gets data-hydrated once React runs, so site.css can reveal the words if JavaScript never arrives.
 */

import { motion, type Transition, type Easing } from 'motion/react';
import { createElement, useEffect, useRef, useState, useMemo } from 'react';

type BlurTextProps = {
  as?: 'p' | 'h1' | 'h2' | 'span';
  /** Word indices after which the line breaks (on screens where breakClassName shows the break). */
  breakAfter?: number[];
  breakClassName?: string;
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: Easing | Easing[];
  onAnimationComplete?: () => void;
  stepDuration?: number;
};

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);

  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

const BlurText: React.FC<BlurTextProps> = ({
  as = 'p',
  breakAfter = [],
  breakClassName = '',
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  return createElement(
    as,
    {
      ref,
      className: `blur-text ${className} flex flex-wrap`,
      'aria-label': text,
      'data-hydrated': hydrated ? '' : undefined
    },
    elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition: Transition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing
        };

        const word = (
          <motion.span
            key={index}
            className="blur-word"
            aria-hidden="true"
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
            style={{
              display: 'inline-block',
              willChange: 'transform, filter, opacity'
            }}
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && !breakAfter.includes(index) && '\u00A0'}
          </motion.span>
        );
        return breakAfter.includes(index)
          ? [word, <span key={`br-${index}`} aria-hidden="true" className={`blur-break ${breakClassName}`} />]
          : word;
      })
  );
};

export default BlurText;
