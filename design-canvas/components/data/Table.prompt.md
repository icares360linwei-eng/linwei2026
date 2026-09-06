列表型数据的主视图；空数据请务必传 `empty={<EmptyState … />}`。

```jsx
<Table selectable selected={sel} onSelectedChange={setSel}
  sort={sort} onSortChange={setSort}
  columns={[
    { key: "no", title: "报关单号" },
    { key: "amount", title: "金额", align: "right", sortable: true },
    { key: "status", title: "状态", render: (v) => <Tag tone="success">{v}</Tag> },
  ]}
  rows={rows} empty={<EmptyState title="暂无数据" hint="创建第一条记录，从这里开始。" />} />
```

- 数值列用 `align="right"`，组件自动切西文等宽数字。
- 长表格用 `dense` 把行高降到 40px；不要自行改 padding。
