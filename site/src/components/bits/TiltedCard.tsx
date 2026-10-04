/*
 * TiltedCard, from React Bits (https://reactbits.dev · github.com/DavidHDev/react-bits @ ca44b3f, TS + Tailwind variant).
 * Copyright (c) 2026 David Haz. MIT + Commons Clause: used inside this site only; the component itself is not
 * sold or redistributed. Full licence: ./LICENSE-react-bits.md. Site changes, if any, are noted below.
 *
 * Site changes: `children` replace the built-in <img> (so Astro can pass an optimised <picture>); the tilt is off
 * under reduced motion and on devices without hover; `className` styles the moving layer.
 * Motion's slim `m` component draws it, with only the DOM renderer loaded (LazyMotion + domMin).
 */

import type { SpringOptions } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { LazyMotion, domMin, m, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

interface TiltedCardProps {
  children?: ReactNode;
  className?: string;
  imageSrc?: React.ComponentProps<'img'>['src'];
  altText?: string;
  captionText?: string;
  containerHeight?: React.CSSProperties['height'];
  containerWidth?: React.CSSProperties['width'];
  imageHeight?: React.CSSProperties['height'];
  imageWidth?: React.CSSProperties['width'];
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
}

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

export default function TiltedCard({
  children,
  className = '',
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1
  });

  const [lastY, setLastY] = useState(0);
  const reduced = useReducedMotion();
  const [canHover, setCanHover] = useState(false);
  useEffect(() => setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches), []);
  const active = canHover && !reduced;

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current || !active) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    if (!active) return;
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <LazyMotion features={domMin}>
      <figure
        ref={ref}
        className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
        style={{
          height: containerHeight,
          width: containerWidth
        }}
        onMouseMove={handleMouse}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showMobileWarning && (
          <div className="absolute top-4 text-center text-sm block sm:hidden">
            This effect is not optimized for mobile. Check on desktop.
          </div>
        )}

        <m.div
          className={`relative [transform-style:preserve-3d] ${className}`}
          style={{
            width: imageWidth,
            height: imageHeight,
            rotateX,
            rotateY,
            scale
          }}
        >
          {children ?? (
            <m.img
              src={imageSrc}
              alt={altText}
              className="absolute top-0 left-0 object-cover rounded-[15px] will-change-transform [transform:translateZ(0)]"
              style={{
                width: imageWidth,
                height: imageHeight
              }}
            />
          )}

          {displayOverlayContent && overlayContent && (
            <m.div className="absolute top-0 left-0 z-[2] will-change-transform [transform:translateZ(30px)]">
              {overlayContent}
            </m.div>
          )}
        </m.div>

        {showTooltip && (
          <m.figcaption
            className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
            style={{
              x,
              y,
              opacity,
              rotate: rotateFigcaption
            }}
          >
            {captionText}
          </m.figcaption>
        )}
      </figure>
    </LazyMotion>
  );
}
