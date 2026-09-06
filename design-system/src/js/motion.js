/* ============================================================
   motion.js · 动效编排层 · V40「守正」
   画布准则：动效词汇只有三样 —— Reveal · RuleReveal · Marquee。
   无弹跳、无缩放入场、无视差、无指针跟随物。只动 transform 与 opacity。
   prefers-reduced-motion 下给终态，不是全关。
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

  /* ── 1 · Reveal / RuleReveal（原生滚动驱动不可用时的观察者回退） ── */
  let obs;
  function bindReveal(scope = document) {
    /* 错峰不超过 6 级 */
    $$('[data-stagger]', scope).forEach(box => $$(':scope > *', box).forEach((c, i) => c.style.setProperty('--rv-d', Math.min(i, 5))));
    if (nativeTimeline || reduced()) return;
    obs = obs || new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in'); obs.unobserve(e.target);
    }), { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    $$('.rv, .rule-reveal', scope).forEach(el => { if (!el.classList.contains('is-in')) obs.observe(el); });
  }

  /* ── 2 · 数字滚动（等宽数字，进入视口触发一次） ── */
  function bindCounters(scope = document) {
    const els = $$('[data-count]', scope);
    if (!els.length) return;
    const settle = el => { el.textContent = Number(el.dataset.count).toLocaleString('zh-CN'); };
    if (reduced() || !('IntersectionObserver' in window)) return els.forEach(settle);
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, end = Number(el.dataset.count), t0 = performance.now(), dur = 900;
      const step = now => {
        const k = Math.min(1, (now - t0) / dur);
        el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))).toLocaleString('zh-CN');
        if (k < 1) requestAnimationFrame(step); else settle(el);
      };
      requestAnimationFrame(step); io.unobserve(el);
    }), { threshold: 0.5 });
    els.forEach(el => io.observe(el));
  }

  /* ── 3 · Marquee：内容不足两屏时复制补齐（一页最多一次，≥30s/圈） ── */
  function bindMarquee(scope = document) {
    $$('[data-marquee]', scope).forEach(el => {
      const rows = $$('.mq__row', el);
      if (!rows.length) return;
      const host = el.parentElement;
      let guard = 0;
      while (el.scrollWidth < host.clientWidth * 2 && guard++ < 8) rows.forEach(r => el.appendChild(r.cloneNode(true)));
    });
  }

  /* ── 4 · 动效章实验室 ── */
  function bindLab(scope = document) {
    /* 缓动曲线：绘制 + 播放 */
    $$('.mo-curve', scope).forEach(card => {
      const bez = card.dataset.bezier, plot = $('.mo-curve__plot', card);
      if (plot && bez) {
        const [x1, y1, x2, y2] = bez.split(',').map(Number);
        const W = 100, H = 72, px = v => (v * W).toFixed(2), py = v => (H - v * H).toFixed(2);
        plot.innerHTML = `<svg viewBox="0 0 ${W} ${H}" aria-hidden="true"><path class="mo-curve__path" d="M0,${py(0)} C${px(x1)},${py(y1)} ${px(x2)},${py(y2)} ${W},${py(1)}"/><circle class="mo-curve__dot" cx="${px(x1)}" cy="${py(y1)}" r="2.2"/><circle class="mo-curve__dot" cx="${px(x2)}" cy="${py(y2)}" r="2.2"/></svg>`;
      }
      const play = () => {
        if (reduced()) return;
        const track = $('.mo-curve__track', card); if (!track) return;
        card.style.setProperty('--_w', track.clientWidth + 'px');
        card.style.setProperty('--_e', card.dataset.easing || 'linear');
        card.style.setProperty('--_d', (card.dataset.dur || 300) + 'ms');
        card.classList.remove('is-play'); void card.offsetWidth; card.classList.add('is-play');
      };
      card.addEventListener('click', play);
      card.addEventListener('pointerenter', play);
    });
    /* 进退场对照 */
    $$('[data-ee]', scope).forEach(btn => btn.addEventListener('click', () => {
      const card = document.getElementById(btn.dataset.ee); if (!card) return;
      const cls = btn.dataset.eeKind === 'exit' ? 'is-exit' : 'is-enter';
      card.classList.remove('is-enter', 'is-exit'); void card.offsetWidth; card.classList.add(cls);
    }));
    /* Reveal 错峰实验室 */
    $$('.mo-stag', scope).forEach(lab => {
      const grid = $('.mo-stag__grid', lab), sR = $('[data-stag-step]', lab), dR = $('[data-stag-dur]', lab);
      if (!grid) return;
      if (!grid.children.length) for (let i = 0; i < 18; i++) { const c = document.createElement('span'); c.className = 'mo-stag__cell'; grid.appendChild(c); }
      $$('.mo-stag__cell', grid).forEach((c, i) => c.style.setProperty('--i', i));
      const apply = () => {
        lab.style.setProperty('--_s', (sR?.value || 70) + 'ms');
        lab.style.setProperty('--_d', (dR?.value || 500) + 'ms');
        const so = $('[data-stag-step-out]', lab), do_ = $('[data-stag-dur-out]', lab);
        if (so) so.value = (sR?.value || 70) + ' ms';
        if (do_) do_.value = (dR?.value || 500) + ' ms';
      };
      const play = () => { if (reduced()) return; apply(); lab.classList.remove('is-play'); void lab.offsetWidth; lab.classList.add('is-play'); };
      [sR, dR].forEach(r => r?.addEventListener('input', () => { apply(); play(); }));
      $('[data-stag-play]', lab)?.addEventListener('click', play);
      apply();
      if ('IntersectionObserver' in window) { const o = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { play(); o.unobserve(e.target); } }), { threshold: .4 }); o.observe(lab); }
    });
    /* 滚动驱动演示进度 */
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
      box.classList.remove('is-loaded');
      $$('.mo-load__row', box).forEach((r, i) => r.style.setProperty('--i', i));
      setTimeout(() => box.classList.add('is-loaded'), 700);
    }));
  }

  function refresh(scope = document) { bindReveal(scope); bindCounters(scope); bindMarquee(scope); bindLab(scope); }
  window.sinoMotion = { refresh };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => refresh());
  else refresh();
})();
