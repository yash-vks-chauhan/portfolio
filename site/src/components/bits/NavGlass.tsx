/*
 * NavGlass: GlassSurface's liquid-glass refraction, from React Bits (https://reactbits.dev · github.com/DavidHDev/react-bits
 * @ ca44b3f, TS + Tailwind variant). Copyright (c) 2026 David Haz. MIT + Commons Clause: used inside this site only; the
 * component itself is not sold or redistributed. Full licence: ./LICENSE-react-bits.md.
 *
 * Site changes: instead of wrapping children in its own container, this version enhances an element that is already on
 * the page (the nav capsule, rendered as static HTML) by id. It keeps GlassSurface's displacement map and SVG filter graph
 * verbatim and adds them to the element's existing frost, so the CSS `glass-thin` look stays the base everywhere and
 * Chromium gets the refracted edge on top. Safari and Firefox are skipped, exactly as GlassSurface skips them.
 */
import { useEffect, useId, useRef } from 'react';

export interface NavGlassProps {
  /** id of the element to enhance. */
  target: string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: 'R' | 'G' | 'B';
  yChannel?: 'R' | 'G' | 'B';
  mixBlendMode?: string;
  /** The frost the element already has (glass-thin), kept in front of the refraction. */
  frost?: string;
}

function supportsSVGFilters(filterId: string) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  const isFirefox = /Firefox/.test(navigator.userAgent);
  if (isWebkit || isFirefox) return false;
  const div = document.createElement('div');
  div.style.backdropFilter = `url(#${filterId})`;
  return div.style.backdropFilter !== '';
}

export default function NavGlass({
  target,
  borderRadius = 28,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0.5,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = 'R',
  yChannel = 'G',
  mixBlendMode = 'difference',
  frost = 'blur(24px) saturate(180%)',
}: NavGlassProps) {
  const uniqueId = useId().replace(/:/g, '-');
  const filterId = `glass-filter-${uniqueId}`;
  const redGradId = `red-grad-${uniqueId}`;
  const blueGradId = `blue-grad-${uniqueId}`;
  const feImageRef = useRef<SVGFEImageElement>(null);
  const channelRefs = [useRef<SVGFEDisplacementMapElement>(null), useRef<SVGFEDisplacementMapElement>(null), useRef<SVGFEDisplacementMapElement>(null)];
  const gaussianBlurRef = useRef<SVGFEGaussianBlurElement>(null);

  useEffect(() => {
    const el = document.getElementById(target);
    if (!el || !supportsSVGFilters(filterId)) return;
    if (window.matchMedia('(prefers-reduced-transparency: reduce)').matches) return;

    const generateDisplacementMap = () => {
      const rect = el.getBoundingClientRect();
      const actualWidth = rect.width || 400;
      const actualHeight = rect.height || 200;
      const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);
      const svgContent = `
        <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stop-color="#0000"/>
              <stop offset="100%" stop-color="red"/>
            </linearGradient>
            <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0000"/>
              <stop offset="100%" stop-color="blue"/>
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
          <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})" />
          <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
          <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)" />
        </svg>
      `;
      return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
    };

    const update = () => feImageRef.current?.setAttribute('href', generateDisplacementMap());
    [redOffset, greenOffset, blueOffset].forEach((offset, i) => {
      const ch = channelRefs[i].current;
      if (!ch) return;
      ch.setAttribute('scale', String(distortionScale + offset));
      ch.setAttribute('xChannelSelector', xChannel);
      ch.setAttribute('yChannelSelector', yChannel);
    });
    gaussianBlurRef.current?.setAttribute('stdDeviation', String(displace));
    update();

    const previous = el.style.backdropFilter;
    el.style.backdropFilter = `${frost} url(#${filterId})`;
    el.dataset.liquid = '';
    const ro = new ResizeObserver(() => setTimeout(update, 0));
    ro.observe(el);
    return () => {
      ro.disconnect();
      el.style.backdropFilter = previous;
      delete el.dataset.liquid;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return (
    <svg aria-hidden="true" focusable="false" className="pointer-events-none absolute size-0 opacity-0" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
          <feImage ref={feImageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />
          <feDisplacementMap ref={channelRefs[0]} in="SourceGraphic" in2="map" result="dispRed" />
          <feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
          <feDisplacementMap ref={channelRefs[1]} in="SourceGraphic" in2="map" result="dispGreen" />
          <feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
          <feDisplacementMap ref={channelRefs[2]} in="SourceGraphic" in2="map" result="dispBlue" />
          <feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
          <feBlend in="red" in2="green" mode="screen" result="rg" />
          <feBlend in="rg" in2="blue" mode="screen" result="output" />
          <feGaussianBlur ref={gaussianBlurRef} in="output" stdDeviation="0.7" />
        </filter>
      </defs>
    </svg>
  );
}
