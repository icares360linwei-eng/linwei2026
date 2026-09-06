多选、协议勾选、表格行选择。

```jsx
<Checkbox id="all" checked={all} indeterminate={some} onChange={setAll} label="全选本页 20 条" />
```

- 表头全选在部分选中时必须用 `indeterminate`。
- `label` 与方框同属一个 `<label>`，整行可点。
