import { VOLS } from '../shell.mjs';

/* 令牌总表 —— 与 assets/css/tokens.css 逐条对应，是同一份事实 */
const T = [
  ['色彩 · Ink', [
    ['--ink-50', '#FBF9F5', '宣 · 页面底'], ['--ink-100', '#F5F2EC', '轻霜'],
    ['--ink-200', '#E9E4DA', '薄雾 · 细线'], ['--ink-300', '#D3CCBF', '淡烟 · 描边'],
    ['--ink-400', '#B2AA9C', '古绢'], ['--ink-500', '#857E71', '中灰'],
    ['--ink-600', '#635D53', '砚灰'], ['--ink-700', '#45403A', '墨灰 · 正文'],
    ['--ink-800', '#2A2622', '浓墨'], ['--ink-900', '#17140F', '玄墨 · 标题 · 主操作'],
    ['--ink-950', '#0D0B08', '焦墨 · 暗色底']
  ]],
  ['色彩 · 朱与金', [
    ['--zhu-600', '#8A3323', '标准朱 · 全站唯一装饰元素'],
    ['--zhu-400', '#A8452F', '朱 400 · 图表第三序列'],
    ['--zhu-700', '#6E2719', '朱 700'],
    ['--gold-400', '#B9A177', '标准金 · 箔金不是镀金'],
    ['--gold-300', '#D4C29C', '深底眼标'],
    ['--gold-600', '#7A653F', '浅底文字 --text-gold'],
    ['--seal', 'var(--zhu-600)', '章节起点标记']
  ]],
  ['色彩 · 五实体', [
    ['--stg-600', '#463154', '玄紫 · 源裕兴创新未来'],
    ['--ste-600', '#2C4A3B', '松烟绿 · 九派国有能源'],
    ['--sti-600', '#26374F', '藏青 · 源裕兴进出口贸易'],
    ['--sth-600', '#2D5257', '石青 · 源裕兴健康科技'],
    ['--edu-600', '#7A3229', '赭朱 · 崇仁教育'],
    ['--brand-600', 'var(--{entity}-600)', '由 data-theme 重映射整族 50…800']
  ]],
  ['色彩 · 状态色族', [
    ['--status-success', '#2F6B4F', '达标 · 上涨 · 在线'],
    ['--status-warning', '#8A6A1F', '临界 · 待核 · 需人工复核'],
    ['--status-error', '#8A3323', '超限 · 下跌 · 失败'],
    ['--status-info', '#2B4A63', '提示 · 进行中']
  ]],
  ['字体', [
    ['--font-display', 'Noto Serif SC', '展示轨 · H1/H2 与章节标题'],
    ['--font-sans', 'Noto Sans SC', '界面轨 · 中文'],
    ['--font-western', 'Space Grotesk', '界面轨 · 西文与数值'],
    ['--font-mono', 'JetBrains Mono', '标识轨 · 单号批次哈希'],
    ['--font-wordmark', 'Poppins', 'SINOTAO 字标'],
    ['--fs-chapter', 'clamp(34px,4.4vw,64px)', '章节标题 · 200'],
    ['--fs-page', '36px', '页面标题 · 200'],
    ['--fs-panel', '24px', '面板标题 · 300'],
    ['--fs-stat', 'clamp(28px,2.4vw,34px)', 'KPI · 300'],
    ['--fs-block', '20px', '区块小标题 · 500'],
    ['--fs-body', '16px', '正文 · 400'],
    ['--fs-body-s', '14px', '次级正文与表格 · 400'],
    ['--fs-label', '12px', '中文小标签 · 500 · 零字距'],
    ['--fs-eyebrow', '12px', '眼标 · western only'],
    ['--track-display', '-0.032em', '展示级负字距'],
    ['--track-title', '-0.02em', '24–36px 档标题'],
    ['--track-ui', '0', '界面级一律归零'],
    ['--track-eyebrow', '0.18em', '只作用于西文眼标'],
    ['--num-weight', '300', '全部数值统一字重'],
    ['--measure-cn', '35em', '中文阅读度量 · 写在元素自身上'],
    ['--serif-min-thin', '32px', '200 字重的字号下限'],
    ['--serif-min-size', '16px', '宋体本身的字号下限'],
    ['--serif-dark-comp', '+100', '深底反白的字重补偿']
  ]],
  ['间距 · 4px × 13 级', [
    ['--space-1', '4px', '图标与文字之间'], ['--space-2', '8px', '标签与数值之间'],
    ['--space-3', '12px', '行内元素'], ['--space-4', '16px', '栅格槽宽下限'],
    ['--space-5', '24px', '组件间距 · 密集档内边距'], ['--space-6', '32px', '面板内边距（产品面）'],
    ['--space-7', '40px', '面板内边距（品牌面）'], ['--space-8', '48px', '产品面区块节奏 · 表格行高'],
    ['--space-9', '56px', '面板内部大分段'], ['--space-10', '64px', '章节头到内容'],
    ['--space-11', '80px', 'Web 小区块'], ['--space-12', '96px', 'Web 中区块'],
    ['--space-13', '128px', '品牌面章节节奏'],
    ['--rhythm-brand', 'var(--space-13)', '品牌面节奏 · 语义别名'],
    ['--rhythm-app', 'var(--space-8)', '产品面节奏 · 语义别名']
  ]],
  ['形状', [
    ['--radius-xs', '2px', ''], ['--radius-sm', '4px', '标签'],
    ['--radius-md', '6px', '产品按钮与输入框'], ['--radius-lg', '10px', '下拉与气泡'],
    ['--radius-xl', '16px', '卡片与弹窗'], ['--radius-2xl', '24px', ''],
    ['--radius-full', '9999px', '营销 CTA · 状态点 · 溯源胶囊'],
    ['--shape-button', 'var(--radius-md)', 'M3 采纳项 05 · 形状角色'],
    ['--shape-field', 'var(--radius-md)', '输入类控件'],
    ['--shape-card', 'var(--radius-xl)', '面板与卡片'],
    ['--shape-overlay', 'var(--radius-xl)', '弹窗与抽屉'],
    ['--shape-cta', 'var(--radius-full)', '营销面 CTA'],
    ['--border-hairline', '1px', '默认分隔'],
    ['--border-emphasis', '2px', '表头下划线与 Tabs 选中'],
    ['--border-indicator', '3px', '选中行与 Toast 语义条'],
    ['--ring-hairline', '1px ink-200 + 6px', '输入类控件的静默边界']
  ]],
  ['高程 · 暖墨投影', [
    ['--shadow-xs', '0 1px 2px rgba(26,22,18,.04)', ''],
    ['--shadow-sm', '0 1px 3px + 0 1px 2px', '卡片'],
    ['--shadow-md', '0 4px 12px + 0 1px 3px', 'hover'],
    ['--shadow-lg', '0 8px 24px + 0 2px 6px', '抽屉'],
    ['--shadow-xl', '0 16px 48px + 0 4px 12px', '弹窗'],
    ['--card-shadow', 'none', '平面为默认 · 描边与阴影不同现']
  ]],
  ['动效', [
    ['--dur-instant', '80ms', ''], ['--dur-micro', '150ms', '微交互'],
    ['--dur-transition', '300ms', '页面过渡 · 弹层'], ['--dur-narrative', '500ms', '叙事入场'],
    ['--dur-loop', '2400ms', '循环 · LatticeSpin'],
    ['--ease-standard', 'cubic-bezier(.2,0,0,1)', ''],
    ['--ease-emphasized', 'cubic-bezier(.16,1,.3,1)', '页面过渡 · 品牌缓动'],
    ['--ease-out', 'cubic-bezier(0,0,.2,1)', '微交互'],
    ['--ease-brush', 'cubic-bezier(.33,0,.12,1)', '落笔 —— 起笔重、收笔轻'],
    ['--stagger', '70ms', 'Reveal 错峰，上限 6 级']
  ]],
  ['版面', [
    ['--bp-sm', '600px', 'Compact → Medium'],
    ['--bp-md', '905px', ''], ['--bp-lg', '1240px', 'Medium → Expanded'],
    ['--bp-xl', '1440px', ''], ['--grid-cols', '12', '12 列宪法'],
    ['--gutter', '24px', '槽宽'],
    ['--container-doc', '1120px', '长文内容区上限'],
    ['--container-brand', '1200px', '品牌页'],
    ['--container-wide', '1440px', '数据大屏'],
    ['--rail-width', '76px', '图标侧轨 · Medium'],
    ['--drawer-width', '264px', '展开侧轨 · Expanded'],
    ['--panel-width', '380px', '右侧抽屉'],
    ['--appbar-height', '64px', '顶栏 sticky'],
    ['--touch-min', '44px', '触摸目标下限 · WCAG']
  ]],
  ['语义 · 表面与文本', [
    ['--surface-page', 'var(--ink-50)', '页面底'],
    ['--surface-sunken', 'var(--ink-100)', '中性画布'],
    ['--surface-card', '#FFFEFB', '面板，非纯白'],
    ['--surface-inverse', 'var(--ink-900)', '反白区块'],
    ['--text-heading', 'var(--ink-900)', '标题'],
    ['--text-body', 'var(--ink-700)', '正文'],
    ['--text-muted', 'var(--ink-600)', '次文'],
    ['--text-subtle', 'var(--ink-500)', '三级文'],
    ['--border-subtle', 'var(--ink-200)', '默认分隔'],
    ['--border-default', 'var(--ink-300)', '描边'],
    ['--border-strong', 'var(--ink-400)', '强描边']
  ]],
  ['语义 · on- 配对族', [
    ['--on-ink', 'var(--ink-50)', '玄墨底上的前景'],
    ['--on-brand', 'var(--ink-50)', '实体填色上的前景'],
    ['--on-brand-subtle', 'var(--brand-700)', '实体浅底上的前景'],
    ['--on-gold', 'var(--ink-900)', '金上用玄墨不用白'],
    ['--on-error', 'var(--ink-50)', ''],
    ['--state-layer-hover', '.08', '状态层兜底 · 仅作用于表面'],
    ['--state-layer-focus', '.10', ''],
    ['--state-layer-press', '.10', ''],
    ['--state-layer-drag', '.16', '']
  ]],
  ['组件', [
    ['--btn-primary-bg', 'var(--ink-900)', '主操作用玄墨，不用品牌色'],
    ['--btn-h-l', '44px', '主操作 · 触摸目标'],
    ['--btn-h-m', '40px', '表单档'],
    ['--btn-h-s', '36px', '行内 · 工具栏'],
    ['--btn-gold-bg', 'var(--gold-400)', '营销 CTA'],
    ['--field-h', '40px', '输入框'],
    ['--field-h-compact', '36px', 'V7.0 新增紧凑档'],
    ['--panel-max-per-screen', '3', '超出改用 1px 墨线分隔'],
    ['--table-head-rule', '2px solid ink-900', '取代表头底色'],
    ['--table-row-h', '48px', '表格行高'],
    ['--focus-ring-width', '2px', '焦点永远可见'],
    ['--focus-ring-offset', '2px', '']
  ]],
  ['图表与点阵', [
    ['--chart-stroke', '1.5px', '折线粗细'],
    ['--chart-baseline', 'var(--ink-200)', '唯一保留的一条轴线'],
    ['--rail', 'var(--ink-200) / dark var(--ink-800)', '量表与条形的未填充轨 · 必须比面板亮一档'],
    ['--chart-muted', 'var(--ink-300)', '对比序列'],
    ['--chart-bar-h', '8px', '条形行与量表条共用'],
    ['--chart-series-max', '3', '实体色 + ink-400 + ink-300'],
    ['--dot-grid', '48', 'EntityLattice 网格'],
    ['--dot-r-data', '1.5px', 'DotDensity 点径 1.4–1.6'],
    ['--capsule-bg', 'var(--ink-100)', '溯源胶囊底 · 实景上换 rgba(251,249,245,.16)']
  ]],
  ['图解', [
    ['--node-r-1', '9px', '一级节点'], ['--node-r-2', '7px', '二级节点'],
    ['--node-r-3', '5px', '三、四级节点'],
    ['--edge-default', '1px', '全部连接的默认线'],
    ['--edge-primary', '2px', '主路径，每图仅一条'],
    ['--tree-indent', '20px', '层级树每级缩进']
  ]]
];

const total = T.reduce((a, [, r]) => a + r.length, 0);

export default {
  file: 'tokens.html',
  title: '令牌总表',
  desc: '源裕兴设计系统 V7.0 令牌总表。可检索、可复制，与 tokens.css 逐条对应。',
  body: `
<section class="vhero on-dark">
  <canvas class="vhero__canvas" data-art="tokens" aria-hidden="true"></canvas>
  <div class="wrap vhero__in">
    <div class="hero__eyebrow"><span class="seal" style="background:var(--gold-400)"></span><span class="u-eyebrow" style="color:var(--gold-300)">SINOTAO Design System · V7.0 · 附录</span></div>
    <h1 class="vhero__t">令牌总表</h1>
    <p class="vhero__s">数量不是质量。只在语义层与组件层保留真正会被复用或主题化的部分 —— 本表 ${total} 条为对外索引，与 <code style="color:var(--ink-200)">assets/css/tokens.css</code> 逐条对应。点击任意行复制令牌名。</p>
    <nav class="vols" aria-label="分册导航">
      ${VOLS.map(([n, t, h]) => `<a class="vol-pill" href="${h}"><i>${n}</i>${t}</a>`).join('\n      ')}
      <a class="vol-pill" href="tokens.html" aria-current="page"><i>附</i>令牌</a>
    </nav>
  </div>
</section>

<div class="toc"><div class="wrap">
  <div style="display:flex;gap:var(--space-4);align-items:center;flex-wrap:wrap">
    <label class="field" style="flex:1 1 280px">
      <span class="u-sr">检索令牌</span>
      <input class="input" id="tq" type="search" placeholder="检索令牌名、取值或用途 —— 例如 ink、字距、48px" autocomplete="off" spellcheck="false">
    </label>
    <div id="tcount" class="u-label" style="white-space:nowrap">${total} 条</div>
    <button class="btn btn--secondary btn--s" type="button" id="tclear">清除</button>
  </div>
  <div id="tfilters" style="display:flex;flex-wrap:wrap;gap:var(--space-2);margin-top:var(--space-4)">
    <button class="tag tag--plain" type="button" data-fam="" aria-pressed="true" style="cursor:pointer;border:0;font:inherit">全部</button>
    ${T.map(([fam]) => `<button class="tag tag--plain" type="button" data-fam="${fam}" aria-pressed="false" style="cursor:pointer;border:0;font:inherit">${fam}</button>`).join('')}
  </div>
</div></div>

<div class="wrap">
<section class="chapter" style="border-bottom:0" aria-label="令牌总表">
  ${T.map(([fam, rows]) => `
  <div class="block fx-reveal" data-fam-sec="${fam}">
    <div class="block__head"><span class="u-eyebrow">${fam}</span><span class="block__note">${rows.length} 条</span></div>
    <div class="tokens">
      ${rows.map(([n, v, u]) => `<div class="token-row" data-copy="${n}" data-row role="button" tabindex="0" title="点击复制 ${n}">
        <span class="token-row__name">${n}</span><span class="token-row__val">${v}</span><span class="token-row__use">${u}</span></div>`).join('')}
    </div>
  </div>`).join('')}
  <div id="tempty" class="empty" hidden>
    <div class="empty__t">没有匹配的令牌</div>
    <div class="empty__s">换一个关键词，或清除筛选从头看起</div>
  </div>
</section>
</div>`,
  script: `<script>
(function(){
  var q = document.getElementById('tq');
  var clear = document.getElementById('tclear');
  var count = document.getElementById('tcount');
  var empty = document.getElementById('tempty');
  var secs = Array.prototype.slice.call(document.querySelectorAll('[data-fam-sec]'));
  var fbtns = Array.prototype.slice.call(document.querySelectorAll('[data-fam]'));
  var fam = '';

  function run(){
    var s = (q.value||'').trim().toLowerCase();
    var shown = 0;
    secs.forEach(function(sec){
      var okFam = !fam || sec.dataset.famSec === fam;
      var any = 0;
      sec.querySelectorAll('[data-row]').forEach(function(r){
        var hit = okFam && (!s || r.textContent.toLowerCase().indexOf(s) > -1);
        r.hidden = !hit;
        if(hit){ any++; shown++; }
      });
      sec.hidden = !any;
      var note = sec.querySelector('.block__note');
      if(note) note.textContent = any + ' 条';
    });
    count.textContent = shown + ' 条';
    empty.hidden = shown > 0;
  }

  q.addEventListener('input', run);
  clear.addEventListener('click', function(){ q.value=''; fam=''; sync(); run(); q.focus(); });
  fbtns.forEach(function(b){
    b.addEventListener('click', function(){ fam = b.dataset.fam; sync(); run(); });
  });
  function sync(){
    fbtns.forEach(function(b){
      var on = b.dataset.fam === fam;
      b.setAttribute('aria-pressed', String(on));
      b.className = 'tag tag--plain' + (on ? ' tag--brand' : '');
      b.style.cursor='pointer'; b.style.border='0'; b.style.font='inherit';
    });
  }
  sync();
})();
</script>`
};
