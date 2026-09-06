看板首屏的关键指标区。一行 3–5 项，超过 5 项说明该分组或下移。

```jsx
<StatBand items={[
  { label: "今日发电量", value: "128.4", unit: "万 kWh", delta: 4.2, deltaLabel: "较昨日", icon: "bolt" },
  { label: "供汽量", value: "3,860", unit: "吨", delta: 1.8, deltaLabel: "较昨日" },
  { label: "碳配额剩余", value: "12,800", unit: "吨", delta: -3.1, deltaLabel: "较上月" },
]} />
```

- 需要迷你趋势图的单个指标才用 `StatCard`；成组指标一律用本组件。
- 数值是 300 字重的大号西文——落差来自字号对比，不要再加粗。
- 标签是 12px 零字距的中文小标签，**不要改成大写眼标**——0.18em 字距会把汉字拉散。
