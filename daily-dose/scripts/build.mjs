import { build } from 'esbuild';
await build({ entryPoints: ['client/app.mjs'], outfile: 'public/app.js', bundle: true,
  minify: true, format: 'esm', target: ['es2022'], sourcemap: false });
console.log('Built private reading companion client.');
