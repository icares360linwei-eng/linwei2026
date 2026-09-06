/* 站点外壳 · 顶栏 / 抽屉 / ⌘K / 栅格 / 页脚 —— 所有页面共用一套，零差异 */

export const VOLS = [
  ['一', '序与总纲', 'volume-1.html', '设计哲学 · 变更摘要 · 语境 · 文案'],
  ['二', '基础', 'volume-2.html', '色彩 · 色板 · 模块识别 · 字体 · 刻度 · 版面'],
  ['三', '表达', 'volume-3.html', '面板 · 图标系统 · 业务图标 · 字标'],
  ['四', '数据与行为', 'volume-4.html', '图表 · 图解 · 可视化与影像 · 动效'],
  ['五', '治理', 'volume-5.html', '组件令牌 · 产品面 · 仓库 · M3 · 来源']
];

const CHAPTERS = [
  ['序', '设计哲学', 'volume-1.html#ch-prologue'],
  ['000', '变更摘要', 'volume-1.html#ch-00'],
  ['001', '语境与实体', 'volume-1.html#ch-01'],
  ['002', '内容与文案', 'volume-1.html#ch-02'],
  ['003', '色彩', 'volume-2.html#ch-03'],
  ['004', '色板全景', 'volume-2.html#ch-04'],
  ['005', '模块识别', 'volume-2.html#ch-05'],
  ['006', '字体', 'volume-2.html#ch-06'],
  ['007', '刻度与断点', 'volume-2.html#ch-07'],
  ['008', '间距与版面', 'volume-2.html#ch-08'],
  ['009', '面板与边界', 'volume-3.html#ch-09'],
  ['010', '图标系统', 'volume-3.html#ch-10'],
  ['011', '业务图标清单', 'volume-3.html#ch-11'],
  ['012', '字标与应用', 'volume-3.html#ch-12'],
  ['013', '图表', 'volume-4.html#ch-13'],
  ['014', '图解语言', 'volume-4.html#ch-14'],
  ['015', '可视化与影像', 'volume-4.html#ch-15'],
  ['016', '动效与状态', 'volume-4.html#ch-16'],
  ['017', '组件与令牌总账', 'volume-5.html#ch-17'],
  ['018', '产品面与屏幕', 'volume-5.html#ch-18'],
  ['019', '仓库结构', 'volume-5.html#ch-19'],
  ['020', 'M3 对照', 'volume-5.html#ch-20'],
  ['021', '来源与授权', 'volume-5.html#ch-21']
];

const FONTS =
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500' +
  '&family=Noto+Sans+SC:wght@200;300;400;500;600' +
  '&family=Noto+Serif+SC:wght@200;300;400;500' +
  '&family=Poppins:wght@500;600' +
  '&family=Space+Grotesk:wght@300;400;500;600&display=swap';
const SYMBOLS =
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0..1,0&display=swap';

function topbar(cur) {
  return `<header class="topbar">
  <div class="topbar__in">
    <a class="topbar__brand" href="index.html">
      <span class="topbar__wm">SINOTAO</span>
      <span class="topbar__div"></span>
      <span class="topbar__ent"><span class="topbar__tick"></span><span class="topbar__code" data-ent-code>STG</span></span>
    </a>
    <nav class="topbar__nav" aria-label="全典导航">
      ${VOLS.map(([n, t, h]) => `<a class="navlink" href="${h}"${cur === h ? ' aria-current="page"' : ''}><span class="navlink__i">${n}</span>${t}</a>`).join('\n      ')}
      <a class="navlink" href="atlas.html"${cur === 'atlas.html' ? ' aria-current="page"' : ''}>图谱</a>
      <a class="navlink" href="tokens.html"${cur === 'tokens.html' ? ' aria-current="page"' : ''}>令牌</a>
    </nav>
    <div class="topbar__tools">
      <button class="kbtn" data-k-open type="button" aria-label="搜索全典"><span class="ms" style="font-size:16px" aria-hidden="true">search</span><span class="kbtn__t">检索</span><kbd>⌘K</kbd></button>
      <div class="entsw" id="entsw">
        <button class="iconbtn" data-entsw-btn type="button" aria-haspopup="menu" aria-expanded="false" aria-label="切换实体主题"><span class="ms" aria-hidden="true">hub</span></button>
        <div class="entsw__menu" role="menu" hidden></div>
      </div>
      <button class="iconbtn" data-scheme-btn type="button" aria-label="切换明暗模式"><span class="ms" data-scheme-icon aria-hidden="true">contrast</span></button>
      <button class="iconbtn" data-drawer-open type="button" aria-label="打开目录"><span class="ms" aria-hidden="true">menu</span></button>
    </div>
  </div>
</header>`;
}

function drawer() {
  return `<div class="drawer" id="drawer" hidden>
  <button class="drawer__scrim" type="button" aria-label="关闭目录"></button>
  <nav class="drawer__panel" aria-label="全典目录">
    <div class="drawer__sec">
      <div class="drawer__st">Volumes</div>
      ${VOLS.map(([n, t, h, d]) => `<a class="drawer__l" href="${h}"><i>${n}</i><span>${t}<br><small style="color:var(--text-subtle)">${d}</small></span></a>`).join('\n      ')}
    </div>
    <div class="drawer__sec">
      <div class="drawer__st">Chapters</div>
      ${CHAPTERS.map(([n, t, h]) => `<a class="drawer__l" href="${h}"><i>${n}</i><span>${t}</span></a>`).join('\n      ')}
    </div>
    <div class="drawer__sec">
      <div class="drawer__st">Appendix</div>
      <a class="drawer__l" href="atlas.html"><i>图</i><span>图谱 · 生成式插图集</span></a>
      <a class="drawer__l" href="tokens.html"><i>令</i><span>令牌总表</span></a>
    </div>
  </nav>
</div>`;
}

const KMENU = `<div class="kmenu" id="kmenu" hidden>
  <button class="kmenu__scrim" type="button" aria-label="关闭检索"></button>
  <div class="kmenu__box" role="dialog" aria-modal="true" aria-label="全典检索">
    <input class="kmenu__in" type="text" placeholder="检索全典 —— 章节、术语、令牌" aria-label="检索全典" autocomplete="off" spellcheck="false">
    <div class="kmenu__list"></div>
    <div class="kmenu__foot"><span><kbd>↑</kbd><kbd>↓</kbd> 移动</span><span><kbd>↵</kbd> 打开</span><span><kbd>esc</kbd> 关闭</span><span style="margin-left:auto"><kbd>G</kbd> 栅格</span></div>
  </div>
</div>`;

const GRIDLAY = `<div class="gridlay" id="gridlay" aria-hidden="true"><div class="gridlay__in">${'<div class="gridlay__c"></div>'.repeat(12)}</div></div>`;

function footer() {
  return `<footer class="foot">
  <div class="wrap">
    <div class="foot__top">
      <div>
        <div class="foot__wm">SINOTAO</div>
        <p class="foot__m">源裕兴设计系统全典 V7.0。五个实体不是五家割裂的公司，而是共用一套设计语法、各自生长出独立主色的价值共生体。本典不是画册，是施工图。</p>
      </div>
      <div>
        <div class="foot__st">Volumes</div>
        ${VOLS.map(([n, t, h]) => `<a class="foot__l" href="${h}">${n} · ${t}</a>`).join('\n        ')}
      </div>
      <div>
        <div class="foot__st">Appendix</div>
        <a class="foot__l" href="atlas.html">图谱 · 插图集</a>
        <a class="foot__l" href="tokens.html">令牌总表</a>
        <a class="foot__l" href="index.html">首页 · 总纲</a>
      </div>
      <div>
        <div class="foot__st">Discipline</div>
        <span class="foot__l">37 组件 · 421 令牌</span>
        <span class="foot__l">九级字阶 · 四种图表</span>
        <span class="foot__l">五种图解 · 四样动效</span>
      </div>
    </div>
    <div class="foot__bot">
      <span>源裕兴设计系统全典 V7.0 · 2026-09-06</span>
      <span>守正 · 开物 · 共生</span>
    </div>
  </div>
</footer>`;
}

export function page({ file, title, desc, body, script = '' }) {
  return `<!DOCTYPE html>
<html lang="zh-Hans" data-theme="stg">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} · 源裕兴设计系统全典 V7.0</title>
<meta name="description" content="${desc}">
<meta name="color-scheme" content="light dark">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="${SYMBOLS}">
<link rel="stylesheet" href="assets/css/tokens.css">
<link rel="stylesheet" href="assets/css/base.css">
<link rel="stylesheet" href="assets/css/components.css">
<link rel="stylesheet" href="assets/css/site.css">
<script>
/* 上色前先定主题与明暗，避免首帧闪白 */
(function(){try{
  var t=localStorage.getItem('sinotao.theme')||'stg';
  document.documentElement.setAttribute('data-theme',t);
  var s=localStorage.getItem('sinotao.scheme')||'auto';
  var d=s==='dark'||(s==='auto'&&matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.setAttribute('data-color-scheme',d?'dark':'light');
}catch(e){}})();
</script>
</head>
<body>
<a class="skip" href="#main">跳到正文</a>
${topbar(file)}
<main id="main">
${body}
</main>
${footer()}
${drawer()}
${KMENU}
${GRIDLAY}
<script src="assets/js/lattice.js"></script>
<script src="assets/js/charts.js"></script>
<script src="assets/js/site.js"></script>
${script}
</body>
</html>`;
}

/* ── 片段助手 ─────────────────────────────────────────────────────── */

export function chapterHead({ id, num, eyebrow, title, lead }) {
  return `<header class="chapter__head fx-reveal">
  <span class="chapter__num">${num}</span>
  <div style="min-width:0">
    <div class="chapter__meta"><span class="seal"></span><span class="u-eyebrow">${eyebrow}</span></div>
    <h2 class="chapter__title" id="${id}-t">${title}</h2>
    ${lead ? `<p class="chapter__lead">${lead}</p>` : ''}
  </div>
</header>`;
}

export function chapter(o) {
  return `<section class="chapter" id="${o.id}" aria-labelledby="${o.id}-t">
${chapterHead(o)}
${o.body}
</section>`;
}

/* block(title, body) 或 block(title, note, body) —— 三参时中间的是副题 */
export function block(title, a, b) {
  const note = b === undefined ? '' : a;
  const body = b === undefined ? a : b;
  return `<div class="block fx-reveal">
  <div class="block__head"><span class="u-eyebrow">${title}</span>${note ? `<span class="block__note">${note}</span>` : ''}</div>
  ${body}
</div>`;
}

export function vhero({ vol, name, sub, art, cur }) {
  return `<section class="vhero on-dark">
  <canvas class="vhero__canvas" data-art="${art}" aria-hidden="true"></canvas>
  <div class="wrap vhero__in">
    <div class="hero__eyebrow"><span class="seal" style="background:var(--gold-400)"></span><span class="u-eyebrow" style="color:var(--gold-300)">SINOTAO Design System · V7.0 · 第${vol}册</span></div>
    <h1 class="vhero__t">${name}</h1>
    <p class="vhero__s">${sub}</p>
    <nav class="vols" aria-label="分册导航">
      ${VOLS.map(([n, t, h]) => `<a class="vol-pill" href="${h}"${cur === h ? ' aria-current="page"' : ''}><i>${n}</i>${t}</a>`).join('\n      ')}
    </nav>
  </div>
</section>`;
}

export function toc(items) {
  return `<nav class="toc" aria-label="本册目录"><div class="wrap"><div class="toc__grid">
${items.map(([n, t, h]) => `  <a class="toc__l" href="${h}"><i>${n}</i><b>${t}</b></a>`).join('\n')}
</div></div></nav>`;
}
