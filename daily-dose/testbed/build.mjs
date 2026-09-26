// Builds the deployed client (client/app.mjs, unchanged) into testbed/site/,
// swapping only the Firebase config and pointing Auth/Firestore at the
// emulators. The production build (scripts/build-pages.mjs) is not involved.
import { build } from 'esbuild';
import { copyFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const source = resolve(here, '..');
const clientDir = join(source, 'client');
const shims = { 'firebase/auth': join(here, 'shims/auth.mjs'), 'firebase/firestore': join(here, 'shims/firestore.mjs') };
const emulators = {
  name: 'testbed-emulators',
  setup(b) {
    // Only imports made by the app's own source are redirected; the shims
    // themselves import the real SDK modules.
    b.onResolve({ filter: /^firebase\/(auth|firestore)$/ }, args =>
      args.importer.startsWith(clientDir) ? { path: shims[args.path] } : undefined);
    b.onResolve({ filter: /firebase-config\.mjs$/ }, args =>
      args.importer.startsWith(clientDir) ? { path: join(here, 'shims/firebase-config.mjs') } : undefined);
  },
};
mkdirSync(join(here, 'site/assets'), { recursive: true });
await build({ entryPoints: [join(clientDir, 'app.mjs')], outfile: join(here, 'site/assets/app.js'), bundle: true, minify: true,
  format: 'esm', target: ['es2022'], sourcemap: false, plugins: [emulators], nodePaths: [join(source, 'node_modules')] });
copyFileSync(join(source, 'pages/index.html'), join(here, 'site/index.html'));
console.log('Built test bed client into testbed/site (emulator-bound, project demo-daily-dose).');
