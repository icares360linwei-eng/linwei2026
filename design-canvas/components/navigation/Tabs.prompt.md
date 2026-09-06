同一对象的不同视图（概览 / 明细 / 日志）；跨模块跳转请用导航，不要用 Tabs。

```jsx
<Tabs items={[
  { key: "all", label: "全部", count: 128 },
  { key: "pending", label: "待审核", count: 12 },
]} activeKey={k} onSelect={setK} />
```

- 超过 6 项说明信息架构需要重构，不要横向滚动。
