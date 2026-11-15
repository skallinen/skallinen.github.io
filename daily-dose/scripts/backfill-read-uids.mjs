// Stamps every response row (dailyDose/{club}/works/{work}/reads/{uid}) with
// its owner and club: the fields `uid` and `club`, which the client's one
// query for a member's own rows needs (SPEC.md, "Fewer live connections";
// rules: the collection group `reads`). DRY RUN by default: it only counts.
// It reads the two stamp fields and the document names, never a rating, a
// thought or a draft, and it writes those two fields only (an update mask,
// on documents that still exist), so nothing a member wrote can change and
// `updatedAt` stays as it was.
//
//   node scripts/backfill-read-uids.mjs                     # dry run: how many rows lack the stamp
//   node scripts/backfill-read-uids.mjs --apply             # stamp them
//   node scripts/backfill-read-uids.mjs --enable --apply    # stamp, then switch the one query on (programme field readsByUid: true)
//   node scripts/backfill-read-uids.mjs --disable --apply   # switch it off again (clients go back to a listener per text); stamps nothing
//   node scripts/backfill-read-uids.mjs --remove --apply    # take the stamps off (only before rolling the rules back; needs --disable first)
//
// Order in production: rules and index first (the old rules refuse a stamped
// row), then --apply, then --enable --apply. It can be run again at any time:
// rows written meanwhile by a page still running older code get their stamp.
//
// Against an emulator (the test bed, the rules suite), never production:
//   EMULATOR=127.0.0.1:8290 PROJECT=demo-daily-dose CLUB=testbed-club node scripts/backfill-read-uids.mjs [--apply]

const args = new Set(process.argv.slice(2));
for (const a of args) if (!['--apply', '--enable', '--disable', '--remove'].includes(a)) throw new Error(`Unknown option ${a}.`);
const apply = args.has('--apply'), enable = args.has('--enable'), disable = args.has('--disable'), remove = args.has('--remove');
if (enable && (disable || remove)) throw new Error('--enable cannot be combined with --disable or --remove.');

const emulator = process.env.EMULATOR || null;
let project, request;
if (emulator) {
  project = process.env.PROJECT || 'demo-daily-dose';
  if (!project.startsWith('demo-') || !/^(127\.0\.0\.1|localhost):\d+$/.test(emulator)) throw new Error('EMULATOR is for a local emulator and a demo-* project only.');
  // "Bearer owner" is the emulator's own way past the rules; it means nothing to production.
  request = async (url, body, method = body ? 'POST' : 'GET') => {
    const response = await fetch(url, { method, headers: { Authorization: 'Bearer owner', 'Content-Type': 'application/json' }, ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(60000) });
    const data = await response.json();
    if (!response.ok) throw new Error(`${response.status}: ${data.error?.message || JSON.stringify(data)}`);
    return data;
  };
} else {
  if (process.env.PROJECT || process.env.CLUB) throw new Error('PROJECT and CLUB are for the emulator; production is fixed.');
  const operator = await import('./firebase-operator.mjs');
  project = operator.project; request = operator.operatorRequest;
}
const club = emulator ? (process.env.CLUB || 'testbed-club') : 'o0CwucZDrZBOea1sNm9g';
const root = `projects/${project}/databases/(default)/documents`;
const base = `${emulator ? `http://${emulator}` : 'https://firestore.googleapis.com'}/v1/${root}`;
const programPath = `dailyDose/${club}`;

const program = await request(`${base}/${programPath}`);
const enabled = program.fields?.readsByUid?.booleanValue === true;

// Every row under this club, in pages by document name: only the stamp fields are fetched.
async function rows() {
  const out = [];
  let last = null;
  for (;;) {
    const page = await request(`${base}/${programPath}:runQuery`, { structuredQuery: {
      from: [{ collectionId: 'reads', allDescendants: true }],
      select: { fields: [{ fieldPath: 'uid' }, { fieldPath: 'club' }] },
      orderBy: [{ field: { fieldPath: '__name__' }, direction: 'ASCENDING' }],
      ...(last ? { startAt: { values: [{ referenceValue: last }], before: false } } : {}),
      limit: 1000,
    } });
    const docs = page.filter(r => r.document).map(r => r.document);
    for (const d of docs) {
      const parts = d.name.slice(root.length + 1).split('/');
      // dailyDose/{club}/works/{work}/reads/{uid}, nothing else.
      if (parts.length !== 6 || parts[0] !== 'dailyDose' || parts[1] !== club || parts[2] !== 'works' || parts[4] !== 'reads') throw new Error(`Unexpected document ${d.name}.`);
      out.push({ name: d.name, work: parts[3], uid: parts[5], has: { uid: d.fields?.uid?.stringValue ?? null, club: d.fields?.club?.stringValue ?? null } });
    }
    if (docs.length < 1000) return out;
    last = docs.at(-1).name;
  }
}
const count = list => {
  const stamped = list.filter(r => r.has.uid === r.uid && r.has.club === club);
  const wrong = list.filter(r => (r.has.uid != null || r.has.club != null) && !(r.has.uid === r.uid && r.has.club === club));
  return { rows: list.length, members: new Set(list.map(r => r.uid)).size, texts: new Set(list.map(r => r.work)).size,
    stamped: stamped.length, unstamped: list.length - stamped.length - wrong.length, wrong: wrong.length };
};
async function commit(writes) {
  let done = 0;
  for (let i = 0; i < writes.length; i += 400) {
    const result = await request(`${base}:commit`, { writes: writes.slice(i, i + 400) });
    done += result.writeResults.length;
  }
  return done;
}

const before = await rows(), counted = count(before);
// A stamp that is not the row's own uid and club can only come from outside the rules: stop and look.
if (counted.wrong) throw new Error(`${counted.wrong} rows carry a stamp that is not their own uid and club; nothing was written.`);
// --disable alone only turns the switch; it leaves the rows as they are.
const todo = remove ? before.filter(r => r.has.uid != null) : disable ? [] : before.filter(r => r.has.uid == null);
console.log(JSON.stringify({ target: emulator ? `emulator ${emulator}` : 'PRODUCTION', project, club, readsByUid: enabled, ...counted,
  plan: { [remove ? 'removeStampFrom' : 'stamp']: todo.length, readsByUid: enable ? true : disable || remove ? false : 'unchanged' }, apply }, null, 1));
if (remove && enabled && !disable) throw new Error('The one query is switched on (readsByUid). Run with --disable first, and let open pages reload, before removing the stamps.');
if (!apply) process.exit(0);

// Off first, on last: the query is never on while rows are being changed under it for removal.
if (disable && enabled) {
  await request(`${base}:commit`, { writes: [{ update: { name: `${root}/${programPath}`, fields: { readsByUid: { booleanValue: false } } }, updateMask: { fieldPaths: ['readsByUid'] }, currentDocument: { exists: true } }] });
  console.log('readsByUid: false. Clients use a listener per text from their next load.');
}
if (todo.length) {
  const written = await commit(todo.map(r => ({
    update: { name: r.name, fields: remove ? {} : { uid: { stringValue: r.uid }, club: { stringValue: club } } },
    updateMask: { fieldPaths: ['uid', 'club'] },
    currentDocument: { exists: true },
  })));
  console.log(`${remove ? 'Removed the stamp from' : 'Stamped'} ${written} rows.`);
}
const after = count(await rows());
console.log(JSON.stringify({ after }, null, 1));
if (enable) {
  if (after.wrong) throw new Error('Rows with a wrong stamp appeared; not switching on.');
  await request(`${base}:commit`, { writes: [{ update: { name: `${root}/${programPath}`, fields: { readsByUid: { booleanValue: true } } }, updateMask: { fieldPaths: ['readsByUid'] }, currentDocument: { exists: true } }] });
  console.log(`readsByUid: true. Clients ask for their own rows in one query from their next feed.${after.unstamped ? ` ${after.unstamped} rows still lack the stamp (written meanwhile); clients find those by a listener per text, and a rerun stamps them.` : ''}`);
}
