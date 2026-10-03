import { test } from 'vitest';
import assert from 'node:assert/strict';
import { ask, sameWord, tokenize } from '../../src/lib/ask';
import { answers, suggestions } from '../../src/content/answers';

const id = (q: string) => {
  const r = ask(q, answers);
  return r.kind === 'answer' ? r.entry.id : 'refused';
};

test('tokenize drops stop words and punctuation', () => {
  assert.deepEqual(tokenize('How do you know GlassBox doesn’t hallucinate?'), ['glassbox', 'hallucinate']);
});

test('sameWord handles common endings but not short words', () => {
  assert.ok(sameWord('hallucinate', 'hallucination'));
  assert.ok(sameWord('test', 'tests'));
  assert.ok(sameWord('build', 'built'));
  assert.ok(!sameWord('sql', 'sqlite'));
  assert.ok(!sameWord('pulse', 'public'));
});

test('the home-page suggestions get the drawn answers', () => {
  assert.equal(id(suggestions[0]), 'glassbox-hallucination');
  assert.equal(id(suggestions[1]), 'gridee');
  assert.equal(id(suggestions[2]), 'pulse-sql');
  assert.equal(id(suggestions[3]), 'refused');
});

test('every entry answers its own question', () => {
  for (const entry of answers) assert.equal(id(entry.question), entry.id, entry.question);
});

test('paraphrases still match', () => {
  assert.equal(id('does glassbox hallucinate'), 'glassbox-hallucination');
  assert.equal(id('what tests does glassbox have'), 'glassbox-tests');
  assert.equal(id('how much does glassbox cost to host on aws'), 'glassbox-deploy');
  assert.equal(id('tell me about your startup'), 'gridee');
  assert.equal(id('is the autoscaler done?'), 'autoscaler');
  assert.equal(id('Are you hiring-ready / open to a job?'), 'availability');
});

test('off-topic and personal questions are refused', () => {
  for (const q of ['What is your salary expectation?', 'Do you like cricket?', 'Who is your girlfriend?', 'Write me a poem', '', '???']) {
    assert.equal(id(q), 'refused', q);
  }
});
