'use client';
// "Ask my portfolio" (v1): answers from content/answers.ts with citations, or refuses.
// The prompt field here is a plain input with the rainbow ring. To use React Bits PromptBar instead:
//   npx shadcn@latest add @react-bits/PromptBar-TS-TW
//   <PromptBar placeholder="Ask about my work" sources={[]} commands={[]} models={[]} onSend={(text) => submit(text)} />
// (PromptBar's own icons come from Hugeicons; swap them for lucide-react to keep one icon set.)
import { useEffect, useMemo, useState } from 'react';
import { ArrowUp, Ban, Sparkles } from 'lucide-react';
import { ask, type AskResult } from '../lib/ask';
import { answers, refusal, suggestions } from '../content/answers';
import type { AnswerPart } from '../content/types';
import { Cite, numberSources } from './Cite';

/** Reveals the answer word by word, like a streamed reply. Shows it at once on first render and under reduced motion. */
function useStreamedLength(text: string, animate: boolean, msPerWord = 28) {
  const words = useMemo(() => text.split(/(\s+)/), [text]);
  const [shown, setShown] = useState(words.length);
  useEffect(() => {
    if (!animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(words.length);
      return;
    }
    setShown(0);
    const timer = window.setInterval(() => {
      setShown((n) => {
        if (n >= words.length) {
          window.clearInterval(timer);
          return n;
        }
        return n + 2; // a word and the space after it
      });
    }, msPerWord);
    return () => window.clearInterval(timer);
  }, [words, animate, msPerWord]);
  return shown >= words.length ? text.length : words.slice(0, shown).join('').length;
}

function AnswerText({ parts, visibleChars }: { parts: AnswerPart[]; visibleChars: number }) {
  const ids = parts.flatMap((p) => (typeof p === 'string' ? [] : [p.cite]));
  const n = numberSources(ids);
  let budget = visibleChars;
  return (
    <p className="m-0">
      {parts.map((part, i) => {
        if (typeof part === 'string') {
          const text = part.slice(0, Math.max(0, budget));
          budget -= part.length;
          return <span key={i}>{text}</span>;
        }
        // A citation appears once the text before it has fully streamed in.
        return budget >= 0 ? <Cite key={i} id={part.cite} n={n} /> : null;
      })}
    </p>
  );
}

export function AskPanel() {
  const [draft, setDraft] = useState('');
  const [question, setQuestion] = useState(suggestions[0]);
  const [asked, setAsked] = useState(false); // stream only answers the visitor asked for
  const result: AskResult = useMemo(() => ask(question, answers), [question]);
  const fullText = result.kind === 'answer' ? result.entry.answer.filter((p): p is string => typeof p === 'string').join('') : refusal;
  const visible = useStreamedLength(fullText, asked);

  const submit = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setQuestion(q);
    setAsked(true);
    setDraft('');
  };

  return (
    <div className="flex w-full max-w-[880px] flex-col gap-3.5 rounded-card bg-card p-7 text-left elev-floating">
      <div className="ai-ring relative flex h-[60px] items-center gap-3 rounded-field bg-fill pr-2.5 pl-[18px]">
        <Sparkles size={20} strokeWidth={1.8} className="shrink-0 text-[#AF52DE]" aria-hidden />
        <label htmlFor="ask-q" className="sr-only">
          Ask a question about Yash’s work
        </label>
        <input
          id="ask-q"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit(draft)}
          placeholder="Ask about GlassBox, Pulse, Gridee or the research"
          className="h-full min-w-0 flex-1 border-0 bg-transparent text-body text-label outline-none"
        />
        <button
          type="button"
          aria-label="Send question"
          onClick={() => submit(draft)}
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent"
        >
          <ArrowUp size={20} strokeWidth={2.4} aria-hidden />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={s === question}
            onClick={() => submit(s)}
            className={`h-9 rounded-full px-3.5 text-sm transition-colors ${s === question ? 'bg-accent font-semibold text-on-accent' : 'bg-fill text-label2 hover:bg-fill2'}`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-3.5 flex flex-col gap-3" aria-live="polite">
        <p className="m-0 max-w-[72%] self-end rounded-[22px] bg-accent px-[18px] py-[11px] text-body text-on-accent">{question}</p>
        <div className="flex items-start gap-3">
          <span
            aria-hidden
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
            style={{ background: 'linear-gradient(145deg, #3A3A3C, #0B0B0C)' }}
          >
            YC
          </span>
          <div className="min-w-0 flex-1 rounded-[22px] bg-fill px-5 py-[18px] text-body leading-normal">
            {result.kind === 'answer' ? (
              <AnswerText parts={result.entry.answer} visibleChars={visible} />
            ) : (
              <>
                <span className="inline-flex h-6 items-center gap-1.5 rounded-full bg-mute-wash px-2.5 text-xs font-semibold text-mute">
                  <Ban size={13} strokeWidth={2.2} aria-hidden />
                  No source · refused
                </span>
                <p className="mt-2 mb-0">{refusal.slice(0, visible)}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
