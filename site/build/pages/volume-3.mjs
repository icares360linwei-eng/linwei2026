import { vhero, toc, chapter, block } from '../shell.mjs';

const TOC = [
  ['09', '面板与边界', '#ch-09'], ['10', '图标系统', '#ch-10'],
  ['11', '业务图标清单', '#ch-11'], ['12', '字标与应用', '#ch-12']
];

const PANEL_RULES = [
  ['默认平面', '#FFFEFB · 16px · 无描边无阴影', 'variant 三种：flat 默认 / outlined 仅与同色背景相邻 / elevated 仅真正悬浮层'],
  ['描边与阴影', '不得同时出现', '硬性规则'],
  ['卡中卡', '禁止', '需要分区用 1px 墨线；需要第二层说明这块内容该独立成面板'],
  ['--panel-max-per-screen', '3', '超出的内容直接放底色上用 1px 墨线分隔'],
  ['--ring-hairline', '1px --ink-200 + 6px 圆角', '输入类控件的静默边界。控件边界与面板边界分开管理，不冲突'],
  ['面板标题', '宋体 24px', '需要更小标题说明这块内容不该成为面板'],
  ['表格行 48px · 表头 2px 墨线', '无竖线、无斑马纹', '数值列右对齐 + tabular-nums，单位提到表头'],
  ['阴影六级', '暖墨投影 rgba(26,22,18,α)', 'α .04–.10。卡片 sm、hover md、抽屉 lg、弹窗 xl。焦点光环单列一档']
];

const LATTICE = [
  ['stg', 'STG', '环 · 八点等分', '中枢环抱五实体'],
  ['ste', 'STE', '方阵中空 · 炉膛', '中心留空即燃烧室'],
  ['sti', 'STI', '双向折线 · 航路', '进与出同时成立'],
  ['sth', 'STH', '核与六配位 · 分子', '中心点独大'],
  ['edu', 'EDU', '递进三阶', '一生二、二生三']
];

const ICON_CAT = [
  ['功能图标', 'Material Symbols Rounded', '24 网格、wght 400、FILL 0，选中态切 FILL 1。尺寸四级 18 / 20 / 24 / 48。全系统只经 Icon 组件渲染'],
  ['五实体标记', 'EntityLattice 点阵', '五实体各一排布。业务子图标继续用 Material Symbols'],
  ['加载态', '点阵按序提亮', '循环 2400ms linear。取代 TaijiSpinner 的临时几何占位'],
  ['标签前缀', '点与方块两种', '章节 8px 朱方块，标签 6px 墨圆点。全系统一致'],
  ['字标', '三色版 SVG', '禁止重绘、拉伸或改比例。最小留白 = 字标高度的 50%，最小尺寸 16px 屏幕 / 5mm 印刷'],
  ['图形标志', '没有，禁止自造', '需要方形标记处用字标裁切或对应实体的点阵']
];

const ICONS_STE = [
  ['grass', '种植 · 甜高粱'], ['local_shipping', '收储 · 进厂磅单'], ['science', '化验 · 热值含水率'],
  ['local_fire_department', '锅炉 · 燃烧工况'], ['bolt', '发电 · 机组负荷'], ['heat_pump', '供汽 · 工业蒸汽'],
  ['eco', '碳资产 · 减排量'], ['recycling', '灰渣 · 资源化']
];
const ICONS_STI = [['directions_boat', '多式联运'], ['receipt_long', '报关单'], ['handshake', '订单与合约']];
const ICONS_ETC = [['hub', '集团与实体矩阵'], ['gavel', '合规与审批'], ['biotech', 'PHA 医用材料'], ['school', '教育与家校']];

const ICON_RULES = [
  '一概念一图标，全系统唯一映射',
  '图标不单独承载语义 —— 状态必须图标 + 文字 + 语义色三重表达',
  '图标颜色跟随文字色，不独立上实体色（导航选中态除外）',
  '本表由业务方复核后定稿，新增概念须先入表再上界面'
];

const FORBID = [
  ['拉伸或压缩比例', 'transform:scaleX(1.5)'],
  ['旋转或倾斜', 'transform:rotate(-8deg)'],
  ['加投影、发光或描边', 'text-shadow:0 3px 8px rgba(0,0,0,.5)'],
  ['底色对比不足', 'color:#B2AA9C'],
  ['紧贴文字，侵入最小留白', ''],
  ['已废止色或非品牌色作底', '']
];

export default {
  file: 'volume-3.html',
  title: '第三册 · 表达',
  desc: '面板与边界 · 图标系统 · 业务图标清单 · 字标与应用。',
  body: `
${vhero({
    vol: '三', name: '表达', art: 'grid', cur: 'volume-3.html',
    sub: '面板 · 图标系统 · 业务图标 · 字标 —— 功能靠现成，品牌靠规则。缺件问题从「画 150 个」变成「定一条规则」。'
  })}
${toc(TOC)}

<div class="wrap">

${chapter({
      id: 'ch-09', num: '009 / 021', eyebrow: 'Surfaces',
      title: '面板与边界：一重边界，不许第二重',
      lead: '界面靠中性画布与纯白面板之间的明度差划界，不靠框线。白底加 1px 描边再加阴影，是三重边界，会让一屏十个同权重的框互相争抢。',
      body: `
  ${block('禁止 / 标准', `
  <div class="contrast-pair">
    <div class="demo">
      <div class="demo__cap demo__cap--bad">禁止 · 四张并排 StatCard</div>
      <div class="demo__body">
        <div class="bad-cards">
          ${[['发电量', '1,284'], ['供汽量', '3,410'], ['库存', '18.6k'], ['配额', '12.8k']]
        .map(([l, v]) => `<div class="bad-card"><div class="bad-card__l">${l}</div><div class="bad-card__v">${v}</div></div>`).join('')}
        </div>
      </div>
      <p class="demo__note">四重边界叠加。StatCard 保留但只在单独出现时使用。</p>
    </div>
    <div class="demo">
      <div class="demo__cap demo__cap--good">标准 · StatBand</div>
      <div class="demo__body" style="padding:0;background:transparent">
        <div class="statband">
          ${[['发电量', '1,284', 'MWh'], ['供汽量', '3,410', 't'], ['库存', '18.6', 'kt'], ['配额', '12.8', 'kt']]
        .map(([l, v, u]) => `<div class="statband__item"><span class="statband__label">${l}</span>
            <span class="statband__value">${v}<span class="statband__unit">${u}</span></span></div>`).join('')}
        </div>
      </div>
      <p class="demo__note">三项以上的指标一律走 StatBand：一重边界，指标间靠 1px 墨线分栏，数值因此能升上一档字号。</p>
    </div>
  </div>`)}

  ${block('面板规则', `
  <div class="table-scroll"><table class="tbl">
    <caption class="u-sr">面板与边界的八条规则</caption>
    <thead><tr><th scope="col">规则</th><th scope="col">值</th><th scope="col">说明</th></tr></thead>
    <tbody>${PANEL_RULES.map(([r, v, d]) => `<tr>
      <td style="color:var(--text-heading);font-weight:var(--fw-medium)">${r}</td>
      <td class="mono" style="color:var(--text-brand)">${v}</td><td>${d}</td></tr>`).join('')}</tbody>
  </table></div>
  <div class="note note--warn" style="margin-top:var(--space-5)"><div class="note__b">
    <div class="note__t">描边三级</div>
    <div class="note__d">hairline 1px 默认分隔 · emphasis 2px 表头下划线与 Tabs 选中 · indicator 3px 选中行与 Toast 语义条。禁止只带彩色左边框的圆角卡片 —— 左侧 3px 色条只表示「当前选中」。</div>
  </div></div>`)}`
    })}

${chapter({
      id: 'ch-10', num: '010 / 021', eyebrow: 'Iconography',
      title: '图标：功能靠现成，品牌靠规则',
      lead: '此前的缺件清单上有 150 枚待画 SVG，全部废止。品牌标记改为同一套点在同一张网格上的排布变体 —— 缺件问题从「画 150 个」变成「定一条规则」。',
      body: `
  ${block('Entity lattice · 48 grid', `
  <div class="grid grid--3" style="gap:0">
    ${LATTICE.map(([k, code, rule, note]) => `
    <div style="padding:var(--space-6) var(--space-5);border-left:var(--hairline);border-top:var(--hairline)">
      <div style="height:80px;display:flex;align-items:center;color:var(--text-heading)" data-lattice="${k}" data-size="76" aria-hidden="true"></div>
      <div class="u-eyebrow" style="margin-top:var(--space-4)">${code}</div>
      <div style="margin-top:var(--space-2);font-size:var(--fs-body-s);font-weight:var(--fw-medium);color:var(--text-heading)">${rule}</div>
      <div class="u-label" style="margin-top:var(--space-1)">${note}</div>
    </div>`).join('')}
    <div style="padding:var(--space-6) var(--space-5);border-left:var(--hairline);border-top:var(--hairline);background:var(--surface-inverse)" class="on-dark">
      <div style="height:80px;display:flex;align-items:center;color:var(--ink-50)" data-spin data-size="76" aria-hidden="true"></div>
      <div class="u-eyebrow" style="margin-top:var(--space-4);color:var(--gold-300)">LatticeSpin</div>
      <div style="margin-top:var(--space-2);font-size:var(--fs-body-s);font-weight:var(--fw-medium);color:var(--ink-50)">加载态 · 按序提亮</div>
      <div class="u-label" style="margin-top:var(--space-1);color:var(--ink-500)">2400ms linear · 点不移动、不缩放</div>
    </div>
  </div>

  <div class="panel" style="margin-top:var(--space-6)">
    <h4>生成规则</h4>
    <div class="grid grid--4" style="margin-top:var(--space-5);gap:0">
      ${[['48 × 48', '网格'], ['2.0 – 3.4', '点径六档'], ['6 – 8', '点数'], ['0', '新增笔形']]
        .map(([v, l]) => `<div style="padding:var(--space-4) var(--space-5);border-left:var(--hairline)">
        <div class="u-num" style="font-size:26px">${v}</div><div class="u-label">${l}</div></div>`).join('')}
    </div>
    <p style="margin-top:var(--space-5);font-size:var(--fs-body-s);line-height:1.85;max-width:44em;margin-bottom:0">
      点径六档为 2.0 / 2.2 / 2.4 / 2.6 / 3.0 / 3.4，只改排布与点径，不改笔形、不加线、不加填充。同一实体在任何尺寸下点数与排布不变，仅整体缩放。深底用宣纸白，浅底用玄墨，<strong>禁止用实体色填充点阵</strong> —— 实体色仍只作 2px 细线刻度。加载态由同一点阵按序列依次提亮实现，不另画流纹。</p>
  </div>

  <div class="grid grid--4" style="margin-top:var(--space-5);gap:var(--space-4);align-items:end">
    ${[16, 24, 40, 64].map(s => `<div style="text-align:center">
      <div style="display:flex;justify-content:center;align-items:flex-end;height:70px;color:var(--text-heading)" data-lattice="ste" data-size="${s}" aria-hidden="true"></div>
      <div class="u-mono" style="margin-top:var(--space-2);font-size:11px;color:var(--text-subtle)">${s}px</div></div>`).join('')}
  </div>
  <p style="margin-top:var(--space-3);font-size:var(--fs-label);color:var(--text-subtle);text-align:center">同一实体在任何尺寸下点数与排布不变，仅整体缩放。</p>`)}

  ${block('类别与方案', `
  <div class="table-scroll"><table class="tbl">
    <caption class="u-sr">六类图标资产的方案与规格</caption>
    <thead><tr><th scope="col">类别</th><th scope="col">方案</th><th scope="col">规格</th></tr></thead>
    <tbody>${ICON_CAT.map(([c, p, s]) => `<tr>
      <td style="color:var(--text-heading);font-weight:var(--fw-medium);white-space:nowrap">${c}</td>
      <td style="color:var(--text-brand)">${p}</td><td>${s}</td></tr>`).join('')}</tbody>
  </table></div>`)}`
    })}

${chapter({
      id: 'ch-11', num: '011 / 021', eyebrow: 'Icon inventory',
      title: '业务图标清单',
      lead: '概念到 Material Symbols 的对照表。同一概念在全系统只允许一个图标 ——「燃料」不能这里用 grass 那里用 eco。下表即唯一映射。',
      body: `
  ${block('STE 九派国有能源', `<div class="icons">
    ${ICONS_STE.map(([k, n]) => `<div class="icon-cell"><span class="ms" aria-hidden="true">${k}</span>
      <span class="icon-cell__t"><span class="icon-cell__n">${n}</span><span class="icon-cell__k">${k}</span></span></div>`).join('')}
  </div>`)}

  ${block('STI 进出口贸易', `<div class="icons">
    ${ICONS_STI.map(([k, n]) => `<div class="icon-cell"><span class="ms" aria-hidden="true">${k}</span>
      <span class="icon-cell__t"><span class="icon-cell__n">${n}</span><span class="icon-cell__k">${k}</span></span></div>`).join('')}
  </div>`)}

  ${block('STG · STH · EDU', `<div class="icons">
    ${ICONS_ETC.map(([k, n]) => `<div class="icon-cell"><span class="ms" aria-hidden="true">${k}</span>
      <span class="icon-cell__t"><span class="icon-cell__n">${n}</span><span class="icon-cell__k">${k}</span></span></div>`).join('')}
  </div>`)}

  ${block('尺寸四级 · 描边与实心', `
  <div class="grid grid--2" style="gap:var(--space-6)">
    <div class="panel">
      <div class="u-eyebrow">Sizes</div>
      <div style="display:flex;align-items:flex-end;gap:var(--space-7);margin-top:var(--space-5);color:var(--text-heading)">
        ${[18, 20, 24, 48].map(s => `<div style="text-align:center">
          <span class="ms" style="font-size:${s}px" aria-hidden="true">bolt</span>
          <div class="u-mono" style="margin-top:var(--space-2);font-size:11px;color:var(--text-subtle)">${s}</div></div>`).join('')}
      </div>
      <p style="margin-top:var(--space-5);font-size:var(--fs-label);color:var(--text-muted);margin-bottom:0">18 行内随文 · 20 按钮与表格行 · 24 导航与面板标题 · 48 空状态。中间尺寸不许自造。</p>
    </div>
    <div class="panel">
      <div class="u-eyebrow">Fill</div>
      <div style="display:flex;gap:var(--space-8);margin-top:var(--space-5);color:var(--text-heading)">
        <div style="text-align:center"><span class="ms" style="font-size:36px" aria-hidden="true">eco</span>
          <div class="u-label" style="margin-top:var(--space-2)">默认 FILL 0</div></div>
        <div style="text-align:center"><span class="ms ms--fill" style="font-size:36px;color:var(--brand-600)" aria-hidden="true">eco</span>
          <div class="u-label" style="margin-top:var(--space-2)">选中 FILL 1</div></div>
      </div>
      <p style="margin-top:var(--space-5);font-size:var(--fs-label);color:var(--text-muted);margin-bottom:0">描边为默认，只有导航选中态切实心。wght 400 固定，约 2px 笔画，不随字重变化。</p>
    </div>
  </div>
  <div class="rules" style="margin-top:var(--space-5)">
    ${ICON_RULES.map((r, i) => `<div class="rule"><span class="rule__n">${String(i + 1).padStart(2, '0')}</span><span class="rule__t">${r}</span></div>`).join('')}
  </div>`)}`
    })}

${chapter({
      id: 'ch-12', num: '012 / 021', eyebrow: 'Wordmark',
      title: '字标：规范与应用',
      lead: '品牌资产只有一件 —— SINOTAO 字标，重几何无衬线，比例 400 : 127（约 3.15 : 1）。没有图形标志，也不会有：任何需要方形标记的位置用字标裁切或实体点阵，不自造图形。',
      body: `
  ${block('三个版本', `
  <div class="grid grid--3" style="gap:var(--space-4)">
    <div>
      <div style="background:var(--surface-sunken);border-radius:var(--shape-card);padding:var(--space-8) var(--space-5);display:flex;justify-content:center">
        <span class="wordmark" style="font-size:30px;color:var(--ink-900)">SINOTAO</span></div>
      <div class="u-mono" style="margin-top:var(--space-3);font-size:11px;color:var(--text-heading)">logo-sinotao-ink.svg</div>
      <div class="u-label">玄墨版。浅底默认用这一版</div>
    </div>
    <div>
      <div style="background:var(--ink-950);border-radius:var(--shape-card);padding:var(--space-8) var(--space-5);display:flex;justify-content:center">
        <span class="wordmark" style="font-size:30px;color:var(--ink-50)">SINOTAO</span></div>
      <div class="u-mono" style="margin-top:var(--space-3);font-size:11px;color:var(--text-heading)">logo-sinotao-paper.svg</div>
      <div class="u-label">宣纸白版。深底与实景照片上用</div>
    </div>
    <div>
      <div style="background:var(--brand-600);border-radius:var(--shape-card);padding:var(--space-8) var(--space-5);display:flex;justify-content:center">
        <span class="wordmark" style="font-size:30px;color:var(--on-brand)">SINOTAO</span></div>
      <div class="u-mono" style="margin-top:var(--space-3);font-size:11px;color:var(--text-heading)">logo-sinotao-current.svg</div>
      <div class="u-label">随 currentColor。必须内联为 &lt;svg&gt; 使用</div>
    </div>
  </div>
  <div class="note note--info" style="margin-top:var(--space-5)"><div class="note__b">
    <div class="note__t">为什么 current 版必须内联</div>
    <div class="note__d">经 &lt;img src&gt; 加载时 SVG 是独立文档，继承不到宿主页的 color，会渲染成黑色。上图第三格因此改用宣纸白版。</div>
  </div></div>`)}

  ${block('留白与最小尺寸', `
  <div class="grid grid--8-4" style="align-items:start">
    <div style="background:var(--surface-sunken);border-radius:var(--shape-card);padding:var(--space-9);display:flex;justify-content:center">
      <span style="display:inline-block;padding:22px;outline:1px dashed var(--border-strong);outline-offset:0">
        <span class="wordmark" style="font-size:44px">SINOTAO</span></span>
    </div>
    <div>
      ${[['屏幕最小高度', '16px'], ['印刷最小高度', '5mm'], ['品牌页顶栏', '19–20px'], ['比例', '400 : 127 锁定']]
        .map(([k, v]) => `<div style="display:flex;justify-content:space-between;gap:var(--space-4);padding:var(--space-3) 0;border-bottom:var(--border-hairline) solid var(--table-divider);font-size:var(--fs-body-s)">
        <span>${k}</span><span class="u-num">${v}</span></div>`).join('')}
      <p style="margin-top:var(--space-4);font-size:var(--fs-label);color:var(--text-subtle);line-height:1.7">虚线为最小留白边界。留白 = 字标高度的 50%，四边等距。留白内不得出现任何文字、线条或图像边缘。</p>
      <div style="display:flex;align-items:flex-end;gap:var(--space-6);margin-top:var(--space-4)">
        <div><span class="wordmark" style="font-size:20px">SINOTAO</span><div class="u-label">20px · 页脚</div></div>
        <div><span class="wordmark" style="font-size:16px">SINOTAO</span><div class="u-label">16px · 屏幕下限</div></div>
      </div>
    </div>
  </div>`)}

  ${block('六种禁止用法', `
  <div class="grid grid--3" style="gap:0">
    ${FORBID.map(([t, css], i) => `
    <div style="padding:var(--space-5);border-left:var(--hairline);border-top:var(--hairline)">
      <div style="height:64px;display:flex;align-items:center;justify-content:center;background:${i === 4 ? 'var(--surface-sunken)' : i === 5 ? 'var(--ink-400)' : 'var(--surface-sunken)'};border-radius:var(--shape-tag);overflow:hidden">
        ${i === 4
        ? '<span style="display:flex;align-items:baseline;gap:2px"><span class="wordmark" style="font-size:20px">SINOTAO</span><span style="font-size:11px;color:var(--text-muted)">集团官网</span></span>'
        : `<span class="wordmark" style="font-size:22px;${css};${i === 3 ? '' : 'color:var(--ink-900)'}">SINOTAO</span>`}
      </div>
      <div style="margin-top:var(--space-3);display:flex;align-items:baseline;gap:var(--space-2)">
        <span class="ms" style="font-size:14px;color:var(--status-error)" aria-hidden="true">block</span>
        <span style="font-size:var(--fs-label);color:var(--text-body)">${t}</span></div>
    </div>`).join('')}
  </div>
  <p style="margin-top:var(--space-4);font-size:var(--fs-label);color:var(--text-subtle);max-width:44em">另外两条无需图示：禁止重绘字形（包括「按原样重画一遍」）、禁止在字标旁添加图形元素构成组合标志。字标只与文字并列，不与图形并列。</p>`)}

  ${block('与实体代号的组合 · 方形标记', `
  <div class="grid grid--2" style="gap:var(--space-6)">
    <div class="panel">
      <h4>与实体代号的组合</h4>
      <div style="margin-top:var(--space-6);display:flex;align-items:center;gap:16px;flex-wrap:wrap">
        <span class="wordmark" style="font-size:24px">SINOTAO</span>
        <span style="width:1px;height:22px;background:var(--border-default)"></span>
        <span style="width:2px;height:18px;background:var(--brand-600)"></span>
        <span class="u-eyebrow" style="color:var(--text-body)" data-ent-code>STG</span>
        <span style="font-size:var(--fs-body-s);font-weight:var(--fw-medium);color:var(--text-heading)" data-ent-name>源裕兴创新未来</span>
      </div>
      <p style="margin-top:var(--space-6);font-size:var(--fs-label);color:var(--text-muted);line-height:1.8;margin-bottom:0">字标 + 1px 竖分隔线 + 实体色刻度 + 代号。间距为字标高度的 70%。实体名称用中文时接在代号后，走界面黑体 500，不用宋体。</p>
    </div>
    <div class="panel">
      <h4>方形标记 · favicon 与头像</h4>
      <div style="margin-top:var(--space-6);display:flex;gap:var(--space-5);align-items:center">
        <div style="width:72px;height:72px;border-radius:var(--radius-xl);background:var(--ink-950);display:flex;align-items:center;justify-content:center;color:var(--ink-50)" data-lattice="stg" data-size="44" aria-hidden="true"></div>
        <div style="width:72px;height:72px;border-radius:var(--radius-xl);background:var(--brand-600);display:flex;align-items:center;justify-content:center">
          <span class="u-eyebrow" style="color:var(--on-brand);font-size:15px" data-ent-code>STG</span></div>
      </div>
      <p style="margin-top:var(--space-6);font-size:var(--fs-label);color:var(--text-muted);line-height:1.8;margin-bottom:0">两种合法方案：STG 环点阵（集团层面），或实体色底 + 代号（实体层面）。字标本身不作方形裁切使用 —— 3.15 : 1 的比例塞进正方形只会两边留大量空白。</p>
    </div>
  </div>`)}`
    })}

</div>`
};
