# UI Kit · 源裕兴集团品牌官网

集团对外品牌站的高保真复现。深色首屏叠加园区实景，内容面回到宣纸白。

## 屏幕

| 文件 | 屏幕 | 可交互点 |
|------|------|---------|
| `SiteChrome.jsx` | 站点外壳 | 顶栏（首屏自动转为深色半透明 + 背板模糊）、页脚、`Section` 版式件 |
| `HomeScreen.jsx` | 集团概览 | 全幅 Hero + 四项关键数据、五实体卡片（点击进入实体页）、价值闭环四段、治理数据 |
| `EntityScreen.jsx` | 五大实体 | Tabs 切换 STE / STI / STH / EDU，切换时 `data-theme` 同步换主色 |
| `Site.jsx` | 治理与 ESG · 加入我们 + 路由 | 治理承诺九宫、职位列表 hover |

## 说明

- Hero 图为用户提供的园区航拍（`assets/imagery/biomass-plant-aerial.jpg`，标注为 AI 生成的示意图）。
- 首屏文案为示意稿，需品牌委员会最终定稿。
- 营销面 CTA 用 `shape="pill"`（全圆），产品界面仍为 6px 圆角 —— 见 readme.md ▸ 圆角双轨。
