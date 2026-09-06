# 源裕兴设计系统全典 · Sinotao Design System

> **V39.0 · 墨经光纬（多页面站点版）** — 守正 · 开物 · 共生
> 墨为经，光为纬：编辑性的纵向叙事（巨型展示字、编号索引、留白与朱墨分层）与仪表性的横向读数（实测量表、等宽数字、bento 看板）交织成一部**可以逛的**设计系统。
> 以 Brad Frost 原子设计（令牌 → 原子 → 分子 → 有机体 → 模板 → 页面）为骨架，加上「动效」与「治理」两章，构成八章九页的独立站点。

## 目录结构

```
design-system/
├── tokens/
│   ├── tokens.json            唯一可信源（DTCG 风格：primitive / semantic / component）
│   └── chart-palette.json     数据墨色（由 chart-order.mjs 枚举生成，勿手改）
├── build/
│   ├── color.mjs              OKLCH ↔ sRGB、WCAG 对比度、色阶推导
│   ├── chart-order.mjs        图表系列色推导 + CVD 安全顺序枚举（dataviz 六检）
│   └── build.mjs              构建器：推导色阶 → 对比度门禁 → tokens.css → 装配多页面站点 + 单文件全典
├── src/
│   ├── css/                   ITCSS 分层：01 reset · 02 base · 03 atoms · 04 molecules · 05 organisms
│   │                          · 06 templates/pages · 07 站点外壳 · 08 首页 · 09 动效层
│   ├── js/                    art.js（太极流纹生成式流场）· motion.js（动效编排层）
│   │                          · sino.js（组件行为 / 主题）· site.js（双模路由 / 目录 / ⌘K / 图表）
│   ├── partials/              00 外壳 · 01 首页 · 02–08 六层与治理 · 09 页脚与浮层 · 10 动效
│   └── assets/                资产钩子：放入 logo.svg 与 hero.jpg，构建时自动内联
├── dist/                      构建产物（见下）
└── docs/v37-source.md         V37 文字稿（本版的输入与修正依据）
```

## 构建

```bash
cd design-system
node build/chart-order.mjs   # 可选：重新枚举数据墨色顺序（会写入 tokens/chart-palette.json）
node build/build.mjs         # 生成 dist/*；任何 WCAG AA 门禁失败即退出码 1
node build/build.mjs --report  # 仅打印色阶、对比度矩阵与门禁结果
```

### 产物

| 文件 | 说明 |
|---|---|
| `dist/index.html` | 首页（第 00 章 · 编辑式索引 + 实测仪表） |
| `dist/tokens.html` `atoms.html` `molecules.html` `organisms.html` `templates.html` `pages.html` | L0–L5 六层，各自独立成页 |
| `dist/motion.html` | **M · 动效与交互**：缓动族曲线、时长尺度、Stagger 实验室、FLIP、滚动驱动、书法运笔 |
| `dist/governance.html` | G · 治理与变更日志 |
| `dist/sino.css` · `dist/site.js` | 全站共享样式与脚本（`tokens.css` 已并入 `sino.css`） |
| `dist/tokens.css` · `dist/tokens.resolved.json` | 令牌单独产物（供 Figma / Odoo / AntD 映射） |
| `dist/artifact.html` | 单文件全典（hash 路由），供 Artifact 发布与离线分发 |

**建议用本地服务器打开**（跨文档 View Transition 需要同源 http）：

```bash
npx http-server design-system/dist -p 8080   # 然后访问 http://127.0.0.1:8080/
```

直接双击 `dist/index.html` 亦可正常浏览，仅跨页过渡动画降级为普通跳转。

## 站点交互

| 操作 | 效果 |
|---|---|
| `⌘K` / `Ctrl K` | 跨页检索：章节 + 全部小节（索引由构建时生成） |
| `G` | 叠加 12 列栅格 |
| `←` `→` | 上一章 / 下一章 |
| 顶栏色点 | 五实体切换（`data-theme`，选择跨页持久化） |
| 顶栏三态 | 自动 / 浅色 / 暗色（`data-color-scheme`） |
| 「目录」 | 全站索引抽屉（逐行 stagger 入场） |

## 动效契约

- 只动 `transform` 与 `opacity`（合成器线程），进场慢、退场快（退场 ≈ 进场 × 0.65）。
- 缓动族只有六条：`--ease-out / in / standard / elegant / spring / linear`，`linear` 仅用于循环与滚动绑定。
- 滚动揭示优先走原生 `animation-timeline: view()`；不支持时才由 `motion.js` 加 `html.js-rv` 并用 IntersectionObserver 补位。**两条路径都以「内容默认可见」为基线**——动效层挂了，站仍是一份能读的文档。
- `prefers-reduced-motion: reduce` 下不是全关，而是给终态：关闭大位移、视差、跑马灯与 scrub，保留透明度变化。
- 跨页连续性走 `@view-transition { navigation: auto }`；页内共享元素用 FLIP（动效章有可点的现场演示）。

## 六层结构与类名前缀

| 层 | 前缀 | 例 | 规则 |
|---|---|---|---|
| L0 令牌 | `--ink- --stg- --gold- --chart- --space- --radius- --dur- --ease- --z- --fs-` → `--e-` → `--c-` → `--{cmp}-` | `--btn-primary-bg` | Primitive 只定义一次；Semantic 只引用 Primitive；Component 只引用 Semantic |
| L1 原子 | `.a-` | `.a-btn--primary` | 不包含其他原子 |
| L2 分子 | `.m-` | `.m-field` | 只由原子组成，单一职责 |
| L3 有机体 | `.o-` | `.o-table` | 可独立运作，不互相嵌套为分子 |
| L4 模板 | `.t-` | `.t-dashboard` | 只定结构，不含真实数据 |
| L5 页面 | `.p-` + `[data-theme]` | `.p-frame[data-theme="ste"]` | 真实内容；五实体只换映射 |
| 站点层 | `.site- .hm- .hmx- .cover .cx- .toc .mo-` | `.hmx__row` | 只消费上述令牌与组件，不新造色值 |

五实体切换：`data-theme="stg|ste|sti|sth|edu"`；暗色三态：`data-color-scheme="auto|light|dark"` / 宿主 `:root[data-theme]` / `prefers-color-scheme`。

每章封面的流场画布由 `art.js` 按实体主色与藤黄实时生成（每章不同种子，随实体与暗色切换重绘，`prefers-reduced-motion` 下一次性渲染）。

## 构建门禁（以数据守正）

- 五实体主色锚点（V6.0）原值锁定为 600 阶，其余九阶 OKLCH 推导。
- 浅色可访问主色：从 600 阶向深处取第一阶满足「文字 ≥ 4.5:1 且宣纸白压其上 ≥ 4.5:1」；暗色从 300 阶向浅处取。
- 20 项语义色对比度实测（正文 / 次文 / 占位 / 边界 / 四语义色 × 两模式）。
- 数据墨色六检：明度带、色度 ≥ 0.10、CVD ΔE（Machado 2009）、正常视觉 ΔE、对比 ≥ 3:1、固定顺序。

## V38 → V39 的主要变化

1. **真·多页面**：构建器改为每章输出一份独立 HTML（`index/tokens/…/motion/governance`），共享 `sino.css` 与 `site.js`；`artifact.html` 保留 hash 路由的单文件全典。`site.js` 双模自适应。
2. **新增 M 章「动效与交互」**：六目的表、缓动族曲线可视化与实时播放、时长尺度、进退场对照、Stagger 实验室（可调参）、FLIP 共享元素、滚动驱动演示、永字八法运笔、状态编排、无障碍与性能预算。
3. **版式全面重排（墨经光纬）**：首页改为「巨型展示字 + 实测仪表面板 + 编号索引 + 五实体实时看板 + 门禁数据带」；章节封面改为「编号导轨 + 分行遮罩标题 + 本章索引面板」；顶栏加阅读进度与移动墨痕指示；页脚加编织跑马灯。
4. **动效层独立成册**（`09-motion.css` + `motion.js`）：滚动揭示双路径、中文按视觉行分组的标题揭示、数字滚动、聚光 / 磁吸 / 倾斜、指针尾随环、封面视差（带位移钳制）、跨文档视图过渡。
5. **⌘K 跨页检索**：搜索索引在构建时从各章小节提取，写入 `SINO_DATA.search`。
6. **可访问性**：`prefers-reduced-motion` 全量降级契约；顶栏工具提示改为下挂；移动端顶栏收敛、无横向溢出。

## 对 V37 文字稿的主要修正

见全典「治理 · G.9 变更日志」：对比度表实测替换、沧浪青可访问主色落到 700 阶、废止绛紫→金色渐变主按钮、藤黄戒律、输入框边界与占位符对比度、H4 字阶单调性、暗色三态、数据墨色枚举等。
