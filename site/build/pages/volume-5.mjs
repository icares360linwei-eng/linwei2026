import { vhero, toc, chapter, block } from '../shell.mjs';

const TOC = [
  ['17', '组件与令牌总账', '#ch-17'], ['18', '产品面与屏幕', '#ch-18'],
  ['19', '仓库结构', '#ch-19'], ['20', 'M3 对照', '#ch-20'], ['21', '来源与授权', '#ch-21']
];

const GROUPS = [
  ['Core', 13, 'Icon · Button · IconButton · TaijiSpinner · Tag · Badge · Card · StatCard · PhiAnchor · SectionHead · Reveal · RuleReveal · Marquee'],
  ['Forms', 7, 'Field · Input · Textarea · Select · Checkbox · Radio · DatePicker'],
  ['Data', 6, 'Table · StatBand · Pagination · EmptyState · DotDensity · ProvenanceCapsule'],
  ['Feedback', 5, 'Modal · Drawer · Toast · Popconfirm · Tooltip'],
  ['Navigation', 5, 'TopAppBar · NavRail · Tabs · Breadcrumbs · EntitySwitcher'],
  ['Brand', 1, 'EntityLattice']
];

const TOKEN_CHANGES = [
  ['--status-success / warning / error / info', '#2F6B4F · #8A6A1F · #8A3323 · #2B4A63', '新增'],
  ['--track-display / title / ui / eyebrow', '-.032 · -.02 · 0 · .18em', '新增'],
  ['--num-weight · --measure-cn', '300 · 35em', '新增'],
  ['--rhythm-brand · --rhythm-app', '128px（space-13）· 48px（space-8）', '新增 · 语义别名'],
  ['--container-doc · --panel-max-per-screen', '1120px · 3', '新增'],
  ['--field-height-compact · --ring-hairline', '36px · 1px ink-200 + 6px', '新增'],
  ['--chart-stroke / baseline / muted / bar-h / series-max', '1.5px · ink-200 · ink-300 · 8px · 3', '新增'],
  ['--dot-grid · --dot-r-data · --capsule-bg', '48/60 · 1.4–1.6 · ink-100 · rgba(251,249,245,.16)', '新增'],
  ['--table-header-bg → --table-head-rule', 'ink-100 底色 → 2px ink-900 下划线', '修改'],
  ['--stat-value-size · --panel-pad', 'clamp(28,2.4vw,34) · 40 / 32 / 24px', '修改'],
  ['字阶 17 → 9 · 图表 14 → 4 · 序列 8 → 3', '—', '收敛']
];

const RULES = [
  '颜色只用令牌，不硬编码色值',
  '间距只用 4px 步进的令牌',
  '先全墨出一稿，再逐处论证加色',
  '主操作用玄墨；实体色只作身份标记；朱与金各不超过一处',
  '状态色不借实体色，涨跌双重编码',
  '不用纯黑 #000 / 纯白 #FFF 作为文字或页面底色',
  '一重边界：描边与阴影不同现，面板不嵌套',
  '动效即叙事，不做无意义动效',
  '组件覆盖八状态，键盘可达，焦点永远可见',
  '正文对比度 ≥4.5:1，触摸目标 ≥44 × 44px',
  '品牌标记走生成规则，不凭记忆重绘品牌资产',
  '五实体只通过 data-theme 切换主色，版式与组件零差异'
];

const KITS = [
  ['ui_kits/ste_console/', 'STE 九派能源运营控制台', '经营看板 · 锅炉工况 · 碳资产 · 燃料供应', '4', '首批重出'],
  ['ui_kits/brand_site/', '集团品牌官网', '集团概览 · 五大实体 · 治理与 ESG · 加入我们', '4', '首批重出'],
  ['ui_kits/stg_cockpit/', 'STG 集团经营驾驶舱', '驾驶舱 · 审批队列 · 合规台账', '2 + 2', '次批'],
  ['templates/', '两个起步模板', 'entity-dashboard · brand-landing', '2', '随首批同步']
];

const REDO = [
  '指标区并排 StatCard 换 StatBand',
  '图表去掉网格、渐变、圆点与独立图例',
  '表格去竖线与斑马纹，行高收到 48px',
  '涨跌与状态改走状态色族，不再借实体色'
];

const TOKENS_DIR = [
  ['fonts.css', '字族 + Google Fonts 与 Material Symbols 引入'],
  ['colors.css', 'Primitive 色板：Ink 十一阶、朱七阶、金五阶、五实体各八阶含 500 文字档'],
  ['entities.css', 'data-theme 五实体重映射'],
  ['typography.css', '九级字阶 + 字重 + 度量 + 四支字距令牌'],
  ['spacing.css', '4px × 13 级 + 两档节奏'],
  ['shape.css', '圆角七级 + 描边三级 + ring-hairline'],
  ['elevation.css', '阴影六级 + 焦点光环'],
  ['motion.css', '时长五档 + 缓动五条'],
  ['layout.css', '断点五级 + 12 列 + 固定元素尺寸 + 容器三档'],
  ['semantic.css', '表面 / 文本 / 描边 / 状态色族 / 焦点 + 各组件令牌'],
  ['chart.css', 'V7.0 新增：图表五支令牌 + 点阵三支'],
  ['dark.css', '暗色模式表面翻转'],
  ['base.css', '裸元素基线 + .u-eyebrow / .u-label / .u-num 工具类']
];

const DIRS = [
  ['styles.css', '全局入口，只含 @import。消费方只引这一个'],
  ['components/', 'core 13 · forms 7 · data 6 · feedback 5 · navigation 5 · brand 1'],
  ['ui_kits/', '三个产品面，各含自己的 README 列出屏幕与留空说明'],
  ['templates/', '两个可直接复制的完整起点'],
  ['guidelines/', '基础规范卡。V7.0 后需增补：状态色族、点阵生成规则、图表四件、溯源胶囊、两档节奏'],
  ['assets/', 'logo-sinotao-ink / paper / current.svg · imagery/biomass-plant-aerial.jpg'],
  ['readme · SKILL.md', '设计指南与 Agent Skill 描述']
];

const M3_YES = [
  ['01', '配色角色成对声明', 'M3 的每个容器色都配一个 on- 前缀的前景色，成对声明、成对使用，对比度在令牌层就锁死了。本系统有 surface 与 text 两族，但没有配对关系 —— 于是「实体色底上该用什么字色」每次都靠现场判断。补一族。'],
  ['02', '状态层量化', '本系统写的是「hover 加深底色一档」，可当某个表面没有下一档时就无从执行。M3 用状态层百分比解决：在表面上叠一层当前前景色的低透明度。补作兜底规则。'],
  ['03', '窗口尺寸类', '本系统有五个像素断点，但断点只说「多宽」，不说「该变成什么样」。M3 的窗口尺寸类把断点绑定到导航形态上，三类三种导航。'],
  ['04', '字阶命名补三档后缀', 'M3 的排版角色是「角色 × L/M/S」的二维命名，扩展时不必新造名字。本系统九级字阶已按角色命名，补上 L/M/S 后缀即可对齐：display-l / title-m / body-s。名字变了，值不变。'],
  ['05', '形状角色映射', 'M3 把圆角刻度绑定到组件角色上，而非让每个组件自己挑。改为在令牌层直接绑定：--shape-button / --shape-field / --shape-card / --shape-overlay，组件不再引用原始刻度。']
];

const M3_NO = [
  ['动态取色', 'M3 从用户壁纸生成整套色板。本系统的色彩是治理对象，五实体色值由品牌委员会锁定，不能由运行环境决定。'],
  ['表面着色式高程', 'M3 用主色染表面来表达层级。本系统已判定层级只靠明度差与 1px 线，且染色会让实体色越出 15% 的配额。'],
  ['48dp 触摸目标', '本系统守 WCAG 的 44px。M3 的 48dp 更宽裕，但在高密度 ERP 表格里会把行高顶到 56px 以上，与密度修正相抵。'],
  ['FAB 与胶囊按钮群', '悬浮操作按钮是移动端范式，会遮挡数据。本系统的主操作在页头或行内，位置固定。']
];

const PAIRS = [
  ['主操作', 'on-ink → ink-50', 'var(--ink-900)', 'var(--ink-50)'],
  ['实体填色', 'on-brand → ink-50', 'var(--brand-600)', 'var(--ink-50)'],
  ['营销 CTA', 'on-gold → ink-900', 'var(--gold-400)', 'var(--ink-900)'],
  ['错误态', 'on-error → ink-50', 'var(--zhu-600)', 'var(--ink-50)'],
  ['实体浅底', 'on-brand-subtle → brand-700', 'var(--brand-50)', 'var(--brand-700)']
];

const M3_TOKENS = [
  ['--on-*', 'on-ink · on-brand · on-brand-subtle · on-gold · on-error · on-success · on-warning · on-info', 8],
  ['--state-layer-*', 'hover 8% · focus 10% · press 10% · drag 16%', 4],
  ['--window-class-*', 'compact · medium · expanded，各绑定导航形态', 3],
  ['--shape-*', 'button 6 · field 6 · tag 4 · popover 10 · card 16 · overlay 16 · cta full', 7]
];

const SOURCES = [
  ['品牌全典文字稿 V37', 'uploads/*.md', '哲学框架、五实体色值、组件清单、内容规范。用户明确说明该稿混乱且存在缺陷，只作参考'],
  ['SINOTAO 字标', 'logo.svg', '唯一提供的品牌资产。三色版已入 assets/'],
  ['园区航拍图', 'hero-bg.jpg', '影像语言基准。图上标注为 AI 生成的示意图，不可作为对外实证素材'],
  ['Ledgerix CRM / FMS', 'Behance · 无画面', '页面抓取受屏蔽。据其题材域推出的密度判断：指标带、图表克制、表格去框线'],
  ['Vercel Geist', '公开规范分析', '官方文档站抓取受限。归 Vercel 所有，不引入其字族、真黑真白底色与电光蓝'],
  ['Pentagram · Univers', '29 张案例画面', '点作标签前缀、生成式点阵、深浅双轨、溯源胶囊。归 Pentagram 与 Univers 所有，不复刻其字标、点阵造型与影像风格']
];

export default {
  file: 'volume-5.html',
  title: '第五册 · 治理',
  desc: '组件与令牌总账 · 产品面与屏幕 · 仓库结构 · M3 对照 · 来源与授权。',
  body: `
${vhero({
    vol: '五', name: '治理', art: 'tokens', cur: 'volume-5.html',
    sub: '组件令牌 · 产品面 · 仓库 · M3 · 来源 —— 37 个组件，421 个可编译令牌。数量不是质量。'
  })}
${toc(TOC)}

<div class="wrap">

${chapter({
      id: 'ch-17', num: '017 / 021', eyebrow: 'Ledger',
      title: '组件与令牌总账',
      lead: '37 个组件，421 个可编译令牌。数量不是质量 —— 只在语义层与组件层保留真正会被复用或主题化的部分。',
      body: `
  <div class="statband fx-reveal">
    ${[['组件总数', '37', '件'], ['可编译令牌', '421', '个'], ['字阶', '9', '级'],
      ['图表形态', '4', '种'], ['图解形态', '5', '种'], ['叙事动效', '4', '样']]
        .map(([l, v, u]) => `<div class="statband__item"><span class="statband__label">${l}</span>
      <span class="statband__value">${v}<span class="statband__unit">${u}</span></span></div>`).join('')}
  </div>

  ${block('六类组件', `
  <div class="grid grid--2" style="gap:0">
    ${GROUPS.map(([n, c, list]) => `<div style="padding:var(--space-5);border-top:var(--hairline);border-left:var(--hairline)">
      <div style="display:flex;align-items:baseline;gap:var(--space-3)">
        <span class="u-eyebrow">${n}</span><span class="u-num" style="font-size:var(--fs-block)">${c}</span></div>
      <p style="margin-top:var(--space-3);font-size:var(--fs-label);line-height:1.85;color:var(--text-muted);margin-bottom:0">${list}</p>
    </div>`).join('')}
  </div>`)}

  ${block('V7.0 令牌变更', `
  <div class="table-scroll"><table class="tbl">
    <caption class="u-sr">V7.0 新增、修改与收敛的令牌</caption>
    <thead><tr><th scope="col">令牌</th><th scope="col">值</th><th scope="col">类型</th></tr></thead>
    <tbody>${TOKEN_CHANGES.map(([n, v, t]) => `<tr>
      <td class="mono" style="color:var(--text-heading)">${n}</td>
      <td class="mono" style="color:var(--text-brand)">${v}</td>
      <td><span class="tag ${t === '收敛' ? 'tag--dep' : t.indexOf('新增') === 0 ? 'tag--success' : 'tag--info'}">${t}</span></td></tr>`).join('')}</tbody>
  </table></div>`)}

  ${block('十二条工艺准则', `
  <div class="rules">
    ${RULES.map((r, i) => `<div class="rule"><span class="rule__n">${String(i + 1).padStart(2, '0')}</span><span class="rule__t">${r}</span></div>`).join('')}
  </div>
  <div class="note note--warn" style="margin-top:var(--space-6)"><div class="note__b">
    <div class="note__t">仍待补的资料</div>
    <div class="note__d">霞鹜文楷与思源系列的授权字体文件 —— 补齐后改为 @font-face 自托管。实景图库：当前仅一张园区航拍，且标注为 AI 生成示意图。空状态与场景叙事的插画：按本典规则应改为影像而非插画，本站的处理见<a href="atlas.html">图谱</a>。</div>
  </div></div>`)}`
    })}

${chapter({
      id: 'ch-18', num: '018 / 021', eyebrow: 'Product surfaces',
      title: '产品面与屏幕清单',
      lead: '三个 UI kit 共十屏，两个起步模板。按 V7.0 重出的优先级列在每一行末 —— STE 经营看板与品牌落地页是本版首批落地对象。',
      body: `
  <div class="table-scroll fx-reveal"><table class="tbl">
    <caption class="u-sr">三个 UI kit 与两个模板的屏幕清单</caption>
    <thead><tr><th scope="col">目录</th><th scope="col">名称</th><th scope="col">屏幕</th><th scope="col" class="num">数</th><th scope="col">优先级</th></tr></thead>
    <tbody>${KITS.map(([d, n, s, c, p]) => `<tr>
      <td class="mono" style="color:var(--text-heading);white-space:nowrap">${d}</td>
      <td style="color:var(--text-heading);font-weight:var(--fw-medium)">${n}</td>
      <td style="color:var(--text-muted)">${s}</td><td class="num">${c}</td>
      <td><span class="tag ${p === '首批重出' ? 'tag--brand' : 'tag--plain'}">${p}</span></td></tr>`).join('')}</tbody>
  </table></div>

  ${block('重出时必须换掉的四处', `
  <div class="rules">
    ${REDO.map((r, i) => `<div class="rule"><span class="rule__n">0${i + 1}</span><span class="rule__t">${r}</span></div>`).join('')}
  </div>`)}`
    })}

${chapter({
      id: 'ch-19', num: '019 / 021', eyebrow: 'Repository',
      title: '仓库结构与索引',
      lead: '消费方只需引一个文件：styles.css，它只含 @import。组件包走 _ds_bundle.js。',
      body: `
  ${block('tokens/ · 十三个文件', `
  <div class="tokens">
    ${TOKENS_DIR.map(([f, d]) => `<div class="token-row" data-copy="tokens/${f}" role="button" tabindex="0" title="点击复制路径">
      <span class="token-row__name">${f}</span><span class="token-row__val"></span><span class="token-row__use">${d}</span></div>`).join('')}
  </div>`)}

  ${block('其余目录', `
  <div class="tokens">
    ${DIRS.map(([f, d]) => `<div class="token-row"><span class="token-row__name">${f}</span>
      <span class="token-row__val"></span><span class="token-row__use">${d}</span></div>`).join('')}
  </div>
  <div class="note" style="margin-top:var(--space-5)"><div class="note__b">
    <div class="note__t">每个组件目录的约定</div>
    <div class="note__d"><code>&lt;Name&gt;.jsx</code> 实现 · <code>&lt;Name&gt;.d.ts</code> props 契约 · <code>&lt;Name&gt;.prompt.md</code> 何时用、用法、变体 · 一张 @dsCard 展示卡。三件新组件按同一约定补齐。</div>
  </div></div>`)}`
    })}

${chapter({
      id: 'ch-20', num: '020 / 021', eyebrow: 'Material Design 3',
      title: '与 M3 对照：补五条，不采纳四条',
      lead: '本系统的图标层本来就取自 Material Symbols，但只借了图标没借它的系统方法。M3 有几处工程纪律比本系统严 —— 尤其配色角色的成对声明与状态层的量化。也有几处与本系统的根基冲突，如实标注。',
      body: `
  ${block('采纳五条', `
  <div>
    ${M3_YES.map(([n, t, d]) => `<div style="display:grid;grid-template-columns:auto minmax(0,1fr);gap:var(--space-5);padding:var(--space-5) 0;border-bottom:var(--border-hairline) solid var(--table-divider)">
      <span class="u-mono" style="color:var(--status-success)">${n}</span>
      <span><b style="display:block;font-size:var(--fs-body-s);font-weight:var(--fw-semibold);color:var(--text-heading)">${t}</b>
      <span style="display:block;margin-top:var(--space-2);font-size:var(--fs-body-s);line-height:1.8;color:var(--text-body)">${d}</span></span>
    </div>`).join('')}
  </div>`)}

  ${block('on- 配对族实样', '金上用玄墨不用白 —— 金的明度太高', `
  <div class="grid grid--3" style="gap:var(--space-4)">
    ${PAIRS.map(([n, t, bg, fg]) => `<div>
      <div style="background:${bg};color:${fg};border-radius:var(--shape-card);padding:var(--space-5);min-height:82px;display:flex;flex-direction:column;justify-content:center">
        <span style="font-size:var(--fs-body-s);font-weight:var(--fw-medium)">${n}</span>
        <span class="u-mono" style="font-size:11px;opacity:.8;margin-top:4px">${t}</span></div></div>`).join('')}
  </div>
  <p style="margin-top:var(--space-4);font-size:var(--fs-label);color:var(--text-subtle);max-width:44em">白字在古铜金上不足 4.5:1。这条以前没写在任何地方，靠的是设计师记得 —— 现在锁进令牌层。</p>`)}

  ${block('状态层量化 · 窗口尺寸类', `
  <div class="grid grid--2" style="gap:var(--space-6)">
    <div class="panel">
      <h4>状态层百分比</h4>
      <div class="grid grid--4" style="margin-top:var(--space-5);gap:var(--space-3)">
        ${[['Hover', '8%'], ['Focus', '10%'], ['Press', '10%'], ['Drag', '16%']]
        .map(([k, v]) => `<div><div style="height:52px;border-radius:var(--shape-tag);background:color-mix(in oklch,var(--text-body) ${v},var(--surface-sunken))"></div>
        <div class="u-label" style="margin-top:var(--space-2)">${k}</div><div class="u-mono" style="font-size:11px;color:var(--text-subtle)">${v}</div></div>`).join('')}
      </div>
      <p style="margin-top:var(--space-4);font-size:var(--fs-label);color:var(--text-muted);margin-bottom:0">仅作用于表面，不作用于文字与图标 ——「正文一律满不透明度」的规则不变。有明确下一档色的组件仍优先用换档，状态层是兜底。</p>
    </div>
    <div class="panel">
      <h4>窗口尺寸类</h4>
      <div style="margin-top:var(--space-5)">
        ${[['&lt; 600', 'Compact', '底部导航栏，单列，侧轨收起'],
        ['600–1239', 'Medium', '76px 图标侧轨，双列'],
        ['≥ 1240', 'Expanded', '264px 展开侧轨，主内容 : 侧栏 8 : 4']]
        .map(([w, n, d]) => `<div style="display:grid;grid-template-columns:auto auto minmax(0,1fr);gap:var(--space-4);align-items:baseline;padding:var(--space-3) 0;border-bottom:var(--border-hairline) solid var(--table-divider)">
          <span class="u-num" style="font-size:var(--fs-body-s);white-space:nowrap">${w}</span>
          <span class="u-mono" style="font-size:11px;color:var(--text-brand)">${n}</span>
          <span style="font-size:var(--fs-label);color:var(--text-muted)">${d}</span></div>`).join('')}
      </div>
      <p style="margin-top:var(--space-4);font-size:var(--fs-label);color:var(--text-muted);margin-bottom:0">与本系统既有的 76 / 264px 侧轨尺寸正好对上，只是此前没写明哪个宽度用哪个。</p>
    </div>
  </div>`)}

  ${block('不采纳四条', `
  <div class="grid grid--4" style="gap:0">
    ${M3_NO.map(([t, d]) => `<div style="padding:var(--space-5);border-left:var(--hairline);border-top:var(--border-indicator) solid var(--text-subtle)">
      <div style="display:flex;align-items:center;gap:var(--space-2)">
        <span class="ms" style="font-size:14px;color:var(--text-subtle)" aria-hidden="true">block</span>
        <b style="font-size:var(--fs-body-s);color:var(--text-heading)">${t}</b></div>
      <p style="margin-top:var(--space-3);font-size:var(--fs-label);line-height:1.8;color:var(--text-muted);margin-bottom:0">${d}</p>
    </div>`).join('')}
  </div>`)}

  ${block('新增令牌族', `
  <div class="table-scroll"><table class="tbl">
    <caption class="u-sr">采纳 M3 方法后新增的四族令牌</caption>
    <thead><tr><th scope="col">族</th><th scope="col">内容</th><th scope="col" class="num">数量</th></tr></thead>
    <tbody>${M3_TOKENS.map(([f, c, n]) => `<tr><td class="mono" style="color:var(--text-heading)">${f}</td><td>${c}</td><td class="num">${n}</td></tr>`).join('')}
    </tbody>
    <tfoot><tr><td>共补</td><td>令牌总数由 399 增至 421</td><td class="num">22</td></tr></tfoot>
  </table></div>
  <p style="margin-top:var(--space-4);font-size:var(--fs-label);color:var(--text-subtle);max-width:46em">Material Design 3 与 Material Symbols 归 Google 所有，本节只对照其系统方法与工程纪律，不引入其组件造型、动态取色机制与品牌视觉。</p>`)}`
    })}

${chapter({
      id: 'ch-21', num: '021 / 021', eyebrow: 'Sources',
      title: '来源、授权与偏离说明',
      lead: '读者可能没有下列来源的访问权。所有从中提取的规则都已落进令牌、组件与本典，本典即唯一权威。',
      body: `
  <div class="table-scroll fx-reveal"><table class="tbl">
    <caption class="u-sr">资料来源、形态与使用限制</caption>
    <thead><tr><th scope="col">来源</th><th scope="col">形态</th><th scope="col">用途与限制</th></tr></thead>
    <tbody>${SOURCES.map(([s, f, u]) => `<tr>
      <td style="color:var(--text-heading);font-weight:var(--fw-medium);white-space:nowrap">${s}</td>
      <td class="mono">${f}</td><td>${u}</td></tr>`).join('')}</tbody>
  </table></div>

  ${block('偏离 · 修正 · 不采纳', `
  <div class="grid grid--3" style="gap:var(--space-5)">
    <div class="panel">
      <div class="u-eyebrow" style="color:var(--status-warning)">Deviation</div>
      <h4 style="margin-top:var(--space-3)">圆角双轨</h4>
      <p style="margin-top:var(--space-3);font-size:var(--fs-body-s);line-height:1.8;margin-bottom:0">原稿要求按钮全圆 9999px。全圆按钮在高密度 ERP 表格里破坏对齐与扫读，故改为产品界面 6px、营销面 CTA 全圆。这是本系统对原稿唯一的硬性偏离。</p>
    </div>
    <div class="panel">
      <div class="u-eyebrow" style="color:var(--status-info)">Correction</div>
      <h4 style="margin-top:var(--space-3)">字阶层级倒挂</h4>
      <p style="margin-top:var(--space-3);font-size:var(--fs-body-s);line-height:1.8;margin-bottom:0">原稿 H4（28px）大于 H3（24px）。已修正为递降序列，并把 H4–H6 从宋体转为界面黑体，形成展示衬线与界面无衬线的清晰断点。</p>
    </div>
    <div class="panel">
      <div class="u-eyebrow">Not adopted</div>
      <h4 style="margin-top:var(--space-3)">Geist 的「不用全大写眼标」</h4>
      <p style="margin-top:var(--space-3);font-size:var(--fs-body-s);line-height:1.8;margin-bottom:0">本系统的眼标不是装饰性标签，而是承载章节编号与实体代号的一层结构，与竖排序号、印章方块同属章节起头手法。保留，并维持只用于西文的限制。</p>
    </div>
  </div>`)}

  ${block('Token count', `
  <div class="grid grid--8-4" style="align-items:center">
    <div>
      <p style="line-height:1.9;max-width:38em">原稿声明 486 个（86 + 142 + 258），V6.0 实建 375 个，V7.0 增至 421。差额不是遗漏 —— 未把每个组件的每条属性都拆成独立令牌，只在语义层与组件层保留真正会被复用或主题化的部分。<strong>数量不是质量。</strong></p>
      <a class="btn btn--secondary" href="tokens.html">打开令牌总表<span class="ms" style="font-size:18px" aria-hidden="true">arrow_forward</span></a>
    </div>
    <div style="text-align:right">
      <div class="u-num" style="font-size:clamp(64px,9vw,110px);line-height:1;letter-spacing:-.04em">421</div>
      <div class="u-eyebrow" style="margin-top:var(--space-2)">V7.0 可编译令牌</div>
    </div>
  </div>`)}`
    })}

</div>`
};
