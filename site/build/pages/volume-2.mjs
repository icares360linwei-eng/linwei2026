import { vhero, toc, chapter, block } from '../shell.mjs';

const TOC = [
  ['03', '色彩', '#ch-03'], ['04', '色板全景', '#ch-04'], ['05', '模块识别', '#ch-05'],
  ['06', '字体', '#ch-06'], ['07', '刻度与断点', '#ch-07'], ['08', '间距与版面', '#ch-08']
];

const INK = [
  ['50', '#FBF9F5', '宣 · 页面底'], ['100', '#F5F2EC', '轻霜'], ['200', '#E9E4DA', '薄雾 · 细线'],
  ['300', '#D3CCBF', '淡烟 · 描边'], ['400', '#B2AA9C', '古绢'], ['500', '#857E71', '中灰'],
  ['600', '#635D53', '砚灰'], ['700', '#45403A', '墨灰 · 正文'], ['800', '#2A2622', '浓墨'],
  ['900', '#17140F', '玄墨 · 主操作'], ['950', '#0D0B08', '焦墨 · 暗色底']
];
const ZHU = [['50', '#F7EDEA'], ['100', '#EFD9D3'], ['200', '#DDAFA4'], ['400', '#A8452F'],
['600', '#8A3323'], ['700', '#6E2719'], ['800', '#541D12']];
const GOLD = [['200', '#E8DCC4'], ['300', '#D4C29C'], ['400', '#B9A177'], ['500', '#9A8259'], ['600', '#7A653F']];

const STATUS = [
  ['--status-success', '#2F6B4F', '达标 · 上涨 · 在线'],
  ['--status-warning', '#8A6A1F', '临界 · 待核 · 需人工复核'],
  ['--status-error', '#8A3323', '超限 · 下跌 · 失败'],
  ['--status-info', '#2B4A63', '提示 · 进行中']
];

const ALIAS = [
  ['--success-600', 'var(--ste-600)', '#2F6B4F'],
  ['--warning-600', '#7A5F22', '#8A6A1F'],
  ['--error-600', 'var(--zhu-600)', '#8A3323 · 同值但独立声明'],
  ['--info-600', 'var(--sti-600)', '#2B4A63']
];

const SURFACES = [
  ['--surface-page', 'ink-50 · 页面底', 'var(--ink-50)'],
  ['--surface-sunken', 'ink-100 · 中性画布', 'var(--ink-100)'],
  ['--surface-card', '#FFFEFB · 面板，非纯白', '#FFFEFB'],
  ['--surface-inverse', 'ink-900 · 反白区块', 'var(--ink-900)']
];

const MODULES = [
  ['M1', '种植与农户', '甜高粱与农林废弃物、种植合同', 'var(--ste-400)'],
  ['M2', '收储与化验', '磅单、含水率与热值、供应商档案', 'var(--ste-500)'],
  ['M3', '发电与供汽', 'CFB 锅炉工况、机组负荷、蒸汽外供', 'var(--ste-600)'],
  ['M4', '碳资产', '配额台账、CCER 开发、减排签发', 'var(--ste-700)'],
  ['M5', '灰渣资源化', '灰渣回田与制建材、闭环收口', 'var(--ink-500)']
];

const MODTABLE = [
  ['STG', 'M1 战略与规划 · M2 审批中枢 · M3 合规台账 · M4 资本配置', '400 / 500 / 600 / 700'],
  ['STE', 'M1 种植 · M2 收储 · M3 发电供汽 · M4 碳资产 · M5 灰渣', '400 / 500 / 600 / 700 / ink-500'],
  ['STI', 'M1 订单与合约 · M2 报关合规 · M3 多式联运 · M4 结算', '400 / 500 / 600 / 700'],
  ['STH', 'M1 中试 · M2 注册与质量 · M3 生产放行 · M4 临床与随访', '400 / 500 / 600 / 700'],
  ['EDU', 'M1 学生档案 · M2 课程与教研 · M3 家校协同', '400 / 600 / 700']
];

const MODRULES = [
  '模块色只出现在 2–3px 刻度线、选中指示条、图表首序列。不用于填色块、不用于卡片底、不用于按钮',
  '一屏之内最多出现两个模块色。需要三个以上说明这屏该拆',
  '跨模块汇总视图（经营看板、驾驶舱）一律退回实体色 600，不做模块拼色',
  '模块编号 M1–M5 必须上界面并走 mono。颜色是辅助，编号是主编码 —— 打印成黑白后仍要能分辨'
];

const SCALE = [
  ['--fs-chapter', 'clamp(34,4.4vw,64) / 200', '章节标题', 'font-family:var(--font-display);font-size:clamp(30px,4.4vw,60px);font-weight:200;letter-spacing:-.032em;line-height:1.08'],
  ['--fs-page', '36 / 200', '页面标题', 'font-family:var(--font-display);font-size:36px;font-weight:200;letter-spacing:-.032em'],
  ['--fs-panel', '24 / 300', '面板标题', 'font-family:var(--font-display);font-size:24px;font-weight:300;letter-spacing:-.02em'],
  ['--fs-stat', 'clamp(28,2.4vw,34) / 300', 'KPI 数值', 'font-family:var(--font-western);font-size:32px;font-weight:300;font-variant-numeric:tabular-nums;letter-spacing:-.02em'],
  ['--fs-block', '20 / 500', '区块小标题', 'font-size:20px;font-weight:500'],
  ['--fs-body', '16 / 400', '正文 · 度量 35em', 'font-size:16px;font-weight:400'],
  ['--fs-body-s', '14 / 400', '次级正文与表格', 'font-size:14px;font-weight:400'],
  ['--fs-label', '12 / 500 · 零字距', '中文小标签', 'font-size:12px;font-weight:500'],
  ['--fs-eyebrow', '12 / 500 · +.18em', 'Eyebrow · western only', 'font-family:var(--font-western);font-size:12px;font-weight:500;letter-spacing:.18em;text-transform:uppercase']
];
const SCALE_TEXT = ['守正 · 开物 · 共生', '赤湖工业园经营看板', '燃料收储与化验', '18,600',
  '今日碳配额', '含水率与热值逐车化验，不合格即退运。', '磅单 · 供应商档案 · 质量追溯', '进厂磅单', 'Fuel supply'];

const TRACKS = [
  ['--track-display', '-0.032em', '展示级负字距'],
  ['--track-title', '-0.02em', '24–36px 档标题'],
  ['--track-ui', '0', '界面级一律归零，含中文小标签'],
  ['--track-eyebrow', '0.18em', '只作用于西文眼标。汉字用 .u-label'],
  ['--num-weight', '300', '全部数值统一字重'],
  ['--measure-cn', '35em', '写在元素自身上。写在父容器会按继承的正文字号解析']
];

const SERIF = [
  ['热电联产', '≥ 32px · weight 200', '成立。字越大越该细，这是宋体的正确用法', 'font-size:34px;font-weight:200'],
  ['热电联产与碳资产开发', '24 – 31px · weight 300', '面板标题档。200 在此已开始发虚', 'font-size:26px;font-weight:300'],
  ['含水率与热值逐车化验', '&lt; 24px · weight 400', '宋体在 24px 以下一律 400。低于 16px 不用宋体', 'font-size:18px;font-weight:400']
];

const SPACES = [
  [1, 4, '图标与文字之间'], [2, 8, '标签与数值之间'], [3, 12, '行内元素'], [4, 16, '栅格槽宽下限'],
  [5, 24, '组件间距 · 面板密集档内边距'], [6, 32, '段落间距 · 面板内边距（产品面）'],
  [7, 40, '面板内边距 · 品牌面'], [8, 48, '产品面区块节奏 · 表格行高'],
  [9, 56, '面板内部大分段'], [10, 64, '章节头到内容'], [11, 80, 'Web 小区块'],
  [12, 96, 'Web 中区块'], [13, 128, '品牌面章节节奏']
];

const BPS = [
  ['xs · 0', '4', '16px'], ['sm · 600', '8', '16px'], ['md · 905', '12', '24px'],
  ['lg · 1240', '12', '24px'], ['xl · 1440', '12', '24px']
];

const RADII = [
  ['2px', '--radius-xs', ''], ['4px', '--radius-sm', '标签'], ['6px', '--radius-md', '产品按钮与输入框'],
  ['10px', '--radius-lg', '下拉与气泡'], ['16px', '--radius-xl', '卡片与弹窗'],
  ['24px', '--radius-2xl', ''], ['9999px', '--radius-full', '营销 CTA · 状态点 · 溯源胶囊']
];

const ramp = (name, arr, note) => `
<div style="margin-bottom:var(--space-6)">
  <div style="display:flex;align-items:baseline;justify-content:space-between;gap:var(--space-4);margin-bottom:var(--space-3)">
    <span class="u-eyebrow">${name}</span><span class="u-label">${note}</span>
  </div>
  <div class="swatches">
    ${arr.map(([s, hex, cn]) => `<button class="swatch" type="button" data-copy="${hex}" title="点击复制 ${hex}">
      <span class="swatch__chip" style="background:${hex}"></span>
      <span class="swatch__name">${s}</span>
      <span class="swatch__hex">${hex}</span>
      ${cn ? `<span class="swatch__cn">${cn}</span>` : ''}
    </button>`).join('')}
  </div>
</div>`;

export default {
  file: 'volume-2.html',
  title: '第二册 · 基础',
  desc: '色彩 · 色板全景 · 模块识别 · 字体 · 刻度与断点 · 间距与版面。',
  body: `
${vhero({
    vol: '二', name: '基础', art: 'ramp', cur: 'volume-2.html',
    sub: '色彩 · 色板 · 模块识别 · 字体 · 刻度 · 版面 —— 结构是五层：墨为主、朱为章、金为贵、实体色为身份、状态色为语义。'
  })}
${toc(TOC)}

<div class="wrap">

${chapter({
      id: 'ch-03', num: '003 / 021', eyebrow: 'Color',
      title: '色彩：高阶不靠色度，靠明度落差',
      lead: '同一色相，oklch(0.32 0.09) 显贵，oklch(0.45 0.22) 显廉。宋瓷、明式家具、官式建筑的朱墨金用的都是掺了灰的矿物颜料；瑞士编辑设计同样是近乎单色加一个深色重点。',
      body: `
  ${block('配色配额 · 验收标准', `
  <div class="grid grid--4 fx-reveal" style="gap:0">
    ${[['80%', '墨与宣', '底色 --ink-50 宣，正文 --ink-700，标题与主操作按钮 --ink-900', 'var(--ink-900)'],
      ['15%', '五实体矿物色', '2px 细线刻度 + 代号，不是 40px 填色块。驱动选中态、导航激活、链接、焦点环、图表首序列', 'var(--brand-600)'],
      ['5%', '印章朱 #8A3323', '全站唯一重点色。每个章节仅一枚方块，错误态与之同值因而同享配额', 'var(--zhu-600)'],
      ['5%', '古铜金 #B9A177', '箔金不是镀金。营销 CTA、奖项资质、深底眼标。每屏最多一处', 'var(--gold-400)']]
        .map(([p, n, d, c]) => `
    <div style="padding:var(--space-6) var(--space-5);border-left:var(--hairline)">
      <div style="width:100%;height:4px;background:${c};margin-bottom:var(--space-5)"></div>
      <div class="u-num" style="font-size:34px;letter-spacing:-.02em">${p}</div>
      <div style="margin-top:var(--space-2);font-size:var(--fs-body-s);font-weight:var(--fw-medium);color:var(--text-heading)">${n}</div>
      <p style="margin-top:var(--space-3);font-size:var(--fs-label);line-height:1.8;color:var(--text-muted)">${d}</p>
    </div>`).join('')}
  </div>
  <p style="margin-top:var(--space-5);font-size:var(--fs-body-s);color:var(--text-muted);max-width:40em">配额是验收标准，不是画法。出稿流程：任何新界面先全墨出一稿，再逐处论证加色，论证不出理由的地方保持墨色。</p>`)}

  ${block('状态色族 · V7.0 新立', `
  <div class="grid grid--2" style="gap:var(--space-6)">
    <div>
      ${STATUS.map(([t, hex, use]) => `<div style="display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:var(--space-4);align-items:center;padding:var(--space-4) 0;border-bottom:var(--border-hairline) solid var(--table-divider)">
        <span style="width:28px;height:28px;border-radius:var(--radius-full);background:${hex}"></span>
        <span><b class="u-mono" style="display:block;color:var(--text-heading)">${t}</b>
        <span class="u-label">${use}</span></span>
        <button class="swatch__hex" style="border:0;background:none;cursor:pointer;font-family:var(--font-mono);color:var(--text-subtle)" data-copy="${hex}">${hex}</button>
      </div>`).join('')}
    </div>
    <div class="panel">
      <h4>涨跌双重编码</h4>
      <p style="margin-top:var(--space-3);font-size:var(--fs-body-s);line-height:1.8">此前没有状态色族，涨跌只能借实体色，导致松烟绿同时表示「STE」与「上涨」，语义作废。涨跌一律颜色 + 方向图标双重编码，不靠颜色单打。</p>
      <!-- 面板内分区用 1px 墨线，不做卡中卡 -->
      <div class="statband" style="margin-top:var(--space-5);box-shadow:none;background:transparent;border-top:var(--hairline);border-radius:0">
        <div class="statband__item"><span class="statband__label">今日发电量</span>
          <span class="statband__value">1,284<span class="statband__unit">MWh</span></span>
          <span class="statband__delta" data-dir="up"><span class="ms" style="font-size:14px" aria-hidden="true">arrow_upward</span>3.2%</span></div>
        <div class="statband__item"><span class="statband__label">燃料库存</span>
          <span class="statband__value">18.6<span class="statband__unit">kt</span></span>
          <span class="statband__delta" data-dir="down"><span class="ms" style="font-size:14px" aria-hidden="true">arrow_downward</span>6.4%</span></div>
      </div>
    </div>
  </div>`)}

  ${block('主题切换 · 对比 · 已废止', `
  <div class="grid grid--3" style="gap:0">
    <div style="padding:var(--space-5);border-left:var(--hairline)">
      <div class="u-eyebrow">Themes</div><h4 style="margin-top:var(--space-3)">主题切换</h4>
      <p style="margin-top:var(--space-3);font-size:var(--fs-body-s);line-height:1.8"><code>data-theme="stg|ste|sti|sth|edu"</code> 重映射 <code>--brand-50…800</code> 整族；<code>data-color-scheme="dark"</code> 以焦墨为底，主操作翻转为宣纸白。不另写一套组件。</p>
    </div>
    <div style="padding:var(--space-5);border-left:var(--hairline)">
      <div class="u-eyebrow">Contrast</div><h4 style="margin-top:var(--space-3)">对比与透明度</h4>
      <p style="margin-top:var(--space-3);font-size:var(--fs-body-s);line-height:1.8">实体色 600 档在宣纸底上均 ≥8:1，白字在其上 ≥4.5:1。深底浅色文字换 ink 色阶实色，不用 alpha 调淡。透明度只三处合法：粘性顶栏、模态遮罩、压在实景上的溯源胶囊。</p>
    </div>
    <div style="padding:var(--space-5);border-left:var(--hairline)">
      <div class="u-eyebrow">Deprecated</div><h4 style="margin-top:var(--space-3)">已废止色值</h4>
      <div style="margin-top:var(--space-4);display:flex;flex-wrap:wrap;gap:var(--space-2)">
        ${['#851EA3', '#196B42', '#1E4082', '#208F9B', '#B81E1E'].map(h => `<span class="tag tag--dep"><i style="width:10px;height:10px;background:${h};display:inline-block;margin-right:4px"></i>${h}</span>`).join('')}
      </div>
      <p style="margin-top:var(--space-4);font-size:var(--fs-label);color:var(--text-subtle);line-height:1.7">V6.0 高色度色值。色相关系保留，色度与明度整体重制。绝不用纯黑 #000；卡面用 #FFFEFB 而非纯白。</p>
    </div>
  </div>`)}`
    })}

${chapter({
      id: 'ch-04', num: '004 / 021', eyebrow: 'Palette',
      title: '色板全景',
      lead: 'Primitive 色板与语义表面的完整取值。所有色值只经令牌引用，不在组件里硬编码。点击任意色块复制其十六进制值。',
      body: `
  <div class="fx-reveal">
  ${ramp('宣纸墨色 Ink 十一阶 · 暖炭灰', INK, '点击复制')}
  ${ramp('印章朱 Zhu 七阶', ZHU, '标准朱 --zhu-600 · 取自印泥与官式朱')}
  ${ramp('古铜金 Gold 五阶', GOLD, '标准金 --gold-400 · 去橙留灰')}
  </div>

  ${block('语义表面四层 · 层级只靠明度差，不靠框线', `
  <div class="grid grid--4" style="gap:var(--space-4)">
    ${SURFACES.map(([t, d, c]) => `<div>
      <div style="height:88px;border-radius:var(--shape-card);background:${c};box-shadow:inset 0 0 0 1px var(--border-subtle)"></div>
      <div class="u-mono" style="margin-top:var(--space-3);color:var(--text-heading);font-size:var(--fs-label)">${t}</div>
      <div class="u-label">${d}</div></div>`).join('')}
  </div>
  <p style="margin-top:var(--space-5);font-size:var(--fs-body-s);color:var(--text-muted);max-width:42em">暗色模式走 <code>data-color-scheme="dark"</code>：page 翻为 ink-950，card #1A1713，sunken #131009，raised #221E19，遮罩 rgba(0,0,0,.62)，主操作翻转为宣纸白。不另写一套组件 —— 右上角切换即可验证本页每一处。</p>`)}

  ${block('V7.0 必须改动的源码别名', `
  <div class="table-scroll"><table class="tbl">
    <caption class="u-sr">四支状态色从别名实体色改为独立声明</caption>
    <thead><tr><th scope="col">令牌</th><th scope="col">现源码</th><th scope="col">V7.0</th></tr></thead>
    <tbody>${ALIAS.map(([t, o, n]) => `<tr><td class="mono" style="color:var(--text-heading)">${t}</td>
      <td class="mono" style="color:var(--text-subtle);text-decoration:line-through">${o}</td>
      <td class="mono" style="color:var(--text-brand)">${n}</td></tr>`).join('')}
    </tbody></table></div>
  <div class="note" style="margin-top:var(--space-5)"><div class="note__b">
    <div class="note__t">为什么必须独立声明</div>
    <div class="note__d">三支状态色在源码里直接别名实体色，这正是「松烟绿同时表示 STE 与上涨」的成因。V7.0 将四支全部独立声明，取值不再随 data-theme 变动。error 与印章朱同值是有意为之 —— 错误态因此自动继承「每屏一处」的配额。</div>
  </div></div>`)}`
    })}

${chapter({
      id: 'ch-05', num: '005 / 021', eyebrow: 'Module identity',
      title: '模块识别：三层结构，色相只有一个',
      lead: '实体色压到 2px 刻度之后，一家实体内部的多个业务模块就失去了识别手段。解法不是给每个模块发一个色相 —— 那会让 STE 一家公司里出现五种颜色，直接推翻配色配额；而是让模块走同一色相的明度档。',
      body: `
  ${block('三层结构', `
  <div class="grid grid--3" style="gap:0">
    ${[['Layer 1', '色相', '实体层', '五实体各一色相，由 data-theme 切换。跨实体的差异只在这一层表达。'],
      ['Layer 2', '明度 + 编号 + 点阵', '模块层', '同一实体色阶的四个明度档（400 / 500 / 600 / 700）+ 模块编号 M1–M5 + 点阵密度。三重编码，不新增任何色相。'],
      ['Layer 3', '状态色族', '状态层', '四支独立状态色，与前两层不共用取值。因此「达标」在任何实体任何模块里都是同一个绿。']]
        .map(([l, m, n, d]) => `
    <div style="padding:var(--space-5);border-left:var(--hairline)">
      <div style="display:flex;align-items:baseline;gap:var(--space-3)"><span class="u-eyebrow">${l}</span><span class="u-label">${m}</span></div>
      <h4 style="margin-top:var(--space-3)">${n}</h4>
      <p style="margin-top:var(--space-3);font-size:var(--fs-body-s);line-height:1.8;margin-bottom:0">${d}</p>
    </div>`).join('')}
  </div>`)}

  ${block('STE 九派国有能源 · 五模块分配', `
  <div class="grid grid--8-4" style="align-items:start">
    <div>
      ${MODULES.map(([m, n, d, c], i) => `<div style="display:grid;grid-template-columns:auto auto minmax(0,1fr);gap:var(--space-4);align-items:baseline;padding:var(--space-4) 0;border-bottom:var(--border-hairline) solid var(--table-divider)">
        <span style="width:3px;height:34px;background:${c};display:block"></span>
        <span class="u-mono" style="color:var(--text-heading);width:2.2em">${m}</span>
        <span><b style="display:block;font-size:var(--fs-body-s);font-weight:var(--fw-medium);color:var(--text-heading)">${n}</b>
        <span class="u-label">${d}</span></span>
      </div>`).join('')}
      <p style="margin-top:var(--space-5);font-size:var(--fs-body-s);color:var(--text-muted);max-width:40em">M1–M4 沿闭环顺序由浅入深，读者扫一眼刻度深浅就知道自己在链条的哪一段。M5 走中性墨阶 —— 灰渣是闭环的出口，不参与生产链的深浅序列，这个例外是有意的。四个明度档在宣纸底上的对比度均 ≥4.5:1。</p>
    </div>
    <div class="panel panel--sunken">
      <div class="u-eyebrow">模块导航实样</div>
      <div style="margin-top:var(--space-4)">
        ${MODULES.map(([m, n], i) => `<div style="display:grid;grid-template-columns:auto auto minmax(0,1fr);gap:var(--space-3);align-items:center;padding:var(--space-3) var(--space-3);border-left:var(--border-indicator) solid ${i === 2 ? 'var(--ste-600)' : 'transparent'};background:${i === 2 ? 'color-mix(in oklch,var(--ste-600) 6%,transparent)' : 'transparent'};border-radius:var(--shape-button)">
          <span class="u-mono" style="font-size:11px;color:${i === 2 ? 'var(--text-heading)' : 'var(--text-subtle)'}">${m}</span>
          <span style="width:6px;height:6px;border-radius:var(--radius-full);background:${i === 2 ? 'var(--ste-600)' : 'var(--ink-300)'}"></span>
          <span style="font-size:var(--fs-body-s);color:${i === 2 ? 'var(--text-heading)' : 'var(--text-muted)'}">${n}</span>
        </div>`).join('')}
      </div>
      <p style="margin-top:var(--space-4);font-size:var(--fs-label);color:var(--text-subtle);line-height:1.7;margin-bottom:0">未选中的模块不上色 —— 只有当前模块显示 3px 指示条与 6% 品牌底。侧轨不是色卡。</p>
    </div>
  </div>`)}

  ${block('四条使用限制', `
  <div class="rules">
    ${MODRULES.map((r, i) => `<div class="rule"><span class="rule__n">${String(i + 1).padStart(2, '0')}</span><span class="rule__t">${r}</span></div>`).join('')}
  </div>
  <div class="table-scroll" style="margin-top:var(--space-6)"><table class="tbl">
    <caption class="u-sr">五实体的模块划分与明度档分配</caption>
    <thead><tr><th scope="col">实体</th><th scope="col">模块</th><th scope="col">明度档分配</th></tr></thead>
    <tbody>${MODTABLE.map(([e, m, l]) => `<tr><td class="mono" style="color:var(--text-heading)">${e}</td><td>${m}</td><td class="mono">${l}</td></tr>`).join('')}</tbody>
  </table></div>
  <p style="margin-top:var(--space-4);font-size:var(--fs-label);color:var(--text-subtle);max-width:44em">模块划分取自各实体现有业务链条，需由业务负责人复核后定稿。EDU 只用三档是因为它只有三个模块 —— 档位不必凑满，宁缺不凑。</p>`)}`
    })}

${chapter({
      id: 'ch-06', num: '006 / 021', eyebrow: 'Typography',
      title: '字体：三轨分工，九级字阶',
      lead: '字阶落差是大气的主要来源：同屏最大字与正文的比值不低于三倍，否则版面就平。四个字族按职责收成三轨 —— 展示、界面、标识 —— 各轨互不越界。',
      body: `
  ${block('三轨分工', `
  <div class="grid grid--3" style="gap:0">
    <div style="padding:var(--space-6) var(--space-5);border-left:var(--hairline)">
      <div class="u-eyebrow">Track 01 · Display</div>
      <div style="margin-top:var(--space-4);font-family:var(--font-display);font-size:30px;font-weight:200;letter-spacing:-.032em;color:var(--text-heading);word-break:keep-all">守正 · 开物 · 共生</div>
      <p style="margin-top:var(--space-4);font-size:var(--fs-label);line-height:1.8;color:var(--text-muted);margin-bottom:0">Noto Serif SC 200–300。仅 H1/H2、章节标题与哲学引文。负字距 -0.032em。引文行高 1.9–2.1。</p>
    </div>
    <div style="padding:var(--space-6) var(--space-5);border-left:var(--hairline)">
      <div class="u-eyebrow">Track 02 · Interface</div>
      <div style="margin-top:var(--space-4);font-size:20px;font-weight:400;color:var(--text-heading)">今日碳配额剩余 <span class="u-num" style="font-size:22px">12,800</span> 吨</div>
      <p style="margin-top:var(--space-4);font-size:var(--fs-label);line-height:1.8;color:var(--text-muted);margin-bottom:0">Noto Sans SC 承载中文，Space Grotesk 承载全部西文与数值。字距归零。数值统一 300 字重 + tabular-nums。</p>
    </div>
    <div style="padding:var(--space-6) var(--space-5);border-left:var(--hairline)">
      <div class="u-eyebrow">Track 03 · Identifier</div>
      <div class="u-mono" style="margin-top:var(--space-4);font-size:20px;color:var(--text-heading)">STE.RC.20260904</div>
      <p style="margin-top:var(--space-4);font-size:var(--fs-label);line-height:1.8;color:var(--text-muted);margin-bottom:0">JetBrains Mono 承载单号、批次、哈希、日志时间戳与 Token 名。不承载计量数值。</p>
    </div>
  </div>`)}

  ${block('九级字阶 · 全部在用，无冗余档', `
  <div>
    ${SCALE.map(([t, m, use, css], i) => `<div class="spec">
      <span class="spec__t" style="${css}">${SCALE_TEXT[i]}</span>
      <span class="spec__meta">${m}<br><span style="color:var(--text-muted)">${use}</span></span>
    </div>`).join('')}
  </div>`)}

  ${block('四支字距令牌', `
  <div class="tokens">
    ${TRACKS.map(([n, v, u]) => `<div class="token-row" data-copy="${n}" role="button" tabindex="0" title="点击复制">
      <span class="token-row__name">${n}</span><span class="token-row__val">${v}</span><span class="token-row__use">${u}</span></div>`).join('')}
  </div>`)}

  ${block('宋体字重：200 有下限，不是全场通用', `
  <div class="grid grid--3" style="gap:0">
    ${SERIF.map(([txt, spec, note, css]) => `<div style="padding:var(--space-6) var(--space-5);border-left:var(--hairline)">
      <div style="font-family:var(--font-display);${css};color:var(--text-heading);word-break:keep-all;min-height:2.2em">${txt}</div>
      <div class="u-mono" style="margin-top:var(--space-4);font-size:11px;color:var(--text-brand)">${spec}</div>
      <p style="margin-top:var(--space-2);font-size:var(--fs-label);line-height:1.7;color:var(--text-muted);margin-bottom:0">${note}</p>
    </div>`).join('')}
  </div>
  <div class="panel panel--inverse on-dark" style="margin-top:var(--space-5)">
    <div class="grid grid--2" style="align-items:center">
      <div>
        <div style="font-family:var(--font-display);font-size:34px;font-weight:200;color:var(--ink-50);word-break:keep-all">守正 · 开物</div>
        <div class="u-label" style="margin-top:var(--space-2);color:var(--ink-500)">weight 200 · 反白 —— 横画已经开始断</div>
      </div>
      <div>
        <div style="font-family:var(--font-display);font-size:34px;font-weight:300;color:var(--ink-50);word-break:keep-all">守正 · 开物</div>
        <div class="u-label" style="margin-top:var(--space-2);color:var(--gold-300)">weight 300 · 反白 · 正确</div>
      </div>
    </div>
    <p style="margin-top:var(--space-5);font-size:var(--fs-body-s);color:var(--ink-400);max-width:42em;margin-bottom:0">深底反白时宋体一律 +100 字重补偿光学变细。这条对全部深色首屏与深色区块生效 —— 本站每一处深底标题都已按此补偿。</p>
  </div>
  <div class="tokens" style="margin-top:var(--space-5)">
    ${[['--serif-min-thin', '32px', '200 字重的字号下限'],
      ['--serif-min-size', '16px', '宋体本身的字号下限，再小改界面黑体'],
      ['--serif-dark-comp', '+100', '深底反白的字重补偿']]
        .map(([n, v, u]) => `<div class="token-row" data-copy="${n}" role="button" tabindex="0"><span class="token-row__name">${n}</span><span class="token-row__val">${v}</span><span class="token-row__use">${u}</span></div>`).join('')}
  </div>`)}

  ${block('排版纪律 · 待补 · 有意替换', `
  <div class="grid grid--3" style="gap:var(--space-5)">
    <div class="panel"><div class="u-eyebrow">Discipline</div><h4 style="margin-top:var(--space-3)">排版纪律</h4>
      <p style="margin-top:var(--space-3);font-size:var(--fs-body-s);line-height:1.8;margin-bottom:0">标题一律 <code>word-break: keep-all</code>，否则「热电联产」会被劈成两行；大标题加 <code>text-wrap: balance</code>。</p></div>
    <div class="panel"><div class="u-eyebrow">Pending</div><h4 style="margin-top:var(--space-3)">字体文件待补</h4>
      <p style="margin-top:var(--space-3);font-size:var(--fs-body-s);line-height:1.8;margin-bottom:0">原稿指定霞鹜文楷与思源系列但未提供文件。当前用 Noto Serif SC / Noto Sans SC 近似替代。提供授权字体文件后改为 @font-face 自托管。</p></div>
    <div class="panel"><div class="u-eyebrow">Substitution</div><h4 style="margin-top:var(--space-3)">Space Grotesk 是有意替换</h4>
      <p style="margin-top:var(--space-3);font-size:var(--fs-body-s);line-height:1.8;margin-bottom:0">原稿指定 Inter。Inter 过于通用，Space Grotesk 的几何骨架更贴近 SINOTAO 字标的重几何无衬线气质，此项不回退。</p></div>
  </div>`)}`
    })}

${chapter({
      id: 'ch-07', num: '007 / 021', eyebrow: 'Scale',
      title: '刻度与断点',
      lead: '4px 基准十二级，另加 --space-13: 128px 供 Web 展示面。间距只用刻度上的值 —— 18px、22px、28px、30px、72px 都不在刻度上，一律不用。',
      body: `
  ${block('间距刻度', `
  <div>
    ${SPACES.map(([i, px, use]) => `<div class="scale-row">
      <span class="scale-row__n">${px}</span>
      <span class="scale-row__bar fx-reveal" style="width:${(px / 128 * 100).toFixed(1)}%"></span>
      <span class="scale-row__u">${use}</span></div>`).join('')}
  </div>`)}

  ${block('断点与栅格', `
  <div class="grid grid--2" style="gap:var(--space-6)">
    <div class="table-scroll"><table class="tbl">
      <caption class="u-sr">五级断点的列数与槽宽</caption>
      <thead><tr><th scope="col">断点</th><th scope="col" class="num">列数</th><th scope="col" class="num">槽宽</th></tr></thead>
      <tbody>${BPS.map(([b, c, g]) => `<tr><td class="mono">${b}</td><td class="num">${c}</td><td class="num">${g}</td></tr>`).join('')}</tbody>
    </table></div>
    <div class="statband statband--wrap">
      ${[['内容区上限 · 长文', '1120', 'px'], ['内容区上限 · 品牌页', '1200', 'px'],
      ['数据大屏', '1440', 'px'], ['主内容比侧栏', '8 : 4', ''],
      ['中文阅读度量', '35', 'em'], ['触摸目标下限', '44', 'px']]
        .map(([l, v, u]) => `<div class="statband__item"><span class="statband__label">${l}</span>
        <span class="statband__value">${v}<span class="statband__unit">${u}</span></span></div>`).join('')}
    </div>
  </div>
  <div class="note note--info" style="margin-top:var(--space-5)"><div class="note__b">
    <div class="note__t">按 <kbd style="font-family:var(--font-mono);font-size:11px;border:1px solid var(--border-default);border-radius:2px;padding:1px 4px">G</kbd> 显示 12 列栅格</div>
    <div class="note__d">除决稿、印刷与大屏之外，一切版面按预览宽度自适应：用 max-width 不用固定 width，栅格轨道 minmax(0,1fr) 可收缩，承载文字的盒子不设 nowrap 与固定高度。</div>
  </div></div>`)}`
    })}

${chapter({
      id: 'ch-08', num: '008 / 021', eyebrow: 'Spacing & layout',
      title: '间距与版面：两档节奏，编号章节',
      lead: '品牌面与产品面必须分档 —— 产品界面沿用品牌页的百余像素节奏，一屏就只装得下两个指标。编号章节制从可选升为标准。',
      body: `
  ${block('两档节奏', `
  <div class="grid grid--2" style="gap:var(--space-6)">
    <div class="panel panel--brand">
      <div class="u-eyebrow">Brand surface</div>
      <h4 style="margin-top:var(--space-3)">品牌面 · 呼吸档</h4>
      <div style="margin-top:var(--space-5)">
        ${[['章节间距', '128px'], ['章节头到内容', '64px'], ['容器上限', '1120px'], ['面板内边距', '40px']]
        .map(([k, v]) => `<div style="display:flex;justify-content:space-between;padding:var(--space-3) 0;border-bottom:var(--border-hairline) solid var(--table-divider);font-size:var(--fs-body-s)">
          <span>${k}</span><span class="u-num">${v}</span></div>`).join('')}
      </div>
    </div>
    <div class="panel panel--dense">
      <div class="u-eyebrow">Product surface</div>
      <h4 style="margin-top:var(--space-3)">产品面 · 密集档</h4>
      <div style="margin-top:var(--space-5)">
        ${[['区块间距', '48px'], ['面板间距', '24px'], ['容器上限', '1440px'], ['面板内边距', '32 / 24px']]
        .map(([k, v]) => `<div style="display:flex;justify-content:space-between;padding:var(--space-3) 0;border-bottom:var(--border-hairline) solid var(--table-divider);font-size:var(--fs-body-s)">
          <span>${k}</span><span class="u-num">${v}</span></div>`).join('')}
      </div>
    </div>
  </div>
  <div class="statband" style="margin-top:var(--space-5)">
    ${[['行内 · 工具栏', '36', 'px'], ['表单与主操作', '40 / 44', 'px'], ['表格行', '48', 'px'], ['触摸目标下限', '44', 'px']]
        .map(([l, v, u]) => `<div class="statband__item"><span class="statband__label">${l}</span>
      <span class="statband__value">${v}<span class="statband__unit">${u}</span></span></div>`).join('')}
  </div>`)}

  ${block('编号章节头 · 四件构成，缺一不可', `
  <div class="panel panel--sunken">
    <div class="chapter__head" style="margin-bottom:0">
      <span class="chapter__num">004 / 012</span>
      <div style="min-width:0">
        <div class="chapter__meta"><span class="seal"></span><span class="u-eyebrow">Fuel supply</span></div>
        <h3 style="margin-top:var(--space-5);font-family:var(--font-display);font-size:42px;font-weight:200;letter-spacing:-.032em;line-height:1.14;color:var(--text-heading);word-break:keep-all">燃料收储与化验</h3>
        <p style="margin-top:var(--space-5);max-width:26em;font-family:var(--font-serif);line-height:1.95;margin-bottom:0">含水率与热值逐车化验，不合格即退运。质量档案随供应商长期累积。</p>
      </div>
    </div>
  </div>
  <div class="grid grid--4" style="margin-top:var(--space-5);gap:0">
    ${[['①', '竖排三位序号与总数'], ['②', '8px 朱方块'], ['③', '西文眼标'], ['④', '宋体 200 章节标题']]
        .map(([n, t]) => `<div style="padding:var(--space-4) var(--space-5);border-left:var(--hairline)">
      <span class="u-mono" style="color:var(--seal)">${n}</span>
      <div style="margin-top:var(--space-2);font-size:var(--fs-body-s);color:var(--text-body)">${t}</div></div>`).join('')}
  </div>
  <p style="margin-top:var(--space-4);font-size:var(--fs-label);color:var(--text-subtle);max-width:40em">留白刻意非对称 —— 序号列窄，右侧留到 26em 就停。本站每一个章节头都是这个构造。</p>`)}

  ${block('圆角七级 · 形状角色', `
  <div class="grid grid--4" style="gap:var(--space-4)">
    ${RADII.map(([r, t, use]) => `<div>
      <div style="height:64px;background:var(--surface-sunken);border-radius:${r};box-shadow:inset 0 0 0 1px var(--border-subtle)"></div>
      <div class="u-mono" style="margin-top:var(--space-2);font-size:11px;color:var(--text-heading)">${r}</div>
      <div class="u-label" style="font-size:11px">${use || t}</div></div>`).join('')}
  </div>
  <p style="margin-top:var(--space-5);font-size:var(--fs-body-s);color:var(--text-muted);max-width:42em">全圆按钮在高密度表格里破坏对齐，故不通用 —— 产品按钮与输入框 6px，营销 CTA 才走全圆。这是本系统对原稿的唯一硬性偏离。</p>`)}`
    })}

</div>`
};
