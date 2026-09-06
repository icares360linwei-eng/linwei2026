集团级产品的实体上下文切换；切换后必须同步 `data-theme`，否则主色不变。

```jsx
<EntitySwitcher value={ent} onChange={(k) => {
  setEnt(k);
  document.documentElement.dataset.theme = k;
}} />
<EntitySwitcher value={ent} onChange={setEnt} compact />
```

- 实体名称使用正式全称（「九派国有能源」），内部简称不上界面。
- 五实体只是主色不同，版式与组件完全一致——差异中统一。
