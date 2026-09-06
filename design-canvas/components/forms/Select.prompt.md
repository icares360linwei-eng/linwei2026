6 项以上的互斥选择；2–3 项短选项请改用 Radio。

```jsx
<Field label="所属实体" htmlFor="ent">
  <Select id="ent" value={v} onChange={setV} options={[
    { value: "stg", label: "STG 集团母体" }, { value: "ste", label: "STE 九派能源" },
  ]} />
</Field>
```

- 面板 Escape 可关、点击外部可关，焦点回到触发按钮。
- 选项超过 256px 高度即内部滚动，不要自行加分页。
