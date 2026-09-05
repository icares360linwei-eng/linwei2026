/* ============================================================
   sino.js · 源裕兴设计系统 · 组件行为层（无依赖，渐进增强）
   ============================================================ */
(function () {
  'use strict';
  const root = document.getElementById('sino');
  if (!root) return;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const store = { get(k) { try { return localStorage.getItem(k); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch { /* 私密模式等 */ } } };

  /* ── 主题控制器：实体 + 色彩方案 ── */
  const Theme = {
    entities: ['stg', 'ste', 'sti', 'sth', 'edu'],
    setEntity(e) {
      if (!this.entities.includes(e)) return;
      root.dataset.theme = e; store.set('sino.entity', e);
      $$('[data-entity-btn]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.entityBtn === e)));
      $$('[data-entity-label]').forEach(el => { el.textContent = window.SINO_DATA?.entity?.[e]?.['sino.name'] || e.toUpperCase(); });
      document.dispatchEvent(new CustomEvent('sino:entity', { detail: e }));
    },
    setScheme(s) {
      root.dataset.colorScheme = s; store.set('sino.scheme', s);
      $$('[data-scheme-btn]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.schemeBtn === s)));
      document.dispatchEvent(new CustomEvent('sino:scheme', { detail: s }));
    },
    init() {
      this.setEntity(store.get('sino.entity') || root.dataset.theme || 'stg');
      this.setScheme(store.get('sino.scheme') || 'dark');
      document.addEventListener('click', ev => {
        const e = ev.target.closest('[data-entity-btn]'); if (e) return this.setEntity(e.dataset.entityBtn);
        const s = ev.target.closest('[data-scheme-btn]'); if (s) return this.setScheme(s.dataset.schemeBtn);
      });
    }
  };
  Theme.init();
  document.addEventListener('sino:set-entity', ev => Theme.setEntity(ev.detail));

  /* ── Toast ── */
  const toaster = $('#toaster');
  const ICONS = { success: 'i-check-circle', warning: 'i-alert', error: 'i-x-circle', info: 'i-info' };
  function toast({ type = 'info', title = '', desc = '', ttl = 3000 } = {}) {
    if (!toaster) return;
    const el = document.createElement('div');
    el.className = `m-toast m-toast--${type}`; el.setAttribute('role', type === 'error' ? 'alert' : 'status');
    el.innerHTML = `<svg class="a-icon m-toast__icon"><use href="#${ICONS[type] || ICONS.info}"/></svg><div class="m-toast__body"><div class="m-toast__title"></div><div class="m-toast__desc"></div></div><button class="a-btn a-btn--icon a-btn--s m-toast__close" type="button" aria-label="关闭"><svg class="a-icon"><use href="#i-x"/></svg></button>`;
    el.querySelector('.m-toast__title').textContent = title; el.querySelector('.m-toast__desc').textContent = desc;
    if (!desc) el.querySelector('.m-toast__desc').remove();
    const kill = () => { el.classList.add('is-leaving'); setTimeout(() => el.remove(), 220); };
    el.querySelector('.m-toast__close').addEventListener('click', kill);
    toaster.appendChild(el); setTimeout(kill, ttl);
  }
  window.sinoToast = toast;
  document.addEventListener('click', ev => {
    const t = ev.target.closest('[data-toast]'); if (!t) return;
    toast({ type: t.dataset.toast, title: t.dataset.toastTitle || '已完成', desc: t.dataset.toastDesc || '' });
  });

  /* ── 复制 Token ── */
  document.addEventListener('click', async ev => {
    const c = ev.target.closest('[data-copy]'); if (!c) return;
    const text = c.dataset.copy; let ok = false;
    try { await navigator.clipboard.writeText(text); ok = true; } catch { ok = false; }
    toast({ type: ok ? 'success' : 'info', title: ok ? `已复制 ${text}` : text, desc: ok ? '' : '剪贴板不可用，请手动复制' });
  });

  /* ── Tabs（role=tablist，键盘左右切换） ── */
  $$('[role="tablist"]').forEach(list => {
    const tabs = $$('[role="tab"]', list);
    const activate = (tab) => {
      tabs.forEach(t => { const on = t === tab; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; const p = t.getAttribute('aria-controls') && document.getElementById(t.getAttribute('aria-controls')); if (p) p.hidden = !on; });
    };
    list.addEventListener('click', ev => { const t = ev.target.closest('[role="tab"]'); if (t) activate(t); });
    list.addEventListener('keydown', ev => {
      const i = tabs.indexOf(document.activeElement); if (i < 0) return;
      const n = ev.key === 'ArrowRight' ? (i + 1) % tabs.length : ev.key === 'ArrowLeft' ? (i - 1 + tabs.length) % tabs.length : ev.key === 'Home' ? 0 : ev.key === 'End' ? tabs.length - 1 : -1;
      if (n >= 0) { ev.preventDefault(); tabs[n].focus(); activate(tabs[n]); }
    });
  });

  /* ── 分段 / 芯片 / 切换按钮（aria-pressed 组） ── */
  document.addEventListener('click', ev => {
    const b = ev.target.closest('[data-toggle-group] [aria-pressed]'); if (!b) return;
    const g = b.closest('[data-toggle-group]');
    if (g.dataset.toggleGroup === 'multi') { b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')); }
    else $$('[aria-pressed]', g).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  });

  /* ── 焦点陷阱 + 对话框 / 抽屉 ── */
  const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
  let lastTrigger = null;
  function openLayer(id) {
    const layer = document.getElementById(id); if (!layer) return;
    lastTrigger = document.activeElement; layer.classList.add('is-open'); layer.removeAttribute('aria-hidden');
    const first = $(FOCUSABLE, layer); if (first) setTimeout(() => first.focus(), 30);
    document.body.style.overflow = 'hidden';
  }
  function closeLayer(layer) {
    if (!layer) return; layer.classList.remove('is-open'); layer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastTrigger) { lastTrigger.focus(); lastTrigger = null; }
  }
  document.addEventListener('click', ev => {
    const o = ev.target.closest('[data-open]'); if (o) { ev.preventDefault(); return openLayer(o.dataset.open); }
    const c = ev.target.closest('[data-close]'); if (c) { ev.preventDefault(); return closeLayer(c.closest('.o-modal, .o-drawer, .cx-cmdk')); }
    const m = ev.target.closest('.o-modal.is-open, .o-drawer.is-open'); if (m && ev.target === m) closeLayer(m);
  });
  document.addEventListener('keydown', ev => {
    const open = $('.o-modal.is-open, .o-drawer.is-open'); if (!open) return;
    if (ev.key === 'Escape') return closeLayer(open);
    if (ev.key === 'Tab') {
      const f = $$(FOCUSABLE, open); if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
      else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
    }
  });
  window.sinoOpen = openLayer; window.sinoClose = closeLayer;

  /* ── 表格：排序 + 行选择 ── */
  $$('.o-table[data-sortable]').forEach(wrap => {
    const table = $('table', wrap); const tbody = $('tbody', table);
    $$('th[aria-sort]', table).forEach((th, idx) => {
      th.addEventListener('click', () => {
        const dir = th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending';
        $$('th[aria-sort]', table).forEach(x => x.setAttribute('aria-sort', 'none')); th.setAttribute('aria-sort', dir);
        const col = Array.from(th.parentNode.children).indexOf(th);
        const rows = $$('tr', tbody);
        const val = r => { const c = r.children[col]; return c?.dataset.sort ?? c?.textContent.trim() ?? ''; };
        rows.sort((a, b) => { const x = val(a), y = val(b); const nx = parseFloat(x.replace(/[^\d.-]/g, '')), ny = parseFloat(y.replace(/[^\d.-]/g, '')); const r = (!isNaN(nx) && !isNaN(ny)) ? nx - ny : x.localeCompare(y, 'zh'); return dir === 'ascending' ? r : -r; });
        rows.forEach(r => tbody.appendChild(r));
      });
    });
    const all = $('thead input[type="checkbox"]', table); const count = $('[data-selected-count]', wrap);
    const sync = () => { const boxes = $$('tbody input[type="checkbox"]', table); const n = boxes.filter(b => b.checked).length; boxes.forEach(b => b.closest('tr').setAttribute('aria-selected', String(b.checked))); if (all) { all.checked = n === boxes.length && n > 0; all.indeterminate = n > 0 && n < boxes.length; } if (count) count.textContent = n; };
    if (all) all.addEventListener('change', () => { $$('tbody input[type="checkbox"]', table).forEach(b => b.checked = all.checked); sync(); });
    tbody.addEventListener('change', ev => { if (ev.target.matches('input[type="checkbox"]')) sync(); });
  });

  /* ── 表单：失焦验证 ── */
  const RULES = {
    required: v => v.trim() !== '' || '此项为必填',
    phone: v => /^1\d{10}$/.test(v.replace(/[-\s]/g, '')) || '手机号应为 11 位数字',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || '请输入有效的邮箱地址',
    min8: v => v.length >= 8 || '至少 8 个字符',
  };
  function validateField(input) {
    const field = input.closest('.m-field'); const msg = field && $('.m-field__msg', field); const rules = (input.dataset.validate || '').split(/\s+/).filter(Boolean);
    let err = '';
    for (const r of rules) { const res = RULES[r] ? RULES[r](input.value) : true; if (res !== true) { err = res; break; } }
    input.setAttribute('aria-invalid', err ? 'true' : 'false'); input.classList.toggle('is-success', !err && input.value.trim() !== '' && rules.length > 0);
    if (msg) { msg.innerHTML = err ? `<span class="a-error"><svg class="a-icon"><use href="#i-alert"/></svg><span></span></span>` : (msg.dataset.help ? `<span class="a-help"></span>` : ''); const s = msg.querySelector('span span, .a-help'); if (s) s.textContent = err || msg.dataset.help || ''; }
    return !err;
  }
  document.addEventListener('blur', ev => { if (ev.target.matches?.('[data-validate]')) validateField(ev.target); }, true);
  document.addEventListener('input', ev => { if (ev.target.matches?.('[data-validate][aria-invalid="true"]')) validateField(ev.target); });
  $$('form[data-validate-form]').forEach(f => f.addEventListener('submit', ev => { ev.preventDefault(); const ok = $$('[data-validate]', f).map(validateField).every(Boolean); toast(ok ? { type: 'success', title: '已保存并提交', desc: '表单验证通过（演示，不会真正发送）' } : { type: 'error', title: '请修正标红的字段', desc: '错误信息已在字段下方就近显示' }); }));

  /* ── 加载态演示 ── */
  document.addEventListener('click', ev => { const b = ev.target.closest('[data-loading-demo]'); if (!b) return; b.classList.add('is-loading'); b.setAttribute('aria-busy', 'true'); setTimeout(() => { b.classList.remove('is-loading'); b.removeAttribute('aria-busy'); toast({ type: 'success', title: '报关单 #STI-2026-0718 已提交', desc: '预计 2 小时内审核' }); }, 1600); });

  /* ── AI 流式输出演示 ── */
  $$('[data-stream]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.stream); if (!target || btn.dataset.busy) return;
      const text = target.dataset.text || ''; btn.dataset.busy = '1'; target.textContent = '';
      const cur = document.createElement('span'); cur.className = 'cursor'; target.appendChild(cur);
      let i = 0; const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const step = () => { if (reduced) { target.textContent = text; delete btn.dataset.busy; return; } if (i < text.length) { cur.insertAdjacentText('beforebegin', text[i++]); setTimeout(step, /[，。；：！？]/.test(text[i - 1]) ? 220 : 28); } else { cur.remove(); delete btn.dataset.busy; const meta = target.closest('.o-ai__bubble')?.nextElementSibling; if (meta) meta.hidden = false; } };
      step();
    });
  });

  /* ── 进度条动画（进入视口） ── */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.style.setProperty('--value', e.target.dataset.value + '%'); io.unobserve(e.target); } }), { threshold: .4 });
    $$('.a-progress__bar[data-value]').forEach(el => io.observe(el));
  } else $$('.a-progress__bar[data-value]').forEach(el => el.style.setProperty('--value', el.dataset.value + '%'));
})();
