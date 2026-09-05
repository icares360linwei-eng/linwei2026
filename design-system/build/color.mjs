/**
 * color.mjs · 源裕兴设计系统 · 色彩数学（OKLCH ↔ sRGB、WCAG 对比度、色阶推导）
 * 守正：所有推导可复现；锚点原值锁定；每一处对比度都是实测，不是宣称。
 */

export function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(v => v / 255);
}
export function rgbToHex([r, g, b]) {
  const to = v => Math.round(Math.max(0, Math.min(1, v)) * 255).toString(16).padStart(2, '0');
  return ('#' + to(r) + to(g) + to(b)).toUpperCase();
}
const lin = c => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
const gam = c => (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);

export function rgbToOklab([r, g, b]) {
  const [R, G, B] = [lin(r), lin(g), lin(b)];
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  return [
    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s,
  ];
}
export function oklabToLinear([L, a, b]) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  return [
    +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
  ];
}
export function oklabToRgb(lab) { return oklabToLinear(lab).map(gam); }
export function hexToOklch(hex) {
  const [L, a, b] = rgbToOklab(hexToRgb(hex));
  const C = Math.hypot(a, b);
  let H = (Math.atan2(b, a) * 180) / Math.PI; if (H < 0) H += 360;
  return { L, C, H };
}
export function oklchToRgb({ L, C, H }) {
  const h = (H * Math.PI) / 180;
  return oklabToRgb([L, C * Math.cos(h), C * Math.sin(h)]);
}
const inGamut = rgb => rgb.every(v => v >= -0.0005 && v <= 1.0005);
/** 色域映射：保持 L 与 H，收缩 C 直至进入 sRGB */
export function oklchToHex(lch) {
  let { L, C, H } = lch;
  L = Math.max(0, Math.min(1, L));
  let rgb = oklchToRgb({ L, C, H });
  if (!inGamut(rgb)) {
    let lo = 0, hi = C;
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) / 2;
      rgb = oklchToRgb({ L, C: mid, H });
      if (inGamut(rgb)) lo = mid; else hi = mid;
    }
    rgb = oklchToRgb({ L, C: lo, H });
  }
  return rgbToHex(rgb);
}
export function fmtOklch(hex) {
  const { L, C, H } = hexToOklch(hex);
  return `oklch(${(L * 100).toFixed(1)}% ${C.toFixed(3)} ${H.toFixed(0)})`;
}

/* WCAG 2.x 相对亮度与对比度 */
export function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function contrast(a, b) {
  const la = luminance(a), lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}
export const r2 = n => Math.round(n * 100) / 100;

/**
 * 从锚点推导十阶色阶。锚点即 600 阶（原值锁定）。
 * 明度阶梯相对锚点展开：向上趋近 0.975（近宣纸），向下压至 ≈ L-0.21；色度两端收窄，中段饱满。
 */
export function deriveScale(anchorHex) {
  const a = hexToOklch(anchorHex);
  const top = 0.975, bottom = Math.max(0.16, a.L - 0.21);
  const up = t => a.L + (top - a.L) * t;            // t ∈ (0,1]
  const dn = t => a.L - (a.L - bottom) * t;
  const plan = {
    50:  { L: up(0.955), c: 0.16 },
    100: { L: up(0.875), c: 0.30 },
    200: { L: up(0.735), c: 0.52 },
    300: { L: up(0.555), c: 0.76 },
    400: { L: up(0.365), c: 0.92 },
    500: { L: up(0.185), c: 0.99 },
    600: null,
    700: { L: dn(0.34), c: 0.93 },
    800: { L: dn(0.67), c: 0.80 },
    900: { L: dn(1.00), c: 0.62 },
  };
  const out = {};
  for (const [step, p] of Object.entries(plan)) {
    out[step] = p === null ? anchorHex.toUpperCase() : oklchToHex({ L: p.L, C: a.C * p.c, H: a.H });
  }
  return out;
}

/** 金色（藤黄）阶：锚点为 400 阶，向上更浅，向下沉为可作文字的暗金 */
export function deriveGoldScale(anchorHex) {
  const a = hexToOklch(anchorHex);
  const mk = (L, c) => oklchToHex({ L, C: a.C * c, H: a.H });
  return {
    50:  mk(0.975, 0.18),
    100: mk(0.945, 0.35),
    200: mk(0.885, 0.62),
    300: mk(0.815, 0.88),
    400: anchorHex.toUpperCase(),
    500: mk(a.L - 0.10, 1.05),
    600: mk(a.L - 0.20, 1.05),
    700: mk(a.L - 0.30, 0.98),
    800: mk(a.L - 0.40, 0.80),
    900: mk(a.L - 0.50, 0.60),
  };
}
