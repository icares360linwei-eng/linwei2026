/**
 * tokens.mjs · 令牌管线（V40）
 * 事实来源倒转：design-canvas/tokens/*.css 是唯一权威，本模块把它解析为可求解的令牌表，
 * 供 build.mjs 做对比度验证与产物生成。不再从锚点推导色阶 —— 画布已完成配色工作。
 */
import fs from 'node:fs';
import path from 'node:path';
import { hexToOklch, oklchToHex, hexToRgb, rgbToHex } from './color.mjs';

const SCOPES = { base: ':root', dark: '[data-color-scheme="dark"]' };
const ENTITIES = ['stg', 'ste', 'sti', 'sth', 'edu'];

/* ── 1. 解析：从 CSS 文本抽出 选择器 → { 变量: 原始值 } ── */
export function parseCss(text) {
  const out = [];
  // 去注释（含 /* @kind ... */ 标记）
  const src = text.replace(/\/\*[\s\S]*?\*\//g, '');
  const re = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = re.exec(src))) {
    const sel = m[1].trim();
    if (!sel || sel.startsWith('@')) continue;
    const decls = {};
    for (const d of m[2].split(';')) {
      const i = d.indexOf(':');
      if (i < 0) continue;
      const k = d.slice(0, i).trim();
      if (!k.startsWith('--')) continue;
      decls[k] = d.slice(i + 1).trim();
    }
    if (Object.keys(decls).length) out.push({ sel, decls });
  }
  return out;
}

/* ── 2. 装载：按 styles.css 的 @import 顺序读入画布令牌 ── */
export function loadCanvas(canvasDir) {
  const entry = fs.readFileSync(path.join(canvasDir, 'styles.css'), 'utf8');
  const files = [...entry.matchAll(/@import\s+url\("([^"]+)"\)/g)].map(m => m[1]);
  const raw = {};            // 文件名 → 原文（用于原样输出）
  const blocks = [];
  for (const f of files) {
    const p = path.join(canvasDir, f);
    const text = fs.readFileSync(p, 'utf8');
    raw[f] = text;
    blocks.push(...parseCss(text));
  }
  /* 分层：:root（基础）· [data-theme=*]（实体）· [data-color-scheme=dark]（暗色） */
  const base = {}, themes = Object.fromEntries(ENTITIES.map(e => [e, {}])), dark = {};
  for (const { sel, decls } of blocks) {
    if (sel === ':root') Object.assign(base, decls);
    else if (/\[data-color-scheme="dark"\]/.test(sel)) Object.assign(dark, decls);
    else {
      const t = sel.match(/\[data-theme="(\w+)"\]/);
      if (t && themes[t[1]]) Object.assign(themes[t[1]], decls);
    }
  }
  return { files, raw, base, themes, dark, order: files };
}

/* ── 3. 求解：展开 var() 与 color-mix()，得到具体值 ── */
const clamp01 = n => Math.min(1, Math.max(0, n));

function mixOklch(aHex, aAlpha, pct, bHex, bAlpha) {
  /* color-mix(in oklch, A p%, B)：CSS 规定按预乘 alpha 插值，L/C 线性、H 走短弧。
     与 transparent 混合时，结果保留另一方的色相，只降 alpha —— 不是向黑色靠。 */
  const wA = clamp01(pct / 100), wB = 1 - wA;
  const alpha = wA * aAlpha + wB * bAlpha;
  if (alpha === 0) return { hex: '#000000', alpha: 0 };
  const kA = (wA * aAlpha) / alpha, kB = (wB * bAlpha) / alpha;
  const A = hexToOklch(aHex), B = hexToOklch(bHex);
  let dh = B.H - A.H;
  if (dh > 180) dh -= 360; if (dh < -180) dh += 360;
  const lch = { L: A.L * kA + B.L * kB, C: A.C * kA + B.C * kB, H: A.H + dh * kB };
  return { hex: oklchToHex(lch), alpha };
}

/* rgba(...) / #hex / transparent → { hex, alpha } */
function toColor(v) {
  const s = v.trim();
  if (s === 'transparent') return { hex: '#000000', alpha: 0 };
  if (/^#[0-9a-f]{6}$/i.test(s)) return { hex: s.toUpperCase(), alpha: 1 };
  if (/^#[0-9a-f]{3}$/i.test(s)) return { hex: ('#' + s.slice(1).split('').map(c => c + c).join('')).toUpperCase(), alpha: 1 };
  const rgba = s.match(/^rgba?\(([^)]+)\)$/i);
  if (rgba) {
    const p = rgba[1].split(',').map(x => parseFloat(x.trim()));
    return { hex: rgbToHex([p[0] / 255, p[1] / 255, p[2] / 255]), alpha: p.length > 3 ? p[3] : 1 };
  }
  return null;
}

export function makeResolver({ base, themes, dark }) {
  /** scope: { theme: 'stg'|…, scheme: 'light'|'dark' } */
  return function resolve(expr, scope = {}, depth = 0) {
    const { theme = 'stg', scheme = 'light' } = scope;
    if (depth > 24) throw new Error('令牌引用过深（疑似循环）：' + expr);
    let s = String(expr).trim();

    /* var(--x[, fallback]) */
    const varM = s.match(/^var\(\s*(--[\w-]+)\s*(?:,([\s\S]*))?\)$/);
    if (varM) {
      const name = varM[1];
      const layered = (scheme === 'dark' ? dark[name] : undefined) ?? themes[theme][name] ?? base[name];
      if (layered === undefined) {
        if (varM[2] !== undefined) return resolve(varM[2], scope, depth + 1);
        throw new Error('未定义令牌：' + name);
      }
      return resolve(layered, scope, depth + 1);
    }

    /* color-mix(in <space>, A p%, B) */
    const mixM = s.match(/^color-mix\(\s*in\s+[\w-]+\s*,([\s\S]+)\)$/);
    if (mixM) {
      const parts = splitTop(mixM[1]);
      if (parts.length !== 2) throw new Error('color-mix 参数异常：' + s);
      const [aRaw, bRaw] = parts;
      const pm = aRaw.match(/(-?[\d.]+)%\s*$/);
      const pct = pm ? parseFloat(pm[1]) : 50;
      const aExpr = pm ? aRaw.slice(0, pm.index).trim() : aRaw.trim();
      const A = asColor(resolve(aExpr, scope, depth + 1));
      const B = asColor(resolve(bRaw.trim(), scope, depth + 1));
      const r = mixOklch(A.hex, A.alpha, pct, B.hex, B.alpha);
      return r.alpha >= 1 ? r.hex : `rgba(${hexToRgb(r.hex).map(c => Math.round(c * 255)).join(',')},${+r.alpha.toFixed(3)})`;
    }

    /* 复合值：如 "1px solid var(--border-subtle)" 或 "0 0 0 3px color-mix(...)" */
    if (s.includes('var(') || s.includes('color-mix(')) {
      let out = s.replace(/var\(\s*(--[\w-]+)\s*\)/g, (_, n) => resolve(`var(${n})`, scope, depth + 1));
      let guard = 0;
      while (out.includes('color-mix(') && guard++ < 8) {
        const i = out.indexOf('color-mix(');
        let d = 0, j = i;
        for (; j < out.length; j++) { if (out[j] === '(') d++; else if (out[j] === ')') { d--; if (!d) break; } }
        const inner = out.slice(i, j + 1);
        const solved = resolve(inner, scope, depth + 1);
        if (solved === inner) break;
        out = out.slice(0, i) + solved + out.slice(j + 1);
      }
      return out;
    }
    return s;
  };
}

/* 顶层逗号切分（不切 括号内 的逗号） */
function splitTop(str) {
  const out = []; let d = 0, cur = '';
  for (const ch of str) {
    if (ch === '(') d++;
    if (ch === ')') d--;
    if (ch === ',' && d === 0) { out.push(cur); cur = ''; continue; }
    cur += ch;
  }
  if (cur.trim()) out.push(cur);
  return out.map(x => x.trim());
}

export function asColor(v) {
  const c = toColor(v);
  if (!c) throw new Error('无法解析为颜色：' + v);
  return c;
}

/* 把带 alpha 的颜色合成到底色上，用于对比度实测 */
export function flatten(fg, bg) {
  const F = asColor(fg), B = asColor(bg);
  if (F.alpha >= 1) return F.hex;
  const f = hexToRgb(F.hex), b = hexToRgb(B.hex);
  return rgbToHex(f.map((c, i) => c * F.alpha + b[i] * (1 - F.alpha)));
}

export { ENTITIES, SCOPES };
