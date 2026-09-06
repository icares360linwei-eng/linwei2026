/* ═══════════════════════════════════════════════════════════════════════════
   对比度门禁 —— 以数据守正
   在真实浏览器里实测 2 种明暗 × 5 个实体 × 22 组前景/背景 = 220 项。
   任一项不达标即退出码 1。

     npm i -D playwright     # 仅门禁需要，站点本身零依赖
     node build/audit.mjs

   为什么必须实测而不是查表：暗色的 --brand-600 是 color-mix(in oklch,…)，
   五实体各不相同；只有让浏览器算完、再把像素读回来，数字才作数。
   ═══════════════════════════════════════════════════════════════════════════ */
import path from 'node:path';
import { fileURLToPath } from 'node:url';

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('缺少 playwright。安装后重试：npm i -D playwright');
  process.exit(2);
}

const here = path.dirname(fileURLToPath(import.meta.url));
const target = 'file://' + path.join(here, '..', 'volume-2.html');

/* [名称, 前景令牌, 背景令牌, 最低对比度] */
const PAIRS = [
  ['正文', '--text-body', '--surface-page', 4.5],
  ['正文 · 面板上', '--text-body', '--surface-card', 4.5],
  ['标题', '--text-heading', '--surface-page', 4.5],
  ['次文', '--text-muted', '--surface-page', 4.5],
  ['三级文', '--text-subtle', '--surface-page', 4.5],
  ['占位符', '--field-placeholder', '--surface-card', 4.5],
  ['品牌文字', '--text-brand', '--surface-page', 4.5],
  ['链接', '--text-link', '--surface-page', 4.5],
  ['金色文字', '--text-gold', '--surface-page', 4.5],
  ['印章朱', '--seal', '--surface-page', 3.0],
  ['状态 · 达标', '--status-success', '--surface-page', 4.5],
  ['状态 · 临界', '--status-warning', '--surface-page', 4.5],
  ['状态 · 超限', '--status-error', '--surface-page', 4.5],
  ['状态 · 提示', '--status-info', '--surface-page', 4.5],
  ['主操作 字/底', '--btn-primary-fg', '--btn-primary-bg', 4.5],
  ['on-brand / brand-600', '--on-brand', '--brand-600', 4.5],
  ['on-gold / gold-400', '--on-gold', '--gold-400', 4.5],
  ['默认描边', '--border-default', '--surface-page', 1.4],
  ['量表轨 / 面板', '--rail', '--surface-card', 1.15],
  ['基线 / 面板', '--chart-baseline', '--surface-card', 1.15],
  ['图表首序列', '--chart-s1', '--surface-card', 3.0],
  ['图表对比序列', '--chart-muted', '--surface-card', 1.4]
];

// CI 或预装浏览器的环境用 PW_CHROMIUM_PATH 指定可执行文件；否则走 playwright 自带
const browser = await chromium.launch(
  process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {}
);
const page = await browser.newPage();
await page.route('**://fonts.g**', r => r.abort());   // 门禁不需要字体
await page.goto(target, { waitUntil: 'domcontentloaded' });

const report = await page.evaluate((PAIRS) => {
  const root = document.documentElement;
  // 用画布回读真实像素 —— computed color 可能是 oklch()/color-mix()，不能靠正则拆
  const cv = document.createElement('canvas');
  cv.width = cv.height = 1;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  function rgb(css) {
    const probe = document.createElement('span');
    probe.style.color = css;
    document.body.appendChild(probe);
    const c = getComputedStyle(probe).color;
    probe.remove();
    cx.fillStyle = '#000';
    cx.fillStyle = c;
    cx.fillRect(0, 0, 1, 1);
    const d = cx.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2]];
  }
  const lum = ([r, g, b]) => {
    const f = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const ratio = (a, b) => {
    const L1 = lum(a), L2 = lum(b);
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  };
  const out = [];
  for (const scheme of ['light', 'dark']) {
    root.setAttribute('data-color-scheme', scheme);
    for (const theme of ['stg', 'ste', 'sti', 'sth', 'edu']) {
      root.setAttribute('data-theme', theme);
      const cs = getComputedStyle(root);
      for (const [name, fg, bg, min] of PAIRS) {
        const f = cs.getPropertyValue(fg).trim();
        const b = cs.getPropertyValue(bg).trim();
        if (!f || !b) { out.push({ scheme, theme, name, min, r: null }); continue; }
        const r = Math.round(ratio(rgb(f), rgb(b)) * 100) / 100;
        out.push({ scheme, theme, name, min, r, pass: r >= min });
      }
    }
  }
  return out;
}, PAIRS);

await browser.close();

const fails = report.filter(x => x.r === null || !x.pass);
const body = report.filter(x => x.name === '正文').map(x => x.r);

console.log(`对比度门禁 · ${report.length} 项实测（2 明暗 × 5 实体 × ${PAIRS.length} 组）`);
console.log(`正文对比度范围：${Math.min(...body)} – ${Math.max(...body)} : 1\n`);

if (!fails.length) {
  console.log('  ✓ 全部达标');
  process.exit(0);
}

const grouped = {};
for (const f of fails) (grouped[f.name] ||= []).push(`${f.scheme}/${f.theme}=${f.r ?? '未定义'}`);
for (const [name, list] of Object.entries(grouped)) {
  const min = fails.find(f => f.name === name).min;
  console.log(`  ✗ ${name}（需 ≥${min}）  ${list.join('  ')}`);
}
console.log(`\n不达标 ${fails.length} 项。`);
process.exit(1);
