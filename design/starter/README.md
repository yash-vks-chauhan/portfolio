# Starter

Pieces to copy into the app so the build starts from real content and working behaviour. Framework-agnostic: React 18/19 with Tailwind CSS v4 and the classes from `../tokens/tailwind.css`.

```
content/   site.ts · sources.ts · projects.ts · experience.ts · toolkit.ts · answers.ts · types.ts
lib/       ask.ts (Ask v1 matcher) · wilson.ts (95% intervals) · time.ts (Chennai clock)
components/ HeroBackground · LiveChip · AskPanel · Cite (+ Footnotes, numberSources) · InsetList · StatusChip · AppIcon
theme/     theme-init.js (inline in <head>) · ThemeSwitch.tsx
styles/    effects.css (Ask rainbow ring, live dot, GlassIcons hover)
```

## What each piece does

- **content/**: every fact and string the pages use, taken from the repo README's deep-dives and claims audit. `[brackets]` are placeholders; each project's `todo` lists the facts to confirm. Nothing here is rendered without a source.
- **lib/ask.ts**: "Ask my portfolio" v1. It scores the visitor's words against each answer's keywords and refuses when nothing matches well, so it can't make anything up. No dependencies.
- **lib/wilson.ts**: Wilson score intervals. `formatInterval(wilson(183, 183))` gives `"97.9–100%"`.
- **components/HeroBackground.tsx**: the still frame first, then React Bits Iridescence (light) or Soft Aurora (dark) once the hero is near the viewport; none of it under reduced motion or Save-Data.
- **components/Cite.tsx**: the numbered source chip that opens a vaul bottom sheet, plus the footnote list.
- **components/AskPanel.tsx**: the Ask panel with suggestions, a streamed cited answer, or the refusal state.
- **components/LiveChip.tsx**: "Open to 2027 roles · Chennai 9:04 PM", ticking on the minute.
- **theme/**: no-flash theme script and the sun/moon switch.

Needs `lucide-react` and `vaul`; `HeroBackground` also needs the React Bits Iridescence and SoftAurora components (see `../IMPLEMENTATION.md` §2).

## Checked

- `npm test` (Node 22.6+): 17 tests for the Ask matcher (including the home-page suggestions and refusals), the Wilson interval and the content (every citation resolves, filter counts match the design, the double-blind manuscript reveals nothing).
- Type-checked with TypeScript 5.9 in strict mode against React 19 types, and every component server-renders without errors.
- The tests import with `.ts` extensions so Node can run them directly; exclude `*.test.ts` from your app's `tsconfig` or enable `allowImportingTsExtensions`.
