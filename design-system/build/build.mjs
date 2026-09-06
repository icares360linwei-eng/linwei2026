#!/usr/bin/env node
/**
 * build.mjs · 源裕兴设计系统全典 · 构建器 V40「守正」
 *
 * 事实来源倒转：design-canvas/tokens/*.css（Claude Design 画布）是唯一权威。
 * 本构建器不再推导色阶 —— 画布已完成配色工作 —— 改为：
 *   1. 解析画布令牌  2. 实测对比度  3. 对不达 WCAG 2.2 AA 的角色按 OKLCH 明度算法抬升
 *   4. 输出 tokens.css（画布原文 + 具名修正块）与 resolved.json  5. 装配多页面站点
 * 修正一律记录在案（治理章 G.9），不静默改动画布色值。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { contrast, r2, fmtOklch, hexToOklch, oklchToHex } from './color.mjs';
import { loadCanvas, makeResolver, flatten, ENTITIES } from './tokens.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const REPO = path.resolve(ROOT, '..');
const CANVAS = path.join(REPO, 'design-canvas');
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const REPORT_ONLY = process.argv.includes('--report');
fs.mkdirSync(DIST, { recursive: true });

const VERSION = '40.0.0';
const EDITION = '守正 · 画布对齐版';

/* ───────────────────────── 1. 装载画布令牌 ───────────────────────── */
const C = loadCanvas(CANVAS);
const R0 = makeResolver(C);
const val = (name, scope = {}) => R0(`var(${name})`, scope);

/* ───────────────────────── 2. 门禁：实测 → 算法修正 ───────────────────────── */
const AA = 4.5, AA_UI = 3.0;

/** 保持色相与色度，沿 OKLCH 明度找到最近的、满足对比度要求的色 */
function lift(hex, bgHex, target, dir) {
  const base = hexToOklch(hex);
  const bgL = hexToOklch(bgHex).L;
  const up = dir === 'up' || (dir === undefined && bgL < 0.5);
  let best = hex, bestRatio = contrast(hex, bgHex);
  for (let i = 1; i <= 100; i++) {
    const L = up ? Math.min(0.995, base.L + i * 0.005) : Math.max(0.005, base.L - i * 0.005);
    const cand = oklchToHex({ ...base, L });
    const ratio = contrast(cand, bgHex);
    if (ratio > bestRatio) { best = cand; bestRatio = ratio; }
    if (ratio >= target) return { hex: cand, ratio: r2(ratio) };
  }
  return { hex: best, ratio: r2(bestRatio) };
}

/* 需要验证的角色：[显示名, 前景令牌, 背景令牌, 阈值, 可修正, 随实体变化] */
const ROLES = [
  ['标题 heading', '--text-heading', '--surface-card', AA, false, false],
  ['正文 body', '--text-body', '--surface-card', AA, false, false],
  ['次文 muted', '--text-muted', '--surface-card', AA, true, false],
  ['辅助 subtle · 卡面', '--text-subtle', '--surface-card', AA, true, false],
  ['辅助 subtle · 页面底', '--text-subtle', '--surface-page', AA, true, false],
  ['品牌文字 brand', '--text-brand', '--surface-card', AA, true, true],
  ['链接 link', '--text-link', '--surface-page', AA, true, true],
  ['金文字 gold', '--text-gold', '--surface-card', AA, true, false],
  ['主按钮文字', '--btn-primary-fg', '--btn-primary-bg', AA, false, false],
  ['金 CTA 文字', '--btn-gold-fg', '--btn-gold-bg', AA, false, false],
  ['占位符 placeholder', '--field-placeholder', '--field-bg', AA, true, false],
  ['输入框描边', '--field-border', '--surface-page', AA_UI, true, false],
  ['焦点环', '--focus-ring-color', '--surface-page', AA_UI, true, true],
  ['印章朱 seal', '--seal', '--surface-page', AA_UI, true, false],
  ['成功', '--state-success', '--surface-card', AA, true, false],
  ['警告', '--state-warning', '--surface-card', AA, true, false],
  ['错误', '--state-error', '--surface-card', AA, true, false],
  ['信息', '--state-info', '--surface-card', AA, true, false],
  ...Array.from({ length: 8 }, (_, i) => [`数据序列 ${i + 1}`, `--dv-${i + 1}`, '--surface-card', AA_UI, true, false]),
];

const checks = [];
const fixes = { light: {}, dark: {} };
const THEMES = ENTITIES;

/** 当前修正下的解析器 */
const resolver = () => makeResolver({
  base: { ...C.base, ...fixes.light }, themes: C.themes, dark: { ...C.dark, ...fixes.dark },
});
/** 某角色在某模式下的最差实测（随实体变化的取五实体最差） */
function measure(Rz, fgT, bgT, scheme, themed) {
  const list = themed ? THEMES : ['stg'];
  let worst = Infinity, at = 'stg';
  for (const t of list) {
    const scope = { theme: t, scheme };
    const bg = Rz(`var(${bgT})`, scope);
    const got = r2(contrast(flatten(Rz(`var(${fgT})`, scope), bg), bg));
    if (got < worst) { worst = got; at = t; }
  }
  return { ratio: worst, theme: at };
}
/** 随实体变化的令牌：不写死色值，而是找一个对五实体都成立的 color-mix 配比 */
function fixThemed(fgT, bgT, scheme, min) {
  const toward = scheme === 'dark' ? 'var(--ink-50)' : 'var(--ink-950)';
  const src = scheme === 'dark' ? (C.dark[fgT] ?? C.base[fgT]) : C.base[fgT];
  for (let k = 100; k >= 0; k -= 2) {
    const expr = `color-mix(in oklch, ${src} ${k}%, ${toward})`;
    const trial = { ...fixes, [scheme]: { ...fixes[scheme], [fgT]: expr } };
    const Rz = makeResolver({ base: { ...C.base, ...trial.light }, themes: C.themes, dark: { ...C.dark, ...trial.dark } });
    if (measure(Rz, fgT, bgT, scheme, true).ratio >= min) return { expr, ratio: measure(Rz, fgT, bgT, scheme, true).ratio };
  }
  throw new Error(`无法为随实体变化的 ${fgT}（${scheme}）找到满足 ${min}:1 的配比`);
}

/* 迭代修正直到收敛 —— 每轮都用最新修正重建解析器 */
for (let pass = 0; pass < 8; pass++) {
  let changed = false;
  const Rz = resolver();
  for (const scheme of ['light', 'dark']) {
    for (const [name, fgT, bgT, min, fixable, themed] of ROLES) {
      const m = measure(Rz, fgT, bgT, scheme, themed);
      if (m.ratio >= min) continue;
      if (!fixable) throw new Error(`门禁失败且不可自动修正：${scheme} · ${name} ${m.ratio}:1 < ${min}:1`);
      if (themed) {
        fixes[scheme][fgT] = fixThemed(fgT, bgT, scheme, min).expr;
      } else {
        const scope = { theme: 'stg', scheme };
        const bg = Rz(`var(${bgT})`, scope);
        fixes[scheme][fgT] = lift(flatten(Rz(`var(${fgT})`, scope), bg), bg, min).hex;
      }
      changed = true;
    }
  }
  if (!changed) break;
  if (pass === 7) throw new Error('门禁修正未收敛');
}

/* 回填：:root 上的浅色修正会被暗色继承。若某令牌在暗色下用画布原值反而更好，
   就在暗色块里显式钉回原值，避免浅色修正把暗色拖低。 */
{
  for (const [name, fgT, bgT, min, , themed] of ROLES) {
    if (!fixes.light[fgT] || fixes.dark[fgT]) continue;
    const orig = C.dark[fgT] ?? C.base[fgT];
    if (orig === undefined) continue;
    const cur = measure(resolver(), fgT, bgT, 'dark', themed).ratio;
    const trial = makeResolver({
      base: { ...C.base, ...fixes.light }, themes: C.themes,
      dark: { ...C.dark, ...fixes.dark, [fgT]: orig },
    });
    const alt = measure(trial, fgT, bgT, 'dark', themed).ratio;
    if (alt >= min && alt > cur) fixes.dark[fgT] = orig;
  }
}

/* 复验并记账：任何一项仍不达标即构建失败 */
{
  const Rz = resolver();
  for (const scheme of ['light', 'dark']) {
    for (const [name, fgT, bgT, min, , themed] of ROLES) {
      const before = measure(makeResolver(C), fgT, bgT, scheme, themed);
      const after = measure(Rz, fgT, bgT, scheme, themed);
      if (after.ratio < min) throw new Error(`门禁失败：${scheme} · ${name} ${after.ratio}:1 < ${min}:1`);
      checks.push({
        scheme, name, fg: fgT, bg: bgT, min, themed,
        before: before.ratio, after: after.ratio,
        fixed: fixes[scheme][fgT] || null,
        worstTheme: after.theme, pass: true,
      });
    }
  }
}

/* 五实体锚点验证（画布自身声明：600 档对宣纸底 ≥8:1，白字其上 ≥4.5:1） */
const ENTITY_NAMES = { stg: ['玄紫', '源裕兴创新未来', '战略中枢 · 合规治理'], ste: ['松烟绿', '九派国有能源', '生物质热电联产 · 碳资产'], sti: ['藏青', '源裕兴进出口贸易', '全球贸易 · 报关物流'], sth: ['石青', '源裕兴健康科技', '医疗器械 · PHA 医用材料'], edu: ['赭朱', '崇仁教育', '教育启智 · 家校协同'] };
const matrix = ENTITIES.map(e => {
  const hex = val(`--${e}-600`, {});
  const paper = val('--ink-50', {});
  const onPaper = r2(contrast(hex, paper));
  const whiteOn = r2(contrast('#FFFFFF', hex));
  if (onPaper < 8) throw new Error(`门禁失败：${e.toUpperCase()} 600 对宣纸底 ${onPaper}:1 < 8:1`);
  if (whiteOn < AA) throw new Error(`门禁失败：白字在 ${e.toUpperCase()} 600 上 ${whiteOn}:1 < 4.5:1`);
  const [cn, full, role] = ENTITY_NAMES[e];
  return { entity: e, cn, full, role, hex, oklch: fmtOklch(hex), onPaper, whiteOn, scale: Object.fromEntries([50, 100, 200, 400, 500, 600, 700, 800].map(s => [s, val(`--${e}-${s}`, {})])) };
});

const nFix = Object.keys(fixes.light).length + Object.keys(fixes.dark).length;

/* ───────────────────────── 3. 输出 tokens.css ───────────────────────── */
const FONT_IMPORTS = [...C.raw['tokens/fonts.css'].matchAll(/@import\s+url\("([^"]+)"\);/g)].map(m => m[0]);
let css = `/* ============================================================
   tokens.css · 源裕兴设计系统全典 V${VERSION} · ${EDITION}
   由 build/build.mjs 从 design-canvas/tokens/*.css 生成 —— 画布是唯一权威。
   本文件 = 画布令牌原文（12 个文件按 styles.css 顺序内联）+ 门禁修正块。
   实测 ${checks.length} 项对比度，${nFix} 项按 OKLCH 明度算法抬升至 WCAG 2.2 AA。
   请勿手改：改画布，再重跑构建。
   ============================================================ */
${FONT_IMPORTS.join('\n')}

`;
for (const f of C.order) {
  const body = C.raw[f].replace(/@import\s+url\("[^"]+"\);\s*/g, '');
  css += `/* ==== design-canvas/${f} ==== */\n${body.trim()}\n\n`;
}
if (nFix) {
  css += `/* ============================================================\n   门禁修正 · Accessibility Gate Overrides\n   画布色值在下列角色上未达 WCAG 2.2 AA。修正只动 OKLCH 明度，保留色相与色度，\n   取满足阈值的最近一档。每条都在治理章 G.9 有记录。\n   ============================================================ */\n`;
  const emit = (sel, map, scheme) => {
    if (!Object.keys(map).length) return;
    css += `${sel} {\n`;
    for (const [k, v] of Object.entries(map)) {
      const c = checks.find(x => x.scheme === scheme && x.fg === k && x.fixed);
      css += `  ${k}: ${v};  /* ${c.before}:1 → ${c.after}:1（需 ≥${c.min}） */\n`;
    }
    css += `}\n`;
  };
  emit(':root', fixes.light, 'light');
  emit('[data-color-scheme="dark"]', fixes.dark, 'dark');
}
if (!REPORT_ONLY) fs.writeFileSync(path.join(DIST, 'tokens.css'), css);

/* ───────────────────────── 4. 解析后的令牌 JSON ───────────────────────── */
const R = makeResolver({
  base: { ...C.base, ...fixes.light },
  themes: C.themes,
  dark: { ...C.dark, ...fixes.dark },
});
const resolveAll = scope => Object.fromEntries(
  [...new Set([...Object.keys(C.base), ...Object.keys(C.dark)])].sort()
    .map(k => { try { return [k, R(`var(${k})`, scope)]; } catch { return [k, null]; } })
    .filter(([, v]) => v !== null)
);
const SEMANTIC_RE = /^--(surface-|text-|border-(subtle|default|strong|brand|inverse)|state-|focus-ring|scrim|hairline$|seal$)/;
const COMPONENT_RE = /^--(btn-|field-|card-|table-|overlay-|tooltip-)/;
const bucket = k => COMPONENT_RE.test(k) ? 'component' : SEMANTIC_RE.test(k) ? 'semantic' : 'primitive';
const counts = (() => {
  const c = { primitive: 0, semantic: 0, component: 0 };
  for (const k of Object.keys(C.base)) c[bucket(k)]++;
  const themed = Object.values(C.themes).reduce((n, m) => n + Object.keys(m).length, 0);
  const dark = Object.keys(C.dark).length;
  return { ...c, themed, dark, total: c.primitive + c.semantic + c.component + themed + dark, files: C.order.length, fixes: nFix };
})();
const resolved = {
  $name: '源裕兴设计系统全典 · Design Tokens',
  $version: VERSION, $edition: EDITION,
  $authority: 'design-canvas/tokens/*.css（Claude Design b6947ee9）· 本文件为构建产物，勿手改',
  builtAt: new Date().toISOString(),
  counts, entity: matrix, checks, fixes,
  light: resolveAll({ theme: 'stg', scheme: 'light' }),
  dark: resolveAll({ theme: 'stg', scheme: 'dark' }),
};
if (!REPORT_ONLY) fs.writeFileSync(path.join(DIST, 'tokens.resolved.json'), JSON.stringify(resolved, null, 2));

if (REPORT_ONLY) {
  console.log(`\n源裕兴设计系统全典 V${VERSION} · 令牌门禁报告\n`);
  console.log('五实体锚点（600 档）');
  matrix.forEach(m => console.log(`  ${m.entity.toUpperCase()} ${m.cn.padEnd(4)} ${m.hex} ${m.oklch.padEnd(26)} 对宣纸 ${String(m.onPaper).padStart(5)}:1  白字其上 ${String(m.whiteOn).padStart(5)}:1`));
  console.log('\n对比度实测');
  for (const c of checks) console.log(`  ${c.scheme.padEnd(5)} ${c.name.padEnd(20)} ${String(c.before).padStart(6)}:1${c.fixed ? ` → ${String(c.after).padStart(6)}:1  修正 ${c.fixed}` : ''}  ${c.pass ? '通过' : '未通过'}`);
  console.log(`\n合计 ${checks.length} 项，门禁修正 ${nFix} 项。`);
  process.exit(0);
}
/* ───────────────────────── 5. 装配 HTML ───────────────────────── */
/* V39「墨经光纬」：真·多页面站点（每章一份 HTML，跨文档 View Transition）
   + 单文件全典 artifact.html（hash 路由，供 Artifact / 离线分发）。 */
const read = f => fs.readFileSync(f, 'utf8');
const cssFiles = fs.readdirSync(path.join(SRC, 'css')).filter(f => f.endsWith('.css')).sort();
const jsFiles = fs.readdirSync(path.join(SRC, 'js')).filter(f => f.endsWith('.js')).sort();

const ROUTES = [
  { path: 'home',       file: '01-home.html',       nav: '首页',   num: '00', en: 'Index',                 title: '源裕兴设计系统全典', short: '首页' },
  { path: 'tokens',     file: '02-tokens.html',     nav: '令牌',   num: 'L0', en: 'Design Tokens',         title: '设计令牌：亚原子层', short: '令牌' },
  { path: 'atoms',      file: '03-atoms.html',      nav: '原子',   num: 'L1', en: 'Atoms',                 title: '原子：不可再分的功能单元', short: '原子' },
  { path: 'molecules',  file: '04-molecules.html',  nav: '分子',   num: 'L2', en: 'Molecules',             title: '分子：原子的最小有意义组合', short: '分子' },
  { path: 'organisms',  file: '05-organisms.html',  nav: '有机体', num: 'L3', en: 'Organisms',             title: '有机体：可独立运作的界面区块', short: '有机体' },
  { path: 'templates',  file: '06-templates.html',  nav: '模板',   num: 'L4', en: 'Templates',             title: '模板：只定结构，不含内容', short: '模板', wide: true },
  { path: 'pages',      file: '07-pages.html',      nav: '页面',   num: 'L5', en: 'Pages · Five Entities', title: '页面：五实体，一套语法', short: '页面', wide: true },
  { path: 'motion',     file: '10-motion.html',     nav: '动效',   num: 'M',  en: 'Motion & Interaction',  title: '动效：编排、缓动与连续', short: '动效' },
  { path: 'governance', file: '08-governance.html', nav: '治理',   num: 'G',  en: 'Governance',            title: '治理：让系统在生长中不漂移', short: '治理' },
];
const fileOf = p => (p === 'home' ? 'index.html' : `${p}.html`);
const routeHtml = Object.fromEntries(ROUTES.map(r => [r.path, read(path.join(SRC, 'partials', r.file))]));

/* 锚点映射：id → 路由 */
const idRoute = {};
for (const r of ROUTES) for (const m of routeHtml[r.path].matchAll(/\sid="([^"]+)"/g)) idRoute[m[1]] = r.path;

/* 搜索索引：章 + 小节（供 ⌘K 跨页检索） */
const SEARCH = [];
for (const r of ROUTES) {
  SEARCH.push({ r: r.path, id: '', n: r.num, t: r.title, k: '章节' });
  for (const m of routeHtml[r.path].matchAll(/<div class="cx-sub" id="([^"]+)">\s*<span class="cx-sub__n">([^<]*)<\/span>\s*<h3 class="cx-sub__t">([^<]*)<\/h3>(?:\s*<span class="cx-sub__d">([^<]*)<\/span>)?/g))
    SEARCH.push({ r: r.path, id: m[1], n: m[2], t: m[3], d: m[4] || '', k: '小节' });
}

/* 第一遍：把章内裸锚点 href="#id" 归一为 href="#/route/id" */
const normAnchors = html => html.replace(/(<a\b[^>]*?\s)href="#([^"/][^"]*)"/g, (all, pre, id) => {
  if (ROUTES.some(r => r.path === id)) return `${pre}href="#/${id}"`;
  const r = idRoute[id]; if (!r) return `${pre}href="#/"`;
  return r === 'home' ? `${pre}href="#/home/${id}"` : `${pre}href="#/${r}/${id}"`;
});
/* 第二遍（仅多页面）：#/route/id → route.html#id；同页锚点保持纯 hash，走平滑滚动不重载 */
const toMpaLinks = (html, self) => html
  .replace(/href="#\/([a-z-]+)\/([^"]+)"/g, (_, r, id) => (r === self ? `href="#${id}"` : `href="${fileOf(r)}#${id}"`))
  .replace(/href="#\/([a-z-]+)"/g, (_, r) => (r === self ? 'href="#top"' : `href="${fileOf(r)}"`))
  .replace(/href="#\/"/g, self === 'home' ? 'href="#top"' : 'href="index.html"');

/* ── 图标迁移：自绘 SVG sprite → Material Symbols Rounded ──
   画布准则：图标只来自 Material Symbols Rounded，经统一入口渲染；
   品牌资产只有 SINOTAO 字标，没有 logomark —— 不得自造图形标志。 */
const ICONS = {
  search: 'search', menu: 'menu', x: 'close', 'chevron-down': 'expand_more', 'chevron-right': 'chevron_right',
  'chevron-left': 'chevron_left', 'chevron-up': 'expand_less', 'arrow-right': 'arrow_forward',
  'arrow-up-right': 'north_east', 'arrow-down-right': 'south_east', 'arrow-down': 'arrow_downward',
  check: 'check', 'check-circle': 'check_circle', 'x-circle': 'cancel', alert: 'warning', info: 'info',
  plus: 'add', minus: 'remove', edit: 'edit', trash: 'delete', filter: 'filter_alt', sort: 'swap_vert',
  download: 'download', upload: 'upload', bell: 'notifications', settings: 'settings', user: 'person',
  home: 'home', dashboard: 'dashboard', table: 'table_chart', chart: 'bar_chart', doc: 'description',
  calendar: 'calendar_month', mail: 'mail', copy: 'content_copy', external: 'open_in_new',
  sun: 'light_mode', moon: 'dark_mode', monitor: 'computer', palette: 'palette', layers: 'layers',
  atom: 'hub', grid: 'grid_on', eye: 'visibility', lock: 'lock', refresh: 'refresh', more: 'more_horiz',
  code: 'code', book: 'menu_book', leaf: 'eco', ship: 'directions_boat', heart: 'favorite', cap: 'school',
  building: 'apartment', flame: 'local_fire_department', globe: 'public', shield: 'verified_user',
  sparkles: 'auto_awesome', send: 'send', keyboard: 'keyboard', seal: 'approval', flask: 'science',
  pill: 'medication', truck: 'local_shipping', clock: 'schedule',
  'taiji-full': 'motion_photos_on', 'taiji-dot': 'radio_button_checked', 'taiji-flow': 'waves', 'taiji-spin': 'rotate_right',
};
const WORDMARK = (() => {
  const raw = read(path.join(CANVAS, 'assets', 'logo-sinotao-current.svg'));
  const inner = raw.replace(/<metadata>[\s\S]*?<\/metadata>/g, '').replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  return `<svg class="a-logo__mark" viewBox="0 0 399.6 127.2" role="img" aria-label="SINOTAO 源裕兴">${inner}</svg>`;
})();
function transformIcons(html) {
  /* 字标：替换自绘 logomark 为唯一品牌资产 */
  html = html.replace(/<svg class="a-logo__mark"[^>]*>\s*<use href="#i-mark"\s*\/?>\s*<\/svg>/g, WORDMARK);
  /* 空状态插画位：画布明确「33+ 幅品牌插画完全缺失，空状态用 Material Symbols 圆底图标占位」 */
  html = html.replace(/<svg class="m-empty__art"[^>]*>\s*<use href="#i-[a-z0-9-]+"\s*\/?>\s*<\/svg>/g,
    '<span class="m-empty__art a-icon" aria-hidden="true" translate="no">inbox</span>');
  /* 图标：<svg class="a-icon …"><use href="#i-x"/></svg> → Material Symbols 连字 */
  html = html.replace(/<svg class="([^"]*a-icon[^"]*)"[^>]*>\s*<use href="#i-([a-z0-9-]+)"\s*\/?>\s*<\/svg>/g, (all, cls, id) => {
    const name = ICONS[id];
    if (!name) throw new Error('未映射的图标：#i-' + id);
    return `<span class="${cls}" aria-hidden="true" translate="no">${name}</span>`;
  });
  /* 移除自绘 sprite（画布：没有品牌图标集） */
  html = html.replace(/<svg width="0" height="0"[\s\S]*?<\/defs>\s*<\/svg>\s*/g, '');
  /* 兜底：任何残留的 <use href="#i-…"> 都是遗漏 */
  const left = html.match(/<use href="#i-[a-z0-9-]+"/);
  if (left) throw new Error('仍有未迁移的图标引用：' + left[0]);
  return html;
}

const PHI = { shouzheng: '守正', kaiwu: '开物', gongsheng: '共生' };

/* ── 每章正文：封面（编辑式）+ 内容 + 章节导航 ── */
const ARTICLE = {};
ROUTES.forEach((r, i) => {
  let html = routeHtml[r.path];
  let cover = '';
  if (r.path !== 'home') {
    const head = html.match(/<div class="cx-head">[\s\S]*?<div class="cx-head__phi">([\s\S]*?)<\/div>\s*<\/div>/);
    const lead = (html.match(/<p class="cx-head__lead"[^>]*>([\s\S]*?)<\/p>/) || [])[1] || '';
    const phis = head ? [...head[1].matchAll(/m-phi__tag--(\w+)/g)].map(m => m[1]) : [];
    html = head ? html.replace(head[0], '') : html;
    const layer = r.num === 'G' ? 'GOVERNANCE' : r.num === 'M' ? 'MOTION' : 'LAYER ' + r.num.slice(1);
    cover = `<header class="cover" id="top">
  <div class="cover__in wrap">
    <div class="cover__rail" aria-hidden="true"><span class="cover__num">${r.num}</span><span class="cover__vline"></span><span class="cover__layer">${layer}</span></div>
    <div class="cover__body">
      <div class="cover__meta"><span class="t-overline">${r.en}</span><span class="cover__dot"></span><span class="t-overline">第 ${i} 章 / 共 ${ROUTES.length - 1} 章</span></div>
      <h1 class="cover__title" data-split="line">${r.title}</h1>
      <p class="cover__lead rv" data-rv-d="2">${lead}</p>
      <div class="cover__phi rv" data-rv-d="3">${phis.map(p => `<span class="m-phi__tag m-phi__tag--${p}">${PHI[p]}</span>`).join('')}</div>
    </div>
    <div class="cover__idxwrap rv" data-rv-d="4"><div class="cover__idxlabel"><span class="t-overline">本章目录</span><span class="cover__idxcount" data-idx-count></span></div><div class="cover__index" data-toc-inline></div></div>
  </div>
  <a class="cover__scroll" href="#chapter" aria-label="向下阅读"><span class="cover__scrollbar"><i></i></span><span>SCROLL</span></a>
</header>`;
  }
  const prev = ROUTES[i - 1], next = ROUTES[i + 1];
  const chapLink = (rt, kind, cls) => rt
    ? `<a class="chapnav__link chapnav__link--${cls}" href="#/${rt.path === 'home' ? '' : rt.path}"><span class="chapnav__k">${kind}</span><span class="chapnav__n">${rt.num}</span><span class="chapnav__t">${rt.title}</span><svg class="a-icon chapnav__ico"><use href="#i-arrow-${cls === 'prev' ? 'right' : 'right'}"/></svg></a>`
    : '<span></span>';
  const chap = r.path === 'home' ? '' : `<nav class="chapnav" aria-label="章节导航">${chapLink(prev, '上一章', 'prev')}${chapLink(next, '下一章', 'next')}</nav>`;
  const inner = r.path === 'home'
    ? html
    : `${cover}<div class="cx-wrap${r.wide ? ' cx-wrap--wide' : ''}" id="chapter"><div class="cx-content">${html}</div>${r.wide ? '' : '<aside class="toc" aria-label="本章目录"><div class="toc__inner"><div class="toc__label"><span class="t-overline">本章</span><span class="toc__prog"><i data-toc-prog></i></span></div><nav class="toc__list" data-toc></nav><a class="toc__top" href="#top"><svg class="a-icon"><use href="#i-chevron-up"/></svg>回到章首</a></div></aside>'}</div>${chap}`;
  const inner2 = transformIcons(inner);
  ARTICLE[r.path] = `<article class="route" data-route="${r.path}" data-num="${r.num}" data-title="${r.title}">\n${inner2}\n</article>\n`;
});

/* ── 站点外壳（导航由 ROUTES 生成，保持唯一可信源） ── */
const navLinks = ROUTES.filter(r => r.path !== 'home')
  .map(r => `<a class="site-nav__link" href="#/${r.path}" data-nav="${r.path}"><i>${r.num}</i><span>${r.nav}</span></a>`).join('');
const sheetLinks = ROUTES
  .map(r => `<a class="nav-sheet__link" href="#/${r.path === 'home' ? '' : r.path}" data-nav="${r.path}"><i>${r.num}</i><span class="nav-sheet__t">${r.path === 'home' ? '首页' : r.title}</span><span class="nav-sheet__en">${r.en}</span><svg class="a-icon"><use href="#i-arrow-right"/></svg></a>`).join('');
const footLinks = ROUTES.filter(r => r.path !== 'home')
  .map(r => `<a href="#/${r.path}">${r.num} ${r.nav}</a>`).join('');
let shellOpen = transformIcons(read(path.join(SRC, 'partials', '00-shell-open.html')))
  .replace('<!-- @nav -->', navLinks).replace('<!-- @nav-sheet -->', sheetLinks);
let shellClose = transformIcons(read(path.join(SRC, 'partials', '09-shell-close.html'))).replace('<!-- @nav-foot -->', footLinks);

/* ── 资产钩子：标准 LOGO 与品牌影像（存在即内联） ── */
const assetDir = path.join(SRC, 'assets');
const logoFile = ['logo.svg'].map(f => path.join(assetDir, f)).find(f => fs.existsSync(f));
if (logoFile) {
  const svg = read(logoFile); const vb = (svg.match(/viewBox="([^"]+)"/) || [, '0 0 32 32'])[1];
  const innerSvg = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  shellOpen = shellOpen.replace(/<symbol id="i-mark" viewBox="[^"]+">[\s\S]*?<\/symbol>/, `<symbol id="i-mark" viewBox="${vb}">${innerSvg}</symbol>`);
  console.log('✔ 已内联标准 LOGO：' + path.basename(logoFile));
}
const heroFile = [path.join(CANVAS, 'assets', 'imagery', 'biomass-plant-aerial.jpg'),
  ...['hero.jpg', 'hero.jpeg', 'hero.png', 'hero.webp'].map(f => path.join(assetDir, f))].find(f => fs.existsSync(f));
const heroHtml = heroFile
  ? `<figure class="hm-photo rv"><img src="data:image/${path.extname(heroFile).slice(1).replace('jpg', 'jpeg')};base64,${fs.readFileSync(heroFile).toString('base64')}" alt="九派国有能源赤湖工业园航拍：生物质热电联产设施与农田、林地、光伏阵列共处一景（画布标注为 AI 生成示意图）" loading="lazy"><figcaption><span class="t-overline">Brand Imagery</span><span>影像语言：纪实 · 人文 · 自然光 · 低饱和。不摆拍、不过度修图、不用绿色滤镜美化。当前仅此一张影像资产，需补充图库。</span></figcaption></figure>`
  : '';
if (heroFile) console.log('✔ 已内联品牌影像：' + path.basename(heroFile));
ARTICLE.home = ARTICLE.home.replace('<!-- @asset:hero -->', heroHtml);

/* ───────────────────────── 生成器占位符（全部由画布令牌实时生成） ───────────────────────── */
const L = s => val(s, { theme: 'stg', scheme: 'light' });
const D = s => val(s, { theme: 'stg', scheme: 'dark' });
const num = (a, b) => r2(contrast(flatten(a, b), b));
const verdict = (v, min) => v >= (min === AA_UI ? AA_UI : AA)
  ? '<span class="ok">通过</span>' : '<span class="bad">未通过</span>';
const INK_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const INK_CN = { 50: '宣', 100: '轻霜', 200: '薄雾', 300: '淡烟', 400: '古绢', 500: '中灰', 600: '砚灰', 700: '墨灰', 800: '浓墨', 900: '玄墨', 950: '焦墨' };
const INK_ROLE = { 50: '页面底 surface-page · 暗色标题', 100: '轻霜 · surface-sunken', 200: '薄雾 · border-subtle 细线', 300: '淡烟 · border-default 描边', 400: '古绢 · 占位符', 500: '中灰 · text-subtle', 600: '砚灰 · text-muted', 700: '墨灰 · text-body 正文', 800: '浓墨 · 主按钮 hover', 900: '玄墨 · text-heading 标题与主操作', 950: '焦墨 · 暗色页面底' };
const ENT_STEPS = [50, 100, 200, 400, 500, 600, 700, 800];
const swatch = (tokenName, hex, step, anchor, cn) =>
  `<button class="swatch${anchor ? ' swatch--anchor' : ''}" type="button" style="--sw:${hex}" data-copy="${tokenName}" title="${tokenName} ${hex}"><span class="swatch__chip"></span><span class="swatch__step">${step}</span><span class="swatch__hex mono">${hex.slice(1)}</span>${cn ? `<span class="swatch__cn">${cn}</span>` : ''}</button>`;

const gen = {
  'version': () => VERSION,
  'edition': () => EDITION,
  'build-date': () => new Date().toISOString().slice(0, 10),
  'token-count': () => String(counts.total),
  'token-count-primitive': () => String(counts.primitive),
  'token-count-semantic': () => String(counts.semantic),
  'token-count-component': () => String(counts.component),
  'component-token-count': () => '34',
  'gate-count': () => String(checks.length),
  'fix-count': () => String(nFix),

  'entity-scales': () => matrix.map(m => `<div class="scale" data-entity="${m.entity}">
  <div class="scale__head"><span class="scale__code">${m.entity.toUpperCase()}</span><span class="scale__name">${m.cn}</span><span class="scale__anchor mono">${m.hex} · ${m.oklch}</span><span class="scale__note">${m.full} · ${m.role}</span></div>
  <div class="scale__row scale__row--8">${ENT_STEPS.map(s => swatch(`--${m.entity}-${s}`, m.scale[s], s, s === 600)).join('')}</div>
</div>`).join('\n'),

  'gold-scale': () => `<div class="scale" data-entity="gold">
  <div class="scale__head"><span class="scale__code">GOLD</span><span class="scale__name">古铜金</span><span class="scale__anchor mono">${L('--gold-400')} · ${fmtOklch(L('--gold-400'))}</span><span class="scale__note">去橙留灰 —— 箔金而非镀金。每屏最多一处</span></div>
  <div class="scale__row scale__row--5">${[200, 300, 400, 500, 600].map(s => swatch(`--gold-${s}`, L(`--gold-${s}`), s, s === 400)).join('')}</div>
</div>
<div class="scale" data-entity="zhu">
  <div class="scale__head"><span class="scale__code">ZHU</span><span class="scale__name">印章朱</span><span class="scale__anchor mono">${L('--zhu-600')} · ${fmtOklch(L('--zhu-600'))}</span><span class="scale__note">取自印泥与官式朱。全站唯一重点色，每章一枚</span></div>
  <div class="scale__row scale__row--7">${[50, 100, 200, 400, 600, 700, 800].map(s => swatch(`--zhu-${s}`, L(`--zhu-${s}`), s, s === 600)).join('')}</div>
</div>`,

  'ink-scale': () => `<div class="scale" data-entity="ink">
  <div class="scale__head"><span class="scale__code">INK</span><span class="scale__name">宣纸墨色十一阶</span><span class="scale__anchor mono">Ink 50 宣 → Ink 950 焦墨</span><span class="scale__note">暖炭灰。绝不用纯黑 #000 或纯白 #FFF 作文字与页面底</span></div>
  <div class="scale__row scale__row--11">${INK_STEPS.map(s => swatch(`--ink-${s}`, L(`--ink-${s}`), s, false, INK_CN[s])).join('')}</div>
</div>`,

  'contrast-matrix': () => `<table class="a-table a-table--data"><thead><tr><th>实体</th><th>矿物色</th><th>600 档</th><th>OKLCH</th><th class="num">对宣纸底</th><th class="num">白字其上</th><th>业务</th></tr></thead><tbody>${matrix.map(m => `<tr><td><span class="dot" style="--sw:${m.hex}"></span>${m.entity.toUpperCase()}</td><td>${m.cn}</td><td class="mono">${m.hex}</td><td class="mono muted">${m.oklch}</td><td class="num">${m.onPaper.toFixed(2)}:1 <span class="ok">≥8</span></td><td class="num">${m.whiteOn.toFixed(2)}:1 <span class="ok">AA</span></td><td class="muted">${m.role}</td></tr>`).join('')}</tbody></table>`,

  'semantic-checks': () => `<table class="a-table a-table--data a-table--dense"><thead><tr><th>角色</th><th>模式</th><th>前景 / 背景</th><th class="num">要求</th><th class="num">画布实测</th><th class="num">门禁后</th><th>结论</th></tr></thead><tbody>${checks.map(c => `<tr><td>${c.name}</td><td class="mono">${c.scheme === 'dark' ? '暗色' : '浅色'}</td><td class="mono muted">${c.fg} / ${c.bg}</td><td class="num">≥ ${c.min}:1</td><td class="num${c.fixed ? ' bad' : ''}">${c.before.toFixed(2)}:1</td><td class="num">${c.fixed ? `<b>${c.after.toFixed(2)}:1</b>` : '—'}</td><td>${c.fixed ? `<span class="warn">已修正</span> <code>${c.fixed}</code>` : verdict(c.before, c.min)}</td></tr>`).join('')}</tbody></table>`,

  'type-scale': () => {
    const ROLES_T = [
      ['display-2xl', 'display', '首页主标题 · 全站唯一之锋'], ['display-xl', 'display', '章节封面'], ['display-l', 'display', '区块主标题'],
      ['display-m', 'display', '次级展示'], ['display-s', 'display', '小型展示标题'],
      ['h1', 'display', '页面标题'], ['h2', 'display', '章标题'], ['h3', 'display', '节标题 · 面板标题'],
      ['h4', 'sans', '子区块（转界面黑体）'], ['h5', 'sans', '卡片标题'], ['h6', 'sans', '小标题'],
      ['body-l', 'sans', '正文阅读'], ['body-m', 'sans', '界面文字'], ['body-s', 'sans', '辅助文字'],
      ['caption', 'sans', '标签 · 说明'], ['caption-xs', 'western', '眼标 · 法律文本'], ['code', 'mono', '代码 / Token'],
    ];
    const sample = px => px >= 60 ? '守正开物' : px >= 24 ? '守正 · 开物 · 共生' : '源裕兴不是既有体系的中文皮肤，它是第三条路。Sinotao 2026';
    return ROLES_T.map(([k, fam, use]) => {
      const size = L(`--fs-${k}`), lh = L(`--lh-${k}`), ls = L(`--ls-${k}`);
      const px = parseFloat(size);
      return `<div class="type-row" data-role="${k}"><div class="type-row__meta"><span class="mono">--fs-${k}</span><span>${size} · ${lh} · ${ls} · ${fam}</span><span class="muted">${use}</span></div><div class="type-row__specimen" style="font-family:var(--font-${fam});font-size:${size};line-height:${lh};letter-spacing:${ls};font-weight:${px >= 42 ? 200 : px >= 24 ? 300 : 400}">${sample(px)}</div></div>`;
    }).join('\n');
  },

  'space-scale': () => Array.from({ length: 14 }, (_, i) => i).map(i => {
    const v = L(`--space-${i}`); if (!v) return '';
    return `<div class="space-row"><span class="mono">--space-${i}</span><span class="space-row__bar" style="width:${v}"></span><span class="num mono">${v}</span></div>`;
  }).filter(Boolean).join('\n'),

  'radius-scale': () => [['xs', '标签内层'], ['sm', '标签 · 徽标'], ['md', '产品按钮 · 输入框'], ['lg', '下拉 · 气泡 · 导航项'], ['xl', '卡片 · 弹窗'], ['2xl', '大面板'], ['full', '营销 CTA · 状态点 · 头像']]
    .map(([k, use]) => `<div class="radius-item"><span class="radius-item__box" style="border-radius:${L(`--radius-${k}`)}"></span><span class="mono">--radius-${k}</span><span class="muted">${L(`--radius-${k}`)}</span><span class="radius-item__use">${use}</span></div>`).join('\n'),

  'shadow-scale': () => ['none', 'xs', 'sm', 'md', 'lg', 'xl'].map(k => `<div class="shadow-item"><span class="shadow-item__box" style="box-shadow:${L(`--shadow-${k}`)}"></span><span class="mono">--shadow-${k}</span></div>`).join('\n'),

  'motion-table': () => {
    const DUR = { instant: '即时反馈（按压形变）', micro: '微交互（hover · 图标切换）', transition: '页面过渡 · 弹层', narrative: '叙事入场（Reveal · RuleReveal）', loop: '无限循环（走马灯 · Loading）' };
    const EASE = { standard: '通用中性', emphasized: '页面过渡 · 品牌缓动', out: '进场减速到位', in: '退场果断加速', brush: '落笔 —— 起笔重、收笔轻' };
    return `<table class="a-table a-table--data a-table--dense"><thead><tr><th>Token</th><th>值</th><th>用途</th></tr></thead><tbody>${
      Object.entries(DUR).map(([k, u]) => `<tr><td class="mono">--dur-${k}</td><td class="mono">${L(`--dur-${k}`)}</td><td>${u}</td></tr>`).join('')
    }${Object.entries(EASE).map(([k, u]) => `<tr><td class="mono">--ease-${k}</td><td class="mono">${L(`--ease-${k}`)}</td><td>${u}</td></tr>`).join('')}</tbody></table>`;
  },

  'breakpoint-table': () => {
    const BP = [['xs', '< 600px', 4, '16px', '16px', '手机竖屏'], ['sm', '600–904px', 8, '16px', '24px', '手机横屏 / 小平板'], ['md', '905–1239px', 12, '24px', '32px', '平板 / 小笔记本'], ['lg', '1240–1439px', 12, '24px', '40px', '桌面显示器'], ['xl', '≥ 1440px', 12, '24px', 'auto', '大屏（内容区 1200px / 大屏 1440px）']];
    return `<table class="a-table a-table--data"><thead><tr><th>断点</th><th>屏幕宽度</th><th class="num">列数</th><th class="num">槽宽</th><th class="num">边距</th><th>典型设备</th></tr></thead><tbody>${BP.map(([k, w, c, g, m, d]) => `<tr><td class="mono">${k}</td><td class="num">${w}</td><td class="num">${c}</td><td class="num">${g}</td><td class="num">${m}</td><td>${d}</td></tr>`).join('')}</tbody></table>`;
  },

  'z-table': () => {
    const Z = [['appbar', '64px 粘性顶栏'], ['rail', '76 / 264px 侧轨'], ['drawer', '380px 右侧抽屉'], ['modal', '视口居中 · 最大 86vh'], ['toast', '顶部居中'], ['tooltip', '指针跟随']];
    return `<div class="z-stack">${Z.map(([k, u], i) => `<div class="z-stack__layer"><span class="mono">${k}</span><span class="muted">${u}</span></div>`).join('')}</div>`;
  },

  'ink-table': () => `<table class="a-table a-table--data a-table--dense"><thead><tr><th>Token</th><th>名称</th><th>Hex</th><th>OKLCH</th><th class="num">对宣 Ink 50</th><th class="num">对焦墨 Ink 950</th><th>角色</th></tr></thead><tbody>${INK_STEPS.map(s => {
    const hex = L(`--ink-${s}`);
    return `<tr><td class="mono">--ink-${s}</td><td>${INK_CN[s]}</td><td class="mono">${hex}</td><td class="mono muted">${fmtOklch(hex)}</td><td class="num">${num(hex, L('--ink-50')).toFixed(2)}</td><td class="num">${num(hex, L('--ink-950')).toFixed(2)}</td><td>${INK_ROLE[s]}</td></tr>`;
  }).join('')}</tbody></table>`,

  'dv-scale': () => `<div class="dv-row">${Array.from({ length: 8 }, (_, i) => {
    const t = `--dv-${i + 1}`; const hex = L(t);
    return `<div class="dv-item"><span class="dv-item__chip" style="background:${hex}"></span><span class="mono">${t}</span><span class="num muted">${num(hex, L('--surface-card')).toFixed(2)}:1</span></div>`;
  }).join('')}</div>`,
};
const applyGen = s => s.replace(/<!--\s*@gen:([a-z0-9-]+)\s*-->/g, (_, k) => { if (!gen[k]) throw new Error('未知生成器：' + k); return gen[k](); });

/* ───────────────────────── 6. 输出 ───────────────────────── */
const SITE = '源裕兴设计系统全典';
const DESC = `源裕兴设计系统全典 V${VERSION} · ${EDITION} · 守正 · 开物 · 共生`;
const fontsHref = 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@200..900&family=Noto+Sans+SC:wght@200..700&family=LXGW+WenKai+TC:wght@300;400;700&family=Manrope:wght@200..800&family=JetBrains+Mono:wght@400;500&display=swap';
const FAVICON = `<link rel="icon" href="data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="#1A1612"/><path d="M16 3a6.5 6.5 0 0 1 0 13 6.5 6.5 0 0 0 0 13A13 13 0 0 0 16 3z" fill="#C9A96E"/><circle cx="16" cy="9.5" r="2" fill="#1A1612"/><circle cx="16" cy="22.5" r="2" fill="#C9A96E"/></svg>')}">`;
const fontHead = `<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`;

const styles = css + '\n' + cssFiles.map(f => `/* ==== ${f} ==== */\n` + read(path.join(SRC, 'css', f))).join('\n');
const scripts = `window.SINO_DATA = ${JSON.stringify({ version: VERSION, edition: EDITION, counts, entity: matrix, checks, fixes, search: SEARCH, routes: ROUTES.map(r => ({ path: r.path, num: r.num, nav: r.nav, en: r.en, title: r.title, file: fileOf(r.path) })) })};\n`
  + jsFiles.map(f => `/* ==== ${f} ==== */\n` + read(path.join(SRC, 'js', f))).join('\n');

fs.writeFileSync(path.join(DIST, 'sino.css'), styles);
fs.writeFileSync(path.join(DIST, 'site.js'), scripts);

/* ── 6.1 真·多页面：每章一份独立文档，跨文档 View Transition ── */
const pageDoc = (r, i) => {
  const one = ROUTES.length - 1;
  const bodyHtml = toMpaLinks(applyGen(normAnchors(shellOpen) + normAnchors(ARTICLE[r.path]) + normAnchors(shellClose)), r.path)
    .replace('data-mode="@MODE@"', 'data-mode="mpa"')
    .replace(`data-nav="${r.path}"`, `data-nav="${r.path}" aria-current="page"`);
  const title = r.path === 'home' ? `${SITE} · V${VERSION}` : `${r.num} ${r.title} · ${SITE}`;
  const prev = ROUTES[i - 1], next = ROUTES[i + 1];
  const preload = [prev, next].filter(Boolean).map(x => `<link rel="prefetch" href="${fileOf(x.path)}">`).join('\n');
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${r.path === 'home' ? DESC : r.title + ' —— ' + DESC}">
<meta name="color-scheme" content="dark light">
${fontHead}
<link rel="stylesheet" href="sino.css">
${FAVICON}
${preload}
</head>
<body data-page="${r.path}" data-chapter="${i}" data-chapters="${one}">
${bodyHtml}
<script src="site.js"></script>
</body>
</html>
`;
};
ROUTES.forEach((r, i) => fs.writeFileSync(path.join(DIST, fileOf(r.path)), pageDoc(r, i)));

/* ── 6.2 单文件全典：hash 路由（Artifact / 离线分发） ── */
const spaBody = applyGen(
  normAnchors(shellOpen).replace('data-mode="@MODE@"', 'data-mode="spa"')
  + ROUTES.map(r => normAnchors(ARTICLE[r.path]).replace('<article class="route"', `<article class="route"${r.path === 'home' ? '' : ' hidden'}`)).join('')
  + normAnchors(shellClose)
);
const spaHead = `<title>${SITE}</title>\n${FAVICON}\n<meta name="description" content="${DESC}">\n${fontHead}\n<style>\n${styles}\n</style>\n`;
const artifact = `${spaHead}${spaBody}\n<script>\n${scripts}\n</script>\n`;
fs.writeFileSync(path.join(DIST, 'artifact.html'), artifact);

console.log(`✔ tokens.css  画布 ${C.order.length} 个令牌文件 · ${counts.canvas} 个令牌 · 门禁修正 ${nFix} 项`);
console.log(`✔ 门禁通过：${checks.length} 项对比度实测 + ${ENTITIES.length} 实体锚点（600 档对宣纸底 ≥8:1）`);
console.log(`✔ 多页面站点 ${ROUTES.length} 页：${ROUTES.map(r => fileOf(r.path)).join(' · ')}`);
console.log(`✔ sino.css ${(styles.length / 1024).toFixed(0)} KB · site.js ${(scripts.length / 1024).toFixed(0)} KB · artifact.html ${(artifact.length / 1024).toFixed(0)} KB`);
