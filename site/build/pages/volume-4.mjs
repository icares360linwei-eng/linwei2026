import { vhero, toc, chapter, block } from '../shell.mjs';

const TOC = [
  ['13', '图表', '#ch-13'], ['14', '图解语言', '#ch-14'],
  ['15', '可视化与影像', '#ch-15'], ['16', '动效与状态', '#ch-16']
];

const FUEL = [
  ['赤湖秸秆合作社', 1240, 45.6], ['永修甜高粱基地', 860, 31.6],
  ['星子林场', 412, 15.2], ['德安农机合作社', 248, 9.1]
];

const SMALLS = [
  ['1 号炉', 96.2, 'up', [92, 93.4, 94.1, 95.6, 95.2, 96.2]],
  ['2 号炉', 94.8, 'up', [91.2, 92.8, 93.1, 93.9, 94.4, 94.8]],
  ['1 号机', 91.4, 'down', [94.6, 94.1, 93.2, 92.6, 92.0, 91.4]],
  ['2 号机', 95.6, 'up', [92.4, 93.8, 94.6, 95.1, 95.0, 95.6]]
];

const CHART_TOKENS = [
  ['--chart-stroke', '1.5px', '折线粗细'],
  ['--chart-baseline', '--ink-200', '唯一保留的一条轴线'],
  ['--chart-muted', '--ink-300', '对比序列。不占用古铜金的配额'],
  ['--chart-bar-h', '8px', '条形行与量表条共用'],
  ['--chart-series-max', '3', '实体色 + ink-400 + ink-300']
];

const ATOMS = [
  ['实节点', '9px 实心点', '已发生、已确认', '<span style="width:9px;height:9px;border-radius:50%;background:var(--node-fill);display:block"></span>'],
  ['空节点', '9px 空心点', '待发生、计划中', '<span style="width:9px;height:9px;border-radius:50%;background:var(--node-hollow);box-shadow:inset 0 0 0 1.5px var(--edge-color);display:block"></span>'],
  ['连接线', '1px ink-300', '无箭头', '<span style="width:60px;height:1px;background:var(--edge-color);display:block"></span>'],
  ['主路径', '2px 模块色', '每图仅一条', '<span style="width:60px;height:2px;background:var(--chart-s1);display:block"></span>'],
  ['虚连接', '3-5 虚线', '推断、可选、外部', '<span style="width:60px;border-top:1px dashed var(--edge-color);display:block"></span>'],
  ['判断节点', '1.5px 描边 + 6px 圆角', '唯一允许描边框的元素', '<span style="border:1.5px solid var(--node-fill);border-radius:6px;padding:2px 8px;font-family:var(--font-mono);font-size:11px;color:var(--text-heading)">IF</span>']
];

const LOOP = [
  ['01', '种植', '3,400 户'], ['02', '收储化验', '18,600 t'], ['03', '发电供汽', '126 万 t'],
  ['04', '碳资产', '41.2 万 t'], ['05', '灰渣资源化', '3.8 万 t']
];

const TREE = [
  [1, '源裕兴创新未来', '5 实体', 'STG'], [2, '九派国有能源', '5 模块', 'STE'],
  [3, '赤湖工业园', '2 × 30 MW', 'M3'], [4, 'CFB 锅炉班组', '4 班', '—'],
  [3, '碳资产事业部', '41.2 万 t', 'M4'], [2, '进出口贸易', '26 口岸', 'STI'],
  [2, '健康科技', '9 在研', 'STH']
];

const MIND_L = [['农户收益', '+2,400 元/户·年', false], ['秸秆禁烧', '覆盖 3,400 户', false]];
const MIND_R = [['园区供汽', '替代 11 台小锅炉', false], ['灰渣建材', '3.8 万 t', false], ['建材外销', '待验证', true]];

const DIAG_TOKENS = [
  ['--node-r', '9 / 7 / 5px', '按层级递减，第四级仍用 5px'],
  ['--edge-default', '1px ink-300', '全部连接的默认线'],
  ['--edge-primary', '2px 模块色', '主路径，每图仅一条'],
  ['--edge-dashed', '3-5 dash', '推断、可选、外部、待验证'],
  ['--tree-indent', '20px', '层级树每级缩进'],
  ['--node-condition', '1.5px ink-900 + 6px 圆角', '图解中唯一的描边框']
];

const SEASONS = [['春', 3120], ['夏', 5480], ['秋', 8240], ['冬', 1760]];

const PICK = [
  ['随时间变化的趋势', '折线 · 上限三序列', '面积图、堆叠面积'],
  ['项与项之间比大小', '条形行 · 降序排列', '竖柱、雷达图'],
  ['一个整体的两段占比', '环形 · 中心必填数值', '饼图、三段以上环形'],
  ['当前值与阈值的距离', '线性量表 · 朱线标上限', '半圆表盘、指针'],
  ['量级的体感（大屏）', 'DotDensity 点阵', '彩色热力图、气泡图'],
  ['三项以上的关键指标', 'StatBand 细线指标带', '并排 StatCard'],
  ['凭证与可核验性', 'ProvenanceCapsule', '水印、角标'],
  ['超过八列的明细', 'Table · 数值列右对齐', '任何图表 —— 明细就该是表']
];

const MOTION = [
  ['微交互', '150ms', '--ease-out'],
  ['页面过渡 · 弹层', '300ms', '--ease-emphasized'],
  ['叙事入场', '500ms', '--ease-brush'],
  ['循环', '2400ms', 'linear']
];

const STATES = [
  ['Hover', '加深底色一档 600→700 + 阴影升一级。幽灵与文字按钮改浅底。不用透明度变化'],
  ['Press', 'scale(.98) + 底色再深一档 700→800'],
  ['Focus', '2px 品牌色描边 + 2px offset；输入类另加 3px 光环。焦点永远可见'],
  ['Disabled', 'opacity .4 + cursor: not-allowed'],
  ['Selected', '品牌色 6% 底 + 左侧 3px 指示条（表格行），或品牌浅底 + 品牌字色（导航）']
];

const MOTION_SPEC = [
  ['Reveal', 'translateY 16px → 0，opacity 0 → 1，500ms ease-brush。index 错峰 70ms，上限 6 级（420ms）', '品牌面章节内容入场'],
  ['RuleReveal', '1px 墨线 scaleX 0 → 1，transform-origin left，500ms ease-brush', '章节分隔线的入场'],
  ['Marquee', 'translateX -50%，≥30s/圈，linear 无限循环。hover 不暂停', '品牌词条，一页最多一次'],
  ['LatticeSpin', '点阵按序列依次由 ink-400 提亮至 ink-50，每点相位差 1/N 周期，2400ms linear 循环', '整体加载态。取代 TaijiSpinner']
];

export default {
  file: 'volume-4.html',
  title: '第四册 · 数据与行为',
  desc: '图表 · 图解语言 · 可视化与影像 · 动效与状态。装饰一律不留。',
  body: `
${vhero({
    vol: '四', name: '数据与行为', art: 'loop', cur: 'volume-4.html',
    sub: '图表 · 图解 · 可视化与影像 · 动效 —— 网格线、渐变填充、每点圆点、独立图例，四样都在跟数据争夺注意力。'
  })}
${toc(TOC)}

<div class="wrap">

${chapter({
      id: 'ch-13', num: '013 / 021', eyebrow: 'Charts',
      title: '图表：四种形态，装饰一律不留',
      lead: '每种图表只给一种正确形态，序列上限三条，超出改明度不改色相。下列全部为可交互实件，数据取自赤湖工业园真实链条。',
      body: `
  ${block('01 · 折线', `
  <div class="chart fx-reveal">
    <div class="chart__head">
      <div><div class="chart__title">发电负荷</div><div class="chart__sub">实线本周 · 虚线上周</div></div>
      <div class="chart__peak"><div class="chart__peak-v">54.8</div><div class="chart__peak-l">MW · 峰值</div></div>
    </div>
    <div id="c-line"></div>
  </div>
  <p style="margin-top:var(--space-4);font-size:var(--fs-label);color:var(--text-subtle);max-width:44em">折线：1.5px、无网格、无渐变、末点单标注、坐标只标首末。图例并入副标题，峰值升为数值。</p>`)}

  ${block('02 · 条形行', `
  <div class="chart fx-reveal">
    <div class="chart__head">
      <div><div class="chart__title">燃料进厂量 · 前四家</div><div class="chart__sub">吨 · 本周</div></div>
    </div>
    <div class="bars">
      ${FUEL.map(([n, v, p]) => `<div class="bar-row" data-pct="${p / 45.6 * 100}">
        <span class="bar-row__name">${n}<span class="bar-row__track"><span class="bar-row__fill"></span></span></span>
        <span class="bar-row__v">${v.toLocaleString()}</span><span class="bar-row__p">${p}%</span>
      </div>`).join('')}
      <div class="bar-total"><span>合计</span><span>2,760</span><span>100%</span></div>
    </div>
  </div>
  <p style="margin-top:var(--space-4);font-size:var(--fs-label);color:var(--text-subtle);max-width:46em">条形横排成行，8px 高、直角、无阴影。三列右对齐：量值、占比、合计行以 2px 墨线收口 —— 只给条不给占比，读者要自己心算，那是把工作推给读者。竖柱废止：中文标签在竖柱下必然被劈行。</p>`)}

  ${block('03 · 环形 · 04 · 线性量表', `
  <div class="grid grid--2" style="gap:var(--space-6)">
    <div class="chart fx-reveal">
      <div class="chart__head"><div><div class="chart__title">碳配额使用占比</div></div></div>
      <div class="donut">
        <div id="c-donut"></div>
        <div class="donut__legend">
          <div class="donut__item"><span>已使用</span><b>23,800 吨</b></div>
          <div class="donut__item" style="border-bottom:0"><span>剩余</span><b>12,800 吨</b></div>
        </div>
      </div>
      <p style="margin-top:var(--space-5);font-size:var(--fs-label);color:var(--text-subtle);margin-bottom:0">环形只用于「占比」这一种含义，中心必填数值，扇区上限两段。三段以上改用条形行。</p>
    </div>
    <div class="chart fx-reveal">
      <div class="chart__head">
        <div><div class="chart__title">锅炉主蒸汽温度</div></div>
        <div class="chart__peak"><div class="chart__peak-v">538</div><div class="chart__peak-l">°C</div></div>
      </div>
      <div id="c-gauge"></div>
      <div class="gauge__meta">
        <div>设计值<b>540 °C</b></div><div>偏差<b>−2 °C</b></div>
      </div>
      <p style="margin-top:var(--space-5);font-size:var(--fs-label);color:var(--text-subtle);margin-bottom:0">量表用线性条不用半圆表盘。当前值走玄墨，朱线只标上限。指针废止。</p>
    </div>
  </div>`)}

  ${block('小倍数 · Small multiples', '同一形态重复，不是新形态', `
  <div class="chart fx-reveal">
    <div class="chart__head"><div><div class="chart__title">四台设备可用率</div><div class="chart__sub">% · 纵轴共用 90–97 量程</div></div></div>
    <div class="smalls">
      ${SMALLS.map(([n, v, d], i) => `<div class="small">
        <div class="small__n">${n}</div>
        <div class="small__v"><b>${v}</b><span class="small__d" data-dir="${d}">${d === 'up' ? '▲' : '▼'}</span></div>
        <div id="sp-${i}"></div></div>`).join('')}
    </div>
    <p style="margin-top:var(--space-5);font-size:var(--fs-label);color:var(--text-subtle);margin-bottom:0">四台设备同比时不要画四条线挤进一张图 —— 序列上限是三条，且四条线互相穿插后谁也读不清。改为四张同尺度的迷你折线并列：纵轴必须共用同一量程，否则形状之间不可比。迷你折线不画轴、不标点。</p>
  </div>`)}

  ${block('两种必备状态', '没有数据时长什么样，也是规范', `
  <div class="grid grid--2" style="gap:var(--space-6)">
    <div class="chart">
      <div class="loading"><span data-spin data-size="44" style="color:var(--text-muted)" aria-hidden="true"></span>
        <span class="loading__t">正在读取工况数据</span></div>
    </div>
    <div class="chart">
      <div class="empty">
        <hr style="border:0;border-top:var(--border-hairline) solid var(--chart-baseline);margin:0 0 var(--space-5)">
        <div class="empty__t">本周暂无化验记录</div>
        <div class="empty__s">调整时间范围，或从这里录入第一条</div>
        <button class="btn btn--secondary btn--s" type="button" style="margin-top:var(--space-4)">录入化验记录</button>
      </div>
    </div>
  </div>
  <p style="margin-top:var(--space-4);font-size:var(--fs-label);color:var(--text-subtle);max-width:46em">加载态用点阵按序提亮，不用骨架屏 —— 骨架屏在数据每三秒刷新的工况页里会持续闪烁。空态保留基线不保留图形，文案写「暂无什么」加一个出路，不写「无数据」。</p>`)}

  ${block('图表令牌 · 废止形态', `
  <div class="tokens">
    ${CHART_TOKENS.map(([n, v, u]) => `<div class="token-row" data-copy="${n}" role="button" tabindex="0" title="点击复制">
      <span class="token-row__name">${n}</span><span class="token-row__val">${v}</span><span class="token-row__use">${u}</span></div>`).join('')}
  </div>
  <div style="margin-top:var(--space-5);display:flex;flex-wrap:wrap;gap:var(--space-2)">
    ${['渐变填充', '网格线', '逐点圆点', '独立图例', '竖柱', '半圆表盘与指针', '14 种图表图标']
        .map(t => `<span class="tag tag--dep">${t}</span>`).join('')}
  </div>`)}`
    })}

${chapter({
      id: 'ch-14', num: '014 / 021', eyebrow: 'Diagrams',
      title: '图解语言：五种形态，一套原子',
      lead: '五种图解共用一套原子：节点是点、连接是 1px 线、层级靠缩进与线宽。两条工程纪律：文字一律交回 DOM，SVG 只画线与点；每个节点必须带量值 —— 不带数的图解是示意图，不是规范图。',
      body: `
  ${block('六个原子', `
  <div class="atoms">
    ${ATOMS.map(([n, s, d, vis]) => `<div class="atom">
      <div class="atom__vis">${vis}</div>
      <div class="atom__n">${n}</div>
      <div class="atom__d">${s}<br>${d}</div></div>`).join('')}
  </div>
  <div class="note note--info" style="margin-top:var(--space-5)"><div class="note__b">
    <div class="note__t">没有箭头</div>
    <div class="note__d">方向由排列顺序与阅读方向承担 —— 横排从左到右，竖排从上到下。需要箭头说明这张图的排列本身没讲清顺序。节点标签走界面黑体 14px，编号与量值走 mono。</div>
  </div></div>`)}

  ${block('01 · 流程链 · Flow', '线性 · 有顺序 · 无分支', `
  <div class="diagram fx-reveal">
    <div class="flow">
      ${[['种植与收储合同', '3,400', '户', 'done'], ['逐车化验与入库', '18,600', 't 库存', 'done'],
      ['热电联产与供汽', '2 × 30', 'MW', 'done'], ['减排签发', '41.2', '万 t CO₂e · 待核', 'pending']]
        .map(([n, v, u, s]) => `<div class="flow__step" data-state="${s}">
        <span class="flow__line"></span><span class="flow__dot"></span>
        <span class="flow__label">${n}</span>
        <span class="flow__val">${v}<span class="flow__unit">${u}</span></span></div>`).join('')}
    </div>
    <p style="margin-top:var(--space-6);font-size:var(--fs-label);color:var(--text-subtle);max-width:46em;margin-bottom:0">每节点必带量值，右对齐同一列、走西文字族 tabular-nums。已完成段 2px 模块色，未完成段退回 1px ink-300 且末节点空心 —— 进度不靠进度条，靠节点与线的实虚。</p>
  </div>`)}

  ${block('02 · 闭环图 · Loop', '首尾相接 · 无起点 · 段可高亮', `
  <div class="diagram fx-reveal" data-loop>
    <div class="loop">
      <div style="display:flex;justify-content:center">
        <svg viewBox="0 0 200 200" width="200" height="200" role="img" aria-label="赤湖园区五段闭环">
          ${[0, 1, 2, 3, 4].map(i => {
          const a0 = -90 + i * 72 + 3, a1 = -90 + (i + 1) * 72 - 3;
          const r = 78, cx = 100, cy = 100;
          const rad = d => d * Math.PI / 180;
          const x0 = cx + Math.cos(rad(a0)) * r, y0 = cy + Math.sin(rad(a0)) * r;
          const x1 = cx + Math.cos(rad(a1)) * r, y1 = cy + Math.sin(rad(a1)) * r;
          return `<path data-seg d="M${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}" fill="none" stroke="var(--chart-s1)" stroke-width="1" stroke-linecap="round" opacity=".34"/>`;
        }).join('')}
          ${[0, 1, 2, 3, 4].map(i => {
          const a = -90 + i * 72, rad = a * Math.PI / 180;
          return `<circle cx="${(100 + Math.cos(rad) * 78).toFixed(2)}" cy="${(100 + Math.sin(rad) * 78).toFixed(2)}" r="4.5" fill="var(--node-fill)"/>`;
        }).join('')}
        </svg>
      </div>
      <div class="loop__list">
        ${LOOP.map(([i, n, v]) => `<div class="loop__item"><span class="loop__i">${i}</span><span class="loop__n">${n}</span><span class="loop__v">${v}</span></div>`).join('')}
      </div>
    </div>
    <p style="margin-top:var(--space-5);font-size:var(--fs-label);color:var(--text-subtle);max-width:46em;margin-bottom:0">环上不写字。节点编号与量值走右侧清单，编号与环上位置按顺时针一一对应 —— 文字排在环外必然互相挤，这是闭环图最常见的失手处。高亮段用 2px 弧，一图仅一段（悬停或聚焦清单项即切换）。</p>
  </div>`)}

  ${block('03 · 层级树 · Hierarchy', '组织架构 · 审批链 · 目录', `
  <div class="diagram fx-reveal">
    <div class="tree">
      ${TREE.map(([lv, n, meta, code]) => `<div class="tree__row" data-lv="${lv}">
        <span class="tree__label"><span class="tree__node"></span>${n}</span>
        <span class="tree__meta">${meta}</span><span class="tree__code">${code}</span></div>`).join('')}
    </div>
    <p style="margin-top:var(--space-5);font-size:var(--fs-label);color:var(--text-subtle);max-width:46em;margin-bottom:0">缩进 20px 一级，1px 竖线承担归属。点径随层级递减 9 → 7 → 5px。元数据与代号各占一列右对齐，任意展开折叠后列仍对齐。上限四级，超过说明该拆成两张图。不用连接肘线。</p>
  </div>`)}

  ${block('04 · 逻辑图 · Logic', '判断与分支 · 有条件 · 有出口', `
  <div class="diagram fx-reveal">
    <div class="logic">
      <div class="logic__cond">
        <div class="logic__cond-t">进厂车辆化验</div>
        <div class="logic__cond-s">含水率 ≤ 45% 且热值 ≥ 3,000 kcal</div>
      </div>
      <div class="logic__branch" data-b="true">
        <div class="logic__k"><b>TRUE</b><span>94.2%</span></div>
        <div class="logic__t">计量入库</div><div class="logic__d">生成磅单与溯源编号</div>
      </div>
      <div class="logic__branch">
        <div class="logic__k"><b>FALSE</b><span>5.8%</span></div>
        <div class="logic__t">即时退运</div><div class="logic__d">记入供应商质量档案</div>
      </div>
    </div>
    <p style="margin-top:var(--space-5);font-size:var(--fs-label);color:var(--text-subtle);max-width:46em;margin-bottom:0">判断节点是唯一允许带 1.5px 描边框的图解元素 —— 条件必须与陈述在视觉上分开。两路出口各带实际占比，用 TRUE / FALSE 而非「是 / 否」以对齐工程语汇。分支上限两路，三路以上改用层级树。</p>
  </div>`)}

  ${block('05 · 思维图 · Mind map', '中心议题向外发散 · 无顺序', `
  <div class="diagram fx-reveal">
    <div class="mind">
      <div class="mind__col mind__col--l">
        ${MIND_L.map(([n, v, d]) => `<div class="mind__leaf" data-dashed="${d}">${n}<b>${v}</b></div>`).join('')}
      </div>
      <div class="mind__hub">
        <div class="mind__hub-i">05</div>
        <div class="mind__hub-t">碳资产</div>
        <div class="mind__hub-v">41.2 万 t CO₂e</div>
      </div>
      <div class="mind__col">
        ${MIND_R.map(([n, v, d]) => `<div class="mind__leaf" data-dashed="${d}">${n}<b>${v}</b></div>`).join('')}
      </div>
    </div>
    <p style="margin-top:var(--space-5);font-size:var(--fs-label);color:var(--text-subtle);max-width:46em;margin-bottom:0">中心议题 · 园区闭环的五段价值。放射式排布在超过四条分支时标签必然互撞。改为左右对称两列 + 中轴：分支向中心对齐，标签始终水平，可读性与分支数无关。未验证分支走虚连接。每侧上限四条。</p>
  </div>`)}

  ${block('图解令牌 · 废止形态', `
  <div class="tokens">
    ${DIAG_TOKENS.map(([n, v, u]) => `<div class="token-row" data-copy="${n}" role="button" tabindex="0" title="点击复制">
      <span class="token-row__name">${n}</span><span class="token-row__val">${v}</span><span class="token-row__use">${u}</span></div>`).join('')}
  </div>
  <div style="margin-top:var(--space-5);display:flex;flex-wrap:wrap;gap:var(--space-2)">
    ${['箭头', '圆角彩色方框', '曲线连接', '连接肘线', '泳道底色', '立体投影', '手绘风', 'SVG 内嵌文字']
        .map(t => `<span class="tag tag--dep">${t}</span>`).join('')}
  </div>
  <p style="margin-top:var(--space-5);font-size:var(--fs-body-s);color:var(--text-muted);max-width:46em">五种图解都在深底上成立：节点换宣纸白，默认线换 ink-700 实色，主路径仍走模块色。图解一律手写 DOM + 极少量 SVG，不引图表库 —— 这五种形态的节点数都在二十以内，库的成本高于收益，且库生成的文字一定在 SVG 里。</p>`)}`
    })}

${chapter({
      id: 'ch-15', num: '015 / 021', eyebrow: 'Visualization & imagery',
      title: '可视化与影像：点阵承载量级，胶囊承载凭证',
      lead: '大屏叙事此前完全空白。两件新组件都不引入新颜色：点阵用密度表达量级，胶囊把凭证编号压在实景上。影像语言反过来立三条硬规则。',
      body: `
  ${block('DotDensity · 点阵密度', `
  <div class="chart fx-reveal">
    <div class="chart__head">
      <div><div class="chart__title">燃料进厂密度 · 四季</div><div class="chart__sub">一枚点恒等于约 350 吨</div></div>
      <div class="chart__peak"><div class="chart__peak-v">18,600</div><div class="chart__peak-l">吨 · 当前库存</div></div>
    </div>
    <div class="density">
      ${SEASONS.map(([s, v], i) => `<div class="density__cell">
        <div class="density__l">${s} · <span class="u-num" style="font-size:var(--fs-label)">${Math.round(v / 350)}</span> 点</div>
        <div class="density__v">${v.toLocaleString()}</div>
        <div class="density__dots" id="dd-${i}"></div></div>`).join('')}
    </div>
    <p style="margin-top:var(--space-5);font-size:var(--fs-label);color:var(--text-subtle);max-width:46em;margin-bottom:0">点径固定 1.4–1.6，只改点数与行列，不改颜色、不加渐变、不做发光。数值仍以文字并列给出 —— 点阵是量感，不是读数工具。取代大屏上的彩色热力图。</p>
  </div>`)}

  ${block('ProvenanceCapsule · 影像溯源胶囊', `
  <div class="panel panel--inverse on-dark fx-reveal">
    <div style="display:flex;flex-wrap:wrap;gap:var(--space-3)">
      <span class="capsule" data-state="ok" style="background:rgba(251,249,245,.16);color:var(--ink-50)">STE.RC.20260904</span>
      <span class="capsule" data-state="pending" style="background:rgba(251,249,245,.16);color:var(--ink-50)">STE.HZ.20260831</span>
      <span class="capsule" data-state="over" style="background:rgba(251,249,245,.16);color:var(--ink-50)">STE.CCER.20260715</span>
    </div>
    <p style="margin-top:var(--space-5);font-size:var(--fs-body-s);color:var(--ink-400);max-width:44em;margin-bottom:0">磅单、化验批次、减排签发的凭证编号。编号走 mono，点的颜色走状态色族：在线 / 待核 / 超限。压在实景上时底色换 rgba(251,249,245,.16)，字与点保持满不透明度。</p>
  </div>
  <div style="display:flex;flex-wrap:wrap;gap:var(--space-3);margin-top:var(--space-5)">
    <span class="capsule" data-state="ok">STE.RC.20260904</span>
    <span class="capsule" data-state="pending">STE.HZ.20260831</span>
    <span class="capsule" data-state="over">STE.CCER.20260715</span>
  </div>`)}

  ${block('影像三条硬规则', `
  <div class="rules">
    ${['纪实、人文、自然光、低饱和。不摆拍、不过度修图、不用绿色滤镜美化。人像遵循多元代表',
      '深底影像保护渐变只有一种：自下而上的墨色 to top，承载反白文字。深色区块用 --ink-900 实色，不用渐变',
      '禁止 3D 渲染球体、行星影像、发光、渐变背景与插画背景。产品界面是纯宣纸白平面，无渐变无纹理']
        .map((r, i) => `<div class="rule"><span class="rule__n">0${i + 1}</span><span class="rule__t">${r}</span></div>`).join('')}
  </div>
  <div class="note note--warn" style="margin-top:var(--space-5)"><div class="note__b">
    <div class="note__t">本版最大的一项待办</div>
    <div class="note__d">当前图库只有一张园区航拍，且图上标注为 AI 生成的示意图。按这三条规则补拍或采购实景。本站因此全程不用照片 —— 视觉一律由生成式点阵与图解承担，详见<a href="atlas.html">图谱</a>。</div>
  </div></div>`)}

  ${block('选型决策表 · 拿到一份数据先查这张表', `
  <div class="table-scroll"><table class="tbl">
    <caption class="u-sr">数据关系到图表形态的唯一映射</caption>
    <thead><tr><th scope="col">要表达的</th><th scope="col">用</th><th scope="col">不用</th></tr></thead>
    <tbody>${PICK.map(([w, y, n]) => `<tr><td>${w}</td>
      <td style="color:var(--text-heading);font-weight:var(--fw-medium)">${y}</td>
      <td style="color:var(--text-subtle)">${n}</td></tr>`).join('')}</tbody>
  </table></div>
  <p style="margin-top:var(--space-4);font-size:var(--fs-label);color:var(--text-subtle);max-width:46em">表里没有的形态默认不许用。需要新形态时先补进本表并说明它表达的是哪一类关系，再实现。地理数据按真实地理坐标绘制，不用示意性方块拼贴。</p>`)}`
    })}

${chapter({
      id: 'ch-16', num: '016 / 021', eyebrow: 'Motion & states',
      title: '动效与状态：动效即叙事',
      lead: '动效词汇只有三样，且只在品牌展示面使用，产品界面不用。无弹跳、无缩放入场、无视差。全局尊重 prefers-reduced-motion。',
      body: `
  ${block('时长与缓动', `
  <div class="grid grid--4" style="gap:0">
    ${MOTION.map(([t, d, e]) => `<div style="padding:var(--space-5);border-left:var(--hairline)">
      <div class="u-label">${t}</div>
      <div class="u-num" style="font-size:26px;margin-top:var(--space-1)">${d}</div>
      <div class="u-mono" style="margin-top:var(--space-2);font-size:11px;color:var(--text-brand)">${e}</div></div>`).join('')}
  </div>`)}

  ${block('四样动效的实现规格', `
  <div class="table-scroll"><table class="tbl">
    <caption class="u-sr">四样叙事动效的实现规格与用途</caption>
    <thead><tr><th scope="col">名称</th><th scope="col">规格</th><th scope="col">用在哪</th></tr></thead>
    <tbody>${MOTION_SPEC.map(([n, s, w]) => `<tr>
      <td class="mono" style="color:var(--text-heading);white-space:nowrap">${n}</td><td>${s}</td><td>${w}</td></tr>`).join('')}</tbody>
  </table></div>
  <div class="panel panel--sunken" style="margin-top:var(--space-5)">
    <div style="display:flex;align-items:baseline;justify-content:space-between;gap:var(--space-4);flex-wrap:wrap">
      <h4>实件演示</h4>
      <button class="btn btn--secondary btn--s" type="button" id="replay">重放 Reveal 与 RuleReveal</button>
    </div>
    <div id="demo-stage" style="margin-top:var(--space-6)">
      <div class="fx-rule" style="margin-bottom:var(--space-5)"></div>
      <!-- 面板内分区用 1px 墨线，不做卡中卡 -->
      <div class="grid grid--3" style="gap:0">
        ${[1, 2, 3].map(i => `<div class="fx-reveal" style="padding:var(--space-5);border-left:var(--hairline)"><div class="u-eyebrow">Stagger ${i}</div>
          <div style="margin-top:var(--space-3);font-family:var(--font-display);font-size:22px;font-weight:var(--fw-light);color:var(--text-heading)">错峰 ${(i - 1) * 70}ms</div></div>`).join('')}
      </div>
    </div>
  </div>`)}

  ${block('组件八状态', `
  <div class="grid grid--8-4" style="align-items:start">
    <div class="table-scroll"><table class="tbl">
      <caption class="u-sr">交互状态的表现规格</caption>
      <thead><tr><th scope="col">状态</th><th scope="col">表现</th></tr></thead>
      <tbody>${STATES.map(([s, d]) => `<tr><td class="mono" style="color:var(--text-heading)">${s}</td><td>${d}</td></tr>`).join('')}</tbody>
    </table></div>
    <div class="panel">
      <div class="u-eyebrow">Live</div>
      <div style="margin-top:var(--space-5);display:flex;flex-direction:column;gap:var(--space-3);align-items:flex-start">
        <button class="btn" type="button">主操作 · 玄墨</button>
        <button class="btn btn--secondary" type="button">次操作</button>
        <button class="btn btn--ghost" type="button">幽灵按钮</button>
        <button class="btn btn--cta" type="button">营销 CTA · 古铜金</button>
        <button class="btn" type="button" disabled>已禁用</button>
        <label class="field" style="width:100%"><span class="field__label">输入类控件</span>
          <input class="input" type="text" placeholder="含水率 %" aria-label="含水率"></label>
      </div>
      <p style="margin-top:var(--space-5);font-size:var(--fs-label);color:var(--text-subtle);margin-bottom:0">用 Tab 键走一遍 —— 焦点永远可见，每个交互元素可键盘操作。</p>
    </div>
  </div>`)}

  ${block('禁止 · 产品面 · 降级', `
  <div class="grid grid--3" style="gap:var(--space-5)">
    <div class="panel">
      <div class="u-eyebrow">Forbidden</div>
      <div style="margin-top:var(--space-4);display:flex;flex-wrap:wrap;gap:var(--space-2)">
        ${['弹跳 overshoot', '缩放入场', '视差', '自动轮播', '逐字打字机', '数字滚动计数器']
        .map(t => `<span class="tag tag--dep">${t}</span>`).join('')}
      </div>
      <p style="margin-top:var(--space-4);font-size:var(--fs-label);color:var(--text-muted);line-height:1.75;margin-bottom:0">滚动数字是当下最常见的仪表盘装饰，它把读数变成表演，本系统不用。</p>
    </div>
    <div class="panel">
      <div class="u-eyebrow">Product surface</div>
      <h4 style="margin-top:var(--space-3)">产品界面不用叙事动效</h4>
      <p style="margin-top:var(--space-3);font-size:var(--fs-body-s);line-height:1.8;margin-bottom:0">控制台里只有 150ms 的微交互与 300ms 的弹层过渡 —— 工况页每三秒刷新一次数据，任何入场动画都会变成闪烁。</p>
    </div>
    <div class="panel">
      <div class="u-eyebrow">Reduced motion</div>
      <h4 style="margin-top:var(--space-3)">降级后必须完整可读</h4>
      <p style="margin-top:var(--space-3);font-size:var(--fs-body-s);line-height:1.8;margin-bottom:0">全局尊重 prefers-reduced-motion：时长令牌自动降到 1ms，Reveal 与 Marquee 内部另有 matchMedia 判断直接跳到终态。动效不承载任何信息。</p>
    </div>
  </div>`)}`
    })}

</div>`,
  script: `<script>
(function(){
  var C = window.Charts;
  var THIS_WEEK = [46.2,49.8,52.4,54.8,53.1,50.6,48.3];
  var LAST_WEEK = [43.5,45.9,48.2,50.1,49.4,47.8,45.2];

  function draw(){
    C.line(document.getElementById('c-line'), {
      series:[{data:THIS_WEEK},{data:LAST_WEEK,dashed:true}],
      min:30, max:60, limit:55, unit:'MW',
      xLabels:['周一','周二','周三','周四','周五','周六','周日'],
      limitNote:'核准出力上限 55 MW',
      label:'发电负荷折线图，本周峰值 54.8 MW'
    });
    C.donut(document.getElementById('c-donut'), {value:23800, total:36600, center:'USED', label:'碳配额使用占比'});
    C.gauge(document.getElementById('c-gauge'), {value:538, min:480, max:560, limit:545, label:'锅炉主蒸汽温度'});
    ${JSON.stringify(SMALLS.map(s => s[3]))}.forEach(function(d,i){
      C.spark(document.getElementById('sp-'+i), d, 90, 97);
    });
    ${JSON.stringify(SEASONS.map(s => s[1]))}.forEach(function(v,i){
      C.density(document.getElementById('dd-'+i), v, 350, 9);
    });
  }
  draw();
  // 实体或明暗切换后按新令牌重绘
  document.addEventListener('sinotao:theme', draw);
  document.addEventListener('sinotao:scheme', function(){ setTimeout(draw, 40); });

  var rp = document.getElementById('replay');
  if(rp) rp.addEventListener('click', function(){
    var stage = document.getElementById('demo-stage');
    stage.querySelectorAll('.fx-reveal,.fx-rule').forEach(function(n,i){
      n.classList.remove('is-in');
      setTimeout(function(){ n.classList.add('is-in'); }, 60 + i*70);
    });
  });
})();
</script>`
};
