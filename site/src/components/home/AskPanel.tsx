// "Ask my portfolio" (v1): answers from content/answers.ts with citations, or refuses. From design/starter, extended to
// the thread drawn on the home page: a cited answer and a refusal to start with, then the visitor's own questions
// (the last two turns stay on screen). A React Bits CallChip shows the source lookup before an answer streams in
// word by word; under reduced motion answers appear at once. Phones show one turn and no suggestion chips, as drawn.
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { ArrowUp, Ban, Sparkles } from 'lucide-react';
import CallChip from '../bits/CallChip';
import { ask, type AskResult } from '../../lib/ask';
import { answers, refusal, suggestions } from '../../content/answers';
import { sourceById } from '../../content/sources';
import type { AnswerPart } from '../../content/types';
import { parseRich } from '../../lib/rich';
import { prefersReducedMotion } from '../../lib/events';

interface Turn {
  key: number;
  question: string;
  result: AskResult;
  /** search → stream → done. Seeded turns start done. */
  phase: 'search' | 'stream' | 'done';
  seeded?: boolean;
}

const MS_PER_WORD = 28;
const SEARCH_MS = 650;
// The seeded GlassBox answer is shorter on phones, as drawn on the mobile artboard.
const PHONE_SEED: AnswerPart[] = [
  'On 183 questions I wrote alongside the engine, it made **zero** unsupported claims: a 95% interval of 0–2.1%.',
  { cite: 'glassbox-eval-v4' },
  ' That’s a development set: “no failures found yet”.',
];

const answerText = (parts: AnswerPart[]) =>
  parts
    .filter((p): p is string => typeof p === 'string')
    .join('')
    .replace(/\*\*/g, '');

const citedIds = (parts: AnswerPart[]) => [...new Set(parts.flatMap((p) => (typeof p === 'string' ? [] : [p.cite])))];

function Cite({ id, n }: { id: string; n: number }) {
  return (
    <button type="button" className="cite" data-cite={id} data-n={n} aria-label={`Source ${n}: ${sourceById[id]?.title ?? id}`}>
      {n}
    </button>
  );
}

/** Answer text with inline citations, revealed up to `visible` characters (citations appear once the text before them has). */
function AnswerText({ parts, visible }: { parts: AnswerPart[]; visible: number }) {
  const ids = citedIds(parts);
  let budget = visible;
  return (
    <p className="m-0">
      {parts.map((part, i) => {
        if (typeof part !== 'string') return budget >= 0 ? <Cite key={i} id={part.cite} n={ids.indexOf(part.cite) + 1} /> : null;
        const plain = part.replace(/\*\*/g, '');
        const shown = Math.max(0, Math.min(plain.length, budget));
        budget -= plain.length;
        if (shown === 0) return null;
        // Walk the rich nodes, cutting off at `shown` plain characters.
        let left = shown;
        return parseRich(part).map((node, j) => {
          if (left <= 0 || node.t === 'cite') return null;
          const text = node.v.slice(0, left);
          left -= node.v.length;
          if (node.t === 'b') return <strong key={`${i}-${j}`} className="font-semibold">{text}</strong>;
          if (node.t === 'nowrap') return <span key={`${i}-${j}`} className="whitespace-nowrap">{text}</span>;
          return <span key={`${i}-${j}`}>{text}</span>;
        });
      })}
    </p>
  );
}

function SourceChips({ parts, className = '' }: { parts: AnswerPart[]; className?: string }) {
  const ids = citedIds(parts);
  if (ids.length === 0) return null;
  return (
    <div className={`ask-chips ${className}`}>
      {ids.map((id, i) => (
        <button key={id} type="button" className="ask-source-chip" data-cite={id} data-n={i + 1} aria-label={`Source ${i + 1}: ${sourceById[id]?.title ?? id}`}>
          <strong>{i + 1}</strong>
          {sourceById[id]?.chip ?? id}
        </button>
      ))}
    </div>
  );
}

function useStream(turn: Turn, onDone: () => void) {
  const full = turn.result.kind === 'answer' ? answerText(turn.result.entry.answer) : refusal;
  const [visible, setVisible] = useState(turn.phase === 'done' ? full.length : 0);
  const done = useRef(onDone);
  done.current = onDone;
  useEffect(() => {
    if (turn.phase !== 'stream') return;
    const words = full.split(/(\s+)/);
    let n = 0;
    const timer = window.setInterval(() => {
      n += 2;
      if (n >= words.length) {
        window.clearInterval(timer);
        setVisible(full.length);
        done.current();
      } else {
        setVisible(words.slice(0, n).join('').length);
      }
    }, MS_PER_WORD);
    return () => window.clearInterval(timer);
  }, [turn.phase, full]);
  return turn.phase === 'done' ? full.length : visible;
}

function TurnView({ turn, phoneHidden, onDone }: { turn: Turn; phoneHidden: boolean; onDone: (turn: Turn) => void }) {
  const visible = useStream(turn, () => onDone(turn));
  const r = turn.result;
  const isSeedGlassbox = turn.seeded && r.kind === 'answer' && r.entry.id === 'glassbox-hallucination';
  return (
    <div className={`ask-turn ${phoneHidden ? 'max-md:hidden' : ''}`}>
      <p className="ask-question">{turn.question}</p>
      <div className="ask-answer-row">
        <span aria-hidden="true" className="ask-avatar">
          YC
        </span>
        <div className={`ask-bubble ${r.kind === 'refusal' ? 'ask-bubble-refusal' : ''}`}>
          {turn.phase === 'search' ? (
            <CallChip
              icon="search"
              name="sources"
              argument={r.kind === 'answer' ? (citedIds(r.entry.answer)[0] ?? 'answers') : 'no match'}
              status="running"
              expectedMs={SEARCH_MS}
              size={30}
              radius={999}
              surfaceColor="var(--card)"
              color="var(--label2)"
              doneColor="var(--ok)"
              showTimer={false}
            />
          ) : r.kind === 'answer' ? (
            isSeedGlassbox ? (
              <>
                <div className="max-md:hidden">
                  <AnswerText parts={r.entry.answer} visible={Infinity} />
                  <SourceChips parts={r.entry.answer} />
                </div>
                <div className="md:hidden">
                  <AnswerText parts={PHONE_SEED} visible={Infinity} />
                  <SourceChips parts={PHONE_SEED} />
                </div>
              </>
            ) : (
              <>
                <AnswerText parts={r.entry.answer} visible={visible} />
                {turn.phase === 'done' && <SourceChips parts={r.entry.answer} className="ask-fade" />}
              </>
            )
          ) : (
            <>
              <span className="ask-refused">
                <Ban size={13} strokeWidth={2.2} aria-hidden="true" />
                No source · refused
              </span>
              <p className="mt-2 mb-0">{refusal.slice(0, visible)}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const seed = (key: number, question: string): Turn => ({ key, question, result: ask(question, answers), phase: 'done', seeded: true });

export default function AskPanel() {
  const [draft, setDraft] = useState('');
  const [turns, setTurns] = useState<Turn[]>(() => [seed(0, suggestions[0]), seed(1, suggestions[3])]);
  const [asked, setAsked] = useState<string | null>(null);
  const [announce, setAnnounce] = useState('');
  const [placeholder, setPlaceholder] = useState('Ask about GlassBox, Pulse, Gridee or the research');
  const nextKey = useRef(2);
  const chips = useMemo(() => suggestions.slice(1), []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 47.99rem)');
    const update = () => setPlaceholder(mq.matches ? 'Ask about my work' : 'Ask about GlassBox, Pulse, Gridee or the research');
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const submit = (text: string) => {
    const q = text.trim();
    if (!q) return;
    const result = ask(q, answers);
    const reduced = prefersReducedMotion();
    const key = nextKey.current++;
    const turn: Turn = { key, question: q, result, phase: reduced ? 'done' : 'search' };
    setTurns((t) => [...t, turn].slice(-2));
    setAsked(q);
    setDraft('');
    const spoken = result.kind === 'answer' ? answerText(result.entry.answer) : `No source, refused. ${refusal}`;
    if (reduced) setAnnounce(spoken);
    else {
      setAnnounce('');
      window.setTimeout(() => setTurns((all) => all.map((x) => (x.key === key && x.phase === 'search' ? { ...x, phase: 'stream' } : x))), SEARCH_MS);
    }
  };

  const finish = (turn: Turn) => {
    setTurns((all) => all.map((x) => (x.key === turn.key ? { ...x, phase: 'done' } : x)));
    setAnnounce(turn.result.kind === 'answer' ? answerText(turn.result.entry.answer) : `No source, refused. ${refusal}`);
  };

  // Phones show one turn: the first seeded answer until the visitor asks, then their latest question.
  const phoneTurn = turns.some((t) => !t.seeded) ? turns[turns.length - 1].key : turns[0].key;

  return (
    <div className="ask-panel">
      <form
        role="search"
        className="ai-ring ask-field"
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          submit(draft);
        }}
      >
        <Sparkles size={20} strokeWidth={1.8} className="ask-spark shrink-0" aria-hidden="true" />
        <label htmlFor="ask-q" className="sr-only">
          Ask a question about Yash’s work
        </label>
        <input
          id="ask-q"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          autoComplete="off"
          enterKeyHint="send"
          placeholder={placeholder}
          className="ask-input"
        />
        <button type="submit" aria-label="Send question" className="ask-send">
          <ArrowUp size={20} strokeWidth={2.4} aria-hidden="true" />
        </button>
      </form>

      <div className="ask-suggestions max-md:hidden">
        {chips.map((s) => (
          <button key={s} type="button" aria-pressed={s === asked} onClick={() => submit(s)} className={`tap ask-suggestion ${s === asked ? 'is-on' : ''}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="ask-thread">
        {turns.map((t) => (
          <TurnView key={t.key} turn={t} phoneHidden={t.key !== phoneTurn} onDone={finish} />
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
    </div>
  );
}
