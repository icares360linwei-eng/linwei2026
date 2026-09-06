import { VOLS, block } from '../shell.mjs';

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

const ENTS = [
  ['stg', 'STG', '源裕兴创新未来', '战略中枢 · 合规治理与资本配置', '#463154', '玄紫'],
  ['ste', 'STE', '九派国有能源', '生物质热电联产、燃料收储与碳资产开发', '#2C4A3B', '松烟绿'],
  ['sti', 'STI', '源裕兴进出口贸易', '以九江港为枢纽的多式联运与报关合规', '#26374F', '藏青'],
  ['sth', 'STH', '源裕兴健康科技', 'PHA 医用材料与药物递送载体的中试与注册', '#2D5257', '石青'],
  ['edu', 'EDU', '崇仁教育', 'K12 学生成长档案与家校协同', '#7A3229', '赭朱']
];

const QUOTA = [
  ['80%', '墨与宣', '底色 --ink-50 宣，正文 --ink-700，标题与主操作按钮 --ink-900', 'var(--ink-900)'],
  ['15%', '五实体矿物色', '2px 细线刻度 + 代号，不是 40px 填色块。驱动选中态、导航激活、链接、焦点环、图表首序列', 'var(--brand-600)'],
  ['5%', '印章朱 #8A3323', '全站唯一重点色。每个章节仅一枚方块，错误态与之同值因而同享配额', 'var(--zhu-600)'],
  ['5%', '古铜金 #B9A177', '箔金不是镀金。营销 CTA、奖项资质、深底眼标。每屏最多一处', 'var(--gold-400)']
];

const TERMS = ['守正 · 开物 · 共生', '墨是最贵的颜色', '高阶不靠色度，靠明度落差',
  '一重边界，不许第二重', '写动作，不写「确定」', '生成规则优于逐个手绘',
  '一套语法，五种身份', '装饰一律不留', '动效即叙事', '受众是用户，不是读者'];

export default {
  file: 'index.html',
  title: '总纲',
  desc: '源裕兴设计系统全典 V7.0 —— 五个实体，一套设计语法。21 章、37 组件、421 个可编译令牌。',
  body: `
<section class="hero on-dark">
  <canvas class="hero__canvas" data-art="confluence" aria-hidden="true"></canvas>
  <div class="wrap hero__in">
    <div class="hero__eyebrow"><span class="seal" style="background:var(--gold-400)"></span><span class="u-eyebrow">SINOTAO Design System · V7.0</span></div>
    <h1 class="hero__t">墨是<br>最贵的颜色</h1>
    <p class="hero__sub">命名来自 Sino 与 Tao。源为守正，裕为开物，兴为共生。五个实体不是五家割裂的公司，而是共用一套设计语法、各自生长出独立主色的价值共生体。</p>
    <div class="hero__acts">
      <a class="btn" href="volume-1.html">从第一册读起<span class="ms" style="font-size:18px" aria-hidden="true">arrow_forward</span></a>
      <a class="btn btn--secondary" href="tokens.html">令牌总表</a>
      <button class="btn btn--secondary" data-k-open type="button">检索全典 <kbd style="font-family:var(--font-mono);font-size:10px;opacity:.7">⌘K</kbd></button>
    </div>
    <div class="hero__band">
      <div class="hero__stat"><b>5</b><span>实体，一套语法</span></div>
      <div class="hero__stat"><b>21</b><span>章 · 五册</span></div>
      <div class="hero__stat"><b>37</b><span>组件</span></div>
      <div class="hero__stat"><b>421</b><span>可编译令牌</span></div>
      <div class="hero__stat"><b>9</b><span>级字阶，无冗余档</span></div>
    </div>
  </div>
</section>

<div class="wrap">

<section class="chapter" aria-labelledby="phil-t">
  <header class="chapter__head fx-reveal">
    <span class="chapter__num">序 / PROLOGUE</span>
    <div style="min-width:0">
      <div class="chapter__meta"><span class="seal"></span><span class="u-eyebrow">Philosophy</span></div>
      <h2 class="chapter__title" id="phil-t">三源合流：守正 · 开物 · 共生</h2>
      <p class="chapter__lead">哲学只在能落成规则时才写进本典。凡本典的哲学表述，后面都跟着一条可执行的规则 —— 找不到那条规则的，说明这句哲学不该写。</p>
    </div>
  </header>

  <div class="grid grid--3">
    <div class="panel panel--brand fx-reveal">
      <div class="u-eyebrow">Preserving Integrity</div>
      <h3 style="font-family:var(--font-display);font-size:28px;font-weight:var(--fw-light);margin-top:var(--space-3)">守正</h3>
      <p style="margin-top:var(--space-4);font-size:var(--fs-body-s);line-height:1.85">落到设计上是纪律：颜色只用令牌、间距只用刻度、术语不可替换。守正不是保守，是让第一百个界面与第一个界面出自同一只手。</p>
    </div>
    <div class="panel panel--brand fx-reveal">
      <div class="u-eyebrow">Pioneering Innovation</div>
      <h3 style="font-family:var(--font-display);font-size:28px;font-weight:var(--fw-light);margin-top:var(--space-3)">开物</h3>
      <p style="margin-top:var(--space-4);font-size:var(--fs-body-s);line-height:1.85">落到设计上是生成规则优于逐个手绘。品牌标记不画一百五十枚，而是定一条网格与点径的规则让它自己长出来。能被规则表达的，就不该靠人手重复。</p>
    </div>
    <div class="panel panel--brand fx-reveal">
      <div class="u-eyebrow">Symbiotic Coexistence</div>
      <h3 style="font-family:var(--font-display);font-size:28px;font-weight:var(--fw-light);margin-top:var(--space-3)">共生</h3>
      <p style="margin-top:var(--space-4);font-size:var(--fs-body-s);line-height:1.85">落到设计上是一套语法、五种身份。客户从能源切换到贸易时，感受到的不该是「换了一家公司」，而是「同一个品牌，不同的专家」。版式与组件零差异。</p>
    </div>
  </div>

  ${block('The core judgement', `
  <div class="grid grid--8-4" style="align-items:start">
    <div>
      <h3 style="font-family:var(--font-display);font-size:clamp(24px,3vw,38px);font-weight:var(--fw-light);letter-spacing:var(--track-title);max-width:14em;word-break:keep-all">高阶不靠色度，靠明度落差。</h3>
      <p style="margin-top:var(--space-5);max-width:34em;line-height:1.9">同一色相，压深压灰显贵，提亮增艳显廉。宋瓷、明式家具、褪色壁画、官式建筑的朱墨金，用的都是掺了灰的矿物颜料。</p>
      <p style="max-width:34em;line-height:1.9">瑞士编辑设计同样是近乎单色加一个深色重点。东方矿物颜料与瑞士编辑设计指向同一条规律，本系统按它重建了全部色值。</p>
      <p style="max-width:34em;line-height:1.9;color:var(--text-heading)">于是有了本系统最重要的一条色彩决策：<strong>主操作按钮用玄墨，不用品牌色。墨是最贵的颜色。</strong></p>
    </div>
    <div class="grid" style="gap:var(--space-4)">
      <div>
        <div style="height:96px;background:oklch(.32 .09 310);border-radius:var(--shape-card)"></div>
        <div style="display:flex;justify-content:space-between;margin-top:var(--space-2)">
          <span class="u-mono" style="font-size:11px">oklch(.32 .09)</span><span class="u-label" style="color:var(--text-heading)">显贵</span>
        </div>
      </div>
      <div>
        <div style="height:96px;background:oklch(.45 .22 310);border-radius:var(--shape-card)"></div>
        <div style="display:flex;justify-content:space-between;margin-top:var(--space-2)">
          <span class="u-mono" style="font-size:11px">oklch(.45 .22)</span><span class="u-label">显廉 · 已废止</span>
        </div>
      </div>
    </div>
  </div>`)}
</section>

<section class="chapter" aria-labelledby="ent-t">
  <header class="chapter__head fx-reveal">
    <span class="chapter__num">001 / 021</span>
    <div style="min-width:0">
      <div class="chapter__meta"><span class="seal"></span><span class="u-eyebrow">Context</span></div>
      <h2 class="chapter__title" id="ent-t">五家公司，一套设计语法</h2>
      <p class="chapter__lead">五个实体共用一套语法，各自生长出独立主色。版式与组件零差异，只通过 <code>data-theme</code> 切换主色。点一下任意实体，整站主色立刻改写 —— 而版式一个像素都不动。</p>
    </div>
  </header>

  <div class="entities fx-reveal">
    ${ENTS.map(([k, code, name, desc, hex, cn]) => `
    <button class="entity" type="button" data-ent-opt="${k}" style="--tile:${hex}" aria-label="切换到 ${code} ${name}">
      <span class="entity__mark" data-lattice="${k}" data-size="56" aria-hidden="true"></span>
      <span class="entity__code">${code}</span>
      <span class="entity__name">${name}</span>
      <span class="entity__desc">${desc}</span>
      <span class="entity__hex">${hex} ${cn}</span>
    </button>`).join('')}
  </div>

  <div class="note fx-reveal" style="margin-top:var(--space-7)">
    <div class="note__b">
      <div class="note__t">业务重心在 STE</div>
      <div class="note__d">赤湖工业园的生物质热电联产园区，串起甜高粱与农林废弃物种植、燃料收储化验、发电供汽、碳资产开发与灰渣资源化的闭环。本典受众是用户而非读者 —— Odoo 18 实施团队、前端工程师、UI/UX 设计师，以及品牌委员会。</div>
    </div>
  </div>
</section>

<section class="chapter" aria-labelledby="quota-t">
  <header class="chapter__head fx-reveal">
    <span class="chapter__num">003 / 021</span>
    <div style="min-width:0">
      <div class="chapter__meta"><span class="seal"></span><span class="u-eyebrow">Color quota</span></div>
      <h2 class="chapter__title" id="quota-t">配色配额是验收标准，不是画法</h2>
      <p class="chapter__lead">出稿流程：任何新界面先全墨出一稿，再逐处论证加色，论证不出理由的地方保持墨色。</p>
    </div>
  </header>

  <div class="grid grid--4 fx-reveal" style="gap:0">
    ${QUOTA.map(([p, n, d, c]) => `
    <div style="padding:var(--space-6) var(--space-5);border-left:var(--hairline)">
      <div style="width:100%;height:4px;background:${c};margin-bottom:var(--space-5)"></div>
      <div class="u-num" style="font-size:34px;letter-spacing:-.02em">${p}</div>
      <div style="margin-top:var(--space-2);font-size:var(--fs-body-s);font-weight:var(--fw-medium);color:var(--text-heading)">${n}</div>
      <p style="margin-top:var(--space-3);font-size:var(--fs-label);line-height:1.8;color:var(--text-muted)">${d}</p>
    </div>`).join('')}
  </div>
</section>

<section class="chapter" aria-labelledby="rules-t">
  <header class="chapter__head fx-reveal">
    <span class="chapter__num">017 / 021</span>
    <div style="min-width:0">
      <div class="chapter__meta"><span class="seal"></span><span class="u-eyebrow">Twelve rules</span></div>
      <h2 class="chapter__title" id="rules-t">十二条工艺准则</h2>
      <p class="chapter__lead">每一条都要能被编译成令牌，或被验收时指着说「这里不合规」。本站自身即按这十二条建成 —— 页面就是验收样本。</p>
    </div>
  </header>
  <div class="rules fx-reveal">
    ${RULES.map((r, i) => `<div class="rule"><span class="rule__n">${String(i + 1).padStart(2, '0')}</span><span class="rule__t">${r}</span></div>`).join('\n    ')}
  </div>
</section>

</div>

<div class="marquee" aria-hidden="true">
  <div class="marquee__t">
    <div class="marquee__g">${TERMS.map(t => `<span class="marquee__i">${t}</span>`).join('')}</div>
    <div class="marquee__g">${TERMS.map(t => `<span class="marquee__i">${t}</span>`).join('')}</div>
  </div>
</div>

<div class="wrap">
<section class="chapter" aria-labelledby="vol-t" style="border-bottom:0">
  <header class="chapter__head fx-reveal">
    <span class="chapter__num">全典 / FIVE VOLUMES</span>
    <div style="min-width:0">
      <div class="chapter__meta"><span class="seal"></span><span class="u-eyebrow">Contents</span></div>
      <h2 class="chapter__title" id="vol-t">五册二十一章</h2>
    </div>
  </header>
  <div class="grid grid--2 fx-reveal" style="gap:0">
    ${VOLS.map(([n, t, h, d], i) => `
    <a href="${h}" style="display:grid;grid-template-columns:auto minmax(0,1fr);gap:var(--space-5);padding:var(--space-6) var(--space-5);border-top:var(--hairline);text-decoration:none;color:inherit">
      <span class="chapter__num" style="writing-mode:vertical-rl;font-size:11px">${String(i + 1).padStart(2, '0')}</span>
      <span style="min-width:0">
        <span class="u-eyebrow">Volume ${n}</span>
        <span style="display:block;margin-top:var(--space-2);font-family:var(--font-display);font-size:30px;font-weight:var(--fw-light);color:var(--text-heading);letter-spacing:var(--track-title)">${t}</span>
        <span style="display:block;margin-top:var(--space-3);font-size:var(--fs-label);color:var(--text-muted)">${d}</span>
      </span>
    </a>`).join('')}
    <a href="atlas.html" style="display:grid;grid-template-columns:auto minmax(0,1fr);gap:var(--space-5);padding:var(--space-6) var(--space-5);border-top:var(--hairline);text-decoration:none;color:inherit">
      <span class="chapter__num" style="writing-mode:vertical-rl;font-size:11px">附</span>
      <span style="min-width:0">
        <span class="u-eyebrow">Appendix</span>
        <span style="display:block;margin-top:var(--space-2);font-family:var(--font-display);font-size:30px;font-weight:var(--fw-light);color:var(--text-heading);letter-spacing:var(--track-title)">图谱</span>
        <span style="display:block;margin-top:var(--space-3);font-size:var(--fs-label);color:var(--text-muted)">生成式插图集 · 六幅扉画的规则与读法</span>
      </span>
    </a>
  </div>
</section>
</div>`
};
