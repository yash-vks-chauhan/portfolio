// "Ask my portfolio" v1 matcher: no server, no model, so it can't make anything up.
// It scores each hand-written entry by keyword overlap and refuses when nothing scores high enough.
import type { AskEntry } from '../content/types';

export type AskResult =
  | { kind: 'answer'; entry: AskEntry; score: number }
  | { kind: 'refusal'; score: number; closest?: AskEntry };

const STOP = new Set(
  (
    'a an and are as at be been but by can could did do does doesnt dont for from had has have how i if in into is isnt it its ' +
    'just know me my of on or so tell than that the their them then there these they this to was we were what whats when where ' +
    'which who whom why will with would you your youre about any some please much many more most also really like'
  ).split(' ')
);

/** Lowercases, strips accents and punctuation, drops stop words. */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9+#\s-]/g, ' ')
    .split(/[\s-]+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

/** True when two tokens are the same word give or take an ending (test/tests, build/built, hallucinate/hallucination). */
export function sameWord(a: string, b: string): boolean {
  if (a === b) return true;
  const short = Math.min(a.length, b.length);
  if (short < 4) return false;
  let i = 0;
  while (i < short && a[i] === b[i]) i++;
  return i >= Math.max(4, Math.ceil(short * 0.8));
}

const KEYWORD_WEIGHT = 2;
const QUESTION_WEIGHT = 1;

/** Score in [0, 1]: the share of the visitor's words that match the entry, keywords counting double. */
export function score(query: string[], entry: AskEntry): { score: number; keywordHits: number } {
  if (query.length === 0) return { score: 0, keywordHits: 0 };
  const keywords = entry.keywords.flatMap(tokenize);
  const questionWords = tokenize(entry.question);
  let total = 0;
  let keywordHits = 0;
  for (const word of new Set(query)) {
    if (keywords.some((k) => sameWord(word, k))) {
      total += KEYWORD_WEIGHT;
      keywordHits++;
    } else if (questionWords.some((k) => sameWord(word, k))) {
      total += QUESTION_WEIGHT;
    }
  }
  return { score: total / (new Set(query).size * KEYWORD_WEIGHT), keywordHits };
}

/**
 * Picks the best entry, or refuses.
 * An answer needs at least one keyword hit and a score at or above `threshold`.
 */
export function ask(question: string, entries: AskEntry[], threshold = 0.5): AskResult {
  const query = tokenize(question);
  let best: { entry: AskEntry; score: number; keywordHits: number } | undefined;
  for (const entry of entries) {
    const s = score(query, entry);
    const better =
      !best ||
      s.score > best.score ||
      (s.score === best.score && s.keywordHits > best.keywordHits) ||
      (s.score === best.score && s.keywordHits === best.keywordHits && (entry.priority ?? 0) > (best.entry.priority ?? 0));
    if (better) best = { entry, ...s };
  }
  if (best && best.keywordHits > 0 && best.score >= threshold) {
    return { kind: 'answer', entry: best.entry, score: best.score };
  }
  return { kind: 'refusal', score: best?.score ?? 0, closest: best && best.score > 0 ? best.entry : undefined };
}
