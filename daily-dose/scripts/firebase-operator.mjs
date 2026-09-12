import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';
export const project = 'book-club-e4916';
// Operator-only tooling. Credentials never enter the browser bundle or repo.
const config = JSON.parse(readFileSync(path.join(homedir(), '.config/configstore/firebase-tools.json'), 'utf8'));
if (!config.tokens?.access_token || config.tokens.expires_at < Date.now() + 30000) throw new Error('Refresh operator login first with: firebase projects:list');
export async function operatorRequest(url, body, method = body ? 'POST' : 'GET') {
  const response = await fetch(url, { method, headers: { Authorization: `Bearer ${config.tokens.access_token}`, 'Content-Type': 'application/json' }, ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(60000) });
  const data = await response.json();
  if (!response.ok) throw new Error(`${response.status}: ${data.error?.message || 'Firebase operation failed'}`);
  return data;
}
export const firestoreBase = `https://firestore.googleapis.com/v1/projects/${project}/databases/(default)/documents`;
export function encode(value) {
  if (value === null) return { nullValue: null };
  if (typeof value === 'string') return { stringValue: value };
  if (typeof value === 'boolean') return { booleanValue: value };
  if (typeof value === 'number') return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
  if (Array.isArray(value)) return { arrayValue: { values: value.map(encode) } };
  return { mapValue: { fields: Object.fromEntries(Object.entries(value).map(([k, v]) => [k, encode(v)])) } };
}
