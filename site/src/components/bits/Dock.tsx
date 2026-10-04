/*
 * Dock, from React Bits (https://reactbits.dev · github.com/DavidHDev/react-bits @ ca44b3f, TS + Tailwind variant).
 * Copyright (c) 2026 David Haz. MIT + Commons Clause: used inside this site only; the component itself is not
 * sold or redistributed. Full licence: ./LICENSE-react-bits.md. Site changes, if any, are noted below.
 *
 * Site changes: items are real links (`href`) instead of `role="button"` divs; the dock sits in the page under the
 * contact card instead of fixed to the viewport, so the panel keeps its height and a magnified icon rises out of it
 * (nothing below moves); sizes, radius (12/54 of the size), gaps and the glass panel are the design's; the label
 * shows above an icon on hover or keyboard focus, faded in by CSS (site.css .dock-label) rather than AnimatePresence.
 * Without a fine pointer, or under reduced motion, there is no magnification: a plain row. Distances use clientX
 * (the original mixed pageX with viewport rects). The spring is the design's (stiffness 300, damping 30), and
 * Motion's slim `m` component draws the icons, with only the DOM renderer loaded (LazyMotion + domMin).
 */

import {
  LazyMotion,
  domMin,
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
  type SpringOptions
} from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

export type DockItemData = {
  icon: ReactNode;
  label: string;
  href: string;
  /** The icon tile's background. */
  background: string;
  /** Opens in a new tab. */
  external?: boolean;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  /** The landmark's name. */
  label?: string;
  distance?: number;
  baseItemSize?: number;
  magnification?: number;
  spring?: SpringOptions;
};

type DockItemProps = {
  item: DockItemData;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
  magnify: boolean;
};

function DockItem({ item, mouseX, spring, distance, magnification, baseItemSize, magnify }: DockItemProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [showLabel, setShowLabel] = useState(false);

  const mouseDistance = useTransform(mouseX, val => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize };
    return val - rect.x - rect.width / 2;
  });
  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);
  const radius = useTransform(size, s => (s * 12) / 54);

  return (
    <m.a
      ref={ref}
      href={item.href}
      aria-label={item.label}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noreferrer' : undefined}
      className="dock-item"
      style={{
        width: magnify ? size : baseItemSize,
        height: magnify ? size : baseItemSize,
        borderRadius: magnify ? radius : (baseItemSize * 12) / 54,
        background: item.background
      }}
      onPointerEnter={e => e.pointerType !== 'touch' && setShowLabel(true)}
      onPointerLeave={() => setShowLabel(false)}
      onFocus={() => setShowLabel(true)}
      onBlur={() => setShowLabel(false)}
    >
      <span className="flex items-center justify-center" aria-hidden="true">
        {item.icon}
      </span>
      <span className="dock-label" data-show={showLabel ? '' : undefined} aria-hidden="true">
        {item.label}
      </span>
    </m.a>
  );
}

export default function Dock({
  items,
  className = '',
  label = 'Elsewhere',
  spring = { stiffness: 300, damping: 30 },
  magnification = 70,
  distance = 200,
  baseItemSize = 54
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const reduced = useReducedMotion() ?? false;
  const [finePointer, setFinePointer] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  const magnify = finePointer && !reduced;

  return (
    <LazyMotion features={domMin}>
      <nav
        aria-label={label}
        className={`dock-panel ${className}`}
        onMouseMove={e => {
          if (magnify) mouseX.set(e.clientX);
        }}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {items.map(item => (
          <DockItem
            key={item.label}
            item={item}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
            magnify={magnify}
          />
        ))}
      </nav>
    </LazyMotion>
  );
}
