/* ============================================================
   site.js · 站点层 · V39
   多页面（mpa）与单文件全典（spa · hash 路由）双模；
   顶栏墨痕指示、阅读进度、本章目录、⌘K 跨页检索、栅格覆盖、图表引擎。
   ============================================================ */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const D = window.SINO_DATA || {};
  const shell = $('#sino');
  const MODE = shell?.dataset.mode === 'spa' ? 'spa' : 'mpa';
  const routes = $$('.route');
  const navLinks = $$('[data-nav]');
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  let io;

  /* ── 顶栏：滚动压缩 + 阅读进度 + 墨痕指示 ── */
  const nav = $('.site-nav'), prog = $('[data-page-prog]'), ink = $('.site-nav__ink');
  function placeInk() {
    if (!ink) return;
    const a = $('.site-nav__link[aria-current="page"]');
    if (!a) { ink.classList.remove('is-on'); return; }
    ink.style.width = a.offsetWidth - 26 + 'px';
    ink.style.transform = `translateX(${a.offsetLeft + 13}px)`;
    ink.classList.add('is-on');
  }
  let ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const y = scrollY;
      nav?.classList.toggle('is-stuck', y > 24);
      if (prog) {
        const h = document.documentElement.scrollHeight - innerHeight;
        prog.style.width = (h > 0 ? Math.min(1, y / h) * 100 : 0) + '%';
      }
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', placeInk);
  onScroll();

  /* ── 目录抽屉 ── */
  const sheet = $('#nav-sheet'), menuBtn = $('[data-menu]');
  const setSheet = on => {
    sheet?.classList.toggle('is-open', on);
    sheet?.setAttribute('aria-hidden', String(!on));
    menuBtn?.setAttribute('aria-expanded', String(on));
    document.documentElement.style.overflow = on ? 'hidden' : '';
    if (on) $$('.nav-sheet__link', sheet).forEach((a, i) => a.style.setProperty('--i', i));
  };
  menuBtn?.addEventListener('click', () => setSheet(!sheet.classList.contains('is-open')));
  sheet?.addEventListener('click', ev => { if (ev.target.closest('[data-menu-close]') || ev.target.closest('a')) setSheet(false); });

  /* ── 本章目录 + 滚动高亮 + 进度 ── */
  function buildToc(scope) {
    const subs = $$('.cx-sub[id]', scope);
    const list = $('[data-toc]', scope), inline = $('[data-toc-inline]', scope);
    const tocProg = $('[data-toc-prog]', scope), count = $('[data-idx-count]', scope);
    const href = id => (MODE === 'spa' ? `#/${scope.dataset.route}/${id}` : `#${id}`);
    const items = subs.map(s => ({ id: s.id, n: $('.cx-sub__n', s)?.textContent || '', t: $('.cx-sub__t', s)?.textContent || '' }));
    if (count) count.textContent = String(items.length).padStart(2, '0');
    const link = (it, cls) => {
      const a = document.createElement('a');
      a.href = href(it.id); a.className = cls || '';
      a.innerHTML = '<span class="toc__n"></span><span class="toc__t"></span>';
      a.children[0].textContent = it.n; a.children[1].textContent = it.t; a.dataset.for = it.id;
      return a;
    };
    if (list) list.replaceChildren(...items.map(it => link(it)));
    if (inline) inline.replaceChildren(...items.slice(0, 14).map(it => link(it, 'cover__idx')));
    io?.disconnect();
    if (subs.length && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(es => {
        const vis = es.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (!vis[0] || !list) return;
        const id = vis[0].target.id;
        $$('a', list).forEach(a => a.classList.toggle('is-active', a.dataset.for === id));
        if (tocProg) tocProg.style.width = ((items.findIndex(i => i.id === id) + 1) / items.length) * 100 + '%';
      }, { rootMargin: '-12% 0px -74% 0px' });
      subs.forEach(s => io.observe(s));
    }
  }

  /* ── 路由（仅单文件模式） ── */
  function parse() { const h = location.hash.replace(/^#\/?/, ''); const [p = '', a] = h.split('/'); return { path: p === '' ? 'home' : p, anchor: a || '' }; }
  let current = null;
  function activate({ path, anchor }) {
    const target = routes.find(r => r.dataset.route === path) || routes[0];
    const swap = () => {
      routes.forEach(r => { r.hidden = r !== target; });
      navLinks.forEach(l => l.setAttribute('aria-current', l.dataset.nav === target.dataset.route ? 'page' : 'false'));
      document.title = (target.dataset.route === 'home' ? '' : target.dataset.title + ' · ') + '源裕兴设计系统全典';
      buildToc(target); placeInk();
      window.sinoArt?.renderAll(target); window.sinoMotion?.refresh(target); drawCharts(target);
      if (anchor) { const el = document.getElementById(anchor); if (el) return el.scrollIntoView({ behavior: 'auto', block: 'start' }); }
      if (current !== target) scrollTo({ top: 0, behavior: 'auto' });
    };
    if (current && current !== target && document.startViewTransition && !reduced()) document.startViewTransition(swap); else swap();
    current = target; setSheet(false);
  }

  /* ── 多页面：同页锚点平滑滚动 ── */
  if (MODE === 'mpa') {
    const page = document.body.dataset.page || 'home';
    navLinks.forEach(l => l.setAttribute('aria-current', l.dataset.nav === page ? 'page' : 'false'));
    buildToc(routes[0] || document);
    placeInk();
    document.addEventListener('click', ev => {
      const a = ev.target.closest('a[href^="#"]'); if (!a) return;
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const el = document.getElementById(id); if (!el) return;
      ev.preventDefault(); setSheet(false);
      el.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', '#' + id);
    });
    /* ← / → 翻章 */
    const R = D.routes || [];
    const idx = Number(document.body.dataset.chapter || 0);
    document.addEventListener('keydown', ev => {
      if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
      if (/input|textarea|select/i.test(document.activeElement?.tagName || '')) return;
      if (ev.key === 'ArrowLeft' && R[idx - 1]) location.href = R[idx - 1].file;
      if (ev.key === 'ArrowRight' && R[idx + 1]) location.href = R[idx + 1].file;
    });
  }

  /* ── ⌘K：跨页检索 ── */
  const cmdk = $('#cmdk'), input = $('#cmdk-input'), list = $('#cmdk-list');
  const fileOf = p => (p === 'home' ? 'index.html' : p + '.html');
  const items = (D.search || []).map(s => ({
    href: MODE === 'spa'
      ? (s.id ? `#/${s.r === 'home' ? 'home' : s.r}/${s.id}` : `#/${s.r === 'home' ? '' : s.r}`)
      : (s.id ? `${fileOf(s.r)}#${s.id}` : fileOf(s.r)),
    num: s.n, title: s.t, kind: s.k, hay: (s.t + s.n + s.k + (s.d || '')).toLowerCase(),
  }));
  let cursor = 0, shown = [];
  const render = q => {
    const s = q.trim().toLowerCase();
    shown = items.filter(i => !s || i.hay.includes(s)).slice(0, 16); cursor = 0;
    list.innerHTML = shown.length ? '' : '<div class="cx-cmdk__empty">未找到匹配结果。试试「按钮」「对比度」「缓动」「报关」。</div>';
    shown.forEach((i, idx) => {
      const b = document.createElement('a');
      b.href = i.href; b.className = 'cx-cmdk__item' + (idx === 0 ? ' is-active' : '');
      b.innerHTML = '<span class="toc__n"></span><span></span><small></small>';
      b.children[0].textContent = i.num; b.children[1].textContent = i.title; b.children[2].textContent = i.kind;
      b.addEventListener('click', closeCmdk); list.appendChild(b);
    });
  };
  const openCmdk = () => { cmdk.classList.add('is-open'); cmdk.removeAttribute('aria-hidden'); input.value = ''; render(''); setTimeout(() => input.focus(), 20); };
  const closeCmdk = () => { cmdk.classList.remove('is-open'); cmdk.setAttribute('aria-hidden', 'true'); };
  document.addEventListener('keydown', ev => {
    if ((ev.metaKey || ev.ctrlKey) && ev.key.toLowerCase() === 'k') { ev.preventDefault(); cmdk.classList.contains('is-open') ? closeCmdk() : openCmdk(); return; }
    if (ev.key.toLowerCase() === 'g' && !ev.metaKey && !ev.ctrlKey && !/input|textarea|select/i.test(document.activeElement?.tagName || '')) { document.body.classList.toggle('show-grid'); return; }
    if (!cmdk?.classList.contains('is-open')) return;
    if (ev.key === 'Escape') return closeCmdk();
    if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') { ev.preventDefault(); cursor = (cursor + (ev.key === 'ArrowDown' ? 1 : shown.length - 1)) % Math.max(shown.length, 1); $$('.cx-cmdk__item', list).forEach((b, i) => b.classList.toggle('is-active', i === cursor)); }
    if (ev.key === 'Enter' && shown[cursor]) { location.href = shown[cursor].href; closeCmdk(); }
  });
  input?.addEventListener('input', () => render(input.value));
  cmdk?.addEventListener('click', ev => { if (ev.target === cmdk) closeCmdk(); });
  $$('[data-cmdk]').forEach(b => b.addEventListener('click', openCmdk));
  $$('[data-grid-toggle]').forEach(b => b.addEventListener('click', () => { document.body.classList.toggle('show-grid'); b.setAttribute('aria-pressed', String(document.body.classList.contains('show-grid'))); }));

  /* ── 对比度计算器 ── */
  const lum = hex => { const h = hex.replace('#', ''); const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16); const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(v => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
  const contrast = (a, b) => { const x = lum(a), y = lum(b); const [hi, lo] = x > y ? [x, y] : [y, x]; return (hi + 0.05) / (lo + 0.05); };
  const tool = $('#contrast-tool');
  if (tool) {
    const fg = $('[name="fg"]', tool), bg = $('[name="bg"]', tool), fgH = $('[name="fgHex"]', tool), bgH = $('[name="bgHex"]', tool), out = $('.contrast-tool__ratio', tool), prev = $('.contrast-tool__preview', tool);
    const upd = () => { const f = fg.value, b = bg.value; fgH.value = f.toUpperCase(); bgH.value = b.toUpperCase(); const r = contrast(f, b); prev.style.background = b; prev.style.color = f; out.innerHTML = `${r.toFixed(2)}:1<small></small>`; const s = out.querySelector('small'); s.textContent = r >= 7 ? 'AAA 正文' : r >= 4.5 ? 'AA 正文 · AAA 大字' : r >= 3 ? '仅大字 / UI 边界 (AA)' : '未通过'; s.className = r >= 4.5 ? 'ok' : r >= 3 ? 'warn' : 'bad'; };
    [fg, bg].forEach(i => i.addEventListener('input', upd)); [[fgH, fg], [bgH, bg]].forEach(([h, c]) => h.addEventListener('change', () => { if (/^#?[0-9a-f]{6}$/i.test(h.value)) { c.value = '#' + h.value.replace('#', ''); upd(); } })); upd();
  }

  /* ── 代码切换 ── */
  document.addEventListener('click', ev => { const b = ev.target.closest('[data-code-toggle]'); if (!b) return; const box = b.closest('.cx-spec').querySelector('.cx-spec__code'); if (!box) return; box.hidden = !box.hidden; b.setAttribute('aria-expanded', String(!box.hidden)); });

  /* ── 图表引擎（SVG，仅主题令牌） ── */
  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a = {}, t) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); if (t != null) e.textContent = t; return e; };
  const fmt = n => n >= 1e8 ? (n / 1e8).toFixed(1) + '亿' : n >= 1e4 ? (n / 1e4).toFixed(n >= 1e6 ? 0 : 1) + '万' : n.toLocaleString('zh-CN');
  const nice = max => { const p = 10 ** Math.floor(Math.log10(max)); const m = max / p; const s = m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10; return s * p; };
  function sparkline(host, data) {
    const w = 96, h = 36, pad = 3; const max = Math.max(...data), min = Math.min(...data);
    const x = i => pad + (i / (data.length - 1)) * (w - pad * 2), y = v => h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
    const svg = el('svg', { viewBox: `0 0 ${w} ${h}`, class: 'm-kpi__spark', 'aria-hidden': 'true' });
    const d = data.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
    svg.appendChild(el('path', { d: `${d} L${x(data.length - 1).toFixed(1)},${h} L${x(0)},${h} Z`, fill: 'var(--c-primary)', opacity: '.1' }));
    svg.appendChild(el('path', { d, fill: 'none', stroke: 'var(--c-chartEmphasisDim)', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
    const n = data.length - 1; svg.appendChild(el('path', { d: `M${x(n - 1).toFixed(1)},${y(data[n - 1]).toFixed(1)} L${x(n).toFixed(1)},${y(data[n]).toFixed(1)}`, fill: 'none', stroke: 'var(--c-primary)', 'stroke-width': '2', 'stroke-linecap': 'round' }));
    svg.appendChild(el('circle', { cx: x(n), cy: y(data[n]), r: 3.5, fill: 'var(--c-primary)', class: 'ring' }));
    host.replaceChildren(svg);
  }
  function lineChart(host, cfg) {
    const { labels, series, unit = '', height = 220 } = cfg; const W = Math.max(320, Math.round(host.clientWidth || 640)), H = height, m = { t: 16, r: W < 420 ? 44 : 56, b: 28, l: 48 };
    const allMax = Math.max(...series.flatMap(s => s.data)); const yMax = nice(allMax * 1.12); const iw = W - m.l - m.r, ih = H - m.t - m.b;
    const x = i => m.l + (i / (labels.length - 1)) * iw, y = v => m.t + ih - (v / yMax) * ih;
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': cfg.title || '折线图' });
    const grid = el('g', { class: 'grid' }); const axis = el('g', { class: 'axis' });
    for (let k = 0; k <= 4; k++) { const v = (yMax / 4) * k, yy = y(v); grid.appendChild(el('line', { x1: m.l, x2: W - m.r, y1: yy, y2: yy })); axis.appendChild(el('text', { x: m.l - 8, y: yy + 4, 'text-anchor': 'end' }, fmt(v))); }
    labels.forEach((l, i) => { if (labels.length > 8 && i % Math.ceil(labels.length / 8)) return; axis.appendChild(el('text', { x: x(i), y: H - 8, 'text-anchor': 'middle' }, l)); });
    svg.append(grid, axis);
    series.forEach((s, si) => {
      const col = s.color || `var(--c-series${si + 1})`; const d = s.data.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
      if (series.length === 1 || s.area) svg.appendChild(el('path', { d: `${d} L${x(s.data.length - 1).toFixed(1)},${y(0)} L${x(0)},${y(0)} Z`, fill: col, opacity: '.1' }));
      const line = el('path', { d, fill: 'none', stroke: col, 'stroke-width': '2', 'stroke-linejoin': 'round', 'stroke-linecap': 'round', class: 'o-chart__line' });
      svg.appendChild(line);
      const n = s.data.length - 1; svg.appendChild(el('circle', { cx: x(n), cy: y(s.data[n]), r: 4, fill: col, class: 'ring' }));
      svg.appendChild(el('text', { x: x(n) + 8, y: y(s.data[n]) + 4, class: 'label label--strong' }, fmt(s.data[n]) + unit));
    });
    const cross = el('line', { class: 'o-chart__crosshair', y1: m.t, y2: m.t + ih }); svg.appendChild(cross);
    const dots = series.map((s, si) => { const c = el('circle', { r: 5, fill: s.color || `var(--c-series${si + 1})`, class: 'ring', opacity: 0 }); svg.appendChild(c); return c; });
    host.replaceChildren(svg); const tipEl = document.createElement('div'); tipEl.className = 'o-chart__tip'; host.appendChild(tipEl);
    const hit = el('rect', { x: m.l, y: m.t, width: iw, height: ih, fill: 'transparent' }); svg.appendChild(hit);
    const show = ev => { const r = svg.getBoundingClientRect(); const px = ((ev.clientX - r.left) / r.width) * W; const i = Math.max(0, Math.min(labels.length - 1, Math.round(((px - m.l) / iw) * (labels.length - 1)))); cross.setAttribute('x1', x(i)); cross.setAttribute('x2', x(i)); cross.style.opacity = 1; dots.forEach((d, si) => { d.setAttribute('cx', x(i)); d.setAttribute('cy', y(series[si].data[i])); d.setAttribute('opacity', 1); }); tipEl.innerHTML = `<b></b>` + series.map((s, si) => `<div><i style="--sw:${s.color || `var(--c-series${si + 1})`}"></i><span class="v"></span> <span class="n"></span></div>`).join(''); tipEl.querySelector('b').textContent = labels[i]; tipEl.querySelectorAll('div').forEach((d, si) => { d.querySelector('.v').textContent = fmt(series[si].data[i]) + unit; d.querySelector('.n').textContent = series[si].name; }); const hr = host.getBoundingClientRect(); tipEl.style.left = `${((x(i) / W) * hr.width).toFixed(0)}px`; tipEl.style.top = `${((Math.min(...series.map(s => y(s.data[i]))) / H) * hr.height).toFixed(0)}px`; tipEl.classList.add('is-on'); };
    const hide = () => { cross.style.opacity = 0; dots.forEach(d => d.setAttribute('opacity', 0)); tipEl.classList.remove('is-on'); };
    hit.addEventListener('pointermove', show); hit.addEventListener('pointerleave', hide);
    if (!reduced()) $$('.o-chart__line', svg).forEach(p => { const L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = L; p.animate([{ strokeDashoffset: L }, { strokeDashoffset: 0 }], { duration: 1100, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'forwards' }); });
    if (cfg.table) buildTable(cfg.table, labels, series, unit);
  }
  function barChart(host, cfg) {
    const { labels, series, unit = '', height = 220, horizontal = false } = cfg; const W = Math.max(320, Math.round(host.clientWidth || 640)), H = height; const m = horizontal ? { t: 8, r: 48, b: 8, l: Math.min(96, Math.round(W * 0.28)) } : { t: 16, r: 16, b: 28, l: 48 };
    const allMax = Math.max(...series.flatMap(s => s.data)); const vMax = nice(allMax * 1.15); const iw = W - m.l - m.r, ih = H - m.t - m.b;
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': cfg.title || '柱状图' }); const grid = el('g', { class: 'grid' }), axis = el('g', { class: 'axis' }); svg.append(grid, axis);
    const tipEl = document.createElement('div'); tipEl.className = 'o-chart__tip';
    const colorOf = (s, si, i) => (cfg.colors && series.length === 1) ? cfg.colors[i] : (s.color || `var(--c-series${si + 1})`);
    if (horizontal) {
      const band = ih / labels.length; const bh = Math.min(20, band * 0.6 / series.length);
      for (let k = 0; k <= 4; k++) { const v = (vMax / 4) * k, xx = m.l + (v / vMax) * iw; grid.appendChild(el('line', { x1: xx, x2: xx, y1: m.t, y2: m.t + ih })); }
      labels.forEach((l, i) => { axis.appendChild(el('text', { x: m.l - 8, y: m.t + band * i + band / 2 + 4, 'text-anchor': 'end' }, l)); series.forEach((s, si) => { const v = s.data[i]; const w = (v / vMax) * iw; const yy = m.t + band * i + (band - bh * series.length) / 2 + si * (bh + 2); const r = el('rect', { x: m.l, y: yy, width: Math.max(w, 0), height: bh, fill: colorOf(s, si, i), class: 'bar', tabindex: 0 }); r.dataset.v = fmt(v) + unit; r.dataset.n = `${l} · ${s.name}`; svg.appendChild(r); if (series.length === 1) svg.appendChild(el('text', { x: m.l + w + 6, y: yy + bh / 2 + 4, class: 'label' }, fmt(v) + unit)); }); });
    } else {
      const band = iw / labels.length; const bw = Math.min(24, (band * 0.62) / series.length);
      for (let k = 0; k <= 4; k++) { const v = (vMax / 4) * k, yy = m.t + ih - (v / vMax) * ih; grid.appendChild(el('line', { x1: m.l, x2: W - m.r, y1: yy, y2: yy })); axis.appendChild(el('text', { x: m.l - 8, y: yy + 4, 'text-anchor': 'end' }, fmt(v))); }
      labels.forEach((l, i) => { axis.appendChild(el('text', { x: m.l + band * i + band / 2, y: H - 8, 'text-anchor': 'middle' }, l)); series.forEach((s, si) => { const v = s.data[i]; const h = (v / vMax) * ih; const xx = m.l + band * i + (band - (bw * series.length + 2 * (series.length - 1))) / 2 + si * (bw + 2); const r = el('rect', { x: xx, y: m.t + ih - h, width: bw, height: Math.max(h, 0), fill: colorOf(s, si, i), class: 'bar', tabindex: 0 }); r.dataset.v = fmt(v) + unit; r.dataset.n = `${l} · ${s.name}`; svg.appendChild(r); if (cfg.labelMax && v === allMax) svg.appendChild(el('text', { x: xx + bw / 2, y: m.t + ih - h - 6, 'text-anchor': 'middle', class: 'label label--strong' }, fmt(v) + unit)); }); });
    }
    host.replaceChildren(svg); host.appendChild(tipEl);
    const show = ev => { const r = ev.target; if (!r.classList?.contains('bar')) return; const hr = host.getBoundingClientRect(), br = r.getBoundingClientRect(); tipEl.innerHTML = `<b></b><span></span>`; tipEl.querySelector('b').textContent = r.dataset.v; tipEl.querySelector('span').textContent = r.dataset.n; tipEl.style.left = `${br.left - hr.left + br.width / 2}px`; tipEl.style.top = `${br.top - hr.top}px`; tipEl.classList.add('is-on'); };
    svg.addEventListener('pointerover', show); svg.addEventListener('focusin', show); svg.addEventListener('pointerleave', () => tipEl.classList.remove('is-on')); svg.addEventListener('focusout', () => tipEl.classList.remove('is-on'));
    if (!reduced()) $$('.bar', svg).forEach((b, i) => b.animate([{ transform: 'scaleY(.02)', transformOrigin: `center ${m.t + ih}px` }, { transform: 'none', transformOrigin: `center ${m.t + ih}px` }], { duration: 640, delay: i * 26, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' }));
    if (cfg.table) buildTable(cfg.table, labels, series, unit);
  }
  function buildTable(id, labels, series, unit) {
    const box = document.getElementById(id); if (!box) return; const t = document.createElement('table'); t.className = 'a-table a-table--data a-table--dense';
    const thead = t.createTHead().insertRow(); thead.appendChild(Object.assign(document.createElement('th'), { textContent: '项目' })); series.forEach(s => { const th = document.createElement('th'); th.className = 'num'; th.textContent = s.name + (unit ? `（${unit}）` : ''); thead.appendChild(th); });
    const tb = t.createTBody(); labels.forEach((l, i) => { const r = tb.insertRow(); r.insertCell().textContent = l; series.forEach(s => { const c = r.insertCell(); c.className = 'num'; c.textContent = s.data[i].toLocaleString('zh-CN'); }); });
    box.replaceChildren(t);
  }
  document.addEventListener('click', ev => { const b = ev.target.closest('[data-table-toggle]'); if (!b) return; const c = b.closest('.o-chart'); c.classList.toggle('is-table'); b.setAttribute('aria-pressed', String(c.classList.contains('is-table'))); b.querySelector('span').textContent = c.classList.contains('is-table') ? '查看图表' : '查看表格'; });
  const drawChart = host => { try { const cfg = JSON.parse(host.dataset.chart); (cfg.type === 'bar' ? barChart : lineChart)(host, cfg); host.dataset.w = String(Math.round(host.clientWidth)); } catch (e) { console.error('chart', e); } };
  function drawCharts(scope) { $$('[data-chart]', scope).forEach(h => { if (h.closest('[hidden]')) return; if (h.dataset.w !== String(Math.round(h.clientWidth))) drawChart(h); }); }
  if ('ResizeObserver' in window) { let t; const ro = new ResizeObserver(es => { clearTimeout(t); t = setTimeout(() => es.forEach(e => { const h = e.target; if (h.closest('[hidden]')) return; if (h.dataset.w !== String(Math.round(e.contentRect.width)) && e.contentRect.width > 0) drawChart(h); }), 120); }); $$('[data-chart]').forEach(h => ro.observe(h)); }
  $$('[data-spark]').forEach(host => sparkline(host, host.dataset.spark.split(',').map(Number)));
  $$('[data-radar]').forEach(host => { const d = JSON.parse(host.dataset.radar); const n = d.axes.length, R = 78, cx = 110, cy = 100; const svg = el('svg', { viewBox: '0 0 220 200', class: 'p-radar', role: 'img', 'aria-label': '能力雷达' }); [0.25, 0.5, 0.75, 1].forEach(k => svg.appendChild(el('polygon', { class: 'ring', points: d.axes.map((_, i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / n; return `${(cx + Math.cos(a) * R * k).toFixed(1)},${(cy + Math.sin(a) * R * k).toFixed(1)}`; }).join(' ') }))); d.axes.forEach((ax, i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / n; svg.appendChild(el('line', { class: 'axis', x1: cx, y1: cy, x2: cx + Math.cos(a) * R, y2: cy + Math.sin(a) * R })); svg.appendChild(el('text', { x: cx + Math.cos(a) * (R + 16), y: cy + Math.sin(a) * (R + 16) + 4, 'text-anchor': 'middle' }, ax)); }); svg.appendChild(el('polygon', { class: 'area', points: d.values.map((v, i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / n; return `${(cx + Math.cos(a) * R * v / 100).toFixed(1)},${(cy + Math.sin(a) * R * v / 100).toFixed(1)}`; }).join(' ') })); host.replaceChildren(svg); });
  $$('[data-ease]').forEach(x => x.style.setProperty('--_e', x.dataset.ease));
  document.addEventListener('click', ev => { const c = ev.target.closest('.icon-cell'); if (c && !c.dataset.copy) { c.dataset.copy = c.dataset.icon; c.click(); } });

  /* ── 首页：实体面板 ↔ 主题联动 ── */
  $$('[data-entity-panel]').forEach(p => {
    const set = () => { document.dispatchEvent(new CustomEvent('sino:set-entity', { detail: p.dataset.entityPanel })); };
    p.addEventListener('click', set);
    p.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); set(); } });
  });
  document.addEventListener('sino:entity', ev => $$('[data-entity-panel]').forEach(x => {
    const on = x.dataset.entityPanel === ev.detail;
    x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', String(on));
  }));

  drawCharts(document);
  if (MODE === 'spa') { addEventListener('hashchange', () => activate(parse())); activate(parse()); }
})();
