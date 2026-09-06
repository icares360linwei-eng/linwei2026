桌面端产品的主导航；选中项用品牌浅底 + 填充图标，不用色块整条高亮。

```jsx
<NavRail expanded items={[
  { key: "dash", label: "经营看板", icon: "dashboard" },
  { key: "boiler", label: "锅炉工况", icon: "local_fire_department" },
  { key: "carbon", label: "碳资产", icon: "eco", badge: 2 },
]} activeKey="dash" onSelect={setKey} />
```

- 收起态必须保留 `title`（tooltip），否则图标不可解读。
- 展开动画 300ms，品牌缓动 `--ease-emphasized`。
