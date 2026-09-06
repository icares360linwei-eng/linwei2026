# UI Kit · STE 九派国有能源运营控制台

赤湖工业园生物质热电联产运营控制台的高保真复现。默认 `data-theme="ste"`（苍木绿）。

## 屏幕

| 文件 | 屏幕 | 可交互点 |
|------|------|---------|
| `App.jsx` | 应用外壳 | 侧轨收起/展开、五实体主题切换、通知计数 |
| `DashboardScreen.jsx` | 经营看板 | KPI 卡、24 时负荷曲线时间粒度切换、机组卡片跳转锅炉工况 |
| `BoilerScreen.jsx` | 锅炉工况 | 机组下拉切换、六路仪表读数、排放达标 Tooltip、参数调整 Toast |
| `CarbonScreen.jsx` | 碳资产 | 配额流水排序、申购配额 Modal（含勾选后才可提交） |
| `FuelScreen.jsx` | 燃料供应 | Tabs 过滤、表格多选 + 批量核销 Popconfirm、行点击打开验收 Drawer、空状态 |

## 说明

- 所有 UI 原语来自 `components/`，本 kit 不重新实现按钮 / 表格等。
- `Parts.jsx` 只包含 kit 级版式件：`PageHeader`、`LineChart`、`BarRows`、`Gauge`。图表是无坐标装饰的 SVG 折线 / 条形，遵循数据墨水比原则。
- 业务数值为示意数据，不代表真实生产数据。
