/* ============================================================
   motion.js · 动效编排层 · V39
   一处点睛之动（主标题分行/分字揭示）+ 全站滚动揭示 + 指针微交互 + 动效实验室。
   铁律：只动 transform / opacity；prefers-reduced-motion 一律给终态。
   ============================================================ */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const mq = matchMedia('(prefers-reduced-motion: reduce)');
  const html = document.documentElement;
  const reduced = () => mq.matches;
  const setReduced = () => html.classList.toggle('reduced', reduced());
  setReduced(); mq.addEventListener?.('change', setReduced);

  const nativeTimeline = CSS.supports?.('animation-timeline: view()') ?? false;
  if (!nativeTimeline && !reduced()) html.classList.add('js-rv');

  /* ── 1 · 滚动揭示（原生不可用时的观察者回退） ── */
  let rvObs;
  function bindReveal(scope = document) {
    $$('[data-stagger]', scope).forEach(box => $$(':scope > *', box).forEach((c, i) => c.style.setProperty('--rv-d', i)));
    if (nativeTimeline || reduced()) return;
    rvObs = rvObs || new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in'); rvObs.unobserve(e.target);
    }), { rootMargin: '0px 0px -12% 0px', threshold: 0.06 });
    $$('.rv', scope).forEach(el => { if (!el.classList.contains('is-in')) rvObs.observe(el); });
  }

  /* ── 2 · 文字揭示：中文按视觉行分组（CJK 无词间空格，必须实测） ── */
  const store = new WeakMap();
  function splitChars(el) {
    const text = store.get(el) ?? el.textContent;
    store.set(el, text);
    el.classList.add('split', 'split--chars');
    el.replaceChildren(...[...text].map((ch, i) => {
      if (ch === ' ') return document.createTextNode(' ');
      const s = document.createElement('span');
      s.className = 'split__char'; s.textContent = ch; s.style.setProperty('--i', i);
      return s;
    }));
  }
  function splitLines(el) {
    const text = store.get(el) ?? el.textContent;
    store.set(el, text);
    el.classList.add('split');
    /* 先逐字铺开以测量视觉行 */
    const probes = [...text].map(ch => { const s = document.createElement('span'); s.textContent = ch; return s; });
    el.replaceChildren(...probes);
    const lines = []; let top = null;
    probes.forEach(p => {
      const t = Math.round(p.getBoundingClientRect().top);
      if (top === null || Math.abs(t - top) > 4) { lines.push([]); top = t; }
      lines[lines.length - 1].push(p.textContent);
    });
    el.replaceChildren(...lines.map((chars, i) => {
      const line = document.createElement('span'); line.className = 'split__line';
      const inner = document.createElement('span'); inner.className = 'split__inner';
      inner.textContent = chars.join(''); line.style.setProperty('--i', i);
      line.appendChild(inner); return line;
    }));
  }
  function runSplit(scope = document) {
    $$('[data-split]', scope).forEach(el => {
      el.classList.remove('split--ready', 'split--done');
      (el.dataset.split === 'char' ? splitChars : splitLines)(el);
      if (reduced() || el.dataset.splitPlayed) { el.classList.add('split--ready', 'split--done'); return; }
      el.dataset.splitPlayed = '1';
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('split--ready')));
    });
  }
  let rsT; addEventListener('resize', () => { clearTimeout(rsT); rsT = setTimeout(() => runSplit(), 260); });

  /* ── 3 · 数字滚动（等宽数字，进入视口触发一次） ── */
  function bindCounters(scope = document) {
    const els = $$('[data-count]', scope);
    if (!els.length) return;
    if (reduced() || !('IntersectionObserver' in window)) {
      els.forEach(el => { el.textContent = Number(el.dataset.count).toLocaleString('zh-CN'); });
      return;
    }
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, end = Number(el.dataset.count), dec = Number(el.dataset.countDec || 0), t0 = performance.now(), dur = 1200;
      const step = now => {
        const k = Math.min(1, (now - t0) / dur);
        const v = end * (1 - Math.pow(1 - k, 3));
        el.textContent = dec ? v.toFixed(dec) : Math.round(v).toLocaleString('zh-CN');
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step); io.unobserve(el);
    }), { threshold: 0.5 });
    els.forEach(el => io.observe(el));
  }

  /* ── 4 · 指针微交互：聚光 / 磁吸 / 倾斜 ── */
  function bindPointer(scope = document) {
    if (matchMedia('(hover: none)').matches) return;
    $$('[data-spot]', scope).forEach(el => el.addEventListener('pointermove', ev => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${ev.clientX - r.left}px`);
      el.style.setProperty('--my', `${ev.clientY - r.top}px`);
    }));
    if (reduced()) return;
    $$('[data-magnet]', scope).forEach(el => {
      const k = Number(el.dataset.magnet) || 0.22;
      el.addEventListener('pointermove', ev => {
        const r = el.getBoundingClientRect();
        el.classList.add('is-pull');
        el.style.transform = `translate(${(ev.clientX - r.left - r.width / 2) * k}px, ${(ev.clientY - r.top - r.height / 2) * k}px)`;
      });
      el.addEventListener('pointerleave', () => { el.classList.remove('is-pull'); el.style.transform = ''; });
    });
    $$('[data-tilt]', scope).forEach(el => {
      const k = Number(el.dataset.tilt) || 6;
      el.addEventListener('pointermove', ev => {
        const r = el.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width - .5, y = (ev.clientY - r.top) / r.height - .5;
        el.style.transform = `perspective(900px) rotateX(${-y * k}deg) rotateY(${x * k}deg)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ── 5 · 跑马灯：内容不足两屏时复制补齐 ── */
  function bindMarquee(scope = document) {
    $$('[data-marquee]', scope).forEach(mqEl => {
      const rows = $$('.mq__row', mqEl);
      if (!rows.length) return;
      const host = mqEl.parentElement;
      let guard = 0;
      while (mqEl.scrollWidth < host.clientWidth * 2 && guard++ < 8) rows.forEach(r => mqEl.appendChild(r.cloneNode(true)));
    });
  }

  /* ── 6 · 动效实验室（M 章） ── */
  function bindLab(scope = document) {
    /* 缓动曲线：绘制 + 点击播放 */
    $$('.mo-curve', scope).forEach(card => {
      const bez = card.dataset.bezier; const plot = $('.mo-curve__plot', card);
      if (plot && bez) {
        const [x1, y1, x2, y2] = bez.split(',').map(Number);
        const W = 100, H = 72;
        const px = v => (v * W).toFixed(2), py = v => (H - v * H).toFixed(2);
        plot.innerHTML = `<svg viewBox="0 0 ${W} ${H}" aria-hidden="true"><path class="mo-curve__path" d="M0,${py(0)} C${px(x1)},${py(y1)} ${px(x2)},${py(y2)} ${W},${py(1)}"/><circle class="mo-curve__dot" cx="${px(x1)}" cy="${py(y1)}" r="2.4"/><circle class="mo-curve__dot" cx="${px(x2)}" cy="${py(y2)}" r="2.4"/></svg>`;
        const p = $('.mo-curve__path', plot);
        if (!reduced()) { const L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = L; p.animate([{ strokeDashoffset: L }, { strokeDashoffset: 0 }], { duration: 900, easing: 'ease-out', fill: 'forwards' }); }
      }
      const play = () => {
        if (reduced()) return;
        const track = $('.mo-curve__track', card); if (!track) return;
        card.style.setProperty('--_w', track.clientWidth + 'px');
        card.style.setProperty('--_e', card.dataset.easing || 'linear');
        card.style.setProperty('--_d', (card.dataset.dur || 900) + 'ms');
        card.classList.remove('is-play'); void card.offsetWidth; card.classList.add('is-play');
      };
      card.addEventListener('click', play);
      card.addEventListener('pointerenter', play);
    });
    /* 进退场不对称 */
    $$('[data-ee]', scope).forEach(btn => btn.addEventListener('click', () => {
      const card = document.getElementById(btn.dataset.ee); if (!card) return;
      const cls = btn.dataset.eeKind === 'exit' ? 'is-exit' : 'is-enter';
      card.classList.remove('is-enter', 'is-exit'); void card.offsetWidth; card.classList.add(cls);
    }));
    /* Stagger 实验室 */
    $$('.mo-stag', scope).forEach(lab => {
      const grid = $('.mo-stag__grid', lab), sRange = $('[data-stag-step]', lab), dRange = $('[data-stag-dur]', lab);
      if (!grid) return;
      if (!grid.children.length) for (let i = 0; i < 18; i++) { const c = document.createElement('span'); c.className = 'mo-stag__cell'; grid.appendChild(c); }
      $$('.mo-stag__cell', grid).forEach((c, i) => c.style.setProperty('--i', i));
      const apply = () => {
        lab.style.setProperty('--_s', (sRange?.value || 40) + 'ms');
        lab.style.setProperty('--_d', (dRange?.value || 420) + 'ms');
        $('[data-stag-step-out]', lab) && ($('[data-stag-step-out]', lab).value = (sRange?.value || 40) + ' ms');
        $('[data-stag-dur-out]', lab) && ($('[data-stag-dur-out]', lab).value = (dRange?.value || 420) + ' ms');
      };
      const play = () => { if (reduced()) return; apply(); lab.classList.remove('is-play'); void lab.offsetWidth; lab.classList.add('is-play'); };
      [sRange, dRange].forEach(r => r?.addEventListener('input', () => { apply(); play(); }));
      $('[data-stag-play]', lab)?.addEventListener('click', play);
      apply();
      if ('IntersectionObserver' in window) { const o = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { play(); o.unobserve(e.target); } }), { threshold: .4 }); o.observe(lab); }
    });
    /* FLIP · 共享元素连续性 */
    const scrim = $('.mo-flip__scrim', scope);
    $$('.mo-flip__card', scope).forEach(card => card.addEventListener('click', () => {
      const first = card.getBoundingClientRect();
      const open = !card.classList.contains('is-open');
      card.classList.toggle('is-open', open); scrim?.classList.toggle('is-on', open);
      if (reduced()) return;
      const last = card.getBoundingClientRect();
      const dx = first.left - last.left, dy = first.top - last.top;
      const sx = first.width / last.width, sy = first.height / last.height;
      card.animate(
        [{ transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` }, { transform: 'none' }],
        { duration: open ? 520 : 340, easing: open ? 'cubic-bezier(.2,0,0,1)' : 'cubic-bezier(.4,0,1,1)' }
      );
    }));
    scrim?.addEventListener('click', () => { $('.mo-flip__card.is-open', scope)?.click(); });
    document.addEventListener('keydown', ev => { if (ev.key === 'Escape') $('.mo-flip__card.is-open')?.click(); });
    /* 滚动驱动演示：进度条 */
    $$('.mo-scroll', scope).forEach(box => {
      const bar = $('.mo-scroll__prog i', box);
      box.addEventListener('scroll', () => { if (bar) bar.style.width = (box.scrollTop / (box.scrollHeight - box.clientHeight)) * 100 + '%'; }, { passive: true });
    });
    /* 书法运笔 */
    $$('.mo-write', scope).forEach(box => {
      $$('path', box).forEach((p, i) => { try { p.style.setProperty('--len', Math.ceil(p.getTotalLength())); } catch (_) {} p.style.setProperty('--i', i); });
      const play = () => { box.classList.remove('is-play'); void box.offsetWidth; box.classList.add('is-play'); };
      box.addEventListener('click', play);
      if ('IntersectionObserver' in window) { const o = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { play(); o.unobserve(e.target); } }), { threshold: .4 }); o.observe(box); }
    });
    /* 骨架 → 内容 */
    $$('[data-load]', scope).forEach(btn => btn.addEventListener('click', () => {
      const box = document.getElementById(btn.dataset.load); if (!box) return;
      box.classList.remove('is-loaded'); box.classList.add('is-loading');
      $$('.mo-load__row', box).forEach((r, i) => r.style.setProperty('--i', i));
      setTimeout(() => { box.classList.remove('is-loading'); box.classList.add('is-loaded'); }, 900);
    }));
  }


  /* ── 7 · 指针尾随环 + 视差（合成器友好，只动 transform） ── */
  function bindAmbient() {
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (fine && !reduced() && !document.querySelector('.cursor-ring')) {
      const ring = document.createElement('div');
      ring.className = 'cursor-ring'; ring.setAttribute('aria-hidden', 'true');
      document.body.appendChild(ring);
      let tx = innerWidth / 2, ty = innerHeight / 2, cx = tx, cy = ty, on = false;
      addEventListener('pointermove', ev => {
        tx = ev.clientX; ty = ev.clientY;
        if (!on) { on = true; cx = tx; cy = ty; ring.classList.add('is-on'); }
        const hot = ev.target.closest?.('a, button, [role="button"], input, .mo-curve, .mo-flip__card, .swatch');
        ring.classList.toggle('is-hot', !!hot);
      }, { passive: true });
      addEventListener('pointerleave', () => { on = false; ring.classList.remove('is-on'); }, { passive: true });
      const loop = () => { cx += (tx - cx) * 0.16; cy += (ty - cy) * 0.16; ring.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`; requestAnimationFrame(loop); };
      requestAnimationFrame(loop);
    }
    const layers = $$('[data-parallax]');
    if (!layers.length || reduced()) return;
    let t = false;
    const run = () => {
      layers.forEach(l => {
        const k = Number(l.dataset.parallax) || 0.15;
        const r = l.parentElement.getBoundingClientRect();
        if (r.bottom < -200 || r.top > innerHeight + 200) return;
        const y = Math.max(-40, Math.min(40, -r.top * k));
        l.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(1.12)`;
      });
      t = false;
    };
    addEventListener('scroll', () => { if (!t) { t = true; requestAnimationFrame(run); } }, { passive: true });
    run();
  }

  /* ── 汇总 ── */
  function refresh(scope = document) {
    bindReveal(scope); runSplit(scope); bindCounters(scope);
    bindPointer(scope); bindMarquee(scope); bindLab(scope); bindAmbient();
  }
  window.sinoMotion = { refresh, splitLines, splitChars };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => refresh());
  else refresh();
  /* 字体加载后重排视觉行 */
  document.fonts?.ready.then(() => runSplit());
})();
