import test from 'node:test';
import assert from 'node:assert/strict';
import { esc, tableHtml } from '../client/text.mjs';

test('table rendering preserves merged manuscript cells and escapes literal text', () => {
  const html = tableHtml([['Heading', '', '', '2'], ['<script>', 'a', 'b', 'c']], [[0, 0, 2, 0]]);
  assert.match(html, /<td colspan="3" rowspan="1">Heading<\/td><td>2<\/td>/);
  assert.equal((html.match(/<td/g) || []).length, 6);
  assert.ok(html.includes('&lt;script&gt;'));
  assert.equal(esc('A & B "quoted"'), 'A &amp; B &quot;quoted&quot;');
});
