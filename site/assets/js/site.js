/* ═══════════════════════════════════════════════════════════════════════════
   site.js · 站点外壳
   实体切换 · 暗色三态 · ⌘K 全站检索 · Reveal / RuleReveal · 栅格覆盖 · 令牌复制
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var LS_THEME = 'sinotao.theme';
  var LS_SCHEME = 'sinotao.scheme';
  var root = document.documentElement;

  /* ── 五实体 ──────────────────────────────────────────────────────── */
  var ENTITIES = [
    { k: 'stg', code: 'STG', name: '源裕兴创新未来', desc: '战略中枢 · 合规治理与资本配置', hex: '#463154', cn: '玄紫' },
    { k: 'ste', code: 'STE', name: '九派国有能源', desc: '生物质热电联产、燃料收储与碳资产开发', hex: '#2C4A3B', cn: '松烟绿' },
    { k: 'sti', code: 'STI', name: '源裕兴进出口贸易', desc: '以九江港为枢纽的多式联运与报关合规', hex: '#26374F', cn: '藏青' },
    { k: 'sth', code: 'STH', name: '源裕兴健康科技', desc: 'PHA 医用材料与药物递送载体的中试与注册', hex: '#2D5257', cn: '石青' },
    { k: 'edu', code: 'EDU', name: '崇仁教育', desc: 'K12 学生成长档案与家校协同', hex: '#7A3229', cn: '赭朱' }
  ];

  /* ── 全典索引 · 序 + 二十二章 ────────────────────────────────────── */
  var INDEX = [
    ['序', '设计哲学：墨是最贵的颜色', 'volume-1.html#ch-prologue', '第一册 · 序与总纲', '守正 开物 共生 儒侠气质 明度落差 philosophy'],
    ['000', 'V7.0 改了什么', 'volume-1.html#ch-00', '第一册 · 序与总纲', '变更摘要 changelog 新增 修改 废止'],
    ['001', '五家公司，一套设计语法', 'volume-1.html#ch-01', '第一册 · 序与总纲', '语境 实体 STG STE STI STH EDU context'],
    ['002', '内容与文案：写动作，不写「确定」', 'volume-1.html#ch-02', '第一册 · 序与总纲', '文案 语调 术语 数字 标点 emoji copy'],
    ['003', '色彩：高阶不靠色度，靠明度落差', 'volume-2.html#ch-03', '第二册 · 基础', '色彩 配额 状态色 涨跌 双重编码 color'],
    ['004', '色板全景', 'volume-2.html#ch-04', '第二册 · 基础', '色板 墨 朱 金 palette 十一阶 语义表面'],
    ['005', '模块识别：三层结构，色相只有一个', 'volume-2.html#ch-05', '第二册 · 基础', '模块 M1 M2 M3 M4 M5 明度档 module'],
    ['006', '字体：三轨分工，九级字阶', 'volume-2.html#ch-06', '第二册 · 基础', '字体 字阶 宋体 字重 typography 排版纪律'],
    ['007', '刻度与断点', 'volume-2.html#ch-07', '第二册 · 基础', '间距 刻度 断点 栅格 scale 4px'],
    ['008', '间距与版面：两档节奏，编号章节', 'volume-2.html#ch-08', '第二册 · 基础', '版面 品牌面 产品面 节奏 章节头 layout'],
    ['009', '面板与边界：一重边界，不许第二重', 'volume-3.html#ch-09', '第三册 · 表达', '面板 边界 StatBand 卡中卡 表格 surface'],
    ['010', '图标：功能靠现成，品牌靠规则', 'volume-3.html#ch-10', '第三册 · 表达', '图标 点阵 EntityLattice Material Symbols icon'],
    ['011', '业务图标清单', 'volume-3.html#ch-11', '第三册 · 表达', '图标清单 映射 inventory 一概念一图标'],
    ['012', '字标：规范与应用', 'volume-3.html#ch-12', '第三册 · 表达', '字标 wordmark logo 留白 禁止用法'],
    ['013', '图表：四种形态，装饰一律不留', 'volume-4.html#ch-13', '第四册 · 数据与行为', '图表 折线 条形 环形 量表 chart 小倍数'],
    ['014', '图解语言：五种形态，一套原子', 'volume-4.html#ch-14', '第四册 · 数据与行为', '图解 流程 闭环 层级树 逻辑 思维图 diagram'],
    ['015', '可视化与影像', 'volume-4.html#ch-15', '第四册 · 数据与行为', 'DotDensity 溯源胶囊 影像 选型决策表'],
    ['016', '动效与状态：动效即叙事', 'volume-4.html#ch-16', '第四册 · 数据与行为', '动效 Reveal RuleReveal Marquee LatticeSpin 状态 motion'],
    ['017', '组件与令牌总账', 'volume-5.html#ch-17', '第五册 · 治理', '组件 令牌 37 421 十二条准则 ledger'],
    ['018', '产品面与屏幕清单', 'volume-5.html#ch-18', '第五册 · 治理', '产品面 UI kit 控制台 品牌官网 驾驶舱'],
    ['019', '仓库结构与索引', 'volume-5.html#ch-19', '第五册 · 治理', '仓库 目录 styles.css 组件约定 repository'],
    ['020', '与 M3 对照：补五条，不采纳四条', 'volume-5.html#ch-20', '第五册 · 治理', 'Material Design 3 状态层 窗口尺寸类 on- 配对'],
    ['021', '来源、授权与偏离说明', 'volume-5.html#ch-21', '第五册 · 治理', '来源 授权 偏离 圆角双轨 Geist Univers Pentagram'],
    ['—', '图谱 · 生成式插图集', 'atlas.html', '附录', '插图 点阵 扉画 生成规则 atlas 图谱'],
    ['—', '令牌总表', 'tokens.html', '附录', '令牌 token 总表 检索 复制'],
    ['—', '首页 · 总纲', 'index.html', '全典', '首页 home 概览']
  ];

  /* ── 主题 ────────────────────────────────────────────────────────── */
  function getTheme() {
    try { return localStorage.getItem(LS_THEME) || 'stg'; } catch (e) { return 'stg'; }
  }
  function setTheme(k) {
    root.setAttribute('data-theme', k);
    try { localStorage.setItem(LS_THEME, k); } catch (e) {}
    var ent = ENTITIES.filter(function (e) { return e.k === k; })[0] || ENTITIES[0];
    document.querySelectorAll('[data-ent-code]').forEach(function (n) { n.textContent = ent.code; });
    document.querySelectorAll('[data-ent-name]').forEach(function (n) { n.textContent = ent.name; });
    document.querySelectorAll('[data-ent-opt]').forEach(function (b) {
      b.setAttribute('aria-checked', String(b.dataset.entOpt === k));
    });
    document.querySelectorAll('.entity').forEach(function (b) {
      b.setAttribute('aria-current', String(b.dataset.entOpt === k));
    });
    document.dispatchEvent(new CustomEvent('sinotao:theme', { detail: { key: k } }));
  }

  function getScheme() {
    try { return localStorage.getItem(LS_SCHEME) || 'auto'; } catch (e) { return 'auto'; }
  }
  function applyScheme(v) {
    var dark = v === 'dark' ||
      (v === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
    root.setAttribute('data-color-scheme', dark ? 'dark' : 'light');
    root.setAttribute('data-scheme-pref', v);
    try { localStorage.setItem(LS_SCHEME, v); } catch (e) {}
    var lab = { auto: '随系统', light: '浅色', dark: '暗色' }[v];
    document.querySelectorAll('[data-scheme-label]').forEach(function (n) { n.textContent = lab; });
    document.querySelectorAll('[data-scheme-icon]').forEach(function (n) {
      n.textContent = v === 'auto' ? 'contrast' : v === 'dark' ? 'dark_mode' : 'light_mode';
    });
    document.dispatchEvent(new CustomEvent('sinotao:scheme', { detail: { dark: dark } }));
  }

  /* ── Reveal · 滚动揭示 · 错峰不超过 6 级 ───────────────────────────
     settleVisible=true 时，已在视口内的元素直接落定不再入场 ——
     内容被换掉之后（路由换页）必须立刻可读，不能停在 opacity:0 等观察器。 */
  function reveal(settleVisible) {
    var items = document.querySelectorAll('.fx-reveal:not(.is-in), .fx-rule:not(.is-in), [data-anim]:not(.is-in)');
    if (!('IntersectionObserver' in window) ||
      matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(function (n) { n.classList.add('is-in'); });
      return;
    }
    if (settleVisible) {
      var vh = window.innerHeight || 0, rest = [];
      items.forEach(function (n) {
        if (n.getBoundingClientRect().top < vh) n.classList.add('is-in');
        else rest.push(n);
      });
      items = rest;
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var sibs = e.target.parentElement
          ? Array.prototype.filter.call(e.target.parentElement.children, function (c) {
            return c.classList.contains('fx-reveal');
          }) : [];
        var i = Math.min(sibs.indexOf(e.target), 5);   // 上限 6 级 ≈ 420ms
        e.target.style.setProperty('--d', (i > 0 ? i * 70 : 0) + 'ms');
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
      // 提前一档触发：元素刚探进视口就起，不留「已在屏内却仍透明」的窗口
    }, { rootMargin: '0px 0px 10% 0px', threshold: 0 });
    items.forEach(function (n) { io.observe(n); });
  }

  /* ── Toast ───────────────────────────────────────────────────────── */
  var toastEl, toastT;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove('is-on'); }, 1800);
  }

  function copy(text) {
    var done = function () { toast('已复制 ' + text); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(text, done); });
    } else { fallback(text, done); }
  }
  function fallback(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:-9999px';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { toast('复制失败'); }
    document.body.removeChild(ta);
  }

  /* ── ⌘K 命令面板 ─────────────────────────────────────────────────── */
  function palette() {
    var box = document.getElementById('kmenu');
    if (!box) return;
    var input = box.querySelector('.kmenu__in');
    var list = box.querySelector('.kmenu__list');
    var sel = 0, rows = [];

    function render(q) {
      var qq = (q || '').trim().toLowerCase();
      var hits = INDEX.filter(function (r) {
        if (!qq) return true;
        return (r[0] + ' ' + r[1] + ' ' + r[3] + ' ' + r[4]).toLowerCase().indexOf(qq) > -1;
      });
      sel = 0;
      if (!hits.length) {
        list.innerHTML = '<div class="kmenu__empty">没有匹配的条目。试试「色彩」「图解」「令牌」。</div>';
        rows = []; return;
      }
      list.innerHTML = hits.map(function (r, i) {
        return '<a class="kmenu__i' + (i === 0 ? ' is-sel' : '') + '" href="' + r[2] + '">' +
          '<i>' + r[0] + '</i><b>' + r[1] + '</b><span>' + r[3] + '</span></a>';
      }).join('');
      rows = Array.prototype.slice.call(list.querySelectorAll('.kmenu__i'));
    }
    function mark() {
      rows.forEach(function (r, i) { r.classList.toggle('is-sel', i === sel); });
      if (rows[sel]) rows[sel].scrollIntoView({ block: 'nearest' });
    }
    function open() {
      box.hidden = false;
      render('');
      input.value = '';
      requestAnimationFrame(function () { input.focus(); });
      document.body.style.overflow = 'hidden';
    }
    function close() {
      box.hidden = true;
      document.body.style.overflow = '';
    }

    input.addEventListener('input', function () { render(input.value); });
    box.querySelector('.kmenu__scrim').addEventListener('click', close);
    box.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(sel + 1, rows.length - 1); mark(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(sel - 1, 0); mark(); }
      if (e.key === 'Enter' && rows[sel]) { e.preventDefault(); location.href = rows[sel].getAttribute('href'); }
    });
    document.querySelectorAll('[data-k-open]').forEach(function (b) {
      b.addEventListener('click', open);
    });
    document.addEventListener('keydown', function (e) {
      var t = e.target, tag = t && t.tagName;
      var typing = tag === 'INPUT' || tag === 'TEXTAREA' || (t && t.isContentEditable);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); box.hidden ? open() : close(); return;
      }
      if (typing) return;
      if (e.key === '/') { e.preventDefault(); open(); }
      if (e.key.toLowerCase() === 'g' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        var gl = document.getElementById('gridlay');
        if (gl) { gl.classList.toggle('is-on'); toast(gl.classList.contains('is-on') ? '栅格：开' : '栅格：关'); }
      }
    });
  }

  /* ── 抽屉 ────────────────────────────────────────────────────────── */
  function drawer() {
    var d = document.getElementById('drawer');
    if (!d) return;
    var open = function () { d.hidden = false; document.body.style.overflow = 'hidden';
      var f = d.querySelector('.drawer__l'); if (f) f.focus(); };
    var close = function () { d.hidden = true; document.body.style.overflow = ''; };
    document.querySelectorAll('[data-drawer-open]').forEach(function (b) { b.addEventListener('click', open); });
    d.querySelector('.drawer__scrim').addEventListener('click', close);
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    d.querySelectorAll('.drawer__l').forEach(function (a) { a.addEventListener('click', close); });
  }

  /* ── 实体切换器 ──────────────────────────────────────────────────── */
  function switcher() {
    var host = document.getElementById('entsw');
    if (host) {
      var btn = host.querySelector('[data-entsw-btn]');
      var menu = host.querySelector('.entsw__menu');
      menu.innerHTML = ENTITIES.map(function (e) {
        return '<button class="entsw__opt" role="menuitemradio" data-ent-opt="' + e.k +
          '" style="--tile:' + e.hex + '"><i></i><b>' + e.code + '</b><span>' + e.name + '</span></button>';
      }).join('');
      btn.addEventListener('click', function () {
        var open = menu.hidden;
        menu.hidden = !open;
        btn.setAttribute('aria-expanded', String(open));
      });
      document.addEventListener('click', function (e) {
        if (!host.contains(e.target)) { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); }
      });
      host.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
      });
    }
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-ent-opt]');
      if (!b) return;
      setTheme(b.dataset.entOpt);
      var m = document.querySelector('.entsw__menu');
      if (m) { m.hidden = true; var bb = document.querySelector('[data-entsw-btn]');
        if (bb) bb.setAttribute('aria-expanded', 'false'); }
    });
  }

  /* ── 暗色三态 ────────────────────────────────────────────────────── */
  function schemeToggle() {
    var order = ['auto', 'light', 'dark'];
    document.querySelectorAll('[data-scheme-btn]').forEach(function (b) {
      b.addEventListener('click', function () {
        var cur = getScheme();
        applyScheme(order[(order.indexOf(cur) + 1) % 3]);
      });
    });
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
      if (getScheme() === 'auto') applyScheme('auto');
    });
  }

  /* ── 复制令牌 ────────────────────────────────────────────────────── */
  function copyables() {
    document.addEventListener('click', function (e) {
      var n = e.target.closest('[data-copy]');
      if (n) copy(n.dataset.copy);
    });
  }

  /* ── 闭环图联动 ──────────────────────────────────────────────────── */
  function loops() {
    document.querySelectorAll('[data-loop]').forEach(function (host) {
      var items = host.querySelectorAll('.loop__item');
      var segs = host.querySelectorAll('[data-seg]');
      function pick(i) {
        items.forEach(function (n, j) { n.setAttribute('aria-current', String(i === j)); });
        segs.forEach(function (s, j) {
          s.setAttribute('stroke-width', i === j ? 2 : 1);
          s.setAttribute('opacity', i === j ? 1 : 0.34);
        });
      }
      items.forEach(function (n, i) {
        n.addEventListener('mouseenter', function () { pick(i); });
        n.addEventListener('focus', function () { pick(i); });
        n.addEventListener('click', function () { pick(i); });
        n.setAttribute('tabindex', '0');
      });
      pick(0);
    });
  }

  /* ── 顶栏当前页 ──────────────────────────────────────────────────── */
  function currentNav() {
    var f = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navlink, .vol-pill').forEach(function (a) {
      var h = (a.getAttribute('href') || '').split('#')[0];
      if (h === f) a.setAttribute('aria-current', 'page');
    });
  }

  /* ── 重扫 ────────────────────────────────────────────────────────
     内容被换掉之后重新接管：揭示、条形宽度、闭环联动。
     复制走的是 document 级委托，无需重绑。                        ── */
  function rescan(root) {
    reveal(true);
    loops();
    if (window.Charts) window.Charts.bars(root || document);
  }

  /* ── 引导 ────────────────────────────────────────────────────────── */
  function init() {
    setTheme(getTheme());
    applyScheme(getScheme());
    switcher(); schemeToggle(); palette(); drawer();
    copyables(); currentNav();
    rescan(document);
  }

  window.Site = {
    ENTITIES: ENTITIES, INDEX: INDEX,
    toast: toast, copy: copy, setTheme: setTheme, rescan: rescan
  };

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();
