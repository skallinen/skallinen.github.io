import { build } from 'esbuild';
import { copyFileSync } from 'node:fs';
await build({ entryPoints: ['client/app.mjs'], outfile: 'assets/app.js', bundle: true, minify: true, format: 'esm', target: ['es2022'], sourcemap: false });
copyFileSync('pages/index.html', 'index.html');
console.log('Built GitHub Pages entrypoint and Firebase client; no manuscript data bundled.');
