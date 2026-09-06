import { vhero, toc, chapter, block } from '../shell.mjs';

const TOC = [
  ['序', '设计哲学', '#ch-prologue'],
  ['00', '变更摘要', '#ch-00'],
  ['01', '语境与实体', '#ch-01'],
  ['02', '内容与文案', '#ch-02']
];

const CHANGES = {
  added: [
    '四支状态色族，与实体色彻底分离',
    '五实体点阵标记的生成规则与全套一稿',
    '36px 紧凑输入档与 --ring-hairline 控件边界',
    '三件组件：ProvenanceCapsule · DotDensity · EntityLattice',
    '品牌面与产品面两档间距节奏'
  ],
  changed: [
    '字阶 17 级 → 9 级；四字族职责收成三轨',
    '图表 14 种 → 4 种版式件',
    '图表序列 8 → 3，超出改明度不改色相',
    '表头底色 → 2px 墨线；行高 48px',
    '编号章节制从可选升为标准'
  ],
  deprecated: [
    '四张并排 StatCard 作指标区',
    '图表渐变填充、网格线、逐点圆点、独立图例',
    '竖柱图、半圆表盘与指针',
    '斑马纹与表格竖线；卡中卡',
    'Display 2XL 112 / XL 88 与四级中间字阶',
    '150 枚待画品牌 SVG 与 14 种图表图标的计划'
  ]
};

const CONVERGE = [
  ['字阶', 17, 9, '级'],
  ['图表形态', 14, 4, '种'],
  ['图表序列', 8, 3, '条'],
  ['品牌 SVG', 150, 5, '枚']
];

const COPY = [
  ['提交表单', '保存并提交', '确定'],
  ['删除操作', '删除订单 #1024', '是'],
  ['格式错误', '手机号应为 11 位数字', '输入格式不正确'],
  ['无数据', '暂无数据。创建第一条记录，从这里开始。', '无数据']
];

const NUMS = [
  ['金额', '¥1,234.56'],
  ['百分比', '15.7%'],
  ['日期 · ISO 8601', '2026-07-20'],
  ['时间 · 24 小时制', '14:30'],
  ['大数', '1,280 万 / 12.8 亿'],
  ['标识类文本', 'STE.RC.20260904']
];

const TONE = [
  ['STG', '中高', '中', '超过 500 万元需集团审批。'],
  ['STE', '中', '中高', '今日碳配额剩余 12,800 吨，建议优化 CFB 燃烧参数。'],
  ['STI', '中高', '中', '报关单 #STI-2026-0718 已提交，预计 2 小时内审核。'],
  ['STH', '高', '高', '检测报告已生成。请注意：本结果仅供专业医师参考。'],
  ['EDU', '中高', '小', '小明同学，你的阅读能力比上月提升了 15%，继续加油！']
];

const ledger = (title, items, kind) => `
<div style="padding:var(--space-5);border-top:var(--border-indicator) solid ${kind};min-width:0">
  <div class="u-eyebrow" style="color:${kind}">${title}</div>
  <div style="margin-top:var(--space-4)">
    ${items.map(t => `<div style="display:grid;grid-template-columns:auto minmax(0,1fr);gap:var(--space-3);padding:var(--space-3) 0;border-bottom:var(--border-hairline) solid var(--table-divider)">
      <span style="width:6px;height:6px;border-radius:var(--radius-full);background:${kind};margin-top:8px"></span>
      <span style="font-size:var(--fs-body-s);line-height:1.75;color:var(--text-body)">${t}</span></div>`).join('')}
  </div>
</div>`;

export default {
  file: 'volume-1.html',
  title: '第一册 · 序与总纲',
  desc: '设计哲学 · 变更摘要 · 语境与实体 · 内容与文案。墨是最贵的颜色。',
  body: `
${vhero({
    vol: '一', name: '序与总纲', art: 'confluence', cur: 'volume-1.html',
    sub: '设计哲学 · 变更摘要 · 语境 · 文案 —— 哲学只在能落成规则时才写进本典。'
  })}
${toc(TOC)}

<div class="wrap">

${chapter({
      id: 'ch-prologue', num: '序 / PROLOGUE', eyebrow: 'Philosophy',
      title: '设计哲学：墨是最贵的颜色',
      lead: '命名来自 Sino 与 Tao。源为守正，裕为开物，兴为共生。五个实体不是五家割裂的公司，而是共用一套设计语法、各自生长出独立主色的价值共生体。',
      body: `
  ${block('The core judgement', `
  <div class="grid grid--8-4" style="align-items:start">
    <div>
      <h3 style="font-family:var(--font-display);font-size:clamp(24px,3vw,38px);font-weight:var(--fw-light);letter-spacing:var(--track-title);max-width:14em;word-break:keep-all">高阶不靠色度，靠明度落差。</h3>
      <p style="margin-top:var(--space-5);line-height:1.9">同一色相，压深压灰显贵，提亮增艳显廉。宋瓷、明式家具、褪色壁画、官式建筑的朱墨金，用的都是掺了灰的矿物颜料。瑞士编辑设计同样是近乎单色加一个深色重点 —— 东方矿物颜料与瑞士编辑设计指向同一条规律，本系统按它重建了全部色值。</p>
      <p style="line-height:1.9;color:var(--text-heading)"><strong>于是有了本系统最重要的一条色彩决策：主操作按钮用玄墨，不用品牌色。</strong></p>
    </div>
    <div class="grid" style="gap:var(--space-4)">
      <div><div style="height:88px;background:oklch(.32 .09 310);border-radius:var(--shape-card)"></div>
        <div style="display:flex;justify-content:space-between;margin-top:var(--space-2)"><span class="u-mono" style="font-size:11px">oklch(.32 .09)</span><span class="u-label" style="color:var(--text-heading)">显贵</span></div></div>
      <div><div style="height:88px;background:oklch(.45 .22 310);border-radius:var(--shape-card)"></div>
        <div style="display:flex;justify-content:space-between;margin-top:var(--space-2)"><span class="u-mono" style="font-size:11px">oklch(.45 .22)</span><span class="u-label">显廉 · 已废止</span></div></div>
    </div>
  </div>`)}

  ${block('Voice · Where the east lands · Audience', `
  <div class="grid grid--3" style="gap:0">
    <div style="padding:var(--space-5);border-left:var(--hairline)">
      <div class="u-eyebrow">Voice</div>
      <h4 style="margin-top:var(--space-3);font-family:var(--font-display);font-size:22px;font-weight:var(--fw-light)">儒侠气质</h4>
      <p style="margin-top:var(--space-3);font-size:var(--fs-body-s);line-height:1.85">稳重而不迂腐，精进而不冒进。不喧哗、不自炫，但精确、但温暖。正式度中高、温度中、简洁度高。这条气质同时约束文案与视觉 —— 一个不用感叹号的系统，也不该用发光和渐变。</p>
    </div>
    <div style="padding:var(--space-5);border-left:var(--hairline)">
      <div class="u-eyebrow">Where the east lands</div>
      <h4 style="margin-top:var(--space-3);font-family:var(--font-display);font-size:22px;font-weight:var(--fw-light)">东方性的落点不是纹样</h4>
      <p style="margin-top:var(--space-3);font-size:var(--fs-body-s);line-height:1.85">是四处：宋体 200 字重与正文之间三倍以上的字阶落差、刻意非对称的留白、每章一枚印章方块、竖排的三位序号。把水墨纹样铺在背景上不是东方，是装饰。</p>
    </div>
    <div style="padding:var(--space-5);border-left:var(--hairline)">
      <div class="u-eyebrow">Audience</div>
      <h4 style="margin-top:var(--space-3);font-family:var(--font-display);font-size:22px;font-weight:var(--fw-light)">受众是用户，不是读者</h4>
      <p style="margin-top:var(--space-3);font-size:var(--fs-body-s);line-height:1.85">本典不是给人欣赏的画册，是给 Odoo 18 实施团队、前端工程师、UI/UX 设计师与品牌委员会照着做的施工图。每一条规则都要能被编译成令牌，或被验收时指着说「这里不合规」。</p>
    </div>
  </div>`)}

  ${block('保留的两个符号术语', `
  <div class="grid grid--2">
    <div class="panel"><h4>金三角罗盘</h4><p style="margin-top:var(--space-3);font-size:var(--fs-body-s);line-height:1.8;margin-bottom:0">守正、开物、共生三维的内部称法。用于战略叙事文本，不作为图形绘制。</p></div>
    <div class="panel"><h4>太极流纹</h4><p style="margin-top:var(--space-3);font-size:var(--fs-body-s);line-height:1.8;margin-bottom:0">术语保留，形态在 V7.0 改由点阵按序旋转承担。原先规划的 12 个流纹变体不再绘制：阴阳双弧是形，点阵按序是同一个意思的更克制的形。</p></div>
  </div>
  <div class="note note--warn" style="margin-top:var(--space-5)">
    <div class="note__b"><div class="note__t">哲学不成立的地方</div>
    <div class="note__d">「天人合一」「道法自然」这类说法无法编译成令牌，也无法在验收时指认，因此不出现在规范条文里。凡本典的哲学表述，后面都跟着一条可执行的规则 —— 找不到那条规则的，说明这句哲学不该写。</div></div>
  </div>`)}`
    })}

${chapter({
      id: 'ch-00', num: '000 / 021', eyebrow: 'Changelog',
      title: 'V7.0 改了什么',
      lead: '十六项实质变更：新增五、修改五、废止六。密度类判断来自 Ledgerix，克制纪律来自 Geist，生成式方法来自 Univers。所有值已与实建令牌逐条核对。',
      body: `
  ${block('新增 · 修改 · 废止', `
  <div class="grid grid--3" style="gap:var(--space-5)">
    ${ledger('Added · 五项', CHANGES.added, 'var(--status-success)')}
    ${ledger('Changed · 五项', CHANGES.changed, 'var(--status-info)')}
    ${ledger('Deprecated · 六项', CHANGES.deprecated, 'var(--text-subtle)')}
  </div>`)}

  ${block('收敛', `
  <div class="panel">
    <p style="font-size:var(--fs-body-s);color:var(--text-muted);max-width:38em">数量不是质量。V7.0 的主线是收敛 —— 每种图表只给一种正确形态，字阶砍掉一半仍无冗余档，一百五十枚待画 SVG 变成一条生成规则。</p>
    <div style="margin-top:var(--space-6)">
      ${CONVERGE.map(([n, a, b, u]) => `
      <div style="display:grid;grid-template-columns:96px minmax(0,1fr) auto;gap:var(--space-4);align-items:center;padding:var(--space-4) 0;border-bottom:var(--border-hairline) solid var(--table-divider)">
        <span style="font-size:var(--fs-body-s);color:var(--text-body)">${n}</span>
        <span style="position:relative;height:8px;background:var(--surface-sunken)">
          <span style="position:absolute;inset-block:0;left:0;width:100%;background:var(--chart-muted)"></span>
          <span class="fx-reveal" style="position:absolute;inset-block:0;left:0;width:${(b / a * 100).toFixed(1)}%;background:var(--chart-s1)"></span>
        </span>
        <span class="u-num" style="font-size:var(--fs-body-s);white-space:nowrap">${a} → ${b} <span style="color:var(--text-subtle);font-size:var(--fs-label)">${u}</span></span>
      </div>`).join('')}
    </div>
    <div style="margin-top:var(--space-4);display:flex;gap:var(--space-5);font-size:var(--fs-label);color:var(--text-subtle)">
      <span style="display:flex;align-items:center;gap:6px"><i style="width:14px;height:8px;background:var(--chart-muted);display:block"></i>V6.0</span>
      <span style="display:flex;align-items:center;gap:6px"><i style="width:14px;height:8px;background:var(--chart-s1);display:block"></i>V7.0</span>
    </div>
  </div>`)}`
    })}

${chapter({
      id: 'ch-01', num: '001 / 021', eyebrow: 'Context',
      title: '五家公司，一套设计语法',
      lead: '命名哲学来自 Sino 与 Tao：源为守正、裕为开物、兴为共生。五个实体共用一套语法，各自生长出独立主色。版式与组件零差异，只通过 data-theme 切换主色。',
      body: `
  <div class="entities fx-reveal">
    ${[['stg', 'STG', '源裕兴创新未来', '战略中枢 · 合规治理与资本配置', '#463154', '玄紫'],
      ['ste', 'STE', '九派国有能源', '生物质热电联产、燃料收储与碳资产开发', '#2C4A3B', '松烟绿'],
      ['sti', 'STI', '源裕兴进出口贸易', '以九江港为枢纽的多式联运与报关合规', '#26374F', '藏青'],
      ['sth', 'STH', '源裕兴健康科技', 'PHA 医用材料与药物递送载体的中试与注册', '#2D5257', '石青'],
      ['edu', 'EDU', '崇仁教育', 'K12 学生成长档案与家校协同', '#7A3229', '赭朱']]
        .map(([k, c, n, d, h, cn]) => `
    <button class="entity" type="button" data-ent-opt="${k}" style="--tile:${h}" aria-label="切换到 ${c} ${n}">
      <span class="entity__mark" data-lattice="${k}" data-size="56" aria-hidden="true"></span>
      <span class="entity__code">${c}</span><span class="entity__name">${n}</span>
      <span class="entity__desc">${d}</span><span class="entity__hex">${h} ${cn}</span>
    </button>`).join('')}
  </div>

  ${block('赤湖工业园 · 五段闭环', `
  <div class="panel">
    <p style="font-size:var(--fs-body-s);color:var(--text-muted);max-width:38em">业务重心在 STE。生物质热电联产园区串起五段闭环 —— 本典的图表、图解与点阵示例全部取自这条真实链条，不用示意数据。</p>
    <div class="flow fx-reveal" style="margin-top:var(--space-6)">
      ${[['种植与收储合同', '3,400', '户', 'done'],
        ['逐车化验与入库', '18,600', 't 库存', 'done'],
        ['热电联产与供汽', '2 × 30', 'MW', 'done'],
        ['碳资产签发', '41.2', '万 t CO₂e', 'pending'],
        ['灰渣资源化', '3.8', '万 t', 'pending']].map(([n, v, u, s]) => `
      <div class="flow__step" data-state="${s}">
        <span class="flow__line"></span><span class="flow__dot"></span>
        <span class="flow__label">${n}</span>
        <span class="flow__val">${v}<span class="flow__unit">${u}</span></span>
      </div>`).join('')}
    </div>
    <p style="margin-top:var(--space-5);font-size:var(--fs-label);color:var(--text-subtle);max-width:40em;margin-bottom:0">每节点必带量值。已完成段 2px 模块色，未完成段退回 1px 墨线且末节点空心 —— 进度不靠进度条，靠节点与线的实虚。</p>
  </div>`)}`
    })}

${chapter({
      id: 'ch-02', num: '002 / 021', eyebrow: 'Content',
      title: '内容与文案：写动作，不写「确定」',
      lead: '简体中文第一语言，英文第二语言。对用户称「你」不称「您」；系统不自称「我」，只有品牌叙事段落可用「我们」。语调是儒侠气质 —— 稳重而不迂腐，精进而不冒进。',
      body: `
  ${block('按钮与错误文案', `
  <div class="table-scroll"><table class="tbl">
    <caption class="u-sr">按钮与错误文案的正误对照</caption>
    <thead><tr><th scope="col">场景</th><th scope="col">写这个</th><th scope="col">不写这个</th></tr></thead>
    <tbody>${COPY.map(([s, good, bad]) => `<tr>
      <td style="color:var(--text-muted)">${s}</td>
      <td style="color:var(--text-heading);font-weight:var(--fw-medium)">${good}</td>
      <td style="color:var(--text-subtle);text-decoration:line-through;text-decoration-color:var(--status-error)">${bad}</td></tr>`).join('')}
    </tbody></table></div>`)}

  ${block('数字与标点', `
  <div class="grid grid--3" style="gap:0">
    ${NUMS.map(([k, v]) => `<div style="padding:var(--space-4) var(--space-5);border-left:var(--hairline);border-top:var(--hairline)">
      <div class="u-label">${k}</div>
      <div class="u-num" style="margin-top:var(--space-1);font-size:var(--fs-block)">${v}</div></div>`).join('')}
  </div>
  <p style="margin-top:var(--space-5);font-size:var(--fs-body-s);color:var(--text-muted);max-width:40em">中文正文用全角标点，引号「」；西文半角，引号 “”。中文标题不加句末句号。中文与西文数字之间留 1/4em 视觉空格。</p>`)}

  ${block('术语 · 置信度 · 禁令', `
  <div class="grid grid--3" style="gap:var(--space-5)">
    <div class="panel">
      <div class="u-eyebrow">Terms</div>
      <h4 style="margin-top:var(--space-3)">不可替换的术语</h4>
      <div style="margin-top:var(--space-4);display:flex;flex-wrap:wrap;gap:var(--space-2)">
        ${['源裕兴创新未来', '九派国有能源', '守正', '开物', '共生', '金三角罗盘', '太极流纹'].map(t => `<span class="tag tag--plain">${t}</span>`).join('')}
      </div>
      <p style="margin-top:var(--space-4);font-size:var(--fs-label);color:var(--text-subtle);margin-bottom:0">「九派能源」仅内部简称，不上界面。</p>
    </div>
    <div class="panel">
      <div class="u-eyebrow">AI copy</div>
      <h4 style="margin-top:var(--space-3)">置信度三档写法</h4>
      <div style="margin-top:var(--space-4)">
        <div style="padding:var(--space-3) 0;border-bottom:var(--border-hairline) solid var(--table-divider)"><span class="tag tag--success">≥85%</span><p style="margin:var(--space-2) 0 0;font-size:var(--fs-label);line-height:1.7">写「高度可信」且不标百分比</p></div>
        <div style="padding:var(--space-3) 0;border-bottom:var(--border-hairline) solid var(--table-divider)"><span class="tag tag--warning">60–84%</span><p style="margin:var(--space-2) 0 0;font-size:var(--fs-label);line-height:1.7">写「置信度 75%，建议人工复核」</p></div>
        <div style="padding:var(--space-3) 0"><span class="tag tag--error">&lt;60%</span><p style="margin:var(--space-2) 0 0;font-size:var(--fs-label);line-height:1.7">写「置信度较低（42%），仅供参考」</p></div>
      </div>
    </div>
    <div class="panel">
      <div class="u-eyebrow">Never</div>
      <h4 style="margin-top:var(--space-3)">不使用 Emoji</h4>
      <p style="margin-top:var(--space-4);font-size:var(--fs-body-s);line-height:1.8">界面里没有一个 emoji。状态一律由图标 + 文字 + 语义色三重表达。Unicode 仅限快捷键记号与数学符号。</p>
      <div style="margin-top:var(--space-4);display:flex;gap:var(--space-3);align-items:center">
        <span class="tag tag--success"><span class="ms" style="font-size:14px" aria-hidden="true">check_circle</span>达标</span>
        <span class="tag tag--warning"><span class="ms" style="font-size:14px" aria-hidden="true">error</span>待核</span>
      </div>
    </div>
  </div>`)}

  ${block('五实体语调差异', `
  <div class="table-scroll"><table class="tbl">
    <caption class="u-sr">五实体的正式度、温度与文案示例</caption>
    <thead><tr><th scope="col">实体</th><th scope="col">正式度</th><th scope="col">温度</th><th scope="col">示例</th></tr></thead>
    <tbody>${TONE.map(([e, f, w, ex]) => `<tr>
      <td class="mono" style="color:var(--text-heading)">${e}</td><td>${f}</td><td>${w}</td>
      <td style="color:var(--text-heading)">${ex}</td></tr>`).join('')}
    </tbody></table></div>
  <p style="margin-top:var(--space-5);font-size:var(--fs-body-s);color:var(--text-muted);max-width:42em">语言策略：简体中文必译，英文在品牌系统与开发者文档必译，繁体中文按需。西文只出现在眼标、数值、代码与 Token 名里。眼标只用于西文 —— 0.18em 字距会把汉字拉散，承载中文的小标签改用 <code>.u-label</code>。</p>`)}`
    })}

</div>`
};
