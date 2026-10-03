// Events that connect islands (each Astro island is its own React root).

/** Open the source sheet for a source: `openSource({ id, n, trigger })`. */
export const SOURCE_EVENT = 'glass:source';
/** Open the ⌘K command bar. */
export const COMMAND_EVENT = 'glass:command';

export interface SourceRequest {
  id: string;
  /** The number the marker showed (sheets say "Source 2"). */
  n?: number;
  /** Where focus returns when the sheet closes. */
  trigger?: HTMLElement | null;
}

export function openSource(req: SourceRequest): void {
  window.dispatchEvent(new CustomEvent<SourceRequest>(SOURCE_EVENT, { detail: req }));
}

export function openCommandBar(): void {
  window.dispatchEvent(new CustomEvent(COMMAND_EVENT));
}

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
