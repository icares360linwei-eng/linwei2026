# 源裕兴设计系统全典 · Sinotao Design System

> **V38.0 · 原子设计版** — 守正 · 开物 · 共生
> 从一粒墨到一座城：以 Brad Frost 原子设计（令牌 → 原子 → 分子 → 有机体 → 模板 → 页面）为骨架，把 V37 文字稿从零、从底层重建为可生长、可验证、可构建的设计系统。

## 目录结构

```
design-system/
├── tokens/
│   ├── tokens.json            唯一可信源（DTCG 风格：primitive / semantic / component）
│   └── chart-palette.json     数据墨色（由 chart-order.mjs 枚举生成，勿手改）
├── build/
│   ├── color.mjs              OKLCH ↔ sRGB、WCAG 对比度、色阶推导
│   ├── chart-order.mjs        图表系列色推导 + CVD 安全顺序枚举（dataviz 六检）
│   └── build.mjs              构建器：推导色阶 → 对比度门禁 → tokens.css → 装配全典
├── src/
│   ├── css/                   ITCSS 分层：01 reset · 02 base · 03 atoms · 04 molecules · 05 organisms · 06 templates/pages · 07 全典外壳
│   ├── js/                    sino.js（组件行为）· compendium.js（目录 / ⌘K / 图表 / 对比度计算器）
│   └── partials/              全典章节：00 外壳 · 01 卷首 · 02 令牌 · 03 原子 · 04 分子 · 05 有机体 · 06 模板 · 07 五实体页面 · 08 治理 · 09 收尾
├── dist/                      构建产物（index.html 独立文档 · artifact.html 片段 · tokens.css · sino.css · tokens.resolved.json）
└── docs/v37-source.md         V37 文字稿（本版的输入与修正依据）
```

## 构建

```bash
cd design-system
node build/chart-order.mjs   # 可选：重新枚举数据墨色顺序（会写入 tokens/chart-palette.json）
node build/build.mjs         # 生成 dist/*；任何 WCAG AA 门禁失败即退出码 1
node build/build.mjs --report  # 仅打印色阶、对比度矩阵与门禁结果
```

打开 `design-system/dist/index.html` 即可浏览全典（字体经 Google Fonts 加载）。

## 六层结构与类名前缀

| 层 | 前缀 | 例 | 规则 |
|---|---|---|---|
| L0 令牌 | `--ink- --stg- --gold- --chart- --space- --radius- --dur- --ease- --z- --fs-` → `--e-` → `--c-` → `--{cmp}-` | `--btn-primary-bg` | Primitive 只定义一次；Semantic 只引用 Primitive；Component 只引用 Semantic |
| L1 原子 | `.a-` | `.a-btn--primary` | 不包含其他原子 |
| L2 分子 | `.m-` | `.m-field` | 只由原子组成，单一职责 |
| L3 有机体 | `.o-` | `.o-table` | 可独立运作，不互相嵌套为分子 |
| L4 模板 | `.t-` | `.t-dashboard` | 只定结构，不含真实数据 |
| L5 页面 | `.p-` + `[data-theme]` | `.p-frame[data-theme="ste"]` | 真实内容；五实体只换映射 |

五实体切换：`data-theme="stg|ste|sti|sth|edu"`；暗色三态：`data-color-scheme="auto|light|dark"` / 宿主 `:root[data-theme]` / `prefers-color-scheme`。

## 构建门禁（以数据守正）

- 五实体主色锚点（V6.0）原值锁定为 600 阶，其余九阶 OKLCH 推导。
- 浅色可访问主色：从 600 阶向深处取第一阶满足「文字 ≥ 4.5:1 且宣纸白压其上 ≥ 4.5:1」；暗色从 300 阶向浅处取。
- 20 项语义色对比度实测（正文 / 次文 / 占位 / 边界 / 四语义色 × 两模式）。
- 数据墨色六检：明度带、色度 ≥ 0.10、CVD ΔE（Machado 2009）、正常视觉 ΔE、对比 ≥ 3:1、固定顺序。

## 对 V37 文字稿的主要修正

见全典「治理 · G.9 变更日志」：对比度表实测替换、沧浪青可访问主色落到 700 阶、废止绛紫→金色渐变主按钮、藤黄戒律、输入框边界与占位符对比度、H4 字阶单调性、暗色三态、数据墨色枚举等。
