# 源裕兴设计系统全典 · Sinotao Design System

> **V40.0 · 守正（画布对齐版）** — 守正 · 开物 · 共生
> 一套可生长的东方企业级组件语言。五家公司，一套设计语法，五种色彩身份。
> **墨为主、朱为章、金为贵、实体色为身份标记**——高阶不靠色度，靠明度落差。

## 事实来源

**`design-canvas/` 是唯一权威**（Claude Design 项目 `b6947ee9`，用户于 2026-09-06 提供）。
`design-system/` 是构建器与展示站：读画布令牌 → 实测对比度 → 算法修正 → 输出多页面站点。
两者冲突时以 `design-canvas/` 为准；构建产物一律不手改。

```
design-canvas/          ← 设计事实来源（375 令牌 · 34 组件 · 3 个 UI kit · 30 张规范卡）
  tokens/*.css          12 个令牌文件，styles.css 按序 @import
  components/           React 组件 + .d.ts 契约 + .prompt.md 用法
  ui_kits/              ste_console · brand_site · stg_cockpit
  guidelines/           可直接在浏览器打开的规范卡
  templates/            entity-dashboard · brand-landing
  assets/               SINOTAO 字标三色版 + 园区航拍
design-system/          ← 构建器与展示站
  build/tokens.mjs      解析画布 CSS，求解 var() 与 color-mix()
  build/build.mjs       门禁 + 多页面装配
  src/css/              01 reset · 02 base · 03 atoms · 04 molecules · 05 organisms
                        · 06 templates · 07 站点外壳 · 08 首页 · 09 动效
  src/js/               motion.js（Reveal/RuleReveal/Marquee）· sino.js · site.js
  src/partials/         00 外壳 · 01 首页 · 02–08 六层与治理 · 09 页脚 · 10 动效
  dist/                 构建产物
```

## 构建

```bash
cd design-system
node build/build.mjs            # 生成 dist/*；任一角色修正后仍不达 AA 即退出码 1
node build/build.mjs --report   # 只打印五实体锚点与 52 项对比度实测
```

## 门禁：以数据守正

构建器**不再推导色阶**——画布已完成配色工作——改为验证：

1. **五实体锚点复核**（画布自身声明）：600 档对宣纸底 8.13–11.47:1，白字其上 8.55–12.06:1。
2. **52 项对比度实测**：文本角色 × 表面 × 浅暗两模式；随实体变化的角色取五实体最差值。
3. **21 项算法修正**：不达 WCAG 2.2 AA 的角色沿 OKLCH 明度抬升，保留色相与色度，取满足阈值的最近一档。随实体变化的角色（`--text-brand` / `--text-link` / `--focus-ring-color`）修正为 `color-mix` 配比，对五实体同时成立。

**发现并修复了画布自身的缺口**：`dark.css` 只重映射 `--brand-*` 与表面/文字，状态色与数据可视化色仍是浅色模式的深色值，压在近黑卡面上仅 1.48–2.97:1，违反画布第 8 条准则（正文 ≥ 4.5:1）。全部抬升并逐条记入治理章 G.9。

## 非协商项（来自画布 SKILL.md）

1. 主题用 `<html data-theme="stg|ste|sti|sth|edu">`；暗色用 `data-color-scheme="dark"`。
2. 页面底宣纸白 `--ink-50`，墨为 `--ink-900`。**不用纯黑纯白**。
3. 古铜金 `--gold-400` 每屏最多一次；印章朱 `--zhu-600` 每章一枚。
4. 图标只来自 Material Symbols Rounded。**不用 emoji**。
5. 中文展示字 Noto Serif SC 细字重负字距；**数值一律 Space Grotesk + tabular-nums**。
6. 产品按钮 6px 圆角，只有营销 CTA 用 pill。
7. 文案写动作（「保存并提交」），不写「确定」。
8. **没有图形标志（logomark）**，只有 SINOTAO 字标。需要方形标记处用字标裁切或实体色码块，不得自造。
9. 面板默认平面：无描边、无阴影，靠明度差与 1px 细线划界。**禁止描边与阴影同时出现。**
10. 动效词汇只有三样：Reveal · RuleReveal · Marquee。**无弹跳、无缩放入场、无视差。**

## 产物

| 文件 | 说明 |
|---|---|
| `dist/index.html` | 首页 |
| `dist/tokens.html` … `dist/pages.html` | L0–L5 六层，各自独立成页 |
| `dist/motion.html` | M · 动效与交互（缓动曲线、Reveal 实验室、运笔） |
| `dist/governance.html` | G · 治理与变更日志 |
| `dist/sino.css` · `dist/site.js` | 全站共享样式与脚本 |
| `dist/tokens.css` | 画布令牌原文 + 具名门禁修正块 |
| `dist/tokens.resolved.json` | 求解后的令牌 + 门禁报告 |
| `dist/artifact.html` | 单文件全典（hash 路由），供发布与离线分发 |

**建议用本地服务器打开**（跨文档 View Transition 需要同源 http）：

```bash
npx http-server design-system/dist -p 8080
```

## 站点交互

| 操作 | 效果 |
|---|---|
| `⌘K` / `Ctrl K` | 跨页检索：章节 + 全部小节 |
| `G` | 叠加 12 列栅格 |
| `←` `→` | 上一章 / 下一章 |
| 顶栏色点 | 五实体切换（跨页持久化） |
| 顶栏三态 | 自动 / 浅色 / 暗色 |

## 画布自身标注的缺口（需补件）

- 霞鹜文楷 / 思源系列的**授权字体文件**（当前用 Google Fonts 近似替代）
- 150 枚品牌自定义 SVG 图标（当前用 Material Symbols）
- 33+ 幅品牌插画（空状态用 Material Symbols 占位）
- 影像图库（当前仅 1 张园区航拍）
