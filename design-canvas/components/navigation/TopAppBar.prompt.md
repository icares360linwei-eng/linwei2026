全断点可用的顶层导航；一级节点 3–5 个，超过 7 个改用 NavRail + 全局搜索。

```jsx
<TopAppBar logoSrc="assets/logo-sinotao-ink.svg" brand="九派国有能源"
  items={[{ key: "dash", label: "经营看板" }, { key: "boiler", label: "锅炉工况" }]}
  activeKey="dash" onSelect={setKey}
  actions={<><IconButton icon="search" label="全局搜索 ⌘K" /><Badge count={3} /></>} />
```

- `tone="inverse"` 用于品牌官网的深色首屏。
- 字标只用 assets/ 中提供的 SVG，禁止重绘。
