# UI Kit · STG 集团经营驾驶舱

集团母体（绛紫）视角的多实体聚合看板与审批中枢。

## 屏幕

| 文件 | 屏幕 | 可交互点 |
|------|------|---------|
| `Cockpit.jsx` | 应用外壳 + 路由 | 侧轨导航、五实体切换器（写入 `data-theme`）、顶栏暗色模式开关 |
| `OverviewScreen.jsx` | 经营驾驶舱 | 季度 Tabs、五实体营收行（点击切换全站主色）、合规与 Token 采用率环图、节点时间轴、风险预警 |
| `ApprovalsScreen.jsx` | 审批队列 | Tabs 过滤、多选批量通过 Popconfirm、行点击打开审批 Drawer（含审批流时间轴）、退回 Modal、Toast |
| `CockpitParts.jsx` | kit 版式件 | `EntityRow`、`Donut`、`Timeline` |

## 留空说明

「合规台账」与「品牌资产」两屏在提供的资料中没有对应设计，按 UI Kit 规则**不作发明**，以带说明的空状态占位。补齐需要：合规台账的字段定义、品牌资产库的图标 sprite / 插画文件。
