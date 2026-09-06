/* ============================================================
   art.js · 太极流纹 · 生成式流场（Canvas 2D，零依赖）
   源 = 水之源：细线沿噪声场流动，聚于一点又散开。每章不同种子，随实体换色。
   ============================================================ */
(function () {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* 值噪声（三倍频） */
  function makeNoise(seed) {
    let s = seed >>> 0 || 1; const rnd = () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
    const P = new Uint8Array(512); const perm = Array.from({ length: 256 }, (_, i) => i);
    for (let i = 255; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [perm[i], perm[j]] = [perm[j], perm[i]]; }
    for (let i = 0; i < 512; i++) P[i] = perm[i & 255];
    const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
    const grad = (h, x, y) => { switch (h & 3) { case 0: return x + y; case 1: return -x + y; case 2: return x - y; default: return -x - y; } };
    const n2 = (x, y) => { const X = Math.floor(x) & 255, Y = Math.floor(y) & 255; x -= Math.floor(x); y -= Math.floor(y); const u = fade(x), v = fade(y); const a = P[X] + Y, b = P[X + 1] + Y; return (1 + (grad(P[a], x, y) * (1 - u) + grad(P[b], x - 1, y) * u) * (1 - v) + (grad(P[a + 1], x, y - 1) * (1 - u) + grad(P[b + 1], x - 1, y - 1) * u) * v) / 2; };
    return { rnd, noise: (x, y) => 0.6 * n2(x, y) + 0.3 * n2(x * 2.1, y * 2.1) + 0.1 * n2(x * 4.3, y * 4.3) };
  }
  const SEEDS = { home: 7, tokens: 11, atoms: 19, molecules: 23, organisms: 31, templates: 41, pages: 53, motion: 97, governance: 61, manifesto: 71, entities: 83 };
  function cssColor(el, name) { return getComputedStyle(el).getPropertyValue(name).trim() || '#851EA3'; }
  function render(canvas) {
    const host = canvas.parentElement; const rect = host.getBoundingClientRect();
    if (rect.width < 10 || rect.height < 10) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const W = Math.round(rect.width), H = Math.round(rect.height);
    canvas.width = W * dpr; canvas.height = H * dpr; canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    const ctx = canvas.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    const key = canvas.dataset.artKey || host.dataset.art || 'home';
    const { rnd, noise } = makeNoise(SEEDS[key] || 5);
    const primary = cssColor(canvas, '--c-primary'), gold = cssColor(canvas, '--c-goldLine');
    const dark = getComputedStyle(canvas).getPropertyValue('color-scheme').includes('dark');
    const density = Number(canvas.dataset.density || (key === 'home' ? 1 : 0.7));
    const N = Math.round(Math.min(620, (W * H) / 2300) * density), STEPS = 120, SC = 1 / Math.max(W, H) * 1.6;
    /* 焦点：右侧 62% 处的漩涡（太极） */
    const fx = W * (Number(canvas.dataset.fx) || 0.66), fy = H * (Number(canvas.dataset.fy) || 0.5);
    const parts = Array.from({ length: N }, () => ({ x: rnd() * W * 1.1 - W * 0.05, y: rnd() * H * 1.1 - H * 0.05, gold: rnd() < 0.06 }));
    ctx.lineWidth = 1; ctx.lineCap = 'round';
    const alphaBase = dark ? 0.17 : 0.14;
    let step = 0;
    /* 每帧按 k 分组：同一 k 的所有粒子合并为一条路径，一次 stroke（主色 / 藤黄各一） */
    const draw = (from, to) => {
      for (let k = from; k < to; k++) {
        const pathP = new Path2D(), pathG = new Path2D();
        for (const p of parts) {
          const dx = fx - p.x, dy = fy - p.y, d = Math.hypot(dx, dy) + 1;
          const swirl = Math.atan2(dy, dx) + Math.PI / 2; const w = Math.max(0, 1 - d / (Math.min(W, H) * 0.55));
          const a = noise(p.x * SC, p.y * SC) * Math.PI * 2.4 * (1 - w * 0.6) + swirl * w * 1.2;
          const nx = p.x + Math.cos(a) * 1.6, ny = p.y + Math.sin(a) * 1.6;
          const path = p.gold ? pathG : pathP; path.moveTo(p.x, p.y); path.lineTo(nx, ny);
          p.x = nx; p.y = ny;
        }
        const fade = 0.35 + 0.65 * (1 - k / STEPS);
        ctx.globalAlpha = alphaBase * fade; ctx.strokeStyle = primary; ctx.stroke(pathP);
        ctx.globalAlpha = alphaBase * fade * 0.9; ctx.strokeStyle = gold; ctx.stroke(pathG);
      }
    };
    if (reduced) { draw(0, STEPS); return; }
    const tick = () => { const to = Math.min(STEPS, step + 4); draw(step, to); step = to; if (step < STEPS && document.contains(canvas)) requestAnimationFrame(tick); };
    setTimeout(() => requestAnimationFrame(tick), 120);
  }
  const renderAll = (scope = document) => scope.querySelectorAll('canvas[data-art], [data-art] > canvas').forEach(c => { if (c.closest('[hidden]')) return; render(c); });
  window.sinoArt = { render, renderAll };
  document.addEventListener('sino:entity', () => renderAll());
  document.addEventListener('sino:scheme', () => setTimeout(() => renderAll(), 60));
  let t; addEventListener('resize', () => { clearTimeout(t); t = setTimeout(() => renderAll(), 200); });
})();
