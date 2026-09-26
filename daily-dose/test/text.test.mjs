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

test('source notes link only http(s) URLs, escaped, in a new tab without opener', async () => {
  const { linkify } = await import('../client/text.mjs');
  const html = linkify('See https://example.org/a?b=1&c=<x>. Not javascript:alert(1) or ftp://x.');
  assert.match(html, /<a href="https:\/\/example.org\/a\?b=1&amp;c=" target="_blank" rel="noopener noreferrer">/);
  assert.equal(html.includes('<x>'), false);
  assert.equal((html.match(/<a /g) || []).length, 1);
  assert.match(linkify('(http://example.com).'), /<a href="http:\/\/example.com"[^>]*>http:\/\/example.com<\/a>\)\./);
});
