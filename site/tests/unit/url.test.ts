import { test } from 'vitest';
import assert from 'node:assert/strict';
import { pagePath } from '../../src/lib/url';

test('page paths drop the .html and index of file-format builds', () => {
  assert.equal(pagePath('/index.html'), '/');
  assert.equal(pagePath('/'), '/');
  assert.equal(pagePath('/work.html'), '/work');
  assert.equal(pagePath('/work/pulse.html'), '/work/pulse');
  assert.equal(pagePath('/work/'), '/work');
  assert.equal(pagePath('/about'), '/about');
});
