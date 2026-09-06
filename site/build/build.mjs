/* 构建器：装配站点外壳 + 各页内容 → site/*.html */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { page } from './shell.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, '..');
const dir = path.join(here, 'pages');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.mjs')).sort();
let total = 0;

for (const f of files) {
  const mod = (await import(path.join(dir, f))).default;
  const html = page(mod);
  fs.writeFileSync(path.join(out, mod.file), html);
  total += html.length;
  console.log(`  ${mod.file.padEnd(16)} ${String(html.length).padStart(8)} bytes  ${mod.title}`);
}
console.log(`\n${files.length} 页 · ${(total / 1024).toFixed(1)} KB`);
