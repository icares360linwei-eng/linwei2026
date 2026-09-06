import { chapter, block, VOLS } from '../shell.mjs';

const PLATES = [
  ['confluence', '扉画 一', '三源合流', 'Confluence',
    '三股源流各 46 点，起点相隔 120°，半径由 4.6R 旋进到 1.4R —— 收在环外，留一圈呼吸。环上八点按 1/8 周期相位差依次提亮，与 LatticeSpin 加载态是同一条规则，只是尺度不同。',
    '守正 · 开物 · 共生。收束缓动取 p^0.55，点径与不透明度随收束同步上升，所以「近处密而亮、远处疏而淡」。中枢一点古铜金，是全幅唯一的一处金。构图刻意偏右：左栏留给标题，留白是构图元素，不是剩余空间。',
    'volume-1.html'],
  ['ramp', '扉画 二', '色阶场', 'Ramp field',
    '十一行对应 Ink 十一阶：点径随明度线性递减，最上一行是焦墨（点最大），最下一行是宣（点最小）。右起五列走实体明度档，按列相位起伏。',
    '明度落差可以被数出来 —— 这正是「高阶不靠色度，靠明度落差」的字面呈现。底部一条 1px 基线，是全幅唯一的一条轴线。',
    'volume-2.html'],
  ['grid', '扉画 三', '构造网格', 'Construction grid',
    '把生成规则本身画出来：五张 48 × 48 网格并列，每 8 格一条构造线，五实体标记各落在自己那张网格上，按册序依次提亮。',
    '缺件问题从「画 150 个」变成「定一条规则」。这幅图既是插图，也是那条规则的施工图 —— 读者可以照着它复现任意一枚标记。',
    'volume-3.html'],
  ['loop', '扉画 四', '闭环', 'Closed loop',
    '赤湖园区五段闭环。每段弧上的点数正比于该段量级：种植 34 · 收储 30 · 发电 26 · 碳资产 22 · 灰渣 12，读者可以数出来。',
    '高亮段一图仅一段，在五段之间轮转，用古铜金与放大的点径标出。内环一条 1px 线承担「闭合」这个语义 —— 环上不写字。',
    'volume-4.html'],
  ['tokens', '扉画 五', '令牌星图', 'Token constellation',
    '十五列对应令牌文件，列高即该族令牌数，一枚点就是一个令牌。421 枚点，数量即内容。',
    'semantic.css 那一列最高 —— 语义层承担了大部分主题化职责，这正是「只在语义层与组件层保留真正会被复用的部分」的形状。',
    'volume-5.html'],
  ['field', '扉画 六', '密度场', 'Density field',
    'DotDensity 的放大版：点径固定 1.5，密度按距中心衰减，叠一层确定性伪随机抖动 —— 同一种子永远画出同一幅。',
    '不加渐变、不加发光、不改颜色。量感全部由点的疏密承担 —— 这是本系统对「大屏叙事」给出的唯一答案，取代彩色热力图。',
    'atlas.html']
];

const WHY = [
  ['01', '规则可复现', '每幅扉画由一个纯函数与一个确定性种子生成，同一输入永远画出同一幅。不存在「设计师手上那一版」与「工程实现那一版」的差异。'],
  ['02', '插图即内容', '六幅图画的都是本典自己的数据 —— 色阶、网格、闭环量级、令牌族规模。不带数的图是示意图，不是规范图；这条对图解成立，对插图同样成立。'],
  ['03', '不越配额', '全部由宣纸白点与至多一处古铜金构成，落在焦墨底上。不引入任何新色相，不加渐变、发光与 3D —— 影像三条硬规则同样约束插图。'],
  ['04', '零资产负担', '没有一个位图文件。缩放到任意尺寸不失真，暗色与实体切换后自动重绘，reduced-motion 下一次性静态渲染且完整可读。']
];

const CONSTRUCT = [
  ['stg', 'STG', '环 · 八点等分', 8, '2.6', 'cos/sin 等分 2π，半径 15，起始角 −90°'],
  ['ste', 'STE', '方阵中空 · 炉膛', 8, '2.4', '3 × 3 网格取 {10,24,38}，剔除中心一点'],
  ['sti', 'STI', '双向折线 · 航路', 7, '2.2', '上下两组对称人字 + 中心一点'],
  ['sth', 'STH', '核与六配位 · 分子', 7, '2.0 / 3.4', '中心点用最大档 3.4，六配位用最小档 2.0'],
  ['edu', 'EDU', '递进三阶', 6, '2.6', '一生二、二生三，行距 12 格']
];

const plate = ([art, no, cn, en, how, why, href], i) => `
<section class="chapter" style="border-bottom:0;padding-block:0" aria-labelledby="plate-${art}">
  <div style="position:relative;background:var(--ink-950);border-radius:var(--shape-card);overflow:hidden" class="on-dark fx-reveal">
    <canvas data-art="${art}" style="display:block;width:100%;height:clamp(300px,42vw,460px)" aria-hidden="true"></canvas>
    <div style="position:absolute;left:0;bottom:0;padding:clamp(20px,3vw,32px)">
      <div style="display:flex;align-items:center;gap:10px">
        <span class="seal" style="background:var(--gold-400)"></span>
        <span class="u-eyebrow" style="color:var(--gold-300)">${en}</span>
      </div>
      <div style="margin-top:12px;font-family:var(--font-display);font-size:clamp(26px,3.4vw,42px);font-weight:var(--fw-light);color:var(--ink-50);letter-spacing:var(--track-display);word-break:keep-all">${cn}</div>
    </div>
    <div style="position:absolute;right:0;top:0;padding:clamp(20px,3vw,32px)">
      <span class="u-eyebrow" style="color:var(--ink-500)">${no}</span>
    </div>
  </div>
  <div class="grid grid--2 fx-reveal" style="margin-top:var(--space-6);gap:var(--space-8);align-items:start">
    <div>
      <h3 id="plate-${art}" style="font-size:var(--fs-block);font-weight:var(--fw-medium)">怎么生成的</h3>
      <p style="margin-top:var(--space-3);line-height:1.9;font-size:var(--fs-body-s)">${how}</p>
    </div>
    <div>
      <h3 style="font-size:var(--fs-block);font-weight:var(--fw-medium)">为什么这样画</h3>
      <p style="margin-top:var(--space-3);line-height:1.9;font-size:var(--fs-body-s)">${why}</p>
      ${href !== 'atlas.html' ? `<a class="btn btn--secondary btn--s" href="${href}" style="margin-top:var(--space-2)">读对应分册<span class="ms" style="font-size:16px" aria-hidden="true">arrow_forward</span></a>` : ''}
    </div>
  </div>
  ${i < PLATES.length - 1 ? '<hr class="fx-rule" style="margin-block:clamp(var(--space-10),7vw,var(--space-12));background:var(--border-subtle);border:0;height:1px">' : ''}
</section>`;

export default {
  file: 'atlas.html',
  title: '图谱 · 生成式插图集',
  desc: '六幅生成式扉画与五实体点阵的构造规则。本典的插图不画，是长出来的。',
  body: `
<section class="vhero on-dark">
  <canvas class="vhero__canvas" data-art="field" aria-hidden="true"></canvas>
  <div class="wrap vhero__in">
    <div class="hero__eyebrow"><span class="seal" style="background:var(--gold-400)"></span><span class="u-eyebrow" style="color:var(--gold-300)">SINOTAO Design System · V7.0 · 附录</span></div>
    <h1 class="vhero__t">图谱：插图不画，是长出来的</h1>
    <p class="vhero__s">本典第 015 章把「空状态与场景叙事的插画」列为待定项，并判断它应改为影像而非插画。本站给出第三条路：<strong style="color:var(--ink-200)">既不摆拍也不手绘，让插图按规则生成</strong> —— 这正是「开物」在视觉上的落点。</p>
    <nav class="vols" aria-label="分册导航">
      ${VOLS.map(([n, t, h]) => `<a class="vol-pill" href="${h}"><i>${n}</i>${t}</a>`).join('\n      ')}
      <a class="vol-pill" href="atlas.html" aria-current="page"><i>附</i>图谱</a>
    </nav>
  </div>
</section>

<div class="wrap">

${chapter({
      id: 'atlas-why', num: '附 / APPENDIX', eyebrow: 'Rationale',
      title: '四条理由',
      lead: '把水墨纹样铺在背景上不是东方，是装饰。生成式点阵是同一个意思的更克制的形 —— 与本典废止「太极流纹」十二个手绘变体、改由点阵按序旋转承担，是同一个判断。',
      body: `
  <div class="rules fx-reveal">
    ${WHY.map(([n, t, d]) => `<div class="rule">
      <span class="rule__n">${n}</span>
      <span class="rule__t"><b style="display:block;color:var(--text-heading);font-weight:var(--fw-semibold);margin-bottom:var(--space-2)">${t}</b>${d}</span>
    </div>`).join('')}
  </div>`
    })}

<section class="chapter" style="padding-bottom:0" aria-labelledby="plates-t">
  <header class="chapter__head fx-reveal">
    <span class="chapter__num">六幅 / SIX PLATES</span>
    <div style="min-width:0">
      <div class="chapter__meta"><span class="seal"></span><span class="u-eyebrow">Plates</span></div>
      <h2 class="chapter__title" id="plates-t">六幅扉画</h2>
      <p class="chapter__lead">每一幅都画的是它那一册自己的内容。移开视线再看回来，画面已经变了 —— 但规则一个字都没改。</p>
    </div>
  </header>
</section>

${PLATES.map(plate).join('\n')}

${chapter({
      id: 'atlas-lattice', num: '构造 / CONSTRUCTION', eyebrow: 'Entity lattice',
      title: '一条规则如何取代 150 枚 SVG',
      lead: '48 × 48 网格，点径六档，点数 6–8 枚。只改排布与点径，不改笔形、不加线、不加填充。下表即五实体的全部生成参数 —— 照着它可以复现每一枚标记。',
      body: `
  ${block('构造参数', `
  <div class="table-scroll"><table class="tbl">
    <caption class="u-sr">五实体点阵的构造参数</caption>
    <thead><tr><th scope="col">标记</th><th scope="col">代号</th><th scope="col">排布</th><th scope="col" class="num">点数</th><th scope="col" class="num">点径</th><th scope="col">生成式</th></tr></thead>
    <tbody>${CONSTRUCT.map(([k, code, rule, n, r, f]) => `<tr>
      <td style="width:56px"><span data-lattice="${k}" data-size="36" style="display:block;color:var(--text-heading)" aria-hidden="true"></span></td>
      <td class="mono" style="color:var(--text-heading)">${code}</td>
      <td>${rule}</td><td class="num">${n}</td><td class="num">${r}</td>
      <td class="mono" style="color:var(--text-muted)">${f}</td></tr>`).join('')}</tbody>
  </table></div>`)}

  ${block('点径六档 · 不许自造中间值', `
  <div style="display:flex;align-items:center;justify-content:space-around;flex-wrap:wrap;gap:var(--space-5);padding:var(--space-7) var(--space-5);background:var(--surface-sunken);border-radius:var(--shape-card)">
    ${[2.0, 2.2, 2.4, 2.6, 3.0, 3.4].map(r => `<div style="text-align:center">
      <svg viewBox="0 0 12 12" width="${r * 14}" height="${r * 14}" aria-hidden="true" style="margin:0 auto">
        <circle cx="6" cy="6" r="6" fill="var(--text-heading)"/></svg>
      <div class="u-mono" style="margin-top:var(--space-3);font-size:11px;color:var(--text-subtle)">${r.toFixed(1)}</div></div>`).join('')}
  </div>`)}

  ${block('深浅双轨 · 禁止用实体色填充点阵', `
  <div class="grid grid--2" style="gap:var(--space-5)">
    <div style="background:var(--surface-sunken);border-radius:var(--shape-card);padding:var(--space-9);display:flex;justify-content:center;color:var(--ink-900)">
      <span data-lattice="ste" data-size="110" aria-hidden="true"></span></div>
    <div style="background:var(--ink-950);border-radius:var(--shape-card);padding:var(--space-9);display:flex;justify-content:center;color:var(--ink-50)">
      <span data-lattice="ste" data-size="110" aria-hidden="true"></span></div>
  </div>
  <p style="margin-top:var(--space-4);font-size:var(--fs-body-s);color:var(--text-muted);max-width:44em">深底用宣纸白，浅底用玄墨。实体色仍只作 2px 细线刻度 —— 一枚 STE 标记不因为它属于 STE 就变成松烟绿。这条限制让五枚标记在任何底色上都是同一族。</p>`)}

  ${block('加载态由同一点阵承担', `
  <div class="grid grid--3" style="gap:var(--space-5)">
    <div class="panel panel--sunken" style="display:flex;flex-direction:column;align-items:center;gap:var(--space-4);padding-block:var(--space-9)">
      <span data-spin data-size="52" style="color:var(--text-muted)" aria-hidden="true"></span>
      <span class="u-label">浅底 · 载入中</span></div>
    <div class="panel panel--inverse on-dark" style="display:flex;flex-direction:column;align-items:center;gap:var(--space-4);padding-block:var(--space-9)">
      <span data-spin data-size="52" style="color:var(--ink-50)" aria-hidden="true"></span>
      <span class="u-label" style="color:var(--ink-500)">深底 · 载入中</span></div>
    <div class="panel" style="display:flex;flex-direction:column;justify-content:center">
      <div class="u-eyebrow">LatticeSpin</div>
      <p style="margin-top:var(--space-3);font-size:var(--fs-body-s);line-height:1.8;margin-bottom:0">点按序列依次由 ink-400 提亮至 ink-50，每点相位差 1/N 周期，2400ms linear 循环。<strong>点不移动、不缩放、不旋转整体。</strong>取代 TaijiSpinner 的临时几何占位。</p>
    </div>
  </div>`)}

  <div class="note fx-reveal" style="margin-top:var(--space-8)"><div class="note__b">
    <div class="note__t">这一项待你确认方向</div>
    <div class="note__d">第 017 章将「空状态与场景叙事的插画」列为待补资料，并注明「按本典规则，这一项应改为影像而非插画，需你确认方向」。本站按第三条路实现 —— 生成式点阵与图解 —— 因为它同时满足「不用手绘插画」与「暂无实景图库」两个约束，且不违反影像三条硬规则中的任何一条。若最终决定走实景影像，本层可整体替换而不影响任何令牌与组件。</div>
  </div></div>`
    })}

</div>`
};
