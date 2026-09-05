/**
 * chart-order.mjs · 数据墨色（图表系列色）推导与 CVD 安全顺序枚举
 * 与实体同色相；色度提升到 ≥0.11（低于 0.10 的色相在图表里读作灰）；明度落在各模式色带内。
 * 枚举 6! 种顺序，用 dataviz 验证器（Machado 2009 模拟）取相邻对 ΔE 最小值最大的顺序。
 */
import { oklchToHex, hexToOklch } from './color.mjs';
import { validate } from '/tmp/claude-0/bundled-skills/2.1.261/5c50b38a98f169318d3403e21d8ea732/dataviz/scripts/validate_palette.js';

const anchors = { stg: '#851EA3', gold: '#C9A96E', sti: '#1E4082', ste: '#196B42', edu: '#B81E1E', sth: '#208F9B' };
const plan = {
  light: { stg: [0.50, 0.20], gold: [0.635, 0.12], sti: [0.46, 0.13], ste: [0.52, 0.13], edu: [0.60, 0.19], sth: [0.62, 0.115] },
  dark:  { stg: [0.66, 0.17], gold: [0.62, 0.12], sti: [0.60, 0.13], ste: [0.58, 0.13], edu: [0.66, 0.17], sth: [0.63, 0.115] },
};
const surfaces = { light: '#FFFBF5', dark: '#2D2823' };
const colors = {};
for (const mode of ['light', 'dark']) {
  colors[mode] = {};
  for (const [k, [L, C]] of Object.entries(plan[mode])) {
    const H = hexToOklch(anchors[k]).H;
    colors[mode][k] = oklchToHex({ L, C: Math.max(C, hexToOklch(anchors[k]).C), H });
  }
}
const keys = Object.keys(anchors);
function perms(a) { if (a.length <= 1) return [a]; return a.flatMap((x, i) => perms([...a.slice(0, i), ...a.slice(i + 1)]).map(p => [x, ...p])); }
const worst = (report) => {
  // 从报告细节里提取“最差相邻对 ΔE”
  const row = report.find(r => /CVD/i.test(r[0])); const m = row && String(row[2]).match(/ΔE\s+(\d+(?:\.\d+)?)/); return m ? parseFloat(m[1]) : 0;
};
let best = null;
for (const p of perms(keys)) {
  if (p[0] !== 'stg') continue; // 槽 1 固定为母品牌绛紫（集团为先）
  const rl = validate(p.map(k => colors.light[k]), { mode: 'light', surface: surfaces.light });
  const rd = validate(p.map(k => colors.dark[k]), { mode: 'dark', surface: surfaces.dark });
  if (!rl.ok || !rd.ok) continue;
  const score = Math.min(worst(rl.report), worst(rd.report));
  if (!best || score > best.score) best = { p, score, rl, rd };
}
if (!best) { console.error('没有通过双模式门禁的顺序'); process.exit(1); }
console.log('最佳顺序：', best.p.join(' → '), ' 最差相邻 CVD ΔE =', best.score);
console.log('light:', best.p.map(k => `${k}:${colors.light[k]}`).join(' '));
console.log('dark: ', best.p.map(k => `${k}:${colors.dark[k]}`).join(' '));
import('node:fs').then(fs => fs.writeFileSync(new URL('../tokens/chart-palette.json', import.meta.url), JSON.stringify({ $description: '数据墨色 · 由 build/chart-order.mjs 枚举生成（dataviz 六检验证通过），顺序即 CVD 安全机制，不得手改', order: best.p, light: best.p.map(k => colors.light[k]), dark: best.p.map(k => colors.dark[k]), worstAdjacentCVD: best.score, surfaces }, null, 2)));
console.log('\n[light report]'); console.table(best.rl.report.map(([n, s, d]) => ({ check: n, state: s, detail: d })));
console.log('\n[dark report]'); console.table(best.rd.report.map(([n, s, d]) => ({ check: n, state: s, detail: d })));
