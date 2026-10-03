import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatInterval, wilson } from './wilson.ts';

test('183/183 gives the interval shown on the site', () => {
  const i = wilson(183, 183);
  assert.equal(formatInterval(i), '97.9–100%');
  assert.ok(Math.abs(i.lower - 0.97944) < 1e-4);
});

test('0/183 gives 0–2.1%', () => {
  assert.equal(formatInterval(wilson(0, 183)), '0–2.1%');
});

test('a 90% pass rate on 183 questions (165/183) is 85–93.7%', () => {
  assert.equal(formatInterval(wilson(165, 183)), '85–93.7%');
});

test('bad input throws', () => {
  assert.throws(() => wilson(1, 0));
  assert.throws(() => wilson(5, 4));
  assert.throws(() => wilson(-1, 4));
});
