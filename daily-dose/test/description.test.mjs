import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';
import { DESCRIPTION_MAX, codePoints, validDescription, showDescription, descriptionHtml, descriptionProblems } from '../client/description.mjs';
import { rankItem, rankScores } from '../client/ranking.mjs';

const work = (status, description = 'A bird sings in the soul & never asks for a crumb.') =>
  ({ id: 'P01', title: 'Hope', author: 'Emily Dickinson', category: 'poem', day: 1, description, mine: status ? { status, rating: 4 } : null });

test('the limit is 280 Unicode code points, not UTF-16 units', () => {
  assert.equal(DESCRIPTION_MAX, 280);
  assert.equal(codePoints('😂'.repeat(280)), 280);
  assert.ok(validDescription('😂'.repeat(280)));
  assert.ok(!validDescription('😂'.repeat(281)));
  assert.ok(!validDescription('a'.repeat(281)));
  assert.ok(!validDescription('   '));
  assert.ok(!validDescription(null));
});

test('a description shows only once the reader has checked the text off', () => {
  assert.ok(!showDescription(work(null)));
  assert.ok(!showDescription(work('reading')));
  assert.ok(showDescription(work('done')));
  assert.equal(descriptionHtml(work('reading')), '');
  assert.equal(descriptionHtml(work('done', undefined)), '<p class="work-description">A bird sings in the soul &amp; never asks for a crumb.</p>');
  assert.equal(descriptionHtml(work('done', '')), '');
  assert.equal(descriptionHtml(work('done', 'x'.repeat(281))), '');
});

test('on My ranking the description is a tooltip on the title, opened by a tap', () => {
  const r = rankScores(['P01']).get('P01');
  const closed = rankItem(work('done'), r, 'Poem');
  assert.match(closed, /^<li class="rank-item" /);
  assert.match(closed, /<button type="button" class="rank-title rank-tip-button" data-rank-tip="P01" aria-expanded="false" aria-describedby="tip-P01">Hope/);
  assert.match(closed, /<span class="rank-tip" role="tooltip" id="tip-P01">A bird sings in the soul &amp; never asks for a crumb\.<\/span>/);
  // Only the handle drags: the title button is not a drag handle.
  assert.equal(closed.match(/data-drag=/g).length, 1);
  assert.doesNotMatch(closed.match(/<button[^>]*rank-tip-button[^>]*>/)[0], /data-drag/);
  const open = rankItem(work('done'), r, 'Poem', true);
  assert.match(open, /^<li class="rank-item tip-open" /);
  assert.match(open, /aria-expanded="true"/);
  // Without a description: a plain title, no tooltip, never open.
  const plain = rankItem({ ...work('done'), description: undefined }, r, 'Poem', true);
  assert.match(plain, /<span class="rank-title">Hope<\/span>/);
  assert.doesNotMatch(plain, /rank-tip|tip-open/);
});

test('descriptionProblems names missing, blank, long, em-dashed and unknown entries', () => {
  assert.deepEqual(descriptionProblems({ A: 'Fine.', B: 'Also fine.' }, ['A', 'B']), []);
  assert.deepEqual(descriptionProblems({ A: 'Fine.', B: ' ', C: 'x'.repeat(281), D: 'One — two', E: 'Extra.' }, ['A', 'B', 'C', 'D', 'X']),
    ['B: blank', 'C: 281 code points, over 280', 'D: em dash', 'X: missing', 'E: not a text in the programme']);
  assert.deepEqual(descriptionProblems([], ['A']), ['Not an object of text id to description.']);
});

// The private descriptions file, when this machine has the editorial
// workspace: every one of the 150 texts has one, each within 280 code points.
const privateFile = [process.env.DESCRIPTIONS, path.join(homedir(), 'common/projects/daily-dose/descriptions.json'),
  path.join(homedir(), 'mac/common/projects/daily-dose/descriptions.json')].filter(Boolean).find(p => existsSync(p));
const anthologyFile = privateFile && path.join(path.dirname(privateFile), 'webapp/data/anthology.json');
test('the private descriptions file covers all 150 texts within the limit', { skip: !privateFile && 'no editorial workspace here' }, () => {
  const map = JSON.parse(readFileSync(privateFile, 'utf8'));
  const ids = existsSync(anthologyFile) ? JSON.parse(readFileSync(anthologyFile, 'utf8')).works.map(w => w.id) : Object.keys(map);
  assert.equal(ids.length, 150);
  assert.deepEqual(descriptionProblems(map, ids), []);
  for (const [id, d] of Object.entries(map)) assert.ok(codePoints(d) <= 280, `${id}: ${codePoints(d)}`);
});
