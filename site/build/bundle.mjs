/* ═══════════════════════════════════════════════════════════════════════════
   bundle.mjs · 把八个页面折成一个自包含的单文件，供在线预览／分享
   ─────────────────────────────────────────────────────────────────────────
   与多文件站点同源：CSS / JS / 内容全部取自已构建的产物，不另写一套。
   三处必要的改写：
     1. data-theme → data-entity  —— 宿主页会在 :root 上盖 data-theme 表示明暗，
        与本典的五实体主题撞名，故在打包版里改用 data-entity。
     2. *.html 链接 → #/page 路由
     3. 明暗 auto 档先读宿主主题，再回退 prefers-color-scheme
   ═══════════════════════════════════════════════════════════════════════════ */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');

const PAGES = [
  ['index', '总纲'], ['volume-1', '第一册 · 序与总纲'], ['volume-2', '第二册 · 基础'],
  ['volume-3', '第三册 · 表达'], ['volume-4', '第四册 · 数据与行为'],
  ['volume-5', '第五册 · 治理'], ['atlas', '图谱'], ['tokens', '令牌总表']
];

/* 站内链接 → hash 路由。锚点变成路由的第二段。 */
const route = s => s
  .replace(/(["'])index\.html(#([\w-]+))?\1/g,
    (_, q, __, a) => `${q}#/${a ? '/' + a : ''}${q}`)
  .replace(/(["'])(volume-[1-5]|atlas|tokens)\.html(#([\w-]+))?\1/g,
    (_, q, p, __, a) => `${q}#/${p}${a ? '/' + a : ''}${q}`);

/* 五实体主题改名，避让宿主页的 data-theme */
const entity = s => s
  .replace(/\[data-theme=/g, '[data-entity=')
  .replace(/'data-theme'/g, "'data-entity'")
  .replace(/dataset\.theme/g, 'dataset.entity');

/* ── 取素材 ─────────────────────────────────────────────────────── */
const css = ['tokens', 'base', 'components', 'site']
  .map(f => entity(read(`assets/css/${f}.css`))).join('\n\n');

const latticeJS = read('assets/js/lattice.js');
const chartsJS = read('assets/js/charts.js');
let siteJS = entity(route(read('assets/js/site.js')));

// auto 档：先看宿主页在 :root 上盖的 data-theme，再回退系统偏好
siteJS = siteJS.replace(
  `    var dark = v === 'dark' ||
      (v === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);`,
  `    var host = document.documentElement.getAttribute('data-theme');
    var dark = v === 'dark' || (v === 'auto' && (host === 'dark' ||
      (host !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches)));`
);
if (siteJS.indexOf('var host =') < 0) throw new Error('明暗 auto 档改写未命中，检查 site.js');

/* ── 拆页 ───────────────────────────────────────────────────────── */
const grab = (html, open, close) => {
  const i = html.indexOf(open);
  const j = html.lastIndexOf(close);
  if (i < 0 || j < 0) throw new Error(`找不到 ${open}`);
  return html.slice(i + open.length, j);
};

const built = {};
let shellChrome = '';
for (const [file] of PAGES) {
  const html = read(`${file}.html`);
  const main = route(grab(html, '<main id="main">', '</main>'));
  const tail = html.slice(html.indexOf('</main>'));
  const m = tail.match(/<script src="assets\/js\/site\.js"><\/script>\s*([\s\S]*?)\s*<\/body>/);
  let init = '';
  if (m && m[1].trim()) {
    // 去掉外层 script 标签，留函数体；打包时用 AbortSignal 作用域包起来
    init = m[1].replace(/^<script>/, '').replace(/<\/script>$/, '');
  }
  built[file] = { main, init };
  if (!shellChrome) {
    // 顶栏 / 页脚 / 抽屉 / ⌘K / 栅格 —— 八页共用一套，取一次即可
    const head = html.slice(html.indexOf('<a class="skip"'), html.indexOf('<main id="main">'));
    const foot = html.slice(html.indexOf('<footer class="foot">'), html.indexOf('<script src="assets/js/lattice.js">'));
    shellChrome = { head: route(head), foot: route(foot) };
  }
}

const registry = PAGES.map(([f, t]) =>
  `  ${JSON.stringify(f)}: {t:${JSON.stringify(t)},h:${JSON.stringify(built[f].main)}` +
  // 形参 document 遮蔽全局，页内脚本里的 addEventListener 因此自动带上 signal
  (built[f].init ? `,i:function(document){${built[f].init}}` : '') + `}`
).join(',\n');

/* ── 装配 ───────────────────────────────────────────────────────── */
const out = `<meta charset="utf-8">
<title>源裕兴设计系统全典</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Noto+Sans+SC:wght@200;300;400;500;600&family=Noto+Serif+SC:wght@200;300;400;500&family=Poppins:wght@500;600&family=Space+Grotesk:wght@300;400;500;600&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0..1,0&display=swap">
<style>
${css}
</style>

${shellChrome.head}
<main id="main">
${built.index.main}
</main>
${shellChrome.foot}

<script>
${latticeJS}
</script>
<script>
${chartsJS}
</script>
<script>
${siteJS}
</script>
<script>
/* ── 单文件路由 ───────────────────────────────────────────────────
   换 <main> 的内容，然后把点阵、图表、揭示重新接管一遍。          ── */
(function () {
  var PAGES = {
${registry}
  };
  var main = document.getElementById('main');
  var abort = null;

  function parse() {
    var h = (location.hash || '#/').replace(/^#\\/?/, '');
    var seg = h.split('/').filter(Boolean);
    var page = seg[0] && PAGES[seg[0]] ? seg[0] : 'index';
    return { page: page, anchor: seg[0] && !PAGES[seg[0]] ? seg[0] : seg[1] };
  }

  function mark(page) {
    var want = page === 'index' ? '#/' : '#/' + page;
    document.querySelectorAll('.navlink,.vol-pill,.foot__l,.drawer__l').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var base = href.split('/').slice(0, 2).join('/');
      if (a.classList.contains('navlink') || a.classList.contains('vol-pill')) {
        if (base === want || href === want) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
      }
    });
  }

  function go(replaceScroll) {
    var r = parse(), p = PAGES[r.page];
    // 上一页注册的 document 监听随之作废
    if (abort) abort.abort();
    abort = new AbortController();

    main.innerHTML = p.h;
    document.title = p.t + ' · 源裕兴设计系统全典 V7.0';
    mark(r.page);

    if (window.Lattice) window.Lattice.init(main);
    if (window.Site) window.Site.rescan(main);

    if (p.i) {
      // 页内脚本里的 document.addEventListener 绑到本页的 signal 上，换页即解绑
      var signal = abort.signal;
      var scoped = new Proxy(document, {
        get: function (t, k) {
          if (k === 'addEventListener') return function (type, fn, opts) {
            var o = (opts && typeof opts === 'object') ? Object.assign({}, opts) : {};
            o.signal = signal;
            return t.addEventListener(type, fn, o);
          };
          var v = t[k];
          return typeof v === 'function' ? v.bind(t) : v;
        }
      });
      try { p.i.call(window, scoped); } catch (e) { console.error('[page init]', r.page, e); }
    }

    if (r.anchor) {
      var el = document.getElementById(r.anchor);
      if (el) { el.scrollIntoView({ block: 'start' }); return; }
    }
    if (!replaceScroll) window.scrollTo(0, 0);
  }

  addEventListener('hashchange', function () { go(false); });
  mark(parse().page);
  if (location.hash && location.hash !== '#/') go(true);
})();
</script>
`;

const dest = path.join(root, 'preview.html');
fs.writeFileSync(dest, out);
console.log(`preview.html  ${(out.length / 1024).toFixed(1)} KB  ·  ${PAGES.length} 页折为一个文件`);
