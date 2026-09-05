#!/usr/bin/env node
/**
 * build.mjs · 源裕兴设计系统全典 · 构建器
 *  tokens.json ──► dist/tokens.css（三层 Token，五实体映射，三态暗色）
 *              ──► dist/tokens.resolved.json（含推导色阶与实测对比度）
 *  src/partials + src/css + src/js ──► dist/index.html（独立文档）+ dist/artifact.html（Artifact 片段）
 * 质量门禁：WCAG AA 对比度不达标即构建失败（守正：以数据守正）。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { deriveScale, deriveGoldScale, contrast, hexToOklch, fmtOklch, r2 } from './color.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const REPORT_ONLY = process.argv.includes('--report');
fs.mkdirSync(DIST, { recursive: true });

const T = JSON.parse(fs.readFileSync(path.join(ROOT, 'tokens', 'tokens.json'), 'utf8'));
const ENTITIES = ['stg', 'ste', 'sti', 'sth', 'edu'];
const CHART = JSON.parse(fs.readFileSync(path.join(ROOT, 'tokens', 'chart-palette.json'), 'utf8'));
const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

/* ───────────────────────── 1. 推导色阶 ───────────────────────── */
const ink = Object.fromEntries(STEPS.map(s => [s, T.primitive.color.ink[s].$value]));
const scales = {};
for (const e of ENTITIES) scales[e] = deriveScale(T.primitive.color.entity[e].$value);
const gold = deriveGoldScale(T.primitive.color.gold.$value);

/* ───────────────────────── 2. 质量门禁：可访问主色选取 ───────────────────────── */
const AA = 4.5, AA_LARGE = 3.0;
const gates = [];   // 记录每一次门禁判断
const derived = {}; // 每实体：primaryLight / primaryDark 及实测
for (const e of ENTITIES) {
  const sc = scales[e];
  // 浅色：从 600 起向深处找第一阶满足 文字≥4.5:1 对 Ink50（用于链接/文字）且 Ink50 文字压其上 ≥4.5:1（用于按钮）
  let pl = null;
  for (const s of [600, 700, 800]) {
    const cText = contrast(sc[s], ink[50]);
    const cBtn = contrast(ink[50], sc[s]);
    gates.push({ entity: e, mode: 'light', step: s, hex: sc[s], vsInk50: r2(cText), ink50On: r2(cBtn), pass: cText >= AA && cBtn >= AA });
    if (cText >= AA && cBtn >= AA) { pl = s; break; }
  }
  // 暗色：从 300 起向浅处找第一阶满足 文字≥4.5:1 对 Ink800（surface）与 Ink900（background），且 Ink900 文字压其上 ≥4.5:1
  let pd = null;
  for (const s of [300, 200, 100]) {
    const c1 = contrast(sc[s], ink[800]), c2 = contrast(sc[s], ink[900]), c3 = contrast(ink[900], sc[s]);
    gates.push({ entity: e, mode: 'dark', step: s, hex: sc[s], vsInk800: r2(c1), vsInk900: r2(c2), ink900On: r2(c3), pass: c1 >= AA && c2 >= AA && c3 >= AA });
    if (c1 >= AA && c2 >= AA && c3 >= AA) { pd = s; break; }
  }
  if (pl === null || pd === null) { console.error(`✖ 门禁失败：${e} 无法找到可访问主色`); process.exit(1); }
  derived[e] = {
    primaryLightStep: pl, primaryLight: sc[pl], primaryLightVsInk50: r2(contrast(sc[pl], ink[50])), ink50OnPrimaryLight: r2(contrast(ink[50], sc[pl])),
    primaryDarkStep: pd, primaryDark: sc[pd], primaryDarkVsInk800: r2(contrast(sc[pd], ink[800])), ink900OnPrimaryDark: r2(contrast(ink[900], sc[pd])),
    brandVsInk50: r2(contrast(sc[600], ink[50])), brandVsInk800: r2(contrast(sc[600], ink[800])),
  };
}
/* 语义色门禁（浅色）：正文、次文、占位、边框、语义状态色 */
const semanticChecks = [
  ['onSurface Ink800 / surface Ink50', ink[800], ink[50], AA],
  ['onSurfaceVariant Ink600 / surface Ink50', ink[600], ink[50], AA],
  ['placeholder Ink600 / surface Ink50', ink[600], ink[50], AA],
  ['outline Ink500 / surface Ink50（非文本 3:1）', ink[500], ink[50], AA_LARGE],
  ['success STE600 / Ink50', scales.ste[600], ink[50], AA],
  ['error EDU600 / Ink50', scales.edu[600], ink[50], AA],
  ['info STI600 / Ink50', scales.sti[600], ink[50], AA],
  ['warning Gold700 / Ink50', gold[700], ink[50], AA],
  ['onTertiary Ink900 / tertiary Gold400', ink[900], gold[400], AA],
  ['goldText Gold700 / Ink50', gold[700], ink[50], AA],
  ['dark onSurface Ink100 / Ink800', ink[100], ink[800], AA],
  ['dark onSurfaceVariant Ink300 / Ink800', ink[300], ink[800], AA],
  ['dark placeholder Ink400 / Ink800', ink[400], ink[800], AA],
  ['dark outline Ink500 / Ink800（非文本 3:1）', ink[500], ink[800], AA_LARGE],
  ['dark success STE300 / Ink800', scales.ste[300], ink[800], AA],
  ['dark error EDU300 / Ink800', scales.edu[300], ink[800], AA],
  ['dark info STI300 / Ink800', scales.sti[300], ink[800], AA],
  ['dark warning Gold300 / Ink800', gold[300], ink[800], AA],
  ['dark tertiary Gold300 / Ink800', gold[300], ink[800], AA],
  ['dark onTertiary Ink900 / Gold300', ink[900], gold[300], AA],
].map(([name, fg, bg, min]) => ({ name, fg, bg, min, ratio: r2(contrast(fg, bg)), pass: contrast(fg, bg) >= min }));
const failed = semanticChecks.filter(c => !c.pass);
if (failed.length) { console.error('✖ 语义色门禁失败：'); console.table(failed); process.exit(1); }

/* 对比度矩阵：五实体 600/主色 × 宣纸白 / 浓墨 / 玄墨 */
const matrix = ENTITIES.map(e => ({
  entity: e, name: T.primitive.color.entity[e].$extensions['sino.name'],
  hex600: scales[e][600], oklch: fmtOklch(scales[e][600]),
  onInk50: r2(contrast(scales[e][600], ink[50])), onInk800: r2(contrast(scales[e][600], ink[800])),
  primaryLight: derived[e].primaryLight, primaryLightStep: derived[e].primaryLightStep, primaryLightOnInk50: derived[e].primaryLightVsInk50,
  primaryDark: derived[e].primaryDark, primaryDarkStep: derived[e].primaryDarkStep, primaryDarkOnInk800: derived[e].primaryDarkVsInk800,
}));

if (REPORT_ONLY) {
  for (const e of ENTITIES) {
    console.log(`\n${e.toUpperCase()} ${T.primitive.color.entity[e].$extensions['sino.name']}`);
    for (const s of STEPS) { const o = hexToOklch(scales[e][s]); console.log(`  ${String(s).padStart(3)} ${scales[e][s]}  L=${(o.L*100).toFixed(1)} C=${o.C.toFixed(3)} H=${o.H.toFixed(0)}  /Ink50 ${r2(contrast(scales[e][s], ink[50]))}  /Ink800 ${r2(contrast(scales[e][s], ink[800]))}`); }
  }
  console.log('\nGOLD'); for (const s of STEPS) { const o = hexToOklch(gold[s]); console.log(`  ${String(s).padStart(3)} ${gold[s]}  L=${(o.L*100).toFixed(1)} C=${o.C.toFixed(3)}  /Ink50 ${r2(contrast(gold[s], ink[50]))}  /Ink800 ${r2(contrast(gold[s], ink[800]))}  Ink900on ${r2(contrast(ink[900], gold[s]))}`); }
  console.log('\nINK'); for (const s of STEPS) console.log(`  ${String(s).padStart(3)} ${ink[s]}  ${fmtOklch(ink[s])}  /Ink50 ${r2(contrast(ink[s], ink[50]))}  /Ink800 ${r2(contrast(ink[s], ink[800]))}`);
  console.log('\nDERIVED'); console.table(matrix);
  console.log('\nSEMANTIC CHECKS'); console.table(semanticChecks);
  process.exit(0);
}

/* ───────────────────────── 3. Token 引用解析 ───────────────────────── */
function refToVar(ref, mode) {
  const p = ref.split('.');
  if (p[0] === 'primitive') {
    if (p[1] === 'color') {
      if (p[2] === 'ink') return `var(--ink-${p[3]})`;
      if (p[2] === 'entity') return `var(--${p[3]}-${p[4]})`;
      if (p[2] === 'gold') return `var(--gold-${p[3]})`;
      if (p[2] === 'chart') return `var(--chart-${p[3]})`;
    }
    if (p[1] === 'font') return `var(--font-${p[2]})`;
    if (p[1] === 'space') return `var(--space-${p[2]})`;
    if (p[1] === 'radius') return `var(--radius-${p[2]})`;
    if (p[1] === 'motion' && p[2] === 'duration') return `var(--dur-${p[3]})`;
    if (p[1] === 'motion' && p[2] === 'easing') return `var(--ease-${p[3]})`;
    if (p[1] === 'z') return `var(--z-${p[2]})`;
    if (p[1] === 'type') return `var(--fs-${p[2]})`;
  }
  if (p[0] === 'entity') {
    if (p[1] === 'primary-light' || p[1] === 'primary-dark') return `var(--e-${p[1]})`;
    return `var(--e-${p[1]})`;
  }
  if (p[0] === 'semantic' && p[1] === 'color') return `var(--c-${p[2]})`;
  if (p[0] === 'semantic' && p[1] === 'shadow') return `var(--shadow-${p[2]})`;
  throw new Error('未知 Token 引用：' + ref);
}
const resolve = (v, mode) => String(v).replace(/\{([^}]+)\}/g, (_, ref) => refToVar(ref, mode));

/* ───────────────────────── 4. 生成 tokens.css ───────────────────────── */
let css = '';
const counts = { primitive: 0, semantic: 0, component: 0 };
const decl = (name, value, layer) => { counts[layer]++; return `  ${name}: ${value};\n`; };

css += `/* ============================================================\n   源裕兴设计系统全典 · Design Tokens · V${T.$version}（${T.$edition}）\n   由 tokens.json 构建生成，请勿手改。守正 · 开物 · 共生\n   ============================================================ */\n\n`;
css += `/* ── Layer 0 · Primitive（亚原子层，模式无关，永不直接用于组件） ── */\n:root {\n`;
for (const s of STEPS) css += decl(`--ink-${s}`, ink[s], 'primitive');
for (const e of ENTITIES) for (const s of STEPS) css += decl(`--${e}-${s}`, scales[e][s], 'primitive');
for (const s of STEPS) css += decl(`--gold-${s}`, gold[s], 'primitive');
for (const [k, v] of Object.entries(T.primitive.font)) if (!k.startsWith('$')) css += decl(`--font-${k}`, v.$value, 'primitive');
for (const [k, v] of Object.entries(T.primitive.type)) {
  if (k.startsWith('$')) continue;
  const rem = px => `${(px / 16).toFixed(4).replace(/\.?0+$/, '')}rem`;
  const fs = v.fluidMin ? `clamp(${rem(v.fluidMin)}, ${rem(v.fluidMin * 0.55)} + ${((v.size - v.fluidMin * 0.55) / 14.4).toFixed(2)}vw, ${rem(v.size)})` : rem(v.size);
  css += decl(`--fs-${k}`, fs, 'primitive');
  css += decl(`--lh-${k}`, v.lh, 'primitive');
  css += decl(`--fw-${k}`, v.weight, 'primitive');
  css += decl(`--ls-${k}`, v.ls, 'primitive');
  css += decl(`--ff-${k}`, `var(--font-${v.family})`, 'primitive');
}
for (const [k, v] of Object.entries(T.primitive.space)) if (!k.startsWith('$')) css += decl(`--space-${k}`, v, 'primitive');
for (const [k, v] of Object.entries(T.primitive.radius)) if (!k.startsWith('$')) css += decl(`--radius-${k}`, v, 'primitive');
for (const [k, v] of Object.entries(T.primitive.motion.duration)) if (!k.startsWith('$')) css += decl(`--dur-${k}`, v, 'primitive');
for (const [k, v] of Object.entries(T.primitive.motion.easing)) if (!k.startsWith('$')) css += decl(`--ease-${k}`, v, 'primitive');
for (const [k, v] of Object.entries(T.primitive.z)) if (!k.startsWith('$')) css += decl(`--z-${k}`, v, 'primitive');
for (const [k, v] of Object.entries(T.primitive.breakpoint)) if (!k.startsWith('$')) css += decl(`--bp-${k}`, `${v.min}px`, 'primitive');
css += decl('--grid-columns', T.primitive.grid.columns, 'primitive');
css += decl('--grid-max', T.primitive.grid.maxWidth, 'primitive');
css += decl('--icon-canvas', T.primitive.icon.canvas, 'primitive');
css += decl('--icon-stroke', T.primitive.icon.stroke, 'primitive');
css += decl('--touch-target', T.primitive.icon.touchTarget, 'primitive');
css += `}\n\n`;

/* 实体映射 */
css += `/* ── 实体映射（五实体切换只替换这一组；默认 STG） ── */\n`;
for (const e of ENTITIES) {
  const sel = e === 'stg' ? `.sino, [data-theme="stg"]` : `[data-theme="${e}"]`;
  css += `${sel} {\n`;
  for (const s of STEPS) css += decl(`--e-${s}`, `var(--${e}-${s})`, 'semantic');
  css += decl('--e-primary-light', `var(--${e}-${derived[e].primaryLightStep})`, 'semantic');
  css += decl('--e-primary-dark', `var(--${e}-${derived[e].primaryDarkStep})`, 'semantic');
  css += decl('--e-code', `"${e.toUpperCase()}"`, 'semantic');
  css += `}\n`;
}
css += '\n';

/* 语义：浅色 */
const semLight = () => {
  let s = '';
  s += `  color-scheme: light;\n`;
  CHART.light.forEach((hex, i) => { s += decl(`--chart-${i + 1}`, hex, 'primitive'); });
  for (const [k, v] of Object.entries(T.semantic.color.light)) s += decl(`--c-${k}`, resolve(v, 'light'), 'semantic');
  for (const [k, v] of Object.entries(T.semantic.shadow.light)) s += decl(`--shadow-${k}`, v, 'semantic');
  return s;
};
const semDark = () => {
  let s = '';
  s += `  color-scheme: dark;\n`;
  CHART.dark.forEach((hex, i) => { s += `  --chart-${i + 1}: ${hex};\n`; });
  for (const [k, v] of Object.entries(T.semantic.color.dark)) s += `  --c-${k}: ${resolve(v, 'dark')};\n`;
  for (const [k, v] of Object.entries(T.semantic.shadow.dark)) s += `  --shadow-${k}: ${v};\n`;
  return s;
};
css += `/* ── Layer 1 · Semantic · 浅色（默认；完整定义在裸选择器上；嵌套 [data-theme] 作用域重新解析） ── */\n:root {\n  color-scheme: light;\n  --c-background: var(--ink-100);\n  --c-onBackground: var(--ink-900);\n}\n.sino, .sino [data-theme] {\n${semLight()}}\n\n`;

/* 组件层 */
css += `/* ── Layer 2 · Component（只引用 Semantic） ── */\n.sino, .sino [data-theme] {\n`;
for (const [g, group] of Object.entries(T.component)) {
  if (g.startsWith('$')) continue;
  for (const [k, v] of Object.entries(group)) css += decl(`--${g}-${k}`, resolve(v, 'light'), 'component');
}
css += `}\n\n`;

/* 语义：暗色三态 */
const darkBody = semDark();
css += `/* ── Layer 1 · Semantic · 暗色（三态：宿主 data-theme / 系统偏好 / 本典 data-color-scheme，显式选择优先） ── */\n`;
css += `:root[data-theme="dark"] {\n  color-scheme: dark;\n  --c-background: var(--ink-900);\n  --c-onBackground: var(--ink-100);\n}\n`;
css += `@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {\n    color-scheme: dark;\n    --c-background: var(--ink-900);\n    --c-onBackground: var(--ink-100);\n  }\n}\n`;
css += `.sino[data-color-scheme="dark"], .sino[data-color-scheme="dark"] [data-theme], .sino [data-color-scheme="dark"],\n:root[data-theme="dark"] .sino:not([data-color-scheme="light"]), :root[data-theme="dark"] .sino:not([data-color-scheme="light"]) [data-theme] {\n${darkBody}}\n`;
css += `@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) .sino:not([data-color-scheme="light"]), :root:not([data-theme="light"]) .sino:not([data-color-scheme="light"]) [data-theme] {\n${darkBody.replace(/^  /gm, '    ')}  }\n}\n`;

fs.writeFileSync(path.join(DIST, 'tokens.css'), css);

/* 解析后的 JSON（供文档、Figma、Odoo/AntD 映射使用） */
const resolved = {
  $name: T.$name, $version: T.$version, $edition: T.$edition, builtAt: new Date().toISOString(),
  counts: { ...counts, total: counts.primitive + counts.semantic + counts.component },
  ink, entity: Object.fromEntries(ENTITIES.map(e => [e, { ...T.primitive.color.entity[e].$extensions, anchor: T.primitive.color.entity[e].$value, scale: scales[e], oklch: Object.fromEntries(STEPS.map(s => [s, fmtOklch(scales[e][s])])), ...derived[e] }])),
  gold: { anchor: T.primitive.color.gold.$value, scale: gold, oklch: Object.fromEntries(STEPS.map(s => [s, fmtOklch(gold[s])])) },
  matrix, gates, semanticChecks, chart: CHART,
  type: T.primitive.type, space: T.primitive.space, radius: T.primitive.radius, motion: T.primitive.motion, z: T.primitive.z, breakpoint: T.primitive.breakpoint,
};
fs.writeFileSync(path.join(DIST, 'tokens.resolved.json'), JSON.stringify(resolved, null, 2));

/* ───────────────────────── 5. 装配 HTML ───────────────────────── */
const read = f => fs.readFileSync(f, 'utf8');
const cssFiles = fs.readdirSync(path.join(SRC, 'css')).filter(f => f.endsWith('.css')).sort();
const jsFiles = fs.readdirSync(path.join(SRC, 'js')).filter(f => f.endsWith('.js')).sort();
const partials = fs.readdirSync(path.join(SRC, 'partials')).filter(f => f.endsWith('.html')).sort();

/* ── 路由元数据：一个 Artifact 内的多页面站点（hash 路由） ── */
const ROUTES = [
  { path: 'home',       file: '01-home.html',       nav: '首页',   title: '源裕兴设计系统全典' },
  { path: 'tokens',     file: '02-tokens.html',     nav: '令牌',   num: 'L0', en: 'Design Tokens', title: '设计令牌：亚原子层' },
  { path: 'atoms',      file: '03-atoms.html',      nav: '原子',   num: 'L1', en: 'Atoms',         title: '原子：不可再分的功能单元' },
  { path: 'molecules',  file: '04-molecules.html',  nav: '分子',   num: 'L2', en: 'Molecules',     title: '分子：原子的最小有意义组合' },
  { path: 'organisms',  file: '05-organisms.html',  nav: '有机体', num: 'L3', en: 'Organisms',     title: '有机体：可独立运作的界面区块' },
  { path: 'templates',  file: '06-templates.html',  nav: '模板',   num: 'L4', en: 'Templates',     title: '模板：只定结构，不含内容', wide: true },
  { path: 'pages',      file: '07-pages.html',      nav: '页面',   num: 'L5', en: 'Pages · Five Entities', title: '页面：五实体，一套语法', wide: true },
  { path: 'governance', file: '08-governance.html', nav: '治理',   num: 'G',  en: 'Governance',    title: '治理：让系统在生长中不漂移' },
];
const routeHtml = Object.fromEntries(ROUTES.map(r => [r.path, read(path.join(SRC, 'partials', r.file))]));
/* 锚点映射：id → 路由 */
const idRoute = {};
for (const r of ROUTES) for (const m of routeHtml[r.path].matchAll(/\sid="([^"]+)"/g)) idRoute[m[1]] = r.path;
const rewriteAnchors = html => html.replace(/(<a\b[^>]*?\s)href="#([^"/][^"]*)"/g, (all, pre, id) => {
  if (ROUTES.some(r => r.path === id)) return `${pre}href="#/${id}"`;
  const r = idRoute[id]; if (!r) return `${pre}href="#/"`;
  return r === 'home' ? `${pre}href="#/home/${id}"` : `${pre}href="#/${r}/${id}"`;
});
const PHI = { shouzheng: '守正', kaiwu: '开物', gongsheng: '共生' };
let body = '';
ROUTES.forEach((r, i) => {
  let html = routeHtml[r.path];
  let cover = '';
  if (r.path !== 'home') {
    const head = html.match(/<div class="cx-head">[\s\S]*?<div class="cx-head__phi">([\s\S]*?)<\/div>\s*<\/div>/);
    const lead = (html.match(/<p class="cx-head__lead"[^>]*>([\s\S]*?)<\/p>/) || [])[1] || '';
    const phis = head ? [...head[1].matchAll(/m-phi__tag--(\w+)/g)].map(m => m[1]) : [];
    html = head ? html.replace(head[0], '') : html;
    cover = `<header class="cover" data-art="${r.path}">
  <canvas class="cover__art" aria-hidden="true"></canvas>
  <div class="cover__inner">
    <div class="cover__num" aria-hidden="true">${r.num}</div>
    <div class="cover__meta"><span class="cover__layer">${r.num === 'G' ? 'GOVERNANCE' : 'LAYER ' + r.num.slice(1)}</span><span class="cover__en">${r.en}</span></div>
    <h1 class="cover__title">${r.title}</h1>
    <p class="cover__lead">${lead}</p>
    <div class="cover__phi">${phis.map(p => `<span class="m-phi__tag m-phi__tag--${p}">${PHI[p]}</span>`).join('')}</div>
    <div class="cover__index" data-toc-inline></div>
  </div>
</header>`;
  }
  const prev = ROUTES[i - 1], next = ROUTES[i + 1];
  const chap = r.path === 'home' ? '' : `<nav class="chapnav" aria-label="章节导航">${prev ? `<a class="chapnav__link chapnav__link--prev" href="#/${prev.path === 'home' ? '' : prev.path}"><span class="chapnav__k">上一章</span><span class="chapnav__t">${prev.num ? prev.num + ' · ' : ''}${prev.title}</span></a>` : '<span></span>'}${next ? `<a class="chapnav__link chapnav__link--next" href="#/${next.path}"><span class="chapnav__k">下一章</span><span class="chapnav__t">${next.num ? next.num + ' · ' : ''}${next.title}</span></a>` : '<span></span>'}</nav>`;
  const inner = r.path === 'home' ? html : `${cover}<div class="cx-wrap${r.wide ? ' cx-wrap--wide' : ''}"><div class="cx-content">${html}</div>${r.wide ? '' : '<aside class="toc" aria-label="本章目录"><div class="toc__inner"><div class="toc__label">本章</div><nav class="toc__list" data-toc></nav></div></aside>'}</div>${chap}`;
  body += `<article class="route" data-route="${r.path}" data-title="${r.title}"${r.path === 'home' ? '' : ' hidden'}>\n${inner}\n</article>\n`;
});
body = rewriteAnchors(read(path.join(SRC, 'partials', '00-shell-open.html'))) + rewriteAnchors(body) + rewriteAnchors(read(path.join(SRC, 'partials', '09-shell-close.html')));
/* 资产钩子：标准 LOGO 与品牌影像（存在即内联，不存在则保留占位） */
const assetDir = path.join(SRC, 'assets');
const logoFile = ['logo.svg'].map(f => path.join(assetDir, f)).find(f => fs.existsSync(f));
if (logoFile) {
  const svg = read(logoFile); const vb = (svg.match(/viewBox="([^"]+)"/) || [, '0 0 32 32'])[1]; const innerSvg = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  body = body.replace(/<symbol id="i-mark" viewBox="[^"]+">[\s\S]*?<\/symbol>/, `<symbol id="i-mark" viewBox="${vb}">${innerSvg}</symbol>`);
  console.log('✔ 已内联标准 LOGO：' + path.basename(logoFile));
}
const heroFile = ['hero.jpg', 'hero.jpeg', 'hero.png', 'hero.webp'].map(f => path.join(assetDir, f)).find(f => fs.existsSync(f));
if (heroFile) {
  const ext = path.extname(heroFile).slice(1).replace('jpg', 'jpeg'); const b64 = fs.readFileSync(heroFile).toString('base64');
  body = body.replace('<!-- @asset:hero -->', `<figure class="hm-photo"><img src="data:image/${ext};base64,${b64}" alt="源裕兴 · 九派能源赤湖工业园航拍：生物质能源工厂与光伏矩阵" loading="lazy"><figcaption><span class="t-overline">Brand Imagery</span><span>镜头语言：纪实 · 自然光 · 低饱和。工厂与田野同框，是共生的直观证据。</span></figcaption></figure>`);
  console.log('✔ 已内联品牌影像：' + path.basename(heroFile));
} else body = body.replace('<!-- @asset:hero -->', '');

/* 生成器占位符 */
const gen = {
  'token-count': () => String(resolved.counts.total),
  'token-count-primitive': () => String(counts.primitive),
  'token-count-semantic': () => String(counts.semantic),
  'token-count-component': () => String(counts.component),
  'version': () => T.$version,
  'build-date': () => new Date().toISOString().slice(0, 10),
  'entity-scales': () => ENTITIES.map(e => {
    const x = T.primitive.color.entity[e].$extensions;
    return `<div class="scale" data-entity="${e}">
  <div class="scale__head"><span class="scale__code">${e.toUpperCase()}</span><span class="scale__name">${x['sino.name']}</span><span class="scale__anchor mono">${scales[e][600]} · ${fmtOklch(scales[e][600])}</span></div>
  <div class="scale__row">${STEPS.map(s => `<button class="swatch${s === 600 ? ' swatch--anchor' : ''}" type="button" style="--sw:var(--${e}-${s})" data-copy="--${e}-${s}" title="--${e}-${s} ${scales[e][s]}"><span class="swatch__chip"></span><span class="swatch__step">${s}</span><span class="swatch__hex mono">${scales[e][s].slice(1)}</span></button>`).join('')}</div>
</div>`;
  }).join('\n'),
  'gold-scale': () => `<div class="scale" data-entity="gold">
  <div class="scale__head"><span class="scale__code">GOLD</span><span class="scale__name">藤黄</span><span class="scale__anchor mono">${gold[400]} · ${fmtOklch(gold[400])}</span></div>
  <div class="scale__row">${STEPS.map(s => `<button class="swatch${s === 400 ? ' swatch--anchor' : ''}" type="button" style="--sw:var(--gold-${s})" data-copy="--gold-${s}" title="--gold-${s} ${gold[s]}"><span class="swatch__chip"></span><span class="swatch__step">${s}</span><span class="swatch__hex mono">${gold[s].slice(1)}</span></button>`).join('')}</div>
</div>`,
  'ink-scale': () => `<div class="scale" data-entity="ink">
  <div class="scale__head"><span class="scale__code">INK</span><span class="scale__name">宣纸墨色九阶</span><span class="scale__anchor mono">Ink 50 宣纸白 → Ink 900 玄墨</span></div>
  <div class="scale__row">${STEPS.map(s => `<button class="swatch" type="button" style="--sw:var(--ink-${s})" data-copy="--ink-${s}" title="--ink-${s} ${ink[s]}"><span class="swatch__chip"></span><span class="swatch__step">${s}</span><span class="swatch__hex mono">${ink[s].slice(1)}</span><span class="swatch__cn">${T.primitive.color.ink[s].$extensions['sino.name']}</span></button>`).join('')}</div>
</div>`,
  'contrast-matrix': () => `<table class="a-table a-table--data"><thead><tr><th>实体</th><th>品牌锚点（600）</th><th class="num">对宣纸白 Ink 50</th><th class="num">对浓墨 Ink 800</th><th>浅色可访问主色</th><th class="num">实测</th><th>暗色可访问主色</th><th class="num">实测</th></tr></thead><tbody>${matrix.map(m => `<tr><td><span class="dot" style="--sw:var(--${m.entity}-600)"></span>${m.entity.toUpperCase()} ${m.name}</td><td class="mono">${m.hex600}<br><span class="muted">${m.oklch}</span></td><td class="num">${m.onInk50.toFixed(2)}:1 ${m.onInk50 >= 4.5 ? '<span class="ok">AA</span>' : m.onInk50 >= 3 ? '<span class="warn">仅大字</span>' : '<span class="bad">✕</span>'}</td><td class="num">${m.onInk800.toFixed(2)}:1 ${m.onInk800 >= 4.5 ? '<span class="ok">AA</span>' : '<span class="bad">✕</span>'}</td><td class="mono">--${m.entity}-${m.primaryLightStep} ${m.primaryLight}</td><td class="num">${m.primaryLightOnInk50.toFixed(2)}:1 <span class="ok">AA</span></td><td class="mono">--${m.entity}-${m.primaryDarkStep} ${m.primaryDark}</td><td class="num">${m.primaryDarkOnInk800.toFixed(2)}:1 <span class="ok">AA</span></td></tr>`).join('')}</tbody></table>`,
  'semantic-checks': () => `<table class="a-table a-table--data a-table--dense"><thead><tr><th>语义角色 / 底色</th><th>前景</th><th>背景</th><th class="num">要求</th><th class="num">实测</th><th>结论</th></tr></thead><tbody>${semanticChecks.map(c => `<tr><td>${c.name}</td><td class="mono">${c.fg}</td><td class="mono">${c.bg}</td><td class="num">≥ ${c.min}:1</td><td class="num">${c.ratio.toFixed(2)}:1</td><td>${c.pass ? '<span class="ok">通过</span>' : '<span class="bad">失败</span>'}</td></tr>`).join('')}</tbody></table>`,
  'type-scale': () => Object.entries(T.primitive.type).filter(([k]) => !k.startsWith('$')).map(([k, v]) => `<div class="type-row" data-role="${k}"><div class="type-row__meta"><span class="mono">${k}</span><span>${v.size}px · ${v.lh} · ${v.weight} · ${v.family}${v.ls !== '0' ? ' · ' + v.ls : ''}</span><span class="muted">${v.use}</span></div><div class="type-row__specimen" style="font-family:var(--ff-${k});font-size:var(--fs-${k});line-height:var(--lh-${k});font-weight:var(--fw-${k});letter-spacing:var(--ls-${k})">${v.size >= 42 ? '守正开物' : v.size >= 20 ? '守正 · 开物 · 共生' : '源裕兴不是 Ant Design 的中文克隆，也不是 Material 的东方皮肤。它是第三条路。Sinotao 2026'}</div></div>`).join('\n'),
  'space-scale': () => Object.entries(T.primitive.space).filter(([k]) => !k.startsWith('$')).map(([k, v]) => `<div class="space-row"><span class="mono">--space-${k}</span><span class="space-row__bar" style="width:${v}"></span><span class="num mono">${v}</span></div>`).join('\n'),
  'radius-scale': () => Object.entries(T.primitive.radius).filter(([k]) => !k.startsWith('$')).map(([k, v]) => `<div class="radius-item"><span class="radius-item__box" style="border-radius:${v}"></span><span class="mono">--radius-${k}</span><span class="muted">${v}</span></div>`).join('\n'),
  'shadow-scale': () => Object.keys(T.semantic.shadow.light).map(k => `<div class="shadow-item"><span class="shadow-item__box" style="box-shadow:var(--shadow-${k})"></span><span class="mono">--shadow-${k}</span></div>`).join('\n'),
  'motion-table': () => `<table class="a-table a-table--data a-table--dense"><thead><tr><th>Token</th><th>值</th><th>用途</th></tr></thead><tbody>${Object.entries(T.primitive.motion.duration).filter(([k]) => !k.startsWith('$')).map(([k, v]) => `<tr><td class="mono">--dur-${k}</td><td class="mono">${v}</td><td>${({ instant: '即时反馈（按压形变、开关）', fast: '微交互（hover、图标切换）', base: '页面过渡（路由、弹窗入场）', slow: '叙事动效（Hero 入场）', loop: '无限循环（太极 Loading）', 'exit-fast': '微交互退场', 'exit-base': '过渡退场（≈ 进场 × 0.65）', 'exit-slow': '叙事退场' })[k]}</td></tr>`).join('')}${Object.entries(T.primitive.motion.easing).filter(([k]) => !k.startsWith('$')).map(([k, v]) => `<tr><td class="mono">--ease-${k}</td><td class="mono">${v}</td><td>${({ out: '进场减速到位（最常用）', in: '退场果断加速', standard: '通用中性', elegant: '东方从容 · 慢过渡', spring: '轻微回锋（<10% overshoot）· 弹窗入场', linear: '仅用于循环与滚动绑定' })[k]}</td></tr>`).join('')}</tbody></table>`,
  'breakpoint-table': () => `<table class="a-table a-table--data"><thead><tr><th>断点</th><th>屏幕宽度</th><th class="num">列数</th><th class="num">槽宽</th><th class="num">边距</th><th>典型设备</th></tr></thead><tbody>${Object.entries(T.primitive.breakpoint).filter(([k]) => !k.startsWith('$')).map(([k, v]) => `<tr><td class="mono">${k}</td><td class="num">${v.max === null ? `≥ ${v.min}px` : v.min === 0 ? `< ${v.max + 1}px` : `${v.min}–${v.max}px`}</td><td class="num">${v.cols}</td><td class="num">${v.gutter}</td><td class="num">${v.margin}</td><td>${v.device}</td></tr>`).join('')}</tbody></table>`,
  'z-table': () => `<div class="z-stack">${Object.entries(T.primitive.z).filter(([k]) => !k.startsWith('$')).map(([k, v]) => `<div class="z-stack__layer"><span class="mono">--z-${k}</span><span class="num mono">${v}</span></div>`).join('')}</div>`,
  'component-token-count': () => String(Object.keys(T.component).filter(k => !k.startsWith('$')).length),
  'ink-table': () => `<table class="a-table a-table--data a-table--dense"><thead><tr><th>Token</th><th>名称</th><th>Hex</th><th>OKLCH</th><th class="num">对 Ink 50</th><th class="num">对 Ink 800</th><th>浅色角色</th><th>暗色角色</th></tr></thead><tbody>${STEPS.map(s => `<tr><td class="mono">--ink-${s}</td><td>${T.primitive.color.ink[s].$extensions['sino.name']}</td><td class="mono">${ink[s]}</td><td class="mono muted">${fmtOklch(ink[s])}</td><td class="num">${r2(contrast(ink[s], ink[50])).toFixed(2)}</td><td class="num">${r2(contrast(ink[s], ink[800])).toFixed(2)}</td><td>${({ 50: 'surface 表面', 100: 'background 页面底 · surfaceContainer', 200: 'surfaceVariant · outlineFaint 发丝线', 300: 'outlineVariant 分割线', 400: 'chartAxis 轴线', 500: 'outline 表单边界（3.55:1）', 600: 'onSurfaceVariant · placeholder', 700: 'secondary', 800: 'onSurface 正文', 900: 'onSurfaceStrong 标题 · inverseSurface' })[s]}</td><td>${({ 50: 'onSurfaceStrong', 100: 'onSurface 正文', 200: 'secondary', 300: 'onSurfaceVariant', 400: 'placeholder · chartMuted', 500: 'outline', 600: 'outlineVariant', 700: 'outlineFaint · surfaceVariant', 800: 'surface 表面', 900: 'background 页面底' })[s]}</td></tr>`).join('')}</tbody></table>`,
};
body = body.replace(/<!--\s*@gen:([a-z0-9-]+)\s*-->/g, (_, k) => { if (!gen[k]) throw new Error('未知生成器：' + k); return gen[k](); });

const title = '源裕兴设计系统全典';
const fontsHref = 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@200..900&family=Noto+Sans+SC:wght@200..700&family=LXGW+WenKai+TC:wght@300;400;700&family=Manrope:wght@200..800&family=JetBrains+Mono:wght@400;500&display=swap';
const styles = css + '\n' + cssFiles.map(f => `/* ==== ${f} ==== */\n` + read(path.join(SRC, 'css', f))).join('\n');
const scripts = `window.SINO_DATA = ${JSON.stringify({ version: T.$version, edition: T.$edition, counts: resolved.counts, entity: resolved.entity, gold: resolved.gold, ink, matrix, chart: CHART, type: T.primitive.type })};\n` + jsFiles.map(f => `/* ==== ${f} ==== */\n` + read(path.join(SRC, 'js', f))).join('\n');

const head = `<title>${title}</title>\n<meta name="description" content="源裕兴设计系统全典 V${T.$version} · 原子设计版 · 守正 · 开物 · 共生">\n<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link rel="stylesheet" href="${fontsHref}">\n<style>\n${styles}\n</style>\n`;
const artifact = `${head}${body}\n<script>\n${scripts}\n</script>\n`;
fs.writeFileSync(path.join(DIST, 'artifact.html'), artifact);
const standalone = `<!doctype html>\n<html lang="zh-CN">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n${head}</head>\n<body>\n${body}\n<script>\n${scripts}\n</script>\n</body>\n</html>\n`;
fs.writeFileSync(path.join(DIST, 'index.html'), standalone);
fs.writeFileSync(path.join(DIST, 'sino.css'), styles);

console.log(`✔ tokens.css  Primitive ${counts.primitive} + Semantic ${counts.semantic} + Component ${counts.component} = ${resolved.counts.total} tokens`);
console.log(`✔ 门禁通过：${semanticChecks.length} 项语义对比度 + ${ENTITIES.length} 实体主色选取`);
console.log(`✔ dist/index.html ${(standalone.length / 1024).toFixed(0)} KB · dist/artifact.html ${(artifact.length / 1024).toFixed(0)} KB`);
