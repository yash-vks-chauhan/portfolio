// The "Preview" carousel (Embla): 560 px slides with a caption each, previous and next buttons; 300 px slides and
// no buttons on phones, as drawn. Without JavaScript the strip scrolls natively (with snap points); under reduced
// motion the buttons jump instead of gliding.
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { prefersReducedMotion } from '../../lib/events';

export interface SlideProp {
  src: string;
  srcset: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  caption: string;
  captionPhone?: string;
}

export default function PreviewCarousel({ slides, variant = 'landscape', id = 'preview-h' }: { slides: SlideProp[]; variant?: 'landscape' | 'portrait'; id?: string }) {
  const [viewportRef, embla] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps', skipSnaps: false });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(slides.length > 1);
  const [ready, setReady] = useState(false);

  const update = useCallback(() => {
    if (!embla) return;
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    setReady(true);
    update();
    embla.on('select', update).on('reInit', update);
    return () => {
      embla.off('select', update).off('reInit', update);
    };
  }, [embla, update]);

  return (
    <>
      <div className="preview-head">
        <h2 id={id} className="case-h2-lg">
          Preview
        </h2>
        <div className="preview-buttons max-md:hidden">
          <button type="button" aria-label="Previous screenshot" disabled={!canPrev} onClick={() => embla?.scrollPrev(prefersReducedMotion())} className="preview-button">
            <ChevronLeft size={20} strokeWidth={2.2} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Next screenshot" disabled={!canNext} onClick={() => embla?.scrollNext(prefersReducedMotion())} className="preview-button">
            <ChevronRight size={20} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div ref={viewportRef} className={`preview-viewport snap ${ready ? 'is-ready' : ''}`}>
        <div className={`preview-track preview-${variant}`}>
          {slides.map((s) => (
            <figure key={s.src} className="preview-slide">
              <img src={s.src} srcSet={s.srcset} sizes={variant === 'portrait' ? '(max-width: 767px) 220px, 280px' : '(max-width: 767px) 300px, 560px'} width={s.width} height={s.height} alt={s.alt} loading="lazy" decoding="async" className="preview-img" style={{ aspectRatio: `${s.width} / ${s.height}` }} draggable={false} />
              <figcaption className="preview-caption">
                <strong>{s.title}</strong>{' '}
                {s.captionPhone ? (
                  <>
                    <span className="max-md:hidden">{s.caption}</span>
                    <span className="md:hidden">{s.captionPhone}</span>
                  </>
                ) : (
                  s.caption
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </>
  );
}
